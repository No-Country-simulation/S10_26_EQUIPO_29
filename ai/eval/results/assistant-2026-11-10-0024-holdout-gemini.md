# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 00:24. 12 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.5 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 83% |
| Respuesta válida | 100% |
| Necesidades detectadas | 87% |
| Techo de la búsqueda (top 5) | 100% |
| Techo con 5 candidatos | 100% |
| Eligió un aceptable (donde había) | 97% |
| Se abstuvo (donde no había) | 56% |
| Acierto de punta a punta (comparable entre k) | 97% |
| Sin caja donde el caso no tiene herramientas | 56% |
| Eligió el primer candidato | 65% |
| Consistencia entre corridas | 33% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 3 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 14 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/36 |
| Tiempo total (mediana) | 3.6 s |
| Tiempo total (peor caso) | 4.8 s |
| Sobre 15 s | 0/36 |
| Entender · buscar · generar (mediana) | 1.5 s · 0.1 s · 2.0 s |
| Tokens entrada / salida (mediana) | 3950 / 559 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 12 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 83% | 83% | 83% | 83% – 83% |
| Eligió un aceptable (donde había) | 92% | 100% | 100% | 92% – 100% |
| Se abstuvo (donde no había) | 40% | 50% | 80% | 40% – 80% |
| Acierto de punta a punta | 92% | 100% | 100% | 92% – 100% |
| Textos del modelo que hablan del catálogo | 3 | 7 | 4 | 3 – 7 |

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
| `mercadeo-sitio-vue` · cms | strapi, payload | det 3/3 · techo 3 · eligió 2 |
| `laboratorio-respaldos` · storage | (ninguno) | det 3/3 · eligió algo 3 |
| `laboratorio-respaldos` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 3 |
| `cosmeticos-facturas-embudo` · payments | (ninguno) | det 3/3 · eligió algo 1 |
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
| `instituto-videoclases` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `ferreteria-sucursales`

> Una cadena de ferreterías con cinco sucursales quiere un sistema interno donde cada sucursal vea solo su propio inventario y sus ventas, y que las consultas repetidas al catálogo de productos respondan rápido.

**gemini**
- `ok` · Sistema de Inventario y Caché para Ferreterías
- La propuesta implementa una base de datos distribuida basada en valores clave para el almacenamiento y una herramienta optimizada para la caché en memoria que acelera las consultas repetidas al catálogo en las cinco sucursales.
- **Valkey** (`valkey-io/valkey`), Almacenamiento de inventario y ventas: Valkey es una base de datos de clave-valor distribuida y flexible optimizada para cargas de trabajo en tiempo real, adecuada para gestionar el inventario y las ventas de las sucursales. Su licencia es BSD-3-Clause y cuenta con mantenimiento reciente.
- **Redis** (`redis/redis`), Caché para el catálogo de productos: Redis funciona como un servidor de estructuras de datos y caché en memoria ideal para acelerar las consultas repetidas al catálogo de productos. Su licencia no está identificada por GitHub y presenta actividad reciente de mantenimiento.
- Limitación: La solución no incluye un módulo nativo de interfaz de usuario o panel de administración para las sucursales.
- Supuesto: Se asume que la lógica de aplicación se encargará de filtrar la información para que cada sucursal vea exclusivamente su propio inventario y sus ventas.
- Supuesto: Se asume que las cinco sucursales se conectan a una infraestructura centralizada o distribuida accesible por red.
- Rúbrica: español _ · rationale _ · coherencia _

### `domicilios-push`

> Una app de domicilios quiere enviar una notificación al celular del cliente cuando su pedido salga del restaurante, y generar en segundo plano el recibo en PDF de cada pedido para no demorar la app.

