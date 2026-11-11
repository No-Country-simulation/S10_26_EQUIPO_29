# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 05:51. 22 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.9 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 92% |
| Respuesta válida | 100% |
| Necesidades detectadas | 51% |
| Techo de la búsqueda (top 5) | 87% |
| Techo con 5 candidatos | 87% |
| Eligió un aceptable (donde había) | 97% |
| Se abstuvo (donde no había) | 50% |
| Acierto de punta a punta (comparable entre k) | 85% |
| Sin caja donde el caso no tiene herramientas | — |
| Recibe una herramienta aceptable, como lo ve el usuario | 51% |
| Se abstuvo, como lo ve el usuario | 0% |
| Eligió el primer candidato | 51% |
| Consistencia entre corridas | 50% |
| Entender válido al 1.er intento | 97% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 1 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 49 |
| Ids en el texto | 0 |
| Errores del proveedor | 1/66 |
| Tiempo total (mediana) | 3.6 s |
| Tiempo total (peor caso) | 5.9 s |
| Sobre 15 s | 0/65 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.1 s · 2.0 s |
| Tokens entrada / salida (mediana) | 3627 / 411 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 22 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 91% | 95% | 91% | 91% – 95% |
| Eligió un aceptable (donde había) | 92% | 100% | 100% | 92% – 100% |
| Se abstuvo (donde no había) | 67% | 50% | 33% | 33% – 67% |
| Acierto de punta a punta | 81% | 86% | 88% | 81% – 88% |
| Recibe una herramienta aceptable, como lo ve el usuario | 50% | 56% | 48% | 48% – 56% |
| Se abstuvo, como lo ve el usuario | 0% | 0% | 0% | 0% – 0% |
| Textos del modelo que hablan del catálogo | 16 | 16 | 17 | 16 – 17 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `fabrica-muebles-madera` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `fabrica-muebles-madera` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `fabrica-muebles-madera` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `centro-estetica` · auth | keycloak, zitadel | det 1/3 · techo 1 · eligió 1 |
| `centro-estetica` · analytics | grafana, metabase | det 2/3 · techo 0 · eligió 0 |
| `centro-estetica` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `centro-estetica` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `productora-jugos-naturales` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `productora-jugos-naturales` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `productora-jugos-naturales` · analytics | grafana, metabase | det 3/3 · techo 0 · eligió 0 |
| `productora-jugos-naturales` · payments | hyperswitch | det 2/3 · techo 2 · eligió 2 |
| `consultorio-odontologico` · auth | keycloak, zitadel | det 2/3 · techo 2 · eligió 2 |
| `consultorio-odontologico` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `consultorio-odontologico` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `consultorio-odontologico` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `consultorio-odontologico` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `taller-relojes-antiguos` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `escuela-pintura-oleo` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `escuela-pintura-oleo` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 2 |
| `servicio-limpieza-alfombras` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `servicio-limpieza-alfombras` · communication | novu, apprise | det 2/3 · techo 2 · eligió 2 |
| `centro-entrenamiento-perros` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `centro-entrenamiento-perros` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `centro-entrenamiento-perros` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `servicio-instalacion-cerraduras` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `taller-orfebreria-plata` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `taller-orfebreria-plata` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `taller-orfebreria-plata` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `productora-quesos-frescos` · analytics | grafana | det 0/3 · techo 0 · eligió 0 |
| `productora-quesos-frescos` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `escuela-cocina-vegetariana` · database | postgres, server, supabase | det 2/3 · techo 0 · eligió 0 |
| `escuela-cocina-vegetariana` · auth | keycloak, zitadel | det 1/3 · techo 1 · eligió 1 |
| `distribuidora-vinos-locales` · communication | novu, apprise | det 2/2 · techo 2 · eligió 2 |
| `fabrica-velas-aromaticas-naturales` · analytics | grafana | det 0/3 · techo 0 · eligió 0 |
| `fabrica-velas-aromaticas-naturales` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `servicio-pintura-casas-interiores` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `servicio-pintura-casas-interiores` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `taller-tapiceria-muebles` · database | postgres, server, supabase | det 1/3 · techo 1 · eligió 0 |
| `taller-tapiceria-muebles` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `servicio-jardineria-mantenimiento` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `servicio-jardineria-mantenimiento` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `servicio-jardineria-mantenimiento` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `taller-reparacion-electrodomesticos-pequenos` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `centro-pilates-grupal` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `centro-pilates-grupal` · auth | keycloak, zitadel | det 0/3 · techo 0 · eligió 0 |
| `servicio-limpieza-oficinas-diaria` · auth | keycloak, zitadel | det 1/3 · techo 1 · eligió 1 |
| `servicio-limpieza-oficinas-diaria` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `taller-pintura-automotriz-chica` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `taller-pintura-automotriz-chica` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `taller-pintura-automotriz-chica` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `escuela-circo-infantil` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `escuela-circo-infantil` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `fabrica-muebles-madera`

