# Health Score: contrato HTTP para el frontend

Guía de consumo del campo `health_score` desde el frontend (Next.js). Todo lo que
aparece aquí se verificó contra la API real el **8-nov-2026**, rama
`feat/health-score-implementation` (commit publicado `e8c62f7`). No hay endpoints,
URLs ni campos inventados: cada ruta sale de `backend/app/api/router.py` y
`backend/app/api/routes/repos.py`.

Documentos relacionados:

- [`health-score-implementation.md`](health-score-implementation.md) — fórmula,
  pesos, reglas de `null` y pruebas del motor.
- [`propuestas-contrato.md`](propuestas-contrato.md) — contrato `Repo v1.2`.

## 1. Estado actual: leer esto primero

| Hecho | Detalle |
| --- | --- |
| Variable que lo controla | `HEALTH_SCORE_ENABLED` (backend) |
| Valor por defecto | `false` |
| Qué llega al frontend con la bandera apagada | `"health_score": null` en el listado y en la ficha |
| ¿Cambia la forma del contrato? | No. `health_score` ya existe en `Repo v1.2`; apagada sólo vale `null` |
| ¿El frontend necesita cambios de código? | No. `ToolCard.jsx` y `ToolDetail.jsx` ya muestran «Sin evaluar» cuando el valor no es un número |
| ¿Hace falta autenticación? | No |

Mientras el equipo no apruebe los pesos de la fórmula, el estado correcto es
**bandera apagada y `health_score: null`**. El frontend debe tratar `null` como un
estado válido y esperado, no como un error.

## 2. URL base y puertos

| Entorno | URL base | Notas |
| --- | --- | --- |
| Local (desarrollo) | `http://127.0.0.1:8000` | `uvicorn backend.app.main:app --port 8000` desde la raíz del repo |
| Local (documentación interactiva) | `http://127.0.0.1:8000/docs` | Swagger UI; también `/openapi.json` |
| Frontend local | `http://127.0.0.1:4173` | `npm run dev` usa `next dev --port 4173` |
| Contenedor | puerto **8000** | `backend/Dockerfile` expone 8000 y arranca uvicorn en `0.0.0.0:8000` |
| Producción / pública | **no existe** | El repositorio no tiene backend desplegado ni URL pública configurada |

No hay servidor público: cualquier instrucción que mencione una URL `https://` de
backend sería inventada. `http://127.0.0.1:8000` es **sólo** la URL de desarrollo
local.

La API **no** tiene prefijo `/api`: el acuerdo del 29-oct-2026 fija las rutas en la
raíz. `http://127.0.0.1:8000/api/repos` devuelve 404.

## 3. Endpoints

| Método | Ruta | Respuesta | Auth | Uso desde el frontend |
| --- | --- | --- | --- | --- |
| `GET` | `/repos` | `array` de repositorios | ninguna | Listado del catálogo |
| `GET` | `/repos/{owner}/{name}` | `{"repo": {...}, "integration_ideas": [...]}` | ninguna | Ficha de la herramienta |
| `GET` | `/health` | `{"status": "ok"}` | ninguna | Liveness del proceso |
| `POST` | `/assistant` | error `provider_unavailable` (503) | ninguna | Asistente; fuera de este alcance |

Parámetros de `GET /repos` (todos opcionales): `q`, `category` (se puede repetir),
`language`, `license`, `maintenance` (`active`/`inactive`), `min_stars`, `page`
(≥ 1), `page_size` (1–100, por defecto 20).

La paginación **no** viaja en el cuerpo: llega en las cabeceras `X-Total-Count`,
`X-Total-Pages`, `X-Page` y `X-Page-Size`, porque el cuerpo es el array del
contrato. El código actual del frontend
(`frontend/src/data/catalogHttp.mjs`) pide `repos?page=N&page_size=100` y recorre
todas las páginas leyendo esas cabeceras.

## 4. Ubicación exacta de `health_score`

- **Listado** (`GET /repos`): es una clave de **cada elemento** del array, al mismo
  nivel que `full_name`. No hay envoltorio `data` ni `items`.
- **Ficha** (`GET /repos/{owner}/{name}`): es `respuesta.repo.health_score`.

