# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 15:45. 22 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 5.2 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 86% |
| Techo de la búsqueda (top 5) | 72% |
| Techo con 5 candidatos | 72% |
| Eligió un aceptable (donde había) | 90% |
| Se abstuvo (donde no había) | 36% |
| Acierto de punta a punta (comparable entre k) | 65% |
| Sin caja donde el caso no tiene herramientas | 27% |
| Recibe una herramienta aceptable, como lo ve el usuario | 61% |
| Se abstuvo, como lo ve el usuario | 12% |
| Eligió el primer candidato | 59% |
| Consistencia entre corridas | 14% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 2 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 35 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/66 |
| Tiempo total (mediana) | 3.9 s |
| Tiempo total (peor caso) | 5.8 s |
| Sobre 15 s | 0/66 |
| Entender · buscar · generar (mediana) | 1.4 s · 0.1 s · 2.2 s |
| Tokens entrada / salida (mediana) | 4428 / 635 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 22 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 90% | 90% | 90% | 90% – 90% |
| Se abstuvo (donde no había) | 38% | 47% | 21% | 21% – 47% |
| Acierto de punta a punta | 63% | 67% | 65% | 63% – 67% |
| Recibe una herramienta aceptable, como lo ve el usuario | 59% | 64% | 59% | 59% – 64% |
| Se abstuvo, como lo ve el usuario | 12% | 25% | 0% | 0% – 25% |
| Textos del modelo que hablan del catálogo | 10 | 13 | 12 | 10 – 13 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `fabrica-muebles-madera` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 2 |
| `fabrica-muebles-madera` · automation | (ninguno) | det 3/3 · eligió algo 3 |
| `fabrica-muebles-madera` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `centro-estetica` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `centro-estetica` · analytics | grafana, metabase | det 3/3 · techo 1 · eligió 0 |
| `centro-estetica` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `centro-estetica` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `productora-jugos-naturales` · database | postgres, server, supabase | det 2/3 · techo 0 · eligió 0 |
| `productora-jugos-naturales` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `productora-jugos-naturales` · analytics | grafana, metabase | det 3/3 · techo 1 · eligió 1 |
| `productora-jugos-naturales` · payments | hyperswitch | det 3/3 · techo 3 · eligió 1 |
| `consultorio-odontologico` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `consultorio-odontologico` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `consultorio-odontologico` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `consultorio-odontologico` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `consultorio-odontologico` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `taller-relojes-antiguos` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `escuela-pintura-oleo` · payments | killbill, lago | det 3/3 · techo 3 · eligió 2 |
| `escuela-pintura-oleo` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 3 |
| `servicio-limpieza-alfombras` · auth | keycloak, zitadel | det 1/3 · techo 1 · eligió 1 |
| `servicio-limpieza-alfombras` · communication | novu, apprise | det 3/3 · techo 3 · eligió 2 |
| `centro-entrenamiento-perros` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `centro-entrenamiento-perros` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `centro-entrenamiento-perros` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `servicio-instalacion-cerraduras` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `taller-orfebreria-plata` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `taller-orfebreria-plata` · automation | (ninguno) | det 3/3 · eligió algo 2 |
| `taller-orfebreria-plata` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `productora-quesos-frescos` · analytics | grafana | det 3/3 · techo 1 · eligió 0 |
| `productora-quesos-frescos` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `escuela-cocina-vegetariana` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 1 |
| `escuela-cocina-vegetariana` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-vinos-locales` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `fabrica-velas-aromaticas-naturales` · analytics | grafana | det 3/3 · techo 0 · eligió 0 |
| `fabrica-velas-aromaticas-naturales` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `servicio-pintura-casas-interiores` · automation | (ninguno) | det 2/3 · eligió algo 1 |
| `servicio-pintura-casas-interiores` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `taller-tapiceria-muebles` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `taller-tapiceria-muebles` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `servicio-jardineria-mantenimiento` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 0 |
| `servicio-jardineria-mantenimiento` · automation | (ninguno) | det 3/3 · eligió algo 2 |
| `servicio-jardineria-mantenimiento` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `taller-reparacion-electrodomesticos-pequenos` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `centro-pilates-grupal` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `centro-pilates-grupal` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `servicio-limpieza-oficinas-diaria` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `servicio-limpieza-oficinas-diaria` · communication | novu, apprise | det 3/3 · techo 3 · eligió 2 |
| `taller-pintura-automotriz-chica` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `taller-pintura-automotriz-chica` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `taller-pintura-automotriz-chica` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `escuela-circo-infantil` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `escuela-circo-infantil` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `fabrica-muebles-madera`

> Fabrico muebles de madera a medida. Cada pedido tiene que pasar por la aprobación del diseñador antes de empezar a cortar. Quiero organizar el taller para saber en qué etapa está cada mueble y que el cliente pueda ver el avance sin llamar. Además necesito que las fotos de los terminados se guarden de forma ordenada.

**gemini**
- `ok` · Sistema para organizar la fabricación y seguimiento de muebles a medida
- Esta propuesta organiza la fabricación de muebles de madera a medida mediante una plataforma de orquestación de flujos de trabajo, una base de datos analítica para el seguimiento de estados y un sistema de almacenamiento distribuido para las fotos de los muebles terminados.
- **Apache Airflow** (`apache/airflow`), Orquestación de flujos de aprobación: Permite programar y monitorear el flujo de trabajo para asegurar que cada pedido pase por la aprobación del diseñador antes de empezar a cortar.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos: Permite guardar las fotos de los terminados de forma ordenada utilizando un sistema de almacenamiento distribuido para miles de archivos.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. PostHog se enfoca en analítica, observación de inteligencia artificial y eventos de productos, pero no gestiona directamente el seguimiento de estados de producción en un taller de muebles.
- Limitación: La base de datos seleccionada es de tipo analítico y no resuelve de forma nativa la gestión operativa de etapas de producción del taller.
- Supuesto: Se asume que los clientes accederán a una interfaz web conectada al sistema para ver el avance de sus muebles sin llamar.
- Supuesto: Se asume que el diseñador y los carpinteros cuentan con acceso a la plataforma de automatización para registrar el progreso.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-estetica`