> Fabrico muebles de madera a medida. Cada pedido tiene que pasar por la aprobación del diseñador antes de empezar a cortar. Quiero organizar el taller para saber en qué etapa está cada mueble y que el cliente pueda ver el avance sin llamar. Además necesito que las fotos de los terminados se guarden de forma ordenada.

**gemini**
- `ok` · Sistema de almacenamiento ordenado para fotos de muebles
- La propuesta cubre el almacenamiento ordenado de las fotos de los muebles terminados utilizando un sistema de archivos distribuido. Las necesidades de aprobación del diseñador, organización del taller y seguimiento para el cliente quedaron sin herramientas candidatas en el catálogo actual.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos: Permite guardar las fotos de los muebles terminados de forma ordenada mediante su sistema de archivos distribuido diseñado para manejar miles de archivos.
- Limitación: La propuesta actual no resuelve la aprobación del diseñador, la organización del taller ni la visualización del avance por parte del cliente.
- Supuesto: Se asume que el negocio cuenta con infraestructura propia o en la nube para hospedar el sistema de almacenamiento.
- Supuesto: Las necesidades de gestión de pedidos, aprobación del diseño y portal de clientes requieren herramientas adicionales no disponibles en este catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-estetica`

> Tengo un centro de estética con varias cosmetólogas. Quiero que cada una solo maneje su propia agenda y clientes, y poder controlar cuántos tratamientos se hacen por tipo. También necesito enviar mensajes de confirmación y que el sistema me diga cuándo hay huecos libres.

**gemini**
- `ok` · Arquitectura open source para gestión de estética
- Esta propuesta organiza el control de acceso de las cosmetólogas, la analítica para contar tratamientos y la infraestructura de comunicación para mensajes de confirmación utilizando herramientas open source. El negocio también requerirá módulos específicos para la gestión de agendas y detección de huecos libres que no forman parte de los catálogos actuales.
- **Keycloak** (`keycloak/keycloak`), Control de identidad y permisos de usuario: Keycloak provee autenticación y control de acceso bajo licencia Apache-2.0, permitiendo administrar los permisos necesarios para que cada cosmetóloga acceda únicamente a su información.
- **PostHog** (`PostHog/posthog`), Plataforma de analítica y eventos: PostHog permite registrar eventos y métricas sobre el uso del sistema, ayudando a controlar la cantidad de tratamientos realizados por tipo. Su licencia no está identificada por GitHub y recibe mantenimiento constante.
- **Novu** (`novuhq/novu`), Infraestructura de mensajería y notificaciones: Novu centraliza el envío de mensajes de confirmación para los clientes del centro de estética. Su licencia no fue identificada por GitHub y cuenta con una comunidad muy activa.
- Limitación: Ninguna de las herramientas seleccionadas incluye de forma nativa un módulo de agenda de turnos ni detección automática de huecos libres para las cosmetólogas.
- Supuesto: Se asume que el centro de estética cuenta con infraestructura propia para realizar el despliegue autohospedado de estas aplicaciones.
- Supuesto: El pedido requiere además módulos especializados de calendario y agendas que no están cubiertos directamente por las herramientas seleccionadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `productora-jugos-naturales`

> Produzco jugos naturales y los vendo a tiendas y restaurantes. Necesito llevar el control de la producción diaria y de las entregas. Quiero que los pedidos de los clientes se organicen solos por zona y que pueda ver rápido cuánto vendí de cada sabor la semana pasada. Además me gustaría cobrar con transferencia y generar el comprobante.

**gemini**
- `ok` · Sistema de gestión para producción y ventas de jugos
- La propuesta cubre parcialmente las necesidades de cobro y analítica con herramientas open source disponibles. Sin embargo, no se encontraron candidatos para gestionar la producción diaria, las entregas ni la organización de pedidos por zona.
- **Hyperswitch** (`juspay/hyperswitch`), Plataforma de pagos: Permite gestionar opciones de pago y conectividad de forma autohospedada bajo licencia Apache-2.0, adaptándose al cobro requerido.
- Limitación: Analítica: ninguna de las herramientas encontradas encaja. Los candidatos de analítica encontrados se enfocan en tráfico web, campañas y comportamiento de usuarios, pero no gestionan directamente un inventario de sabores de jugos ni ventas por producto físico.
- Limitación: No hay candidatos disponibles para llevar el control de la producción diaria.
- Limitación: No hay candidatos disponibles para gestionar las entregas.
- Limitación: No hay candidatos disponibles para organizar los pedidos de los clientes por zona.
- Supuesto: Se asume que el negocio cuenta con infraestructura propia para autoalojar las herramientas open source seleccionadas.
- Supuesto: El usuario necesitará integrar manualmente el control de producción, las entregas y la organización de pedidos por zona, ya que no hay herramientas candidatas para cubrir dichas necesidades en este catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `consultorio-odontologico`

> Tengo un consultorio odontológico con dos dentistas. Quiero que cada uno maneje solo sus pacientes y que pueda organizar el historial de tratamientos de cada persona. Necesito enviar recordatorios de citas y que los pacientes puedan pagar la consulta desde el celular. Me preocupa que todo cargue rápido para quienes están en otras ciudades.

**gemini**
- `ok` · Sistema para gestión odontológica de pacientes y pagos
- Esta propuesta incluye autenticación para separar los pacientes de cada dentista, almacenamiento para los historiales de tratamientos, notificaciones para los recordatorios de citas, procesamiento de pagos móviles y caché para asegurar la velocidad de carga desde otras ciudades.
- **Keycloak** (`keycloak/keycloak`), Control de acceso: Permite gestionar la identidad y el acceso para que cada uno maneje solo sus pacientes de forma segura bajo licencia Apache-2.0.
- **Apprise** (`caronc/apprise`), Envío de notificaciones: Facilita el envío de recordatorios de citas mediante notificaciones a múltiples plataformas con licencia BSD-2-Clause.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Permite que los pacientes puedan pagar la consulta desde el celular mediante una plataforma de pagos de alto rendimiento con licencia Apache-2.0.
- **Valkey** (`valkey-io/valkey`), Caché de alta velocidad: Optimiza la velocidad de carga para quienes están en otras ciudades utilizando almacenamiento en caché bajo licencia BSD-3-Clause.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Aunque es una base de datos distribuida para datos críticos, no está diseñada para organizar historiales clínicos complejos de pacientes.
- Supuesto: Se asume que el consultorio cuenta con infraestructura propia para hospedar las herramientas seleccionadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-relojes-antiguos`

