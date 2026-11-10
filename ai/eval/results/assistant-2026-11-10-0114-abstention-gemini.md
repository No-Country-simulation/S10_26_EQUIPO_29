# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 01:14. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.8 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 96% |
| Respuesta válida | 100% |
| Necesidades detectadas | 81% |
| Techo de la búsqueda (top 5) | 96% |
| Techo con 5 candidatos | 96% |
| Eligió un aceptable (donde había) | 100% |
| Se abstuvo (donde no había) | 75% |
| Acierto de punta a punta (comparable entre k) | 96% |
| Sin caja donde el caso no tiene herramientas | 73% |
| Eligió el primer candidato | 81% |
| Consistencia entre corridas | 50% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 7 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 15 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 4.0 s |
| Tiempo total (peor caso) | 5.1 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.5 s · 0.2 s · 2.2 s |
| Tokens entrada / salida (mediana) | 3951 / 542 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 88% | 100% | 100% | 88% – 100% |
| Eligió un aceptable (donde había) | 100% | 100% | 100% | 100% – 100% |
| Se abstuvo (donde no había) | 67% | 80% | 80% | 67% – 80% |
| Acierto de punta a punta | 88% | 100% | 100% | 88% – 100% |
| Textos del modelo que hablan del catálogo | 6 | 4 | 5 | 4 – 6 |

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
| `constructora-aprobaciones` · automation | (ninguno) | det 0/3 · eligió algo 0 |
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
- `no_evidence` · Sistema de gestión y videollamadas médicas
- Esta propuesta aborda las necesidades detectadas en el pedido utilizando las herramientas disponibles en los candidatos encontrados. Sin embargo, no fue posible cubrir completamente el almacenamiento relacional de historias clínicas ni la funcionalidad de videollamadas debido a las limitaciones de los candidatos.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. La herramienta gestiona datos críticos mediante un almacén clave-valor distribuido, lo cual no corresponde a una base de datos relacional para historias clínicas.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. La herramienta se enfoca en el procesamiento y servicio de modelos de lenguaje, sin ofrecer capacidades de videollamada para la atención médica.
- Supuesto: Se asume que la red de consultorios cuenta con infraestructura propia para hospedar los servicios seleccionados.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-profesional-contactos`

> Una red profesional quiere guardar quién trabajó con quién en una base de datos de grafos para recomendar contactos, y que los usuarios entren con su cuenta de LinkedIn o Google.

**gemini**
- `ok` · Arquitectura de red profesional con grafos e identidades
- La propuesta implementa la autenticación de usuarios mediante proveedores externos y gestiona los datos del sistema. Queda pendiente el soporte específico para bases de datos de grafos, ya que no se encontraron candidatos con esa capacidad exacta en el catálogo.
- **Ory Kratos** (`ory/kratos`), Gestión de identidad y autenticación: Resuelve la necesidad de permitir que los usuarios entren con su cuenta de Google o LinkedIn mediante su capacidad de inicio de sesión social. Utiliza licencia Apache-2.0 y cuenta con actividad reciente.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. No se encontraron candidatos de bases de datos de grafos en el catálogo. Se seleccionó PostgreSQL como gestor relacional de bases de datos para guardar la información general de la red profesional.
- Supuesto: Se asume que la red profesional requiere alta disponibilidad para el acceso de los usuarios.
- Supuesto: El almacenamiento relacional se utilizará para estructurar la información de los contactos a falta de una base de datos de grafos nativa.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-global-imagenes`

> Una tienda en línea que vende en varios continentes quiere que las fotos de sus productos se sirvan desde servidores cercanos a cada comprador, y un buscador donde el cliente suba una foto y encuentre productos parecidos.

**gemini**
- `ok` · Sistema de almacenamiento distribuido y búsqueda visual global
- La propuesta implementa un sistema para una tienda en línea global que permite almacenar y servir fotos de productos de forma distribuida, complementado con un motor de búsqueda vectorial para encontrar artículos mediante imágenes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacén de objetos y archivos distribuidos: Resuelve la distribución de las fotos de los productos para que se sirvan de manera eficiente gracias a su arquitectura de almacenamiento distribuido.
- **Qdrant** (`qdrant/qdrant`), Motor de búsqueda vectorial: Permite encontrar productos parecidos mediante la subida de una foto utilizando capacidades de búsqueda de imágenes y similitud de embeddings.
- Limitación: La propuesta no incluye la pasarela de pagos ni la gestión de carritos de compra de la tienda en línea.
- Supuesto: Se asume que la tienda en línea cuenta con un servicio web o aplicación para procesar las consultas de los usuarios.
- Supuesto: Se asume la necesidad de un pipeline previo para extraer los embeddings vectoriales de las fotos de los productos antes de almacenarlos en el motor de búsqueda.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-factura-electronica`

> Una distribuidora de repuestos necesita emitir la factura electrónica de cada venta ante la autoridad tributaria y guardar los PDF de las facturas en un almacenamiento de archivos.

**gemini**
- `ok` · Sistema de gestión para facturación y almacenamiento
- La propuesta incluye herramientas para gestionar la facturación y el almacenamiento de los archivos PDF generados por la distribuidora de repuestos. Queda pendiente la emisión directa ante la autoridad tributaria, ya que los candidatos de pagos se enfocan en suscripciones y facturación periódica.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de PDF: SeaweedFS es un sistema de almacenamiento distribuido para objetos y archivos diseñado para manejar miles de millones de archivos con acceso rápido, bajo licencia Apache-2.0 y actividad reciente.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. Se selecciona Kill Bill porque maneja suscripciones y pagos, aunque no realiza la emisión directa de la factura electrónica ante la autoridad tributaria.
- Limitación: Se sugieren herramientas adicionales para la integración fiscal que no están presentes en el catálogo.
- Supuesto: La distribuidora requiere una interfaz para conectar el sistema de ventas con el almacenamiento de archivos.
- Supuesto: Se necesitará un módulo adicional para la integración específica con la autoridad tributaria local.
- Rúbrica: español _ · rationale _ · coherencia _

### `constructora-aprobaciones`

> Una constructora quiere que las solicitudes de compra sigan un flujo de aprobación: el residente de obra la pide, el ingeniero la aprueba y compras la registra; y avisar por correo a cada persona cuando tenga una solicitud pendiente.

**gemini**
- `ok` · Sistema de notificaciones por correo para solicitudes de compra
- La propuesta implementa una plataforma de correo electrónico para enviar avisos automáticos a los involucrados en el flujo de compras. Queda pendiente la gestión propia del flujo de aprobación y registro de solicitudes de compra.
- **Postal** (`postalserver/postal`), Servidor de correo para notificaciones: Postal resuelve el envío de correos electrónicos transaccionales requeridos para avisar a cada persona sobre sus solicitudes pendientes. Cuenta con licencia MIT y se mantiene activamente.
- Limitación: La propuesta no incluye la funcionalidad para que el residente de obra pida la solicitud, el ingeniero la apruebe y compras la registre.
- Supuesto: Se asume que la constructora cuenta con un sistema externo para gestionar el flujo de aprobación de solicitudes, ya que no se encontraron herramientas específicas para flujos de trabajo en el catálogo.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-mascotas-chat`

