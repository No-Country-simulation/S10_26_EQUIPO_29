# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 15:52. 10 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 5.1 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 83% |
| Techo de la búsqueda (top 5) | 95% |
| Techo con 5 candidatos | 95% |
| Eligió un aceptable (donde había) | 93% |
| Se abstuvo (donde no había) | 100% |
| Acierto de punta a punta (comparable entre k) | 88% |
| Sin caja donde el caso no tiene herramientas | — |
| Recibe una herramienta aceptable, como lo ve el usuario | 72% |
| Se abstuvo, como lo ve el usuario | — |
| Eligió el primer candidato | 54% |
| Consistencia entre corridas | 30% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 1 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 1 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/30 |
| Tiempo total (mediana) | 3.8 s |
| Tiempo total (peor caso) | 4.9 s |
| Sobre 15 s | 0/30 |
| Entender · buscar · generar (mediana) | 1.4 s · 0.1 s · 2.2 s |
| Tokens entrada / salida (mediana) | 4472 / 638 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 10 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 89% | 100% | 89% | 89% – 100% |
| Se abstuvo (donde no había) | 100% | 100% | 100% | 100% – 100% |
| Acierto de punta a punta | 84% | 95% | 84% | 84% – 95% |
| Recibe una herramienta aceptable, como lo ve el usuario | 70% | 78% | 70% | 70% – 78% |
| Se abstuvo, como lo ve el usuario | — | — | — | — |
| Textos del modelo que hablan del catálogo | 0 | 0 | 1 | 0 – 1 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `inmobiliaria-portal` · search | OpenSearch, meilisearch, typesense, pgvector | det 3/3 · techo 3 · eligió 1 |
| `inmobiliaria-portal` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `agencia-viajes-web` · frontend | next.js, astro, nuxt | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · backend | fastapi, django, flask | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `colegio-avisos` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `colegio-avisos` · data-processing | airflow, prefect, dagster | det 0/3 · techo 0 · eligió 0 |
| `colegio-avisos` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · communication | apprise | det 3/3 · techo 0 · eligió 0 |
| `gimnasio-cobros` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · observability | prometheus | det 3/3 · techo 3 · eligió 3 |
| `restaurantes-reportes` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `restaurantes-reportes` · data-processing | airflow, prefect, dagster | det 3/3 · techo 3 · eligió 3 |
| `restaurantes-reportes` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · messaging | kafka | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · database | ClickHouse | det 3/3 · techo 3 · eligió 1 |
| `energia-medidores` · analytics | grafana | det 0/3 · techo 0 · eligió 0 |
| `contable-chatbot` · ai | ollama, vllm | det 3/3 · techo 3 · eligió 3 |
| `contable-chatbot` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `inmobiliaria-portal`

> Estamos construyendo el portal web de una inmobiliaria. Los clientes tienen que poder buscar propiedades escribiendo cosas como 'apartamento con balcón cerca del metro', y los agentes suben las fotos y los planos de cada inmueble.

