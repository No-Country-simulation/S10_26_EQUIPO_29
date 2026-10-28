from fastapi.testclient import TestClient
from backend.app.main import create_app
from backend.app.core.config import Settings


def test_health_does_not_require_external_services():
    with TestClient(create_app(Settings())) as client:
        response = client.get("/api/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


def test_cors_allows_only_configured_origin():
    with TestClient(create_app(Settings(cors_origins=("http://localhost:4173",)))) as client:
        for origin, expected in [("http://localhost:4173", 200), ("https://example.com", 400)]:
            response = client.options("/api/health", headers={
                "Origin": origin, "Access-Control-Request-Method": "GET",
            })
            assert response.status_code == expected


def test_unimplemented_catalog_is_not_a_fake_success():
    with TestClient(create_app(Settings())) as client:
        assert client.get("/api/repos").status_code == 404
