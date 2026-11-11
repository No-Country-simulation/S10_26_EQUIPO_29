# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 15:57. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 5.1 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 84% |
| Techo de la búsqueda (top 5) | 96% |
| Techo con 5 candidatos | 96% |
| Eligió un aceptable (donde había) | 100% |
| Se abstuvo (donde no había) | 65% |
| Acierto de punta a punta (comparable entre k) | 96% |
| Sin caja donde el caso no tiene herramientas | 68% |
| Recibe una herramienta aceptable, como lo ve el usuario | 85% |
| Se abstuvo, como lo ve el usuario | 54% |
| Eligió el primer candidato | 43% |
| Consistencia entre corridas | 75% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 88% |
| Limitaciones repetidas · borrador del modelo | 7 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 4 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 3.8 s |
| Tiempo total (peor caso) | 6.2 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.4 s · 0.1 s · 2.3 s |
| Tokens entrada / salida (mediana) | 4453 / 617 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 100% | 100% | 100% | 100% – 100% |
| Se abstuvo (donde no había) | 67% | 57% | 71% | 57% – 71% |
| Acierto de punta a punta | 100% | 88% | 100% | 88% – 100% |
| Recibe una herramienta aceptable, como lo ve el usuario | 89% | 78% | 89% | 78% – 89% |
| Se abstuvo, como lo ve el usuario | 50% | 50% | 62% | 50% – 62% |
| Textos del modelo que hablan del catálogo | 2 | 1 | 1 | 1 – 2 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `telemedicina-consultas` · communication | (ninguno) | det 3/3 · eligió algo 0 |
| `telemedicina-consultas` · database | postgres, server, supabase | det 3/3 · techo 2 · eligió 2 |
| `red-profesional-contactos` · database | (ninguno) | det 3/3 · eligió algo 0 |
| `red-profesional-contactos` · auth | keycloak, zitadel, kratos, supertokens-core | det 3/3 · techo 3 · eligió 3 |
| `tienda-global-imagenes` · infrastructure | (ninguno) | det 0/3 · eligió algo 0 |
| `tienda-global-imagenes` · search | qdrant | det 3/3 · techo 3 · eligió 3 |
| `repuestos-factura-electronica` · payments | (ninguno) | det 3/3 · eligió algo 0 |
| `repuestos-factura-electronica` · storage | seaweedfs, rustfs | det 3/3 · techo 3 · eligió 3 |
| `constructora-aprobaciones` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
| `constructora-aprobaciones` · automation | (ninguno) | det 3/3 · eligió algo 3 |
| `constructora-aprobaciones` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `tienda-mascotas-chat` · communication | (ninguno) | det 3/3 · eligió algo 0 |
| `tienda-mascotas-chat` · analytics | analytics, umami, posthog | det 3/3 · techo 3 · eligió 3 |
| `estudio-contable-respaldos` · storage | (ninguno) | det 3/3 · eligió algo 3 |
| `estudio-contable-respaldos` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `marca-ropa-redes` · analytics | (ninguno) | det 1/3 · eligió algo 0 |
| `marca-ropa-redes` · communication | listmonk, postal | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `telemedicina-consultas`

> Una red de consultorios quiere que los médicos atiendan a sus pacientes por videollamada desde el navegador y guardar las historias clínicas en una base de datos relacional.

**gemini**
- `ok` · Sistema de historias clínicas y videollamadas para consultorios
- La propuesta establece el almacenamiento relacional de las historias clínicas utilizando una robusta base de datos comunitaria. La necesidad de comunicación para las videollamadas quedó sin candidatos en esta selección.
- **MariaDB** (`MariaDB/server`), Almacenar historias clínicas: MariaDB server es un sistema gestor de base de datos desarrollado por la comunidad e ideal para guardar las historias clínicas en una base de datos relacional. Cuenta con licencia GPL-2.0 y su último cambio fue hace 0 meses.
- Limitación: Comunicación: no se encontraron herramientas del catálogo para «que los médicos atiendan a sus pacientes por videollamada desde el navegador».
- Limitación: Se descartaron herramientas de mapeo objeto-relacional como SQLAlchemy y SQLModel, así como almacenes clave-valor o espejos de repositorios que no constituyen por sí mismos el motor de base de datos relacional principal para este despliegue.
- Supuesto: Se asume que la red de consultorios cuenta con un servidor propio o infraestructura en la nube para alojar la base de datos.
- Supuesto: La necesidad de comunicación para realizar videollamadas desde el navegador requiere herramientas adicionales no cubiertas en los candidatos actuales.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-profesional-contactos`

> Una red profesional quiere guardar quién trabajó con quién en una base de datos de grafos para recomendar contactos, y que los usuarios entren con su cuenta de LinkedIn o Google.

**gemini**
- `ok` · Sistema de gestión de identidades y datos para red profesional
- Esta propuesta implementa un sistema para una red profesional utilizando Keycloak para la autenticación externa con Google y LinkedIn. Las opciones para base de datos de grafos no están disponibles entre los candidatos evaluados, por lo que se utiliza una alternativa general de almacenamiento clave-valor.
- **Keycloak** (`keycloak/keycloak`), Autenticación de usuarios: Keycloak provee autenticación de código abierto y gestión de acceso para aplicaciones modernas, permitiendo la integración requerida para que los usuarios accedan con sus cuentas externas bajo licencia Apache-2.0.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. El candidato etcd-io/etcd es una base de datos clave-valor distribuida, pero no ofrece capacidades nativas de almacenamiento en grafos como requiere la red profesional.
- Limitación: No se encontró ninguna base de datos de grafos específica entre los candidatos para guardar las conexiones laborales.
- Supuesto: Se asume que la red profesional requiere alta disponibilidad para el acceso de los usuarios.
- Supuesto: Se asume que la infraestructura cuenta con soporte para desplegar contenedores.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-global-imagenes`

