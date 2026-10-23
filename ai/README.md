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

## Estructura

```
ai/
├── catalog.py                  # load_repos(): único punto de acceso a los datos
├── requirements.txt
├── scripts/
│   └── build_sample_data.py    # Regenera ai/data/ desde la API de GitHub
├── data/
│   ├── repos.json              # 20 repos con la forma del contrato, sin el README
│   └── readmes/                # README de cada repo (<owner>__<name>.md)
└── tests/
    └── test_sample_data.py     # Valida los datos de ejemplo contra el contrato
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
python -m pytest tests/contracts -v       # valida los ejemplos del contrato
python -m ai.scripts.build_sample_data    # regenera ai/data/ (requiere `gh` autenticado)
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
