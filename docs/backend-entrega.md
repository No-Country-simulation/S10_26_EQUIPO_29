# OpenBridge — Documentación técnica del backend y servicio de IA

**Fecha:** 9 de noviembre de 2026  
**Base revisada:** `imp-tool-connections`, commit `13391df`, integrado en `main` mediante PR #107, merge `0774fa0`.  
**Alcance:** API de catálogo (`backend/`), servicio HTTP del asistente (`ai/service/`), contratos y relación con los datos publicados en Supabase. No contiene credenciales ni constituye un manual exhaustivo de la ingesta.

## 1. Qué servicios existen

OpenBridge tiene dos aplicaciones FastAPI independientes. No hay que confundir que ambas utilicen Python con que sean el mismo proceso.

| Servicio | Entrada ASGI | Puerto local habitual | Responsabilidad |
| --- | --- | --- | --- |
| API de catálogo | `backend.app.main:app` | 8000 | Listado de repositorios y fichas con resultados de IA ya publicados |
| Servicio de asistente | `ai.service.app:create_app --factory` | 8001 | Interpretar consultas y generar propuestas usando búsqueda y modelos de lenguaje |

El frontend configura una URL base para cada servicio. Actualmente llama directamente a ambos: la API de catálogo **no actúa como proxy del asistente**.

```text
                         ┌─ GET /repos
Frontend ── API catálogo ─┤
                         └─ GET /repos/{owner}/{name}
                                   │
                                   ▼
                     Supabase / PostgreSQL
                     public.* + resultados ai.*
                                   ▲
                                   │ lectura al arrancar
Frontend ── servicio asistente ─────┤
                │                  └─ catálogo e índice en memoria
                ├─ embeddings locales y búsqueda
                └─ proveedor LLM remoto / alternativa local configurada
```

Los procesos de ingesta y enriquecimiento publican datos fuera de estas peticiones HTTP. Abrir una ficha no ejecuta una ingesta ni genera nuevas ideas de integración.

## 2. Tecnologías

### Catálogo

`backend/pyproject.toml` declara Python >=3.11, FastAPI, Uvicorn, Pydantic 2, SQLAlchemy 2 Core, psycopg 3 y `packaging` para validar expresiones SPDX. Las dependencias de desarrollo incluyen pytest y httpx.

Se emplea SQL parametrizado sobre SQLAlchemy Core. No hay un modelo ORM de entidades que escriba las tablas durante las peticiones.

### IA

`ai/requirements.txt` fija versiones de FastAPI, Uvicorn, Pydantic, psycopg, python-dotenv, httpx, SDK OpenAI, sentence-transformers, transformers, torch, numpy y pytest.

El SDK compatible con OpenAI se utiliza como transporte para proveedores configurados; eso no implica que el modelo seleccionado sea de OpenAI. `ai/llm.py` define proveedor, modelo, endpoint y variable de clave.

**Entornos separados recomendados:** el backend declara pytest `<9`, mientras IA fija pytest 9.1.1. No instalar ambos conjuntos indiscriminadamente en el mismo entorno. Los comandos de esta documentación mantienen entornos virtuales independientes.

## 3. Estructura del catálogo

```text
backend/
├─ pyproject.toml
├─ Dockerfile
├─ README.md
├─ sql/001_lector_api.sql
├─ docs/
│  ├─ acceso-base-datos.md
│  ├─ maintenance-calculation.md
│  ├─ health-score-implementation.md
│  └─ frontend-health-score-integration.md
├─ tests/
└─ app/
   ├─ main.py
   ├─ core/
   │  ├─ config.py
   │  └─ errors.py
   ├─ api/
   │  ├─ router.py
   │  ├─ deps.py
   │  ├─ schemas.py
   │  ├─ handlers.py
   │  └─ routes/
   │     ├─ repos.py
   │     └─ assistant.py
   ├─ db/session.py
   ├─ repositories/repos.py
   ├─ services/
   │  ├─ catalog.py
   │  ├─ health.py
   │  └─ assistant.py
   └─ clients/ai.py
```

### Separación de responsabilidades

