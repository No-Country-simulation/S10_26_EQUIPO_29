"""Valida los datos de ejemplo de la IA (ai/data/) contra el esquema `Repo`.

Correr desde la raíz del repo, con el entorno activo:
    python -m pytest ai/tests -v
"""

from typing import get_args

import pytest

from ai.catalog import DATA_DIR, load_repos
from ai.schemas import Categoria, Repo


@pytest.fixture(scope="module")
def repos() -> list[Repo]:
    """Carga de los repos del catálogo."""
    return load_repos()


def test_datos_cumplen_el_esquema():
    # Si algún repo no cumple o JSON mal formado, Pydantic lanza ValidationError
    # y el test falla mostrando todos los errores.
    load_repos()


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
