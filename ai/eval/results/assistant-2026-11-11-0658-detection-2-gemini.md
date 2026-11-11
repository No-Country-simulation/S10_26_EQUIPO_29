# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 06:58. 22 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 6.5 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 97% |
| Respuesta válida | 98% |
| Necesidades detectadas | 81% |
| Techo de la búsqueda (top 5) | 77% |
| Techo con 5 candidatos | 77% |
| Eligió un aceptable (donde había) | 94% |
| Se abstuvo (donde no había) | 35% |
| Acierto de punta a punta (comparable entre k) | 72% |
| Sin caja donde el caso no tiene herramientas | 20% |
| Recibe una herramienta aceptable, como lo ve el usuario | 64% |
| Se abstuvo, como lo ve el usuario | 8% |
| Eligió el primer candidato | 55% |
| Consistencia entre corridas | 14% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 98% |
| Limitaciones repetidas · borrador del modelo | 0 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 28 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/66 |
| Tiempo total (mediana) | 4.1 s |
| Tiempo total (peor caso) | 11.1 s |
| Sobre 15 s | 0/66 |
| Entender · buscar · generar (mediana) | 1.7 s · 0.2 s · 2.3 s |
| Tokens entrada / salida (mediana) | 4354 / 582 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 22 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 91% | 91% – 100% |
| Eligió un aceptable (donde había) | 93% | 97% | 93% | 93% – 97% |
| Se abstuvo (donde no había) | 50% | 33% | 25% | 25% – 50% |
| Acierto de punta a punta | 76% | 70% | 72% | 70% – 76% |
| Recibe una herramienta aceptable, como lo ve el usuario | 64% | 64% | 64% | 64% – 64% |
| Se abstuvo, como lo ve el usuario | 12% | 12% | 0% | 0% – 12% |
| Textos del modelo que hablan del catálogo | 10 | 11 | 7 | 7 – 11 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `fabrica-muebles-madera` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `fabrica-muebles-madera` · automation | (ninguno) | det 2/3 · eligió algo 2 |
| `fabrica-muebles-madera` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `centro-estetica` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `centro-estetica` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 2 |
| `centro-estetica` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `centro-estetica` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `productora-jugos-naturales` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `productora-jugos-naturales` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `productora-jugos-naturales` · analytics | grafana, metabase | det 3/3 · techo 1 · eligió 1 |
| `productora-jugos-naturales` · payments | hyperswitch | det 3/3 · techo 3 · eligió 2 |
| `consultorio-odontologico` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `consultorio-odontologico` · database | postgres, server, supabase | det 2/3 · techo 0 · eligió 0 |
| `consultorio-odontologico` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `consultorio-odontologico` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `consultorio-odontologico` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `taller-relojes-antiguos` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `escuela-pintura-oleo` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `escuela-pintura-oleo` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 1 |
| `servicio-limpieza-alfombras` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `servicio-limpieza-alfombras` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `centro-entrenamiento-perros` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 2 |
| `centro-entrenamiento-perros` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `centro-entrenamiento-perros` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `servicio-instalacion-cerraduras` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `taller-orfebreria-plata` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 0 |
| `taller-orfebreria-plata` · automation | (ninguno) | det 3/3 · eligió algo 3 |
| `taller-orfebreria-plata` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `productora-quesos-frescos` · analytics | grafana | det 2/3 · techo 0 · eligió 0 |
| `productora-quesos-frescos` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `escuela-cocina-vegetariana` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `escuela-cocina-vegetariana` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-vinos-locales` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `fabrica-velas-aromaticas-naturales` · analytics | grafana | det 1/3 · techo 0 · eligió 0 |
| `fabrica-velas-aromaticas-naturales` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `servicio-pintura-casas-interiores` · automation | (ninguno) | det 2/3 · eligió algo 0 |
| `servicio-pintura-casas-interiores` · payments | hyperswitch | det 3/3 · techo 3 · eligió 2 |
| `taller-tapiceria-muebles` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `taller-tapiceria-muebles` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `servicio-jardineria-mantenimiento` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `servicio-jardineria-mantenimiento` · automation | (ninguno) | det 3/3 · eligió algo 3 |
| `servicio-jardineria-mantenimiento` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `taller-reparacion-electrodomesticos-pequenos` · communication | novu, apprise | det 3/3 · techo 3 · eligió 2 |
| `centro-pilates-grupal` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 2 |
| `centro-pilates-grupal` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `servicio-limpieza-oficinas-diaria` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `servicio-limpieza-oficinas-diaria` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
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
- `ok` · Sistema de almacenamiento de fotos para taller de muebles
- Esta propuesta cubre la necesidad de almacenar de forma ordenada las fotos de los muebles terminados utilizando un sistema de almacenamiento de objetos escalable. Las necesidades de aprobación por diseñador, seguimiento de etapas en el taller y visualización de avances por parte de los clientes no cuentan con herramientas candidatas en el catálogo actual.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos: Resuelve la necesidad de guardar de forma ordenada las fotos de los muebles terminados gracias a su capacidad de sistema de almacenamiento distribuido para archivos y objetos con licencia Apache-2.0.
- Limitación: No se cubren las necesidades de aprobación de diseños por parte del diseñador.
- Limitación: No se incluye un sistema para organizar las etapas de fabricación en el taller ni para que los clientes consulten el avance sin llamar.
- Supuesto: Se asume que el taller cuenta con infraestructura para alojar un sistema de almacenamiento distribuido.
- Supuesto: El usuario necesita integrar la subida de fotos desde dispositivos móviles o cámaras del taller.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-estetica`

