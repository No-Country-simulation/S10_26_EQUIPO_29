# ai/ — Vertical de IA de OpenBridge

Asistente que recibe la descripción de un negocio y recomienda un stack de
herramientas open source, citando solo repos del catálogo.

## Documentación

| Pregunta | Documento | Estado |
|---|---|---|
| Resumen para empresas: qué hace, cifras y decisiones (PDF, 10 páginas) | [`docs/documentacion-ia.pdf`](docs/documentacion-ia.pdf) | Estado al 11-nov; cifras de la prueba final del 9-nov |
| ¿Cómo sabemos que funciona? Cifras publicables, con su versión | [`eval/BASELINE_DECISION.md`](eval/BASELINE_DECISION.md) | Prueba final del 9-nov; los cambios posteriores tienen cifras de desarrollo en sus documentos |
| ¿Cómo se evalúa? Conjuntos, quién los escribió y para qué se usaron | [`eval/README.md`](eval/README.md) | Vigente |
| ¿Por qué este modelo de lenguaje? | [`eval/LLM_DECISION.md`](eval/LLM_DECISION.md) | Vigente |
| ¿Cómo encuentra herramientas? Modelo de embeddings y texto de cada repo | [`eval/SEARCH_DECISION.md`](eval/SEARCH_DECISION.md) | Vigente |
| ¿Cuándo dice que el catálogo no tiene una herramienta? | [`eval/ABSTENTION_DECISION.md`](eval/ABSTENTION_DECISION.md) | Integrada (7-nov) |
| ¿Por qué busca primero en la categoría de cada necesidad? | [`eval/CATEGORY_PRIORITY_DECISION.md`](eval/CATEGORY_PRIORITY_DECISION.md) | Integrada (10-nov) |
| ¿Cómo detecta las necesidades de un pedido? | [`eval/DETECTION_EXAMPLES_DECISION.md`](eval/DETECTION_EXAMPLES_DECISION.md) | Integrada (11-nov) |
| Intento anterior: una regla más en el prompt | [`eval/DETECTION_DECISION.md`](eval/DETECTION_DECISION.md) | No integrada (10-nov) |
| ¿Por qué los títulos no dicen "open source"? | [`eval/TITLE_DECISION.md`](eval/TITLE_DECISION.md) | Integrada (11-nov) |
| ¿Cómo se defiende de prompt injection? | [`eval/GUARDRAILS_DECISION.md`](eval/GUARDRAILS_DECISION.md) | Integrada (9-nov) |
| ¿Qué modelo escribe las categorías, el resumen y los casos de uso? | [`eval/ENRICH_DECISION.md`](eval/ENRICH_DECISION.md) | Vigente |
| ¿Cómo se generan las ideas de integración? | [`eval/IDEAS_DECISION.md`](eval/IDEAS_DECISION.md) | Vigente |
| ¿Cómo se escriben los casos de prueba del asistente? | [`eval/ASSISTANT_CASES.md`](eval/ASSISTANT_CASES.md) | Vigente |
| ¿Qué cuenta como necesidad al etiquetar un pedido? | [`eval/LABEL_CRITERIA.md`](eval/LABEL_CRITERIA.md) | Vigente |

## Cómo leer las cifras

- **Prueba final y desarrollo.** La prueba final son pedidos escritos sin ver el catálogo,
  corridos una sola vez con la versión ya elegida: sus cifras son las que se publican. Los
  conjuntos de desarrollo sirven para decidir cambios; sus cifras salen optimistas y se citan
  como "desarrollo".
- **Versión.** Cada cifra dice qué versión midió (commit, fecha, catálogo). Si el sistema
  cambió después, el documento lo dice.
- **hit@3.** En la búsqueda: en qué parte de las consultas llega al menos una herramienta
  correcta entre los 3 primeros resultados.
- **Como lo ve el usuario.** Sobre todas las necesidades del pedido, detectadas o no: en cuántas
  recibe una herramienta aceptable. Suma las pérdidas de entender, buscar y elegir.
- **Abstención.** Decir que el catálogo no tiene una herramienta para una necesidad, en vez de
  recomendar algo que no sirve.
- **Corridas.** El modelo de lenguaje no responde siempre igual: cada conjunto se corre 3 veces
  y se informa el rango o una cifra por corrida.

## Estado

