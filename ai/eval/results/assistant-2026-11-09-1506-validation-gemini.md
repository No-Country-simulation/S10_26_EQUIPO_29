# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-09 a las 15:06. 10 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.7 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 90% |
| Techo de la búsqueda (top 5) | 84% |
| Techo con 5 candidatos | 84% |
| Eligió un aceptable (donde había) | 85% |
| Se abstuvo (donde no había) | 56% |
| Acierto de punta a punta (comparable entre k) | 72% |
| Sin caja donde el caso no tiene herramientas | — |
| Eligió el primer candidato | 52% |
| Consistencia entre corridas | 20% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 2 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 6 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/30 |
| Tiempo total (mediana) | 4.1 s |
| Tiempo total (peor caso) | 6.4 s |
| Sobre 15 s | 0/30 |
| Entender · buscar · generar (mediana) | 1.5 s · 0.2 s · 2.4 s |
| Tokens entrada / salida (mediana) | 4030 / 602 |
| Esperas (límite de uso o error temporal) | 50.0 s |

Evidencia direccional: 10 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 88% | 88% | 81% | 81% – 88% |
| Se abstuvo (donde no había) | 75% | 33% | 50% | 33% – 75% |
| Acierto de punta a punta | 70% | 74% | 72% | 70% – 74% |
| Textos del modelo que hablan del catálogo | 2 | 1 | 3 | 1 – 3 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `inmobiliaria-portal` · search | OpenSearch, meilisearch, typesense, pgvector | det 3/3 · techo 3 · eligió 1 |
| `inmobiliaria-portal` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `agencia-viajes-web` · frontend | next.js, astro, nuxt | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · backend | fastapi, django, flask | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `colegio-avisos` · data-processing | airflow, prefect, dagster | det 1/3 · techo 0 · eligió 0 |
| `colegio-avisos` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · communication | apprise | det 3/3 · techo 1 · eligió 0 |
| `gimnasio-cobros` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 2 · eligió 2 |
| `repuestos-buscador` · observability | prometheus | det 3/3 · techo 3 · eligió 0 |
| `restaurantes-reportes` · data-processing | airflow, prefect, dagster | det 2/3 · techo 0 · eligió 0 |
| `restaurantes-reportes` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 2 |
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
- `ok` · Sistema de Búsqueda y Almacenamiento Inmobiliario Open Source
- Esta propuesta integra un motor de búsqueda avanzada para que los clientes encuentren propiedades según sus descripciones y un sistema de almacenamiento distribuido para gestionar fotos y planos subidos por los agentes.
- **Typesense** (`typesense/typesense`), Motor de búsqueda: Typesense permite construir experiencias de búsqueda rápidas y tolerantes a errores para que los clientes encuentren propiedades de manera eficiente. Su licencia es GPL-3.0 y se mantiene activamente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos: SeaweedFS proporciona almacenamiento distribuido optimizado para gestionar de forma eficiente las fotos y los planos subidos por los agentes. Cuenta con licencia Apache-2.0 y actualizaciones recientes.
- Limitación: La propuesta no incluye la gestión de usuarios ni la interfaz frontend del portal inmobiliario.
- Supuesto: Se asume que la plataforma web se conectará con ambos servicios mediante APIs estándar para la indexación y recuperación de archivos.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-viajes-web`

> Somos una agencia de viajes y vamos a rehacer nuestro sitio. Necesitamos un framework web para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google.

**gemini**
- `ok` · Arquitectura web rápida y optimizada para agencia de viajes
- Esta propuesta selecciona un framework web moderno y eficiente para construir las páginas de destinos de la agencia, garantizando cargas rápidas y un óptimo posicionamiento en buscadores. No se han detectado necesidades sin resolver en el pedido inicial.
- **Next.js** (`vercel/next.js`), Construcción del sitio web y páginas de destinos: Next.js permite desarrollar páginas de destinos que cargan muy rápido y se posicionan bien en Google gracias a su arquitectura híbrida y componentes optimizados. Cuenta con licencia MIT y alta actividad reciente.
- Limitación: La propuesta no incluye herramientas específicas de pruebas automatizadas o testing para el sitio web.
- Supuesto: La agencia de viajes ya cuenta con un equipo o proveedor con conocimientos en React para aprovechar el framework elegido.
- Supuesto: El contenido de los destinos se gestionará mediante una API externa o un sistema de gestión de contenidos (CMS).
- Rúbrica: español _ · rationale _ · coherencia _

### `cooperativa-api`

> Somos dos desarrolladores de Python en una cooperativa agrícola. Queremos elegir un framework para la API que registra las entregas de café de cada productor, y una base de datos relacional para guardar esos registros.

**gemini**
- `ok` · Arquitectura de API y Base de Datos para Cooperativa Agrícola
- La propuesta incluye un framework de alto rendimiento en Python para la API de registros y una base de datos relacional robusta adaptada al almacenamiento operativo de las entregas de café.
- **FastAPI** (`fastapi/fastapi`), Crear y gestionar la API para el registro de entregas.: FastAPI es un framework de alto rendimiento, fácil de aprender y rápido de codificar, ideal para Python en producción.
- **MariaDB** (`MariaDB/server`), Almacenar los registros de entregas de café de cada productor de forma relacional.: MariaDB server es un sistema de base de datos desarrollado por la comunidad con soporte activo y características robustas.
- Limitación: La propuesta no incluye herramientas específicas para la autenticación de productores ni paneles de visualización o reportes.
- Supuesto: Se asume que la cooperativa cuenta con infraestructura propia o en la nube para alojar tanto la API en Python como el servidor de base de datos.
- Rúbrica: español _ · rationale _ · coherencia _

### `colegio-avisos`

> Un colegio quiere una aplicación donde los profesores registren la asistencia. Cada noche debe calcular el porcentaje de asistencia de cada estudiante y avisar por correo o SMS a los padres cuando baje del 80 %.

**gemini**
- `ok` · Plataforma de avisos y notificaciones escolares
- Esta propuesta integra una infraestructura de comunicación para enviar los avisos a los padres según los criterios del colegio. Queda pendiente el procesamiento de datos para calcular el porcentaje de asistencia nocturno.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Permite gestionar las notificaciones para cumplir con el envío de avisos al correo de los padres. La licencia no fue identificada por GitHub en sus datos recientes.
- Limitación: Procesamiento de datos: no se encontraron herramientas del catálogo para «Cada noche debe calcular el porcentaje de asistencia de cada estudiante».
- Limitación: La solución propuesta no realiza el procesamiento nocturno de datos para calcular la baja del porcentaje de asistencia.
- Limitación: No se incluyeron herramientas de mensajería SMS tradicionales nativas en la selección principal más allá de la infraestructura general de Novu.
- Supuesto: El colegio cuenta con una base de datos o módulo externo para registrar la asistencia de los profesores.
- Supuesto: El procesamiento diario de los porcentajes de asistencia se resolverá con scripts propios o herramientas externas adicionales.
- Rúbrica: español _ · rationale _ · coherencia _

### `ong-voluntarios`

> Una ONG de voluntariado quiere que sus voluntarios entren con su cuenta de Google y guardar los certificados escaneados de cada uno en PDF.

**gemini**
- `ok` · Sistema de autenticación y gestión documental para ONG
- La propuesta implementa una infraestructura completa para que los voluntarios accedan mediante identidad federada y almacenen sus documentos de forma distribuida. Cubre tanto el acceso seguro como el resguardo eficiente de archivos PDF.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y autenticación: Resuelve la autenticación permitiendo que los voluntarios entren de forma segura mediante estándares modernos. Cuenta con la licencia Apache-2.0 y actividad reciente constante.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos PDF: Permite guardar los certificados escaneados de cada uno en PDF gracias a su arquitectura optimizada para almacenamiento de objetos y archivos. Utiliza licencia Apache-2.0 y recibe mantenimiento continuo.
- Limitación: La propuesta no incluye una interfaz de usuario visual dedicada a la gestión directa de los perfiles de los voluntarios.
- Supuesto: Se asume que la ONG cuenta con infraestructura propia o servidores para el despliegue autohospedado de las herramientas.
- Supuesto: Se asume que el sistema web o aplicación cliente se encargará de coordinar la sesión autenticada con Keycloak para luego enviar los archivos al almacenamiento.
- Rúbrica: español _ · rationale _ · coherencia _

### `gimnasio-cobros`

> Un gimnasio con tres sedes quiere cobrar las mensualidades en línea, avisar por WhatsApp a los socios que se atrasan en el pago y guardar el historial de pagos en una base de datos relacional.

**gemini**
- `ok` · Sistema de pagos y base de datos para gimnasio
- Esta propuesta implementa una plataforma de pagos por suscripción para cobrar las mensualidades en línea y un servidor relacional para guardar el historial de pagos. Queda pendiente la comunicación por WhatsApp con los socios atrasados.
- **Kill Bill** (`killbill/killbill`), Plataforma de cobros y suscripciones: Resuelve la necesidad de cobrar las mensualidades en línea mediante su plataforma de suscripción y pagos de código abierto bajo licencia Apache-2.0.
- **MariaDB** (`MariaDB/server`), Base de datos relacional: Permite guardar el historial de pagos en una base de datos relacional gracias a su servidor desarrollado por la comunidad con licencia GPL-2.0.
- Limitación: Comunicación: no se encontraron herramientas del catálogo para «avisar por WhatsApp a los socios que se atrasan en el pago».
- Limitación: No se incluye ninguna solución para enviar avisos por WhatsApp a los socios que se atrasan en el pago.
- Limitación: No se abordan aspectos específicos de la administración multi-sede.
- Supuesto: Se asume que el gimnasio cuenta con una pasarela de pago externa compatible para procesar las tarjetas.
- Supuesto: El negocio requiere una gestión centralizada para sus tres sedes.
- Supuesto: Se necesita una herramienta de mensajería para los avisos por WhatsApp que no fue encontrada en los candidatos.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-buscador`

