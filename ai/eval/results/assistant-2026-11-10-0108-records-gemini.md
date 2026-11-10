# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 01:08. 16 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 94% |
| Respuesta válida | 100% |
| Necesidades detectadas | 87% |
| Techo de la búsqueda (top 5) | 78% |
| Techo con 5 candidatos | 78% |
| Eligió un aceptable (donde había) | 90% |
| Se abstuvo (donde no había) | 30% |
| Acierto de punta a punta (comparable entre k) | 70% |
| Sin caja donde el caso no tiene herramientas | 60% |
| Eligió el primer candidato | 38% |
| Consistencia entre corridas | 12% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 96% |
| Limitaciones repetidas · borrador del modelo | 8 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 9 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/48 |
| Tiempo total (mediana) | 4.3 s |
| Tiempo total (peor caso) | 6.9 s |
| Sobre 15 s | 0/48 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.2 s · 2.5 s |
| Tokens entrada / salida (mediana) | 4428 / 816 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 16 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 94% | 94% | 94% | 94% – 94% |
| Eligió un aceptable (donde había) | 91% | 84% | 94% | 84% – 94% |
| Se abstuvo (donde no había) | 33% | 33% | 25% | 25% – 33% |
| Acierto de punta a punta | 72% | 64% | 72% | 64% – 72% |
| Textos del modelo que hablan del catálogo | 2 | 4 | 3 | 2 – 4 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `panaderia-pedidos` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 2 |
| `panaderia-pedidos` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `panaderia-pedidos` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 2 |
| `compra-cacao-productores` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `compra-cacao-productores` · data-processing | airflow, prefect, dagster | det 3/3 · techo 3 · eligió 1 |
| `compra-cacao-productores` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 2 |
| `tortas-personalizadas` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `tortas-personalizadas` · payments | hyperswitch | det 3/3 · techo 3 · eligió 2 |
| `tortas-personalizadas` · communication | novu, apprise | det 3/3 · techo 1 · eligió 1 |
| `limpieza-domiciliaria` · automation | (ninguno) | det 3/3 · eligió algo 0 |
| `limpieza-domiciliaria` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `limpieza-domiciliaria` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `lavado-detallado-motos` · auth | keycloak, zitadel | det 1/3 · techo 1 · eligió 1 |
| `lavado-detallado-motos` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `lavado-detallado-motos` · automation | (ninguno) | det 2/3 · eligió algo 2 |
| `almuerzos-empresariales` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `almuerzos-empresariales` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 2 |
| `almuerzos-empresariales` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `miel-productos-colmena` · cms | strapi, payload | det 3/3 · techo 3 · eligió 2 |
| `miel-productos-colmena` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `miel-productos-colmena` · communication | postal | det 3/3 · techo 3 · eligió 3 |
| `mantenimiento-jardines` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `mantenimiento-jardines` · data-processing | airflow, prefect, dagster | det 3/3 · techo 1 · eligió 0 |
| `mantenimiento-jardines` · analytics | grafana, metabase | det 0/3 · techo 0 · eligió 0 |
| `mantenimiento-jardines` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-agua` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 2 |
| `distribuidora-agua` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-agua` · analytics | grafana, metabase | det 3/3 · techo 1 · eligió 1 |
| `alquiler-trajes-tipicos` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `alquiler-trajes-tipicos` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `alquiler-trajes-tipicos` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 1 |
| `granja-produccion-huevos` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `granja-produccion-huevos` · data-processing | airflow, prefect, dagster | det 0/3 · techo 0 · eligió 0 |
| `granja-produccion-huevos` · analytics | grafana, metabase | det 0/3 · techo 0 · eligió 0 |
| `comercializadora-flores` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `comercializadora-flores` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `comercializadora-flores` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 3 |
| `tienda-articulos-cuero` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `tienda-articulos-cuero` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tienda-articulos-cuero` · analytics | posthog, umami | det 3/3 · techo 3 · eligió 3 |
| `reparacion-maquinaria-agricola` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 2 |
| `reparacion-maquinaria-agricola` · ai | scikit-learn | det 3/3 · techo 2 · eligió 2 |
| `reparacion-maquinaria-agricola` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 3 |
| `parqueadero-bicicletas` · database | postgres, server, supabase | det 2/3 · techo 1 · eligió 0 |
| `parqueadero-bicicletas` · data-processing | airflow, prefect, dagster | det 1/3 · techo 0 · eligió 0 |
| `parqueadero-bicicletas` · analytics | grafana, metabase | det 2/3 · techo 2 · eligió 1 |
| `parqueadero-bicicletas` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `salsas-conservas-artesanales` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 2 |
| `salsas-conservas-artesanales` · data-processing | airflow, prefect, dagster | det 2/3 · techo 2 · eligió 2 |
| `salsas-conservas-artesanales` · analytics | grafana, metabase | det 3/3 · techo 1 · eligió 1 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `panaderia-pedidos`

> Tengo una panadería de barrio y recibo encargos por teléfono y por redes. Quiero guardar los datos de mis clientes, los pedidos y el inventario de ingredientes en un mismo lugar. También necesito que la gente pueda pagar sus encargos por internet y consultar un resumen de ventas por semana.

**gemini**
- `ok` · Sistema integral de gestión y pagos para panadería
- Propuesta de herramientas open source para registrar clientes y pedidos, procesar cobros en línea y consultar reportes de ventas en la panadería.
- **PostgreSQL** (`postgres/postgres`), Almacenar datos de clientes, pedidos e inventario: Permite guardar la información de la panadería en un mismo lugar. La licencia no fue identificada por GitHub y recibe mantenimiento constante.
- **Hyperswitch** (`juspay/hyperswitch`), Procesar cobros y pagos por internet: Facilita que los clientes paguen sus encargos por internet mediante una plataforma de pagos componible. Utiliza licencia Apache-2.0 y tiene alta actividad reciente.
- **Metabase** (`metabase/metabase`), Generar reportes y resumen de ventas: Permite trabajar con los datos para obtener reportes y visualizaciones de ventas. Su licencia no está identificada por GitHub y cuenta con actualización reciente.
- Limitación: No se incluyeron herramientas específicas para la recepción de encargos por teléfono o redes sociales.
- Supuesto: La panadería cuenta con un servidor o infraestructura propia para realizar la instalación local de las herramientas seleccionadas.
- Supuesto: El negocio dispone de conectividad a internet para procesar los pagos en línea.
- Rúbrica: español _ · rationale _ · coherencia _

### `compra-cacao-productores`

> Compro cacao a pequeños productores y luego lo clasifico y vendo a fabricantes. Quiero registrar cada compra con el productor, el peso, la calidad y la fecha, y consultar todo ese historial cuando lo necesite. Necesito calcular automáticamente los totales por zona y por mes, y ver cuáles calidades se venden más.

**gemini**
- `ok` · Sistema de gestión y análisis de compras de cacao
- Propuesta de arquitectura open source para registrar las transacciones de compra de cacao, procesar las agregaciones de totales por zona y mes, y visualizar métricas de ventas y calidades preferidas.
- **SQLModel** (`fastapi/sqlmodel`), Almacenamiento y consulta de compras: Permite registrar cada compra con el productor, el peso, la calidad y la fecha en una base de datos SQL, facilitando la consulta de todo el historial.
- **Pandas** (`pandas-dev/pandas`), Procesamiento y totales por zona y mes: Calcula automáticamente los totales requeridos mediante potentes herramientas de manipulación y análisis de datos en Python.
- **Metabase** (`metabase/metabase`), Visualización de ventas y calidades: Permite crear paneles de negocios para ver fácilmente cuáles calidades se venden más. Su licencia no fue identificada por GitHub.
- Limitación: No se incluyeron herramientas de interfaz de usuario web directas para la captura diaria de datos.
- Supuesto: Se asume que los productores y zonas están previamente parametrizados en el sistema.
- Supuesto: El negocio cuenta con un entorno operativo capaz de ejecutar aplicaciones en Python y contenedores.
- Rúbrica: español _ · rationale _ · coherencia _

### `tortas-personalizadas`

> Tengo un emprendimiento de tortas por encargo y cada cliente pide sabores, tamaños y decoraciones diferentes. Quiero conservar el historial de pedidos y las preferencias de cada cliente para no tener que buscar conversaciones viejas. También necesito recibir pagos por adelantado y mandar una confirmación cuando el pedido quede reservado.

**gemini**
- `ok` · Sistema Integral para Gestión de Pedidos de Tortas
- Esta propuesta organiza la información de los clientes y gestiona los cobros adelantados mediante herramientas open source actualizadas. Queda pendiente resolver la automatización de la mensajería para las confirmaciones de reserva.
- **SQLModel** (`fastapi/sqlmodel`), Almacena el historial de pedidos y preferencias de los clientes.: Permite gestionar bases de datos SQL desde Python de forma sencilla y robusta para conservar los datos de cada cliente. Cuenta con licencia MIT y se mantiene activo con cambios recientes en el último mes.
- **Kill Bill** (`killbill/killbill`), Gestiona la recepción de pagos por adelantado.: Resuelve la necesidad de cobros gracias a su plataforma de pagos y facturación de código abierto bajo licencia Apache-2.0. Se mantiene actualizado con actividad reciente en el último mes.
- Limitación: Comunicación: no se encontraron herramientas del catálogo para «mandar una confirmación cuando el pedido quede reservado».
- Limitación: La propuesta no incluye una solución para enviar la confirmación cuando el pedido quede reservado.
- Supuesto: Se asume que el negocio cuenta con un entorno de desarrollo en Python para integrar la base de datos.
- Supuesto: El usuario necesitará desarrollar o integrar una herramienta externa para enviar los mensajes de confirmación de reserva.
- Rúbrica: español _ · rationale _ · coherencia _

### `limpieza-domiciliaria`

> Dirijo un pequeño equipo de limpieza a domicilio. Quiero que el sistema asigne automáticamente los servicios del día según la disponibilidad de cada trabajador. También necesito que cada empleado pueda entrar con su propia cuenta y consultar únicamente sus tareas, y que los clientes reciban un aviso el día anterior a la visita.

**gemini**
- `ok` · Propuesta de sistema para gestión de equipo de limpieza
- Esta propuesta integra herramientas para la automatización de tareas y la comunicación con clientes, aunque la necesidad de gestión de acceso de empleados no cuenta con un candidato que resuelva directamente la restricción por roles de tareas según los datos disponibles.
- **Keycloak** (`keycloak/keycloak`), Control de acceso: Proporciona gestión de identidad y acceso de código abierto con licencia Apache-2.0 y actividad reciente, permitiendo que cada empleado entre con su propia cuenta.
- **Apprise** (`caronc/apprise`), Envío de avisos: Facilita el envío de notificaciones push para asegurar que los clientes reciban un aviso antes de la visita, utilizando licencia BSD-2-Clause y con mantenimiento activo.
- Limitación: Automatización: ninguna de las herramientas encontradas encaja. No se encontró un candidato que realice la asignación automática de servicios de limpieza según la disponibilidad del personal.
- Supuesto: Se asume que la empresa dispone de un servidor propio para hospedar estas herramientas open source.
- Supuesto: El usuario requiere una interfaz web adicional para que los empleados consulten sus tareas asignadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `lavado-detallado-motos`

> Tengo un negocio de lavado y detallado de motos. Quiero que cada empleado vea únicamente los servicios que le asigno y que el cliente reciba un mensaje cuando su moto esté lista. También me gustaría que, al confirmar un servicio, se cree automáticamente una tarea para preparar el puesto de trabajo.

**gemini**
- `ok` · Sistema de gestión y notificaciones para taller de motos
- Esta propuesta incluye la infraestructura de comunicación para enviar notificaciones a los clientes y una cola de tareas distribuidas para automatizar la creación de tareas internas. Quedan sin resolver la asignación de servicios por empleado y la interfaz de usuario.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Resuelve el envío de mensajes a los clientes cuando su moto esté lista utilizando una plataforma de infraestructura de comunicación de código abierto. Su licencia no fue identificada por GitHub y ha recibido actualizaciones recientes.
- **Celery** (`celery/celery`), Cola de tareas distribuidas: Permite gestionar la automatización y creación de tareas para preparar el puesto de trabajo al confirmar un servicio mediante una cola de tareas en Python. Su licencia no está identificada por GitHub y cuenta con mantenimiento activo.
- Limitación: No se cubren las necesidades de control de acceso ni la vista exclusiva para que cada empleado vea únicamente sus servicios asignados.
- Supuesto: Se asume que el negocio cuenta con personal técnico para integrar y mantener las herramientas de código abierto.
- Supuesto: Se requiere una interfaz de usuario adicional o desarrollo propio para la gestión de empleados y asignación de servicios.
- Rúbrica: español _ · rationale _ · coherencia _

### `almuerzos-empresariales`

> Preparo almuerzos para oficinas y empresas pequeñas. Quiero registrar los menús solicitados por cada empresa y las cantidades entregadas cada día. Me gustaría ver cuánto vendí por cliente y por semana, y permitir que las empresas paguen sus pedidos en línea.

**gemini**
- `ok` · Sistema open source para gestión de almuerzos y pagos
- La propuesta integra una base de datos relacional para registrar pedidos y menús, una plataforma de analítica para reportes de ventas y una solución de pagos en línea para procesar las transacciones de las empresas.
- **PostgreSQL** (`postgres/postgres`), Almacenar menús, empresas y cantidades entregadas.: Permite registrar de manera persistente y confiable los menús solicitados por cada empresa y las cantidades entregadas cada día. Su licencia no fue identificada por GitHub.
- **Lago** (`getlago/lago`), Calcular ingresos y métricas de venta por cliente.: Ayuda a ver cuánto vendiste por cliente y por semana gracias a sus capacidades de análisis de ingresos y gestión de cobros.
- **Hyperswitch** (`juspay/hyperswitch`), Procesar pagos en línea de las empresas.: Permite que las empresas paguen sus pedidos en línea a través de una plataforma de pagos abierta y de alto rendimiento.
- Limitación: No se incluye una interfaz de usuario web o móvil para que las empresas seleccionen directamente sus menús, por lo que se requiere desarrollo adicional.
- Supuesto: Se asume que el negocio cuenta con conectividad a internet para procesar los pagos en línea.
- Supuesto: Se asume que la base de datos se desplegará localmente o en la nube para asegurar el acceso diario.
- Rúbrica: español _ · rationale _ · coherencia _

### `miel-productos-colmena`

> Tengo una pequeña marca familiar de miel y otros productos de la colmena. Necesito actualizar las descripciones, fotos y precios de mi página sin pedir ayuda cada vez. Además, quiero guardar los catálogos y las fichas de producto para descargarlos cuando los envíe a tiendas, y responder por correo las preguntas de los compradores.

**gemini**
- `ok` · Sistema de gestión de contenidos y almacenamiento para marca de miel
- Esta propuesta integra un sistema de gestión de contenidos para actualizar la página web sin ayuda técnica y una solución de almacenamiento distribuido para guardar catálogos y fichas de producto. Para la comunicación por correo electrónico no se han seleccionado herramientas del catálogo que resuelvan directamente la atención personalizada a compradores.
- **Payload CMS** (`payloadcms/payload`), Gestor de contenidos web: Permite administrar y actualizar las descripciones, fotos y precios de la página de forma independiente. Cuenta con licencia MIT y alta actividad reciente en GitHub.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de catálogos y fichas: Facilita guardar los catálogos y las fichas de producto para descargarlos cuando sea necesario. Utiliza licencia Apache-2.0 y cuenta con un desarrollo muy activo.
- **Postal** (`postalserver/postal`), Plataforma de correo electrónico: Proporciona una plataforma completa de correo electrónico para gestionar el correo entrante y saliente. Utiliza licencia MIT y cuenta con mantenimiento activo.
- Limitación: La herramienta de comunicación seleccionada es una plataforma de envío y recepción de correo, pero no un cliente de correo con bandeja de entrada conversacional tradicional para atención al cliente.
- Supuesto: Se asume que la marca familiar cuenta con un servidor o infraestructura básica propia para desplegar herramientas autohospedadas.
- Supuesto: Se asume que el volumen de compradores permite la gestión manual o mediante la plataforma de correo seleccionada.
- Rúbrica: español _ · rationale _ · coherencia _

### `mantenimiento-jardines`

> Ofrezco mantenimiento de jardines a conjuntos residenciales y casas. Quiero registrar cada visita, los materiales utilizados y las observaciones de mis trabajadores. También necesito calcular cuánto material se consume por tipo de jardín y comparar los costos entre meses, y conservar fotos de los trabajos realizados.

**gemini**
- `ok` · Sistema de Gestion para Mantenimiento de Jardines
- Esta propuesta organiza el registro de visitas y materiales con una base de datos relacional robusta, calcula el consumo con una API de medicion basada en uso y almacena las fotos mediante un sistema de objetos distribuido. Cubre todas las necesidades del negocio de jardineria sin dejar requerimientos pendientes.
- **PostgreSQL** (`postgres/postgres`), Almacena los registros de visitas, materiales y observaciones de los trabajadores.: Permite guardar la informacion transaccional de cada visita y los materiales utilizados. Su licencia no esta identificada por GitHub. Mantiene actualizaciones constantes y alta adopcion.
- **Lago** (`getlago/lago`), Calcula el consumo de material por tipo de jardin y compara costos.: Procesa eventos de consumo y gestiona analisis de ingresos para calcular cuanto material se consume por tipo de jardin. Utiliza licencia AGPL-3.0 y se mantiene activamente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Conserva las fotos de los trabajos realizados.: Maneja archivos multimedia de manera eficiente con acceso rapido. Cuenta con licencia Apache-2.0 y actividad reciente.
- Limitación: La propuesta no incluye una interfaz grafica de usuario para los trabajadores, la cual debera desarrollarse de forma complementaria.
- Supuesto: Se asume que los trabajadores cargaran la informacion desde una interfaz propia desarrollada sobre estas herramientas.
- Supuesto: Se asume conectividad constante para la sincronizacion de fotos y registros.
- Rúbrica: español _ · rationale _ · coherencia _

### `distribuidora-agua`

> Distribuyo agua embotellada a hogares y pequeños comercios. Quiero tener el historial de cada cliente, sus pedidos habituales y los saldos pendientes. Me gustaría permitir que los clientes paguen sus pedidos por internet y mostrarme cuáles son las zonas con más ventas.

**gemini**
- `ok` · Sistema de Gestion y Pagos para Distribucion de Agua
- Esta propuesta implementa un sistema para gestionar el historial de clientes, pedidos y saldos mediante una base de datos relacional robusta, facilita los pagos en linea con una plataforma de pagos y permite analizar las zonas con mas ventas utilizando una herramienta de inteligencia de negocios.
- **PostgreSQL** (`postgres/postgres`), Almacenar historiales de clientes, pedidos habituales y saldos pendientes: PostgreSQL es un sistema de gestion de bases de datos relacional confiable para guardar los datos persistentes del negocio. La licencia no fue identificada por GitHub.
- **Hyperswitch** (`juspay/hyperswitch`), Procesar pagos en linea de los pedidos de los clientes: Permite integrar rapidamente pasarelas de pago para que los clientes abonen sus pedidos de agua por internet de forma segura. Cuenta con licencia Apache-2.0.
- **Metabase** (`metabase/metabase`), Visualizar y analizar las zonas con mas ventas: Facilita la creacion de tableros y graficos para consultar metricas de ventas y descubrir que zonas tienen mayor demanda. Su licencia no fue identificada por GitHub.
- Limitación: Ninguno de los candidatos incluye una interfaz de usuario integrada para la gestion diaria de los repartos de agua.
- Supuesto: Se asume que el negocio cuenta con la infraestructura tecnica necesaria para autohospedar estas herramientas de codigo abierto.
- Supuesto: Se asume que la aplicacion principal del negocio se encargara de registrar la zona geografica de cada cliente en la base de datos.
- Rúbrica: español _ · rationale _ · coherencia _

### `alquiler-trajes-tipicos`

> Alquilo trajes típicos para fiestas y presentaciones culturales. Quiero llevar el control de cada prenda, su talla, estado y fechas en que está reservada, para evitar entregar dos veces la misma. También quisiera que los clientes encuentren un traje buscando por talla, color o tipo de evento, y conocer cuáles se alquilan más.

**gemini**
- `ok` · Sistema para control, busqueda y analitica de trajes tipicos
- Se propone una arquitectura para el negocio de alquiler de trajes tipicos que permite gestionar el almacenamiento de prendas, ofrecer busqueda avanzada por filtros y analizar la frecuencia de alquileres para evitar duplicidades y optimizar la operacion.
- **etcd** (`etcd-io/etcd`), Almacén de datos para el control de prendas y reservas: etcd funciona como un almacén de clave-valor distribuido confiable para los datos críticos del sistema, permitiendo registrar las prendas, tallas, estados y fechas de reserva.
- **Typesense** (`typesense/typesense`), Motor de búsqueda para que los clientes encuentren trajes: Typesense ofrece una alternativa rápida de código abierto con soporte para búsqueda por facetas, facilitando que los clientes encuentren los trajes buscando por talla, color o tipo de evento.
- **ClickHouse** (`ClickHouse/ClickHouse`), Base de datos para analítica de alquileres: ClickHouse es un sistema de gestión de bases de datos para analítica en tiempo real que permite procesar grandes volúmenes de datos para conocer cuáles son los trajes que se alquilan más.
- Limitación: Ninguno de los candidatos en la categoria de base de datos esta disenado especificamente para modelos relacionales complejos de inventario textil.
- Supuesto: Se asume que el negocio cuenta con personal tecnico o capacidad para integrar estos componentes mediante APIs.
- Supuesto: Se asume que los clientes accedera a un front-end web o movil que se conectara con las herramientas propuestas.
- Rúbrica: español _ · rationale _ · coherencia _

### `granja-produccion-huevos`

> Produzco y vendo huevos a tiendas y restaurantes de mi municipio. Quiero registrar la producción diaria por galpón, las unidades clasificadas y las entregas que hacemos. El sistema debería sumar automáticamente la producción semanal y mostrarme si algún galpón está produciendo menos que lo habitual.

**gemini**
- `needs_clarification` · 
- Necesito un poco más de contexto para recomendarte herramientas.
- Pregunta: ¿Qué tipo de dispositivo o interfaz prefieres utilizar para registrar la producción (por ejemplo, una aplicación web, una aplicación móvil o una hoja de cálculo)?
- Pregunta: ¿Cómo te gustaría acceder al sistema (por ejemplo, con inicio de sesión con correo y contraseña o abierto)?
- Pregunta: ¿Dónde prefieres que se guarden los datos de tu producción y entregas (en tu propia computadora o en la nube)?
- Rúbrica: español _ · rationale _ · coherencia _

### `comercializadora-flores`

> Compro flores a cultivadores y preparo arreglos para hoteles y organizadores de eventos. Necesito consultar el historial de compras y ventas, buscar rápidamente los arreglos por tipo de flor o color, y comparar cuáles generan mejores ingresos.

**gemini**
- `ok` · Sistema de gestión para florería y eventos
- Esta propuesta incluye herramientas para almacenar transacciones, realizar búsquedas de arreglos y analizar ingresos comerciales.
- **DuckDB** (`duckdb/duckdb`), Almacenar y consultar el historial de compras y ventas.: DuckDB es un sistema de base de datos analítica de alto rendimiento que permite consultar el historial de compras y ventas de forma eficiente.
- **Meilisearch** (`meilisearch/meilisearch`), Buscar rápidamente arreglos por tipo de flor o color.: Meilisearch ofrece un motor de búsqueda rápido para encontrar arreglos por tipo de flor o color. La licencia de la herramienta es no identificada por GitHub.
- **Metabase** (`metabase/metabase`), Comparar cuáles arreglos generan mejores ingresos.: Metabase es una herramienta de inteligencia de negocios que permite analizar datos y comparar cuáles arreglos generan mejores ingresos. La licencia de la herramienta es no identificada por GitHub.
- Supuesto: El negocio cuenta con infraestructura propia para alojar las herramientas seleccionadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-articulos-cuero`

