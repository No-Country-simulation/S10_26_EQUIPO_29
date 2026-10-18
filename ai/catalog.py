"""Carga los repos del catálogo, validados contra el esquema `Repo` de ai/schemas.py.

Punto de acceso a los datos: para cambiar de origen solo se toca este archivo.
"""

from pathlib import Path

from pydantic import TypeAdapter

from ai.schemas import Repo

# Carpeta ai/data/ que contiene los datos de ejemplo y los readmes.
# Para que funcione sin importar desde dónde se ejecuta el código.
DATA_DIR = Path(__file__).resolve().parent / "data"
REPOS_FILE = DATA_DIR / "repos.json"

# Validador de Pydantic para la lista de repos
_REPO_LIST = TypeAdapter(list[Repo])

def load_repos() -> list[Repo]:
    """Devuelve los repos del catálogo validados contra `Repo`.

    Si algún repo no cumple el esquema o el JSON está mal formado,
    lanza `pydantic.ValidationError`.
    """
    return _REPO_LIST.validate_json(REPOS_FILE.read_bytes())

