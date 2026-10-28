"""Entrada ASGI. Ejecutar desde la raíz del repositorio."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.router import api_router
from backend.app.core.config import Settings


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or Settings.from_env()
    app = FastAPI(title="OpenBridge API")
    if settings.cors_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=list(settings.cors_origins),
            allow_methods=["GET", "POST"],
            allow_headers=["Content-Type", "Authorization"],
        )
    app.include_router(api_router, prefix="/api")
    return app


app = create_app()
