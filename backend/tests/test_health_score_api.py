"""Integración HTTP del `health_score`: apagado por defecto, encendido con flag.

Reglas que estas pruebas fijan:

- Sin `HEALTH_SCORE_ENABLED`, `health_score` sigue viajando en `null` (regresión
  del comportamiento publicado: no se inventan números).
- Con el flag activo, el listado y la ficha publican un float 0..100 del motor
  v1 y la respuesta sigue cumpliendo `shared.contracts.repo.Repo`.
"""
from datetime import datetime, timedelta, timezone

import pytest

from conftest import TEST_DSN, FakeRepository, build_client, detail_row, list_row
from backend.app.core.config import Settings
from shared.contracts.repo import Repo


def _settings(enabled: bool) -> Settings:
    return Settings(database_url=TEST_DSN, health_score_enabled=enabled)


def _pushed_days_ago(days: int) -> str:
    return (datetime.now(timezone.utc) - timedelta(days=days)).isoformat()


def test_default_settings_keep_health_score_null():
    assert Settings().health_score_enabled is False
    repository = FakeRepository([list_row()], detail=detail_row())
    with build_client(repository, settings=_settings(False)) as client:
        item = client.get("/repos").json()[0]
        detail = client.get("/repos/keycloak/keycloak").json()["repo"]

    assert item["health_score"] is None
    assert detail["health_score"] is None


def test_enabled_engine_publishes_a_number_for_list_and_detail():
    row = list_row(pushed_at=_pushed_days_ago(10))
    repository = FakeRepository([row], detail=detail_row(pushed_at=row["pushed_at"]))
    with build_client(repository, settings=_settings(True)) as client:
        item = client.get("/repos").json()[0]
        detail = client.get("/repos/keycloak/keycloak").json()["repo"]

    for payload in (item, detail):
        assert isinstance(payload["health_score"], float)
        assert 0.0 <= payload["health_score"] <= 100.0
        # El contrato compartido sigue validando la respuesta completa.
        assert Repo.model_validate(payload).health_score == payload["health_score"]


def test_enabled_engine_caps_archived_repositories_at_the_low_tone():
    row = list_row(pushed_at=_pushed_days_ago(5), archived=True)
    with build_client(FakeRepository([row]), settings=_settings(True)) as client:
        item = client.get("/repos").json()[0]

    # Techo del tono `low` (umbral 60 del frontend): un archivado nunca sale "sano".
    assert item["archived"] is True
    assert item["health_score"] <= 59.0


def test_enabled_engine_without_issues_renormalizes_instead_of_zero():
    row = list_row(pushed_at=_pushed_days_ago(10), open_issues_count=None)
    with build_client(FakeRepository([row]), settings=_settings(True)) as client:
        item = client.get("/repos").json()[0]

    # Sin issues quedan recencia (0.40), licencia (0.15) y estado (0.20): se
    # renormaliza sobre 0.75 y no se pierde el 25 % como si fuera un 0.
    assert item["health_score"] == 100.0


def test_env_flag_is_parsed_leniently_and_rejects_garbage(monkeypatch):
    monkeypatch.delenv("HEALTH_SCORE_ENABLED", raising=False)
    assert Settings.from_env().health_score_enabled is False
    monkeypatch.setenv("HEALTH_SCORE_ENABLED", "true")
    assert Settings.from_env().health_score_enabled is True
    monkeypatch.setenv("HEALTH_SCORE_ENABLED", "quizas")
    with pytest.raises(ValueError, match="HEALTH_SCORE_ENABLED"):
        Settings.from_env()
