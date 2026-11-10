# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 00:31. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.8 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 70% |
| Techo de la búsqueda (top 5) | 87% |
| Techo con 5 candidatos | 87% |
| Eligió un aceptable (donde había) | 96% |
| Se abstuvo (donde no había) | 36% |
| Acierto de punta a punta (comparable entre k) | 84% |
| Sin caja donde el caso no tiene herramientas | 0% |
| Eligió el primer candidato | 68% |
| Consistencia entre corridas | 12% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 2 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 4 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.4 s |
| Tiempo total (peor caso) | 5.3 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.2 s · 2.6 s |
| Tokens entrada / salida (mediana) | 4456 / 799 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 89% | 100% | 100% | 89% – 100% |
| Se abstuvo (donde no había) | 20% | 50% | 40% | 20% – 50% |
| Acierto de punta a punta | 77% | 89% | 85% | 77% – 89% |
| Textos del modelo que hablan del catálogo | 0 | 2 | 2 | 0 – 2 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `clinica-veterinaria` · database | postgres, server, supabase | det 2/3 · techo 0 · eligió 0 |
| `clinica-veterinaria` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `clinica-veterinaria` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `escuela-idiomas` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `escuela-idiomas` · ai | (ninguno) | det 3/3 · eligió algo 3 |
| `escuela-idiomas` · analytics | posthog, umami, metabase | det 3/3 · techo 1 · eligió 1 |
| `tienda-repuestos` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `tienda-repuestos` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 2 |
| `tienda-repuestos` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tienda-repuestos` · cache | valkey, redis | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `agencia-turismo` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `agencia-turismo` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `coworking` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `coworking` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `coworking` · analytics | metabase, grafana | det 3/3 · techo 0 · eligió 0 |
| `coworking` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `taller-restauracion` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `taller-restauracion` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `taller-restauracion` · auth | keycloak, zitadel | det 1/3 · techo 1 · eligió 1 |
| `taller-restauracion` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · cms | strapi, payload, Ghost | det 0/3 · techo 0 · eligió 0 |
| `academia-musica` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `academia-musica` · analytics | analytics, umami, posthog | det 3/3 · techo 3 · eligió 2 |
| `alquiler-equipos` · database | postgres, server, supabase | det 1/3 · techo 0 · eligió 0 |
| `alquiler-equipos` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `alquiler-equipos` · ai | (ninguno) | det 3/3 · eligió algo 3 |
| `alquiler-equipos` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `clinica-veterinaria`

> Tengo una clínica veterinaria y quiero llevar un historial de las mascotas y sus dueños. Necesito que cada empleado pueda consultar únicamente la información que le corresponde según su cargo. Quiero que los dueños puedan encontrar rápidamente los registros de vacunación y tratamientos anteriores de sus mascotas. También necesito enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación.

**gemini**
- `ok` · Sistema Integral de Gestión Veterinaria
- Esta propuesta organiza el sistema de la veterinaria cubriendo el almacenamiento de historiales, el control de acceso por roles para los empleados, la búsqueda rápida de registros médicos para los dueños y el envío de notificaciones para los recordatorios de vacunación.
- **ClickHouse** (`ClickHouse/ClickHouse`), Almacén de historiales: Permite gestionar el almacenamiento y la consulta del historial de las mascotas y sus dueños de manera eficiente con licencia Apache-2.0.
- **Keycloak** (`keycloak/keycloak`), Control de accesos: Resuelve la necesidad de que cada empleado pueda consultar únicamente la información que le corresponde según su cargo mediante una infraestructura de identidad robusta.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda rápida: Facilita que los dueños puedan encontrar rápidamente los registros de vacunación y tratamientos anteriores de sus mascotas. Su licencia no fue identificada por GitHub.
- **Apprise** (`caronc/apprise`), Envío de recordatorios: Permite enviar un recordatorio a los dueños cuando se acerque una fecha de vacunación utilizando una interfaz de notificaciones flexible.
- Limitación: La propuesta no incluye una pasarela de pagos para cobros veterinarios.
- Supuesto: Se asume que la clínica cuenta con una interfaz web o móvil propia donde se integrarán estas herramientas.
- Supuesto: Se asume que el envío de recordatorios se conectará con algún servicio externo de mensajería soportado por la herramienta de notificaciones.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-idiomas`

