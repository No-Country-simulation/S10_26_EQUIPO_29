# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-09 a las 08:33. 16 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 93% |
| Techo de la búsqueda (top 5) | 79% |
| Techo con 5 candidatos | 79% |
| Eligió un aceptable (donde había) | 94% |
| Se abstuvo (donde no había) | 25% |
| Acierto de punta a punta (comparable entre k) | 75% |
| Sin caja donde el caso no tiene herramientas | 0% |
| Eligió el primer candidato | 56% |
| Consistencia entre corridas | 12% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 6 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 22 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/48 |
| Tiempo total (mediana) | 5.0 s |
| Tiempo total (peor caso) | 6.1 s |
| Sobre 15 s | 0/48 |
| Entender · buscar · generar (mediana) | 1.7 s · 0.3 s · 3.0 s |
| Tokens entrada / salida (mediana) | 4506 / 997 |
| Esperas (límite de uso o error temporal) | 30.0 s |

Evidencia direccional: 16 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 93% | 100% | 88% | 88% – 100% |
| Se abstuvo (donde no había) | 8% | 29% | 36% | 8% – 36% |
| Acierto de punta a punta | 76% | 79% | 69% | 69% – 79% |
| Textos del modelo que hablan del catálogo | 7 | 10 | 5 | 5 – 10 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `taller-reparacion-electrodomesticos` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `taller-reparacion-electrodomesticos` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `taller-reparacion-electrodomesticos` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `finca-cafetera` · data-processing | airflow, prefect, dagster | det 1/3 · techo 1 · eligió 1 |
| `finca-cafetera` · analytics | grafana, metabase | det 2/3 · techo 1 · eligió 1 |
| `finca-cafetera` · automation | airflow, prefect, dagster | det 2/3 · techo 2 · eligió 2 |
| `finca-cafetera` · communication | postal, novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `estudio-arquitectura` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `estudio-arquitectura` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `estudio-arquitectura` · cms | strapi, payload | det 3/3 · techo 3 · eligió 2 |
| `estudio-arquitectura` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `vivero-plantas` · cms | strapi, payload | det 3/3 · techo 3 · eligió 2 |
| `vivero-plantas` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `vivero-plantas` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `vivero-plantas` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `club-futbol-aficionado` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `club-futbol-aficionado` · payments | killbill, lago | det 3/3 · techo 3 · eligió 3 |
| `club-futbol-aficionado` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `club-futbol-aficionado` · analytics | grafana, metabase | det 3/3 · techo 2 · eligió 2 |
| `centro-cuidado-infantil` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `centro-cuidado-infantil` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `centro-cuidado-infantil` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `centro-cuidado-infantil` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `mantenimiento-piscinas` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `mantenimiento-piscinas` · automation | (ninguno) | det 3/3 · eligió algo 3 |
| `mantenimiento-piscinas` · communication | novu, apprise | det 3/3 · techo 3 · eligió 2 |
| `mantenimiento-piscinas` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `empresa-reciclaje` · data-processing | airflow, prefect, dagster | det 3/3 · techo 0 · eligió 0 |
| `empresa-reciclaje` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 3 |
| `empresa-reciclaje` · automation | airflow, prefect, dagster | det 3/3 · techo 3 · eligió 3 |
| `parqueadero-multinivel` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `parqueadero-multinivel` · cache | valkey, redis | det 3/3 · techo 3 · eligió 3 |
| `parqueadero-multinivel` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `parqueadero-multinivel` · observability | prometheus, grafana, opentelemetry-collector | det 3/3 · techo 3 · eligió 3 |
| `taller-carpinteria` · database | postgres, server, supabase | det 3/3 · techo 1 · eligió 1 |
| `taller-carpinteria` · data-processing | (ninguno) | det 3/3 · eligió algo 3 |
| `taller-carpinteria` · analytics | grafana, metabase | det 3/3 · techo 0 · eligió 0 |
| `taller-carpinteria` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `oficina-juridica` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `oficina-juridica` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `oficina-juridica` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `oficina-juridica` · communication | postal, novu, apprise | det 3/3 · techo 3 · eligió 2 |
| `fabrica-quesos` · data-processing | flink, beam | det 3/3 · techo 3 · eligió 3 |
| `fabrica-quesos` · analytics | grafana, metabase | det 2/3 · techo 1 · eligió 1 |
| `fabrica-quesos` · messaging | kafka | det 3/3 · techo 0 · eligió 0 |
| `fabrica-quesos` · observability | prometheus, grafana, opentelemetry-collector | det 3/3 · techo 3 · eligió 3 |
| `estudio-fotografico` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `estudio-fotografico` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `estudio-fotografico` · payments | hyperswitch | det 3/3 · techo 3 · eligió 2 |
| `estudio-fotografico` · communication | novu, apprise | det 3/3 · techo 3 · eligió 3 |
| `libreria-independiente` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |
| `libreria-independiente` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `libreria-independiente` · payments | hyperswitch | det 3/3 · techo 3 · eligió 2 |
| `libreria-independiente` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 1 |
| `editorial-libros` · cms | strapi, payload | det 3/3 · techo 3 · eligió 3 |
| `editorial-libros` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `editorial-libros` · communication | listmonk, postal | det 3/3 · techo 3 · eligió 3 |
| `tostadora-cafe` · data-processing | airflow, prefect, dagster | det 0/3 · techo 0 · eligió 0 |
| `tostadora-cafe` · ai | scikit-learn | det 3/3 · techo 0 · eligió 0 |
| `tostadora-cafe` · analytics | grafana, metabase | det 2/3 · techo 0 · eligió 0 |
| `tostadora-cafe` · database | postgres, server, supabase | det 3/3 · techo 0 · eligió 0 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `taller-reparacion-electrodomesticos`