**gemini**
- `ok` · Portal web inmobiliario con búsqueda semántica y almacenamiento de fotos
- Este sistema permite a los clientes buscar propiedades de forma avanzada y a los agentes gestionar todo el contenido multimedia de los inmuebles. La propuesta integra un motor de búsqueda con inteligencia artificial y un sistema de almacenamiento distribuido de objetos.
- **Qdrant** (`qdrant/qdrant`), Búsqueda semántica: Resuelve la búsqueda de propiedades escribiendo descripciones detalladas gracias a su motor de búsqueda vectorial y soporte para IA. Cuenta con licencia Apache-2.0 y actividad reciente en GitHub.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento multimedia: Permite que los agentes suban las fotos y los planos de cada inmueble mediante su sistema de almacenamiento distribuido para archivos y objetos. Posee licencia Apache-2.0 y mantenimiento activo.
- Limitación: La propuesta no incluye la gestión de usuarios ni la autenticación de los agentes inmobiliarios.
- Supuesto: Se asume que el portal web cuenta con un backend propio para coordinar las peticiones entre la interfaz de usuario, el motor de búsqueda y el almacenamiento.
- Supuesto: Se requiere procesar las descripciones textuales de los clientes para convertirlas en vectores compatibles con el motor de búsqueda.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-viajes-web`

> Somos una agencia de viajes y vamos a rehacer nuestro sitio. Necesitamos un framework web para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google.

**gemini**
- `ok` · Sistema web para agencia de viajes con renderizado rápido
- La propuesta implementa un framework frontend robusto para la agencia de viajes que permite construir páginas de destinos con renderizado rápido y optimizado para buscadores. El sistema se centra exclusivamente en el desarrollo de la interfaz web y la optimización de la velocidad de carga.
- **Next.js** (`vercel/next.js`), Framework web frontend para construir y renderizar las páginas de destinos: Resuelve la necesidad de crear páginas de destinos que carguen muy rápido y se posicionen bien en Google mediante renderizado híbrido. Es un framework moderno con licencia MIT y alta actividad reciente.
- Limitación: La propuesta no incluye un sistema de gestión de contenidos (CMS) para administrar los destinos de forma visual.
- Supuesto: Se asume que la agencia cuenta con desarrolladores con experiencia en React.
- Supuesto: El alojamiento y la infraestructura para desplegar el sitio se gestionarán de forma externa.
- Rúbrica: español _ · rationale _ · coherencia _

### `cooperativa-api`

> Somos dos desarrolladores de Python en una cooperativa agrícola. Queremos elegir un framework para la API que registra las entregas de café de cada productor, y una base de datos relacional para guardar esos registros.

**gemini**
- `ok` · Sistema de registro para entregas de café en cooperativa
- Se propone una arquitectura basada en un framework moderno de Python para la API y un robusto sistema de base de datos relacional para gestionar los registros de los productores. La propuesta cubre eficientemente las necesidades del backend y del almacenamiento de datos.
- **FastAPI** (`fastapi/fastapi`), Framework para la API de registros: FastAPI es un framework de alto rendimiento, fácil de aprender y rápido de codificar, ideal para crear la API que registra las entregas de café de cada productor. Cuenta con licencia MIT y se mantiene activamente.
- **MariaDB** (`MariaDB/server`), Base de datos relacional: MariaDB server es una base de datos relacional robusta y mantenida activamente, adecuada para guardar los registros de las entregas de café de cada productor. Utiliza la licencia GPL-2.0.
- Limitación: No se incluye un ORM en una caja separada, aunque se podrían utilizar herramientas complementarias como SQLModel para la integración con la base de datos.
- Supuesto: Se asume que la cooperativa cuenta con infraestructura propia o en la nube para desplegar la API y la base de datos.
- Supuesto: Se asume que el equipo de dos desarrolladores tiene experiencia básica en Python y SQL.
- Rúbrica: español _ · rationale _ · coherencia _

### `colegio-avisos`

> Un colegio quiere una aplicación donde los profesores registren la asistencia. Cada noche debe calcular el porcentaje de asistencia de cada estudiante y avisar por correo o SMS a los padres cuando baje del 80 %.

**gemini**
- `ok` · Sistema de notificaciones de asistencia escolar
- La propuesta implementa una plataforma de comunicación para enviar correos electrónicos o mensajes cuando la asistencia de los estudiantes disminuya. Quedan sin resolver el registro de asistencia de los profesores y el cálculo nocturno del porcentaje.
- **Novu** (`novuhq/novu`), Plataforma de comunicación: Permite gestionar el envío de avisos a los padres mediante su infraestructura de comunicación. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- Limitación: La propuesta no incluye la aplicación para que los profesores registren la asistencia ni el módulo de cálculo automático nocturno.
- Supuesto: El colegio cuenta con un sistema externo o base de datos propia para que los profesores registren la asistencia y realicen el cálculo nocturno del porcentaje.
- Rúbrica: español _ · rationale _ · coherencia _

### `ong-voluntarios`

> Una ONG de voluntariado quiere que sus voluntarios entren con su cuenta de Google y guardar los certificados escaneados de cada uno en PDF.

**gemini**
- `ok` · Sistema de gestión para voluntarios de ONG
- La propuesta implementa infraestructura de autenticación de usuarios y almacenamiento distribuido de documentos para la ONG. Se asegura el acceso de los voluntarios mediante proveedores externos y se resguardan sus archivos en PDF de forma eficiente.
- **Ory Kratos** (`ory/kratos`), Autenticación de voluntarios: Resuelve la autenticación de usuarios permitiendo el inicio de sesión social y OIDC con una arquitectura moderna y escalable. Cuenta con licencia Apache-2.0 y actividad reciente en GitHub.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de certificados: Permite guardar los certificados escaneados de cada uno en PDF mediante un sistema de almacenamiento distribuido con soporte para objetos y acceso rápido. Posee licencia Apache-2.0 y mantenimiento constante.
- Limitación: No se incluye una interfaz de usuario visual lista para usar en Ory Kratos, ya que es headless.
- Limitación: No se incluye un motor de escaneo o conversión directa de documentos físicos a PDF.
- Supuesto: La ONG cuenta con infraestructura propia para desplegar los servicios seleccionados.
- Supuesto: Se requiere una interfaz web propia para conectar el inicio de sesión de Google con el almacenamiento de archivos.
- Rúbrica: español _ · rationale _ · coherencia _

### `gimnasio-cobros`

> Un gimnasio con tres sedes quiere cobrar las mensualidades en línea, avisar por WhatsApp a los socios que se atrasan en el pago y guardar el historial de pagos en una base de datos relacional.

**gemini**
- `ok` · Sistema de gestión de cobros y pagos para gimnasio
- Esta propuesta implementa la plataforma para cobrar las mensualidades en línea mediante Kill Bill y almacena el historial de pagos en una base de datos relacional con MariaDB. La necesidad de avisar por WhatsApp a los socios que se atrasan en el pago quedó sin herramienta en esta selección.
- **Kill Bill** (`killbill/killbill`), Plataforma de cobros: Kill Bill es una plataforma open-source de facturación de suscripciones y pagos que permite gestionar los cobros en línea para las tres sedes del gimnasio bajo licencia Apache-2.0.
- **MariaDB** (`MariaDB/server`), Base de datos relacional: MariaDB Server es un servidor de base de datos relacional desarrollado por la comunidad que permite almacenar de forma confiable el historial de pagos del negocio bajo licencia GPL-2.0.
- Limitación: Comunicación: no se encontraron herramientas del catálogo para «avisar por WhatsApp a los socios que se atrasan en el pago».
- Supuesto: Se asume que las tres sedes operan bajo una infraestructura centralizada o conectada a la misma red de servicios.
- Supuesto: Se asume que la pasarela de pagos se integra a través de la plataforma elegida para procesar las tarjetas de los socios.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-buscador`