| Capa | Qué hace | Qué no debe concentrar |
| --- | --- | --- |
| Rutas | Parámetros HTTP, dependencias y modelos de respuesta | SQL o lógica visual |
| Servicios | Reglas, adaptación, cálculos y validación | Detalles de componentes frontend |
| Repositorios | Consultas parametrizadas y filas | Códigos HTTP |
| Sesión DB | Motor, conexiones y límites | Reglas de negocio |
| Contratos/esquemas | Estructura y restricciones del payload | Generación de contenido |
| Handlers | Traducir errores de dominio a JSON/HTTP | Ocultar fallos con datos simulados |

`services/assistant.py` y `clients/ai.py` son archivos de estructura pendientes; no contienen la conexión efectiva al generador actual. La implementación real está en `ai/`.

## 4. Endpoints del catálogo

Las rutas no llevan prefijo `/api`.

### GET /health

Devuelve `{"status":"ok"}` como liveness del proceso. **No prueba conexión con Supabase ni disponibilidad de IA.** Para comprobar datos, consultar `/repos` o una ficha conocida.

### GET /repos

Devuelve un array con la página solicitada. Un resultado vacío válido devuelve HTTP 200 y `[]`.

| Parámetro | Regla |
| --- | --- |
| `q` | Texto de búsqueda, máximo 120 caracteres |
| `category` | Se puede repetir; categorías combinadas con OR |
| `language` | Lenguaje, máximo 50 caracteres; comparación sin distinguir mayúsculas |
| `license` | Identificador SPDX, máximo 50 caracteres |
| `maintenance` | `active` o `inactive`; representa estado operativo aproximado |
| `min_stars` | Entero >=0 |
| `page` | Entero >=1; por defecto 1 |
| `page_size` | Por defecto 20; máximo configurable, inicialmente 100 |

La paginación se entrega en cabeceras:

```text
X-Total-Count
X-Total-Pages
X-Page
X-Page-Size
```

El listado evita cargar README y topics; el orden es `full_name ASC`. El cliente frontend actual descarga todas las páginas y aplica sus filtros y paginación visual localmente. La existencia de filtros backend no significa que la UI los esté enviando.

La búsqueda SQL considera `full_name`, nombre, descripción y resumen de IA. Escapa `%`, `_` y la barra inversa para interpretar el texto del usuario literalmente; utiliza parámetros SQL.

`maintenance=active` significa no archivado y no deshabilitado. **No equivale a `is_maintained=true`**. El criterio temporal del indicador de mantenimiento es distinto.

### GET /repos/{owner}/{name}

Devuelve:

```text
{
  repo: Repo completo + extensiones de API,
  integration_ideas: hasta 3 ideas del repositorio
}
```

El ejemplo anterior describe la forma, no un JSON de prueba completo. Owner y name se validan con caracteres alfanuméricos, guion, guion bajo y punto, hasta 100 caracteres por segmento.

- Repo inexistente: HTTP 404.
- Sin enriquecimiento: resumen nulo y arrays de categorías/casos de uso/ideas vacíos según los datos disponibles.
- Repo archivado: no se publican ideas de integración.
- La consulta por `full_name` no distingue mayúsculas.
- No se llama al LLM para completar información faltante.

### POST /assistant en el puerto del catálogo

Es un **placeholder**: valida `AssistantRequest` y responde HTTP 503 con `provider_unavailable`. Una consulta inválida responde 422. No usar esta ruta del puerto 8000 para probar generación real.

La generación real usa el mismo path `/assistant` pero en la base del servicio de IA, habitualmente puerto 8001.

No hay endpoints independientes para categorías ni ideas: las primeras se definen en contrato y las segundas llegan dentro de la ficha.

## 5. Composición de datos desde Supabase

`backend/app/repositories/repos.py` combina:

| Fuente | Función |
| --- | --- |
| `public.catalog_repositories` | Datos originales del repositorio y métricas |
| `public.v_repos_for_ai` | Vista publicada para lectura; utilizada en detalle |
| `ai.ai_repo_enrichment` | Resumen en español y casos de uso |
| `ai.ai_repo_categories` | Categorías asignadas y orden por rank |
| `ai.ai_integration_ideas` | Ideas publicadas, snippets y metadatos de revisión |

El listado usa la tabla base con LEFT JOIN al enriquecimiento y agregación lateral de categorías. La ficha combina vista, tabla base, enriquecimiento, categorías e ideas. La agregación permite devolver varias categorías dentro de un mismo repo sin duplicar cards.

