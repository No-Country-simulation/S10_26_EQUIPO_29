"""Modelo de lenguaje (LLM) detrás de una sola función: generar().

El proveedor se elige con AI_LLM_PROVIDER (por defecto, gemini). Los tres
proveedores aceptan el formato de OpenAI: solo cambian la dirección, el
modelo y la clave. Solo este archivo sabe qué proveedor se usa.
"""

import os
import time
from dataclasses import dataclass
from functools import lru_cache
from pydantic import BaseModel, ValidationError

import openai
from openai import OpenAI


@dataclass(frozen=True)
class ProviderSpec:
    """Proveedor de LLM y cómo llamarlo."""

    model: str                          # nombre del modelo en el proveedor
    base_url: str                       # dirección compatible con OpenAI
    api_key_env: str | None             # variable con la clave; None = no usa clave
    temperature: float | None = None    # None = valor por defecto del proveedor
    reasoning_effort: str | None = None # cuánto razona antes de responder; None = por defecto

PROVIDERS = {
    "gemini": ProviderSpec(
        model="gemini-3.5-flash-lite",
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
        api_key_env="GEMINI_API_KEY",
        # Gemini 3: Google recomienda no cambiar la temperatura.
    ),
    "groq": ProviderSpec(
        model="openai/gpt-oss-120b",
        base_url="https://api.groq.com/openai/v1",
        api_key_env="GROQ_API_KEY",
    ),
    "ollama": ProviderSpec(
        model="qwen3.5:4b-q4_K_M",
        base_url="http://localhost:11434/v1/",
        api_key_env=None,  # corre en la máquina: no usa clave
        # Por defecto piensa antes de responder: más de 1.000 tokens y
        # más de 20 s para una frase. "none" lo apaga.
        reasoning_effort="none",
    ),
}
DEFAULT_PROVIDER = "gemini"
TIMEOUT_SECONDS = 15.0  # presupuesto de la IA; el frontend espera 20 s


class LLMError(Exception):
    """Fallo al llamar al modelo. Las subclases dicen cuál."""


class LLMConfigError(LLMError):
    """Proveedor desconocido, falta la clave o la clave no es válida."""


class LLMRateLimited(LLMError):
    """El proveedor rechazó la llamada por límite de uso (429)."""

    def __init__(self, message: str, retry_after: float | None = None):
        super().__init__(message)
        self.retry_after = retry_after  # segundos que pide esperar, si los dice


class LLMTimeout(LLMError):
    """El proveedor no respondió a tiempo."""


class LLMUnavailable(LLMError):
    """No se pudo conectar o el proveedor devolvió un error."""

    def __init__(self, message: str, status_code: int | None = None):
        super().__init__(message)
        self.status_code = status_code  # None = no hubo conexión

    @property
    def transient(self) -> bool:
        """Vale la pena reintentar: sin conexión o error del servidor (5xx)."""
        return self.status_code is None or self.status_code >= 500


class LLMInvalidResponse(LLMError):
    """La respuesta no cumple el esquema pedido."""

    def __init__(self, message: str, raw_text: str, detail: str):
        super().__init__(message)
        self.raw_text = raw_text  # lo que escribió el modelo, para revisarlo
        self.detail = detail      # el error de validación, para el reintento


@dataclass(frozen=True)
class Generation:
    """Respuesta del modelo y datos para medirla."""

    text: str
    provider: str
    model: str
    seconds: float
    input_tokens: int | None
    output_tokens: int | None
    data: BaseModel | None = None  # la respuesta validada, si se pidió un esquema


def provider_key(provider: str | None = None) -> str:
    """El proveedor pedido, o el de AI_LLM_PROVIDER."""
    key = provider or os.environ.get("AI_LLM_PROVIDER") or DEFAULT_PROVIDER
    if key not in PROVIDERS:
        raise LLMConfigError(f"Proveedor {key!r} no existe; opciones: {', '.join(PROVIDERS)}")
    return key


@lru_cache(maxsize=None)
def _client(key: str) -> OpenAI:
    """Un cliente por proveedor, creado la primera vez que se usa."""
    spec = PROVIDERS[key]
    if spec.api_key_env is None:
        api_key = "sin-clave"  # el cliente exige un valor; Ollama lo ignora
    else:
        api_key = os.environ.get(spec.api_key_env)
        if not api_key:
            raise LLMConfigError(f"Falta {spec.api_key_env} en .env (proveedor {key}).")
    # max_retries=0: los reintentos y las esperas los decide quien llama.
    return OpenAI(base_url=spec.base_url, api_key=api_key,
                  timeout=TIMEOUT_SECONDS, max_retries=0)


def generar(messages: list[dict], *,
            schema: type[BaseModel] | None = None,
            provider: str | None = None) -> Generation:
    """Envía los mensajes al modelo y devuelve su texto con tiempo y tokens.

    Con `schema`, pide la respuesta en ese formato y la valida.
    """
    key = provider_key(provider)
    spec = PROVIDERS[key]
    options = {}
    if spec.temperature is not None:
        options["temperature"] = spec.temperature
    if spec.reasoning_effort is not None:
        options["reasoning_effort"] = spec.reasoning_effort
    if schema is not None:
        options["response_format"] = {
            "type": "json_schema",
            "json_schema": {"name": schema.__name__,
                            "schema": schema.model_json_schema(),
                            "strict": True},
        }

    start = time.perf_counter()
    try:
        response = _client(key).chat.completions.create(
            model=spec.model, messages=messages, **options)
    # El orden importa: cada except atrapa también a sus subclases,
    # así que los casos particulares van antes que los generales.
    except openai.APITimeoutError as err:
        raise LLMTimeout(f"{key}: sin respuesta en {TIMEOUT_SECONDS:.0f} s") from err
    except openai.APIConnectionError as err:
        hint = " ¿Ollama está abierto?" if key == "ollama" else ""
        raise LLMUnavailable(f"{key}: no se pudo conectar.{hint}") from err
    except openai.RateLimitError as err:
        wait = err.response.headers.get("retry-after")
        raise LLMRateLimited(f"{key}: límite de uso alcanzado",
                             retry_after=float(wait) if wait else None) from err
    except (openai.AuthenticationError, openai.PermissionDeniedError) as err:
        raise LLMConfigError(f"{key}: la clave no es válida o no tiene acceso") from err
    except openai.APIStatusError as err:
        raise LLMUnavailable(f"{key}: error {err.status_code} del proveedor",
                             status_code=err.status_code) from err
    seconds = time.perf_counter() - start

    text = response.choices[0].message.content or ""
    data = None
    if schema is not None:
        try:
            data = schema.model_validate_json(text)
        except ValidationError as err:
            raise LLMInvalidResponse(
                f"{key}: la respuesta no cumple {schema.__name__}",
                raw_text=text, detail=str(err)) from err

    usage = response.usage
    return Generation(
        text=response.choices[0].message.content or "",
        provider=key,
        model=spec.model,
        seconds=round(seconds, 2),
        input_tokens=usage.prompt_tokens if usage else None,
        output_tokens=usage.completion_tokens if usage else None,
        data=data,
    )
