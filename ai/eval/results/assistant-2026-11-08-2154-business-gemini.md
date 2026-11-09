# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-08 a las 21:54. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.9 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 70% |
| Techo de la búsqueda (top 5) | 85% |
| Techo con 5 candidatos | 85% |
| Eligió un aceptable (donde había) | 96% |
| Se abstuvo (donde no había) | 27% |
| Acierto de punta a punta (comparable entre k) | 82% |
| Sin caja donde el caso no tiene herramientas | 0% |
| Eligió el primer candidato | 59% |
| Consistencia entre corridas | 25% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 3 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 2 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.4 s |
| Tiempo total (peor caso) | 5.7 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.2 s · 2.6 s |
| Tokens entrada / salida (mediana) | 4006 / 794 |
| Esperas (límite de uso o error temporal) | 10.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 100% | 94% | 95% | 94% – 100% |
| Se abstuvo (donde no había) | 20% | 33% | 25% | 20% – 33% |
| Acierto de punta a punta | 85% | 75% | 86% | 75% – 86% |
| Textos del modelo que hablan del catálogo | 1 | 1 | 0 | 0 – 1 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `clinica-veterinaria` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `clinica-veterinaria` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `escuela-idiomas` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · ai | (ninguno) | det 3/3 · eligió algo 3 |
| `escuela-idiomas` · analytics | posthog, umami, metabase | det 3/3 · techo 1 · eligió 1 |
| `tienda-repuestos` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `tienda-repuestos` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · cache | valkey, redis | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · database | postgres, server, supabase | det 1/3 · techo 1 · eligió 1 |
| `agencia-turismo` · storage | seaweedfs, rustfs | det 3/3 · techo 1 · eligió 1 |
| `agencia-turismo` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `coworking` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `coworking` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `coworking` · analytics | metabase, grafana | det 3/3 · techo 1 · eligió 1 |
| `coworking` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `taller-restauracion` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `taller-restauracion` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `taller-restauracion` · auth | keycloak, zitadel | det 1/3 · techo 1 · eligió 1 |
| `taller-restauracion` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · cms | strapi, payload, Ghost | det 0/3 · techo 0 · eligió 0 |
| `academia-musica` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · auth | keycloak, zitadel | det 2/3 · techo 2 · eligió 2 |
| `academia-musica` · analytics | analytics, umami, posthog | det 3/3 · techo 3 · eligió 1 |
| `alquiler-equipos` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `alquiler-equipos` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `alquiler-equipos` · ai | (ninguno) | det 3/3 · eligió algo 3 |
| `alquiler-equipos` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `clinica-veterinaria`

> Tengo una clínica veterinaria y quiero llevar un historial de las mascotas y sus dueños. Necesito que cada empleado pueda consultar únicamente la información que le corresponde según su cargo. Quiero que los dueños puedan encontrar rápidamente los registros de vacunación y tratamientos anteriores de sus mascotas. También necesito enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación.

