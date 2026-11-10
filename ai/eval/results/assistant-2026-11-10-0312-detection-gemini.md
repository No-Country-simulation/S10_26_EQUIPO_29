# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 03:12. 25 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.1 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 95% |
| Techo de la búsqueda (top 5) | 85% |
| Techo con 5 candidatos | 85% |
| Eligió un aceptable (donde había) | 92% |
| Se abstuvo (donde no había) | 13% |
| Acierto de punta a punta (comparable entre k) | 79% |
| Sin caja donde el caso no tiene herramientas | 67% |
| Eligió el primer candidato | 49% |
| Consistencia entre corridas | 23% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 1 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 10 |
| Ids en el texto | 0 |
| Errores del proveedor | 8/75 |
| Tiempo total (mediana) | 4.7 s |
| Tiempo total (peor caso) | 17.3 s |
| Sobre 15 s | 2/67 |
| Entender · buscar · generar (mediana) | 1.8 s · 0.2 s · 2.7 s |
| Tokens entrada / salida (mediana) | 4528 / 846 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 25 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 92% | 94% | 91% | 91% – 94% |
| Se abstuvo (donde no había) | 27% | 0% | 10% | 0% – 27% |
| Acierto de punta a punta | 77% | 82% | 78% | 77% – 82% |
| Textos del modelo que hablan del catálogo | 6 | 1 | 3 | 1 – 6 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `cafeteria-de-barrio` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 2 |
| `cafeteria-de-barrio` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `cafeteria-de-barrio` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `mantenimiento-aires-acondicionados` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 2 |
| `mantenimiento-aires-acondicionados` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `mantenimiento-aires-acondicionados` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `centro-formacion-oficios` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `centro-formacion-oficios` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `centro-formacion-oficios` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tienda-productos-regionales` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 0 |
| `tienda-productos-regionales` · cms | strapi, payload | det 3/3 · techo 3 · eligió 3 |
| `fumigacion-agricola` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `fumigacion-agricola` · analytics | grafana, metabase | det 3/3 · techo 0 · eligió 0 |
| `fumigacion-agricola` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `escuela-cocina-presencial` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `escuela-cocina-presencial` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 3 |
| `escuela-cocina-presencial` · payments | hyperswitch | det 3/3 · techo 3 · eligió 1 |
| `reparacion-calzado` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `reparacion-calzado` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `excursiones-pesca-artesanal` · payments | hyperswitch | det 3/3 · techo 2 · eligió 2 |
| `excursiones-pesca-artesanal` · auth | keycloak, zitadel | det 2/3 · techo 2 · eligió 2 |
| `excursiones-pesca-artesanal` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `estudio-tatuajes` · auth | keycloak, zitadel | det 2/2 · techo 2 · eligió 2 |
| `estudio-tatuajes` · payments | hyperswitch | det 2/2 · techo 2 · eligió 2 |
| `estudio-tatuajes` · communication | postal, novu, apprise | det 2/2 · techo 2 · eligió 2 |
| `escuela-surf` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `escuela-surf` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `escuela-surf` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `organizacion-bodas` · cms | strapi, payload | det 3/3 · techo 3 · eligió 3 |
| `organizacion-bodas` · communication | postal | det 3/3 · techo 3 · eligió 3 |
| `organizacion-bodas` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `club-lectura-presencial` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `club-lectura-presencial` · cms | strapi, payload, Ghost | det 3/3 · techo 3 · eligió 2 |
| `club-lectura-presencial` · communication | novu, apprise | det 3/3 · techo 3 · eligió 1 |
| `hostal-familiar` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `hostal-familiar` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `hostal-familiar` · cms | strapi, payload | det 3/3 · techo 3 · eligió 3 |
| `hostal-familiar` · communication | postal, novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `limpieza-fachadas` · automation | (ninguno) | det 1/3 · eligió algo 0 |
| `limpieza-fachadas` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `limpieza-fachadas` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `cuidado-mascotas-domicilio` · auth | keycloak, zitadel | det 1/1 · techo 1 · eligió 1 |
| `cuidado-mascotas-domicilio` · communication | novu, apprise | det 1/1 · techo 1 · eligió 1 |
| `cuidado-mascotas-domicilio` · payments | hyperswitch | det 1/1 · techo 1 · eligió 1 |
| `agencia-traduccion` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `agencia-traduccion` · communication | postal | det 3/3 · techo 3 · eligió 3 |
| `agencia-traduccion` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `optica-familiar` · database | postgres, server, supabase | det 0/0 · techo 0 · eligió 0 |
| `optica-familiar` · auth | keycloak, zitadel | det 0/0 · techo 0 · eligió 0 |
| `optica-familiar` · communication | novu, apprise | det 0/0 · techo 0 · eligió 0 |
| `taller-bicicletas` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `taller-bicicletas` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `taller-bicicletas` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `distribuidora-productos-aseo` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 2 |
| `distribuidora-productos-aseo` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 3 |
| `distribuidora-productos-aseo` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `centro-refuerzo-escolar` · database | postgres, server, supabase | det 1/1 · techo 0 · eligió 0 |
| `centro-refuerzo-escolar` · auth | keycloak, zitadel | det 1/1 · techo 1 · eligió 1 |
| `centro-refuerzo-escolar` · communication | novu, apprise | det 1/1 · techo 1 · eligió 1 |
| `frutas-deshidratadas` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `frutas-deshidratadas` · data-processing | airflow, prefect, dagster | det 3/3 · techo 0 · eligió 0 |
| `frutas-deshidratadas` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `tienda-instrumentos-musicales` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `tienda-instrumentos-musicales` · search | meilisearch, typesense, OpenSearch | det 3/3 · techo 3 · eligió 3 |
| `tienda-instrumentos-musicales` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `instalacion-paneles-solares` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 2 |
| `instalacion-paneles-solares` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `instalacion-paneles-solares` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `galeria-arte-local` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `galeria-arte-local` · cms | strapi, payload | det 3/3 · techo 3 · eligió 2 |
| `galeria-arte-local` · analytics | posthog, umami | det 3/3 · techo 3 · eligió 3 |
| `taller-maquinas-coser` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 1 |
| `taller-maquinas-coser` · automation | (ninguno) | det 2/3 · eligió algo 1 |
| `taller-maquinas-coser` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `cafeteria-de-barrio`

> Tengo una cafetería pequeña y recibo muchos pedidos para llevar, pero no siempre sé qué productos se venden mejor. Quiero conocer las ventas por producto y por día para decidir qué preparar. También necesito conservar el historial de mis clientes frecuentes y sus compras, y recibir pagos sin depender únicamente del efectivo.

**gemini**
- `ok` · Sistema de gestión de ventas, clientes y pagos
- Esta propuesta integra herramientas para analizar las ventas diarias, almacenar el historial de compras de los clientes y procesar pagos electrónicos de forma segura en la cafetería.
- **Metabase** (`metabase/metabase`), Analítica de ventas: Permite explorar y visualizar las ventas en tableros interactivos para decidir qué preparar. Su licencia no fue identificada por GitHub y recibe mantenimiento constante.
- **SQLModel** (`fastapi/sqlmodel`), Base de datos de clientes: Facilita la persistencia y almacenamiento robusto del historial de clientes frecuentes y sus transacciones bajo licencia MIT.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Permite gestionar transacciones electrónicas de manera eficiente bajo licencia Apache-2.0, reduciendo la dependencia del efectivo.
- Limitación: No se incluye una solución específica de punto de venta (POS) para mostrador, la cual se requeriría para capturar los pedidos iniciales.
- Supuesto: Se asume que la cafetería cuenta con personal con conocimientos técnicos básicos para desplegar y mantener aplicaciones autohospedadas.
- Supuesto: El negocio dispone de un sistema POS o interfaz propia que se conecta mediante API con la plataforma de pagos y la base de datos.
- Rúbrica: español _ · rationale _ · coherencia _

### `mantenimiento-aires-acondicionados`

> Dirijo un negocio de mantenimiento de aires acondicionados para hogares y oficinas. Quiero conservar los datos de cada cliente, los equipos que tiene y las visitas de mantenimiento que hemos realizado. Necesito que el sistema recuerde cuándo corresponde una nueva visita y avise tanto al cliente como al técnico encargado.

**gemini**
- `ok` · Sistema de Gestion y Avisos para Mantenimiento de Aires Acondicionados
- Esta propuesta implementa una solucion integral para el negocio de mantenimiento de aires acondicionados mediante el uso de MariaDB para conservar los datos de clientes, equipos y visitas, Apache Airflow para programar las tareas de mantenimiento que recuerdan cuándo corresponde una nueva visita, y Apprise para enviar las notificaciones tanto a los clientes como a los técnicos encargados.
- **MariaDB** (`MariaDB/server`), Almacenamiento de datos de clientes, equipos y visitas: MariaDB es un sistema de gestion de bases de datos confiable que permite conservar de forma estructurada los datos de cada cliente, los equipos que tiene y las visitas de mantenimiento realizadas. Cuenta con la licencia GPL-2.0 y un mantenimiento muy activo.
- **Apache Airflow** (`apache/airflow`), Programacion de tareas de mantenimiento: Apache Airflow es una plataforma para programar, autorizar y monitorear flujos de trabajo de manera automatizada. Permite definir la logica temporal para recordar cuándo corresponde una nueva visita de mantenimiento. Su licencia es Apache-2.0 y se mantiene de forma constante.
- **Apprise** (`caronc/apprise`), Envio de avisos a clientes y tecnicos: Apprise simplifica el envio de notificaciones push que funcionan con practicamente cualquier plataforma de comunicacion. Permite alertar eficientemente tanto al cliente como al tecnico encargado sobre las proximas visitas. Cuenta con licencia BSD-2-Clause y actividad reciente.
- Limitación: La propuesta no incluye una interfaz grafica web especifica para la gestion diaria de los operadores del negocio, requiriendo desarrollo adicional o integracion con un CRM.
- Supuesto: Se asume que el negocio cuenta con un servidor o infraestructura propia para desplegar aplicaciones basadas en contenedores o servicios locales.
- Supuesto: Se asume que los clientes y tecnicos disponen de canales de comunicacion compatibles con las plataformas soportadas por el sistema de notificaciones.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-formacion-oficios`

