# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-09 a las 15:14. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.6 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 85% |
| Techo de la búsqueda (top 5) | 100% |
| Techo con 5 candidatos | 100% |
| Eligió un aceptable (donde había) | 100% |
| Se abstuvo (donde no había) | 76% |
| Acierto de punta a punta (comparable entre k) | 100% |
| Sin caja donde el caso no tiene herramientas | 76% |
| Eligió el primer candidato | 61% |
| Consistencia entre corridas | 50% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 7 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 2 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.3 s |
| Tiempo total (peor caso) | 11.8 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.5 s · 0.4 s · 2.5 s |
| Tokens entrada / salida (mediana) | 3972 / 548 |
| Esperas (límite de uso o error temporal) | 60.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 100% | 100% | 100% | 100% – 100% |
| Se abstuvo (donde no había) | 80% | 83% | 67% | 67% – 83% |
| Acierto de punta a punta | 100% | 100% | 100% | 100% – 100% |
| Textos del modelo que hablan del catálogo | 2 | 0 | 0 | 0 – 2 |

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
| `tienda-mascotas-chat` · communication | (ninguno) | det 3/3 · eligió algo 1 |
| `tienda-mascotas-chat` · analytics | analytics, umami, posthog | det 3/3 · techo 3 · eligió 3 |
| `estudio-contable-respaldos` · storage | (ninguno) | det 3/3 · eligió algo 3 |
| `estudio-contable-respaldos` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `marca-ropa-redes` · analytics | (ninguno) | det 2/3 · eligió algo 0 |
| `marca-ropa-redes` · communication | listmonk, postal | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `telemedicina-consultas`

> Una red de consultorios quiere que los médicos atiendan a sus pacientes por videollamada desde el navegador y guardar las historias clínicas en una base de datos relacional.

**gemini**
- `ok` · Sistema de Videollamadas y Base de Datos para Consultorios
- La propuesta incluye herramientas para construir la interfaz de usuario web y gestionar la base de datos relacional para las historias clínicas. No se encontraron candidatos específicos para la funcionalidad de videollamada.
- **MariaDB/server** (`MariaDB/server`), Base de datos relacional: MariaDB es un servidor de base de datos relacional ideal para guardar las historias clínicas de forma segura y estructurada. Utiliza licencia GPL-2.0 y cuenta con actualizaciones recientes.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Los candidatos encontrados son frameworks para construir aplicaciones web y interfaces, pero ninguno ofrece capacidad directa de videollamada.
- Supuesto: Se asume que los médicos y pacientes cuentan con una conexión a internet estable y un navegador compatible con WebRTC para futuras soluciones de videollamada.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-profesional-contactos`

> Una red profesional quiere guardar quién trabajó con quién en una base de datos de grafos para recomendar contactos, y que los usuarios entren con su cuenta de LinkedIn o Google.

**gemini**
- `ok` · Arquitectura de datos y autenticación para red profesional
- Se propone una plataforma de desarrollo basada en PostgreSQL y un sistema de gestión de identidades para cubrir el inicio de sesión con proveedores externos. El sistema no incluye de forma directa una base de datos de grafos nativa entre los candidatos encontrados.
- **Ory Kratos** (`ory/kratos`), Gestión de identidad y autenticación: Permite que los usuarios entren con su cuenta de Google y otros proveedores gracias a sus capacidades de Social Sign In. Su licencia es Apache-2.0 y cuenta con actividad reciente.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Ninguno de los candidatos analizados corresponde a una base de datos de grafos para guardar quién trabajó con quién, aunque se provee una plataforma de desarrollo basada en Postgres.
- Limitación: No se dispone de una base de datos de grafos nativa en los candidatos, por lo que se requiere adaptar el modelo de datos relacional para recomendaciones de contactos.
- Supuesto: Se asume que la red profesional puede modelar las relaciones laborales mediante tablas relacionales o extensiones en Postgres, dado que no hay grafos nativos.
- Supuesto: Se asume que la infraestructura cuenta con conectividad segura para validar los tokens de los proveedores de identidad externos.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-global-imagenes`

