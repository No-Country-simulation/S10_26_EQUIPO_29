# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-08 a las 21:32. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.1 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 83% |
| Techo de la búsqueda (top 5) | 100% |
| Techo con 5 candidatos | 100% |
| Eligió un aceptable (donde había) | 100% |
| Se abstuvo (donde no había) | 75% |
| Acierto de punta a punta (comparable entre k) | 100% |
| Sin caja donde el caso no tiene herramientas | 75% |
| Eligió el primer candidato | 54% |
| Consistencia entre corridas | 62% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 4 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 7 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.0 s |
| Tiempo total (peor caso) | 4.9 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.1 s · 2.2 s |
| Tokens entrada / salida (mediana) | 3779 / 581 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 100% | 100% | 100% | 100% – 100% |
| Se abstuvo (donde no había) | 80% | 60% | 83% | 60% – 83% |
| Acierto de punta a punta | 100% | 100% | 100% | 100% – 100% |
| Textos del modelo que hablan del catálogo | 2 | 3 | 2 | 2 – 3 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `telemedicina-consultas` · communication | (ninguno) | det 3/3 · eligió algo 0 |
| `telemedicina-consultas` · database | postgres, server, supabase | det 3/3 · techo 3 · eligió 3 |
| `red-profesional-contactos` · database | (ninguno) | det 3/3 · eligió algo 0 |
| `red-profesional-contactos` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `tienda-global-imagenes` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `tienda-global-imagenes` · search | qdrant | det 3/3 · techo 3 · eligió 3 |
| `repuestos-factura-electronica` · payments | (ninguno) | det 3/3 · eligió algo 0 |
| `repuestos-factura-electronica` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `constructora-aprobaciones` · automation | (ninguno) | det 0/3 · eligió algo 0 |
| `constructora-aprobaciones` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `tienda-mascotas-chat` · communication | (ninguno) | det 3/3 · eligió algo 2 |
| `tienda-mascotas-chat` · analytics | analytics, umami, posthog | det 3/3 · techo 3 · eligió 3 |
| `estudio-contable-respaldos` · storage | (ninguno) | det 3/3 · eligió algo 2 |
| `estudio-contable-respaldos` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `marca-ropa-redes` · analytics | (ninguno) | det 1/3 · eligió algo 0 |
| `marca-ropa-redes` · communication | listmonk, postal | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `telemedicina-consultas`

> Una red de consultorios quiere que los médicos atiendan a sus pacientes por videollamada desde el navegador y guardar las historias clínicas en una base de datos relacional.

**gemini**
- `ok` · Sistema de Videollamadas y Base de Datos para Consultorios
- La propuesta cubre parcialmente la infraestructura necesaria para la red de consultorios mediante el almacenamiento relacional de historias clínicas, aunque no se encontraron herramientas para videollamadas en el navegador.
- **MariaDB** (`MariaDB/server`), Almacén de historias clínicas: MariaDB es un servidor de base de datos relacional con desarrollo activo, ideal para guardar las historias clínicas de los pacientes de forma estructurada.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Ninguno de los candidatos analizados proporciona capacidad de streaming de video para videollamadas.
- Limitación: No se encontró ninguna herramienta entre los candidatos que resuelva la necesidad de videollamadas para que los médicos atiendan a sus pacientes.
- Supuesto: Se asume que la aplicación web que gestionará las historias clínicas se conectará directamente a MariaDB.
- Supuesto: Se requiere integrar una solución externa o biblioteca de WebRTC para las videollamadas, ya que no hay candidatos para comunicación.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-profesional-contactos`

> Una red profesional quiere guardar quién trabajó con quién en una base de datos de grafos para recomendar contactos, y que los usuarios entren con su cuenta de LinkedIn o Google.

**gemini**
- `ok` · Sistema de gestión de identidades y base de datos para red profesional
- La propuesta cubre la autenticación de usuarios mediante proveedores externos y el almacenamiento de datos relacionales y de vectores, aunque no incluye una base de datos de grafos nativa entre los candidatos analizados. Se integra la autenticación con Keycloak y la plataforma Supabase para gestionar los datos.
- **Keycloak** (`keycloak/keycloak`), Servidor de autenticación y gestión de accesos: Keycloak provee autenticación de código abierto y gestión de acceso para aplicaciones modernas y servicios. Cuenta con licencia Apache-2.0 y actividad reciente.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Supabase ofrece una base de datos Postgres para aplicaciones web y móviles con licencia Apache-2.0, pero no es una base de datos de grafos nativa como pide el usuario.
- Limitación: El usuario solicitó autenticación con LinkedIn o Google, y se seleccionó Keycloak que soporta estándares OIDC para federación de identidades.
- Supuesto: Se asume que la red profesional puede modelar las relaciones de trabajo mediante consultas relacionales o de búsqueda en Postgres en lugar de una base de datos de grafos pura.
- Supuesto: Se asume que la plataforma utilizará OIDC o protocolos compatibles para integrar los inicios de sesión de Google y LinkedIn a través de Keycloak.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-global-imagenes`

