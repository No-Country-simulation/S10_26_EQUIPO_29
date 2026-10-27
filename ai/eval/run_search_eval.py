"""Mide la búsqueda contra el golden set y escribe el reporte en ai/eval/results/.

Uso, desde la raíz del repo:
    python -m ai.eval.run_search_eval
"""

import time
from datetime import date

from ai import embeddings
from ai.eval.golden import EVAL_DIR, SearchGoldenSet, SearchQuery, load_search_queries
from ai.eval.metrics import QueryOutcome, expected_ranks, summarize
from ai.search import SearchIndex, SearchResult

K = 3
RESULTS_DIR = EVAL_DIR / "results"


def short(full_name: str) -> str:
    return full_name.split("/")[1]


def top_cell(results: list[SearchResult]) -> str:
    return " · ".join(f"{short(r.repo.full_name)} {r.score:.3f}" for r in results)


def render_report(model: str, golden: SearchGoldenSet, n_repos: int, summary: dict,
                  times: dict, rows: list[tuple[SearchQuery, list[SearchResult], QueryOutcome]]) -> str:
    lines = [
        f"# Evaluación de la búsqueda · {model}",
        "",
        f"Generado con `python -m ai.eval.run_search_eval` el {date.today()}. "
        f"Golden set v{golden.version} · {n_repos} repos · k = {K} · CPU.",
        "",
        "## Resumen",
        "",
        "| Métrica | Valor |",
        "|---|---|",
        f"| hit@{K} | {summary['hits']}/{summary['n']} ({summary['hit_rate']:.0%}) |",
        f"| MRR@{K} | {summary['mrr']:.2f} |",
        f"| recall@{K} | {summary['recall']:.0%} |",
        f"| Carga del modelo + primera consulta | {times['load']:.1f} s |",
        f"| Vectores del catálogo ({n_repos} repos) | {times['build']:.1f} s |",
        f"| Consulta (promedio) | {times['query']:.2f} s |",
        "",
        "## Consultas con respuesta",
        "",
        f"| Consulta | Acierto | Posición de cada esperado | Top-{K} (puntaje) |",
        "|---|---|---|---|",
    ]
    for q, top, outcome in rows:
        if q.answerable:
            hit = "✅" if outcome.rank is not None and outcome.rank <= K else "❌"
            positions = " · ".join(
                f"{short(e)} {r or '—'}" for e, r in zip(q.expected, outcome.expected_ranks)
            )
            lines.append(f"| `{q.id}` | {hit} | {positions} | {top_cell(top)} |")

    lines += ["", "## Pares (deben dar resultados distintos)", "",
              f"| Par | Consulta | Top-{K} |", "|---|---|---|"]
    for q, top, _ in sorted((r for r in rows if r[0].pair), key=lambda r: r[0].pair):
        lines.append(f"| {q.pair} | `{q.id}` | {top_cell(top)} |")

    lines += ["", "## Consultas sin respuesta (el puntaje del 1.º sirve para el umbral)", "",
              "| Consulta | 1.er resultado (puntaje) |", "|---|---|"]
    for q, top, _ in rows:
        if not q.answerable:
            lines.append(f"| `{q.id}` | {top_cell(top[:1])} |")

    return "\n".join(lines) + "\n"


def main() -> None:
    golden = load_search_queries()
    model = embeddings.MODEL_NAME

    start = time.perf_counter()
    embeddings.embed_query("calentamiento")      # carga el modelo
    load_s = time.perf_counter() - start

    start = time.perf_counter()
    index = SearchIndex.build()                  # modelo ya cargado: solo vectores
    build_s = time.perf_counter() - start
    n_repos = len(index.repos)

    rows, outcomes, query_s = [], [], []
    for q in golden.queries:
        start = time.perf_counter()
        results = index.search(q.query, k=n_repos)   # ranking completo
        query_s.append(time.perf_counter() - start)
        outcome = QueryOutcome(q.id, expected_ranks([r.repo.full_name for r in results], q.expected))
        rows.append((q, results[:K], outcome))
        outcomes.append(outcome)

    summary = summarize(outcomes, K)
    times = {"load": load_s, "build": build_s, "query": sum(query_s) / len(query_s)}

    RESULTS_DIR.mkdir(exist_ok=True)
    path = RESULTS_DIR / f"search-{short(model).lower()}.md"
    path.write_text(render_report(model, golden, n_repos, summary, times, rows), encoding="utf-8")

    print(f"Modelo: {model}")
    print(f"hit@{K}: {summary['hits']}/{summary['n']}  MRR@{K}: {summary['mrr']:.2f}  "
          f"recall@{K}: {summary['recall']:.0%}")
    print(f"Reporte: {path}")


if __name__ == "__main__":
    main()