> Soy responsable de un centro donde ofrecemos cursos presenciales de cocina, electricidad y mecánica básica. Quiero tener organizada la información de los estudiantes, sus inscripciones y los cursos que están realizando. Necesito que cada estudiante pueda ingresar a su cuenta y que los instructores solo puedan consultar la información que necesitan. También quiero recibir los pagos de las matrículas por internet.

**gemini**
- `ok` · Sistema Integral de Gestión Académica y Pagos
- Esta propuesta organiza la información de estudiantes y cursos mediante una base de datos relacional, gestiona el acceso de usuarios y roles diferenciados con una solución de identidad, y procesa los pagos de las matrículas a través de una plataforma de pagos dedicada.
- **SQLModel** (`fastapi/sqlmodel`), Almacenamiento de estudiantes, inscripciones y cursos: Permite organizar de forma sencilla y robusta la información de los estudiantes, sus inscripciones y los cursos que están realizando mediante bases de datos SQL.
- **Keycloak** (`keycloak/keycloak`), Autenticación de estudiantes e instructores: Facilita que cada estudiante pueda ingresar a su cuenta y que los instructores solo puedan consultar la información que necesitan mediante control de acceso.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos de matrículas: Permite recibir de manera eficiente los pagos de las matrículas por internet conectándose a múltiples proveedores.
- Supuesto: Se asume que la institución cuenta con infraestructura propia o en la nube para alojar los servicios seleccionados.
- Supuesto: Se asume que el procesamiento de pagos requiere integración con pasarelas de pago locales o internacionales compatibles.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-productos-regionales`

> Tengo una tienda donde vendo productos típicos de distintas regiones de Colombia. Quiero saber qué productos tienen más salida y de qué lugares vienen la mayoría de mis compradores. También necesito que la información de los productos, sus descripciones y sus fotografías se pueda actualizar fácilmente sin tener que pedirle ayuda a un programador.

**gemini**
- `ok` · Solución Open Source para Tienda de Productos Regionales
- Esta propuesta integra una plataforma de analítica web orientada a la privacidad para medir el tráfico y las ventas, junto con un sistema de gestión de contenidos de código abierto que permite actualizar descripciones y fotografías de productos sin conocimientos técnicos.
- **Umami** (`umami-software/umami`), Plataforma de analítica web: Permite registrar el tráfico, campañas y conversiones en un solo lugar para entender el comportamiento y los ingresos de la tienda, respetando la privacidad sin usar cookies.
- **Payload** (`payloadcms/payload`), CMS y panel de administración: Ofrece un panel de administración listo para usar que permite actualizar la información de los productos, sus descripciones y fotografías de manera sencilla.
- Limitación: Ninguna de las herramientas incluye de forma nativa pasarelas de pago o gestión de inventario físico detallado para productos de distintas regiones.
- Supuesto: Se asume que la tienda online ya cuenta con una interfaz de tienda y pasarela de pago operativa conectada a estas herramientas.
- Supuesto: Se asume que el personal encargado de actualizar los productos utilizará directamente el panel de administración del CMS.
- Rúbrica: español _ · rationale _ · coherencia _

### `fumigacion-agricola`

> Tengo una empresa que presta servicios de control de plagas a fincas y cultivos. Quiero tener el historial de los servicios realizados en cada finca y los datos de contacto de sus responsables. Además, me gustaría comparar los costos y los resultados de los trabajos por zona para saber dónde estamos ofreciendo el servicio con mayor frecuencia. Necesito que los clientes reciban un aviso antes de la fecha de su próxima visita.

**gemini**
- `ok` · Sistema de Gestión y Avisos para Control de Plagas
- La propuesta implementa una base de datos relacional para registrar historiales de servicios y contactos, un motor de análisis en tiempo real para evaluar costos y frecuencia por zona, y una plataforma de infraestructura de comunicación para enviar avisos programados a los clientes.
- **MariaDB** (`MariaDB/server`), Almacena historiales de servicios y datos de contacto: Permite registrar y consultar con seguridad el historial de los servicios realizados en cada finca y los datos de contacto de sus responsables.
- **ClickHouse** (`ClickHouse/ClickHouse`), Analiza costos y frecuencia por zona: Facilita comparar los costos y los resultados de los trabajos por zona para saber dónde se ofrece el servicio con mayor frecuencia.
- **Novu** (`novuhq/novu`), Gestiona los avisos previos a las visitas: Permite que los clientes reciban un aviso antes de la fecha de su próxima visita. Su licencia no fue identificada por GitHub.
- Limitación: La solución analítica no incluye reportes visuales nativos avanzados sin una herramienta de visualización complementaria.
- Supuesto: Se asume que la empresa dispone de personal técnico para configurar y mantener servidores autohospedados.
- Supuesto: Se asume que existe un sistema externo o un proceso programado que activa los avisos en las fechas correspondientes utilizando la infraestructura de comunicación.
- Rúbrica: español _ · rationale _ · coherencia _

### `escuela-cocina-presencial`

> Administro una escuela presencial de gastronomía con cursos cortos y talleres de fin de semana. Quiero organizar las inscripciones, la asistencia y el historial de cada estudiante. También me interesa conocer cuántas personas terminan los cursos y cuáles tienen mayor demanda para decidir qué talleres ofrecer el próximo semestre. Los estudiantes deberían poder pagar sus matrículas en línea.

**gemini**
- `ok` · Sistema de gestión académica y pagos para escuela
- Esta propuesta organiza las inscripciones, asistencia e historial académico de los estudiantes mediante una base de datos relacional en Python, analiza la demanda y finalización de los cursos con una herramienta de inteligencia de negocios, y procesa el pago de matrículas en línea a través de una plataforma de pagos open source.
- **SQLModel** (`fastapi/sqlmodel`), Almacena las inscripciones, la asistencia y el historial académico.: Permite trabajar con bases de datos SQL en Python de forma sencilla y robusta para organizar las inscripciones, la asistencia y el historial de cada estudiante. Utiliza licencia MIT y cuenta con mantenimiento reciente.
- **Metabase** (`metabase/metabase`), Analiza las finalizaciones de cursos y la demanda de talleres.: Facilita la creación de paneles para conocer cuántas personas terminan los cursos y cuáles tienen mayor demanda para decidir la oferta del próximo semestre. Su licencia no fue identificada por GitHub y recibe mantenimiento constante.
- **Kill Bill** (`killbill/killbill`), Procesa las matrículas en línea de los estudiantes.: Funciona como una plataforma de pagos y facturación por suscripción para que los estudiantes puedan pagar sus matrículas en línea. Cuenta con licencia Apache-2.0 y actualizaciones recientes.
- Limitación: Ninguna de las herramientas incluye de forma nativa una interfaz visual específica para la toma de asistencia diaria de los profesores en el aula.
- Supuesto: La escuela cuenta con personal técnico para desplegar y mantener los servicios seleccionados en un servidor propio o en la nube.
- Rúbrica: español _ · rationale _ · coherencia _

### `reparacion-calzado`

> Tengo un pequeño negocio de reparación de zapatos y bolsos. Quiero que mis clientes reciban un mensaje cuando su artículo esté listo para recoger y que puedan consultarme cualquier duda por un canal de comunicación. También necesito recibir anticipos y pagos completos sin tener que manejar todo en efectivo.

**gemini**
- `ok` · Sistema de gestión de pagos y comunicación para taller
- Esta propuesta integra herramientas para la comunicación con los clientes y el procesamiento de pagos electrónicos en su negocio de reparación, permitiendo notificaciones, atención de dudas y cobros sin efectivo.
- **Novu** (`novuhq/novu`), Canal de mensajes y soporte: Permite enviar mensajes a los clientes cuando su artículo esté listo y gestionar la comunicación de soporte. Su licencia no fue identificada por GitHub y su último cambio fue reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Procesador de pagos y anticipos: Facilita recibir anticipos y pagos completos sin depender exclusivamente del efectivo, mediante una plataforma de pagos de código abierto con licencia Apache-2.0 y actualización reciente.
- Limitación: Postal y OpenAI no fueron elegidos para comunicación, ya que se priorizó la infraestructura general de Novu.
- Limitación: Killbill, Lago, Apache Beam y Flink no fueron seleccionados para pagos por estar más enfocados en facturación por suscripción, uso o procesamiento de grandes volúmenes de datos.
- Supuesto: Se asume que el negocio cuenta con personal para operar las plataformas de comunicación y pagos.
- Supuesto: Se requiere integración con pasarelas de pago externas para procesar las transacciones de los clientes.
- Rúbrica: español _ · rationale _ · coherencia _

### `excursiones-pesca-artesanal`

> Organizo salidas de pesca artesanal para turistas y grupos pequeños en la costa. Necesito que las personas puedan pagar su reserva por internet y que los guías tengan una cuenta propia para consultar las salidas que tienen asignadas. También quiero enviar a los participantes un mensaje con la información de su excursión antes de cada salida.

**gemini**
- `ok` · Sistema open source para reservas y comunicacion de excursiones de pesca
- La propuesta integra una plataforma de pagos y un sistema de comunicacion para gestionar las reservas online y el envio de mensajes informativos a los participantes antes de cada salida. Quedan sin resolver mediante herramientas del catalogo la gestion de cuentas para que los guias consulten sus salidas asignadas.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos online: Permite que las personas puedan pagar su reserva por internet mediante una plataforma de pagos abierta y de alto rendimiento. Cuenta con licencia Apache-2.0 y actividad reciente.
- **Novu** (`novuhq/novu`), Envio de mensajes informativos: Facilita enviar a los participantes un mensaje con la informacion de su excursion antes de cada salida utilizando infraestructura de comunicacion de codigo abierto. Su licencia no esta identificada por GitHub y presenta actividad reciente.
- Limitación: No se cubren herramientas especificas en el catalogo para que los guias tengan una cuenta propia y puedan consultar las salidas que tienen asignadas.
- Supuesto: Se asume que el negocio cuenta con un sitio web o aplicacion propia para integrar las herramientas seleccionadas.
- Supuesto: El negocio requiere la funcionalidad de cuentas para guias y consulta de salidas asignadas, la cual no cuenta con candidatos especificos en el catalogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-tatuajes`