> Dirijo una pequeña escuela de idiomas y quiero organizar las inscripciones y los datos de mis estudiantes. Necesito que cada profesor pueda acceder a sus grupos sin consultar información de otros cursos. Quiero que los estudiantes puedan hacer pruebas de nivel y recibir una recomendación automática del curso más adecuado. También quiero medir cuántos estudiantes pasan de una prueba inicial a una inscripción.

**gemini**
- `ok` · Sistema de gestión y recomendación para escuela de idiomas
- Esta propuesta integra herramientas para controlar el acceso por roles de los profesores, automatizar las recomendaciones de cursos mediante aprendizaje automático y medir la conversión de las pruebas iniciales a inscripciones.
- **Keycloak** (`keycloak/keycloak`), Control de acceso: Resuelve la necesidad de autenticación y permite configurar roles para que cada profesor acceda unicamente a sus grupos de estudiantes. Utiliza licencia Apache-2.0 y cuenta con alta actividad reciente.
- **Transformers** (`huggingface/transformers`), Recomendación automática: Permite procesar las pruebas de nivel para generar una recomendación automática del curso más adecuado utilizando modelos de aprendizaje. Posee licencia Apache-2.0 y gran respaldo de la comunidad.
- **Umami** (`umami-software/umami`), Medición de conversión: Mide cuántos estudiantes pasan de una prueba inicial a una inscripción mediante el seguimiento de conversiones. Cuenta con licencia MIT y enfoque en la privacidad.
- Limitación: No se incluyeron herramientas específicas para la administración completa de bases de datos relacionales de estudiantes, lo cual requerirá un desarrollo complementario.
- Supuesto: La escuela dispone de infraestructura propia para alojar las herramientas autohospedadas.
- Supuesto: Los estudiantes completan las pruebas de nivel a través de una interfaz web integrada con el sistema de análisis.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-repuestos`

> Tengo una tienda de repuestos para motocicletas y quiero controlar las existencias de cada referencia. Necesito encontrar productos por su descripción, compatibilidad y características, incluso cuando no conozco el nombre exacto. Quiero que las ventas por internet se cobren antes de preparar cada pedido. También necesito que los productos más consultados se muestren rápidamente aunque haya muchos clientes conectados.

**gemini**
- `ok` · Arquitectura de software para tienda de repuestos
- Esta propuesta incluye herramientas open source para implementar un motor de búsqueda avanzada de productos, un sistema de cobros en línea para ventas por internet y una solución de caché para alto tráfico de consultas. El control de existencias de las referencias se asumirá en la lógica principal de la tienda.
- **Qdrant** (`qdrant/qdrant`), Búsqueda vectorial de productos por descripción y compatibilidad: Qdrant es un motor de búsqueda vectorial de alto rendimiento y escala masiva ideal para encontrar repuestos de motocicletas por descripción, compatibilidad y características, utilizando licencia Apache-2.0 y actividad reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de cobros en línea antes de preparar pedidos: Hyperswitch es una plataforma de pagos abierta, componible y de alto rendimiento que permite cobrar las ventas por internet antes de preparar cada pedido, operando con licencia Apache-2.0 y con actualizaciones recientes.
- **Valkey** (`valkey-io/valkey`), Caché de alta velocidad para productos más consultados: Valkey es una base de datos clave-valor distribuida optimizada para caché y cargas de trabajo en tiempo real, lo que permite mostrar rápidamente los productos más consultados ante alto tráfico de clientes utilizando licencia BSD-3-Clause.
- Limitación: La licencia de Qdrant no presenta limitaciones críticas al ser Apache-2.0, pero requiere gestión adecuada de vectores para descripciones complejas de repuestos.
- Limitación: No se incluyen herramientas específicas para el inventario físico o gestión de almacén dentro de los candidatos evaluados.
- Supuesto: Se asume que la tienda de repuestos cuenta con una aplicación web principal encargada de la lógica de control de existencias de cada referencia.
- Supuesto: El negocio requiere una infraestructura capaz de escalar ante picos de demanda de consultas y transacciones de pago.
- Rúbrica: español _ · rationale _ · coherencia _

### `agencia-turismo`

> Gestiono una agencia de turismo y quiero ofrecer excursiones con diferentes fechas y cupos disponibles. Necesito guardar fotografías, documentos y autorizaciones de cada reserva. Quiero que los clientes puedan pagar por adelantado desde cualquier lugar. Cuando se confirme una reserva, quiero que el cliente reciba un mensaje con los detalles del viaje y los documentos necesarios.

**gemini**
- `ok` · Plataforma de gestion para agencia de turismo
- Propuesta de infraestructura open source para agencia de turismo que permite el almacenamiento seguro de archivos, procesamiento de pagos adelantados y envio automatizado de notificaciones a los clientes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotografias, documentos y autorizaciones: Permite guardar fotografias, documentos y autorizaciones de cada reserva de manera eficiente gracias a su diseno para almacenamiento distribuido con licencia Apache-2.0 y mantenimiento activo.
- **Hyperswitch** (`juspay/hyperswitch`), Plataforma de pagos en linea: Facilita que los clientes puedan pagar por adelantado desde cualquier lugar mediante una plataforma de pagos compatible con PCI y licencia Apache-2.0.
- **Novu** (`novuhq/novu`), Infraestructura de comunicacion y notificaciones: Permite que el cliente reciba un mensaje con los detalles del viaje y los documentos necesarios. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- Limitación: No se incluye un modulo especifico para la gestion de cupos y fechas de excursiones.
- Supuesto: Se asume que la agencia cuenta con un backend propio para coordinar la logistica de fechas, cupos y reservas.
- Supuesto: Se asume conectividad a internet para procesar los pagos y enviar las notificaciones en tiempo real.
- Rúbrica: español _ · rationale _ · coherencia _

### `coworking`

> Administro un espacio de coworking y quiero controlar las reservas de salas y puestos de trabajo. Necesito que los miembros puedan reservar únicamente los espacios incluidos en su plan. Quiero identificar qué salas tienen mayor demanda y en qué horarios se quedan vacías. También quiero que las reservas se confirmen automáticamente y que los miembros reciban un aviso cuando se acerque su horario reservado.

**gemini**
- `ok` · Sistema de gestión y analítica para coworking
- Esta propuesta cubre la analítica de uso de las salas del coworking y el envío de avisos automatizados para las reservas de los miembros. Faltan herramientas específicas en los candidatos para gestionar directamente el motor de reservas de los puestos y salas según los planes de membresía.
- **Apprise** (`caronc/apprise`), Envío de avisos: Apprise permite enviar notificaciones push que funcionan con casi cualquier plataforma para que los miembros reciban un aviso cuando se acerque su horario reservado.
- Limitación: Analítica: ninguna de las herramientas encontradas encaja. Prometheus es un sistema de monitorización y base de datos de series temporales que permite registrar métricas de uso, aunque no analiza directamente la demanda de salas ni horarios vacíos del coworking.
- Limitación: No se encontró ninguna herramienta en los candidatos para gestionar el motor de reservas ni para validar los espacios incluidos en el plan de cada miembro.
- Supuesto: Se asume que el sistema del coworking cuenta con una base de datos propia para el control de reservas que se integrará con las herramientas seleccionadas.
- Supuesto: Se necesita un módulo de control de reservas y planes de membresía que no fue cubierto por los candidatos disponibles.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-restauracion`

