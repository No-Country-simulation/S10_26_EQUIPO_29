# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 06:16. 19 casos × 3 corridas por proveedor; etiquetas versión 3; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 40.4 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 67% |
| Cobertura de necesidades | 92% |
| Necesidades inventadas | 13 |
| Vagos bien tratados | 6/6 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 74% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/57 |
| Evidencia literal | 97% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 1.6 s |
| Tokens de entrada (mediana) | 2517 |
| Tokens de salida (mediana) | 102 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 19 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| ai | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| analytics | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| auth | 6/6 · 6/6 · 6/6 | 0 · 0 · 0 |
| automation | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| backend | 0/0 · 0/0 · 0/0 | 2 · 1 · 1 |
| cache | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| cms | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| data-processing | 1/1 · 0/1 · 0/1 | 1 · 1 · 1 |
| database | 2/3 · 2/3 · 2/3 | 0 · 0 · 0 |
| frontend | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| infrastructure | 2/2 · 2/2 · 2/2 | 1 · 1 · 0 |
| messaging | 1/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| observability | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| payments | 5/5 · 5/5 · 5/5 | 1 · 1 · 1 |
| search | 4/4 · 4/4 · 4/4 | 0 · 0 · 1 |
| storage | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| **Todas** | 37/40 · 37/40 · 37/40 | 5 · 4 · 4 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `clinica-citas` | auth, communication, payments | ✅✅✅ |
| `tienda-ropa` | analytics, automation, payments, search | ❌❌❌ +data-processing −automation |
| `academia-online` | ai, auth, payments, storage | ✅✅✅ |
| `logistica-flota` | analytics, data-processing, database, messaging | ❌❌❌ −data-processing −messaging |
| `soporte-ia` | ai, observability, search | ✅✅✅ |
| `periodico-digital` | analytics, cms, communication, frontend | ✅✅✅ |
| `pantalla-saas-largo` | auth, database | ❌❌❌ −database |
| `pantalla-rag-largo` | ai, auth, search | ✅❌✅ +infrastructure |
| `pantalla-api-largo` | cache, database, infrastructure | ❌✅✅ +backend |
| `pantalla-saas-corto` | auth | ✅✅✅ |
| `pantalla-rag-corto` | ai, auth | ✅✅❌ +search |
| `pantalla-api-corto` | cache, infrastructure | ❌❌❌ +backend |
| `pantalla-eventos` | messaging | ❌❌❌ +payments |
| `pantalla-observabilidad` | observability | ❌✅✅ +infrastructure |
| `una-busqueda` | search | ✅✅✅ |
| `una-pagos` | payments | ✅✅✅ |
| `una-factura-electronica` | payments | ✅✅✅ |
| `vago-mejorar-negocio` | (vago) | ✅✅✅ |
| `vago-startup` | (vago) | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `clinica-citas`: **auth** «inicio de sesión y gestión de cuentas» ← “reserven citas en línea con su cuenta”; **communication** «envío de recordatorios multicanal» ← “reciban recordatorios por WhatsApp o correo”; **payments** «cobros en línea de abonos» ← “paguen un abono al reservar”
- `tienda-ropa`: **search** «búsqueda tolerante a errores de escritura» ← “un buscador que encuentre productos aunque el cliente escriba mal”; **payments** «procesamiento de pagos con tarjeta» ← “pagos con tarjeta y PSE”; **data-processing** «sincronización automática de datos contables» ← “que cada venta pase sola a nuestra hoja de cálculo contable”; **analytics** «analítica de productos más vendidos» ← “ver qué productos se venden más”
- `academia-online`: **auth** «sistema de autenticacion de usuarios» ← “los alumnos entran con su cuenta”; **storage** «almacenamiento de archivos multimedia» ← “ven las clases grabadas que subimos”; **payments** «procesamiento de pagos en linea» ← “pagan la mensualidad”; **ai** «asistente conversacional con inteligencia artificial» ← “tienen un chatbot que responde dudas con nuestro material”
- `logistica-flota`: **database** «almacenamiento de datos geoespaciales» ← “guardarlos”; **analytics** «visualización de tableros de entregas» ← “ver tableros de entregas por ciudad”; **data-processing** «procesamiento de eventos en tiempo real» ← “procesar esos eventos en tiempo real”
- `soporte-ia`: **ai** «servidor de inferencia para modelos propios» ← “con un modelo que corra en sus propios servidores”; **search** «buscador de texto completo o semántico» ← “un buscador para su centro de ayuda”; **observability** «monitoreo de métricas y rendimiento» ← “saber cuánto tarda y cuántas veces falla el asistente”
- `periodico-digital`: **cms** «gestion de contenido editorial» ← “que los periodistas publiquen desde un editor sencillo”; **frontend** «desarrollo de interfaz web» ← “un sitio web muy rápido”; **communication** «envio masivo de correos» ← “enviar el boletín diario por correo”; **analytics** «analitica de trafico web» ← “saber qué notas se leen más”
- `pantalla-saas-largo`: **auth** «autenticacion de usuarios y control de acceso» ← “SSO mediante OIDC y RBAC por organización”
- `pantalla-rag-largo`: **auth** «control de accesos basado en permisos por documento» ← “permisos por documento”; **search** «motor de búsqueda híbrida» ← “búsqueda híbrida”; **ai** «implementación de modelos de inteligencia artificial» ← “modelos alojados en nuestra infraestructura”
- `pantalla-api-largo`: **backend** «construccion de api de alta disponibilidad» ← “Propón una API de alta disponibilidad”; **database** «motor de base de datos relacional» ← “PostgreSQL”; **cache** «almacenamiento en cache distribuida» ← “caché distribuida”; **infrastructure** «escalado horizontal de infraestructura» ← “escalado horizontal”
- `pantalla-saas-corto`: **auth** «autenticacion y roles multiempresa» ← “autenticación y roles por organización”
- `pantalla-rag-corto`: **ai** «respuestas basadas en documentos privados» ← “Propón un RAG privado para consultar documentos”; **auth** «control de acceso por permisos» ← “con permisos de acceso”
- `pantalla-api-corto`: **backend** «creación de API de alta disponibilidad» ← “Diseña una API de alta disponibilidad”; **cache** «almacenamiento temporal en memoria caché» ← “con caché”; **infrastructure** «escalado horizontal de infraestructura» ← “y escalado horizontal”
- `pantalla-eventos`: **messaging** «procesamiento de eventos con colas y reintentos» ← “arquitectura orientada a eventos con colas, reintentos e idempotencia”; **payments** «procesamiento y gestión de pagos» ← “procesar pagos”
- `pantalla-observabilidad`: **observability** «recopilación de métricas logs y trazas» ← “Define un stack de observabilidad con métricas, logs y trazas distribuidas para microservicios en Kubernetes.”; **infrastructure** «orquestación y despliegue de contenedores» ← “para microservicios en Kubernetes.”
- `una-busqueda`: **search** «b%c3%a9squeda tolerante a errores ortogr%c3%a1ficos» ← “un buscador de productos que encuentre resultados aunque el cliente escriba mal”
- `una-pagos`: **payments** «cobros recurrentes y gestion de suscripciones» ← “cobrar suscripciones mensuales a los clientes de mi software”
- `una-factura-electronica`: **payments** «emisi3n de facturas electr3nicas» ← “Necesito emitir facturas electr3nicas v3lidas ante la DIAN para las ventas de mi tienda.”
- `vago-mejorar-negocio`: preguntas: A qué se dedica tu negocio y qué actividades realizas en el día a día? / Qué procesos o tareas específicas te gustaria automatizar o mejorar con tecnologia? / Tienes algun sistema actual que utilices y necesites conservar?
- `vago-startup`: preguntas: ¿De qué trata tu startup y qué problema busca resolver? / ¿Qué tipo de aplicación o plataforma planeas construir (web, móvil, API, etc.)? / ¿Qué funcionalidades principales necesitas que tenga el sistema en esta primera etapa?