> Tengo un estudio de tatuajes y trabajo con varios artistas independientes. Quiero que cada artista pueda ingresar con su propia cuenta y que tenga acceso únicamente a sus compromisos de trabajo. También necesito que los clientes puedan pagar una parte del servicio para confirmar su reserva y que reciban un correo con las indicaciones generales antes de su visita.

**gemini**
- sin respuesta: LLMTimeout: gemini: sin respuesta en 15.0 s

### `escuela-surf`

> Soy dueño de una escuela de surf y ofrecemos clases para turistas y residentes. Quiero que los instructores puedan ingresar a su espacio de trabajo con permisos distintos a los de los administradores. También necesito enviar avisos cuando una clase se cambie por condiciones del clima y ofrecer a los estudiantes la posibilidad de pagar sus clases por internet.

**gemini**
- `ok` · Sistema de Gestion y Pagos para Escuela de Surf
- La propuesta implementa una plataforma centralizada para la gestion de identidades con Keycloak, notificaciones push para avisos meteorologicos mediante Apprise y una pasarela de pagos abierta con Hyperswitch para cobrar clases por internet.
- **Keycloak** (`keycloak/keycloak`), Gestion de identidad y roles: Resuelve la solicitud de permitir el acceso de instructores con permisos distintos a los administradores mediante su infraestructura de identidad y acceso. Utiliza licencia Apache-2.0 y cuenta con actividad reciente.
- **Apprise** (`caronc/apprise`), Envio de avisos: Permite enviar avisos a los estudiantes cuando una clase se cambie por condiciones del clima gracias a su soporte para notificaciones push en diversas plataformas. Cuenta con licencia BSD-2-Clause y mantenimiento activo.
- **Hyperswitch** (`juspay/hyperswitch`), Pasarela de pagos: Ofrece a los estudiantes la posibilidad de pagar sus clases por internet conectando multiples proveedores de pago. Posee licencia Apache-2.0 y un desarrollo muy activo.
- Limitación: La propuesta no incluye una interfaz grafica integrada para la creacion de horarios de clases de surf.
- Limitación: No se contempla un modulo especifico para la prevision meteorologica automatizada.
- Supuesto: Se asume que la escuela de surf cuenta con un sitio web o aplicacion propia donde integrar estos servicios independientes.
- Supuesto: Se asume que los instructores y administradores poseen dispositivos con acceso a internet para ingresar al espacio de trabajo.
- Rúbrica: español _ · rationale _ · coherencia _