> Soy dueño de un negocio que repara neveras, lavadoras y otros electrodomésticos. Quiero conservar una ficha de cada cliente y equipo, con el historial de reparaciones y los repuestos utilizados. También necesito que cada técnico entre con su propia cuenta y vea solo las órdenes que tiene asignadas, y que podamos adjuntar fotos del estado en que recibimos cada aparato.

**gemini**
- `ok` · Sistema open source para taller de reparación de electrodomésticos
- Esta propuesta integra una base de datos en memoria y de estructura para consultas rápidas, un sistema robusto de identidad y acceso para los técnicos, y un almacenamiento de objetos para las fotos de los aparatos. Se cubren todas las necesidades del negocio de reparación de neveras y lavadoras.
- **Redis** (`redis/redis`), Base de datos y caché: Redis permite construir aplicaciones orientadas a datos en tiempo real mediante su motor de base de datos y servidor de estructuras de datos. Su licencia no está identificada por GitHub y cuenta con actividad reciente en sus repositorios, facilitando el manejo rápido de fichas y repuestos con un cambio reciente hace 1 mes.
- **Keycloak** (`keycloak/keycloak`), Autenticación de técnicos: Keycloak proporciona una infraestructura completa de identidad y acceso open source bajo licencia Apache-2.0. Con un último cambio reciente, permite que cada técnico acceda con su propia cuenta de forma segura.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar millones de archivos con acceso rápido a disco. Cuenta con licencia Apache-2.0 y actividad constante, permitiendo adjuntar las fotos del estado de los aparatos con eficiencia.
- Limitación: Ninguna de las herramientas elegidas incluye una interfaz gráfica específica para la gestión de reparaciones de electrodomésticos, por lo que se requiere desarrollar un panel de control a medida.
- Supuesto: Se asume que el negocio cuenta con infraestructura en la nube o servidores locales para correr contenedores.
- Supuesto: Se asume que la aplicación principal se encargará de filtrar las órdenes específicas para cada técnico utilizando la identidad validada.
- Rúbrica: español _ · rationale _ · coherencia _

### `finca-cafetera`

> Administro una finca cafetera familiar en el Eje Cafetero. Quiero reunir las mediciones de lluvia, humedad y cosecha de varias parcelas y convertirlas en un informe semanal. También necesito comparar el rendimiento por parcela y que el informe se prepare automáticamente y se envíe a mi correo cada lunes.

