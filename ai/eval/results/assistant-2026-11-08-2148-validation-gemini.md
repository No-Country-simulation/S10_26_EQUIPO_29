# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-08 a las 21:48. 10 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.8 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 94% |
| Techo de la búsqueda (top 5) | 85% |
| Techo con 5 candidatos | 85% |
| Eligió un aceptable (donde había) | 92% |
| Se abstuvo (donde no había) | 44% |
| Acierto de punta a punta (comparable entre k) | 78% |
| Sin caja donde el caso no tiene herramientas | — |
| Eligió el primer candidato | 55% |
| Consistencia entre corridas | 40% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 1 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 6 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/30 |
| Tiempo total (mediana) | 4.1 s |
| Tiempo total (peor caso) | 6.4 s |
| Sobre 15 s | 0/30 |
| Entender · buscar · generar (mediana) | 1.5 s · 0.1 s · 2.3 s |
| Tokens entrada / salida (mediana) | 3838 / 650 |
| Esperas (límite de uso o error temporal) | 30.0 s |

Evidencia direccional: 10 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 88% | 94% | 94% | 88% – 94% |
| Se abstuvo (donde no había) | 50% | 50% | 33% | 33% – 50% |
| Acierto de punta a punta | 70% | 85% | 79% | 70% – 85% |
| Textos del modelo que hablan del catálogo | 1 | 3 | 2 | 1 – 3 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `inmobiliaria-portal` · search | OpenSearch, meilisearch, typesense, pgvector | det 3/3 · techo 3 · eligió 1 |
| `inmobiliaria-portal` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `agencia-viajes-web` · frontend | next.js, astro, nuxt | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · backend | fastapi, django, flask | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 2 |
| `colegio-avisos` · data-processing | airflow, prefect, dagster | det 2/3 · techo 1 · eligió 1 |
| `colegio-avisos` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · payments | killbill, lago | det 3/3 · techo 3 · eligió 2 |
| `gimnasio-cobros` · communication | apprise | det 3/3 · techo 0 · eligió 0 |
| `gimnasio-cobros` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · observability | prometheus | det 3/3 · techo 3 · eligió 3 |
| `restaurantes-reportes` · data-processing | airflow, prefect, dagster | det 3/3 · techo 1 · eligió 1 |
| `restaurantes-reportes` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · messaging | kafka | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · database | ClickHouse | det 3/3 · techo 0 · eligió 0 |
| `energia-medidores` · analytics | grafana | det 0/3 · techo 0 · eligió 0 |
| `contable-chatbot` · ai | ollama, vllm | det 3/3 · techo 3 · eligió 3 |
| `contable-chatbot` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `inmobiliaria-portal`

> Estamos construyendo el portal web de una inmobiliaria. Los clientes tienen que poder buscar propiedades escribiendo cosas como 'apartamento con balcón cerca del metro', y los agentes suben las fotos y los planos de cada inmueble.

