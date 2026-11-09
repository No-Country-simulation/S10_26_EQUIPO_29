# Evaluación de la búsqueda

Mide si la búsqueda semántica (`ai/search.py`) encuentra la herramienta correcta
para cada necesidad. El asistente busca **una vez por necesidad** y el modelo de
lenguaje elige entre los primeros resultados: lo que no llega ahí, no se puede
recomendar.

Esta evaluación cubre solo la búsqueda. El flujo completo del asistente se mide
con sus casos de prueba ([`ASSISTANT_CASES.md`](ASSISTANT_CASES.md)). Por qué se
eligieron el modelo de embeddings y el umbral, con su evidencia:
[`SEARCH_DECISION.md`](SEARCH_DECISION.md).

## Estado actual

| | |
|---|---|
| Modelo de embeddings | EmbeddingGemma-300m |
| Texto de cada repo | nombre, resumen de la IA, descripción, topics y casos de uso de la IA (sin categorías) |
| Umbral de "sin evidencia" (`min_score`) | 0,23 |
| Acierto en el catálogo real (hit@3) | 52 de 60 consultas (87 %) con el catálogo de 100 repos (6-nov); pendiente de medir con 127 |
| Golden set | `catalog` v3: 100 consultas (95 con respuesta, 5 sin respuesta), catálogo de 127 repos (snapshot del 2026-11-08) |

Con el catálogo de 100 repos (6-nov), el umbral frenaba la mitad de los pedidos sin
respuesta (20 de 40 pasaban). Los que *suenan* parecido a un repo que no los resuelve
(por ejemplo, "comunicación conclientes" → alertmanager, "inicio de sesión" → vault)
pasan, y el freno tiene que venir del paso que elige entre los candidatos.

Para comparar variantes del texto: `python -m ai.eval.run_search_eval --texto <variante>`
(variantes en `TEXT_VARIANTS`, `ai/search.py`).

## Cómo correrla

Desde la raíz del repo, con el entorno activo:

```bash
python -m ai.eval.run_search_eval                             # catálogo real, modelo por defecto
python -m ai.eval.run_search_eval --golden sample             # 20 repos de ejemplo
AI_EMBEDDING_MODEL=qwen3 python -m ai.eval.run_search_eval    # otro modelo del registro
```

Cada corrida escribe un reporte en `ai/eval/results/`
(`search-catalog-<modelo>.md` o `search-<modelo>.md`). Tarda menos de un minuto
con EmbeddingGemma en CPU.

## Golden sets

Cada golden set declara contra qué catálogo se escribió (`source`), y la
evaluación construye el índice con ese mismo catálogo.

| Nombre | Archivo | Catálogo | Para qué |
|---|---|---|---|
| `catalog` (por defecto) | `search_queries_catalog.json` | Snapshot del catálogo real (`ai/data/catalog/`, 127 repos) | Medir la búsqueda que usa el asistente y calibrar el umbral |
| `catalog-validation` | `search_queries_catalog_validation.json` | Snapshot del catálogo real | Validar con consultas nuevas el texto de búsqueda elegido con `catalog`; no se usa para ajustar |
| `catalog-test` | `search_queries_catalog_test.json` | Snapshot del catálogo real | Prueba final: consultas de pedidos escritos sin ver el catálogo; se mide una sola vez |
| `sample` | `search_queries.json` | 20 repos de ejemplo (`ai/data/`) | Repetir la elección del modelo de embeddings |

- Cada consulta tiene sus repos aceptables (`expected`). Una lista vacía
  significa que el catálogo no tiene respuesta: esas consultas sirven para el umbral.
- Las respuestas se escriben **antes** de mirar lo que devuelve la búsqueda. Un
  repo es aceptable solo si su descripción, sus topics o su README muestran lo
  que pide la consulta como propósito principal; cada consulta lo justifica en `note`.
  Hasta 5 por consulta. Con licencia `NOASSERTION`, además, el README o el archivo
  de licencia del repo tiene que mostrar una licencia abierta.
- El `id` no cambia aunque cambie la respuesta (`none-login` hoy tiene respuesta):
  así los reportes de distintas versiones se comparan consulta por consulta.
- Las consultas de `catalog` son cortas y en español, como las que escribe el
  asistente. `note` dice su origen: escrita por el paso de entender (las
  variantes terminan en `-v2`), escrita a mano o de la versión 1.
- Si se cambian las respuestas esperadas, se sube `version`: resultados de
  versiones distintas no se comparan.
- `catalog` guarda la fecha del snapshot (`catalog_taken_at`). Si el snapshot se
  renueva, un test falla a propósito hasta revisar las consultas.

## Conjuntos y su historia

Un conjunto que se usó para decidir algo ya no sirve para comprobar esa decisión:
sus cifras salen optimistas. Por eso cada conjunto dice quién lo escribió, qué había
leído antes y para qué se usó. Las etiquetas para el catálogo de 127 repos (8-nov) las
propuso un asistente de IA con evidencia de GitHub (descripción, topics, README o
archivo de licencia, nunca el resumen de la IA) y las revisó una persona.