**gemini**
- `ok` · Sistema de gestión y notificaciones para clínica veterinaria
- Se seleccionaron herramientas para cubrir la autenticación basada en roles del personal, la búsqueda rápida de historiales médicos para los dueños y el envío de recordatorios de vacunación. El sistema garantiza la seguridad de los accesos y facilita la consulta eficiente de los datos clínicos.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y control de acceso: Keycloak ofrece administración de identidad y acceso para asegurar que cada empleado consulte únicamente la información correspondiente a su cargo, utilizando una licencia Apache-2.0 y con mantenimiento activo.
- **Meilisearch** (`meilisearch/meilisearch`), Motor de búsqueda rápida: Meilisearch proporciona una búsqueda rápida para que los dueños encuentren fácilmente los registros de vacunación y tratamientos anteriores de sus mascotas. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- **Apprise** (`caronc/apprise`), Envío de notificaciones y recordatorios: Apprise facilita el envío de notificaciones push para alertar a los dueños cuando se acerque una fecha de vacunación, operando bajo licencia BSD-2-Clause y con actualizaciones recientes.
- Limitación: No se incluyeron herramientas específicas para la interfaz de usuario o gestión completa de la clínica veterinaria.
- Limitación: La licencia de Meilisearch no fue identificada automáticamente por GitHub, por lo que se recomienda verificarla en su repositorio oficial.
- Supuesto: Se asume que la clínica cuenta con una base de datos centralizada para almacenar los historiales de mascotas y dueños.
- Supuesto: Se asume que la infraestructura soporta la integración vía API entre el sistema de autenticación, el buscador y el servicio de notificaciones.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-idiomas`

> Dirijo una pequeña escuela de idiomas y quiero organizar las inscripciones y los datos de mis estudiantes. Necesito que cada profesor pueda acceder a sus grupos sin consultar información de otros cursos. Quiero que los estudiantes puedan hacer pruebas de nivel y recibir una recomendación automática del curso más adecuado. También quiero medir cuántos estudiantes pasan de una prueba inicial a una inscripción.

**gemini**
- `ok` · Sistema de gestión y recomendación para escuela de idiomas
- Esta propuesta implementa el control de acceso para que los profesores consulten solo sus grupos y una herramienta de inteligencia artificial para las recomendaciones automáticas de cursos. Quedan sin resolver la organización inicial de inscripciones y la analítica para medir la conversión de estudiantes.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y acceso: Keycloak gestiona la autenticación y el control de acceso para que cada profesor acceda exclusivamente a sus grupos, con soporte para OIDC y SAML, bajo licencia Apache-2.0 y mantenimiento muy activo.
- **Ollama** (`ollama/ollama`), Motor de recomendación automática: Ollama permite integrar y ejecutar modelos avanzados para procesar las pruebas de nivel y generar la recomendación automática del curso más adecuado para cada estudiante, utilizando licencia MIT.
- Limitación: Analítica: no se encontraron herramientas del catálogo para «medir cuántos estudiantes pasan de una prueba inicial a una inscripción».
- Limitación: No se cubren las funciones de gestión de inscripciones ni el almacenamiento estructurado de los datos de los estudiantes.
- Supuesto: Se asume que la escuela dispone de infraestructura propia para alojar los servicios de autenticación y ejecución de modelos.
- Supuesto: Se requiere una base de datos adicional para almacenar las inscripciones y los datos de los estudiantes, ya que no fue cubierta por los candidatos.
- Supuesto: Se necesita un módulo o herramienta externa para cubrir las necesidades de analítica y medición de conversiones.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-repuestos`

> Tengo una tienda de repuestos para motocicletas y quiero controlar las existencias de cada referencia. Necesito encontrar productos por su descripción, compatibilidad y características, incluso cuando no conozco el nombre exacto. Quiero que las ventas por internet se cobren antes de preparar cada pedido. También necesito que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados.

