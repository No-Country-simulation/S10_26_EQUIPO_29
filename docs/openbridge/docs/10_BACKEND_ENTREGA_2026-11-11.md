# OpenBridge — Documentación técnica del backend y servicio de IA

**Fecha de revisión:** 11 de noviembre de 2026
**Base revisada:** rama `frontend`, sincronizada con `main` e integrada mediante PR #136. Referencia de `main`: `362b19dae88cdd581dbeb5ddd5c14b74aa8edaa8`. Incluye los cambios de títulos del PR #134. Esta revisión describe el código de esa base; no certifica el estado de un despliegue remoto ni sus secretos.
**Alcance:** API de catálogo (`backend/`), servicio HTTP del asistente (`ai/service/`), contratos y relación con los datos publicados en Supabase. No contiene credenciales ni constituye un manual exhaustivo de la ingesta.

## Resumen para la entrega

- Dos servicios HTTP: catálogo en 8000 y asistente en 8001. El navegador consume una URL distinta para cada uno.
- La API de catálogo consulta PostgreSQL en lectura. La ficha devuelve datos originales y enriquecimiento publicado, incluidas las ideas de integración.
- El asistente combina interpretación de necesidades, recuperación por embeddings y generación estructurada. Usa un catálogo en memoria con revisión automática de publicaciones cada 10 minutos por defecto.
- Health score y mantenimiento se calculan al servir la API; no requieren escribir esos resultados en la tabla de repositorios.
- La sincronización programada del catálogo es diaria pero **dry-run**. El workflow diario de actualización de IA sí contempla generación y publicación, con permisos y frenos propios.
- Las consultas de usuario no ejecutan ingesta ni publican enriquecimientos en Supabase.

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
                                   │ lectura al arrancar y al recargar
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

Los identificadores canónicos son `github_id` y `full_name`. Un nombre comercial curado por el frontend no modifica estos identificadores. Las URLs nuevas de ficha usan `#herramienta/{owner}/{name}`; el frontend conserva la resolución de enlaces antiguos por ID o alias. La ruta HTTP del backend sigue siendo `/repos/{owner}/{name}`.

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

Los textos de categorías proceden del contrato compartido; sus asignaciones por repositorio proceden de las tablas de IA. `topics` de GitHub no equivale a categorías del producto. `Repo` permite hasta seis categorías, cuatro casos de uso y 250 caracteres en `summary_es`. El `description` original de GitHub es otro campo: no se debe confundir con el resumen enriquecido.

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

Las descripciones actuales de la ficha y de `CatalogRepo` ya documentan el cálculo de mantenimiento y el flag de health score. La ingesta no requiere una columna física `is_maintained`: conserva las señales originales y la API deriva el indicador en lectura. La función auxiliar de la ingesta sirve para validación/informes; no es una segunda columna que la API tenga que sincronizar.

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

El arranque puede tardar por carga o descarga de modelos. El servicio mantiene un snapshot en memoria y no relee todas las tablas en cada consulta.

### Recarga automática del índice

`CatalogReloader` revisa por defecto cada **10 minutos**, mediante `AI_CATALOG_RELOAD_MINUTES`. La marca consultada es `count(*)` y `max(processed_at)` de `ai.ai_processing`.

- Si la marca no cambia, conserva el catálogo y no reconstruye el índice.
- Si cambia, carga y prepara un catálogo nuevo en un hilo y lo intercambia completo. Una petición en curso continúa con la referencia que tomó al empezar.
- Si falla la revisión o la nueva carga, conserva el catálogo anterior e informa el fallo mediante logs y `catalog_reload_error`.
- Una recarga fallida no sustituye el catálogo vigente por archivos de respaldo. Ese fallback corresponde al arranque.
- `AI_CATALOG_RELOAD_MINUTES=0` desactiva la revisión periódica; el origen `files` no activa revisión de publicaciones en la base.

La marca pertenece a las publicaciones de IA: modificar únicamente la tabla original no garantiza una recarga si no cambia `ai.ai_processing`. Esto no es un mecanismo de suscripción en tiempo real.

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

Estados válidos: `ok`, `needs_clarification`, `no_evidence`. La respuesta incluye `id`, `status`, `title`, `summary`, `components`, `connections`, `assumptions`, `limitations`, `clarification_questions` y `generated_at`, según las reglas del contrato.

