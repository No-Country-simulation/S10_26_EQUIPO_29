# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 01:36. 10 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.7 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 97% |
| Respuesta válida | 100% |
| Necesidades detectadas | 92% |
| Techo de la búsqueda (top 5) | 95% |
| Techo con 5 candidatos | 95% |
| Eligió un aceptable (donde había) | 89% |
| Se abstuvo (donde no había) | 100% |
| Acierto de punta a punta (comparable entre k) | 84% |
| Sin caja donde el caso no tiene herramientas | — |
| Eligió el primer candidato | 57% |
| Consistencia entre corridas | 40% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 2 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 2 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/30 |
| Tiempo total (mediana) | 3.9 s |
| Tiempo total (peor caso) | 5.0 s |
| Sobre 15 s | 0/30 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.2 s · 2.1 s |
| Tokens entrada / salida (mediana) | 4008 / 604 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 10 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 90% | 100% | 100% | 90% – 100% |
| Eligió un aceptable (donde había) | 78% | 89% | 100% | 78% – 100% |
| Se abstuvo (donde no había) | 100% | 100% | 100% | 100% – 100% |
| Acierto de punta a punta | 74% | 85% | 95% | 74% – 95% |
| Textos del modelo que hablan del catálogo | 1 | 1 | 0 | 0 – 1 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `inmobiliaria-portal` · search | OpenSearch, meilisearch, typesense, pgvector | det 3/3 · techo 3 · eligió 1 |
| `inmobiliaria-portal` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `agencia-viajes-web` · frontend | next.js, astro, nuxt | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · backend | fastapi, django, flask | det 3/3 · techo 3 · eligió 3 |
| `cooperativa-api` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `colegio-avisos` · data-processing | airflow, prefect, dagster | det 2/3 · techo 2 · eligió 2 |
| `colegio-avisos` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 2 |
| `ong-voluntarios` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `ong-voluntarios` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `gimnasio-cobros` · communication | apprise | det 3/3 · techo 0 · eligió 0 |
| `gimnasio-cobros` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `repuestos-buscador` · observability | prometheus | det 3/3 · techo 3 · eligió 3 |
| `restaurantes-reportes` · data-processing | airflow, prefect, dagster | det 2/3 · techo 2 · eligió 1 |
| `restaurantes-reportes` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 2 |
| `energia-medidores` · messaging | kafka | det 3/3 · techo 3 · eligió 3 |
| `energia-medidores` · database | ClickHouse | det 3/3 · techo 3 · eligió 2 |
| `energia-medidores` · analytics | grafana | det 0/3 · techo 0 · eligió 0 |
| `contable-chatbot` · ai | ollama, vllm | det 3/3 · techo 3 · eligió 3 |
| `contable-chatbot` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `inmobiliaria-portal`

> Estamos construyendo el portal web de una inmobiliaria. Los clientes tienen que poder buscar propiedades escribiendo cosas como 'apartamento con balcón cerca del metro', y los agentes suben las fotos y los planos de cada inmueble.

