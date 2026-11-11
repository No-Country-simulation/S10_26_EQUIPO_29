# ¿Dejan de decir "open source" los títulos del asistente?

Pregunta: si la regla del título dice qué debe nombrar (el sistema que se arma y el
negocio del pedido) y qué no (rasgos que valen para cualquier propuesta, como la
licencia), ¿desaparece "open source" de los títulos sin empeorar la elección de
herramientas?

**Estado:** medida e **integrada** (11-nov). Las tres condiciones de la regla se cumplen.

## Por qué

Varios títulos decían "open source" ("Sistema Open Source para Tienda de Repuestos").
Todo el catálogo es open source, así que la palabra no informa nada y suena a plantilla;
el título es lo primero que se ve en cada respuesta.

La regla del título solo fijaba el largo ("de 4 a 10 palabras"), no qué nombrar. Con ese
hueco, el modelo usaba lo más visible del prompt: su primera línea habla de
"herramientas open source". En la línea base, los 6 títulos de `business` con el término
son también títulos que no nombran ninguna función del pedido: la palabra ocupaba ese
lugar.

## El cambio

Regla 10 de `GENERATE_RULES` (`ai/assistant.py`), solo el título:

> "title": de 4 a 10 palabras (máximo 80 caracteres) que digan qué sistema se arma y para
> qué negocio, con palabras del pedido. No uses rasgos que valen para cualquier propuesta
> de este asistente, como el tipo de licencia. Escríbelo como una frase, con mayúscula
> solo al inicio y en nombres propios.

La regla nombra la clase de rasgo, no una lista de palabras ni de negocios. La primera
línea del prompt no cambia.

Alternativas consideradas:

| Alternativa | Por qué no |
|---|---|
| Quitar la frase del título en código | Rompe la gramática, se escapan variantes ("código abierto") y esconde la causa |
| Revisar el borrador y pedir un reintento si dice "open source" | Lista de palabras para un caso particular y una llamada extra; queda como reserva si la regla no alcanzara |
| Quitar "open source" de la primera línea del prompt | Cambia el marco de todo el paso de generar (licencias, criterios de elección) por un detalle de estilo |

## Regla de decisión (fijada antes de medir)

1. Títulos con "open source", "código abierto" o "libre", sumando las 3 corridas:
   **≤ 1 en `business` (de 24) y ≤ 1 en `detection-2` (de 66)**. Con la tasa de la línea
   base, salir así por azar tendría una probabilidad de ~1,6 % y ~0,5 % (algo más, porque
   el término se concentra en ciertos pedidos).
2. Los 24 títulos de `business`, a mano: se reconoce el negocio del pedido y nombra un
   sistema, plataforma o arquitectura. **Falla como máximo 1.**
3. Sin regresión para el usuario, en casos por corrida (denominador fijo): `validation`,
   recibe una herramienta aceptable **≥ 15 de 23**; `abstention`, recibe una herramienta
   aceptable **≥ 7 de 9** y se abstuvo **≥ 2 de 8** (mínimo de la línea base menos 1 caso).

Si fallaba 1 o 2: reintento con revisión del borrador, sin reescribir la regla sobre los
mismos conjuntos. Si fallaba 3: no se integraba.

## Cómo se midió

- `gemini-3.5-flash-lite`, 3 corridas por conjunto, catálogo de 127 repos (snapshot del
  10-nov), con `python -m ai.eval.run_assistant_eval gemini --cases <conjunto>`.
- **Antes:** `main` en `8dee315`, que ya incluye los pedidos parecidos en el paso de
  entender. `business` y `validation` se corrieron de nuevo el 11-nov: sus
  reportes anteriores (10-nov) eran de otro snapshot y de otro paso de entender.
  `detection-2` y `abstention` ya tenían reportes de esta versión (11-nov, 06:58 y 07:04).
- **Después:** el commit del cambio, la misma configuración.
- **Qué se cuenta:** el campo `title` de la respuesta final en el JSON de cada reporte (lo
  que ve el usuario), no el borrador del modelo. Búsqueda sin distinguir mayúsculas.
- **Revisión a mano:** la aplicó un asistente de IA con una rúbrica escrita antes de ver
  los resultados, y la aprobó una persona; la misma lectura se aplicó antes y después.
- **Papel:** cifras de desarrollo. No se publican como rendimiento.

## Resultados

Una cifra por corrida:

| Condición | Antes | Después | |
|---|---|---|---|
| 1. `business`: títulos con el término | 2 · 1 · 3 de 8 (6/24) | 0 · 0 · 1 de 8 (1/24) | cumple |
| 1. `detection-2`: títulos con el término | 1 · 5 · 1 (7/65) | 0 · 0 · 0 (0/66) | cumple |
| 2. `business`: nombra negocio y sistema | 23/24 | 24/24 | cumple |
| 3. `validation`: recibe una herramienta aceptable | 17 · 16 · 17 de 23 | 16 · 18 · 16 de 23 | cumple |
| 3. `abstention`: recibe una herramienta aceptable | 8 · 8 · 8 de 9 | 8 · 7 · 8 de 9 | cumple |
| 3. `abstention`: se abstuvo | 4 · 4 · 3 de 8 | 4 · 4 · 5 de 8 | cumple |

Observaciones (sin condición):

| | Antes | Después |
|---|---|---|
| Títulos con el término, los 4 conjuntos | 15/143 | 1/144 |
| `business`: el título nombra una función del pedido ("reservas", "pagos", "historial"; "gestión" sola no cuenta) | 13/24 | 23/24 |
| Títulos con mayúsculas de título, los 4 conjuntos | 30/143 | 0/144 |
| Resúmenes con el término, los 4 conjuntos (la regla no los cubre) | 14/143 | 5/144 |
| Eligió un aceptable donde la búsqueda lo trajo, los 4 conjuntos | 215/228 | 213/228 |

La elección de herramientas no se movió: `detection-2` bajó 4, `business` subió 3,
`validation` quedó igual.

## Lo que empeoró y lo que no resuelve

- **Títulos más largos.** Más de 10 palabras: 3/143 → 29/144. Todos quedan en 80
  caracteres o menos (límite del contrato), pero en `abstention` 3 de 24 borradores se
  pasaron y necesitaron un reintento ("Generar válido al 1.er intento" 96 % → 88 %).
  El modelo ahora enumera funciones del pedido.
- **El molde sigue.** En `business`, 19 de 24 títulos empiezan con "Sistema de gestión…"
  (antes 12): son más informativos, pero todavía tienen forma de plantilla.
- Corregir el largo o el molde necesita casos nuevos: estos cuatro conjuntos ya se usaron
  para esta decisión.

## Uso de los conjuntos

`business` y `detection-2` decidieron el título; `validation` y `abstention` comprobaron
la regresión. Ver "Conjuntos y su historia" en [`README.md`](README.md).

Reportes: antes `results/assistant-2026-11-11-1455-business-gemini.md`,
`…-1503-validation-…`, `…-0658-detection-2-…` y `…-0704-abstention-…`; después
`results/assistant-2026-11-11-1531-business-gemini.md`, `…-1545-detection-2-…`,
`…-1552-validation-…` y `…-1557-abstention-…`.
