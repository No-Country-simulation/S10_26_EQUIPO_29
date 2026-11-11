# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-11 a las 07:04. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-10); etiquetas de los casos del catálogo del 2026-11-10; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 6.5 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 80% |
| Techo de la búsqueda (top 5) | 100% |
| Techo con 5 candidatos | 100% |
| Eligió un aceptable (donde había) | 100% |
| Se abstuvo (donde no había) | 65% |
| Acierto de punta a punta (comparable entre k) | 100% |
| Sin caja donde el caso no tiene herramientas | 65% |
| Recibe una herramienta aceptable, como lo ve el usuario | 89% |
| Se abstuvo, como lo ve el usuario | 46% |
| Eligió el primer candidato | 53% |
| Consistencia entre corridas | 50% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 96% |
| Limitaciones repetidas · borrador del modelo | 3 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 3 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.2 s |
| Tiempo total (peor caso) | 6.5 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.7 s · 0.2 s · 2.4 s |
| Tokens entrada / salida (mediana) | 4416 / 574 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 100% | 100% | 100% | 100% – 100% |
| Se abstuvo (donde no había) | 80% | 67% | 50% | 50% – 80% |
| Acierto de punta a punta | 100% | 100% | 100% | 100% – 100% |
| Recibe una herramienta aceptable, como lo ve el usuario | 89% | 89% | 89% | 89% – 89% |
| Se abstuvo, como lo ve el usuario | 50% | 50% | 38% | 38% – 50% |
| Textos del modelo que hablan del catálogo | 2 | 1 | 0 | 0 – 2 |

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
| `constructora-aprobaciones` · automation | (ninguno) | det 2/3 · eligió algo 2 |
| `constructora-aprobaciones` · communication | novu, apprise, postal | det 3/3 · techo 3 · eligió 3 |
| `tienda-mascotas-chat` · communication | (ninguno) | det 3/3 · eligió algo 1 |
| `tienda-mascotas-chat` · analytics | analytics, umami, posthog | det 3/3 · techo 3 · eligió 3 |
| `estudio-contable-respaldos` · storage | (ninguno) | det 3/3 · eligió algo 3 |
| `estudio-contable-respaldos` · auth | keycloak, zitadel | det 3/3 · techo 3 · eligió 3 |
| `marca-ropa-redes` · analytics | (ninguno) | det 0/3 · eligió algo 0 |
| `marca-ropa-redes` · communication | listmonk, postal | det 3/3 · techo 3 · eligió 3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `telemedicina-consultas`

> Una red de consultorios quiere que los médicos atiendan a sus pacientes por videollamada desde el navegador y guardar las historias clínicas en una base de datos relacional.

**gemini**
- `ok` · Sistema de gestión y videollamadas para consultorios médicos
- Esta propuesta incluye la infraestructura para almacenar las historias clínicas en una base de datos relacional y herramientas de desarrollo para la interfaz web. Queda pendiente la solución específica para realizar videollamadas en tiempo real entre médicos y pacientes, ya que los candidatos encontrados no cubren esa funcionalidad de comunicación.
- **MariaDB Server** (`MariaDB/server`), Almacenamiento de historias clínicas: MariaDB server provee un sistema de base de datos confiable para guardar los datos de las historias clínicas de los pacientes de forma relacional, respaldado por una comunidad activa y bajo licencia GPL-2.0.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Ninguno de los candidatos encontrados ofrece la capacidad de realizar videollamadas, ya que se limitan a pruebas de software y desarrollo de interfaces.
- Limitación: No se dispone de una herramienta de código abierto en los candidatos que resuelva directamente la funcionalidad de videollamada en el navegador.
- Supuesto: Se asume que la red de consultorios cuenta con personal técnico para integrar una solución de videollamadas externa o desarrollar la funcionalidad de forma complementaria.
- Supuesto: Se requiere una aplicación web o backend para conectar la interfaz de usuario con la base de datos relacional.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-profesional-contactos`

> Una red profesional quiere guardar quién trabajó con quién en una base de datos de grafos para recomendar contactos, y que los usuarios entren con su cuenta de LinkedIn o Google.

**gemini**
- `ok` · Infraestructura open source para red profesional
- La propuesta establece una infraestructura para una red profesional utilizando una base de datos relacional para la persistencia y Keycloak para la gestión de identidades y autenticación externa. Las necesidades específicas de base de datos de grafos no fueron cubiertas directamente por los candidatos encontrados, por lo que se requiere adaptar la solución elegida.
- **Keycloak** (`keycloak/keycloak`), Gestión de autenticación: Keycloak ofrece infraestructura de identidad y acceso de código abierto con soporte para protocolos modernos, permitiendo resolver la autenticación de usuarios de forma centralizada.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. Los candidatos encontrados no incluyen una base de datos especializada en grafos, por lo que se debe evaluar el uso de alternativas relacionales o adaptaciones para cumplir con el almacenamiento requerido.
- Limitación: Ninguno de los candidatos en la categoría de base de datos corresponde a una base de datos de grafos nativa.
- Supuesto: Se asume que la red profesional requiere alta disponibilidad para el acceso de los usuarios.
- Supuesto: Se asume que la base de datos elegida podrá modelar relaciones de grafos mediante tablas relacionales o extensiones.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-global-imagenes`

