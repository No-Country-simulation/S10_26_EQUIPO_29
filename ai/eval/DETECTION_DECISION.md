# Detección de pedidos de guardar datos: medida y no integrada

Qué se probó: una frase en las reglas del paso de entender para que "guardar y consultar
los datos del negocio" cuente como necesidad de base de datos aunque el pedido no nombre
una base de datos. **Ganó en detección, pero agregó bases de datos que nadie pidió, y por
la regla fijada antes no se integra.** El asistente queda como estaba.

**Estado:** no integrada (10-nov). Reemplazada por
[`DETECTION_EXAMPLES_DECISION.md`](DETECTION_EXAMPLES_DECISION.md) (11-nov): ejemplos
parecidos al pedido en vez de una regla más.

## Por qué

Con pedidos como "llevar un historial de las mascotas" o "controlar las existencias", el
paso de entender trataba el registro de datos como parte de la aplicación del usuario y
no creaba la necesidad: el usuario no recibía ni la herramienta ni el aviso de que
faltaba. En los casos de negocios (`business`, desarrollo) la base de datos se detectaba
en 1 o 2 de 7 necesidades por corrida. La prioridad por categoría
([`CATEGORY_PRIORITY_DECISION.md`](CATEGORY_PRIORITY_DECISION.md)) no ayuda ahí: solo
ordena candidatos de necesidades que ya existen.

## La frase probada

Al final de la regla 2 de entender ("la aplicación que describe el usuario no es una
necesidad"):

> Guardar y consultar los datos del negocio sí es una necesidad ("database") cuando el
> pedido lo pide, con esas u otras palabras, aunque no nombre una base de datos. Por
> ejemplo, en "una lavandería quiere tener a mano qué prendas dejó cada cliente y cuándo
> las retiró", la necesidad es una base de datos; en "una lavandería quiere avisarles a
> sus clientes cuando la ropa esté lista", no: la necesidad es enviar avisos.

Se escribió antes de ver los casos nuevos, sin palabras ni negocios de ningún conjunto.

## Cómo se midió

- Casos nuevos `detection`: 25 pedidos escritos por otro modelo de lenguaje sin ver el
  catálogo; 14 piden guardar datos y 11 no.
- Solo el paso de entender (`run_understand_eval`, Gemini, 3 corridas), antes (`7cb2700`)
  y después (`027122d`), en `detection`, `business`, `records`, `validation`, `holdout` y
  `abstention`. Las corridas con error del proveedor (1 en `holdout` y 1 en `abstention`,
  en cada versión) no cuentan.
- Regla escrita antes de correr: **gana** si en `detection` la base de datos se detecta
  más que el ruido (la peor corrida de después supera a la mejor de antes); en los 11
  pedidos sin base de datos, como mucho 1 pedido más con base de datos de más; **sin
  regresión** en los 6 conjuntos: necesidades detectadas (la mejor corrida de después
  llega a la peor de antes) y necesidades de más (la mejor de después no supera a la peor
  de antes).

## Resultados (por corrida)

| | Antes | Después | Regla |
|---|---|---|---|
| `detection`: base de datos detectada | 12 · 11 · 12 de 14 | **14 · 14 · 14 de 14** | gana |
| `detection`: base de datos de más (pedidos sin ella) | 0 · 0 · 0 de 11 | 1 · 1 · 1 de 11 | dentro del margen |
| `business`: base de datos detectada (dato) | 2 · 2 · 1 de 7 | 7 · 7 · 7 de 7 | dato |
| `business`: necesidades de más | 0 · 0 · 0 de 25 | 1 · 1 · 1 de 25 | **regresión** |
| `holdout`: necesidades de más | 2 · 3 · 3 de 17–19 | 5 · 5 · 4 de 17–19 | **regresión** |
| Resto (detectadas y de más en los 6 conjuntos) | | | sin regresión |

**Decisión: no se integra.**

Las bases de datos de más aparecen en las 3 corridas en cuatro pedidos: dos dicen
"registrar" ("los profesores registren la asistencia"; "recursos humanos la registra") y
sus etiquetas no cuentan una base de datos; los otros dos son de más claros ("publicar
información sobre los cursos"; "consultar los encargos asignados").

## Qué se aprendió (y se aplicó en el reemplazo)

- El criterio de las etiquetas no era uniforme: "registrar datos del negocio" contaba como
  base de datos en unos conjuntos y en otros no. Desde el 11-nov los conjuntos de desarrollo
  siguen [`LABEL_CRITERIA.md`](LABEL_CRITERIA.md).
- Los pedidos de `detection` dicen sobre todo "registrar" o "guardar" y ya se detectaban en
  un 83 %; las formas difíciles ("llevar", "controlar", "organizar") están en `business`. El
  banco de ejemplos y los casos nuevos del reemplazo se pidieron con esa variedad.
- Una frase fija no escala: cada tipo de necesidad difícil pediría otra. Ejemplos elegidos
  por parecido con el pedido crecen con un banco de pedidos etiquetados.
- Con cero casos de más en la línea base, uno solo parece una regresión: el reemplazo fijó
  el margen antes de medir.

Reportes: `results/understand-2026-11-10-0234-detection-gemini.md`, `…-0236-business-…`,
`…-0241-records-…`, `…-0244-validation-…`, `…-0248-holdout-…`, `…-0250-abstention-…`
(antes) y `…-0323-detection-…`, `…-0325-business-…`, `…-0330-records-…`,
`…-0333-validation-…`, `…-0337-holdout-…`, `…-0341-abstention-…` (después). Como dato,
una corrida completa de `detection` con la frase: `results/assistant-2026-11-10-0312-detection-gemini.md`
(8 de 75 ejecuciones con tiempo agotado de Gemini al generar).

---

Versión anterior de este documento: [`DETECTION_DECISION.md` en `7830fd9`](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/7830fd98db22e59f2747b9187afdc66fcfb051e3/ai/eval/DETECTION_DECISION.md).
