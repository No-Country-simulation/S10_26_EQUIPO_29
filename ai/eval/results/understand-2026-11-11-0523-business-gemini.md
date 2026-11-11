# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 05:23. 8 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.8 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 8% |
| Cobertura de necesidades | 70% |
| Necesidades inventadas | 0 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 75% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/24 |
| Evidencia literal | 99% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.6 s |
| Tokens de entrada (mediana) | 2168 |
| Tokens de salida (mediana) | 162 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| ai | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| analytics | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| auth | 4/6 · 3/6 · 3/6 | 0 · 0 · 0 |
| cache | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| cms | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| communication | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| database | 2/7 · 1/7 · 0/7 | 0 · 0 · 0 |
| payments | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| search | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| storage | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| **Todas** | 24/32 · 22/32 · 21/32 | 0 · 0 · 0 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `clinica-veterinaria` | auth, communication, database, search | ✅❌❌ −database |
| `escuela-idiomas` | ai, analytics, auth, database | ❌❌❌ −database |
| `tienda-repuestos` | cache, database, payments, search | ❌❌❌ −database |
| `agencia-turismo` | communication, database, payments, storage | ❌❌❌ −database |
| `coworking` | analytics, auth, communication, database | ❌❌❌ −auth −database |
| `taller-restauracion` | auth, database, search, storage | ❌❌❌ −auth −database |
| `academia-musica` | analytics, auth, cms, storage | ❌❌❌ −cms |
| `alquiler-equipos` | ai, auth, database, storage | ✅❌❌ −auth −database |

## Para revisar a mano (corrida 1)

### gemini

- `clinica-veterinaria`: **database** «almacenamiento y consulta de registros clínicos» ← “llevar un historial de las mascotas y sus dueños”; **auth** «control de acceso basado en roles» ← “cada empleado pueda consultar únicamente la información que le corresponde según su cargo”; **search** «búsqueda rápida de registros médicos» ← “encontrar rápidamente los registros de vacunación y tratamientos anteriores”; **communication** «envío de recordatorios programados» ← “enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación”
- `escuela-idiomas`: **auth** «control de acceso basado en roles» ← “cada profesor pueda acceder a sus grupos sin consultar información de otros cursos”; **ai** «recomendación automática con modelos de lenguaje» ← “recibir una recomendación automática del curso más adecuado”; **analytics** «medición de embudos de conversión» ← “medir cuántos estudiantes pasan de una prueba inicial a una inscripción”
- `tienda-repuestos`: **search** «búsqueda avanzada de texto y características» ← “encontrar productos por su descripción, compatibilidad y características, incluso cuando no conozco el nombre exacto”; **payments** «procesamiento de pagos en línea» ← “las ventas por internet se cobren antes de preparar cada pedido”; **cache** «almacenamiento en caché de alta velocidad» ← “que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados”
- `agencia-turismo`: **storage** «almacenamiento de archivos y documentos» ← “guardar fotografías, documentos y autorizaciones de cada reserva”; **payments** «pasarela de pagos en línea» ← “los clientes puedan pagar por adelantado desde cualquier lugar”; **communication** «envío de mensajes de confirmación» ← “el cliente reciba un mensaje con los detalles del viaje y los documentos necesarios”
- `coworking`: **analytics** «identificación de demanda y horarios vacíos» ← “Quiero identificar qué salas tienen mayor demanda y en qué horarios se quedan vacías.”; **communication** «envío de avisos y notificaciones» ← “que los miembros reciban un aviso cuando se acerque su horario reservado.”
- `taller-restauracion`: **storage** «almacenamiento de archivos y documentos» ← “conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia de cada mueble”; **search** «búsqueda por atributos y metadatos» ← “encontrar piezas por su época, material o procedencia”
- `academia-musica`: **storage** «almacenamiento de partituras y grabaciones» ← “que los alumnos puedan consultar las partituras y grabaciones correspondientes a sus clases”; **auth** «control de acceso por roles» ← “que cada profesor pueda actualizar únicamente los materiales de sus propios grupos”; **analytics** «analítica de consultas de cursos y materiales» ← “saber cuáles son los cursos y materiales que reciben más consultas”
- `alquiler-equipos`: **database** «almacenamiento y consulta de datos relacionales» ← “controlar qué equipos tengo disponibles y cuáles están alquilados”; **storage** «almacenamiento de archivos y documentos» ← “conservar los contratos firmados y las fotografías del estado de cada equipo”; **ai** «analisis de imagenes para comparacion» ← “genere automáticamente un informe de daños cuando las fotografías de devolución muestren diferencias importantes”; **auth** «gestion de usuarios y permisos» ← “cada empleado pueda consultar los alquileres que tiene asignados”