> Tengo un pequeño taller donde restauro relojes de pared y de bolsillo. Necesito organizar los turnos de mis dos técnicos para que no se crucen los trabajos urgentes. También quiero controlar la calidad de cada pieza antes de entregarla al cliente y que se les avise por mensaje cuando el reloj esté listo.

**gemini**
- `ok` · Propuesta de infraestructura de comunicacion para taller de relojes
- Esta propuesta integra una herramienta de notificaciones para enviar avisos automáticos a los clientes cuando sus relojes estén listos. No se cubren las necesidades de gestión de turnos de los técnicos ni el control de calidad de las piezas por falta de candidatos en el catálogo.
- **Apprise** (`caronc/apprise`), Envio de avisos: Permite enviar notificaciones push para alertar a los clientes cuando el reloj esté listo. Utiliza una licencia BSD-2-Clause y cuenta con mantenimiento reciente.
- Limitación: La propuesta no incluye la gestión de turnos de los técnicos ni el control de calidad de las piezas antes de la entrega.
- Supuesto: Se asume que el taller cuenta con un servidor propio para alojar las herramientas open source.
- Supuesto: Se requiere organizar los turnos de los dos técnicos y controlar la calidad de cada pieza, necesidades que no cuentan con candidatos en este catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-pintura-oleo`

> Dirijo una escuela de pintura al óleo para adultos. Quiero manejar el equipo de profesores y asignarles los grupos según su especialidad. Los alumnos deben poder pagar las mensualidades desde su casa y yo necesito ver cuántas personas se inscriben cada mes.

**gemini**
- `ok` · Sistema de gestión para escuela de pintura
- Esta propuesta integra una plataforma para la gestión de pagos y suscripciones de las mensualidades y una herramienta de analítica para visualizar la cantidad de alumnos que se inscriben cada mes. El sistema cubre los requerimientos principales de pagos y analítica, aunque se asume el uso futuro de software adicional para la administración de profesores y especialidades.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos y suscripciones: Permite gestionar el cobro de mensualidades mediante su plataforma de suscripciones y pagos open-source con licencia Apache-2.0 y mantenimiento activo.
- **Umami** (`umami-software/umami`), Plataforma de analítica de inscripciones: Proporciona una plataforma de analítica enfocada en privacidad para medir conversiones y tráfico, bajo licencia MIT y con mantenimiento activo.
- Limitación: La propuesta no incluye la gestión de profesores ni la asignación de grupos por especialidad solicitada por el usuario.
- Supuesto: Se asume que la escuela necesitará en el futuro una herramienta específica para gestionar el equipo de profesores y asignar grupos según su especialidad, ya que no se encontraron candidatos para esa necesidad en este conjunto.
- Supuesto: Se asume que los pagos se procesarán integrando pasarelas compatibles con la plataforma elegida.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-limpieza-alfombras`

