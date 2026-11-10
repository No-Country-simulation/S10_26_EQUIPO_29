# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 01:29. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 71% |
| Techo de la búsqueda (top 5) | 89% |
| Techo con 5 candidatos | 89% |
| Eligió un aceptable (donde había) | 96% |
| Se abstuvo (donde no había) | 8% |
| Acierto de punta a punta (comparable entre k) | 85% |
| Sin caja donde el caso no tiene herramientas | 0% |
| Eligió el primer candidato | 78% |
| Consistencia entre corridas | 12% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 1 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 4 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.5 s |
| Tiempo total (peor caso) | 5.2 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.7 s · 0.2 s · 2.5 s |
| Tokens entrada / salida (mediana) | 4512 / 798 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 94% | 94% | 100% | 94% – 100% |
| Se abstuvo (donde no había) | 0% | 17% | 0% | 0% – 17% |
| Acierto de punta a punta | 84% | 76% | 95% | 76% – 95% |
| Textos del modelo que hablan del catálogo | 0 | 3 | 1 | 0 – 3 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `clinica-veterinaria` · database | postgres, server, supabase | det 2/3 · techo 1 · eligió 1 |
| `clinica-veterinaria` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `escuela-idiomas` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · ai | (ninguno) | det 3/3 · eligió algo 3 |
| `escuela-idiomas` · analytics | posthog, umami, metabase | det 3/3 · techo 2 · eligió 2 |
| `tienda-repuestos` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `tienda-repuestos` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · cache | valkey, redis | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `agencia-turismo` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `coworking` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `coworking` · auth | keycloak, zitadel | det 1/3 · techo 1 · eligió 1 |
| `coworking` · analytics | metabase, grafana | det 3/3 · techo 1 · eligió 1 |
| `coworking` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `taller-restauracion` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `taller-restauracion` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `taller-restauracion` · auth | keycloak, zitadel | det 1/3 · techo 1 · eligió 1 |
| `taller-restauracion` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · cms | strapi, payload, Ghost | det 0/3 · techo 0 · eligió 0 |
| `academia-musica` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · auth | keycloak, zitadel | det 2/3 · techo 1 · eligió 1 |
| `academia-musica` · analytics | analytics, umami, posthog | det 3/3 · techo 3 · eligió 1 |
| `alquiler-equipos` · database | postgres, server, supabase | det 2/3 · techo 0 · eligió 0 |
| `alquiler-equipos` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `alquiler-equipos` · ai | (ninguno) | det 3/3 · eligió algo 3 |
| `alquiler-equipos` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `clinica-veterinaria`

> Tengo una clínica veterinaria y quiero llevar un historial de las mascotas y sus dueños. Necesito que cada empleado pueda consultar únicamente la información que le corresponde según su cargo. Quiero que los dueños puedan encontrar rápidamente los registros de vacunación y tratamientos anteriores de sus mascotas. También necesito enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación.

