# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 15:31. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 15.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 81% |
| Techo de la búsqueda (top 5) | 86% |
| Techo con 5 candidatos | 86% |
| Eligió un aceptable (donde había) | 97% |
| Se abstuvo (donde no había) | 44% |
| Acierto de punta a punta (comparable entre k) | 83% |
| Sin caja donde el caso no tiene herramientas | 17% |
| Recibe una herramienta aceptable, como lo ve el usuario | 67% |
| Se abstuvo, como lo ve el usuario | 17% |
| Eligió el primer candidato | 54% |
| Consistencia entre corridas | 0% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 2 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 2 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.7 s |
| Tiempo total (peor caso) | 7.2 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.5 s · 0.2 s · 2.8 s |
| Tokens entrada / salida (mediana) | 5054 / 924 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 100% | 90% | 100% | 90% – 100% |
| Se abstuvo (donde no había) | 40% | 60% | 33% | 33% – 60% |
| Acierto de punta a punta | 88% | 79% | 83% | 79% – 88% |
| Recibe una herramienta aceptable, como lo ve el usuario | 70% | 63% | 67% | 63% – 70% |
| Se abstuvo, como lo ve el usuario | 0% | 50% | 0% | 0% – 50% |
| Textos del modelo que hablan del catálogo | 1 | 1 | 0 | 0 – 1 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `clinica-veterinaria` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `escuela-idiomas` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · ai | (ninguno) | det 3/3 · eligió algo 2 |
| `escuela-idiomas` · analytics | posthog, umami, metabase | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `tienda-repuestos` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · cache | valkey, redis | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `agencia-turismo` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `coworking` · database | postgres, server, supabase | det 1/3 · techo 0 · eligió 0 |
| `coworking` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `coworking` · analytics | metabase, grafana | det 3/3 · techo 3 · eligió 2 |
| `coworking` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `taller-restauracion` · database | postgres, server, supabase | det 2/3 · techo 1 · eligió 1 |
| `taller-restauracion` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `taller-restauracion` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `taller-restauracion` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · cms | strapi, payload, Ghost | det 0/3 · techo 0 · eligió 0 |
| `academia-musica` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · analytics | analytics, umami, posthog | det 3/3 · techo 3 · eligió 2 |
| `alquiler-equipos` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `alquiler-equipos` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `alquiler-equipos` · ai | (ninguno) | det 3/3 · eligió algo 3 |
| `alquiler-equipos` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `clinica-veterinaria`

> Tengo una clínica veterinaria y quiero llevar un historial de las mascotas y sus dueños. Necesito que cada empleado pueda consultar únicamente la información que le corresponde según su cargo. Quiero que los dueños puedan encontrar rápidamente los registros de vacunación y tratamientos anteriores de sus mascotas. También necesito enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación.