> Tengo un centro de estética con varias cosmetólogas. Quiero que cada una solo maneje su propia agenda y clientes, y poder controlar cuántos tratamientos se hacen por tipo. También necesito enviar mensajes de confirmación y que el sistema me diga cuándo hay huecos libres.

**gemini**
- `ok` · Sistema de gestión para centro de estética
- La propuesta cubre parcialmente las necesidades del centro de estética mediante herramientas para analítica y comunicación. Sin embargo, no se encontraron candidatos para la gestión de agendas individuales, el control de clientes por cosmetóloga ni la detección automática de huecos libres en los turnos.
- **Grafana** (`grafana/grafana`), Visualización de métricas y tratamientos: Grafana es una plataforma de visualización y observabilidad que permite crear paneles para supervisar métricas de manera centralizada. Cuenta con licencia AGPL-3.0 y actividad reciente.
- **Novu** (`novuhq/novu`), Envío de mensajes de confirmación: Novu provee una infraestructura de comunicación open source para gestionar notificaciones y mensajes. Su licencia en GitHub no está identificada y presenta mantenimiento activo reciente.
- Limitación: Ninguna de las herramientas seleccionadas resuelve la gestión de agendas independientes por cosmetóloga ni la detección de huecos libres en el sistema.
- Supuesto: Se asume que el negocio cuenta con una base de datos u otra herramienta que recolecte los datos de los tratamientos para que Grafana pueda visualizarlos.
- Supuesto: El pedido requiere gestión de agendas por cosmetóloga, control de clientes, y detección de huecos libres, pero estas necesidades no tienen candidatos asignados en el catálogo disponible.
- Rúbrica: español _ · rationale _ · coherencia _

### `productora-jugos-naturales`

> Produzco jugos naturales y los vendo a tiendas y restaurantes. Necesito llevar el control de la producción diaria y de las entregas. Quiero que los pedidos de los clientes se organicen solos por zona y que pueda ver rápido cuánto vendí de cada sabor la semana pasada. Además me gustaría cobrar con transferencia y generar el comprobante.

**gemini**
- `ok` · Sistema de gestión y analítica para producción de jugos
- La propuesta integra herramientas para la analítica de ventas y la gestión de pagos, aunque la necesidad de base de datos no pudo resolverse con los candidatos provistos. Quedan sin resolver la organización de pedidos por zona y el control de producción.
- **Umami** (`umami-software/umami`), Analítica de ingresos: Permite centralizar el seguimiento de conversiones e ingresos en un solo lugar de forma privada. Cuenta con licencia MIT y se mantiene activamente sin requerir cookies.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Ofrece una plataforma de pagos abierta y de alto rendimiento bajo licencia Apache-2.0. Se conecta con múltiples opciones de pago para gestionar las transacciones del negocio.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Ningún candidato disponible resuelve directamente el control de inventario y producción de jugos, ya que la herramienta evaluada se enfoca en despliegues de infraestructura.
- Limitación: La propuesta no incluye una solución para organizar automáticamente los pedidos por zona.
- Limitación: No se encontró una herramienta adecuada para el control específico de la producción diaria y las entregas.
- Supuesto: Se asume que la analítica de ingresos puede adaptarse para medir las ventas de los diferentes sabores de jugos.
- Supuesto: El negocio necesita organizar pedidos por zona y llevar un control de producción diario, requerimientos que no cuentan con herramientas dedicadas en este catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `consultorio-odontologico`