**gemini**
- `ok` · Portal Inmobiliario con Búsqueda Avanzada y Almacenamiento
- La propuesta implementa un sistema para la inmobiliaria utilizando Meilisearch para la búsqueda semántica y de texto libre de propiedades, y SeaweedFS para almacenar de forma eficiente las fotos y planos subidos por los agentes. No se detectaron necesidades adicionales sin cobertura en los candidatos provistos.
- **Meilisearch** (`meilisearch/meilisearch`), Motor de búsqueda: Resuelve la búsqueda de propiedades escribiendo descripciones en texto libre de forma ultrarrápida. Su licencia no fue identificada por GitHub y cuenta con actualización reciente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos: Permite que los agentes suban las fotos y los planos de cada inmueble gracias a su sistema de almacenamiento distribuido con acceso a disco optimizado. Utiliza la licencia Apache-2.0 y tiene actividad reciente.
- Limitación: No se incluyeron herramientas específicas para la autenticación de agentes o la gestión de bases de datos relacionales para los detalles de las propiedades.
- Supuesto: Se asume que el portal web cuenta con un backend intermediario para coordinar las peticiones entre la interfaz de usuario, el motor de búsqueda y el almacenamiento.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-viajes-web`

> Somos una agencia de viajes y vamos a rehacer nuestro sitio. Necesitamos un framework web para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google.

**gemini**
- `ok` · Arquitectura web de alto rendimiento para agencia de viajes
- La propuesta utiliza Next.js para construir las páginas de destinos de la agencia con renderizado rápido y optimización para motores de búsqueda. Quedan por definir aspectos avanzados de analítica de tráfico y pasarelas de pago para reservas.
- **Next.js** (`vercel/next.js`), Framework web principal: Next.js permite construir páginas de destinos con renderizado híbrido bajo licencia MIT, facilitando la carga rápida y el posicionamiento en Google solicitado por la agencia.
- Limitación: La propuesta no incluye herramientas específicas para pruebas automatizadas ni para diseño de estilos avanzados.
- Supuesto: Se asume que la agencia cuenta con desarrolladores con experiencia en React.
- Supuesto: El sitio web requerirá integración futura con sistemas de reservas y pasarelas de pago.
- Rúbrica: español _ · rationale _ · coherencia _

### `cooperativa-api`

> Somos dos desarrolladores de Python en una cooperativa agrícola. Queremos elegir un framework para la API que registra las entregas de café de cada productor, y una base de datos relacional para guardar esos registros.

**gemini**
- `ok` · Arquitectura de API y Base de Datos para Cooperativa Agrícola
- Se propone una solución basada en Python y SQL para gestionar las entregas de café de la cooperativa. FastAPI cubrirá el desarrollo de la API de alto rendimiento, mientras que SQLModel ofrecerá una integración robusta y sencilla para la base de datos relacional.
- **FastAPI** (`fastapi/fastapi`), Framework para construir la API de registro de entregas: FastAPI es un framework de alto rendimiento, fácil de aprender y rápido de codificar, ideal para crear la API que registra las entregas de café. Cuenta con licencia MIT y alta actividad reciente.
- **SQLModel** (`fastapi/sqlmodel`), Gestión de la base de datos relacional para los registros: SQLModel permite trabajar con bases de datos SQL en Python de forma compatible y robusta bajo licencia MIT, facilitando el almacenamiento de los registros de la cooperativa.
- Limitación: La propuesta no incluye herramientas adicionales de caché o búsqueda vectorial avanzada como Redis o Qdrant, las cuales podrían complementar el sistema si se requiere análisis en tiempo real.
- Supuesto: Se asume que la aplicación se desplegará en un entorno Linux estándar con soporte para aplicaciones asíncronas en Python.
- Rúbrica: español _ · rationale _ · coherencia _

### `colegio-avisos`

> Un colegio quiere una aplicación donde los profesores registren la asistencia. Cada noche debe calcular el porcentaje de asistencia de cada estudiante y avisar por correo o SMS a los padres cuando baje del 80 %.

**gemini**
- `ok` · Sistema open source para control de asistencia escolar
- Esta propuesta integra una API robusta en FastAPI para la gestión de asistencia, una base de datos distribuida en Valkey para el almacenamiento y caché de registros, y la plataforma de entrega de correos Postal para notificar a los padres. El procesamiento nocturno y cálculo de métricas deberá resolverse mediante lógica programada en el backend, ya que los candidatos de procesamiento de datos se enfocan en telemetría y analítica web.
- **FastAPI** (`fastapi/fastapi`), API del servidor para registro de asistencia: FastAPI es un framework de alto rendimiento, fácil de aprender y rápido de codificar, ideal para construir la API donde los profesores registrarán la asistencia.
- **Valkey** (`valkey-io/valkey`), Almacenamiento de datos de asistencia: Valkey es una base de datos de clave-valor distribuida y flexible, optimizada para almacenamiento y operaciones en tiempo real.
- **Postal** (`postalserver/postal`), Plataforma de envío de correos electrónicos: Postal es una plataforma de entrega de correo electrónico completamente funcional para correos salientes, resolviendo el aviso por correo a los padres.
- Limitación: Procesamiento de datos: ninguna de las herramientas encontradas encaja. Ninguno de los candidatos analizados realiza procesamiento de datos educativos o cálculos de porcentajes escolares; Prometheus solo gestiona métricas de sistemas.
- Limitación: La propuesta no incluye una solución directa para el envío de mensajes de texto por SMS, ya que Postal se limita al correo electrónico y el candidato de comunicación Apprise u otros servicios de SMS no fueron seleccionados.
- Supuesto: Se asume que el cálculo nocturno del porcentaje de asistencia se programará como una tarea en segundo plano dentro del backend utilizando cron o un planificador similar.
- Supuesto: Se asume que el envío de SMS requerirá una integración adicional no cubierta por la plataforma de correo seleccionada.
- Rúbrica: español _ · rationale _ · coherencia _

### `ong-voluntarios`

> Una ONG de voluntariado quiere que sus voluntarios entren con su cuenta de Google y guardar los certificados escaneados de cada uno en PDF.

**gemini**
- `ok` · Sistema de Autenticacion y Almacenamiento para ONG
- Se propone una solucion robusta utilizando Keycloak para la autenticacion de voluntarios mediante cuentas externas y SeaweedFS para el almacenamiento eficiente de los certificados en PDF.
- **Keycloak** (`keycloak/keycloak`), Servidor de autenticacion: Keycloak gestiona la autenticacion y el acceso de los voluntarios permitiendo la integracion con proveedores de identidad externos bajo licencia Apache-2.0 y con actividad reciente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de documentos: SeaweedFS almacena de forma distribuida los certificados escaneados de cada voluntario en PDF, operando con licencia Apache-2.0 y mantenimiento activo.
- Limitación: La propuesta no incluye la interfaz de usuario web o movil para que los voluntarios interactuen con el sistema.
- Limitación: No se resolvieron requerimientos de envio de correos o notificaciones.
- Supuesto: Se asume que la ONG cuenta con infraestructura propia para hospedar los servicios seleccionados.
- Supuesto: Se requiere una interfaz de aplicacion cliente que conecte el inicio de sesion de Keycloak con el almacenamiento en SeaweedFS.
- Rúbrica: español _ · rationale _ · coherencia _

### `gimnasio-cobros`

> Un gimnasio con tres sedes quiere cobrar las mensualidades en línea, avisar por WhatsApp a los socios que se atrasan en el pago y guardar el historial de pagos en una base de datos relacional.

**gemini**
- `ok` · Sistema de pagos y gestión para gimnasio multisede
- Esta propuesta implementa una plataforma para cobrar las mensualidades en línea y almacena el historial de pagos de forma segura en una base de datos relacional. Quedan pendientes la comunicación por WhatsApp y la gestión específica para tres sedes.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos en línea: Permite cobrar las mensualidades en línea conectándose a múltiples proveedores de pago con una plataforma integrable y de alto rendimiento bajo licencia Apache 2.0.
- **MariaDB** (`MariaDB/server`), Almacenamiento relacional: Guarda de forma segura el historial de pagos en una base de datos relacional madura, con actualizaciones recientes y bajo licencia GPL 2.0.
- Limitación: Comunicación: no se encontraron herramientas del catálogo para «avisar por WhatsApp a los socios que se atrasan en el pago».
- Limitación: No se incluye ninguna herramienta para el envío de avisos por WhatsApp a los socios.
- Limitación: No se abordan funciones específicas para la administración centralizada de las tres sedes del gimnasio.
- Supuesto: Se asume que el gimnasio cuenta con un backend propio para coordinar la lógica de negocio entre las pasarelas de pago y la base de datos.
- Supuesto: El servicio de mensajería para avisar por WhatsApp a los socios atrasados requiere una herramienta o integración externa no cubierta por los candidatos actuales.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-buscador`