> Una tienda en línea que vende en varios continentes quiere que las fotos de sus productos se sirvan desde servidores cercanos a cada comprador, y un buscador donde el cliente suba una foto y encuentre productos parecidos.

**gemini**
- `ok` · Arquitectura para distribución global de imágenes y búsqueda visual
- Esta propuesta implementa un sistema para una tienda en línea global, utilizando un almacenamiento distribuido para las fotos de los productos y un motor de búsqueda vectorial para la similitud de imágenes basada en consultas visuales de los clientes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento distribuido: SeaweedFS ofrece almacenamiento distribuido para archivos y objetos con alta velocidad y acceso eficiente, adecuado para gestionar las fotos de los productos a gran escala.
- **Qdrant** (`qdrant/qdrant`), Motor de búsqueda vectorial: Qdrant permite realizar búsquedas de imágenes y calcular la similitud de embeddings para encontrar productos parecidos a partir de la foto que sube el cliente.
- Limitación: La solución propuesta no incluye de manera nativa la CDN específica para la distribución geográfica extrema, la cual se debe configurar sobre el almacenamiento distribuido.
- Supuesto: Se asume que la tienda cuenta con una infraestructura de red o CDN complementaria para asegurar que las imágenes se sirvan de manera óptima en cada continente.
- Supuesto: Se asume que el sistema de la tienda procesa la foto subida por el cliente para convertirla en un vector antes de enviarla al buscador.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-factura-electronica`

> Una distribuidora de repuestos necesita emitir la factura electrónica de cada venta ante la autoridad tributaria y guardar los PDF de las facturas en un almacenamiento de archivos.

**gemini**
- `ok` · Sistema de gestión para facturación y almacenamiento
- Esta propuesta cubre el almacenamiento de archivos PDF mediante un sistema distribuido y deja pendiente la integración directa con la autoridad tributaria para la emisión de facturas electrónicas, ya que los candidatos de pagos se enfocan en cobros y suscripciones.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos PDF: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos de forma eficiente con acceso rápido a disco, ideal para guardar los PDF de las facturas de la distribuidora de repuestos.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. Kill Bill maneja pagos y suscripciones, pero no realiza la emisión de facturas electrónicas ante la autoridad tributaria.
- Limitación: No se encontró ninguna herramienta entre los candidatos que realice la emisión de facturas electrónicas ante la autoridad tributaria.
- Supuesto: La distribuidora requiere integración con un proveedor externo o desarrollo a medida para cumplir con la emisión de facturas electrónicas exigida por la autoridad tributaria.
- Rúbrica: español _ · rationale _ · coherencia _

### `constructora-aprobaciones`

> Una constructora quiere que las solicitudes de compra sigan un flujo de aprobación: el residente de obra la pide, el ingeniero la aprueba y compras la registra; y avisar por correo a cada persona cuando tenga una solicitud pendiente.

**gemini**
- `ok` · Sistema de notificaciones para solicitudes de compra
- Esta propuesta implementa una plataforma de correo electrónico para enviar avisos automáticos a los involucrados en el flujo de aprobación. Queda pendiente el motor principal para gestionar los estados de las solicitudes entre el residente de obra, el ingeniero y el departamento de compras.
- **Postal** (`postalserver/postal`), Servidor de correo transaccional: Postal resuelve el envío de avisos por correo para notificar a cada persona cuando tenga una solicitud pendiente. Utiliza una licencia MIT y cuenta con un mantenimiento activo reciente y alta popularidad en GitHub con más de 16000 estrellas. Se conecta mediante SMTP o infraestructura de correo estándar para despachar las notificaciones del negocio sin complejidad excesiva en su integración de infraestructura de red y Ruby.
- Limitación: La propuesta no incluye la interfaz ni la lógica de negocio para que el residente de obra pida, el ingeniero apruebe y compras registre la solicitud, debido a la ausencia de herramientas específicas para flujos de trabajo de aprobación en los candidatos encontrados.
- Supuesto: Se asume que la constructora cuenta con un sistema externo o ERP para gestionar el flujo de estados de las solicitudes de compra, ya que no se encontraron candidatos para modelar dicha lógica de aprobación en este catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-mascotas-chat`

