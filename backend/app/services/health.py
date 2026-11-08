"""Motor de `health_score` (propuesta v1): índice ponderado por reglas.

Estado: la fórmula es una **propuesta pendiente de aprobación** del equipo
(`backend/docs/health-score-propuesta.md`, rama `fix/openbridge-health-assets-ui`).
Este módulo la implementa de forma determinista y auditable, pero la API sólo la
publica cuando `HEALTH_SCORE_ENABLED=true`; por defecto `health_score` sigue en
`null` (ver `backend/docs/health-score-implementation.md`).

Reglas que el motor garantiza:

- Un factor sin datos es `None` y se excluye del promedio ponderado; nunca se
  sustituye por 0 (un 0 significa «evidencia de problema», no «sin dato»).
- Si falta `pushed_at` o la cobertura ponderada es menor que `min_coverage`, el
  resultado es `None`: mejor «Sin evaluar» que un número inventado.
- El resultado se acota a [0, 100], se redondea a un decimal y se acompaña de
  sus factores, su versión y su fecha de cálculo.
- `archived`/`disabled` fijan un techo en el mayor valor del tono `low`; no se
  mezclan con la puntuación como si fueran una enfermedad.

Ningún componente usa datos que no existan hoy en `catalog_repositories`
(`stargazers_count`, `open_issues_count`, `pushed_at`, `archived`, `disabled`,
`license_spdx_id`). La fórmula histórica del acelerador
(`commit_velocity*0.15 + security*0.20 + docs*0.65`) queda descartada por falta
de esas fuentes; ver la documentación de implementación.
"""
from dataclasses import dataclass
from datetime import datetime, timezone
from math import isfinite
from typing import Mapping

GOOD_MIN = 80.0
MODERATE_MIN = 60.0
LOW_CEILING = MODERATE_MIN - 1.0
"""Mayor puntaje que el frontend sigue mostrando con tono `low` (umbral 60)."""

FACTORS = ("recencia", "actividad_issues", "licencia", "estado")


@dataclass(frozen=True)
class HealthProfile:
    """Parámetros versionados del cálculo. Cambiarlos exige una versión nueva."""

    version: str
    weights: Mapping[str, float]
    recency_buckets: tuple[tuple[int, float], ...]
    recency_floor: float = 0.0
    license_ambiguous_score: float = 0.5
    treat_null_license_as_zero: bool = True
    min_coverage: float = 0.5

    def __post_init__(self) -> None:
        if not self.version or not self.version.strip():
            raise ValueError("La versión del perfil no puede estar vacía.")
        if set(self.weights) != set(FACTORS):
            raise ValueError(f"El perfil debe ponderar exactamente {sorted(FACTORS)}.")
        for name, weight in self.weights.items():
            if not isfinite(weight) or not 0.0 <= weight <= 1.0:
                raise ValueError(f"El peso de '{name}' debe estar entre 0 y 1.")
        total = sum(self.weights.values())
        if abs(total - 1.0) > 1e-9:
            raise ValueError(f"Los pesos deben sumar 1; suman {total}.")
        previous = 0
        for limit, score in self.recency_buckets:
            if not isinstance(limit, int) or limit <= previous:
                raise ValueError("Los umbrales de recencia deben ser enteros crecientes.")
            if not isfinite(score) or not 0.0 <= score <= 1.0:
                raise ValueError("Cada puntaje de recencia debe estar entre 0 y 1.")
            previous = limit
        if not isfinite(self.recency_floor) or not 0.0 <= self.recency_floor <= 1.0:
            raise ValueError("El piso de recencia debe estar entre 0 y 1.")
        for name, value in (
            ("license_ambiguous_score", self.license_ambiguous_score),
            ("min_coverage", self.min_coverage),
        ):
            if not isfinite(value) or not 0.0 <= value <= 1.0:
                raise ValueError(f"'{name}' debe estar entre 0 y 1.")


HEALTH_PROFILE_V1 = HealthProfile(
    version="v1",
    # Reglas de la propuesta B (índice por reglas, sin dependencias externas).
    weights={"recencia": 0.40, "actividad_issues": 0.25, "licencia": 0.15, "estado": 0.20},
    recency_buckets=((30, 1.0), (90, 0.75), (180, 0.5), (365, 0.25)),
    recency_floor=0.0,
    license_ambiguous_score=0.5,
    treat_null_license_as_zero=True,
    min_coverage=0.5,
)


