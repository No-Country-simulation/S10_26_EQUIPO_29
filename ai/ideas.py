"""Ideas de integración con el LLM: cómo se conecta una herramienta del catálogo a tu app.

Este módulo prepara la entrada del modelo. A diferencia del enriquecimiento, los bloques
de código del README llegan intactos y numerados: el modelo elige un bloque por su número
y el código lo copia del README original, así el snippet que ve el usuario es exacto.
"""

import re
from dataclasses import dataclass

from ai.enrich import README_CHARS, clean_readme, cut_text
from shared.contracts.repo import Repo

# Apertura de un bloque cercado: ``` o ~~~ (3 o más), hasta 3 espacios de sangría,
# y la marca opcional del lenguaje ("python", "Python hl_lines=...").
_FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})(.*)$")
NO_LANGUAGE = "text"  # bloque sin marca: el README no dice el lenguaje


@dataclass(frozen=True)
class CodeBlock:
    """Un bloque de código del README, tal cual."""
    language: str  # primera palabra de la marca en minúsculas, o "text"
    code: str


@dataclass(frozen=True)
class IdeasInput:
    """Lo que ve el modelo y los bloques que puede elegir, por número."""
    text: str
    blocks: dict[int, CodeBlock]


def split_readme(text: str) -> list[str | CodeBlock]:
    """Separa el README en prosa (str) y bloques de código cercados, en orden.

    Un bloque se cierra con el mismo carácter, repetido al menos tantas veces como
    en la apertura; si no se cierra, llega hasta el final. Los bloques vacíos se omiten.
    Los bloques con sangría (sin cerca) quedan en la prosa: no se ofrecen como snippet.
    """
    lines = text.replace("\r\n", "\n").split("\n")
    parts: list[str | CodeBlock] = []
    prose: list[str] = []
    i = 0
    while i < len(lines):
        opening = _FENCE.match(lines[i])
        # En una cerca de comillas, la marca no puede tener comillas: si las tiene, es texto.
        if not opening or (opening.group(1)[0] == "`" and "`" in opening.group(2)):
            prose.append(lines[i])
            i += 1
            continue
        fence, info = opening.group(1), opening.group(2).strip()
        closing = re.compile(rf"^ {{0,3}}{re.escape(fence[0])}{{{len(fence)},}}\s*$")
        body = []
        i += 1
        while i < len(lines) and not closing.match(lines[i]):
            body.append(lines[i])
            i += 1
        i += 1  # salta la línea de cierre
        if prose:
            parts.append("\n".join(prose))
            prose = []
        code = "\n".join(body).strip("\n")
        if code.strip():
            language = info.split()[0].lower() if info else NO_LANGUAGE
            parts.append(CodeBlock(language, code))
    if prose:
        parts.append("\n".join(prose))
    return parts


def block_label(number: int, block: CodeBlock) -> str:
    """Cómo ve el modelo un bloque: etiqueta con número y lenguaje, y el código intacto."""
    return f"[bloque {number} · {block.language}]\n```\n{block.code}\n```"


def ideas_input(repo: Repo, limit: int = README_CHARS) -> IdeasInput:
    """README para las ideas: prosa limpia y bloques de código intactos y numerados.

    Recorta a `limit` caracteres sin partir un bloque: un bloque entra completo o no
    entra. Así, todo número que el modelo puede elegir es de un bloque que vio entero.
    """
    pieces: list[str] = []
    blocks: dict[int, CodeBlock] = {}
    used = 0
    for part in split_readme(repo.readme_text or ""):
        if isinstance(part, CodeBlock):
            number = len(blocks) + 1
            piece = block_label(number, part)
        else:
            piece = clean_readme(part)
            if not piece:
                continue
        separator = 2 if pieces else 0  # "\n\n" entre pedazos
        if used + separator + len(piece) > limit:
            room = limit - used - separator
            if isinstance(part, str) and room > 0:
                head = cut_text(piece, room)  # la prosa sí se recorta, en un párrafo completo
                if head:
                    pieces.append(head)
            break
        pieces.append(piece)
        used += separator + len(piece)
        if isinstance(part, CodeBlock):
            blocks[number] = part
    return IdeasInput("\n\n".join(pieces), blocks)
