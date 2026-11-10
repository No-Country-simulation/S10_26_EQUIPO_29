# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 02:44. 10 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 9.2 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 87% |
| Cobertura de necesidades | 95% |
| Necesidades inventadas | 4 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 90% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/30 |
| Evidencia literal | 98% |
| Consultas de 3 a 8 palabras | 98% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 3.4 s |
| Tokens de entrada (mediana) | 2135 |
| Tokens de salida (mediana) | 114 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 10 casos; los porcentajes no son estadística firme.

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `inmobiliaria-portal` | search, storage | ✅✅✅ |
| `agencia-viajes-web` | frontend | ✅✅✅ |
| `cooperativa-api` | backend, database | ✅✅✅ |
| `colegio-avisos` | communication, data-processing | ✅✅✅ |
| `ong-voluntarios` | auth, storage | ✅✅✅ |
| `gimnasio-cobros` | communication, database, payments | ✅✅✅ |
| `repuestos-buscador` | observability, search | ✅✅✅ |
| `restaurantes-reportes` | communication, data-processing | ✅✅✅ |
| `energia-medidores` | analytics, database, messaging | ❌❌❌ +observability −analytics |
| `contable-chatbot` | ai, auth | ❌✅✅ +search |

## Para revisar a mano (corrida 1)

### gemini

- `inmobiliaria-portal`: **search** «búsqueda semántica de texto» ← “Los clientes tienen que poder buscar propiedades escribiendo cosas como 'apartamento con balcón cerca del metro'”; **storage** «almacenamiento de archivos multimedia» ← “los agentes suben las fotos y los planos de cada inmueble”
- `agencia-viajes-web`: **frontend** «framework web para renderizado y rendimiento» ← “Necesitamos un framework web para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google.”
- `cooperativa-api`: **backend** «framework para construir API en Python» ← “queremos elegir un framework para la API que registra las entregas de café”; **database** «base de datos relacional para registros» ← “una base de datos relacional para guardar esos registros”
- `colegio-avisos`: **communication** «envío de correos y mensajes de texto» ← “avisar por correo o SMS a los padres”; **data-processing** «cálculo nocturno de porcentajes de asistencia» ← “Cada noche debe calcular el porcentaje de asistencia de cada estudiante”
- `ong-voluntarios`: **auth** «autenticacion de usuarios con cuenta de Google» ← “entren con su cuenta de Google”; **storage** «almacenamiento de archivos PDF en la nube» ← “guardar los certificados escaneados de cada uno en PDF”
- `gimnasio-cobros`: **payments** «cobro de mensualidades en l<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>nea» ← “cobrar las mensualidades en línea”; **communication** «envío de notificaciones por chat» ← “avisar por WhatsApp a los socios que se atrasan en el pago”; **database** «almacenamiento en base de datos relacional» ← “guardar el historial de pagos en una base de datos relacional”
- `repuestos-buscador`: **search** «buscador de productos por texto» ← “buscador de productos por nombre o referencia (el equipo pensaba en Elasticsearch)”; **observability** «monitoreo de latencia y errores» ← “medir la latencia y los errores de la API”
- `restaurantes-reportes`: **data-processing** «procesamiento nocturno de ventas e inventario» ← “procesar cada noche las ventas del día de todos sus locales para recalcular el inventario de cada uno”; **communication** «envío automatizado de reportes por correo» ← “mandar por correo el reporte a cada gerente a primera hora”
- `energia-medidores`: **messaging** «streaming de eventos en tiempo real» ← “recibirlas en streaming con Kafka”; **database** «almacenamiento de bases de datos para series de tiempo» ← “guardarlas en una base de datos para series de tiempo como InfluxDB”; **observability** «visualización de tableros de monitoreo y métricas» ← “mostrar tableros de consumo en Grafana”
- `contable-chatbot`: **auth** «gestion de identidad de empleados» ← “solo puedan entrar los empleados con cuenta”; **ai** «modelo de lenguaje local» ← “un modelo de lenguaje que corra en sus propios servidores”; **search** «busqueda semantica documental» ← “responda preguntas sobre sus manuales de procedimientos”
