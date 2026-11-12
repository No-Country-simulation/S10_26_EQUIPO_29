# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 14:55. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 5.8 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 79% |
| Techo de la búsqueda (top 5) | 87% |
| Techo con 5 candidatos | 87% |
| Eligió un aceptable (donde había) | 93% |
| Se abstuvo (donde no había) | 47% |
| Acierto de punta a punta (comparable entre k) | 81% |
| Sin caja donde el caso no tiene herramientas | 0% |
| Recibe una herramienta aceptable, como lo ve el usuario | 63% |
| Se abstuvo, como lo ve el usuario | 0% |
| Eligió el primer candidato | 65% |
| Consistencia entre corridas | 38% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 0 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 7 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.8 s |
| Tiempo total (peor caso) | 5.5 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.2 s · 2.8 s |
| Tokens entrada / salida (mediana) | 4950 / 888 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 95% | 90% | 95% | 90% – 95% |
| Se abstuvo (donde no había) | 50% | 60% | 33% | 33% – 60% |
| Acierto de punta a punta | 86% | 79% | 79% | 79% – 86% |
| Recibe una herramienta aceptable, como lo ve el usuario | 63% | 63% | 63% | 63% – 63% |
| Se abstuvo, como lo ve el usuario | 0% | 0% | 0% | 0% – 0% |
| Textos del modelo que hablan del catálogo | 3 | 1 | 3 | 1 – 3 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `clinica-veterinaria` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 1 |
| `clinica-veterinaria` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · database | postgres, server, supabase | det 2/3 · techo 1 · eligió 1 |
| `escuela-idiomas` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · ai | (ninguno) | det 3/3 · eligió algo 3 |
| `escuela-idiomas` · analytics | posthog, umami, metabase | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `tienda-repuestos` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · cache | valkey, redis | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `agencia-turismo` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `coworking` · database | postgres, server, supabase | det 2/3 · techo 0 · eligió 0 |
| `coworking` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `coworking` · analytics | metabase, grafana | det 3/3 · techo 3 · eligió 2 |
| `coworking` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `taller-restauracion` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
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
- `ok` · Sistema de gestión y comunicación para clínica veterinaria
- Esta propuesta implementa un sistema para la clínica veterinaria que abarca el almacenamiento seguro de historiales médicos, el control de acceso basado en roles para los empleados, un motor de búsqueda rápida para los dueños y un servicio de notificaciones para recordatorios de vacunación.
- **SQLModel** (`fastapi/sqlmodel`), Almacenamiento de historiales de mascotas y dueños: Permite gestionar bases de datos SQL en Python de forma sencilla y robusta para llevar el registro de las mascotas y sus dueños con licencia MIT.
- **Keycloak** (`keycloak/keycloak`), Control de acceso para empleados según su cargo: Proporciona gestión de identidad y acceso de código abierto bajo licencia Apache-2.0, permitiendo restringir la información según el cargo de cada empleado.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda rápida de registros para dueños: Ofrece un motor de búsqueda ultrarrápido con API para que los dueños encuentren rápidamente los registros de vacunación y tratamientos anteriores. Su licencia no fue identificada por GitHub.
- **Apprise** (`caronc/apprise`), Envío de recordatorios a los dueños: Facilita el envío de notificaciones push que funcionan con casi cualquier plataforma para alertar a los dueños cuando se acerque una fecha de vacunación, utilizando la licencia BSD-2-Clause.
- Limitación: La propuesta no incluye una interfaz de usuario final desarrollada, requiriendo un desarrollo frontend adicional.
- Supuesto: Se asume que la clínica cuenta con infraestructura para alojar servicios autohospedados.
- Supuesto: Se asume que los dueños acceden a una interfaz web o móvil conectada a los servicios de búsqueda y comunicación.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-idiomas`

> Dirijo una pequeña escuela de idiomas y quiero organizar las inscripciones y los datos de mis estudiantes. Necesito que cada profesor pueda acceder a sus grupos sin consultar información de otros cursos. Quiero que los estudiantes puedan hacer pruebas de nivel y recibir una recomendación automática del curso más adecuado. También quiero medir cuántos estudiantes pasan de una prueba inicial a una inscripción.

**gemini**
- `ok` · Sistema open source para gestión de escuela de idiomas
- Esta propuesta integra herramientas de autenticación para gestionar roles de profesores, machine learning para evaluar niveles y recomendar cursos automáticamente, y analítica web para medir la conversión de estudiantes. El sistema cubre todas las necesidades planteadas por la dirección.
- **Keycloak** (`keycloak/keycloak`), Control de acceso: Keycloak permite administrar la autenticación y el control de acceso por roles para que cada profesor consulte únicamente la información de sus grupos. Cuenta con licencia Apache-2.0 y actividad reciente.
- **Scikit-learn** (`scikit-learn/scikit-learn`), Recomendación automática: Scikit-learn ofrece herramientas de machine learning para procesar las pruebas de nivel de los estudiantes y generar una recomendación automática del curso más adecuado. Utiliza licencia BSD-3-Clause y se mantiene activo.
- **Umami** (`umami-software/umami`), Medición de conversión: Umami permite medir cuántos estudiantes pasan de una prueba inicial a una inscripción mediante el seguimiento de conversiones y comportamiento. Posee licencia MIT y mantenimiento constante.
- Limitación: La propuesta no incluye un módulo específico para la gestión administrativa de pagos o facturación de las inscripciones.
- Supuesto: Se asume que la escuela cuenta con infraestructura propia o en la nube para alojar las herramientas autohospedadas.
- Supuesto: Se asume que los profesores y estudiantes acceden a través de una aplicación web centralizada.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-repuestos`

