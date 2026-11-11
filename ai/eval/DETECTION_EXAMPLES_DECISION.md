# ¿Mejora la detección de necesidades con ejemplos parecidos al pedido?

Pregunta: si el paso de entender recibe como ejemplos unos pocos pedidos ya etiquetados
y parecidos al del usuario, ¿detecta más las necesidades que el usuario pide con
palabras de negocio ("registrar", "llevar un historial", "controlar"), sin agregar
necesidades que nadie pidió?

**Estado:** línea base medida (11-nov). Faltan la variante, la regla de decisión
(escrita antes de medir) y la medición con casos nuevos.

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

## Próximos pasos

1. **Variante:** un banco de pedidos etiquetados con el criterio, que nunca comparte
   pedidos con los conjuntos de evaluación (comprobado en código). Para cada pedido, los
   más parecidos del banco se dan a entender como ejemplos.
2. **Regla de decisión,** escrita aquí antes de medir la variante: cuánto tiene que subir
   la detección, cuánto margen de necesidades de más se acepta por conjunto, y sin
   regresión en la elección ni en la abstención del asistente completo.
3. **Casos nuevos,** escritos sin ver el catálogo, con pedidos de "llevar", "controlar",
   "organizar" y las necesidades poco detectadas de arriba. Los conjuntos de esta página
   solo sirven para comprobar que no hay regresión.