> Una tienda en línea que vende en varios continentes quiere que las fotos de sus productos se sirvan desde servidores cercanos a cada comprador, y un buscador donde el cliente suba una foto y encuentre productos parecidos.

**gemini**
- `ok` · Servidor global de fotos y búsqueda visual de productos
- La propuesta implementa un sistema de almacenamiento distribuido para servir las fotos de los productos de la tienda en línea y un motor de búsqueda vectorial para encontrar productos mediante imágenes similares.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento y distribución de las fotos de los productos.: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar miles de millones de archivos con acceso rápido, lo que ayuda a servir las fotos de los productos desde distintas ubicaciones.
- **Qdrant** (`qdrant/qdrant`), Motor de búsqueda visual por similitud de imágenes.: Qdrant es un motor de búsqueda y base de datos vectorial de alto rendimiento que incluye búsqueda de imágenes y similitud por embeddings para encontrar productos parecidos.
- Limitación: La propuesta no incluye herramientas específicas para la geolocalización automática de los compradores.
- Supuesto: Se asume que la tienda en línea cuenta con una infraestructura de red o CDN complementaria para asegurar la cercanía física real de los servidores a los compradores en varios continentes.
- Supuesto: Se asume la existencia de un servicio o modelo de inteligencia artificial que convierta la foto subida por el cliente en vectores compatibles con el motor de búsqueda.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-factura-electronica`

> Una distribuidora de repuestos necesita emitir la factura electrónica de cada venta ante la autoridad tributaria y guardar los PDF de las facturas en un almacenamiento de archivos.

**gemini**
- `ok` · Sistema de gestión de facturación y almacenamiento para repuestos
- Esta propuesta cubre el almacenamiento de los PDF de las facturas en un sistema distribuido. Sin embargo, no se encontraron candidatos adecuados para la emisión directa de facturas electrónicas ante la autoridad tributaria.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos PDF: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos de forma eficiente con acceso rápido. Cuenta con licencia Apache-2.0 y actividad reciente.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. Ninguno de los candidatos resuelve la emisión de facturas electrónicas ante la autoridad tributaria.
- Limitación: No se encontró ninguna herramienta en los candidatos que permita realizar la emisión de facturas electrónicas ante la autoridad tributaria.
- Supuesto: La distribuidora de repuestos cuenta con un sistema ERP o de facturación propio que se encargará de la conexión con la autoridad tributaria.
- Rúbrica: español _ · rationale _ · coherencia _

### `constructora-aprobaciones`

> Una constructora quiere que las solicitudes de compra sigan un flujo de aprobación: el residente de obra la pide, el ingeniero la aprueba y compras la registra; y avisar por correo a cada persona cuando tenga una solicitud pendiente.

**gemini**
- `ok` · Sistema de gestión y aprobación de solicitudes de compra para constructora
- Esta propuesta organiza el flujo de solicitudes de compra y el envío de avisos por correo a cada persona involucrada. Cubre la automatización de los procesos mediante la programación de flujos y la comunicación de alertas por correo electrónico.
- **Apache Airflow** (`apache/airflow`), Programar y monitorear el flujo de aprobación de las solicitudes de compra.: Apache Airflow es una plataforma para autor, programar y monitorear flujos de trabajo de manera programática, lo que permite estructurar el proceso donde el residente de obra la pide, el ingeniero la aprueba y compras la registra.
- **Postal** (`postalserver/postal`), Enviar correos de notificación a cada persona con solicitudes pendientes.: Postal provee una plataforma de entrega de correo completamente funcional para correos salientes, ideal para avisar por correo a cada persona cuando tenga una solicitud pendiente.
- Limitación: La propuesta no incluye una interfaz web dedicada para que el residente de obra o el ingeniero aprueben con un clic, ya que Airflow y Postal se enfocan en flujos programáticos y entrega de correo respectivamente.
- Supuesto: Se asume que la constructora cuenta con infraestructura propia para hospedar las aplicaciones.
- Supuesto: Se asume que los usuarios poseen cuentas de correo electrónico accesibles por la plataforma de correo elegida.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-mascotas-chat`

