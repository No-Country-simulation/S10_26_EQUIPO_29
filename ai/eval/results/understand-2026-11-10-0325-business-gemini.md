# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 03:25. 8 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.2 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 62% |
| Cobertura de necesidades | 90% |
| Necesidades inventadas | 3 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 62% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/24 |
| Evidencia literal | 99% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.3 s |
| Tiempo (peor caso) | 1.9 s |
| Tokens de entrada (mediana) | 2272 |
| Tokens de salida (mediana) | 214 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `clinica-veterinaria` | auth, communication, database, search | ✅✅✅ |
| `escuela-idiomas` | ai, analytics, auth, database | ✅✅✅ |
| `tienda-repuestos` | cache, database, payments, search | ✅✅✅ |
| `agencia-turismo` | communication, database, payments, storage | ✅✅✅ |
| `coworking` | analytics, auth, communication, database | ❌✅✅ −auth |
| `taller-restauracion` | auth, database, search, storage | ❌❌❌ −auth |
| `academia-musica` | analytics, auth, cms, storage | ❌❌❌ +database −cms −storage |
| `alquiler-equipos` | ai, auth, database, storage | ❌✅❌ −auth |

## Para revisar a mano (corrida 1)

### gemini

- `clinica-veterinaria`: **database** «almacenamiento de registros de pacientes» ← “llevar un historial de las mascotas y sus dueños”; **auth** «control de acceso basado en roles» ← “que cada empleado pueda consultar únicamente la información que le corresponde según su cargo”; **search** «búsqueda rápida de registros médicos» ← “encontrar rápidamente los registros de vacunación y tratamientos anteriores”; **communication** «envío de recordatorios automáticos» ← “enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación”
- `escuela-idiomas`: **database** «almacenamiento y consulta de datos de estudiantes» ← “organizar las inscripciones y los datos de mis estudiantes”; **auth** «control de acceso por roles y permisos» ← “que cada profesor pueda acceder a sus grupos sin consultar información de otros cursos”; **ai** «generación de recomendaciones automáticas de cursos» ← “recibir una recomendación automática del curso más adecuado”; **analytics** «medición de conversión y embudos de inscripción» ← “medir cuántos estudiantes pasan de una prueba inicial a una inscripción”
- `tienda-repuestos`: **database** «control de inventario de referencias» ← “controlar las existencias de cada referencia”; **search** «búsqueda avanzada por descripción y compatibilidad» ← “encontrar productos por su descripción, compatibilidad y características, incluso cuando no conozco el nombre exacto”; **payments** «cobro en línea antes de despachar» ← “las ventas por internet se cobren antes de preparar cada pedido”; **cache** «almacenamiento temporal para consultas frecuentes» ← “que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados”
- `agencia-turismo`: **database** «almacenamiento de reservas y cupos» ← “guardar fotografías, documentos y autorizaciones de cada reserva”; **payments** «pasarela de pagos en línea» ← “Quiero que los clientes puedan pagar por adelantado desde cualquier lugar”; **communication** «envío de mensajes transaccionales» ← “quiero que el cliente reciba un mensaje con los detalles del viaje”; **storage** «almacenamiento de archivos y documentos» ← “guardar fotografías, documentos y autorizaciones”
- `coworking`: **database** «almacenamiento de reservas y planes de miembros» ← “controlar las reservas de salas y puestos de trabajo. Necesito que los miembros puedan reservar únicamente los espacios incluidos en su plan”; **analytics** «analítica de uso y ocupación de espacios» ← “identificar qué salas tienen mayor demanda y en qué horarios se quedan vacías”; **communication** «envío de notificaciones y avisos automáticos» ← “los miembros reciban un aviso cuando se acerque su horario reservado”
- `taller-restauracion`: **database** «almacenamiento y consulta de expedientes» ← “documentar cada pieza desde que llega hasta que se entrega. [...] consultar los expedientes según el proyecto”; **storage** «almacenamiento de archivos multimedia y documentos» ← “conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia”; **search** «búsqueda avanzada de registros por atributos» ← “encontrar piezas por su época, material o procedencia”
- `academia-musica`: **database** «almacenamiento y consulta de datos del negocio» ← “publicar información sobre los cursos, profesores y horarios disponibles. Necesito que los alumnos puedan consultar las partituras y grabaciones”; **auth** «control de acceso y permisos por roles» ← “que cada profesor pueda actualizar únicamente los materiales de sus propios grupos”; **analytics** «analítica de uso y consultas de contenido» ← “saber cuáles son los cursos y materiales que reciben más consultas”
- `alquiler-equipos`: **database** «registro y consulta de inventario y contratos» ← “controlar qué equipos tengo disponibles y cuáles están alquilados. Necesito conservar los contratos firmados”; **storage** «almacenamiento de archivos multimedia y documentos» ← “fotografías del estado de cada equipo antes y después de cada alquiler”; **ai** «análisis de imágenes para detección de daños» ← “genere automáticamente un informe de daños cuando las fotografías de devolución muestren diferencias importantes”