`disabled` y `open_issues_count` se leen de la tabla base. No asumir que todos los campos existen en la vista. Las ideas incluyen título, tipo, resumen, stack compatible, dependencias, dificultad, disparadores, código, lenguaje, URL documental y metadatos como `generated_by`, `reviewed_at` y `based_on_hash`.

Los identificadores canónicos son `github_id` y `full_name`. Un nombre comercial curado por el frontend no modifica estos identificadores.

## 6. Reglas de adaptación y calidad de datos

`CatalogService` construye los modelos de respuesta y aplica las siguientes reglas:

- Un dato nulo no se sustituye genéricamente por cero o falso.
- `archived` requerido e incompatible puede provocar error de catálogo.
- Un `summary_es` superior a 250 caracteres se recorta y genera un aviso en logs.
- Una idea inválida se omite y se registra, sin invalidar necesariamente toda la ficha.
- Se devuelven como máximo tres ideas, con el orden recibido del repositorio SQL.
- Se eliminan las ideas de repositorios archivados por regla del contrato.
- Fallos SQL y permisos insuficientes se traducen a indisponibilidad, no a fixtures.

**Consecuencia operativa:** una ficha sin ideas puede significar ausencia de datos publicados, repositorio archivado o ideas descartadas por validación. Revisar logs y datos antes de afirmar que nunca hubo ideas.

Los textos de categorías proceden del contrato compartido; sus asignaciones por repositorio proceden de las tablas de IA. `topics` de GitHub no equivale a categorías del producto.

## 7. Conexión PostgreSQL y permisos

`db/session.py` normaliza DSN `postgres://` y `postgresql://` al driver SQLAlchemy `postgresql+psycopg://`.

Configuración del motor:

- Pool de 5 conexiones y hasta 5 adicionales.
- `pool_pre_ping=True` para comprobar conexiones reutilizadas.
- Autocommit.
- Timeout de conexión predeterminado: 5 segundos.
- Timeout de sentencia predeterminado: 8000 ms.
- `default_transaction_read_only=on`.
- `application_name=openbridge-api`.
- Cierre del motor al apagar la aplicación.

Crear el motor no abre inmediatamente una conexión. Sin `DATABASE_URL`, el proceso puede arrancar y `/health` responder, pero `/repos` devuelve 503.

Usar un rol lector con los GRANT requeridos sobre tablas/vistas publicadas. `backend/sql/001_lector_api.sql` y `backend/docs/acceso-base-datos.md` documentan esa preparación. No es necesario usar el administrador para servir catálogo. Aplicar SQL de roles o cambios de permisos es una tarea separada del arranque.

## 8. Health score

Se calcula al leer la API mediante `services/health.py`; no se persiste desde la petición. Su publicación requiere `HEALTH_SCORE_ENABLED=true`, por defecto desactivado.

El perfil v 1 es un índice por reglas, documentado en el código como propuesta que necesita acuerdo del equipo. No es una auditoría de seguridad ni una garantía de calidad.

| Factor | Peso | Regla |
| --- | --- | --- |
| Recencia | 40% | Último push: <=30 días 1; <=90 0.75; <=180 0.5; <=365 0.25; después 0 |
| Issues | 25% | `1 - min(1, open_issues_count / max(1, stars × 0.1))` |
| Licencia | 15% | SPDX reconocida 1; NOASSERTION 0.5; nula/vacía/NONE 0 en el perfil actual; desconocida o LicenseRef sin factor |
| Estado | 20% | Archivado/deshabilitado 0; estado operativo válido 1 |

Fórmula:

```text
score = 100 × suma(peso × factor disponible) / suma(pesos disponibles)
```

- Se exige recencia disponible y cobertura ponderada mínima de 0.5.
- Factores desconocidos se excluyen y se renormalizan los restantes, con la excepción explícita de licencia nula configurada como cero.
- Archivado/deshabilitado impone techo de 59 puntos.
- Se acota a 0–100 y se redondea a un decimal.
- Tonos: >=80 bueno, >=60 intermedio, inferior a 60 bajo.
- El motor devuelve factores, cobertura, versión y fecha, pero el servicio publica actualmente **solo el número** en `health_score`.

