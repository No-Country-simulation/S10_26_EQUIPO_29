"""Valida el golden set de la búsqueda (ai/eval/search_queries.json)."""

from collections import defaultdict

import pytest

from ai.catalog import load_raw
from ai.eval.golden import SearchGoldenSet, load_search_queries


@pytest.fixture(scope="module")
def golden() -> SearchGoldenSet:
    return load_search_queries()


def test_ids_unicos(golden):
    ids = [q.id for q in golden.queries]
    assert len(ids) == len(set(ids))


def test_esperados_existen_en_el_catalogo(golden):
    # Un nombre mal escrito haría fallar esa consulta para siempre, en silencio.
    catalog = {r["full_name"] for r in load_raw()}
    for q in golden.queries:
        missing = set(q.expected) - catalog
        assert not missing, f"{q.id}: {missing} no está en el catálogo"


def test_hay_consultas_con_y_sin_respuesta(golden):
    # Sin respuesta: necesarias para calibrar el umbral de no_evidence.
    assert any(q.answerable for q in golden.queries)
    assert any(not q.answerable for q in golden.queries)


def test_pares_completos_y_distintos(golden):
    # Un par mide que la búsqueda diferencia: dos consultas, listas distintas.
    pairs = defaultdict(list)
    for q in golden.queries:
        if q.pair:
            pairs[q.pair].append(q)
    for name, qs in pairs.items():
        assert len(qs) == 2, f"par {name}: {len(qs)} consultas"
        assert set(qs[0].expected) != set(qs[1].expected), f"par {name}: mismas respuestas"
