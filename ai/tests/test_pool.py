"""Tests del pooling (sin modelo)."""

from ai.eval.pool import need_pool, query_pool


def test_el_pozo_une_las_dos_variantes_hasta_la_profundidad():
    rankings = {"actual": ["o/viejo", "n/a", "n/b"], "base": ["n/c", "o/viejo", "n/a"]}
    assert query_pool(rankings, [], {"n/a", "n/b", "n/c"}, depth=2) == ["n/a", "n/c"]


def test_el_pozo_deja_fuera_los_viejos_y_los_ya_aceptables():
    rankings = {"actual": ["o/viejo", "n/a"], "base": ["n/b"]}
    assert query_pool(rankings, ["n/b"], {"n/a", "n/b"}, depth=5) == ["n/a"]


def test_la_necesidad_toma_los_nuevos_de_su_categoria():
    categories = {"n/a": {"auth"}, "n/b": {"payments", "auth"}, "n/c": {"storage"}}
    assert need_pool("auth", ["n/b"], categories) == ["n/a"]
