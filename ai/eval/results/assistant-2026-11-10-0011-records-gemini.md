# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 00:11. 16 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.6 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 94% |
| Respuesta válida | 100% |
| Necesidades detectadas | 86% |
| Techo de la búsqueda (top 5) | 58% |
| Techo con 5 candidatos | 58% |
| Eligió un aceptable (donde había) | 93% |
| Se abstuvo (donde no había) | 21% |
| Acierto de punta a punta (comparable entre k) | 54% |
| Sin caja donde el caso no tiene herramientas | 0% |
| Eligió el primer candidato | 43% |
| Consistencia entre corridas | 6% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 98% |
| Limitaciones repetidas · borrador del modelo | 4 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 16 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/48 |
| Tiempo total (mediana) | 4.2 s |
| Tiempo total (peor caso) | 6.2 s |
| Sobre 15 s | 0/48 |
| Entender · buscar · generar (mediana) | 1.4 s · 0.2 s · 2.6 s |
| Tokens entrada / salida (mediana) | 4475 / 794 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 16 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 94% | 94% | 94% | 94% – 94% |
| Eligió un aceptable (donde había) | 96% | 91% | 92% | 91% – 96% |
| Se abstuvo (donde no había) | 18% | 23% | 22% | 18% – 23% |
| Acierto de punta a punta | 56% | 49% | 57% | 49% – 57% |
| Textos del modelo que hablan del catálogo | 8 | 6 | 2 | 2 – 8 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `panaderia-pedidos` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `panaderia-pedidos` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `panaderia-pedidos` · analytics | grafana, metabase | det 3/3 · techo 1 · eligió 1 |
| `compra-cacao-productores` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `compra-cacao-productores` · data-processing | airflow, prefect, dagster | det 3/3 · techo 3 · eligió 0 |
| `compra-cacao-productores` · analytics | grafana, metabase | det 1/3 · techo 1 · eligió 1 |
| `tortas-personalizadas` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `tortas-personalizadas` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tortas-personalizadas` · communication | novu, apprise | det 3/3 · techo 1 · eligió 1 |
| `limpieza-domiciliaria` · automation | (ninguno) | det 3/3 · eligió algo 3 |
| `limpieza-domiciliaria` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `limpieza-domiciliaria` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `lavado-detallado-motos` · auth | keycloak, zitadel | det 2/3 · techo 2 · eligió 2 |
| `lavado-detallado-motos` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `lavado-detallado-motos` · automation | (ninguno) | det 2/3 · eligió algo 2 |
| `almuerzos-empresariales` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `almuerzos-empresariales` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 2 |
| `almuerzos-empresariales` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `miel-productos-colmena` · cms | strapi, payload | det 3/3 · techo 3 · eligió 3 |
| `miel-productos-colmena` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `miel-productos-colmena` · communication | postal | det 3/3 · techo 3 · eligió 3 |
| `mantenimiento-jardines` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `mantenimiento-jardines` · data-processing | airflow, prefect, dagster | det 1/3 · techo 0 · eligió 0 |
| `mantenimiento-jardines` · analytics | grafana, metabase | det 3/3 · techo 0 · eligió 0 |
| `mantenimiento-jardines` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-agua` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `distribuidora-agua` · payments | hyperswitch | det 3/3 · techo 3 · eligió 2 |
| `distribuidora-agua` · analytics | grafana, metabase | det 3/3 · techo 1 · eligió 1 |
| `alquiler-trajes-tipicos` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `alquiler-trajes-tipicos` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 2 · eligió 2 |
| `alquiler-trajes-tipicos` · analytics | grafana, metabase | det 3/3 · techo 1 · eligió 1 |
| `granja-produccion-huevos` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `granja-produccion-huevos` · data-processing | airflow, prefect, dagster | det 0/3 · techo 0 · eligió 0 |
| `granja-produccion-huevos` · analytics | grafana, metabase | det 0/3 · techo 0 · eligió 0 |
| `comercializadora-flores` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `comercializadora-flores` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `comercializadora-flores` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 2 |
| `tienda-articulos-cuero` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `tienda-articulos-cuero` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tienda-articulos-cuero` · analytics | posthog, umami | det 3/3 · techo 3 · eligió 3 |
| `reparacion-maquinaria-agricola` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `reparacion-maquinaria-agricola` · ai | scikit-learn | det 3/3 · techo 0 · eligió 0 |
| `reparacion-maquinaria-agricola` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 2 |
| `parqueadero-bicicletas` · database | postgres, server, supabase | det 2/3 · techo 0 · eligió 0 |
| `parqueadero-bicicletas` · data-processing | airflow, prefect, dagster | det 1/3 · techo 0 · eligió 0 |
| `parqueadero-bicicletas` · analytics | grafana, metabase | det 1/3 · techo 0 · eligió 0 |
| `parqueadero-bicicletas` · payments | killbill, lago | det 3/3 · techo 3 · eligió 2 |
| `salsas-conservas-artesanales` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `salsas-conservas-artesanales` · data-processing | airflow, prefect, dagster | det 2/3 · techo 2 · eligió 2 |
| `salsas-conservas-artesanales` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 2 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `panaderia-pedidos`

> Tengo una panadería de barrio y recibo encargos por teléfono y por redes. Quiero guardar los datos de mis clientes, los pedidos y el inventario de ingredientes en un mismo lugar. También necesito que la gente pueda pagar sus encargos por internet y consultar un resumen de ventas por semana.

**gemini**
- `ok` · Sistema Integral de Gestión y Ventas para Panadería
- Esta propuesta organiza los datos del negocio, habilita los pagos en línea para los encargos y permite consultar métricas comerciales. Queda pendiente el soporte específico para la toma de pedidos telefónicos y de redes sociales.
- **MariaDB** (`MariaDB/server`), Almacén central: Guarda los datos de tus clientes, los pedidos y el inventario de ingredientes en un mismo lugar. Utiliza licencia GPL-2.0 y tiene actividad reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Procesador de pagos: Permite que la gente pueda pagar sus encargos por internet mediante una plataforma con conectividad a múltiples proveedores. Utiliza licencia Apache-2.0.
- **ClickHouse** (`ClickHouse/ClickHouse`), Motor de analítica: Facilita la consulta de un resumen de ventas por semana gracias a su capacidad de análisis en tiempo real. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- Limitación: La solución no incluye un módulo nativo de gestión de redes sociales ni telefonía para registrar los encargos automáticamente.
- Supuesto: Se asume que la panadería cuenta con infraestructura propia o servicio en la nube para alojar estas herramientas autohospedadas.
- Supuesto: El negocio requiere una interfaz adicional o desarrollo a medida para la carga manual de pedidos recibidos por teléfono y redes sociales.
- Rúbrica: español _ · rationale _ · coherencia _

### `compra-cacao-productores`

> Compro cacao a pequeños productores y luego lo clasifico y vendo a fabricantes. Quiero registrar cada compra con el productor, el peso, la calidad y la fecha, y consultar todo ese historial cuando lo necesite. Necesito calcular automáticamente los totales por zona y por mes, y ver cuáles calidades se venden más.

**gemini**
- `ok` · Sistema de gestión y análisis de compras de cacao
- La propuesta implementa una base de datos distribuida en memoria y un motor de análisis en tiempo real para registrar y procesar las compras de cacao, facilitando el cálculo de totales y la consulta del historial.
- **Valkey** (`valkey-io/valkey`), Almacenamiento de compras: Permite registrar cada compra con el productor, el peso, la calidad y la fecha, y consultar todo ese historial cuando lo necesites. Utiliza la licencia BSD-3-Clause y cuenta con mantenimiento reciente.
- **ClickHouse** (`ClickHouse/ClickHouse`), Procesamiento y análisis: Calcula automáticamente los totales por zona y por mes, y permite ver cuáles calidades se venden más mediante análisis en tiempo real. Utiliza la licencia Apache-2.0 y tiene alta actividad reciente.
- Limitación: No se incluye una interfaz gráfica de usuario para el registro diario ni para la visualización de reportes.
- Limitación: No se abordan funciones avanzadas de trazabilidad geográfica de las zonas de producción más allá del almacenamiento y cálculo numérico.
- Supuesto: Se asume que el negocio cuenta con infraestructura para desplegar y mantener servicios distribuidos.
- Supuesto: Se asume que la interfaz de usuario para ingresar y visualizar los datos será desarrollada de manera externa o integrada mediante API.
- Rúbrica: español _ · rationale _ · coherencia _

### `tortas-personalizadas`

> Tengo un emprendimiento de tortas por encargo y cada cliente pide sabores, tamaños y decoraciones diferentes. Quiero conservar el historial de pedidos y las preferencias de cada cliente para no tener que buscar conversaciones viejas. También necesito recibir pagos por adelantado y mandar una confirmación cuando el pedido quede reservado.

**gemini**
- `ok` · Sistema para gestión de pedidos y pagos
- Esta propuesta cubre el almacenamiento del historial de pedidos y preferencias de los clientes mediante una base de datos distribuida, junto con una plataforma para recibir pagos por adelantado. La necesidad de comunicación no cuenta con herramientas en el catálogo actual para enviar las confirmaciones de reserva.
- **Valkey** (`valkey-io/valkey`), Almacenamiento de historial de pedidos: Valkey es una base de datos clave-valor flexible y distribuida que permite conservar el historial de pedidos y las preferencias de cada cliente de forma rápida.
- **Hyperswitch** (`juspay/hyperswitch`), Recepción de pagos adelantados: Hyperswitch permite conectar múltiples proveedores de pago para gestionar y recibir los pagos por adelantado de los encargo de tortas.
- Limitación: Comunicación: no se encontraron herramientas del catálogo para «mandar una confirmación cuando el pedido quede reservado».
- Supuesto: Se asume que el negocio cuenta con personal para integrar las herramientas propuestas con una interfaz de usuario propia.
- Rúbrica: español _ · rationale _ · coherencia _

### `limpieza-domiciliaria`

> Dirijo un pequeño equipo de limpieza a domicilio. Quiero que el sistema asigne automáticamente los servicios del día según la disponibilidad de cada trabajador. También necesito que cada empleado pueda entrar con su propia cuenta y consultar únicamente sus tareas, y que los clientes reciban un aviso el día anterior a la visita.

**gemini**
- `ok` · Propuesta de Sistema Open Source para Equipo de Limpieza
- Esta propuesta incluye herramientas para cubrir la automatización de flujos, la autenticación de usuarios y el envío de notificaciones. Se requiere configurar la lógica de negocio para la asignación de tareas específicas de limpieza, ya que los candidatos de automatización son plataformas de flujos de trabajo e infraestructura.
- **Apache Airflow** (`apache/airflow`), Orquestador de flujos de trabajo: Apache Airflow es una plataforma para programar y monitorear flujos de trabajo con licencia Apache-2.0, ideal para ejecutar tareas automatizadas periódicamente.
- **Keycloak** (`keycloak/keycloak`), Gestor de identidad y accesos: Keycloak provee autenticación de usuarios y control de permisos mediante una solución de gestión de identidad con licencia Apache-2.0.
- **Apprise** (`caronc/apprise`), Centro de notificaciones: Apprise facilita el envío de notificaciones push que funcionan con distintas plataformas, bajo una licencia BSD-2-Clause.
- Limitación: Los candidatos de automatización no incluyen un motor específico de asignación de recursos humanos para limpieza, por lo que requerirá lógica adicional.
- Limitación: La herramienta de comunicación Apprise requiere integrarse con pasarelas de mensajería o correo para llegar directamente a los clientes.
- Supuesto: Se asume que el negocio cuenta con infraestructura propia para alojar las aplicaciones Docker o contenedores necesarios.
- Supuesto: Se asume que la asignación automática requiere un desarrollo a medida que consuma los servicios de orquestación.
- Rúbrica: español _ · rationale _ · coherencia _

### `lavado-detallado-motos`

> Tengo un negocio de lavado y detallado de motos. Quiero que cada empleado vea únicamente los servicios que le asigno y que el cliente reciba un mensaje cuando su moto esté lista. También me gustaría que, al confirmar un servicio, se cree automáticamente una tarea para preparar el puesto de trabajo.

**gemini**
- `ok` · Sistema para Gestión de Lavado y Detallado de Motos
- La propuesta cubre la autenticación para control de acceso de empleados, la infraestructura de comunicación para notificar a los clientes y la gestión de tareas para preparar los puestos de trabajo. No se incluyeron módulos específicos para la interfaz de gestión de servicios del negocio.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y accesos: Permite administrar la identidad y los accesos para que cada empleado vea únicamente los servicios asignados, bajo licencia Apache-2.0 y con actualización reciente.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Facilita el envío de mensajes para que el cliente reciba un aviso cuando su moto esté lista. La licencia no está identificada por GitHub y tiene actividad reciente.
- **Celery** (`celery/celery`), Cola de tareas distribuidas: Permite procesar tareas automáticas en segundo plano para preparar el puesto de trabajo al confirmar un servicio. Su licencia no fue identificada por GitHub y cuenta con mantenimiento reciente.
- Limitación: No se dispone de una herramienta específica en el catálogo para el módulo de agendamiento y visualización directa de servicios por parte de los empleados.
- Supuesto: Se asume que el negocio cuenta con una aplicación web o móvil propia para integrar el sistema de autenticación, mensajería y tareas.
- Supuesto: El negocio requiere una interfaz centralizada para la administración de los servicios de lavado.
- Rúbrica: español _ · rationale _ · coherencia _

### `almuerzos-empresariales`

> Preparo almuerzos para oficinas y empresas pequeñas. Quiero registrar los menús solicitados por cada empresa y las cantidades entregadas cada día. Me gustaría ver cuánto vendí por cliente y por semana, y permitir que las empresas paguen sus pedidos en línea.

**gemini**
- `ok` · Plataforma de gestion de almuerzos y pagos
- Propuesta de sistema para registrar pedidos de almuerzos empresariales, generar reportes de ventas y procesar pagos en línea mediante herramientas de código abierto.
- **Valkey** (`valkey-io/valkey`), Registro de menús y clientes: Valkey es una base de datos flexible que permite registrar los menús solicitados por cada empresa y las cantidades entregadas cada día con alta velocidad. Cuenta con licencia BSD-3-Clause y actividad reciente.
- **Metabase** (`metabase/metabase`), Generación de reportes de ventas: Metabase permite visualizar cuánto vendiste por cliente y por semana mediante tableros interactivos y gráficos. Su licencia no fue identificada por GitHub y mantiene actualizaciones constantes.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos en línea: Hyperswitch permite que las empresas paguen sus pedidos en línea de manera segura mediante una plataforma de pagos abierta. Utiliza licencia Apache-2.0 y muestra actividad reciente.
- Limitación: Ninguna de las bases de datos candidatas ofrece almacenamiento de objetos adaptado específicamente a archivos pesados o documentos adjuntos.
- Limitación: La analítica de Metabase requiere una fuente de datos estructurada previamente para calcular las ventas por semana de forma automática.
- Supuesto: Se asume que el negocio cuenta con un servicio de desarrollo propio para conectar la interfaz de usuario con la base de datos y la pasarela de pagos.
- Supuesto: Se asume que la base de datos elegida se complementará con modelos de datos relacionales para estructurar correctamente las relaciones entre empresas, menús y entregas diarias.
- Rúbrica: español _ · rationale _ · coherencia _

### `miel-productos-colmena`

> Tengo una pequeña marca familiar de miel y otros productos de la colmena. Necesito actualizar las descripciones, fotos y precios de mi página sin pedir ayuda cada vez. Además, quiero guardar los catálogos y las fichas de producto para descargarlos cuando los envíe a tiendas, y responder por correo las preguntas de los compradores.

**gemini**
- `ok` · Sistema Open Source para la gestion de miel y productos
- Esta propuesta integra herramientas para la gestion de contenidos web, el almacenamiento de documentos y la comunicacion por correo electronico para una marca de miel. Permite actualizar el catalogo de productos de forma autonoma, guardar fichas y catalogos para descarga y atender las consultas de los compradores.
- **Payload** (`payloadcms/payload`), Panel de administracion y gestion de contenidos de la pagina web.: Payload ofrece un backend y panel de administracion para gestionar las descripciones, fotos y precios de la pagina sin pedir ayuda. Cuenta con licencia MIT y actividad reciente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de catalogos y fichas de producto.: SeaweedFS permite guardar archivos y ofrece acceso eficiente para almacenar los catalogos y fichas de producto y descargarlos cuando se envien a tiendas. Utiliza licencia Apache-2.0 y tiene mantenimiento activo.
- **Postal** (`postalserver/postal`), Plataforma de correo electronico para atencion de compradores.: Postal es una plataforma de correo para correo entrante y saliente que permite responder las preguntas de los compradores. Cuenta con licencia MIT y actualizacion reciente.
- Limitación: No se incluyen pasarelas de pago ni sistemas especificos de comercio electronico avanzados fuera de las capacidades del CMS.
- Supuesto: Se asume que la marca cuenta con infraestructura basica para hospedar estas aplicaciones de forma autogestionada.
- Rúbrica: español _ · rationale _ · coherencia _

### `mantenimiento-jardines`

> Ofrezco mantenimiento de jardines a conjuntos residenciales y casas. Quiero registrar cada visita, los materiales utilizados y las observaciones de mis trabajadores. También necesito calcular cuánto material se consume por tipo de jardín y comparar los costos entre meses, y conservar fotos de los trabajos realizados.

**gemini**
- `ok` · Sistema de Gestion para Mantenimiento de Jardines
- Propuesta de infraestructura open source para registrar visitas, analizar consumo de materiales y almacenar fotos de trabajos en el negocio de jardineria.
- **DuckDB** (`duckdb/duckdb`), Analisis de consumo y costos: DuckDB es un sistema de base de datos analitica de alto rendimiento que permite procesar consultas SQL complejas para calcular el consumo de materiales por tipo de jardin y comparar costos entre meses. Cuenta con licencia MIT y se mantiene activamente con actualizaciones recientes.
- **RustFS** (`rustfs/rustfs`), Almacenamiento de fotografias de trabajos: RustFS ofrece un sistema de almacenamiento de objetos de alto rendimiento compatible con S3, ideal para conservar de forma segura las fotos de los trabajos realizados. Utiliza licencia Apache-2.0 y recibe actualizaciones continuas.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Ninguno de los candidatos analizados proporciona una base de datos relacional general o un sistema de registro de visitas para operaciones de campo.
- Supuesto: Se asume que el negocio cuenta con personal tecnico para desplegar y mantener servicios autoalojados.
- Supuesto: Se requiere complementar la solucion con una interfaz de usuario o aplicacion personalizada para la captura de datos en campo por parte de los trabajadores.
- Rúbrica: español _ · rationale _ · coherencia _

### `distribuidora-agua`

> Distribuyo agua embotellada a hogares y pequeños comercios. Quiero tener el historial de cada cliente, sus pedidos habituales y los saldos pendientes. Me gustaría permitir que los clientes paguen sus pedidos por internet y mostrarme cuáles son las zonas con más ventas.

**gemini**
- `ok` · Sistema de Gestión y Pagos para Distribución de Agua
- La propuesta implementa una base de datos clave-valor para los historiales, una pasarela de pagos para las transacciones por internet y un motor analítico para estudiar las zonas con más ventas.
- **Redis** (`redis/redis`), Almacena los datos y el historial de clientes en tiempo real.: Funciona como un servidor de estructuras de datos rápido y con rica variedad de funciones. Su licencia no fue identificada por GitHub.
- **Hyperswitch** (`juspay/hyperswitch`), Procesa los pagos en línea de los pedidos.: Permite conectar múltiples proveedores de pago y ofrece opciones de alojamiento propio con licencia Apache-2.0.
- **ClickHouse** (`ClickHouse/ClickHouse`), Analiza y muestra las zonas geográficas con más ventas.: Es un sistema de gestión de bases de datos especializado en analítica en tiempo real para grandes volúmenes de datos.
- Limitación: No se incluye una herramienta específica para la gestión logística o de rutas de reparto físico.
- Supuesto: Se asume que la interfaz de usuario para los clientes y comercios se desarrollará externamente utilizando estas herramientas como backend.
- Rúbrica: español _ · rationale _ · coherencia _

### `alquiler-trajes-tipicos`

> Alquilo trajes típicos para fiestas y presentaciones culturales. Quiero llevar el control de cada prenda, su talla, estado y fechas en que está reservada, para evitar entregar dos veces la misma. También quisiera que los clientes encuentren un traje buscando por talla, color o tipo de evento, y conocer cuáles se alquilan más.

**gemini**
- `ok` · Sistema de gestión y análisis para alquiler de trajes
- La propuesta integra herramientas de búsqueda vectorial, analítica de datos en tiempo real y componentes complementarios para resolver el control de inventario y la consulta de prendas culturales. Se asume que el negocio operará con un sistema web centralizado que conectará la búsqueda con la analítica de uso.
- **Qdrant** (`qdrant/qdrant`), Búsqueda de prendas por filtros y similitud: Permite realizar búsquedas avanzadas indexando las características de cada traje para que los clientes encuentren rápidamente lo que buscan por talla, color o tipo de evento. Cuenta con la licencia Apache-2.0 y actividad reciente.
- **ClickHouse** (`ClickHouse/ClickHouse`), Analítica de alquileres populares: Procesa grandes volúmenes de datos de transacciones de alquiler en tiempo real para identificar rápidamente cuáles son los trajes más populares. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. No se encontró una herramienta de base de datos general para inventario entre los candidatos de esta categoría, ya que los disponibles están enfocados en otras tareas técnicas como facturación o control de versiones.
- Limitación: No se dispone de una herramienta específica para la gestión directa del inventario y reservas dentro de los candidatos de base de datos.
- Supuesto: Se asume que el negocio cuenta con una interfaz web o aplicación propia donde los clientes realizan las búsquedas y reservas de los trajes.
- Supuesto: Se requiere una interfaz de administración general para dar de alta nuevas prendas y registrar las fechas de reserva.
- Rúbrica: español _ · rationale _ · coherencia _

### `granja-produccion-huevos`

> Produzco y vendo huevos a tiendas y restaurantes de mi municipio. Quiero registrar la producción diaria por galpón, las unidades clasificadas y las entregas que hacemos. El sistema debería sumar automáticamente la producción semanal y mostrarme si algún galpón está produciendo menos que lo habitual.

**gemini**
- `needs_clarification` · 
- Necesito un poco más de contexto para recomendarte herramientas.
- Pregunta: ±Qué tipo de dispositivo o interfaz prefieres usar para registrar la producci³n y ver los reportes (una aplicaci³n web, una app móvil, o una planilla)?
- Pregunta: ±Prefieres que el sistema funcione en la nube para acceder desde cualquier lugar o instalado localmente en tu ordenador?
- Rúbrica: español _ · rationale _ · coherencia _

### `comercializadora-flores`

> Compro flores a cultivadores y preparo arreglos para hoteles y organizadores de eventos. Necesito consultar el historial de compras y ventas, buscar rápidamente los arreglos por tipo de flor o color, y comparar cuáles generan mejores ingresos.

**gemini**
- `ok` · Propuesta de sistema open source para florería
- La propuesta integra una base de datos clave-valor para las transacciones, un motor de búsqueda para el catálogo de arreglos florales y una herramienta de inteligencia de negocios para comparar ingresos. Cubre todas las necesidades del negocio de compra de flores a cultivadores y venta a hoteles y organizadores de eventos.
- **Redis** (`redis/redis`), Almacenamiento de transacciones: Redis permite guardar y consultar el historial de compras y ventas de manera rápida en aplicaciones orientadas a datos en tiempo real. La licencia no fue identificada por GitHub y su último cambio fue hace un mes.
- **Typesense** (`typesense/typesense`), Búsqueda de arreglos: Typesense facilita buscar rápidamente los arreglos por tipo de flor o color mediante un motor de búsqueda en memoria tolerante a errores. Usa licencia GPL-3.0 y tuvo su último cambio hace 0 meses.
- **Metabase** (`metabase/metabase`), Comparativa de ingresos: Metabase ayuda a comparar cuáles arreglos generan mejores ingresos mediante herramientas sencillas de business intelligence y paneles de datos. La licencia no fue identificada por GitHub y se actualizó hace 0 meses.
- Limitación: La propuesta no incluye gestión de envíos o logística de entrega a hoteles y organizadores de eventos.
- Supuesto: Se asume que el negocio cuenta con personal técnico para desplegar y mantener las herramientas autohospedadas.
- Supuesto: El volumen de transacciones y catálogo se adapta bien a bases de datos en memoria y motores de búsqueda ligeros.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-articulos-cuero`

