"""Mide el paso de entender con los casos del asistente y escribe el reporte.

Uso, desde la raíz del repo:
    python -m ai.eval.run_understand_eval                            # todos los proveedores del registro, 3 corridas
    python -m ai.eval.run_understand_eval gemini --runs 1            # uno, una corrida
    python -m ai.eval.run_understand_eval gemini --cases validation  # casos de validación
    python -m ai.eval.run_understand_eval --cases detection --rescore <reporte>.json

Cada proveedor recibe primero una llamada de calentamiento que no se cuenta.
Si el proveedor pide esperar por límite de uso, se espera y se anota.
Escribe ai/eval/results/understand-<fecha>-<hora>[-validation][-proveedores].md (reporte)
y .json (todas las respuestas).
Con --rescore no llama al modelo: puntúa las respuestas guardadas en el JSON de un reporte
con las etiquetas actuales de los casos y escribe <reporte>-etiquetas-v<versión>.md.
"""

import argparse
import json
import time
from collections import defaultdict
from datetime import date
from pathlib import Path

from dotenv import load_dotenv

from ai.assistant import entender
from ai.eval.assistant_cases import CASE_FILES, EVAL_DIR, load_assistant_cases
from ai.eval.understand_metrics import by_category, case_outcome, summarize, understood_from_answer
from ai.llm import PROVIDERS, LLMError, LLMRateLimited, LLMTimeout, LLMUnavailable

RESULTS_DIR = EVAL_DIR / "results"
WARMUP = "Necesito que los clientes de mi tienda puedan buscar productos por nombre."
MIN_PAUSE = {"gemini": 4.0}  # nivel gratuito: 15 llamadas por minuto
DEFAULT_WAIT = 20.0          # si el límite de uso no dice cuánto esperar
MAX_WAITS = 5
TRANSIENT_WAIT = 10.0        # error temporal del proveedor (503, sin conexión)
MAX_WAIT = 120.0             # si el proveedor pide esperar más (límite diario), no se insiste
WARMUP_TRIES = 6  # 6 × 15 s: un modelo local frío puede tardar ~1 min en cargar


def warm_up(provider: str) -> bool:
    """Primera llamada, que no se mide. Insiste mientras el modelo se carga."""
    for _ in range(WARMUP_TRIES):
        try:
            entender(WARMUP, provider=provider)
            return True
        except LLMTimeout:
            print("  cargando el modelo…")
        except LLMError as err:
            print(f"  {err}")
            return False
    return False

def call(request: str, provider: str):
    """entender(), esperando ante límites de uso y errores temporales del proveedor."""
    waited = 0.0
    for _ in range(MAX_WAITS):
        try:
            return entender(request, provider=provider), waited
        except LLMRateLimited as err:
            if err.retry_after and err.retry_after > MAX_WAIT:
                raise  # límite diario: esperar no tiene sentido en esta corrida
            pause, reason = err.retry_after or DEFAULT_WAIT, "límite de uso"
        except LLMUnavailable as err:
            if not err.transient:
                raise
            pause, reason = TRANSIENT_WAIT, "error temporal del proveedor"
        print(f"    {reason}: espero {pause:.0f} s")
        time.sleep(pause)
        waited += pause
    raise LLMUnavailable(f"{provider}: sigue sin responder tras {MAX_WAITS} esperas")


def pct(v):
    return "—" if v is None else f"{v:.0%}"


def secs(v):
    return "—" if v is None else f"{v:.1f} s"


def num(v):
    return "—" if v is None else f"{v:.0f}"


def render_categories(providers, outcomes) -> list[str]:
    """Tabla por categoría: detectadas y de más, una cifra por corrida."""
    lines = ["## Por categoría", "",
             "Una cifra por corrida. Detectadas: de las necesidades esperadas de esa "
             "categoría. De más: pedidos que no la piden y en los que se detectó. Sin "
             "errores del proveedor ni pedidos vagos.", ""]
    for p in providers:
        table = by_category([o for o in outcomes if o.provider == p])
        runs = sorted({run for counts in table.values() for run in counts})
        lines += [f"### {p}", "", "| Categoría | Detectadas | De más |", "|---|---|---|"]
        totals = {run: [0, 0, 0] for run in runs}
        for category in sorted(table):
            cells = [table[category].get(run, (0, 0, 0)) for run in runs]
            for run, counts in zip(runs, cells):
                totals[run] = [a + b for a, b in zip(totals[run], counts)]
            lines.append(f"| {category} | " + " · ".join(f"{d}/{e}" for d, e, _ in cells)
                         + " | " + " · ".join(str(x) for _, _, x in cells) + " |")
        lines.append("| **Todas** | " + " · ".join(f"{d}/{e}" for d, e, _ in totals.values())
                     + " | " + " · ".join(str(x) for _, _, x in totals.values()) + " |")
        lines.append("")
    return lines