`components` admite hasta seis herramientas. Cada componente tiene `key`, `label`, `role`, `full_name` y `rationale`. Las conexiones referencian esas claves con `from_key` y `to_key`, e incluyen `protocol` y `description`. La cantidad de herramientas y conexiones depende de la evidencia recuperada; no hay un mínimo garantizado.

El prompt de generación vigente solicita un título de 4 a 10 palabras que nombre el sistema y el negocio del usuario, evitando frases genéricas sobre el tipo de licencia. El código valida el máximo de 80 caracteres; la pauta de palabras es una instrucción al modelo. Véase `ai/eval/TITLE_DECISION.md`.

Una licencia sin identificar se comunica como advertencia en las recomendaciones; no se debe convertir por sí sola en motivo para ocultar toda la arquitectura. La validación del cliente sigue comprobando estructura y referencias al catálogo.

No constituye una conversación acumulativa: recibe una consulta, no un historial de chat.

### Embeddings y LLM son cosas diferentes

- **Embeddings:** modelo local en CPU, por defecto `google/embeddinggemma-300m`, 768 dimensiones, para representar textos y buscar candidatos. Umbral configurado en código:0.18.
- **LLM:** interpreta necesidades y genera la respuesta mediante el proveedor configurado. Gemini/Groq/Claude son llamadas remotas; Ollama es una alternativa local definida en el registro.

El modelo de embeddings requiere acceso/licencia de Hugging Face cuando corresponda. Cambiarlo exige revisar compatibilidad y recalcular vectores; `ai.ai_embeddings` está definido para 768 dimensiones. La alternativa Qwen declarada usa 1024, por lo que no es un cambio transparente de almacenamiento.

La configuración predeterminada del código es:

| Clave de proveedor | Modelo | Función predeterminada |
| --- | --- | --- |
| `gemini` | `gemini-3.5-flash-lite` | Principal |
| `groq-low` | `openai/gpt-oss-120b`, razonamiento bajo | Primer respaldo |
| `claude-haiku` | `claude-haiku-5-5`, thinking desactivado | Segundo respaldo |

`AI_LLM_PROVIDER` y `AI_LLM_FALLBACK` pueden cambiar esa cadena. Los respaldos sin clave se omiten. El registro también declara otras alternativas; no todas están activas. Groq es el proveedor de inferencia del modelo indicado, no un modelo de embeddings.

### Presupuesto de tiempo y espera del usuario

| Límite | Valor actual | Fuente |
| --- | --- | --- |
| Presupuesto compartido de la petición IA | 15 s | `ai/assistant.py`, `BUDGET_SECONDS` |
| Primera llamada, si hay respaldo disponible | Hasta 7 s, limitada también por el presupuesto restante | `ai/llm.py`, `FIRST_TRY_SECONDS` |
| Tiempo mínimo para iniciar otra llamada | 2.5 s disponibles | `ai/llm.py`, `MIN_CALL_SECONDS` |
| Llamada sin deadline, por ejemplo una evaluación | 15 s | `ai/llm.py`, `TIMEOUT_SECONDS` |
| Pausa temporal del proveedor por fallo transitorio | 60 s | `ai/llm.py`, `COOLDOWN_SECONDS` |
| Aviso visual de espera prolongada | 15 s | `frontend/src/data/assistantRequest.mjs` |
| Límite HTTP del frontend | 20 s | `frontend/src/data/assistantHttp.mjs` |

El presupuesto abarca entender y generar, con los reintentos que quepan; no concede 15 segundos nuevos a cada proveedor. El límite genérico de 90 s de `requestAssistant` sigue existiendo para proveedores de prueba, pero el flujo HTTP real lo sustituye por 20 s. Los proxies del despliegue también deben permitir completar ese recorrido. Estos valores son límites configurados, no una promesa de latencia.

Agotar cuota, una clave inválida o la indisponibilidad de todos los proveedores puede producir 503. Un `health` correcto no descarta esas causas.

### Protección de entrada y salida

El PR #106 incorpora detección de intentos de ignorar instrucciones, cambiar rol o extraer reglas. Cuando se detectan, devuelve preguntas de aclaración sin llamar al LLM. Además separa datos de usuario/repositorio de instrucciones y valida salidas como enlaces o reglas copiadas.

Es una defensa por capas, no una garantía absoluta. Las consultas legítimas que utilizan palabras como «reglas de negocio» deben seguir funcionando; mantener pruebas de falsos positivos.

### GET /health del asistente