**Datos.** El servicio del asistente lee el catálogo publicado en la base: la vista
`public.v_repos_for_ai` más las tablas `ai.*` (127 repos). Si la base falla al arrancar, usa la
copia en archivos (`data/catalog/`, snapshot del 2026-11-10), que es también la que leen las
evaluaciones con `load_repos()` (ver [Servicio del asistente](#servicio-del-asistente)). Los 20 repos de ejemplo (`data/repos.json`,
con categorías asignadas a mano) se conservan para pruebas y para repetir la elección del
modelo de embeddings: `load_repos(source="sample")`.

**Búsqueda semántica.** Dada la necesidad de un cliente en lenguaje natural (en español o inglés),
devuelve los repos del catálogo más parecidos por significado, con filtros por licencia,
health score y categoría. El texto de cada repo incluye el resumen y los casos de uso que
genera la IA; umbral de "sin evidencia" 0,18 (detalle en
[`eval/BASELINE_DECISION.md`](eval/BASELINE_DECISION.md)).

**Evaluación.** La búsqueda y el asistente se miden con conjuntos de desarrollo y con una
prueba final. Cifras vigentes, con su versión y denominador, en
[`eval/BASELINE_DECISION.md`](eval/BASELINE_DECISION.md); cómo se evalúa, en
[`eval/README.md`](eval/README.md).

**Asistente.** `asistir()` responde un pedido en tres pasos:
**entender** (modelo de lenguaje, con los 3 pedidos ya resueltos más
parecidos como ejemplo: necesidades o preguntas), **buscar** (embeddings, una búsqueda por necesidad: primero los repos
cuya categoría principal es la de la necesidad y, si no llenan los lugares, la búsqueda abierta)
y **generar** el mapa (modelo de lenguaje: una herramienta por necesidad, solo entre sus 5
primeros candidatos, o ninguna si no sirven). El modelo escribe con salida estructurada; el
código valida contra el contrato `AssistantResponse` y reintenta una vez si no cumple. Todo el
pedido tiene un presupuesto de 15 s, y si el proveedor principal falla por algo temporal, la
llamada pasa al respaldo sin esperar. Se expone como servicio HTTP (`POST /assistant`, ver [Servicio del asistente](#servicio-del-asistente)).

**Defensa contra prompt injection.** `guardrails.py` revisa el pedido antes de llamar al
modelo (si parece una orden al asistente, responde con preguntas, sin llamar al modelo),
marca en el prompt el pedido y las descripciones de los repos como datos, y rechaza
respuestas con enlaces, imágenes o copias de las reglas. Los pedidos corteses sin forma de orden
todavía pasan. Cifras y límites en
[`eval/GUARDRAILS_DECISION.md`](eval/GUARDRAILS_DECISION.md).

**Modelo de lenguaje.** Principal: Gemini 3.5 Flash-Lite. Respaldo: gpt-oss-120b en Groq, con
razonamiento bajo. Claude Haiku 5.5 queda como tercer respaldo, de pago: solo se usa si hay
clave. Criterios, comparación y descartados en
[`eval/LLM_DECISION.md`](eval/LLM_DECISION.md).

**Enriquecimiento del catálogo.** Los 127 repos tienen categorías (1 a 3 de
`categories.json`, la primera es la principal), un resumen en español (`summary_es`, hasta
250 caracteres) y casos de uso (0 a 4, cada uno respaldado por una cita del README que el
código comprueba). Los genera Gemini 3.5 Flash-Lite (prompt v5); se guardan en
`data/catalog/enrichment.json` y en las tablas `ai.*`. Ver
[Enriquecimiento del catálogo](#enriquecimiento-del-catálogo); elección del modelo en
[`eval/ENRICH_DECISION.md`](eval/ENRICH_DECISION.md).

**Ideas de integración.** De 0 a 3 por repo (`sdk`, `docker`, `rest_api`), cada una con una
cita del README que el código comprueba y, cuando el README lo trae, un snippet copiado tal cual.
Muchos repos quedan sin ideas: la mayoría son herramientas de desarrollo, frameworks e
infraestructura que no se conectan a una aplicación. Se guardan en `data/catalog/ideas.json` y
en `ai.ai_integration_ideas`. Ver [Ideas de integración](#ideas-de-integración); cobertura,
método y límites en [`eval/IDEAS_DECISION.md`](eval/IDEAS_DECISION.md).

**Despliegue.** La aplicación completa (frontend, API del catálogo y este servicio) se despliega
en Railway desde la rama `deploy`, que recibe `main` por merge. La guía está en
`docs/deploy-railway.md` de esa rama.

## Para desarrollar

Esta carpeta tiene su propio `requirements.txt`, sus datos y sus tests. La forma
de un repo no se define aquí: se usa el contrato compartido `Repo` de
[`shared/contracts/`](../shared/contracts/). Por eso los comandos se ejecutan
desde la raíz del repo.

### Estructura

| Carpeta o archivo | Qué tiene |
|---|---|
| `catalog.py`, `embeddings.py`, `search.py` | Acceso a los archivos del catálogo (`load_repos()`), modelo de embeddings y umbral, búsqueda semántica |
| `assistant.py`, `examples.py`, `llm.py`, `guardrails.py` | El asistente (entender, buscar, generar), el banco de ejemplos de entender, los proveedores de LLM y la defensa contra prompt injection |
| `enrich.py`, `ideas.py` | Enriquecimiento (categorías, resumen, casos de uso) e ideas de integración: entrada del modelo y validación contra la fuente |
| `published.py`, `catalog_diff.py` | Lo publicado en la base y qué cambió en la vista frente a lo que tiene la IA |
| `service/` | Servicio HTTP del asistente |
| `scripts/` | Comandos de mantenimiento (ver [Comandos](#comandos)) |
| `sql/` | Tablas `ai.*` y sus permisos (`001`–`005`); consultas de verificación (`consultas/`) |
| `data/` | Snapshot del catálogo real (`catalog/`), 20 repos de ejemplo (`repos.json`, `readmes/`), banco de ejemplos de entender (`understand_examples.json`) y datos de ejemplo para las tablas (`seed/`) |
| `eval/` | Conjuntos, scripts de evaluación y documentos de decisión; `results/` guarda un reporte por corrida |
| `docs/` | Documento de la IA en PDF (`documentacion-ia.pdf`) y diagramas (`img/`) |
| `tests/` | Tests; `AI_MODEL_TESTS=1` incluye los que usan el modelo real |

### Puesta en marcha

Desde la raíz del repo, con Python 3.12 y [uv](https://docs.astral.sh/uv/):

```bash
uv venv --python 3.12
source .venv/Scripts/activate      # Git Bash en Windows
# source .venv/bin/activate        # Linux / macOS
uv pip install -r ai/requirements.txt
```

#### Modelo de embeddings

El modelo por defecto es `google/embeddinggemma-300m`. Por qué este modelo:
[`eval/SEARCH_DECISION.md`](eval/SEARCH_DECISION.md).

**Requisito, una vez por máquina:** el modelo pide aceptar su licencia en
Hugging Face.

1. Crear una cuenta en [huggingface.co](https://huggingface.co) y aceptar la
   licencia en la [página del modelo](https://huggingface.co/google/embeddinggemma-300m).
2. Crear un token de tipo **Read** (Settings → Access Tokens).
3. `hf auth login` → "Paste an access token". El token queda en la carpeta
   del usuario (`~/.cache/huggingface/`); **nunca va al repo ni a `.env`**.

Después:

- La primera vez se descargan ~1,2 GB a la caché de Hugging Face; luego se
  leen de ahí. Para trabajar sin internet: `export HF_HUB_OFFLINE=1`.
- Corre en CPU, con ~1,2 GB de RAM aproximadamente. Construir el índice del
  catálogo tardó ~9 s con 100 repos; cada consulta, menos de 0,1 s.
- Otro modelo del registro: `AI_EMBEDDING_MODEL=qwen3` (Qwen3-Embedding-0.6B,
  sin licencia que aceptar, ~2,4 GB de RAM, sin umbral calibrado).
- En Windows puede aparecer una advertencia de Hugging Face sobre *symlinks*:
  es inofensiva.

#### Modelo de lenguaje

Se elige con `AI_LLM_PROVIDER` en `.env` (por defecto, `gemini`). Cada proveedor necesita su
clave en `.env` (nombres en `.env.example`); **las claves nunca van al repo, al chat ni a las notas**.

| Proveedor (`AI_LLM_PROVIDER`) | Clave | Dónde se obtiene | Costo |
|---|---|---|---|
| `gemini` (principal) | `GEMINI_API_KEY` | Google AI Studio → Get API key | Nivel gratuito: 500 consultas/día, 15/min |
| `groq-low` (respaldo) | `GROQ_API_KEY` | console.groq.com → API Keys | Nivel gratuito, por organización: 30 consultas/min, 1.000/día, 8.000 tokens/min y **200.000 tokens/día** |
| `claude-haiku` | `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys | De pago |
| `ollama` | — | Ollama instalado y abierto en la máquina | Local |

**Respaldo y presupuesto.** Si no se pide un proveedor concreto, `generar()` usa el principal
y, si falla por algo temporal (límite de uso, caída, tiempo agotado), repite la llamada con los
respaldos de `AI_LLM_FALLBACK`, en orden y **sin esperar** (por defecto `groq-low,claude-haiku`;
un respaldo sin clave se omite; vacío = sin respaldo). Si la falla fue lenta (tiempo agotado o
sin conexión), ese proveedor queda **desconectado 60 s** (disyuntor): mientras tanto, las
llamadas van directo al siguiente, así que solo el primer pedido después de una caída paga la
espera. Un límite de uso (429) o un error del servidor (5xx) no desconectan: responden al
instante y probarlos otra vez casi no cuesta. `asistir()` le da a todo el pedido 15 s
(`BUDGET_SECONDS`): cada llamada usa solo el tiempo que queda, el que tiene un respaldo detrás
tiene un tope de 7 s, y si no alcanza para otra llamada se corta con `LLMTimeout`.
`error_response()` traduce cada error al código HTTP y al cuerpo del contrato (502, 503, 504).

- Un flujo usa unos 5.000 tokens: el límite diario de Groq alcanza para unos 40 pedidos y se
  comparte con las evaluaciones. **No correr evaluaciones con Groq el día de una demo.**
- Con el nivel gratuito, Google usa el contenido de las consultas para mejorar sus servicios.
- En Groq conviene activar "Inference APIs ZDR" en la configuración de la cuenta para que no
  guarde las consultas.
- Agregar un proveedor = una entrada en `PROVIDERS` (`ai/llm.py`).
- El registro conserva proveedores descartados para repetir la comparación; la causa de cada
  descarte está en [`eval/LLM_DECISION.md`](eval/LLM_DECISION.md).

```python
from ai import embeddings
from ai.assistant import asistir, error_response
from ai.llm import LLMError
from ai.search import SearchIndex

index = SearchIndex.build()
try:
    assisted = asistir("Necesito cobrar suscripciones mensuales a mis clientes.",
                       index.search, min_score=embeddings.model_spec().min_score)
    print(assisted.response or error_response(None))   # None = sin respuesta válida → 502
except LLMError as err:
    print(error_response(err))                          # (503 o 504, ErrorResponse)
```

#### Servicio del asistente

Capa HTTP delgada sobre el núcleo, en `ai/service/`: el servicio importa del núcleo y el núcleo
nunca del servicio (lo comprueba un test). Se levanta desde la raíz del repo:

```bash
python -m uvicorn ai.service.app:create_app --factory --port 8001
```

Al arrancar carga el catálogo, el modelo de embeddings, los vectores del banco de ejemplos de
entender (unos 4 s en una laptop; si no, los pagaría el primer pedido dentro de su presupuesto) y
el índice, y muestra de dónde salió el catálogo y la cadena de proveedores
(`listo: 127 repos (database), proveedores gemini → groq-low → claude-haiku`). No acepta pedidos
hasta terminar. Con la base, revisa cada `AI_CATALOG_RELOAD_MINUTES` minutos (10 por defecto;
0 = solo al arrancar) si se publicó algo nuevo y, si es así, recarga el catálogo sin reiniciar:
un pedido en curso termina con el anterior. Si la revisión o la recarga fallan, sigue con el que
tiene y `GET /health` lo dice (`catalog_reload_error`).

- **Catálogo:** `AI_CATALOG_SOURCE=database` (por defecto) lee lo publicado en la base (la vista
  más las tablas `ai.*`, lo mismo que muestra la ficha) con `AI_READER_DATABASE_URL`;
  `AI_CATALOG_SOURCE=files` lee `ai/data/catalog/` (vuelta atrás sin tocar código). Si la base
  falla al arrancar, usa los archivos y `GET /health` lo dice en `catalog_source` y
  `catalog_fallback_reason` (sin host). Las evaluaciones leen siempre los archivos.
- **Vectores:** con la base, usa los vectores guardados en `ai.ai_embeddings` cuya huella (texto
  del repo, modelo y prompt) sigue al día y calcula solo los demás. El log de arranque dice cuántos
  de cada uno y cuánto tardó; `GET /health` lo muestra en `vectors`. Un número de calculados mayor
  que 0 indica que falta publicar (`refresh_ai_data --escribir`). La búsqueda sigue en memoria
  (numpy); buscar en la base con pgvector queda para cuando el catálogo crezca.

| Ruta | Qué hace |
|---|---|
| `POST /assistant` | Cuerpo `AssistantRequest` (`{"query": "…"}`, 20–2000 caracteres) → `AssistantResponse`, o `ErrorResponse` con 422 `invalid_query`, 502 `invalid_response`, 503 `provider_unavailable` o 504 `timeout` |
| `GET /health` | Repos cargados, de dónde salió el catálogo (`database` o `files`, y por qué si cayó a los archivos), de cuándo es, cuándo se cargó y se revisó por última vez y el último error de recarga, vectores guardados y calculados en la última carga, modelo de embeddings, umbral y, por proveedor, si tiene clave y cuántos segundos le quedan desconectado (nunca muestra claves) |
| `GET /docs` | Documentación interactiva generada desde el contrato |

- **CORS:** acepta los orígenes de `AI_CORS_ORIGINS` (separados por comas; por defecto
  `http://localhost:4173,http://127.0.0.1:4173`, el frontend en local).
- **Frontend:** `NEXT_PUBLIC_ASSISTANT_API_BASE_URL=http://127.0.0.1:8001/` (este servicio).
- Las causas de los errores (proveedor, límite, tiempo) quedan en la terminal del servicio,
  no en la respuesta.
- Probar desde Git Bash: escribir las tildes como escapes de JSON (`\u00ed` = í), porque la
  terminal de Windows puede no enviarlas en UTF-8:

```bash
curl -s -X POST http://127.0.0.1:8001/assistant -H "Content-Type: application/json" \
  -d '{"query": "Una librer\u00eda quiere que sus clientes busquen libros por tema."}'
```

### Comandos

```bash
python -m pytest -q                              # todos los tests del repo, sin el modelo
python -m pytest ai/tests -v                     # tests de la IA, sin el modelo
AI_MODEL_TESTS=1 python -m pytest ai/tests -v    # incluye las pruebas con el modelo real (~20 s)
python -m pytest tests/contracts -v              # valida los ejemplos del contrato
python -m ai.scripts.build_sample_data           # regenera ai/data/ (requiere `gh` autenticado)
python -m ai.scripts.auto_refresh_ai_data        # actualización automática: decide con la base, con freno, sin revisión (--informe, --permitir-mas-cambios)
python -m ai.scripts.export_catalog_snapshot     # regenera ai/data/catalog/ (requiere AI_READER_DATABASE_URL en .env)
python -m ai.scripts.compare_catalog             # qué cambió en la vista frente a lo que tiene la IA (0 igual, 1 cambios, 2 error)
python -m ai.scripts.refresh_ai_data             # plan para actualizar la IA según la vista (--generar, --escribir)
python -m ai.scripts.load_seed_example           # carga los datos de ejemplo en ai.* (requiere AI_DATABASE_URL en .env)
python -m ai.scripts.load_seed_example --limpiar # borra los datos de ejemplo
python -m ai.scripts.enrich_catalog              # genera categorías, resumen y casos de uso (requiere GEMINI_API_KEY)
python -m ai.scripts.write_enrichment            # valida enrichment.json sin tocar la base
python -m ai.scripts.write_enrichment --escribir # lo escribe en ai.* (requiere AI_DATABASE_URL)
python -m ai.eval.compare_enrichment ARCHIVOS --out reporte.md  # compara corridas de distintos modelos
python -m ai.scripts.generate_ideas              # genera las ideas de integración (requiere GEMINI_API_KEY)
python -m ai.eval.evaluate_ideas CORRIDAS --out reporte.md  # mide corridas de ideas contra la referencia
python -m ai.scripts.write_ideas                 # valida ideas.json sin tocar la base
python -m ai.scripts.write_ideas --escribir      # lo escribe en ai.ai_integration_ideas (requiere AI_DATABASE_URL)
python -m ai.scripts.review_ideas --aprobar ID … # marca ideas como revisadas (--escribir para aplicar)
python -m ai.eval.run_search_eval                # evalúa la búsqueda sobre el catálogo real (--golden sample: datos de ejemplo)
python -m ai.scripts.check_llm gemini groq-low   # prueba de humo de los proveedores de LLM (requiere las claves)
python -m ai.eval.run_understand_eval gemini     # compara modelos en el paso de entender (--cases validation: casos de validación)
python -m ai.eval.run_assistant_eval gemini groq-low  # compara modelos con el flujo completo (--cases validation, --shown 3)
python -m ai.eval.run_injection_eval gemini      # prueba de inyección con los casos de desarrollo
python -m ai.eval.diagnose_latency gemini        # dónde se va el tiempo del paso de generar
```

Se usa `python -m` desde la raíz para que `ai` y `shared` se puedan importar
(`from shared.contracts.repo import Repo`). Desde otra carpeta, el import falla.

### Snapshot del catálogo real

`ai/scripts/export_catalog_snapshot.py` lee la vista `public.v_repos_for_ai` con el usuario
de solo lectura y escribe `ai/data/catalog/`:

- `repos.json`: campos de la ingesta del contrato `Repo`, sin el README, ordenados por `full_name`.
- `readmes/<owner>__<name>.md`: README de cada repo.
- `meta.json`: cuándo se tomó (UTC), de dónde, cuántos repos y qué columnas de la vista
  sobran o faltan frente al contrato.

**Requisito:** `AI_READER_DATABASE_URL` en `.env` (ver `.env.example`). Si la contraseña tiene
símbolos (`? " < > [ @ : / #`…), va codificada en la URL (*percent-encoding*). Para obtenerla sin
que quede en el historial (PowerShell):

    python -c "from getpass import getpass; from urllib.parse import quote; print(quote(getpass('Contraseña: '), safe=''))"

El script valida cada fila contra `Repo` antes de escribir: si alguna no cumple, no toca el
snapshot anterior. Regenerarlo reescribe `readmes/` completo; el diff muestra qué cambió en el catálogo.

Para saber si hace falta actualizar, `python -m ai.scripts.compare_catalog` compara la vista con lo
que la IA publicó en la base (`ai.ai_processing`) y con el snapshot, sin escribir nada: repos nuevos,
eliminados y renombrados, cambios de `archived`, y qué repos tienen el enriquecimiento o las ideas
desactualizados. Para eso recalcula la huella de lo que lee el modelo con la versión de las reglas de
cada registro, así que un cambio de reglas no cuenta como cambio del catálogo.

### Actualizar los datos de la IA cuando cambia el catálogo

Lo publicado vive en la base: las tablas `ai.*` (lo que leen la ficha y el asistente) y
`ai.ai_processing`, una fila por repo y tipo de dato con la huella, el proveedor, el modelo y la versión
de las reglas con que se generó, también cuando el resultado fue "sin ideas". Los archivos de
`ai/data/catalog/` son el borrador, la caché del lote y la copia fija para las evaluaciones.

`python -m ai.scripts.refresh_ai_data` compara la vista con lo publicado y con el borrador, y hace solo
lo que falta. Se puede repetir: si se corta (por ejemplo, por el límite del día del proveedor), se
vuelve a correr el mismo comando.

1. **Plan** (sin opciones): qué cambió, qué se haría y cuántas llamadas al modelo costaría. No toca nada.
2. **`--generar`**: refresca `ai/data/catalog/`, quita los registros de repos que salieron, corrige
   nombres y regenera con el modelo solo los repos cuya entrada cambió. Solo archivos.
3. Revisar `git diff ai/data/catalog/`.
4. **`--escribir`**: publica en las tablas `ai.*`, en una transacción, solo los repos desactualizados
   en la base, y actualiza su fila en `ai.ai_processing`. En la misma transacción calcula y guarda
   los vectores de búsqueda que faltan o quedaron viejos (`ai.ai_embeddings`; carga el modelo de
   embeddings solo si hay alguno). Un repo cuyo borrador ya está al día se
   publica sin llamar al modelo. Se niega si los archivos no reflejan la vista. Los repos que salieron
   solo se listan; con `--borrar-huerfanos` se borran sus filas regenerables (nunca categorías humanas
   ni ideas revisadas), con un máximo de `--max-borrar` (10) para no vaciar las tablas si la vista
   devolviera de menos.
5. Hacer commit de los archivos. El servicio del asistente carga lo publicado solo (revisa cada
   `AI_CATALOG_RELOAD_MINUTES` minutos): no hace falta reiniciarlo.

La primera vez después de aplicar `ai/sql/004_procesamiento_ia.sql`, `ai.ai_processing` está vacía: el
plan muestra todos los repos para publicar y 0 llamadas al modelo, y `--escribir` llena el registro sin
cambiar los textos publicados.

Un cambio de reglas no se regenera aquí: si el archivo está en otra versión de las reglas que el
código, o un registro es de otro modelo, el plan lo muestra como pendiente.

#### Actualización automática (diaria)

El workflow `.github/workflows/ai_refresh.yml` corre cada día a las 07:17 de Bogotá (12:17 UTC)
`python -m ai.scripts.auto_refresh_ai_data`: compara la vista con lo publicado, regenera con el
modelo solo los repos cuya descripción, topics o README cambiaron y los publica, sin revisión
humana. Un cambio de estrellas o fechas no hace nada.

- **Freno:** si cambió de una vez más del 40 % del catálogo o harían falta más de 100 llamadas al
  modelo, se detiene sin llamar al modelo ni publicar.
- **Aviso:** si algo se detiene o falla, abre o actualiza el issue "Actualización de los datos de la
  IA: requiere atención" con el informe completo, y lo cierra cuando una corrida termina sin
  pendientes. El informe también queda en el resumen de cada ejecución (pestaña Actions).
- **Correrlo a mano:** Actions → ai-refresh → Run workflow. Para destrabar un freno legítimo, marcar
  "Levantar el freno de volumen solo en esta corrida".
- **Apagarlo:** Actions → ai-refresh → ⋯ → Disable workflow (sin tocar código).
- **Secretos:** en el environment `datos-ia` (solo la rama `main`): `AI_READER_DATABASE_URL`,
  `AI_DATABASE_URL`, `GEMINI_API_KEY` y `HF_TOKEN`. Las URL de la base deben usar el pooler de
  Supabase: GitHub Actions no tiene IPv6.
- **Sigue a mano:** borrar filas de repos que salieron (`refresh_ai_data --escribir
  --borrar-huerfanos`), regenerar por un cambio de versión de las reglas y actualizar la copia de
  `ai/data/catalog/` para las evaluaciones.
- GitHub desactiva los workflows programados de un repo público tras 60 días sin actividad; se
  reactivan desde la misma pestaña.

### Datos de ejemplo en las tablas de la IA

`ai/data/seed/ejemplo_ia.json`: resumen, categorías e ideas escritos a mano para 8 repos, que
sirvieron para probar la API y la ficha antes de los datos reales. Ya no están en la base.
`python -m ai.scripts.load_seed_example` los carga para pruebas y `--limpiar` los borra (solo
esas filas, marcadas con `seed-ejemplo`).

### Enriquecimiento del catálogo

Para cada repo, el modelo recibe la descripción, los topics y el README (sin HTML, imágenes
ni URLs, recortado a 8.000 caracteres en un final de párrafo) y devuelve categorías,
`summary_es` y casos de uso. El código valida la respuesta antes de guardarla:

| Regla | Si no se cumple |
|---|---|
| Categorías: 1 a 3 ids de `categories.json`, sin repetir | Un reintento; si sigue mal, se guarda lo que cumple |
| `summary_es`: 1 a 250 caracteres, sin palabras de venta | Un reintento; si sigue mal, `null` (la ficha muestra la descripción) |
| Cada caso de uso trae una cita del README que existe en el texto que vio el modelo (al menos 15 caracteres y 2 palabras) | Se descarta ese caso de uso, sin reintento |
| README casi vacío (menos de 200 caracteres) | Sin casos de uso |

Cada registro guarda el proveedor, el modelo, la versión de las reglas (`PROMPT_VERSION`) y
un hash de la entrada. Si nada de eso cambió, el repo no se vuelve a pedir al modelo.

**Regenerar** (por ejemplo, cuando cambie el catálogo):

    python -m ai.scripts.enrich_catalog
    python -m ai.scripts.write_enrichment             # revisar que sea válido
    python -m ai.scripts.write_enrichment --escribir

Medido el 6-nov-2026: unos 320 mil tokens de entrada y 17 mil de salida para 100 repos, en el
nivel gratuito de Gemini; entre 5 y 10 minutos con las esperas por límite de uso. Guarda cada
repo apenas llega: si se corta, el mismo comando sigue donde quedó.

**Escribir en la base** es una sola transacción (todo o nada) y repetible. Las categorías con
`assigned_by = 'human'` nunca se sobrescriben.

**Qué lee la API del catálogo:** `summary_es` y `use_cases` de `ai.ai_repo_enrichment`;
`category_id` y `assigned_by` de `ai.ai_repo_categories`, ordenadas por `rank` (1 = principal).
`ai_input_hash` y `processed_at` son internas de la IA.

**Limitaciones conocidas:** en [`eval/ENRICH_DECISION.md`](eval/ENRICH_DECISION.md#límites-conocidos).

### Ideas de integración

Para cada repo, el modelo recibe la descripción, los topics y el README (prosa limpia como en
el enriquecimiento, pero con los bloques de código intactos y numerados) y devuelve de 0 a 3
ideas, como máximo una por tipo. El código valida cada una antes de guardarla:

| Regla | Si no se cumple |
|---|---|
| Más de 3 ideas, bloque inexistente, título o resumen vacío o largo, texto dañado, palabras de venta | Un reintento |
| La cita existe en el texto que vio el modelo (al menos 15 caracteres y 2 palabras) | Se descarta la idea |
| Al menos un nombre del stack aparece en la entrada | Se descarta la idea |
| Una idea por tipo; repo archivado sin ideas | Se descarta la idea |
| README casi vacío (menos de 200 caracteres) o repo archivado | Sin ideas, sin llamar al modelo |

El snippet, su lenguaje y el enlace a la documentación los pone el código, nunca el modelo.
Una lista vacía es un resultado válido y no se vuelve a pedir mientras la entrada no cambie.

**Regenerar:**

    python -m ai.scripts.generate_ideas

Medido el 6-nov-2026: unos 217 mil tokens de entrada y 9 mil de salida para 100 repos, en el
nivel gratuito de Gemini. Si se corta, el mismo comando sigue donde quedó.

**Medir una versión nueva del prompt:** corre los repos de `eval/ideas_reference.json` dos
veces y compáralas con `python -m ai.eval.evaluate_ideas`. Los criterios están en el mismo
archivo de referencia.

**Escribir en la base:**

    python -m ai.scripts.write_ideas             # revisar que sea válido
    python -m ai.scripts.write_ideas --escribir

Es una sola transacción (todo o nada) y repetible. Solo reemplaza las ideas regenerables
(`generated_by = 'llm'` y `reviewed_at` nulo) de los repos del archivo. Las revisadas o
escritas por una persona nunca se tocan y ocupan cupo: como máximo 3 ideas por repo y una por
tipo, contando las revisadas. Si el README de una idea revisada cambió desde que se revisó,
el informe la muestra para revisarla de nuevo, sin tocarla.

**Aprobar ideas revisadas:** una persona lee la idea en la ficha o en `ideas.json` y, si está
bien sin cambios, la aprueba:

    python -m ai.scripts.review_ideas --aprobar llm-<github_id>-<n> …             # comprueba
    python -m ai.scripts.review_ideas --aprobar llm-<github_id>-<n> … --escribir  # marca

Pone `reviewed_at`; desde ahí la regeneración no la toca. La tabla no guarda quién la revisó.
Verificación después de escribir: `ai/sql/consultas/ideas_ia.sql` y `huerfanos_ia.sql`.

**Qué lee la API del catálogo:** todas las columnas de `ai.ai_integration_ideas` (las del
contrato `IntegrationIdea` más `github_id` para unir; `full_name` lo pone la API), ordenadas
por `id`, como máximo 3 por repo, y nada de los repos archivados. El rol de lectura de la API
necesita `USAGE` en el esquema `ai` y `SELECT` sobre `ai.ai_repo_enrichment`,
`ai.ai_repo_categories` y `ai.ai_integration_ideas` (no sobre `ai.ai_embeddings`, que es
interna de la IA).

### Cómo leer los datos

```python
from ai.catalog import load_repos

repos = load_repos()                   # catálogo real (snapshot), list[Repo] con readme_text
sample = load_repos(source="sample")   # 20 repos de ejemplo
```

`load_repos()` lee los archivos: lo usan las evaluaciones y los scripts. El servicio lee lo
publicado en la base (`ai/published.py`: la vista más las tablas `ai.*`) y, si la base falla,
los archivos: ver [Servicio del asistente](#servicio-del-asistente).

### Cómo buscar

```python
from ai.search import SearchIndex

index = SearchIndex.build()   # una vez: carga el catálogo y calcula los vectores

results = index.search(
    "login social con Google para los clientes de una app",
    k=3,
    licenses=["MIT", "Apache-2.0"],   # opcional
    categories=["auth"],              # opcional
    min_health=60,                    # opcional
)
for r in results:
    print(r.score, r.repo.full_name, r.license_unconfirmed, r.health_unknown)
```

- Cada búsqueda responde a **una** necesidad. Para un stack completo se busca
  una vez por necesidad.
- Se filtra antes de ordenar: se devuelven hasta `k` repos que cumplen todos
  los filtros.
- Los repos archivados no aparecen nunca.
- Licencia: sin filtro entran todos, y `license_unconfirmed` marca los
  `NOASSERTION` o sin licencia. Con filtro, solo pasan las licencias de la
  lista.
- `min_health`: los repos sin `health_score` pasan, marcados con `health_unknown`.
- `categories`: pasa un repo si alguna de sus categorías está en la lista.
- `prefer_category`: primero los repos cuya categoría principal es esa; si no llenan los
  lugares, se completa con los demás (lo usa el asistente).
- Cada repo se representa con un texto: nombre, resumen de la IA, descripción, topics sin
  ruido (`NOISE_TOPICS` en `search.py`) y casos de uso de la IA. Las categorías y el README no
  entran (por qué, en [`eval/SEARCH_DECISION.md`](eval/SEARCH_DECISION.md)).
- Cambiar el modelo o ese texto obliga a recalcular los vectores: al construir el índice se
  calculan solos, y el servicio reutiliza los guardados en la base si su huella sigue al día.

### Contrato `Repo`

Definido en [`shared/contracts/repo.py`](../shared/contracts/repo.py)
(v1.2, acordado con la ingesta). Usa los nombres de GitHub (`full_name`,
`stargazers_count`, `license_spdx_id`, `open_issues_count`). Las categorías
salen de [`shared/contracts/categories.json`](../shared/contracts/categories.json).

Los datos de ejemplo son más estrictos que el contrato:

- El contrato ignora campos desconocidos (lector tolerante). Los tests exigen
  que toda clave de `repos.json` sea un campo del contrato, para detectar
  errores de tipeo.
- El contrato admite repos sin categoría ni README. Los datos de ejemplo no:
  sus categorías son la referencia clasificada a mano (`assigned_by: "human"`).

Nota: Pydantic normaliza `homepage` (por ejemplo, agrega `/` al final del dominio).

---

Versión anterior de este documento, con la historia completa:
[`ai/README.md` en `7830fd9`](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/7830fd98db22e59f2747b9187afdc66fcfb051e3/ai/README.md).