### `organizacion-bodas`

> Me dedico a organizar bodas y celebraciones familiares. Quiero poder cambiar personalmente los textos, fotografías y ejemplos de eventos que aparecen en nuestra página, sin depender de otra persona cada vez que tengamos algo nuevo que mostrar. También necesito comunicarme con los clientes por correo y ofrecerles una forma de pagar anticipos para separar la fecha.

**gemini**
- `ok` · Plataforma open source para organización de bodas y eventos
- Esta propuesta integra herramientas para gestionar el contenido de la web de eventos, enviar correos a los clientes y procesar pagos en línea para anticipos.
- **Payload** (`payloadcms/payload`), Gestor de contenido web: Payload permite cambiar personalmente los textos, fotografías y ejemplos de eventos en la página mediante su panel de administración y backend en TypeScript.
- **Postal** (`postalserver/postal`), Plataforma de correo electrónico: Postal sirve para comunicarse con los clientes por correo gracias a su infraestructura de entrega para correos entrantes y salientes.
- **Hyperswitch** (`juspay/hyperswitch`), Plataforma de procesamiento de pagos: Hyperswitch permite ofrecer a los clientes una forma de pagar anticipos para separar la fecha mediante su conectividad con múltiples proveedores de pago.
- Limitación: La propuesta no incluye pasarelas de pago específicas nativas configuradas, requiriendo integrar proveedores externos a través de Hyperswitch.
- Supuesto: Se asume que el negocio cuenta con la infraestructura técnica necesaria para autohospedar aplicaciones Node.js, Ruby y Rust.
- Supuesto: Se asume que los clientes acceden a la web y realizan los pagos desde navegadores web estándar.
- Rúbrica: español _ · rationale _ · coherencia _