> Tengo un consultorio odontológico con dos dentistas. Quiero que cada uno maneje solo sus pacientes y que pueda organizar el historial de tratamientos de cada persona. Necesito enviar recordatorios de citas y que los pacientes puedan pagar la consulta desde el celular. Me preocupa que todo cargue rápido para quienes están en otras ciudades.

**gemini**
- `ok` · Sistema de gestión para consultorio odontológico con pagos y accesos
- Esta propuesta organiza el consultorio odontológico implementando control de acceso para que cada dentista gestione sus pacientes, herramientas para notificaciones y una plataforma de pagos en línea para celulares. Quedan por resolver la gestión interna del historial de tratamientos y la optimización de velocidad para usuarios remotos.
- **Keycloak** (`keycloak/keycloak`), Controla la autenticación y los permisos de acceso para los dentistas.: Resuelve la necesidad de autenticación y control de acceso con licencia Apache-2.0 y mantenimiento activo. Permite gestionar identidades para asegurar que cada profesional acceda únicamente a la información de sus pacientes.
- **Apprise** (`caronc/apprise`), Envía notificaciones y recordatorios a los pacientes.: Facilita el envío de alertas y notificaciones a través de diversos servicios con licencia BSD-2-Clause y actividad reciente. Se conecta de manera sencilla para alertar a los pacientes sobre sus citas pendientes.
- **Hyperswitch** (`juspay/hyperswitch`), Procesa los pagos móviles de las consultas odontológicas.: Proporciona una plataforma de pagos altamente performante con licencia Apache-2.0 y actualizaciones constantes. Permite que los pacientes paguen la consulta directamente desde el celular.
- Limitación: No se incluye una herramienta específica para registrar y organizar el historial de tratamientos de cada paciente.
- Limitación: La propuesta no incluye optimizadores específicos de red o CDN para garantizar velocidad en otras ciudades.
- Supuesto: Se asume que el consultorio cuenta con infraestructura propia o servidores en la nube para alojar las herramientas autohospedadas.
- Supuesto: El historial de tratamientos de cada persona requiere un software de historias clínicas electrónicas que no forma parte del catálogo actual.
- Supuesto: La carga rápida para usuarios en otras ciudades dependerá de la configuración de red y la ubicación del servidor.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-relojes-antiguos`

> Tengo un pequeño taller donde restauro relojes de pared y de bolsillo. Necesito organizar los turnos de mis dos técnicos para que no se crucen los trabajos urgentes. También quiero controlar la calidad de cada pieza antes de entregarla al cliente y que se les avise por mensaje cuando el reloj esté listo.

**gemini**
- `ok` · Sistema de notificaciones para taller de relojería
- Esta propuesta incluye la herramienta seleccionada para enviar avisos por mensaje a los clientes cuando sus relojes estén listos. Las necesidades de gestión de turnos y control de calidad no cuentan con herramientas candidatas en este sistema.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Resuelve el envío de avisos a los clientes cuando el reloj esté listo mediante su infraestructura de comunicación. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- Limitación: No se cubren las necesidades de organización de turnos de los técnicos ni el control de calidad de las piezas.
- Limitación: No se seleccionaron aplicaciones específicas para mensajería instantánea como WhatsApp o SMS directo, ya que la herramienta elegida es una infraestructura general de comunicación.
- Supuesto: Se asume que el taller cuenta con infraestructura propia para desplegar aplicaciones autohospedadas.
- Supuesto: El usuario necesita herramientas adicionales para la gestión de turnos y el control de calidad que no están cubiertas por los candidatos actuales.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-pintura-oleo`

> Dirijo una escuela de pintura al óleo para adultos. Quiero manejar el equipo de profesores y asignarles los grupos según su especialidad. Los alumnos deben poder pagar las mensualidades desde su casa y yo necesito ver cuántas personas se inscriben cada mes.

