# Despliegue en Railway

OpenBridge corre en Railway desde la rama `deploy`. La demo local sigue siendo la base; este despliegue se prende cuando hace falta.

## Qué hay

| Servicio | URL | Carpeta |
|---|---|---|
| Frontend | https://openbridge.up.railway.app | `frontend/` |
| API del catálogo | https://openbridge-api.up.railway.app | `backend/` |
| Asistente de IA | https://openbridge-ai.up.railway.app | `ai/` |

Proyecto de Railway `openbridge`, entorno `production`, región US East. Cada servicio vigila la rama `deploy` y solo se redespliega si cambian su carpeta o `shared/`.

## Reglas de la rama `deploy`

1. Solo `main` → `deploy`, con merge. Nunca al revés ni con PR desde `deploy`.
2. En `deploy` solo se tocan archivos de despliegue (Dockerfiles, `scripts/smoke_test_deploy.py`, esta guía).
3. Los arreglos de la app van primero a `main`.
4. Una sola persona actualiza `deploy`.

## Actualizar el despliegue

Desde la copia de trabajo que tiene la rama `deploy`:

```bash
git fetch origin
git merge origin/main -m "chore(ai): integrar main en la rama de despliegue"
git diff --stat origin/main deploy      # solo archivos de despliegue
python -m pytest ai/tests -q
git push
```

## Después de cada despliegue

1. Prueba de humo (no gasta LLM):

```bash
FRONTEND_PUBLIC_URL=https://openbridge.up.railway.app \
BACKEND_PUBLIC_URL=https://openbridge-api.up.railway.app \
AI_PUBLIC_URL=https://openbridge-ai.up.railway.app \
python scripts/smoke_test_deploy.py
```

2. Pedido de calentamiento (1 llamada a Gemini). El primer pedido después de arrancar el asistente puede pasar del límite de 20 s; los siguientes tardan ~5 s.

```bash
curl -s -o /dev/null -w "%{http_code} %{time_total}s\n" -X POST https://openbridge-ai.up.railway.app/assistant -H "Content-Type: application/json" -d '{"query":"Una clinica dental quiere cobrar las citas con tarjeta en linea y enviar recordatorios por SMS a sus pacientes."}'
```

Desde Git Bash en Windows, escribir las preguntas sin tildes ni `ñ`.

## Apagar y prender

- **Apagar:** en cada servicio, Deployments → menú ⋮ del despliegue activo → **Remove**. Se conservan la configuración, las variables, los dominios y el volumen del modelo.
- **Prender:** en cada servicio, Deployments → menú ⋮ del último despliegue → **Redeploy**. Después, prueba de humo y pedido de calentamiento.

Costo aproximado: prendido ~0,75 US$/día (casi todo es la RAM del asistente, ~2 GB); apagado, solo el volumen (centavos al mes).

## Configuración

La configuración vive en Railway (los `railway.toml` no se usan: Railway ya no permite activar config-as-code en servicios nuevos).

| Servicio | Construcción | Healthcheck | Memoria máx. | Variables |
|---|---|---|---|---|
| frontend | `frontend/Dockerfile` | `/` | 0,5 GB | `NEXT_PUBLIC_CATALOG_API_BASE_URL`, `NEXT_PUBLIC_ASSISTANT_API_BASE_URL`, `NEXT_PUBLIC_MOCK_MODE` |
| backend | `backend/Dockerfile` | `/health` | 1 GB | `DATABASE_URL` (lector `openbridge_api_reader`), `CORS_ORIGINS`, `HEALTH_SCORE_ENABLED=true` |
| ai | `ai/Dockerfile`, volumen en `/data/huggingface` | `/health` (300 s) | 3 GB | `AI_READER_DATABASE_URL`, `AI_CATALOG_SOURCE`, `AI_LLM_PROVIDER`, `GEMINI_API_KEY`, `HF_TOKEN`, `AI_CORS_ORIGINS` |

- Las URLs `NEXT_PUBLIC_*` se escriben en el JavaScript al compilar: si cambia un dominio, el frontend se vuelve a construir.
- `CORS_ORIGINS` y `AI_CORS_ORIGINS` llevan el dominio del frontend sin `/` final.
- `HEALTH_SCORE_ENABLED=true` publica el puntaje de salud de cada repositorio; sin ella la API devuelve `null` y las fichas dicen "Sin evaluar".
- El asistente usa solo Gemini: no hay claves de respaldo configuradas.
- La actualización diaria de los datos sigue en GitHub Actions; el asistente recoge lo publicado cada 10 minutos sin reiniciar.