> Una tienda de mascotas quiere un chat en vivo para que sus clientes conversen con un asesor desde la página, y medir cuántos visitantes llegan a la página de cada producto.

**gemini**
- `ok` · Sistema de chat y analítica para tienda de mascotas
- La propuesta implementa una plataforma de analítica web para medir el tráfico en las páginas de productos de la tienda de mascotas. La necesidad de chat en vivo no cuenta con una herramienta directa entre los candidatos analizados, por lo que queda pendiente de resolución.
- **Umami** (`umami-software/umami`), Analítica web: Permite medir de forma sencilla el tráfico y las visitas de los usuarios en la página de cada producto de la tienda de mascotas. Su licencia es MIT y cuenta con actividad reciente.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Se seleccionó como referente cercano en infraestructura de comunicación, aunque no provee de manera nativa un chat en vivo para la página web de la tienda de mascotas.
- Supuesto: Se asume que la tienda de mascotas opera un sitio web propio donde se pueden integrar scripts de medición y widgets.
- Supuesto: El chat en vivo requiere la integración de un canal de mensajería externo que no fue encontrado en el catálogo de comunicación.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-contable-respaldos`

> Un estudio contable quiere copias de seguridad automáticas cada noche de las carpetas de sus clientes, y que cada contador entre con su cuenta y vea solo los clientes que tiene asignados.

**gemini**
- `ok` · Sistema de respaldo y control de acceso contable
- Esta propuesta implementa un sistema seguro para el estudio contable utilizando almacenamiento distribuido compatible con S3 para las copias de seguridad de las carpetas de los clientes y una plataforma de gestión de identidad para que cada contador acceda unívocamente a sus asignaciones. El sistema contempla copias automáticas nocturnas y control de acceso basado en cuentas de usuario.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos y respaldos: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar archivos de forma eficiente y escalar según el volumen requerido por el estudio contable.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y autenticación: Keycloak provee una infraestructura centralizada de identidad y acceso para que cada contador inicie sesión con su propia cuenta de forma segura.
- Limitación: La propuesta no incluye el software de automatización de respaldos nocturnos en sí, sino únicamente el destino de almacenamiento.
- Supuesto: Se asume que existe un script o herramienta adicional de respaldo que programará las ejecuciones cada noche hacia el almacenamiento.
- Supuesto: Se asume que el control fino de permisos por cliente asignado se configurará utilizando metadatos o políticas complementarias en la capa de aplicación.
- Rúbrica: español _ · rationale _ · coherencia _

### `marca-ropa-redes`

> Una marca de ropa quiere medir cuántas veces la mencionan en Instagram y TikTok, y enviar un boletín mensual por correo a sus suscriptores.

**gemini**
- `ok` · Sistema de envío de boletines por correo
- La propuesta cubre el envío del boletín mensual mediante una herramienta autohospedada de gestión de listas de correo. El monitoreo de menciones en Instagram y TikTok no cuenta con candidatos en esta selección.
- **listmonk** (`knadh/listmonk`), Gestor de boletines y correo masivo: Permite administrar listas de suscriptores y enviar campañas de correo electrónico de alto rendimiento mediante un panel de control moderno. Es una aplicación en un solo binario con licencia AGPL-3.0 y mantenimiento activo.
- Limitación: No se incluye ninguna herramienta para la medición de menciones en Instagram y TikTok ya que no hay candidatos disponibles para esa necesidad.
- Supuesto: La marca de ropa dispone de una lista de suscriptores en formato digital para importar en la herramienta de correo.
- Supuesto: No se encontraron candidatos para medir menciones en redes sociales como Instagram y TikTok.
- Rúbrica: español _ · rationale _ · coherencia _
