"""Valida los datos de ejemplo de la IA (ai/data/) contra el esquema `Repo`.

Correr desde la raíz del repo, con el entorno activo:
    python -m pytest ai/tests -v
"""

import json
from pathlib import Path
from typing import get_args

import pytest
from pydantic import TypeAdapter

from ai.schemas import Categoria, Repo

DATA_DIR = Path(__file__).resolve().parents[1] / "data"
REPO_LIST = TypeAdapter(list[Repo])


@pytest.fixture(scope="module")
def raw_repos() -> list[dict]:
    """Contenido de repos.json tal cual, sin validar."""
    return json.loads((DATA_DIR / "repos.json").read_text(encoding="utf-8"))


@pytest.fixture(scope="module")
def repos(raw_repos) -> list[Repo]:
    """Los mismos datos, ya validados como objetos `Repo`."""
    return REPO_LIST.validate_python(raw_repos)


def test_datos_cumplen_el_esquema(raw_repos):
    # Si algún repo no cumple, Pydantic lanza ValidationError y el test falla
    # mostrando todos los errores.
    REPO_LIST.validate_python(raw_repos)


def test_cantidad_de_repos(repos):
    assert 15 <= len(repos) <= 20, f"Hay {len(repos)} repos; se esperan 15–20"


def test_ids_unicos(repos):
    # El asistente solo puede citar repos del catálogo, y para comprobarlo
    # cada repo_id tiene que identificar un solo repo.
    repo_ids = [r.repo_id for r in repos]
    github_ids = [r.github_id for r in repos]
    assert len(repo_ids) == len(set(repo_ids)), "repo_id duplicado"
    assert len(github_ids) == len(set(github_ids)), "github_id duplicado"


def test_cubre_todas_las_categorias(repos):
    presentes = {c for r in repos for c in r.categories}
    faltan = set(get_args(Categoria)) - presentes
    assert not faltan, f"Categorías sin ningún repo: {sorted(faltan)}"


def test_readmes_existen(repos):
    # En los datos de ejemplo todos los repos deben tener su README guardado.
    sin_readme = [
        r.repo_id
        for r in repos
        if r.readme_path is None or not (DATA_DIR / r.readme_path).is_file()
    ]
    assert not sin_readme, f"Repos sin README en ai/data/: {sin_readme}"