> Tengo una tienda virtual de artículos de cuero hechos por artesanos de la región. Quiero que los compradores puedan encontrar productos por tipo, color y material, y que puedan pagar directamente desde la página. Necesito saber qué productos reciben más visitas y cuáles terminan en compra.

**gemini**
- `ok` · Sistema para Tienda Virtual de Artículos de Cuero
- Esta propuesta integra herramientas open source para gestionar la búsqueda avanzada de productos con filtros, el procesamiento de pagos en línea y el análisis detallado del tráfico y las conversiones de los compradores.
- **Meilisearch** (`meilisearch/meilisearch`), Motor de búsqueda con filtros: Permite encontrar productos por tipo, color y material mediante un motor de búsqueda rápido con soporte de facetas. La licencia no está identificada por GitHub y su último cambio fue hace 0 meses.
- **Hyperswitch** (`juspay/hyperswitch`), Plataforma de pagos en línea: Permite a los compradores pagar directamente desde la página utilizando una plataforma de pagos componible y de alto rendimiento. Posee licencia Apache-2.0 y su último cambio fue hace 0 meses.
- **PostHog** (`PostHog/posthog`), Plataforma de analítica y conversiones: Ayuda a saber qué productos reciben más visitas y cuáles terminan en compra mediante herramientas de analítica y seguimiento de conversiones. La licencia no está identificada por GitHub y su último cambio fue hace 0 meses.
- Limitación: La propuesta no incluye un sistema dedicado de gestión de inventario para los artesanos.
- Supuesto: Se asume que la tienda virtual cuenta con una interfaz web capaz de integrarse mediante APIs con las herramientas seleccionadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `reparacion-maquinaria-agricola`