> Ofrezco limpieza de alfombras y cortinas a domicilio en la ciudad. Quiero llevar los pedidos hasta la casa del cliente con un recorrido ordenado. También necesito que cada empleado vea solo las órdenes de su zona y que el sistema avise cuando un trabajo se atrasa.

**gemini**
- `ok` · Sistema de monitoreo para alertas de trabajos
- La propuesta cubre la necesidad de observar y alertar sobre trabajos atrasados utilizando una plataforma de visualizacion y analisis de metricas.
- **Grafana** (`grafana/grafana`), Visualizacion y alertas: Grafana permite configurar alertas para avisar sobre el estado de los trabajos y visualizar metricas operativas. Cuenta con licencia AGPL-3.0 y se mantiene de forma activa.
- Limitación: La propuesta no incluye modulos especificos para la gestion de pedidos a domicilio, optimizacion de recorridos o control de zonas por empleado, ya que no se encontraron candidatos para esas necesidades.
- Supuesto: Se asume que el negocio cuenta con un sistema base que registra las ordenes y los tiempos de entrega.
- Supuesto: El pedido menciona necesidades de gestion de pedidos, rutas y asignacion por zonas que no tienen candidatos en este catalogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-entrenamiento-perros`

> Tengo un centro donde adiestramos perros de compañía. Quiero llevar el control de las clases de cada animal y sus progresos. También necesito que los dueños paguen las sesiones mensuales y que solo el entrenador asignado vea la información de su grupo.

**gemini**
- `ok` · Sistema de gestión para centro de adiestramiento canino
- Esta propuesta incluye infraestructura de identidad y control de accesos para los entrenadores, junto con una plataforma para gestionar las suscripciones y cobros mensuales de los dueños de perros. Queda pendiente el desarrollo específico para llevar el registro de las clases y los progresos de cada animal.
- **Keycloak** (`keycloak/keycloak`), Gestionar la autenticación y los permisos por roles de los usuarios.: Keycloak resuelve la gestión de identidad y accesos de forma moderna, permitiendo restringir el acceso para que cada entrenador vea únicamente la información de su grupo. Cuenta con licencia Apache-2.0 y mantenimiento muy activo con actividad reciente.
- **Kill Bill** (`killbill/killbill`), Procesar los pagos y gestionar las suscripciones mensuales de los dueños.: Kill Bill maneja plataformas de cobro y suscripciones recurrentes, ideal para que los dueños paguen las sesiones mensuales. Utiliza licencia Apache-2.0 y recibe actualizaciones constantes.
- Limitación: Ninguna de las herramientas del catálogo actual resuelve de forma directa el registro y seguimiento de clases y progresos de los animales.
- Supuesto: Se asume que el centro cuenta con una aplicación propia para registrar las clases y los progresos de los perros, ya que no hay herramientas específicas para esta función.
- Supuesto: Los entrenadores y dueños accederán a la plataforma a través de interfaces web o móviles conectadas a los servicios propuestos.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-instalacion-cerraduras`

