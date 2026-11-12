# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 15:03. 10 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 6.2 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 87% |
| Techo de la búsqueda (top 5) | 90% |
| Techo con 5 candidatos | 90% |
| Eligió un aceptable (donde había) | 93% |
| Se abstuvo (donde no había) | 83% |
| Acierto de punta a punta (comparable entre k) | 83% |
| Sin caja donde el caso no tiene herramientas | — |
| Recibe una herramienta aceptable, como lo ve el usuario | 72% |
| Se abstuvo, como lo ve el usuario | — |
| Eligió el primer candidato | 53% |
| Consistencia entre corridas | 50% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 2 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 4 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/30 |
| Tiempo total (mediana) | 4.3 s |
| Tiempo total (peor caso) | 6.6 s |
| Sobre 15 s | 0/30 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.4 s · 2.3 s |
| Tokens entrada / salida (mediana) | 4395 / 632 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 10 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 89% | 94% | 94% | 89% – 94% |
| Se abstuvo (donde no había) | 100% | 50% | 100% | 50% – 100% |
| Acierto de punta a punta | 85% | 84% | 81% | 81% – 85% |
| Recibe una herramienta aceptable, como lo ve el usuario | 74% | 70% | 74% | 70% – 74% |
| Se abstuvo, como lo ve el usuario | — | — | — | — |
| Textos del modelo que hablan del catálogo | 0 | 1 | 3 | 0 – 3 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `inmobiliaria-portal` · search | OpenSearch, meilisearch, typesense, pgvector | det 3/3 · techo 3 · eligió 1 |
| `inmobiliaria-portal` · storage | seaweedfs, rustfs | det 2/3 · techo 2 · eligió 2 |
| `agencia-viajes-web` · frontend | next.js, astro, nuxt | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · backend | fastapi, django, flask | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `colegio-avisos` · database | postgres, server, supabase | det 1/3 · techo 0 · eligió 0 |
| `colegio-avisos` · data-processing | airflow, prefect, dagster | det 3/3 · techo 1 · eligió 1 |
| `colegio-avisos` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · communication | apprise | det 3/3 · techo 0 · eligió 0 |
| `gimnasio-cobros` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · observability | prometheus | det 3/3 · techo 3 · eligió 3 |
| `restaurantes-reportes` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `restaurantes-reportes` · data-processing | airflow, prefect, dagster | det 3/3 · techo 3 · eligió 1 |
| `restaurantes-reportes` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · messaging | kafka | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · database | ClickHouse | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · analytics | grafana | det 0/3 · techo 0 · eligió 0 |
| `contable-chatbot` · ai | ollama, vllm | det 3/3 · techo 3 · eligió 3 |
| `contable-chatbot` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `inmobiliaria-portal`

> Estamos construyendo el portal web de una inmobiliaria. Los clientes tienen que poder buscar propiedades escribiendo cosas como 'apartamento con balcón cerca del metro', y los agentes suben las fotos y los planos de cada inmueble.