> Tenemos una tienda en línea de repuestos para motos con la API hecha en Django. Queremos agregar un buscador de productos por nombre o referencia (el equipo pensaba en Elasticsearch) y medir la latencia y los errores de la API.

**gemini**
- `ok` · Arquitectura de búsqueda y monitoreo para tienda en línea
- La propuesta implementa un motor de búsqueda de alta velocidad para productos y una plataforma de visualización de métricas para medir la latencia y los errores de la API de Django. Ambas herramientas se integran para cubrir las necesidades operativas principales de la tienda de repuestos.
- **Typesense** (`typesense/typesense`), Motor de búsqueda: Resuelve la búsqueda de productos con una alternativa rápida y tolerante a erratas. Su licencia es GPL-3.0 y se mantiene activamente.
- **Grafana** (`grafana/grafana`), Visualización de métricas: Permite visualizar el rendimiento y los errores mediante paneles de control. Utiliza licencia AGPL-3.0 y cuenta con actualizaciones recientes.
- Limitación: El usuario mencionó Elasticsearch, pero la herramienta elegida es Typesense por sus ventajas de facilidad de uso como alternativa directa.
- Limitación: La solución no incluye un sistema de recolección de métricas dedicado como Prometheus de forma predeterminada en su única caja de observabilidad, requiriendo fuentes adicionales para alimentar los tableros.
- Supuesto: La API en Django cuenta con instrumentación para exportar métricas de latencia y errores hacia la plataforma de observabilidad.
- Supuesto: El catálogo de repuestos de motos se sincroniza periódicamente desde la base de datos hacia el motor de búsqueda.
- Rúbrica: español _ · rationale _ · coherencia _

