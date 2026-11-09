# Evaluación de la búsqueda · google/embeddinggemma-300m

Generado con `python -m ai.eval.run_search_eval --golden catalog-test` el 2026-11-08. Golden set `catalog-test` v1 (etiquetas del catálogo del 2026-11-08) · catálogo `snapshot` del 2026-11-08 · 127 repos · k = 3 · CPU · datos de la IA en el texto: summary, use_cases.

## Resumen

| Métrica | Valor |
|---|---|
| hit@3 | 41/56 (73%) |
| MRR@3 | 0.65 |
| recall@3 | 58% |
| hit@5 (con 5 candidatos por necesidad) | 44/56 (79%) |
| Carga del modelo + primera consulta | 24.4 s |
| Vectores del catálogo (127 repos) | 21.6 s |
| Consulta (promedio) | 0.06 s |

## Consultas con respuesta

| Consulta | Acierto | Posición de cada esperado | Top-3 (puntaje) |
|---|---|---|---|
| `taller-reparacion-electrodomesticos-database` | ❌ | postgres 71 · server 24 · supabase 21 | seaweedfs 0.342 · rustfs 0.293 · etcd 0.290 |
| `taller-reparacion-electrodomesticos-auth` | ✅ | keycloak 2 · zitadel 4 | supertokens-core 0.368 · keycloak 0.349 · kratos 0.344 |
| `taller-reparacion-electrodomesticos-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.315 · rustfs 0.284 · valkey 0.203 |
| `finca-cafetera-data-processing` | ❌ | airflow 10 · prefect 7 · dagster 12 | dbt 0.354 · spark 0.347 · flink 0.330 |
| `finca-cafetera-automation` | ✅ | airflow 2 · prefect 1 · dagster 8 | prefect 0.350 · airflow 0.342 · alertmanager 0.319 |
| `finca-cafetera-communication` | ✅ | postal 1 · novu 3 · apprise 4 | postal 0.394 · listmonk 0.325 · novu 0.239 |
| `estudio-arquitectura-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.352 · rustfs 0.315 · vault 0.275 |
| `estudio-arquitectura-search` | ✅ | OpenSearch 5 · meilisearch 1 · typesense 3 | meilisearch 0.378 · ripgrep 0.372 · typesense 0.335 |
| `estudio-arquitectura-cms` | ✅ | strapi 3 · payload 4 | Ghost 0.320 · astro 0.317 · strapi 0.307 |
| `estudio-arquitectura-auth` | ✅ | keycloak 1 · zitadel 5 | keycloak 0.319 · vault 0.293 · supertokens-core 0.292 |
| `vivero-plantas-cms` | ✅ | strapi 5 · payload 2 | astro 0.373 · payload 0.325 · killbill 0.324 |
| `vivero-plantas-search` | ✅ | OpenSearch 4 · meilisearch 1 · typesense 5 | meilisearch 0.368 · qdrant 0.325 · ripgrep 0.325 |
| `vivero-plantas-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.315 · rustfs 0.284 · valkey 0.203 |
| `vivero-plantas-payments` | ✅ | hyperswitch 1 | hyperswitch 0.338 · killbill 0.243 · flink 0.223 |
| `club-futbol-aficionado-auth` | ✅ | keycloak 3 · zitadel 4 · kratos 2 · supertokens-core 1 | supertokens-core 0.465 · kratos 0.459 · keycloak 0.452 |
| `club-futbol-aficionado-payments` | ✅ | killbill 2 · lago 3 | hyperswitch 0.311 · killbill 0.286 · lago 0.228 |
| `club-futbol-aficionado-communication` | ✅ | novu 2 · apprise 1 | apprise 0.466 · novu 0.371 · alertmanager 0.352 |
| `club-futbol-aficionado-analytics` | ❌ | grafana 5 · metabase 13 | lago 0.277 · hyperswitch 0.275 · killbill 0.264 |
| `centro-cuidado-infantil-auth` | ✅ | keycloak 2 · zitadel 4 · kratos 3 · supertokens-core 1 | supertokens-core 0.358 · keycloak 0.300 · kratos 0.277 |
| `centro-cuidado-infantil-communication` | ✅ | novu 3 · apprise 1 | apprise 0.458 · alertmanager 0.345 · novu 0.329 |
| `centro-cuidado-infantil-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.352 · rustfs 0.315 · vault 0.275 |
| `mantenimiento-piscinas-database` | ❌ | postgres 7 · server 32 · supabase 16 | rustfs 0.341 · redis 0.333 · vault 0.319 |
| `mantenimiento-piscinas-communication` | ✅ | novu 3 · apprise 1 | apprise 0.398 · alertmanager 0.317 · novu 0.281 |
| `mantenimiento-piscinas-payments` | ✅ | hyperswitch 1 | hyperswitch 0.356 · killbill 0.288 · lago 0.269 |
| `empresa-reciclaje-data-processing` | ❌ | airflow 30 · prefect 16 · dagster 25 | dbt 0.296 · beam 0.296 · seaweedfs 0.239 |
| `empresa-reciclaje-analytics` | ✅ | grafana 10 · metabase 2 | ClickHouse 0.364 · metabase 0.324 · pandas 0.318 |
| `empresa-reciclaje-automation` | ✅ | airflow 1 · prefect 4 · dagster 6 | airflow 0.392 · playwright 0.366 · ansible 0.320 |
| `parqueadero-multinivel-database` | ❌ | postgres 10 · server 23 · supabase 9 | redis 0.300 · vault 0.291 · etcd 0.288 |
| `parqueadero-multinivel-cache` | ✅ | valkey 3 · redis 1 | redis 0.423 · vllm 0.361 · valkey 0.357 |
| `parqueadero-multinivel-payments` | ✅ | hyperswitch 1 | hyperswitch 0.337 · beam 0.285 · flink 0.272 |
| `parqueadero-multinivel-observability` | ✅ | prometheus 1 · grafana 3 · opentelemetry-collector 4 | prometheus 0.438 · jaeger 0.351 · grafana 0.327 |
| `taller-carpinteria-database` | ❌ | postgres 49 · server 59 · supabase 34 | seaweedfs 0.266 · rustfs 0.257 · redis 0.253 |
| `taller-carpinteria-analytics` | ❌ | grafana 42 · metabase 11 | umami 0.264 · lago 0.229 · ClickHouse 0.210 |
| `taller-carpinteria-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.259 · rustfs 0.232 · vault 0.231 |
| `oficina-juridica-storage` | ✅ | seaweedfs 2 · rustfs 3 | vault 0.376 · seaweedfs 0.354 · rustfs 0.335 |
| `oficina-juridica-search` | ✅ | OpenSearch 4 · meilisearch 1 · typesense 2 | meilisearch 0.386 · typesense 0.323 · ripgrep 0.318 |
| `oficina-juridica-auth` | ✅ | keycloak 1 · zitadel 4 | keycloak 0.447 · supertokens-core 0.445 · kratos 0.421 |
| `oficina-juridica-communication` | ✅ | postal 1 · novu 2 · apprise 10 | postal 0.285 · novu 0.228 · listmonk 0.202 |
| `fabrica-quesos-data-processing` | ✅ | flink 4 · beam 1 | beam 0.372 · redis 0.353 · ClickHouse 0.350 |
| `fabrica-quesos-analytics` | ❌ | grafana 4 · metabase 6 | analytics 0.258 · prometheus 0.242 · posthog 0.236 |
| `fabrica-quesos-messaging` | ❌ | kafka 5 | celery 0.297 · novu 0.241 · beam 0.236 |
| `fabrica-quesos-observability` | ✅ | prometheus 1 · grafana 3 · opentelemetry-collector 5 | prometheus 0.450 · jaeger 0.363 · grafana 0.336 |
| `estudio-fotografico-auth` | ✅ | keycloak 1 · zitadel 4 · kratos 3 · supertokens-core 2 | keycloak 0.461 · supertokens-core 0.413 · kratos 0.366 |
| `estudio-fotografico-storage` | ✅ | seaweedfs 2 · rustfs 1 | rustfs 0.358 · seaweedfs 0.330 · valkey 0.263 |
| `estudio-fotografico-payments` | ✅ | hyperswitch 3 | lago 0.258 · killbill 0.200 · hyperswitch 0.185 |
| `estudio-fotografico-communication` | ✅ | novu 2 · apprise 1 | apprise 0.370 · novu 0.327 · alertmanager 0.254 |
| `libreria-independiente-database` | ❌ | postgres 61 · server 16 · supabase 13 | seaweedfs 0.314 · rustfs 0.309 · valkey 0.301 |
| `libreria-independiente-search` | ✅ | OpenSearch 5 · meilisearch 1 · typesense 3 | meilisearch 0.342 · ripgrep 0.331 · typesense 0.331 |
| `libreria-independiente-payments` | ✅ | hyperswitch 1 | hyperswitch 0.353 · killbill 0.291 · payload 0.229 |
| `libreria-independiente-analytics` | ❌ | grafana 20 · metabase 6 | umami 0.281 · analytics 0.265 · ClickHouse 0.261 |
| `editorial-libros-cms` | ✅ | strapi 4 · payload 2 | Ghost 0.336 · payload 0.278 · astro 0.264 |
| `editorial-libros-storage` | ✅ | seaweedfs 1 · rustfs 3 | seaweedfs 0.370 · etcd 0.355 · rustfs 0.332 |
| `editorial-libros-communication` | ✅ | listmonk 2 · postal 1 | postal 0.296 · listmonk 0.205 · novu 0.158 |
| `tostadora-cafe-ai` | ❌ | scikit-learn 30 | vllm 0.253 · ollama 0.237 · sqlmodel 0.225 |
| `tostadora-cafe-analytics` | ❌ | grafana 39 · metabase 38 | jest 0.140 · ClickHouse 0.117 · typesense 0.115 |
| `tostadora-cafe-database` | ❌ | postgres 66 · server 54 · supabase 17 | etcd 0.301 · datasets 0.284 · valkey 0.282 |

## Consultas sin respuesta (el puntaje del 1.º sirve para el umbral)

| Consulta | Top-3 (puntaje) |
|---|---|
| `mantenimiento-piscinas-automation` | prefect 0.360 · airflow 0.354 · playwright 0.314 |
| `taller-carpinteria-data-processing` | numpy 0.309 · scikit-learn 0.293 · pytorch 0.292 |

## Umbral de `no_evidence`

Si el 1.er resultado de una necesidad puntúa menos que el umbral, se responde como sin evidencia. Para calcularlo solo cuentan las consultas con respuesta que la búsqueda resuelve (algún esperado en el top-3); las demás son fallos de búsqueda.

| | Valor |
|---|---|
| 1.er resultado, con respuesta resueltas (41) | 0.258 – 0.466 |
| 1.er resultado, con respuesta no resueltas (15) | 0.140 – 0.354 |
| 1.er resultado, sin respuesta (2) | 0.309 – 0.360 |
| Umbral actual del modelo | 0.18 |
| Umbral que sugiere la regla | **0.25** |
| Umbral actual: resueltas bloqueadas (error grave) | 0/41: — |
| Umbral actual: sin respuesta que pasan | 2/2: `mantenimiento-piscinas-automation`, `taller-carpinteria-data-processing` |
| Umbral sugerido: resueltas bloqueadas (error grave) | 0/41: — |
| Umbral sugerido: sin respuesta que pasan | 2/2: `mantenimiento-piscinas-automation`, `taller-carpinteria-data-processing` |

Fallos de búsqueda (no cuentan para el umbral): `taller-reparacion-electrodomesticos-database`, `finca-cafetera-data-processing`, `club-futbol-aficionado-analytics`, `mantenimiento-piscinas-database`, `empresa-reciclaje-data-processing`, `parqueadero-multinivel-database`, `taller-carpinteria-database`, `taller-carpinteria-analytics`, `fabrica-quesos-analytics`, `fabrica-quesos-messaging`, `libreria-independiente-database`, `libreria-independiente-analytics`, `tostadora-cafe-ai`, `tostadora-cafe-analytics`, `tostadora-cafe-database`
