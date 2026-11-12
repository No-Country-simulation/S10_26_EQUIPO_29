# ¿Mejora la detección de necesidades con ejemplos parecidos al pedido?

Pregunta: si el paso de entender recibe como ejemplos unos pocos pedidos ya etiquetados
y parecidos al del usuario, ¿detecta más las necesidades que el usuario pide con
palabras de negocio ("registrar", "llevar un historial", "controlar"), sin agregar
necesidades que nadie pidió?

**Estado:** medida e **integrada** (11-nov). Las cinco condiciones de la regla se cumplen.
Cifras de desarrollo; el rendimiento publicable de [`BASELINE_DECISION.md`](BASELINE_DECISION.md) describe una versión anterior.

## Por qué

Una necesidad que entender no detecta se pierde en silencio: no se busca herramienta y
tampoco aparece en "Limitaciones". Una frase nueva en las reglas del prompt detectó más
bases de datos, pero agregó otras que nadie pidió y no se integró
([`DETECTION_DECISION.md`](DETECTION_DECISION.md)); además, cada tipo de necesidad
difícil pediría otra frase. Los ejemplos parecidos se eligen con el mismo modelo de
embeddings de la búsqueda y crecen con un banco de pedidos etiquetados, no con más
reglas.

## Etiquetas

Desde el 11-nov los conjuntos de desarrollo siguen [`LABEL_CRITERIA.md`](LABEL_CRITERIA.md).
Cambiaron 5 pedidos, todos con una base de datos que faltaba (ver "Conjuntos y su
historia" en [`README.md`](README.md)). Las cifras de antes de esa fecha no se comparan
con las de abajo.

## Línea base (11-nov)

- **Qué se midió:** solo el paso de entender, con `gemini-3.5-flash-lite`, 3 corridas por
  conjunto, sin cambios en el asistente.
- **Cómo:** seis conjuntos se re-puntuaron con las etiquetas actuales a partir de las
  respuestas guardadas del 10-nov (`--rescore`; el código de entender no cambió desde
  esas corridas). `base` se corrió de nuevo el 11-nov (su corrida anterior era de otro
  prompt).
- **Denominadores:** "detectadas" cuenta las necesidades esperadas de cada corrida;
  "de más", los pedidos en que se detectó una categoría que el pedido no pide. No
  cuentan los pedidos vagos ni las llamadas con error del proveedor (1 en `holdout` y 1
  en `abstention`).
- **Papel:** cifras de desarrollo. No se publican como rendimiento.

Una cifra por corrida:

| Conjunto (versión de etiquetas) | Detectadas, todas | Base de datos detectada | De más, todas | Base de datos de más |
|---|---|---|---|---|
| `detection` (v1) | 69 · 67 · 70 de 74 | 12 · 11 · 12 de 14 | 2 · 3 · 1 | 0 · 0 · 0 |
| `business` (v1) | 23 · 24 · 22 de 32 | 2 · 2 · 1 de 7 | 0 · 0 · 0 | 0 · 0 · 0 |
| `records` (v1) | 43 · 43 · 40 de 50 | 11 · 11 · 9 de 12 | 1 · 0 · 1 | 0 · 0 · 0 |
| `validation` (v4) | 20 · 20 · 20 de 23 | 3 · 3 · 3 de 5 | 2 · 1 · 1 | 0 · 0 · 0 |
| `holdout` (v3) | 17/21 · 20/23 · 19/23 | 3 · 3 · 3 de 4 | 1 · 2 · 2 | 0 · 0 · 0 |
| `abstention` (v2) | 12/15 · 13/17 · 13/17 | 1/2 · 2/3 · 2/3 | 1 · 1 · 1 | 0 · 0 · 0 |
| `base` (v3) | 37 · 37 · 38 de 40 | 2 · 2 · 2 de 3 | 4 · 4 · 5 | 0 · 0 · 0 |

Lo que muestra:

- **Registrar datos del negocio sigue sin detectarse.** De los 5 pedidos re-etiquetados,
  "cada sucursal vea solo su propio inventario y sus ventas" se detecta en las 3
  corridas; "los profesores registren la asistencia", "recalcular el inventario de cada
  uno" y los dos "… la registra" no se detectan en ninguna (0 de 12). En `business`, la
  base de datos se detecta en 1 o 2 de 7.
- **Base de datos de más: 0 en todos los conjuntos y corridas.** Con una base de cero,
  un solo caso parece una regresión: la regla de decisión fija el margen antes de medir.
- **Otras necesidades que casi no se ven:** permisos por sucursal (0 de 3), flujos de
  aprobación (1 de 6), servir desde servidores cercanos (0 de 6: se lee como
  almacenamiento); en `business`, permisos
  según el cargo o el grupo, 10 de 18.
- **Fuera del alcance de esta mejora, como ruido de partida:** en `base`, "aislamiento
  de datos" no se detecta como base de datos (0 de 3) y los pedidos "Diseña/Propón una
  API…" agregan `backend` en todas las corridas.

Reportes: `results/understand-2026-11-10-0234-detection-gemini-etiquetas-v1.md`,
`…-0236-business-…-etiquetas-v1.md`, `…-0241-records-…-etiquetas-v1.md`,
`…-0244-validation-…-etiquetas-v4.md`, `…-0248-holdout-…-etiquetas-v3.md`,
`…-0250-abstention-…-etiquetas-v2.md` y `results/understand-2026-11-11-0211-gemini.md`
(`base`).

## Banco de ejemplos (11-nov)

`ai/data/understand_examples.json`, 45 pedidos.

- **Quién los escribió:** otro modelo de lenguaje (GPT-6), en un chat nuevo, sin ver el
  catálogo ni los conjuntos de evaluación. El mensaje pidió variedad: pedidos que guardan
  datos del negocio dichos sin "base de datos", pedidos con "organizar", "llevar" o
  "controlar" en otro sentido, y pedidos con permisos por cargo o sede, aprobaciones y
  carga rápida lejos.
- **Filtro con reglas fijadas antes de leer:** 60 → 54 (6 repetían una categoría).
- **Etiquetas:** con el criterio, borrador de un asistente de IA revisado por una persona.
  Cambiaron 25 de las 54 del otro modelo, sobre todo "organizar horarios, rutas o
  cuadrillas", que es la app y no automatización. Un pedido quedó sin necesidades y no
  entra (un ejemplo sin necesidades enseñaría a pedir aclaración).
- **Separación de la evaluación:** se compara cada pedido del banco con los de todos los
  conjuntos, la prueba final incluida. Texto igual: ninguno. Parecido con EmbeddingGemma
  (instrucción para comparar oraciones): el umbral es el menor parecido entre los tres
  pares de `base` que son el mismo pedido escrito corto y largo (0,882 · 0,816 · 0,827 →
  **0,81**). Salieron 8 pedidos del banco, sin editar los demás. Lo comprueban los tests
  de `ai/tests/test_examples.py` (el de parecido, con `AI_MODEL_TESTS=1`).
- **Resultado:** 45 pedidos, 16 con base de datos (36 %).
- **Límite:** el parecido mide sobre todo el tipo de negocio. Entre los propios conjuntos
  de evaluación hay pares por encima de 0,81 (máximo 0,866) que son pedidos distintos de
  negocios parecidos. El umbral es conservador: saca del banco pedidos del mismo rubro,
  no solo copias.

## Cómo se usan (fijado antes de medir)

Para cada pedido, los 3 más parecidos del banco van en el mensaje de entender, antes del
pedido, como "pedidos parecidos ya resueltos": el texto y cada necesidad con su categoría
y la frase que la justifica. Siempre 3, sin parecido mínimo. Los vectores del banco se
calculan la primera vez que se piden ejemplos.

## Regla de decisión (fijada antes de medir)

**Versiones:** antes = el commit que agrega el banco sin usarlo; después = el commit que
lo usa en el paso de entender. Se corren una detrás de la otra, el mismo día, con Gemini
y 3 corridas. Una cifra por corrida.

**Mediciones:**

| Qué | Conjuntos | Para qué |
|---|---|---|
| Solo entender | casos nuevos | la decisión |
| Solo entender | los 7 de desarrollo | sin regresión en la detección |
| Asistente completo | casos nuevos y `abstention` | sin regresión en lo que recibe el usuario |

**Los ejemplos se integran si se cumple todo:**

1. **Detecta más bases de datos en los casos nuevos:** la peor corrida de después supera
   a la mejor de antes.
2. **Sin bases de datos de más en los casos nuevos:** en los pedidos sin base de datos,
   el máximo de después no supera al máximo de antes en más de 1 pedido.
3. **Sin regresión en cada uno de los 7 conjuntos de desarrollo:** necesidades
   detectadas, la mejor corrida de después llega al menos a la peor de antes; necesidades
   de más, el máximo de después no supera al máximo de antes en más de 1.
4. **Sin regresión para el usuario** (asistente completo, casos nuevos y `abstention`):
   "recibe una herramienta aceptable" y "se abstuvo", las dos como lo ve el usuario
   (sobre todas las necesidades esperadas, también las no detectadas): la mejor corrida
   de después llega al menos a la peor de antes.
5. **Costo:** la mediana del pedido completo sigue dentro del presupuesto de 15 s.

Solo como dato: tokens de entrada; detección de permisos por sede, aprobaciones y servir
desde servidores cercanos en los casos nuevos. Las corridas con error del proveedor no
cuentan. Si una condición falla, los ejemplos no se integran y la variante se revierte.
Nada se ajusta después de ver los resultados.

## Casos nuevos (11-nov)

`detection-2` (`assistant_cases_detection_2.json`), 22 casos.

- **Quién los escribió:** otro modelo de lenguaje (Grok 4.5), distinto del que escribió el
  banco (para no compartir su forma de redactar) y del que se evalúa, sin ver el catálogo
  ni el banco.
- **Filtro con reglas fijadas antes de leer:** las del banco, más dos: sin pedidos con un
  parecido al banco igual o mayor que el umbral de separación, y sin casi gemelos dentro
  del conjunto (se queda el primero en el orden de escritura).
- **Dos tandas:** la primera dejó 6 de 30 (casi todos repetían una categoría) y ningún
  pedido sin base de datos. Antes de cualquier medición se pidió una segunda tanda con el
  mensaje aclarado (cada categoría una vez, más pedidos con "organizar", "llevar" o
  "controlar" en otro sentido). Las dos pasan por el mismo filtro, en orden: 60 → 22.
- **Etiquetas:** con el criterio; repos aceptables con la misma evidencia que los otros
  conjuntos. 12 casos con base de datos y 10 sin ella; 8 con permisos por cargo o sede, 5
  con aprobaciones y 2 con carga rápida lejos (estas 7 necesidades, sin herramienta).
- **Límite:** el otro modelo reusó algunos negocios de la lista excluida con otro nombre.
  No afecta la separación del banco, que se mide por parecido y no por nombre.

## Resultados (11-nov)

Antes = el commit que agrega el banco sin usarlo; después = el commit que lo usa en
entender. Gemini 3.5 Flash-Lite, 3 corridas, una cifra por corrida, el mismo día.
Cifras de desarrollo: no se publican como rendimiento.

### Casos nuevos (`detection-2`, solo entender)

| | Antes | Después |
|---|---|---|
| Base de datos detectada | 2 · 2 · 4 de 12 | **10 · 9 · 8 de 12** |
| Base de datos de más (10 pedidos sin ella) | 0 · 1 · 0 | 0 · 0 · 0 |
| Todas las necesidades detectadas | 26 · 28 · 30 de 52 | 41 · 41 · 44 de 52 |
| Necesidades de más | 4 · 6 · 4 | 3 · 2 · 2 |
| Dato: permisos por cargo o sede | 3 · 4 · 5 de 8 | 6 · 6 · 8 de 8 |
| Dato: automatización (5 aprobaciones y 1 reparto automático) | 1 · 1 · 0 de 6 | 2 · 2 · 4 de 6 |
| Dato: carga rápida lejos | 0 · 0 · 0 de 2 | 0 · 0 · 0 de 2 |

Antes, en 2 pedidos entender no detectó nada y pidió aclaración (5 de 6 llamadas);
después, ninguno.

### Conjuntos de desarrollo (solo entender)

| Conjunto | Detectadas, antes | Detectadas, después | De más, antes | De más, después |
|---|---|---|---|---|
| `base` | 37 · 37 · 36 de 40 | 37 · 37 · 37 | 5 · 4 · 4 | 5 · 4 · 4 |
| `validation` | 19 · 21 · 21 de 23 | 19 · 21 · 21 | 1 · 1 · 1 | 1 · 1 · 1 |
| `holdout` | 19 · 19 · 19 de 23 | 21 · 21 · 20 | 1 · 3 · 1 | 1 · 1 · 1 |
| `business` | 24 · 22 · 21 de 32 | 26 · 27 · 26 | 0 · 0 · 0 | 0 · 1 · 1 |
| `abstention` | 13 · 13 · 13 de 17 | 14 · 15 · 14 | 1 · 1 · 1 | 1 · 1 · 1 |
| `records` | 45 · 43 · 42 de 50 | 47 · 45 · 46 | 0 · 0 · 0 | 0 · 1 · 0 |
| `detection` | 69 · 68 · 67 de 74 | 71 · 70 · 71 | 2 · 3 · 3 | 2 · 1 · 1 |

Base de datos: `business` 2 · 1 · 0 → 5 · 6 · 5 de 7; `records` 11 · 10 · 10 → 12 · 12 · 12
de 12; `detection` 12 · 12 · 12 → 14 · 14 · 14 de 14; los demás igual (en `holdout`,
3 · 3 · 3 → 3 · 3 · 2 de 4). Base de datos de más: 0 en los 7 conjuntos, antes y después.

### Asistente completo

| | Antes | Después |
|---|---|---|
| `detection-2`: recibe una herramienta aceptable (usuario) | 50 · 56 · 48 % | 64 · 64 · 64 % |
| `detection-2`: se abstuvo (usuario) | 0 · 0 · 0 % | 12 · 12 · 0 % |
| `abstention`: recibe una herramienta aceptable (usuario) | 89 · 89 · 89 % | 89 · 89 · 89 % |
| `abstention`: se abstuvo (usuario) | 50 · 50 · 62 % | 50 · 50 · 38 % |
| Mediana por pedido (`detection-2` / `abstention`) | 3,6 s / 4,0 s | 4,1 s / 4,2 s |
| Pedidos sobre 15 s | 0 | 0 |

Tokens de entrada de entender (mediana): unos 2.140 → 2.540 (+19 %). Errores del
proveedor: 1 antes (tiempo agotado), 0 después. Después, en `detection-2`, una respuesta
no se generó porque el filtro de salida marcó que copiaba las reglas (generar no cambió).

### Regla

| Condición | Resultado |
|---|---|
| 1. Más bases de datos en los casos nuevos (peor después > mejor antes) | 8 > 4: **cumple** |
| 2. Bases de datos de más en los casos nuevos (máximo + 1) | 0 frente a 1: **cumple** |
| 3. Sin regresión en los 7 conjuntos | detectadas, la mejor de después ≥ la peor de antes en los 7; de más, dentro del margen en los 7 (`business` y `records` justo en +1): **cumple** |
| 4. Sin regresión para el usuario | `detection-2` 64 ≥ 48 y 12 ≥ 0; `abstention` 89 ≥ 89 y 50 ≥ 50: **cumple** |
| 5. Mediana dentro de 15 s | 4,1 y 4,2 s: **cumple** |

**Decisión: los ejemplos parecidos se integran.**

### Límites

- Cifras de desarrollo sobre 22 casos nuevos y 3 corridas. Antes de publicar el
  rendimiento del asistente con este cambio hace falta una prueba final nueva.
- Los casos nuevos los escribió un solo modelo, con plantillas parecidas entre sí; la
  regla de casi gemelos sacó las más repetidas, no todas.
- "Servir desde servidores cercanos" sigue sin detectarse (0 de 6 en los dos conjuntos que
  la tienen): se lee como almacenamiento.
- La abstención como la ve el usuario en `abstention` cumple justo en el límite; una
  corrida bajó a 38 %. Sube en `detection-2` porque ahora se detectan aprobaciones que
  antes no se veían.
- `business` y `records` llegan justo al margen de necesidades de más (+1).
- Cuesta unos 400 tokens de entrada más por pedido en entender y medio segundo más en la
  mediana del pedido completo.

Reportes: antes `results/understand-2026-11-11-0510-detection-2-gemini.md`,
`…-0515-gemini.md` (`base`), `…-0518-validation-…`, `…-0521-holdout-…`, `…-0523-business-…`,
`…-0525-abstention-…`, `…-0529-records-…`, `…-0536-detection-…`,
`results/assistant-2026-11-11-0551-detection-2-gemini.md` y `…-0559-abstention-…`;
después `results/understand-2026-11-11-0610-detection-2-gemini.md`, `…-0616-gemini.md`,
`…-0619-validation-…`, `…-0623-holdout-…`, `…-0625-business-…`, `…-0628-abstention-…`,
`…-0632-records-…`, `…-0640-detection-…`,
`results/assistant-2026-11-11-0658-detection-2-gemini.md` y `…-0704-abstention-…`.

---

Versión anterior de este documento: [`DETECTION_EXAMPLES_DECISION.md` en `7830fd9`](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/7830fd98db22e59f2747b9187afdc66fcfb051e3/ai/eval/DETECTION_EXAMPLES_DECISION.md).