> Una tienda en línea que vende en varios continentes quiere que las fotos de sus productos se sirvan desde servidores cercanos a cada comprador, y un buscador donde el cliente suba una foto y encuentre productos parecidos.

**gemini**
- `ok` · Arquitectura global de almacenamiento y búsqueda visual de productos
- Esta propuesta implementa un sistema para una tienda en línea internacional, permitiendo el almacenamiento distribuido de fotos de productos para su acceso cercano y un motor de búsqueda vectorial para encontrar productos similares mediante imágenes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento distribuido de archivos: SeaweedFS es un sistema de almacenamiento distribuido para objetos y archivos, diseñado para manejar miles de millones de archivos, lo que ayuda a gestionar las fotos de los productos de la tienda.
- **Qdrant** (`qdrant/qdrant`), Buscador y motor de similitud visual: Qdrant es un motor de búsqueda y base de datos vectorial de alta escala que incluye búsqueda de imágenes para encontrar productos parecidos a partir de los embeddings de las fotos.
- Limitación: Ninguno de los candidatos de almacenamiento explicita capacidades nativas de CDN geográfica automatizada sin configuración adicional de infraestructura externa.
- Supuesto: Se asume que la distribución geográfica global se resuelve configurando nodos de SeaweedFS en diferentes regiones cercanas a los continentes donde opera la tienda.
- Supuesto: Se asume que la aplicación de la tienda cuenta con un modelo de aprendizaje automático capaz de transformar las fotos subidas por los clientes en vectores compatibles con Qdrant.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-factura-electronica`

> Una distribuidora de repuestos necesita emitir la factura electrónica de cada venta ante la autoridad tributaria y guardar los PDF de las facturas en un almacenamiento de archivos.

**gemini**
- `ok` · Sistema de facturación y almacenamiento para repuestos
- La propuesta cubre parcialmente la gestión comercial mediante plataformas de facturación por suscripción y ofrece un sistema de almacenamiento distribuido para los documentos generados. No se encontró ninguna herramienta específica para emitir la factura electrónica directamente ante la autoridad tributaria.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos PDF: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar miles de millones de archivos de manera eficiente bajo una licencia Apache-2.0, lo que permite guardar los PDF de las facturas de forma confiable.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. Las plataformas analizadas administran suscripciones y cobros, pero no realizan la emisión específica de facturas electrónicas ante la autoridad tributaria requerida por el negocio.
- Supuesto: Se asume que la distribuidora de repuestos opera con un modelo de ventas transaccionales que podría requerir integraciones adicionales para cumplir con normativas fiscales locales.
- Rúbrica: español _ · rationale _ · coherencia _

### `constructora-aprobaciones`

> Una constructora quiere que las solicitudes de compra sigan un flujo de aprobación: el residente de obra la pide, el ingeniero la aprueba y compras la registra; y avisar por correo a cada persona cuando tenga una solicitud pendiente.

**gemini**
- `ok` · Sistema de notificaciones por correo para solicitudes de compra
- La propuesta implementa una plataforma de correo electrónico para enviar avisos automáticos a cada persona involucrada en el flujo de aprobación. Quedan fuera del alcance la gestión propia del flujo de aprobación y el registro de compras, ya que no se encontraron candidatos para esas necesidades en esta selección.
- **Postal** (`postalserver/postal`), Envío de correos: Postal es una plataforma de entrega de correo electrónico totalmente equipada para gestionar el envío de correos salientes, cumpliendo con la necesidad de avisar por correo a cada persona cuando tenga una solicitud pendiente. Utiliza una licencia MIT y cuenta con mantenimiento reciente.
- Limitación: La propuesta no incluye la interfaz ni la lógica para que el residente de obra pida la solicitud, el ingeniero la apruebe y compras la registre.
- Limitación: No se seleccionaron herramientas para la gestión de flujos de trabajo o aprobación.
- Supuesto: Se asume que la constructora cuenta con un sistema externo o manual para gestionar las solicitudes de compra y los estados de aprobación, dado que no hay herramientas para ello en los candidatos.
- Supuesto: El pedido sugiere la necesidad de gestionar un flujo de aprobación y registro de compras que no tienen candidatos disponibles.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-mascotas-chat`

