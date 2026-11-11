# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 06:25. 8 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 21.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 38% |
| Cobertura de necesidades | 82% |
| Necesidades inventadas | 2 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 75% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/24 |
| Evidencia literal | 100% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.6 s |
| Tokens de entrada (mediana) | 2544 |
| Tokens de salida (mediana) | 164 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| ai | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| analytics | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| auth | 3/6 · 3/6 · 3/6 | 0 · 0 · 0 |
| cache | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| cms | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| communication | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| database | 5/7 · 6/7 · 5/7 | 0 · 0 · 0 |
| messaging | 0/0 · 0/0 · 0/0 | 0 · 1 · 1 |
| payments | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| search | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| storage | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| **Todas** | 26/32 · 27/32 · 26/32 | 0 · 1 · 1 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `clinica-veterinaria` | auth, communication, database, search | ✅✅✅ |
| `escuela-idiomas` | ai, analytics, auth, database | ✅✅✅ |
| `tienda-repuestos` | cache, database, payments, search | ✅✅✅ |
| `agencia-turismo` | communication, database, payments, storage | ❌❌❌ −database |
| `coworking` | analytics, auth, communication, database | ❌❌❌ +messaging −auth −database |
| `taller-restauracion` | auth, database, search, storage | ❌❌❌ −auth −database |
| `academia-musica` | analytics, auth, cms, storage | ❌❌❌ −cms |
| `alquiler-equipos` | ai, auth, database, storage | ❌❌❌ −auth |

## Para revisar a mano (corrida 1)

### gemini

- `clinica-veterinaria`: **database** «almacenamiento de historiales y registros médicos» ← “llevar un historial de las mascotas y sus dueños”; **auth** «control de acceso basado en roles» ← “cada empleado pueda consultar únicamente la información que le corresponde según su cargo”; **search** «búsqueda rápida de registros médicos» ← “los dueños puedan encontrar rápidamente los registros de vacunación y tratamientos anteriores de sus mascotas”; **communication** «envío de recordatorios automáticos» ← “enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación”
- `escuela-idiomas`: **database** «almacenamiento y consulta de datos estudiantiles» ← “organizar las inscripciones y los datos de mis estudiantes”; **auth** «control de acceso por roles docentes» ← “cada profesor pueda acceder a sus grupos sin consultar información de otros cursos”; **ai** «generación automática de recomendaciones basadas en pruebas» ← “recibir una recomendación automática del curso más adecuado”; **analytics** «medición de conversión de estudiantes» ← “medir cuántos estudiantes pasan de una prueba inicial a una inscripción”
- `tienda-repuestos`: **database** «control de inventario y existencias» ← “quiero controlar las existencias de cada referencia”; **search** «búsqueda avanzada de texto» ← “Necesito encontrar productos por su descripción, compatibilidad y características, incluso cuando no conozco el nombre exacto”; **payments** «procesamiento de pagos en línea» ← “Quiero que las ventas por internet se cobren antes de preparar cada pedido”; **cache** «optimización de consultas frecuentes» ← “necesito que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados”
- `agencia-turismo`: **storage** «almacenamiento de archivos y documentos» ← “Necesito guardar fotografías, documentos y autorizaciones de cada reserva.”; **payments** «procesamiento de pagos en línea» ← “Quiero que los clientes puedan pagar por adelantado desde cualquier lugar.”; **communication** «envío de mensajes transaccionales» ← “Cuando se confirme una reserva, quiero que el cliente reciba un mensaje con los detalles del viaje y los documentos necesarios.”
- `coworking`: **analytics** «identificar demanda y horarios vacios» ← “Quiero identificar qué salas tienen mayor demanda y en qué horarios se quedan vacías.”; **communication** «envio de avisos de reservas» ← “que los miembros reciban un aviso cuando se acerque su horario reservado.”
- `taller-restauracion`: **storage** «almacenamiento y gestión de archivos y fotos» ← “Necesito conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia de cada mueble”; **database** «gestión de expedientes y registros estructurados» ← “Quiero que mis trabajadores puedan consultar los expedientes según el proyecto que tengan asignado”; **search** «búsqueda de texto completo y filtros» ← “También necesito encontrar piezas por su época, material o procedencia”
- `academia-musica`: **storage** «almacenamiento y descarga de archivos» ← “los alumnos puedan consultar las partituras y grabaciones correspondientes a sus clases”; **auth** «control de permisos por grupos» ← “cada profesor pueda actualizar únicamente los materiales de sus propios grupos”; **analytics** «analítica de consultas de contenido» ← “saber cuáles son los cursos y materiales que reciben más consultas”
- `alquiler-equipos`: **database** «control de disponibilidad de equipos y contratos» ← “controlar qué equipos tengo disponibles y cuáles están alquilados. Necesito conservar los contratos firmados”; **storage** «almacenamiento de fotografias de equipos» ← “fotografías del estado de cada equipo antes y después de cada alquiler”; **ai** «analisis de imagenes para deteccion de daños» ← “genere automáticamente un informe de daños cuando las fotografías de devolución muestren diferencias importantes”
