# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 01:23. 12 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.4 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 81% |
| Respuesta válida | 100% |
| Necesidades detectadas | 87% |
| Techo de la búsqueda (top 5) | 97% |
| Techo con 5 candidatos | 97% |
| Eligió un aceptable (donde había) | 100% |
| Se abstuvo (donde no había) | 65% |
| Acierto de punta a punta (comparable entre k) | 97% |
| Sin caja donde el caso no tiene herramientas | 62% |
| Eligió el primer candidato | 61% |
| Consistencia entre corridas | 25% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 3 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 9 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/36 |
| Tiempo total (mediana) | 3.9 s |
| Tiempo total (peor caso) | 4.7 s |
| Sobre 15 s | 0/36 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.2 s · 2.0 s |
| Tokens entrada / salida (mediana) | 3942 / 556 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 12 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 83% | 75% | 83% | 75% – 83% |
| Eligió un aceptable (donde había) | 100% | 100% | 100% | 100% – 100% |
| Se abstuvo (donde no había) | 60% | 71% | 60% | 60% – 71% |
| Acierto de punta a punta | 100% | 92% | 100% | 92% – 100% |
| Textos del modelo que hablan del catálogo | 5 | 2 | 2 | 2 – 5 |

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
| `cosmeticos-facturas-embudo` · payments | (ninguno) | det 3/3 · eligió algo 0 |
| `cosmeticos-facturas-embudo` · analytics | posthog, umami | det 3/3 · techo 3 · eligió 3 |
| `empresa-aprobaciones` · automation | (ninguno) | det 1/3 · eligió algo 1 |
| `startup-trazas-gitops` · observability | jaeger, opentelemetry-collector | det 3/3 · techo 3 · eligió 3 |
| `startup-trazas-gitops` · infrastructure | argo-cd, flux2 | det 3/3 · techo 3 · eligió 3 |
| `artesanias-chat-busqueda` · communication | (ninguno) | det 3/3 · eligió algo 2 |
| `artesanias-chat-busqueda` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-datos` · data-processing | dbt | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-datos` · database | ClickHouse, duckdb | det 3/3 · techo 3 · eligió 3 |
| `revista-cdn` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `instituto-videoclases` · communication | (ninguno) | det 3/3 · eligió algo 0 |
| `instituto-videoclases` · storage | seaweedfs, rustfs | det 3/3 · techo 2 · eligió 2 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `ferreteria-sucursales`

> Una cadena de ferreterías con cinco sucursales quiere un sistema interno donde cada sucursal vea solo su propio inventario y sus ventas, y que las consultas repetidas al catálogo de productos respondan rápido.

**gemini**
- `ok` · Sistema de gestión de inventario y caché
- La propuesta incluye el almacenamiento relacional de inventario y ventas mediante MariaDB, complementado con Valkey para acelerar las consultas repetidas al catálogo de productos en las sucursales.
- **MariaDB** (`MariaDB/server`), Almacén principal de datos: MariaDB provee el servidor de base de datos para registrar el inventario y las ventas de cada una de las sucursales con licencia GPL-2.0 y alta actividad reciente.
- **Valkey** (`valkey-io/valkey`), Caché de catálogo: Valkey se encarga de almacenar en memoria y responder de forma rápida a las consultas repetidas al catálogo de productos, bajo licencia BSD-3-Clause.
- Limitación: No se incluye la herramienta de desarrollo frontend ni la lógica de control de acceso por sucursal.
- Supuesto: Se asume que existe una aplicación intermediaria que aplica la lógica de aislamiento de datos para que cada sucursal vea solo su inventario.
- Supuesto: El catálogo de productos es compartido entre todas las sucursales.
- Rúbrica: español _ · rationale _ · coherencia _

### `domicilios-push`

> Una app de domicilios quiere enviar una notificación al celular del cliente cuando su pedido salga del restaurante, y generar en segundo plano el recibo en PDF de cada pedido para no demorar la app.