> Reparo maquinaria agrícola y atiendo fincas de varios municipios. Quiero guardar el historial de cada equipo, las reparaciones realizadas y los repuestos utilizados. Me gustaría que el sistema identifique patrones de fallas frecuentes para ayudarme a anticipar qué revisiones conviene ofrecer, y ver los repuestos que más utilizo.

**gemini**
- `ok` · Sistema Integral de Mantenimiento para Maquinaria Agrícola
- La propuesta cubre el almacenamiento de datos, análisis predictivo de fallas y visualización del uso de repuestos para el taller mecánico.
- **PostgreSQL** (`postgres/postgres`), Almacén de datos: Permite guardar de forma estructurada el historial de cada equipo, las reparaciones realizadas y los repuestos utilizados. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- **Scikit-learn** (`scikit-learn/scikit-learn`), Motor de análisis predictivo: Ayuda a identificar patrones de fallas frecuentes para anticipar qué revisiones conviene ofrecer a los clientes. Cuenta con licencia BSD-3-Clause y desarrollo activo.
- **Metabase** (`metabase/metabase`), Panel de control y reportes: Facilita ver los repuestos que más utilizo mediante gráficos y consultas sencillas. Su licencia no está identificada por GitHub y tiene actualización reciente.
- Limitación: La propuesta no incluye una interfaz móvil nativa para el registro en campo desde las fincas.
- Supuesto: Se asume que el usuario cuenta con infraestructura propia para alojar las herramientas autohospedadas.
- Supuesto: Se asume que los datos de reparaciones y repuestos están digitalizados o pueden ser ingresados al sistema.
- Rúbrica: español _ · rationale _ · coherencia _

