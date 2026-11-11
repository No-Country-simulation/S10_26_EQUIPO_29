# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 02:11. 19 casos × 3 corridas por proveedor; etiquetas versión 3; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.7 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 65% |
| Cobertura de necesidades | 93% |
| Necesidades inventadas | 13 |
| Vagos bien tratados | 6/6 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 79% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/57 |
| Evidencia literal | 97% |
| Consultas de 3 a 8 palabras | 98% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 2.8 s |
| Tokens de entrada (mediana) | 2114 |
| Tokens de salida (mediana) | 91 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 19 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| ai | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| analytics | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| auth | 6/6 · 5/6 · 6/6 | 0 · 0 · 0 |
| automation | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| backend | 0/0 · 0/0 · 0/0 | 2 · 2 · 2 |
| cache | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| cms | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| data-processing | 0/1 · 0/1 · 1/1 | 0 · 0 · 0 |
| database | 2/3 · 2/3 · 2/3 | 0 · 0 · 0 |
| frontend | 0/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| infrastructure | 2/2 · 2/2 · 2/2 | 1 · 0 · 1 |
| messaging | 2/2 · 2/2 · 1/2 | 0 · 0 · 0 |
| observability | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| payments | 5/5 · 5/5 · 5/5 | 1 · 1 · 1 |
| search | 4/4 · 4/4 · 4/4 | 0 · 1 · 1 |
| storage | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| **Todas** | 37/40 · 37/40 · 38/40 | 4 · 4 · 5 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `clinica-citas` | auth, communication, payments | ✅✅✅ |
| `tienda-ropa` | analytics, automation, payments, search | ✅✅✅ |
| `academia-online` | ai, auth, payments, storage | ✅✅✅ |
| `logistica-flota` | analytics, data-processing, database, messaging | ❌❌❌ −data-processing −messaging |
| `soporte-ia` | ai, observability, search | ✅✅✅ |
| `periodico-digital` | analytics, cms, communication, frontend | ❌✅✅ −frontend |
| `pantalla-saas-largo` | auth, database | ❌❌❌ −database |
| `pantalla-rag-largo` | ai, auth, search | ✅✅✅ |
| `pantalla-api-largo` | cache, database, infrastructure | ❌❌❌ +backend |
| `pantalla-saas-corto` | auth | ✅✅✅ |
| `pantalla-rag-corto` | ai, auth | ✅❌❌ +search −auth |
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

- `clinica-citas`: **auth** «gestion de cuentas de usuario» ← “con su cuenta”; **payments** «cobro de abonos en linea» ← “paguen un abono al reservar”; **communication** «envio de notificaciones por whatsapp y correo» ← “reciban recordatorios por WhatsApp o correo”
- `tienda-ropa`: **search** «buscador tolerante a errores de escritura» ← “un buscador que encuentre productos aunque el cliente escriba mal”; **payments** «procesamiento de pagos con tarjeta y PSE» ← “pagos con tarjeta y PSE”; **automation** «automatización de registro en hoja de cálculo» ← “que cada venta pase sola a nuestra hoja de cálculo contable”; **analytics** «analítica de productos más vendidos» ← “ver qué productos se venden más”
- `academia-online`: **auth** «autenticacion y cuentas de usuarios» ← “los alumnos entran con su cuenta”; **storage** «almacenamiento de archivos multimedia» ← “ven las clases grabadas que subimos”; **payments** «cobros y pagos recurrentes» ← “pagan la mensualidad”; **ai** «asistente conversacional con inteligencia artificial» ← “tienen un chatbot que responde dudas con nuestro material”
- `logistica-flota`: **messaging** «procesamiento de eventos en tiempo real» ← “procesar esos eventos en tiempo real”; **database** «almacenamiento y consulta de datos» ← “guardarlos”; **analytics** «visualizacion de tableros de negocio» ← “ver tableros de entregas por ciudad”
- `soporte-ia`: **ai** «ejecucion local de modelos de inteligencia artificial» ← “con un modelo que corra en sus propios servidores”; **search** «buscador de texto para centro de ayuda» ← “un buscador para su centro de ayuda”; **observability** «monitoreo de latencia y tasa de errores» ← “saber cuánto tarda y cuántas veces falla el asistente”
- `periodico-digital`: **cms** «gestion de contenido editorial» ← “que los periodistas publiquen desde un editor sencillo”; **communication** «envio masivo de correos» ← “enviar el boletin diario por correo”; **analytics** «analitica de lectura de articulos» ← “saber que notas se leen mas”
- `pantalla-saas-largo`: **auth** «gestión de identidad y permisos» ← “SSO mediante OIDC y RBAC por organización”
- `pantalla-rag-largo`: **ai** «modelos de lenguaje alojados localmente» ← “modelos alojados en nuestra infraestructura”; **search** «búsqueda híbrida y vectorial de documentos» ← “búsqueda híbrida”; **auth** «control de acceso y permisos por documento» ← “permisos por documento”
- `pantalla-api-largo`: **database** «motor de base de datos relacional» ← “PostgreSQL”; **cache** «caché distribuida en memoria» ← “caché distribuida”; **infrastructure** «escalado horizontal y alta disponibilidad» ← “alta disponibilidad con PostgreSQL, caché distribuida y escalado horizontal”; **backend** «construcción de una API» ← “Propón una API”
- `pantalla-saas-corto`: **auth** «autenticacion y control de acceso basado en roles por organizacion» ← “autenticación y roles por organización”
- `pantalla-rag-corto`: **ai** «recuperación y generación aumentada de documentos» ← “RAG privado para consultar documentos”; **auth** «control de acceso y permisos de usuarios» ← “permisos de acceso”
- `pantalla-api-corto`: **backend** «desarrollo de API de alta disponibilidad» ← “Diseña una API de alta disponibilidad”; **cache** «almacenamiento en caché para rendimiento» ← “con caché”; **infrastructure** «escalado horizontal de infraestructura» ← “y escalado horizontal.”
- `pantalla-eventos`: **messaging** «arquitectura orientada a eventos con colas y reintentos» ← “arquitectura orientada a eventos con colas, reintentos e idempotencia”; **payments** «procesamiento de pagos en línea» ← “procesar pagos”
- `pantalla-observabilidad`: **observability** «recopilación de métricas logs y trazas distribuidas» ← “Define un stack de observabilidad con métricas, logs y trazas distribuidas para microservicios”; **infrastructure** «orquestación y despliegue de contenedores» ← “para microservicios en Kubernetes.”
- `una-busqueda`: **search** «buscador de productos con tolerancia a errores» ← “buscador de productos que encuentre resultados aunque el cliente escriba mal”
- `una-pagos`: **payments** «cobro de suscripciones recurrentes» ← “cobrar suscripciones mensuales”
- `una-factura-electronica`: **payments** «emision de facturas electronicas fiscales» ← “Necesito emitir facturas electrónicas válidas ante la DIAN para las ventas de mi tienda.”
- `vago-mejorar-negocio`: preguntas: ¿A qué se dedica tu negocio y qué tipo de actividades o procesos realizas actualmente? / ¿Qué problema específico o tarea te gustaría resolver o automatizar con la nueva tecnología? / ¿Tienes alguna preferencia sobre si la solución debe ser una aplicación web, móvil o una herramienta interna para el equipo?
- `vago-startup`: preguntas: ¿Qué tipo de startup o producto planeas construir? / ¿Qué funcionalidades principales tendrá tu aplicación en su primera versión? / ¿Qué tecnologías o lenguajes de programación prefieres o ya conoces?
