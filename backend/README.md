# Backend OpenBridge

FastAPI sirve el JSON de ejemplo del equipo mediante `ai.catalog`. No hay
conexión a una base de datos ni generación IA activa.

| Ruta | Estado |
| --- | --- |
| `GET /health` | Liveness |
| `GET /repos` | Catálogo completo: array de `Repo` |
| `GET /repos/{owner}/{name}` | `RepoDetail`: `{repo, integration_ideas}`, o 404 |
| `POST /assistant` | Valida `AssistantRequest`; 422 con contrato de error o 503 `provider_unavailable` |

El dataset contiene 20 repos asignados a 6 categorías. La lista fija compartida
tiene 17 opciones; no todas tienen repos en esta muestra. No existe `/categories`.
No se sustituyen campos vacíos con estadísticas o contenido del mock del frontend.

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
- `app/clients`: reservado para clientes externos; el frontend consumirá directamente el servicio de IA.
- `app/db`: conexiones y sesiones.
- `app/core`: configuración de entorno.

Importar los modelos desde `shared.contracts`, sin copiarlos aquí. Ejecutar
siempre desde la raíz para que estén disponibles `backend` y `shared`.

Pendientes: base de datos, generación IA, persistencia de ideas, paginación y autenticación. `health` no verifica estos servicios.
Las búsquedas y filtros actuales se aplican en el frontend sobre el catálogo completo.

## Conectar el frontend local

Con la API ejecutándose en 8000, desde `frontend/`:

```bash
NEXT_PUBLIC_CATALOG_API_BASE_URL=http://127.0.0.1:8000/ npm run preview:stable
```

Las URLs se incorporan durante el build: un cambio requiere recompilar.
`NEXT_PUBLIC_CATALOG_API_BASE_URL` configura listado y ficha.
`NEXT_PUBLIC_ASSISTANT_API_BASE_URL` configura el servicio independiente de IA,
al que se añade `/assistant`. Cada URL vacía activa solo los mocks de ese servicio.
La variable anterior `NEXT_PUBLIC_API_BASE_URL` se acepta solo para el catálogo. No hay fallback automático a mocks ante fallos HTTP.
La variable no contiene secretos. No publicar un build con localhost en Sites.
CORS debe permitir el origen del frontend (el `.env.example` incluye 4173).

Las categorías se compilan desde `shared/contracts/categories.json` mediante
`scripts/sync-contracts.mjs`. El archivo generado se ignora en Git y no se edita.
Los IDs asignados a cada repo siguen llegando en `Repo.categories`.
El proveedor compartido carga el catálogo; cards, filtros y fichas consumen
ese estado. La ficha hace una sola petición para recibir el detalle con sus ideas, conservando la información
del catálogo mientras espera. Con su URL configurada, el asistente usa HTTP sin
espera simulada ni fallback a mocks. Su servicio debe autorizar el origen del frontend
mediante CORS. El endpoint local `/assistant` es únicamente un stub 503; no es
el generador de IA y no se selecciona automáticamente por configurar el catálogo.
Para comprobar ese fallo local se puede configurar explícitamente la URL del asistente
como `http://127.0.0.1:8000/`.

Los errores del asistente se traducen por `error.code` según v1.1, sin mostrar el
mensaje remoto ni exigirlo para reconocer el código. Códigos desconocidos y cuerpos
no JSON usan el mensaje técnico genérico. Los tres códigos del catálogo siguen
pendientes de definición por Data Engineering; no se inventan aquí.

## Docker

Desde la raíz:

```bash
docker build -f backend/Dockerfile -t openbridge-backend .
docker run --rm -p 8000:8000 --env-file backend/.env openbridge-backend
```

Esta imagen inicia únicamente la API; no incluye base de datos ni ejecución de IA.

## Resumen de herramienta

Ajuste local solicitado: `Repo.summary_es` admite hasta 250 caracteres.
El frontend prioriza ese resumen y usa `description` solo si falta.
La card reserva el enlace Ver más dentro de sus tres líneas; la ficha muestra
el texto completo. El cambio del contrato debe comunicarse al equipo antes de integrarlo.

## Respuesta de ficha

`shared/contracts/repo_detail.py` compone `Repo` e `IntegrationIdea`, sin modificar
sus campos. Es una propuesta HTTP local. `integration_ideas` es una lista (vacía
cuando no hay ideas), con hasta tres elementos del mismo repo. No existe la ruta
separada `/integration-ideas`. El catálogo sigue devolviendo un array de `Repo`.
