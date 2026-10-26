"""Golden set de la búsqueda: consultas con los repos que deberían aparecer."""

from pathlib import Path

from pydantic import BaseModel, ConfigDict, Field

EVAL_DIR = Path(__file__).resolve().parent
SEARCH_QUERIES_FILE = EVAL_DIR / "search_queries.json"


class SearchQuery(BaseModel):
    """Una consulta y los repos aceptables".

    `expected` vacío significa que el catálogo no tiene respuesta.
    """
    model_config = ConfigDict(extra="forbid")

    id: str = Field(min_length=1)
    query: str = Field(min_length=1)
    expected: list[str]
    pair: str | None = None
    note: str = Field(min_length=1)

    @property
    def answerable(self) -> bool:
        return bool(self.expected)


class SearchGoldenSet(BaseModel):
    model_config = ConfigDict(extra="forbid")

    version: int
    queries: list[SearchQuery]


def load_search_queries() -> SearchGoldenSet:
    """Carga y valida el golden set. Lanza `ValidationError` si no cumple"""
    return SearchGoldenSet.model_validate_json(SEARCH_QUERIES_FILE.read_bytes())