Incluye número de repos, origen, `catalog_taken_at`, motivo de fallback, vectores reutilizados/calculados, modelo de embeddings y proveedores con indicador de clave configurada y pausa temporal. También publica `catalog_loaded_at` (última carga buena), `catalog_checked_at` (última revisión) y `catalog_reload_error` (fallo no resuelto de revisión/recarga).

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
| Asistente |502| `invalid_response`: respuesta de generación inválida |
| Asistente |503| `provider_unavailable`: cuota, credenciales o proveedor no disponible |
| Asistente |504| `timeout`: tiempo o presupuesto agotado |

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
AI_CATALOG_RELOAD_MINUTES=10
AI_READER_DATABASE_URL=postgresql://LECTOR_IA:CLAVE@HOST:5432/postgres?sslmode=require
AI_CORS_ORIGINS=http://127.0.0.1:4173,http://localhost:4173
AI_EMBEDDING_MODEL=embeddinggemma
AI_LLM_PROVIDER=gemini
AI_LLM_FALLBACK=groq-low,claude-haiku
GEMINI_API_KEY=CONFIGURAR_LOCALMENTE
GROQ_API_KEY=CONFIGURAR_SI_SE_USA
ANTHROPIC_API_KEY=CONFIGURAR_SI_SE_USA
```

Para descargar el modelo de Hugging Face cuando lo requiera, configurar `HF_TOKEN` en el entorno correspondiente y aceptar sus condiciones. El servicio del asistente solo necesita un lector de base. `AI_DATABASE_URL` corresponde al escritor de los procesos de publicación, no es necesario para responder consultas de usuario.

### Frontend: `frontend/.env.local`

```dotenv
NEXT_PUBLIC_CATALOG_API_BASE_URL=http://127.0.0.1:8000/
NEXT_PUBLIC_ASSISTANT_API_BASE_URL=http://127.0.0.1:8001/
NEXT_PUBLIC_MOCK_MODE=false
```

Estas URLs son públicas para el navegador y se incorporan al compilar. En un despliegue compartido deben apuntar a servicios accesibles por HTTP/HTTPS, no al localhost del desarrollador. Nunca poner claves de modelos ni DSN en variables `NEXT_PUBLIC_*`.

Sin URL configurada y fuera del modo de prueba explícito, la UI muestra indisponibilidad; no debe aparentar datos reales con mocks silenciosos. El script `frontend/scripts/stable-preview.mjs` carga la configuración local antes de compilar en su directorio temporal, manteniendo los archivos `.env` fuera de los assets publicados.

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

Cada aplicación expone su documentación FastAPI en `/docs` y su esquema en `/openapi.json`. Consultar la base y puerto correspondientes; abrir `/docs` del catálogo no documenta el generador de IA.

## 14. Ingesta y actualización programada

Hay tres operaciones diferentes: sincronizar los datos originales, publicar resultados de IA y recargar el índice que usa el servicio. No ocurren al abrir una card o enviar una consulta.

### Datos originales: `update-catalog`

El workflow `.github/workflows/update_catalog.yml` tiene cron `0 11 * * *`: **11:00 UTC**, equivalente a **08:00 en America/Punta_Arenas** para la fecha de revisión. La ejecución programada llama a `ingestion/scripts/update_catalog.py` con `--live --dry-run --target supabase --fail-on-incomplete`.

**Dry-run consulta y prepara el plan, pero no aplica escrituras.** El cron presente en el repositorio no equivale a una actualización diaria de las filas de Supabase.

La aplicación de cambios está reservada a una ejecución manual (`workflow_dispatch`, `mode=apply`), exige la variable de repositorio `OPENBRIDGE_SYNC_ALLOW_WRITES=1` y el secreto de confirmación `OPENBRIDGE_SYNC_CONFIRMATION`, además de las credenciales de conexión. El workflow evita dos ejecuciones simultáneas y publica un resumen saneado como artefacto. Ante fallo puede abrir o actualizar una incidencia.

La sincronización aplica cambios incrementales sobre el conjunto de repositorios configurado; no es un descubridor diario de repositorios nuevos. La ingesta conserva señales originales y no escribe `is_maintained`. Sus reglas de hash/versión y control optimista se documentan en `ingestion/docs/update_catalog_runbook.md` y `ingestion/docs/ADR-004_sincronizacion_incremental.md`.

### Resultados de IA: `ai-refresh`

El workflow `.github/workflows/ai_refresh.yml` tiene cron `17 12 * * *`: **12:17 UTC**, equivalente a **09:17 en America/Punta_Arenas** para esta revisión. Ejecuta `python -m ai.scripts.auto_refresh_ai_data` con el environment `datos-ia`.

- Compara la vista publicada con los registros de procesamiento de la base, no con un mock de frontend.
- Regenera cuando cambia la entrada que lee el modelo: descripción, topics o README. Cambios aislados de estrellas o fechas no disparan regeneración.
- Publica los resultados válidos y los vectores necesarios mediante el flujo de escritura; las fallas quedan en el informe para reintentarse en otra corrida.
- No marca ideas como revisadas por profesionales de manera automática.
- Por defecto frena antes de llamar al modelo si cambia más del 40% del catálogo o se prevén más de 100 llamadas. La opción manual `permitir_mas_cambios` levanta ese freno solo para esa corrida.
- Los cambios de versión de reglas y los repos fuera de la vista se informan como pendientes; no borra automáticamente esas filas ni modifica los snapshots versionados del repositorio.
- Usa `AI_READER_DATABASE_URL`, `AI_DATABASE_URL`, `GEMINI_API_KEY` y `HF_TOKEN` del environment. El proveedor por defecto del script es Gemini; no debe confundirse su configuración de lote con la cadena interactiva del servicio.
- Códigos de salida: 0 sin pendientes o publicado; 1 publicación parcial; 2 error de lectura/escritura; 3 freno de volumen. El workflow marca fallo por código 2 y gestiona una incidencia para situaciones que requieren atención.

El horario es posterior al de sincronización, pero son workflows independientes: no hay una dependencia que garantice que una sincronización se aplicó antes. Además, el primer workflow programado es dry-run.

### Índice servido al usuario

Después de una publicación de IA que cambie `ai.ai_processing`, el asistente la detecta en su siguiente revisión periódica y recarga el índice. El intervalo por defecto es 10 minutos; no es una ingesta ni ejecuta generación por lote.

### Verificación operativa

La presencia de estos archivos demuestra la programación declarada. Para afirmar que está funcionando en GitHub hay que comprobar que los workflows están habilitados en la rama por defecto, que sus variables/secretos y permisos están configurados y que las últimas ejecuciones finalizaron correctamente. Esta actualización de documentación no ejecutó workflows, ingesta, migraciones ni escrituras en Supabase.

Otros procesos manuales de `ai/scripts/` incluyen `refresh_ai_data.py`, `enrich_catalog.py`, `generate_ideas.py`, `write_enrichment.py`, `write_ideas.py`, `review_ideas.py` y `export_catalog_snapshot.py`. No forman parte del arranque de los servicios.

## 15. Pruebas

```bash
# API de catálogo
backend/.venv/bin/python -m pytest backend/tests -q

