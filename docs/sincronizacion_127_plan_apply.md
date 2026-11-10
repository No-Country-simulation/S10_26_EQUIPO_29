# Sincronización integral del catálogo (127 repos): plan y paquete de autorización

- Fecha: 2026-11-09 · Rama: `feat/data-quality-maintenance` · HEAD: `cdb14a6`
- Responsable: Data Engineering (Jeison) · Ejecución: agente Cline
- Alcance: FASE 1 a FASE 8 del encargo. **`--apply` ejecutado el 2026-11-10** (resultado y
  verificación en `docs/apply_127.md`; lectura de idempotencia en `docs/dry_run_127.md`).

## 0. Estado en una línea

El plan está cerrado y verificado (127 repos, 0 inserciones, 158 filas a actualizar en una sola
transacción, 28 repos con impacto real en IA). Quedan **tres decisiones tuyas** y **un bloqueo
técnico**: la contraseña de `openbridge_data_sync` no está en ninguna configuración local.

> **Actualización 2026-11-10:** la escritura ya se ejecutó con éxito (`EXITCODE=0`; 127 UPDATE de
> repositorios y 31 de README en una transacción) y se verificó de forma independiente: 127/127
> hashes v1 coinciden, 0 duplicados, 0 nulos en los campos operativos. El dry-run repetido dio
> 0 inserciones y 0 reescrituras de README; los 49 UPDATE restantes son deriva real de GitHub. La IA
> **no** se reprocesó: faltan `AI_READER_DATABASE_URL`, `AI_DATABASE_URL` y la clave del proveedor.

## 1. FASE 1 — Backup de IA y coordinación

### 1.1 Qué existe hoy (comprobado, no supuesto)

- **No hay ningún backup de base de datos en el workspace**: se buscaron `*.sql`, `*.dump`,
  `*.bak`, `*.gz` y carpetas `backup/` en `OpenBridge` y `OpenBridge-data-quality`. Los únicos
  resultados son scripts de esquema (`ai/sql/00*.sql`, `data-engineering/sql/00*.sql`) y dos
  `*.bak` de `requirements.txt` / `test_load.py` de octubre.
- Los backups de Supabase son **gestionados por la plataforma** y no se pueden enumerar desde
  SQL (no hay tabla ni función que los exponga al rol de aplicación). Para verificarlos hace falta
  el panel de Supabase con la cuenta de administración: eso no es algo que pueda hacer yo, y no
  voy a afirmar que existen sin verlos.
- **Lo que sí hice**: un snapshot propio, de solo lectura, verificable y que no sobrescribe nada.

### 1.2 Snapshot propio (artefacto de recuperación)