### `restaurantes-reportes`

> Una cadena de doce restaurantes quiere procesar cada noche las ventas del día de todos sus locales para recalcular el inventario de cada uno, y mandar por correo el reporte a cada gerente a primera hora.

**gemini**
- `ok` · Sistema para procesar ventas nocturnas y enviar reportes
- Esta propuesta cubre el procesamiento nocturno de datos y el envío automatizado de correos a los gerentes de cada restaurante de la cadena.
- **knadh/listmonk** (`knadh/listmonk`), Gestor de envíos de correo: Permite gestionar campañas y listas de correo para mandar el reporte a cada gerente de forma automatizada. Cuenta con licencia AGPL-3.0 y se mantiene activamente.
- Limitación: Procesamiento de datos: ninguna de las herramientas encontradas encaja. Ningún candidato de procesamiento realiza la lógica de negocio para recalcular inventarios nocturnos a partir de ventas, aunque permiten gestionar y consultar datos relacionados con el almacenamiento.
- Limitación: La propuesta no incluye una herramienta nativa para ejecutar la lógica específica del recálculo de inventario nocturno.
- Limitación: No se dispone de un conector directo entre los sistemas de punto de venta locales de cada restaurante y la base de datos centralizada.
- Supuesto: Se asume que la cadena de restaurantes cuenta con un entorno seguro para hospedar servicios autogestionados.
- Supuesto: Se asume que la lógica de cálculo de inventarios se implementará mediante scripts propios o herramientas adicionales no incluidas en el catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `energia-medidores`

