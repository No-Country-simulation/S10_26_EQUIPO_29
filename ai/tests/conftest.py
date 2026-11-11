"""Común a los tests de ai/."""

import pytest

from ai import examples


@pytest.fixture(autouse=True)
def sin_ejemplos_de_entender(monkeypatch):
    """Sin modelo de embeddings en los tests: el banco no devuelve ejemplos salvo que el
    test reemplace examples.similar."""
    monkeypatch.setattr(examples, "similar", lambda request, k: [])
