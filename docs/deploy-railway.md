# Guía de despliegue en Railway (OpenBridge)

Arquitectura de producción:
- **GitHub + GitHub Actions**: CI/CD (`.github/workflows/ci-deploy-railway.yml`).
- **Railway**: tres servicios independientes construidos desde la **raíz del repositorio**:
  1. `frontend` (`frontend/Dockerfile`)
  2. `backend` (`backend/Dockerfile`)
  3. `ai` (`ai/Dockerfile`)
- **Supabase**: PostgreSQL existente (sin cambios de DDL ni reprocesamientos en este despliegue).

---

## 1. Configuración de servicios en Railway

Todos los servicios deben conectarse al repositorio `No-Country-simulation/S10_26_EQUIPO_29` (rama `main`) con **Root Directory = `/` (raíz del repositorio)** para acceder a `shared/` y a sus respectivos Dockerfiles.

| Servicio | Dockerfile | Config-as-Code (opcional) | Puerto interno | Healthcheck | Dominio / HTTPS |
|---|---|---|---|---|---|
| `backend` | `backend/Dockerfile` | `backend/railway.toml` | `$PORT` (fallback `8000`) | `/health` (60 s) | Generar dominio público HTTPS en Railway Networking |
| `ai` | `ai/Dockerfile` | `ai/railway.toml` | `$PORT` (fallback `8001`) | `/health` (300 s) | Generar dominio público HTTPS en Railway Networking |
| `frontend` | `frontend/Dockerfile` | `frontend/railway.toml` | `$PORT` (fallback `4173`) | `/` (60 s) | Generar dominio público HTTPS en Railway Networking |

> **Importante:** No crear un `railway.toml` en la raíz del repositorio para evitar colisiones entre los tres servicios. Si usas Config-as-Code en Railway UI, apunta cada servicio a su archivo (`backend/railway.toml`, `ai/railway.toml`, `frontend/railway.toml`).

### Volumen persistente del servicio `ai`

Configurar un **Volume** en el servicio `ai`:
- **Mount Path**: `/data/huggingface`
- **Propósito**: persistir la caché del modelo `google/embeddinggemma-300m` (~1,2 GB) entre despliegues (`HF_HOME=/data/huggingface` ya está definido en `ai/Dockerfile`).
- **Nota de RAM y réplicas**: `embeddinggemma-300m` en CPU requiere ~1,2 GB de RAM; se recomienda asignar al menos 2 GB de memoria al servicio `ai` en Railway y mantener **1 sola réplica** (los volúmenes de Railway no se comparten entre múltiples réplicas).

---

## 2. Variables de entorno por servicio en Railway

### Servicio `backend`

| Variable | Valor / Formato | Requerida | Notas |
|---|---|---|---|
| `DATABASE_URL` | `postgresql+psycopg://<ROL_LECTOR>.<project_ref>:<PASSWORD>@<POOLER_HOST>:5432/postgres?sslmode=require` | Sí | Usar rol de solo lectura (ver sección Supabase). Nunca credenciales administrativas. |
| `CORS_ORIGINS` | `https://<dominio-publico-frontend>` | Sí | Sin barra final (`/`). Si hay dominio custom adicional, separar por comas. |
| `HEALTH_SCORE_ENABLED` | `false` | No | Mantener `false` salvo aprobación explícita de la fórmula v1. |
| `CATALOG_PAGE_SIZE` | `20` | No | Por defecto `20`. |
| `CATALOG_MAX_PAGE_SIZE` | `100` | No | Por defecto `100`. |
| `DB_CONNECT_TIMEOUT` | `5` | No | Segundos. |
| `DB_STATEMENT_TIMEOUT_MS` | `8000` | No | Milisegundos. |

### Servicio `ai`

| Variable | Valor / Formato | Requerida | Notas |
|---|---|---|---|
| `AI_READER_DATABASE_URL` | `postgresql://openbridge_ai_reader.<project_ref>:<PASSWORD>@<POOLER_HOST>:5432/postgres?sslmode=require` | Sí | Percent-encoding en caracteres especiales de la contraseña. |
| `AI_CATALOG_SOURCE` | `database` | Sí | Lee el catálogo publicado y vectores desde Supabase. |
| `AI_REQUIRE_DATABASE` | `true` | Sí | Impide caída silenciosa al snapshot local (`files`) si Supabase falla al arrancar. |
| `AI_CORS_ORIGINS` | `https://<dominio-publico-frontend>` | Sí | Sin barra final (`/`). |
| `AI_LLM_PROVIDER` | `gemini` | Sí | Proveedor principal. |
| `AI_LLM_FALLBACK` | `groq-low,claude-haiku` | No | Respaldos en orden; los que no tengan clave se omiten. |
| `GEMINI_API_KEY` | `<secret>` | Sí | Clave de Google AI Studio. |
| `GROQ_API_KEY` | `<secret>` | Recomendado | Respaldo `groq-low`. |
| `ANTHROPIC_API_KEY` | `<secret>` | Opcional | Solo si se usa `claude-haiku`. |
| `HF_TOKEN` | `<secret>` | Sí (1.er arranque) | Token Read de Hugging Face para descargar `google/embeddinggemma-300m` (modelo con licencia aceptada) hacia `/data/huggingface`. |
| `HF_HOME` | `/data/huggingface` | Definida en Dockerfile | Persistida mediante el volumen de Railway. |
| `AI_EMBEDDING_MODEL` | `embeddinggemma` | No | Por defecto `embeddinggemma`. |
| `AI_CATALOG_RELOAD_MINUTES` | `10` | No | Minutos entre revisiones de nueva publicación en Supabase (`0` = solo al arrancar). |

