# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 05:59. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 80% |
| Techo de la búsqueda (top 5) | 100% |
| Techo con 5 candidatos | 100% |
| Eligió un aceptable (donde había) | 100% |
| Se abstuvo (donde no había) | 76% |
| Acierto de punta a punta (comparable entre k) | 100% |
| Sin caja donde el caso no tiene herramientas | 76% |
| Recibe una herramienta aceptable, como lo ve el usuario | 89% |
| Se abstuvo, como lo ve el usuario | 54% |
| Eligió el primer candidato | 61% |
| Consistencia entre corridas | 62% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 5 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 5 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.0 s |
| Tiempo total (peor caso) | 5.1 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.7 s · 0.2 s · 2.4 s |
| Tokens entrada / salida (mediana) | 3993 / 574 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 100% | 100% | 100% | 100% – 100% |
| Se abstuvo (donde no había) | 67% | 80% | 83% | 67% – 83% |
| Acierto de punta a punta | 100% | 100% | 100% | 100% – 100% |
| Recibe una herramienta aceptable, como lo ve el usuario | 89% | 89% | 89% | 89% – 89% |
| Se abstuvo, como lo ve el usuario | 50% | 50% | 62% | 50% – 62% |
| Textos del modelo que hablan del catálogo | 2 | 2 | 1 | 1 – 2 |

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
| `constructora-aprobaciones` · database | postgres, server, supabase | det 0/3 · techo 0 · eligió 0 |
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
- `ok` · Sistema de Videollamadas y Historias Clínicas
- La propuesta implementa una base de datos relacional para guardar las historias clínicas. La necesidad de videollamadas no cuenta con una herramienta específica en los candidatos encontrados, por lo que se requiere desarrollo adicional para cubrirla.
- **MariaDB** (`MariaDB/server`), Base de datos relacional: MariaDB server es un servidor de base de datos desarrollado por la comunidad y bifurcado de MySQL, ideal para guardar de forma relacional las historias clínicas.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. El candidato es un framework para construir interfaces de usuario en la web, pero no provee la funcionalidad de videollamadas solicitada.
- Supuesto: Se asume que la red de consultorios cuenta con personal técnico para desarrollar la plataforma de videollamadas integrando servicios externos o bibliotecas WebRTC.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-profesional-contactos`

> Una red profesional quiere guardar quién trabajó con quién en una base de datos de grafos para recomendar contactos, y que los usuarios entren con su cuenta de LinkedIn o Google.

**gemini**
- `ok` · Arquitectura de gestión de identidades y datos para red profesional
- La propuesta implementa la gestión de identidades mediante un sistema centralizado con soporte para proveedores externos y un almacenamiento de datos relacional para la información del sistema. Queda pendiente el soporte específico para bases de datos nativas de grafos, ya que no se encontraron candidatos directos en el catálogo.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y autenticación: Resuelve la autenticación permitiendo el acceso de los usuarios mediante proveedores de identidad externos de forma segura. Utiliza licencia Apache-2.0 y cuenta con actividad reciente.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Se selecciona como alternativa relacional para estructurar la información de los usuarios y sus relaciones, ya que no hay bases de datos de grafos disponibles entre los candidatos.
- Limitación: No se dispone de una base de datos de grafos en los candidatos para guardar directamente quién trabajó con quién.
- Limitación: La selección para la base de datos es solo relacionada y requiere adaptar el modelo relacional para simular las consultas de grafos.
- Supuesto: Se asume que la estructura de relaciones laborales se puede modelar adecuadamente en una base de datos relacional ante la ausencia de una opción de grafos.
- Supuesto: Se asume que la red profesional requiere alta disponibilidad para el acceso de los usuarios.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-global-imagenes`

> Una tienda en línea que vende en varios continentes quiere que las fotos de sus productos se sirvan desde servidores cercanos a cada comprador, y un buscador donde el cliente suba una foto y encuentre productos parecidos.

