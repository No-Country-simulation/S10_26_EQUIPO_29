"""Genera los datos de ejemplo de la IA a partir de la API de GitHub.

Uso (desde la raíz del repo, con el entorno activo):
    python -m ai.scripts.build_sample_data

Lee cada repo con `gh api`, le agrega las categorías asignadas a mano,
lo valida con el esquema `Repo` y escribe:
    ai/data/repos.json
    ai/data/readmes/<owner>__<name>.md
"""

import json
import subprocess
from pathlib import Path

from ai.schemas import Repo

DATA_DIR = Path(__file__).resolve().parents[1] / "data"
README_DIR = DATA_DIR / "readmes"

# Clasificación manual. Es la referencia contra la que se evaluará
# más adelante la clasificación automática con un LLM.
CATEGORIES: dict[str, list[str]] = {
    "keycloak/keycloak": ["Auth"],
    "ory/kratos": ["Auth"],
    "supertokens/supertokens-core": ["Auth"],
    "zitadel/zitadel": ["Auth"],
    "supabase/supabase": ["DB", "Auth"],
    "pocketbase/pocketbase": ["DB", "Auth"],
    "redis/redis": ["DB"],
    "juspay/hyperswitch": ["Payments"],
    "getlago/lago": ["Payments"],
    "killbill/killbill": ["Payments"],
    "ollama/ollama": ["AI"],
    "langchain-ai/langchain": ["AI"],
    "run-llama/llama_index": ["AI"],
    "PostHog/posthog": ["Analytics"],
    "plausible/analytics": ["Analytics"],
    "umami-software/umami": ["Analytics"],
    "metabase/metabase": ["Analytics"],
    "meilisearch/meilisearch": ["Search"],
    "typesense/typesense": ["Search"],
    "qdrant/qdrant": ["Search", "AI"],
}


def gh_api(path: str, raw: bool = False) -> str:
    """Llama a `gh api` y devuelve la respuesta como texto UTF-8."""
    cmd = ["gh", "api", path]
    if raw:
        cmd += ["-H", "Accept: application/vnd.github.raw"]
    result = subprocess.run(cmd, capture_output=True, check=True)
    return result.stdout.decode("utf-8")


def build_repo(full_name: str, categories: list[str]) -> Repo:
    """Descarga un repo y su README, y lo devuelve validado."""
    data = json.loads(gh_api(f"repos/{full_name}"))

    readme_file = README_DIR / f"{full_name.replace('/', '__')}.md"
    readme_file.write_text(
        gh_api(f"repos/{full_name}/readme", raw=True),
        encoding="utf-8",
        newline="\n",
    )

    return Repo(
        repo_id=data["full_name"],
        github_id=data["id"],
        description=data["description"],
        topics=data["topics"],
        categories=categories,
        language=data["language"],
        license=(data["license"] or {}).get("spdx_id"),
        stars=data["stargazers_count"],
        pushed_at=data["pushed_at"],
        open_issues=data["open_issues_count"],
        archived=data["archived"],
        readme_path=readme_file.relative_to(DATA_DIR).as_posix(),
    )


def main() -> None:
    README_DIR.mkdir(parents=True, exist_ok=True)
    repos = []
    for full_name, categories in CATEGORIES.items():
        print(f"-> {full_name}")
        repos.append(build_repo(full_name, categories))

    out = DATA_DIR / "repos.json"
    out.write_text(
        json.dumps([r.model_dump(mode="json") for r in repos], indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
        newline="\n",
    )
    print(f"{len(repos)} repos -> {out}")


if __name__ == "__main__":
    main()