### Servicio `frontend`

> Next.js usa exportación estática (`output: 'export'`). Las variables `NEXT_PUBLIC_*` se incrustan **en tiempo de compilación** (`ARG` en `frontend/Dockerfile`). Si cambian los dominios de `backend` o `ai`, hay que **recompilar/redesplegar** `frontend`.

| Variable | Valor / Formato | Requerida | Notas |
|---|---|---|---|
| `NEXT_PUBLIC_CATALOG_API_BASE_URL` | `https://<dominio-publico-backend>` | Sí | Apunta al servicio `backend` real. |
| `NEXT_PUBLIC_ASSISTANT_API_BASE_URL` | `https://<dominio-publico-ai>` | Sí | Apunta directamente al servicio `ai` (nunca al `POST /assistant` 503 del `backend`). |
| `NEXT_PUBLIC_MOCK_MODE` | `false` | Sí | Desactiva datos mock en producción. |

---

## 3. Supabase y discrepancia de roles documentada

En el repositorio existe una discrepancia entre dos archivos del backend:
- **`backend/sql/001_lector_api.sql`** define el rol `openbridge_api_reader` con `SELECT` sobre `public.v_repos_for_ai`, `public.catalog_repositories` (con política RLS) y `ai.ai_repo_enrichment`, `ai.ai_repo_categories`, `ai.ai_integration_ideas`.
- **`backend/.env.example`** (línea 2) y **`backend/docs/acceso-base-datos.md`** documentan `openbridge_ai_reader.<project_ref>` porque en la verificación de Supabase del 31-oct-2026 solo existían los roles `openbridge_ai_reader`, `openbridge_ai_writer` y `openbridge_data_sync` (el rol `openbridge_api_reader` no estaba creado en la instancia o faltaba aplicar permisos/rotar contraseña).

Antes del primer despliegue, el administrador de datos debe confirmar en Supabase (solo lectura, sin usar credenciales administrativas en los servicios):
1. Qué rol lector tiene `SELECT` vigente sobre `public.catalog_repositories`, `public.v_repos_for_ai` y `ai.*` para `backend` (`openbridge_api_reader` o `openbridge_ai_reader`), y asignar esa credencial a `DATABASE_URL`.
2. Que `openbridge_ai_reader` tiene `SELECT` sobre `public.v_repos_for_ai`, `ai.ai_repo_enrichment`, `ai.ai_repo_categories`, `ai.ai_processing` y `ai.ai_embeddings` (según `ai/sql/004_procesamiento_ia.sql` y `ai/sql/005_lector_vectores_ia.sql`), y asignar esa credencial a `AI_READER_DATABASE_URL`.

---

## 4. GitHub Secrets y Variables para CI/CD

Configurar en **Settings → Secrets and variables → Actions** del repositorio `No-Country-simulation/S10_26_EQUIPO_29`:

### Secrets
- `RAILWAY_TOKEN`: Project Token de Railway asociado al proyecto y entorno `production`.

### Variables
- `FRONTEND_PUBLIC_URL`: `https://<dominio-publico-frontend>` (sin barra final).
- `BACKEND_PUBLIC_URL`: `https://<dominio-publico-backend>` (sin barra final).
- `AI_PUBLIC_URL`: `https://<dominio-publico-ai>` (sin barra final).
- `RAILWAY_SERVICE_FRONTEND` *(opcional, default `frontend`)*: nombre exacto del servicio en Railway.
- `RAILWAY_SERVICE_BACKEND` *(opcional, default `backend`)*: nombre exacto del servicio en Railway.
- `RAILWAY_SERVICE_AI` *(opcional, default `ai`)*: nombre exacto del servicio en Railway.

---

## 5. Flujo del primer despliegue controlado

1. Crear los 3 servicios (`backend`, `ai`, `frontend`) en Railway apuntando al repo y rama `main` con Root Directory `/`.
2. Montar el volumen `/data/huggingface` en `ai`.
3. Generar dominios públicos HTTPS para los 3 servicios.
4. Cargar las variables de entorno en los 3 servicios (usando los dominios reales generados).
5. Cargar `RAILWAY_TOKEN` y las variables `FRONTEND_PUBLIC_URL`, `BACKEND_PUBLIC_URL`, `AI_PUBLIC_URL` en GitHub Actions.
6. Mergear el PR hacia `main` (o ejecutar `workflow_dispatch` en `main` con `deploy=true`).
7. Verificar que `smoke-tests` pase en verde (o ejecutar manualmente `python scripts/smoke_test_deploy.py`).