**gemini**
- `ok` · Sistema de gestión y búsqueda para portal inmobiliario
- La propuesta implementa un motor de búsqueda avanzada para que los clientes encuentren propiedades mediante consultas complejas y un sistema de almacenamiento distribuido para gestionar las fotos y los planos subidos por los agentes inmobiliarios.
- **Qdrant** (`qdrant/qdrant`), Motor de búsqueda vectorial: Qdrant permite realizar búsquedas vectoriales y por similitud de embeddings, ideal para procesar consultas complejas de los clientes como apartamento con balcón cerca del metro. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos: SeaweedFS está diseñado para manejar miles de millones de archivos con acceso a disco optimizado, permitiendo a los agentes subir y gestionar las fotos y planos de cada inmueble. Utiliza licencia Apache-2.0 y se mantiene actualizado.
- Limitación: No se incluye un módulo de autenticación para diferenciar entre clientes y agentes inmobiliarios.
- Supuesto: Se asume que el portal web inmobiliario cuenta con un backend de aplicación propio que conecta el motor de búsqueda con el sistema de almacenamiento.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-viajes-web`

> Somos una agencia de viajes y vamos a rehacer nuestro sitio. Necesitamos un framework web para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google.

**gemini**
- `ok` · Arquitectura web rápida y optimizada para agencia de viajes
- Se propone un framework web moderno optimizado para la creación de sitios orientados a contenido, garantizando tiempos de carga rápidos y un excelente posicionamiento en motores de búsqueda. La solución elegida cubre eficientemente las necesidades del proyecto sin requerir herramientas adicionales.
- **Astro** (`withastro/astro`), Construcción del sitio web: Astro es un framework web diseñado específicamente para sitios orientados a contenido, ideal para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google. Su licencia no fue identificada por GitHub en los datos disponibles. Se mantiene actualizado con cambios recientes.
- Limitación: La propuesta no incluye un sistema de gestión de contenidos (CMS) dedicado para la administración diaria de los viajes.
- Limitación: No se contempla una solución específica para la pasarela de pagos o reservas en línea de la agencia.
- Supuesto: Suponemos que el equipo de desarrollo cuenta con experiencia en JavaScript y en la arquitectura de islas que utiliza el framework seleccionado.
- Supuesto: El contenido de los destinos se gestionará mediante archivos estáticos o se conectará a un servicio externo de gestión de contenido.
- Rúbrica: español _ · rationale _ · coherencia _

### `cooperativa-api`

> Somos dos desarrolladores de Python en una cooperativa agrícola. Queremos elegir un framework para la API que registra las entregas de café de cada productor, y una base de datos relacional para guardar esos registros.

**gemini**
- `ok` · Propuesta de arquitectura para registros de café
- Se propone el uso de FastAPI para el desarrollo de la API de entregas y MariaDB como motor de base de datos relacional. La solución cubre las necesidades tecnológicas planteadas por el equipo de desarrollo.
- **FastAPI** (`fastapi/fastapi`), API backend: Es un framework de alto rendimiento, fácil de aprender y rápido de codificar, ideal para construir la API que registra las entregas de café.
- **MariaDB** (`MariaDB/server`), Base de datos relacional: Proporciona un motor de base de datos robusto y desarrollado por la comunidad para guardar los registros de las entregas.
- Limitación: No se incluyó un ORM explícito en las cajas, aunque herramientas como SQLAlchemy o SQLModel podrían complementar la capa de datos.
- Supuesto: Se asume que la cooperativa cuenta con infraestructura propia o servicios en la nube para alojar tanto la API como la base de datos.
- Rúbrica: español _ · rationale _ · coherencia _

### `colegio-avisos`

> Un colegio quiere una aplicación donde los profesores registren la asistencia. Cada noche debe calcular el porcentaje de asistencia de cada estudiante y avisar por correo o SMS a los padres cuando baje del 80 %.

**gemini**
- `no_evidence` · Sistema de notificaciones de asistencia escolar
- La propuesta implementa la infraestructura de comunicación para enviar correos y mensajes a los padres cuando el porcentaje de asistencia baje del límite establecido. Queda pendiente el desarrollo de la aplicación donde los profesores registran la asistencia y el cálculo nocturno automático.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Se selecciona Apprise porque su enfoque abarca múltiples servicios de notificación, aunque no resuelve de forma nativa la gestión completa de correo masivo solicitada para los padres.
- Limitación: La solución propuesta no incluye el registro de asistencia de los profesores ni el cálculo automatizado nocturno del porcentaje de los estudiantes.
- Supuesto: El colegio cuenta con un sistema externo o base de datos que realiza el cálculo nocturno del porcentaje de asistencia.
- Supuesto: Se requiere una aplicación adicional para el registro diario de los profesores que no está cubierta por las herramientas de comunicación.
- Rúbrica: español _ · rationale _ · coherencia _

### `ong-voluntarios`

> Una ONG de voluntariado quiere que sus voluntarios entren con su cuenta de Google y guardar los certificados escaneados de cada uno en PDF.

**gemini**
- `ok` · Sistema de autenticacion y almacenamiento para voluntarios
- La propuesta cubre la gestion de identidades permitiendo el acceso con proveedores externos y el almacenamiento escalable de documentos en PDF. Ambas herramientas ofrecen arquitecturas modernas y activas para asegurar la operacion de la ONG.
- **Keycloak** (`keycloak/keycloak`), Gestor de identidad y accesos: Keycloak ofrece gestion de identidad y acceso de codigo abierto bajo licencia Apache-2.0, con actividad reciente y soporte para protocolos estandar que facilitan la integracion de cuentas de Google para los voluntarios.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Sistema de almacenamiento de archivos: SeaweedFS es un sistema de almacenamiento distribuido disenado para manejar miles de archivos con acceso rapido, ideal para guardar los certificados escaneados de cada uno en PDF.
- Limitación: La propuesta no incluye una interfaz web especifica para que los voluntarios suban los documentos, requiriendo desarrollo adicional o integracion con una aplicacion cliente.
- Supuesto: Se asume que la ONG cuenta con infraestructura propia para desplegar los servicios seleccionados.
- Supuesto: Se asume que la integracion con Google se realizara mediante la configuracion de OIDC soportada por el proveedor de identidad.
- Rúbrica: español _ · rationale _ · coherencia _

### `gimnasio-cobros`

> Un gimnasio con tres sedes quiere cobrar las mensualidades en línea, avisar por WhatsApp a los socios que se atrasan en el pago y guardar el historial de pagos en una base de datos relacional.

**gemini**
- `ok` · Sistema de gestión de pagos y base de datos para gimnasio
- Esta propuesta incluye la plataforma para cobrar las mensualidades en línea y el servidor para guardar el historial de pagos de forma relacional. Queda pendiente resolver el envío de avisos por WhatsApp a los socios atrasados.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos: Permite gestionar las suscripciones y el cobro de mensualidades para el negocio bajo una licencia Apache-2.0, con mantenimiento activo reciente.
- **MariaDB** (`MariaDB/server`), Base de datos relacional: Guarda de forma segura el historial de pagos del gimnasio en un motor relacional basado en MySQL, con licencia GPL-2.0 y actualizaciones constantes.
- Limitación: Comunicación: no se encontraron herramientas del catálogo para «avisar por WhatsApp a los socios que se atrasan en el pago».
- Supuesto: Se asume que el gimnasio cuenta con personal técnico para desplegar y administrar las herramientas de forma autohospedada.
- Supuesto: El negocio requiere integrar una pasarela de pago externa a través de las capacidades de la plataforma elegida.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-buscador`