**gemini**
- `ok` · Sistema de gestión y notificaciones para clínica veterinaria
- Esta propuesta integra control de acceso por roles para el personal de la clínica, un motor de búsqueda rápida para los expedientes médicos de las mascotas y una infraestructura de comunicación para enviar notificaciones automáticas a los dueños.
- **Keycloak** (`keycloak/keycloak`), Control de acceso: Keycloak resuelve la gestión de identidad y acceso para permitir que cada empleado consulte únicamente la información que le corresponde según su cargo. Cuenta con licencia Apache-2.0 y alta actividad reciente.
- **Meilisearch** (`meilisearch/meilisearch`), Motor de búsqueda: Meilisearch permite que los dueños encuentren rápidamente los registros de vacunación y tratamientos anteriores de sus mascotas gracias a su motor de búsqueda ultrarrápido. Su licencia no fue identificada por GitHub y mantiene actualizaciones recientes.
- **Apprise** (`caronc/apprise`), Gestor de notificaciones: Apprise facilita el envío de notificaciones para los recordatorios de vacunación a los dueños. Posee licencia BSD-2-Clause y actividad constante en su desarrollo.
- Limitación: No se incluye la lógica interna para programar las alertas según la fecha calendario de vacunación.
- Limitación: El almacenamiento seguro de los expedientes médicos clínicos requiere una base de datos adicional que no se cubre con las herramientas seleccionadas.
- Supuesto: La clínica cuenta con una aplicación web o móvil propia para que los dueños consulten los historiales y el personal gestione los roles.
- Supuesto: Se requiere almacenar los datos principales de mascotas y dueños en una base de datos relacional complementaria al motor de búsqueda.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-idiomas`

> Dirijo una pequeña escuela de idiomas y quiero organizar las inscripciones y los datos de mis estudiantes. Necesito que cada profesor pueda acceder a sus grupos sin consultar información de otros cursos. Quiero que los estudiantes puedan hacer pruebas de nivel y recibir una recomendación automática del curso más adecuado. También quiero medir cuántos estudiantes pasan de una prueba inicial a una inscripción.

**gemini**
- `ok` · Plataforma de gestión académica y automatización para escuela
- Esta propuesta integra herramientas open source para gestionar la autenticación y permisos de acceso por roles, procesar las pruebas de nivel de los estudiantes mediante un marco de agentes de inteligencia artificial y medir el embudo de conversión desde la evaluación inicial hasta la inscripción final.
- **Keycloak** (`keycloak/keycloak`), Gestión de usuarios y control de acceso por roles: Keycloak ofrece una solución robusta de gestión de identidad y acceso con soporte para OIDC, permitiendo restringir el acceso para que cada profesor consulte únicamente la información de sus propios grupos.
- **LangChain** (`langchain-ai/langchain`), Orquestación de recomendación automática: LangChain provee la plataforma para desarrollar agentes y flujos de procesamiento de lenguaje, ideales para analizar las respuestas de las pruebas de nivel de los estudiantes y recomendar el curso más adecuado.
- **PostHog** (`PostHog/posthog`), Medición del embudo de conversión de estudiantes: PostHog es una plataforma que incluye analítica de productos y seguimiento de conversiones, permitiendo medir cuántos estudiantes pasan de la prueba inicial a la inscripción final. Su licencia no fue identificada por GitHub.
- Limitación: La propuesta no incluye una base de datos centralizada para almacenar los expedientes de los estudiantes ni un módulo de pagos para las inscripciones.
- Supuesto: Se asume que la escuela cuenta con infraestructura propia o servicio en la nube para alojar las herramientas desplegadas.
- Supuesto: Se asume que la aplicación web principal se integrará con Keycloak para validar los permisos de los profesores.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-repuestos`

> Tengo una tienda de repuestos para motocicletas y quiero controlar las existencias de cada referencia. Necesito encontrar productos por su descripción, compatibilidad y características, incluso cuando no conozco el nombre exacto. Quiero que las ventas por internet se cobren antes de preparar cada pedido. También necesito que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados.

