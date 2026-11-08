"""Pares por juzgar cuando el catálogo crece (pooling).

Consultas de los golden sets del snapshot: los repos nuevos que aparecen arriba en alguna
de las dos variantes de texto. Necesidades de los casos del asistente: los repos nuevos de
su categoría. Escribe la lista en Markdown para juzgarla con la evidencia de GitHub; no
cambia ningún conjunto.

Uso, desde la raíz del repo:
    git show <commit>:ai/data/catalog/repos.json > anterior.json
    python -m ai.eval.pool --anterior anterior.json --salida pares.md
"""

import argparse
import json
from datetime import date
from pathlib import Path

from ai import embeddings
from ai.catalog import load_repos
from ai.eval.assistant_cases import CASE_FILES, load_assistant_cases
from ai.eval.golden import GOLDEN_FILES, load_search_queries
from ai.search import TEXT_FIELDS, TEXT_VARIANTS, SearchIndex

DEPTH_ANSWERABLE = 10   # puestos que entran al pozo en consultas con respuesta
DEPTH_UNANSWERED = 20   # más hondo en las sin respuesta: son las que más cambian con repos nuevos
# Las dos variantes de texto arman el pozo: si lo armara una sola, la otra quedaría en desventaja.
VARIANTS = {"actual": TEXT_FIELDS, "base": TEXT_VARIANTS["base"]}

Row = tuple[str, str, list[str], list[str]]   # id, consulta o pedido, aceptables hoy, pozo


def query_pool(rankings: dict[str, list[str]], expected: list[str], new: set[str],
               depth: int) -> list[str]:
    """Repos nuevos en el top-`depth` de alguna variante que no están en `expected`.

    Ordenados por nombre y sin el puesto: el juicio sale de la evidencia, no de la búsqueda.
    """
    found = {name for ranking in rankings.values() for name in ranking[:depth]}
    return sorted(name for name in found if name in new and name not in expected)


def need_pool(category: str, acceptable: list[str], new_categories: dict[str, set[str]]) -> list[str]:
    """Repos nuevos con esa categoría (principal o secundaria) que no están entre los aceptables."""
    return sorted(name for name, cats in new_categories.items()
                  if category in cats and name not in acceptable)


def render(sections: list[tuple[str, list[Row]]], new_repos: list) -> str:
    lines = ["# Pares por juzgar", "",
             f"Generado con `python -m ai.eval.pool` el {date.today()}. "
             f"{len(new_repos)} repos nuevos frente al catálogo anterior.", "",
             "Juicio: sí / no / dudoso. Evidencia: cita de la descripción, los topics o el "
             "README del repo (no del resumen de la IA).", ""]
    for title, rows in sections:
        pairs = [(row, repo) for row in rows for repo in row[3]]
        lines += [f"## {title}", "",
                  f"{len(pairs)} pares · {sum(1 for r in rows if not r[3])} de {len(rows)} sin pares.", ""]
        if pairs:
            lines += ["| Id | Consulta o pedido | Aceptables hoy | Repo nuevo | Juicio | Evidencia |",
                      "|---|---|---|---|---|---|"]
            lines += [f"| `{row[0]}` | {row[1]} | {', '.join(row[2]) or '(ninguno)'} | {repo} | | |"
                      for row, repo in pairs]
            lines.append("")
    lines += ["## Repos nuevos (datos de GitHub)", "",
              "| Repo | Descripción | Topics | Licencia |", "|---|---|---|---|"]
    lines += [f"| {r.full_name} | {r.description or '—'} | {', '.join(r.topics) or '—'} "
              f"| {r.license_spdx_id or '—'} |" for r in sorted(new_repos, key=lambda r: r.full_name)]
    return "\n".join(lines) + "\n"


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="Lista los pares por juzgar cuando crece el catálogo.")
    parser.add_argument("--anterior", type=Path, required=True,
                        help="repos.json del catálogo para el que se escribieron las etiquetas")
    parser.add_argument("--salida", type=Path, required=True, help="archivo Markdown a escribir")
    args = parser.parse_args(argv)

    previous = {r["github_id"] for r in json.loads(args.anterior.read_text(encoding="utf-8"))}
    repos = load_repos("snapshot")
    new_repos = [r for r in repos if r.github_id not in previous]
    if not new_repos:
        parser.exit(message="No hay repos nuevos frente al catálogo anterior: nada que juzgar.\n")
    new = {r.full_name for r in new_repos}
    new_categories = {r.full_name: {c.category_id for c in r.categories} for r in new_repos}

    indexes = {v: SearchIndex.from_repos(repos, fields) for v, fields in VARIANTS.items()}
    sections: list[tuple[str, list[Row]]] = []
    for name in GOLDEN_FILES:
        golden = load_search_queries(name)
        if golden.source != "snapshot":
            continue
        rows = []
        for q in golden.queries:
            vector = embeddings.embed_query(q.query)
            rankings = {v: [r.repo.full_name for r in index.search_vector(vector, k=len(repos))]
                        for v, index in indexes.items()}
            depth = DEPTH_ANSWERABLE if q.answerable else DEPTH_UNANSWERED
            rows.append((q.id, q.query, q.expected, query_pool(rankings, q.expected, new, depth)))
        sections.append((f"Búsqueda · `{name}` v{golden.version}", rows))
    for name, path in CASE_FILES.items():
        case_set = load_assistant_cases(path)
        rows = [(f"{c.id} · {n.category}", c.query, n.acceptable,
                 need_pool(n.category, n.acceptable, new_categories))
                for c in case_set.cases for n in c.needs]
        sections.append((f"Asistente · `{name}` v{case_set.version}", rows))

    args.salida.write_text(render(sections, new_repos), encoding="utf-8")
    total = sum(len(row[3]) for _, rows in sections for row in rows)
    print(f"Repos nuevos: {len(new_repos)} · pares por juzgar: {total}")
    print(f"Lista: {args.salida}")


if __name__ == "__main__":
    main()
