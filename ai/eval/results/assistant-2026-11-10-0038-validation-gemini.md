# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 00:38. 10 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.3 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 94% |
| Techo de la búsqueda (top 5) | 90% |
| Techo con 5 candidatos | 90% |
| Eligió un aceptable (donde había) | 85% |
| Se abstuvo (donde no había) | 33% |
| Acierto de punta a punta (comparable entre k) | 76% |
| Sin caja donde el caso no tiene herramientas | — |
| Eligió el primer candidato | 54% |
| Consistencia entre corridas | 40% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 0 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 2 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/30 |
| Tiempo total (mediana) | 4.0 s |
| Tiempo total (peor caso) | 5.1 s |
| Sobre 15 s | 0/30 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.2 s · 2.4 s |
| Tokens entrada / salida (mediana) | 4018 / 642 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 10 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 88% | 83% | 83% | 83% – 88% |
| Se abstuvo (donde no había) | 33% | 50% | 0% | 0% – 50% |
| Acierto de punta a punta | 75% | 75% | 79% | 75% – 79% |
| Textos del modelo que hablan del catálogo | 0 | 2 | 0 | 0 – 2 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `inmobiliaria-portal` · search | OpenSearch, meilisearch, typesense, pgvector | det 3/3 · techo 3 · eligió 1 |
| `inmobiliaria-portal` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `agencia-viajes-web` · frontend | next.js, astro, nuxt | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · backend | fastapi, django, flask | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `colegio-avisos` · data-processing | airflow, prefect, dagster | det 2/3 · techo 1 · eligió 1 |
| `colegio-avisos` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · payments | killbill, lago | det 3/3 · techo 3 · eligió 2 |
| `gimnasio-cobros` · communication | apprise | det 3/3 · techo 2 · eligió 0 |
| `gimnasio-cobros` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · observability | prometheus | det 3/3 · techo 3 · eligió 2 |
| `restaurantes-reportes` · data-processing | airflow, prefect, dagster | det 3/3 · techo 0 · eligió 0 |
| `restaurantes-reportes` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · messaging | kafka | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · database | ClickHouse | det 3/3 · techo 2 · eligió 0 |
| `energia-medidores` · analytics | grafana | det 0/3 · techo 0 · eligió 0 |
| `contable-chatbot` · ai | ollama, vllm | det 3/3 · techo 3 · eligió 3 |
| `contable-chatbot` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `inmobiliaria-portal`

> Estamos construyendo el portal web de una inmobiliaria. Los clientes tienen que poder buscar propiedades escribiendo cosas como 'apartamento con balcón cerca del metro', y los agentes suben las fotos y los planos de cada inmueble.