### `parqueadero-bicicletas`

> Administro un parqueadero para bicicletas cerca de varias oficinas. Quiero registrar las entradas, salidas, espacios ocupados y pagos de cada usuario. Necesito calcular la ocupación por hora y conocer cuáles son las franjas de mayor demanda. Además, quiero cobrar los abonos mensuales en línea.

**gemini**
- `ok` · Sistema de pagos y suscripciones para parqueadero de bicicletas
- La propuesta implementa una plataforma para el cobro en línea de los abonos mensuales del parqueadero. Quedan sin resolver el registro de entradas y salidas, así como el procesamiento de datos para calcular la ocupación por hora.
- **Killbill** (`killbill/killbill`), Plataforma de pagos y suscripciones: Permite gestionar el cobro de los abonos mensuales requeridos por el usuario mediante su plataforma open-source de suscripciones y pagos. Cuenta con licencia Apache-2.0 y un mantenimiento activo con cambios recientes.
- Limitación: Procesamiento de datos: no se encontraron herramientas del catálogo para «calcular la ocupación por hora y conocer cuáles son las franjas de mayor demanda».
- Limitación: No se cubren las necesidades de registro de entradas, salidas y espacios ocupados del parqueadero.
- Supuesto: Se asume que el sistema de pagos se integrará con una pasarela externa para procesar las transacciones de las tarjetas.
- Supuesto: El procesamiento de datos para calcular la ocupación por hora y franjas de mayor demanda no cuenta con candidatos en el catálogo actual.
- Rúbrica: español _ · rationale _ · coherencia _