Ruta: `C:\Users\Stiven\AppData\Local\Temp\ob_backup\snapshot_20261110T013624Z\`
Sesión: `postgres`, `default_transaction_read_only = on`, PostgreSQL 17.11.
Cada tabla se exportó dos veces: `.csv` (para `\copy`) y `.jsonl` (preserva `NULL` exacto, que es
lo que se usaría para una restauración sin ambigüedad). `manifest.json` guarda filas, columnas,
bytes y SHA-256 por archivo.

| tabla | filas | csv sha256 (prefijo) |
|---|---:|---|
| `catalog_repositories` | 127 | `a41bd1ea836a2081…` |
| `catalog_readmes` | 127 | `e1e4cef15769f961…` |
| `ai_repo_enrichment` | 127 | `3e79c716b54bd562…` |
| `ai_repo_categories` | 170 | `16f1db56d756e2e9…` |
| `ai_integration_ideas` | 77 | `99a587356dc4d84e…` |
| `ai_embeddings` | 127 | `f329231960a0e76c…` |
| `ai_processing` | 254 | `e6bdc0310e2550ba…` |

Contrastes con los números que tenías: 127 enriquecimientos ✔, 170 categorías ✔, 77 ideas ✔,
127 repos ✔. No hay huérfanos: 0 filas en `ai.*` con `github_id` fuera del catálogo.

Observación de esquema (no se toca): la tabla desplegada `ai.ai_repo_enrichment` sólo tiene
`github_id, summary_es, use_cases, ai_input_hash, processed_at`. El archivo `ai/sql/001_tablas_ia.sql`
del repo declara además `about_es` y `features`: hay deriva entre el SQL del repo y la base real.
Afecta al equipo de IA, no a esta sincronización (no escribimos en `ai.*`).

### 1.3 Dependencia real entre los hashes de los dos sistemas

Esto es lo que pediste comprobar en lugar de asumirlo:

```
ai_input_hash = sha256(prompt_version \n provider \n model \n mensaje)
mensaje       = <descripcion>{description}</descripcion>\n<topics>{topics}</topics>\n<readme>{README limpio, 8000 chars}</readme>
```

Fuente: `ai/enrich.py:128-143` (`user_message`, `input_hash`), `ai/ideas.py:159`,
`ai/catalog_diff.py:39-46`.

**`content_hash` no participa en la huella de IA.** Participan `description`, `topics` y el README
tal como lo ve el modelo (limpiado y recortado). Por eso:

- Los 127 `content_hash` cambian (v1 incluye estrellas, forks y `pushed_at`) y **sólo 28 repos**
  necesitan reprocesado.
- De 31 README reescritos, **7 no cambian la entrada del modelo** (su cambio cae fuera de los
  8 000 caracteres que lee el modelo o en marcado que se limpia).

Vector de búsqueda (`ai/search.py:80-113`): `sha256(model \n document_prompt \n texto)` con
`texto = nombre + summary + description + topics + use_cases`.

**Validación ejecutada**: recalculé la huella guardada desde el estado actual del catálogo con las
funciones del propio repo. Resultado: **127/127 enrichment y 127/127 ideas reproducen su
`ai_input_hash`; 127/127 embeddings reproducen su huella.** Es decir, el modelo de dependencia es
exacto y el cálculo del impacto no es una estimación.

### 1.4 Impacto calculado sobre IA

**Enriquecimiento e ideas: 28 repos** (los mismos en ambos casos, porque comparten entradas):

| motivo | repos |
|---|---:|
| sólo README | 21 |
| sólo `description` | 4 |
| `description` + README | 2 |
| README + `topics` | 1 |

Listado completo (con categorías e ideas que ya tienen, para dimensionar el reprocesado):

| repo | motivo | categorías | ideas |
|---|---|---:|---:|
| grafana/grafana | description | 1 | 0 |
| huggingface/transformers | description | 1 | 1 |
| ory/kratos | description | 1 | 2 |
| supertokens/supertokens-core | description | 1 | 2 |
| ollama/ollama | topics, readme | 1 | 3 |
| microsoft/playwright | description, readme | 2 | 1 |
| psycopg/psycopg | description, readme | 1 | 1 |
| celery/celery | readme | 2 | 1 |
| pandas-dev/pandas | readme | 1 | 1 |
| prometheus/prometheus | readme | 2 | 1 |
| apache/spark | readme | 2 | 1 |
| apache/flink | readme | 1 | 1 |
| microsoft/TypeScript | readme | 1 | 0 |
| apache/airflow | readme | 2 | 0 |
| cilium/cilium | readme | 3 | 0 |
| apache/beam | readme | 1 | 1 |
| storybookjs/storybook | readme | 2 | 0 |
| ClickHouse/ClickHouse | readme | 1 | 0 |
| envoyproxy/envoy | readme | 1 | 0 |
| pytorch/pytorch | readme | 2 | 1 |
| nuxt/nuxt | readme | 1 | 0 |
| pydantic/pydantic | readme | 2 | 1 |
| psf/black | readme | 1 | 0 |
| astral-sh/ruff | readme | 1 | 0 |
| anthropics/anthropic-sdk-python | readme | 2 | 1 |
| vllm-project/vllm | readme | 1 | 1 |
| biomejs/biome | readme | 1 | 0 |
| seaweedfs/seaweedfs | readme | 2 | 1 |

**README reescritos que NO afectan al modelo (7)**: `PrefectHQ/prefect`, `eslint/eslint`,
`fastapi/fastapi`, `open-telemetry/opentelemetry-collector`, `openai/openai-python`, `pnpm/pnpm`,
`traefik/traefik`.

**Embeddings**: los 127 actuales son válidos hoy. Sólo `ollama/ollama` cambia por metadatos de la
sincronización (topics); el resto de vectores a recalcular son los 27 de repos cuyo resumen o casos
de uso cambien al reprocesar. Total a recalcular después del reprocesado: **28**.

**Nada de esto lo he ejecutado**: no he llamado a ningún proveedor ni he escrito en `ai.*`.

### 1.5 Recuperación

- La sincronización **no escribe en `ai.*`**: `sync_load` sólo toca `public.catalog_repositories` y
  `public.catalog_readmes` (comprobado en SQL y en las pruebas). Riesgo sobre enriquecimientos,
  categorías, ideas y vectores: **cero estructural**.
- Si algo sale mal **en la sincronización**: `engine.begin()` deshace toda la transacción; no queda
  estado intermedio.
- Si hiciera falta volver al catálogo anterior: restaurar desde
  `snapshot_20261110T013624Z/catalog_repositories.jsonl` y `catalog_readmes.jsonl`
  (los `NULL` viajan como `null`, sin ambigüedad), con la cuenta administradora, en transacción y
  con `WHERE github_id = %s` por fila. El procedimiento exacto está en §5.4.
- Si el reprocesado de IA sale mal: se restaura desde el backup del equipo de IA (o desde este
  snapshot) y se reejecuta el lote; las relaciones se reconstruyen por `github_id`.

### 1.6 Mensaje preparado para AI Engineering (no enviado)

> Hola equipo de IA. Data Engineering va a sincronizar los 127 repos del catálogo. Necesito que
> confirméis tres cosas antes del `--apply`:
> 1. Ubicación y fecha del backup que mencionáis, y que incluya `ai_repo_enrichment`,
>    `ai_repo_categories`, `ai_integration_ideas` y `ai_embeddings` de los 127 `github_id`.
> 2. Que ese backup es restaurable sin perder lo procesado después de su fecha.
> 3. Ventana para reprocesar **28 repos** (listado en el informe de sincronización): cambian
>    `description`, `topics` o el README que lee el modelo. El `content_hash` del catálogo no
>    interviene en vuestra huella; no hace falta reprocesar los otros 99.
> Además: la tabla `ai.ai_repo_enrichment` desplegada no tiene `about_es` ni `features`, que sí
> están en `ai/sql/001_tablas_ia.sql`. ¿Es intencional?

## 2. FASE 2 — Por qué cambian los 127 (`metadata_changed`)

Diferencias reales, campo por campo (catálogo actual → extracción nueva). Nada se ha ocultado ni
descartado para "limpiar" el dry-run:

| campo | repos que cambian | NULL → valor | valor → valor |
|---|---:|---:|---:|
| `name` | 0 | 0 | 0 |
| `description` | 6 | 0 | 6 |
| `homepage` | 4 | 4 | 0 |
| `language` | 1 | 0 | 1 |
| `topics` | 1 | 0 | 1 |
| `stargazers_count` | 127 | 0 | 127 |
| `forks_count` | 119 | 0 | 119 |
| `pushed_at` | 119 | 0 | 119 |
| `archived` | 0 | 0 | 0 |
| `license_spdx_id` | 0 | 0 | 0 |
| `disabled` | 122 | 122 | 0 |
| `open_issues_count` | 126 | 122 | 4 |
| README (`catalog_readmes`) | 31 | — | — |

Los 4 `open_issues_count` que cambian de valor: `apache/airflow` 1878→1867, `react/react`
1472→1518, `prometheus/prometheus` 1007→1093, `BurntSushi/ripgrep` 219→225 (`torvalds/linux`
sigue en 3).

**Causa de que los 127 estén en `metadata_changed`**: el contrato `openbridge-ai-v1` incluye
`stargazers_count`, `forks_count` y `pushed_at` (12 campos, `hash_contract.py:19-23`). Las estrellas
cambian en 127 y `pushed_at` en 119, así que **todo hash v1 se recalcula**, aunque el contenido
editorial del repo no cambie. No es un defecto del planificador: es el contrato.

Clasificación pedida:

- **A. Operativos**: `disabled` 122 (NULL→`false`), `open_issues_count` 126 (122 NULL→valor,
  4 valor→valor). Fuera del hash por diseño (`transform.py:21`, ADR-001).
- **B. Metadatos**: `description` 6, `homepage` 4, `language` 1, `topics` 1, estrellas 127,
  forks 119, `pushed_at` 119. `archived` y licencia: 0.
- **C. README**: 31 con texto distinto.
- **D. Backfill histórico** (`content_hash_version` NULL): `torvalds/linux`,
  `prometheus/prometheus`, `react/react`, `apache/airflow`, `BurntSushi/ripgrep`.
- **E. Invalidaciones de IA**: 28 (tabla §1.4). El resto no.

Motivos del plan (dry-run real): `metadata_changed` 93 · `metadata_changed,readme_changed` 29 ·
`legacy_hash_backfill,metadata_changed` 3 · `legacy_hash_backfill,metadata_changed,readme_changed` 2.

## 3. FASE 3 — Validación del sincronizador

Revisados `ingestion/src/transform.py`, `sync_plan.py`, `sync_load.py`, `hash_contract.py`. **Sin
defectos**: no he tenido que cambiar código ni añadir pruebas.

| requisito | dónde se cumple | prueba |
|---|---|---|
| `disabled` y `open_issues_count` se extraen | `transform.py:198-203` (bool obligatorio, entero ≥ 0), `:234-238` | `test_transform.py`, `test_sync_plan.py` |
| No invalidan el hash de IA | `hash_contract.py:19-23` (12 campos), `SUPPLEMENTARY_FIELDS` aparte | `test_sync_plan.py:494-535`, `test_sync_load.py:304-327` |
| Metadatos recalculan hash v1 | `sync_plan.py:996-1005` (recalcula y compara antes de aceptar el plan) | `test_sync_plan.py:91-137`, `:377` |
| README sólo con diferencia real | `sync_load.py:110-118` (`WHERE objetivo.readme_text IS DISTINCT FROM EXCLUDED.readme_text`) | `test_sync_load.py:110`, `:219` |
| Transacción atómica | `sync_load.py:286` (`engine.begin()`), `:309` (`FOR UPDATE`) | `test_sync_load.py:219` (revierte si falla un README) |
| Idempotente | plan sin cambios no abre transacción (`sync_load.py:277-278`) | `test_sync_load.py:266`, `:280` |
| Sin `is_maintained` físico | `REQUIRED_COLUMNS` sólo `content_hash_version, disabled, open_issues_count` (`sync_load.py:179`) | `test_sync_load.py:338`, `:348` |
| Sin borrados | no hay `DELETE` en el módulo | `test_sync_load.py:242` |
| Guardas de escritura | confirmación + destino habilitado + usuario no admin + base esperada (`sync_load.py:255-296`) | `test_sync_load.py:132-208` |
| Pooler | acepta `rol.<ref>` y exige que `current_user` coincida (`sync_load.py:293`) | `test_sync_load.py:175-216` |

`hash_contract.py` **no se ha tocado**.

## 4. FASE 4 — Conexión real y dry-run

### 4.1 Lo que ya está hecho

| ejecución | rol | resultado |
|---|---|---|
| dry-run real (CLI) | `openbridge_api_reader` | exit 0 · repos `UPDATE=127` · READMEs `INSERT=127` ← **falso positivo** |
| comparación RLS-aware | `postgres` (sólo lectura) | repos `INSERT=0 UPDATE=127` · READMEs `INSERT=0 UPDATE=31`, `unchanged=96` |

**Causa del falso positivo, verificada en catálogo**: `catalog_readmes` tiene RLS activada y
`openbridge_api_reader` **no tiene política** en esa tabla (sólo en `catalog_repositories`), por lo
que ve 0 filas y todas sus READMEs parecen nuevas. La vista `v_repos_for_ai` sí devuelve el README
porque su dueño es `postgres` y `security_invoker = false`, y por eso la API no está afectada.

Estado de RLS para el rol de sincronización (esto es lo que importa para el `--apply`):

- `openbridge_data_sync`: políticas de `SELECT`/`INSERT`/`UPDATE` en `catalog_repositories` **y** en
  `catalog_readmes`; permisos `INSERT, SELECT, UPDATE`; **sin `DELETE`**; sin `BYPASSRLS`.
- Consecuencia: el plan bajo `data_sync` verá las 127 READMEs (no habrá el falso positivo de
  `api_reader`) y no podrá borrar nada.

### 4.2 Bloqueo actual

La contraseña de `openbridge_data_sync` **no está en la configuración local**: en
`C:\Users\Stiven\Desktop\OpenBridge\data-engineering\` sólo existen `.env` (`DB_USER` = `postgres.<ref>`)
y `.env.ai-reader` (`OPENBRIDGE_AI_READER_PASSWORD`). Tampoco hay variables de entorno del sistema.
No voy a probar contraseñas a ciegas ni a usar la cuenta administradora para la operación definitiva.

Dato operativo comprobado: el pooler **exige** `<rol>.<project-ref>`; con `openbridge_ai_reader` sin
sufijo la conexión falla con `ENOIDENTIFIER: no tenant identifier provided`. El `sync_config` ya
maneja ese formato.

Y no hay atajo: el CLI **rechaza** las cuentas administrativas incluso en dry-run
(`sync_config._validate_user`, `sync_config.py:170-177`). Ejecutado para comprobarlo:

```
Destino: no comparado
Comparación con el destino: OMITIDA
  (La ejecución diaria no admite cuentas administrativas (postgres/supabase_admin))