> Instalo y cambio cerraduras en casas y locales. Quiero organizar las visitas diarias de mis técnicos. Necesito controlar que cada instalación quede bien hecha antes de cobrar y que el cliente reciba un mensaje cuando el técnico está en camino.

**gemini**
- `ok` · Sistema de gestión de cobros y notificaciones para cerrajería
- La propuesta cubre el procesamiento de pagos y el envío de mensajes a los clientes cuando el técnico está en camino, utilizando herramientas especializadas para optimizar la operación del negocio.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de cobros: Permite gestionar el procesamiento de cobros en línea mediante una plataforma de pagos open source con licencia Apache-2.0 y alta actividad reciente.
- **Novu** (`novuhq/novu`), Envío de notificaciones: Facilita el envío de mensajes a los clientes para avisarles cuando el técnico está en camino, aunque su licencia no fue identificada por GitHub.
- Limitación: La propuesta no incluye la organización de las visitas diarias de los técnicos ni el control de calidad previo a la cobretura por falta de candidatos específicos en el catálogo.
- Supuesto: Se asume que el negocio cuenta con personal técnico que realiza visitas presenciales a domicilios.
- Supuesto: Se requiere una aplicación adicional no listada para gestionar la organización y ruteo de las visitas diarias de los técnicos.
- Supuesto: Se necesita un módulo de control de calidad o checklist para verificar que la instalación quedó bien hecha antes de registrar el cobro.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-orfebreria-plata`

> Trabajo la plata y hago joyas a medida. Quiero controlar el inventario de metales preciosos que uso en cada pieza. También necesito que una solicitud de diseño pase por mi aprobación antes de empezar y que los clientes puedan pagar el anticipo en línea.

**gemini**
- `ok` · Plataforma de pagos y orquestación para joyería
- Esta propuesta incluye la pasarela de pagos para gestionar los anticipos en línea de tus joyas. El control de inventario de metales y la aprobación de diseños de joyería quedaron sin herramientas en esta selección.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Permite que tus clientes puedan pagar el anticipo en línea mediante su plataforma de pagos open source con opciones de autohospedaje.
- Limitación: La propuesta no incluye la gestión de inventario de metales preciosos ni el flujo de aprobación para solicitudes de diseño.
- Supuesto: Suponemos que el taller de joyería cuenta con una infraestructura básica para desplegar servicios autohospedados.
- Supuesto: El pedido requiere control de inventario y flujos de aprobación de diseño que no tienen herramientas asignadas en este conjunto.
- Rúbrica: español _ · rationale _ · coherencia _

### `productora-quesos-frescos`

> Elaboro quesos frescos y madurados en pequeña escala. Quiero organizar la producción semanal según los pedidos. Necesito controlar la temperatura de las cámaras de maduración y que cada empleado de la planta vea solo las tareas de su área.

**gemini**
- `ok` · Sistema de monitoreo y control de acceso para quesería
- La propuesta implementa una plataforma de visualización de métricas para supervisar la temperatura y un sistema de gestión de identidad para restringir el acceso por áreas. Quedan sin resolver las necesidades de planificación de producción semanal y control de stock de quesos.
- **Grafana** (`grafana/grafana`), Visualización de temperatura: Permite visualizar métricas para controlar la temperatura de las cámaras de maduración mediante paneles y gráficos configurables.
- **Keycloak** (`keycloak/keycloak`), Gestión de accesos por roles: Proporciona gestión de identidad y acceso para asegurar que cada empleado de la planta vea solo las tareas de su área.
- Limitación: La propuesta no incluye herramientas para organizar la producción semanal ni para gestionar los pedidos de los clientes.
- Supuesto: Se asume que la quesería cuenta con sensores de temperatura compatibles con sistemas de métricas y una aplicación propia para la gestión de tareas de producción.
- Supuesto: El pedido requiere organizar la producción semanal y no hay herramientas candidatas para esa necesidad.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-cocina-vegetariana`

> Doy clases de cocina vegetariana a grupos pequeños. Quiero manejar los cupos de cada taller y las inscripciones. También necesito llevar el historial de recetas que cada alumno ha practicado y que solo el profesor del grupo vea las evaluaciones.

