# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 03:33. 10 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.1 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 80% |
| Cobertura de necesidades | 92% |
| Necesidades inventadas | 7 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 80% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/30 |
| Evidencia literal | 100% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.0 s |
| Tiempo (peor caso) | 1.4 s |
| Tokens de entrada (mediana) | 2240 |
| Tokens de salida (mediana) | 117 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 10 casos; los porcentajes no son estadística firme.

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `inmobiliaria-portal` | search, storage | ✅✅✅ |
| `agencia-viajes-web` | frontend | ✅✅✅ |
| `cooperativa-api` | backend, database | ✅✅✅ |
| `colegio-avisos` | communication, data-processing | ❌❌❌ +database +messaging −data-processing |
| `ong-voluntarios` | auth, storage | ✅✅✅ |
| `gimnasio-cobros` | communication, database, payments | ✅✅✅ |
| `repuestos-buscador` | observability, search | ✅✅✅ |
| `restaurantes-reportes` | communication, data-processing | ✅✅✅ |
| `energia-medidores` | analytics, database, messaging | ❌❌❌ +observability −analytics −messaging |
| `contable-chatbot` | ai, auth | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `inmobiliaria-portal`: **search** «búsqueda semántica o vectorial de texto» ← “escribiendo cosas como 'apartamento con balcón cerca del metro'”; **storage** «almacenamiento de archivos y objetos multimedia» ← “los agentes suben las fotos y los planos de cada inmueble”
- `agencia-viajes-web`: **frontend** «framework web para renderizado rápido» ← “Necesitamos un framework web para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google.”
- `cooperativa-api`: **backend** «framework para desarrollo de API» ← “un framework para la API”; **database** «gestor de base de datos relacional» ← “una base de datos relacional para guardar esos registros”
- `colegio-avisos`: **database** «registro y consulta de asistencia» ← “registren la asistencia”; **messaging** «procesamiento de tareas nocturnas» ← “Cada noche debe calcular el porcentaje”; **communication** «envío de correos y mensajes» ← “avisar por correo o SMS a los padres”
- `ong-voluntarios`: **auth** «autenticación con proveedores externos» ← “entren con su cuenta de Google”; **storage** «almacenamiento de archivos PDF» ← “guardar los certificados escaneados de cada uno en PDF”
- `gimnasio-cobros`: **payments** «cobro de mensualidades en línea» ← “cobrar las mensualidades en línea”; **communication** «envío de mensajes por WhatsApp» ← “avisar por WhatsApp a los socios que se atrasan en el pago”; **database** «almacenamiento en base de datos relacional» ← “guardar el historial de pagos en una base de datos relacional”
- `repuestos-buscador`: **search** «busqueda de texto completo» ← “buscador de productos por nombre o referencia”; **observability** «monitoreo de latencia y errores» ← “medir la latencia y los errores de la API”
- `restaurantes-reportes`: **data-processing** «procesamiento nocturno de ventas e inventario» ← “procesar cada noche las ventas del día de todos sus locales para recalcular el inventario de cada uno”; **communication** «envío automatizado de correos» ← “mandar por correo el reporte a cada gerente a primera hora”
- `energia-medidores`: **database** «almacenamiento para series de tiempo» ← “guardarlas en una base de datos para series de tiempo como InfluxDB”; **messaging** «procesamiento de eventos en streaming» ← “recibirlas en streaming con Kafka”; **observability** «visualizacion de metricas en tableros» ← “mostrar tableros de consumo en Grafana”
- `contable-chatbot`: **ai** «modelo de lenguaje en servidores propios» ← “responda preguntas sobre sus manuales de procedimientos usando un modelo de lenguaje que corra en sus propios servidores”; **auth** «control de acceso para empleados» ← “solo puedan entrar los empleados con cuenta”
