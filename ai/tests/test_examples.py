"""Tests del banco de ejemplos de entender (ai/examples.py)."""

import math
import os
import re

import numpy as np
import pytest

from ai import embeddings, examples
from ai.assistant import evidence_is_literal
from ai.catalog import load_categories
from ai.eval.assistant_cases import CASE_FILES, load_assistant_cases

BANK = examples.load_bank().examples
SIMILAR = examples.similar  # la función real, aunque un test reemplace examples.similar
EVAL = [(name, case) for name, path in CASE_FILES.items()
        for case in load_assistant_cases(path).cases]
# El mismo pedido escrito de dos formas: fijan desde qué parecido dos pedidos son casi iguales.
SAME_REQUEST = [("pantalla-saas-corto", "pantalla-saas-largo"),
                ("pantalla-rag-corto", "pantalla-rag-largo"),
                ("pantalla-api-corto", "pantalla-api-largo")]


def plain(text: str) -> str:
    return re.sub(r"\W+", " ", text.lower()).strip()


def test_banco_valido():
    categories = load_categories()
    assert len({e.id for e in BANK}) == len(BANK), "id repetido"
    for example in BANK:
        found = [n.category for n in example.needs]
        assert len(found) == len(set(found)), f"{example.id}: categoría repetida"
        for need in example.needs:
            assert need.category in categories, f"{example.id}: {need.category}"
            assert evidence_is_literal(need.evidence, example.query), f"{example.id}: {need.evidence}"


def test_banco_no_comparte_pedidos_con_la_evaluacion():
    eval_ids = {case.id for _, case in EVAL}
    eval_texts = {plain(case.query) for _, case in EVAL}
    for example in BANK:
        assert example.id not in eval_ids, example.id
        assert plain(example.query) not in eval_texts, example.id


def test_similar_devuelve_los_k_mas_parecidos_en_orden(monkeypatch):
    vectors = {e.query: np.eye(len(BANK))[i] for i, e in enumerate(BANK)}
    near = 0.9 * vectors[BANK[2].query] + 0.4 * vectors[BANK[0].query]
    monkeypatch.setattr(embeddings, "embed_similar",
                        lambda texts: np.array([vectors.get(t, near) for t in texts]))
    examples._bank_vectors.cache_clear()
    try:
        assert [e.id for e in SIMILAR("un pedido nuevo", 2)] == [BANK[2].id, BANK[0].id]
    finally:
        examples._bank_vectors.cache_clear()


def test_preload_calcula_el_banco_una_vez_y_similar_lo_reutiliza(monkeypatch):
    calls = []                                    # cuántos textos recibe cada llamada al modelo

    def fake_embed(texts):
        calls.append(len(texts))
        return np.ones((len(texts), 3))

    monkeypatch.setattr(embeddings, "embed_similar", fake_embed)
    examples._bank_vectors.cache_clear()
    try:
        examples.preload()                        # arranque: el banco completo
        SIMILAR("un pedido nuevo", 2)             # primer pedido: solo su propio vector
        examples.preload()                        # una recarga del catálogo: nada nuevo
        assert calls == [len(BANK), 1]
    finally:
        examples._bank_vectors.cache_clear()


def test_similar_avisa_en_el_log_si_el_calculo_es_lento(monkeypatch, caplog):
    monkeypatch.setattr(embeddings, "embed_similar", lambda texts: np.ones((len(texts), 3)))
    monkeypatch.setattr(examples, "SLOW_SECONDS", -1.0)   # cualquier tiempo cuenta como lento
    examples._bank_vectors.cache_clear()
    try:
        SIMILAR("un pedido nuevo", 1)
    finally:
        examples._bank_vectors.cache_clear()
    assert "vector del pedido calculado en" in caplog.text


# --- Con el modelo real (AI_MODEL_TESTS=1) ---

model_tests = pytest.mark.skipif(
    os.environ.get("AI_MODEL_TESTS") != "1",
    reason="usa el modelo real (~1,2 GB); correr con AI_MODEL_TESTS=1",
)


@model_tests
def test_ningun_ejemplo_es_casi_igual_a_un_caso_de_evaluacion():
    E = embeddings.embed_similar([case.query for _, case in EVAL])
    B = embeddings.embed_similar([e.query for e in BANK])
    index = {case.id: i for i, (_, case) in enumerate(EVAL)}
    same = [float(E[index[a]] @ E[index[b]]) for a, b in SAME_REQUEST]
    threshold = math.floor(min(same) * 100) / 100
    scores = B @ E.T
    too_close = [f"{BANK[k].id} – {EVAL[j][0]}/{EVAL[j][1].id}: {scores[k, j]:.3f}"
                 for k, j in zip(*np.nonzero(scores >= threshold))]
    assert not too_close, f"umbral {threshold:.2f}: " + "; ".join(too_close)
