# Casos de prueba del asistente

Pedidos de negocio fijos con lo que el asistente **debería** responder. Sirven
para elegir el modelo de lenguaje y para medir el asistente cada vez que cambia.
Se escriben antes de mirar lo que responde el asistente o la búsqueda.

Archivos: `assistant_cases.json` (los casos de siempre), `assistant_cases_validation.json`,
`assistant_cases_holdout.json`, `assistant_cases_business.json` y
`assistant_cases_abstention.json` (ver abajo), y `assistant_cases.py` (esquema y carga).
Tests: `ai/tests/test_assistant_cases.py`, sin base de datos ni modelo.

## Qué tiene un caso

| Campo | Qué es |
|---|---|
| `query` | El pedido, tal como lo escribiría un usuario (20–2000 caracteres, como en el contrato) |
| `expected_status` | `ok`, `needs_clarification` o `no_evidence` |
| `needs` | Necesidades que el asistente debería detectar, cada una con sus repos aceptables |
| `quick_set` | Marca los 5 casos que se usan para comparar modelos rápido |
| `note` | Qué prueba el caso |

Dos capas:

1. **Necesidades esperadas:** ids de `shared/contracts/categories.json`. Dependen
   solo del pedido, no del catálogo.
2. **Repos aceptables por necesidad:** dependen del catálogo actual. Una lista
   **vacía** significa que el catálogo no cubre esa necesidad: la respuesta
   debería mencionarlo en `limitations`, sin caja para ella.

## Reglas para escribirlos

- **Necesidad esperada** = la que el pedido dice, con esas u otras palabras.
  Lo que tiene cualquier software (pantallas, servidor) es la caja "tu app".
  Lo deseable pero no pedido puede ir en `assumptions` y no se evalúa como
  necesidad. Si el asistente detecta necesidades de más, no resta.
- **Repo aceptable** = su descripción, topics o README muestran esa necesidad
  como propósito principal. De 0 a 5 por necesidad (los candidatos que ve el
  modelo), con la evidencia en `note`.
- Los repos aceptables se eligen **leyendo los datos del catálogo, no con la
  búsqueda**: si se copian sus resultados, la evaluación compara la búsqueda
  consigo misma.
- Licencia `NOASSERTION` (GitHub no la identificó): el repo es aceptable solo si
  su README o su archivo de licencia (LICENSE, COPYRIGHT) muestra una licencia
  abierta, citada en `note`. Nunca un repo archivado.
- `expected_status` sigue una regla, y el esquema la comprueba:
  sin necesidades → `needs_clarification`; con necesidades pero ninguna con
  repos → `no_evidence`; al menos una con repos → `ok`.

## Qué hay (versión 2, 19 casos)

| Grupo | Casos | Qué prueba |
|---|---|---|
| Negocios | 6 | Pedidos de 3–4 necesidades |
| Textos de la pantalla del asistente | 8 | Los ejemplos que ve el usuario; tres pares de versión corta y larga del mismo pedido |
| Una sola necesidad | 3 | Mapa pequeño (`ok`) y sin evidencia (`no_evidence`) |
| Vagos | 2 | Sin necesidades → preguntas (`needs_clarification`) |

Resultado esperado con el catálogo de 127 repos: 16 `ok`, 1 `no_evidence`, 2 `needs_clarification`.
Casi todas sus necesidades tienen herramienta: la abstención se mide sobre todo con
los casos de abstención (abajo).

En los pares corto/largo, las necesidades del pedido largo contienen las del
corto: el asistente debería responder de forma coherente a los dos.

## Casos de validación (10 casos)

Los 18 casos de arriba se usan para mirar fallos y ajustar los prompts: mejorar en ellos no
prueba que una regla nueva sirva. Para eso hay un archivo aparte,
`assistant_cases_validation.json`, con el mismo esquema y estas reglas:

- Se escriben **antes** de cambiar el prompt, desde las políticas generales, en negocios
  distintos a los de la base.
- **No se usan para afinar el prompt.** Si se ajusta mirándolos, dejan de medir lo que el
  asistente hace con pedidos nuevos, y hacen falta otros.
- Primero se mide sin el cambio (línea base), con criterios de éxito escritos antes de ver
  los números; después, una sola ronda con el cambio.
