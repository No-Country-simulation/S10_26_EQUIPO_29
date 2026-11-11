# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 05:18. 10 casos × 3 corridas por proveedor; etiquetas versión 4; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.9 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 77% |
| Cobertura de necesidades | 88% |
| Necesidades inventadas | 3 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 90% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/30 |
| Evidencia literal | 100% |
| Consultas de 3 a 8 palabras | 97% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 1.3 s |
| Tokens de entrada (mediana) | 2135 |
| Tokens de salida (mediana) | 98 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 10 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| ai | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| analytics | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| auth | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| backend | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| data-processing | 1/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| database | 3/5 · 4/5 · 4/5 | 0 · 0 · 0 |
| frontend | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| messaging | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| observability | 1/1 · 1/1 · 1/1 | 1 · 1 · 1 |
| payments | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| search | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| **Todas** | 19/23 · 21/23 · 21/23 | 1 · 1 · 1 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `inmobiliaria-portal` | search, storage | ✅✅✅ |
| `agencia-viajes-web` | frontend | ✅✅✅ |
| `cooperativa-api` | backend, database | ✅✅✅ |
| `colegio-avisos` | communication, data-processing, database | ❌✅✅ −data-processing −database |
| `ong-voluntarios` | auth, storage | ✅✅✅ |
| `gimnasio-cobros` | communication, database, payments | ✅✅✅ |
| `repuestos-buscador` | observability, search | ✅✅✅ |
| `restaurantes-reportes` | communication, data-processing, database | ❌❌❌ −database |
| `energia-medidores` | analytics, database, messaging | ❌❌❌ +observability −analytics |
| `contable-chatbot` | ai, auth | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `inmobiliaria-portal`: **search** «búsqueda semántica de texto libre» ← “buscar propiedades escribiendo cosas como 'apartamento con balcón cerca del metro'”; **storage** «almacenamiento de archivos multimedia» ← “los agentes suben las fotos y los planos de cada inmueble”
- `agencia-viajes-web`: **frontend** «framework web para renderizado rápido» ← “Necesitamos un framework web para construir páginas de destinos que carguen muy rápido y se posicionen bien en Google.”
- `cooperativa-api`: **backend** «framework para construir la API» ← “queremos elegir un framework para la API que registra las entregas de café”; **database** «base de datos relacional» ← “una base de datos relacional para guardar esos registros”
- `colegio-avisos`: **communication** «envío de correos o mensajes de texto» ← “avisar por correo o SMS a los padres cuando baje del 80 %”
- `ong-voluntarios`: **auth** «inicio de sesion con proveedores externos» ← “voluntarios entren con su cuenta de Google”; **storage** «almacenamiento de archivos y documentos» ← “guardar los certificados escaneados de cada uno en PDF”
- `gimnasio-cobros`: **payments** «cobros y mensualidades en linea» ← “cobrar las mensualidades en línea”; **communication** «envio de mensajes por WhatsApp» ← “avisar por WhatsApp a los socios que se atrasan en el pago”; **database** «base de datos relacional para historial» ← “guardar el historial de pagos en una base de datos relacional”
- `repuestos-buscador`: **search** «buscador de productos por texto» ← “buscador de productos por nombre o referencia (el equipo pensaba en Elasticsearch)”; **observability** «monitoreo de rendimiento y errores» ← “medir la latencia y los errores de la API”
- `restaurantes-reportes`: **data-processing** «procesamiento y cálculo nocturno de datos» ← “procesar cada noche las ventas del día de todos sus locales para recalcular el inventario de cada uno”; **communication** «envío automatizado de correos electrónicos» ← “mandar por correo el reporte a cada gerente a primera hora”
- `energia-medidores`: **messaging** «streaming de eventos en tiempo real» ← “recibirlas en streaming con Kafka”; **database** «almacenamiento de series temporales» ← “guardarlas en una base de datos para series de tiempo como InfluxDB”; **observability** «visualización de métricas en tableros» ← “mostrar tableros de consumo en Grafana”
- `contable-chatbot`: **ai** «ejecución de modelos de lenguaje local» ← “un modelo de lenguaje que corra en sus propios servidores”; **auth** «autenticación y acceso de usuarios» ← “solo puedan entrar los empleados con cuenta”