0 escrituras ejecutadas: no se generó ni aplicó ningún plan.
```

Por eso el único dry-run que cuenta para la autorización es el que se haga con
`openbridge_data_sync`, y por eso la contraseña es un bloqueo real: no se puede eludir sin romper una
regla de seguridad del proyecto.

## 5. FASE 5 — Plan de actualización integral

### 5.1 Orden de ejecución

| # | paso | quién | criterio de éxito |
|---|---|---|---|
| 0 | Autorización + confirmación del backup de IA | Jeison / IA | mensaje §1.6 respondido |
| 1 | Dry-run con `data_sync` (`ALLOW_WRITES=0`) | DE | `UPDATE=127`, `INSERT README=0`, `UPDATE README=31` |
| 2 | `--apply` (1 transacción, 158 filas) | DE | summary del CLI + `verify_sync_result` sin discrepancias |
| 3 | Verificación SQL (§5.3) | DE | 127 filas, 0 NULL en `disabled`/`open_issues_count`, hashes del plan |
| 4 | Segundo dry-run | DE | `UPDATE=0` (idempotencia) |
| 5 | Reprocesar **28** en `enrichment` → `ideas` → `embeddings` | IA | `ai_processing` con huella nueva, 0 pérdidas |
| 6 | Verificación de IA y de relaciones | IA | 127 enriquecimientos, 170 categorías, 77 ideas o más, 0 huérfanos |
| 7 | Revisión de API/frontend con los campos nuevos | Andrés / Fabián | `disabled`, `open_issues_count`, `is_maintained` visibles |

### 5.2 Recuperación por fase

- **Paso 1 falla**: no escribe nada; se corrige y se repite.
- **Paso 2 falla**: la transacción se revierte sola; el catálogo queda como está.
- **Paso 2 se aplica y hay que volver atrás**: restaurar `catalog_repositories` y `catalog_readmes`
  desde el snapshot JSONL (§1.2) con la cuenta administradora; es la única escritura de
  recuperación y no la ejecuta el rol de sincronización.
- **Paso 5 falla a medias**: el lote de IA es reanudable (compara `ai_input_hash` y sólo procesa lo
  que falta); si hiciera falta, restaurar desde el backup de IA. **El catálogo no se toca en este
  paso**, así que no hay que resincronizar nada.
- **Paso 5 produce resultados peores**: se restauran las tablas `ai.*` desde el backup de IA y se
  deja el catálogo como quedó (sigue siendo válido; la IA queda marcada como pendiente).

### 5.3 Verificación posterior a la escritura

```sql
-- 1. Cobertura y campos operativos
select count(*) as repos,
       count(*) filter (where disabled is null)             as disabled_null,
       count(*) filter (where open_issues_count is null)     as issues_null,
       count(*) filter (where content_hash_version is null)  as version_null
