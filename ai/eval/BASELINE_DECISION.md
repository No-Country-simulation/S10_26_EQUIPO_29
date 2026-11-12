# Línea base con el catálogo de 127 repos: reglas y cifras

Qué se decide aquí: el texto de búsqueda (con los datos de la IA o sin ellos) y el
umbral de "sin evidencia", y cuáles son las cifras de referencia de la búsqueda y del
asistente con el catálogo de 127 repos. Las cifras que se publiquen salen de este
documento.

**Las reglas de abajo se fijaron antes de medir.** La fecha del commit que las agregó
es anterior a la de cualquier reporte de esta medición.

**Estado:** vigente como fuente de las cifras publicables. Describen la versión de `main` en
`ba94ef4` (prueba final del 8 y 9-nov). Después se integraron cuatro cambios, medidos solo con
cifras de desarrollo en sus documentos: la defensa contra prompt injection (9-nov,
[`GUARDRAILS_DECISION.md`](GUARDRAILS_DECISION.md)), la prioridad por categoría (10-nov,
[`CATEGORY_PRIORITY_DECISION.md`](CATEGORY_PRIORITY_DECISION.md)), los pedidos parecidos como
ejemplo en entender (11-nov, [`DETECTION_EXAMPLES_DECISION.md`](DETECTION_EXAMPLES_DECISION.md))
y la regla de los títulos (11-nov, [`TITLE_DECISION.md`](TITLE_DECISION.md)). Publicar el
rendimiento con esos cambios pide una prueba final nueva, con casos nuevos.

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

## Resultados · prueba final (cifras publicables)

Una sola corrida, con la configuración de `main` en `ba94ef4`: catálogo de 127 repos
(snapshot del 2026-11-08), enriquecimiento v5, texto de búsqueda con resumen y casos de
uso de la IA, umbral 0,18, EmbeddingGemma-300m y Gemini 3.5 Flash-Lite. Búsqueda medida
el 8-nov; asistente el 9-nov (una corrida anterior se cortó por la cuota diaria sin
escribir reporte y se repitió entera, sin cambios).

### Búsqueda (`catalog-test`: 58 consultas del paso de entender, 56 con respuesta)

| | Valor |
|---|---|
| hit@3 | **41 de 56 (73 %)** |
| MRR@3 | 0,65 |
| recall@3 | 58 % |
| Consultas resueltas que bloquea el umbral 0,18 | 0 de 41 |
| Consultas sin respuesta que pasan el umbral | 2 de 2 |

- Los fallos se concentran en tres tipos de necesidad: **base de datos** (0 de 6
  consultas; "almacenamiento y consulta de registros" trae almacenamiento de archivos o
  caché, y postgres queda entre el puesto 7 y el 71), **reportes sobre datos propios**
  (1 de 6) y **orquestación de flujos de datos** (1 de 3). Inicio de sesión,
  almacenamiento, búsqueda, pagos, comunicación, CMS, caché, observabilidad y
  automatización aciertan todas.
- Dato (regla 3): sin los datos de la IA en el texto, también 41 de 56 (MRR 0,62). No
  cambia nada.

### Asistente (`test`: 16 pedidos escritos sin ver el catálogo, 61 necesidades, 3 corridas)

De las 59 necesidades que tienen herramienta en el catálogo (177 oportunidades: necesidad ×
corrida):

| Paso | Llegan | Sobre el paso anterior |
|---|---|---|
| El paso de entender las detecta | 165 de 177 | 93 % |
| Hay una herramienta aceptable entre los 5 candidatos | 131 de 165 | 79 % |
| El asistente elige una aceptable | 123 de 131 | **94 %** (88–100 % entre corridas) |
| **Como lo ve el usuario: recibe una herramienta aceptable** | **123 de 177** | **69 %** |

- Punta a punta sobre las detectadas: 75 % (69–79 % entre corridas). Status correcto en
  los 48 flujos. Sin errores del proveedor. Mediana de 5,0 s por pedido.
