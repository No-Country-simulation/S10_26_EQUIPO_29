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

## Resultados · desarrollo (8-nov)

Cifras de desarrollo: optimistas por definición (estos conjuntos se usaron antes para
decidir o se escribieron conociendo el catálogo). No se publican como rendimiento.

### Búsqueda

`catalog` v3 + `catalog-validation` v2: 121 consultas con respuesta y 14 sin respuesta.

| Variante de texto | hit@3 | MRR@3 | recall@3 | Umbral sugerido |
|---|---|---|---|---|
| Actual (resumen y casos de uso) | 111/121 | 0,85 | 74 % | 0,18 |
| `base` (sin datos de la IA) | 105/121 | 0,80 | 70 % | 0,14 |

- **Regla 1:** se queda la variante actual (`base` no la supera: tiene 6 aciertos menos).
- **Regla 2:** el umbral pasa de 0,23 a **0,18**. Lo fija una sola consulta (`none-sms`,
  primer resultado 0,188), así que es frágil: el golden `catalog` solo sugiere 0,19.
  Con 0,18 no bloquea ninguna de las 111 consultas resueltas y deja pasar las 14 sin
  respuesta; con 0,23 bloqueaba 2 resueltas (`none-videos`, `none-sms`) y dejaba pasar
  10. Con 127 repos el umbral ya no frena las consultas sin respuesta: la abstención
  depende del juicio del asistente sobre cada candidato.
- Por conjunto (dato): `catalog` 85/95 (`base` 79/95); `catalog-validation` 26/26 con
  las dos variantes (techo: es un conjunto fácil).

Reportes: `results/search-catalog+catalog-validation-embeddinggemma-300m.md` y
`…-texto-base.md`.

### Asistente

Gemini 3.5 Flash-Lite, 3 corridas por conjunto, umbral 0,18, 5 candidatos por necesidad.
Rango entre las 3 corridas.

| Conjunto | Casos | Eligió un aceptable (cuando llegó uno a los candidatos) | Punta a punta | Necesidades detectadas |
|---|---|---|---|---|
| `abstention` | 8 | 100 % | 100 % | 83 % |
| `holdout` | 12 | 100 % | 92–100 % | 86 % |
| `validation` | 10 | 88–94 % | 70–85 % | 94 % |
| `business` | 8 | 94–100 % | 75–86 % | 70 % |
| `base` (5 rápidos) | 5 | 60–80 % | 43–57 % | 90 % |

**Abstención, solo en necesidades sin herramienta en el catálogo** (cada necesidad ×
3 corridas; "detectadas" = el paso de entender la encontró):

| Conjunto | Oportunidades | Detectadas | Se abstuvo, sobre detectadas | Como lo ve el usuario, sobre todas |
|---|---|---|---|---|
| `abstention` | 24 | 16 | 12 (75 %) | 12 de 24 (50 %) |
| `holdout` | 21 | 15 | 8 (53 %) | 8 de 21 (38 %) |
| `base` | 6 | 6 | 3 | 3 de 6 |
| `business` | 6 | 6 | 0 | 0 de 6 |

- Dónde recomienda algo que no sirve: chat entre personas (novu), copias de seguridad
  automáticas (seaweedfs), factura electrónica (facturación por uso o suscripciones),
  y en `business` los dos casos de IA dudosos (scikit-learn, transformers).
- Lo que el usuario no ve ni como limitación: la red de distribución de contenido,
  los flujos de aprobación y las menciones en redes sociales casi nunca se detectan.
- Ruido: en `holdout`, "se abstuvo" va de 40 % a 80 % entre corridas.

**Hallazgos de desarrollo**

- **Registrar datos del negocio no se detecta como necesidad de base de datos**: en
  5 de los 8 casos de `business` ("llevar un historial", "controlar las reservas") no
  se detecta en ninguna corrida. El paso de entender lo trata como parte de la app.
- **Techo de la búsqueda**: "controlar las existencias" no trae una base de datos a los
  candidatos; "avisar por WhatsApp" no trae apprise; "series de tiempo" no trae
  ClickHouse.

Reportes: `results/assistant-2026-11-08-2132-abstention-gemini.md`, `…-2140-holdout-…`,
`…-2148-validation-…`, `…-2154-business-…` y `…-2200-gemini.md` (casos rápidos).

## Resultados · prueba final

(Pendiente: se corre una sola vez, con esta configuración ya en `main`.)