> Tengo una tienda virtual de artículos de cuero hechos por artesanos de la región. Quiero que los compradores puedan encontrar productos por tipo, color y material, y que puedan pagar directamente desde la página. Necesito saber qué productos reciben más visitas y cuáles terminan en compra.

**gemini**
- `ok` · Plataforma e-commerce para tienda de artículos de cuero
- Esta propuesta integra herramientas open source para cubrir la búsqueda avanzada de productos artesanales, el procesamiento seguro de pagos en línea y el seguimiento analítico de visitas y conversiones de compra en la tienda virtual.
- **Meilisearch** (`meilisearch/meilisearch`), Motor de búsqueda y filtrado por atributos de productos: Permite encontrar productos mediante una API rápida de búsqueda híbrida potenciada por IA. Su licencia no fue identificada por GitHub y cuenta con actividad reciente constante.
- **Hyperswitch** (`juspay/hyperswitch`), Plataforma de procesamiento de pagos en línea: Facilita la conectividad a múltiples proveedores de pago y cumple con los estándares necesarios para procesar transacciones directamente. Utiliza licencia Apache-2.0 y tiene actualizaciones recientes.
- **Umami** (`umami-software/umami`), Plataforma de analítica web y conversiones: Rastrea el tráfico, conversiones y comportamiento de los usuarios en un solo lugar de forma privada y sin cookies. Cuenta con licencia MIT y alta actividad reciente.
- Limitación: La propuesta no incluye la pasarela de pago final específica que se conectará a través de la plataforma de pagos.
- Limitación: El motor de búsqueda requerirá la sincronización periódica del catálogo de productos artesanales de cuero.
- Supuesto: Se asume que la tienda virtual cuenta con una base de datos propia para gestionar el catálogo de artículos de cuero y el estado de las compras.
- Supuesto: Se asume que la integración de pagos y analítica se conectará mediante la API correspondiente provista por cada herramienta.
- Rúbrica: español _ · rationale _ · coherencia _