> Una empresa de energía recibe lecturas de 50.000 medidores cada 15 minutos. Quiere recibirlas en streaming con Kafka, guardarlas en una base de datos para series de tiempo como InfluxDB y mostrar tableros de consumo en Grafana.

**gemini**
- `ok` · Arquitectura de streaming y visualizacion para medidores
- La propuesta implementa procesamiento de eventos en streaming, almacenamiento de series temporales y visualizacion en tableros. Se utilizo Prometheus para metricas, Kafka para streaming y Grafana para los tableros, cubriendo las tecnologias solicitadas por el usuario.
- **Prometheus** (`prometheus/prometheus`), Almacenar series de tiempo: Prometheus es un sistema de monitoreo que incluye una base de datos de series temporales, bajo licencia Apache-2.0 y con actualizacion reciente.
- **Apache Kafka** (`apache/kafka`), Recibir eventos en streaming: Apache Kafka es una plataforma de streaming de eventos distribuida, con licencia Apache-2.0 y mantenimiento activo.
- **Grafana** (`grafana/grafana`), Mostrar tableros de consumo: Grafana ofrece una plataforma de visualizacion y observabilidad de datos con soporte para multiples fuentes, bajo licencia AGPL-3.0 y actualizacion reciente.
- Limitación: El usuario nombro InfluxDB para la base de datos, pero no se encuentra entre los candidatos de la necesidad correspondiente, por lo que se utilizo Prometheus.
- Limitación: El sistema no incluye un conector directo desde Kafka hacia Prometheus sin un componente intermediario de ingesta.
- Supuesto: Se asume que la infraestructura cuenta con recursos suficientes para operar Kafka y Prometheus en paralelo.
- Rúbrica: español _ · rationale _ · coherencia _

### `contable-chatbot`

> Un estudio contable quiere un chatbot interno que responda preguntas sobre sus manuales de procedimientos usando un modelo de lenguaje que corra en sus propios servidores, y que solo puedan entrar los empleados con cuenta.

**gemini**
- `ok` · Sistema de chatbot interno con autenticación para estudio contable
- Esta propuesta implementa un chatbot interno para consultar manuales de procedimientos utilizando un motor de inferencia local y asegura el acceso exclusivo para empleados mediante una solución de gestión de identidad robusta.
- **Keycloak** (`keycloak/keycloak`), Gestiona las cuentas y el acceso seguro de los empleados.: Resuelve la solicitud de que solo puedan entrar los empleados con cuenta mediante una solución de gestión de identidad y control de acceso moderna con licencia Apache-2.0 y alta actividad reciente.
- **Ollama** (`ollama/ollama`), Ejecuta el modelo de lenguaje en los servidores propios.: Permite correr un modelo de lenguaje en sus propios servidores de forma sencilla, utilizando software de código abierto con licencia MIT y gran adopción.
- Limitación: La propuesta no incluye la interfaz de usuario conversacional para el chatbot ni el almacenamiento vectorial con los manuales de procedimientos.
- Supuesto: Se asume que la empresa cuenta con infraestructura propia con capacidad suficiente para hospedar modelos de lenguaje y servicios de identidad.
- Rúbrica: español _ · rationale _ · coherencia _
