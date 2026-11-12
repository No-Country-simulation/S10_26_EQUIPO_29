# Prioridad por categoría en los candidatos: decisión y evidencia

**Estado:** integrada (10-nov). Cifras de desarrollo; el rendimiento publicable de
[`BASELINE_DECISION.md`](BASELINE_DECISION.md) describe la versión anterior (`ba94ef4`).

Qué cambia: para cada necesidad, el asistente busca primero entre los repos cuya
categoría principal es la de la necesidad. Si esos no llenan los 5 lugares (o no pasan
el umbral), se completa con la búsqueda abierta. El umbral y el juicio del modelo sobre
cada candidato no cambian.

Ejemplo: "quiero guardar los pedidos y el inventario" se detecta como base de datos.
Antes, la consulta "almacenamiento y consulta de registros" traía almacenamiento de
archivos o caché, y el usuario recibía valkey o redis. Ahora los candidatos son primero
bases de datos.

## Por qué

En la prueba final de la línea base (`main` en `ba94ef4`, 9-nov), el usuario recibió
una herramienta aceptable en 1 de 21 necesidades de base de datos y en 8 de 21 de
reportes sobre datos propios, aunque el asistente eligió bien en el 94 % de los casos
en que la herramienta llegó a los candidatos. La pérdida estaba en la búsqueda.

La categoría ya estuvo en el texto de cada repo y se sacó porque acercaba consultas
sin respuesta ([`SEARCH_DECISION.md`](SEARCH_DECISION.md)). Aquí no entra al texto:
solo ordena los candidatos.

## Antes de programar: puntajes con los conjuntos de desarrollo

Sin cambiar código, con las consultas que escribió el paso de entender en las corridas
de desarrollo del 8-nov (consultas únicas con herramienta en el catálogo; "llega" = un
aceptable entre los 5 candidatos, antes de elegir):

| Categoría | Consultas | Hoy | Solo la categoría principal | Prioridad, categoría principal | Prioridad, cualquiera de sus categorías |
|---|---|---|---|---|---|
| Base de datos | 17 | 9 | 14 | 14 | 10 |
| Analítica | 22 | 16 | 18 | 18 | 18 |
| Procesamiento de datos | 9 | 6 | 8 | 8 | 8 |
| Resto | 114 | 110 | 110 | 110 | 110 |

- Se usa solo la categoría principal: con cualquiera de las asignadas, las secundarias
  (cachés, monitoreo, bases vectoriales) desplazan a las bases de datos.
- Se prefiere "prioridad con respaldo" a "solo la categoría": en desarrollo dan lo mismo,
  pero el respaldo cubre una categoría mal detectada o con pocos repos (analítica tiene 4).
- El umbral no se toca: en 8 consultas el aceptable queda bajo 0,18 aun dentro de su
  categoría; es un problema de cómo está escrita la consulta, no de orden.

## Cómo funciona

- `SearchIndex.search(..., min_score=, prefer_category=)`: un solo cálculo de similitud;
  quita los que no llegan al umbral y ordena primero los de la categoría principal,
  cada grupo por similitud. El puntaje de cada repo no cambia.
- `asistir()` pasa la categoría de cada necesidad y el umbral.
- No hay reglas por repo ni por categoría: sigue valiendo si el catálogo crece.

## Cómo se midió

- Casos nuevos `records` (16 pedidos, 50 necesidades: 29 de base de datos, analítica o
  procesamiento de datos; 2 sin herramienta), escritos por otro modelo de lenguaje sin
  ver el catálogo y etiquetados antes de correr nada (tabla de conjuntos en
  [`README.md`](README.md)).
- Dos versiones que difieren solo en el cambio: **antes** `56e2faf` (solo los casos
  nuevos) y **después** `87d6dc4`. Gemini 3.5 Flash-Lite, 3 corridas, 5 candidatos,
  umbral 0,18, catálogo de 127 repos (snapshot del 2026-11-08), 10-nov, 0 errores.