| Conjunto | Quién lo escribió y qué había leído | Usado para decidir | Papel |
|---|---|---|---|
| Búsqueda `catalog` | 69 consultas del paso de entender (Gemini, 3-nov); 31 redactadas con ayuda de IA después de leer el catálogo y revisadas | umbral (3 y 6-nov), texto de los repos (6-nov) | desarrollo |
| Búsqueda `catalog-validation` | Asistente de IA, después de leer los resúmenes del catálogo (7-nov) | texto de los repos (7-nov) | desarrollo |
| Búsqueda `sample` | A mano, para 20 repos de ejemplo (26-oct) | modelo de embeddings (26-oct) | repetir esa elección |
| Asistente `base` | Pedidos redactados con ayuda de IA y revisados (31-oct); `una-factura-electronica` conociendo el catálogo de 127 (8-nov) | prompts y modelo de lenguaje (3-nov) | desarrollo |
| Asistente `validation` | Asistente de IA con el catálogo leído, antes de cambiar el prompt (3 y 4-nov) | tres decisiones (4, 6 y 7-nov) | desarrollo |
| Asistente `holdout` | Asistente de IA, después de leer el catálogo (7-nov) | abstención (7-nov) | desarrollo |
| Asistente `business` | Otro modelo de lenguaje sin ver el catálogo (8-nov), filtrado con reglas fijas | ninguna | desarrollo |
| Asistente `abstention` | Asistente de IA conociendo el catálogo de 127, sin haber visto respuestas del asistente con ese catálogo (8-nov) | ninguna | desarrollo |
| Búsqueda `catalog-test` | Consultas del paso de entender (Gemini, una corrida, 8-nov) para los pedidos de la prueba final | ninguna | **prueba final** |
| Asistente `test` | Otro modelo de lenguaje sin ver el catálogo (8-nov), filtrado con reglas fijas, sin editar; etiquetas puestas después | ninguna | **prueba final** |

Las cifras que se publican salen de un conjunto de prueba final que no se usa para
decidir nada y se corre una sola vez.

## Cómo leer el reporte

| Métrica | Qué responde |
|---|---|
| **hit@3** | ¿Llegó al menos una herramienta correcta al top-3? |
| **MRR@3** | ¿Qué tan arriba? 1 si está primera, 0,5 si segunda, 0,33 si tercera, 0 si no llegó; promedio |
| **recall@3** | ¿Qué parte de *todas* las herramientas correctas llegó al top-3? |
| **hit@5** | Como hit@3, con 5 candidatos por necesidad |

Las consultas sin respuesta no cuentan para estas métricas. Se usan en la
sección **"Umbral"**, que muestra los puntajes del 1.er resultado de cada grupo,
el umbral actual, el que sugiere la regla (`suggest_min_score` en `metrics.py`)
y, para cada uno, qué consultas bloquea o deja pasar. Las consultas con
respuesta que la búsqueda no resuelve se listan como fallos de búsqueda.

## Medir una mejora del texto de los repos

El reporte de EmbeddingGemma es la línea base para medir cualquier cambio en el
texto de los repos (por ejemplo, agregar categorías y un resumen en español):

1. Hacer el cambio sin tocar el golden set ni el snapshot.
2. Correr `python -m ai.eval.run_search_eval`.
3. Ver qué cambió con `git diff ai/eval/results/search-catalog-embeddinggemma-300m.md`:
   el diff muestra, consulta por consulta, qué posición subió o bajó y cómo se
   movió el umbral.

Si cambia el golden set o el snapshot, los números dejan de ser comparables.

## Cuando cambie el catálogo

1. Volver a exportar el snapshot (`python -m ai.scripts.export_catalog_snapshot`).
   Los tests de fecha fallan hasta revisar los conjuntos.
2. Listar los pares por juzgar, con el `repos.json` del catálogo anterior:

   ```bash
   git show <commit anterior>:ai/data/catalog/repos.json > anterior.json
   python -m ai.eval.pool --anterior anterior.json --salida pares.md
   ```

   Para cada consulta, los repos nuevos que aparecen en el top-10 de alguna de las
   dos variantes de texto (top-20 en las consultas sin respuesta); para cada
   necesidad de los casos del asistente, los repos nuevos de su categoría. La lista
   no muestra el puesto: el juicio sale de la evidencia del repo, no de la búsqueda.
3. Juzgar cada par con la evidencia de GitHub y agregar solo lo que cumpla la regla,
   con su `note`. Actualizar `catalog_taken_at` y subir `version` en cada conjunto.
4. Correr la evaluación. Si el umbral sugerido cambia, actualizar `min_score` en
   `ai/embeddings.py` y `SEARCH_DECISION.md`.
