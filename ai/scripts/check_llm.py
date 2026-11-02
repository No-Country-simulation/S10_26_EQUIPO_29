"""Prueba de humo del LLM: una llamada corta a cada proveedor.

Uso desde la raíz del repo, con el entorno activo:
    python -m ai.scripts.check_llm            # los tres proveedores
    python -m ai.scripts.check_llm groq       # solo uno

Comprueba clave, dirección y modelo, y muestra tiempo y tokens. Cada
proveedor se llama dos veces: la primera puede incluir el arranque en frío.
"""

import sys

from dotenv import load_dotenv

from ai.llm import PROVIDERS, LLMError, generar

PROMPT = [{"role": "user",
           "content": "Responde con una sola frase corta en español: ¿qué es una caché?"}]


def check(key: str) -> bool:
    """Llama dos veces al proveedor; True si las dos respondieron."""
    for attempt in ("1.ª", "2.ª"):
        try:
            result = generar(PROMPT, provider=key)
        except LLMError as err:
            print(f"  {key:<7} {attempt}  ERROR {type(err).__name__}: {err}")
            return False
        print(f"  {key:<7} {attempt}  {result.seconds:>6.2f} s  "
              f"tokens {result.input_tokens}→{result.output_tokens}  "
              f"{result.text[:70]!r}")
    return True


def main() -> int:
    load_dotenv()
    keys = sys.argv[1:] or list(PROVIDERS)
    unknown = [k for k in keys if k not in PROVIDERS]
    if unknown:
        print(f"Proveedor desconocido: {', '.join(unknown)}. Opciones: {', '.join(PROVIDERS)}")
        return 2

    results = {key: check(key) for key in keys}
    failed = [key for key, ok in results.items() if not ok]
    print("Todo responde." if not failed else f"Fallaron: {', '.join(failed)}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