- Regla escrita antes de correr:
  - **Gana** si en `records`, "el usuario recibe una herramienta aceptable" en base de
    datos, analítica y procesamiento de datos (sobre todas las oportunidades, detectadas
    o no) sube más que el ruido: la peor corrida de después supera a la mejor de antes.
  - **Sin regresión** si la mejor corrida de después llega al menos a la peor de antes en:
    el resto de las necesidades de `records`; "eligió un aceptable cuando llegó" en
    `validation`, `holdout`, `business`, `abstention` y `records`; y la abstención como
    la ve el usuario en `abstention` y `holdout`.
  - La búsqueda de los golden sets no se mide: `search()` sin `prefer_category` no cambia.

## Resultados (cifras de desarrollo, por corrida)

| Métrica | Antes | Después | Regla |
|---|---|---|---|
| `records`: base de datos, analítica y procesamiento, el usuario recibe una aceptable | 6 · 6 · 7 de 29 | **13 · 11 · 13 de 29** | gana |
| `records`: resto de las necesidades | 16 · 15 · 17 de 19 | 16 · 16 · 18 de 19 | sin regresión |
| Eligió un aceptable cuando llegó: `validation` | 15/17 · 15/18 · 15/18 | 14/18 · 17/19 · 18/18 | sin regresión |
| Ídem `holdout` | 12/13 · 13/13 · 13/13 | 13/13 · 12/12 · 13/13 | sin regresión |
| Ídem `business` | 17/19 · 17/17 · 17/17 | 16/17 · 16/17 · 21/21 | sin regresión |
| Ídem `abstention` | 8/8 · 7/7 · 8/8 | 7/7 · 8/8 · 8/8 | sin regresión |
| Ídem `records` | 22/23 · 21/23 · 24/26 | 29/32 · 27/32 · 31/33 | sin regresión |
| Abstención como la ve el usuario: `abstention` | 3 · 3 · 4 de 8 | 3 · 4 · 4 de 8 | sin regresión |
| Ídem `holdout` | 2 · 3 · 4 de 7 | 3 · 4 · 3 de 7 | sin regresión |

**Decisión: se integra.**

Por tipo de necesidad en `records` (necesidad × corrida):

| | Antes | Después |
|---|---|---|
| Base de datos: llega una aceptable a los candidatos | 2 de 36 | 17 de 36 |
| Base de datos: el usuario la recibe | 2 de 36 | **15 de 36** |
| Analítica: el usuario la recibe | 15 de 36 | 19 de 36 |
| Procesamiento de datos: el usuario la recibe | 2 de 15 | 3 de 15 |

## Límites

- Son cifras de desarrollo con 16 pedidos. Las cifras publicables de la prueba final
  ([`BASELINE_DECISION.md`](BASELINE_DECISION.md)) describen la versión anterior
  (`ba94ef4`); la prueba final no se vuelve a correr.
- Base de datos todavía no llega en 19 de 36: postgres tiene en GitHub una descripción
  corta ("Mirror of the official PostgreSQL GIT repository") y ningún topic, y queda
  bajo otros repos de su categoría.
- Con bases de datos entre los candidatos, el modelo elige a veces una librería de
  acceso a datos (sqlmodel, 9 de 32 necesidades detectadas) en vez de un motor.
- Lo que el paso de entender no detecta no se alcanza con este cambio: procesamiento de
  datos se detecta en 7 a 9 de 15, y un pedido (`granja-produccion-huevos`) pide
  aclaración en las 6 corridas.
- La abstención no empeora, pero sigue siendo débil (3–4 de 8 y 2–4 de 7).

Reportes: `results/assistant-2026-11-10-0011-records-gemini.md`, `…-0017-abstention-…`,
`…-0024-holdout-…`, `…-0031-business-…`, `…-0038-validation-…` (antes) y
`…-0108-records-…`, `…-0114-abstention-…`, `…-0123-holdout-…`, `…-0129-business-…`,
`…-0136-validation-…` (después).

---

Versión anterior de este documento: [`CATEGORY_PRIORITY_DECISION.md` en `7830fd9`](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/7830fd98db22e59f2747b9187afdc66fcfb051e3/ai/eval/CATEGORY_PRIORITY_DECISION.md).