**gemini**
- `ok` · Sistema de gestión e historial médico para clínica veterinaria
- Esta propuesta implementa un sistema para gestionar el historial de mascotas y dueños en una clínica veterinaria. Se compone de una base de datos relacional para los registros, un sistema de identidad y acceso por roles para los empleados, un motor de búsqueda rápida para los tratamientos y una plataforma de notificaciones para los recordatorios de vacunación.
- **PostgreSQL** (`postgres/postgres`), Almacenar el historial de las mascotas y sus dueños.: Permite llevar el historial de las mascotas y sus dueños guardando de forma estructurada toda la información necesaria. La licencia no está identificada por GitHub y recibe mantenimiento constante.
- **Keycloak** (`keycloak/keycloak`), Controlar el acceso por cargos para cada empleado.: Permite gestionar la identidad y el acceso para asegurar que cada empleado pueda consultar únicamente la información que le corresponde según su cargo. Cuenta con licencia Apache-2.0 y alta actividad reciente.
- **Meilisearch** (`meilisearch/meilisearch`), Facilitar la búsqueda rápida de registros de vacunación y tratamientos.: Permite que los dueños puedan encontrar rápidamente los registros de vacunación y tratamientos anteriores de sus mascotas mediante un motor de búsqueda veloz. Su licencia no está identificada por GitHub y se actualiza de forma continua.
- **Novu** (`novuhq/novu`), Enviar recordatorios de vacunación a los dueños.: Permite enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación utilizando infraestructura de comunicación open-source. La licencia no está identificada por GitHub y cuenta con mantenimiento activo.
- Limitación: Ninguna de las herramientas incluye por defecto una interfaz gráfica específica para veterinaria, por lo que deberá desarrollarse una aplicación cliente.
- Supuesto: Se asume que la clínica cuenta con personal técnico para desplegar y mantener los servicios seleccionados.
- Supuesto: Se asume que los dueños de las mascotas accederán a través de una interfaz web o móvil conectada a estas herramientas.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-idiomas`

> Dirijo una pequeña escuela de idiomas y quiero organizar las inscripciones y los datos de mis estudiantes. Necesito que cada profesor pueda acceder a sus grupos sin consultar información de otros cursos. Quiero que los estudiantes puedan hacer pruebas de nivel y recibir una recomendación automática del curso más adecuado. También quiero medir cuántos estudiantes pasan de una prueba inicial a una inscripción.

**gemini**
- `ok` · Sistema de gestión y pruebas de nivel para escuela de idiomas
- Esta propuesta organiza las inscripciones, los datos de los estudiantes y el control de acceso por roles para los profesores de la escuela de idiomas. Incorpora un motor de aprendizaje automático para generar recomendaciones automáticas de cursos a partir de las pruebas de nivel, y una plataforma de analítica para medir la conversión desde la prueba inicial hasta la inscripción.
- **MariaDB** (`MariaDB/server`), Almacenar la información de los estudiantes y las inscripciones.: MariaDB permite organizar las inscripciones y los datos de los estudiantes de manera confiable con soporte SQL completo. Cuenta con licencia GPL-2.0 y actualizaciones recientes.
- **Keycloak** (`keycloak/keycloak`), Gestionar la autenticación y el control de acceso por roles para los profesores.: Keycloak permite administrar permisos y roles para asegurar que cada profesor consulte únicamente la información de sus propios cursos. Su licencia es Apache-2.0 y se mantiene de forma activa.
- **Scikit-Learn** (`scikit-learn/scikit-learn`), Procesar las pruebas de nivel y generar la recomendación automática del curso.: Scikit-learn implementa algoritmos de aprendizaje automático para analizar los resultados de las pruebas de nivel y predecir el curso adecuado. Utiliza licencia BSD-3-Clause y recibe actualizaciones constantes.
- **PostHog** (`PostHog/posthog`), Medir las conversiones entre la prueba inicial y la inscripción final.: PostHog permite realizar un seguimiento detallado del comportamiento de los usuarios para medir el embudo de conversión desde la prueba hasta la inscripción. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- Limitación: PostHog tiene su licencia no identificada por GitHub. Las herramientas elegidas no incluyen una interfaz web visual predeterminada para la administración directa de la escuela.
- Supuesto: Se asume que la escuela cuenta con un servidor propio o infraestructura en la nube para alojar este sistema autohospedado.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-repuestos`

> Tengo una tienda de repuestos para motocicletas y quiero controlar las existencias de cada referencia. Necesito encontrar productos por su descripción, compatibilidad y características, incluso cuando no conozco el nombre exacto. Quiero que las ventas por internet se cobren antes de preparar cada pedido. También necesito que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados.

