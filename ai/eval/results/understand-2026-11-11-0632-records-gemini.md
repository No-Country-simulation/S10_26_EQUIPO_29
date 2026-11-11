# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 06:32. 16 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 24.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 75% |
| Cobertura de necesidades | 92% |
| Necesidades inventadas | 1 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 88% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/48 |
| Evidencia literal | 99% |
| Consultas de 3 a 8 palabras | 99% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 2.4 s |
| Tokens de entrada (mediana) | 2582 |
| Tokens de salida (mediana) | 166 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 16 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| ai | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| analytics | 11/12 · 11/12 · 10/12 | 0 · 0 · 0 |
| auth | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| automation | 1/2 · 0/2 · 1/2 | 0 · 0 · 0 |
| cms | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| data-processing | 4/5 · 3/5 · 4/5 | 0 · 0 · 0 |
| database | 12/12 · 12/12 · 12/12 | 0 · 0 · 0 |
| messaging | 0/0 · 0/0 · 0/0 | 0 · 1 · 0 |
| payments | 6/6 · 6/6 · 6/6 | 0 · 0 · 0 |
| search | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| **Todas** | 47/50 · 45/50 · 46/50 | 0 · 1 · 0 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `panaderia-pedidos` | analytics, database, payments | ✅✅✅ |
| `compra-cacao-productores` | analytics, data-processing, database | ✅✅✅ |
| `tortas-personalizadas` | communication, database, payments | ✅✅✅ |
| `limpieza-domiciliaria` | auth, automation, communication | ❌❌❌ −automation |
| `lavado-detallado-motos` | auth, automation, communication | ✅❌✅ +messaging −automation |
| `almuerzos-empresariales` | analytics, database, payments | ✅✅✅ |
| `miel-productos-colmena` | cms, communication, storage | ✅✅✅ |
| `mantenimiento-jardines` | analytics, data-processing, database, storage | ❌❌❌ −analytics |
| `distribuidora-agua` | analytics, database, payments | ✅✅✅ |
| `alquiler-trajes-tipicos` | analytics, database, search | ✅✅✅ |
| `granja-produccion-huevos` | analytics, data-processing, database | ✅❌❌ −analytics −data-processing |
| `comercializadora-flores` | analytics, database, search | ✅✅✅ |
| `tienda-articulos-cuero` | analytics, payments, search | ✅✅✅ |
| `reparacion-maquinaria-agricola` | ai, analytics, database | ✅✅✅ |
| `parqueadero-bicicletas` | analytics, data-processing, database, payments | ❌❌❌ −data-processing |
| `salsas-conservas-artesanales` | analytics, data-processing, database | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `panaderia-pedidos`: **database** «almacenamiento de datos transaccionales» ← “Quiero guardar los datos de mis clientes, los pedidos y el inventario de ingredientes en un mismo lugar.”; **payments** «procesamiento de pagos en línea» ← “necesito que la gente pueda pagar sus encargos por internet”; **analytics** «generación de reportes de ventas» ← “consultar un resumen de ventas por semana”
- `compra-cacao-productores`: **database** «registro y consulta de historial de compras» ← “Quiero registrar cada compra con el productor, el peso, la calidad y la fecha, y consultar todo ese historial cuando lo necesite.”; **data-processing** «cálculo automático de totales por periodo y zona» ← “Necesito calcular automáticamente los totales por zona y por mes”; **analytics** «analítica de ventas por categorías de calidad» ← “ver cuáles calidades se venden más.”
- `tortas-personalizadas`: **database** «almacenamiento de historiales y preferencias» ← “Quiero conservar el historial de pedidos y las preferencias de cada cliente”; **payments** «procesamiento de pagos por adelantado» ← “necesito recibir pagos por adelantado”; **communication** «envío de confirmaciones de reserva» ← “mandar una confirmación cuando el pedido quede reservado”
- `limpieza-domiciliaria`: **auth** «gestión de identidad y permisos de usuario» ← “cada empleado pueda entrar con su propia cuenta y consultar únicamente sus tareas”; **communication** «envío de avisos y notificaciones» ← “los clientes reciban un aviso el día anterior a la visita”
- `lavado-detallado-motos`: **auth** «control de acceso por roles de usuario» ← “Quiero que cada empleado vea únicamente los servicios que le asigno”; **communication** «envío de notificaciones a clientes» ← “que el cliente reciba un mensaje cuando su moto esté lista”; **automation** «automatización de tareas operativas» ← “al confirmar un servicio, se cree automáticamente una tarea para preparar el puesto de trabajo”
- `almuerzos-empresariales`: **database** «registro y consulta de menús y entregas» ← “Quiero registrar los menús solicitados por cada empresa y las cantidades entregadas cada día.”; **analytics** «analítica de ventas por cliente y periodo» ← “Me gustaría ver cuánto vendí por cliente y por semana”; **payments** «procesamiento de pagos en línea» ← “permitir que las empresas paguen sus pedidos en línea”
- `miel-productos-colmena`: **cms** «gestion de contenido de la web» ← “Necesito actualizar las descripciones, fotos y precios de mi página sin pedir ayuda cada vez”; **storage** «almacenamiento de archivos y documentos» ← “guardar los catálogos y las fichas de producto para descargarlos cuando los envíe a tiendas”; **communication** «envio y recepcion de correos» ← “responder por correo las preguntas de los compradores”
- `mantenimiento-jardines`: **database** «registro y consulta de visitas de mantenimiento» ← “Quiero registrar cada visita, los materiales utilizados y las observaciones de mis trabajadores.”; **data-processing** «cálculo de consumo y costos por categoría» ← “calcular cuánto material se consume por tipo de jardín y comparar los costos entre meses”; **storage** «almacenamiento de imágenes de trabajos realizados» ← “conservar fotos de los trabajos realizados”
- `distribuidora-agua`: **database** «almacenamiento y consulta de historial de clientes y saldos» ← “Quiero tener el historial de cada cliente, sus pedidos habituales y los saldos pendientes.”; **payments** «cobros en linea para pedidos» ← “Me gustaría permitir que los clientes paguen sus pedidos por internet”; **analytics** «analisis de ventas por zona geografica» ← “mostrarme cuáles son las zonas con más ventas.”
- `alquiler-trajes-tipicos`: **database** «gestión y control de inventario y reservas» ← “Quiero llevar el control de cada prenda, su talla, estado y fechas en que está reservada”; **search** «búsqueda con filtros por atributos» ← “los clientes encuentren un traje buscando por talla, color o tipo de evento”; **analytics** «reportes de uso y popularidad» ← “conocer cuáles se alquilan más”
- `granja-produccion-huevos`: **database** «registro de producción diaria y entregas» ← “Quiero registrar la producción diaria por galpón, las unidades clasificadas y las entregas que hacemos.”; **data-processing** «cálculo automático de producción semanal» ← “El sistema debería sumar automáticamente la producción semanal”; **analytics** «detección de anomalías en producción» ← “mostrarme si algún galpón está produciendo menos que lo habitual.”
- `comercializadora-flores`: **database** «almacenamiento y consulta de registros comerciales» ← “Necesito consultar el historial de compras y ventas”; **search** «busqueda rapida de elementos por atributos» ← “buscar rápidamente los arreglos por tipo de flor o color”; **analytics** «analisis de ingresos y rendimiento comercial» ← “comparar cuáles generan mejores ingresos”
- `tienda-articulos-cuero`: **search** «búsqueda de productos por atributos» ← “Quiero que los compradores puedan encontrar productos por tipo, color y material”; **payments** «procesamiento de pagos en línea» ← “que puedan pagar directamente desde la página”; **analytics** «analítica de tráfico y conversiones» ← “Necesito saber qué productos reciben más visitas y cuáles terminan en compra”
- `reparacion-maquinaria-agricola`: **database** «almacenamiento de registros historicos de equipos» ← “Quiero guardar el historial de cada equipo, las reparaciones realizadas y los repuestos utilizados.”; **ai** «analisis predictivo de patrones de fallas» ← “el sistema identifique patrones de fallas frecuentes para ayudarme a anticipar qué revisiones conviene ofrecer”; **analytics** «reportes estadisticos de uso de componentes» ← “ver los repuestos que más utilizo”
- `parqueadero-bicicletas`: **database** «registro de entradas y salidas de usuarios» ← “registrar las entradas, salidas, espacios ocupados y pagos de cada usuario”; **analytics** «analisis de demanda por franjas horarias» ← “calcular la ocupación por hora y conocer cuáles son las franjas de mayor demanda”; **payments** «cobros de abonos mensuales en linea» ← “cobrar los abonos mensuales en línea”
- `salsas-conservas-artesanales`: **database** «almacenamiento y consulta de registros» ← “Quiero registrar los lotes, los ingredientes utilizados, las fechas de elaboración y los pedidos de cada tienda”; **data-processing** «cálculo automático de producción» ← “Necesito calcular automáticamente cuánto debo producir según los pedidos confirmados”; **analytics** «analítica de ventas y popularidad» ← “revisar qué sabores tienen más salida”