Esto explica que varios repos puedan llegar a 100: no es un ranking relativo y la ausencia de un factor puede dejar el promedio basado en los factores restantes. Las estrellas se usan para normalizar issues, no como un factor independiente de popularidad.

Una fecha futura se trata como recencia de cero días en el motor actual. Es una diferencia respecto al cálculo de mantenimiento que conviene revisar con el equipo de datos.

## 9. Mantenimiento activo

`compute_is_maintained` en `services/catalog.py` calcula:

| Caso | Resultado |
| --- | --- |
| Archivado | `false` |
| No archivado, push válido en últimos 180 días inclusive | `true` |
| No archivado, push anterior | `false` |
| Estado desconocido o fecha ausente/inválida/futura | `null` |

Se calcula al servir la respuesta; no escribe una columna. Es independiente de `disabled` y del health score. Las fechas sin zona se interpretan en UTC.

La UI traduce los tres valores a Sí, No y Por confirmar. No presentar `null` como falta de mantenimiento.

**Documentación desactualizada detectada:** la descripción de la ruta de ficha todavía afirma que `is_maintained` siempre es nulo. El comportamiento ejecutado por `CatalogService` ya utiliza el cálculo anterior. Priorizar código y pruebas hasta actualizar Swagger.

## 10. Servicio del asistente

```text
ai/
├─ service/app.py          # FastAPI y ciclo de vida
├─ service/settings.py     # Origen de catálogo y CORS
├─ assistant.py            # Entender → buscar → generar
├─ search.py               # Índice y recuperación de candidatos
├─ embeddings.py           # Modelo local y configuración vectorial
├─ llm.py                  # Proveedores, claves, fallbacks y tiempos
├─ guardrails.py           # Controles de entrada y salida
├─ published.py            # Lectura/composición de datos publicados
├─ catalog.py              # Carga de snapshots
├─ enrich.py / ideas.py    # Procesos de enriquecimiento
├─ scripts/                # Generación, revisión y publicación por lotes
├─ sql/                    # Tablas y roles de IA
├─ data/catalog/           # Snapshot de respaldo
└─ tests/                  # Pruebas y evaluaciones
```

### Arranque

1. Carga `.env` mediante python-dotenv si no se inyectan settings.
2. Resuelve cadena de proveedores.
3. Lee catálogo desde base o archivos según configuración.
4. Carga el modelo local de embeddings.
5. Reutiliza vectores guardados compatibles o calcula los faltantes.
6. Construye índice en memoria y comienza a aceptar peticiones.

El arranque puede tardar por carga o descarga de modelos. El servicio mantiene un snapshot en memoria: no relee todas las tablas en cada consulta. No hay un refresco periódico implementado en el lifespan mostrado; para recoger cambios publicados hay que recargar el proceso o implementar un mecanismo explícito.

### Origen de datos y respaldo

`AI_CATALOG_SOURCE=database` es el valor por defecto; utiliza `AI_READER_DATABASE_URL` y lee la vista, enriquecimiento, categorías y `ai.ai_embeddings`.

**Importante:** si falla esa lectura, la implementación actual del asistente utiliza el snapshot de archivos y lo informa en logs y `/health` con `catalog_source` y `catalog_fallback_reason`. Esto es distinto de la API de catálogo, que responde 503 sin fallback, y de los mocks explícitos del frontend.

Por tanto, un asistente que responde no demuestra por sí solo que esté leyendo Supabase. Comprobar `catalog_source: "database"` y que `catalog_fallback_reason` sea nulo.

### POST /assistant

Entrada: objeto con `query` de 20 a 2000 caracteres. La ejecución sigue:

1. Controles de entrada contra instrucciones de manipulación.
2. Interpretación de necesidades del usuario.
3. Búsqueda de candidatos por necesidad y umbral de evidencia.
4. Generación de propuesta con candidatos permitidos.
5. Validación de estructura y reglas; corrección/reintento si corresponde.
6. Respuesta de contrato o error HTTP.

La ruta es síncrona (`def`) y FastAPI la ejecuta en un hilo para no bloquear el event loop con CPU/red.

Estados válidos: `ok`, `needs_clarification`, `no_evidence`. La respuesta incluye componentes, conexiones, supuestos, limitaciones y preguntas cuando corresponda. No constituye una conversación acumulativa: recibe una consulta, no un historial de chat.