# IA y contratos compartidos
.venv/bin/python -m pytest ai/tests tests/contracts -q
```

Las pruebas del backend cubren SQL, filtros, paginación, detalle, errores, compatibilidad de contratos, health score y mantenimiento. Las de IA cubren servicio, recuperación, proveedores, validación, guardrails y procesos de datos.

**Pruebas ejecutadas para esta revisión, el 11 de noviembre de 2026:**

| Alcance | Comando | Resultado |
| --- | --- | --- |
| API de catálogo | `python -m pytest backend/tests -q` | 155 aprobadas |
| IA y contratos | `python -m pytest ai/tests tests/contracts -q` | 596 aprobadas, 3 omitidas |

Se utilizaron los entornos ya disponibles: uno con las dependencias del catálogo y otro con las de IA. El entorno del catálogo emitió una advertencia de deprecación de Starlette/httpx; no hubo fallos. Son pruebas automatizadas del código; no acreditan cuotas disponibles del proveedor ni una conexión real a Supabase durante la ejecución.

No ejecutar evaluaciones costosas o conjuntos reservados de evaluación como si fueran simples pruebas unitarias sin revisar sus instrucciones.

## 16. Diagnóstico rápido

| Síntoma | Verificar |
| --- | --- |
| `/health` catálogo 200 pero cards no cargan | `/repos`, DATABASE_URL, permisos y timeout SQL |
| Catálogo 503 | Conexión, GRANT, vista/tablas y filas incompatibles |
| Asistente 503 inmediato en puerto 8000 | Se está llamando al placeholder; utilizar la base del servicio 8001 |
| IA responde con datos antiguos | Origen, `catalog_taken_at`, `catalog_loaded_at`, `catalog_checked_at`, `catalog_reload_error`, intervalo de recarga y marca de `ai.ai_processing` |
| IA funciona sin conexión DB | Puede estar usando fallback de archivos; revisar health |
| Ficha sin ideas | Ausencia real, archivado o descarte por validación; revisar logs |
| Mantenimiento «Por confirmar» | Fecha ausente/inválida/futura o estado desconocido |
| Salud «Sin evaluar» | Flag apagado, falta de recencia o cobertura insuficiente |
| Muchos 100/100 | Factores disponibles y renormalización; no implica error de render |
| La consulta tarda o termina con timeout | Aviso visual a 15 s, presupuesto IA de 15 s y límite HTTP de 20 s; revisar proveedor y proxy |
| APIs sanas pero UI informa indisponibilidad | URLs `NEXT_PUBLIC_*` incorporadas a la compilación y origen/puerto del servicio utilizado |
| Workflow diario sin cambios en Supabase | La ejecución programada de `update-catalog` es dry-run; revisar modo y permisos |
| Error CORS | Configurar cada API y origen exacto, incluyendo protocolo/puerto |

## 17. Pendientes y riesgos conocidos

1. **Confirmar operación de workflows:** revisar habilitación, permisos, secretos y ejecuciones reales. La programación del catálogo todavía no aplica escrituras automáticamente.
2. **Acordar fórmula de salud:** los comentarios del motor la mantienen como propuesta; documentar aprobación y versionar cambios.
3. **Exponer explicaciones de score si se necesitan:** factores y cobertura existen internamente, pero no viajan actualmente como detalle en la respuesta.
4. **Cobertura de la marca de recarga:** el refresco automático ya existe, pero detecta publicaciones mediante `ai.ai_processing`. Revisar los casos de cambios solo en tabla base o vectores sin cambio de esa marca.
5. **Fallback de IA:** decidir si en despliegue debe permitirse usar archivos o fallar explícitamente; hoy está permitido e informado por health/logs.
6. **Página fuera de rango:** el total se obtiene con `COUNT(*) OVER()` sobre filas devueltas; una página vacía informa total 0 aunque pueda haber datos en páginas anteriores. Revisar antes de migrar la UI a paginación remota plena.
7. **Fuentes distintas para lista/ficha:** una inconsistencia entre tabla y vista puede hacer visible un repo en listado y no en detalle.
8. **Autenticación y límites de uso:** no se observa autenticación ni rate limiting en las rutas revisadas. CORS no sustituye controles de acceso ni protección de cuota al publicar el asistente.
9. **Fechas futuras:** salud y mantenimiento tienen tratamientos distintos; coordinar política de calidad de datos.
10. **Disponibilidad y tiempos reales:** los límites ya están alineados a 15 s de IA y 20 s de cliente. Verificar el proxy y observar cuotas, pausas y latencia real; health no ejecuta una generación.

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
| Recarga periódica del catálogo IA | `ai/service/app.py`, `ai/service/settings.py`, marca en `ai/published.py` |
| Sincronización programada del catálogo | `.github/workflows/update_catalog.yml`, `ingestion/scripts/update_catalog.py` |
| Actualización programada de IA | `.github/workflows/ai_refresh.yml`, `ai/scripts/auto_refresh_ai_data.py` |

No conectar el generador en archivos vacíos del catálogo sin acordar primero si se desea un proxy. La arquitectura actual con dos bases HTTP ya está soportada por el frontend.

## 19. Referencias del repositorio

- `backend/README.md`
- `backend/docs/acceso-base-datos.md`
- `backend/docs/maintenance-calculation.md`
- `backend/docs/health-score-implementation.md`
- `backend/docs/frontend-health-score-integration.md`
- `ai/README.md`
- `ai/eval/TITLE_DECISION.md`
- `ai/eval/LLM_DECISION.md`
- `ai/eval/BASELINE_DECISION.md`
- `ingestion/README.md`
- `ingestion/docs/update_catalog_runbook.md`
- `.github/workflows/update_catalog.yml`
- `.github/workflows/ai_refresh.yml`
- `shared/contracts/`
- `docs/frontend-entrega.md`

El código y las pruebas de la revisión indicada prevalecen sobre comentarios históricos. Este documento no aplica migraciones, no ejecuta ingesta, no modifica permisos y no publica servicios.