> Tengo un centro de estética con varias cosmetólogas. Quiero que cada una solo maneje su propia agenda y clientes, y poder controlar cuántos tratamientos se hacen por tipo. También necesito enviar mensajes de confirmación y que el sistema me diga cuándo hay huecos libres.

**gemini**
- `ok` · Sistema de gestión y métricas para centro de estética
- Esta propuesta incluye herramientas para el envío de mensajes de confirmación a los clientes y el monitoreo de métricas. Las necesidades de gestión de agenda por cosmetóloga y detección de huecos libres quedaron sin candidatos en esta selección.
- **Prometheus** (`prometheus/prometheus`), Monitoreo de métricas: Permite recolectar y almacenar métricas sobre la actividad del centro para controlar los tratamientos realizados. Cuenta con la licencia Apache-2.0 y actividad reciente.
- **Novu** (`novuhq/novu`), Envío de mensajes: Facilita la infraestructura de comunicación para enviar los mensajes de confirmación requeridos. La licencia de la herramienta es no identificada por GitHub.
- Limitación: No se cubrieron las necesidades de gestión de agendas independientes por cosmetóloga ni la detección automática de huecos libres.
- Supuesto: Se asume que el centro cuenta con personal técnico para configurar herramientas de monitoreo de métricas como Prometheus.
- Supuesto: El negocio requiere una interfaz adicional de agenda y gestión de citas que no fue cubierta por los candidatos actuales.
- Rúbrica: español _ · rationale _ · coherencia _

### `productora-jugos-naturales`

> Produzco jugos naturales y los vendo a tiendas y restaurantes. Necesito llevar el control de la producción diaria y de las entregas. Quiero que los pedidos de los clientes se organicen solos por zona y que pueda ver rápido cuánto vendí de cada sabor la semana pasada. Además me gustaría cobrar con transferencia y generar el comprobante.

**gemini**
- `ok` · Sistema de analítica de ventas para producción de jugos
- Se propone una solución centrada en la analítica para procesar métricas de ventas y ingresos. Quedan sin resolver de forma directa las necesidades de pagos con transferencia y la gestión de bases de datos.
- **PostHog** (`PostHog/posthog`), Analítica de ventas: Permite registrar eventos y analizar datos de ingresos y actividad para evaluar el rendimiento de los productos. La licencia no está identificada por GitHub.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de cobros: Funciona como una plataforma de pagos componible bajo licencia Apache-2.0 para gestionar la conectividad con proveedores de cobro.
- Limitación: Bases de datos: no se encontraron herramientas del catálogo para «Necesito llevar el control de la producción diaria y de las entregas».
- Limitación: No se encontró una herramienta específica para la generación directa de comprobantes de transferencia.
- Limitación: La necesidad de base de datos no tiene candidatos en el sistema actual.
- Supuesto: Se asume que los clientes se comunicarán mediante canales digitales para registrar las transacciones.
- Supuesto: Se requiere el control de la producción diaria de jugos y entregas a tiendas y restaurantes, aspectos no cubiertos por las herramientas seleccionadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `consultorio-odontologico`

> Tengo un consultorio odontológico con dos dentistas. Quiero que cada uno maneje solo sus pacientes y que pueda organizar el historial de tratamientos de cada persona. Necesito enviar recordatorios de citas y que los pacientes puedan pagar la consulta desde el celular. Me preocupa que todo cargue rápido para quienes están en otras ciudades.

