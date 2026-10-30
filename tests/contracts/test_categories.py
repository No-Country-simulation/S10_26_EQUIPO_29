"""Reglas de la lista de categorías (shared/contracts/categories.json).

Correr desde la raíz del repo:
    python -m pytest tests/contracts -v
"""
import re
from pathlib import Path

import pytest

from shared.contracts.repo import CategoryList

CATEGORIES_FILE = Path(__file__).resolve().parents[2] / "shared" / "contracts" / "categories.json"
MIN_CHARS = 50
ID_EN_PARENTESIS = re.compile(r"\(([a-z][a-z0-9-]*)\)")


@pytest.fixture(scope="module")
def category_list() -> CategoryList:
    return CategoryList.model_validate_json(CATEGORIES_FILE.read_bytes())


def test_textos_con_contenido(category_list):
    # El LLM clasifica solo con estos textos: uno vacío o muy corto no le sirve.
    cortos = [f"{c.id}.{campo}"
              for c in category_list.categories
              for campo in ("description", "llm_notes")
              if len(getattr(c, campo).strip()) < MIN_CHARS]
    assert not cortos, f"Textos con menos de {MIN_CHARS} caracteres: {cortos}"


def test_description_sin_negaciones(category_list):
    # description entra en el texto que se convierte en vector para la búsqueda.
    # Un embedding no distingue la negación: "No incluye: email" acercaría la
    # categoría al email. Las exclusiones van en llm_notes.
    con_negacion = [c.id for c in category_list.categories
                    if "no incluye" in c.description.lower()]
    assert not con_negacion, f"description con 'No incluye' (va en llm_notes): {con_negacion}"


def test_fronteras_apuntan_a_ids_existentes(category_list):
    # En llm_notes, "(id)" indica a qué categoría va lo que se excluye.
    ids = {c.id for c in category_list.categories}
    rotas = [f"{c.id} → ({ref})"
             for c in category_list.categories
             for ref in ID_EN_PARENTESIS.findall(c.llm_notes)
             if ref not in ids]
    assert not rotas, f"Fronteras que apuntan a categorías inexistentes: {rotas}"