**gemini**
- `ok` · Sistema de notificaciones y procesamiento asíncrono para domicilios
- La propuesta integra infraestructura de comunicación para alertas y una cola de tareas distribuidas para el procesamiento en segundo plano de recibos en PDF. Se cubren todas las necesidades del negocio de forma eficiente.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Permite gestionar la comunicación con los usuarios de la app mediante una infraestructura open-source. Su licencia no fue identificada por GitHub. Se mantiene de forma activa con actualizaciones recientes.
- **Celery** (`celery/celery`), Cola de tareas distribuidas: Resuelve la ejecución de procesos pesados como la generación de recibos en PDF en segundo plano para evitar demoras en la app. Su licencia no está identificada por GitHub y cuenta con mantenimiento activo.
- Limitación: No se incluye la generación directa de archivos PDF, ya que la herramienta seleccionada solo gestiona la cola de tareas asíncronas.
- Supuesto: Se asume que la aplicación cuenta con un backend capaz de integrar infraestructura en Node.js y Python.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-mascotas-grafos`

> Estamos armando una red social para dueños de mascotas y queremos guardar quién conoce a quién en una base de datos de grafos, para sugerir amigos de amigos.

**gemini**
- `no_evidence` · Arquitectura de datos para red social de mascotas
- La propuesta cubre el almacenamiento principal utilizando las herramientas encontradas, aunque ninguna de ellas es una base de datos de grafos nativa para modelar relaciones complejas. Se asume que el sistema requerirá lógica adicional en la aplicación para gestionar las conexiones entre usuarios.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Los candidatos encontrados no ofrecen una base de datos de grafos para almacenar relaciones complejas como las solicitadas por el usuario.
- Limitación: Ninguno de los candidatos analizados proporciona una base de datos de grafos para sugerir amigos de amigos.
- Supuesto: Se asume que la lógica de grafos y relaciones se resolverá a nivel de aplicación al no haber una base de datos especializada en el catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `mercadeo-sitio-vue`

> Una agencia de mercadeo va a rehacer su sitio web con un framework basado en Vue, y quiere que su equipo, que no sabe programar, cambie los textos y los banners sin pedírselo a los desarrolladores.

**gemini**
- `ok` · Propuesta de sistema web con Vue y gestión de contenido
- Esta propuesta integra un framework full-stack basado en Vue para el desarrollo del sitio y un sistema de gestión de contenido para que el equipo pueda actualizar textos y banners sin depender de desarrolladores.
- **Nuxt** (`nuxt/nuxt`), Framework de desarrollo frontend: Resuelve la solicitud de utilizar un framework basado en Vue con su arquitectura full-stack e híbrida. Posee licencia MIT y actividad reciente.
- **Strapi** (`strapi/strapi`), Gestor de contenido para el equipo: Permite que el equipo sin conocimientos de programación administre y modifique textos y banners mediante su panel de administración. Su licencia no fue identificada por GitHub y cuenta con mantenimiento reciente.
- Limitación: La propuesta no incluye herramientas específicas para el flujo de aprobación interna del equipo de mercadeo.
- Supuesto: Se asume que la agencia cuenta con personal técnico capaz de conectar el frontend con el gestor de contenido.
- Rúbrica: español _ · rationale _ · coherencia _

### `laboratorio-respaldos`

> Un laboratorio clínico quiere copias de seguridad automáticas de los resultados de sus exámenes cada noche, guardadas fuera del servidor principal, y un tablero que muestre cuántas muestras procesa cada sede por día.

**gemini**
- `ok` · Sistema de respaldo externo y tablero para laboratorio
- Esta propuesta incluye almacenamiento de objetos compatible con S3 para las copias de seguridad nocturnas fuera del servidor principal y una herramienta de inteligencia de negocios para visualizar las muestras procesadas por cada sede en un tablero.
- **RustFS** (`rustfs/rustfs`), Almacenamiento de respaldos: Permite guardar las copias de seguridad automáticas fuera del servidor principal utilizando un sistema de almacenamiento de objetos compatible con S3, bajo licencia Apache-2.0 y mantenimiento activo.
- **Metabase** (`metabase/metabase`), Tablero de métricas de sedes: Proporciona la capacidad de crear tableros analíticos sencillos para visualizar cuántas muestras procesa cada sede por día. Su licencia no fue identificada por GitHub y recibe actualizaciones constantes.
- Limitación: No se incluyen herramientas específicas para la automatización y programación de las copias de seguridad nocturnas, por lo que requerirá scripts o tareas programadas externas.
- Supuesto: Se asume que los resultados de los exámenes se exportan en un formato que RustFS puede recibir mediante S3.
- Supuesto: Se asume que las bases de datos de las sedes se conectan directamente a Metabase para consultar el procesamiento diario de muestras.
- Rúbrica: español _ · rationale _ · coherencia _

### `cosmeticos-facturas-embudo`

> Una tienda en línea de cosméticos necesita emitir la factura electrónica de cada venta y saber en qué paso del proceso de compra abandonan los clientes.

**gemini**
- `ok` · Sistema de gestión de pagos y analítica de compras
- Esta propuesta incluye la plataforma de facturación y pagos junto con una herramienta de analítica web y de producto para medir el comportamiento de los clientes durante el proceso de compra. Se asume que la tienda en línea requiere procesamiento de pagos y métricas detalladas de conversión.
- **PostHog** (`PostHog/posthog`), Analizar el embudo de conversión y comportamiento: PostHog es una plataforma que incluye herramientas de analítica y seguimiento de comportamiento para identificar dónde los clientes abandonan el proceso de compra. Su licencia no fue identificada por GitHub y ha tenido cambios recientes.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. Kill Bill maneja pagos y suscripciones de código abierto bajo licencia Apache-2.0, aunque no emite específicamente facturas electrónicas fiscales.
- Limitación: Ninguno de los candidatos resuelve de forma nativa la emisión de factura electrónica legal para tiendas en línea.
- Supuesto: Se asume que la tienda requiere un sistema central para procesar pagos además de la facturación.
- Supuesto: Se asume que la analítica de producto se integrará directamente en la interfaz web de la tienda de cosméticos.
- Rúbrica: español _ · rationale _ · coherencia _

### `empresa-aprobaciones`

> Una empresa de 200 empleados quiere que las solicitudes de vacaciones sigan un flujo de aprobación: el empleado la pide, su jefe la aprueba y recursos humanos la registra.

**gemini**
- `needs_clarification` · 
- Necesito un poco más de contexto para recomendarte herramientas.
- Pregunta: ¿Qué tipo de aplicación o plataforma utilizan actualmente para gestionar la empresa y a través de la cual se realizarían estas solicitudes?
- Pregunta: ¿Tienen preferencia por algún lenguaje de programación o framework para construir este flujo de aprobación?
- Rúbrica: español _ · rationale _ · coherencia _

### `startup-trazas-gitops`

> Una startup tiene diez microservicios en Python sobre Kubernetes. Quiere ver por dónde pasa cada solicitud entre servicios para encontrar dónde se demora, y que cada cambio aprobado en el repositorio se despliegue solo en su clúster.

**gemini**
- `ok` · Arquitectura de Observabilidad y Despliegue GitOps para Kubernetes
- La propuesta implementa trazabilidad distribuida para analizar cuellos de botella entre microservicios y despliegue continuo automatizado para sincronizar el clúster con el repositorio.
- **Jaeger** (`jaegertracing/jaeger`), Plataforma de trazas distribuidas: Jaeger resuelve la necesidad de ver por dónde pasa cada solicitud entre servicios para encontrar dónde se demora, operando como una plataforma de trazabilidad distribuida con licencia Apache-2.0.
- **Argo CD** (`argoproj/argo-cd`), Herramienta de despliegue continuo: Argo CD permite que cada cambio aprobado en el repositorio se despliegue en su clúster de forma declarativa y automatizada, utilizando licencia Apache-2.0.
- Limitación: La propuesta no incluye un sistema centralizado de métricas ni tableros visuales avanzados para complementar la observabilidad.
- Supuesto: Se asume que los microservicios en Python están instrumentados para exportar trazas hacia la plataforma de observabilidad elegida.
- Supuesto: Se asume que el repositorio de código utiliza un flujo GitOps compatible con la herramienta de despliegue continuo seleccionada.
- Rúbrica: español _ · rationale _ · coherencia _

### `artesanias-chat-busqueda`

> Un marketplace de artesanías quiere un chat en tiempo real entre compradores y vendedores dentro de la página, y un buscador de productos que encuentre resultados aunque el comprador escriba con errores.

**gemini**
- `ok` · Arquitectura de chat y buscador tolerante a errores
- Esta propuesta implementa una infraestructura de comunicación para la mensajería y un motor de búsqueda optimizado para tolerar errores de escritura en el marketplace de artesanías. Quedan pendientes la interfaz de usuario web y la lógica de negocio específica de la plataforma.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Proporciona la infraestructura de comunicación open-source para productos y agentes. Su licencia no fue identificada por GitHub y cuenta con actividad reciente en su desarrollo.
- **Typesense** (`typesense/typesense`), Buscador de productos: Ofrece un motor de búsqueda rápido en memoria y tolerante a errores para crear experiencias de búsqueda ideales. Utiliza licencia GPL-3.0 y se mantiene actualizado con cambios recientes.
- Limitación: Novu se enfoca en infraestructura de comunicación general pero no provee la interfaz de chat en tiempo real lista para embeber entre compradores y vendedores.
- Supuesto: Se asume que la plataforma cuenta con una base de datos principal para almacenar los productos y perfiles de usuarios.
- Supuesto: Se asume que la interfaz de usuario del marketplace se conectará mediante API a los servicios seleccionados.
- Rúbrica: español _ · rationale _ · coherencia _

### `distribuidora-datos`

> El equipo de datos de una distribuidora quiere transformar las ventas crudas en tablas limpias usando SQL versionado y con pruebas, y guardar el resultado en una base analítica rápida para consultar millones de filas.

**gemini**
- `ok` · Arquitectura analítica para transformación y consulta de datos
- Esta propuesta implementa un flujo de transformación de datos mediante SQL versionado y pruebas, complementado con una base de datos analítica de alto rendimiento optimizada para consultar millones de filas.
- **dbt** (`dbt-labs/dbt`), Transformación de datos: Permite transformar las ventas crudas utilizando prácticas de desarrollo de software, facilitando el versionado y las pruebas sobre los datos.
- **ClickHouse** (`ClickHouse/ClickHouse`), Almacenamiento analítico: Proporciona una base de datos de análisis en tiempo real orientada a consultas rápidas sobre grandes volúmenes de datos.
- Limitación: No se incluyen herramientas de orquestación avanzada para los flujos de trabajo en esta propuesta.
- Supuesto: Se asume que la distribuidora cuenta con infraestructura propia para hospedar las herramientas seleccionadas.
- Supuesto: Se asume la necesidad de control de versiones externo para el código SQL utilizado en las transformaciones.
- Rúbrica: español _ · rationale _ · coherencia _

### `revista-cdn`

> Una revista digital con lectores en toda Latinoamérica quiere que sus fotos carguen rápido en cualquier país, servidas desde servidores cercanos a cada lector.

**gemini**
- `ok` · Sistema de almacenamiento distribuido para revista digital
- La propuesta implementa un sistema de almacenamiento distribuido para que los lectores de toda Latinoamérica accedan rápidamente a las fotos de la revista. El sistema seleccionado cubre el almacenamiento de objetos mediante una arquitectura de alto rendimiento, aunque quedan pendientes soluciones específicas de red de entrega de contenido (CDN) para la distribución geográfica.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento y distribución de archivos: Resuelve la necesidad de almacenar y gestionar los archivos de la revista digital gracias a su arquitectura de almacenamiento distribuido optimizada para objetos y sistemas de archivos con acceso rápido a disco.
- Limitación: La propuesta no incluye una red de entrega de contenido (CDN) dedicada para servir las fotos desde servidores locales en cada país de Latinoamérica, lo cual requiere infraestructura adicional.
- Supuesto: Se asume que la revista digital cuenta con una red de servidores propios o infraestructura para desplegar nodos de almacenamiento en diferentes países de Latinoamérica.
- Supuesto: El usuario requiere una solución para la gestión de archivos multimedia que luego pueda conectarse a una capa de distribución geográfica.
- Rúbrica: español _ · rationale _ · coherencia _

### `instituto-videoclases`

> Un instituto de idiomas quiere dar clases en vivo por videollamada desde el navegador y guardar las grabaciones para que los estudiantes las vean después.

**gemini**
- `ok` · Sistema de almacenamiento para grabaciones de clases
- Esta propuesta cubre el almacenamiento persistente de las grabaciones de video para que los estudiantes puedan consultarlas posteriormente. La necesidad de comunicación en vivo por videollamada quedó sin candidatos en el catálogo disponible.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos y objetos: SeaweedFS permite almacenar y gestionar archivos a gran escala, lo cual resulta ideal para guardar las grabaciones de video de las clases y facilitar su posterior acceso por parte de los estudiantes. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- Limitación: Comunicación: no se encontraron herramientas del catálogo para «dar clases en vivo por videollamada desde el navegador».
- Supuesto: Se asume que el instituto cuenta con una plataforma externa o desarrollo propio para integrar las videollamadas en vivo, ya que esa necesidad no tiene herramientas candidatas.
- Rúbrica: español _ · rationale _ · coherencia _