**gemini**
- `ok` · Sistema de gestión y pagos para consultorio odontológico
- Esta propuesta organiza el consultorio odontológico permitiendo que cada dentista controle el acceso a sus pacientes, almacene historiales con rendimiento distribuido, envíe notificaciones de citas y procese pagos móviles. Quedan por integrar funciones específicas de agendas médicas y optimización geográfica avanzada.
- **Keycloak** (`keycloak/keycloak`), Control de acceso y separación de pacientes por dentista: Keycloak ofrece administración de identidad y acceso con licencia Apache-2.0 y actividad reciente, permitiendo configurar roles para que cada dentista acceda únicamente a los datos de sus pacientes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de historiales de tratamientos: SeaweedFS es un sistema de almacenamiento distribuido con licencia Apache-2.0 y actualización reciente, diseñado para manejar gran volumen de datos con acceso rápido a disco.
- **Apprise** (`caronc/apprise`), Envío de recordatorios de citas: Apprise facilita el envío de notificaciones y alertas con licencia BSD-2-Clause, conectándose a diversos servicios para notificar a los pacientes sobre sus consultas.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos móviles de consultas: Hyperswitch es una plataforma de pagos de alto rendimiento con licencia Apache-2.0 y actividad reciente, adecuada para integrar cobros en línea de manera segura.
- Limitación: No se incluyó una herramienta específica de calendario médico para la agenda de citas, por lo que esta funcionalidad deberá desarrollarse a medida.
- Limitación: No se contemplaron pasarelas de pago locales específicas para el país de operación en la selección de Hyperswitch.
- Supuesto: Se asume que el consultorio cuenta con servidores propios o infraestructura en la nube para alojar las herramientas autohospedadas.
- Supuesto: El requisito de carga rápida para usuarios en otras ciudades se resolverá mediante la infraestructura de red subyacente y la distribución de SeaweedFS.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-relojes-antiguos`

> Tengo un pequeño taller donde restauro relojes de pared y de bolsillo. Necesito organizar los turnos de mis dos técnicos para que no se crucen los trabajos urgentes. También quiero controlar la calidad de cada pieza antes de entregarla al cliente y que se les avise por mensaje cuando el reloj esté listo.

**gemini**
- `ok` · Sistema de comunicación para taller de restauración de relojes
- La propuesta implementa una plataforma de infraestructura de comunicación para gestionar los avisos a los clientes cuando sus relojes estén listos. Quedan sin resolver en esta selección las necesidades de organización de turnos y control de calidad por falta de candidatos específicos en el catálogo.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Resuelve el envío de avisos a los clientes cuando el reloj esté listo mediante su infraestructura abierta de comunicación. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- Limitación: La propuesta no incluye herramientas para organizar los turnos de los técnicos ni para controlar la calidad de las piezas.
- Limitación: No se dispone de candidatos para el manejo directo de calendarios o flujos de trabajo de taller.
- Supuesto: Se asume que el taller cuenta con un servidor propio o capacidad de alojamiento para desplegar la infraestructura de comunicación elegida.
- Supuesto: El taller necesita gestionar la agenda de dos técnicos para evitar cruces en trabajos urgentes y realizar un control de calidad previo a la entrega, necesidades que no cuentan con herramientas en los candidatos proporcionados.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-pintura-oleo`

> Dirijo una escuela de pintura al óleo para adultos. Quiero manejar el equipo de profesores y asignarles los grupos según su especialidad. Los alumnos deben poder pagar las mensualidades desde su casa y yo necesito ver cuántas personas se inscriben cada mes.

**gemini**
- `ok` · Sistema de gestión y pagos para escuela de pintura
- Esta propuesta implementa una plataforma de pagos y suscripciones para que los alumnos abonen sus mensualidades desde el hogar, junto con una herramienta de inteligencia de negocios para visualizar las inscripciones mensuales. El manejo de profesores y la asignación de grupos por especialidad quedan pendientes ya que no se encontraron candidatos para esas necesidades en el catálogo.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos: Permite gestionar las suscripciones y los pagos de las mensualidades que los alumnos realizarán desde sus casas mediante su plataforma de código abierto.
- **Metabase** (`metabase/metabase`), Herramienta de analítica: Facilita la visualización de datos mediante gráficos para que puedas ver cuántas personas se inscriben cada mes. Su licencia no fue identificada por GitHub.
- Limitación: Ninguna de las herramientas seleccionadas resuelve la administración del equipo de profesores ni la asignación de grupos según su especialidad.
- Supuesto: Se asume que la escuela cuenta con infraestructura propia para realizar el despliegue autohospedado de las herramientas seleccionadas.
- Supuesto: La gestión y asignación de profesores por especialidad requiere herramientas de planificación o recursos humanos que no fueron cubiertas en esta selección.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-limpieza-alfombras`

> Ofrezco limpieza de alfombras y cortinas a domicilio en la ciudad. Quiero llevar los pedidos hasta la casa del cliente con un recorrido ordenado. También necesito que cada empleado vea solo las órdenes de su zona y que el sistema avise cuando un trabajo se atrasa.

**gemini**
- `ok` · Sistema de gestión de pedidos y avisos para limpieza
- Esta propuesta implementa un sistema para gestionar notificaciones y alertas sobre el estado de los trabajos de limpieza a domicilio. Quedan sin cubrir las necesidades específicas de planificación de recorridos y control de zonas por empleado.
- **Prometheus Alertmanager** (`prometheus/alertmanager`), Sistema de alertas: Permite gestionar las notificaciones y alertas del negocio con soporte para envíos por correo y otros canales. Utiliza la licencia Apache-2.0 y cuenta con desarrollo activo.
- Limitación: La propuesta no incluye herramientas para organizar recorridos ni para filtrar órdenes por zonas de empleados.
- Supuesto: Se asume que el negocio cuenta con personal técnico para configurar el sistema de alertas.
- Supuesto: El usuario necesita funciones de ruteo y gestión de zonas que no fueron cubiertas por los candidatos disponibles.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-entrenamiento-perros`

