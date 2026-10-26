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

**Búsqueda semántica.** Dada la necesidad de un cliente en lenguaje natural (en español o inglés), devuelve los repos del catálogo más parecidos por significado, con filtros por licencia, health score y categoría.

## Estructura

```
ai/
├── catalog.py                  # load_repos() y load_categories(): único punto de acceso a los datos
├── embeddings.py               # Modelo de embeddings (Qwen3-Embedding-0.6B, local, en CPU)
├── search.py                   # SearchIndex: texto a embeber, filtros y ranking
├── requirements.txt
├── scripts/
│   └── build_sample_data.py    # Regenera ai/data/ desde la API de GitHub
├── data/
│   ├── repos.json              # 20 repos con la forma del contrato, sin el README
│   └── readmes/                # README de cada repo (<owner>__<name>.md)
└── tests/
    ├── test_sample_data.py     # Valida los datos de ejemplo contra el contrato
    └── test_search.py          # Búsqueda: filtros y orden (sin modelo) y pruebas con el modelo real
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

- La primera vez que se usa la búsqueda se descarga `Qwen/Qwen3-Embedding-0.6B`
  (~1,2 GB) a la caché de Hugging Face del usuario (`~/.cache/huggingface/`).
  Después se lee de ahí.
- Corre en CPU y usa ~2,4 GB de RAM. Construir el índice de 20 repos tarda
  ~15 s; cada consulta, ~0,25 s.
- Para trabajar sin internet después de la primera descarga: `export HF_HUB_OFFLINE=1`.
- En Windows puede aparecer una advertencia de Hugging Face sobre *symlinks*:
  es inofensiva.

## Comandos

```bash
python -m pytest -q                              # todos los tests del repo, sin el modelo
python -m pytest ai/tests -v                     # tests de la IA, sin el modelo
AI_MODEL_TESTS=1 python -m pytest ai/tests -v    # incluye las pruebas con el modelo real (~1 min)
python -m pytest tests/contracts -v              # valida los ejemplos del contrato
python -m ai.scripts.build_sample_data           # regenera ai/data/ (requiere `gh` autenticado)

```

Se usa `python -m` desde la raíz para que `ai` y `shared` se puedan importar
(`from shared.contracts.repo import Repo`). Desde otra carpeta, el import falla.

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
- Cada repo se representa con un texto: nombre, categorías (nombre y
  descripción de `categories.json`), descripción y topics sin ruido
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

- Lista de categorías definitiva (hoy: las 6 del caso, provisional).
- Fórmula y rango de `health_score` (lo calcula la ingesta).