### `reparacion-maquinaria-agricola`

> Reparo maquinaria agrícola y atiendo fincas de varios municipios. Quiero guardar el historial de cada equipo, las reparaciones realizadas y los repuestos utilizados. Me gustaría que el sistema identifique patrones de fallas frecuentes para ayudarme a anticipar qué revisiones conviene ofrecer, y ver los repuestos que más utilizo.

**gemini**
- `ok` · Sistema de gestión de reparaciones y repuestos agrícolas
- Esta propuesta organiza el historial de equipos y repuestos mediante una base de datos relacional robusta, facilita el procesamiento de datos para detectar patrones con librerías de análisis y permite visualizar el uso de componentes a través de una herramienta de inteligencia de negocios.
- **PostgreSQL** (`postgres/postgres`), Almacena el historial de cada equipo, reparaciones y repuestos.: Guarda de forma estructurada y confiable el historial de cada equipo, las reparaciones realizadas y los repuestos utilizados. Su licencia no fue identificada por GitHub.
- **Pandas** (`pandas-dev/pandas`), Procesa y analiza datos para identificar patrones de fallas frecuentes.: Proporciona estructuras y funciones estadísticas para examinar los datos de reparaciones y ayudar a anticipar qué revisiones conviene ofrecer. Utiliza licencia BSD-3-Clause.
- **Metabase** (`metabase/metabase`), Visualiza analíticas y reportes sobre los repuestos que más utilizas.: Permite explorar y mostrar en gráficos sencillos los repuestos que más utilizas a partir de los datos almacenados. Su licencia no fue identificada por GitHub.
- Limitación: No se incluye una interfaz específica para dispositivos móviles en campo, por lo que el acceso dependerá de la integración web o local de las herramientas elegidas.
- Supuesto: Se asume que el usuario cuenta con conocimientos técnicos básicos para operar un entorno de base de datos y procesamiento en Python.
- Supuesto: Se asume que los datos de maquinaria y repuestos se digitalizarán manualmente o mediante planillas.
- Rúbrica: español _ · rationale _ · coherencia _