> Tengo una tienda de repuestos para motocicletas y quiero controlar las existencias de cada referencia. Necesito encontrar productos por su descripción, compatibilidad y características, incluso cuando no conozco el nombre exacto. Quiero que las ventas por internet se cobren antes de preparar cada pedido. También necesito que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados.

**gemini**
- `ok` · Sistema Open Source para Tienda de Repuestos de Motos
- Esta propuesta integra una plataforma de pagos para procesar transacciones por internet, un motor de búsqueda avanzada para localizar repuestos por descripción y características, y una solución de caché para acelerar las consultas frecuentes de los clientes. Queda pendiente el control de existencias por falta de un candidato adecuado para base de datos de inventario en el catálogo.
- **Typesense** (`typesense/typesense`), Búsqueda avanzada de productos: Permite encontrar repuestos por descripción, compatibilidad y características mediante un motor de búsqueda tolerante a errores y basado en memoria, con licencia GPL-3.0 y actividad reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Pasarela de pagos: Permite procesar los cobros de las ventas por internet de forma previa a la preparación de cada pedido, ofreciendo conectividad con múltiples proveedores bajo licencia Apache-2.0 y mantenimiento activo.
- **Valkey** (`valkey-io/valkey`), Caché de alta velocidad: Optimizado para almacenamiento en caché y cargas de trabajo en tiempo real, asegura que los productos más consultados se muestren rápidamente ante alta concurrencia, con licencia BSD-3-Clause y actualización reciente.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. La herramienta hashicorp/vault se enfoca en la gestión de secretos y cifrado, por lo que no resuelve el control de inventario de repuestos solicitado.
- Limitación: No se encontró ninguna herramienta en el catálogo para cubrir la necesidad de base de datos e inventario.
- Limitación: La herramienta HashiCorp Vault no resuelve el control de existencias para la tienda de repuestos.
- Supuesto: Se asume que la tienda cuenta con una interfaz web o aplicación para integrar la pasarela de pagos y el buscador.
- Supuesto: Se asume que el sistema dispondrá de infraestructura propia para alojar las herramientas autohospedadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-turismo`

> Gestiono una agencia de turismo y quiero ofrecer excursiones con diferentes fechas y cupos disponibles. Necesito guardar fotografías, documentos y autorizaciones de cada reserva. Quiero que los clientes puedan pagar por adelantado desde cualquier lugar. Cuando se confirme una reserva, quiero que el cliente reciba un mensaje con los detalles del viaje y los documentos necesarios.

**gemini**
- `ok` · Arquitectura de Software para Agencia de Turismo
- Esta propuesta integra herramientas de código abierto para gestionar el almacenamiento de documentos, procesar pagos en línea de forma segura y automatizar el envío de mensajes transaccionales con los detalles del viaje para los clientes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotografías y documentos de reserva: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos de manera eficiente con licencia Apache-2.0 y actividad reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos por adelantado: Hyperswitch permite conectar múltiples proveedores de pago con licencia Apache-2.0 y un mantenimiento activo.
- **Novu** (`novuhq/novu`), Envío de mensajes con detalles de reserva: Novu provee infraestructura de comunicación para gestionar notificaciones, aunque su licencia no está identificada por GitHub.
- Limitación: La propuesta no incluye una solución específica para la administración de la disponibilidad de fechas y cupos de las excursiones.
- Supuesto: Se asume que la agencia cuenta con servidores propios o capacidad en la nube para alojar estas herramientas autohospedadas.
- Supuesto: El sistema requiere módulos adicionales para la gestión de fechas y cupos de excursiones que no forman parte de las necesidades evaluadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `coworking`

> Administro un espacio de coworking y quiero controlar las reservas de salas y puestos de trabajo. Necesito que los miembros puedan reservar únicamente los espacios incluidos en su plan. Quiero identificar qué salas tienen mayor demanda y en qué horarios se quedan vacías. También quiero que las reservas se confirmen automáticamente y que los miembros reciban un aviso cuando se acerque su horario reservado.

**gemini**
- `ok` · Sistema de analitica y avisos para coworking
- Esta propuesta incluye herramientas de inteligencia de negocios y notificaciones para cubrir las necesidades de analisis de demanda de salas y envio de avisos de reservas. El negocio requerira una solucion adicional para gestionar las reservas y planes de los miembros, ya que no se encontro un candidato especifico para esa funcion en el catalogo.
- **Metabase** (`metabase/metabase`), Analitica de uso de espacios: Permite explorar y visualizar datos sobre el uso de salas para identificar las de mayor demanda y los horarios vacios. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- **Apprise** (`caronc/apprise`), Envio de avisos: Facilita el envio de notificaciones y alertas a los miembros cuando se acerque su horario reservado. Utiliza la licencia BSD-2-Clause y se mantiene activo.
- Limitación: No se cubren las funciones de control de reservas de salas, puestos de trabajo ni la validacion de planes de los miembros.
- Supuesto: Se asume que los datos de reservas se almacenan en una base de datos accesible para Metabase.
- Supuesto: El negocio necesita un sistema de gestion de membresias y reservas que no forma parte de las herramientas evaluadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-restauracion`