- Por tipo de necesidad, como lo ve el usuario: inicio de sesión 18/18, almacenamiento
  24/24, búsqueda 12/12, observabilidad 6/6, caché 3/3, comunicación 19/21, pagos 16/18,
  CMS 7/9, automatización 5/6; **base de datos 1/21**, **reportes sobre datos propios
  8/21**, procesamiento de datos 4/12, colas de mensajes 0/3, aprendizaje automático 0/3.
  La pérdida principal está en la búsqueda (34 oportunidades), no en la elección.
- **Abstención:** solo 2 de las 61 necesidades no tienen herramienta (6 oportunidades);
  en las 6 recomendó algo que no sirve. Con un denominador tan chico no es una cifra:
  la abstención se mide en desarrollo (ver arriba), y allí es el punto débil.
- En 2 de los 16 pedidos el asistente dio el mismo resultado en las 3 corridas; en los
  demás cambia la herramienta elegida entre corridas, muchas veces entre dos aceptables.
- Textos del modelo que mencionan "el catálogo": 22 en 48 flujos.

### Desarrollo frente a prueba final

Las cifras de desarrollo salieron más altas (búsqueda 92 % frente a 73 %): esos
conjuntos se usaron para decidir o se escribieron conociendo el catálogo. La diferencia
es la razón de tener una prueba final, y las cifras que se publican son estas.

### Tildes en los textos del modelo (limitación medida, 9-nov)

En 31 de 610 respuestas de Gemini (5,1 %) aparece al menos una palabra común escrita
sin tilde ("autenticacion", "gestion", "busqueda"). En 29 de esas 31, la respuesta
entera está escrita sin ninguna tilde: no son palabras sueltas.

- Cómo se midió: con los reportes JSON de `results/` del 2 al 9 de noviembre
  (`assistant-*`, `injection-*`, `understand-*`), sin corridas nuevas. Cuenta solo los
  textos que escribe el modelo y ve el usuario. Usa una lista de 20 palabras con tilde
  obligatoria y sin homógrafos, fijada antes de contar junto con los umbrales (hasta 5 %:
  limitación; 20 % o más: arreglo).
- Denominador: respuestas de Gemini con al menos un texto del modelo, sin errores ni
  pedidos frenados en la entrada. Cubre varias versiones del asistente (2 a 9 de noviembre).
- No lo explica el pedido: pasa con 5 de 70 pedidos escritos sin tildes y con 27 de 540
  escritos con tildes. Tampoco cambia con la defensa contra prompt injection (mismos
  casos antes y después).
- Otros proveedores: 0 de 133 respuestas, con muestras chicas.
- Las entidades HTML (`Qu&eacute;`) sí se corrigen en el código desde #109. Una tilde que
  falta no se puede restaurar sin un diccionario.

### Para mejoras futuras (medir con casos nuevos)

- Búsqueda de bases de datos y de herramientas de reportes con pedidos en lenguaje de
  negocio ("llevar un registro", "consultar reportes").
- Abstención frente a necesidades parecidas a algo del catálogo (chat, copias de
  seguridad automáticas, factura electrónica) y detección de las que hoy no se ven.
- Una regla de umbral que no dependa de una sola consulta, o prescindir del umbral.
- Tildes en los textos del modelo (ver la sección anterior): detectar un texto largo del
  modelo sin ninguna tilde y reintentar; no necesita diccionario. Medirlo pide muchas
  respuestas nuevas: con un 5 % de base, ver si baja exige cientos, más la regresión.

Reportes: `results/search-catalog-test-embeddinggemma-300m.md`, `…-texto-base.md` y
`results/assistant-2026-11-09-0833-test-gemini.md`.

---

Versión anterior de este documento: [`BASELINE_DECISION.md` en `7830fd9`](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/7830fd98db22e59f2747b9187afdc66fcfb051e3/ai/eval/BASELINE_DECISION.md).