**gemini**
- `ok` · Arquitectura global de almacenamiento y búsqueda visual para tienda en línea
- Esta propuesta implementa un sistema distribuido para almacenar y servir fotos de productos de manera eficiente a nivel global, complementado con un motor de búsqueda vectorial capaz de encontrar productos similares mediante imágenes subidas por los clientes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento y distribución de fotos de productos: Resuelve la necesidad de almacenar archivos de manera distribuida y eficiente con acceso optimizado para gestionar el contenido multimedia de la tienda en línea.
- **Qdrant** (`qdrant/qdrant`), Buscador de productos por similitud de imágenes: Proporciona un motor de búsqueda vectorial de alto rendimiento enfocado en similitud de embeddings e incluye características específicas de búsqueda de imágenes para encontrar productos parecidos.
- Limitación: Ninguno de los candidatos incluye de manera nativa la generación automática de vectores a partir de las fotos subidas, por lo que se requerirá un componente adicional de procesamiento de IA para embeddings.
- Supuesto: Se asume que la tienda cuenta con la infraestructura de red necesaria para aprovechar la distribución geográfica de los archivos.
- Supuesto: Se asume que las imágenes de los productos se transforman en vectores de características antes de ser indexadas en el motor de búsqueda.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-factura-electronica`

> Una distribuidora de repuestos necesita emitir la factura electrónica de cada venta ante la autoridad tributaria y guardar los PDF de las facturas en un almacenamiento de archivos.

**gemini**
- `ok` · Arquitectura para facturacion electronica y almacenamiento de archivos
- La propuesta incluye la gestion de cobros y facturacion junto con un sistema de almacenamiento distribuido para los documentos PDF. No se encontro una herramienta especifica para la emision directa de facturas ante la autoridad tributaria.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos PDF: SeaweedFS es un sistema de almacenamiento distribuido para objetos y archivos disenado para manejar miles de millones de archivos con alta eficiencia, bajo licencia Apache-2.0.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. Kill Bill es una plataforma open source de facturacion y pagos bajo licencia Apache-2.0, aunque no realiza la emision directa de facturas ante la autoridad tributaria solicitada.
- Limitación: Ninguno de los candidatos resuelve de forma nativa la comunicacion y emision de facturas electronicas ante la autoridad tributaria.
- Supuesto: Se asume que la distribuidora requiere integrarse con un proveedor externo o modulo adicional especifico para cumplir con la emision de facturas ante la autoridad tributaria.
- Supuesto: Se asume que la plataforma de facturacion puede exportar los documentos en formato PDF.
- Rúbrica: español _ · rationale _ · coherencia _

### `constructora-aprobaciones`

> Una constructora quiere que las solicitudes de compra sigan un flujo de aprobación: el residente de obra la pide, el ingeniero la aprueba y compras la registra; y avisar por correo a cada persona cuando tenga una solicitud pendiente.

**gemini**
- `ok` · Plataforma de notificaciones para solicitudes de compra
- Esta propuesta incluye la infraestructura de comunicación para enviar correos electrónicos transaccionales a cada persona involucrada. El flujo de aprobación de las solicitudes de compra no cuenta con herramientas candidatas en este catálogo.
- **Postal** (`postalserver/postal`), Servidor de correo: Permite gestionar el envío de avisos por correo electrónico a cada persona cuando tenga una solicitud pendiente. Cuenta con licencia MIT y se mantiene activo recientemente.
- Limitación: La propuesta no incluye la gestión del flujo de aprobación de las solicitudes de compra entre el residente de obra, el ingeniero y el departamento de compras.
- Supuesto: Se asume que la constructora cuenta con un sistema externo para registrar el flujo de aprobación y que la herramienta de correo se integrará mediante SMTP o API para disparar los avisos.
- Supuesto: El flujo de aprobación de solicitudes entre residente, ingeniero y compras requiere una herramienta de gestión de procesos que no está presente entre los candidatos.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-mascotas-chat`

> Una tienda de mascotas quiere un chat en vivo para que sus clientes conversen con un asesor desde la página, y medir cuántos visitantes llegan a la página de cada producto.