> Una tienda de mascotas quiere un chat en vivo para que sus clientes conversen con un asesor desde la página, y medir cuántos visitantes llegan a la página de cada producto.

**gemini**
- `ok` · Sistema de chat y analítica para tienda de mascotas
- Esta propuesta incluye la medición de visitas en la página de cada producto de la tienda de mascotas utilizando una plataforma de analítica web. Para el chat en vivo con los clientes no se encontró una herramienta dedicada en los candidatos, quedando esa necesidad sin resolver.
- **Umami** (`umami-software/umami`), Medir el tráfico y las visitas de los usuarios en la página de cada producto: Permite registrar el tráfico y la audiencia en la tienda de mascotas de forma privada y sin cookies. Su licencia es MIT y cuenta con actividad reciente.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. No hay candidatos orientados a un chat en vivo tradicional para conversar con asesores desde la página de la tienda.
- Limitación: La propuesta no incluye una solución directa para el chat en vivo entre clientes y asesores desde la página.
- Supuesto: Se asume que la tienda de mascotas cuenta con un sitio web propio donde integrar la analítica.
- Supuesto: No se dispone de un candidato directo para chat en vivo en el catálogo proporcionado.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-contable-respaldos`

> Un estudio contable quiere copias de seguridad automáticas cada noche de las carpetas de sus clientes, y que cada contador entre con su cuenta y vea solo los clientes que tiene asignados.

**gemini**
- `ok` · Sistema de respaldo y acceso para contadores
- Esta propuesta implementa un sistema para un estudio contable que permite guardar y organizar las carpetas de los clientes de forma distribuida mediante SeaweedFS, asegurando que cada contador acceda exclusivamente a su información con Keycloak. La programación de copias de seguridad automáticas cada noche deberá resolverse con herramientas o scripts externos.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de carpetas de clientes: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar miles de millones de archivos, lo que permite guardar las carpetas de los clientes del estudio contable. Utiliza licencia Apache-2.0 y cuenta con actividad reciente.
- **Keycloak** (`keycloak/keycloak`), Autenticación y control de acceso de contadores: Keycloak gestiona la identidad y el acceso de los usuarios, permitiendo que cada contador entre con su propia cuenta. Su licencia es Apache-2.0 y se mantiene activamente.
- Limitación: Ninguna de las herramientas seleccionadas incluye de forma nativa la programación de copias de seguridad automáticas nocturnas, requiriendo componentes adicionales.
- Supuesto: Se asume que el estudio contable dispone de un programador de tareas externo para realizar las copias de seguridad automáticas cada noche hacia el almacenamiento.
- Supuesto: Se asume que la asignación específica de qué clientes ve cada contador se configurará a nivel de la aplicación que se conecte con Keycloak y SeaweedFS.
- Rúbrica: español _ · rationale _ · coherencia _

### `marca-ropa-redes`

> Una marca de ropa quiere medir cuántas veces la mencionan en Instagram y TikTok, y enviar un boletín mensual por correo a sus suscriptores.

**gemini**
- `ok` · Sistema para medir menciones en redes y enviar boletines de ropa
- Esta propuesta implementa una plataforma de gestión de listas de correo y marketing para enviar el boletín mensual a los suscriptores. Para el procesamiento de datos, no se encontró una herramienta específica que mida menciones directas en Instagram y TikTok, por lo que se recomienda complementar con integración a APIs de redes sociales.
- **Listmonk** (`knadh/listmonk`), Gestor de campañas y boletines de correo: Resuelve la solicitud de enviar un boletín mensual por correo a sus suscriptores mediante un panel de control moderno y gestión de listas bajo licencia AGPL-3.0 y actividad reciente.
- Limitación: Procesamiento de datos: ninguna de las herramientas encontradas encaja. Se seleccionó como una herramienta relacionada para procesar y manipular datos estadísticos en Python, aunque no realiza la captura directa de menciones en Instagram y TikTok solicitada.
- Limitación: No se dispone de una herramienta en el catálogo para la captura automática de menciones en Instagram y TikTok.
- Supuesto: La marca de ropa cuenta con acceso previo a las APIs de Instagram y TikTok para extraer los datos de menciones.
- Supuesto: Se requiere un servidor propio para hospedar la plataforma de boletines.
- Rúbrica: español _ · rationale _ · coherencia _
