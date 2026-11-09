# Comparación de modelos · flujo completo del asistente

Generado con `python -m ai.eval.run_assistant_eval` el 2026-11-08 a las 22:00. 5 casos × 3 corridas por proveedor; catálogo de 127 repos (snapshot del 2026-11-08); etiquetas de los casos del catálogo del 2026-11-08; umbral 0.18; el modelo ve 5 candidatos por necesidad y se registran 5. La llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.3 s |

## Resumen

| Métrica | gemini |
|---|---|
| Status correcto | 93% |
| Respuesta válida | 100% |
| Necesidades detectadas | 90% |
| Techo de la búsqueda (top 5) | 76% |
| Techo con 5 candidatos | 76% |
| Eligió un aceptable (donde había) | 69% |
| Se abstuvo (donde no había) | 27% |
| Acierto de punta a punta (comparable entre k) | 52% |
| Sin caja donde el caso no tiene herramientas | 50% |
| Eligió el primer candidato | 58% |
| Consistencia entre corridas | 40% |
| Entender válido al 1.er intento | 100% |
| Generar válido al 1.er intento | 100% |
| Limitaciones repetidas · borrador del modelo | 0 |
| Limitaciones repetidas · respuesta final | 0 |
| Textos del modelo que hablan del catálogo | 1 |
| Ids en el texto | 0 |
| Errores del proveedor | 0/15 |
| Tiempo total (mediana) | 4.2 s |
| Tiempo total (peor caso) | 5.2 s |
| Sobre 15 s | 0/15 |
| Entender · buscar · generar (mediana) | 1.6 s · 0.1 s · 2.3 s |
| Tokens entrada / salida (mediana) | 3400 / 458 |
| Esperas (límite de uso o error temporal) | 30.0 s |

Evidencia direccional: 5 casos; los porcentajes no son estadística firme.

## Por corrida

Una diferencia entre versiones menor que el rango entre corridas no se puede atribuir al cambio.

**gemini**

| Métrica | Corrida 1 | Corrida 2 | Corrida 3 | Rango |
|---|---|---|---|---|
| Status correcto | 80% | 100% | 100% | 80% – 100% |
| Eligió un aceptable (donde había) | 60% | 67% | 80% | 60% – 80% |
| Se abstuvo (donde no había) | 0% | 33% | 50% | 0% – 50% |
| Acierto de punta a punta | 43% | 57% | 57% | 43% – 57% |
| Textos del modelo que hablan del catálogo | 1 | 0 | 0 | 0 – 1 |

## Por necesidad

Cuenta sobre las corridas válidas: detectada · había un aceptable en el top 3 (techo) · eligió un aceptable. Sin aceptables, se espera que no elija nada.

| Caso · necesidad | Aceptables | gemini |
|---|---|---|
| `tienda-ropa` · search | OpenSearch, meilisearch, typesense | det 3/3 · techo 3 · eligió 3 |
| `tienda-ropa` · payments | hyperswitch | det 3/3 · techo 3 · eligió 3 |
| `tienda-ropa` · automation | (ninguno) | det 3/3 · eligió algo 2 |
| `tienda-ropa` · analytics | grafana, metabase | det 3/3 · techo 1 · eligió 1 |
| `logistica-flota` · messaging | kafka | det 1/3 · techo 1 · eligió 1 |
| `logistica-flota` · data-processing | flink, beam | det 2/3 · techo 2 · eligió 0 |
| `logistica-flota` · database | ClickHouse | det 3/3 · techo 0 · eligió 0 |
| `logistica-flota` · analytics | grafana, metabase | det 3/3 · techo 3 · eligió 3 |
| `pantalla-observabilidad` · observability | opentelemetry-collector, jaeger, prometheus | det 3/3 · techo 3 · eligió 0 |
| `una-factura-electronica` · payments | (ninguno) | det 3/3 · eligió algo 1 |
| `vago-startup` · (vago) | — | status ok 3/3 |

## Para revisar a mano (corrida 1)

Rúbrica de 1 a 3: español · `rationale` ligado al negocio · coherencia (título, resumen y cajas dicen lo mismo).

### `tienda-ropa`

> Tenemos una tienda de ropa y queremos vender en línea: un buscador que encuentre productos aunque el cliente escriba mal, pagos con tarjeta y PSE, que cada venta pase sola a nuestra hoja de cálculo contable y ver qué productos se venden más.

**gemini**
- `ok` · Plataforma Open Source para Tienda de Ropa en Línea
- Implementamos una solución completa para la tienda de ropa con buscador tolerante a errores, pagos con tarjeta y pasarelas, automatización de flujos de datos y analítica detallada de productos.
- **Typesense** (`typesense/typesense`), Buscador de productos: Typesense es un motor de búsqueda rápido, en memoria y tolerante a errores tipográficos, ideal para encontrar productos aunque el cliente escriba mal. Cuenta con la licencia GPL-3.0 y actividad reciente.
- **Hyperswitch** (`juspay/hyperswitch`), Procesamiento de pagos: Hyperswitch es una plataforma de pagos abierta y componible que permite la conectividad a múltiples proveedores de pago y tokenización. Utiliza la licencia Apache-2.0 y se mantiene activamente.
- **Apache Airflow** (`apache/airflow`), Automatización de flujos de datos: Apache Airflow es una plataforma para autorizar, programar y monitorear flujos de trabajo y automatización de datos. Posee licencia Apache-2.0 y mantenimiento constante.
- **PostHog** (`PostHog/posthog`), Analítica de ventas: PostHog es una plataforma líder para analítica de productos, seguimiento de conversiones e ingresos en un solo lugar. Su licencia no fue identificada por GitHub y cuenta con actividad reciente.
- Limitación: La integración específica con métodos de pago locales como PSE puede requerir configuración adicional en la plataforma de pagos.
- Limitación: La automatización con Apache Airflow requiere la creación de DAGs personalizados para enlazar los datos de ventas directamente con la hoja de cálculo contable.
- Supuesto: Se asume que la tienda online cuenta con una interfaz web propia donde se integrarán el buscador y la pasarela de pagos.
- Supuesto: Se asume que la integración con PSE específica de la región se puede conectar a través de la plataforma de pagos elegida o mediante adaptadores personalizados.
- Rúbrica: español _ · rationale _ · coherencia _