**gemini**
- `ok` · Sistema de gestión y pagos para escuela de pintura
- Esta propuesta integra una plataforma de facturación por suscripción para los cobros y una herramienta de analítica web para monitorear las inscripciones. Quedan sin cubrir mediante herramientas específicas la gestión de profesores y la asignación de grupos según especialidad.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos y suscripciones: Permite gestionar la facturación por suscripción y los pagos recurrentes de las mensualidades de los alumnos desde su casa. Cuenta con la licencia Apache-2.0 y actividad reciente.
- **Umami** (`umami-software/umami`), Plataforma de analítica de inscripciones: Facilita el seguimiento de conversiones y datos analíticos para observar la cantidad de personas que se inscriben cada mes. Utiliza la licencia MIT y se mantiene activa.
- Limitación: No se incluyen herramientas para la gestión del equipo de profesores ni para la asignación de grupos por especialidad.
- Supuesto: Se asume que la escuela cuenta con infraestructura propia para realizar el auto-hospedaje de las plataformas elegidas.
- Supuesto: El pedido requiere además manejar el equipo de profesores y asignarles los grupos según su especialidad, necesidades que no cuentan con herramientas en este catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-limpieza-alfombras`

> Ofrezco limpieza de alfombras y cortinas a domicilio en la ciudad. Quiero llevar los pedidos hasta la casa del cliente con un recorrido ordenado. También necesito que cada empleado vea solo las órdenes de su zona y que el sistema avise cuando un trabajo se atrasa.

**gemini**
- `ok` · Sistema de notificaciones para gestión de limpieza a domicilio
- Esta propuesta incluye la infraestructura de comunicación para enviar avisos sobre el estado de los trabajos de limpieza. Quedan fuera del alcance la optimización de rutas para las visitas a domicilio y el control de acceso por zonas para los empleados.
- **Apprise** (`caronc/apprise`), Centralizador de notificaciones: Resuelve la solicitud de enviar avisos cuando un trabajo se atrasa mediante notificaciones push conectadas a múltiples plataformas. Cuenta con la licencia BSD-2-Clause y actividad reciente.
- Limitación: No se cubren las necesidades de planificación de recorridos ordenados para las entregas ni la restricción de visualización de órdenes por zona para cada empleado.
- Supuesto: Se asume que el negocio cuenta con personal operativo que requiere alertas en tiempo real sobre las visitas a domicilio.
- Supuesto: El usuario necesita módulos adicionales para el ruteo de pedidos y la segmentación de zonas por empleado que no fueron cubiertos por los candidatos.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-entrenamiento-perros`

> Tengo un centro donde adiestramos perros de compañía. Quiero llevar el control de las clases de cada animal y sus progresos. También necesito que los dueños paguen las sesiones mensuales y que solo el entrenador asignado vea la información de su grupo.

**gemini**
- `ok` · Sistema de gestión para centro de adiestramiento canino
- La propuesta integra una base de datos relacional robusta para almacenar el control de las clases y progresos, una plataforma de cobros para gestionar las sesiones mensuales de los dueños, y un sistema de gestión de identidades y accesos para asegurar que solo el entrenador asignado vea la información de su grupo.
- **PostgreSQL** (`postgres/postgres`), Almacena los datos de las clases y los progresos de cada animal.: Permite llevar el control de las clases de cada animal y sus progresos de forma estructurada. La licencia no fue identificada por GitHub.
- **Kill Bill** (`killbill/killbill`), Gestiona los pagos de las sesiones mensuales.: Resuelve el cobro de las sesiones mensuales mediante su plataforma de facturación por suscripción y pagos con licencia Apache-2.0.
- **Keycloak** (`keycloak/keycloak`), Controla el acceso y los permisos para que cada entrenador vea solo su grupo.: Gestiona la identidad y el acceso para garantizar que solo el entrenador asignado vea la información de su grupo, bajo licencia Apache-2.0.
- Limitación: Ninguna de las herramientas incluye por defecto una interfaz específica para el adiestramiento canino, por lo que requerirá desarrollo a medida.
- Supuesto: Se asume que el centro cuenta con infraestructura propia para alojar las herramientas seleccionadas.
- Supuesto: Se asume que la interfaz de usuario para interactuar con las clases y progresos será desarrollada de forma personalizada conectándose a estas herramientas.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-instalacion-cerraduras`

> Instalo y cambio cerraduras en casas y locales. Quiero organizar las visitas diarias de mis técnicos. Necesito controlar que cada instalación quede bien hecha antes de cobrar y que el cliente reciba un mensaje cuando el técnico está en camino.

**gemini**
- `ok` · Sistema de notificaciones para servicio de cerrajería
- Esta propuesta incluye la infraestructura de comunicación para enviar avisos automatizados a los clientes. Quedan sin resolver la organización de visitas de los técnicos y el control de calidad previo al cobro.
- **Apprise** (`caronc/apprise`), Envío de notificaciones: Permite enviar notificaciones push a través de múltiples plataformas para avisar al cliente cuando el técnico está en camino. Su licencia es BSD-2-Clause y cuenta con mantenimiento activo reciente.
- Limitación: No se cubren las necesidades de organización de visitas diarias de los técnicos ni el control de calidad de las instalaciones antes de cobrar.
- Supuesto: Se asume que la empresa cuenta con un sistema externo o manual para la gestión de las agendas de los técnicos y el control de calidad de las instalaciones.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-orfebreria-plata`

