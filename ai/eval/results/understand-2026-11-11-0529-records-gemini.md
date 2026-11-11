# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 05:29. 16 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.8 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 77% |
| Cobertura de necesidades | 87% |
| Necesidades inventadas | 0 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 3 |
| Consistencia entre corridas | 81% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/48 |
| Evidencia literal | 99% |
| Consultas de 3 a 8 palabras | 99% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.6 s |
| Tokens de entrada (mediana) | 2152 |
| Tokens de salida (mediana) | 159 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 16 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| ai | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| analytics | 10/12 · 10/12 · 9/12 | 0 · 0 · 0 |
| auth | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| automation | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| cms | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| data-processing | 3/5 · 2/5 · 2/5 | 0 · 0 · 0 |
| database | 11/12 · 10/12 · 10/12 | 0 · 0 · 0 |
| payments | 6/6 · 6/6 · 6/6 | 0 · 0 · 0 |
| search | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| **Todas** | 45/50 · 43/50 · 42/50 | 0 · 0 · 0 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `panaderia-pedidos` | analytics, database, payments | ✅✅✅ |
| `compra-cacao-productores` | analytics, data-processing, database | ✅❌❌ −analytics |
| `tortas-personalizadas` | communication, database, payments | ✅✅✅ |
| `limpieza-domiciliaria` | auth, automation, communication | ✅✅✅ |
| `lavado-detallado-motos` | auth, automation, communication | ✅✅✅ |
| `almuerzos-empresariales` | analytics, database, payments | ✅✅✅ |
| `miel-productos-colmena` | cms, communication, storage | ✅✅✅ |
| `mantenimiento-jardines` | analytics, data-processing, database, storage | ❌❌❌ −analytics −data-processing |
| `distribuidora-agua` | analytics, database, payments | ✅✅✅ |
| `alquiler-trajes-tipicos` | analytics, database, search | ✅✅✅ |
| `granja-produccion-huevos` | analytics, data-processing, database | ❌❌❌ −analytics −data-processing −database |
| `comercializadora-flores` | analytics, database, search | ✅✅✅ |
| `tienda-articulos-cuero` | analytics, payments, search | ✅✅✅ |
| `reparacion-maquinaria-agricola` | ai, analytics, database | ✅✅✅ |
| `parqueadero-bicicletas` | analytics, data-processing, database, payments | ❌❌❌ −analytics −data-processing −database |
| `salsas-conservas-artesanales` | analytics, data-processing, database | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `panaderia-pedidos`: **database** «almacenamiento y consulta de datos relacionales» ← “guardar los datos de mis clientes, los pedidos y el inventario de ingredientes en un mismo lugar”; **payments** «procesamiento de pagos en línea» ← “la gente pueda pagar sus encargos por internet”; **analytics** «analítica de ventas y reportes» ← “consultar un resumen de ventas por semana”
- `compra-cacao-productores`: **database** «registro y consulta de transacciones y calidad» ← “Quiero registrar cada compra con el productor, el peso, la calidad y la fecha, y consultar todo ese historial cuando lo necesite.”; **data-processing** «calculo automatico de totales por agrupacion» ← “necesito calcular automáticamente los totales por zona y por mes”; **analytics** «analisis de ventas por categoria» ← “ver cuáles calidades se venden más.”
- `tortas-personalizadas`: **database** «almacenamiento de historiales y preferencias» ← “Quiero conservar el historial de pedidos y las preferencias de cada cliente”; **payments** «cobros anticipados en línea» ← “necesito recibir pagos por adelantado”; **communication** «envío de notificaciones de confirmación» ← “mandar una confirmación cuando el pedido quede reservado”
- `limpieza-domiciliaria`: **automation** «asignacion automatica de tareas segun disponibilidad» ← “Quiero que el sistema asigne automáticamente los servicios del día según la disponibilidad de cada trabajador.”; **auth** «gestion de cuentas y permisos por rol» ← “necesito que cada empleado pueda entrar con su propia cuenta y consultar únicamente sus tareas”; **communication** «envio de recordatorios programados» ← “los clientes reciban un aviso el día anterior a la visita”
- `lavado-detallado-motos`: **auth** «gestion de permisos por roles de empleados» ← “que cada empleado vea únicamente los servicios que le asigno”; **communication** «envio de notificaciones a clientes» ← “que el cliente reciba un mensaje cuando su moto esté lista”; **automation** «automatizacion de creacion de tareas de trabajo» ← “al confirmar un servicio, se cree automáticamente una tarea para preparar el puesto de trabajo”
- `almuerzos-empresariales`: **database** «almacenamiento y consulta de pedidos» ← “registrar los menús solicitados por cada empresa y las cantidades entregadas cada día”; **analytics** «analítica de ventas por cliente» ← “ver cuánto vendí por cliente y por semana”; **payments** «cobros y pagos en línea» ← “permitir que las empresas paguen sus pedidos en línea”
- `miel-productos-colmena`: **cms** «gestion de contenido web autogestionable» ← “actualizar las descripciones, fotos y precios de mi página sin pedir ayuda cada vez”; **storage** «almacenamiento de archivos y documentos» ← “guardar los catálogos y las fichas de producto para descargarlos”; **communication** «envio de correo electronico transaccional» ← “responder por correo las preguntas de los compradores”
- `mantenimiento-jardines`: **database** «almacenamiento y consulta de registros» ← “Quiero registrar cada visita, los materiales utilizados y las observaciones de mis trabajadores.”; **data-processing** «procesamiento y cálculo de métricas» ← “calcular cuánto material se consume por tipo de jardín y comparar los costos entre meses”; **storage** «almacenamiento de archivos multimedia» ← “conservar fotos de los trabajos realizados”
- `distribuidora-agua`: **database** «almacenamiento de historiales y saldos» ← “historial de cada cliente, sus pedidos habituales y los saldos pendientes”; **payments** «procesamiento de pagos en línea» ← “permitir que los clientes paguen sus pedidos por internet”; **analytics** «analítica de ventas por zona» ← “mostrarme cuáles son las zonas con más ventas”
- `alquiler-trajes-tipicos`: **database** «almacenamiento de inventario y reservas» ← “llevar el control de cada prenda, su talla, estado y fechas en que está reservada”; **search** «búsqueda por atributos y filtros» ← “encontrar un traje buscando por talla, color o tipo de evento”; **analytics** «analítica de productos más alquilados» ← “conocer cuáles se alquilan más”
- `granja-produccion-huevos`: preguntas: ¿Qué tipo de dispositivo o interfaz prefieres usar para registrar la producción, como una aplicación web en computadora o una aplicación móvil? / ¿Te gustaría acceder al sistema desde cualquier lugar a través de internet o prefieres una solución que funcione localmente en tu granja? / ¿Cómo te gustaría recibir las alertas cuando la producción de un galpón baje de lo habitual?
- `comercializadora-flores`: **database** «almacenamiento y consulta de historial transaccional» ← “consultar el historial de compras y ventas”; **search** «búsqueda rápida por atributos específicos» ← “buscar rápidamente los arreglos por tipo de flor o color”; **analytics** «análisis comparativo de ingresos por producto» ← “comparar cuáles generan mejores ingresos”
- `tienda-articulos-cuero`: **search** «búsqueda con filtros de atributos» ← “encontrar productos por tipo, color y material”; **payments** «procesamiento de pagos en línea» ← “pagar directamente desde la página”; **analytics** «analítica de visitas y conversiones» ← “saber qué productos reciben más visitas y cuáles terminan en compra”
- `reparacion-maquinaria-agricola`: **database** «almacenamiento y consulta de registros» ← “Quiero guardar el historial de cada equipo, las reparaciones realizadas y los repuestos utilizados.”; **ai** «identificación de patrones en datos» ← “Me gustaría que el sistema identifique patrones de fallas frecuentes para ayudarme a anticipar qué revisiones conviene ofrecer”; **analytics** «analítica y reporte de uso» ← “ver los repuestos que más utilizo.”
- `parqueadero-bicicletas`: **database** «registro persistente de datos de usuarios y transacciones» ← “Quiero registrar las entradas, salidas, espacios ocupados y pagos de cada usuario.”; **analytics** «analisis de uso y metricas de ocupacion» ← “necesito calcular la ocupación por hora y conocer cuáles son las franjas de mayor demanda.”; **payments** «cobros en linea y gestion de suscripciones» ← “quiero cobrar los abonos mensuales en línea.”
- `salsas-conservas-artesanales`: **database** «almacenamiento de registros de inventario» ← “Quiero registrar los lotes, los ingredientes utilizados, las fechas de elaboración y los pedidos de cada tienda.”; **data-processing** «calculo automatico de produccion» ← “calcular automáticamente cuánto debo producir según los pedidos confirmados”; **analytics** «analisis de ventas por producto» ← “revisar qué sabores tienen más salida.”
