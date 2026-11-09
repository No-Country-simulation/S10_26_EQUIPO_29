"""Mide la búsqueda contra el golden set y escribe el reporte en ai/eval/results/.

Uso, desde la raíz del repo:
    python -m ai.eval.run_search_eval                  # catálogo real (snapshot)
    python -m ai.eval.run_search_eval --golden sample  # 20 repos de ejemplo
    python -m ai.eval.run_search_eval --texto base     # variante del texto embebido (ver TEXT_VARIANTS en ai/search.py)
    python -m ai.eval.run_search_eval --golden catalog catalog-validation  # varios, medidos como uno solo
"""

import argparse
import time
from datetime import date, datetime

from ai import catalog, embeddings
from ai.eval.golden import (DEFAULT_GOLDEN,
                            EVAL_DIR,
                            GOLDEN_FILES,
                            SearchGoldenSet,
                            SearchQuery,
                            load_goldens,
                            report_name,)
from ai.eval.metrics import (QueryOutcome,
                             expected_ranks,
                             suggest_min_score,
                             summarize,
                             threshold_errors,)
from ai.search import TEXT_FIELDS, TEXT_VARIANTS, SearchIndex, SearchResult, TextField

K = 3
RESULTS_DIR = EVAL_DIR / "results"


def short(full_name: str) -> str:
    return full_name.split("/")[1]


def top_cell(results: list[SearchResult]) -> str:
    return " · ".join(f"{short(r.repo.full_name)} {r.score:.3f}" for r in results)