**gemini**
- `ok` · Portal Inmobiliario con Búsqueda Semántica y Almacenamiento Distribuido
- Esta propuesta integra un motor de búsqueda vectorial para interpretar las consultas en lenguaje natural de los clientes sobre las propiedades, junto con un sistema de almacenamiento distribuido para gestionar de forma eficiente las fotos y los planos subidos por los agentes inmobiliarios.
- **Qdrant** (`qdrant/qdrant`), Motor de búsqueda semántica: Resuelve la necesidad de permitir que los clientes busquen propiedades escribiendo frases descriptivas utilizando tecnología de búsqueda vectorial y similitud de embeddings, con licencia Apache-2.0 y actividad reciente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos y planos: Permite a los agentes subir y almacenar las fotos y los planos de cada inmueble gracias a su capacidad como sistema de almacenamiento distribuido para objetos, con licencia Apache-2.0 y mantenimiento constante.
- Limitación: La solución no incluye la interfaz de usuario frontend ni el sistema de autenticación de clientes y agentes.
- Supuesto: Se asume que la aplicación web cuenta con un backend intermediario para procesar las consultas de los usuarios y coordinar la subida de archivos entre los agentes y el almacenamiento.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-viajes-web`

> Somos una agencia de viajes y vamos a rehacer nuestro sitio. Necesitamos un framework web para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google.

**gemini**
- `ok` · Arquitectura web de alto rendimiento para agencia de viajes
- Se propone una solución basada en Next.js para el desarrollo del sitio web de la agencia de viajes, garantizando tiempos de carga rápidos y un posicionamiento óptimo en buscadores gracias a sus capacidades de renderizado moderno. No se han detectado necesidades sin cubrir dentro de las opciones evaluadas.
- **Next.js** (`vercel/next.js`), Framework web para el desarrollo de la interfaz de usuario.: Permite construir páginas de destinos con un rendimiento óptimo y excelentes capacidades de posicionamiento en buscadores gracias a su enfoque híbrido. Cuenta con licencia MIT y un mantenimiento activo reciente.
- Limitación: La propuesta no incluye herramientas específicas de gestión de contenidos para actualizar las páginas de destinos de forma visual.
- Supuesto: Se asume que la agencia utilizará React como librería base para la interfaz.
- Supuesto: Se requiere personal con conocimientos en desarrollo frontend para aprovechar las capacidades del framework.
- Rúbrica: español _ · rationale _ · coherencia _

### `cooperativa-api`

> Somos dos desarrolladores de Python en una cooperativa agrícola. Queremos elegir un framework para la API que registra las entregas de café de cada productor, y una base de datos relacional para guardar esos registros.

**gemini**
- `ok` · Arquitectura de API y Base de Datos para Cooperativa Agrícola
- Esta propuesta implementa un backend en Python de alto rendimiento y una base de datos relacional para gestionar las entregas de café de los productores de forma eficiente. Ambas herramientas se integran perfectamente para asegurar una API robusta y un almacenamiento confiable.
- **FastAPI** (`fastapi/fastapi`), Framework de API: FastAPI es un framework de alto rendimiento, fácil de aprender y rápido de codificar, ideal para construir la API que registra las entregas de café de cada productor.
- **MariaDB** (`MariaDB/server`), Base de datos relacional: MariaDB es un servidor de base de datos relacional desarrollado por la comunidad, adecuado para guardar de forma segura los registros de las entregas de café.
- Limitación: La propuesta no incluye un ORM específico dentro de la caja de base de datos, el cual deberá ser seleccionado e integrado por los desarrolladores para conectar FastAPI con MariaDB.
- Supuesto: Se asume que la cooperativa cuenta con personal con conocimientos básicos en Python y administración de bases de datos relacionales.
- Rúbrica: español _ · rationale _ · coherencia _

### `colegio-avisos`

> Un colegio quiere una aplicación donde los profesores registren la asistencia. Cada noche debe calcular el porcentaje de asistencia de cada estudiante y avisar por correo o SMS a los padres cuando baje del 80 %.

**gemini**
- `ok` · Sistema de Gestion y Alertas de Asistencia Escolar
- La propuesta implementa una plataforma basada en PostgreSQL para almacenar los registros de asistencia de los profesores. Para el cálculo nocturno automatizado se emplea un sistema de monitoreo, y se utiliza una infraestructura de comunicaciones para el envío de notificaciones a los padres.
- **Supabase** (`supabase/supabase`), Almacenamiento de asistencia: Proporciona una base de datos Postgres dedicada ideal para construir aplicaciones web y móviles donde los profesores registrarán la asistencia de los estudiantes. Cuenta con licencia Apache-2.0 y alta actividad reciente.
- **Novu** (`novuhq/novu`), Envio de notificaciones: Funciona como la infraestructura de comunicación para gestionar avisos, ideal para notificar a los padres cuando la asistencia baje del porcentaje requerido. Su licencia no fue identificada por GitHub y tiene actualizaciones muy recientes.
- Limitación: Procesamiento de datos: ninguna de las herramientas encontradas encaja. No realiza procesamiento de datos de asistencia escolar ni cálculos nocturnos de porcentajes de estudiantes, ya que su enfoque es el monitoreo de sistemas y series temporales.
- Limitación: No se encontró ninguna herramienta en los candidatos que realice de forma nativa el cálculo nocturno de porcentajes de asistencia requeridos.
- Supuesto: Se asume que la institución educativa cuenta con un servidor o infraestructura propia para desplegar aplicaciones autohospedadas.
- Supuesto: Se asume que el procesamiento nocturno se programará mediante tareas automatizadas externas que consulten la base de datos.
- Rúbrica: español _ · rationale _ · coherencia _

### `ong-voluntarios`

> Una ONG de voluntariado quiere que sus voluntarios entren con su cuenta de Google y guardar los certificados escaneados de cada uno en PDF.

**gemini**
- `ok` · Sistema de Autenticación y Almacenamiento para ONG
- La propuesta implementa un sistema de gestión de identidad para permitir el acceso con proveedores externos y un sistema de almacenamiento distribuido para guardar documentos. El sistema cubre por completo las necesidades de autenticación y almacenamiento solicitadas por la ONG.
- **Keycloak** (`keycloak/keycloak`), Gestionar el acceso de los voluntarios: Keycloak resuelve la gestión de identidad y acceso de manera moderna, permitiendo configurar el inicio de sesión para que los voluntarios entren con su cuenta de Google mediante OIDC. Cuenta con licencia Apache-2.0 y actividad reciente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Guardar certificados en PDF: SeaweedFS es un sistema de almacenamiento distribuido ideal para guardar los certificados escaneados de cada uno en PDF, manejando billones de archivos con alta eficiencia. Utiliza licencia Apache-2.0 y se mantiene activamente.
- Limitación: La propuesta no incluye una interfaz de usuario visual específica para la gestión documental de los certificados, la cual deberá ser desarrollada a medida.
- Supuesto: Se asume que la ONG cuenta con infraestructura propia o en la nube para desplegar los contenedores de autenticación y almacenamiento.
- Supuesto: Se asume que los voluntarios acceden a través de una aplicación web o móvil que integra ambos servicios.
- Rúbrica: español _ · rationale _ · coherencia _

### `gimnasio-cobros`

> Un gimnasio con tres sedes quiere cobrar las mensualidades en línea, avisar por WhatsApp a los socios que se atrasan en el pago y guardar el historial de pagos en una base de datos relacional.

**gemini**
- `ok` · Propuesta de sistema open source para gestión de gimnasio
- Se propone una solución completa para automatizar el cobro de mensualidades en línea mediante Kill Bill, la gestión de notificaciones a socios con Novu, y el almacenamiento seguro del historial de pagos utilizando MariaDB como base de datos relacional.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos: Permite gestionar el cobro de mensualidades y suscripciones de los socios de forma automatizada mediante su plataforma de pagos y facturación de código abierto.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Facilita el envío de notificaciones automatizadas a los socios que se atrasan en el pago, utilizando una infraestructura de comunicación moderna. Su licencia no está identificada por GitHub.
- **MariaDB** (`MariaDB/server`), Base de datos relacional: Almacena de forma confiable el historial de pagos de las tres sedes del gimnasio en una base de datos relacional desarrollada por la comunidad.
- Limitación: Ninguna de las herramientas seleccionadas incluye de forma nativa pasarelas de pago específicas de la región sin configuración adicional.
- Limitación: La integración directa con la API oficial de WhatsApp dependerá de los proveedores que conecte la infraestructura de comunicación seleccionada.
- Supuesto: Se asume que el gimnasio cuenta con conectividad a internet en sus tres sedes para operar el sistema centralizado en la nube o en servidores propios.
- Supuesto: Se asume que la plataforma de pagos elegida se integra mediante pasarelas de pago externas para procesar transacciones monetarias reales.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-buscador`

