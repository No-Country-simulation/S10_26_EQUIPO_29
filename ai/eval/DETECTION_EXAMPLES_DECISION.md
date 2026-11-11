# ¿Mejora la detección de necesidades con ejemplos parecidos al pedido?

Pregunta: si el paso de entender recibe como ejemplos unos pocos pedidos ya etiquetados
y parecidos al del usuario, ¿detecta más las necesidades que el usuario pide con
palabras de negocio ("registrar", "llevar un historial", "controlar"), sin agregar
necesidades que nadie pidió?

**Estado:** línea base, banco de ejemplos y regla de decisión listos (11-nov). Faltan
los casos nuevos y la medición.

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

## Próximos pasos

1. **Casos nuevos,** escritos sin ver el catálogo ni el banco, con pedidos de "llevar",
   "controlar", "organizar" y las necesidades poco detectadas de arriba. Los que tengan un
   pedido del banco en el umbral de separación o por encima se descartan antes de correr.
   Los conjuntos de esta página solo sirven para comprobar que no hay regresión.
2. **Medición y decisión** con la regla de arriba, sin cambiarla.
