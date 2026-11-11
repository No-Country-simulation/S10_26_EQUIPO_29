# Informe para Fabián — Campos operativos y contrato HTTP

- Fecha: 2026-11-09 · Rama `feat/data-quality-maintenance` · HEAD `cdb14a6`
- Emite: Data Engineering (Jeison)
- Contexto: el catálogo **ya recibió** `disabled`, `open_issues_count`, metadatos y 31 READMEs
  actualizados el 2026-11-10; esto es lo que la API entrega hoy y lo que cambió (ver §7).

## 1. Campos operativos disponibles

| campo | origen | tipo | antes del apply | después del apply (2026-11-10) |
|---|---|---|---|---|
| `disabled` | `catalog_repositories.disabled` | `boolean` nullable | `NULL` en 122, `false` en 5 | `false` en 127, **0 nulos** |
| `open_issues_count` | `catalog_repositories.open_issues_count` | `int` nullable | `NULL` en 122, valor en 5 | valor en 127, **0 nulos** |
| `archived` | `catalog_repositories.archived` | `boolean` | `false` en 127 | sin cambios |
| `pushed_at` | `catalog_repositories.pushed_at` | **`text` ISO 8601** (`2026-10-22T22:19:40Z`) | poblado en 127 | se refresca en 119 |
| `topics` | `catalog_repositories.topics` (`text`) / `v_repos_for_ai.topics` (`text[]`) | array en la vista | 127 | cambia en 1 (`ollama/ollama`) |
| `stargazers_count` / `forks_count` | tabla base | `bigint` | 127 | cambian en 127 / 119 |

`disabled` y `open_issues_count` **fuera del hash de contenido** por diseño (ADR-001): añadirlos no
invalida nada de IA.

La vista `v_repos_for_ai` **no** expone `disabled` ni `open_issues_count`; la API los lee de la tabla
base con `JOIN` (`backend/app/repositories/repos.py:8-10, 48-49, 76-77`). No hace falta DDL ni cambio
de vista.

## 2. `is_maintained`

- **No es una columna**: se calcula en la API (`repos.py:50-55` en listado, `:79-84` en ficha):
  no archivado y `pushed_at` dentro de los 180 días; si falta el dato → `null`.
- Hoy: **126 de 127 mantenidos**; el único inactivo es `ziglang/zig` (`pushed_at`
  `2025-11-27T01:42:59Z`). Archivados: 0.
- La sincronización no escribe ninguna columna para esto (hay prueba de que el SQL no la menciona:
  `test_sync_load.py:338, 348`).

## 3. `health_score`

- Sigue **siempre `null`**: no hay fórmula acordada y no se inventan puntuaciones
  (`backend/app/api/schemas.py:55-60`).
- No se ha tocado el contrato (`shared/contracts/repo.py:38`, rango 0–100 si algún día se define).

## 4. Contrato HTTP (sin cambios de forma)

- `GET /repos` → **array** de `CatalogListItem`; paginación en cabeceras `X-Total-Count`,
  `X-Total-Pages`, `X-Page`, `X-Page-Size`. `readme_text` y `topics` se excluyen del listado.
- `GET /repos/{owner}/{name}` → `{repo, integration_ideas}` (`RepoDetail`), con `readme_text`,
  `topics`, `open_issues_count`, `disabled` y `is_maintained`.
- `disabled` viaja como `bool | null` y **no se convierte a `false`**: `NULL` significa "sin dato"
  (`schemas.py:47-50`). Tras la sincronización pasará a `false` en los 122 que hoy son `NULL`.
- `pushed_at` **es texto ISO 8601**, no `timestamptz` en JSON: el cliente debe parsearlo.

## 5. Validaciones de frontend pendientes

1. **`disabled`**: 122 repos pasan de `null` a `false`. Si la UI sólo muestra aviso cuando es
   `true`, no habrá cambio visible; si hoy trata `null` como "desconocido", revisar que el badge
   desaparezca.
2. **`open_issues_count`**: 122 fichas pasan de "sin dato" a un número. Decidir formato
   (separador de miles) y si se oculta cuando es `0`.
3. **`is_maintained`**: comprobar el caso `false` con `ziglang/zig`, único repo inactivo.
4. **`health_score`**: mantener el render condicional a `null` (no mostrar puntuación).
5. **`pushed_at`**: parseo de texto ISO y formato local; hay repos con fecha reciente (hoy) y uno de
   noviembre de 2025.
6. **README de ficha**: 31 repos cambian de texto y uno (`ollama/ollama`) cambia de topics; validar
   el render de tablas/código con los README nuevos de `apache/spark`, `pytorch/pytorch` y
   `ClickHouse/ClickHouse`.

## 6. Qué necesito de ti

- Confirmar si el frontend debe tratar `disabled = true` de forma bloqueante (deshabilitar el botón
  de "usar este repo") o sólo informativa.
- Confirmar si `open_issues_count = 0` se muestra u se oculta.
- Avisar si alguna validación depende de que `is_maintained` o `health_score` no sean `null`:
  hoy `health_score` siempre lo es, por contrato.

## 7. Estado verificado tras la ejecución (2026-11-10)

Comprobado en Supabase con el rol de sincronización, sólo lectura:

| comprobación | resultado |
|---|---|
| `disabled` | 127/127 informados (`false`), 0 nulos |
| `open_issues_count` | 127/127 informados, 0 nulos |
| `pushed_at` | 127/127 informados, 0 nulos |
| `stargazers_count` / `forks_count` | 127/127 informados, 0 nulos |
| `topics` | 127/127 legibles como arreglo |
| `archived` | 0 archivados |
| `is_maintained` (calculado por el backend) | 126 mantenidos / 1 inactivo (`ziglang/zig`) |
| `health_score` | `null` en todos (sin cambios, por contrato) |
| READMEs actualizados | 31 (los otros 96 quedaron idénticos: la escritura no reescribe lo que no cambió) |

- El contrato HTTP no cambió de forma: sólo cambian valores. Un segundo dry-run confirmó **0
  inserciones** y **0 reescrituras de README**; la única diferencia frente al catálogo vivo es la
  deriva normal de GitHub (estrellas, forks, `pushed_at`, issues abiertos).
- La vista `v_repos_for_ai` sigue sin exponer `disabled` ni `open_issues_count`: no hubo DDL.
- Validar en el frontend los casos de §5 con datos reales ya es posible: los 127 repos tienen todos
  los campos poblados.
