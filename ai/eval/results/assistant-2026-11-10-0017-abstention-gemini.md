# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-10 a las 00:17. 8 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.8 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 100% |
| Respuesta válida | 100% |
| Necesidades detectadas | 81% |
| Techo de la búsqueda (top 5) | 96% |
| Techo con 5 candidatos | 96% |
| Eligió un aceptable (donde había) | 100% |
| Se abstuvo (donde no había) | 62% |
| Acierto de punta a punta (comparable entre k) | 96% |
| Sin caja donde el caso no tiene herramientas | 67% |
| Eligió el primer candidato | 66% |
| Consistencia entre corridas | 62% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 96% |
| Limitaciones repetidas · borrador del modelo | 2 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 6 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/24 |
| Tiempo total (mediana) | 3.7 s |
| Tiempo total (peor caso) | 6.4 s |
| Sobre 15 s | 0/24 |
| Entender · buscar · generar (mediana) | 1.5 s · 0.1 s · 2.0 s |
| Tokens entrada / salida (mediana) | 3990 / 534 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 100% | 100% | 100% | 100% – 100% |
| Eligió un aceptable (donde había) | 100% | 100% | 100% | 100% – 100% |
| Se abstuvo (donde no había) | 60% | 50% | 80% | 50% – 80% |
| Acierto de punta a punta | 100% | 88% | 100% | 88% – 100% |
| Textos del modelo que hablan del catálogo | 2 | 0 | 4 | 0 – 4 |

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
| `tienda-mascotas-chat` · communication | (ninguno) | det 3/3 · eligió algo 2 |
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
- `ok` · Sistema de Videollamadas y Base de Datos Relacional
- La propuesta cubre parcialmente la infraestructura de base de datos relacional para guardar historias clínicas utilizando MariaDB, pero no cuenta con candidatos adecuados para ofrecer capacidad directa de videollamadas en el navegador.
- **MariaDB/server** (`MariaDB/server`), Almacén de datos relacional para historias clínicas: MariaDB server es un servidor de base de datos desarrollado por la comunidad y bifurcado de MySQL, ideal para almacenar de manera confiable y estructurada las historias clínicas de los pacientes.
- Limitación: Comunicación: ninguna de las herramientas encontradas encaja. Los candidatos encontrados en esta categoría están orientados a pruebas de extremo a extremo, automatización web o desarrollo de interfaces, y no proveen la capacidad de realizar videollamadas.
- Limitación: No hay herramientas que resuelvan la capacidad de videollamadas en el navegador entre médicos y pacientes.
- Supuesto: Se asume que la red de consultorios cuenta con personal técnico para integrar una solución externa de videollamadas, ya que no hay herramientas para ello en los candidatos.
- Rúbrica: español _ · rationale _ · coherencia _

### `red-profesional-contactos`

> Una red profesional quiere guardar quién trabajó con quién en una base de datos de grafos para recomendar contactos, y que los usuarios entren con su cuenta de LinkedIn o Google.

