"""Tests de la actualización automática: sin base, sin modelo y sin tocar ai/data/catalog/."""

import hashlib

import pytest

from ai.catalog import ENRICHMENT_FILE, load_repos
from ai.catalog_diff import diff_catalog
from ai.scripts import auto_refresh_ai_data as auto
from ai.scripts.batch import load_records
from ai.scripts.generate_ideas import OUT_FILE as IDEAS_FILE


@pytest.fixture(scope="module")
def data():
    return load_repos("snapshot"), load_records(ENRICHMENT_FILE), load_records(IDEAS_FILE)


def active(repos):
    return next(r for r in repos if not r.archived)


def replace(repos, new):
    return [new if r.github_id == new.github_id else r for r in repos]


def without(records, *repos):
    ids = {r.github_id for r in repos}
    return {k: v for k, v in records.items() if k not in ids}


def plan_for(live, published, draft):
    public = diff_catalog(live, live, *published)
    return auto.plan_auto(public, diff_catalog(live, live, *draft))


# --- Qué regenera ---

def test_sin_cambios_no_hay_nada_que_hacer(data):
    repos, enrichment, ideas = data
    plan = plan_for(repos, (enrichment, ideas), (enrichment, ideas))
    assert plan.model_calls == 0 and plan.rename == [] and plan.pending == []
    assert auto.brake(plan, len(repos)) is None


def test_un_cambio_que_el_modelo_no_lee_no_hace_nada(data):
    repos, enrichment, ideas = data
    live = [r.model_copy(update={"stargazers_count": r.stargazers_count + 1}) for r in repos]
    plan = plan_for(live, (enrichment, ideas), (enrichment, ideas))
    assert plan.model_calls == 0 and plan.enrichment == [] and plan.ideas == []


def test_un_cambio_de_descripcion_regenera_solo_ese_repo(data):
    repos, enrichment, ideas = data
    repo = active(repos).model_copy(update={"description": "Otra descripción del proyecto."})
    plan = plan_for(replace(repos, repo), (enrichment, ideas), (enrichment, ideas))
    assert plan.enrichment == [repo] and plan.ideas == [repo] and plan.model_calls == 2


def test_decide_con_lo_publicado_aunque_la_copia_este_vieja(data):
    # La copia de los archivos no tiene el repo, pero la base lo tiene al día: no se regenera.
    repos, enrichment, ideas = data
    plan = plan_for(repos, (enrichment, ideas), (without(enrichment, repos[0]), without(ideas, repos[0])))
    assert plan.model_calls == 0


def test_renombrado_sin_modelo_si_la_copia_esta_al_dia(data):
    repos, enrichment, ideas = data
    renamed = repos[0].model_copy(update={"full_name": repos[0].full_name + "-nuevo"})
    plan = plan_for(replace(repos, renamed), (enrichment, ideas), (enrichment, ideas))
    assert plan.rename == [renamed] and plan.enrichment == []


def test_renombrado_con_la_copia_vieja_pide_el_modelo(data):
    repos, enrichment, ideas = data
    renamed = repos[0].model_copy(update={"full_name": repos[0].full_name + "-nuevo"})
    plan = plan_for(replace(repos, renamed), (enrichment, ideas), (without(enrichment, renamed), ideas))
    assert plan.rename == [] and plan.enrichment == [renamed]


# --- Freno ---

def test_freno_si_cambia_demasiado_del_catalogo(data):
    repos, enrichment, ideas = data
    half = len(repos) // 2 + 1
    live = [r.model_copy(update={"description": f"Otra descripción {i}."})
            for i, r in enumerate(repos[:half])] + repos[half:]
    plan = plan_for(live, (enrichment, ideas), (enrichment, ideas))
    reason = auto.brake(plan, len(repos))
    assert reason and f"{half} de {len(repos)}" in reason


def test_freno_si_harian_falta_demasiadas_llamadas(data, monkeypatch):
    monkeypatch.setattr(auto, "MAX_MODEL_CALLS", 1)
    repos, enrichment, ideas = data
    repo = active(repos).model_copy(update={"description": "Otra descripción del proyecto."})
    plan = plan_for(replace(repos, repo), (enrichment, ideas), (enrichment, ideas))
    assert "llamadas" in auto.brake(plan, len(repos))


# --- Qué se publica ---

def test_publica_lo_que_quedo_al_dia_y_lista_lo_que_fallo(data):
    repos, enrichment, ideas = data
    a, b = repos[0], repos[1]
    public = diff_catalog(repos, repos, without(enrichment, a, b), ideas)
    after = diff_catalog(repos, repos, without(enrichment, b), ideas)
    to_enrich, to_ideas, failed = auto.ready(public, after, pending=set())
    assert to_enrich == [a] and to_ideas == []
    assert failed == [("enriquecimiento", b, auto.FAILED_REASON)]