> Tenemos una tienda en línea de repuestos para motos con la API hecha en Django. Queremos agregar un buscador de productos por nombre o referencia (el equipo pensaba en Elasticsearch) y medir la latencia y los errores de la API.

**gemini**
- `ok` · Arquitectura de búsqueda y monitoreo para tienda de repuestos
- Esta propuesta implementa un motor de búsqueda rápido para productos y un sistema completo de métricas y visualización para controlar la latencia y los errores de la API en Django.
- **Typesense** (`typesense/typesense`), Buscador de productos: Permite realizar búsquedas rápidas por nombre o referencia, presentándose como una alternativa más fácil de usar a Elasticsearch con licencia GPL-3.0 y mantenimiento activo.
- **Prometheus** (`prometheus/prometheus`), Recopilador de métricas: Recolecta y almacena las métricas de la API de Django para medir la latencia y registrar los errores del sistema con licencia Apache-2.0.
- Limitación: El usuario mencionó Elasticsearch, pero se seleccionó Typesense por ser una alternativa más sencilla de usar según los candidatos encontrados.
- Supuesto: Se asume que la tienda en línea requiere consultas rápidas y escalables para el catálogo de repuestos de motos.
- Rúbrica: español _ · rationale _ · coherencia _

### `restaurantes-reportes`

> Una cadena de doce restaurantes quiere procesar cada noche las ventas del día de todos sus locales para recalcular el inventario de cada uno, y mandar por correo el reporte a cada gerente a primera hora.