**gemini**
- `ok` · Portal Inmobiliario Open Source con Búsqueda y Almacenamiento
- Esta propuesta implementa un sistema para el portal web inmobiliario utilizando un motor de búsqueda con inteligencia artificial para descripciones complejas y un sistema de almacenamiento distribuido para fotos y planos. Cubre completamente las necesidades de búsqueda avanzada y gestión de archivos de los agentes.
- **Qdrant** (`qdrant/qdrant`), Motor de búsqueda vectorial: Resuelve la búsqueda semántica de propiedades permitiendo consultas complejas basadas en similitud de embeddings. Utiliza licencia Apache-2.0 y cuenta con actividad reciente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos y planos: Permite a los agentes subir y gestionar las fotos y los planos de cada inmueble con acceso eficiente a disco. Cuenta con licencia Apache-2.0 y soporte activo.
- Limitación: La propuesta no incluye la gestión de autenticación de usuarios ni el procesamiento de pagos.
- Limitación: No se incluye la interfaz gráfica del portal web.
- Supuesto: Se asume que el portal web inmobiliario cuenta con una interfaz de usuario propia que se conecta mediante API a los servicios propuestos.
- Supuesto: Se asume que la aplicación genera los embeddings necesarios para alimentar el motor de búsqueda vectorial a partir del texto ingresado por los clientes.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-viajes-web`

> Somos una agencia de viajes y vamos a rehacer nuestro sitio. Necesitamos un framework web para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google.

**gemini**
- `ok` · Arquitectura frontend para agencia de viajes
- Proponemos el uso de un framework web moderno y optimizado para renderizar las páginas de destinos con alta velocidad y buen posicionamiento en buscadores. La infraestructura web seleccionada cumple con los requisitos solicitados para el desarrollo frontend.
- **Nuxt** (`nuxt/nuxt`), Framework web full-stack para el sitio: Nuxt es un framework basado en Vue que permite construir aplicaciones web híbridas y completas, ideales para lograr cargas rápidas y un excelente rendimiento de posicionamiento en motores de búsqueda. Cuenta con licencia MIT y alta actividad reciente.
- Limitación: No se incluyen herramientas específicas de gestión de contenidos o backend para administrar los destinos de viaje.
- Supuesto: Se asume que la agencia de viajes cuenta con un equipo con conocimientos en el ecosistema Vue para el mantenimiento del sitio.
- Rúbrica: español _ · rationale _ · coherencia _

### `cooperativa-api`

> Somos dos desarrolladores de Python en una cooperativa agrícola. Queremos elegir un framework para la API que registra las entregas de café de cada productor, y una base de datos relacional para guardar esos registros.

**gemini**
- `ok` · Arquitectura API y Base de Datos Cooperativa Agrícola
- Se propone el uso de FastAPI para el desarrollo de la API web y MariaDB como base de datos relacional para registrar las entregas de café. Ambas tecnologías ofrecen alto rendimiento y mantenimiento activo.
- **FastAPI** (`fastapi/fastapi`), Framework para la API de registro: FastAPI es un framework de alto rendimiento, fácil de aprender y rápido de codificar, ideal para construir la API requerida por los desarrolladores.
- **MariaDB** (`MariaDB/server`), Almacenamiento de registros relacionales: MariaDB server es una base de datos relacional mantenida activamente por la comunidad, adecuada para guardar de forma fiable los registros de entregas.
- Limitación: La propuesta no incluye un ORM dedicado en la capa de base de datos dentro de la caja principal, aunque se podría complementar con herramientas como SQLAlchemy o SQLModel.
- Supuesto: Se asume que la cooperativa cuenta con infraestructura propia o en la nube para alojar tanto la API como la base de datos relacional.
- Rúbrica: español _ · rationale _ · coherencia _

### `colegio-avisos`

> Un colegio quiere una aplicación donde los profesores registren la asistencia. Cada noche debe calcular el porcentaje de asistencia de cada estudiante y avisar por correo o SMS a los padres cuando baje del 80 %.

**gemini**
- `ok` · Sistema de Control y Alertas de Asistencia Escolar
- La propuesta implementa una plataforma para procesar el cálculo nocturno de la asistencia de los estudiantes y enviar las notificaciones correspondientes a los padres. Se cubrieron las necesidades de procesamiento de datos y comunicación utilizando herramientas de código abierto.
- **Apprise** (`caronc/apprise`), Gestor de notificaciones y alertas: Permite enviar avisos por correo o mensaje a los padres cuando la asistencia baje del porcentaje establecido. Utiliza una licencia BSD-2-Clause y cuenta con mantenimiento activo reciente.
- **Prefect** (`PrefectHQ/prefect`), Orquestador de procesos nocturnos: Permite automatizar la tarea para que cada noche se ejecute el cálculo del porcentaje de asistencia de cada estudiante. Está desarrollado en Python bajo licencia Apache-2.0 y tiene actualizaciones recientes.
- Limitación: No se incluye una interfaz web o móvil nativa para que los profesores registren la asistencia.
- Supuesto: Se asume que el colegio cuenta con una base de datos propia donde los profesores registran la asistencia diariamente.
- Supuesto: Se asume que la interfaz para que los profesores registren la asistencia será desarrollada de forma personalizada.
- Rúbrica: español _ · rationale _ · coherencia _

### `ong-voluntarios`

> Una ONG de voluntariado quiere que sus voluntarios entren con su cuenta de Google y guardar los certificados escaneados de cada uno en PDF.

**gemini**
- `ok` · Arquitectura de Identidad y Almacenamiento para ONG
- Esta propuesta implementa la gestión de identidad con Keycloak para permitir el acceso mediante proveedores externos y utiliza SeaweedFS para el almacenamiento eficiente de los certificados de los voluntarios en formato PDF.
- **Keycloak** (`keycloak/keycloak`), Gestión de autenticación: Resuelve la necesidad de autenticación permitiendo gestionar las cuentas de usuario y el acceso mediante proveedores externos utilizando estándares modernos como OIDC y SAML.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos: Permite guardar los certificados escaneados de cada voluntario en PDF mediante un sistema de almacenamiento distribuido diseñado para manejar archivos de forma eficiente.
- Limitación: No se incluye explícitamente una interfaz web personalizada para la carga de documentos, la cual deberá ser desarrollada por la ONG.
- Supuesto: Se asume que la ONG dispone de infraestructura básica en servidores o la nube para desplegar los contenedores de Keycloak y SeaweedFS.
- Rúbrica: español _ · rationale _ · coherencia _

### `gimnasio-cobros`

> Un gimnasio con tres sedes quiere cobrar las mensualidades en línea, avisar por WhatsApp a los socios que se atrasan en el pago y guardar el historial de pagos en una base de datos relacional.

**gemini**
- `ok` · Sistema de Pagos y Base de Datos para Gimnasio
- Esta propuesta implementa una plataforma de facturación por suscripción y pagos para cobrar las mensualidades en línea, junto con una base de datos relacional para guardar el historial de pagos. Quedan sin resolver las notificaciones por WhatsApp debido a la falta de candidatos para esa necesidad específica.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos y suscripciones: Resuelve la necesidad de cobrar las mensualidades en línea mediante su plataforma de suscripción y pagos de código abierto bajo licencia Apache-2.0.
- **MariaDB** (`MariaDB/server`), Base de datos relacional: Permite guardar el historial de pagos en una base de datos relacional con motor InnoDB y licencia GPL-2.0.
- Limitación: Comunicación: no se encontraron herramientas del catálogo para «avisar por WhatsApp a los socios que se atrasan en el pago».
- Supuesto: Se asume que el gimnasio cuenta con personal técnico para desplegar y mantener los servicios seleccionados.
- Supuesto: Se requiere integrar una pasarela de pago externa para procesar transacciones con tarjetas y medios digitales.
- Supuesto: El envío de mensajes por WhatsApp queda pendiente de integrar con una herramienta externa de mensajería.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-buscador`