Tipo: `number` entre `0` y `100` con un decimal, o `null`. Nunca es texto, nunca
es `0` como sustituto de «sin dato» y nunca viene en una escala 0–1.

## 5. Cabeceras, CORS y autenticación

- **Autenticación:** ninguna. No hay token, ni API key, ni cookies, ni sesión. La
  API es de sólo lectura sobre un rol de base de datos de sólo lectura.
- **Headers que envía el cliente:** ninguno obligatorio. `Accept: application/json`
  es opcional; **no** envíes `Authorization` (no se usa).
- **CORS:** obligatorio, porque el frontend corre en otro origen
  (`:4173`) y la API en `:8000`. Se configura con `CORS_ORIGINS` en el backend,
  separando orígenes por coma. El `.env.example` del backend trae
  `http://127.0.0.1:4173,http://localhost:4173`.
- Orígenes permitidos en la verificación (con `CORS_ORIGINS` de ejemplo):

```text
access-control-allow-origin: http://127.0.0.1:4173
access-control-allow-methods: GET, POST
access-control-allow-headers: Accept, Accept-Language, Authorization, Content-Language, Content-Type
access-control-expose-headers: X-Total-Count, X-Total-Pages, X-Page, X-Page-Size
access-control-max-age: 600
```

Si el origen del frontend no está en `CORS_ORIGINS`, el navegador bloquea la
respuesta aunque `curl` funcione: revisa esa variable antes de tocar el cliente.

## 6. Ejemplos de respuesta (literales, capturados de la API)

### 6.1 `GET /repos` con `HEALTH_SCORE_ENABLED=true`

Un elemento del array (los demás campos del contrato van igual):

```json
{
  "full_name": "keycloak/keycloak",
  "github_id": 2218615,
  "description": "Open Source Identity and Access Management.",
  "language": "Java",
  "license_spdx_id": "Apache-2.0",
  "stargazers_count": 26000,
  "pushed_at": "2026-10-27T16:42:10Z",
  "open_issues_count": 10,
  "archived": false,
  "disabled": null,
  "is_maintained": null,
  "homepage": "https://www.keycloak.org/",
  "health_score": 99.9,
  "categories": [
    {"category_id": "auth", "assigned_by": "llm"},
    {"category_id": "database", "assigned_by": "human"}
  ],
  "use_cases": ["SSO para varias aplicaciones"],
  "summary_es": "Servidor de identidades y acceso para aplicaciones.",
  "name": "keycloak",
  "html_url": null,
  "forks_count": 6400
}
```

Cabeceras de esa misma respuesta: `X-Total-Count: 3`, `X-Total-Pages: 1`,
`X-Page: 1`, `X-Page-Size: 100`.

Otros dos casos observados en la misma llamada, útiles para el frontend:

| `full_name` | `archived` | `open_issues_count` | `health_score` |
| --- | --- | --- | --- |
| `keycloak/keycloak` | `false` | `10` | `99.9` |
| `legacy/archived-tool` | `true` | `1234` | `59.0` (techo por archivado) |
| `nuevo/sin-issues` | `false` | `null` | `66.7` (factores faltantes excluidos) |

### 6.2 `GET /repos` con `HEALTH_SCORE_ENABLED=false` (valor por defecto)

El mismo elemento, misma forma, con el campo en `null`:

```json
{
  "full_name": "keycloak/keycloak",
  "stargazers_count": 26000,
  "pushed_at": "2026-10-27T16:42:10Z",
  "open_issues_count": 10,
  "archived": false,
  "is_maintained": null,
  "health_score": null,
  "summary_es": "Servidor de identidades y acceso para aplicaciones."
}
```

(Se muestran sólo algunas claves para que la diferencia se vea; el objeto completo
tiene las mismas claves que en 6.1.)

### 6.3 `GET /repos/keycloak/keycloak` con la bandera encendida

