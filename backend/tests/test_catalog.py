from fastapi.testclient import TestClient
from backend.app.main import create_app
from backend.app.core.config import Settings


def test_catalog_detail_and_ideas_use_same_repository():
    with TestClient(create_app(Settings())) as client:
        response = client.get('/repos')
        assert response.status_code == 200
        repos = response.json()
        assert len(repos) > 0
        repo = repos[0]
        detail = client.get('/repos/' + repo['full_name'])
        assert detail.json() == {"repo": repo, "integration_ideas": []}
        assert client.get('/repos/' + repo['full_name'] + '/integration-ideas').status_code == 404
        assert client.get('/repos/unknown/missing').status_code == 404
        from ai.catalog import load_categories
        categories = set(load_categories())
        assert client.get('/categories').status_code == 404
        assert all(c['category_id'] in categories for r in repos for c in r['categories'])


def test_assistant_does_not_simulate_generation():
    with TestClient(create_app(Settings())) as client:
        response = client.post('/assistant', json={'query': 'Necesito una aplicación para gestionar usuarios'})
        assert response.status_code == 503
        assert response.json()['error']['code'] == 'provider_unavailable'
        invalid = client.post('/assistant', json={'query': 'hola'})
        assert invalid.status_code == 422
        assert invalid.json()['error']['code'] == 'invalid_query'


def test_summary_limit_is_250_characters():
    import pytest
    from pydantic import ValidationError
    from ai.catalog import load_repos
    from shared.contracts.repo import Repo
    record = load_repos()[0].model_dump()
    assert len(Repo.model_validate({**record, 'summary_es': 'á' * 250}).summary_es) == 250
    with pytest.raises(ValidationError):
        Repo.model_validate({**record, 'summary_es': 'á' * 251})
