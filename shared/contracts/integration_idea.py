"""Contrato: Idea de integración.

v1.0 · propuesta, pendiente de revisión con frontend. El contenido de la idea puede
cambiar al construir las ideas.
Escribe: la IA (borrador); una persona la revisa (reviewed_at).
Lee: el frontend (ficha).
Reglas fuera del modelo: 1–3 ideas por herramienta; sin README o archivada → sin ideas;
nunca sobrescribir una idea revisada.
"""
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, HttpUrl, model_validator

# Criterios de dificultad (van en el prompt):
#   low    = solo configuración, sin código propio (< 1 h)
#   medium = configuración + código de integración en una parte (~1 día)
#   high   = cambia la infraestructura o toca varios servicios


class IntegrationIdea(BaseModel):
    id: str
    full_name: str                          # el repo al que pertenece ("owner/name")
    title: str = Field(max_length=120)
    integration_type: Literal["rest_api", "docker", "sdk", "webhook"]
    summary: str = Field(max_length=300)
    compatible_stack: list[str] = Field(min_length=1)
    dependencies: list[str] = Field(default_factory=list)
    difficulty: Literal["low", "medium", "high"]
    triggers: list[str] = Field(default_factory=list)
    snippet: str | None = None              # solo si sale del README/docs; si no, None
    snippet_language: str | None = None
    docs_url: HttpUrl                       # sin fuente, no se publica
    generated_by: Literal["llm", "human"]
    reviewed_at: datetime | None = None     # None = borrador ("sugerido por IA")
    based_on_hash: str                      # huella de entrada de la IA (ai_input_hash) al generar

    @model_validator(mode="after")
    def snippet_needs_language(self):
        if self.snippet and not self.snippet_language:
            raise ValueError("snippet sin snippet_language")
        return self