**gemini**
- `ok` · Sistema automatizado para informes agrícolas semanales en finca cafetera
- Esta propuesta integra la orquestación de datos agrícolas para procesar las mediciones de las parcelas y un servidor de correo para enviar los informes semanales automáticamente cada lunes. Queda pendiente la analítica avanzada para comparar rendimientos detallados por parcela.
- **Apache Airflow** (`apache/airflow`), Orquestador de procesos: Permite crear y programar flujos de trabajo de manera programática para automatizar la generación del informe semanal a partir de los datos de lluvia, humedad y cosecha.
- **Postal** (`postalserver/postal`), Servidor de correo: Facilita la gestión completa del envío de correos electrónicos para asegurar que el informe semanal llegue a su destino todos los lunes de forma confiable.
- Limitación: Analítica: no se encontraron herramientas del catálogo para «comparar el rendimiento por parcela».
- Limitación: No se incluye una herramienta específica para el almacenamiento en base de datos en tiempo real ni para el análisis estadístico avanzado del rendimiento por parcela.
- Supuesto: Se asume que las mediciones de lluvia, humedad y cosecha se pueden digitalizar y almacenar en una base de datos o archivo accesible por la plataforma de procesamiento.
- Supuesto: Se requiere la capacidad de analítica para comparar el rendimiento por parcela, necesidad que no cuenta con herramientas en el catálogo actual.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-arquitectura`

> Dirijo un pequeño estudio de arquitectura. Necesito guardar planos, contratos y fotografías de cada proyecto en un mismo lugar, y encontrar un documento buscando palabras que aparezcan dentro de su contenido. Además, quiero que mi equipo pueda actualizar los textos y las imágenes de los proyectos publicados sin depender de quien mantiene la página, y que cada integrante tenga acceso solo a los proyectos que le corresponden.

**gemini**
- `ok` · Sistema Integral de Gestión y Contenido para Estudio de Arquitectura
- La propuesta implementa un sistema para centralizar archivos de proyectos, permitir búsquedas avanzadas en documentos, gestionar el contenido web de forma independiente y controlar el acceso de los usuarios por roles.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento centralizado de planos, contratos y fotografías.: SeaweedFS permite guardar planos, contratos y fotografías de cada proyecto en un mismo lugar gracias a su diseño como sistema de almacenamiento distribuido para objetos y archivos con licencia Apache-2.0.
- **Typesense** (`typesense/typesense`), Búsqueda de palabras dentro del contenido de los documentos.: Typesense permite encontrar un documento buscando palabras que aparezcan dentro de su contenido mediante su motor de búsqueda rápido y tolerante a errores tipográficos con licencia GPL-3.0.
- **Ghost** (`TryGhost/Ghost`), Gestión y actualización de textos e imágenes de proyectos publicados.: Ghost permite actualizar los textos y las imágenes de los proyectos publicados sin depender de quien mantiene la página mediante su plataforma de publicación con licencia MIT.
- **Keycloak** (`keycloak/keycloak`), Control de acceso por integrante a los proyectos correspondientes.: Keycloak permite que cada integrante tenga acceso solo a los proyectos que le corresponden mediante su solución de gestión de identidad y accesos con licencia Apache-2.0.
- Limitación: La solución no incluye una herramienta nativa de previsualización de archivos CAD para los planos de arquitectura.
- Supuesto: Se asume que el estudio cuenta con la infraestructura necesaria para alojar servicios Dockerizados.
- Supuesto: Se asume que los documentos escaneados pasan por un proceso previo de OCR para que el motor de búsqueda pueda indexar su texto.
- Rúbrica: español _ · rationale _ · coherencia _

### `vivero-plantas`

> Soy dueño de un vivero donde vendemos plantas, semillas, tierra y macetas. Quiero mantener actualizado el catálogo de la página sin depender de un programador, y permitir que los clientes encuentren plantas por nombre, tipo de luz o necesidad de riego. También necesito guardar fotos y fichas de cuidado, y recibir pagos por las compras desde la página.

**gemini**
- `ok` · Sistema Open Source para Vivero Online con Pagos y Catálogo
- Esta propuesta integra herramientas open source para gestionar el contenido del vivero mediante un panel de administración, habilitar búsquedas avanzadas para plantas, almacenar fotos y fichas en un sistema distribuido y procesar pagos online de forma segura.
- **Payload CMS** (`payloadcms/payload`), Gestión del catálogo de plantas, semillas y macetas: Payload CMS proporciona un backend y panel de administración instantáneo bajo licencia MIT y con actividad reciente, ideal para mantener actualizado el catálogo sin depender de un programador.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda y filtrado de plantas: Meilisearch ofrece una API de motor de búsqueda ultrarrápida con capacidad de filtrado y facetas para que los clientes encuentren plantas por nombre, tipo de luz o riego. Su licencia no fue identificada por GitHub y tiene actualizaciones recientes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos y fichas: SeaweedFS provee almacenamiento distribuido eficiente para archivos con licencia Apache-2.0 y actualización constante, resolviendo la necesidad de guardar fotos y fichas de cuidado.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos online: Hyperswitch es una plataforma de pagos open source bajo licencia Apache-2.0 con actividad reciente, permitiendo recibir pagos de forma segura desde la página del vivero.
- Limitación: No se incluye un módulo específico para la gestión de envíos o logística de entrega de plantas frágiles.
- Limitación: La herramienta de búsqueda tiene licencia no identificada por GitHub, lo que requiere verificación manual adicional de sus términos de uso.
- Supuesto: Se asume que el vivero cuenta con infraestructura propia o servidores VPS para hospedar las aplicaciones autoalojadas.
- Supuesto: Se asume que la interfaz de usuario web de la tienda se conectará mediante API con el CMS y el motor de búsqueda seleccionados.
- Rúbrica: español _ · rationale _ · coherencia _

### `club-futbol-aficionado`

> Administro un club de fútbol aficionado que tiene equipos de distintas edades y cobra una mensualidad a sus jugadores. Quiero que jugadores y familiares ingresen con su propia cuenta y consulten solo sus datos y pagos. Necesito cobrar las mensualidades por internet, enviar avisos sobre entrenamientos y partidos, y consultar cuántos socios están al día con sus pagos.

**gemini**
- `ok` · Plataforma Integral de Gestión y Pagos para Club de Fútbol
- Se propone una solución modular para el club de fútbol aficionado que permite la autenticación segura de jugadores y familiares, la recaudación de mensualidades por internet y la gestión de avisos y notificaciones. Queda pendiente el desarrollo específico de la gestión de entrenamientos y partidos al no formar parte directa de las herramientas analizadas.
- **Keycloak** (`keycloak/keycloak`), Autenticación: Permite que jugadores y familiares ingresen con su propia cuenta de forma segura y consulten solo sus datos y pagos mediante un sistema de identidad y acceso robusto.
- **Kill Bill** (`killbill/killbill`), Pagos: Facilita cobrar las mensualidades por internet mediante una plataforma de suscripciones y pagos de código abierto.
- **Apprise** (`caronc/apprise`), Comunicación: Permite enviar avisos sobre entrenamientos y partidos conectándose con diversos servicios de notificación.
- **Metabase** (`metabase/metabase`), Analítica: Permite consultar cuántos socios están al día con sus pagos mediante tableros y análisis sencillos de datos. La licencia no está identificada por GitHub.
- Limitación: No se incluye una solución específica para la programación de entrenamientos y partidos dentro de las herramientas candidatas.
- Supuesto: Se asume que el club cuenta con infraestructura propia o servidores para realizar el despliegue autohospedado de las herramientas seleccionadas.
- Supuesto: El usuario necesitará un módulo o desarrollo a medida para la gestión específica de los calendarios de entrenamientos y partidos, ya que las herramientas de comunicación actuales solo envían los avisos.
- Rúbrica: español _ · rationale _ · coherencia _

### `centro-cuidado-infantil`

> Soy responsable de un centro de cuidado infantil en mi ciudad. Quiero mantener la ficha de cada niño, sus contactos autorizados y el registro de asistencia. Las familias deben ingresar con su propia cuenta y consultar únicamente la información de sus hijos. También necesito enviar avisos a las familias y guardar las autorizaciones y documentos que nos entregan.

**gemini**
- `ok` · Sistema de gestión y comunicación para centro de cuidado infantil
- Esta propuesta integra herramientas open source para gestionar bases de datos, autenticar usuarios, enviar avisos y almacenar documentos de forma segura. El sistema permite registrar las fichas de los niños, controlar que las familias accedan solo a su información y guardar autorizaciones, aunque se requiere desarrollo adicional para la interfaz específica del centro.
- **etcd** (`etcd-io/etcd`), Almacenamiento de fichas y registros: etcd es una base de datos clave-valor distribuida y confiable que permite mantener la ficha de cada niño, sus contactos autorizados y el registro de asistencia de manera segura. Cuenta con licencia Apache-2.0 y actividad reciente.
- **Keycloak** (`keycloak/keycloak`), Autenticación de familias: Keycloak gestiona la identidad y el acceso, permitiendo que las familias ingresen con su propia cuenta y consulten únicamente la información de sus hijos. Posee licencia Apache-2.0 y mantenimiento activo.
- **Apprise** (`caronc/apprise`), Envío de avisos a familias: Apprise facilita el envío de avisos a las familias conectándose con múltiples plataformas de notificación. Utiliza la licencia BSD-2-Clause y cuenta con actualizaciones recientes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de documentos y autorizaciones: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos de manera eficiente, ideal para guardar las autorizaciones y documentos que entregan las familias. Cuenta con licencia Apache-2.0 y mantenimiento constante.
- Limitación: Ninguna de las herramientas incluye por defecto una interfaz visual específica para la gestión de un centro de cuidado infantil, por lo que se requiere desarrollo a medida para la interfaz de las familias y del personal.
- Supuesto: Se asume que el centro cuenta con personal técnico para desplegar y conectar estos servicios mediante API o protocolos web.
- Supuesto: El centro requiere una interfaz de usuario web o móvil personalizada que conecte estas herramientas con los flujos diarios del negocio.
- Rúbrica: español _ · rationale _ · coherencia _

### `mantenimiento-piscinas`

> Tengo una pequeña empresa que hace limpieza y mantenimiento de piscinas en casas y conjuntos residenciales. Quiero registrar los datos de cada cliente y las características de su piscina. Necesito programar automáticamente las visitas periódicas, enviar recordatorios antes de cada visita y permitir que los clientes paguen el servicio por internet.

**gemini**
- `ok` · Sistema de Gestión y Pagos para Mantenimiento de Piscinas
- Esta propuesta integra herramientas open source para gestionar los datos de clientes y piscinas, programar visitas de mantenimiento de forma automática, enviar notificaciones y procesar pagos en línea de manera segura.
- **etcd** (`etcd-io/etcd`), Almacenamiento de datos: Permite guardar los registros de cada cliente y las características de su piscina utilizando un almacén de clave-valor distribuido y confiable bajo licencia Apache-2.0.
- **Apache Airflow** (`apache/airflow`), Programador de tareas: Facilita la programación automática de las visitas periódicas mediante flujos de trabajo definidos, operando bajo licencia Apache-2.0.
- **Apprise** (`caronc/apprise`), Servicio de notificaciones: Permite enviar los recordatorios antes de cada visita integrándose con diversas plataformas de notificación bajo licencia BSD-2-Clause.
- **Hyperswitch** (`juspay/hyperswitch`), Procesador de pagos: Permite que los clientes paguen el servicio por internet mediante una plataforma de pagos rápida y compatible con múltiples pasarelas bajo licencia Apache-2.0.
- Limitación: El almacenamiento seleccionado está optimizado como base de datos clave-valor distribuida y podría requerir esquemas adicionales para consultas complejas de relaciones entre clientes y piscinas.
- Supuesto: Se asume que la empresa cuenta con personal técnico para desplegar y conectar servicios basados en contenedores.
- Supuesto: Se asume que los clientes disponen de conectividad a internet para recibir los recordatorios y realizar los pagos en línea.
- Rúbrica: español _ · rationale _ · coherencia _

### `empresa-reciclaje`

> Somos una empresa familiar que recoge y separa material reciclable de comercios y conjuntos residenciales. Quiero combinar los registros que recibimos de distintos puntos y convertirlos en reportes mensuales por tipo de material. Necesito medir cuánto material recuperamos por zona y comparar los resultados de cada mes. También quiero que los reportes se generen automáticamente al cierre de cada mes.

**gemini**
- `ok` · Sistema de procesamiento y reportes para reciclaje
- La propuesta implementa un flujo para transformar registros de material reciclable mediante dbt, visualizar métricas de recuperación con Metabase y automatizar la generación mensual de reportes con Apache Airflow.
- **dbt** (`dbt-labs/dbt`), Transformación y modelado de registros de reciclaje: dbt permite combinar los registros recibidos de distintos puntos y transformarlos aplicando prácticas de modelado de datos para estructurarlos por tipo de material.
- **Metabase** (`metabase/metabase`), Visualización de métricas de material recuperado por zona: Metabase facilita la medición de cuánto material se recupera por zona y la comparación de resultados entre meses. Su licencia no fue identificada por GitHub.
- **Apache Airflow** (`apache/airflow`), Orquestación de la generación mensual de reportes: Apache Airflow permite programar y monitorear los flujos de trabajo para asegurar que los reportes se generen automáticamente al cierre de cada mes.
- Limitación: La propuesta no incluye una interfaz web propia para la captura inicial de los registros en campo.
- Supuesto: Se cuenta con una base de datos centralizada donde se almacenan inicialmente los registros recolectados en los distintos puntos.
- Supuesto: La empresa familiar dispone de capacidad técnica básica para operar herramientas de ingeniería de datos.
- Rúbrica: español _ · rationale _ · coherencia _

### `parqueadero-multinivel`

> Administro un parqueadero privado de varios pisos en el centro de la ciudad. Necesito registrar las entradas y salidas y mantener actualizado cuántos espacios están libres. Quiero que las consultas repetidas de disponibilidad respondan de inmediato sin tener que revisar todos los movimientos cada vez. También necesito recibir pagos digitales y que el sistema me avise cuando ocurran errores, permita revisar los registros de fallos y muestre cuánto tarda en responder.

**gemini**
- `ok` · Arquitectura para parqueadero con pagos y monitoreo
- La propuesta implementa una base de datos en memoria para consultas rápidas de disponibilidad, una plataforma de pagos digitales y un sistema integral de observabilidad para métricas y alertas. Quedan sin cubrir en este análisis específico el registro operativo de entradas y salidas de vehículos y la gestión física de barreras.
- **Valkey** (`valkey-io/valkey`), Caché de disponibilidad: Responde de inmediato a las consultas repetidas sobre los espacios libres del parqueadero gracias a su diseño optimizado para caché y operaciones en tiempo real, utilizando licencia BSD-3-Clause.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Permite recibir pagos digitales de forma eficiente y segura integrándose con múltiples proveedores, bajo licencia Apache-2.0 y con mantenimiento activo reciente.
- **Grafana** (`grafana/grafana`), Monitoreo y análisis de rendimiento: Muestra cuánto tarda en responder el sistema y facilita revisar registros de fallos mediante sus capacidades de visualización y alertas, operando con licencia AGPL-3.0.
- Limitación: No se incluyeron herramientas específicas en el catálogo para el registro físico de entradas y salidas de vehículos.
- Supuesto: Se asume que existe un software base de gestión de parqueadero para registrar los movimientos físicos de entrada y salida.
- Supuesto: Se asume conectividad a internet para procesar los pagos digitales y sincronizar el monitoreo.
- Rúbrica: español _ · rationale _ · coherencia _

### `taller-carpinteria`

> Soy dueño de un taller de carpintería que fabrica muebles a medida. Quiero registrar cada pedido con sus medidas, materiales, costos y fecha de entrega. Necesito calcular automáticamente cuánta madera y cuánto material se requiere para cada diseño, comparar la ganancia de los pedidos y guardar los planos y fotos de referencia de cada cliente.

**gemini**
- `ok` · Arquitectura de Software para Taller de Carpintería
- Esta propuesta organiza el sistema del taller utilizando MariaDB para registrar pedidos, NumPy para el cálculo numérico de materiales, ClickHouse para la analítica de rentabilidad y SeaweedFS para almacenar planos y fotos con alto rendimiento.
- **MariaDB** (`MariaDB/server`), Registro de pedidos y datos: Permite registrar cada pedido con sus medidas, materiales, costos y fecha de entrega gracias a su motor relacional robusto. Cuenta con licencia GPL-2.0 y actividad reciente constante.
- **NumPy** (`numpy/numpy`), Cálculo de materiales: Facilita el procesamiento numérico necesario para calcular automáticamente cuánta madera y cuánto material se requiere para cada diseño. Su licencia no fue identificada por GitHub y mantiene actualizaciones mensuales.
- **ClickHouse** (`ClickHouse/ClickHouse`), Analítica de negocio: Permite comparar la ganancia de los pedidos procesando consultas analíticas de forma rápida. Utiliza licencia Apache-2.0 y muestra un mantenimiento activo.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos: Permite guardar los planos y fotos de referencia de cada cliente de manera estructurada y escalable. Cuenta con licencia Apache-2.0 y actualizaciones recientes.
- Limitación: Ninguna de las herramientas elegidas incluye una interfaz gráfica nativa de gestión de carpintería, por lo que se requiere desarrollar una aplicación cliente.
- Supuesto: Se asume que el taller cuenta con personal técnico capaz de integrar bases de datos relacionales con scripts de procesamiento numérico.
- Supuesto: Se asume que la interfaz de usuario o aplicación principal se conectará a estos componentes mediante servicios web o APIs.
- Rúbrica: español _ · rationale _ · coherencia _

### `oficina-juridica`

> Dirijo una oficina de asesoría jurídica pequeña que atiende a personas y negocios. Necesito guardar los contratos y expedientes de cada cliente en un lugar seguro, y buscar dentro de esos documentos por nombres, fechas y palabras específicas. También quiero que cada abogado pueda entrar con su cuenta y consultar solo los expedientes asignados, y enviar correos a los clientes cuando haya novedades en sus casos.

**gemini**
- `ok` · Sistema Integral de Gestión Documental para Asesoría Jurídica
- Esta propuesta cubre el almacenamiento seguro de contratos, la búsqueda avanzada de textos, el control de acceso para abogados y el envío de notificaciones por correo a los clientes, optimizando la operación de la asesoría.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos: Resuelve la necesidad de guardar los contratos y expedientes de cada cliente de forma distribuida y eficiente con acceso rápido.
- **Meilisearch** (`meilisearch/meilisearch`), Búsqueda de texto: Permite buscar dentro de los documentos por nombres, fechas y palabras específicas con alta velocidad. Su licencia no fue identificada por GitHub.
- **Keycloak** (`keycloak/keycloak`), Autenticación y accesos: Garantiza que cada abogado pueda entrar con su cuenta y gestionar los permisos necesarios para consultar los expedientes asignados.
- **Postal** (`postalserver/postal`), Envío de correos: Facilita el envío de correos a los clientes cuando haya novedades en sus casos utilizando una plataforma de correo completa.
- Limitación: La propuesta no incluye una interfaz web legal propietaria o gestor de expedientes específico para abogados, requiriendo desarrollo propio o integración adicional sobre estas herramientas.
- Supuesto: Se asume que la oficina jurídica cuenta con infraestructura propia o servidores para alojar estas herramientas de código abierto.
- Supuesto: Se asume que el volumen de clientes y correos se adapta bien a una plataforma de correo autohospedada.
- Rúbrica: español _ · rationale _ · coherencia _

### `fabrica-quesos`

> Tenemos una pequeña planta que produce quesos para tiendas y mercados de la región. Quiero reunir y procesar en tiempo real las mediciones de temperatura y producción de cada lote. También necesito comparar los datos de cada lote para revisar el comportamiento de la producción. Cuando se pierda la conexión, quiero que las mediciones queden en una lista y se procesen al restablecerse, sin perder información. Necesito que me avise si el sistema deja de recibir mediciones o presenta errores, y poder revisar un historial de fallos y tiempos de respuesta.

**gemini**
- `ok` · Sistema de monitoreo y procesamiento para producción de quesos
- Esta propuesta implementa un sistema para procesar en tiempo real las mediciones de temperatura y producción, almacenarlas temporalmente durante cortes de conexión y visualizar el comportamiento de cada lote, complementado con alertas y monitoreo de fallos y tiempos de respuesta.
- **Apache Beam** (`apache/beam`), Procesamiento en tiempo real: Procesa en tiempo real las mediciones de temperatura y producción de cada lote mediante su modelo unificado para procesamiento de datos en streaming. Utiliza licencia Apache-2.0 y cuenta con actividad reciente.
- **Grafana** (`grafana/grafana`), Visualización y comparación de lotes: Permite comparar los datos de cada lote para revisar el comportamiento de la producción mediante tableros y visualización de datos. Su licencia es AGPL-3.0 y presenta mantenimiento activo.
- **Redis** (`redis/redis`), Almacenamiento temporal en lista: Conserva las mediciones en una lista cuando se pierde la conexión para procesarlas al restablecerse, evitando la pérdida de información gracias a su servidor de estructuras de datos en memoria. Su licencia no fue identificada por GitHub y tiene desarrollo activo.
- **Prometheus** (`prometheus/prometheus`), Monitoreo y alertas del sistema: Avisa si el sistema deja de recibir mediciones o presenta errores mediante su sistema de monitoreo y alertas, permitiendo revisar un historial de métricas y tiempos de respuesta. Utiliza licencia Apache-2.0 y cuenta con cambios recientes.
- Limitación: No se incluye un almacenamiento relacional tradicional para gestión avanzada de inventarios de tiendas y mercados.
- Supuesto: Se asume que los dispositivos en la planta pueden conectarse a la red mediante protocolos estándar para enviar los datos.
- Supuesto: El entorno cuenta con la infraestructura necesaria para ejecutar contenedores o servicios para estas herramientas.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-fotografico`

