# Evaluación de la búsqueda · google/embeddinggemma-300m

Generado con `python -m ai.eval.run_search_eval --golden catalog-test --texto base` el 2026-11-08. Golden set `catalog-test` v1 (etiquetas del catálogo del 2026-11-08) · catálogo `snapshot` del 2026-11-08 · 127 repos · k = 3 · CPU · datos de la IA en el texto: ninguno.

## Resumen

| Métrica | Valor |
|---|---|
| hit@3 | 41/56 (73%) |
| MRR@3 | 0.62 |
| recall@3 | 59% |
| hit@5 (con 5 candidatos por necesidad) | 45/56 (80%) |
| Carga del modelo + primera consulta | 17.9 s |
| Vectores del catálogo (127 repos) | 10.9 s |
| Consulta (promedio) | 0.06 s |

## Consultas con respuesta

| Consulta | Acierto | Posición de cada esperado | Top-3 (puntaje) |
|---|---|---|---|
| `taller-reparacion-electrodomesticos-database` | ❌ | postgres 104 · server 74 · supabase 55 | seaweedfs 0.312 · rustfs 0.240 · etcd 0.238 |
| `taller-reparacion-electrodomesticos-auth` | ✅ | keycloak 4 · zitadel 3 | kratos 0.330 · supertokens-core 0.301 · zitadel 0.280 |
| `taller-reparacion-electrodomesticos-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.273 · rustfs 0.234 · payload 0.128 |
| `finca-cafetera-data-processing` | ❌ | airflow 9 · prefect 4 · dagster 6 | dbt 0.301 · spark 0.278 · beam 0.263 |
| `finca-cafetera-automation` | ✅ | airflow 2 · prefect 1 · dagster 3 | prefect 0.313 · airflow 0.307 · dagster 0.291 |
| `finca-cafetera-communication` | ✅ | postal 1 · novu 5 · apprise 11 | postal 0.368 · listmonk 0.263 · ansible 0.201 |
| `estudio-arquitectura-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.315 · rustfs 0.259 · etcd 0.213 |
| `estudio-arquitectura-search` | ✅ | OpenSearch 4 · meilisearch 2 · typesense 5 | ripgrep 0.321 · meilisearch 0.318 · llama_index 0.314 |
| `estudio-arquitectura-cms` | ❌ | strapi 5 · payload 6 | astro 0.273 · biome 0.267 · Ghost 0.262 |
| `estudio-arquitectura-auth` | ✅ | keycloak 2 · zitadel 4 | kratos 0.262 · keycloak 0.248 · supertokens-core 0.232 |
| `vivero-plantas-cms` | ✅ | strapi 6 · payload 2 | astro 0.326 · payload 0.269 · biome 0.268 |
| `vivero-plantas-search` | ✅ | OpenSearch 2 · meilisearch 1 · typesense 4 | meilisearch 0.295 · OpenSearch 0.286 · ripgrep 0.276 |
| `vivero-plantas-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.273 · rustfs 0.234 · payload 0.128 |
| `vivero-plantas-payments` | ✅ | hyperswitch 1 | hyperswitch 0.319 · killbill 0.185 · lago 0.158 |
| `club-futbol-aficionado-auth` | ✅ | keycloak 4 · zitadel 3 · kratos 1 · supertokens-core 2 | kratos 0.424 · supertokens-core 0.359 · zitadel 0.341 |
| `club-futbol-aficionado-payments` | ✅ | killbill 2 · lago 3 | hyperswitch 0.297 · killbill 0.246 · lago 0.205 |
| `club-futbol-aficionado-communication` | ✅ | novu 2 · apprise 1 | apprise 0.365 · novu 0.292 · alertmanager 0.260 |
| `club-futbol-aficionado-analytics` | ❌ | grafana 7 · metabase 6 | lago 0.289 · killbill 0.262 · hyperswitch 0.262 |
| `centro-cuidado-infantil-auth` | ✅ | keycloak 2 · zitadel 4 · kratos 3 · supertokens-core 1 | supertokens-core 0.300 · keycloak 0.262 · kratos 0.253 |
| `centro-cuidado-infantil-communication` | ✅ | novu 3 · apprise 1 | apprise 0.354 · alertmanager 0.265 · novu 0.262 |
| `centro-cuidado-infantil-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.315 · rustfs 0.259 · etcd 0.213 |
| `mantenimiento-piscinas-database` | ❌ | postgres 64 · server 44 · supabase 20 | rustfs 0.294 · seaweedfs 0.293 · etcd 0.257 |
| `mantenimiento-piscinas-communication` | ✅ | novu 3 · apprise 1 | apprise 0.304 · alertmanager 0.251 · novu 0.237 |
| `mantenimiento-piscinas-payments` | ✅ | hyperswitch 1 | hyperswitch 0.341 · killbill 0.230 · lago 0.222 |
| `empresa-reciclaje-data-processing` | ❌ | airflow 21 · prefect 10 · dagster 15 | dbt 0.252 · seaweedfs 0.235 · beam 0.235 |
| `empresa-reciclaje-analytics` | ✅ | grafana 10 · metabase 1 | metabase 0.298 · pandas 0.283 · analytics 0.276 |
| `empresa-reciclaje-automation` | ✅ | airflow 1 · prefect 5 · dagster 3 | airflow 0.322 · playwright 0.291 · dagster 0.283 |
| `parqueadero-multinivel-database` | ❌ | postgres 20 · server 64 · supabase 13 | seaweedfs 0.249 · etcd 0.236 · redis 0.213 |
| `parqueadero-multinivel-cache` | ✅ | valkey 2 · redis 1 | redis 0.356 · valkey 0.273 · vllm 0.256 |
| `parqueadero-multinivel-payments` | ✅ | hyperswitch 1 | hyperswitch 0.327 · beam 0.231 · lago 0.211 |
| `parqueadero-multinivel-observability` | ✅ | prometheus 1 · grafana 2 · opentelemetry-collector 3 | prometheus 0.361 · grafana 0.296 · opentelemetry-collector 0.286 |
| `taller-carpinteria-database` | ❌ | postgres 79 · server 97 · supabase 65 | seaweedfs 0.238 · rustfs 0.207 · pnpm 0.200 |
| `taller-carpinteria-analytics` | ❌ | grafana 23 · metabase 20 | umami 0.256 · lago 0.211 · killbill 0.184 |
| `taller-carpinteria-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.220 · rustfs 0.199 · terraform 0.186 |
| `oficina-juridica-storage` | ✅ | seaweedfs 1 · rustfs 3 | seaweedfs 0.322 · vault 0.281 · rustfs 0.280 |
| `oficina-juridica-search` | ✅ | OpenSearch 5 · meilisearch 1 · typesense 4 | meilisearch 0.308 · llama_index 0.298 · ripgrep 0.290 |
| `oficina-juridica-auth` | ✅ | keycloak 4 · zitadel 2 | kratos 0.403 · zitadel 0.378 · supertokens-core 0.364 |
| `oficina-juridica-communication` | ✅ | postal 1 · novu 2 · apprise 44 | postal 0.229 · novu 0.211 · listmonk 0.172 |
| `fabrica-quesos-data-processing` | ✅ | flink 9 · beam 3 | redis 0.334 · ClickHouse 0.292 · beam 0.254 |
| `fabrica-quesos-analytics` | ✅ | grafana 3 · metabase 6 | lago 0.231 · analytics 0.228 · grafana 0.222 |
| `fabrica-quesos-messaging` | ❌ | kafka 5 | celery 0.252 · novu 0.201 · redis 0.164 |
| `fabrica-quesos-observability` | ✅ | prometheus 1 · grafana 2 · opentelemetry-collector 3 | prometheus 0.376 · grafana 0.311 · opentelemetry-collector 0.288 |
| `estudio-fotografico-auth` | ✅ | keycloak 2 · zitadel 4 · kratos 1 · supertokens-core 3 | kratos 0.352 · keycloak 0.352 · supertokens-core 0.341 |
| `estudio-fotografico-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.306 · rustfs 0.295 · qdrant 0.186 |
| `estudio-fotografico-payments` | ✅ | hyperswitch 3 | lago 0.209 · killbill 0.169 · hyperswitch 0.152 |
| `estudio-fotografico-communication` | ✅ | novu 2 · apprise 1 | apprise 0.269 · novu 0.261 · listmonk 0.174 |
| `libreria-independiente-database` | ❌ | postgres 107 · server 36 · supabase 32 | seaweedfs 0.286 · rustfs 0.245 · valkey 0.228 |
| `libreria-independiente-search` | ✅ | OpenSearch 6 · meilisearch 2 · typesense 3 | ripgrep 0.308 · meilisearch 0.287 · typesense 0.278 |
| `libreria-independiente-payments` | ✅ | hyperswitch 1 | hyperswitch 0.331 · killbill 0.229 · payload 0.188 |
| `libreria-independiente-analytics` | ❌ | grafana 17 · metabase 5 | umami 0.274 · analytics 0.245 · duckdb 0.234 |
| `editorial-libros-cms` | ✅ | strapi 4 · payload 2 | Ghost 0.256 · payload 0.239 · astro 0.224 |
| `editorial-libros-storage` | ✅ | seaweedfs 1 · rustfs 3 | seaweedfs 0.343 · etcd 0.293 · rustfs 0.275 |
| `editorial-libros-communication` | ✅ | listmonk 2 · postal 1 | postal 0.266 · listmonk 0.156 · envoy 0.124 |
| `tostadora-cafe-ai` | ❌ | scikit-learn 10 | vllm 0.192 · pnpm 0.171 · ollama 0.166 |
| `tostadora-cafe-analytics` | ❌ | grafana 29 · metabase 37 | lago 0.098 · umami 0.092 · typesense 0.089 |
| `tostadora-cafe-database` | ❌ | postgres 89 · server 91 · supabase 34 | etcd 0.233 · prefect 0.229 · prometheus 0.224 |