> Tenemos una tienda en línea de repuestos para motos con la API hecha en Django. Queremos agregar un buscador de productos por nombre o referencia (el equipo pensaba en Elasticsearch) y medir la latencia y los errores de la API.

**gemini**
- `ok` · Sistema de búsqueda y monitoreo para tienda de repuestos
- Esta propuesta integra un motor de búsqueda de texto rápido y un sistema de monitoreo para medir la latencia y los errores de la API de la tienda en línea. Ambas herramientas operan de forma independiente para potenciar la experiencia del cliente y la observabilidad del negocio.
- **Typesense** (`typesense/typesense`), Motor de búsqueda: Resuelve la búsqueda de productos por nombre o referencia ofreciendo una alternativa rápida y tolerante a errores, con licencia GPL-3.0 y mantenimiento activo.
- **Prometheus** (`prometheus/prometheus`), Sistema de monitoreo: Mide la latencia y los errores de la API mediante la recolección de métricas y monitoreo, bajo licencia Apache-2.0 y con actualización reciente.
- Limitación: El usuario mencionó Elasticsearch, pero entre los candidatos evaluados se seleccionó Typesense como alternativa principal.
- Limitación: La propuesta no incluye paneles de visualización avanzados para las métricas recolectadas, para lo cual se requeriría complementar con una herramienta de visualización.
- Supuesto: Se asume que la API en Django cuenta con endpoints expuestos para integrarse con el motor de búsqueda y exportar métricas hacia el sistema de monitoreo.
- Rúbrica: español _ · rationale _ · coherencia _

### `restaurantes-reportes`

> Una cadena de doce restaurantes quiere procesar cada noche las ventas del día de todos sus locales para recalcular el inventario de cada uno, y mandar por correo el reporte a cada gerente a primera hora.