```json
{
  "repo": {
    "full_name": "keycloak/keycloak",
    "github_id": 2218615,
    "topics": ["iam", "oauth2", "saml"],
    "language": "Java",
    "license_spdx_id": "Apache-2.0",
    "stargazers_count": 26000,
    "pushed_at": "2026-10-27T16:42:10Z",
    "open_issues_count": 1234,
    "archived": false,
    "disabled": null,
    "is_maintained": null,
    "health_score": 88.1,
    "html_url": "https://github.com/keycloak/keycloak",
    "forks_count": 6400
  },
  "integration_ideas": [
    {
      "id": "idea-keycloak-1",
      "full_name": "keycloak/keycloak",
      "title": "Centralizar el login con Keycloak",
      "integration_type": "rest_api",
      "summary": "Delegar autenticación en Keycloak usando OIDC.",
      "compatible_stack": ["Django", "Next.js"],
      "dependencies": ["pyjwt"],
      "difficulty": "medium",
      "triggers": ["login"],
      "snippet": null,
      "snippet_language": null,
      "docs_url": "https://www.keycloak.org/docs/latest/securing_apps/",
      "generated_by": "llm",
      "reviewed_at": null,
      "based_on_hash": "sha256:0123456789abcdef"
    }
  ]
}
```

En la ficha el campo está en **`repo.health_score`**. `integration_ideas` es un
array aparte y puede venir vacío; `health_score` no depende de él.

Nota: el listado omite `readme_text` y `topics` (sólo los trae la ficha) para no
sugerir que el repositorio no tiene README ni temas.

## 7. Cuándo llega `null` (y por qué no es un error)

El motor sólo publica un número cuando tiene evidencia suficiente. Reglas del
perfil `v1` (`backend/app/services/health.py`):

| Situación | Resultado |
| --- | --- |
| `HEALTH_SCORE_ENABLED` apagado (defecto) | `null` |
| `pushed_at` es `NULL` en la base | `null` |
| Cobertura de factores disponibles < 0.5 | `null` |
| `archived` es `NULL` | el factor «estado» no cuenta; no fuerza `null` por sí solo |
| `open_issues_count` es `NULL` | el factor no cuenta y el resto se renormaliza |
| `license_spdx_id` es `NULL` | cuenta como 0 (licencia ausente es un dato, no un hueco) |
| `archived` o `disabled` es `true` | el score se limita a `59.0` como máximo |

Pesos del perfil v1 (pendientes de aprobación del equipo):

| Factor | Peso | Cómo se calcula |
| --- | --- | --- |
| `recencia` | 0.40 | días desde `pushed_at`: ≤30 → 1.0; ≤90 → 0.75; ≤180 → 0.5; ≤365 → 0.25; más → 0.0 |
| `actividad_issues` | 0.25 | `1 - min(1, open_issues_count / max(1, 0.1 * stargazers_count))` |
| `licencia` | 0.15 | SPDX válida 1.0; `NOASSERTION` 0.5; `NONE`/vacía/`NULL` 0.0 |
| `estado` | 0.20 | 1.0 activo; 0.0 archivado o deshabilitado |

El número llega redondeado a un decimal y acotado a `[0, 100]`.

## 8. Manejo de `null` en la interfaz (ya implementado)

No hay que escribir nada nuevo: el código actual ya hace lo correcto.

- `frontend/src/data/catalog.mjs` traduce `repo.health_score` a `healthScore`
  conservando el `null` (`repo.health_score ?? null`).
- `frontend/src/features/catalog/ToolCard.jsx` y `frontend/src/ToolDetail.jsx`
  usan `Number.isFinite(detail.healthScore)`; si no es número muestran
  **«Sin evaluar»** y el tono `unknown`.
- Umbrales de color ya alineados con el motor: `>= 80` → `good`, `>= 60` →
  `moderate`, resto → `low`.

Regla práctica para código nuevo: **nunca** hagas `healthScore.toFixed(0)`,
`healthScore || 0` ni `Number(healthScore)`. Un `null` significa «no evaluado» y
debe seguir viéndose como tal.

## 9. Manejo de errores HTTP

Cuerpo estable en todos los errores del catálogo:

```json
{"error": {"code": "repo_not_found", "message": "No existe el repositorio 'no/existe' en el catálogo."}}
```