@dataclass(frozen=True)
class HealthInput:
    """Señales crudas de un repositorio. `None` significa «sin dato»."""

    pushed_at: datetime | None
    open_issues_count: int | None
    stargazers_count: int | None
    license_spdx_id: str | None
    archived: bool | None
    disabled: bool | None


@dataclass(frozen=True)
class HealthResult:
    """Resultado auditable: el número más el porqué."""

    score: float
    tone: str
    factors: Mapping[str, float]
    coverage: float
    version: str
    computed_at: datetime


def _utc(value: datetime) -> datetime:
    """Normaliza a UTC para que la edad no dependa de la zona del servidor."""
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def _recency_score(
    pushed_at: datetime | None, now: datetime, profile: HealthProfile
) -> float | None:
    """Días desde el último push frente a los umbrales del perfil."""
    if pushed_at is None:
        return None
    age_days = (_utc(now) - _utc(pushed_at)).total_seconds() / 86400
    if age_days < 0:
        # Fecha futura: reloj desfasado o dato corrupto; no se premia ni castiga.
        age_days = 0.0
    for limit, score in profile.recency_buckets:
        if age_days <= limit:
            return score
    return profile.recency_floor


def _issues_score(
    open_issues_count: int | None, stargazers_count: int | None
) -> float | None:
    """Issues abiertos normalizados por el tamaño de la comunidad (0.1×stars)."""
    if open_issues_count is None or stargazers_count is None:
        return None
    if open_issues_count < 0 or stargazers_count < 0:
        return None
    expected = max(1.0, stargazers_count * 0.1)
    ratio = min(1.0, open_issues_count / expected)
    return 1.0 - ratio


def _license_score(license_spdx_id: str | None, profile: HealthProfile) -> float | None:
    """SPDX válida 1.0; `NOASSERTION` ambiguo; `NULL` nulo o sin dato según perfil."""
    if license_spdx_id is None:
        return 0.0 if profile.treat_null_license_as_zero else None
    value = license_spdx_id.strip()
    if not value or value.upper() == "NONE":
        return 0.0
    if value.upper() == "NOASSERTION":
        return profile.license_ambiguous_score
    return 1.0


def _status_score(archived: bool | None, disabled: bool | None) -> float | None:
    """Estado operativo: 0 si está archivado/deshabilitado, 1 si sigue activo.

    `disabled` desconocido no penaliza (misma aproximación que el filtro
    `maintenance=active`: `COALESCE(disabled, FALSE)`); `archived` desconocido
    deja el estado sin dato porque es la señal principal de abandono.
    """
    if archived is True or disabled is True:
        return 0.0
    if archived is None:
        return None
    return 1.0


def _tone(score: float) -> str:
    """Mismo corte que el frontend (`ToolCard`/`ToolDetail`): 80 y 60."""
    if score >= GOOD_MIN:
        return "good"
    if score >= MODERATE_MIN:
        return "moderate"
    return "low"


def compute_health(
    inputs: HealthInput,
    *,
    now: datetime,
    profile: HealthProfile = HEALTH_PROFILE_V1,
) -> HealthResult | None:
    """Calcula el score o `None` si no hay evidencia suficiente.

    Los factores disponibles se renormalizan entre sí: un repositorio sin
    `open_issues_count` no pierde el 25 % de su nota, se evalúa con el 75 %
    restante y se informa `coverage`.
    """
    recency = _recency_score(inputs.pushed_at, now, profile)
    if recency is None:
        # Regla de publicación propuesta (§5): sin `pushed_at` no hay score.
        return None

    computed: dict[str, float | None] = {
        "recencia": recency,
        "actividad_issues": _issues_score(
            inputs.open_issues_count, inputs.stargazers_count
        ),
        "licencia": _license_score(inputs.license_spdx_id, profile),
        "estado": _status_score(inputs.archived, inputs.disabled),
    }
    available: dict[str, float] = {
        name: value for name, value in computed.items() if value is not None
    }
    coverage = sum(profile.weights[name] for name in available)
    if coverage < profile.min_coverage - 1e-9:
        return None

    raw = sum(profile.weights[name] * value for name, value in available.items())
    score = 100.0 * raw / coverage
    if inputs.archived is True or inputs.disabled is True:
        # Techo `low`: archivado/deshabilitado no se mezcla con la puntuación.
        score = min(score, LOW_CEILING)
    score = round(min(100.0, max(0.0, score)), 1)
    return HealthResult(
        score=score,
        tone=_tone(score),
        factors=available,
        coverage=round(coverage, 4),
        version=profile.version,
        computed_at=_utc(now),
    )