> Tengo un centro donde adiestramos perros de compañía. Quiero llevar el control de las clases de cada animal y sus progresos. También necesito que los dueños paguen las sesiones mensuales y que solo el entrenador asignado vea la información de su grupo.

**gemini**
- `ok` · Sistema de gestión y pagos para centro de adiestramiento canino
- Esta propuesta integra herramientas para gestionar la base de datos de los animales, procesar los pagos mensuales de las sesiones y controlar el acceso de los usuarios según su rol de entrenador.
- **SQLAlchemy** (`sqlalchemy/sqlalchemy`), Kit de herramientas para la base de datos: Permite llevar el control de las clases de cada animal y sus progresos mediante la interacción con bases de datos en Python.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos y suscripciones: Facilita que los dueños paguen las sesiones mensuales mediante su plataforma de facturación por suscripción y pagos con licencia Apache-2.0.
- **Keycloak** (`keycloak/keycloak`), Gestor de identidad y accesos: Permite asegurar que solo el entrenador asignado vea la información de su grupo mediante la gestión moderna de identidad y accesos.
- Limitación: La propuesta no incluye una interfaz gráfica específica para el seguimiento de mascotas desarrollada a medida, la cual debe construirse sobre la base de datos.
- Supuesto: Se asume que el centro cuenta con infraestructura propia para alojar las aplicaciones autohospedadas.
- Supuesto: Los pagos mensuales se procesarán integrando pasarelas de pago externas compatibles con la plataforma de facturación.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-instalacion-cerraduras`

> Instalo y cambio cerraduras en casas y locales. Quiero organizar las visitas diarias de mis técnicos. Necesito controlar que cada instalación quede bien hecha antes de cobrar y que el cliente reciba un mensaje cuando el técnico está en camino.

**gemini**
- `ok` · Sistema de gestión de pagos y notificaciones para cerrajería
- Se propone una solución para administrar los cobros tras verificar las instalaciones y notificar al cliente cuando el técnico se encuentre en camino. No se cubren las necesidades de organización de visitas diarias ni de control de calidad previo.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos: Permite gestionar los pagos y la facturación de los servicios realizados por los técnicos. Cuenta con licencia Apache-2.0 y actividad reciente.
- **Apprise** (`caronc/apprise`), Servicio de notificaciones: Facilita el envío de notificaciones push para avisar al cliente cuando el técnico está en camino. Utiliza licencia BSD-2-Clause y se mantiene activo.
- Limitación: La propuesta no incluye ninguna herramienta para organizar las visitas diarias de los técnicos.
- Limitación: Tampoco resuelve el control específico para verificar que cada instalación quede bien hecha antes de cobrar.
- Supuesto: Se asume que el negocio cuenta con personal técnico que realiza visitas a domicilio para la instalación y cambio de cerraduras.
- Supuesto: El pedido requiere organizar visitas diarias y controlar que cada instalación quede bien hecha, pero estas necesidades no tienen candidatos asignados en el catálogo disponible.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-orfebreria-plata`

> Trabajo la plata y hago joyas a medida. Quiero controlar el inventario de metales preciosos que uso en cada pieza. También necesito que una solicitud de diseño pase por mi aprobación antes de empezar y que los clientes puedan pagar el anticipo en línea.