> Tengo un taller dedicado a restaurar muebles antiguos y quiero documentar cada pieza desde que llega hasta que se entrega. Necesito conservar fotografías del estado original, informes de restauración y documentos sobre la procedencia de cada mueble. Quiero que mis trabajadores puedan consultar los expedientes según el proyecto que tengan asignado. También necesito encontrar piezas por su época, material o procedencia.

**gemini**
- `ok` · Arquitectura de Software para Taller de Restauracion de Muebles
- La solucion propuesta cubre el almacenamiento de documentos y fotografias, la autenticacion y control de acceso por proyectos para los trabajadores, y un motor de busqueda avanzada para localizar piezas por sus atributos.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacena fotografias, informes y documentos de procedencia de cada mueble.: SeaweedFS es un sistema de almacenamiento distribuido disenado para manejar miles de millones de archivos con acceso rapido, utilizando licencia Apache-2.0.
- **Keycloak** (`keycloak/keycloak`), Gestiona la autenticacion y el acceso de los trabajadores segun sus proyectos asignados.: Keycloak provee infraestructura de gestion de identidad y acceso bajo licencia Apache-2.0, con actualizacion reciente.
- **Meilisearch** (`meilisearch/meilisearch`), Permite encontrar piezas por epoca, material o procedencia.: Meilisearch es un motor de busqueda con soporte para facetas, ideal para localizar registros rapidamente. Su licencia no esta identificada por GitHub.
- Limitación: No se incluye una interfaz grafica lista para usar para la gestion de expedientes del taller.
- Supuesto: Se presupone la existencia de una aplicacion web o movil propia que integre estos servicios.
- Supuesto: Los trabajadores disponen de conexion a la red local o internet para realizar las consultas.
- Rúbrica: español _ · rationale _ · coherencia _

