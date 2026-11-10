"""Actualización automática de los datos de la IA: sin revisión humana y con freno.

Uso desde la raíz del repo, con el entorno activo (lo corre el workflow diario):
    python -m ai.scripts.auto_refresh_ai_data --informe informe.md
    python -m ai.scripts.auto_refresh_ai_data --permitir-mas-cambios   # una vez, tras un freno legítimo

Decide con lo publicado en la base, no con los archivos del repo: regenera con el modelo solo
los repos cuyo dato publicado ya no coincide con lo que el modelo lee de la vista (descripción,
topics, README), publica los que salieron bien y lista los que fallaron, que se reintentan en la
corrida siguiente. Un cambio que el modelo no lee (estrellas, fechas) no hace nada.

Antes de llamar al modelo se detiene si cambió de una vez más de MAX_SHARE del catálogo o si
harían falta más de MAX_MODEL_CALLS llamadas. Trabaja en una carpeta temporal: nunca escribe en
ai/data/catalog/ ni borra filas de la base, y un cambio de versión de las reglas queda pendiente
(como en refresh_ai_data).

Requiere AI_READER_DATABASE_URL, AI_DATABASE_URL y la clave del proveedor.
Código de salida: 0 nada que hacer o todo publicado · 1 publicó con fallas · 2 error al leer o
escribir la base · 3 detenida por el freno (sin llamar al modelo ni publicar).
"""

import argparse
import shutil
import sys
import tempfile
from collections.abc import Callable
from dataclasses import dataclass, field
from pathlib import Path

from ai.catalog import ENRICHMENT_FILE, load_categories
from ai.catalog_diff import NAME_CHANGED, CatalogDiff, diff_catalog
from ai.enrich import PROMPT_VERSION as ENRICHMENT_VERSION
from ai.ideas import PROMPT_VERSION as IDEAS_VERSION
from ai.llm import PROVIDERS
from ai.scripts import write_enrichment, write_ideas
from ai.scripts.batch import load_records
from ai.scripts.compare_catalog import read_published, read_view
from ai.scripts.enrich_catalog import enrich
from ai.scripts.export_catalog_snapshot import AI_FIELDS
from ai.scripts.generate_ideas import OUT_FILE as IDEAS_FILE
from ai.scripts.generate_ideas import generate
from ai.scripts.refresh_ai_data import (Plan, check_provider, edit_records, make_plan,
                                        version_block, write_database)
from shared.contracts.repo import Repo

MAX_SHARE = 0.40        # más que esto de una vez suele ser un error aguas arriba, no cambios reales
MAX_MODEL_CALLS = 100   # tope de gasto por corrida (el crédito del proveedor es prepago)
DONE, PARTIAL, STOPPED = 0, 1, 3    # 2 = error: lo devuelve fail() al leer o escribir la base
FAILED_REASON = "no se generó (el motivo está en el log de la corrida)"


@dataclass
class Outcome:
    """Lo que pasó en la corrida: para el informe y el código de salida."""

    stopped: str | None = None            # por qué se detuvo antes de llamar al modelo
    provider_stopped: str | None = None   # el proveedor cortó a mitad (crédito, límite del día)
    published: dict[str, list[Repo]] = field(default_factory=dict)
    failed: list[tuple[str, Repo, str]] = field(default_factory=list)   # (dato, repo, motivo)

    @property
    def code(self) -> int:
        if self.stopped:
            return STOPPED
        return PARTIAL if self.failed else DONE


def plan_auto(public: CatalogDiff, draft: CatalogDiff, enrichment_block: str | None = None,
              ideas_block: str | None = None) -> Plan:
    """Qué regenerar, decidido con lo publicado. No lee ni escribe nada.

    public: la vista frente a lo publicado. draft: la vista frente a la copia temporal de los
    archivos; solo dice si un renombrado se corrige sin el modelo (el registro de la copia tiene
    que estar al día salvo por el nombre). Los repos que salieron de la vista solo se listan.
    """
    plan = make_plan(public, enrichment_block, ideas_block)
    plan.drop = {}
    needs_model = {r.github_id for r, why in draft.enrichment_stale if why != NAME_CHANGED}
    for repo in [r for r in plan.rename if r.github_id in needs_model]:
        plan.rename.remove(repo)
        if enrichment_block:
            plan.pending.append(("enriquecimiento", repo, enrichment_block))
        else:
            plan.enrichment.append(repo)
    return plan


