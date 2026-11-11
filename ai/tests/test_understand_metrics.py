"""Tests de las métricas de entender (sin red)."""

import pytest

from ai import assistant
from ai.assistant import Understood
from ai.eval.assistant_cases import load_assistant_cases
from ai.eval.understand_metrics import (by_category, case_outcome, evidence_is_literal,
                                        query_length_ok, summarize, understood_from_answer)

CASES = {c.id: c for c in load_assistant_cases().cases}
REQUEST = "Quiero que mis clientes entren con Google y cobrarles una suscripción mensual."


def understood(needs=(), questions=(), problems_first=()):
    """Una respuesta de entender con los valores que importan para medir."""
    schema = assistant.understanding_schema()
    data = schema(needs=[{"category": c, "query": "cobro de suscripciones",
                          "evidence": "cobrar suscripciones"} for c in needs],
                  clarification_questions=list(questions))
    return Understood(data=data, attempts=1, problems_first=list(problems_first),
                      seconds=1.0, input_tokens=100, output_tokens=10)


@pytest.mark.parametrize("evidence, literal", [
    ("quiero que mis clientes entren con Google", True),   # otra mayúscula
    ("cobrarles una suscripción mensual.", True),          # punto final de más
    ("cobrar una suscripción", False),                     # parafraseado
    ("", False),
])
def test_evidencia_literal(evidence, literal):
    assert evidence_is_literal(evidence, REQUEST) is literal


@pytest.mark.parametrize("query, ok", [
    ("cobro de suscripciones", True),
    ("pagos", False),
    ("una consulta demasiado larga para buscar una herramienta de pagos", False),
])
def test_largo_de_la_consulta(query, ok):
    assert query_length_ok(query) is ok


def test_necesidad_inventada():
    o = case_outcome(CASES["una-pagos"], "fake", 1, understood(["payments", "auth"]))
    assert o.found == {"payments"}
    assert o.invented == {"auth"}
    assert not o.exact


@pytest.mark.parametrize("needs, questions, exact", [
    ([], ["¿Qué vende tu negocio?"], True),    # pregunta: bien
    (["ai"], [], False),                       # inventa un stack: mal
])
def test_pedido_vago(needs, questions, exact):
    o = case_outcome(CASES["vago-startup"], "fake", 1, understood(needs, questions))
    assert o.exact is exact


def test_resumen_separa_errores_del_proveedor():
    outcomes = [
        case_outcome(CASES["una-pagos"], "fake", 1, understood(["payments"])),
        case_outcome(CASES["una-pagos"], "fake", 2, understood(["payments", "auth"])),
        case_outcome(CASES["una-pagos"], "fake", 3, None, error="LLMTimeout"),
    ]
    summary = summarize(outcomes)
    assert summary["errors"] == 1
    assert summary["recall"] == 1.0          # payments encontrado en las 2 válidas
    assert summary["invented"] == 1          # auth, una vez
    assert summary["exact"] == 0.5
    assert summary["consistency"] == 0.0     # las 2 corridas válidas difieren


def test_por_categoria_por_corrida():
    outcomes = [
        case_outcome(CASES["una-pagos"], "fake", 1, understood(["payments", "auth"])),
        case_outcome(CASES["una-pagos"], "fake", 2, understood(["auth"])),
        case_outcome(CASES["una-pagos"], "fake", 3, None, error="LLMTimeout"),
        case_outcome(CASES["vago-startup"], "fake", 1, understood(["ai"])),
    ]
    table = by_category(outcomes)
    assert table["payments"] == {1: (1, 1, 0), 2: (0, 1, 0)}   # sin la corrida con error
    assert table["auth"] == {1: (0, 0, 1), 2: (0, 0, 1)}       # de más en las dos
    assert "ai" not in table                                   # los vagos se miden aparte


def answer(understood_, error=None):
    """Lo que guarda el JSON de un reporte para una llamada."""
    return {"provider": "fake", "run": 1, "case": "una-pagos", "error": error,
            "data": understood_.data.model_dump() if understood_ and understood_.data else None,
            "problems_first": understood_.problems_first if understood_ else [],
            "problems_final": understood_.problems_final if understood_ else [],
            "seconds": 1.0, "input_tokens": 100, "output_tokens": 10, "waited": 0.0}


def test_respuesta_guardada_se_puntua_igual():
    original = understood(["payments", "auth"], problems_first=["hay categorías repetidas"])
    again = understood_from_answer(answer(original))
    case = CASES["una-pagos"]
    assert case_outcome(case, "fake", 1, again) == case_outcome(case, "fake", 1, original)


def test_respuesta_guardada_con_error():
    assert understood_from_answer(answer(None, error="LLMTimeout: sin respuesta")) is None