def test_lo_pendiente_por_version_no_cuenta_como_falla(data):
    repos, enrichment, ideas = data
    public = diff_catalog(repos, repos, without(enrichment, repos[0]), ideas)
    _, _, failed = auto.ready(public, public, pending={("enriquecimiento", repos[0].github_id)})
    assert failed == []


def test_valida_repo_por_repo(data):
    repos, enrichment, _ = data
    good, bad = repos[0], repos[1]
    message = f"{bad.full_name}: categorías que no existen: ['x']"

    def validate(records):
        if records[0]["github_id"] == bad.github_id:
            raise ValueError(f"El archivo no es válido:\n- {message}")
    valid, invalid = auto.split_valid([good, bad], enrichment, validate)
    assert valid == [good] and invalid == [(bad, message)]


def test_codigo_de_salida(data):
    repos, _, _ = data
    assert auto.Outcome().code == auto.DONE
    assert auto.Outcome(failed=[("ideas", repos[0], "x")]).code == auto.PARTIAL
    assert auto.Outcome(stopped="demasiado").code == auto.STOPPED


def test_el_informe_lista_todos_los_repos_sin_recortar(data):
    repos, _, _ = data
    outcome = auto.Outcome(published={"enriquecimiento": repos[:15], "ideas": []},
                           failed=[("ideas", repos[20], auto.FAILED_REASON)])
    text = auto.report(outcome, auto.Plan(), diff_catalog(repos, repos, {}, {}), len(repos))
    assert all(r.full_name in text for r in repos[:15]) and "más" not in text
    assert repos[20].full_name in text


# --- De punta a punta (vista, base, modelo y escritura simulados) ---

def fingerprint(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


@pytest.fixture
def simulated(monkeypatch, data, tmp_path):
    repos, _, _ = data
    calls = {"generate": [], "enrich": [], "write": []}
    monkeypatch.setattr(auto, "read_view", lambda: (repos, ["github_id"]))
    monkeypatch.setattr(auto, "generate", lambda rs, out, provider: calls["generate"].append(out))
    monkeypatch.setattr(auto, "enrich", lambda rs, out, provider: calls["enrich"].append(out))
    monkeypatch.setattr(auto, "write_database",
                        lambda plan, delete_orphans, **kw: calls["write"].append((plan, delete_orphans)))
    informe = tmp_path / "informe.md"

    def run(published, *flags):
        monkeypatch.setattr(auto, "read_published", lambda: published)
        monkeypatch.setattr("sys.argv", ["auto_refresh_ai_data", "--informe", str(informe), *flags])
        with pytest.raises(SystemExit) as exit_:
            auto.main()
        return exit_.value.code, informe.read_text(encoding="utf-8")
    return run, calls


def test_publica_sin_modelo_lo_que_la_copia_ya_tiene_y_no_toca_los_archivos(simulated, data):
    repos, enrichment, ideas = data
    run, calls = simulated
    before = fingerprint(ENRICHMENT_FILE), fingerprint(IDEAS_FILE)
    missing = repos[0]
    code, text = run({"enrichment": without(enrichment, missing), "ideas": without(ideas, missing)})
    assert code == auto.DONE
    (plan, delete_orphans), = calls["write"]
    assert plan.publish_enrichment == [missing] and plan.publish_ideas == [missing]
    assert not delete_orphans
    assert all(out.parent != ENRICHMENT_FILE.parent for out in calls["generate"] + calls["enrich"])
    assert (fingerprint(ENRICHMENT_FILE), fingerprint(IDEAS_FILE)) == before
    assert missing.full_name in text


def test_frena_sin_llamar_al_modelo_ni_publicar(simulated):
    run, calls = simulated
    code, text = run({"enrichment": {}, "ideas": {}})     # todo "nuevo": el 100 % del catálogo
    assert code == auto.STOPPED
    assert calls == {"generate": [], "enrich": [], "write": []}
    assert "Detenida antes de llamar al modelo" in text


def test_permitir_mas_cambios_levanta_el_freno_una_vez(simulated):
    run, calls = simulated
    code, _ = run({"enrichment": {}, "ideas": {}}, "--permitir-mas-cambios")
    assert code == auto.DONE and len(calls["write"]) == 1


def test_si_el_proveedor_corta_publica_lo_que_alcanzo(simulated, data, monkeypatch):
    repos, enrichment, ideas = data
    run, calls = simulated

    def cut(repos_, out, provider):
        raise SystemExit("gemini: límite de uso alcanzado\nParece el límite del día.")
    monkeypatch.setattr(auto, "enrich", cut)
    missing = active(repos)
    code, text = run({"enrichment": without(enrichment, missing), "ideas": without(ideas, missing)})
    assert "cortó la corrida" in text and "gemini: límite de uso alcanzado" in text
    assert len(calls["write"]) == 1