def brake(plan: Plan, catalog_size: int) -> str | None:
    """Motivo para no seguir, o None. Se calcula antes de llamar al modelo."""
    changed = len({r.github_id for r in plan.enrichment + plan.ideas})
    if catalog_size and changed / catalog_size > MAX_SHARE:
        return (f"{changed} de {catalog_size} repos ({changed / catalog_size:.0%}) cambiaron algo "
                f"que lee el modelo; el máximo por corrida es {MAX_SHARE:.0%}")
    if plan.model_calls > MAX_MODEL_CALLS:
        return (f"harían falta hasta {plan.model_calls} llamadas al modelo; "
                f"el máximo por corrida es {MAX_MODEL_CALLS}")
    return None


def ready(public: CatalogDiff, after: CatalogDiff, pending: set[tuple[str, int]]
          ) -> tuple[list[Repo], list[Repo], list[tuple[str, Repo, str]]]:
    """Lo desactualizado en la base cuyo registro ya quedó al día en la copia, y lo que falló.

    Lo pendiente por versión de las reglas o por otro modelo no cuenta como falla.
    """
    publish, failed = {}, []
    for label, stale_public, stale_after in (
            ("enriquecimiento", public.enrichment_stale, after.enrichment_stale),
            ("ideas", public.ideas_stale, after.ideas_stale)):
        still = {r.github_id for r, _ in stale_after}
        publish[label] = [r for r, _ in stale_public if r.github_id not in still]
        failed += [(label, r, FAILED_REASON) for r, _ in stale_public
                   if r.github_id in still and (label, r.github_id) not in pending]
    return publish["enriquecimiento"], publish["ideas"], failed


def split_valid(repos: list[Repo], records: dict[int, dict], validate: Callable[[list[dict]], None]
                ) -> tuple[list[Repo], list[tuple[Repo, str]]]:
    """Valida repo por repo: un registro que no pasa no frena a los demás."""
    valid, invalid = [], []
    for repo in repos:
        try:
            validate([records[repo.github_id]])
        except ValueError as e:
            lines = str(e).splitlines()
            invalid.append((repo, lines[1].lstrip("- ") if len(lines) > 1 else lines[0]))
        else:
            valid.append(repo)
    return valid, invalid


def run(live: list[Repo], published: dict[str, dict[int, dict]], enrichment_file: Path,
        ideas_file: Path, provider: str, allow_more: bool) -> tuple[Outcome, Plan, CatalogDiff]:
    """Compara, frena si hace falta, genera en la copia temporal y publica lo que quedó al día."""
    copy = lambda: (load_records(enrichment_file), load_records(ideas_file))
    public = diff_catalog(live, live, published["enrichment"], published["ideas"])
    plan = plan_auto(public, diff_catalog(live, live, *copy()),
                     version_block(enrichment_file, ENRICHMENT_VERSION),
                     version_block(ideas_file, IDEAS_VERSION))
    outcome = Outcome(stopped=None if allow_more else brake(plan, len(live)))
    if outcome.stopped:
        return outcome, plan, public

    for path in (enrichment_file, ideas_file):
        check_provider(path, provider)
    edit_records(enrichment_file, [], {r.github_id: r.full_name for r in plan.rename})
    edit_records(ideas_file, [r.github_id for r in plan.reset_ideas], {})
    try:
        if plan.ideas:
            generate(plan.ideas, ideas_file, provider)
        if plan.enrichment:
            enrich(plan.enrichment, enrichment_file, provider)
    except SystemExit as e:     # el lote termina ante el límite del día; lo hecho quedó guardado
        outcome.provider_stopped = str(e.code).splitlines()[0]

    pending = {(what, r.github_id) for what, r, _ in plan.pending}
    enrichment, ideas, outcome.failed = ready(public, diff_catalog(live, live, *copy()), pending)
    snapshot = [r.model_dump(mode="json", exclude=AI_FIELDS | {"readme_text"}) for r in live]
    categories = set(load_categories())
    enrichment_records, ideas_records = copy()
    enrichment, bad = split_valid(enrichment, enrichment_records, lambda records:
                                  write_enrichment.validate_records(records, snapshot, categories))
    outcome.failed += [("enriquecimiento", r, why) for r, why in bad]
    ideas, bad = split_valid(ideas, ideas_records, lambda records:
                             write_ideas.validate_records(records, snapshot))
    outcome.failed += [("ideas", r, why) for r, why in bad]
    if enrichment or ideas:
        write_database(Plan(publish_enrichment=enrichment, publish_ideas=ideas),
                       delete_orphans=False, enrichment_file=enrichment_file,
                       ideas_file=ideas_file, snapshot=snapshot)
    outcome.published = {"enriquecimiento": enrichment, "ideas": ideas}
    return outcome, plan, public