> Una tienda de mascotas quiere un chat en vivo para que sus clientes conversen con un asesor desde la página, y medir cuántos visitantes llegan a la página de cada producto.

**gemini**
- `ok` · Solución de Analítica y Comunicación para Tienda de Mascotas
- La propuesta cubre la medición del tráfico web en las páginas de productos mediante analítica respetuosa con la privacidad. Para el chat en vivo con asesores, no se encontró una herramienta dedicada en el catálogo, por lo que se señala esa limitación para el proyecto.
- **Novu** (`novuhq/novu`), Infraestructura de comunicación: Proporciona la infraestructura de comunicación para agentes y productos. Su licencia no fue identificada por GitHub.
- **Plausible Analytics** (`plausible/analytics`), Medición de tráfico web: Mide el tráfico web de forma ligera y respetuosa con la privacidad para entender las visitas de los usuarios. Utiliza una licencia AGPL-3.0 y se mantiene de forma activa.
- Limitación: Ninguno de los candidatos en la necesidad de comunicación corresponde exactamente a un chat en vivo directo para la página web.
- Supuesto: Se asume que la tienda de mascotas cuenta con un sitio web propio donde integrar las herramientas.
- Supuesto: Se asume que el personal de la tienda utilizará la infraestructura de comunicación para atender a los clientes.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-contable-respaldos`

> Un estudio contable quiere copias de seguridad automáticas cada noche de las carpetas de sus clientes, y que cada contador entre con su cuenta y vea solo los clientes que tiene asignados.

**gemini**
- `ok` · Sistema de autenticación y respaldo automático para estudio contable
- La propuesta implementa una infraestructura segura con Keycloak para la autenticación y permisos de los contadores, y Apache Airflow para programar las copias de seguridad nocturnas de las carpetas de los clientes mediante flujos de trabajo programados.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad y acceso: Permite que cada contador entre con su cuenta y gestione los permisos de acceso para ver solo los clientes asignados. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento distribuido: Soporta sistemas de archivos y almacenamiento distribuido para guardar las copias de seguridad automáticas de las carpetas de los clientes. Posee licencia Apache-2.0 y actualización reciente.
- **Apache Airflow** (`apache/airflow`), Orquestación de tareas: Permite programar y ejecutar de forma automatizada las copias de seguridad cada noche. Utiliza licencia Apache-2.0 con actividad constante en su desarrollo.
- Limitación: La propuesta no incluye una interfaz contable específica de gestión de clientes, la cual debe integrarse de manera externa utilizando las capacidades de autenticación y almacenamiento provistas.
- Supuesto: Se asume que el estudio contable cuenta con la infraestructura de servidores necesaria para hospedar estas herramientas de código abierto.
- Supuesto: Se asume que la asignación específica de clientes por contador se configurará a través de los roles y grupos disponibles en la plataforma de autenticación.
- Rúbrica: español _ · rationale _ · coherencia _

### `marca-ropa-redes`

> Una marca de ropa quiere medir cuántas veces la mencionan en Instagram y TikTok, y enviar un boletín mensual por correo a sus suscriptores.

**gemini**
- `ok` · Arquitectura de comunicacion y boletines para marca de ropa
- Se propone una herramienta para el envio masivo de boletines por correo solicitada por la marca. No se encontraron candidatos para la medicion de menciones en redes sociales como Instagram y TikTok.
- **listmonk** (`knadh/listmonk`), Gestor de boletines y correo: Permite administrar listas de correo y enviar campanas de boletines mensuales a los suscriptores de manera autohospedada. Cuenta con un panel de control moderno y esta optimizado para alto rendimiento.
- Limitación: La propuesta no incluye la medicion de menciones en Instagram y TikTok solicitada por el usuario, ya que no se encontraron candidatos para esa necesidad.
- Supuesto: Se asume que la marca de ropa cuenta con una lista de suscriptores existente para importar al sistema de correo.
- Supuesto: Se requiere medir menciones en Instagram y TikTok pero no hay candidatos disponibles para esta funcion.
- Rúbrica: español _ · rationale _ · coherencia _
