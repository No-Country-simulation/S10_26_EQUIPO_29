"""Contrato: Asistente (pregunta y respuesta). v1.1

Pregunta: la escribe el frontend, la lee la IA. Sin historial.
Respuesta: la escribe la IA, la lee la pantalla.

Antes de responder, la IA valida la respuesta con este modelo y comprueba que
todo full_name exista en el catálogo y no esté archivado.
Un fallo técnico no es un status: es un error HTTP con cuerpo ErrorResponse.
"""
from typing import Literal, Annotated

from pydantic import BaseModel, Field, model_validator, AwareDatetime, StringConstraints

# Texto con contenido: se quitan los espacios de los extremos y debe quedar algo.
TextoNoVacio = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]
Titulo = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=80)]


class AssistantRequest(BaseModel):
    query: str = Field(min_length=20, max_length=2000)


class Component(BaseModel):
    """Una caja del mapa."""
    key: str                        # "c1", "c2"... única en la respuesta
    label: TextoNoVacio
    role: TextoNoVacio
    full_name: str | None = None    # del catálogo. None = "parte de tu app"
    rationale: TextoNoVacio


class Connection(BaseModel):
    """Una flecha del mapa."""
    from_key: str
    to_key: str
    protocol: str                   # "OIDC", "REST", "JWT", "SQL"...
    description: str


class AssistantResponse(BaseModel):
    id: str
    status: Literal["ok", "needs_clarification", "no_evidence"]
    title: Titulo | None = None  # "Un estudio de yoga, conectado."
    summary: TextoNoVacio | None = None
    components: list[Component] = Field(default_factory=list, max_length=6)
    connections: list[Connection] = Field(default_factory=list)
    assumptions: list[TextoNoVacio] = Field(default_factory=list)
    limitations: list[TextoNoVacio] = Field(default_factory=list)
    clarification_questions: list[TextoNoVacio] = Field(default_factory=list)
    generated_at: AwareDatetime

    @model_validator(mode="after")
    def check_consistency(self):
        if self.status == "ok" and not (self.summary and self.components):
            raise ValueError("status ok requiere summary y al menos un componente")
        if self.status == "needs_clarification" and not self.clarification_questions:
            raise ValueError("needs_clarification requiere preguntas")
        if self.status == "no_evidence" and not self.summary:
            raise ValueError("no_evidence requiere summary")
        keys = [c.key for c in self.components]
        if len(keys) != len(set(keys)):
            raise ValueError("key repetida entre componentes")
        for conn in self.connections:
            if conn.from_key not in keys or conn.to_key not in keys:
                raise ValueError(f"conexión apunta a una caja inexistente: {conn}")
            if conn.from_key == conn.to_key:
                raise ValueError("una conexión no puede ir de una caja a sí misma")
        return self


class ErrorDetail(BaseModel):
    code: Literal["invalid_query", "invalid_response", "provider_unavailable", "timeout"]
    message: str


class ErrorResponse(BaseModel):
    """Cuerpo de un error del asistente.

    422 invalid_query           la pregunta no cumple AssistantRequest
    502 invalid_response        la IA no logró una respuesta válida
    503 provider_unavailable    el proveedor del modelo no responde
    504 timeout                 la IA no respondió en ~15s (el frontend espera 20s)
    """
    error: ErrorDetail