> Una tienda en línea que vende en varios continentes quiere que las fotos de sus productos se sirvan desde servidores cercanos a cada comprador, y un buscador donde el cliente suba una foto y encuentre productos parecidos.

**gemini**
- `ok` · Infraestructura global para almacenamiento y busqueda visual de productos
- Se propone SeaweedFS para el almacenamiento y distribucion distribuida de imagenes de productos a escala global, y Qdrant como base de datos vectorial para habilitar la busqueda por similitud de imagenes subidas por los clientes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento distribuido: SeaweedFS es un sistema de almacenamiento distribuido con licencia Apache-2.0 ideal para gestionar y servir archivos multimedia a gran escala gracias a su acceso a disco optimizado.
- **Qdrant** (`qdrant/qdrant`), Buscador vectorial: Qdrant es un motor de busqueda vectorial de alto rendimiento con licencia Apache-2.0 que incluye soporte especifico para busqueda de imagenes y similitud de embeddings.
- Limitación: La propuesta no incluye un CDN geografico nativo para la entrega automatica en multiples continentes, requiriendo configuracion adicional sobre el almacenamiento distribuido.
- Supuesto: Se asume que la empresa cuenta con un modelo de aprendizaje automatico externo o integrado capaz de transformar las fotos subidas por los usuarios en vectores compatibles con la base de datos de busqueda.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-factura-electronica`

> Una distribuidora de repuestos necesita emitir la factura electrónica de cada venta ante la autoridad tributaria y guardar los PDF de las facturas en un almacenamiento de archivos.

**gemini**
- `ok` · Sistema de gestión de pagos y almacenamiento para distribuidora
- Esta propuesta cubre el almacenamiento seguro de archivos PDF para la distribuidora. La necesidad de emisión de facturas electrónicas ante la autoridad tributaria no cuenta con una herramienta directa entre los candidatos analizados, por lo que se clasificó como relación indirecta.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos PDF: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos de manera eficiente con acceso rápido a disco, ideal para guardar los PDF de las facturas.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. Kill Bill maneja facturación y pagos pero no está diseñado específicamente para la emisión de facturas electrónicas fiscales ante la autoridad tributaria del país.
- Limitación: Ninguna de las herramientas evaluadas resuelve por sí misma la integración directa con la autoridad tributaria para la facturación electrónica.
- Supuesto: La distribuidora cuenta con un sistema externo o módulo fiscal adicional para la conexión directa con la autoridad tributaria.
- Rúbrica: español _ · rationale _ · coherencia _

### `constructora-aprobaciones`

> Una constructora quiere que las solicitudes de compra sigan un flujo de aprobación: el residente de obra la pide, el ingeniero la aprueba y compras la registra; y avisar por correo a cada persona cuando tenga una solicitud pendiente.

**gemini**
- `ok` · Sistema de notificaciones para solicitudes de compra
- Se propone una herramienta de infraestructura de comunicación basada en código abierto para gestionar el envío de correos electrónicos de notificación a cada persona involucrada en el flujo de aprobación.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Permite gestionar la infraestructura de comunicación para enviar correos electrónicos de notificación a cada persona cuando tenga una solicitud pendiente. La licencia no está identificada por GitHub y cuenta con un desarrollo muy activo en la actualidad.
- Limitación: No se incluyen herramientas específicas para el motor de flujos de aprobación ni para el registro contable de compras.
- Supuesto: La constructora ya cuenta con un sistema de gestión para el flujo de aprobación de solicitudes de compra y solo requiere la capa de avisos por correo.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-mascotas-chat`