| Código | HTTP | Cuándo | Qué debe hacer el frontend |
| --- | --- | --- | --- |
| `repo_not_found` | 404 | la ficha pide un `owner/name` que no está en el catálogo | mostrar «no encontrado»; no reintentar en bucle |
| `invalid_request` | 422 | parámetro fuera de rango (por ejemplo `page=0`) | es un bug del cliente: corregir la petición |
| `catalog_unavailable` | 503 | la base no está configurada o no responde | mostrar el error con reintento manual; **no** inventar datos |

Verificado: sin `DATABASE_URL`, `GET /repos` responde
`503 {"error":{"code":"catalog_unavailable","message":"La API no tiene DATABASE_URL configurado; no hay catálogo que consultar."}}`
mientras `GET /health` sigue en 200 (el liveness no certifica la base).

`createCatalogHttp` ya envuelve esto en `CatalogHttpError` con `status` y `code`,
y `CatalogProvider` lo publica como `{status:'error', error:{status, code}}`.
Un `health_score: null` **no** produce error: es una respuesta 200 válida.

## 10. Variables de entorno

### Frontend (`frontend/.env.local`)

| Variable | Valor local | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_CATALOG_API_BASE_URL` | `http://127.0.0.1:8000/` | URL base del catálogo (la que ya lee `CatalogProvider.jsx`) |
| `NEXT_PUBLIC_API_BASE_URL` | (vacía) | alias temporal, **sólo** para el catálogo; no usarlo en código nuevo |

`frontend/.env.example` ya trae `NEXT_PUBLIC_CATALOG_API_BASE_URL=http://127.0.0.1:8000/`.
Si la variable queda vacía, `CatalogProvider` no llama a la API y usa los mocks
locales: es el modo de reserva, no un error.

Es una variable `NEXT_PUBLIC_*`: se incrusta **en tiempo de compilación**. Si
cambias la URL hay que reiniciar `npm run dev` o volver a compilar; no basta con
recargar el navegador. Como el sitio es `output: 'export'` (estático), todas las
llamadas son del navegador y por eso el backend necesita CORS.

### Backend (`backend/.env`)

| Variable | Valor | Efecto sobre el frontend |
| --- | --- | --- |
| `HEALTH_SCORE_ENABLED` | `false` (defecto) / `true` | apagado ⇒ `health_score: null`; encendido ⇒ número o `null` según §7 |
| `DATABASE_URL` | DSN de sólo lectura | vacía ⇒ `503 catalog_unavailable` en `/repos` |
| `CORS_ORIGINS` | `http://127.0.0.1:4173,http://localhost:4173` | sin el origen correcto el navegador bloquea la respuesta |
| `CATALOG_PAGE_SIZE` / `CATALOG_MAX_PAGE_SIZE` | `20` / `100` | el frontend pide `page_size=100`, el máximo permitido |

La API no expone `HEALTH_SCORE_ENABLED` en la respuesta: el frontend no debe
intentar detectar la bandera. La única señal es el valor del campo.

## 11. Ejemplo de consumo desde Next.js (TypeScript)

Código autónomo, sin dependencias nuevas. Reproduce lo que ya hace
`frontend/src/data/catalogHttp.mjs` y añade los helpers del Health Score.

```ts
// frontend/src/lib/catalogHealth.ts
export type HealthScore = number | null;

export interface ApiRepo {
  full_name: string;
  github_id: number;
  description: string | null;
  language: string | null;
  license_spdx_id: string | null;
  stargazers_count: number;
  pushed_at: string | null;
  open_issues_count: number | null;
  archived: boolean;
  disabled: boolean | null;
  is_maintained: boolean | null;
  health_score: HealthScore;
}

export interface RepoDetail {
  repo: ApiRepo;
  integration_ideas: unknown[];
}

export class CatalogApiError extends Error {
  readonly status: number;
  readonly code: string | null;
  constructor(status: number, code: string | null, message = 'No se pudieron cargar los datos') {
    super(message);
    this.name = 'CatalogApiError';
    this.status = status;
    this.code = code;
  }
}

const RAW_BASE = process.env.NEXT_PUBLIC_CATALOG_API_BASE_URL
  ?? process.env.NEXT_PUBLIC_API_BASE_URL
  ?? '';
const BASE_URL = RAW_BASE === '' ? '' : RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`;