> Tenemos una tienda en línea de repuestos para motos con la API hecha en Django. Queremos agregar un buscador de productos por nombre o referencia (el equipo pensaba en Elasticsearch) y medir la latencia y los errores de la API.

**gemini**
- `ok` · Arquitectura de búsqueda y observabilidad para tienda de repuestos
- Esta propuesta implementa un motor de búsqueda de código abierto para productos y un sistema de monitoreo para medir la latencia y los errores de la API en Django. Se seleccionaron herramientas activas y compatibles con los requerimientos técnicos descritos.
- **Typesense** (`typesense/typesense`), Motor de búsqueda de productos: Typesense resuelve la búsqueda rápida de productos por nombre o referencia al ser un motor de búsqueda en memoria con tolerancia a errores y de código abierto bajo licencia GPL-3.0. Su último cambio fue reciente y cuenta con una comunidad activa de estrellas en GitHub.
- **Prometheus** (`prometheus/prometheus`), Sistema de monitoreo de métricas: Prometheus permite recolectar y registrar métricas de la API de Django para medir la latencia y los errores de forma efectiva. Utiliza la licencia Apache-2.0 y se mantiene de manera activa con actualizaciones recientes.
- Limitación: El equipo mencionó Elasticsearch, pero no está disponible entre los candidatos para la necesidad de búsqueda, por lo que se propuso Typesense como alternativa.
- Limitación: La licencia de Meilisearch no fue identificada por GitHub.
- Supuesto: Se asume que la API de Django puede exponer un endpoint de métricas compatible con Prometheus y conectar su base de datos o lógica con Typesense para la indexación de repuestos.
- Rúbrica: español _ · rationale _ · coherencia _

### `restaurantes-reportes`

> Una cadena de doce restaurantes quiere procesar cada noche las ventas del día de todos sus locales para recalcular el inventario de cada uno, y mandar por correo el reporte a cada gerente a primera hora.

