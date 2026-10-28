# Backend OpenBridge

Base local de FastAPI. Solo está implementado `GET /api/health` (liveness).
Los routers de catálogo, ficha, categorías, ideas y asistente están preparados,
pero todavía no exponen operaciones ni consultan datos. No se cambió el frontend.

## Ejecutar desde la raíz del repositorio

```bash
python3 -m venv backend/.venv
backend/.venv/bin/python -m pip install -e './backend[dev]'
cp backend/.env.example backend/.env
backend/.venv/bin/python -m uvicorn backend.app.main:app --reload --env-file backend/.env --port 8000
```

Documentación: http://127.0.0.1:8000/docs

```bash
backend/.venv/bin/python -m pytest backend/tests
```

## Responsabilidades

- `app/api/routes`: HTTP, validación de entrada y respuesta.
- `app/services`: coordinación y reglas de negocio.
- `app/repositories`: consultas a base de datos.
- `app/clients`: comunicación con IA cuando se acuerde su interfaz.
- `app/db`: conexiones y sesiones.
- `app/core`: configuración de entorno.

Importar los modelos desde `shared.contracts`, sin copiarlos aquí. Ejecutar
siempre desde la raíz para que estén disponibles `backend` y `shared`.

Pendientes: acceso y esquema de base de datos, rutas finales, paginación/filtros,
interfaz de IA y política de errores/autenticación. `health` no verifica estos servicios.

## Docker

Desde la raíz:

```bash
docker build -f backend/Dockerfile -t openbridge-backend .
docker run --rm -p 8000:8000 --env-file backend/.env openbridge-backend
```

Esta imagen inicia únicamente la API; no incluye base de datos ni ejecución de IA.