**gemini**
- `ok` · Sistema de gestión y comercio electrónico para repuestos de motos
- Esta propuesta integra almacenamiento distribuido para inventario, un motor de búsqueda avanzado para descripciones y compatibilidades, una plataforma de pagos para procesar cobros y caché en memoria para alto tráfico de consultas.
- **etcd** (`etcd-io/etcd`), Almacenamiento de inventario: Permite controlar las existencias de cada referencia mediante un sistema de almacenamiento clave-valor distribuido y confiable. Su licencia es Apache-2.0 y tiene actividad reciente.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda de productos: Ayuda a encontrar productos por su descripción, compatibilidad y características aunque no se conozca el nombre exacto, gracias a su motor rápido. La licencia no fue identificada por GitHub y cuenta con mantenimiento activo.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Garantiza que las ventas por internet se cobren antes de preparar cada pedido mediante una plataforma de pagos conectable. Cuenta con licencia Apache-2.0 y actualizaciones recientes.
- **Valkey** (`valkey-io/valkey`), Caché en memoria: Asegura que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados, funcionando como caché en memoria. Tiene licencia BSD-3-Clause y desarrollo activo.
- Limitación: La propuesta no incluye un sistema de autenticación de usuarios ni la gestión logística de entrega de los pedidos.
- Limitación: El candidato redis/redis y seaweedfs también se consideraron para caché y almacenamiento, pero se priorizó Valkey y etcd por especialización.
- Supuesto: Se asume que la tienda cuenta con una interfaz web o aplicación para la interacción de los clientes.
- Supuesto: Se asume la necesidad de un servicio de pasarela o integración adicional con bancos locales a través de la plataforma de pagos elegida.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-turismo`

> Gestiono una agencia de turismo y quiero ofrecer excursiones con diferentes fechas y cupos disponibles. Necesito guardar fotografías, documentos y autorizaciones de cada reserva. Quiero que los clientes puedan pagar por adelantado desde cualquier lugar. Cuando se confirme una reserva, quiero que el cliente reciba un mensaje con los detalles del viaje y los documentos necesarios.

**gemini**
- `ok` · Infraestructura open source para agencia de turismo
- Esta propuesta integra herramientas open source para gestionar bases de datos relacionales, almacenar archivos y documentos de reservas, procesar pagos en línea y enviar notificaciones transaccionales a los clientes.
- **MariaDB** (`MariaDB/server`), Gestión de reservas y cupos: MariaDB server es una base de datos relacional comunitaria que permite almacenar la información sobre las excursiones, las diferentes fechas y los cupos disponibles de forma estructurada. Su licencia es GPL-2.0 y se mantiene activa.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos y documentos: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar miles de archivos con acceso rápido a disco. Permite guardar las fotografías, documentos y autorizaciones de cada reserva de manera eficiente mediante almacenamiento de objetos S3. Posee licencia Apache-2.0 y actividad reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Hyperswitch es una plataforma de pagos open source, componible y compatible con PCI que permite conectar múltiples proveedores de pago. Facilita que los clientes puedan pagar por adelantado desde cualquier lugar de manera segura. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- **Postal** (`postalserver/postal`), Envío de correos transaccionales: Postal es una plataforma de entrega de correo electrónico con todas las funciones necesarias para correos salientes y entrantes. Permite enviar al cliente un mensaje con los detalles del viaje y los documentos necesarios tras confirmar una reserva. Utiliza licencia MIT y se mantiene actualizada.
- Limitación: No se incluyen herramientas específicas para la interfaz de usuario de la agencia ni pasarelas de pago regionales específicas fuera de la plataforma general.
- Supuesto: Se asume que la agencia cuenta con una aplicación web o backend propio para coordinar la lógica de negocio entre las bases de datos, los pagos y el almacenamiento.
- Rúbrica: español _ · rationale _ · coherencia _

### `coworking`

> Administro un espacio de coworking y quiero controlar las reservas de salas y puestos de trabajo. Necesito que los miembros puedan reservar únicamente los espacios incluidos en su plan. Quiero identificar qué salas tienen mayor demanda y en qué horarios se quedan vacías. También quiero que las reservas se confirmen automáticamente y que los miembros reciban un aviso cuando se acerque su horario reservado.

**gemini**
- `ok` · Sistema de analitica y notificaciones para coworking
- La propuesta cubre la analitica de uso de salas y las notificaciones a los miembros sobre sus reservas proximas. Quedan sin automatizar la gestion de planes de membresia y la confirmacion automatica de reservas por falta de candidatos especificos.
- **ClickHouse** (`ClickHouse/ClickHouse`), Base de datos analitica: Permite almacenar y consultar los datos historicos de uso para identificar que salas tienen mayor demanda y en que horarios se quedan vacias gracias a su motor de analitica en tiempo real.
- **Apprise** (`caronc/apprise`), Servicio de notificaciones: Facilita el envio de avisos a los miembros cuando se acerque su horario reservado mediante notificaciones push conectadas a practicamente cualquier plataforma.
- Limitación: No se incluyen herramientas especificas para validar que los miembros reserven unicamente los espacios incluidos en su plan.
- Limitación: No hay componentes para la confirmacion automatica de las reservas.
- Supuesto: Se asume que existe un sistema central de gestion de reservas que alimenta tanto a la base de datos analitica como al servicio de notificaciones.
- Supuesto: Se requiere cubrir la gestion de planes de membresia y la confirmacion automatica de reservas, necesidades mencionadas por el usuario que no cuentan con candidatos en este conjunto.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-restauracion`

> Tengo un taller dedicado a restaurar muebles antiguos y quiero documentar cada pieza desde que llega hasta que se entrega. Necesito conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia de cada mueble. Quiero que mis trabajadores puedan consultar los expedientes según el proyecto que tengan asignado. También necesito encontrar piezas por su época, material o procedencia.