**gemini**
- `ok` · Sistema de repuestos para motocicletas con pagos y búsqueda
- La propuesta integra búsqueda avanzada de productos, procesamiento de pagos en línea y una caché de alto rendimiento para asegurar respuestas rápidas a alta concurrencia.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda avanzada: Resuelve la búsqueda de productos por su descripción, compatibilidad y características, incluso sin conocer el nombre exacto. Su licencia no fue identificada por GitHub.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Permite gestionar los pagos en línea para asegurar que las ventas se cobren antes de preparar cada pedido. Cuenta con licencia Apache-2.0 y alta actividad reciente.
- **Redis** (`redis/redis`), Caché de alta concurrencia: Asegura que los productos más consultados se muestren rápidamente a pesar de que haya muchos clientes conectados gracias a su almacenamiento en memoria. Su licencia no fue identificada por GitHub.
- Limitación: No se incluyó una herramienta específica para el control de inventario de repuestos ya que no formaba parte de las necesidades evaluadas.
- Supuesto: Se asume que la tienda cuenta con una aplicación web propia para integrar las herramientas seleccionadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-turismo`

> Gestiono una agencia de turismo y quiero ofrecer excursiones con diferentes fechas y cupos disponibles. Necesito guardar fotografías, documentos y autorizaciones de cada reserva. Quiero que los clientes puedan pagar por adelantado desde cualquier lugar. Cuando se confirme una reserva, quiero que el cliente reciba un mensaje con los detalles del viaje y los documentos necesarios.

**gemini**
- `ok` · Plataforma open source para agencia de turismo
- Esta propuesta cubre el almacenamiento seguro de archivos de reservas, la gestión de pagos en línea y el envío automatizado de mensajes de confirmación a los clientes. El sistema integra herramientas open source activas para optimizar la operación de la agencia de turismo.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotografías y documentos: SeaweedFS permite guardar de manera eficiente las fotografías, documentos y autorizaciones de cada reserva. Utiliza licencia Apache-2.0 y cuenta con desarrollo activo.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos en línea: Hyperswitch posibilita que los clientes puedan pagar por adelantado desde cualquier lugar mediante su plataforma de pagos. Se distribuye bajo licencia Apache-2.0 con actualizaciones recientes.
- **Apprise** (`caronc/apprise`), Envío de notificaciones y mensajes: Apprise facilita que el cliente reciba un mensaje con los detalles del viaje y los documentos necesarios. Posee licencia BSD-2-Clause y mantenimiento constante.
- Limitación: Ninguna de las herramientas de almacenamiento o pagos incluye de forma nativa la lógica específica de negocio para la disponibilidad de cupos turísticos.
- Supuesto: La agencia cuenta con un backend propio para gestionar la lógica de las excursiones, fechas, cupos disponibles y el estado de las reservas.
- Supuesto: Se requiere un módulo o desarrollo propio para la gestión de calendarios, fechas y cupos de las excursiones, ya que no forma parte directa de las herramientas seleccionadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `coworking`

> Administro un espacio de coworking y quiero controlar las reservas de salas y puestos de trabajo. Necesito que los miembros puedan reservar únicamente los espacios incluidos en su plan. Quiero identificar qué salas tienen mayor demanda y en qué horarios se quedan vacías. También quiero que las reservas se confirmen automáticamente y que los miembros reciban un aviso cuando se acerque su horario reservado.

**gemini**
- `ok` · Sistema de gestión y analítica para coworking
- La propuesta cubre la analítica de uso de los espacios y el envío de notificaciones para las reservas. Quedan sin resolver la gestión específica de reservas y la validación de planes de los miembros.
- **PostHog** (`PostHog/posthog`), Analítica de demanda: Permite analizar el comportamiento y uso de las salas para identificar qué espacios tienen mayor demanda y cuáles se quedan vacíos. Su licencia no fue identificada por GitHub y cuenta con mantenimiento activo.
- **Apprise** (`caronc/apprise`), Envío de avisos: Facilita el envío de notificaciones a los miembros cuando se acerque su horario reservado mediante su API y marco de trabajo. Utiliza licencia BSD-2-Clause y tiene un mantenimiento muy reciente.
- Limitación: La propuesta no incluye un sistema para controlar las reservas de salas y puestos de trabajo ni para validar si están incluidos en el plan del miembro.
- Supuesto: Se asume que el sistema de coworking requerirá una interfaz personalizada para que los miembros elijan sus puestos y salas.
- Supuesto: Se requiere un módulo adicional para la gestión de membresías y validación de planes que no forma parte de las herramientas elegidas.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-restauracion`

> Tengo un taller dedicado a restaurar muebles antiguos y quiero documentar cada pieza desde que llega hasta que se entrega. Necesito conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia de cada mueble. Quiero que mis trabajadores puedan consultar los expedientes según el proyecto que tengan asignado. También necesito encontrar piezas por su época, material o procedencia.

**gemini**
- `ok` · Sistema de gestión y almacenamiento para taller de restauración
- Esta propuesta integra almacenamiento distribuido para conservar fotografías e informes de restauración, junto con un motor de búsqueda avanzada para localizar piezas según época, material o procedencia. Ambas herramientas se complementan para organizar expedientes digitales y facilitar la consulta del personal asignado a cada proyecto.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de expedientes, fotografías e informes: Permite conservar fotografías del estado original, informes de restauración y documentos de procedencia de cada mueble en un sistema de almacenamiento distribuido y S3. Cuenta con licencia Apache-2.0 y actividad reciente.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda y filtrado de piezas por atributos: Facilita encontrar piezas por su época, material o procedencia gracias a su motor de búsqueda con facetas y API. Su licencia no fue identificada por GitHub y mantiene actualizaciones recientes.
- Limitación: La propuesta no incluye un módulo específico para la asignación de proyectos a los trabajadores, lo cual requeriría lógica adicional de control de acceso o gestión de tareas.
- Supuesto: Se asume que el taller cuenta con la infraestructura necesaria para alojar los servicios de almacenamiento y búsqueda.
- Supuesto: Se requiere un desarrollo o interfaz propia que conecte la búsqueda con los expedientes digitales para los trabajadores.
- Rúbrica: español _ · rationale _ · coherencia _

