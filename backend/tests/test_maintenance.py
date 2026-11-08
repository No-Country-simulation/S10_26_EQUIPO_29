"""Maintenance is computed at read time, independently from the health engine."""
from datetime import datetime, timedelta, timezone

import pytest

from backend.app.services.catalog import compute_is_maintained
from backend.app.core.config import Settings
from conftest import FakeRepository, TEST_DSN, build_client, detail_row

NOW = datetime(2026, 11, 8, 12, tzinfo=timezone.utc)


@pytest.mark.parametrize('archived,pushed,expected', [
    (True, None, False),
    (True, NOW, False),
    (False, NOW, True),
    (False, NOW - timedelta(days=180), True),
    (False, NOW - timedelta(days=180, seconds=1), False),
    (False, None, None),
    (None, NOW, None),
    ('false', NOW, None),
    (False, NOW + timedelta(seconds=1), None),
    (False, NOW.replace(tzinfo=None), True),
    (False, NOW.astimezone(timezone(timedelta(hours=-3))), True),
])
def test_maintenance_boundary_and_unknowns(archived, pushed, expected):
    assert compute_is_maintained(archived, pushed, reference_time=NOW) is expected


@pytest.mark.parametrize('date_kind,expected', [
    ('recent', True), ('old', False), ('missing', None),
    ('invalid', None), ('future', None),
])
@pytest.mark.parametrize('health_enabled', [False, True])
def test_list_and_detail_agree_and_preserve_health(date_kind, expected, health_enabled):
    now = datetime.now(timezone.utc)
    pushed = {
        'recent': (now - timedelta(days=1)).isoformat(),
        'old': (now - timedelta(days=181)).isoformat(),
        'missing': None,
        'invalid': '2026-99-99T00:00:00Z',
        'future': (now + timedelta(days=1)).isoformat(),
    }[date_kind]
    row = detail_row(pushed_at=pushed, disabled=False, is_maintained='stale value ignored')
    settings = Settings(database_url=TEST_DSN, health_score_enabled=health_enabled)
    with build_client(FakeRepository([row], detail=row), settings=settings) as client:
        listing = client.get('/repos')
        detail = client.get('/repos/keycloak/keycloak')
    if date_kind in ('missing', 'invalid'):
        # Repo v1.2 exige pushed_at válido: no cambiar el contrato ni inventar fechas.
        assert listing.status_code == detail.status_code == 503
        return
    assert listing.status_code == detail.status_code == 200
    for repo in (listing.json()[0], detail.json()['repo']):
        assert repo['is_maintained'] is expected
        if health_enabled:
            assert isinstance(repo['health_score'], (int, float))
            assert 0 <= repo['health_score'] <= 100
        else:
            assert repo['health_score'] is None


def test_disabled_remains_separate_from_maintenance():
    row = detail_row(disabled=True, pushed_at=datetime.now(timezone.utc).isoformat())
    with build_client(FakeRepository([row], detail=row)) as client:
        repo = client.get('/repos').json()[0]
    assert repo['disabled'] is True
    assert repo['is_maintained'] is True
