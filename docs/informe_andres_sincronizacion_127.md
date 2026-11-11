# Informe para Andrés — Sincronización del catálogo (127 repos)

- Fecha: 2026-11-09 · Rama `feat/data-quality-maintenance` · HEAD `cdb14a6`
- Emite: Data Engineering (Jeison)
- Estado: **preparado y verificado; escritura en Supabase pendiente de autorización**
- Actualización 2026-11-10: **escritura ejecutada y verificada en Supabase** (ver §7)

## 1. Estado de la sincronización

| fase | estado |
|---|---|
| Extracción GitHub (127 repos + README) | ✅ 127/127, 254/254 HTTP correctas, 0 errores/403/429 |
| Plan de sincronización | ✅ 127 `UPDATE`, 0 `INSERT`, 0 borrados |
| README | ✅ 31 con texto distinto (96 sin cambios) |
| Validación del sincronizador | ✅ sin defectos, no se modificó código |
| Pruebas | ✅ 444 pasadas, 0 fallos |
| Backup | ✅ snapshot verificable propio (7 tablas) |
| IA | ⏸️ 28 repos a reprocesar, **no ejecutado**: faltan credenciales de IA (`AI_READER_*`, `AI_DATABASE_URL`) y clave de proveedor |
| Escritura (`--apply`) | ✅ **ejecutada 2026-11-10**: 127 UPDATE repos + 31 UPDATE README en una transacción, `EXITCODE=0` |

## 2. Cambios que aplicará la escritura (una sola transacción, 158 filas)

- 127 `catalog_repositories`: `stargazers_count` (127), `pushed_at` (119), `forks_count` (119),
  `open_issues_count` (126), `disabled` (122), `description` (6), `homepage` (4), `language` (1),
  `topics` (1), `content_hash` (127), `content_hash_version` (5, backfill).
- 31 `catalog_readmes`.
- 0 inserciones, 0 borrados, 0 cambios en `ai.*`.

Motivo de que cambien los 127: el contrato `openbridge-ai-v1` incluye estrellas, forks y `pushed_at`,
que cambian en GitHub con el tiempo. No es un defecto del planificador.

## 3. Integridad de hashes

- 127/127 hashes v1 verificables y regenerados con `hash_contract.py` (sin modificarlo).
- 5 filas históricas sin versión (`torvalds/linux`, `prometheus/prometheus`, `react/react`,
  `apache/airflow`, `BurntSushi/ripgrep`) se recalculan con el contrato canónico y se versionan en la
  misma transacción.
- `validate_plan` recalcula cada hash antes de aceptar el plan: un plan manipulado no se aplica.
- Verificación posterior en la propia ejecución (`verify_sync_result`): hash, versión, `disabled`,
  `open_issues_count` y README por repositorio.

## 4. Cero duplicados

Antes (comprobado en Supabase): 127 filas, 127 `github_id`, 127 nombres distintos.
El `INSERT` usa `ON CONFLICT (github_id) DO NOTHING` y el planificador rechaza `github_id` o
`full_name` duplicados en la lista aprobada (`test_sync_plan.py:191-208`). Tras la escritura no hay
ruta de código que cree filas nuevas: `INSERT=0`.

## 5. Coordinación con IA

- **Dependencia comprobada, no supuesta**: la huella de IA se calcula sobre
  `description` + `topics` + README limpio (8 000 caracteres). `content_hash` **no** interviene.
- Recalculé las 127 huellas de enriquecimiento y las 127 de ideas desde el catálogo actual:
  **127/127 coinciden**, así que el cálculo es fiable.
- Impacto real: **28 repos** (21 por README, 4 por `description`, 2 por `description`+README,
  1 por README+`topics`). Los otros 99 no necesitan reprocesado.
- 7 de los 31 README reescritos no cambian lo que lee el modelo.
- No he llamado a ningún proveedor ni escrito en `ai.*`: **la IA no se ha reprocesado**.
- Pendiente del equipo de IA: confirmar ubicación/fecha de su backup y ventana de reprocesado.
  Hay un mensaje preparado en `docs/sincronizacion_127_plan_apply.md` §1.6.

## 6. Riesgos y mitigación

| riesgo | mitigación |
|---|---|
| Plan obsoleto entre dry-run y apply | bloqueo `FOR UPDATE` + comprobación optimista de hash; revierte todo |
| Fallo a mitad de escritura | una sola transacción; rollback total |
| Pérdida de datos de IA | la sincronización no toca `ai.*`; snapshot propio disponible |
| Falso positivo de RLS | sólo `api_reader` (sin política en `catalog_readmes`); `data_sync` sí ve las 127 |
| Reprocesado de IA innecesario | sólo 28 repos, justificados por campo |

## 7. Resultado de la ejecución (2026-11-10)

- Comando: `python ingestion/scripts/update_catalog.py --live --apply --target supabase
  --require-complete --summary-file .\apply_127.md` → **`EXITCODE=0`** en 17.125 s, una sola
  transacción y verificación posterior del propio sincronizador correcta.
- Escrituras: `INSERT repos=0 · UPDATE repos=127 · INSERT READMEs=0 · UPDATE READMEs=31`
  (158 filas, exactamente lo planificado: 0 inserciones, 0 borrados, 0 cambios en `ai.*`).
- Verificación independiente (rol `openbridge_data_sync`, solo lectura): 127 filas / 127 `github_id`
  / 127 `full_name` (0 duplicados), 127 README (0 huérfanos, 0 repos sin README), 0 nulos en
  `disabled`, `open_issues_count`, `pushed_at`, `stargazers_count`, `forks_count`, `topics` y
  `content_hash`; **127/127 hashes recalculados con `hash_contract.content_hash_v1` coinciden**;
  127/127 en versión `openbridge-ai-v1`; los 5 históricos quedaron versionados y coherentes.
- Idempotencia: segunda pasada del dry-run ~40 min después → **0 INSERT y 0 README UPDATE**. Los 49
  UPDATE restantes se atribuyeron campo por campo a deriva real de GitHub (20 `stargazers_count`, 17
  `forks_count`, 27 `pushed_at`, 3 `open_issues_count`), no a un fallo del sincronizador
  (detalle en `docs/dry_run_127.md`).
- Pruebas tras la escritura: `pytest ingestion/tests backend/tests tests/contracts` → **444
  pasadas, 0 fallos**.
- IA: **no reprocesada**. `ai.*` sigue intacto (127 enriquecimientos, 170 categorías, 77 ideas, 127
  vectores, 254 registros en `ai_processing`, 0 huérfanos, 0 duplicados). Los 28 repos siguen
  pendientes y el bloqueo es de credenciales, no de código.
- Pendientes: (1) rotar `OPENBRIDGE_AI_READER_PASSWORD` y `DB_PASSWORD` — la credencial válida hoy
  es `SUPABASE_DB_PASSWORD`; (2) proveer clave del proveedor de IA para reprocesar los 28; (3)
  commit en la rama `feat/data-quality-maintenance` (no se ha hecho merge ni push).