**gemini**
- `ok` · Sistema de gestión y pagos para tienda de repuestos de motos
- Esta propuesta implementa un sistema para la tienda de repuestos que permite procesar cobros en línea de forma segura y optimizar las consultas frecuentes de los clientes. Se incorporaron herramientas de búsqueda y caché, aunque no se encontró un candidato directo que cubriera el control de existencias de inventario en las opciones disponibles.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda avanzada de productos: Meilisearch permite encontrar productos por su descripción, compatibilidad y características de forma rápida mediante una API de búsqueda híbrida. Su licencia no está identificada por GitHub y recibe mantenimiento activo.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos en línea: Hyperswitch permite cobrar las ventas por internet de manera previa a la preparación de cada pedido conectándose con múltiples proveedores de pago. Cuenta con licencia Apache-2.0 y mantenimiento constante.
- **Valkey** (`valkey-io/valkey`), Caché para alta concurrencia: Valkey optimiza las consultas frecuentes para que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados. Posee licencia BSD-3-Clause y alta actividad reciente.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Los candidatos disponibles en esta categoría se enfocan en automatización, seguridad o control de versiones, por lo que no resuelven la funcionalidad de inventario solicitada.
- Supuesto: Se asume que la tienda cuenta con una interfaz web o aplicación principal para la cual estas herramientas proveerán los servicios de búsqueda, cobro y caché.
- Supuesto: El control de existencias requiere una solución de base de datos relacional tradicional que no se encontraba disponible en el catálogo de candidatos para la categoría de bases de datos.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-turismo`

> Gestiono una agencia de turismo y quiero ofrecer excursiones con diferentes fechas y cupos disponibles. Necesito guardar fotografías, documentos y autorizaciones de cada reserva. Quiero que los clientes puedan pagar por adelantado desde cualquier lugar. Cuando se confirme una reserva, quiero que el cliente reciba un mensaje con los detalles del viaje y los documentos necesarios.

**gemini**
- `ok` · Sistema de gestión y pagos para agencia de turismo
- Esta propuesta organiza el almacenamiento de documentos y fotografías mediante un sistema de objetos distribuido, gestiona los pagos anticipados de los clientes a través de una plataforma financiera y centraliza el envío de mensajes de confirmación de viaje con infraestructura de comunicaciones.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos: Permite guardar las fotografías, documentos y autorizaciones de cada reserva de manera eficiente con acceso rápido a disco.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Facilita que los clientes puedan pagar por adelantado desde cualquier lugar mediante conectividad con múltiples proveedores de pagos.
- **Novu** (`novuhq/novu`), Envío de notificaciones: Envía el mensaje con los detalles del viaje y los documentos necesarios al cliente cuando se confirma una reserva. La licencia de la herramienta no fue identificada por GitHub.
- Limitación: La propuesta no incluye una interfaz web o módulo específico para la selección y control de fechas y cupos de las excursiones.
- Supuesto: Se asume que la agencia cuenta con una aplicación central que se integra mediante API con estas herramientas para gestionar las fechas y los cupos de las excursiones.
- Rúbrica: español _ · rationale _ · coherencia _

### `coworking`

> Administro un espacio de coworking y quiero controlar las reservas de salas y puestos de trabajo. Necesito que los miembros puedan reservar únicamente los espacios incluidos en su plan. Quiero identificar qué salas tienen mayor demanda y en qué horarios se quedan vacías. También quiero que las reservas se confirmen automáticamente y que los miembros reciban un aviso cuando se acerque su horario reservado.

**gemini**
- `ok` · Sistema de gestión y analítica para espacio de coworking
- Esta propuesta implementa herramientas para analizar la ocupación y demanda de los espacios en el coworking, además de gestionar las notificaciones para los miembros. Quedan fuera del alcance directo la gestión específica de reservas por planes y la confirmación automática.
- **Metabase** (`metabase/metabase`), Analítica de demanda y ocupación: Metabase es una herramienta de inteligencia de negocios de uso sencillo que permite trabajar con datos para crear tableros y analizar las métricas del espacio. La licencia no está identificada por GitHub. Tiene actividad reciente y cuenta con una gran comunidad.
- **Novu** (`novuhq/novu`), Envío de avisos: Novu provee infraestructura de comunicación open source para gestionar notificaciones a través de diferentes canales. La licencia no está identificada por GitHub. Se mantiene actualizado de forma constante.
- Limitación: La propuesta no incluye la gestión de reservas ni la validación de planes de membresía.
- Supuesto: Se asume que el sistema de coworking cuenta con una base de datos propia para registrar las reservas y validar los planes de los miembros.
- Supuesto: Se asume que la confirmación automática de reservas se resolverá con lógica propia de la aplicación principal del negocio.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-restauracion`

> Tengo un taller dedicado a restaurar muebles antiguos y quiero documentar cada pieza desde que llega hasta que se entrega. Necesito conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia de cada mueble. Quiero que mis trabajadores puedan consultar los expedientes según el proyecto que tengan asignado. También necesito encontrar piezas por su época, material o procedencia.

**gemini**
- `ok` · Sistema de gestión y documentación para taller de restauración
- Se propone una arquitectura basada en un sistema de almacenamiento distribuido para conservar fotografías y documentos, una base de datos analítica integrada y un motor de búsqueda avanzado para localizar piezas por época, material o procedencia.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacena fotografías y documentos: Permite conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia de cada mueble gracias a su sistema de almacenamiento distribuido. Cuenta con licencia Apache-2.0 y actividad reciente.
- **DuckDB** (`duckdb/duckdb`), Gestiona los expedientes de los proyectos: Facilita la consulta de los expedientes según el proyecto asignado a cada trabajador mediante su sistema de base de datos SQL. Utiliza licencia MIT y tiene un mantenimiento activo.
- **OpenSearch** (`opensearch-project/OpenSearch`), Busca piezas por época, material o procedencia: Permite encontrar piezas por su época, material o procedencia usando capacidades de búsqueda avanzada. Posee licencia Apache-2.0 y actualizaciones constantes.
- Limitación: No se incluye un módulo específico para la asignación de tareas a trabajadores, lo cual requeriría lógica adicional en la aplicación cliente.
- Supuesto: Se asume que el taller cuenta con infraestructura para alojar servicios locales o en la nube.
- Supuesto: Los trabajadores dispondrán de una interfaz web o aplicación para interactuar con la base de datos y el motor de búsqueda.
- Rúbrica: español _ · rationale _ · coherencia _