- No comparten ids ni pedidos con la base (lo comprueba un test).

Los 5 primeros prueban que la aplicación que el usuario describe no se convierta en una
necesidad de frontend o backend, y que el asistente no proponga un candidato que solo se
parece a lo pedido. Los 5 siguientes prueban las limitaciones: necesidades sin herramientas
(que deben aparecer una sola vez) y tecnologías que el usuario nombra y no están entre los
candidatos (el asistente no puede afirmar qué hay en el catálogo completo).

Con el catálogo de 127 repos (versión 3), todas sus necesidades tienen herramienta:
ya no miden la abstención.

```bash
python -m ai.eval.run_understand_eval gemini --cases validation
python -m ai.eval.run_assistant_eval gemini --cases validation
```

## Casos reservados (12 casos)

`assistant_cases_holdout.json`, con el mismo esquema. Se escriben antes de
cambiar el prompt y se corren solo con la línea base y con la versión elegida,
una vez. Sus textos no se leen para ajustar; si se usan para afinar, hacen falta
otros. No comparten ids ni pedidos con los otros archivos (lo comprueba un test).

Se escribieron para probar la abstención: con el catálogo de 100 repos tenían 12
necesidades sin herramienta. Con el de 127 quedan 7 sin herramienta y 14 con
herramienta (para comprobar que el asistente no deja de recomendar lo que sí sirve).

```bash
python -m ai.eval.run_assistant_eval gemini --cases holdout
```

## Casos de negocios (8 casos)

`assistant_cases_business.json`. Pedidos de pequeños negocios escritos por otro
modelo de lenguaje sin ver el catálogo, filtrados con reglas fijas (sin editar
ningún pedido). Las etiquetas se pusieron después, con datos de GitHub.

```bash
python -m ai.eval.run_assistant_eval gemini --cases business
```

## Casos de abstención (8 casos)

`assistant_cases_abstention.json`. Cada pedido junta una necesidad parecida a algo
del catálogo pero no cubierta (videollamadas, base de grafos, red de distribución de
contenido, factura electrónica, aprobaciones entre personas, chat entre personas,
copias de seguridad automáticas, menciones en redes sociales) con otra que sí tiene
herramienta. Las dos métricas se leen juntas: que se abstenga donde no hay
herramienta y que siga recomendando donde sí la hay. Se escribieron conociendo el
catálogo, antes de ver respuestas del asistente con él: son de desarrollo.

```bash
python -m ai.eval.run_assistant_eval gemini --cases abstention
```

## Casos de registros y reportes (16 casos)

`assistant_cases_records.json`. Pedidos de pequeños negocios escritos por otro modelo
de lenguaje sin ver el catálogo, con el mismo procedimiento que la prueba final: 13 de
16 piden guardar registros del negocio, reportes sobre sus datos o cálculos sobre
ellos, y 3 no. Filtrados con reglas fijas, sin editar; etiquetas puestas después, con
datos de GitHub. Se escribieron para decidir un cambio en cómo se eligen los candidatos
de cada necesidad; después de esa decisión son de desarrollo.

```bash
python -m ai.eval.run_assistant_eval gemini --cases records
```

## Casos de detección (25 casos)

`assistant_cases_detection.json`. Pedidos de pequeños negocios escritos por otro modelo
de lenguaje sin ver el catálogo, en dos tandas con el mismo procedimiento: 14 piden
guardar o consultar los datos del negocio y 11 no (para ver si se agrega una base de
datos que nadie pidió). Filtrados con reglas fijas, sin editar; etiquetas puestas
después, con datos de GitHub. Se escribieron para decidir un cambio en cómo el paso de
entender detecta esas necesidades; después de esa decisión son de desarrollo.

```bash
python -m ai.eval.run_understand_eval gemini --cases detection
python -m ai.eval.run_assistant_eval gemini --cases detection
```

## Prueba final (16 casos)

`assistant_cases_test.json`. Pedidos de pequeños negocios escritos por otro modelo
de lenguaje sin ver el catálogo, filtrados con reglas fijas antes de leerlos y sin
editar; las etiquetas se pusieron después. Sus consultas de búsqueda
(`search_queries_catalog_test.json`) las escribió el paso de entender, una sola vez.