> Soy fotógrafa y tengo un estudio familiar donde realizo retratos y sesiones para eventos. Quiero que cada cliente pueda entrar con una clave y ver solo su galería privada. Necesito guardar y entregar archivos fotográficos de alta resolución sin que pierdan calidad, permitir que el cliente seleccione el paquete y pague la reserva en línea, y enviarle un mensaje cuando sus fotos estén listas.

**gemini**
- `ok` · Plataforma de gestion y entrega de galerias fotograficas
- Esta propuesta integra autenticacion de usuarios, almacenamiento de alta resolucion, procesamiento de pagos para reservas y un sistema de notificaciones para administrar un estudio fotografico de manera eficiente.
- **Keycloak** (`keycloak/keycloak`), Autenticacion de clientes: Keycloak ofrece gestion de identidad y acceso para aplicaciones modernas, permitiendo administrar el ingreso de los clientes mediante claves para proteger sus galerias privadas.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de fotos: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar miles de millones de archivos y objetos sin perdida de calidad, ideal para guardar y entregar archivos fotograficos de alta resolucion.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Hyperswitch es una plataforma de pagos abierta y componible que permite gestionar la conectividad con multiples proveedores para procesar pagos en linea de forma segura.
- **Apprise** (`caronc/apprise`), Envio de notificaciones: Apprise permite enviar notificaciones push y alertas a traves de practicamente cualquier plataforma para avisarle al cliente que sus fotos estan listas.
- Limitación: La propuesta no incluye una interfaz web o galeria visual integrada para que los clientes seleccionen sus fotos directamente desde la pantalla, requiriendo desarrollo adicional para la interfaz de usuario.
- Supuesto: Se asume que la fotografa cuenta con un servidor propio o infraestructura en la nube para alojar las herramientas autohospedadas.
- Supuesto: Se asume que los clientes disponen de conexion a internet para realizar pagos y visualizar sus galerias.
- Rúbrica: español _ · rationale _ · coherencia _