from public.catalog_repositories;

-- 2. README presentes y actualizados
select count(*) filter (where m.readme_text is null) as sin_readme,
       count(*) filter (where m.updated_at >= now() - interval '1 hour') as tocados_ultima_hora
from public.catalog_repositories r
left join public.catalog_readmes m using (github_id);

-- 3. Nombres y duplicados
select count(*) as filas, count(distinct github_id) as ids,
       count(distinct lower(full_name)) as nombres
from public.catalog_repositories;
```

Además, el propio `update_catalog.py --apply` ejecuta `verify_sync_result` (hash, versión,
`disabled`, `open_issues_count` y README por repositorio) dentro del flujo.

## 6. FASE 6 — Pruebas

```
python -m pytest ingestion/tests backend/tests tests/contracts -q
→ 444 passed, 1 warning (StarletteDeprecationWarning de httpx) en 12,46 s
```

Cubren, entre otros: contrato de hash (`test_hash_contract.py`, `content_hash_v1_vectors.json`),
idempotencia, campos operativos, backfill histórico, rollback, guards de escritura, compatibilidad
con pooler, lectura en transacción de solo lectura y contrato HTTP del backend. **0 fallos.**

## 7. FASE 7 — Paquete de autorización (esto es lo que necesito que apruebes)

### 7.1 Números exactos

| concepto | valor |
|---|---|
| repositorios afectados | **127** (todos; 0 inserciones, 0 borrados) |
| README afectados | **31** |
| filas escritas | **158** (127 repos + 31 README) en **1 transacción** |
| campos que se modifican | `stargazers_count` 127 · `pushed_at` 119 · `forks_count` 119 · `open_issues_count` 126 · `disabled` 122 · `description` 6 · `homepage` 4 · `language` 1 · `topics` 1 · `content_hash` 127 · `content_hash_version` 5 |
| hashes que cambian | los 127 `content_hash` (contrato v1) |
| backfill histórico | 5 filas: `torvalds/linux`, `prometheus/prometheus`, `react/react`, `apache/airflow`, `BurntSushi/ripgrep` |
| impacto en IA | 28 repos (21 README + 4 `description` + 2 `description`+README + 1 README+topics); 28 vectores; 0 filas de `ai.*` modificadas por la sincronización |
| backup | snapshot verificado `20261110T013624Z` (7 tablas, 1009 filas, SHA-256 por archivo). **Falta el visto bueno del backup de IA** |
| recuperación | rollback automático; restauración desde JSONL si se aplicara y hubiera que volver atrás |
| pruebas | 444 pasadas, 0 fallos |

### 7.2 Comando exacto (no ejecutado)

```powershell
# 0. Entorno: la contraseña no se escribe en el repositorio
$env:OPENBRIDGE_SYNC_TARGET         = "supabase"
$env:OPENBRIDGE_SUPABASE_DB_HOST    = "aws-0-us-east-1.pooler.supabase.com"
$env:OPENBRIDGE_SUPABASE_DB_PORT    = "5432"
$env:OPENBRIDGE_SUPABASE_DB_NAME    = "postgres"
$env:OPENBRIDGE_SUPABASE_DB_SSLMODE = "require"