### `club-lectura-presencial`

> Coordino un club de lectura que organiza encuentros en varias ciudades. Quiero que los miembros tengan una cuenta para consultar las actividades a las que están invitados y que los coordinadores puedan gestionar sus propios grupos. También necesito publicar novedades, reseñas y fotografías de los encuentros sin tener que pedir ayuda técnica. Para mantener a todos informados, quiero enviar avisos cuando se anuncie una nueva actividad.

**gemini**
- `ok` · Sistema Open Source para Club de Lectura
- La propuesta integra herramientas de autenticación, gestión de contenidos y notificaciones para cubrir las necesidades del club de lectura. Los usuarios podrán gestionar sus cuentas y grupos, publicar novedades de forma autónoma y recibir avisos sobre nuevas actividades.
- **Keycloak** (`keycloak/keycloak`), Autenticación: Keycloak provee una infraestructura de identidad y acceso de código abierto bajo licencia Apache-2.0, ideal para la gestión de cuentas y roles de usuario en el club de lectura.
- **Ghost** (`TryGhost/Ghost`), Gestión de contenidos: Ghost permite publicar novedades, reseñas y fotografías sin requerir ayuda técnica, facilitando la creación de contenido bajo licencia MIT.
- **Listmonk** (`knadh/listmonk`), Envío de avisos: Listmonk permite enviar avisos y gestionar campañas de correo electrónico para mantener informados a los miembros sobre nuevas actividades, bajo licencia AGPL-3.0.
- Limitación: Ninguna de las herramientas incluye de forma nativa una función específica para organizar grupos por ciudad sin configuración adicional.
- Supuesto: Se asume que los coordinadores tienen conocimientos básicos para administrar las herramientas seleccionadas.
- Supuesto: El club de lectura cuenta con infraestructura propia para alojar las aplicaciones autohospedadas.
- Rúbrica: español _ · rationale _ · coherencia _

### `hostal-familiar`

> Administro un hostal familiar y recibimos huéspedes de diferentes países. Necesito que los huéspedes puedan realizar pagos en línea y que el personal tenga cuentas con permisos diferentes según sus responsabilidades. Además, quiero actualizar por mi cuenta la información del alojamiento, las fotografías y las recomendaciones para los visitantes. Me gustaría que los huéspedes recibieran una confirmación por correo después de hacer una reserva.

**gemini**
- `ok` · Solución tecnológica para gestión de hostal
- Esta propuesta integra herramientas open source para procesar pagos en línea, gestionar la autenticación y permisos del personal, administrar la información del hostal mediante un CMS y asegurar el envío de confirmaciones por correo electrónico a los huéspedes.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos en línea: Permite realizar pagos en línea mediante su plataforma de pagos composable con licencia Apache-2.0 y actividad reciente, conectándose a múltiples proveedores.
- **Keycloak** (`keycloak/keycloak`), Gestión de cuentas y permisos del personal: Ofrece gestión de identidad y acceso open source bajo licencia Apache-2.0 para administrar las cuentas y permisos del personal según sus responsabilidades.
- **Payload** (`payloadcms/payload`), Administración de contenido y fotografías del alojamiento: Permite actualizar por cuenta propia la información del alojamiento, las fotografías y las recomendaciones gracias a su panel de administración instantáneo y licencia MIT.
- **Postal** (`postalserver/postal`), Envío de correos de confirmación: Proporciona una plataforma de entrega de correo completamente funcional bajo licencia MIT para asegurar que los huéspedes reciban una confirmación por correo.
- Limitación: La solución no incluye de forma nativa un motor de reservas completo para la disponibilidad de habitaciones, el cual requeriría lógica adicional en el CMS.
- Supuesto: Se asume que el hostal cuenta con infraestructura propia o servidores VPS para realizar el despliegue autohospedado de las herramientas seleccionadas.
- Supuesto: El personal utiliza las cuentas de autenticación centralizadas para acceder al panel de administración del hostal.
- Rúbrica: español _ · rationale _ · coherencia _

### `limpieza-fachadas`

> Tengo una empresa que realiza limpieza de fachadas y espacios exteriores para edificios comerciales. Quiero que las solicitudes de servicio se distribuyan automáticamente entre los supervisores según la zona donde trabajen. También necesito enviar avisos a los clientes cuando tengamos que cambiar la fecha de una visita y recibir pagos por los servicios contratados.