**gemini**
- `needs_clarification` · 
- Necesito un poco más de contexto para recomendarte herramientas.
- Pregunta: ¿Qué tipo de aplicación o plataforma prefieres utilizar para gestionar tus clases y registros?
- Pregunta: ¿Los alumnos y profesores accederán a la plataforma mediante algún sistema de usuario o inicio de sesión?
- Pregunta: ¿Necesitas procesar pagos en línea para las inscripciones a los talleres?
- Rúbrica: español _ · rationale _ · coherencia _

### `distribuidora-vinos-locales`

> Distribuyo vinos de productores locales a restaurantes. Quiero organizar las entregas semanales por zona. Necesito controlar que cada caja salga completa y que el sistema avise cuando un restaurante pide más de lo habitual.

**gemini**
- `ok` · Arquitectura de comunicacion para distribucion de vinos
- La propuesta implementa infraestructura de comunicacion para notificaciones mediante una herramienta centralizada. Quedan sin resolver las necesidades de organizacion de entregas por zona y el control de pedidos inusuales por parte de los restaurantes.
- **Novu** (`novuhq/novu`), Infraestructura de comunicacion: Permite gestionar la infraestructura de comunicacion y notificaciones para avisar sobre pedidos y eventos. Su licencia no fue identificada por GitHub y cuenta con un desarrollo muy activo.
- Limitación: No se cubrio la organizacion de entregas semanales por zona.
- Limitación: No se resolvio el control para verificar que cada caja salga completa.
- Limitación: No se incluyo deteccion automatica de volumenes de pedidos superiores a lo habitual.
- Supuesto: Se asume que el sistema de distribucion de vinos requiere un modulo logistico y de control de stock que no fue cubierto por los candidatos encontrados.
- Rúbrica: español _ · rationale _ · coherencia _

### `fabrica-velas-aromaticas-naturales`

> Fabrico velas aromáticas con esencias naturales. Quiero organizar los lotes de producción según los aromas más pedidos. Necesito controlar la temperatura de derretido de la cera y que las imágenes del catálogo carguen rápido para compradores de otros países.

**gemini**
- `ok` · Sistema de almacenamiento para imágenes de velas
- Se propone una solución de almacenamiento de objetos distribuido para acelerar la carga de las imágenes del catálogo internacionalmente. Quedan sin cubrir las necesidades de control de temperatura de derretido de cera y organización de lotes de producción por falta de candidatos específicos.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de imágenes: SeaweedFS es un sistema de almacenamiento distribuido para objetos S3 y sistemas de archivos con acceso a disco optimizado, ideal para que las imágenes del catálogo carguen de forma rápida.
- Limitación: No se resolvieron las necesidades de control de temperatura de la cera ni la organización de lotes de producción debido a la ausencia de candidatos adecuados en el catálogo.
- Supuesto: Se asume que la tienda online ya cuenta con una infraestructura web donde integrar el almacenamiento de imágenes.
- Supuesto: El negocio necesita herramientas de IoT o sensores para controlar la temperatura de derretido de la cera.
- Supuesto: Se requiere un sistema de gestión de inventario o ERP para organizar los lotes de producción.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-pintura-casas-interiores`

> Pinto casas e interiores por encargo. Quiero manejar el equipo de pintores y asignarles las obras. También necesito que una solicitud de cambio de color pase por mi aprobación y que se cobre el anticipo antes de empezar.

**gemini**
- `ok` · Sistema de gestion para empresa de pintura
- La propuesta cubre el cobro de anticipos en linea utilizando una plataforma de pagos. Quedan sin resolver la asignacion de obras a pintores y el flujo de aprobacion de cambios de color, ya que no se encontraron candidatos para esas necesidades.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Permite cobrar el anticipo antes de empezar gracias a su conectividad con multiples proveedores de pago de manera eficiente.
- Limitación: No cubre la asignacion de obras a pintores.
- Limitación: No incluye un flujo de aprobacion para solicitudes de cambio de color.
- Supuesto: Se asume que la empresa cuenta con pasarelas de pago compatibles con la plataforma elegida.
- Supuesto: El usuario necesita gestionar equipos y aprobaciones, funciones para las cuales no hay herramientas en este catalogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-tapiceria-muebles`

