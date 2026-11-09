# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-08 a las 21:40. 12 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.3 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 83% |
| Respuesta válida | 100% |
| Necesidades detectadas | 86% |
| Techo de la búsqueda (top 5) | 97% |
| Techo con 5 candidatos | 97% |
| Eligió un aceptable (donde había) | 100% |
| Se abstuvo (donde no había) | 56% |
| Acierto de punta a punta (comparable entre k) | 97% |
| Sin caja donde el caso no tiene herramientas | 53% |
| Eligió el primer candidato | 51% |
| Consistencia entre corridas | 58% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 5 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 9 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/36 |
| Tiempo total (mediana) | 3.8 s |
| Tiempo total (peor caso) | 5.0 s |
| Sobre 15 s | 0/36 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.1 s · 2.2 s |
| Tokens entrada / salida (mediana) | 3748 / 581 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 12 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 83% | 83% | 83% | 83% – 83% |
| Eligió un aceptable (donde había) | 100% | 100% | 100% | 100% – 100% |
| Se abstuvo (donde no había) | 80% | 50% | 40% | 40% – 80% |
| Acierto de punta a punta | 100% | 92% | 100% | 92% – 100% |
| Textos del modelo que hablan del catálogo | 5 | 3 | 1 | 1 – 5 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `ferreteria-sucursales` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `ferreteria-sucursales` · cache | redis, valkey | det 3/3 · techo 3 · eligió 3 |
| `domicilios-push` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `domicilios-push` · messaging | celery | det 3/3 · techo 3 · eligió 3 |
| `red-mascotas-grafos` · database | (ninguno) | det 3/3 · eligió algo 0 |
| `mercadeo-sitio-vue` · frontend | nuxt, core | det 3/3 · techo 3 · eligió 3 |
| `mercadeo-sitio-vue` · cms | strapi, payload | det 3/3 · techo 3 · eligió 3 |
| `laboratorio-respaldos` · storage | (ninguno) | det 3/3 · eligió algo 3 |
| `laboratorio-respaldos` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 3 |
| `cosmeticos-facturas-embudo` · payments | (ninguno) | det 3/3 · eligió algo 2 |
| `cosmeticos-facturas-embudo` · analytics | posthog, umami | det 3/3 · techo 2 · eligió 2 |
| `empresa-aprobaciones` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `startup-trazas-gitops` · observability | jaeger, opentelemetry-collector | det 3/3 · techo 3 · eligió 3 |
| `startup-trazas-gitops` · infrastructure | argo-cd, flux2 | det 3/3 · techo 3 · eligió 3 |
| `artesanias-chat-busqueda` · communication | (ninguno) | det 3/3 · eligió algo 2 |
| `artesanias-chat-busqueda` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-datos` · data-processing | dbt | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-datos` · database | ClickHouse, duckdb | det 3/3 · techo 3 · eligió 3 |
| `revista-cdn` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `instituto-videoclases` · communication | (ninguno) | det 3/3 · eligió algo 0 |
| `instituto-videoclases` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `ferreteria-sucursales`

> Una cadena de ferreterías con cinco sucursales quiere un sistema interno donde cada sucursal vea solo su propio inventario y sus ventas, y que las consultas repetidas al catálogo de productos respondan rápido.

**gemini**
- `ok` · Sistema de Inventario y Caché para Ferreterías
- Propuesta de arquitectura para la cadena de ferreterías que incluye almacenamiento transaccional para el inventario de las sucursales y una capa de caché en memoria para acelerar las consultas frecuentes al catálogo de productos.
- **etcd** (`etcd-io/etcd`), Almacenamiento transaccional: Responde al almacenamiento seguro de datos mediante un almacén de clave-valor distribuido y confiable. Cuenta con la licencia Apache-2.0 y mantenimiento activo reciente.
- **Valkey** (`valkey-io/valkey`), Caché de productos: Optimiza las consultas repetidas al catálogo mediante un almacenamiento distribuido en memoria enfocado en cargas de trabajo en tiempo real. Utiliza licencia BSD-3-Clause y tiene actividad reciente.
- Limitación: La propuesta no incluye un sistema de autenticación ni control de acceso basado en roles para restringir la vista de cada sucursal.
- Supuesto: Se asume que la cadena de ferreterías requiere aislamiento de datos a nivel de aplicación para cada una de las cinco sucursales.
- Supuesto: Se asume conectividad de red estable entre las sucursales y el servidor central donde residen los servicios.
- Rúbrica: español _ · rationale _ · coherencia _

### `domicilios-push`

> Una app de domicilios quiere enviar una notificación al celular del cliente cuando su pedido salga del restaurante, y generar en segundo plano el recibo en PDF de cada pedido para no demorar la app.

