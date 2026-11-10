# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 03:30. 16 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 69% |
| Cobertura de necesidades | 88% |
| Necesidades inventadas | 4 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 81% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/48 |
| Evidencia literal | 100% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.5 s |
| Tokens de entrada (mediana) | 2256 |
| Tokens de salida (mediana) | 165 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 16 casos; los porcentajes no son estadística firme.

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `panaderia-pedidos` | analytics, database, payments | ✅✅✅ |
| `compra-cacao-productores` | analytics, data-processing, database | ❌❌✅ −analytics |
| `tortas-personalizadas` | communication, database, payments | ✅✅✅ |
| `limpieza-domiciliaria` | auth, automation, communication | ✅❌✅ +backend −automation |
| `lavado-detallado-motos` | auth, automation, communication | ❌❌❌ +messaging −automation |
| `almuerzos-empresariales` | analytics, database, payments | ✅✅✅ |
| `miel-productos-colmena` | cms, communication, storage | ✅✅✅ |
| `mantenimiento-jardines` | analytics, data-processing, database, storage | ❌❌❌ −analytics |
| `distribuidora-agua` | analytics, database, payments | ✅✅✅ |
| `alquiler-trajes-tipicos` | analytics, database, search | ✅✅✅ |
| `granja-produccion-huevos` | analytics, data-processing, database | ❌❌❌ −analytics −data-processing |
| `comercializadora-flores` | analytics, database, search | ✅✅✅ |
| `tienda-articulos-cuero` | analytics, payments, search | ✅✅✅ |
| `reparacion-maquinaria-agricola` | ai, analytics, database | ✅✅✅ |
| `parqueadero-bicicletas` | analytics, data-processing, database, payments | ❌❌❌ −analytics −data-processing |
| `salsas-conservas-artesanales` | analytics, data-processing, database | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `panaderia-pedidos`: **database** «almacenamiento y consulta de datos» ← “Quiero guardar los datos de mis clientes, los pedidos y el inventario de ingredientes en un mismo lugar.”; **payments** «procesamiento de pagos en línea» ← “También necesito que la gente pueda pagar sus encargos por internet”; **analytics** «analítica de ventas y reportes» ← “consultar un resumen de ventas por semana.”
- `compra-cacao-productores`: **database** «almacenamiento y consulta de historial» ← “Quiero registrar cada compra con el productor, el peso, la calidad y la fecha, y consultar todo ese historial cuando lo necesite.”; **data-processing** «calculo automatico de totales» ← “Necesito calcular automáticamente los totales por zona y por mes, y ver cuáles calidades se venden más.”
- `tortas-personalizadas`: **database** «almacenamiento y consulta de historial de pedidos» ← “Quiero conservar el historial de pedidos y las preferencias de cada cliente”; **payments** «procesamiento de pagos por adelantado» ← “recibir pagos por adelantado”; **communication** «envío de confirmaciones de reserva» ← “mandar una confirmación cuando el pedido quede reservado”
- `limpieza-domiciliaria`: **automation** «asignacion automatica de tareas segun disponibilidad» ← “Quiero que el sistema asigne automáticamente los servicios del día según la disponibilidad de cada trabajador.”; **auth** «autenticacion y control de acceso por roles» ← “necesito que cada empleado pueda entrar con su propia cuenta y consultar únicamente sus tareas”; **communication** «envio de recordatorios programados a clientes» ← “que los clientes reciban un aviso el día anterior a la visita.”
- `lavado-detallado-motos`: **auth** «control de accesos y permisos por rol» ← “Quiero que cada empleado vea únicamente los servicios que le asigno”; **communication** «envío de notificaciones a clientes» ← “que el cliente reciba un mensaje cuando su moto esté lista”; **messaging** «creación automatizada de tareas en segundo plano» ← “al confirmar un servicio, se cree automáticamente una tarea para preparar el puesto de trabajo”
- `almuerzos-empresariales`: **database** «registro y consulta de pedidos» ← “registrar los menús solicitados por cada empresa y las cantidades entregadas cada día”; **analytics** «analítica de ventas por cliente y periodo» ← “ver cuánto vendí por cliente y por semana”; **payments** «cobros y pagos en línea» ← “permitir que las empresas paguen sus pedidos en línea”
- `miel-productos-colmena`: **cms** «gestión de contenido y catálogo de productos» ← “actualizar las descripciones, fotos y precios de mi página sin pedir ayuda cada vez”; **storage** «almacenamiento y descarga de archivos de documentos» ← “guardar los catálogos y las fichas de producto para descargarlos cuando los envíe a tiendas”; **communication** «envío de correo electrónico para atención» ← “responder por correo las preguntas de los compradores”
- `mantenimiento-jardines`: **database** «registro y consulta de datos operativos» ← “Quiero registrar cada visita, los materiales utilizados y las observaciones de mis trabajadores.”; **data-processing** «procesamiento y cálculo de consumos y costos» ← “calcular cuánto material se consume por tipo de jardín y comparar los costos entre meses”; **storage** «almacenamiento de archivos y fotos» ← “conservar fotos de los trabajos realizados”
- `distribuidora-agua`: **database** «almacenamiento de registros de clientes e historial» ← “Quiero tener el historial de cada cliente, sus pedidos habituales y los saldos pendientes.”; **payments** «procesamiento de pagos en línea» ← “Me gustaría permitir que los clientes paguen sus pedidos por internet”; **analytics** «analítica de ventas por zonas geográficas» ← “mostrarme cuáles son las zonas con más ventas”
- `alquiler-trajes-tipicos`: **database** «registro y control de inventario de prendas» ← “llevar el control de cada prenda, su talla, estado y fechas en que está reservada”; **search** «búsqueda avanzada de prendas por filtros» ← “los clientes encuentren un traje buscando por talla, color o tipo de evento”; **analytics** «reportes de uso y popularidad de prendas» ← “conocer cuáles se alquilan más”
- `granja-produccion-huevos`: **database** «almacenamiento de registros de producción y entregas» ← “Quiero registrar la producción diaria por galpón, las unidades clasificadas y las entregas que hacemos.”
- `comercializadora-flores`: **database** «almacenamiento y consulta de historial comercial» ← “consultar el historial de compras y ventas”; **search** «búsqueda rápida de productos por atributos» ← “buscar rápidamente los arreglos por tipo de flor o color”; **analytics** «analítica de ingresos y rentabilidad de productos» ← “comparar cuáles generan mejores ingresos”
- `tienda-articulos-cuero`: **search** «búsqueda de productos por atributos» ← “encontrar productos por tipo, color y material”; **payments** «cobros y pagos en línea» ← “pagar directamente desde la página”; **analytics** «analítica de visitas y conversiones» ← “saber qué productos reciben más visitas y cuáles terminan en compra”
- `reparacion-maquinaria-agricola`: **database** «almacenamiento y consulta de historiales de equipos» ← “Quiero guardar el historial de cada equipo, las reparaciones realizadas y los repuestos utilizados.”; **ai** «identificación de patrones en datos» ← “Me gustaría que el sistema identifique patrones de fallas frecuentes para ayudarme a anticipar qué revisiones conviene ofrecer”; **analytics** «analítica de uso de repuestos» ← “ver los repuestos que más utilizo.”
- `parqueadero-bicicletas`: **database** «registro de entradas y salidas de usuarios» ← “Quiero registrar las entradas, salidas, espacios ocupados y pagos de cada usuario.”; **payments** «cobro de abonos en línea» ← “quiero cobrar los abonos mensuales en línea.”; **analytics** «analítica de ocupación y demanda horaria» ← “calcular la ocupación por hora y conocer cuáles son las franjas de mayor demanda.”
- `salsas-conservas-artesanales`: **database** «almacenamiento de registros y pedidos» ← “registrar los lotes, los ingredientes utilizados, las fechas de elaboración y los pedidos de cada tienda”; **data-processing** «calculo automatico de produccion» ← “calcular automáticamente cuánto debo producir según los pedidos confirmados”; **analytics** «analisis de ventas por sabor» ← “revisar qué sabores tienen más salida”