### `academia-musica`

> Tengo una academia de música y quiero publicar información sobre los cursos, profesores y horarios disponibles. Necesito que los alumnos puedan consultar las partituras y grabaciones correspondientes a sus clases. Quiero que cada profesor pueda actualizar únicamente los materiales de sus propios grupos. También quiero saber cuáles son los cursos y materiales que reciben más consultas.

**gemini**
- `ok` · Sistema de gestión y analítica para academia de música
- Esta propuesta implementa un sistema para la academia de música que permite almacenar partituras y grabaciones de forma distribuida, gestionar el acceso y roles de los profesores para la actualización de materiales, y analizar las consultas de cursos y recursos mediante una base de datos analítica.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de partituras y grabaciones: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos de forma eficiente con acceso rápido. Su licencia es Apache-2.0 y cuenta con actividad reciente.
- **Keycloak** (`keycloak/keycloak`), Autenticación y control de acceso: Keycloak gestiona identidades y accesos, permitiendo configurar roles para que cada profesor pueda actualizar únicamente los materiales de sus propios grupos. Posee licencia Apache-2.0 y mantenimiento activo.
- **ClickHouse** (`ClickHouse/ClickHouse`), Analítica de consultas: ClickHouse es un sistema de base de datos para análisis en tiempo real que permite saber cuáles son los cursos y materiales que reciben más consultas. Cuenta con licencia Apache-2.0 y actualizaciones recientes.
- Limitación: No se incluyen herramientas específicas para la publicación de información estática sobre horarios y cursos, por lo que requerirá desarrollo adicional.
- Supuesto: Se asume que la academia cuenta con una aplicación web o interfaz propia para integrar la autenticación, el almacenamiento y la analítica.
- Rúbrica: español _ · rationale _ · coherencia _

### `alquiler-equipos`

> Tengo un negocio de alquiler de equipos audiovisuales y quiero controlar qué equipos tengo disponibles y cuáles están alquilados. Necesito conservar los contratos firmados y las fotografías del estado de cada equipo antes y después de cada alquiler. Quiero que el sistema genere automáticamente un informe de daños cuando las fotografías de devolución muestren diferencias importantes respecto a las iniciales. También necesito que cada empleado pueda consultar los alquileres que tiene asignados.

**gemini**
- `ok` · Sistema de Gestion y Alquiler Audiovisual
- La propuesta cubre el control de inventario con una base de datos clave-valor y el almacenamiento de contratos y fotografias mediante un sistema distribuido. Para el analisis visual de las diferencias y generacion de informes de danos se utiliza un framework de modelos de aprendizaje automatico.
- **Valkey** (`valkey-io/valkey`), Base de datos para el inventario: Permite controlar que equipos estan disponibles y cuales alquilados mediante una base de datos flexible bajo licencia BSD-3-Clause y con actualizacion reciente.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos y contratos: Conserva de forma segura los documentos y las fotografias del estado de cada equipo antes y despues de cada alquiler usando almacenamiento de objetos con licencia Apache-2.0.
- **Transformers** (`huggingface/transformers`), Analisis visual para informes de danos: Proporciona las herramientas necesarias para procesar las fotografias de devolucion frente a las iniciales, permitiendo detectar diferencias importantes y generar el informe automaticamente bajo licencia Apache-2.0.
- Limitación: No se incluye un modulo especifico de autenticacion y gestion de permisos para que cada empleado consulte unicamente sus alquileres asignados.
- Supuesto: Se asume que los empleados accederan a traves de una interfaz web o aplicacion desarrollada a medida que conectara con estos servicios.
- Supuesto: Se asume que el sistema de IA se integrara mediante codigo personalizado para generar los textos de los informes de danos.
- Rúbrica: español _ · rationale _ · coherencia _
