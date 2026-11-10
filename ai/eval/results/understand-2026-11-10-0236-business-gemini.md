# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 02:36. 8 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 17% |
| Cobertura de necesidades | 72% |
| Necesidades inventadas | 0 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 88% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/24 |
| Evidencia literal | 97% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.6 s |
| Tokens de entrada (mediana) | 2168 |
| Tokens de salida (mediana) | 156 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `clinica-veterinaria` | auth, communication, database, search | ✅✅✅ |
| `escuela-idiomas` | ai, analytics, auth, database | ❌❌❌ −database |
| `tienda-repuestos` | cache, database, payments, search | ❌❌❌ −database |
| `agencia-turismo` | communication, database, payments, storage | ❌❌❌ −database |
| `coworking` | analytics, auth, communication, database | ❌❌❌ −auth −database |
| `taller-restauracion` | auth, database, search, storage | ❌❌❌ −auth −database |
| `academia-musica` | analytics, auth, cms, storage | ❌❌❌ −cms |
| `alquiler-equipos` | ai, auth, database, storage | ❌✅❌ −auth −database |

## Para revisar a mano (corrida 1)

### gemini

- `clinica-veterinaria`: **database** «almacenamiento de historiales de mascotas y dueños» ← “llevar un historial de las mascotas y sus dueños”; **auth** «control de acceso basado en roles» ← “cada empleado pueda consultar únicamente la información que le corresponde según su cargo”; **search** «búsqueda rápida de registros médicos» ← “los dueños puedan encontrar rápidamente los registros de vacunación y tratamientos anteriores de sus mascotas”; **communication** «envío de recordatorios automáticos de vacunación» ← “enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación”
- `escuela-idiomas`: **auth** «control de acceso por roles» ← “cada profesor pueda acceder a sus grupos sin consultar información de otros cursos”; **ai** «recomendación automática basada en modelos» ← “recibir una recomendación automática del curso más adecuado”; **analytics** «medición de conversión y embudos» ← “medir cuántos estudiantes pasan de una prueba inicial a una inscripción”
- `tienda-repuestos`: **search** «búsqueda avanzada de texto y características» ← “encontrar productos por su descripción, compatibilidad y características, incluso cuando no conozco el nombre exacto”; **payments** «procesamiento de pagos en línea» ← “las ventas por internet se cobren antes de preparar cada pedido”; **cache** «caché en memoria para alta concurrencia» ← “los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados”
- `agencia-turismo`: **storage** «almacenamiento de archivos y documentos» ← “guardar fotografías, documentos y autorizaciones de cada reserva”; **payments** «pasarela de pagos en línea» ← “pagar por adelantado desde cualquier lugar”; **communication** «envío de mensajes transaccionales» ← “el cliente reciba un mensaje con los detalles del viaje”
- `coworking`: **analytics** «analitica de uso de espacios» ← “Quiero identificar qué salas tienen mayor demanda y en qué horarios se quedan vacías.”; **communication** «envio de notificaciones de reservas» ← “los miembros reciban un aviso cuando se acerque su horario reservado.”
- `taller-restauracion`: **storage** «almacenamiento de fotografías y documentos» ← “conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia de cada mueble”; **search** «búsqueda avanzada de piezas» ← “encontrar piezas por su época, material o procedencia”
- `academia-musica`: **storage** «almacenamiento de partituras y grabaciones» ← “consultar las partituras y grabaciones correspondientes a sus clases”; **auth** «control de acceso por roles» ← “cada profesor pueda actualizar únicamente los materiales de sus propios grupos”; **analytics** «analítica de consultas de cursos» ← “saber cuáles son los cursos y materiales que reciben más consultas”
- `alquiler-equipos`: **database** «almacenamiento de registros de inventario y contratos» ← “controlar qué equipos tengo disponibles y cuáles están alquilados. Necesito conservar los contratos firmados”; **storage** «almacenamiento de archivos de imágenes y documentos» ← “fotografías del estado de cada equipo antes y después de cada alquiler”; **ai** «análisis visual automático de diferencias en imágenes» ← “genere automáticamente un informe de daños cuando las fotografías de devolución muestren diferencias importantes”
