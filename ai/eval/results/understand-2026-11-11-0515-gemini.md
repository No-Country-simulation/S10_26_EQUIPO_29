# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 05:15. 19 casos × 3 corridas por proveedor; etiquetas versión 3; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.9 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 65% |
| Cobertura de necesidades | 92% |
| Necesidades inventadas | 13 |
| Vagos bien tratados | 6/6 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 79% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/57 |
| Evidencia literal | 98% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 1.5 s |
| Tokens de entrada (mediana) | 2114 |
| Tokens de salida (mediana) | 80 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 19 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| ai | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| analytics | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| auth | 6/6 · 6/6 · 5/6 | 0 · 0 · 0 |
| automation | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| backend | 0/0 · 0/0 · 0/0 | 2 · 2 · 1 |
| cache | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| cms | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| data-processing | 0/1 · 0/1 · 1/1 | 0 · 0 · 0 |
| database | 2/3 · 2/3 · 2/3 | 0 · 0 · 0 |
| frontend | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| infrastructure | 1/2 · 1/2 · 1/2 | 1 · 0 · 1 |
| messaging | 2/2 · 2/2 · 1/2 | 0 · 0 · 0 |
| observability | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| payments | 5/5 · 5/5 · 5/5 | 1 · 1 · 1 |
| search | 4/4 · 4/4 · 4/4 | 1 · 1 · 1 |
| storage | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| **Todas** | 37/40 · 37/40 · 36/40 | 5 · 4 · 4 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `clinica-citas` | auth, communication, payments | ✅✅✅ |
| `tienda-ropa` | analytics, automation, payments, search | ✅✅✅ |
| `academia-online` | ai, auth, payments, storage | ✅✅✅ |
| `logistica-flota` | analytics, data-processing, database, messaging | ❌❌❌ −data-processing −messaging |
| `soporte-ia` | ai, observability, search | ✅✅✅ |
| `periodico-digital` | analytics, cms, communication, frontend | ✅✅✅ |
| `pantalla-saas-largo` | auth, database | ❌❌❌ −database |
| `pantalla-rag-largo` | ai, auth, search | ✅✅✅ |
| `pantalla-api-largo` | cache, database, infrastructure | ❌❌❌ +backend −infrastructure |
| `pantalla-saas-corto` | auth | ✅✅✅ |
| `pantalla-rag-corto` | ai, auth | ❌❌❌ +search −auth |
| `pantalla-api-corto` | cache, infrastructure | ❌❌❌ +backend |
| `pantalla-eventos` | messaging | ❌❌❌ +payments |
| `pantalla-observabilidad` | observability | ❌✅❌ +infrastructure |
| `una-busqueda` | search | ✅✅✅ |
| `una-pagos` | payments | ✅✅✅ |
| `una-factura-electronica` | payments | ✅✅✅ |
| `vago-mejorar-negocio` | (vago) | ✅✅✅ |
| `vago-startup` | (vago) | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `clinica-citas`: **auth** «inicio de sesión de usuarios» ← “con su cuenta”; **communication** «envío de mensajes y notificaciones» ← “reciban recordatorios por WhatsApp o correo”; **payments** «procesamiento de cobros y pagos» ← “paguen un abono al reservar”
- `tienda-ropa`: **search** «búsqueda tolerante a errores de escritura» ← “un buscador que encuentre productos aunque el cliente escriba mal”; **payments** «procesamiento de pagos con tarjeta» ← “pagos con tarjeta y PSE”; **automation** «automatización de registro en hoja de cálculo» ← “que cada venta pase sola a nuestra hoja de cálculo contable”; **analytics** «analítica de ventas de productos» ← “ver qué productos se venden más”
- `academia-online`: **auth** «gestión de cuentas de usuario» ← “los alumnos entran con su cuenta”; **storage** «almacenamiento de archivos de video» ← “ven las clases grabadas que subimos”; **payments** «cobro de mensualidades y suscripciones» ← “pagan la mensualidad”; **ai** «asistente conversacional con recuperación de documentos» ← “tienen un chatbot que responde dudas con nuestro material”
- `logistica-flota`: **messaging** «procesamiento de eventos en tiempo real» ← “quieren procesar esos eventos en tiempo real”; **database** «almacenamiento y consulta de datos» ← “guardarlos”; **analytics** «tableros de control y analítica» ← “ver tableros de entregas por ciudad”
- `soporte-ia`: **ai** «ejecucion de modelos locales de lenguaje» ← “un asistente que responda a sus clientes usando su documentación, con un modelo que corra en sus propios servidores”; **search** «busqueda de texto en centro de ayuda» ← “un buscador para su centro de ayuda”; **observability** «monitoreo de rendimiento y fallos» ← “saber cuánto tarda y cuántas veces falla el asistente”
- `periodico-digital`: **cms** «gestión de contenido editorial sencillo» ← “que los periodistas publiquen desde un editor sencillo”; **frontend** «construcción de sitio web rápido» ← “un sitio web muy rápido”; **communication** «envío masivo de correos» ← “enviar el boletín diario por correo”; **analytics** «medición de lectura de notas» ← “saber qué notas se leen más”
- `pantalla-saas-largo`: **auth** «autenticacion y control de acceso basado en roles» ← “SSO mediante OIDC y RBAC por organización”
- `pantalla-rag-largo`: **search** «búsqueda híbrida y vectorial de texto» ← “búsqueda híbrida”; **auth** «gestión de permisos por documento» ← “permisos por documento”; **ai** «servidor de inferencia para modelos locales» ← “modelos alojados en nuestra infraestructura”
- `pantalla-api-largo`: **backend** «creacion de api de alta disponibilidad» ← “Propón una API de alta disponibilidad”; **database** «motor de base de datos relacional» ← “con PostgreSQL”; **cache** «cache distribuida en memoria» ← “caché distribuida”
- `pantalla-saas-corto`: **auth** «autenticacion y control de acceso basado en roles» ← “con autenticación y roles por organización.”
- `pantalla-rag-corto`: **search** «búsqueda semántica de documentos» ← “consultar documentos”; **auth** «control de permisos de acceso» ← “permisos de acceso”; **ai** «generación aumentada con recuperación de documentos» ← “RAG privado”
- `pantalla-api-corto`: **backend** «desarrollo de api backend» ← “Diseña una API”; **cache** «almacenamiento en caché en memoria» ← “con caché”; **infrastructure** «escalado horizontal e infraestructura» ← “escalado horizontal”
- `pantalla-eventos`: **messaging** «arquitectura orientada a eventos con colas» ← “una arquitectura orientada a eventos con colas, reintentos e idempotencia”; **payments** «procesamiento y cobro de pagos» ← “procesar pagos”
- `pantalla-observabilidad`: **observability** «recoleccion de metricas logs y trazas» ← “Define un stack de observabilidad con métricas, logs y trazas distribuidas para microservicios”; **infrastructure** «despliegue en plataforma de contenedores» ← “para microservicios en Kubernetes.”
- `una-busqueda`: **search** «b*00da de texto tolerante a errores» ← “un buscador de productos que encuentre resultados aunque el cliente escriba mal”
- `una-pagos`: **payments** «cobro de suscripciones mensuales» ← “Necesito cobrar suscripciones mensuales a los clientes de mi software.”
- `una-factura-electronica`: **payments** «emisión de facturas electrónicas» ← “emitir facturas electrónicas válidas ante la DIAN”
- `vago-mejorar-negocio`: preguntas: ¿A qué se dedica tu negocio y qué tipo de actividades o procesos quieres mejorar con tecnología? / ¿Qué problemas específicos o tareas manuales buscas resolver? / ¿Tienes alguna preferencia sobre si la solución debe ser una aplicación web, móvil o un sistema interno?
- `vago-startup`: preguntas: ¿Qué tipo de startup o producto planeas construir? / ¿Qué funcionalidades principales tendrá tu sistema en su primera versión?