> Una tienda de mascotas quiere un chat en vivo para que sus clientes conversen con un asesor desde la página, y medir cuántos visitantes llegan a la página de cada producto.

**gemini**
- `ok` · Plataforma de atención y analítica para tienda de mascotas
- Esta propuesta integra infraestructura de comunicación para la interacción con los clientes y analítica web para medir el tráfico en las páginas de productos. Queda pendiente el desarrollo específico de la interfaz de chat en vivo con asesores, ya que no se encontró un candidato directo para esa funcionalidad exacta en el catálogo.
- **Umami** (`umami-software/umami`), Analítica web: Permite medir el tráfico en la página de cada producto de forma respetuosa con la privacidad, utilizando una plataforma autohospedada bajo licencia MIT.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Se selecciona como aproximación relacionada aunque no provee la interfaz de chat en vivo solicitada por el usuario.
- Supuesto: La tienda de mascotas cuenta con un sitio web propio donde opera el catálogo de productos.
- Supuesto: Se requiere un canal de soporte directo integrado en la experiencia de compra en línea.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-contable-respaldos`

> Un estudio contable quiere copias de seguridad automáticas cada noche de las carpetas de sus clientes, y que cada contador entre con su cuenta y vea solo los clientes que tiene asignados.

**gemini**
- `ok` · Sistema de respaldo y control de acceso contable
- Esta propuesta implementa un sistema para el estudio contable que permite gestionar el almacenamiento distribuido de los archivos de los clientes y controlar el acceso de los contadores mediante autenticación centralizada.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos de manera eficiente y escalable para las carpetas de los clientes.
- **Keycloak** (`keycloak/keycloak`), Gestión de acceso: Keycloak permite que cada contador ingrese con su propia cuenta de usuario y gestione el control de acceso a los servicios.
- Limitación: La propuesta no incluye una interfaz gráfica contable específica para filtrar los clientes asignados por cada contador, lo cual requerirá lógica adicional en la aplicación cliente.
- Supuesto: Se asume que el estudio contable cuenta con un servidor o infraestructura propia para desplegar los contenedores de las herramientas open source.
- Supuesto: Se asume que la programación de las copias de seguridad automáticas cada noche se realizará mediante tareas programadas del sistema operativo o scripts complementarios que utilicen el almacenamiento seleccionado.
- Rúbrica: español _ · rationale _ · coherencia _

### `marca-ropa-redes`

> Una marca de ropa quiere medir cuántas veces la mencionan en Instagram y TikTok, y enviar un boletín mensual por correo a sus suscriptores.

**gemini**
- `ok` · Sistema de envio de boletines por correo electronico
- Esta propuesta incluye la plataforma para gestionar y enviar el boletin mensual a los suscriptores. Queda pendiente resolver la medicion de menciones en Instagram y TikTok, ya que no se encontraron candidatos para esa funcion.
- **listmonk** (`knadh/listmonk`), Gestor de boletines: Permite administrar listas de correo y enviar campañas de marketing de alto rendimiento con un panel moderno. Utiliza la licencia AGPL-3.0 y se mantiene de forma activa.
- Limitación: No se resolvio la medicion de menciones de la marca en Instagram y TikTok por falta de herramientas candidatas en esa categoria.
- Supuesto: Se supone que la marca de ropa ya cuenta con una lista de suscriptores recolectada en su sitio web o tienda.
- Rúbrica: español _ · rationale _ · coherencia _