def render_report(providers, summaries, cold, outcomes, answers, cases, runs, *,
                  labels_version: int, rescored_from: str | None = None) -> str:
    def row(label, fmt):
        return f"| {label} | " + " | ".join(fmt(summaries[p]) for p in providers) + " |"

    if rescored_from:
        origin = (f"Re-puntuado con `--rescore` el {date.today()}: respuestas del modelo "
                  f"guardadas en `{rescored_from}`, etiquetas actuales de los casos. ")
    else:
        origin = (f"Generado con `python -m ai.eval.run_understand_eval` el {date.today()} "
                  f"a las {time.strftime('%H:%M')}. ")
    lines = [
        "# Evaluación del paso de entender",
        "",
        origin + f"{len(cases)} casos × {runs} corridas por proveedor; "
        f"etiquetas versión {labels_version}; la llamada de calentamiento no se cuenta.",
        "",
        "## Modelos",
        "",
        "| Proveedor | Modelo | Razonamiento | Arranque en frío |",
        "|---|---|---|---|",
        *[f"| {p} | `{PROVIDERS[p].model}` | {PROVIDERS[p].reasoning_effort or 'por defecto'} "
          f"| {secs(cold[p])} |" for p in providers],
        "",
        "## Resumen",
        "",
        "| Métrica | " + " | ".join(providers) + " |",
        "|---|" + "---|" * len(providers),
        row("Casos exactos", lambda s: pct(s["exact"])),
        row("Cobertura de necesidades", lambda s: pct(s["recall"])),
        row("Necesidades inventadas", lambda s: str(s["invented"])),
        row("Vagos bien tratados", lambda s: s["vague_ok"]),
        row("Pidió aclaración sin necesidad", lambda s: str(s["asked_when_clear"])),
        row("Consistencia entre corridas", lambda s: pct(s["consistency"])),
        row("Válida al primer intento", lambda s: pct(s["valid_first"])),
        row("Válida tras el reintento", lambda s: pct(s["valid_final"])),
        row("Errores del proveedor", lambda s: f"{s['errors']}/{s['calls']}"),
        row("Evidencia literal", lambda s: pct(s["literal_evidence"])),
        row("Consultas de 3 a 8 palabras", lambda s: pct(s["short_queries"])),
        row("Tiempo (mediana)", lambda s: secs(s["median_seconds"])),
        row("Tiempo (peor caso)", lambda s: secs(s["max_seconds"])),
        row("Tokens de entrada (mediana)", lambda s: num(s["median_input_tokens"])),
        row("Tokens de salida (mediana)", lambda s: num(s["median_output_tokens"])),
        row("Esperas (límite de uso o error temporal)", lambda s: secs(s["waited"])),
        "",
        f"Evidencia direccional: {len(cases)} casos; los porcentajes no son estadística firme.",
        "",
        *render_categories(providers, outcomes),
        "## Por caso",
        "",
        "Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. "
        "`+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.",
        "",
        "| Caso | Esperado | " + " | ".join(providers) + " |",
        "|---|---|" + "---|" * len(providers),
    ]

    grouped = defaultdict(list)
    for o in outcomes:
        grouped[(o.provider, o.case_id)].append(o)
    for case in cases:
        expected = ", ".join(sorted(n.category for n in case.needs)) or "(vago)"
        cells = []
        for p in providers:
            done = grouped[(p, case.id)]
            marks = "".join("⚠️" if o.error else ("✅" if o.exact else "❌") for o in done)
            extra = sorted(set().union(*(o.invented for o in done)))
            missing = sorted(set().union(*(o.expected - o.detected for o in done if not o.error)))
            notes = " ".join([f"+{c}" for c in extra] + [f"−{c}" for c in missing])
            cells.append(f"{marks} {notes}".strip())
        lines.append(f"| `{case.id}` | {expected} | " + " | ".join(cells) + " |")

    lines += ["", "## Para revisar a mano (corrida 1)", ""]
    for p in providers:
        lines += [f"### {p}", ""]
        for a in answers:
            if a["provider"] != p or a["run"] != 1:
                continue
            if a["error"]:
                lines.append(f"- `{a['case']}`: error · {a['error']}")
            elif a["data"] is None:
                lines.append(f"- `{a['case']}`: sin respuesta válida")
            elif a["data"]["needs"]:
                needs = "; ".join(f"**{n['category']}** «{n['query']}» ← “{n['evidence']}”"
                                  for n in a["data"]["needs"])
                lines.append(f"- `{a['case']}`: {needs}")
            else:
                lines.append(f"- `{a['case']}`: preguntas: "
                             + " / ".join(a["data"]["clarification_questions"]))
        lines.append("")
    return "\n".join(lines)


