"""Ideas de integración con el LLM: cómo se conecta una herramienta del catálogo a tu app.

Este módulo prepara la entrada del modelo y valida su salida contra la fuente. A diferencia
del enriquecimiento, los bloques de código del README llegan intactos y numerados: el modelo
elige un bloque por su número y el código lo copia del README original, así el snippet que
ve el usuario es exacto.
"""

import re
from dataclasses import dataclass
from typing import Literal

from pydantic import BaseModel, ConfigDict

from ai.enrich import (MIN_EVIDENCE_CHARS, MIN_EVIDENCE_WORDS, README_CHARS, clean_readme,
                       cut_text, normalize)
from shared.contracts.integration_idea import IntegrationIdea
from shared.contracts.repo import Repo

# Apertura de un bloque cercado: ``` o ~~~ (3 o más), hasta 3 espacios de sangría,
# y la marca opcional del lenguaje ("python", "Python hl_lines=...").
_FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})(.*)$")
NO_LANGUAGE = "text"  # bloque sin marca: el README no dice el lenguaje
_ATX_HEADING = re.compile(r"^#{1,6}\s+(.+?)\s*#*\s*$")
_SETEXT_LINE = re.compile(r"^(=+|-+)\s*$")




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




# --- Salida del modelo: borrador de cada idea ---

MAX_IDEAS = 3            # la API del catálogo muestra 3: con este tope, su recorte nunca actúa
SNIPPET_MAX_LINES = 15   # la ficha muestra el snippet en un acordeón; uno más largo no se ofrece
MAX_TRIGGERS = 2
STACK_NAME_CHARS = 40    # contrato IntegrationIdea (NombreCorto)
DEPENDENCY_CHARS = 80    # contrato IntegrationIdea (FraseCorta)
TRIGGER_CHARS = 80
TITLE_CHARS = 120        # contrato IntegrationIdea
SUMMARY_CHARS = 300      # contrato IntegrationIdea
DIFFICULTY_ORDER = {"low": 0, "medium": 1, "high": 2}


class IdeaDraft(BaseModel):
    """Una idea tal como la devuelve el modelo. El código arma después la IntegrationIdea."""
    model_config = ConfigDict(extra="forbid")
    title: str
    integration_type: Literal["rest_api", "docker", "sdk", "webhook"]
    summary: str
    evidence: str                 # frase copiada de la entrada que respalda el mecanismo
    code_block: int | None        # número del bloque que sirve de ejemplo, o null
    compatible_stack: list[str]
    dependencies: list[str]
    difficulty: Literal["low", "medium", "high"]
    triggers: list[str]


class IdeasDraft(BaseModel):
    model_config = ConfigDict(extra="forbid")
    ideas: list[IdeaDraft]


def rule_problems(draft: IdeasDraft, blocks: dict[int, CodeBlock]) -> list[str]:
    """Reglas que justifican un reintento (errores de forma). Vacía = cumple.

    Lo que no tiene respaldo en la fuente no está aquí: esa idea se descarta, no se reintenta.
    """
    problems = []
    if len(draft.ideas) > MAX_IDEAS:
        problems.append(f"hay {len(draft.ideas)} ideas; el máximo es {MAX_IDEAS}")
    valid = ", ".join(map(str, blocks)) or "ninguno (usa null)"
    for n, idea in enumerate(draft.ideas, start=1):
        if idea.code_block is not None and idea.code_block not in blocks:
            problems.append(f"idea {n}: el bloque {idea.code_block} no existe; válidos: {valid}")
        if not idea.title.strip() or len(idea.title) > TITLE_CHARS:
            problems.append(f"idea {n}: el título debe tener entre 1 y {TITLE_CHARS} caracteres")
        if not idea.summary.strip() or len(idea.summary) > SUMMARY_CHARS:
            problems.append(f"idea {n}: el resumen debe tener entre 1 y {SUMMARY_CHARS} caracteres")
    return problems


# --- docs_url: la sección del README donde está la evidencia ---

def github_slug(heading: str) -> str:
    """El ancla que GitHub genera para un título: minúsculas, sin puntuación, espacios → guiones."""
    text = re.sub(r"[^\w\- ]", "", heading.strip().lower())
    return text.replace(" ", "-")