**gemini**
- `ok` · Sistema de notificaciones y tareas en segundo plano para domicilios
- La propuesta implementa una infraestructura de comunicación para enviar alertas al celular del cliente y una cola de tareas distribuidas para generar los recibos en PDF de forma asíncrona, evitando demoras en la aplicación.
- **Apprise** (`caronc/apprise`), Envío de notificaciones push: Permite enviar notificaciones push al celular del cliente cuando su pedido salga del restaurante. Cuenta con una licencia BSD-2-Clause y una alta actividad reciente.
- **Celery** (`celery/celery`), Cola de tareas en segundo plano: Genera en segundo plano el recibo en PDF de cada pedido para no demorar la app mediante una cola de tareas distribuidas. Su licencia no está identificada por GitHub y mantiene actualizaciones recientes.
- Limitación: La herramienta seleccionada para mensajería no incluye por defecto la lógica específica de diseño o contenido para la generación de archivos PDF.
- Supuesto: Se asume que la aplicación cuenta con un backend capaz de integrar librerías en Python para el procesamiento de tareas y llamadas HTTP.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-mascotas-grafos`

> Estamos armando una red social para dueños de mascotas y queremos guardar quién conoce a quién en una base de datos de grafos, para sugerir amigos de amigos.

**gemini**
- `no_evidence` · Arquitectura de base de datos para red social de mascotas
- La propuesta cubre el almacenamiento requerido utilizando Redis para la gestión de estructuras de datos en tiempo real. No se encontró ninguna base de datos de grafos nativa entre los candidatos evaluados, por lo que se adaptará una alternativa clave-valor o en memoria.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Redis es una solución en memoria muy rápida y rica en estructuras de datos, aunque no es una base de datos de grafos especializada para guardar quién conoce a quién. Su licencia no fue identificada por GitHub y su último cambio fue hace 1 mes.
- Limitación: Ninguno de los candidatos encontrados es una base de datos de grafos especializada para sugerir amigos de amigos de forma nativa.
- Supuesto: Se asume que la red social puede modelar las relaciones de amistad utilizando las estructuras de datos que ofrece Redis a pesar de no ser una base de datos de grafos nativa.
- Rúbrica: español _ · rationale _ · coherencia _

### `mercadeo-sitio-vue`

> Una agencia de mercadeo va a rehacer su sitio web con un framework basado en Vue, y quiere que su equipo, que no sabe programar, cambie los textos y los banners sin pedírselo a los desarrolladores.

**gemini**
- `ok` · Arquitectura web con Vue y gestión de contenidos
- Esta propuesta incluye un framework full-stack basado en Vue para construir el sitio web y un sistema de gestión de contenidos que permite al equipo sin experiencia técnica actualizar textos y banners de forma independiente.
- **Nuxt** (`nuxt/nuxt`), Framework full-stack de Vue para construir la interfaz del sitio web: Nuxt es el framework full-stack basado en Vue que permite desarrollar la interfaz web de la agencia de mercadeo de forma moderna y eficiente, con una activa actualización reciente y licencia MIT.
- **Strapi** (`strapi/strapi`), CMS headless para que el equipo edite contenidos sin programar: Strapi es un sistema de gestión de contenido líder y personalizable que permite al equipo cambiar los textos y banners sin depender de los desarrolladores. La licencia no está identificada por GitHub.
- Limitación: La propuesta no incluye herramientas específicas para analíticas de marketing o despliegue automatizado.
- Supuesto: Se asume que la agencia cuenta con desarrolladores capaces de integrar el CMS con el framework de Vue elegido.
- Rúbrica: español _ · rationale _ · coherencia _

### `laboratorio-respaldos`

> Un laboratorio clínico quiere copias de seguridad automáticas de los resultados de sus exámenes cada noche, guardadas fuera del servidor principal, y un tablero que muestre cuántas muestras procesa cada sede por día.

**gemini**
- `ok` · Solución de respaldos y analítica para laboratorio clínico
- Esta propuesta integra almacenamiento S3 compatible para las copias de seguridad nocturnas y una herramienta de inteligencia de negocios para visualizar las muestras procesadas por sede en un tablero diario.
- **RustFS** (`rustfs/rustfs`), Almacenamiento externo: Permite guardar las copias de seguridad de los exámenes fuera del servidor principal mediante un sistema de almacenamiento de objetos de alto rendimiento compatible con S3, bajo licencia Apache-2.0 y mantenimiento activo.
- **Metabase** (`metabase/metabase`), Tablero operativo: Proporciona un tablero interactivo y fácil de usar para visualizar los datos del laboratorio. Su licencia no fue identificada por GitHub y cuenta con actualización reciente.
- Limitación: Ninguno de los candidatos incluye de forma nativa la automatización de la tarea cron nocturna para extraer los datos del servidor principal.
- Supuesto: Se asume que el laboratorio cuenta con un script o mecanismo de programación externo para ejecutar las copias de seguridad cada noche hacia el almacenamiento.
- Rúbrica: español _ · rationale _ · coherencia _

### `cosmeticos-facturas-embudo`

> Una tienda en línea de cosméticos necesita emitir la factura electrónica de cada venta y saber en qué paso del proceso de compra abandonan los clientes.

**gemini**
- `ok` · Sistema de pagos y analítica para tienda de cosméticos
- La propuesta integra una plataforma para la gestión de cobros y facturación junto con una herramienta de analítica web para rastrear el comportamiento y abandono de los clientes en el proceso de compra.
- **PostHog/posthog** (`PostHog/posthog`), Analítica de embudos: PostHog es una plataforma de análisis de producto que permite realizar seguimiento de conversiones, eventos y comportamiento, ayudando a identificar el abandono en el proceso de compra. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. La herramienta gestiona pagos y suscripciones, pero no ofrece de forma directa la emisión de facturas electrónicas para transacciones de comercio electrónico unitarias.
- Supuesto: Se asume que la tienda online cuenta con una infraestructura web compatible con la integración de scripts de analítica de producto.
- Rúbrica: español _ · rationale _ · coherencia _

### `empresa-aprobaciones`

> Una empresa de 200 empleados quiere que las solicitudes de vacaciones sigan un flujo de aprobación: el empleado la pide, su jefe la aprueba y recursos humanos la registra.

**gemini**
- `needs_clarification` · 
- Necesito un poco más de contexto para recomendarte herramientas.
- Pregunta: ¿Qué tipo de aplicación o plataforma utilizan actualmente para gestionar la comunicación interna o los recursos humanos?
- Pregunta: ¿Cómo prefieren que los empleados y aprobadores reciban las notificaciones sobre el estado de sus solicitudes?
- Pregunta: ¿Se requiere almacenar documentación adicional, como comprobantes o certificados médicos, adjunta a las solicitudes?
- Rúbrica: español _ · rationale _ · coherencia _

### `startup-trazas-gitops`

> Una startup tiene diez microservicios en Python sobre Kubernetes. Quiere ver por dónde pasa cada solicitud entre servicios para encontrar dónde se demora, y que cada cambio aprobado en el repositorio se despliegue solo en su clúster.

**gemini**
- `ok` · Plataforma de Observabilidad y Despliegue Continuo para Kubernetes
- La propuesta implementa rastreo distribuido para identificar cuellos de botella entre los microservicios y despliegues automatizados basados en GitOps para mantener actualizado el clúster.
- **Jaeger** (`jaegertracing/jaeger`), Rastreo distribuido de solicitudes: Permite ver por dónde pasa cada solicitud entre servicios gracias a su plataforma de rastreo distribuido compatible con OpenTelemetry. Cuenta con la licencia Apache-2.0 y alta actividad reciente.
- **Argo CD** (`argoproj/argo-cd`), Despliegue continuo en Kubernetes: Facilita que cada cambio aprobado en el repositorio se despliegue de forma declarativa en el clúster. Utiliza licencia Apache-2.0 y tiene un mantenimiento muy activo.
- Limitación: No se incluyen herramientas específicas de gestión de bases de datos o colas de tareas, ya que el pedido se centró en observabilidad y despliegue.
- Supuesto: Se asume que los microservicios en Python ya están instrumentados con OpenTelemetry o podrán ser adaptados para enviar trazas a Jaeger.
- Supuesto: Se asume que el repositorio de código utiliza Git para integrarse con el flujo de entrega continua.
- Rúbrica: español _ · rationale _ · coherencia _

### `artesanias-chat-busqueda`

> Un marketplace de artesanías quiere un chat en tiempo real entre compradores y vendedores dentro de la página, y un buscador de productos que encuentre resultados aunque el comprador escriba con errores.

**gemini**
- `ok` · Sistema de chat y búsqueda tolerante para marketplace
- Esta propuesta integra infraestructura de comunicación para conectar usuarios y un motor de búsqueda tolerante a errores para el catálogo de artesanías. Ambas herramientas se mantienen activamente y cubren las necesidades solicitadas por el negocio.
- **Typesense** (`typesense/typesense`), Buscador de productos: Typesense resuelve exactamente la necesidad al proveer un motor de búsqueda rápido, en memoria y tolerante a errores tipográficos para la experiencia de búsqueda. Utiliza licencia GPL-3.0, recibió su último cambio hace 0 meses y cuenta con 27100 estrellas.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Novu ofrece infraestructura de comunicación para productos, aunque no implementa directamente un chat en tiempo real peer-to-peer entre usuarios. Su licencia no fue identificada por GitHub y su último cambio fue hace 0 meses con 40301 estrellas.
- Supuesto: Se asume que la plataforma web del marketplace cuenta con la capacidad de integrarse mediante API con los servicios seleccionados.
- Rúbrica: español _ · rationale _ · coherencia _

### `distribuidora-datos`

> El equipo de datos de una distribuidora quiere transformar las ventas crudas en tablas limpias usando SQL versionado y con pruebas, y guardar el resultado en una base analítica rápida para consultar millones de filas.

**gemini**
- `ok` · Arquitectura moderna para transformación y análisis de ventas
- Esta propuesta integra herramientas para transformar los datos de ventas con SQL y pruebas, y almacenarlos en una base de datos analítica de alto rendimiento para consultas masivas. El sistema cubre completamente las necesidades del equipo de datos de la distribuidora.
- **dbt** (`dbt-labs/dbt`), Transformación y pruebas de datos con SQL: dbt permite transformar los datos usando las mismas prácticas que el desarrollo de software, encajando perfectamente con la solicitud de SQL versionado y con pruebas.
- **ClickHouse** (`ClickHouse/ClickHouse`), Base de datos analítica de alto rendimiento: ClickHouse ofrece un rendimiento optimizado para análisis en tiempo real y consultas sobre grandes volúmenes de datos.
- Limitación: No se han incluido herramientas de visualización de datos o Business Intelligence, ya que no fueron solicitadas explícitamente en las necesidades principales.
- Supuesto: Se asume que la distribuidora cuenta con un entorno de almacenamiento intermedio previo donde residen las ventas crudas.
- Supuesto: Se asume que el equipo de datos tiene conocimientos básicos en el uso de herramientas de modelado analítico mediante SQL.
- Rúbrica: español _ · rationale _ · coherencia _

### `revista-cdn`

> Una revista digital con lectores en toda Latinoamérica quiere que sus fotos carguen rápido en cualquier país, servidas desde servidores cercanos a cada lector.

**gemini**
- `ok` · Sistema de almacenamiento distribuido para revista digital
- Se propone una solución basada en almacenamiento distribuido para manejar los archivos multimedia de la revista y asegurar un acceso eficiente en la región. Queda pendiente la implementación específica de una red de entrega de contenido (CDN) para garantizar la proximidad geográfica a los lectores en Latinoamérica.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos: SeaweedFS resuelve el almacenamiento distribuido de archivos multimedia con acceso rápido a disco, permitiendo gestionar el volumen de imágenes de la revista de forma eficiente bajo una licencia Apache-2.0.
- Limitación: La propuesta no incluye de forma nativa la funcionalidad de CDN o geolocalización de servidores cercanos requerida explícitamente para los lectores en toda Latinoamérica.
- Supuesto: Se asume que la revista cuenta con servidores propios o nodos en diferentes países de Latinoamérica para desplegar el almacenamiento distribuido.
- Supuesto: Se requiere complementar la solución con una red de distribución de contenidos (CDN) externa para lograr la proximidad real a los lectores solicitada.
- Rúbrica: español _ · rationale _ · coherencia _

### `instituto-videoclases`

> Un instituto de idiomas quiere dar clases en vivo por videollamada desde el navegador y guardar las grabaciones para que los estudiantes las vean después.

**gemini**
- `ok` · Plataforma de Clases en Vivo y Almacenamiento de Videos
- Esta propuesta organiza la infraestructura para que el instituto de idiomas almacene las grabaciones de las clases de manera eficiente y distribuida. La necesidad de videollamadas en vivo no cuenta con una herramienta adecuada en el catálogo de comunicación y quedó sin resolver directamente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de grabaciones: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar miles de millones de archivos y objetos S3, lo que permite guardar las grabaciones de las clases de forma escalable. Cuenta con licencia Apache-2.0 y actividad reciente.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Se identifica como infraestructura de comunicación para productos y agentes, pero no ofrece capacidad de videollamadas en vivo para dar clases.
- Limitación: No se encontró ninguna herramienta en el catálogo que resuelva la necesidad de videollamadas en vivo para las clases.
- Supuesto: Se asume que el instituto cuenta con una plataforma web o cliente externo para realizar las videollamadas, ya que no se encontró una herramienta de videoconferencia adecuada.
- Supuesto: Se asume que la aplicación del instituto se conectará al sistema de almacenamiento mediante una API compatible.
- Rúbrica: español _ · rationale _ · coherencia _