> Trabajo la plata y hago joyas a medida. Quiero controlar el inventario de metales preciosos que uso en cada pieza. También necesito que una solicitud de diseño pase por mi aprobación antes de empezar y que los clientes puedan pagar el anticipo en línea.

**gemini**
- `ok` · Sistema de gestión para joyería artesanal y pagos en línea
- Esta propuesta cubre el control de inventario de metales preciosos mediante una base de datos relacional, la automatización del flujo de aprobación de diseños y la gestión de pagos en línea para anticipos.
- **SQLModel** (`fastapi/sqlmodel`), Almacena los registros y el inventario de metales preciosos usados en cada pieza.: Permite gestionar bases de datos SQL en Python con simplicidad, compatibilidad y robustez, ideal para registrar el uso de metales preciosos. Cuenta con licencia MIT y actividad reciente.
- **Apache Airflow** (`apache/airflow`), Orquesta y supervisa el flujo de trabajo para las solicitudes de diseño y su aprobación.: Facilita la programación y supervisión de flujos de trabajo mediante una plataforma robusta para la automatización de procesos. Utiliza licencia Apache-2.0 y se mantiene activa.
- **Hyperswitch** (`juspay/hyperswitch`), Procesa los pagos en línea para los anticipos de los clientes.: Ofrece una plataforma de pagos de código abierto, con cumplimiento PCI y alta velocidad, permitiendo conectar múltiples proveedores. Cuenta con licencia Apache-2.0 y mantenimiento constante.
- Limitación: La herramienta de automatización seleccionada está orientada a flujos de datos e ingeniería y podría requerir personalización adicional para una interfaz de aprobación centrada en usuarios no técnicos.
- Supuesto: Se asume que el taller cuenta con infraestructura para alojar servicios web y bases de datos.
- Supuesto: Se requiere un sistema complementario de interfaz de usuario para que los clientes interactúen con las solicitudes de diseño y los pagos.
- Rúbrica: español _ · rationale _ · coherencia _

### `productora-quesos-frescos`

> Elaboro quesos frescos y madurados en pequeña escala. Quiero organizar la producción semanal según los pedidos. Necesito controlar la temperatura de las cámaras de maduración y que cada empleado de la planta vea solo las tareas de su área.

