"""Punto de registro de las rutas de la API."""
from fastapi import APIRouter
from backend.app.api.routes import assistant, repos

api_router = APIRouter()
for router in (repos.router, assistant.router):
    api_router.include_router(router)


@api_router.get("/health", tags=["health"])
def health() -> dict[str, str]:
    """Liveness del proceso; no certifica disponibilidad de base de datos ni IA."""
    return {"status": "ok"}