### `parqueadero-bicicletas`

> Administro un parqueadero para bicicletas cerca de varias oficinas. Quiero registrar las entradas, salidas, espacios ocupados y pagos de cada usuario. Necesito calcular la ocupación por hora y conocer cuáles son las franjas de mayor demanda. Además, quiero cobrar los abonos mensuales en línea.

**gemini**
- `ok` · Plataforma de cobros y suscripciones en línea
- La propuesta incluye la herramienta principal para gestionar los pagos en línea y las suscripciones del parqueadero de bicicletas, aunque quedan pendientes los módulos específicos para el control de entradas, salidas y cálculo de ocupación.
- **Kill Bill** (`killbill/killbill`), Gestión de cobros y abonos mensuales: Resuelve la necesidad de cobrar los abonos mensuales en línea mediante su plataforma de facturación por suscripción y pagos. Cuenta con la licencia Apache-2.0 y actividad reciente en el último mes.
- Limitación: La propuesta no incluye herramientas para registrar entradas, salidas, espacios ocupados, ni para calcular la ocupación por hora o la demanda del parqueadero de bicicletas.
- Supuesto: Se asume que el negocio requiere un sistema externo o desarrollo propio para el registro físico de entradas, salidas y cálculo de ocupación del parqueadero, ya que los candidatos provistos no cubren dicha funcionalidad.
- Rúbrica: español _ · rationale _ · coherencia _

