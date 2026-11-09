# Línea base con el catálogo de 127 repos: reglas y cifras

Qué se decide aquí: el texto de búsqueda (con los datos de la IA o sin ellos) y el
umbral de "sin evidencia", y cuáles son las cifras de referencia de la búsqueda y del
asistente con el catálogo de 127 repos. Las cifras que se publiquen salen de este
documento.

**Las reglas de abajo se fijaron antes de medir.** La fecha del commit que las agregó
es anterior a la de cualquier reporte de esta medición.

## Conjuntos y su papel

| Papel | Búsqueda | Asistente |
|---|---|---|
| Desarrollo (se mira todo; sus cifras salen optimistas) | `catalog` + `catalog-validation`, medidos juntos | `base` (5 casos rápidos), `validation`, `holdout`, `business`, `abstention` |
| Prueba final (una sola corrida, con la versión elegida) | `catalog-test` | `test` |

Quién escribió cada conjunto y para qué se usó antes: tabla "Conjuntos y su historia"
en `README.md`.

## Reglas

1. **Texto de búsqueda.** Se comparan solo dos variantes: la actual (resumen y casos de
   uso de la IA) y `base` (sin datos de la IA), sobre los dos golden sets de desarrollo
   juntos, cada una con el umbral que le sugiere la regla en ese conjunto. Se cambia a
   `base` solo si su hit@3 es al menos 3 mayor **y** las consultas sin respuesta que
   pasan su umbral no aumentan en más de 2. Si no, se queda la actual. No se agregan
   variantes después de ver resultados.
2. **Umbral.** `suggest_min_score` con la variante elegida sobre los dos golden sets de
   desarrollo juntos; se adopta tal cual. Se informa qué consulta lo fija, cuántas
   consultas resueltas bloquea y cuántas sin respuesta deja pasar, con sus
   denominadores.
3. **Prueba final.** Se corre una sola vez, con la variante y el umbral ya en `main`:
   el asistente con 3 corridas y la búsqueda con la variante elegida (la otra, solo
   como dato). Nada se cambia por lo que muestre. Si la otra variante gana por el
   margen de la regla 1, se anota para una mejora futura, medida con casos nuevos.
4. **Publicación.** Las cifras que se publican salen de la prueba final, cada una con
   su denominador (qué casos cuenta y cuáles deja fuera) y la versión medida: commit,
   fecha del snapshot, versión del enriquecimiento, variante de texto y umbral. Las de
   desarrollo se citan como "desarrollo".

## Presupuesto (Gemini, nivel gratuito: 500 llamadas por día)

- Asistente en desarrollo: 43 casos × 2 llamadas × 3 corridas ≈ 260, más calentamiento.
- Prueba final del asistente: 16 casos × 2 × 3 ≈ 100.
- La búsqueda no llama al modelo de lenguaje.

Las dos tandas se corren en días distintos de cuota si hace falta, sin cambiar nada
entre ellas. Una corrida cortada por la cuota se repite entera.

## Resultados

(Pendiente: se completa después de medir.)
