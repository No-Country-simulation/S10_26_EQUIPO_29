"""Carga los repos del catálogo, validados segun el contrato `Repo`
(shared/contracts/repo.py)

Punto de acceso único a los datos: para cambiar de origen solo se
toca este archivo

Datos de ejemplo:
    ai/data/repos.json                  metadatos de cada repo, sin el README
    ai/data/readmes/<owner>__<name>.md  README de cada repo
"""

import json
from pathlib import Path

from shared.contracts.repo import Repo, Category, CategoryList

DATA_DIR = Path(__file__).resolve().parent / "data"
REPOS_FILE = DATA_DIR / "repos.json"
README_DIR = DATA_DIR / "readmes"
CATEGORIES_FILE = Path(__file__).resolve().parents[1] / "shared" / "contracts" / "categories.json"


def readme_file(full_name: str) -> Path:
    """Ruta del README de un repo"""
    return README_DIR / f"{full_name.replace('/', '__')}.md"


def load_raw() -> list[dict]:
    """Contenido de repos.json raw, sin validar y sin README."""
    return json.loads(REPOS_FILE.read_text(encoding="utf-8"))


def load_repos() -> list[Repo]:
    """Devuelve los repos del catálogo con su README, validados contra `Repo`.

    Si un repo no cumple el contrato, lanza `pydantic.ValidationError`
    Si un repo no tiene archivo de README, queda con readme_text = None.
    """
    repos = []
    for raw in load_raw():
        path = readme_file(raw["full_name"])
        # read_text convierte saltos de linea de Windows para que el texto
        # quede igual en cualquier sistema operativo.
        readme = path.read_text(encoding="utf-8") if path.is_file() else None
        repos.append(Repo.model_validate({**raw, "readme_text": readme}))
    return repos

def load_categories() -> dict[str, Category]:
    """Devuelve las categorías por `id`

    Arroja `pydantic.ValidationError` si el archivo no cumple `CategoryList`.
    """
    data = CategoryList.model_validate_json(CATEGORIES_FILE.read_bytes())
    return {c.id: c for c in data.categories}