## Consultas sin respuesta (el puntaje del 1.º sirve para el umbral)

| Consulta | Top-3 (puntaje) |
|---|---|
| `mantenimiento-piscinas-automation` | prefect 0.323 · airflow 0.321 · dagster 0.304 |
| `taller-carpinteria-data-processing` | scikit-learn 0.251 · airflow 0.236 · numpy 0.233 |

## Umbral de `no_evidence`

Si el 1.er resultado de una necesidad puntúa menos que el umbral, se responde como sin evidencia. Para calcularlo solo cuentan las consultas con respuesta que la búsqueda resuelve (algún esperado en el top-3); las demás son fallos de búsqueda.

| | Valor |
|---|---|
| 1.er resultado, con respuesta resueltas (41) | 0.209 – 0.424 |
| 1.er resultado, con respuesta no resueltas (15) | 0.098 – 0.312 |
| 1.er resultado, sin respuesta (2) | 0.251 – 0.323 |
| Umbral actual del modelo | 0.18 |
| Umbral que sugiere la regla | **0.20** |
| Umbral actual: resueltas bloqueadas (error grave) | 0/41: — |
| Umbral actual: sin respuesta que pasan | 2/2: `mantenimiento-piscinas-automation`, `taller-carpinteria-data-processing` |
| Umbral sugerido: resueltas bloqueadas (error grave) | 0/41: — |
| Umbral sugerido: sin respuesta que pasan | 2/2: `mantenimiento-piscinas-automation`, `taller-carpinteria-data-processing` |

Fallos de búsqueda (no cuentan para el umbral): `taller-reparacion-electrodomesticos-database`, `finca-cafetera-data-processing`, `estudio-arquitectura-cms`, `club-futbol-aficionado-analytics`, `mantenimiento-piscinas-database`, `empresa-reciclaje-data-processing`, `parqueadero-multinivel-database`, `taller-carpinteria-database`, `taller-carpinteria-analytics`, `fabrica-quesos-messaging`, `libreria-independiente-database`, `libreria-independiente-analytics`, `tostadora-cafe-ai`, `tostadora-cafe-analytics`, `tostadora-cafe-database`