def sections(text: str) -> list[tuple[str | None, str]]:
    """Divide la entrada en secciones (ancla, texto). La primera puede no tener título.

    Ignora las líneas dentro de bloques de código (un "# comentario" no es un título).
    Si dos títulos dan la misma ancla, GitHub agrega -1, -2…: se replica.
    """
    result: list[tuple[str | None, list[str]]] = [(None, [])]
    seen: dict[str, int] = {}
    in_code = False
    lines = text.split("\n")
    for i, line in enumerate(lines):
        if line.startswith("```"):
            in_code = not in_code
        heading = None
        if not in_code:
            atx = _ATX_HEADING.match(line)
            next_line = lines[i + 1] if i + 1 < len(lines) else ""
            if atx:
                heading = atx.group(1)
            elif line.strip() and _SETEXT_LINE.match(next_line) and not _SETEXT_LINE.match(line):
                heading = line.strip()
        if heading:
            slug = github_slug(heading)
            count = seen.get(slug, 0)
            seen[slug] = count + 1
            result.append((f"{slug}-{count}" if count else slug, []))
        result[-1][1].append(line)
    return [(anchor, "\n".join(body)) for anchor, body in result]


def docs_url(evidence: str, text: str, repo: Repo) -> str:
    """Enlace a la sección del README que contiene la evidencia; si no está bajo un título,
    el sitio del proyecto; si no tiene, el repo."""
    quote = normalize(evidence)
    for anchor, body in sections(text):
        if anchor and quote in normalize(body):
            return f"https://github.com/{repo.full_name}#{anchor}"
    return str(repo.homepage) if repo.homepage else f"https://github.com/{repo.full_name}"


# --- Validación contra la fuente ---

def _named_in(name: str, haystack: str) -> bool:
    """El nombre aparece en el texto como palabra completa, sin importar mayúsculas."""
    return re.search(rf"(?<!\w){re.escape(name.casefold())}(?!\w)", haystack) is not None


def _short_items(items: list[str], limit: int, keep: int | None = None) -> list[str]:
    """Quita vacíos, largos y repetidos; conserva el orden."""
    out: list[str] = []
    for item in (i.strip() for i in items):
        if item and len(item) <= limit and item.casefold() not in {o.casefold() for o in out}:
            out.append(item)
    return out[:keep] if keep is not None else out


def check_ideas(draft: IdeasDraft, entrada: IdeasInput, repo: Repo,
                based_on_hash: str) -> tuple[list[dict], list[dict]]:
    """Separa las ideas con respaldo en la fuente de las que se descartan.

    Devuelve (aceptadas como IntegrationIdea en dict, descartadas con su motivo).
    Las aceptadas van ordenadas de menor a mayor dificultad, con ids llm-<github_id>-<n>.
    Cada aceptada lleva además "evidence" (su cita), para revisarla; no va a la base.
    """
    source = normalize(entrada.text)
    words = entrada.text.casefold()
    kept: list[tuple[IdeaDraft, dict]] = []
    dropped: list[dict] = []
    titles: set[str] = set()
    for idea in draft.ideas:
        quote = normalize(idea.evidence)
        stack = [s for s in _short_items(idea.compatible_stack, STACK_NAME_CHARS)
                 if _named_in(s, words)]
        if repo.archived:
            reason = "repo archivado"
        elif len(quote) < MIN_EVIDENCE_CHARS or len(quote.split()) < MIN_EVIDENCE_WORDS:
            reason = "cita demasiado corta"
        elif quote not in source:
            reason = "la cita no está en la entrada"
        elif not stack:
            reason = "ningún nombre del stack aparece en la entrada"
        elif idea.title.strip().casefold() in titles:
            reason = "repetida"
        elif len(kept) == MAX_IDEAS:
            reason = f"más de {MAX_IDEAS}"
        else:
            titles.add(idea.title.strip().casefold())
            kept.append((idea, {"compatible_stack": stack}))
            continue
        dropped.append({**idea.model_dump(), "reason": reason})

    kept.sort(key=lambda pair: DIFFICULTY_ORDER[pair[0].difficulty])  # estable: empate = orden del modelo
    ideas = []
    for n, (idea, extra) in enumerate(kept, start=1):
        block = entrada.blocks.get(idea.code_block) if idea.code_block is not None else None
        if block and len(block.code.splitlines()) > SNIPPET_MAX_LINES:
            block = None
        data = IntegrationIdea(
            id=f"llm-{repo.github_id}-{n}",
            full_name=repo.full_name,
            title=idea.title.strip(),
            integration_type=idea.integration_type,
            summary=idea.summary.strip(),
            compatible_stack=extra["compatible_stack"],
            dependencies=_short_items(idea.dependencies, DEPENDENCY_CHARS),
            difficulty=idea.difficulty,
            triggers=_short_items(idea.triggers, TRIGGER_CHARS, keep=MAX_TRIGGERS),
            snippet=block.code if block else None,
            snippet_language=block.language if block else None,
            docs_url=docs_url(idea.evidence, entrada.text, repo),
            generated_by="llm",
            based_on_hash=based_on_hash,
        )
        ideas.append({**data.model_dump(mode="json"), "evidence": idea.evidence.strip()})
    return ideas, dropped
