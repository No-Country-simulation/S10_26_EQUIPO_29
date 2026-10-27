"""Tests de las métricas de la búsqueda (sin modelo)."""

import pytest

from ai.eval.metrics import QueryOutcome, first_hit_rank, summarize


def test_primer_acierto_es_el_primero_que_aparece():
    ranking = ["a/x", "b/y", "c/z"]
    assert first_hit_rank(ranking, ["c/z", "b/y"]) == 2
    assert first_hit_rank(ranking, ["d/w"]) is None


def test_acierto_fuera_del_top_k_cuenta_cero():
    s = summarize([QueryOutcome("q", True, 4)], k=3)
    assert s["hits"] == 0 and s["mrr"] == 0.0


def test_mrr_premia_la_posicion():
    s = summarize([QueryOutcome("a", True, 1), QueryOutcome("b", True, 2)], k=3)
    assert s["hit_rate"] == 1.0
    assert s["mrr"] == pytest.approx(0.75)    # (1 + 1/2) / 2


def test_consultas_sin_respuesta_no_cuentan():
    with_answer = [QueryOutcome("a", True, 1), QueryOutcome("b", True, None)]
    without = [QueryOutcome("n", False, None)]
    assert summarize(with_answer + without, k=3) == summarize(with_answer, k=3)


def test_sin_consultas_con_respuesta_falla():
    with pytest.raises(ValueError):
        summarize([QueryOutcome("n", False, None)], k=3)