**gemini**
- `ok` · Sistema de gestión de inventario y pagos para joyería
- Esta propuesta organiza el control del inventario de metales preciosos para las joyas a medida y facilita los pagos de anticipos en línea de los clientes. Ciertas solicitudes específicas de flujos de trabajo de aprobación quedan fuera del alcance directo de las herramientas disponibles.
- **SQLAlchemy** (`sqlalchemy/sqlalchemy`), Gestionar la base de datos para el control de inventario de metales preciosos.: Permite interactuar con bases de datos relacionales en Python bajo licencia MIT, facilitando el registro y seguimiento del inventario de metales para cada pieza.
- **Hyperswitch** (`juspay/hyperswitch`), Procesar los pagos de anticipos en línea de los clientes.: Brinda una plataforma de pagos componible y de alto rendimiento bajo licencia Apache-2.0, conectando con múltiples proveedores para gestionar transacciones en línea.
- Limitación: Automatización: ninguna de las herramientas encontradas encaja. Ningún candidato maneja flujos de aprobación personalizados; Alertmanager solo gestiona alertas y notificaciones del sistema.
- Limitación: No se encontró una herramienta dedicada exclusivamente a la aprobación paso a paso de solicitudes de diseño antes de empezar la fabricación.
- Supuesto: Se asume que el negocio cuenta con personal técnico para integrar y desplegar las herramientas seleccionadas.
- Supuesto: No hay herramientas específicas para la aprobación manual de solicitudes de diseño en el catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `productora-quesos-frescos`

> Elaboro quesos frescos y madurados en pequeña escala. Quiero organizar la producción semanal según los pedidos. Necesito controlar la temperatura de las cámaras de maduración y que cada empleado de la planta vea solo las tareas de su área.

**gemini**
- `ok` · Sistema de autenticación y monitoreo para quesería
- Esta propuesta integra herramientas para la gestión de identidad y control de métricas. Se cubre la autenticación y control de acceso para los empleados de la planta, y el monitoreo de temperatura para las cámaras de maduración. Quedan sin resolver la organización de la producción semanal y la gestión específica de pedidos.
- **Keycloak** (`keycloak/keycloak`), Gestión de acceso: Resuelve la autenticación y el control de acceso para que cada empleado de la planta vea solo las tareas de su área. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- **Prometheus** (`prometheus/prometheus`), Monitoreo de temperatura: Permite recolectar métricas para controlar la temperatura de las cámaras de maduración mediante su sistema de monitoreo. Utiliza licencia Apache-2.0 y presenta actualizaciones recientes.
- Limitación: No se incluyen herramientas para organizar la producción semanal según los pedidos.
- Supuesto: Se asume que la planta cuenta con sensores de temperatura compatibles con sistemas de métricas y personal técnico para su integración.
- Supuesto: El pedido requiere organizar la producción semanal y gestionar pedidos, necesidades que no disponen de candidatos en este conjunto.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-cocina-vegetariana`

> Doy clases de cocina vegetariana a grupos pequeños. Quiero manejar los cupos de cada taller y las inscripciones. También necesito llevar el historial de recetas que cada alumno ha practicado y que solo el profesor del grupo vea las evaluaciones.

**gemini**
- `ok` · Sistema de inscripciones y gestión de clases de cocina vegetariana
- Esta propuesta integra una base de datos relacional para gestionar los cupos, inscripciones e historial de recetas de los alumnos, y un sistema centralizado de identidad y acceso para proteger las evaluaciones permitiendo que solo el profesor las vea.
- **PostgreSQL** (`postgres/postgres`), Almacenar cupos, inscripciones y el historial de recetas de los alumnos: Permite registrar de forma segura los datos de los talleres, las inscripciones y el historial de recetas practicadas. Su licencia no fue identificada por GitHub.
- **Keycloak** (`keycloak/keycloak`), Controlar el acceso y los roles para que solo el profesor vea las evaluaciones: Administra la autenticación y los roles de usuario bajo licencia Apache-2.0, garantizando que el acceso a las evaluaciones quede restringido únicamente al profesor del grupo.
- Limitación: La propuesta no incluye una interfaz visual directa para la gestión de clases, la cual deberá desarrollarse de manera complementaria.
- Supuesto: Se asume que el negocio cuenta con infraestructura propia para desplegar y mantener los contenedores de base de datos y autenticación.
- Supuesto: El profesor accede al sistema mediante un navegador web para consultar las evaluaciones.
- Rúbrica: español _ · rationale _ · coherencia _

### `distribuidora-vinos-locales`

> Distribuyo vinos de productores locales a restaurantes. Quiero organizar las entregas semanales por zona. Necesito controlar que cada caja salga completa y que el sistema avise cuando un restaurante pide más de lo habitual.

**gemini**
- `ok` · Sistema de notificaciones para distribución de vinos a restaurantes
- La propuesta implementa un sistema para enviar notificaciones automáticas cuando un restaurante realiza pedidos inusuales. Se han cubierto las necesidades de comunicación con una herramienta adecuada. Quedan fuera del alcance la organización de entregas semanales por zona y el control de cajas completas por falta de candidatos específicos.
- **Apprise** (`caronc/apprise`), Envío de alertas: Resuelve la necesidad de enviar alertas automáticas cuando un restaurante pide más de lo habitual mediante notificaciones que funcionan con múltiples plataformas. Su licencia es BSD-2-Clause y cuenta con mantenimiento reciente.
- Limitación: No se incluyen herramientas para organizar entregas semanales por zona ni para controlar que cada caja salga completa.
- Limitación: No se especificaron tecnologías concretas por el usuario.
- Supuesto: Se asume que los datos de los pedidos de los restaurantes se procesan en otra plataforma que activará las alertas.
- Supuesto: El negocio requiere organizar rutas de entrega y control de inventario que no tienen herramientas asignadas en este sistema.
- Rúbrica: español _ · rationale _ · coherencia _

### `fabrica-velas-aromaticas-naturales`

> Fabrico velas aromáticas con esencias naturales. Quiero organizar los lotes de producción según los aromas más pedidos. Necesito controlar la temperatura de derretido de la cera y que las imágenes del catálogo carguen rápido para compradores de otros países.

**gemini**
- `ok` · Sistema de gestión de producción y catálogo para velas aromáticas
- Se propone una solución integral utilizando plataformas de análisis para organizar lotes según la demanda y un sistema de almacenamiento distribuido para servir las imágenes del catálogo rápidamente a nivel internacional. Queda pendiente el hardware y software específico de control de temperatura de derretido de cera, ya que las herramientas de observabilidad disponibles se enfocan en métricas de software y no en sensores físicos industriales.
- **PostHog** (`PostHog/posthog`), Analítica de productos: Permite realizar analítica y seguimiento de eventos para identificar los aromas más pedidos por los clientes, ayudando a organizar los lotes de producción. Su licencia no fue identificada por GitHub. Se mantiene actualizado con cambios recientes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de imágenes: Ofrece un sistema de almacenamiento distribuido diseñado para manejar miles de archivos con acceso rápido a disco, lo que permite almacenar y distribuir las imágenes del catálogo para que carguen con velocidad a compradores de otros países. Cuenta con licencia Apache-2.0 y actividad reciente.
- Limitación: Observabilidad: ninguna de las herramientas encontradas encaja. Ninguno de los candidatos resuelve directamente el control físico de la temperatura de derretido de la cera, ya que están orientados a infraestructura y métricas de sistemas, no a sensores industriales de temperatura.
- Limitación: La propuesta no incluye un software especializado en automatización industrial o lectura directa de sensores de temperatura para calderas o cera.
- Limitación: Se requiere infraestructura de red adicional (como una red de entrega de contenidos o CDN) trabajando junto al almacenamiento para garantizar la velocidad de carga internacional de las imágenes.
- Supuesto: Se asume que la tienda de velas cuenta con una plataforma web o aplicación digital donde los usuarios realizan pedidos y visualizan el catálogo de imágenes.
- Supuesto: Se asume la necesidad de integrar un sensor físico de temperatura compatible con soluciones de IoT que se conecte externamente al sistema.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-pintura-casas-interiores`

