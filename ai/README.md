# ai/ — Vertical de IA de OpenBridge

Asistente que recibe la descripción de un negocio y recomienda un stack de
herramientas open source, citando solo repos del catálogo.

Esta carpeta es autosuficiente: tiene su propio `requirements.txt`, sus datos
y sus tests. No depende de otras carpetas del repo.

## Estado

**B0 · Cimientos.** Mientras la ingesta no esté lista, la IA trabaja con
datos de ejemplo: 20 repos reales descargados de la API de GitHub.

## Estructura

```
ai/
├── schemas.py                  # Esquema Pydantic `Repo` (borrador del contrato ingesta → IA)
├── requirements.txt
├── scripts/
│   └── build_sample_data.py    # Regenera ai/data/ desde la API de GitHub
├── data/
│   ├── repos.json              # 20 repos validados contra `Repo`
│   └── readmes/                # README de cada repo (<owner>__<name>.md)
└── tests/
    └── test_sample_data.py     # Valida los datos contra el esquema
```

## Puesta en marcha

Desde la raíz del repo, con Python 3.12 y [uv](https://docs.astral.sh/uv/):

```bash
uv venv --python 3.12
source .venv/Scripts/activate      # Git Bash en Windows
# source .venv/bin/activate        # Linux / macOS
uv pip install -r ai/requirements.txt
```

## Comandos

```bash
python -m pytest ai/tests -v              # valida los datos de ejemplo
python -m ai.scripts.build_sample_data    # regenera ai/data/ (requiere `gh` autenticado)
```

Se usa `python -m` para que la raíz del repo esté en la ruta de importación
(`from ai.schemas import Repo`).

## Esquema `Repo`

| Campo | Tipo | Obligatorio | Nota |
|---|---|---|---|
| `repo_id` | `str` | Sí | `owner/name` (full_name de GitHub). Id con el que se cita el repo |
| `github_id` | `int` | Sí | Id numérico de GitHub; no cambia si el repo se renombra |
| `description` | `str` | No | |
| `topics` | `list[str]` | No (`[]`) | |
| `categories` | `list[Categoria]` | Sí (mín. 1) | Auth, DB, Payments, AI, Analytics, Search. En B0 se asignan a mano |
| `language` | `str` | No | |
| `license` | `str` | No | Identificador SPDX. Puede ser `NOASSERTION` |
| `stars` | `int ≥ 0` | Sí | |
| `pushed_at` | `datetime` | Sí | Último push; señal de actividad |
| `open_issues` | `int ≥ 0` | Sí | GitHub cuenta issues **y** PRs abiertos |
| `archived` | `bool` | Sí | |
| `readme_path` | `str` | No | Relativa a `ai/data/` |
| `health_score` | `float` | No | Lo calcula la ingesta; rango por acordar |

El esquema rechaza campos desconocidos (`extra="forbid"`), para que un nombre
mal escrito falle en vez de perderse en silencio.

## Por acordar con el equipo

Es un borrador. Pendiente de definir con ingesta: la lista oficial de
categorías, la fórmula y el rango de `health_score`, si los repos sin
descripción entran al catálogo, y qué campos adicionales vale la pena traer
(homepage, forks, último release, contribuidores).