> Tenemos una tienda en línea de repuestos para motos con la API hecha en Django. Queremos agregar un buscador de productos por nombre o referencia (el equipo pensaba en Elasticsearch) y medir la latencia y los errores de la API.

**gemini**
- `ok` · Arquitectura de búsqueda y observabilidad para tienda de repuestos
- Esta propuesta integra un motor de búsqueda de texto completo y una plataforma de monitoreo de métricas para optimizar la tienda de repuestos en línea. Se cubren las necesidades de búsqueda y observabilidad utilizando herramientas de código abierto activamente mantenidas.
- **Typesense** (`typesense/typesense`), Motor de búsqueda de productos: Resuelve la búsqueda de productos por nombre o referencia al ser un motor de búsqueda rápido y tolerante a errores con licencia GPL-3.0 y actividad reciente.
- **Prometheus** (`prometheus/prometheus`), Recopilación de métricas de la API: Mide la latencia y los errores de la API recolectando métricas y datos de series temporales de forma eficiente con licencia Apache-2.0.
- Limitación: El usuario mencionó Elasticsearch, pero la herramienta elegida es Typesense por sus ventajas de rendimiento y facilidad de uso.
- Supuesto: Se asume que la API en Django puede exponer métricas compatibles con Prometheus y enviar consultas de búsqueda vía HTTP a Typesense.
- Rúbrica: español _ · rationale _ · coherencia _

### `restaurantes-reportes`

> Una cadena de doce restaurantes quiere procesar cada noche las ventas del día de todos sus locales para recalcular el inventario de cada uno, y mandar por correo el reporte a cada gerente a primera hora.