const ERROR_CODES = ['repo_not_found', 'invalid_request', 'catalog_unavailable'];

async function request(path: string, signal?: AbortSignal): Promise<Response> {
  if (BASE_URL === '') {
    throw new CatalogApiError(0, 'not_configured', 'Falta NEXT_PUBLIC_CATALOG_API_BASE_URL');
  }
  const response = await fetch(new URL(path, BASE_URL), { signal, headers: { Accept: 'application/json' } });
  if (response.ok) return response;
  let code: string | null = null;
  try {
    const body = await response.json();
    if (ERROR_CODES.includes(body?.error?.code)) code = body.error.code;
  } catch {
    // Cuerpo no JSON: se conserva el status y el código queda en null.
  }
  throw new CatalogApiError(response.status, code);
}
```

```ts
/** Ficha de un repositorio: el Health Score llega en `repo.health_score`. */
export async function fetchRepoDetail(fullName: string, signal?: AbortSignal): Promise<RepoDetail> {
  const [owner, name] = fullName.split('/');
  if (!owner || !name) throw new CatalogApiError(0, 'invalid_request', 'Se espera owner/name');
  const response = await request(`repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`, signal);
  const payload = await response.json();
  if (!payload?.repo || payload.repo.full_name !== fullName || !Array.isArray(payload.integration_ideas)) {
    throw new CatalogApiError(0, 'invalid_payload');
  }
  return payload as RepoDetail;
}

/** Catálogo completo: recorre las páginas y conserva `health_score` tal cual. */
export async function fetchAllRepos(signal?: AbortSignal): Promise<ApiRepo[]> {
  const repos: ApiRepo[] = [];
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    signal?.throwIfAborted();
    const response = await request(`repos?page=${page}&page_size=100`, signal);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new CatalogApiError(0, 'invalid_payload');
    repos.push(...batch);
    const pages = response.headers.get('X-Total-Pages');
    if (pages !== null && /^\d+$/.test(pages)) totalPages = Number(pages);
  }
  return repos;
}

/** Texto para la etiqueta: `null` nunca se convierte en 0. */
export function healthLabel(score: HealthScore): string {
  return score === null || !Number.isFinite(score) ? 'Sin evaluar' : `${score.toFixed(1)}/100`;
}

/** Mismos cortes que ToolCard/ToolDetail y que el motor v1. */
export function healthTone(score: HealthScore): 'good' | 'moderate' | 'low' | 'unknown' {
  if (score === null || !Number.isFinite(score)) return 'unknown';
  if (score >= 80) return 'good';
  if (score >= 60) return 'moderate';
  return 'low';
}
```

Uso típico en un componente de cliente (el sitio es exportación estática, así que
la llamada va en `useEffect`, no en un Server Component):

```tsx
'use client';

import { useEffect, useState } from 'react';
import { CatalogApiError, fetchRepoDetail, healthLabel, healthTone, type ApiRepo } from '../lib/catalogHealth';