### `libreria-independiente`

> Soy dueño de una librería independiente que vende libros nuevos y usados. Necesito conservar el inventario y el historial de ventas, y que los lectores encuentren títulos por nombre, autor o tema. Quiero aceptar pagos por internet para los pedidos que se hagan desde nuestra página. También necesito consultar qué categorías se venden más y cuáles tienen menor movimiento.

**gemini**
- `ok` · Arquitectura de software para gestión de librería independiente
- Esta propuesta integra almacenamiento transaccional para inventario y ventas, un motor de búsqueda de texto para el catálogo y una plataforma de analítica para consultar el movimiento de las categorías de libros. La necesidad de pagos en línea quedó sin una herramienta adecuada entre los candidatos encontrados.
- **etcd** (`etcd-io/etcd`), Almacenamiento transaccional de inventario y ventas: etcd-io/etcd provee un almacenamiento de clave-valor distribuido bajo licencia Apache-2.0, ideal para conservar los datos críticos del inventario y el historial de ventas.
- **Typesense** (`typesense/typesense`), Búsqueda de libros por nombre, autor o tema: typesense/typesense es un motor de búsqueda tolerante a errores tipográficos y optimizado para búsquedas de texto completo, permitiendo que los lectores encuentren títulos por nombre, autor o tema.
- **DuckDB** (`duckdb/duckdb`), Consulta analítica del movimiento de categorías: duckdb/duckdb es un sistema de base de datos analítica bajo licencia MIT diseñado para cargas de trabajo OLAP, permitiendo consultar con eficiencia qué categorías se venden más y cuáles tienen menor movimiento.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. Ninguno de los candidatos analizados se ajusta de forma directa a la aceptación simple de pagos por internet para pedidos puntuales de una página web.
- Supuesto: Se asume que la librería cuenta con un equipo de desarrollo capaz de integrar componentes distribuidos como etcd.
- Supuesto: El procesamiento de pagos requerido deberá resolverse integrando una pasarela externa estándar, ya que no se encontraron candidatos idóneos en el catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `editorial-libros`