def _names(repos: list[Repo]) -> str:
    return ", ".join(r.full_name for r in repos) or "ninguno"


def _items(rows: list[tuple[str, Repo, str]]) -> list[str]:
    return [f"- {r.full_name} ({what}): {why}" for what, r, why in rows] or ["- ninguno"]


def report(outcome: Outcome, plan: Plan, public: CatalogDiff, catalog_size: int) -> str:
    """Informe en Markdown con las listas completas, para el issue y el resumen de la corrida."""
    lines = ["## Actualización de los datos de la IA", "", f"Catálogo: {catalog_size} repos.", ""]
    if outcome.stopped:
        changed = sorted({r.full_name for r in plan.enrichment + plan.ideas}, key=str.lower)
        lines += [f"**Detenida antes de llamar al modelo:** {outcome.stopped}. No se publicó nada.",
                  "Si el cambio es legítimo, correr una vez con «permitir más cambios».", "",
                  "### Repos con cambios que lee el modelo", ", ".join(changed), ""]
    else:
        if outcome.provider_stopped:
            lines += [f"**El proveedor cortó la corrida:** {outcome.provider_stopped}. "
                      "Se publicó lo que alcanzó a generarse.", ""]
        enrichment, ideas = outcome.published["enriquecimiento"], outcome.published["ideas"]
        lines += ["### Publicado",
                  f"- Enriquecimiento ({len(enrichment)}): {_names(enrichment)}",
                  f"- Ideas ({len(ideas)}): {_names(ideas)}", "",
                  "### Fallaron (se reintentan en la próxima corrida)", *_items(outcome.failed), ""]
    gone = sorted({i for ids in public.orphans.values() for i in ids})
    lines += ["### Pendientes (no se regeneran aquí)", *_items(plan.pending), "",
              "### Con datos de la IA pero fuera de la vista (no se borran)",
              ", ".join(map(str, gone)) or "ninguno"]
    return "\n".join(lines) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Actualiza los datos de la IA sin revisión, con freno.")
    parser.add_argument("--informe", type=Path, help="archivo Markdown con el informe completo")
    parser.add_argument("--permitir-mas-cambios", action="store_true",
                        help="sin el freno de volumen, solo en esta corrida")
    parser.add_argument("--provider", default="gemini", choices=list(PROVIDERS))
    args = parser.parse_args()

    live, _ = read_view()
    published = read_published()
    with tempfile.TemporaryDirectory() as tmp:
        files = (Path(tmp) / "enrichment.json", Path(tmp) / "ideas.json")
        for source, copy in zip((ENRICHMENT_FILE, IDEAS_FILE), files):
            if source.is_file():
                shutil.copyfile(source, copy)
        outcome, plan, public = run(live, published, *files, args.provider,
                                    args.permitir_mas_cambios)
    text = report(outcome, plan, public, len(live))
    print(text)
    if args.informe:
        args.informe.write_text(text, encoding="utf-8")
    sys.exit(outcome.code)


if __name__ == "__main__":
    main()