### Embeddings y LLM son cosas diferentes

- **Embeddings:** modelo local en CPU, por defecto `google/embeddinggemma-300m`, 768 dimensiones, para representar textos y buscar candidatos. Umbral configurado en código:0.18.
- **LLM:** interpreta necesidades y genera la respuesta mediante el proveedor configurado. Gemini/Groq/Claude son llamadas remotas; Ollama es una alternativa local definida en el registro.

El modelo de embeddings requiere acceso/licencia de Hugging Face cuando corresponda. Cambiarlo exige revisar compatibilidad y recalcular vectores; `ai.ai_embeddings` está definido para 768 dimensiones. La alternativa Qwen declarada usa 1024, por lo que no es un cambio transparente de almacenamiento.

El registro actual define Gemini como principal y `groq-low,claude-haiku` como fallbacks predeterminados. Los respaldos sin clave se omiten. Hay límites de tiempo por llamada y pausa temporal de proveedores fallidos; los detalles se concentran en `ai/llm.py`.

### Protección de entrada y salida

El PR #106 incorpora detección de intentos de ignorar instrucciones, cambiar rol o extraer reglas. Cuando se detectan, devuelve preguntas de aclaración sin llamar al LLM. Además separa datos de usuario/repositorio de instrucciones y valida salidas como enlaces o reglas copiadas.

Es una defensa por capas, no una garantía absoluta. Las consultas legítimas que utilizan palabras como «reglas de negocio» deben seguir funcionando; mantener pruebas de falsos positivos.

### GET /health del asistente

Incluye número de repos, origen, fecha del snapshot, motivo de fallback, vectores reutilizados/calculados, modelo de embeddings y proveedores con indicador de clave configurada y pausa temporal.

`status=ok` no realiza una generación de prueba ni garantiza que las cuotas o credenciales remotas funcionen en la siguiente llamada. No devuelve los secretos, pero sí metadatos operativos.

## 11. Errores HTTP

Formato principal de error de aplicación:

```json
{"error":{"code":"catalog_unavailable","message":"..."}}
```

| Servicio | HTTP | Código/caso |
| --- | --- | --- |
| Catálogo |404| `repo_not_found` |
| Catálogo |422| `invalid_request` |
| Catálogo |503| `catalog_unavailable` |
| Asistente |422| `invalid_query` |
| Asistente |502| Respuesta de generación inválida |
| Asistente |503| Proveedor no disponible |
| Asistente |504| Timeout |

La UI debe basarse en códigos y presentar sus mensajes propios, no trazas técnicas. Los 404/405 genéricos del framework no necesariamente usan el mismo envoltorio que los errores de aplicación.

## 12. Variables de entorno

### Catálogo: `backend/.env`

```dotenv
DATABASE_URL=postgresql+psycopg://LECTOR:CLAVE@HOST:5432/postgres?sslmode=require
CORS_ORIGINS=http://127.0.0.1:4173,http://localhost:4173
CATALOG_PAGE_SIZE=20
CATALOG_MAX_PAGE_SIZE=100
DB_CONNECT_TIMEOUT=5
DB_STATEMENT_TIMEOUT_MS=8000
HEALTH_SCORE_ENABLED=true
```

Los valores de conexión son placeholders. `HEALTH_SCORE_ENABLED=true` activa el cálculo para el entorno; omitirlo conserva el valor por defecto desactivado.

### Asistente: `.env` del repositorio

```dotenv
AI_CATALOG_SOURCE=database
AI_READER_DATABASE_URL=postgresql://LECTOR_IA:CLAVE@HOST:5432/postgres?sslmode=require
AI_CORS_ORIGINS=http://127.0.0.1:4173,http://localhost:4173
AI_EMBEDDING_MODEL=embeddinggemma
AI_LLM_PROVIDER=gemini
AI_LLM_FALLBACK=groq-low,claude-haiku
GEMINI_API_KEY=CONFIGURAR_LOCALMENTE
GROQ_API_KEY=CONFIGURAR_SI_SE_USA
ANTHROPIC_API_KEY=CONFIGURAR_SI_SE_USA
```

El catálogo normaliza el prefijo de SQLAlchemy; el lector de IA usa psycopg directamente, por lo que conviene entregar un DSN PostgreSQL estándar a `AI_READER_DATABASE_URL`.