### `academia-musica`

> Tengo una academia de música y quiero publicar información sobre los cursos, profesores y horarios disponibles. Necesito que los alumnos puedan consultar las partituras y grabaciones correspondientes a sus clases. Quiero que cada profesor pueda actualizar únicamente los materiales de sus propios grupos. También quiero saber cuáles son los cursos y materiales que reciben más consultas.

**gemini**
- `ok` · Plataforma Open Source para Gestión y Analítica de Academia de Música
- Esta propuesta implementa un sistema para gestionar el almacenamiento seguro de partituras y grabaciones de la academia mediante un sistema de archivos distribuido, complementado con una herramienta de inteligencia de negocios para analizar qué cursos y materiales reciben más consultas por parte de los alumnos. El sistema no incluye de forma nativa la gestión específica de roles por profesor ni la publicación directa de horarios y cursos en una interfaz web.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacén de partituras y grabaciones: Resuelve la necesidad de guardar y consultar las partituras y grabaciones correspondientes a las clases de los alumnos mediante un almacenamiento distribuido de alto rendimiento con acceso rápido a disco.
- **Metabase** (`metabase/metabase`), Motor de analítica y consultas: Permite analizar cuáles son los cursos y materiales que reciben más consultas mediante una plataforma de Business Intelligence fácil de usar. Su licencia no fue identificada por GitHub.
- Limitación: La propuesta no incluye un sistema de gestión de contenidos web para publicar información sobre cursos, profesores y horarios disponibles.
- Limitación: No se incluye de forma nativa un control de permisos detallado para que cada profesor actualice únicamente los materiales de sus propios grupos.
- Supuesto: Se asume que la academia cuenta con personal técnico para desplegar y mantener servicios auto-hospedados.
- Supuesto: El negocio requiere una interfaz web propia o portal de alumnos que se conectará a estas herramientas mediante APIs.
- Rúbrica: español _ · rationale _ · coherencia _

### `alquiler-equipos`

> Tengo un negocio de alquiler de equipos audiovisuales y quiero controlar qué equipos tengo disponibles y cuáles están alquilados. Necesito conservar los contratos firmados y las fotografías del estado de cada equipo antes y después de cada alquiler. Quiero que el sistema genere automáticamente un informe de daños cuando las fotografías de devolución muestren diferencias importantes respecto a las iniciales. También necesito que cada empleado pueda consultar los alquileres que tiene asignados.

**gemini**
- `ok` · Sistema de gestión y control para alquiler audiovisual
- Esta propuesta integra almacenamiento relacional para el inventario, un sistema de objetos para contratos y fotografías, y un marco de aprendizaje automático para el análisis de imágenes y generación de informes de daños.
- **SQLModel** (`fastapi/sqlmodel`), Control de inventario y alquileres: Permite gestionar las bases de datos SQL en Python de forma sencilla y robusta para controlar qué equipos están disponibles y cuáles alquilados.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Conservación de contratos y fotografías: Permite conservar los contratos firmados y las fotografías del estado de cada equipo antes y después de cada alquiler gracias a su almacenamiento distribuido de objetos.
- **Transformers** (`huggingface/transformers`), Análisis de imágenes y generación de informes: Proporciona un marco de modelos para visión y modelos multimodales que permite analizar las fotografías de devolución y detectar diferencias importantes.
- Limitación: No se incluye una interfaz de usuario dedicada para la consulta de alquileres por parte de los empleados.
- Supuesto: Se asume que la empresa cuenta con personal con capacidad para integrar aplicaciones en Python.
- Supuesto: El negocio requiere autenticación para que cada empleado consulte sus alquileres asignados, funcionalidad que se complementará mediante lógica de aplicación sobre la base de datos.
- Rúbrica: español _ · rationale _ · coherencia _
