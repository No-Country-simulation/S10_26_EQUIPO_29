"""Contrato: Asistente (pregunta y respuesta).

v1.0 · propuesta, pendiente de revisión con frontend.
Pregunta: la escribe el frontend, la lee la IA. Sin historial.
Respuesta: la escribe la IA, la lee la pantalla.
Regla fuera del modelo: todo full_name con valor debe existir en el catálogo y no estar
archivado (lo valida el código de la IA antes de responder).
Un fallo técnico no es un status: viaja como error del canal (HTTP 5xx).
"""
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, model_validator


class AssistantRequest(BaseModel):
    query: str = Field(min_length=20, max_length=2000)


class Component(BaseModel):
    """Una caja del mapa."""
    key: str                        # etiqueta local: "c1", "c2"...
    label: str
    role: str
    full_name: str | None = None    # del catálogo; None = "parte de tu app"
    rationale: str


class Connection(BaseModel):
    """Una flecha del mapa."""
    from_key: str
    to_key: str
    protocol: str                   # "OIDC", "REST", "JWT", "SQL"...
    description: str


class AssistantResponse(BaseModel):
    id: str
    status: Literal["ok", "needs_clarification", "no_evidence"]
    title: str | None = Field(default=None, max_length=80)  # "Un estudio de yoga, conectado."
    summary: str | None = None
    components: list[Component] = Field(default_factory=list, max_length=6)
    connections: list[Connection] = Field(default_factory=list)
    assumptions: list[str] = Field(default_factory=list)
    limitations: list[str] = Field(default_factory=list)
    clarification_questions: list[str] = Field(default_factory=list)
    generated_at: datetime

    @model_validator(mode="after")
    def check_consistency(self):
        if self.status == "ok" and not (self.summary and self.components):
            raise ValueError("status ok requiere summary y al menos un componente")
        if self.status == "needs_clarification" and not self.clarification_questions:
            raise ValueError("needs_clarification requiere preguntas")
        keys = {c.key for c in self.components}
        for conn in self.connections:
            if conn.from_key not in keys or conn.to_key not in keys:
                raise ValueError(f"conexión apunta a una caja inexistente: {conn}")
            if conn.from_key == conn.to_key:
                raise ValueError("una conexión no puede ir de una caja a sí misma")
        return self