**gemini**
- `ok` · Infraestructura para Red Profesional y Recomendación
- La propuesta cubre la autenticación de usuarios mediante proveedores externos y un sistema de almacenamiento clave-valor. No fue posible incluir una base de datos de grafos dedicada ya que los candidatos encontrados ofrecen modelos clave-valor, distribuidos o de almacenamiento de objetos, pero se seleccionó la mejor alternativa disponible en el catálogo.
- **Keycloak** (`keycloak/keycloak`), Gestión de identidad: Keycloak es una solución de código abierto para la gestión de identidad y accesos que permite configurar autenticación y federación con múltiples proveedores externos.
- Limitación: Bases de datos: ninguna de las herramientas encontradas encaja. etcd-io/etcd ofrece un almacén de clave-valor distribuido y confiable para sistemas distribuidos, pero no implementa un motor de grafos nativo para modelar relaciones complejas entre usuarios.
- Limitación: No se dispone de una base de datos de grafos nativa en los candidatos evaluados, por lo que las recomendaciones de contactos requerirán lógica adicional en la aplicación.
- Supuesto: Se asume que la red profesional puede operar temporalmente con un almacenamiento estructurado clave-valor en lugar de una base de datos de grafos estricta.
- Supuesto: Se requiere un servidor de identidad centralizado para manejar los flujos de inicio de sesión social.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-global-imagenes`

> Una tienda en línea que vende en varios continentes quiere que las fotos de sus productos se sirvan desde servidores cercanos a cada comprador, y un buscador donde el cliente suba una foto y encuentre productos parecidos.

**gemini**
- `ok` · Arquitectura global de almacenamiento y búsqueda visual
- Esta propuesta implementa un sistema para una tienda en línea internacional, utilizando almacenamiento distribuido para servir fotos eficientemente y un motor de búsqueda vectorial para encontrar productos mediante imágenes.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento distribuido: Resuelve la necesidad de almacenar y distribuir archivos a gran escala mediante un sistema distribuido para almacenamiento de objetos. Cuenta con licencia Apache-2.0 y mantenimiento activo.
- **Qdrant** (`qdrant/qdrant`), Búsqueda vectorial: Permite realizar búsquedas por similitud de imágenes y vectores a escala masiva gracias a su motor de búsqueda vectorial de alto rendimiento. Posee licencia Apache-2.0 y actualización reciente.
- Limitación: Ninguna de las herramientas de almacenamiento incluye de forma nativa una red de entrega de contenido (CDN) global para la última milla, por lo que se requerirá infraestructura adicional.
- Supuesto: Se asume que la distribución global de SeaweedFS se configura mediante múltiples nodos replicados en las regiones geográficas de los compradores.
- Rúbrica: español _ · rationale _ · coherencia _

### `repuestos-factura-electronica`

> Una distribuidora de repuestos necesita emitir la factura electrónica de cada venta ante la autoridad tributaria y guardar los PDF de las facturas en un almacenamiento de archivos.

**gemini**
- `ok` · Sistema de gestión para facturas y almacenamiento
- Esta propuesta organiza el almacenamiento de archivos de la distribuidora mediante un sistema distribuido y deja constancia de las limitaciones para la facturación electrónica ante la autoridad tributaria.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de archivos PDF: SeaweedFS es un sistema de almacenamiento distribuido diseñado para manejar miles de millones de archivos con acceso rápido a disco, ideal para guardar los PDF de las facturas.
- Limitación: Pagos: ninguna de las herramientas encontradas encaja. Los candidatos encontrados se enfocan en cobros y facturación basada en uso, pero ninguno realiza la emisión de facturas electrónicas fiscales ante la autoridad tributaria.
- Limitación: No se encontró ninguna herramienta en los candidatos que resuelva la emisión de facturas electrónicas ante la autoridad tributaria.
- Supuesto: La distribuidora requiere alta disponibilidad para acceder a los comprobantes almacenados.
- Supuesto: Se necesitará desarrollar o integrar un módulo externo para conectar con la autoridad tributaria.
- Rúbrica: español _ · rationale _ · coherencia _

### `constructora-aprobaciones`

> Una constructora quiere que las solicitudes de compra sigan un flujo de aprobación: el residente de obra la pide, el ingeniero la aprueba y compras la registra; y avisar por correo a cada persona cuando tenga una solicitud pendiente.

**gemini**
- `ok` · Sistema de notificaciones para solicitudes de compra
- Se propone una plataforma de correo para enviar avisos automáticos a cada involucrado en las solicitudes de compra. El flujo de aprobación y registro de compras queda pendiente por falta de herramientas específicas en esta selección.
- **Postal** (`postalserver/postal`), Envío de correos de notificación: Postal resuelve el envío de correos electrónicos transaccionales mediante una plataforma completa con licencia MIT y mantenimiento reciente, ideal para avisar a cada persona cuando tenga una solicitud pendiente.
- Limitación: La propuesta no incluye la gestión del flujo de aprobación ni el registro formal de las solicitudes de compra.
- Supuesto: Se asume que la constructora cuenta con un sistema externo o manual para el flujo de aprobación entre el residente, el ingeniero y compras.
- Supuesto: El pedido sugiere un gestor de flujos de trabajo o ERP que no se encuentra entre los candidatos disponibles.
- Rúbrica: español _ · rationale _ · coherencia _

### `tienda-mascotas-chat`

> Una tienda de mascotas quiere un chat en vivo para que sus clientes conversen con un asesor desde la página, y medir cuántos visitantes llegan a la página de cada producto.

**gemini**
- `ok` · Sistema para tienda de mascotas con chat y analitica
- La propuesta integra herramientas de comunicacion y analitica para cubrir las necesidades de la tienda de mascotas. Se establece una infraestructura para agentes y comunicacion junto con una plataforma de analitica web orientada a la privacidad.
- **Novu** (`novuhq/novu`), Infraestructura de comunicacion: Novu ofrece la infraestructura de comunicacion necesaria para conectar a los clientes con los agentes. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- **Umami** (`umami-software/umami`), Plataforma de analitica web: Umami permite medir el trafico y comportamiento de los visitantes en la pagina web sin utilizar cookies. Cuenta con licencia MIT y actualizacion reciente.
- Limitación: No se cubren aspectos de gestion de inventario o pasarela de pagos para la tienda de mascotas.
- Supuesto: Se asume que la tienda de mascotas cuenta con un sitio web propio donde integrar estas herramientas.
- Supuesto: Se asume que los agentes de soporte utilizaran la infraestructura provista para atender las consultas de los clientes.
- Rúbrica: español _ · rationale _ · coherencia _

### `estudio-contable-respaldos`

> Un estudio contable quiere copias de seguridad automáticas cada noche de las carpetas de sus clientes, y que cada contador entre con su cuenta y vea solo los clientes que tiene asignados.

**gemini**
- `ok` · Sistema de gestión de archivos y acceso para estudio contable
- Esta propuesta implementa un sistema seguro para el estudio contable mediante un almacenamiento distribuido de alta capacidad para las copias de seguridad de las carpetas de los clientes y una infraestructura de identidad centralizada para gestionar el acceso por roles de los contadores.
- **SeaweedFS** (`seaweedfs/seaweedfs`), Almacenamiento de respaldos: Resuelve la necesidad de guardar las carpetas de los clientes al ser un sistema de almacenamiento distribuido diseñado para manejar miles de millones de archivos con acceso rápido y bajo Apache-2.0.
- **Keycloak** (`keycloak/keycloak`), Gestión de acceso y cuentas: Permite que cada contador ingrese con su propia cuenta de forma segura mediante una infraestructura de identidad y acceso open source con licencia Apache-2.0.
- Limitación: La propuesta no incluye la interfaz de usuario final ni el software específico para la visualización de las carpetas de los clientes por cada contador.
- Supuesto: Se asume que el estudio contable cuenta con un script o agente externo para programar y ejecutar las copias de seguridad automáticas cada noche hacia el sistema de almacenamiento.
- Supuesto: Se asume que la interfaz de usuario que consultarán los contadores integrará el control de acceso provisto por la herramienta de autenticación.
- Rúbrica: español _ · rationale _ · coherencia _

### `marca-ropa-redes`

> Una marca de ropa quiere medir cuántas veces la mencionan en Instagram y TikTok, y enviar un boletín mensual por correo a sus suscriptores.

**gemini**
- `ok` · Sistema de gestión de boletines por correo electrónico
- La propuesta cubre el envío de boletines mensuales mediante un gestor especializado. Queda sin resolver la medición de menciones en Instagram y TikTok por falta de candidatos específicos en el catálogo.
- **listmonk** (`knadh/listmonk`), Gestor de listas y campañas de correo: Permite administrar listas de suscriptores y enviar campañas de marketing por correo electrónico de alto rendimiento con un panel moderno.
- Limitación: La propuesta no incluye la medición de menciones en Instagram y TikTok.
- Supuesto: Se asume que la marca de ropa cuenta con una base de datos de suscriptores existente para importar al sistema.
- Supuesto: El usuario requiere medir menciones en redes sociales, pero no se encontraron herramientas para dicha tarea entre los candidatos analizados.
- Rúbrica: español _ · rationale _ · coherencia _