> Pinto casas e interiores por encargo. Quiero manejar el equipo de pintores y asignarles las obras. También necesito que una solicitud de cambio de color pase por mi aprobación y que se cobre el anticipo antes de empezar.

**gemini**
- `ok` · Sistema de gestión de obras para servicio de pintura
- Esta propuesta organiza el negocio de pintura de casas permitiendo automatizar los flujos de trabajo de aprobación y procesar los pagos de anticipos en línea de forma segura. El sistema coordina la asignación de obras al equipo de pintores mediante flujos programados y gestiona el cobro previo requerido para iniciar los proyectos.
- **Apache Airflow** (`apache/airflow`), Gestionar la aprobación de solicitudes de cambio de color y flujos de trabajo.: Apache Airflow permite programar y monitorear flujos de trabajo de manera programática, facilitando la validación de procesos como las solicitudes de cambio de color. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- **Hyperswitch** (`juspay/hyperswitch`), Procesar el cobro del anticipo antes de empezar cada obra.: Hyperswitch es una plataforma de pagos abierta y componible que permite conectar múltiples proveedores para cobrar de forma eficiente. Opera con licencia Apache-2.0 y se mantiene actualizada.
- Limitación: La propuesta no incluye una herramienta específica para la gestión directa del equipo de pintores ni para la asignación visual de calendarios de obras.
- Supuesto: Se asume que el negocio cuenta con personal técnico para desplegar y configurar plataformas basadas en Python y Rust.
- Supuesto: Se requiere una interfaz de usuario adicional o personalizada para que los clientes interactúen directamente con las solicitudes de cambio de color y pagos.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-tapiceria-muebles`

> Me dedico a retapizar sillones y sillas. Quiero llevar el registro de las telas usadas en cada trabajo y los costos. También necesito organizar los turnos de los tapiceros y que el cliente reciba un aviso cuando su mueble esté listo.

**gemini**
- `ok` · Sistema de registro y avisos para taller de tapicería
- Esta propuesta organiza el negocio de retapizado de sillones y sillas utilizando un sistema de almacenamiento clave-valor para los datos operativos y una plataforma de notificaciones para los avisos a clientes. Quedan fuera de la selección los módulos específicos para la gestión de turnos de los tapiceros, ya que no se encontraron candidatos directos para esa necesidad.
- **etcd** (`etcd-io/etcd`), Almacenamiento de datos: Permite conservar de forma fiable el registro de las telas usadas en cada trabajo y los costos asociados. Utiliza licencia Apache-2.0 y cuenta con actividad reciente.
- **Apprise** (`caronc/apprise`), Gestor de notificaciones: Facilita que el cliente reciba un aviso cuando su mueble esté listo mediante notificaciones push. Cuenta con licencia BSD-2-Clause y mantenimiento activo.
- Limitación: No se cubren las necesidades de organización de turnos de los tapiceros por falta de candidatos específicos en el catálogo.
- Limitación: La herramienta de base de datos elegida es un almacén clave-valor y no un sistema relacional tradicional de tablas.
- Supuesto: El negocio cuenta con infraestructura propia para hospedar los servicios seleccionados.
- Supuesto: Se requiere organizar los turnos de los tapiceros.
- Supuesto: Se requiere un canal específico para integrar las notificaciones con los datos de los trabajos.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-jardineria-mantenimiento`

