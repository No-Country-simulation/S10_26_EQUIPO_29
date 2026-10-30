# ai/ — Vertical de IA de OpenBridge

Asistente que recibe la descripción de un negocio y recomienda un stack de
herramientas open source, citando solo repos del catálogo.

Esta carpeta tiene su propio `requirements.txt`, sus datos y sus tests. La forma
de un repo no se define aquí: se usa el contrato compartido `Repo` de
[`shared/contracts/`](../shared/contracts/). Por eso los comandos se ejecutan
desde la raíz del repo.

## Estado

**Datos de ejemplo.** Mientras la IA no lee de la base de datos, trabaja con
20 repos reales descargados de la API de GitHub, con categorías asignadas a mano.

**Búsqueda semántica.** Dada la necesidad de un cliente en lenguaje natural (en español o inglés),
devuelve los repos del catálogo más parecidos por significado, con filtros por licencia,
health score y categoría.

**Evaluación de la búsqueda.** Golden set de 22 consultas, métricas (hit@3, MRR, recall) y umbral de
"sin evidencia", con un solo comando. resultados y decisiones en [`eval/README.md`](eval/README.md).

**Catálogo real (snapshot).** Copia de los 100 repos de la vista `public.v_repos_for_ai`
en `data/catalog/`, para escribir casos de prueba y medir la búsqueda contra datos reales
sin conectarse a la base. La búsqueda todavía usa los datos de ejemplo (`load_repos()`).

## Estructura

```
ai/
├── catalog.py                  # load_repos() y load_categories(): único punto de acceso a los datos
├── embeddings.py               # Modelo de embeddings (EmbeddingGemma por defecto) y umbral
├── search.py                   # SearchIndex: texto a embeber, filtros y ranking
├── requirements.txt
├── scripts/
│   ├── build_sample_data.py        # Regenera ai/data/ desde la API de GitHub
│   └── export_catalog_snapshot.py  # Regenera ai/data/catalog/ desde la base (solo lectura)
├── data/
│   ├── repos.json              # 20 repos con la forma del contrato, sin el README
│   ├── readmes/                # README de cada repo (<owner>__<name>.md)
│   └── catalog/                # Snapshot del catálogo real: repos.json, readmes/, meta.json
├── eval/
│   ├── README.md               # Evaluación de la búsqueda: método, resultados y decisiones
│   ├── search_queries.json     # Golden set: consultas y repos esperados
│   ├── golden.py               # Carga y valida el golden set
│   ├── metrics.py              # hit@k, MRR, recall y umbral
│   ├── run_search_eval.py      # python -m ai.eval.run_search_eval
│   └── results/                # Un reporte por modelo
└── tests/
    ├── test_catalog_snapshot.py  # Valida el snapshot y las funciones del script (sin base)
    ├── test_sample_data.py     # Valida los datos de ejemplo contra el contrato
    ├── test_search.py          # Búsqueda: filtros y orden (sin modelo) y pruebas con el modelo real
    ├── test_search_queries.py  # Valida el golden set
    └── test_eval_metrics.py    # Métricas de la evaluación (sin modelo)
```

## Puesta en marcha

Desde la raíz del repo, con Python 3.12 y [uv](https://docs.astral.sh/uv/):

```bash
uv venv --python 3.12
source .venv/Scripts/activate      # Git Bash en Windows
# source .venv/bin/activate        # Linux / macOS
uv pip install -r ai/requirements.txt
```

### Modelo de embeddings

El modelo por defecto es `google/embeddinggemma-300m`. Por qué este modelo:
[`eval/README.md`](eval/README.md).

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
- Corre en CPU, con ~1,2 GB de RAM aproximadamente. Construir el índice de
  20 repos tarda ~5 s; cada consulta, menos de 0,1 s.
- Otro modelo del registro: `AI_EMBEDDING_MODEL=qwen3` (Qwen3-Embedding-0.6B,
  sin licencia que aceptar, ~2,4 GB de RAM, sin umbral calibrado).
- En Windows puede aparecer una advertencia de Hugging Face sobre *symlinks*:
  es inofensiva.

## Comandos

```bash
python -m pytest -q                              # todos los tests del repo, sin el modelo
python -m pytest ai/tests -v                     # tests de la IA, sin el modelo
AI_MODEL_TESTS=1 python -m pytest ai/tests -v    # incluye las pruebas con el modelo real (~20 s)
python -m pytest tests/contracts -v              # valida los ejemplos del contrato
python -m ai.scripts.build_sample_data           # regenera ai/data/ (requiere `gh` autenticado)
python -m ai.scripts.export_catalog_snapshot     # regenera ai/data/catalog/ (requiere AI_READER_DATABASE_URL en .env)
python -m ai.eval.run_search_eval                # evalúa la búsqueda y escribe el reporte en ai/eval/results/
```

Se usa `python -m` desde la raíz para que `ai` y `shared` se puedan importar
(`from shared.contracts.repo import Repo`). Desde otra carpeta, el import falla.

## Snapshot del catálogo real

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

## Cómo leer los datos

```python
from ai.catalog import load_repos

repos = load_repos()   # list[Repo], con readme_text incluido
```

El código de la IA lee los repos solo con `load_repos()`. Hoy une `repos.json`
con los archivos de `readmes/`; cuando la IA lea de la base de datos, cambia
solo esta función.

## Cómo buscar

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
- Cada repo se representa con un texto: nombre, categorías (`name` y
  `description` de `categories.json`; `llm_notes` no entra), descripción y topics sin ruido
  (`NOISE_TOPICS` en `search.py`). El README no se usa.
- Cambiar el modelo, ese texto o `categories.json` obliga a recalcular los
  vectores. Hoy ocurre solo, al construir el índice.

## Contrato `Repo`

Definido en [`shared/contracts/repo.py`](../shared/contracts/repo.py)
(v1.0, acordado con la ingesta). Usa los nombres de GitHub (`full_name`,
`stargazers_count`, `license_spdx_id`, `open_issues_count`). Las categorías
salen de [`shared/contracts/categories.json`](../shared/contracts/categories.json).

Los datos de ejemplo son más estrictos que el contrato:

- El contrato ignora campos desconocidos (lector tolerante). Los tests exigen
  que toda clave de `repos.json` sea un campo del contrato, para detectar
  errores de tipeo.
- El contrato admite repos sin categoría ni README. Los datos de ejemplo no:
  sus categorías son la referencia clasificada a mano (`assigned_by: "human"`).

Nota: Pydantic normaliza `homepage` (por ejemplo, agrega `/` al final del dominio).

## Por acordar

- Fórmula y rango de `health_score` (lo calcula la ingesta).