> Una tienda de mascotas quiere un chat en vivo para que sus clientes conversen con un asesor desde la página, y medir cuántos visitantes llegan a la página de cada producto.

**gemini**
- `ok` · Sistema de chat y analítica web para tienda de mascotas
- La propuesta implementa una plataforma de comunicación para agentes y productos, junto con una herramienta de analítica web para medir el tráfico de visitantes en cada página de producto.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Provee la infraestructura de comunicación open-source para agentes y productos con mantenimiento activo. Su licencia no fue identificada por GitHub.
- **Umami** (`umami-software/umami`), Analítica web de tráfico: Permite medir el tráfico, comportamiento y conversiones de los visitantes en un solo lugar de forma privada. Utiliza licencia MIT y cuenta con actualización reciente.
- Supuesto: La tienda de mascotas cuenta con un sitio web propio donde integrar el código de seguimiento y el widget de comunicación.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-contable-respaldos`

> Un estudio contable quiere copias de seguridad automáticas cada noche de las carpetas de sus clientes, y que cada contador entre con su cuenta y vea solo los clientes que tiene asignados.

**gemini**
- `ok` · Sistema de respaldo y autenticacion contable
- Esta propuesta incluye almacenamiento de alta ejecucion compatible con S3 para las copias de seguridad de las carpetas de los clientes y un sistema robusto de gestion de identidad y control de acceso para que cada contador ingrese de manera segura.
- **Keycloak** (`keycloak/keycloak`), Autenticacion y control de acceso: Keycloak gestiona la identidad y el acceso para aplicaciones y servicios, permitiendo que cada contador ingrese con su propia cuenta de forma segura bajo licencia Apache-2.0.
- Limitación: Almacenamiento: ninguna de las herramientas encontradas encaja. RustFS ofrece un sistema de almacenamiento de objetos compatible con S3 que permite coexistencia y migracion, aunque no incluye de forma nativa la programacion de respaldos nocturnos solicitada por el usuario.
- Limitación: La solucion no incluye de manera nativa la logica para asignar clientes especificos a cada contador de forma automatizada sin configuracion adicional.
- Supuesto: Se asume que la programacion de las copias de seguridad nocturnas se resolvera con herramientas externas al sistema de almacenamiento elegido.
- Rúbrica: español _ · rationale _ · coherencia _

### `marca-ropa-redes`

> Una marca de ropa quiere medir cuántas veces la mencionan en Instagram y TikTok, y enviar un boletín mensual por correo a sus suscriptores.

**gemini**
- `ok` · Sistema de envío de boletines mensuales para marca de ropa
- La propuesta implementa un gestor de listas de correo y boletines para cumplir con el envío mensual a suscriptores. No fue posible cubrir la medición de menciones en Instagram y TikTok debido a la ausencia de candidatos para redes sociales.
- **listmonk** (`knadh/listmonk`), Gestor de listas de correo y boletines: Permite administrar campañas y listas de correo con una interfaz moderna para enviar el boletín mensual a los suscriptores. Utiliza la licencia AGPL-3.0 y cuenta con un mantenimiento activo.
- Limitación: No se incluye ninguna herramienta para medir menciones en Instagram y TikTok, ya que no se encontraron candidatos para esa necesidad en el catálogo.
- Supuesto: Se asume que la marca de ropa ya cuenta con una lista de suscriptores en formato digital lista para ser importada.
- Supuesto: El monitoreo de menciones en redes sociales requiere herramientas de escucha social que no están disponibles en el catálogo.
- Rúbrica: español _ · rationale _ · coherencia _