### `academia-musica`

> Tengo una academia de música y quiero publicar información sobre los cursos, profesores y horarios disponibles. Necesito que los alumnos puedan consultar las partituras y grabaciones correspondientes a sus clases. Quiero que cada profesor pueda actualizar únicamente los materiales de sus propios grupos. También quiero saber cuáles son los cursos y materiales que reciben más consultas.

**gemini**
- `ok` · Sistema web para academia de música con gestión de materiales
- Esta propuesta implementa un sistema para la academia de música utilizando almacenamiento distribuido para partituras y grabaciones, un sistema de identidad para gestionar los permisos de los profesores y una plataforma de analítica para saber cuáles son los cursos y materiales más consultados.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacena partituras y grabaciones: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos y objetos con alta eficiencia, resolviendo el almacenamiento de partituras y grabaciones correspondientes a las clases de los alumnos.
- **Keycloak** (`keycloak/keycloak`), Gestiona identidad y permisos: Keycloak provee infraestructura de identidad y acceso para administrar los usuarios y asegurar que cada profesor pueda actualizar únicamente los materiales de sus propios grupos.
- **PostHog** (`PostHog/posthog`), Mide consultas de cursos y materiales: PostHog es una plataforma de analítica que permite registrar eventos y comportamiento de los usuarios, ayudando a saber cuáles son los cursos y materiales que reciben más consultas. La licencia no está identificada por GitHub.
- Limitación: No se incluye una herramienta específica para la interfaz pública de publicación de cursos, profesores y horarios, la cual deberá desarrollarse de forma personalizada.
- Supuesto: Se asume que la academia cuenta con una aplicación web propia que se integra con estas herramientas mediante API.
- Supuesto: El requerimiento de publicar información sobre cursos y profesores se resolverá en el desarrollo de la aplicación principal y no requiere una herramienta dedicada adicional.
- Rúbrica: español _ · rationale _ · coherencia _

### `alquiler-equipos`

> Tengo un negocio de alquiler de equipos audiovisuales y quiero controlar qué equipos tengo disponibles y cuáles están alquilados. Necesito conservar los contratos firmados y las fotografías del estado de cada equipo antes y después de cada alquiler. Quiero que el sistema genere automáticamente un informe de daños cuando las fotografías de devolución muestren diferencias importantes respecto a las iniciales. También necesito que cada empleado pueda consultar los alquileres que tiene asignados.

**gemini**
- `ok` · Sistema de gestión y análisis para alquiler audiovisual
- Esta propuesta implementa un sistema para un negocio de alquiler de equipos audiovisuales. Utiliza una base de datos para el control de inventario y contratos, almacenamiento de objetos para las fotografías y una plataforma de aprendizaje automático para el análisis de imágenes y generación de informes de daños.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotografías y contratos: Permite gestionar el almacenamiento distribuido para guardar las fotografías del estado de los equipos antes y después de cada alquiler de manera eficiente.
- **Transformers** (`huggingface/transformers`), Análisis de imágenes: Ofrece modelos de aprendizaje automático y visión multimodal para procesar las fotografías y detectar diferencias importantes para el informe de daños.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Ninguno de los candidatos analizados sirve para almacenar bases de datos relacionales o de inventario; Ansible es una herramienta de automatización y no una base de datos.
- Limitación: No se encontró ningún candidato adecuado para cubrir la necesidad de base de datos.
- Supuesto: Se asume que la consulta de alquileres asignados a empleados se resolverá mediante una interfaz o aplicación complementaria conectada al sistema.
- Supuesto: Se requiere una base de datos relacional tradicional que no estuvo disponible entre los candidatos para registrar los contratos y el inventario.
- Rúbrica: español _ · rationale _ · coherencia _