**gemini**
- `ok` · Sistema nocturno de procesamiento de ventas y reportes
- La propuesta automatiza el procesamiento nocturno de las ventas y el recálculo de inventarios de los restaurantes, integrándose con una plataforma de entrega de correo para enviar los reportes matutinos a cada gerente.
- **Prefect** (`PrefectHQ/prefect`), Orquestador de pipelines de datos: Prefect permite automatizar los pipelines en Python para procesar cada noche las ventas del día y recalcular el inventario de la cadena de restaurantes.
- **Postal** (`postalserver/postal`), Plataforma de correo electrónico: Postal sirve para mandar por correo los reportes de ventas e inventario a cada gerente a primera hora.
- Limitación: No se incluyeron herramientas específicas para la interfaz visual de gestión de los inventarios locales.
- Supuesto: Los datos de ventas de los doce restaurantes se centralizan previamente en una base de datos accesible por el pipeline de procesamiento.
- Supuesto: Se cuenta con un servidor SMTP o la infraestructura necesaria para operar la plataforma de correo.
- Rúbrica: español _ · rationale _ · coherencia _

### `energia-medidores`

> Una empresa de energía recibe lecturas de 50.000 medidores cada 15 minutos. Quiere recibirlas en streaming con Kafka, guardarlas en una base de datos para series de tiempo como InfluxDB y mostrar tableros de consumo en Grafana.

**gemini**
- `ok` · Sistema de ingesta y visualización para empresa de energía
- La propuesta implementa una plataforma de streaming y almacenamiento para gestionar las lecturas de los medidores de energía. Se utiliza una plataforma de eventos distribuida, una base de datos para análisis en tiempo real y una solución para la visualización de tableros de consumo. Queda pendiente el uso específico de InfluxDB, ya que no forma parte de los candidatos disponibles.
- **Apache Kafka** (`apache/kafka`), Streaming: Apache Kafka permite recibir las lecturas de los medidores en streaming de forma distribuida. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- **Grafana** (`grafana/grafana`), Visualización: Grafana permite mostrar tableros de consumo mediante su plataforma de visualización. Cuenta con licencia AGPL-3.0 y mantenimiento constante.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. ClickHouse es una base de datos orientada al análisis en tiempo real pero no es una base de datos especializada en series de tiempo como la solicitada.
- Limitación: El usuario nombró a InfluxDB para series de tiempo, pero no se encuentra entre los candidatos de la base de datos.
- Limitación: El usuario nombró a Kafka, el cual sí pudo resolverse.
- Supuesto: La empresa requiere procesar grandes volúmenes de datos provenientes de medidores inteligentes de forma concurrente.
- Rúbrica: español _ · rationale _ · coherencia _

### `contable-chatbot`

> Un estudio contable quiere un chatbot interno que responda preguntas sobre sus manuales de procedimientos usando un modelo de lenguaje que corra en sus propios servidores, y que solo puedan entrar los empleados con cuenta.

**gemini**
- `ok` · Chatbot interno para estudio contable con control de acceso
- Se propone una arquitectura compuesta por un motor de ejecución local para modelos de lenguaje y una plataforma de gestión de identidad y acceso para asegurar que solo los empleados autenticados puedan ingresar al sistema.
- **Ollama** (`ollama/ollama`), Ejecutar el modelo de lenguaje localmente en los servidores del estudio.: Permite poner en marcha modelos de lenguaje directamente en los propios servidores, cumpliendo con el requerimiento de correr la inteligencia artificial de forma local.
- **Keycloak** (`keycloak/keycloak`), Controlar el acceso de usuarios y gestionar las cuentas de los empleados.: Provee gestión de identidad y control de acceso open source, asegurando que únicamente los empleados con cuenta autorizada puedan ingresar al sistema.
- Limitación: Ninguna de las herramientas seleccionadas incluye de forma nativa la interfaz gráfica para el chat con los manuales de procedimientos.
- Supuesto: Se asume que los servidores propios del estudio contable cuentan con los recursos de hardware necesarios para ejecutar modelos de lenguaje locales.
- Supuesto: Se asume que la interfaz de usuario del chatbot integrará las validaciones provistas por la herramienta de autenticación.
- Rúbrica: español _ · rationale _ · coherencia _