**gemini**
- `ok` · Sistema de Procesamiento Nocturno y Reportes para Restaurantes
- La propuesta implementa un marco unificado para procesar el procesamiento de datos por lotes cada noche y una plataforma completa de entrega de correo para enviar los reportes a los gerentes de los doce locales. Ambas herramientas cuentan con actividad reciente y licencias abiertas para garantizar la estabilidad del sistema.
- **Apache Beam** (`apache/beam`), Procesamiento nocturno: Apache Beam permite procesar por lotes cada noche las ventas del día para recalcular el inventario de todos los locales. Utiliza una licencia Apache-2.0 y cuenta con cambios recientes.
- **Postal** (`postalserver/postal`), Envío de correos: Postal sirve para mandar por correo el reporte a cada gerente a primera hora gracias a su plataforma de correo saliente. Cuenta con licencia MIT y alta actividad reciente.
- Limitación: La propuesta no incluye una interfaz de usuario visual para la gestión de las listas de correo de los gerentes, lo cual requeriría herramientas complementarias como listmonk.
- Supuesto: Se asume que los doce restaurantes cuentan con una base de datos centralizada o un mecanismo para consolidar las ventas del día antes del procesamiento nocturno.
- Rúbrica: español _ · rationale _ · coherencia _

### `energia-medidores`

> Una empresa de energía recibe lecturas de 50.000 medidores cada 15 minutos. Quiere recibirlas en streaming con Kafka, guardarlas en una base de datos para series de tiempo como InfluxDB y mostrar tableros de consumo en Grafana.

**gemini**
- `ok` · Arquitectura de streaming y almacenamiento para medidores de energía
- Esta propuesta implementa una plataforma de streaming de eventos utilizando Apache Kafka para recibir las lecturas de los medidores, un sistema de series de tiempo para almacenar los datos y una plataforma de visualización para los tableros de consumo.
- **Apache Kafka** (`apache/kafka`), Ingesta en streaming: Kafka es una plataforma distribuida de streaming de eventos que permite recibir las lecturas de los medidores en tiempo real con alta disponibilidad y bajo licencia Apache-2.0.
- **Prometheus** (`prometheus/prometheus`), Base de datos de series de tiempo: Prometheus incluye una base de datos de series de tiempo integrada y optimizada para métricas, operando bajo licencia Apache-2.0.
- **Grafana** (`grafana/grafana`), Visualización de tableros: Grafana es la plataforma abierta para visualización de datos que permite mostrar los tableros de consumo utilizando múltiples fuentes de datos bajo licencia AGPL-3.0.
- Limitación: Se solicitó específicamente InfluxDB como base de datos para series de tiempo, pero no se encuentra disponible entre los candidatos, por lo que se seleccionó Prometheus como alternativa.
- Limitación: Se solicitó Grafana, pero la herramienta seleccionada utiliza licencia AGPL-3.0, lo cual puede implicar restricciones según la política de la empresa.
- Supuesto: La empresa de energía cuenta con la infraestructura necesaria para desplegar clústeres distribuidos en la nube o en servidores propios.
- Supuesto: El volumen de 50.000 medidores cada 15 minutos puede ser manejado eficientemente por los componentes seleccionados.
- Rúbrica: español _ · rationale _ · coherencia _

### `contable-chatbot`

> Un estudio contable quiere un chatbot interno que responda preguntas sobre sus manuales de procedimientos usando un modelo de lenguaje que corra en sus propios servidores, y que solo puedan entrar los empleados con cuenta.

**gemini**
- `ok` · Arquitectura de chatbot interno para estudio contable
- Se propone una arquitectura segura con un motor de inferencia local para ejecutar los modelos de lenguaje y un sistema de gestión de identidades para el control de acceso de los empleados.
- **Ollama** (`ollama/ollama`), Servidor para ejecutar el modelo de lenguaje en servidores propios: Permite correr un modelo de lenguaje en sus propios servidores de forma sencilla, facilitando la respuesta a preguntas sobre los manuales de procedimientos.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y autenticación de empleados: Garantiza que solo puedan entrar los empleados con cuenta mediante un sistema centralizado de control de acceso.
- Limitación: La propuesta no incluye una interfaz gráfica de chat integrada ni un sistema de procesamiento documental para consultar los manuales de procedimientos, lo cual requeriría componentes adicionales como herramientas de indexación de documentos.
- Supuesto: Se asume que la interfaz de usuario del chatbot se integrará de manera personalizada con el servidor de inferencia y el servicio de autenticación.
- Rúbrica: español _ · rationale _ · coherencia _