### `salsas-conservas-artesanales`

> Tengo un pequeño negocio que produce salsas y conservas para tiendas de barrio. Quiero registrar los lotes, los ingredientes utilizados, las fechas de elaboración y los pedidos de cada tienda. Necesito calcular automáticamente cuánto debo producir según los pedidos confirmados y revisar qué sabores tienen más salida.

**gemini**
- `ok` · Sistema de gestión y analítica para producción de salsas
- Esta propuesta incluye un servidor de base de datos relacional para registrar lotes e inventario, y una herramienta de inteligencia de negocios para analizar qué sabores tienen más salida. Quedan sin automatizar los cálculos automáticos de producción según pedidos.
- **MariaDB** (`MariaDB/server`), Almacenar lotes, ingredientes, fechas y pedidos: MariaDB server permite registrar de forma confiable los lotes, los ingredientes utilizados, las fechas de elaboración y los pedidos de cada tienda mediante consultas estructuradas.
- **Metabase** (`metabase/metabase`), Analizar los sabores con más salida: Metabase facilita la creación de tableros y reportes de business intelligence para revisar qué sabores tienen más salida de forma visual. La licencia no está identificada por GitHub.
- Limitación: La propuesta no incluye un módulo automatizado para calcular la cantidad exacta a producir basada en los pedidos confirmados.
- Supuesto: Se asume que el negocio cuenta con personal con conocimientos básicos para operar bases de datos relacionales y herramientas de inteligencia de negocios.
- Supuesto: El cálculo automático de producción según los pedidos confirmados deberá implementarse mediante lógica personalizada o consultas avanzadas, ya que no hay una herramienta específica para esta función.
- Rúbrica: español _ · rationale _ · coherencia _
