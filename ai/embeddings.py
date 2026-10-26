"""Embeddings de texto con un modelo local (Qwen3-Embedding-0.6B).

Cambiar el modelo de embeddings solo toca este archivo.
Cambiar el modelo obliga a recalcular los vectores de todo el catálogo.
"""

from functools import lru_cache

import numpy as np
import torch
from sentence_transformers import SentenceTransformer

MODEL_NAME = "Qwen/Qwen3-Embedding-0.6B"

# El modelo recomienda agregar la instrucción a la consulta y en inglés.
# Los documentos se embeben sin instrucción
QUERY_INSTRUCTION = (
    "Given a description of a software project or business need, "
    "retrieve open-source tools that fit it"
)
QUERY_PROMPT = f"Instruct: {QUERY_INSTRUCTION}\nQuery:"


@lru_cache(maxsize=1)
def _model() -> SentenceTransformer:
    """Carga del modelo la primera vez; luego reutiliza el mismo."""
    # float32: en CPU, bfloat16 (default) es lento e impreciso.
    return SentenceTransformer(
        MODEL_NAME,
        processor_kwargs={"padding_side": "left"},
        model_kwargs={"dtype": torch.float32},
        )


def embed_documents(texts: list[str]) -> np.ndarray:
    """Vectores de los documentos normalizados: (len(texts), 1024)."""

    return _model().encode(texts, normalize_embeddings=True, convert_to_numpy=True)


def embed_query(text: str) -> np.ndarray:
    """Vector de una consulta normalizado (con instrucción): (1024,)."""
    return _model().encode(
        text, prompt=QUERY_PROMPT, normalize_embeddings=True, convert_to_numpy=True
    )