> Dirijo una editorial pequeña que publica libros de autores regionales. Necesito que el equipo pueda actualizar descripciones, portadas y novedades del catálogo publicado sin pedir cada cambio a un desarrollador. También quiero guardar los originales, portadas y contratos de publicación en un archivo central, y avisar por correo a las librerías cuando salga un nuevo título.

**gemini**
- `ok` · Propuesta de herramientas open source para editorial regional
- Esta propuesta cubre la gestión del catálogo mediante un panel de administración, el almacenamiento centralizado de archivos originales y contratos, y el envío automatizado de correos electrónicos para notificar sobre nuevos lanzamientos a las librerías.
- **Payload** (`payloadcms/payload`), CMS para la gestión del catálogo de libros: Payload permite al equipo actualizar el contenido del catálogo de forma autónoma gracias a su panel de administración integrado y su arquitectura fullstack con licencia MIT.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento central para archivos y documentos: SeaweedFS resuelve el almacenamiento centralizado de documentos y archivos multimedia con un rendimiento eficiente y licencia Apache-2.0.
- **Listmonk** (`knadh/listmonk`), Plataforma de correo para notificaciones: Listmonk permite gestionar campañas y listas de correo para notificar a las librerías sobre los nuevos títulos bajo una licencia AGPL-3.0.
- Limitación: La propuesta no incluye pasarelas de pago ni la facturación de las ventas a las librerías.
- Supuesto: Se asume que el personal cuenta con la capacidad técnica básica para operar paneles web de administración.
- Rúbrica: español _ · rationale _ · coherencia _