> Tenemos una tienda en línea de repuestos para motos con la API hecha en Django. Queremos agregar un buscador de productos por nombre o referencia (el equipo pensaba en Elasticsearch) y medir la latencia y los errores de la API.

**gemini**
- `ok` · Arquitectura de Buscador y Monitoreo para Tienda en Línea
- La propuesta implementa un motor de búsqueda de alta velocidad para repuestos de motos y un sistema robusto de monitoreo para medir la latencia y los errores de la API en Django. Se seleccionaron herramientas con mantenimiento activo para garantizar el rendimiento del comercio electrónico.
- **Typesense** (`typesense/typesense`), Buscador de productos: Resuelve la búsqueda de repuestos por nombre o referencia mediante un motor de búsqueda rápido en memoria y tolerante a errores tipográficos. Su licencia es GPL-3.0 y cuenta con mantenimiento activo reciente.
- **Prometheus** (`prometheus/prometheus`), Monitoreo de latencia y errores: Permite medir la latencia y los errores de la API recolectando métricas en su base de datos de series temporales. Posee licencia Apache-2.0 y se mantiene activamente.
- Limitación: El usuario mencionó inicialmente Elasticsearch, pero esta tecnología no fue seleccionada porque se priorizó una alternativa más sencilla como Typesense.
- Limitación: La propuesta no incluye la interfaz de usuario frontend para la barra de búsqueda en la tienda.
- Supuesto: Se asume que la API en Django se conectará directamente al motor de búsqueda y expondrá métricas compatibles con el sistema de monitoreo.
- Rúbrica: español _ · rationale _ · coherencia _

### `restaurantes-reportes`

> Una cadena de doce restaurantes quiere procesar cada noche las ventas del día de todos sus locales para recalcular el inventario de cada uno, y mandar por correo el reporte a cada gerente a primera hora.