**gemini**
- `ok` · Sistema de Control y Acceso para Produccion de Quesos
- Esta propuesta incluye la gestion de permisos para que cada empleado vea su area y la monitorizacion de temperatura de las cámaras de maduración. Quedan sin resolver la planificacion y organizacion de la produccion semanal segun los pedidos.
- **Keycloak** (`keycloak/keycloak`), Gestion de identidad y permisos: Keycloak resuelve la gestion de permisos y roles de usuario para que cada empleado de la planta vea solo las tareas de su area. Cuenta con licencia Apache-2.0 y actividad reciente.
- **Prometheus** (`prometheus/prometheus`), Monitoreo de temperatura: Prometheus registra series temporales y metricas para controlar la temperatura de las cámaras de maduración. Utiliza licencia Apache-2.0 y se mantiene activamente.
- Limitación: La propuesta no incluye un sistema para organizar la produccion semanal segun los pedidos.
- Supuesto: Se asume que los sensores de las cámaras de maduración exponen metricas compatibles con sistemas de monitoreo.
- Supuesto: Se necesita un modulo adicional para organizar la produccion semanal segun los pedidos de los clientes.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-cocina-vegetariana`

> Doy clases de cocina vegetariana a grupos pequeños. Quiero manejar los cupos de cada taller y las inscripciones. También necesito llevar el historial de recetas que cada alumno ha practicado y que solo el profesor del grupo vea las evaluaciones.

**gemini**
- `ok` · Sistema para gestión de talleres de cocina y acceso
- Esta propuesta integra herramientas para gestionar la analítica web y la identidad de usuarios, cubriendo parcialmente las necesidades de inscripción y control de acceso. Quedan sin resolver de forma directa la persistencia de datos relacionales para talleres y el historial detallado de recetas.
- **Keycloak** (`keycloak/keycloak`), Control de acceso: Keycloak ofrece una solución de gestión de identidad y acceso de código abierto con licencia Apache-2.0 y mantenimiento activo. Permite administrar usuarios y definir políticas de acceso para asegurar que solo los profesores visualicen las evaluaciones.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Los candidatos encontrados no ofrecen una base de datos relacional para gestionar cupos de talleres ni historiales de recetas de los alumnos. Umami solo permite análisis de tráfico y comportamiento web.
- Limitación: No se encontró ninguna herramienta en los candidatos que resuelva específicamente la gestión de cupos por taller ni el historial de recetas practicadas por cada alumno.
- Supuesto: Se asume que el negocio cuenta con una interfaz web o aplicación propia donde se integrarán estas herramientas.
- Supuesto: Se requiere una gestión de pagos o reservas automatizada que no fue detallada en los candidatos.
- Rúbrica: español _ · rationale _ · coherencia _

### `distribuidora-vinos-locales`

> Distribuyo vinos de productores locales a restaurantes. Quiero organizar las entregas semanales por zona. Necesito controlar que cada caja salga completa y que el sistema avise cuando un restaurante pide más de lo habitual.

**gemini**
- `ok` · Sistema de notificaciones para avisos de pedidos
- La propuesta integra una herramienta de notificaciones para enviar los avisos solicitados cuando un restaurante pida más de lo habitual. Quedan sin resolver en esta selección las necesidades de organización de entregas y control de stock o cajas.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Resuelve la necesidad de enviar avisos automáticos mediante su infraestructura de comunicación open-source. Su licencia no fue identificada por GitHub. Cuenta con mantenimiento reciente y alta popularidad en GitHub.
- Supuesto: Se asume que el negocio cuenta con canales configurados para el envío de alertas.
- Supuesto: El pedido requiere gestionar la logística de entregas semanales por zona y el control de cajas completas, necesidades que no figuran en los candidatos disponibles.
- Rúbrica: español _ · rationale _ · coherencia _

### `fabrica-velas-aromaticas-naturales`

> Fabrico velas aromáticas con esencias naturales. Quiero organizar los lotes de producción según los aromas más pedidos. Necesito controlar la temperatura de derretido de la cera y que las imágenes del catálogo carguen rápido para compradores de otros países.

**gemini**
- `ok` · Sistema de almacenamiento rápido para imágenes del catálogo
- Se propone una herramienta de almacenamiento distribuido para que las imágenes del catálogo carguen rápidamente. Quedan sin resolver en este catálogo la organización de lotes de producción por aromas y el control de temperatura de la cera.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento y entrega rápida de imágenes multimedia: Resuelve la necesidad de almacenamiento distribuido para archivos multimedia gracias a su diseño para manejar miles de millones de archivos con acceso a disco O(1). Utiliza la licencia Apache-2.0 y cuenta con actividad reciente.
- Limitación: La propuesta no incluye gestión de lotes de producción ni control de temperatura.
- Limitación: No se dispone de herramientas en el catálogo para procesamiento de datos de fabricación de velas.
- Supuesto: Se asume que el negocio cuenta con personal técnico para desplegar y administrar un sistema de almacenamiento distribuido.
- Supuesto: El usuario necesita registrar datos de temperatura y producción que no tienen candidatos en este catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-pintura-casas-interiores`

> Pinto casas e interiores por encargo. Quiero manejar el equipo de pintores y asignarles las obras. También necesito que una solicitud de cambio de color pase por mi aprobación y que se cobre el anticipo antes de empezar.

**gemini**
- `ok` · Sistema de pagos y cobro de anticipos
- Esta propuesta incluye la plataforma de pagos para gestionar el cobro de anticipos en línea requerido para el negocio de pintura. Quedan sin resolver la gestión del equipo de pintores, la asignación de obras y la automatización para la aprobación de cambios de color.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos y cobros: Permite gestionar las transacciones y conectar con múltiples proveedores de pago para asegurar el cobro del anticipo antes de empezar cada obra. Cuenta con licencia Apache-2.0 y mantenimiento reciente.
- Limitación: Automatización: no se encontraron herramientas del catálogo para «una solicitud de cambio de color pase por mi aprobación».
- Limitación: La propuesta no incluye herramientas para manejar el equipo de pintores ni para asignarles las obras.
- Limitación: No se cubre la solicitud de cambio de color ni su flujo de aprobación.
- Supuesto: Se asume que el negocio cuenta con clientes dispuestos a pagar mediante pasarelas de pago digitales.
- Supuesto: El usuario necesitará integrar esta pasarela con un sitio web propio o una aplicación de reservas no incluida en las herramientas analizadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-tapiceria-muebles`

> Me dedico a retapizar sillones y sillas. Quiero llevar el registro de las telas usadas en cada trabajo y los costos. También necesito organizar los turnos de los tapiceros y que el cliente reciba un aviso cuando su mueble esté listo.

**gemini**
- `ok` · Sistema de gestión para taller de tapicería
- Propuesta para organizar el registro de telas y costos mediante una base de datos analítica y automatizar los avisos a los clientes utilizando una plataforma de notificaciones. Queda pendiente la organización de turnos de los tapiceros.
- **ClickHouse** (`ClickHouse/ClickHouse`), Base de datos: Permite almacenar y gestionar los datos y costos de las telas usadas en cada trabajo gracias a su motor de base de datos relacional y analítico. Cuenta con licencia Apache-2.0 y alta actividad reciente.
- **Apprise** (`caronc/apprise`), Notificaciones: Facilita el envío de notificaciones para que el cliente reciba un aviso cuando su mueble esté listo. Utiliza una licencia BSD-2-Clause y se mantiene actualizado de manera constante.
- Limitación: La propuesta no incluye un módulo específico para la gestión y organización de turnos de los tapiceros.
- Supuesto: Se asume que el negocio cuenta con infraestructura propia para hospedar las herramientas seleccionadas.
- Supuesto: El negocio requiere organizar los turnos de los tapiceros, una necesidad que no cuenta con candidatos en esta propuesta.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-jardineria-mantenimiento`