Se corre **una sola vez**, con la versión ya elegida; sus cifras son las que se
publican. Si se cambia algo mirando sus resultados, deja de ser prueba final y hacen
falta casos nuevos.

Con el catálogo de 127 repos, 2 de sus 61 necesidades no tienen herramienta: mide
sobre todo la recomendación. La abstención se mide con los casos de abstención.

```bash
python -m ai.eval.run_assistant_eval gemini --cases test
python -m ai.eval.run_search_eval --golden catalog-test
```

## Cómo escribir una prueba final nueva

Hace falta cuando una prueba final ya se usó para decidir algo, o cuando el catálogo
cambió tanto que sus pedidos ya no prueban lo importante.

1. En un chat nuevo de otro modelo de lenguaje, sin darle el catálogo, pedir 24 pedidos
   con este mensaje. Las categorías se copian de `shared/contracts/categories.json`
   (`id: description`, sin las notas); los negocios excluidos son los de los archivos
   de casos existentes.

   ```
   Necesito pedidos de prueba para un asistente que recomienda herramientas de software. Escribe 24 pedidos como los escribiría el dueño o la dueña de un negocio pequeño o mediano de Latinoamérica que no es técnico: en español, en primera persona, de 2 a 6 frases, describiendo su negocio y lo que quiere que haga el sistema.

   Reglas:
   - No nombres tecnologías, productos, marcas, lenguajes de programación ni herramientas.
   - Cada pedido tiene entre 2 y 5 necesidades. Etiqueta cada necesidad con uno de estos ids, según su definición:
     {categorías: una línea "id: descripción" por categoría}
   - Una necesidad es algo que el pedido dice que quiere, con esas u otras palabras. Lo que tiene cualquier aplicación (tener pantallas, una app o un servidor) no es una necesidad.
   - Para cada necesidad, copia la frase exacta del pedido que la expresa.
   - Varía los negocios, el largo de los pedidos y las necesidades.
   - No uses estos negocios: {negocios de los casos existentes}

   Formato, sin texto antes ni después:
   id: <negocio-en-minusculas-con-guiones>
   pedido: <texto>
   necesidades:
   - <id>: "<frase exacta>"

   Deja una línea en blanco entre pedidos.
   ```

2. Guardar la respuesta sin editar, con el modelo y la fecha.
3. Filtrar con reglas fijadas antes de leerla: de 20 a 2000 caracteres; de 2 a 5
   necesidades con ids válidos y sin repetir; la frase de cada necesidad, literal en el
   pedido; sin nombres de tecnologías; negocio fuera de la lista; la etiqueta corresponde
   a la definición (en duda, se descarta). Se toman los primeros 16 que pasan, en orden,
   sin editar ninguno.
4. Generar las consultas de búsqueda con el paso de entender, una sola vez, y guardarlas.
5. Etiquetar después, con evidencia de GitHub, revisando todo el catálogo para cada
   necesidad.

## Qué no se mide aquí

Los textos (título, resumen, roles, razones) y las conexiones: hay muchas
respuestas buenas distintas. Lo verificable es el `status`, qué necesidades
detectó y si cada repo elegido está entre los aceptables. De los textos solo se
cuentan, de forma automática, dos cosas: las necesidades sin herramienta que se
repiten en las limitaciones y los textos del modelo que hablan del catálogo. El
resto de la calidad del texto se revisa a mano.

## Cuando cambie el catálogo

`catalog_taken_at` guarda la fecha del snapshot (`ai/data/catalog/meta.json`)
con el que se escribieron los casos. Si el snapshot cambia, un test falla a
propósito. Entonces:

1. Listar los pares por juzgar con `python -m ai.eval.pool` (ver `README.md`).
2. Agregar repos aceptables solo con evidencia, con su `note`; revisar las notas
   de las necesidades que dejan de estar vacías.
3. Actualizar `catalog_taken_at`, subir `version` y recalcular `expected_status`.

Las necesidades esperadas (capa 1) no cambian con el catálogo.

## Cómo validarlos

```bash
python -m pytest ai/tests/test_assistant_cases.py -v
```