> Me dedico a retapizar sillones y sillas. Quiero llevar el registro de las telas usadas en cada trabajo y los costos. También necesito organizar los turnos de los tapiceros y que el cliente reciba un aviso cuando su mueble esté listo.

**gemini**
- `ok` · Sistema para gestión de tapicería y avisos
- Esta propuesta organiza el negocio de retapizado con una base de datos relacional robusta en Python y un sistema integral de notificaciones push para avisar a los clientes. Quedan sin herramientas específicas la organización de turnos de los tapiceros y el control detallado de los costos de las telas.
- **SQLModel** (`fastapi/sqlmodel`), Almacenamiento de registros de telas y trabajos: Permite gestionar bases de datos SQL en Python con un diseño enfocado en la simplicidad, compatibilidad y robustez, ideal para guardar los datos de las telas y trabajos.
- **Apprise** (`caronc/apprise`), Envío de avisos de muebles listos: Facilita el envío de notificaciones push para avisar a cada cliente cuando su mueble esté listo para retirar.
- Limitación: No se cubren las necesidades de organizar los turnos de los tapiceros ni de calcular específicamente los costos por falta de herramientas dedicadas en el catálogo.
- Supuesto: Se asume que el negocio cuenta con un entorno en Python para integrar la base de datos.
- Supuesto: El usuario necesitará canales adicionales para gestionar los turnos de los tapiceros, ya que no hay candidatos para esa necesidad en este sistema.
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-jardineria-mantenimiento`

> Ofrezco mantenimiento de jardines en residenciales. Quiero llevar los pedidos de poda y riego de cada cliente. También necesito que una solicitud de trabajo extra pase por aprobación del supervisor y que se cobre al final del mes.

**gemini**
- `ok` · Sistema de cobros y facturacion para servicios de jardineria
- La solucion propuesta cubre la gestion de cobros recurrentes y facturacion al final del mes mediante una plataforma especializada. Quedan fuera del alcance la gestion operativa de pedidos de poda y riego y el flujo de aprobacion de trabajos extra por falta de candidatos especificos.
- **Kill Bill** (`killbill/killbill`), Plataforma de cobros y facturacion: Resuelve la necesidad de cobrar al final del mes gestionando las suscripciones y pagos de forma automatizada. Su licencia es Apache-2.0 y cuenta con actividad reciente en el ultimo mes.
- Limitación: La propuesta no incluye la gestion de pedidos de poda y riego.
- Limitación: No se resuelve el circuito de aprobacion de solicitudes de trabajo extra por parte del supervisor.
- Supuesto: Se asume que los clientes tienen metodos de pago guardados para procesar el cobro al final del mes de forma automatica.
- Supuesto: Se necesita un modulo adicional para la recepcion de pedidos de poda y riego.
- Supuesto: Se requiere un sistema de flujos de trabajo para la aprobacion de solicitudes de trabajo extra por parte del supervisor.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-reparacion-electrodomesticos-pequenos`

> Reparo licuadoras, planchas y otros electrodomésticos pequeños. Quiero organizar los turnos de recepción y entrega. Necesito controlar que cada aparato salga funcionando y que el cliente reciba un mensaje cuando esté listo para recoger.

