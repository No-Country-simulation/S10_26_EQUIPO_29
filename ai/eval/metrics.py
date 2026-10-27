"""Métricas de la búsqueda contra el golden set: hit@k y MRR@k."""

from dataclasses import dataclass


@dataclass(frozen=True)
class QueryOutcome:
    """Resultado de una consulta del golden set."""

    query_id: str
    answerable: bool
    rank: int | None    # Posición del primer esperado. None si no aparece.


def first_hit_rank(ranking: list[str], expected: list[str]) -> int | None:
    """Posición del primer repo esperado en el ranking."""
    for position, full_name in enumerate(ranking, start=1):
        if full_name in expected:
            return position
    return None


def summarize(outcomes: list[QueryOutcome], k: int) -> dict:
    """hit@k y MRR@k sobre las consultas con respuesta.

    Las consultas sin respuesta no cuentan.
    """
    ranks = [o.rank for o in outcomes if o.answerable]
    if not ranks:
        raise ValueError("no hay consultas con respuesta")
    hits = [r is not None and r <= k for r in ranks]
    reciprocal = [1 / r if hit else 0.0 for r, hit in zip(ranks, hits)]
    return {"n": len(ranks),
            "hits": sum(hits),
            "hit_rate": sum(hits) / len(ranks),
            "mrr": sum(reciprocal) / len(ranks),
}
