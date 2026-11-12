"""Banco de pedidos ya etiquetados que el paso de entender recibe como ejemplos.

Para cada pedido se eligen los más parecidos del banco con el modelo de embeddings
(instrucción para comparar textos del mismo tipo). El banco nunca comparte pedidos con
los conjuntos de evaluación: lo comprueba ai/tests/test_examples.py.
"""

from functools import lru_cache
from pathlib import Path

import numpy as np
from pydantic import BaseModel, ConfigDict, Field

from ai import embeddings

EXAMPLES_FILE = Path(__file__).resolve().parent / "data" / "understand_examples.json"


class ExampleNeed(BaseModel):
    model_config = ConfigDict(extra="forbid")
    category: str
    evidence: str               # frase literal del pedido que la justifica


class Example(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: str
    query: str
    needs: list[ExampleNeed] = Field(min_length=1)


class ExampleBank(BaseModel):
    model_config = ConfigDict(extra="forbid")
    version: int
    note: str
    examples: list[Example]


@lru_cache(maxsize=1)
def load_bank() -> ExampleBank:
    return ExampleBank.model_validate_json(EXAMPLES_FILE.read_bytes())


@lru_cache(maxsize=1)
def _bank_vectors() -> np.ndarray:
    """Se calculan la primera vez que se piden ejemplos (o con preload) y quedan en memoria."""
    return embeddings.embed_similar([e.query for e in load_bank().examples])


def preload() -> None:
    """Calcula ahora los vectores del banco. El servicio lo hace al arrancar: si no, los paga el
    primer pedido dentro de su presupuesto de tiempo (unos 4 s en una laptop, varias veces más
    en un servidor con menos CPU)."""
    _bank_vectors()


def similar(request: str, k: int) -> list[Example]:
    """Los k pedidos del banco más parecidos al pedido, del más parecido al menos."""
    scores = _bank_vectors() @ embeddings.embed_similar([request])[0]
    order = np.argsort(-scores, kind="stable")[:k]
    return [load_bank().examples[i] for i in order]
