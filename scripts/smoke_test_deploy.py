"""Smoke tests post-despliegue para Railway (frontend, backend y servicio IA).

Uso desde la raíz del repositorio:
    python scripts/smoke_test_deploy.py \
        --frontend-url https://<frontend> \
        --backend-url https://<backend> \
        --ai-url https://<ai>

También lee FRONTEND_PUBLIC_URL, BACKEND_PUBLIC_URL y AI_PUBLIC_URL del entorno.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

PAGINATION_HEADERS = ("X-Total-Count", "X-Total-Pages", "X-Page", "X-Page-Size")
DEFAULT_WAIT_SECONDS = 120
RETRY_INTERVAL_SECONDS = 5


def _request(
    url: str,
    *,
    method: str = "GET",
    headers: dict[str, str] | None = None,
    body: bytes | None = None,
    timeout: float = 15.0,
) -> tuple[int, dict[str, str], bytes]:
    req = urllib.request.Request(url, data=body, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, {k.lower(): v for k, v in resp.headers.items()}, resp.read()
    except urllib.error.HTTPError as exc:
        return exc.code, {k.lower(): v for k, v in exc.headers.items()}, exc.read()


def _wait_ready(url: str, *, max_wait: int = DEFAULT_WAIT_SECONDS) -> tuple[int, dict[str, str], bytes]:
    deadline = time.monotonic() + max_wait
    last_error = ""
    while True:
        try:
            status, headers, raw = _request(url)
            if status == 200:
                return status, headers, raw
            last_error = f"HTTP {status}: {raw.decode('utf-8', errors='replace')[:200]}"
        except Exception as exc:  # noqa: BLE001 - red/TLS transitorio tras despliegue
            last_error = str(exc)
        if time.monotonic() >= deadline:
            raise AssertionError(f"Timeout esperando 200 en {url}: {last_error}")
        time.sleep(RETRY_INTERVAL_SECONDS)


def verify_backend(backend_url: str, frontend_origin: str) -> None:
    print(f"[backend] Verificando {backend_url}")
    _, _, raw_health = _wait_ready(f"{backend_url}/health")
    health = json.loads(raw_health.decode("utf-8"))
    assert health.get("status") == "ok", f"/health inesperado: {health}"

    status, headers, raw_repos = _request(f"{backend_url}/repos?page=1&page_size=1")
    assert status == 200, f"GET /repos devolvió {status}: {raw_repos[:200]!r}"
    repos = json.loads(raw_repos.decode("utf-8"))
    assert isinstance(repos, list) and len(repos) == 1, f"Se esperaba 1 repo en /repos: {len(repos)}"

    for name in PAGINATION_HEADERS:
        val = headers.get(name.lower())
        assert val is not None and val.isdigit(), f"Cabecera {name} inválida o ausente: {val!r}"
    assert int(headers["x-total-count"]) >= 100, f"Catálogo incompleto: {headers['x-total-count']}"

    opt_status, opt_headers, _ = _request(
        f"{backend_url}/repos",
        method="OPTIONS",
        headers={
            "Origin": frontend_origin,
            "Access-Control-Request-Method": "GET",
        },
    )
    assert opt_status == 200, f"CORS preflight backend falló: {opt_status}"
    assert opt_headers.get("access-control-allow-origin") == frontend_origin, (
        f"CORS backend no permite {frontend_origin}: {opt_headers.get('access-control-allow-origin')!r}"
    )
    exposed = opt_headers.get("access-control-expose-headers", "").lower()
    assert "x-total-count" in exposed, f"Cabeceras de paginación no expuestas en CORS: {exposed!r}"
    print("[backend] OK (Supabase, paginación y CORS verificados)")


def verify_ai(ai_url: str, frontend_origin: str) -> None:
    print(f"[ai] Verificando {ai_url}")
    _, _, raw_health = _wait_ready(f"{ai_url}/health")
    health = json.loads(raw_health.decode("utf-8"))

    assert health.get("catalog_source") == "database", (
        f"IA no está leyendo Supabase (catalog_source={health.get('catalog_source')!r}, "
        f"reason={health.get('catalog_fallback_reason')!r})"
    )
    assert health.get("catalog_fallback_reason") is None, (
        f"IA reportó fallback_reason={health.get('catalog_fallback_reason')!r}"
    )
    assert int(health.get("repos") or 0) >= 100, f"Repos en IA insuficientes: {health.get('repos')}"
    llms = health.get("llm") or []
    assert llms and llms[0].get("key_configured") is True, f"Proveedor LLM principal sin clave: {llms}"

    opt_status, opt_headers, _ = _request(
        f"{ai_url}/assistant",
        method="OPTIONS",
        headers={
            "Origin": frontend_origin,
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "Content-Type",
        },
    )
    assert opt_status == 200, f"CORS preflight IA falló: {opt_status}"
    assert opt_headers.get("access-control-allow-origin") == frontend_origin, (
        f"CORS IA no permite {frontend_origin}: {opt_headers.get('access-control-allow-origin')!r}"
    )

    post_status, _, post_raw = _request(
        f"{ai_url}/assistant",
        method="POST",
        headers={"Content-Type": "application/json"},
        body=json.dumps({"query": "corta"}).encode("utf-8"),
    )
    assert post_status == 422, f"Validación POST /assistant esperada 422, devolvió {post_status}"
    post_body = json.loads(post_raw.decode("utf-8"))
    assert post_body.get("error", {}).get("code") == "invalid_query", f"Error inesperado: {post_body}"
    print("[ai] OK (Supabase, LLM, CORS y contrato /assistant verificados)")


def verify_frontend(frontend_url: str, backend_origin: str, ai_origin: str) -> None:
    print(f"[frontend] Verificando {frontend_url}")
    _, _, raw_html = _wait_ready(f"{frontend_url}/")
    html = raw_html.decode("utf-8", errors="replace")
    assert "OpenBridge" in html, "HTML principal no contiene 'OpenBridge'"

    scripts = sorted(set(re.findall(r'(?:src|href)="(/\_next/static/[^"?]+\.js)"', html)))
    assert scripts, "No se encontraron chunks JS de Next.js en index.html"

    bundle_parts: list[str] = [html]
    for asset in scripts:
        status, _, raw_js = _request(f"{frontend_url}{asset}")
        assert status == 200, f"Asset {asset} devolvió {status}"
        bundle_parts.append(raw_js.decode("utf-8", errors="replace"))
    bundle = "\n".join(bundle_parts)

    backend_host = urllib.parse.urlsplit(backend_origin).netloc
    ai_host = urllib.parse.urlsplit(ai_origin).netloc
    assert backend_host and backend_host in bundle, (
        f"El bundle del frontend no contiene el dominio del backend ({backend_host})"
    )
    assert ai_host and ai_host in bundle, (
        f"El bundle del frontend no contiene el dominio de IA ({ai_host})"
    )
    assert "127.0.0.1:8000" not in bundle and "127.0.0.1:8001" not in bundle, (
        "El bundle del frontend conserva URLs locales 127.0.0.1"
    )
    print("[frontend] OK (exportación estática y URLs reales embebidas verificadas)")


def main() -> int:
    parser = argparse.ArgumentParser(description="Smoke tests post-despliegue OpenBridge")
    parser.add_argument("--frontend-url", default=os.getenv("FRONTEND_PUBLIC_URL", ""))
    parser.add_argument("--backend-url", default=os.getenv("BACKEND_PUBLIC_URL", ""))
    parser.add_argument("--ai-url", default=os.getenv("AI_PUBLIC_URL", ""))
    args = parser.parse_args()

    missing = [
        name
        for name, val in [
            ("FRONTEND_PUBLIC_URL", args.frontend_url),
            ("BACKEND_PUBLIC_URL", args.backend_url),
            ("AI_PUBLIC_URL", args.ai_url),
        ]
        if not val.strip()
    ]
    if missing:
        print(f"Faltan URLs públicas para smoke tests: {', '.join(missing)}", file=sys.stderr)
        return 2

    frontend_url = args.frontend_url.strip().rstrip("/")
    backend_url = args.backend_url.strip().rstrip("/")
    ai_url = args.ai_url.strip().rstrip("/")

    for label, val in [("frontend", frontend_url), ("backend", backend_url), ("ai", ai_url)]:
        parsed = urllib.parse.urlsplit(val)
        if parsed.scheme != "https" or not parsed.netloc:
            print(f"URL de {label} debe ser HTTPS pública válida: {val!r}", file=sys.stderr)
            return 2

    verify_backend(backend_url, frontend_url)
    verify_ai(ai_url, frontend_url)
    verify_frontend(frontend_url, backend_url, ai_url)
    print("Smoke tests completados correctamente.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
