"""Entrada ASGI. Ejecutar desde la raíz del repositorio."""
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.exception_handlers import request_validation_exception_handler
from fastapi.responses import JSONResponse
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
    @app.exception_handler(RequestValidationError)
    async def validation_error(request: Request, exc: RequestValidationError):
        if request.url.path == "/assistant":
            return JSONResponse(status_code=422, content={"error": {"code": "invalid_query", "message": "La descripción debe contener entre 20 y 2000 caracteres."}})
        return await request_validation_exception_handler(request, exc)

    app.include_router(api_router)
    return app


app = create_app()