**gemini**
- `ok` · Sistema de gestión documental y búsqueda para taller de restauración
- Esta propuesta implementa un sistema para conservar fotografías, informes y documentos de los muebles mediante un almacenamiento de objetos distribuido, complementado con un motor de búsqueda avanzada para localizar piezas por época, material o procedencia.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotografías y documentos: SeaweedFS permite conservar de forma eficiente las fotografías del estado original, informes de restauración y documentos de procedencia gracias a su diseño para almacenamiento de objetos y archivos con acceso rápido.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda de piezas por época, material o procedencia: Meilisearch facilita encontrar piezas por su época, material o procedencia mediante un motor de búsqueda rápido que incluye capacidades de filtrado y búsqueda avanzada.
- Limitación: La propuesta no incluye un módulo específico para la asignación de proyectos a los trabajadores, lo cual requeriría lógica adicional en la aplicación cliente.
- Supuesto: Se asume que los trabajadores disponen de una interfaz web o aplicación desarrollada a medida para consultar los expedientes asignados.
- Supuesto: Se asume que el taller cuenta con la infraestructura necesaria para alojar los servicios de almacenamiento y búsqueda.
- Rúbrica: español _ · rationale _ · coherencia _

### `academia-musica`

> Tengo una academia de música y quiero publicar información sobre los cursos, profesores y horarios disponibles. Necesito que los alumnos puedan consultar las partituras y grabaciones correspondientes a sus clases. Quiero que cada profesor pueda actualizar únicamente los materiales de sus propios grupos. También quiero saber cuáles son los cursos y materiales que reciben más consultas.

**gemini**
- `ok` · Sistema de gestión de contenidos y analítica para academia musical
- Esta propuesta implementa un sistema de almacenamiento distribuido para partituras y grabaciones, y una plataforma de analítica web para medir las consultas de cursos y materiales. Quedan sin resolver de forma directa las necesidades de publicación web informativa, control de acceso por profesor y gestión de usuarios.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de partituras y grabaciones: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar miles de millones de archivos con acceso rápido en disco, ideal para conservar y servir las partituras y grabaciones de las clases.
- **Umami** (`umami-software/umami`), Analítica de consultas de cursos y materiales: Umami es una plataforma de analítica web que permite registrar el tráfico y comportamiento de los usuarios sin uso de cookies, ayudando a identificar cuáles son los cursos y materiales que reciben más consultas.
- Limitación: La propuesta no incluye un módulo de autenticación ni control de permisos por roles para que los profesores actualicen únicamente los materiales de sus propios grupos.
- Limitación: No se dispone de herramientas en el catálogo para la publicación inicial de información sobre cursos, profesores y horarios disponibles.
- Supuesto: Se asume que la academia cuenta con una interfaz web propia para la publicación de cursos y el acceso de los alumnos que se conectará con estas herramientas.
- Supuesto: Se asume la necesidad de un sistema de gestión de contenidos (CMS) o control de acceso para que cada profesor actualice sus materiales, la cual no cuenta con candidatos en este pedido.
- Rúbrica: español _ · rationale _ · coherencia _

### `alquiler-equipos`

> Tengo un negocio de alquiler de equipos audiovisuales y quiero controlar qué equipos tengo disponibles y cuáles están alquilados. Necesito conservar los contratos firmados y las fotografías del estado de cada equipo antes y después de cada alquiler. Quiero que el sistema genere automáticamente un informe de daños cuando las fotografías de devolución muestren diferencias importantes respecto a las iniciales. También necesito que cada empleado pueda consultar los alquileres que tiene asignados.

**gemini**
- `ok` · Sistema de gestión y análisis para alquiler audiovisual
- Esta propuesta integra almacenamiento distribuido para contratos y fotografías, y un marco de aprendizaje automático para el análisis visual de daños, cubriendo los requerimientos principales del negocio de alquiler.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de contratos y fotografías: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos de forma eficiente con acceso rápido, permitiendo conservar los contratos firmados y las fotografías del estado de cada equipo.
- **Transformers** (`huggingface/transformers`), Generación de informes de daños mediante análisis visual: Transformers ofrece modelos de aprendizaje automático para visión que permiten analizar las fotografías y detectar las diferencias importantes entre el estado inicial y el de devolución.
- Limitación: No se incluyen herramientas específicas para la interfaz de usuario donde los empleados consulten sus alquileres asignados.
- Supuesto: Se asume que el negocio cuenta con personal técnico capaz de integrar los modelos de visión con el almacenamiento de archivos.
- Supuesto: El control de disponibilidad de equipos y la consulta de alquileres por empleado requerirán lógica de aplicación adicional no cubierta por estas herramientas base.
- Rúbrica: español _ · rationale _ · coherencia _
