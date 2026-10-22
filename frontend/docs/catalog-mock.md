# Catálogo: contrato y adaptación

Referencia: PR #17, `shared/contracts/repo.py`, commit a6719c4e212667ed792a9c9bda422ed97257f1c1. Esta adaptación local no confirma los contratos pendientes ni incorpora HTTP.

- `src/mocks/catalog.fixtures.json`: 19 repos con nombres y estructura del contrato Repo. `github_id` es numérico, no el node ID de GraphQL. `open_issues_count` incluye issues y PRs abiertos.
- `src/data/catalog.mjs`: `toTool` y `toCardDetail` convierten estos registros una vez al modelo de la interfaz. `catalogRepos` expone el origen; `catalogRecords` y `mockCatalog` exponen el modelo visual. `mockCatalog` no simula un endpoint HTTP acordado.
- `catalog-presentation.json`: rutas locales, nombres visibles, documentación, releases y procedencia de la captura. No son campos garantizados por Repo. `maintained` sigue sin confirmar.
- `catalog-categories.json`: catálogo de categorías local provisional; conserva las categorías actuales adicionales a las seis propuestas. Primera asignación como categoría principal; el adaptador preserva todas las asignaciones. La card muestra la principal y el filtro considera todas las asignaciones.
- `catalog-default.fixture.json`: ejemplo ficticio independiente; no se fuerza a pasar como repositorio real con un github_id inventado.
- Logos y colores siguen en `src/data/brand-identities.json`, enlazados por full_name.

Los textos españoles actuales son resúmenes curados de demostración (`summary_es`); no se presentan como descripciones descargadas de GitHub ni generadas por IA. `description`, `readme_text` y `homepage` quedan null al no estar en la captura disponible. Topics y use_cases están vacíos; no se inventan valores.

Valores null de salud, issues y mantenimiento no se convierten en cero/false. Las etiquetas visuales de ausencia se resuelven en el adaptador o componente, sin escribirlas en los datos de contrato.

Los scripts snapshot-github.py y apply-github-snapshot.py mantienen esta separación. La aplicación del snapshot busca por full_name, no por posición del array. La captura existente se conserva; no hay consultas en tiempo real.