No versionar `.env`, no incluir valores reales en tickets, frontend ni documentación. Los permisos deben ajustarse a lectura para servicios y a escritura limitada para los procesos de publicación.

## 13. Ejecutar localmente

Desde la raíz del repositorio, con Python compatible y acceso a dependencias:

### API del catálogo

```bash
python3 -m venv backend/.venv
backend/.venv/bin/python -m pip install -e './backend[dev]'
backend/.venv/bin/python -m uvicorn backend.app.main:app \
  --env-file backend/.env --host 127.0.0.1 --port 8000
```

### Servicio de IA, en otra terminal

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r ai/requirements.txt
.venv/bin/python -m uvicorn ai.service.app:create_app \
  --factory --host 127.0.0.1 --port 8001
```

Preparar primero las claves y el acceso al modelo de embeddings. No crear otra instancia sobre un puerto ocupado. Los comandos suponen ejecución desde la raíz para resolver imports `backend`, `ai` y `shared`.

### Comprobaciones

```bash
curl http://127.0.0.1:8000/health
curl 'http://127.0.0.1:8000/repos?page=1&page_size=1'
curl http://127.0.0.1:8000/repos/keycloak/keycloak
curl http://127.0.0.1:8001/health
curl -X POST http://127.0.0.1:8001/assistant \
  -H 'Content-Type: application/json' \
  -d '{"query":"Necesito un portal para mis clientes con acceso privado, pedidos y reportes de ventas."}'
```

La última prueba puede consumir cuota del proveedor. Usar una necesidad ficticia de prueba, sin información sensible.

Cada aplicación expone su documentación FastAPI habitual en `/docs` y su esquema en `/openapi.json`. Revisar las notas de desactualización de este documento antes de asumir que todo el texto descriptivo de Swagger coincide con la lógica actual.

## 14. Ingesta y enriquecimiento: límites operativos

`ingestion/` pertenece al flujo de captura de datos; `ai/scripts/` incluye enriquecimiento, generación de ideas, revisión y publicación. Entre los scripts de IA están `refresh_ai_data.py`, `enrich_catalog.py`, `generate_ideas.py`, `write_enrichment.py`, `write_ideas.py`, `review_ideas.py` y `export_catalog_snapshot.py`.

No ejecutarlos como parte de levantar la web. Algunos generan llamadas de pago o escriben datos. Revisar sus argumentos, modo de revisión y permisos por separado.

La existencia de scripts no acredita que exista una programación diaria activa. La frecuencia real de ingesta depende del despliegue/scheduler del equipo y debe confirmarse allí. La API de catálogo lee datos publicados; el asistente mantiene una copia tomada al arrancar.

## 15. Pruebas

```bash
# API de catálogo
backend/.venv/bin/python -m pytest backend/tests -q