> Ofrezco mantenimiento de jardines en residenciales. Quiero llevar los pedidos de poda y riego de cada cliente. También necesito que una solicitud de trabajo extra pase por aprobación del supervisor y que se cobre al final del mes.

**gemini**
- `ok` · Sistema de gestión y cobros para mantenimiento de jardines
- Esta propuesta organiza el negocio de mantenimiento de jardines registrando los pedidos de los clientes, gestionando la orquestación de tareas y automatizando la facturación periódica al finalizar el mes.
- **SQLAlchemy** (`sqlalchemy/sqlalchemy`), Gestión de la base de datos de clientes y pedidos: Permite interactuar con bases de datos SQL para llevar los pedidos de poda y riego de cada cliente de forma robusta.
- **Apache Airflow** (`apache/airflow`), Orquestación del flujo de aprobación de trabajos extra: Permite definir flujos de trabajo programáticos para que una solicitud de trabajo extra pase por la aprobación del supervisor.
- **Kill Bill** (`killbill/killbill`), Procesamiento de pagos y facturación al final del mes: Resuelve la necesidad de realizar cobros periódicos y gestionar las suscripciones para que se cobre al final del mes.
- Limitación: No se incluye una interfaz de usuario visual dedicada para que los clientes finales soliciten los servicios de poda y riego directamente.
- Supuesto: Se asume que los pagos se realizarán mediante pasarelas integrables con la plataforma de cobros.
- Supuesto: El supervisor utilizará la interfaz provista por el sistema de automatización para revisar y aprobar las solicitudes.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-reparacion-electrodomesticos-pequenos`

> Reparo licuadoras, planchas y otros electrodomésticos pequeños. Quiero organizar los turnos de recepción y entrega. Necesito controlar que cada aparato salga funcionando y que el cliente reciba un mensaje cuando esté listo para recoger.

**gemini**
- `ok` · Sistema de notificaciones para taller de reparación de electrodomésticos
- La propuesta implementa una plataforma de notificaciones para enviar avisos a los clientes cuando sus aparatos estén listos para recoger. Las necesidades de control de calidad y organización de turnos no cuentan con herramientas candidatas en este sistema.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Permite gestionar el envío de mensajes a clientes cuando los electrodomésticos estén listos para recoger. Su licencia no fue identificada por GitHub y cuenta con actualización reciente.
- Limitación: No se resolvieron las necesidades de organizar los turnos de recepción y entrega, ni de controlar que cada aparato salga funcionando, ya que no se encontraron candidatos específicos para esas funciones.
- Supuesto: Se asume que el taller cuenta con acceso a internet para integrar las notificaciones con los canales de mensajería.
- Supuesto: El usuario necesitará herramientas adicionales para la gestión de turnos de recepción y control de reparaciones.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-pilates-grupal`

> Tengo un centro de pilates en grupos reducidos. Quiero manejar los horarios de las clases y los instructores. También necesito controlar la asistencia de cada alumno y que solo el instructor del grupo vea las notas de progreso.