# el pooler exige <rol>.<project-ref>: el ref se deriva del usuario administrador local
$admin = ((Get-Content 'C:\Users\Stiven\Desktop\OpenBridge\data-engineering\.env' |
           Where-Object { $_ -match '^DB_USER=' }) -split '=',2)[1].Trim()
$env:OPENBRIDGE_SUPABASE_DB_USER     = "openbridge_data_sync." + ($admin -split '\.')[-1]
$env:OPENBRIDGE_SUPABASE_DB_PASSWORD = "<PENDIENTE: contraseña de openbridge_data_sync>"

# 1. Dry-run con el rol definitivo (sin escrituras)
$env:OPENBRIDGE_SYNC_ALLOW_WRITES = "0"
python ingestion/scripts/update_catalog.py --live --dry-run --target supabase `
  --require-complete --summary-file .\dry_run_127_datasync.md

# 2. Aplicación (sólo con autorización expresa)
$env:OPENBRIDGE_SYNC_ALLOW_WRITES = "1"
$env:OPENBRIDGE_SYNC_CONFIRMATION = "CONFIRMO_SINCRONIZACION_INCREMENTAL_OPENBRIDGE_V1"
python ingestion/scripts/update_catalog.py --live --apply --target supabase `
  --require-complete --max-writes 200 --summary-file .\apply_127.md