**gemini**
- `ok` · Sistema nocturno de procesamiento de ventas e inventario
- Esta propuesta implementa un sistema para procesar las ventas nocturnas y actualizar inventarios mediante una plataforma de programación de flujos, un transformador de datos analíticos y una plataforma de entrega de correo electrónico para los gerentes.
- **Apache Airflow** (`apache/airflow`), Programar y ejecutar las tareas nocturnas de procesamiento de ventas.: Permite autor, programar y monitorear flujos de trabajo de manera programática bajo una licencia Apache-2.0 y con mantenimiento reciente.
- **dbt** (`dbt-labs/dbt`), Transformar y recalcular el inventario de cada local a partir de las ventas.: Facilita la transformación de datos mediante modelado analítico y prácticas de desarrollo bajo licencia Apache-2.0 y actualizaciones recientes.
- **Postal** (`postalserver/postal`), Enviar por correo el reporte de inventario a cada gerente.: Ofrece una plataforma completa de entrega de correo con soporte SMTP bajo licencia MIT y con actividad reciente.
- Limitación: No se incluyeron herramientas de control de infraestructura como Terraform, que requeriría adaptación para resolver el negocio.
- Supuesto: Los locales de la cadena cuentan con una infraestructura centralizada o accesible por red para consolidar las ventas del día.
- Supuesto: Los datos de ventas y stock están almacenados en bases de datos compatibles con las herramientas elegidas.
- Rúbrica: español _ · rationale _ · coherencia _

### `energia-medidores`

> Una empresa de energía recibe lecturas de 50.000 medidores cada 15 minutos. Quiere recibirlas en streaming con Kafka, guardarlas en una base de datos para series de tiempo como InfluxDB y mostrar tableros de consumo en Grafana.

**gemini**
- `ok` · Arquitectura de streaming y almacenamiento para medidores
- Esta propuesta implementa un sistema para la ingesta en streaming de lecturas de medidores utilizando Apache Kafka, almacenamiento de series temporales con Prometheus y visualización de datos en tableros mediante Grafana.
- **Prometheus** (`prometheus/prometheus`), Almacenamiento de series temporales: Prometheus es un sistema de monitoreo y base de datos de series temporales ideal para registrar métricas y datos de consumo. Cuenta con la licencia Apache-2.0 y mantiene actividad constante con actualizaciones recientes.
- **Apache Kafka** (`apache/kafka`), Ingesta de eventos en streaming: Apache Kafka es una plataforma de transmisión de eventos distribuidos que permite recibir las lecturas de los medidores en streaming de forma confiable. Utiliza la licencia Apache-2.0 y cuenta con un desarrollo muy activo.
- **Grafana** (`grafana/grafana`), Visualización de tableros de consumo: Grafana es la plataforma de visualización de datos y observabilidad ideal para mostrar tableros de consumo a partir de múltiples fuentes. Tiene licencia AGPL-3.0 y se mantiene activamente actualizada.
- Limitación: El usuario nombró InfluxDB, pero no se encuentra entre los candidatos de la necesidad de bases de datos, por lo que se utilizó Prometheus en su lugar.
- Supuesto: Se asume que los medidores envían la información en un formato compatible o mediante pasarelas que se integran con Kafka.
- Supuesto: El usuario solicitó InfluxDB para la base de datos, pero como no estaba disponible entre los candidatos de esa necesidad, se seleccionó Prometheus.
- Rúbrica: español _ · rationale _ · coherencia _

### `contable-chatbot`

> Un estudio contable quiere un chatbot interno que responda preguntas sobre sus manuales de procedimientos usando un modelo de lenguaje que corra en sus propios servidores, y que solo puedan entrar los empleados con cuenta.

**gemini**
- `ok` · Arquitectura segura para chatbot interno con modelos locales
- Esta propuesta despliega un motor de inferencia local para ejecutar modelos de lenguaje en los servidores del estudio contable y un sistema de identidad para asegurar el acceso exclusivo de los empleados. La integración garantiza que las consultas sobre manuales de procedimientos se realicen de forma privada y autenticada.
- **Ollama** (`ollama/ollama`), Motor de ejecución de modelos de lenguaje: Permite poner en marcha y ejecutar diversos modelos de lenguaje de forma local en los propios servidores del estudio contable para responder preguntas sobre los manuales.
- **Keycloak** (`keycloak/keycloak`), Sistema de autenticación de usuarios: Provee infraestructura de identidad y acceso de código abierto para gestionar las cuentas y asegurar que solo los empleados puedan entrar al sistema.
- Limitación: La propuesta no incluye una base de datos vectorial para la indexación de los manuales de procedimientos, lo cual requeriría componentes adicionales como LangChain o Hugging Face.
- Supuesto: Se asume que los servidores propios cuentan con los recursos de hardware necesarios para ejecutar inferencia de modelos de lenguaje.
- Supuesto: Se asume que el chatbot dispondrá de una interfaz web o API para conectarse con los servicios elegidos.
- Rúbrica: español _ · rationale _ · coherencia _