**gemini**
- `ok` · Sistema de notificaciones para taller de electrodomésticos
- Se propone una infraestructura de comunicación para enviar avisos a los clientes cuando sus aparatos estén listos para recoger. Quedan sin resolver las necesidades de gestión de turnos y control de calidad de las reparaciones, ya que no se encontraron candidatos para esas áreas en el catálogo.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Resuelve la solicitud de enviar un mensaje al cliente cuando el electrodoméstico esté listo para recoger mediante infraestructura de comunicación open-source. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- Limitación: No se cubren las necesidades de organizar turnos de recepción y entrega ni el control de funcionamiento de cada aparato.
- Limitación: La herramienta de notificaciones elegida posee licencia no identificada por GitHub.
- Supuesto: Se asume que el taller cuenta con acceso a internet para integrar la infraestructura de notificaciones.
- Supuesto: No se dispone de herramientas para la gestión de turnos ni para el control técnico de calidad de los aparatos reparados en los candidatos encontrados.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-pilates-grupal`

> Tengo un centro de pilates en grupos reducidos. Quiero manejar los horarios de las clases y los instructores. También necesito controlar la asistencia de cada alumno y que solo el instructor del grupo vea las notas de progreso.

**gemini**
- `needs_clarification` · 
- Necesito un poco más de contexto para recomendarte herramientas.
- Pregunta: ¿Qué tipo de aplicación o plataforma necesitas para gestionar el centro de pilates?
- Pregunta: ¿Los alumnos tendrán acceso a la plataforma para ver algo o es de uso exclusivo interno?
- Pregunta: ¿Cómo prefieres que los instructores accedan al sistema para ver los horarios y notas?
- Rúbrica: español _ · rationale _ · coherencia _

### `servicio-limpieza-oficinas-diaria`

> Brindo limpieza diaria de oficinas. Quiero organizar las rutas de los equipos de aseo. Necesito que cada supervisor vea solo los edificios de su zona y que el sistema avise si un equipo no marca la entrada a tiempo.

**gemini**
- `ok` · Sistema de alertas para limpieza de oficinas
- Esta propuesta incluye la infraestructura de notificaciones para avisar cuando los equipos de aseo no marquen su entrada a tiempo. Quedan sin resolver la organización de rutas y el control de acceso por zonas para supervisores, ya que no se encontraron herramientas para esas funciones entre los candidatos.
- **Apprise** (`caronc/apprise`), Envío de alertas: Apprise funciona como un marco de notificaciones push para enviar alertas cuando sea necesario. Su licencia es BSD-2-Clause y cuenta con mantenimiento activo.
- Limitación: No se cubren las necesidades de organizar rutas de los equipos de aseo ni de restringir la vista de los edificios por zonas para cada supervisor debido a la falta de candidatos específicos en el catálogo.
- Supuesto: Se asume que la empresa cuenta con un sistema externo de fichaje o control de asistencia que puede integrarse con la herramienta de alertas.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-pintura-automotriz-chica`

> Pinto y repinto vehículos en un taller pequeño. Quiero controlar el inventario de pinturas y diluyentes que uso. También necesito que una cotización pase por mi aprobación antes de empezar el trabajo y que el cliente pague el anticipo en línea.

**gemini**
- `ok` · Sistema de pagos en línea para talleres
- La propuesta integra una plataforma de pagos para procesar el anticipo del cliente en línea. Quedan fuera el control de inventario de pinturas y la gestión de aprobaciones de cotizaciones debido a la falta de herramientas específicas en los candidatos.
- **Hyperswitch** (`juspay/hyperswitch`), Procesador de pagos: Permite que los clientes realicen el pago del anticipo en línea de manera segura y conectada a múltiples proveedores de pagos.
- Limitación: No se resuelve el control de inventario de pinturas y diluyentes.
- Limitación: No se resuelve el flujo de aprobación de cotizaciones antes de iniciar los trabajos.
- Supuesto: Se asume que el taller cuenta con un sitio web o aplicación conectable a la plataforma de pagos.
- Supuesto: El negocio requiere necesidades de inventario y aprobaciones que no tienen soporte en los candidatos proporcionados.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-circo-infantil`

> Enseño malabares y acrobacia básica a niños. Quiero manejar los grupos por edad y nivel. También necesito controlar la asistencia a cada clase y que los padres puedan pagar la mensualidad desde su casa.

**gemini**
- `ok` · Plataforma de gestión para escuela de malabares
- Esta propuesta cubre los pagos en línea para que los padres puedan abonar las mensualidades desde sus casas. Quedan sin herramientas las necesidades de gestión de grupos por edad y nivel, y el control de asistencia.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos: Resuelve la necesidad de permitir que los padres paguen la mensualidad desde su casa mediante su plataforma de suscripciones y pagos de código abierto con licencia Apache-2.0 y mantenimiento reciente.
- Limitación: No se resolvieron las necesidades de manejar grupos por edad y nivel, ni de controlar la asistencia a cada clase debido a la falta de candidatos adecuados en el catálogo.
- Supuesto: Se asume que la escuela cuenta con un sitio web o portal donde se puede integrar la plataforma de pagos elegida.
- Supuesto: El pedido requiere gestionar grupos por edad y nivel, y controlar asistencia, pero no se encontraron candidatos para esas necesidades.
- Rúbrica: español _ · rationale _ · coherencia _