def rescore(report_json: Path, cases_name: str) -> Path:
    """Puntúa las respuestas guardadas de un reporte con las etiquetas actuales. Sin llamadas."""
    answers = json.loads(report_json.read_text(encoding="utf-8"))
    case_set = load_assistant_cases(CASE_FILES[cases_name])
    by_id = {c.id: c for c in case_set.cases}
    if {a["case"] for a in answers} != set(by_id):
        raise SystemExit(f"{report_json.name} no tiene los mismos casos que '{cases_name}'")
    outcomes = [case_outcome(by_id[a["case"]], a["provider"], a["run"], understood_from_answer(a),
                             waited=a["waited"], error=a["error"]) for a in answers]
    providers = list(dict.fromkeys(a["provider"] for a in answers))
    summaries = {p: summarize([o for o in outcomes if o.provider == p]) for p in providers}
    report = render_report(providers, summaries, {p: None for p in providers}, outcomes, answers,
                           case_set.cases, max(a["run"] for a in answers),
                           labels_version=case_set.version, rescored_from=report_json.name)
    out = report_json.with_name(f"{report_json.stem}-etiquetas-v{case_set.version}.md")
    out.write_text(report, encoding="utf-8")
    return out


def main() -> None:
    parser = argparse.ArgumentParser(description="Mide el paso de entender.")
    parser.add_argument("providers", nargs="*",
                        help="por defecto, todos los proveedores del registro")
    parser.add_argument("--runs", type=int, default=3)
    parser.add_argument("--cases", choices=CASE_FILES, default="base",
                        help="base: todos los casos (por defecto); validation: los casos de validación")
    parser.add_argument("--rescore", type=Path, metavar="REPORTE_JSON",
                        help="puntúa las respuestas guardadas de un reporte con las etiquetas "
                             "actuales, sin llamar al modelo")
    args = parser.parse_args()
    if args.rescore:
        print(f"Reporte: {rescore(args.rescore, args.cases)}")
        return
    unknown = [p for p in args.providers if p not in PROVIDERS]
    if unknown:
        parser.error(f"proveedor desconocido: {', '.join(unknown)}")
    args.providers = args.providers or list(PROVIDERS)

    load_dotenv()
    case_set = load_assistant_cases(CASE_FILES[args.cases])
    cases = case_set.cases
    outcomes, answers, cold = [], [], {}

    for provider in args.providers:
        print(f"{provider}: calentamiento")
        start = time.perf_counter()
        if not warm_up(provider):
            print("  no responde; se omite")
            continue
        cold[provider] = time.perf_counter() - start

        for run in range(1, args.runs + 1):
            for case in cases:
                try:
                    understood, waited = call(case.query, provider)
                    error = None
                except LLMError as err:
                    understood, waited, error = None, 0.0, f"{type(err).__name__}: {err}"
                o = case_outcome(case, provider, run, understood, waited=waited, error=error)
                outcomes.append(o)
                answers.append({
                    "provider": provider, "run": run, "case": case.id, "error": error,
                    "data": understood.data.model_dump() if understood and understood.data else None,
                    "problems_first": understood.problems_first if understood else [],
                    "problems_final": understood.problems_final if understood else [],
                    "seconds": o.seconds, "input_tokens": o.input_tokens,
                    "output_tokens": o.output_tokens, "waited": waited,
                })
                status = "error" if error else ("ok" if o.exact else "--")
                print(f"  {provider} {run} {case.id:<24} {status:<5} "
                      f"{sorted(o.detected)} {o.seconds:.1f} s")
                time.sleep(MIN_PAUSE.get(provider, 0))

    ran = [p for p in args.providers if p in cold]
    if not ran:
        print("Ningún proveedor respondió; no se escribe reporte.")
        return
    summaries = {p: summarize([o for o in outcomes if o.provider == p]) for p in ran}

    RESULTS_DIR.mkdir(exist_ok=True)
    # Con la hora en el nombre, dos corridas del mismo día no se pisan.
    name = f"understand-{date.today()}-{time.strftime('%H%M')}"
    if args.cases != "base":
        name += f"-{args.cases}"
    if set(ran) != set(PROVIDERS):
        name += "-" + "-".join(ran)
    stem = RESULTS_DIR / name
    stem.with_suffix(".md").write_text(
        render_report(ran, summaries, cold, outcomes, answers, cases, args.runs,
                      labels_version=case_set.version), encoding="utf-8")
    stem.with_suffix(".json").write_text(
        json.dumps(answers, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Reporte: {stem.with_suffix('.md')}")


if __name__ == "__main__":
    main()