### `salsas-conservas-artesanales`

> Tengo un pequeño negocio que produce salsas y conservas para tiendas de barrio. Quiero registrar los lotes, los ingredientes utilizados, las fechas de elaboración y los pedidos de cada tienda. Necesito calcular automáticamente cuánto debo producir según los pedidos confirmados y revisar qué sabores tienen más salida.

**gemini**
- `ok` · Sistema de gestión de producción y ventas para conservas
- Esta propuesta incluye herramientas para almacenar los datos operativos y realizar análisis sobre la salida de los productos. Sin embargo, no se cubren de forma nativa los cálculos automáticos de producción según los pedidos confirmados.
- **Valkey** (`valkey-io/valkey`), Almacén de datos operativos: Valkey es una base de datos flexible distribuida de clave-valor optimizada para cargas de trabajo en tiempo real, lo que permite registrar los lotes, ingredientes, fechas de elaboración y pedidos de cada tienda. Su licencia es BSD-3-Clause y cuenta con mantenimiento activo.
- **ClickHouse** (`ClickHouse/ClickHouse`), Motor de análisis de ventas: ClickHouse es un sistema de gestión de bases de datos de análisis en tiempo real que permite revisar qué sabores tienen más salida procesando los datos de ventas de forma eficiente. Su licencia es Apache-2.0 y se mantiene actualizado constantemente.
- Limitación: No se incluye una herramienta específica para el cálculo automático de la producción según los pedidos confirmados.
- Supuesto: Se asume que el negocio cuenta con personal técnico capaz de integrar una base de datos clave-valor y un motor analítico.
- Supuesto: Se requiere el desarrollo de una lógica externa para calcular automáticamente las cantidades a producir basadas en los pedidos.
- Rúbrica: español _ · rationale _ · coherencia _
