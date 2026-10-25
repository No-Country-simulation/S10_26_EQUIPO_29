"""Contrato: Idea de integración. v1.1

Escribe: la IA (borrador); una persona la revisa (reviewed_at).
Lee: el frontend (ficha de la herramienta).

Reglas fuera del modelo: 1–3 ideas por herramienta; sin README o archivada → sin ideas;
nunca sobrescribir una idea revisada.
"""
from datetime import datetime
from typing import Annotated, Literal

from pydantic import BaseModel, Field, HttpUrl, model_validator, StringConstraints

# Criterios de dificultad (van en el prompt):
#   low    = solo configuración, sin código propio (< 1 h)
#   medium = configuración + código de integración en una parte (~1 día)
#   high   = cambia la infraestructura o toca varios servicios

NombreCorto = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=40)]
FraseCorta = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=80)]


class IntegrationIdea(BaseModel):
    id: str
    full_name: str                          # el repo al que pertenece ("owner/name")
    title: str = Field(max_length=120)
    integration_type: Literal["rest_api", "docker", "sdk", "webhook"] # cómo se conecta; uno por idea
    summary: str = Field(max_length=300)
    compatible_stack: list[NombreCorto] = Field(min_length=1)
    dependencies: list[FraseCorta] = Field(default_factory=list)
    difficulty: Literal["low", "medium", "high"]
    triggers: list[str] = Field(default_factory=list)
    snippet: str | None = None              # solo si sale del README/docs; si no, None
    snippet_language: str | None = None     # el lenguaje va aquí, no en integration_type
    docs_url: HttpUrl                       # la página que respalda la idea, de los datos del repo
    generated_by: Literal["llm", "human"]
    reviewed_at: datetime | None = None     # None = borrador: el frontend muestra "sin revisar"
    based_on_hash: str                      # huella de entrada de la IA (ai_input_hash) al generar

    @model_validator(mode="after")
    def snippet_needs_language(self):
        if self.snippet and not self.snippet_language:
            raise ValueError("snippet sin snippet_language")
        return self