**gemini**
- `ok` · Arquitectura open source para empresa de limpieza exterior
- La propuesta incluye herramientas open source para gestionar los pagos de los servicios y enviar notificaciones a los clientes sobre cambios de fecha. No se encontraron herramientas idóneas para automatizar la distribución de solicitudes de servicio entre supervisores según la zona.
- **Apprise** (`caronc/apprise`), Envío de notificaciones a clientes: Apprise permite enviar notificaciones push y avisos que se conectan con casi cualquier plataforma. Cuenta con la licencia BSD-2-Clause y actividad reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Hyperswitch es una plataforma de pagos open source que permite la conectividad con múltiples proveedores para recibir pagos. Posee licencia Apache-2.0 y mantenimiento constante.
- Limitación: Automatización: ninguna de las herramientas encontradas encaja. Ansible es una plataforma de automatización de IT, pero no realiza la distribución lógica de solicitudes de servicio comerciales según la zona geográfica de los supervisores.
- Limitación: No se encontró ninguna herramienta en los candidatos que resuelva la distribución automática de solicitudes de servicio entre supervisores según la zona.
- Supuesto: Se asume que la empresa cuenta con pasarelas de pago compatibles con la plataforma de pagos elegida para procesar las transacciones.
- Supuesto: Se asume que los clientes disponen de medios digitales para recibir las notificaciones de avisos de visita.
- Rúbrica: español _ · rationale _ · coherencia _

### `cuidado-mascotas-domicilio`

> Tengo un negocio de cuidado de mascotas a domicilio y contamos con varios cuidadores. Quiero que cada cuidador tenga una cuenta para consultar únicamente los servicios que tiene asignados. Necesito que los dueños de las mascotas reciban mensajes cuando el cuidador llegue y cuando termine la visita. También quiero que puedan pagar los servicios sin tener que entregar dinero en efectivo.

**gemini**
- sin respuesta: LLMTimeout: gemini: sin respuesta en 15.0 s

### `agencia-traduccion`

> Tengo una pequeña agencia de traducción e interpretación y trabajo con profesionales independientes. Necesito que cada traductor pueda ingresar a su cuenta y consultar únicamente los encargos que tiene asignados. Quiero que los clientes puedan solicitar cambios o hacer preguntas por correo y que reciban una notificación cuando su trabajo esté terminado. También necesito cobrar los servicios por internet.

**gemini**
- `ok` · Sistema de gestión para agencia de traducción
- Propuesta de infraestructura open source para una agencia de traducción que incluye control de acceso para traductores, plataforma de correo para la comunicación con clientes y pasarela de pagos en línea.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y autenticación: Permite que cada traductor ingrese a su cuenta y administre sus credenciales de manera segura gracias a su plataforma de gestión de identidad con licencia Apache-2.0.
- **Postal** (`postalserver/postal`), Plataforma de correo electrónico: Facilita la recepción de preguntas de los clientes y el envío automático de notificaciones cuando el trabajo esté terminado, utilizando una plataforma con licencia MIT.
- **Hyperswitch** (`juspay/hyperswitch`), Plataforma de pagos en línea: Permite procesar los cobros de los servicios por internet de forma segura y conectarse a múltiples proveedores de pagos mediante una solución con licencia Apache-2.0.
- Limitación: La solución de pagos elegida requiere integración técnica adicional para enlazarse con los proveedores de pasarelas de pago específicas que utilice el negocio.
- Supuesto: Se asume que la agencia cuenta con servidores propios o capacidad de alojamiento en la nube para desplegar las herramientas autohospedadas.
- Supuesto: Se asume que la asignación de encargos a los traductores se gestionará mediante el desarrollo de una interfaz propia o la integración complementaria con la plataforma de autenticación.
- Rúbrica: español _ · rationale _ · coherencia _

### `optica-familiar`

> Soy dueña de una óptica de barrio y manejamos pedidos de lentes, monturas y reparaciones. Quiero llevar un registro de clientes, fórmulas, compras y el estado de cada pedido para no perder la información. También necesito que los vendedores ingresen con su propia cuenta y que yo pueda limitar quién modifica precios o elimina registros. Cuando un pedido esté listo, quisiera avisarle al cliente sin tener que llamar uno por uno.

**gemini**
- sin respuesta: LLMTimeout: gemini: sin respuesta en 15.0 s

### `taller-bicicletas`

> En mi taller recibimos bicicletas para mantenimiento y reparación, y a veces se nos mezclan los turnos con los repuestos. Necesito conservar el historial de cada bicicleta, los trabajos realizados y las piezas usadas. Quiero que el sistema encuentre rápido una reparación anterior cuando busque por el nombre del cliente o por el número del marco. También quisiera que se creen recordatorios de revisión cuando una bicicleta lleve varios meses sin volver.

**gemini**
- `ok` · Sistema de gestión y mantenimiento para taller de bicicletas
- Esta propuesta incluye un almacenamiento distribuido para los historiales de mantenimiento y piezas, un motor de búsqueda rápida por nombre de cliente y número de marco, y una herramienta de notificaciones para los recordatorios de revisión periódica.
- **etcd** (`etcd-io/etcd`), Almacenamiento de datos: Permite conservar de forma confiable el historial de cada bicicleta, los trabajos realizados y las piezas usadas. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda rápida: Permite encontrar rápidamente una reparación anterior cuando se busque por el nombre del cliente o por el número del marco. Su licencia no fue identificada por GitHub y presenta actividad reciente.
- **Apprise** (`caronc/apprise`), Envío de recordatorios: Facilita la creación de recordatorios de revisión cuando una bicicleta lleve varios meses sin volver. Utiliza licencia BSD-2-Clause y se mantiene actualizado.
- Limitación: Ninguno de los candidatos cubre por sí solo la lógica de negocio específica de agendamiento de turnos para evitar confusiones.
- Supuesto: Se asume que el taller cuenta con infraestructura para alojar servicios autohospedados.
- Supuesto: Se requiere un desarrollo adicional para conectar las herramientas seleccionadas con la interfaz de usuario del taller.
- Rúbrica: español _ · rationale _ · coherencia _