```

`--max-writes 200` deja margen a las 158 filas y corta cualquier sorpresa.
`OPENBRIDGE_SYNC_ALLOW_WRITES` se queda en `0` hasta el paso 2.

### 7.3 Comprobación de sequedad antes de escribir

El paso 1 debe imprimir exactamente: `INSERT repositorios=0`, `UPDATE repositorios=127`,
`INSERT READMEs=0`, `UPDATE READMEs=31`. Si aparece cualquier `INSERT` de README, se detiene: sería
un problema de visibilidad (RLS o rol equivocado), no un cambio real.

## 8. FASE 8 — Validación final (después de la escritura)

1. §5.3 sin `NULL` inesperados y con 127/127/127.
2. `UPDATE=0` en el segundo dry-run (salvo cambios nuevos de GitHub posteriores).
3. `content_hash` de los 127 iguales a los del plan; `content_hash_version` = `openbridge-ai-v1` en 127.
4. IA: 127 enriquecimientos y 127 registros `enrichment` en `ai_processing`; 28 con huella nueva;
   170 categorías o más; 77 ideas o más; 0 huérfanos; vectores recalculados sólo donde tocaba.
5. `GET /repos` y `GET /repos/{owner}/{name}`: `disabled` booleano (no `null`), `open_issues_count`
   entero, `is_maintained` calculado, `health_score` sigue en `null`, `pushed_at` sigue siendo texto
   ISO 8601.

## 9. Decisiones que necesito de ti

1. **Contraseña de `openbridge_data_sync`** (o autorización para que el administrador la rote y me la
   entregue por canal seguro). Sin esto no puedo ejecutar el dry-run oficial ni el `--apply`.
2. **Backfill de 5 filas** de `content_hash_version` NULL → `openbridge-ai-v1`: ¿aprobado?
3. **Backup de IA**: ¿confirmas ubicación y fecha, o lo pido directamente al equipo? Mientras no haya
   confirmación, considero el paso 5 (reprocesado) no autorizado.
4. **`dry_run_127.md`** (sin seguimiento en git): ¿lo muevo a `docs/`, lo dejo fuera o lo commiteo?
5. El `--apply` está preparado y **detenido**. No se ejecutará hasta tu autorización expresa.

## 10. Evidencia generada (reproducible, fuera del repo)

| artefacto | ruta |
|---|---|
| Snapshot + manifiesto | `%TEMP%\ob_backup\snapshot_20261110T013624Z\` |
| Comparación RLS-aware | `%TEMP%\ob_db_compare_report.md` |
| Detalle por campo | `%TEMP%\ob_plan_detail.md` |
| Impacto en IA (JSON) | `%TEMP%\ob_ai_impact.json` |
| Scripts de solo lectura | `%TEMP%\ob_ai_impact.py`, `ob_plan_detail.py`, `ob_embed_impact.py`, `ob_snapshot.py`, `ob_ai_probe.py` |
| Pruebas | `%TEMP%\ob_pytest.log` |
| Extracción GitHub cacheada | `%TEMP%\ob_records_cache.json` |

Ninguno de esos scripts ejecuta DML/DDL: la conexión fija
`default_transaction_read_only = on` y sólo emiten `SELECT`.