### `tostadora-cafe`

> Tenemos un pequeño negocio que tuesta y vende café a tiendas y clientes particulares. Quiero reunir el historial de ventas, temporadas y pedidos de cada variedad, y usar esos datos para que el sistema estime cuánta demanda tendremos las próximas semanas. También necesito comparar esas estimaciones con las ventas reales y ver qué tan acertadas fueron por variedad. Quiero guardar cada predicción junto con los datos que se usaron para generarla.

**gemini**
- `ok` · Sistema de prediccion de demanda para tostadero de cafe
- La propuesta implementa una base de datos distribuida en memoria y clave-valor para almacenar el historial de ventas y pedidos, junto con un motor de inferencia de gran rendimiento para estimar la demanda futura de café. El sistema se complementa con el almacenamiento seguro de datos y el análisis de métricas temporales que no cubren directamente otras necesidades del negocio.
- **Valkey** (`valkey-io/valkey`), Almacén de datos: Valkey es una base de datos clave-valor distribuida y flexible, con licencia BSD-3-Clause y mantenimiento activo, ideal para guardar el historial de ventas y pedidos de cada variedad.
- **vLLM** (`vllm-project/vllm`), Motor de estimación: vLLM proporciona un motor de inferencia eficiente para ejecutar modelos que pueden estimar cuánta demanda tendrá el negocio las próximas semanas.
- Limitación: La propuesta no incluye una herramienta específica para comparar las estimaciones con las ventas reales y calcular la precisión por variedad.
- Limitación: La propuesta no incluye un sistema de gestión de secretos para proteger las credenciales de acceso a los datos.
- Supuesto: Se asume que el negocio cuenta con la infraestructura necesaria para alojar los servicios propuestos.
- Supuesto: Se asume que los modelos ejecutados en el motor de IA pueden adaptarse para realizar pronósticos de series temporales de demanda.
- Rúbrica: español _ · rationale _ · coherencia _
