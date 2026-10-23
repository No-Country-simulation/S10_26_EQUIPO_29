# shared/contracts/ — Contratos entre partes

Forma de los datos que una parte produce y otra consume. Los cambios se hacen
por Pull Request, avisando al equipo ([`CONTRIBUTING.md`](../../CONTRIBUTING.md), regla 3).

| Archivo | Contrato | Escribe → lee | Estado |
|---|---|---|---|
| `repo.py` | Repo: una herramienta del catálogo y sus categorías | Ingesta + IA → IA, API, frontend | v1.0 · acordado (20-oct-2026) |
| `categories.json` | Lista de categorías | Equipo → IA, frontend | Provisional (`version: 0`, las 6 del caso) |
| `integration_idea.py` | Idea de integración de una herramienta | IA → frontend | Propuesta, pendiente de revisión con frontend |
| `assistant.py` | Pregunta y respuesta del asistente | Frontend ↔ IA | Propuesta, pendiente de revisión con frontend |

## Uso desde Python

Requiere Pydantic 2.x (convención del equipo). Se importa desde la raíz del repo:

```python
from shared.contracts.repo import Repo

repo = Repo.model_validate(fila)   # dict; por ejemplo, una fila de v_repos_for_ai
```

- Los scripts y tests se ejecutan con `python -m …` desde la raíz; desde una
  subcarpeta o un notebook en otra carpeta, `shared` no se puede importar.
- Con Docker, el contexto de construcción tiene que incluir `shared/`.

## Desde otros lenguajes

Los `.py` son la referencia legible de cada contrato. `categories.json` se
puede leer directamente.

## Pruebas

```bash
python -m pytest tests/contracts -v
```

Ejemplos válidos de cada contrato y casos que deben rechazarse.