### `distribuidora-productos-aseo`

> Administro una distribuidora de productos de aseo que vende a tiendas y restaurantes pequeños. Quiero registrar cada venta, cliente, producto y cantidad disponible para saber qué tenemos y cuánto debemos reponer. Me interesa ver cuáles productos se venden más por mes y qué clientes han reducido sus pedidos. Además, necesito que los clientes puedan pagar sus facturas pendientes por internet.

**gemini**
- `ok` · Sistema de gestión y pagos para distribuidora
- Esta propuesta integra una base de datos relacional para registrar inventario y ventas, una herramienta de inteligencia de negocio para la analítica comercial y una plataforma de orquestación de pagos en línea.
- **SQLModel** (`fastapi/sqlmodel`), Gestión de datos transaccionales: Permite interactuar con bases de datos SQL en Python con simplicidad y robustez, ideal para registrar cada venta, cliente, producto y la cantidad disponible.
- **Metabase** (`metabase/metabase`), Analítica y reportes de ventas: Facilita la creación de paneles para ver cuáles productos se venden más por mes y analizar el comportamiento de los clientes. Su licencia no fue identificada por GitHub.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos en línea: Permite habilitar conectividad con múltiples proveedores para que los clientes puedan pagar sus facturas pendientes por internet.
- Limitación: Ninguna de las herramientas de analítica seleccionadas incluye de forma nativa análisis predictivo automatizado para reducción de pedidos sin configuración adicional.
- Supuesto: Se asume que la distribuidora cuenta con un servidor propio o infraestructura en la nube para alojar las herramientas autohospedadas.
- Supuesto: Se asume que la pasarela de pagos elegida se integrará con un procesador externo compatible para recibir transacciones reales.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-refuerzo-escolar`

> Dirijo un centro de refuerzo escolar con profesores por horas y estudiantes de varios colegios. Quiero mantener el historial de matrículas, horarios, asistencia y pagos de cada estudiante. Los acudientes y profesores deben entrar con cuentas diferentes, y cada grupo solo debería ver la información que le corresponde. También quiero enviar avisos a las familias cuando cambie un horario o se acerque una evaluación.

**gemini**
- sin respuesta: LLMTimeout: gemini: sin respuesta en 15.0 s

### `frutas-deshidratadas`

> Mi familia produce frutas deshidratadas y mezclas de frutos secos para tiendas saludables. Quiero registrar las compras de materia prima, los lotes de producción, las cantidades empacadas y los pedidos de cada comercio. También necesito calcular cuánto material se consume y cuánto producto terminado queda después de cada jornada. Quisiera enviar a cada comercio una confirmación del pedido y un aviso cuando salga el despacho.

**gemini**
- `ok` · Sistema de gestión para producción y despacho de frutos
- Esta propuesta organiza el registro de inventarios y pedidos, el cálculo de consumo de materiales y la comunicación de confirmaciones y despachos para el negocio familiar de frutos deshidratados.
- **SQLAlchemy** (`sqlalchemy/sqlalchemy`), Manejo de la base de datos: Permite construir y gestionar la base de datos necesaria para registrar las compras de materia prima, los lotes de producción y los pedidos de cada comercio.
- **Lago** (`getlago/lago`), Seguimiento de consumo: Facilita el seguimiento de consumo para calcular cuánto material se consume y cuánto producto terminado queda después de cada jornada.
- **Apprise** (`caronc/apprise`), Envío de notificaciones: Permite enviar a cada comercio una confirmación del pedido y un aviso cuando salga el despacho mediante notificaciones integradas.
- Limitación: No se incluye una interfaz de usuario visual para la captura diaria de datos en la planta de producción.
- Supuesto: Se asume que el negocio cuenta con personal técnico para desarrollar una aplicación propia utilizando SQLAlchemy.
- Supuesto: Se asume que los comercios receptores disponen de canales compatibles con las notificaciones de Apprise.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-instrumentos-musicales`

> Soy dueño de una tienda de instrumentos musicales y accesorios, y tengo productos de muchos modelos y características. Quiero llevar un registro de existencias, proveedores, compras y ventas para saber qué hay disponible. Mis clientes deberían poder encontrar artículos por tipo, rango de precio o características, aunque no escriban el nombre exacto. También quiero aceptar pagos en línea para los pedidos que hacemos por encargo.

**gemini**
- `ok` · Sistema open source para tienda de instrumentos
- Esta propuesta integra un motor de búsqueda avanzada para que los clientes encuentren instrumentos y una plataforma de pagos en línea para pedidos por encargo. Quedan sin solución automatizada la base de datos para existencias y proveedores.
- **Meilisearch** (`meilisearch/meilisearch`), Motor de búsqueda: Permite que los clientes encuentren artículos por tipo, precio o características mediante búsqueda híbrida impulsada por inteligencia artificial. Su licencia no está identificada por GitHub y tiene mantenimiento reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Procesador de pagos: Acepta pagos en línea para los pedidos que hacen por encargo mediante una plataforma de pagos open source componible y de alto rendimiento con licencia Apache-2.0.
- Limitación: Bases de datos: no se encontraron herramientas del catálogo para «Quiero llevar un registro de existencias, proveedores, compras y ventas para saber qué hay disponible».
- Limitación: No se incluye software para llevar el registro de existencias, proveedores y compras.
- Supuesto: Se asume que la tienda cuenta con una interfaz web propia para integrar el buscador y la pasarela de pagos.
- Supuesto: El registro de existencias, proveedores y compras requiere una solución de base de datos que no fue provista en el catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `instalacion-paneles-solares`

