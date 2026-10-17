"""Esquema de un repo del catálogo de OpenBridge.

Es el borrador del contrato entre la IA y la ingesta: describe la forma que
tiene un repo y qué se puede dar por seguro al leerlo.
"""

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

# Las seis categorías funcionales del brief. Una sola fuente de verdad:
# B1 y B2 reutilizarán este mismo tipo.
Categoria = Literal["Auth", "DB", "Payments", "AI", "Analytics", "Search"]


class Repo(BaseModel):
    """Un repo de código abierto del catálogo."""

    # Rechaza campos que no están definidos aquí (ver explicación abajo).
    model_config = ConfigDict(extra="forbid")

    # --- Identidad ---
    repo_id: str = Field(
        pattern=r"^[^/\s]+/[^/\s]+$",
        description="'owner/name' (full_name de GitHub). Es el id con el que se cita el repo.",
    )
    github_id: int = Field(
        gt=0,
        description="id numérico de GitHub. No cambia si el repo se renombra.",
    )

    # --- Para encontrarlo (B1) ---
    description: str | None = Field(
        default=None,
        description="Opcional por ahora; pendiente de acordar con Jeison.",
    )
    topics: list[str] = Field(default_factory=list)
    categories: list[Categoria] = Field(
        min_length=1,
        description="Una o más categorías de la lista oficial. En B0 se asignan a mano.",
    )

    # --- Para filtrarlo y justificarlo (B1/B2) ---
    language: str | None = None
    license: str | None = Field(
        default=None,
        description="SPDX, p. ej. 'Apache-2.0'. Puede faltar o ser 'NOASSERTION'.",
    )
    stars: int = Field(ge=0)
    pushed_at: datetime
    open_issues: int = Field(
        ge=0,
        description="Ojo: GitHub cuenta issues Y pull requests abiertos.",
    )
    archived: bool

    # --- Otras partes del sistema ---
    readme_path: str | None = Field(
        default=None,
        description="Ruta al README dentro de ai/data/readmes/.",
    )
    health_score: float | None = Field(
        default=None,
        description="Lo calcula la ingesta. Rango por acordar con Jeison.",
    )
