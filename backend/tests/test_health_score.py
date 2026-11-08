"""Motor `health_score` v1: reglas, normalización y tratamiento de datos faltantes.

Los vectores de `compute_health` son calculados a mano en cada test; si alguien
cambia pesos, umbrales o el reparto cuando faltan datos, estos números fallan.
"""
from dataclasses import replace
from datetime import datetime, timedelta, timezone
import json
from pathlib import Path

import pytest

from backend.app.services.health import (
    HEALTH_PROFILE_V1,
    HealthInput,
    HealthProfile,
    compute_health,
)

NOW = datetime(2026, 11, 7, 12, 0, tzinfo=timezone.utc)
SNAPSHOT = (
    Path(__file__).resolve().parents[2] / "ai" / "data" / "catalog" / "repos.json"
)


def health(pushed_days_ago: int | None = None, **overrides) -> HealthInput:
    """Entrada con recencia en días y el resto de señales por defecto sanas."""
    pushed_at = None if pushed_days_ago is None else NOW - timedelta(days=pushed_days_ago)
    values = {
        "pushed_at": pushed_at,
        "open_issues_count": 100,
        "stargazers_count": 1000,
        "license_spdx_id": "MIT",
        "archived": False,
        "disabled": None,
    }
    values.update(overrides)
    return HealthInput(**values)


def test_weights_must_sum_to_one():
    with pytest.raises(ValueError, match="sumar 1"):
        HealthProfile(
            version="malo",
            weights={
                "recencia": 0.5,
                "actividad_issues": 0.25,
                "licencia": 0.15,
                "estado": 0.2,
            },
            recency_buckets=((30, 1.0),),
        )


def test_profile_requires_exactly_the_four_factors():
    with pytest.raises(ValueError, match="ponderar exactamente"):
        HealthProfile(
            version="malo",
            weights={"recencia": 1.0},
            recency_buckets=((30, 1.0),),
        )


def test_profile_rejects_negative_weights_and_bad_buckets():
    with pytest.raises(ValueError, match="entre 0 y 1"):
        HealthProfile(
            version="malo",
            weights={
                "recencia": 1.2,
                "actividad_issues": 0.0,
                "licencia": -0.2,
                "estado": 0.0,
            },
            recency_buckets=((30, 1.0),),
        )
    with pytest.raises(ValueError, match="enteros crecientes"):
        HealthProfile(
            version="malo",
            weights=dict(HEALTH_PROFILE_V1.weights),
            recency_buckets=((90, 1.0), (30, 0.5)),
        )
    with pytest.raises(ValueError, match="no puede estar vacía"):
        HealthProfile(
            version=" ", weights=dict(HEALTH_PROFILE_V1.weights), recency_buckets=((30, 1.0),)
        )


@pytest.mark.parametrize(
    ("days", "expected"),
    [(0, 1.0), (30, 1.0), (31, 0.75), (90, 0.75), (91, 0.5), (180, 0.5), (181, 0.25), (365, 0.25), (366, 0.0), (4000, 0.0)],
)
def test_recency_buckets_are_inclusive(days: int, expected: float):
    result = compute_health(health(days), now=NOW)
    assert result is not None
    assert result.factors["recencia"] == expected


def test_future_pushed_at_is_treated_as_today_not_as_a_bonus():
    future = health(-5)
    result = compute_health(future, now=NOW)
    assert result is not None
    assert result.factors["recencia"] == 1.0


def test_naive_and_aware_timestamps_score_the_same():
    aware = compute_health(health(45), now=NOW)
    naive_input = health(45, pushed_at=(NOW - timedelta(days=45)).replace(tzinfo=None))
    naive = compute_health(naive_input, now=NOW.replace(tzinfo=None))
    assert aware is not None and naive is not None
    assert aware.score == naive.score



def test_issues_factor_returns_none_without_community_size():
    result = compute_health(health(10, open_issues_count=50, stargazers_count=None), now=NOW)
    assert result is not None
    assert "actividad_issues" not in result.factors


@pytest.mark.parametrize(
    ("open_issues", "stars", "expected"),
    [(0, 1000, 1.0), (100, 1000, 0.0), (50, 1000, 0.5), (150, 1000, 0.0), (5, 0, 0.0), (-1, 1000, None), (10, -5, None)],
)
def test_issues_factor_normalizes_by_ten_percent_of_stars(open_issues: int, stars: int, expected):
    row = health(10, open_issues_count=open_issues, stargazers_count=stars)
    result = compute_health(row, now=NOW)
    assert result is not None
    assert result.factors.get("actividad_issues") == expected


def test_license_factor_treats_noassertion_as_ambiguous():
    values = {"MIT": 1.0, "Apache-2.0": 1.0, "NOASSERTION": 0.5, "NONE": 0.0, "": 0.0, None: 0.0}
    for license_id, expected in values.items():
        result = compute_health(health(10, license_spdx_id=license_id), now=NOW)
        assert result is not None, license_id
        assert result.factors["licencia"] == expected, license_id


def test_license_null_can_mean_missing_data_when_the_profile_says_so():
    profile = replace(HEALTH_PROFILE_V1, treat_null_license_as_zero=False)
    result = compute_health(health(10, license_spdx_id=None), now=NOW, profile=profile)
    assert result is not None
    assert "licencia" not in result.factors