> Ofrezco mantenimiento de jardines en residenciales. Quiero llevar los pedidos de poda y riego de cada cliente. También necesito que una solicitud de trabajo extra pase por aprobación del supervisor y que se cobre al final del mes.

**gemini**
- `ok` · Sistema open source para gestión de jardinería
- Esta propuesta incluye la base de datos para almacenar los registros de clientes y servicios, la automatización para gestionar los flujos de trabajo de aprobación y la plataforma de pagos para procesar los cobros mensuales.
- **MariaDB** (`MariaDB/server`), Almacén de datos: MariaDB server permite llevar de forma estructurada los pedidos de poda y riego de cada cliente mediante su sistema de base de datos.
- **Apache Airflow** (`apache/airflow`), Orquestador de procesos: Apache Airflow programa flujos de trabajo para que las solicitudes de trabajo extra pasen por los pasos necesarios.
- **Kill Bill** (`killbill/killbill`), Plataforma de cobros: Kill Bill gestiona suscripciones y pagos para que el servicio se cobre al final del mes.
- Supuesto: Se asume que el personal de supervisión cuenta con acceso a la plataforma de automatización para aprobar las tareas.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-reparacion-electrodomesticos-pequenos`

> Reparo licuadoras, planchas y otros electrodomésticos pequeños. Quiero organizar los turnos de recepción y entrega. Necesito controlar que cada aparato salga funcionando y que el cliente reciba un mensaje cuando esté listo para recoger.

**gemini**
- `ok` · Sistema para gestion de reparacion y notificacion de electrodomesticos
- La solucion propuesta incluye una herramienta de comunicacion para notificar a los clientes sobre sus reparaciones. Quedan sin resolver la organizacion de turnos y el control de calidad de funcionamiento de los aparatos por falta de candidatos especificos.
- **Novu** (`novuhq/novu`), Infraestructura de comunicacion: Permite gestionar la infraestructura de comunicacion para enviar los mensajes a los clientes cuando sus aparatos esten listos. La licencia no esta identificada por GitHub.
- Limitación: No se resolvieron las necesidades de organizacion de turnos de recepcion y entrega.
- Limitación: No se resolvio el control de que cada aparato salga funcionando.
- Supuesto: Se asume que el negocio cuenta con personal para registrar manualmente los turnos y los controles de calidad ya que no hay herramientas para ello.
- Supuesto: El usuario necesita integrar la infraestructura de comunicacion con canales de mensajeria externos.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-pilates-grupal`

> Tengo un centro de pilates en grupos reducidos. Quiero manejar los horarios de las clases y los instructores. También necesito controlar la asistencia de cada alumno y que solo el instructor del grupo vea las notas de progreso.