> Mi empresa instala paneles solares en casas y pequeños comercios, y damos mantenimiento después de la instalación. Quiero guardar los datos de cada cliente, la dirección, los equipos instalados, las visitas y el historial de mantenimiento. Necesito que los técnicos puedan entrar desde el celular, pero que solo el personal administrativo vea los costos y los datos de facturación. También me gustaría guardar fotos de la instalación y documentos de garantía asociados a cada proyecto.

**gemini**
- `ok` · Arquitectura de Software para Empresa de Paneles Solares
- Propuesta de sistema para la gestión de clientes, instalaciones y mantenimiento de paneles solares, cubriendo almacenamiento de datos, autenticación con roles y gestión de archivos multimedia. Faltan componentes para la interfaz móvil de los técnicos y la lógica de negocio específica.
- **MariaDB** (`MariaDB/server`), Almacena los datos de clientes, direcciones, equipos, visitas e historial de mantenimiento.: Permite guardar los datos de cada cliente, la dirección, los equipos instalados, las visitas y el historial de mantenimiento en una base de datos robusta y confiable.
- **Keycloak** (`keycloak/keycloak`), Gestiona la autenticación y el control de acceso basado en roles para técnicos y personal administrativo.: Asegura que solo el personal administrativo vea los costos y los datos de facturación mediante la gestión de identidades y accesos.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacena las fotos de la instalación y los documentos de garantía asociados a cada proyecto.: Permite guardar fotos de la instalación y documentos de garantía asociados a cada proyecto de manera eficiente.
- Limitación: No se incluye una interfaz móvil nativa para los técnicos, ya que las herramientas seleccionadas proveen backend y servicios de infraestructura.
- Limitación: La solución no incluye la lógica de negocio para generar reportes automáticos de mantenimiento.
- Supuesto: Se asume que la empresa cuenta con una aplicación desarrollada a medida que se conecta a estas herramientas para la interfaz de los técnicos en el celular y la administración.
- Supuesto: Se requiere el desarrollo de una interfaz móvil para que los técnicos puedan ingresar desde el celular.
- Rúbrica: español _ · rationale _ · coherencia _

### `galeria-arte-local`

> Gestiono una galería que también vende obras de artistas locales por encargo. Necesito mantener un catálogo de obras con sus autores, medidas, precios, disponibilidad y movimientos cuando una pieza se presta o se vende. Quiero poder editar por mi cuenta los textos y las imágenes que aparecen en la página de la galería, sin pedir ayuda cada vez. Además, me interesa conocer qué obras reciben más consultas y cuáles terminan en venta.

**gemini**
- `ok` · Sistema integral para la gestion de galeria de arte
- Esta propuesta organiza la galeria mediante una base de datos relacional para el catalogo de obras y movimientos, un gestor de contenidos para la pagina web y una plataforma de analitica para medir consultas y ventas.
- **PostgreSQL** (`postgres/postgres`), Almacena obras, autores, precios, disponibilidad y movimientos: Responde al manejo del catalogo y movimientos de piezas mediante una base de datos robusta. Su licencia no fue identificada por GitHub y tiene actividad reciente constante.
- **Payload** (`payloadcms/payload`), Administra los textos e imagenes de la pagina web de la galeria: Permite editar por cuenta propia los contenidos que aparecen en la galeria gracias a su panel de administracion instantaneo. Cuenta con licencia MIT y actualizacion reciente.
- **Umami** (`umami-software/umami`), Mide las consultas y ventas de las obras en la galeria: Ayuda a conocer que obras reciben mas consultas y cuales terminan en venta registrando trafico y conversiones en un solo lugar. Posee licencia MIT y mantenimiento activo.
- Limitación: La solucion no incluye un modulo especifico para la pasarela de pagos de los encargos de obras.
- Supuesto: Se asume que la galeria cuenta con infraestructura propia o servidores para autohospedar estas herramientas open source.
- Supuesto: Se asume que los pagos por encargos se registran a traves de eventos en la plataforma de analitica.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-maquinas-coser`

> En mi taller reparamos máquinas de coser domésticas e industriales. Quiero registrar los clientes, los equipos que recibimos, los diagnósticos, las cotizaciones y las reparaciones realizadas para consultar después cada caso. Cuando un cliente acepte una cotización, quisiera que se genere automáticamente la orden de trabajo y se asigne al técnico disponible. También necesito mandar mensajes al cliente para informarle cuando el equipo esté listo o cuando debamos esperar una pieza.

**gemini**
- `ok` · Sistema open source para taller de reparación de máquinas
- Esta propuesta integra herramientas open source para cubrir el almacenamiento de datos relacionales del negocio y la infraestructura de comunicación para notificaciones a los clientes. La automatización de flujos operativos requiere desarrollos a medida complementarios, ya que las herramientas disponibles están enfocadas en infraestructura o ingeniería de datos.
- **SQLModel** (`fastapi/sqlmodel`), Almacena clientes, equipos, diagnósticos y cotizaciones.: Permite gestionar bases de datos SQL en Python diseñadas para simplicidad y robustez, usando licencia MIT y con actividad reciente.
- **Novu** (`novuhq/novu`), Envía mensajes sobre el estado de las reparaciones.: Provee infraestructura de comunicación para enviar notificaciones a los clientes. Su licencia no fue identificada por GitHub y muestra actividad reciente.
- Limitación: Automatización: ninguna de las herramientas encontradas encaja. Los candidatos encontrados están orientados a ingeniería de datos y automatización de sistemas o certificados, por lo que no resuelven directamente la lógica de negocio de asignar tareas a técnicos según cotizaciones.
- Supuesto: Se asume que el taller cuenta con personal técnico disponible para recibir asignaciones.
- Supuesto: Se asume la necesidad de una interfaz web o aplicación propia para interactuar con la base de datos de reparaciones.
- Rúbrica: español _ · rationale _ · coherencia _