> Tengo un taller dedicado a restaurar muebles antiguos y quiero documentar cada pieza desde que llega hasta que se entrega. Necesito conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia de cada mueble. Quiero que mis trabajadores puedan consultar los expedientes según el proyecto que tengan asignado. También necesito encontrar piezas por su época, material o procedencia.

**gemini**
- `ok` · Sistema de Gestion y Busqueda para Taller de Restauracion
- Se propone una solucion basada en un sistema de almacenamiento distribuido para conservar de forma segura todas las fotografias, informes y documentos de los muebles, combinada con un motor de busqueda avanzado para localizar las piezas segun sus atributos y proyectos asignados.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotografias e informes: Permite conservar de forma eficiente y centralizada todas las fotografias del estado original, los informes de restauración y los documentos de procedencia de cada mueble en un sistema de almacenamiento distribuido con licencia Apache-2.0.
- **Meilisearch** (`meilisearch/meilisearch`), Busqueda de piezas y expedientes: Facilita la consulta de expedientes segun el proyecto asignado y permite encontrar piezas de manera agil por su epoca, material o procedencia. La licencia no fue identificada por GitHub.
- Limitación: No se incluye una interfaz grafica de gestion de proyectos o flujos de trabajo dedicada, por lo que debera desarrollarse o integrarse una aplicacion que conecte el almacenamiento y el motor de busqueda con los trabajadores del taller.
- Supuesto: Se asume que el taller cuenta con la infraestructura basica de red para alojar los servicios de almacenamiento y busqueda localmente o en la nube.
- Rúbrica: español _ · rationale _ · coherencia _