def test_status_factor_is_zero_when_archived_or_disabled_and_none_when_unknown():
    archived = compute_health(health(10, archived=True), now=NOW)
    disabled = compute_health(health(10, archived=False, disabled=True), now=NOW)
    unknown = compute_health(health(10, archived=None), now=NOW)
    assert archived is not None and archived.factors["estado"] == 0.0
    assert disabled is not None and disabled.factors["estado"] == 0.0
    assert unknown is not None and "estado" not in unknown.factors


def test_missing_pushed_at_publishes_no_score_at_all():
    assert compute_health(health(None), now=NOW) is None


def test_coverage_below_half_of_the_weights_publishes_no_score():
    # Solo recencia (0.40) < cobertura mínima (0.50): falta evidencia.
    profile = replace(HEALTH_PROFILE_V1, treat_null_license_as_zero=False)
    result = compute_health(
        health(10, open_issues_count=None, license_spdx_id=None, archived=None),
        now=NOW,
        profile=profile,
    )
    assert result is None


def test_full_evidence_vector():
    result = compute_health(health(10, open_issues_count=100, stargazers_count=1000), now=NOW)
    assert result is not None
    # 0.40*1 + 0.25*0 + 0.15*1 + 0.20*1 = 0.75 → 75.0
    assert result.score == 75.0
    assert result.tone == "moderate"
    assert result.coverage == 1.0
    assert set(result.factors) == {"recencia", "actividad_issues", "licencia", "estado"}


def test_missing_data_vector_renormalizes_the_available_weights():
    result = compute_health(
        health(400, open_issues_count=None, license_spdx_id=None, stargazers_count=500), now=NOW
    )
    assert result is not None
    # (0.20*1) / (0.40+0.15+0.20) = 26.666… → 26.7, no un cero por los ausentes.
    assert result.score == 26.7
    assert result.tone == "low"
    assert result.coverage == 0.75


def test_archived_repository_hits_the_low_tone_ceiling():
    result = compute_health(health(10, open_issues_count=0, archived=True), now=NOW)
    assert result is not None
    # Sería 80.0, pero el techo `low` lo baja a 59.0.
    assert result.score == 59.0
    assert result.tone == "low"


def test_only_recency_and_status_available_is_a_hundred_not_a_zero():
    profile = replace(HEALTH_PROFILE_V1, treat_null_license_as_zero=False)
    result = compute_health(
        health(10, open_issues_count=None, license_spdx_id=None), now=NOW, profile=profile
    )
    assert result is not None
    assert result.score == 100.0
    assert result.tone == "good"
    assert result.coverage == 0.6


def test_same_inputs_always_produce_the_same_score():
    first = compute_health(health(30, open_issues_count=37, stargazers_count=940), now=NOW)
    second = compute_health(health(30, open_issues_count=37, stargazers_count=940), now=NOW)
    assert first == second


def test_score_is_rounded_to_one_decimal():
    full = compute_health(
        health(10, open_issues_count=None, license_spdx_id="Apache-2.0"), now=NOW
    )
    assert full is not None
    assert full.score == 100.0
    # (0.40*0.5 + 0.15*0.5 + 0.20*1) / 0.75 = 63.333… → 63.3
    partial = compute_health(
        health(130, open_issues_count=None, license_spdx_id="NOASSERTION"), now=NOW
    )
    assert partial is not None
    assert partial.score == 63.3


def test_snapshot_100_repositories_is_deterministic_and_complete():
    """Vector de regresión sobre el snapshot aprobado (sin red ni base de datos).

    En el snapshot `open_issues_count` es NULL en los 100: el motor evalúa con
    recencia + licencia + estado (cobertura 0.75) y NUNCA guarda un 0 por ese
    dato ausente.
    """
    repos = json.loads(SNAPSHOT.read_text(encoding="utf-8"))
    results = []
    for repo in repos:
        results.append(
            compute_health(
                HealthInput(
                    pushed_at=datetime.fromisoformat(
                        repo["pushed_at"].replace("Z", "+00:00")
                    ),
                    open_issues_count=repo.get("open_issues_count"),
                    stargazers_count=repo.get("stargazers_count"),
                    license_spdx_id=repo.get("license_spdx_id"),
                    archived=repo.get("archived"),
                    disabled=repo.get("disabled"),
                ),
                now=NOW,
            )
        )

    assert len(results) == 100
    assert all(result is not None for result in results)
    assert all(0.0 <= result.score <= 100.0 for result in results)
    assert all("actividad_issues" not in result.factors for result in results)
    assert all(result.coverage == 0.75 for result in results)
    assert all(result.version == "v1" for result in results)
    scores = [result.score for result in results]
    tones = {
        tone: sum(1 for result in results if result.tone == tone)
        for tone in ("good", "moderate", "low")
    }
    # Distribución estable: es el argumento principal para NO publicar aún
    # (ver «Limitaciones» en docs/health-score-implementation.md).
    assert min(scores) == 60.0
    assert max(scores) == 100.0
    assert tones == {"good": 98, "moderate": 2, "low": 0}