### `logistica-flota`

> Mi cliente es una empresa de logística con 200 camiones. Cada camión envía su ubicación cada pocos segundos; quieren procesar esos eventos en tiempo real, guardarlos y ver tableros de entregas por ciudad.

**gemini**
- `ok` · Arquitectura de datos en tiempo real para flota de camiones
- Esta propuesta implementa un sistema para procesar flujos de ubicación en tiempo real, almacenarlos eficientemente y visualizarlos mediante tableros de control por ciudad.
- **Redis** (`redis/redis`), Almacenamiento de datos: Redis es un servidor de estructuras de datos rápido y con licencia no identificada por GitHub, ideal para construir aplicaciones en tiempo real y guardar información de los camiones.
- **Grafana** (`grafana/grafana`), Tableros de control: Grafana permite visualizar métricas y crear tableros de entregas por ciudad de manera composable bajo licencia AGPL-3.0.
- **Apache Kafka** (`apache/kafka`), Procesamiento de eventos: Apache Kafka gestiona el streaming de eventos en tiempo real con licencia Apache-2.0, adecuado para recibir la ubicación de los camiones cada pocos segundos.
- Limitación: La propuesta no incluye herramientas específicas para optimización de rutas geográficas complejas fuera del almacenamiento básico.
- Supuesto: Se asume que la empresa cuenta con infraestructura propia o en la nube para desplegar los servicios seleccionados.
- Rúbrica: español _ · rationale _ · coherencia _

### `pantalla-observabilidad`

> Define un stack de observabilidad con métricas, logs y trazas distribuidas para microservicios en Kubernetes.

**gemini**
- `ok` · Stack de Observabilidad e Infraestructura para Microservicios
- Esta propuesta implementa un clúster en Kubernetes para la ejecución de microservicios y una plataforma de visualización en Grafana para la recopilación de métricas, logs y trazas. Se asume que el usuario integrará recolectores adicionales para completar el pipeline de telemetría.
- **Grafana** (`grafana/grafana`), Visualización y análisis de datos de observabilidad: Grafana permite visualizar métricas, logs y trazas desde múltiples fuentes como Prometheus, Loki y Elasticsearch. Cuenta con licencia AGPL-3.0 y actividad reciente.
- **Kubernetes** (`kubernetes/kubernetes`), Orquestador de contenedores para los microservicios: Kubernetes gestiona la programación y administración de contenedores lista para producción. Utiliza licencia Apache-2.0 y tiene un mantenimiento activo.
- Limitación: La propuesta no incluye bases de datos de series temporales dedicadas como Prometheus ni recolectores como OpenTelemetry para la ingesta inicial de datos.
- Supuesto: Se asume que los microservicios se desplegarán directamente sobre Kubernetes y enviarán sus datos de telemetría a Grafana.
- Rúbrica: español _ · rationale _ · coherencia _

### `una-factura-electronica`

> Necesito emitir facturas electrónicas válidas ante la DIAN para las ventas de mi tienda.

**gemini**
- `ok` · Sistema de facturación electrónica y pagos open source
- Propuesta para gestionar los pagos y la facturación de tu tienda utilizando una plataforma de código abierto adecuada para la administración de cobros. Ten en cuenta que ninguna de las herramientas candidatas incluye de forma nativa la integración directa con la DIAN para facturación electrónica en Colombia.
- **Kill Bill** (`killbill/killbill`), Plataforma de pagos y facturación: Kill Bill resuelve la gestión de pagos y facturación recurrente de tu tienda gracias a su arquitectura abierta bajo licencia Apache-2.0. Cuenta con una comunidad activa y mantenimiento reciente, permitiéndote administrar ciclos de cobro y transacciones de manera centralizada.
- Limitación: Ninguna de las herramientas del catálogo incluye soporte nativo para la emisión de facturas electrónicas válidas ante la DIAN.
- Limitación: Get lago complementaría la parte de medición y cobro por consumo, pero tampoco resuelve el requisito fiscal de la DIAN.
- Supuesto: Se asume que la tienda online cuenta con un adaptador o desarrollo propio para conectar el sistema de pagos con los servicios de la DIAN para la validación fiscal.
- Supuesto: El negocio requiere una gestión automatizada de cobros y suscripciones además de la emisión de comprobantes.
- Rúbrica: español _ · rationale _ · coherencia _

### `vago-startup`

> Tengo una idea de startup y quiero saber qué tecnologías usar para empezar bien.

**gemini**
- `needs_clarification` · 
- Necesito un poco más de contexto para recomendarte herramientas.
- Pregunta: ¿Qué tipo de producto o servicio planeas ofrecer con tu startup?
- Pregunta: ¿Qué funcionalidades principales tendrá la primera versión de tu aplicación?
- Pregunta: ¿Tienes alguna preferencia de lenguaje de programación o experiencia previa con alguna tecnología?
- Rúbrica: español _ · rationale _ · coherencia _
