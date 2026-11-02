"""Núcleo del asistente.

entender() convierte el pedido del usuario en necesidades (una categoría de
categories.json, una consulta corta para la búsqueda y el fragmento del pedido
que la justifica) o en preguntas, si el pedido es vago.
"""

import time
from dataclasses import dataclass, field
from functools import lru_cache
from typing import Literal

from pydantic import BaseModel, ConfigDict

from ai.catalog import load_categories
from ai.llm import LLMInvalidResponse, generar

MAX_NEEDS = 5

RULES = """Eres el primer paso de un asistente que recomienda herramientas open source
para construir el sistema de un negocio. Tu tarea: leer el pedido del usuario
y listar las necesidades técnicas que pide, usando solo las categorías de la
lista de abajo.

Reglas:
1. Incluye solo necesidades que el pedido pide o describe. No agregues
   necesidades que suelen ir juntas si el usuario no las menciona: si solo
   pide cobrar, no agregues inicio de sesión.
2. En "evidence", copia el fragmento exacto del pedido que justifica cada
   necesidad.
3. Una necesidad por categoría. Si varias partes del pedido caen en la misma
   categoría, únelas en una sola.
4. En "query", escribe una frase corta en español (de 3 a 8 palabras) que
   describa qué debe hacer la herramienta, no el nombre de un producto.
5. Las tecnologías que el usuario ya usa y no pide cambiar (por ejemplo,
   "nuestros microservicios corren en Kubernetes") son contexto, no
   necesidades.
6. Si el pedido no permite identificar ninguna necesidad concreta, deja
   "needs" vacía y escribe de 1 a 3 preguntas en "clarification_questions"
   que ayuden a describir el negocio y lo que necesita. Si identificas al
   menos una necesidad, deja "clarification_questions" vacía.
7. Máximo 5 necesidades."""


@lru_cache(maxsize=1)
def understanding_schema() -> type[BaseModel]:
    """Esquema de la respuesta, con las categorías como lista cerrada."""
    CategoryId = Literal[tuple(load_categories())]  # type: ignore[valid-type]

    class Need(BaseModel):
        model_config = ConfigDict(extra="forbid")
        category: CategoryId # type: ignore[valid-type]
        query: str
        evidence: str

    class Understanding(BaseModel):
        model_config = ConfigDict(extra="forbid")
        needs: list[Need]
        clarification_questions: list[str]

    return Understanding


@lru_cache(maxsize=1)
def system_prompt() -> str:
    """Las reglas y las categorías, leídas de categories.json."""
    lines = [f"- {c.id}: {c.name}. {c.description} {c.llm_notes}"
             for c in load_categories().values()]
    return RULES + "\n\nCategorías (id: nombre. qué incluye y qué no):\n" + "\n".join(lines)


def rule_problems(data: BaseModel) -> list[str]:
    """Reglas que el esquema no puede expresar. Lista vacía = cumple."""
    problems = []
    categories = [need.category for need in data.needs]
    if len(categories) != len(set(categories)):
        problems.append("hay categorías repetidas: une esas necesidades en una sola")
    if len(data.needs) > MAX_NEEDS:
        problems.append(f"hay {len(data.needs)} necesidades; el máximo es {MAX_NEEDS}")
    if data.needs and data.clarification_questions:
        problems.append("si hay necesidades, clarification_questions debe ir vacía")
    if not data.needs and not data.clarification_questions:
        problems.append("sin necesidades, escribe de 1 a 3 preguntas en clarification_questions")
    return problems


@dataclass
class Understood:
    """Resultado de entender, con lo que hace falta para medirlo."""

    data: BaseModel | None = None          # None = ningún intento cumplió el esquema
    attempts: int = 0
    problems_first: list[str] = field(default_factory=list)  # del primer intento
    problems_final: list[str] = field(default_factory=list)  # vacío = válida
    seconds: float = 0.0
    input_tokens: int = 0
    output_tokens: int = 0


def entender(request: str, *, provider: str | None = None) -> Understood:
    """Necesidades del pedido, con un reintento si la respuesta no cumple las reglas."""
    messages = [{"role": "system", "content": system_prompt()},
                {"role": "user", "content": request}]
    out = Understood()

    for attempt in (1, 2):
        out.attempts = attempt
        start = time.perf_counter()
        try:
            result = generar(messages, schema=understanding_schema(), provider=provider)
        except LLMInvalidResponse as err:
            out.data, raw = None, err.raw_text
            problems = [f"la respuesta no cumple el formato pedido: {err.detail}"]
        else:
            out.data, raw = result.data, result.text
            out.input_tokens += result.input_tokens or 0
            out.output_tokens += result.output_tokens or 0
            problems = rule_problems(result.data)
        out.seconds += time.perf_counter() - start

        if attempt == 1:
            out.problems_first = problems
        out.problems_final = problems
        if not problems:
            break
        # Reintento: el modelo ve su respuesta y qué reglas no cumplió.
        messages += [
            {"role": "assistant", "content": raw},
            {"role": "user", "content": "Tu respuesta no cumple estas reglas:\n- "
                                        + "\n- ".join(problems)
                                        + "\nCorrígela y responde otra vez con el mismo formato."},
        ]

    out.seconds = round(out.seconds, 2)
    return out