**gemini**
- `ok` · Sistema de chat y analítica web para tienda de mascotas
- La propuesta implementa una plataforma de infraestructura de comunicación para gestionar las conversaciones con los clientes y una herramienta de analítica web orientada a la privacidad para medir las visitas en las páginas de cada producto.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Permite gestionar la comunicación para agentes y productos con una infraestructura abierta, ideal para la atención de los clientes de la tienda de mascotas. La licencia no se encuentra identificada por GitHub y su último cambio fue reciente.
- **Plausible Analytics** (`plausible/analytics`), Analítica web y medición de tráfico: Ofrece una analítica web abierta, ligera y centrada en la privacidad para medir las visitas que llegan a cada página de producto sin utilizar cookies. Cuenta con licencia AGPL-3.0 y se mantiene activa con cambios recientes.
- Limitación: La herramienta de comunicación seleccionada provee infraestructura general y podría requerir desarrollo adicional para ofrecer una interfaz exacta de chat en vivo tradicional en la página.
- Supuesto: Se asume que la tienda de mascotas cuenta con un sitio web donde se pueden integrar scripts de analítica y componentes de comunicación.
- Supuesto: Se asume que el personal de atención al cliente utilizará la infraestructura propuesta para responder a los usuarios.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-contable-respaldos`

> Un estudio contable quiere copias de seguridad automáticas cada noche de las carpetas de sus clientes, y que cada contador entre con su cuenta y vea solo los clientes que tiene asignados.

**gemini**
- `ok` · Sistema Segura de Almacenamiento y Acceso para Estudio Contable
- Esta propuesta implementa un sistema para el estudio contable utilizando almacenamiento distribuido compatible con S3 para las copias de seguridad de las carpetas de los clientes y una solución robusta de gestión de identidades y accesos para que cada contador ingrese con su propia cuenta.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de respaldos: SeaweedFS es un sistema de almacenamiento distribuido para sistemas de archivos y almacenamiento de objetos S3, ideal para albergar de forma eficiente las copias de seguridad automáticas de las carpetas de los clientes solicitadas por el estudio contable.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y acceso: Keycloak proporciona infraestructura de gestión de identidad y acceso para aplicaciones modernas, permitiendo que cada contador entre con su cuenta y gestione la seguridad requerida para restringir la visualización de los clientes asignados.
- Limitación: La propuesta no incluye por sí misma la interfaz web específica de gestión contable ni el motor para filtrar la visualización por contador, los cuales deben integrarse con Keycloak.
- Supuesto: Se asume que la lógica para filtrar qué clientes ve cada contador según sus permisos asignados se implementará en la aplicación cliente o en una capa intermedia que consulte a Keycloak.
- Supuesto: Se asume que las copias de seguridad automáticas cada noche se programarán mediante scripts externos o herramientas adicionales que envíen los archivos a SeaweedFS.
- Rúbrica: español _ · rationale _ · coherencia _

### `marca-ropa-redes`

> Una marca de ropa quiere medir cuántas veces la mencionan en Instagram y TikTok, y enviar un boletín mensual por correo a sus suscriptores.

**gemini**
- `ok` · Sistema de análisis web y boletines mensuales
- La propuesta incluye la gestión de boletines y listas de correo para los suscriptores de la marca de ropa. No fue posible cubrir la medición de menciones en Instagram y TikTok con los candidatos analizados.
- **Listmonk** (`knadh/listmonk`), Gestor de boletines y listas de correo: Listmonk resuelve el envío del boletín mensual a los suscriptores gracias a sus capacidades como gestor de campañas de marketing por correo electrónico.
- Limitación: Analítica: ninguna de las herramientas encontradas encaja. Umami no mide menciones en redes sociales, ya que es una plataforma de analítica web y de productos enfocada en tráfico, campañas y comportamiento.
- Limitación: No se encontraron herramientas en los candidatos para medir menciones en Instagram y TikTok.
- Supuesto: Se asume que la marca de ropa cuenta con una lista de correos existente para sus suscriptores.
- Rúbrica: español _ · rationale _ · coherencia _
