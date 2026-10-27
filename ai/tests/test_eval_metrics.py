"""Tests de las métricas de la búsqueda (sin modelo)."""

import pytest

from ai.eval.metrics import QueryOutcome, expected_ranks, summarize, threshold_errors


def test_posicion_de_cada_esperado():
    ranking = ["a/x", "b/y", "c/z"]
    assert expected_ranks(ranking, ["c/z", "d/w", "a/x"]) == (3, None, 1)


def test_rank_es_el_primer_esperado_que_aparece():
    assert QueryOutcome("q", (3, None, 2), 0.5).rank == 2
    assert QueryOutcome("q", (None,), 0.5).rank is None


def test_acierto_fuera_del_top_k_cuenta_cero():
    s = summarize([QueryOutcome("q", (4,), 0.5)], k=3)
    assert s["hits"] == 0 and s["mrr"] == 0.0 and s["recall"] == 0.0


def test_mrr_premia_la_posicion():
    s = summarize([QueryOutcome("a", (1,), 0.5), QueryOutcome("b", (2,), 0.5)], k=3)
    assert s["hit_rate"] == 1.0
    assert s["mrr"] == pytest.approx(0.75)    # (1 + 1/2) / 2


def test_recall_cuenta_todos_los_esperados():
    # Caso ZITADEL: keycloak 1.º, zitadel 5.º -> acierto, pero solo llegó la mitad.
    s = summarize([QueryOutcome("auth-sso", (1, 5), 0.5)], k=3)
    assert s["hit_rate"] == 1.0
    assert s["recall"] == 0.5


def test_consultas_sin_respuesta_no_cuentan():
    with_answer = [QueryOutcome("a", (1,), 0.5), QueryOutcome("b", (None,), 0.5)]
    without = [QueryOutcome("n", (), 0.5)]
    assert summarize(with_answer + without, k=3) == summarize(with_answer, k=3)


def test_sin_consultas_con_respuesta_falla():
    with pytest.raises(ValueError):
        summarize([QueryOutcome("n", (), 0.5)], k=3)


def test_umbral_separa_los_dos_errores():
    outcomes = [
        QueryOutcome("ok", (1,), 0.40),          # con respuesta, pasa
        QueryOutcome("bloqueada", (1,), 0.15),   # con respuesta, bloqueada (error grave)
        QueryOutcome("frenada", (), 0.10),       # sin respuesta, frenada
        QueryOutcome("se_cuela", (), 0.25),      # sin respuesta, pasa
    ]
    assert threshold_errors(outcomes, 0.20) == (["bloqueada"], ["se_cuela"])


def test_puntaje_igual_al_umbral_pasa():
    assert threshold_errors([QueryOutcome("borde", (1,), 0.20)], 0.20) == ([], [])
