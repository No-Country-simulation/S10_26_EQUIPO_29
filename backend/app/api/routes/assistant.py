from fastapi import APIRouter
from fastapi.responses import JSONResponse
from shared.contracts.assistant import AssistantRequest, ErrorResponse

router = APIRouter(tags=["assistant"])


@router.post("/assistant", responses={503: {"model": ErrorResponse}})
def assistant(request: AssistantRequest):
    # No hay generador implementado en esta rama. No simular éxito.
    error = ErrorResponse(error={"code": "provider_unavailable", "message": "El asistente no está disponible ahora."})
    return JSONResponse(status_code=503, content=error.model_dump())