def render_report(model: str, min_score: float | None,
                  goldens: list[tuple[str, SearchGoldenSet]], n_repos: int, summary: dict,
                  times: dict, rows: list[tuple[SearchQuery, list[SearchResult], QueryOutcome]],
                  fields: tuple[TextField, ...] = TEXT_FIELDS, variant: str | None = None,
                  snapshot_at: str | None = None) -> str:
    names = " ".join(name for name, _ in goldens)
    sets = ", ".join(f"`{name}` v{golden.version}" for name, golden in goldens)
    dates = sorted({f"{g.catalog_taken_at:%Y-%m-%d}" for _, g in goldens if g.catalog_taken_at})
    labels = f" (etiquetas del catálogo del {', '.join(dates)})" if dates else ""
    source = goldens[0][1].source
    measured = f" del {snapshot_at[:10]}" if snapshot_at else ""
    option = f" --texto {variant}" if variant else ""
    lines = [
        f"# Evaluación de la búsqueda · {model}",
        "",
        f"Generado con `python -m ai.eval.run_search_eval --golden {names}{option}` "
        f"el {date.today()}. "
        f"Golden set {sets}{labels} · catálogo `{source}`{measured} · "
        f"{n_repos} repos · k = {K} · CPU · "
        f"datos de la IA en el texto: {', '.join(fields) or 'ninguno'}.",
        "",
    ]
    stale = [name for name, g in goldens if snapshot_at and g.catalog_taken_at
             and g.catalog_taken_at != datetime.fromisoformat(snapshot_at)]
    if stale:
        lines += [f"> ⚠ Las etiquetas de {', '.join(f'`{n}`' for n in stale)} son de otro "
                  "catálogo: estas cifras no son válidas ni comparables hasta volver a etiquetar.",
                  ""]
    lines += [
        "## Resumen",
        "",
        "| Métrica | Valor |",
        "|---|---|",
        f"| hit@{K} | {summary['hits']}/{summary['n']} ({summary['hit_rate']:.0%}) |",
        f"| MRR@{K} | {summary['mrr']:.2f} |",
        f"| recall@{K} | {summary['recall']:.0%} |",
        (
            f"| hit@5 (con 5 candidatos por necesidad) | "
            f"{summary['hits_5']}/{summary['n']} ({summary['hit_rate_5']:.0%}) |"
        ),
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

    pair_rows = sorted((r for r in rows if r[0].pair), key=lambda r: r[0].pair)
    if pair_rows:
        lines += ["", "## Pares (deben dar resultados distintos)", "",
                  f"| Par | Consulta | Top-{K} |", "|---|---|---|"]
        for q, top, _ in pair_rows:
            lines.append(f"| {q.pair} | `{q.id}` | {top_cell(top)} |")

    lines += ["", "## Consultas sin respuesta (el puntaje del 1.º sirve para el umbral)", "",
              f"| Consulta | Top-{K} (puntaje) |", "|---|---|"]
    for q, top, _ in rows:
        if not q.answerable:
            lines.append(f"| `{q.id}` | {top_cell(top)} |")

    outcomes = [o for _, _, o in rows]
    answered = [o for o in outcomes if o.answerable]
    resolved = [o for o in answered if o.rank is not None and o.rank <= K]
    unresolved = [o for o in answered if o not in resolved]
    unanswered = [o for o in outcomes if not o.answerable]
    suggested = suggest_min_score(outcomes, K)
    ids = lambda xs: ", ".join(f"`{o.query_id}`" for o in xs) or "—"
    span = lambda xs: (f"{min(o.top_score for o in xs):.3f} – {max(o.top_score for o in xs):.3f}"
                       if xs else "—")
    current = "sin calibrar" if min_score is None else f"{min_score:.2f}"
    proposal = "—" if suggested is None else f"**{suggested:.2f}**"
    lines += [
        "", "## Umbral de `no_evidence`", "",
        "Si el 1.er resultado de una necesidad puntúa menos que el umbral, se responde como "
        f"sin evidencia. Para calcularlo solo cuentan las consultas con respuesta que la búsqueda "
        f"resuelve (algún esperado en el top-{K}); las demás son fallos de búsqueda.",
        "",
        "| | Valor |",
        "|---|---|",
        f"| 1.er resultado, con respuesta resueltas ({len(resolved)}) | {span(resolved)} |",
        f"| 1.er resultado, con respuesta no resueltas ({len(unresolved)}) | {span(unresolved)} |",
        f"| 1.er resultado, sin respuesta ({len(unanswered)}) | {span(unanswered)} |",
        f"| Umbral actual del modelo | {current} |",
        f"| Umbral que sugiere la regla | {proposal} |",
    ]
    for label, cut in (("actual", min_score), ("sugerido", suggested)):
        if cut is None or (label == "sugerido" and cut == min_score):
            continue
        blocked, leaked = threshold_errors(resolved + unanswered, cut)
        lines += [
            f"| Umbral {label}: resueltas bloqueadas (error grave) | "
            f"{len(blocked)}/{len(resolved)}: {', '.join(f'`{x}`' for x in blocked) or '—'} |",
            f"| Umbral {label}: sin respuesta que pasan | "
            f"{len(leaked)}/{len(unanswered)}: {', '.join(f'`{x}`' for x in leaked) or '—'} |",
        ]
    lines += ["", f"Fallos de búsqueda (no cuentan para el umbral): {ids(unresolved)}"]

    if len(goldens) > 1:
        by_set = {q.id: name for name, g in goldens for q in g.queries}
        lines += ["", "## Por conjunto (dato; las decisiones usan el conjunto combinado)", "",
                  f"| Conjunto | hit@{K} | MRR@{K} | Sin respuesta |", "|---|---|---|---|"]
        for name, g in goldens:
            part = summarize([o for o in outcomes if by_set[o.query_id] == name], K)
            no_answer = sum(1 for q in g.queries if not q.answerable)
            lines.append(f"| `{name}` | {part['hits']}/{part['n']} | {part['mrr']:.2f} "
                         f"| {no_answer} |")

    return "\n".join(lines) + "\n"


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="Mide la búsqueda contra uno o varios golden sets.")
    parser.add_argument("--golden", nargs="+", choices=sorted(GOLDEN_FILES),
                        default=[DEFAULT_GOLDEN], metavar="GOLDEN",
                        help="uno o varios golden sets del mismo catálogo; varios se miden como "
                             f"uno solo (opciones: {', '.join(sorted(GOLDEN_FILES))}; "
                             "por defecto: %(default)s)")
    parser.add_argument("--texto", choices=list(TEXT_VARIANTS),
                        help="variante del texto embebido; sin ella, la que usa la búsqueda")
    args = parser.parse_args(argv)
    fields = TEXT_VARIANTS[args.texto] if args.texto else TEXT_FIELDS

    try:
        goldens = load_goldens(args.golden)
    except ValueError as err:
        parser.error(str(err))
    names = [name for name, _ in goldens]
    source = goldens[0][1].source
    queries = [q for _, golden in goldens for q in golden.queries]
    spec = embeddings.model_spec()
    model = spec.name

    start = time.perf_counter()
    embeddings.embed_query("calentamiento")      # carga el modelo
    load_s = time.perf_counter() - start

    start = time.perf_counter()
    index = SearchIndex.build(source=source, fields=fields)   # el catálogo de los golden sets
    build_s = time.perf_counter() - start
    n_repos = len(index.repos)

    rows, outcomes, query_s = [], [], []
    for q in queries:
        start = time.perf_counter()
        results = index.search(q.query, k=n_repos)   # ranking completo
        query_s.append(time.perf_counter() - start)
        outcome = QueryOutcome(q.id,
                               expected_ranks([r.repo.full_name for r in results], q.expected),
                               results[0].score,)
        rows.append((q, results[:K], outcome))
        outcomes.append(outcome)

    summary = summarize(outcomes, K)
    at_5 = summarize(outcomes, 5)
    summary["hits_5"], summary["hit_rate_5"] = at_5["hits"], at_5["hit_rate"]
    times = {"load": load_s, "build": build_s, "query": sum(query_s) / len(query_s)}

    RESULTS_DIR.mkdir(exist_ok=True)
    suffix = f"-texto-{args.texto}" if args.texto else ""
    path = RESULTS_DIR / f"{report_name(names)}-{short(model).lower()}{suffix}.md"
    snapshot_at = catalog.snapshot_taken_at() if source == "snapshot" else None
    path.write_text(render_report(model, spec.min_score, goldens, n_repos,
                                  summary, times, rows, fields, args.texto, snapshot_at),
                    encoding="utf-8",)

    print(f"Modelo: {model} · golden set: {' '.join(names)} · catálogo: {source} ({n_repos} repos)")
    print(f"hit@{K}: {summary['hits']}/{summary['n']}  MRR@{K}: {summary['mrr']:.2f}  "
          f"recall@{K}: {summary['recall']:.0%}")
    suggested = suggest_min_score(outcomes, K)
    print(f"Umbral actual: {spec.min_score}  ·  sugerido por la regla: {suggested}")
    print(f"Reporte: {path}")


if __name__ == "__main__":
    main()