**gemini**
- `ok` · Sistema nocturno de procesamiento de ventas y reportes
- Esta propuesta implementa un flujo automatizado para procesar las ventas nocturnas y recalcular el inventario de los restaurantes, enviando posteriormente los reportes correspondientes por correo electrónico a cada gerente.
- **Apache Beam** (`apache/beam`), Procesamiento nocturno: Apache Beam permite ejecutar el procesamiento por lotes necesario para las ventas del día de todos los locales y recalcular el inventario de cada uno. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- **Postal** (`postalserver/postal`), Envío de correos: Postal gestiona el envío saliente de correos electrónicos para hacer llegar los reportes de inventario y ventas a cada gerente a primera hora. Cuenta con licencia MIT y alta actividad reciente.
- Limitación: No se incluyen herramientas específicas para la interfaz de punto de venta (POS) en los locales de los restaurantes.
- Limitación: No se contempla un módulo de visualización o dashboard de BI para consultar los datos en tiempo real fuera del reporte matutino.
- Supuesto: Se asume que los locales de la cadena transmiten sus datos de ventas diarios a un repositorio central antes del inicio del procesamiento nocturno.
- Supuesto: Se asume que existe conectividad de red estable entre la plataforma de procesamiento de datos y el servidor de correo.
- Rúbrica: español _ · rationale _ · coherencia _

### `energia-medidores`

> Una empresa de energía recibe lecturas de 50.000 medidores cada 15 minutos. Quiere recibirlas en streaming con Kafka, guardarlas en una base de datos para series de tiempo como InfluxDB y mostrar tableros de consumo en Grafana.

**gemini**
- `ok` · Arquitectura de streaming y tableros para medidores
- Esta propuesta implementa una plataforma de procesamiento de eventos en streaming y visualización de tableros de consumo energético utilizando herramientas open source confiables y activas.
- **ClickHouse** (`ClickHouse/ClickHouse`), Base de datos analítica: ClickHouse es un sistema de gestión de bases de datos de análisis en tiempo real bajo licencia Apache-2.0, adecuado para procesar grandes volúmenes de datos.
- **Apache Kafka** (`apache/kafka`), Plataforma de streaming: Apache Kafka es una plataforma de streaming de eventos distribuida bajo licencia Apache-2.0 que permite recibir las lecturas de los medidores en tiempo real.
- **Grafana** (`grafana/grafana`), Visualización de tableros: Grafana es una plataforma de visualización y observabilidad bajo licencia AGPL-3.0 que permite mostrar tableros de consumo.
- Limitación: La tecnología InfluxDB nombrada por el usuario no se encuentra entre los candidatos de la necesidad de bases de datos, por lo que se utilizó ClickHouse como alternativa analítica.
- Supuesto: Se asume que la empresa cuenta con infraestructura propia para desplegar los componentes de streaming, base de datos y tableros.
- Rúbrica: español _ · rationale _ · coherencia _

### `contable-chatbot`

> Un estudio contable quiere un chatbot interno que responda preguntas sobre sus manuales de procedimientos usando un modelo de lenguaje que corra en sus propios servidores, y que solo puedan entrar los empleados con cuenta.

**gemini**
- `ok` · Arquitectura de chatbot interno con autenticación para estudio contable
- Esta propuesta integra una solución de IA para ejecutar modelos de lenguaje en servidores propios y un sistema robusto de gestión de identidades para asegurar que solo los empleados accedan al chatbot. Ambas herramientas ofrecen licenciamiento abierto y mantenimiento activo.
- **Ollama** (`ollama/ollama`), Motor para ejecutar modelos de lenguaje en los servidores propios.: Permite poner en marcha y ejecutar modelos de lenguaje directamente en los propios servidores del estudio contable para responder preguntas sobre los manuales de procedimientos. Cuenta con licencia MIT y alta actividad.
- **Keycloak** (`keycloak/keycloak`), Sistema de autenticación y control de acceso para los empleados.: Gestiona la identidad y el acceso de forma centralizada para asegurar que únicamente los empleados con cuenta puedan entrar al sistema. Posee licencia Apache 2.0 y mantenimiento constante.
- Limitación: Ninguna de las herramientas seleccionadas incluye por defecto una interfaz visual de chat terminada para los usuarios ni el repositorio documental con los manuales de procedimientos.
- Supuesto: Se asume que el estudio contable dispone de hardware propio con capacidad suficiente para hospedar modelos de lenguaje.
- Supuesto: Se asume que la interfaz de usuario del chatbot se desarrollará de forma complementaria para integrarse con el motor de IA y el servicio de autenticación.
- Rúbrica: español _ · rationale _ · coherencia _