export function HealthBadge({ fullName }: { fullName: string }) {
  const [repo, setRepo] = useState<ApiRepo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchRepoDetail(fullName, controller.signal)
      .then((detail) => setRepo(detail.repo))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (err instanceof CatalogApiError && err.code === 'catalog_unavailable') {
          setError('Catálogo no disponible');
          return;
        }
        setError('No se pudo cargar la ficha');
      });
    return () => controller.abort();
  }, [fullName]);

  if (error) return <span role="status">{error}</span>;
  if (!repo) return <span aria-live="polite">Cargando…</span>;

  const score = repo.health_score; // number | null
  return (
    <span className={`health-score health-score--${healthTone(score)}`}>
      {healthLabel(score)}
    </span>
  );
}
```

Nota sobre `pushed_at`: el adaptador del catálogo exige que `Date.parse(pushed_at)`
sea válido; si el repositorio no tiene `pushed_at`, la API responde igual pero el
frontend rechaza esa fila. Es una regla existente del frontend, y en ese caso el
Health Score también sería `null`.

## 12. Comportamiento cuando `HEALTH_SCORE_ENABLED=false`

Es el estado por defecto y el que hoy corre en la rama publicada.

- `health_score` llega en `null` en el listado y en la ficha. La respuesta es
  **200**, no un error y no un campo ausente.
- No hay que ocultar la sección «Salud del repositorio»: la interfaz actual ya
  muestra **«Sin evaluar»** y el tono `unknown`.
- No se debe ordenar, filtrar ni puntuar por `health_score` mientras sea `null`:
  cualquier comparación con `null` produce resultados arbitrarios.
- Ninguna otra parte del contrato cambia: `Repo v1.2` sigue igual (ni campos
  nuevos, ni tipos distintos, ni endpoints extra).
- Si mañana se enciende la bandera, el frontend recibe números **sin cambiar
  código**; los casos sin evidencia siguen llegando en `null` (§7).

## 13. Cómo ejecutar backend y frontend

Backend (Windows PowerShell, desde la raíz del repositorio):

```powershell
python -m venv backend\.venv
backend\.venv\Scripts\python.exe -m pip install -e "backend[dev]"
Copy-Item backend\.env.example backend\.env
# editar backend\.env: DATABASE_URL, CORS_ORIGINS y HEALTH_SCORE_ENABLED
backend\.venv\Scripts\python.exe -m uvicorn backend.app.main:app --reload --env-file backend\.env --port 8000
```

Backend (POSIX):

```bash
python3 -m venv backend/.venv
backend/.venv/bin/python -m pip install -e './backend[dev]'
cp backend/.env.example backend/.env
backend/.venv/bin/python -m uvicorn backend.app.main:app --reload --env-file backend/.env --port 8000
```

Comprobación rápida:

```bash
curl http://127.0.0.1:8000/health
curl "http://127.0.0.1:8000/repos?page=1&page_size=1"
curl http://127.0.0.1:8000/repos/keycloak/keycloak
```

Frontend:

```powershell
cd frontend
npm ci
Copy-Item .env.example .env.local
# .env.local debe tener NEXT_PUBLIC_CATALOG_API_BASE_URL=http://127.0.0.1:8000/
npm run dev   # http://127.0.0.1:4173
```

Pruebas relacionadas:

```powershell
# backend completo (incluye los 40 tests del Health Score)
backend\.venv\Scripts\python.exe -m pytest backend\tests -q

# sólo el Health Score
backend\.venv\Scripts\python.exe -m pytest backend\tests\test_health_score.py backend\tests\test_health_score_api.py -q

# frontend
cd frontend; npm test
```

## 14. Verificación realizada (8-nov-2026)

La API se levantó con `uvicorn` en `127.0.0.1:8000` y se consultó con `curl` e
`Invoke-WebRequest`. **No había `DATABASE_URL` disponible en ningún worktree**, así
que la única pieza sustituida fue la capa de datos (`get_repository`, apuntando al
repositorio en memoria que usan las pruebas). Rutas, validación, CORS,
serialización y motor de Health Score fueron el código real.

| Comprobación | Resultado |
| --- | --- |
| `GET /health` | `200 {"status":"ok"}` |
| `GET /openapi.json` (rutas) | `/repos`, `/repos/{owner}/{name}`, `/assistant`, `/health` |
| `GET /repos` con bandera encendida | `200`, 3 filas, `health_score` 99.9 / 59.0 / 66.7 |
| `GET /repos` con bandera apagada | `200`, todas las filas con `health_score: null` |
| `GET /repos/keycloak/keycloak` con bandera encendida | `200`, `repo.health_score = 88.1`, `integration_ideas` = 1 |
| Cabeceras de paginación | `X-Total-Count`, `X-Total-Pages`, `X-Page`, `X-Page-Size` presentes |
| Preflight CORS desde `http://127.0.0.1:4173` | `200` con `access-control-allow-origin` correcto |
| `GET /repos/no/existe` | `404 {"error":{"code":"repo_not_found",...}}` |
| `GET /repos?page=0` | `422 {"error":{"code":"invalid_request",...}}` |
| API sin `DATABASE_URL` | `503 catalog_unavailable` en `/repos`; `/health` sigue en 200 |
| Suite del backend | `119 passed` |

Lo que **no** se pudo verificar aquí: una consulta contra la base real (no hay
credenciales en este entorno) y un despliegue público (no existe).
