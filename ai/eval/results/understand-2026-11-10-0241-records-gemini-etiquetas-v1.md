# Evaluación del paso de entender

Re-puntuado con `--rescore` el 2026-11-11: respuestas del modelo guardadas en `understand-2026-11-10-0241-records-gemini.json`, etiquetas actuales de los casos. 16 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | — |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 71% |
| Cobertura de necesidades | 84% |
| Necesidades inventadas | 2 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 3 |
| Consistencia entre corridas | 69% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/48 |
| Evidencia literal | 100% |
| Consultas de 3 a 8 palabras | 99% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.5 s |
| Tokens de entrada (mediana) | 2152 |
| Tokens de salida (mediana) | 155 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 16 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| ai | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| analytics | 10/12 · 10/12 · 9/12 | 0 · 0 · 0 |
| auth | 1/2 · 1/2 · 1/2 | 0 · 0 · 0 |
| automation | 1/2 · 2/2 · 1/2 | 0 · 0 · 0 |
| cms | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| data-processing | 3/5 · 2/5 · 3/5 | 0 · 0 · 0 |
| database | 11/12 · 11/12 · 9/12 | 0 · 0 · 0 |
| messaging | 0/0 · 0/0 · 0/0 | 1 · 0 · 1 |
| payments | 6/6 · 6/6 · 6/6 | 0 · 0 · 0 |
| search | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| **Todas** | 43/50 · 43/50 · 40/50 | 1 · 0 · 1 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `panaderia-pedidos` | analytics, database, payments | ✅✅✅ |
| `compra-cacao-productores` | analytics, data-processing, database | ✅❌❌ −analytics |
| `tortas-personalizadas` | communication, database, payments | ✅✅✅ |
| `limpieza-domiciliaria` | auth, automation, communication | ✅✅✅ |
| `lavado-detallado-motos` | auth, automation, communication | ❌❌❌ +messaging −auth −automation |
| `almuerzos-empresariales` | analytics, database, payments | ✅✅❌ −database |
| `miel-productos-colmena` | cms, communication, storage | ✅✅✅ |
| `mantenimiento-jardines` | analytics, data-processing, database, storage | ❌❌✅ −data-processing |
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