# IA y contratos compartidos
.venv/bin/python -m pytest ai/tests tests/contracts -q
```

Las pruebas del backend cubren SQL, filtros, paginación, detalle, errores, compatibilidad de contratos, health score y mantenimiento. Las de IA cubren servicio, recuperación, proveedores, validación, guardrails y procesos de datos.

**Evidencia de la revisión del PR #107:**525 pruebas de IA y contratos aprobadas,2 omitidas. No se ejecutó nuevamente la suite de `backend/tests` para redactar este documento; no atribuirle un resultado nuevo.

En navegador se comprobó una consulta legítima con «ignorar pedidos duplicados» y «reglas de descuentos», que produjo 4 herramientas y 1 conexión. Las preguntas del filtro de seguridad se mostraron como aclaración, no como error rojo.

No ejecutar evaluaciones costosas o conjuntos reservados de evaluación como si fueran simples pruebas unitarias sin revisar sus instrucciones.

## 16. Diagnóstico rápido

| Síntoma | Verificar |
| --- | --- |
| `/health` catálogo 200 pero cards no cargan | `/repos`, DATABASE_URL, permisos y timeout SQL |
| Catálogo 503 | Conexión, GRANT, vista/tablas y filas incompatibles |
| Asistente 503 inmediato en puerto 8000 | Se está llamando al placeholder; utilizar la base del servicio 8001 |
| IA responde con datos antiguos | `catalog_taken_at`, `catalog_source` y reinicio del índice tras publicación |
| IA funciona sin conexión DB | Puede estar usando fallback de archivos; revisar health |
| Ficha sin ideas | Ausencia real, archivado o descarte por validación; revisar logs |
| Mantenimiento «Por confirmar» | Fecha ausente/inválida/futura o estado desconocido |
| Salud «Sin evaluar» | Flag apagado, falta de recencia o cobertura insuficiente |
| Muchos 100/100 | Factores disponibles y renormalización; no implica error de render |
| Frontend timeout antes de aviso largo | Cliente HTTP usa 20 s; aviso visual está a 60 s |
| Error CORS | Configurar cada API y origen exacto, incluyendo protocolo/puerto |

## 17. Pendientes y riesgos conocidos

1. **Actualizar Swagger:** corregir las descripciones antiguas que afirman mantenimiento nulo.
2. **Acordar fórmula de salud:** los comentarios del motor la mantienen como propuesta; documentar aprobación y versionar cambios.
3. **Exponer explicaciones de score si se necesitan:** factores y cobertura existen internamente, pero no viajan actualmente como detalle en la respuesta.
4. **Refresco del índice de IA:** coordinar cuándo debe incorporar nuevas ingestas o enriquecimientos sin depender únicamente del reinicio.
5. **Fallback de IA:** decidir si en despliegue debe permitirse usar archivos o fallar explícitamente; hoy está permitido e informado por health/logs.
6. **Página fuera de rango:** el total se obtiene con `COUNT(*) OVER()` sobre filas devueltas; una página vacía informa total 0 aunque pueda haber datos en páginas anteriores. Revisar antes de migrar la UI a paginación remota plena.
7. **Fuentes distintas para lista/ficha:** una inconsistencia entre tabla y vista puede hacer visible un repo en listado y no en detalle.
8. **Autenticación y límites de uso:** no se observa autenticación ni rate limiting en las rutas revisadas. CORS no sustituye controles de acceso ni protección de cuota al publicar el asistente.
9. **Fechas futuras:** salud y mantenimiento tienen tratamientos distintos; coordinar política de calidad de datos.
10. **Timeouts de extremo a extremo:** alinear navegador, servicio, proveedores y proxy de despliegue.

## 18. Qué archivos tocar según el cambio

| Cambio | Archivos/capa |
| --- | --- |
| Tablas, joins, columnas de lectura | `backend/app/repositories/repos.py` |
| Adaptación de payload, ideas o resumen | `backend/app/services/catalog.py` |
| Cálculo de mantenimiento | `compute_is_maintained` en `services/catalog.py` |
| Fórmula y pesos de salud | `backend/app/services/health.py` + pruebas y versión |
| Parámetros/endpoints del catálogo | `backend/app/api/routes/repos.py` |
| Respuestas y códigos de error | `backend/app/api/handlers.py`, `core/errors.py` |
| Pool, driver y timeout DB | `backend/app/db/session.py`, `core/config.py` |
| Contrato compartido | `shared/contracts/`, coordinado con frontend y datos |
| Lectura del catálogo para IA | `ai/published.py`, `ai/service/app.py` |
| Embeddings y recuperación | `ai/embeddings.py`, `ai/search.py` |
| Proveedores y fallbacks | `ai/llm.py` |
| Generación/validación de arquitectura | `ai/assistant.py`, `ai/guardrails.py` |
| Rutas HTTP de IA | `ai/service/app.py` |
| Generación y publicación por lotes | `ai/scripts/`, con permisos y revisión separados |

No conectar el generador en archivos vacíos del catálogo sin acordar primero si se desea un proxy. La arquitectura actual con dos bases HTTP ya está soportada por el frontend.

## 19. Referencias del repositorio

- `backend/README.md`
- `backend/docs/acceso-base-datos.md`
- `backend/docs/maintenance-calculation.md`
- `backend/docs/health-score-implementation.md`
- `backend/docs/frontend-health-score-integration.md`
- `ai/README.md`
- `shared/contracts/`
- `docs/frontend-entrega.md`

El código y las pruebas de la revisión indicada prevalecen sobre comentarios históricos. Este documento no aplica migraciones, no ejecuta ingesta, no modifica permisos y no publica servicios.