**gemini**
- `ok` · Sistema de gestión y control de asistencia para centro de pilates
- Esta propuesta incluye herramientas para el almacenamiento de métricas operativas y la gestión de acceso e identidades. Quedan sin resolver aspectos específicos de la interfaz de usuario para las notas de progreso y la programación visual de horarios.
- **Keycloak** (`keycloak/keycloak`), Control de acceso: Keycloak ofrece administración de identidad y acceso con licencia Apache-2.0 y mantenimiento activo. Permite gestionar roles y permisos para asegurar que solo los instructores autorizados accedan a la información correspondiente.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Prometheus maneja series temporales y monitoreo, pero no ofrece una base de datos relacional para gestionar horarios, instructores y asistencia de alumnos de forma directa.
- Limitación: No se incluyen herramientas específicas para la visualización de calendarios de clases en grupo.
- Limitación: La gestión de notas de progreso de los alumnos requiere desarrollo adicional sobre la autenticación provista.
- Supuesto: Se asume que el centro de pilates cuenta con infraestructura propia para hospedar las aplicaciones.
- Supuesto: Se requiere una interfaz web adicional para que los instructores interactúen con el sistema.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-limpieza-oficinas-diaria`

> Brindo limpieza diaria de oficinas. Quiero organizar las rutas de los equipos de aseo. Necesito que cada supervisor vea solo los edificios de su zona y que el sistema avise si un equipo no marca la entrada a tiempo.

**gemini**
- `ok` · Sistema de gestión y avisos para equipos de limpieza
- Esta propuesta organiza el acceso de supervisores a los edificios y gestiona las alertas de entrada de los equipos de aseo mediante herramientas de identidad y notificaciones. Queda pendiente la funcionalidad específica para la organización y optimización de rutas.
- **Zitadel** (`zitadel/zitadel`), Control de accesos y permisos por zonas para supervisores: Resuelve el control de accesos mediante infraestructura de identidad para garantizar que cada supervisor vea solo los edificios de su zona. Utiliza una licencia AGPL-3.0 y se mantiene activa con actualizaciones recientes.
- **Apprise** (`caronc/apprise`), Envío de alertas si un equipo no marca la entrada a tiempo: Permite enviar notificaciones push a través de un marco de trabajo compatible con diversos servicios de mensajería para avisar sobre demoras en las entradas. Cuenta con licencia BSD-2-Clause y actividad reciente.
- Limitación: La propuesta no incluye un módulo específico para organizar las rutas de los equipos de aseo.
- Limitación: No se cubren las interfaces móviles o de fichaje de entrada para los operarios de limpieza.
- Supuesto: Se asume que el negocio cuenta con personal técnico para desplegar y configurar las herramientas open source seleccionadas.
- Supuesto: El usuario necesita organizar las rutas de los equipos de aseo, una funcionalidad que no cuenta con candidatos en este catálogo y requerirá desarrollo adicional o software especializado.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-pintura-automotriz-chica`

> Pinto y repinto vehículos en un taller pequeño. Quiero controlar el inventario de pinturas y diluyentes que uso. También necesito que una cotización pase por mi aprobación antes de empezar el trabajo y que el cliente pague el anticipo en línea.

**gemini**
- `ok` · Sistema de gestión de inventario y pagos para taller
- Esta propuesta organiza el control del inventario de pinturas mediante una API de uso y facturación, y resuelve los cobros de anticipos en línea con una plataforma de pagos. Quedan sin automatizar la aprobación de cotizaciones y la gestión específica de diluyentes.
- **juspay/hyperswitch** (`juspay/hyperswitch`), Plataforma de pagos: Permite procesar pagos en línea mediante su plataforma de pagos abierta y compatible con múltiples proveedores, conectándose a los sistemas de pago necesarios para cobrar el anticipo que solicita el cliente.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. La herramienta ofrece seguimiento de consumo, gestión de suscripciones y analíticas, pero está orientada a facturación basada en uso y no a un inventario físico de taller para pinturas.
- Limitación: No se encontró ninguna herramienta específica para gestionar la aprobación de cotizaciones del taller.
- Supuesto: Se asume que el taller cuenta con un sitio web o aplicación web donde integrar la plataforma de pagos.
- Supuesto: El usuario necesitará un sistema adicional para gestionar las cotizaciones y su aprobación antes de procesar el pago.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-circo-infantil`

> Enseño malabares y acrobacia básica a niños. Quiero manejar los grupos por edad y nivel. También necesito controlar la asistencia a cada clase y que los padres puedan pagar la mensualidad desde su casa.

**gemini**
- `ok` · Sistema de gestión para escuela de malabares y acrobacia
- La propuesta establece la infraestructura de pagos y gestión de membresías en línea para los padres. Quedan sin resolver directamente la gestión de grupos por edad y nivel y el control de asistencia.
- **Kill Bill** (`killbill/killbill`), Plataforma de cobro de mensualidades: Permite gestionar la facturación por suscripción y los pagos recurrentes para que los padres puedan realizar los pagos de las mensualidades. Cuenta con licencia Apache-2.0 y actividad reciente.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. No existe un candidato que resuelva el control de asistencia a clases y la organización de grupos por edad y nivel. Se seleccionó una herramienta relacionada con gestión de miembros pero que no cubre el registro de asistencia.
- Limitación: No se encontró ninguna herramienta en los candidatos que resuelva específicamente el registro de asistencia a cada clase ni la administración de grupos por edad y nivel.
- Supuesto: Se asume que la escuela cuenta con servidores propios o capacidad de alojamiento para desplegar las herramientas de código abierto.
- Supuesto: El manejo de grupos por edad y nivel así como el control de asistencia requerirán desarrollos adicionales o herramientas no encontradas en el catálogo.
- Rúbrica: español _ · rationale _ · coherencia _