- `panaderia-pedidos`: **database** «almacenamiento de datos estructurados» ← “Quiero guardar los datos de mis clientes, los pedidos y el inventario de ingredientes en un mismo lugar.”; **payments** «pasarela de pagos en linea» ← “necesito que la gente pueda pagar sus encargos por internet”; **analytics** «resumen de ventas y metricas» ← “consultar un resumen de ventas por semana”
- `compra-cacao-productores`: **database** «almacenamiento y consulta de registros» ← “Quiero registrar cada compra con el productor, el peso, la calidad y la fecha, y consultar todo ese historial cuando lo necesite.”; **data-processing** «calculo automatico de totales» ← “Necesito calcular automáticamente los totales por zona y por mes”; **analytics** «analisis de ventas por categoria» ← “ver cuáles calidades se venden más”
- `tortas-personalizadas`: **database** «almacenamiento de historiales y preferencias» ← “conservar el historial de pedidos y las preferencias de cada cliente”; **payments** «procesamiento de pagos por adelantado» ← “recibir pagos por adelantado”; **communication** «envío de confirmaciones de reserva» ← “mandar una confirmación cuando el pedido quede reservado”
- `limpieza-domiciliaria`: **automation** «asignación automática de tareas según disponibilidad» ← “Quiero que el sistema asigne automáticamente los servicios del día según la disponibilidad de cada trabajador.”; **auth** «autenticación de usuarios con roles y permisos» ← “necesito que cada empleado pueda entrar con su propia cuenta y consultar únicamente sus tareas”; **communication** «envío de recordatorios programados a clientes» ← “que los clientes reciban un aviso el día anterior a la visita”
- `lavado-detallado-motos`: **communication** «envío de notificaciones transaccionales» ← “que el cliente reciba un mensaje cuando su moto esté lista.”; **messaging** «creación automática de tareas internas» ← “se cree automáticamente una tarea para preparar el puesto de trabajo.”
- `almuerzos-empresariales`: **database** «registro persistente de datos del negocio» ← “Quiero registrar los menús solicitados por cada empresa y las cantidades entregadas cada día.”; **analytics** «reportes de ventas y métricas» ← “Me gustaría ver cuánto vendí por cliente y por semana”; **payments** «pasarela de cobros en línea» ← “permitir que las empresas paguen sus pedidos en línea.”
- `miel-productos-colmena`: **cms** «gestion de contenido y productos» ← “actualizar las descripciones, fotos y precios de mi página sin pedir ayuda cada vez”; **storage** «almacenamiento y descarga de archivos» ← “guardar los catálogos y las fichas de producto para descargarlos”; **communication** «envio de correos electronicos» ← “responder por correo las preguntas de los compradores”
- `mantenimiento-jardines`: **database** «registro persistente de visitas y materiales» ← “Quiero registrar cada visita, los materiales utilizados y las observaciones de mis trabajadores.”; **analytics** «comparativa de costos y consumo» ← “calcular cuánto material se consume por tipo de jardín y comparar los costos entre meses”; **storage** «almacenamiento de archivos fotográficos» ← “conservar fotos de los trabajos realizados”
- `distribuidora-agua`: **database** «almacenamiento de historiales de clientes» ← “Quiero tener el historial de cada cliente, sus pedidos habituales y los saldos pendientes.”; **payments** «procesamiento de pagos en línea» ← “Me gustaría permitir que los clientes paguen sus pedidos por internet”; **analytics** «analítica de ventas por zona» ← “mostrarme cuáles son las zonas con más ventas.”
- `alquiler-trajes-tipicos`: **database** «almacenamiento y consulta de inventario» ← “llevar el control de cada prenda, su talla, estado y fechas en que está reservada”; **search** «búsqueda por filtros y atributos» ← “encuentren un traje buscando por talla, color o tipo de evento”; **analytics** «reportes de uso y popularidad» ← “conocer cuáles se alquilan más”
- `granja-produccion-huevos`: preguntas: ±Qué tipo de dispositivo o interfaz prefieres para registrar la producci³n y ver los reportes (por ejemplo, una aplicaci³n web, una móvil o una planilla)? / ¿El sistema debe ser utilizado por mñltiples usuarios con diferentes roles (como administradores y trabajadores) o será de uso individual? / ¿Deseas que el sistema envíe alertas automáticas cuando un galpón reduzca su producci³n?
- `comercializadora-flores`: **database** «almacenamiento y consulta de historial de compras y ventas» ← “consultar el historial de compras y ventas”; **search** «busqueda rapida por tipo de flor o color» ← “buscar rápidamente los arreglos por tipo de flor o color”; **analytics** «comparacion de ingresos generados por cada producto» ← “comparar cuáles generan mejores ingresos”
- `tienda-articulos-cuero`: **search** «búsqueda por filtros de productos» ← “encontrar productos por tipo, color y material”; **payments** «cobros en línea» ← “pagar directamente desde la página”; **analytics** «analítica de tráfico y conversiones de comercio» ← “saber qué productos reciben más visitas y cuáles terminan en compra”
- `reparacion-maquinaria-agricola`: **database** «almacenamiento de registros historicos de equipos» ← “Quiero guardar el historial de cada equipo, las reparaciones realizadas y los repuestos utilizados.”; **ai** «identificacion de patrones en datos» ← “Me gustaría que el sistema identifique patrones de fallas frecuentes para ayudarme a anticipar qué revisiones conviene ofrecer”; **analytics** «analisis de uso y frecuencia de elementos» ← “ver los repuestos que más utilizo.”
- `parqueadero-bicicletas`: **database** «registro de entradas y salidas» ← “Quiero registrar las entradas, salidas, espacios ocupados y pagos de cada usuario.”; **data-processing** «calculo de ocupacion por hora» ← “Necesito calcular la ocupación por hora y conocer cuáles son las franjas de mayor demanda.”; **payments** «cobro de abonos mensuales en linea» ← “quiero cobrar los abonos mensuales en línea”
- `salsas-conservas-artesanales`: **database** «almacenamiento de registros y datos estructurados» ← “Quiero registrar los lotes, los ingredientes utilizados, las fechas de elaboración y los pedidos de cada tienda.”; **data-processing** «cálculo automático de producción por lotes» ← “Necesito calcular automáticamente cuánto debo producir según los pedidos confirmados”; **analytics** «analítica de ventas de productos» ← “revisar qué sabores tienen más salida.”