**gemini**
- `ok` · Sistema de gestión para centro de pilates
- Esta propuesta cubre la gestión de datos para horarios y asistencias, así como la infraestructura de autenticación y autorización para asegurar que solo los instructores accedan a las notas de progreso. Se asume que el centro cuenta con un desarrollo propio o interfaz para consumir estas herramientas.
- **Keycloak** (`keycloak/keycloak`), Control de acceso y autenticación: Keycloak provee administración de identidad y acceso para aplicaciones modernas, lo que permite configurar los permisos necesarios para que solo el instructor del grupo vea las notas de progreso de los alumnos.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. ClickHouse es una base de datos analítica en tiempo real pero no está diseñada como base de datos transaccional general para manejar la operación diaria de horarios y asistencias del centro de pilates.
- Limitación: No se encontró una herramienta transaccional dedicada para la gestión exclusiva de horarios de clases y asistencia.
- Supuesto: Se asume que existe una aplicación desarrollada a medida para la interfaz de usuario de los horarios, clases y notas de progreso.
- Supuesto: El negocio requiere una interfaz web o móvil para la interacción de alumnos e instructores.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-limpieza-oficinas-diaria`

> Brindo limpieza diaria de oficinas. Quiero organizar las rutas de los equipos de aseo. Necesito que cada supervisor vea solo los edificios de su zona y que el sistema avise si un equipo no marca la entrada a tiempo.

**gemini**
- `ok` · Sistema de autenticacion y alertas para equipos de limpieza
- Se propone una solucion para la gestion de identidad y el envio de notificaciones operativas. Queda pendiente la funcionalidad especifica de organizacion de rutas.
- **Keycloak** (`keycloak/keycloak`), Gestion de autenticacion y control de acceso: Resuelve la necesidad de autenticacion proporcionando gestion de identidad y acceso con licencia Apache-2.0 y actividad reciente.
- **Apprise** (`caronc/apprise`), Plataforma de envio de alertas: Resuelve la necesidad de avisar si un equipo no marca la entrada a tiempo mediante el envio de notificaciones push, utilizando licencia BSD-2-Clause.
- Limitación: La propuesta no incluye un modulo especifico para organizar las rutas de los equipos de aseo.
- Supuesto: Se asume que los supervisores y equipos de aseo cuentan con dispositivos con acceso a internet para autenticarse y registrar entradas.
- Supuesto: El pedido requiere la organizacion de rutas de los equipos de aseo, necesidad para la cual no se encontraron candidatos en las listas provistas.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-pintura-automotriz-chica`

> Pinto y repinto vehículos en un taller pequeño. Quiero controlar el inventario de pinturas y diluyentes que uso. También necesito que una cotización pase por mi aprobación antes de empezar el trabajo y que el cliente pague el anticipo en línea.

**gemini**
- `ok` · Solución de inventario y pagos en línea para taller
- Esta propuesta integra herramientas para la gestión de bases de datos orientadas a Python y una plataforma de pagos open source para procesar el anticipo de los clientes. El sistema asume que el taller cuenta con un desarrollo propio para la interfaz de taller y no cubre la gestión de cotizaciones por falta de candidatos.
- **SQLAlchemy** (`sqlalchemy/sqlalchemy`), Gestión de la base de datos para el inventario de pinturas y diluyentes: Permite modelar y consultar los datos del inventario utilizando Python. Cuenta con licencia MIT y alta actividad reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento del pago del anticipo en línea: Facilita la conectividad con múltiples proveedores de pago para que los clientes realicen el anticipo de forma digital. Utiliza licencia Apache-2.0 y se mantiene activamente.
- Limitación: No se incluye ninguna herramienta específica para gestionar el flujo de aprobación de cotizaciones antes de iniciar los trabajos.
- Supuesto: El taller dispone de personal técnico o capacidad de desarrollo para integrar el kit de base de datos y la plataforma de pagos.
- Supuesto: El flujo de aprobación de cotizaciones se resolverá mediante un flujo de trabajo interno personalizado, ya que no se encontraron candidatos para esa necesidad.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-circo-infantil`

> Enseño malabares y acrobacia básica a niños. Quiero manejar los grupos por edad y nivel. También necesito controlar la asistencia a cada clase y que los padres puedan pagar la mensualidad desde su casa.

**gemini**
- `ok` · Sistema de pagos para clases infantiles
- La propuesta implementa una plataforma de pagos para procesar las mensualidades desde el hogar. No se encontraron herramientas adecuadas en el catálogo para registrar asistencia, organizar grupos por edad y nivel, o gestionar perfiles de usuarios.
- **Kill Bill** (`killbill/killbill`), Plataforma de facturación y pagos: Kill Bill es una plataforma open-source de facturación y pagos por suscripción bajo licencia Apache-2.0. Permite gestionar los cobros recurrentes de las mensualidades para que los padres puedan pagar desde sus casas.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Los candidatos encontrados ofrecen autenticación y control de acceso, pero ninguno registra la asistencia a clases ni administra grupos por edad y nivel.
- Limitación: No se cubrió la necesidad de registrar la asistencia a cada clase.
- Limitación: No se cubrió la gestión de grupos por edad y nivel.
- Supuesto: Se asume que el negocio cuenta con una plataforma web o pasarela compatible con Kill Bill para procesar los pagos.
- Supuesto: El negocio necesita herramientas para la gestión de alumnos, control de asistencia y organización de grupos que no fueron cubiertas por el catálogo.
- Rúbrica: español _ · rationale _ · coherencia _