**gemini**
- `ok` · Sistema nocturno de procesamiento de ventas y correo
- La propuesta cubre el procesamiento de datos y la comunicacion para la cadena de restaurantes utilizando herramientas especializadas. Se asume que los locales cuentan con conectividad nocturna para el envio de las ventas.
- **PostHog** (`PostHog/posthog`), Plataforma de analisis y almacenamiento de datos: PostHog provee analiticas y un almacen de datos que permite procesar la informacion de ventas y registrar eventos para recalcular el inventario de cada local. Su licencia no esta identificada por GitHub y ha recibido actualizaciones recientes.
- **Postal** (`postalserver/postal`), Servidor de entrega de correo electronico: Postal es una plataforma de correo completamente funcional que permite realizar el envio automatizado de los reportes por correo a los gerentes. Cuenta con licencia MIT y alta actividad reciente.
- Limitación: No se incluye una interfaz grafica especifica para la gestion manual de los inventarios por parte de los gerentes mas alla del reporte por correo.
- Supuesto: Los restaurantes cuentan con sistemas de punto de venta conectados a una red central que permite consolidar las ventas cada noche.
- Supuesto: Los gerentes disponen de casillas de correo electronico activas para recibir los reportes a primera hora.
- Rúbrica: español _ · rationale _ · coherencia _

### `energia-medidores`

> Una empresa de energía recibe lecturas de 50.000 medidores cada 15 minutos. Quiere recibirlas en streaming con Kafka, guardarlas en una base de datos para series de tiempo como InfluxDB y mostrar tableros de consumo en Grafana.

**gemini**
- `ok` · Sistema de monitoreo de consumo eléctrico
- Se propone una arquitectura para recibir datos en streaming mediante una plataforma de eventos, almacenar y procesar series de tiempo, y visualizar la información en tableros de consumo.
- **Prometheus** (`prometheus/prometheus`), Almacenamiento de series de tiempo: Prometheus incluye un sistema de monitoreo y base de datos de series de tiempo, bajo licencia Apache-2.0, lo que permite guardar las lecturas de los medidores.
- **Apache Kafka** (`apache/kafka`), Streaming de eventos de medidores: Apache Kafka funciona como una plataforma distribuida de transmisión de eventos bajo licencia Apache-2.0, ideal para recibir en streaming las lecturas de los medidores.
- **Grafana** (`grafana/grafana`), Tableros de consumo: Grafana provee la plataforma de observabilidad y visualización de datos para mostrar los tableros de consumo requeridos, bajo licencia AGPL-3.0.
- Limitación: El usuario mencionó InfluxDB y Grafana, pero InfluxDB no se encuentra entre los candidatos de la necesidad de bases de datos, por lo que se utilizó Prometheus en su lugar.
- Supuesto: La empresa cuenta con infraestructura propia para desplegar y escalar los componentes distribuidos.
- Supuesto: Se requiere procesar las lecturas en tiempo real con alta disponibilidad.
- Rúbrica: español _ · rationale _ · coherencia _

### `contable-chatbot`

> Un estudio contable quiere un chatbot interno que responda preguntas sobre sus manuales de procedimientos usando un modelo de lenguaje que corra en sus propios servidores, y que solo puedan entrar los empleados con cuenta.

**gemini**
- `ok` · Arquitectura segura para chatbot interno contable
- La propuesta implementa un sistema para que los empleados accedan de forma segura a un modelo de lenguaje local que responde sobre manuales de procedimientos. Se cubre la autenticación de usuarios y la ejecución del modelo en servidores propios. Quedan aspectos pendientes sobre la interfaz de usuario y la base de datos documental.
- **Ollama** (`ollama/ollama`), Ejecución del modelo de lenguaje local: Permite correr y utilizar modelos de lenguaje directamente en los servidores del estudio contable con licencia MIT y alta actividad reciente.
- **Keycloak** (`keycloak/keycloak`), Gestión de autenticación de empleados: Ofrece autenticación y control de acceso moderno bajo licencia Apache-2.0 y mantenimiento activo.
- Limitación: La propuesta no incluye una plataforma de desarrollo de agentes ni herramientas de recuperación de documentos (RAG) avanzadas como LangChain o Transformers para procesar los manuales.
- Supuesto: Se asume que el estudio contable dispone de hardware con capacidad suficiente para hospedar modelos de lenguaje localmente.
- Supuesto: Se requiere una interfaz de usuario o aplicación cliente para interactuar con el chatbot.
- Rúbrica: español _ · rationale _ · coherencia _