**gemini**
- `ok` · Sistema de notificaciones y procesamiento de tareas en segundo plano
- La propuesta implementa herramientas open source para el envío de notificaciones push a los clientes y el procesamiento de tareas distribuidas en segundo plano para la generación de recibos en PDF, asegurando el rendimiento de la aplicación de domicilios.
- **Apprise** (`caronc/apprise`), Envío de notificaciones móviles: Apprise permite enviar notificaciones push que funcionan con casi todas las plataformas, resolviendo el requerimiento de notificar al celular del cliente cuando su pedido salga del restaurante.
- **Celery** (`celery/celery`), Cola de tareas en segundo plano: Celery funciona como una cola de tareas distribuida que permite generar en segundo plano el recibo en PDF de cada pedido para no demorar la app. Su licencia no fue identificada por GitHub.
- Limitación: La solución no incluye la lógica de negocio específica para la creación de los archivos PDF ni la integración directa conpasarelas de pago.
- Supuesto: Se asume que la aplicación principal se comunica mediante una API para activar las tareas en segundo plano y las notificaciones.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-mascotas-grafos`

> Estamos armando una red social para dueños de mascotas y queremos guardar quién conoce a quién en una base de datos de grafos, para sugerir amigos de amigos.

**gemini**
- `no_evidence` · Almacenamiento clave-valor distribuido para red social de mascotas
- La propuesta utiliza un almacenamiento clave-valor distribuido para manejar los datos del sistema de la red social de mascotas. No se encontraron bases de datos de grafos entre los candidatos de la necesidad consultada.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. El candidato seleccionado es un almacén de clave-valor distribuido, útil para datos críticos, pero no proporciona una base de datos de grafos para registrar quién conoce a quién como se solicitó.
- Limitación: No se dispone de ninguna base de datos de grafos entre los candidatos encontrados para cumplir estrictamente con el requerimiento de guardar conexiones tipo grafo.
- Supuesto: Se asume que la red social comenzará con un volumen moderado de usuarios y relaciones.
- Supuesto: El sistema requerirá lógica de aplicación adicional para simular relaciones de grafos sobre un motor clave-valor.
- Rúbrica: español _ · rationale _ · coherencia _

### `mercadeo-sitio-vue`

> Una agencia de mercadeo va a rehacer su sitio web con un framework basado en Vue, y quiere que su equipo, que no sabe programar, cambie los textos y los banners sin pedírselo a los desarrolladores.

**gemini**
- `ok` · Arquitectura web con Vue y gestión de contenidos
- Esta propuesta incluye el framework full-stack basado en Vue para el desarrollo frontend y un sistema de gestión de contenidos headless para que el equipo no técnico pueda actualizar textos y banners sin depender de desarrolladores.
- **Nuxt** (`nuxt/nuxt`), Framework frontend: Es el framework full-stack basado en Vue ideal para construir la interfaz del sitio web con licencia MIT y mantenimiento activo.
- **Ghost** (`TryGhost/Ghost`), Gestor de contenidos: Proporciona tecnología independiente para publicación moderna, permitiendo la gestión de contenidos con licencia MIT y actualización reciente.
- Limitación: Ninguna de las opciones de CMS mencionadas explícitamente en los candidatos utiliza Vue como base principal, ya que Payload utiliza Next.js.
- Supuesto: La agencia cuenta con desarrolladores capaces de integrar el frontend en Vue con el sistema de contenidos elegido.
- Rúbrica: español _ · rationale _ · coherencia _

### `laboratorio-respaldos`

> Un laboratorio clínico quiere copias de seguridad automáticas de los resultados de sus exámenes cada noche, guardadas fuera del servidor principal, y un tablero que muestre cuántas muestras procesa cada sede por día.

**gemini**
- `ok` · Arquitectura de respaldo y analitica para laboratorio clinico
- Esta solucion provee almacenamiento de objetos compatible con S3 para respaldar los resultados de examenes fuera del servidor principal y una plataforma de visualizacion y tableros para monitorear las muestras procesadas por cada sede.
- **RustFS** (`rustfs/rustfs`), Almacenamiento externo para respaldos: RustFS provee un sistema de almacenamiento de objetos compatible con S3 que permite guardar los resultados de examenes fuera del servidor principal de forma segura.
- **Grafana** (`grafana/grafana`), Tablero de muestras por sede: Grafana provee una plataforma de visualizacion de datos y tableros para mostrar cuantas muestras procesa cada sede por dia.
- Limitación: No se incluye la herramienta especifica para la gestion automatizada de tareas nocturnas en el servidor principal.
- Supuesto: El laboratorio cuenta con un mecanismo de programacion de tareas para activar el respaldo nocturno hacia el almacenamiento externo.
- Supuesto: Las sedes envian sus datos de procesamiento de muestras a una fuente de datos accesible para el sistema de tableros.
- Rúbrica: español _ · rationale _ · coherencia _

### `cosmeticos-facturas-embudo`

> Una tienda en línea de cosméticos necesita emitir la factura electrónica de cada venta y saber en qué paso del proceso de compra abandonan los clientes.

**gemini**
- `ok` · Propuesta de sistema de pagos y analítica
- Esta propuesta incluye la gestión de cobros y facturación mediante una plataforma especializada de pagos, y el análisis del comportamiento de compra de los clientes con una herramienta de analítica web orientada a conversiones. Queda pendiente la emisión directa de facturas electrónicas específicas si los candidatos de pagos no la cubren de forma nativa.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos y facturación: Kill Bill resuelve el procesamiento de cobros y la gestión de facturación para las ventas de la tienda.
- **Umami** (`umami-software/umami`), Plataforma de analítica web: Umami permite analizar el comportamiento y las conversiones de los usuarios para identificar los puntos de abandono en el proceso de compra.
- Limitación: Ninguno de los candidatos asegura la emisión de facturas electrónicas adaptadas a normativas fiscales locales específicas.
- Supuesto: Se asume que la tienda de cosméticos opera mediante un sitio web donde se pueden rastrear los pasos del proceso de compra.
- Rúbrica: español _ · rationale _ · coherencia _

### `empresa-aprobaciones`

> Una empresa de 200 empleados quiere que las solicitudes de vacaciones sigan un flujo de aprobación: el empleado la pide, su jefe la aprueba y recursos humanos la registra.

**gemini**
- `needs_clarification` · 
- Necesito un poco más de contexto para recomendarte herramientas.
- Pregunta: ¿Qué tipo de aplicación o sistema prefieren usar para este flujo de aprobaciones?
- Pregunta: ¿Necesitan integrar esta herramienta con algún software de recursos humanos o directorio de empleados existente?
- Rúbrica: español _ · rationale _ · coherencia _

### `startup-trazas-gitops`

> Una startup tiene diez microservicios en Python sobre Kubernetes. Quiere ver por dónde pasa cada solicitud entre servicios para encontrar dónde se demora, y que cada cambio aprobado en el repositorio se despliegue solo en su clúster.

**gemini**
- `ok` · Arquitectura de observabilidad y despliegue continuo para microservicios
- La propuesta implementa una plataforma de rastreo distribuido para identificar demoras entre servicios y una herramienta de GitOps para automatizar los despliegues en el clúster. Estas herramientas cubren los requerimientos principales de visibilidad y entrega continua expresados por la startup.
- **Jaeger** (`jaegertracing/jaeger`), Rastreo distribuido de solicitudes: Permite ver por dónde pasa cada solicitud entre servicios para encontrar dónde se demora, utilizando una plataforma de rastreo distribuido bajo licencia Apache-2.0 con actividad reciente.
- **Flux2** (`fluxcd/flux2`), Despliegue continuo en Kubernetes: Automatiza la entrega continua asegurando que los cambios aprobados en el repositorio se desplieguen en el clúster. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- Limitación: La propuesta no incluye una herramienta específica de visualización general de métricas o tableros avanzados como Grafana, la cual podría complementar la observabilidad.
- Supuesto: Se asume que el repositorio de código ya cuenta con un flujo de aprobación previo para que la herramienta de despliegue continuo actúe sobre él.
- Rúbrica: español _ · rationale _ · coherencia _

### `artesanias-chat-busqueda`

> Un marketplace de artesanías quiere un chat en tiempo real entre compradores y vendedores dentro de la página, y un buscador de productos que encuentre resultados aunque el comprador escriba con errores.

**gemini**
- `ok` · Solución de comunicación y búsqueda tolerante a errores
- La propuesta cubre la comunicación en tiempo real entre compradores y vendedores mediante una infraestructura dedicada, y un buscador de productos rápido y tolerante a errores ortográficos para el marketplace.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Novu proporciona la infraestructura de comunicación de código abierto para productos, con licencia no identificada por GitHub y actividad reciente, adecuada para gestionar los mensajes del marketplace.
- **Typesense** (`typesense/typesense`), Motor de búsqueda: Typesense es un motor de búsqueda rápido y tolerante a errores ortográficos con licencia GPL-3.0 y actualización reciente, ideal para encontrar productos aunque se escriba con errores.
- Limitación: La herramienta de comunicación seleccionada no incluye por defecto una interfaz de chat completa lista para usar sin integración de desarrollo.
- Supuesto: Se asume que la plataforma del marketplace cuenta con una base de datos principal para el catálogo de productos que se sincronizará con el buscador.
- Supuesto: Se asume que la infraestructura de comunicación seleccionada puede adaptarse para soportar el flujo específico de chat entre usuarios.
- Rúbrica: español _ · rationale _ · coherencia _

### `distribuidora-datos`

> El equipo de datos de una distribuidora quiere transformar las ventas crudas en tablas limpias usando SQL versionado y con pruebas, y guardar el resultado en una base analítica rápida para consultar millones de filas.

**gemini**
- `ok` · Arquitectura de datos para procesamiento analítico rápido
- La propuesta utiliza herramientas robustas para transformar las ventas crudas mediante SQL versionado y almacenarlas en una base analítica optimizada para millones de filas. Se integra procesamiento y almacenamiento analítico eficiente para las necesidades de la distribuidora.
- **dbt** (`dbt-labs/dbt`), Transformación de datos: Permite transformar las ventas crudas en tablas limpias usando SQL versionado y con pruebas, aplicando prácticas de ingeniería de software.
- **DuckDB** (`duckdb/duckdb`), Base de datos analítica: Guarda el resultado en una base analítica rápida ideal para consultar millones de filas con alto rendimiento.
- Limitación: La propuesta no incluye una interfaz de visualización o Business Intelligence para la consulta final de los usuarios de negocio.
- Supuesto: Se asume que la distribuidora cuenta con un entorno operativo donde se pueden ejecutar herramientas basadas en Python y SQL.
- Supuesto: El volumen de datos actual y proyectado se adapta adecuadamente a una base de datos analítica embebida de alto rendimiento.
- Rúbrica: español _ · rationale _ · coherencia _

### `revista-cdn`

> Una revista digital con lectores en toda Latinoamérica quiere que sus fotos carguen rápido en cualquier país, servidas desde servidores cercanos a cada lector.

**gemini**
- `ok` · Sistema de almacenamiento distribuido para revista digital en Latinoamérica
- Esta propuesta implementa un sistema de almacenamiento distribuido para la revista digital, permitiendo gestionar y servir las fotos de forma eficiente. Queda fuera del alcance la infraestructura específica de entrega de contenido CDN geolocalizado en múltiples países de Latinoamérica.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos: Resuelve la necesidad de almacenar el contenido multimedia de la revista de forma distribuida para optimizar el acceso a los archivos. Cuenta con licencia Apache-2.0 y mantenimiento activo reciente, adaptándose bien a proyectos que manejan un gran volumen de imágenes y datos orientados a lectura rápida.
- Limitación: El candidato seleccionado no incluye por sí mismo una capa de CDN global o geolocalización automática de red sin configuración adicional.
- Limitación: No se evaluaron herramientas de caché en memoria para acelerar la entrega de metadatos, aunque podrían complementar el almacenamiento principal.
- Supuesto: Se asume que la revista cuenta con servidores o nodos en los diferentes países de Latinoamérica para desplegar el almacenamiento distribuido.
- Supuesto: Se requiere una red de entrega de contenido o mecanismos de enrutamiento geográfico externos para garantizar que las fotos se sirvan desde servidores cercanos a cada lector.
- Rúbrica: español _ · rationale _ · coherencia _

### `instituto-videoclases`

> Un instituto de idiomas quiere dar clases en vivo por videollamada desde el navegador y guardar las grabaciones para que los estudiantes las vean después.

**gemini**
- `ok` · Sistema para instituto de idiomas con videollamadas y almacenamiento
- Esta propuesta integra una plataforma de comunicación para las clases y un sistema de almacenamiento de objetos distribuido para guardar las grabaciones de las sesiones. Ambas herramientas permiten cubrir los requerimientos principales del instituto.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de grabaciones: SeaweedFS resuelve la necesidad de almacenar archivos multimedia gracias a su sistema de almacenamiento distribuido para objetos y archivos. Cuenta con licencia Apache-2.0 y alta actividad reciente.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Novu provee infraestructura de comunicación, pero no ofrece de forma directa una solución de videollamadas en vivo para navegadores.
- Supuesto: Se asume que el instituto cuenta con una solución complementaria específica para la interfaz de videollamadas en el navegador, ya que los candidatos de comunicación encontrados no cubren esa función de manera nativa.
- Rúbrica: español _ · rationale _ · coherencia _