### `academia-musica`

> Tengo una academia de música y quiero publicar información sobre los cursos, profesores y horarios disponibles. Necesito que los alumnos puedan consultar las partituras y grabaciones correspondientes a sus clases. Quiero que cada profesor pueda actualizar únicamente los materiales de sus propios grupos. También quiero saber cuáles son los cursos y materiales que reciben más consultas.

**gemini**
- `ok` · Sistema de gestión y analítica para academia musical
- Esta propuesta incluye almacenamiento distribuido para partituras y grabaciones, un sistema de identidad y acceso para los profesores y una plataforma de analítica para medir la popularidad de cursos y materiales. Quedan sin resolver la publicación inicial de información general de cursos y la interfaz web para los alumnos.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacena las partituras y grabaciones: Permite guardar y recuperar los archivos multimedia necesarios para que los alumnos consulten sus clases de música mediante un sistema de almacenamiento distribuido bajo licencia Apache-2.0.
- **Keycloak** (`keycloak/keycloak`), Gestiona roles y permisos de profesores: Facilita la autenticación y el control de acceso para asegurar que cada profesor pueda actualizar únicamente los materiales de sus propios grupos, utilizando la licencia Apache-2.0.
- **PostHog** (`PostHog/posthog`), Analiza las consultas de cursos y materiales: Permite conocer cuáles son los cursos y materiales que reciben más consultas mediante sus herramientas de analítica y producto. Su licencia no está identificada por GitHub.
- Limitación: No se cubren las necesidades de publicación de información estática sobre horarios y profesores, ya que no se encontraron candidatos específicos para ese fin.
- Supuesto: Se asume que la academia cuenta con infraestructura propia para hospedar los servicios open source seleccionados.
- Supuesto: Se requiere el desarrollo de una interfaz web o aplicación para conectar el almacenamiento, la autenticación y la analítica con los usuarios finales.
- Rúbrica: español _ · rationale _ · coherencia _

### `alquiler-equipos`

> Tengo un negocio de alquiler de equipos audiovisuales y quiero controlar qué equipos tengo disponibles y cuáles están alquilados. Necesito conservar los contratos firmados y las fotografías del estado de cada equipo antes y después de cada alquiler. Quiero que el sistema genere automáticamente un informe de daños cuando las fotografías de devolución muestren diferencias importantes respecto a las iniciales. También necesito que cada empleado pueda consultar los alquileres que tiene asignados.

**gemini**
- `ok` · Sistema para control y gestión de equipos audiovisuales
- La propuesta integra herramientas de visualización, almacenamiento y aprendizaje automático para gestionar los contratos, el inventario y la generación automatizada de informes de daños a partir de fotografías. Quedan sin cubrir las funciones específicas de asignación y consulta de alquileres por empleado.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de contratos y fotografías: SeaweedFS es un sistema de almacenamiento distribuido eficiente para gestionar archivos y objetos con acceso rápido a disco, ideal para conservar los contratos firmados y las fotografías del estado de cada equipo.
- **Transformers** (`huggingface/transformers`), Análisis automatizado de imágenes para informes de daños: Transformers es un marco de definición de modelos de aprendizaje automático para visión y modelos multimodales, apto para procesar las fotografías iniciales y de devolución y detectar diferencias importantes.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Grafana es una plataforma de visualización y análisis de datos que permite crear tableros, pero no gestiona directamente bases de datos transaccionales para controlar inventarios ni alquileres.
- Limitación: La propuesta no incluye una solución específica para que cada empleado consulte los alquileres que tiene asignados.
- Supuesto: Se asume que el negocio cuenta con personal técnico para integrar los modelos de visión artificial con el sistema de almacenamiento.
- Supuesto: El negocio requiere una interfaz de usuario personalizada para que los empleados consulten sus alquileres asignados, ya que no hay una herramienta específica para ello.
- Rúbrica: español _ · rationale _ · coherencia _
