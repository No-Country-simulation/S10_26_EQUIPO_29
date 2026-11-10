# Evaluación de la búsqueda · google/embeddinggemma-300m

Generado con `python -m ai.eval.run_search_eval --golden catalog` el 2026-11-08. Golden set `catalog` v3 (etiquetas del catálogo del 2026-11-08) · catálogo `snapshot` del 2026-11-08 · 127 repos · k = 3 · CPU · datos de la IA en el texto: summary, use_cases.

## Resumen

| Métrica | Valor |
|---|---|
| hit@3 | 85/95 (89%) |
| MRR@3 | 0.82 |
| recall@3 | 70% |
| hit@5 (con 5 candidatos por necesidad) | 90/95 (95%) |
| Carga del modelo + primera consulta | 18.8 s |
| Vectores del catálogo (127 repos) | 20.7 s |
| Consulta (promedio) | 0.06 s |

## Consultas con respuesta

| Consulta | Acierto | Posición de cada esperado | Top-3 (puntaje) |
|---|---|---|---|
| `msg-eventos` | ✅ | kafka 3 | flux2 0.367 · flink 0.349 · kafka 0.329 |
| `proc-tiempo-real` | ✅ | flink 3 · beam 1 | beam 0.321 · kafka 0.319 · flink 0.318 |
| `db-analitica` | ✅ | ClickHouse 3 · duckdb 21 | analytics 0.329 · seaweedfs 0.302 · ClickHouse 0.297 |
| `an-tableros` | ❌ | grafana 6 | postal 0.204 · jaeger 0.192 · celery 0.174 |
| `ai-rag` | ✅ | llama_index 1 · langchain 31 | llama_index 0.276 · listmonk 0.236 · anthropic-sdk-python 0.234 |
| `obs-stack` | ✅ | opentelemetry-collector 7 · prometheus 5 · grafana 1 | grafana 0.454 · traefik 0.448 · jaeger 0.426 |
| `none-pagos` | ✅ | killbill 1 · lago 2 | killbill 0.386 · lago 0.327 · Ghost 0.273 |
| `none-login` | ✅ | keycloak 2 · zitadel 4 · kratos 3 · supertokens-core 1 | supertokens-core 0.397 · keycloak 0.314 · kratos 0.312 |
| `none-recordatorios` | ✅ | novu 3 · apprise 1 · postal 5 | apprise 0.275 · alertmanager 0.228 · novu 0.209 |
| `none-videos` | ✅ | seaweedfs 1 · rustfs 7 | seaweedfs 0.193 · valkey 0.170 · vllm 0.168 |
| `none-cms` | ✅ | Ghost 1 · strapi 11 · payload 8 | Ghost 0.320 · vscode 0.299 · prettier 0.254 |
| `none-analitica-web` | ✅ | analytics 1 · umami 2 · posthog 9 | analytics 0.329 · umami 0.320 · grafana 0.230 |
| `clinica-auth` | ✅ | keycloak 2 · zitadel 3 · kratos 1 · supertokens-core 4 | kratos 0.487 · keycloak 0.473 · zitadel 0.453 |
| `clinica-auth-v2` | ✅ | keycloak 2 · zitadel 4 · kratos 1 · supertokens-core 3 | kratos 0.367 · keycloak 0.353 · supertokens-core 0.353 |
| `clinica-communication` | ✅ | novu 2 · apprise 1 | apprise 0.357 · novu 0.352 · alertmanager 0.232 |
| `clinica-communication-v2` | ✅ | novu 1 · apprise 2 | novu 0.284 · apprise 0.259 · postal 0.250 |
| `clinica-payments` | ✅ | hyperswitch 1 | hyperswitch 0.371 · killbill 0.316 · lago 0.277 |
| `clinica-payments-v2` | ✅ | hyperswitch 1 | hyperswitch 0.338 · opentelemetry-collector 0.286 · killbill 0.275 |
| `tienda-search` | ✅ | OpenSearch 4 · meilisearch 2 · typesense 1 | typesense 0.536 · meilisearch 0.415 · ripgrep 0.341 |
| `tienda-search-v2` | ✅ | OpenSearch 4 · meilisearch 2 · typesense 1 | typesense 0.547 · meilisearch 0.453 · ripgrep 0.370 |
| `tienda-payments` | ✅ | hyperswitch 1 | hyperswitch 0.340 · killbill 0.272 · lago 0.195 |
| `tienda-payments-v2` | ✅ | hyperswitch 1 | hyperswitch 0.359 · killbill 0.241 · beam 0.173 |
| `tienda-analytics` | ❌ | grafana 10 · metabase 5 | umami 0.362 · posthog 0.333 · analytics 0.328 |
| `tienda-analytics-v2` | ❌ | grafana 11 · metabase 5 | umami 0.352 · analytics 0.332 · posthog 0.297 |
| `academia-auth` | ✅ | keycloak 2 · zitadel 4 · kratos 3 · supertokens-core 1 | supertokens-core 0.424 · keycloak 0.343 · kratos 0.341 |
| `academia-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.297 · rustfs 0.239 · valkey 0.211 |
| `academia-storage-v2` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.315 · rustfs 0.284 · valkey 0.203 |
| `academia-payments` | ✅ | killbill 1 · lago 2 | killbill 0.354 · lago 0.314 · Ghost 0.271 |
| `academia-payments-v2` | ✅ | killbill 1 · lago 2 | killbill 0.371 · lago 0.340 · Ghost 0.299 |
| `academia-ai` | ✅ | langchain 2 · llama_index 6 | qdrant 0.309 · langchain 0.306 · datasets 0.299 |
| `academia-ai-v2` | ✅ | langchain 3 · llama_index 6 | transformers 0.358 · ollama 0.348 · langchain 0.345 |
| `logistica-messaging` | ✅ | kafka 2 · flink 1 · beam 4 | flink 0.479 · kafka 0.379 · airflow 0.358 |
| `logistica-messaging-v2` | ✅ | kafka 3 · flink 1 · beam 2 | flink 0.449 · beam 0.389 · kafka 0.382 |
| `logistica-database` | ❌ | ClickHouse 27 · supabase 7 | etcd 0.294 · seaweedfs 0.290 · valkey 0.279 |
| `logistica-database-v2` | ❌ | ClickHouse 34 · supabase 7 | etcd 0.296 · seaweedfs 0.277 · valkey 0.275 |
| `logistica-analytics` | ✅ | grafana 2 · metabase 1 | metabase 0.362 · grafana 0.347 · dbt 0.291 |
| `logistica-analytics-v2` | ✅ | grafana 1 · metabase 2 | grafana 0.367 · metabase 0.283 · dbt 0.261 |
| `soporte-ai` | ✅ | ollama 1 · vllm 2 | ollama 0.526 · vllm 0.488 · langchain 0.424 |
| `soporte-ai-v2` | ✅ | ollama 1 · vllm 3 | ollama 0.423 · datasets 0.361 · vllm 0.342 |
| `soporte-search` | ✅ | OpenSearch 4 · meilisearch 1 · typesense 3 | meilisearch 0.390 · ripgrep 0.364 · typesense 0.354 |
| `soporte-search-v2` | ✅ | OpenSearch 4 · meilisearch 2 · typesense 1 | typesense 0.361 · meilisearch 0.358 · qdrant 0.327 |
| `soporte-observability` | ✅ | grafana 3 · opentelemetry-collector 4 · prometheus 1 | prometheus 0.400 · jaeger 0.351 · grafana 0.349 |
| `soporte-observability-v2` | ✅ | grafana 3 · opentelemetry-collector 5 · prometheus 1 | prometheus 0.384 · jaeger 0.371 · grafana 0.357 |
| `periodico-cms` | ✅ | Ghost 3 · strapi 5 · payload 7 | vscode 0.312 · neovim 0.269 · Ghost 0.257 |
| `periodico-cms-v2` | ✅ | Ghost 1 · strapi 4 · payload 2 | Ghost 0.336 · payload 0.278 · astro 0.264 |
| `periodico-frontend` | ✅ | nuxt 9 · next.js 6 · astro 2 | vite 0.409 · astro 0.382 · django 0.359 |
| `periodico-frontend-v2` | ❌ | nuxt 13 · next.js 10 · astro 12 | tailwindcss 0.484 · core 0.471 · react 0.459 |
| `periodico-communication` | ✅ | listmonk 2 · postal 1 | postal 0.286 · listmonk 0.244 · novu 0.207 |
| `periodico-communication-v2` | ✅ | listmonk 2 · postal 1 | postal 0.296 · listmonk 0.205 · novu 0.158 |
| `periodico-analytics` | ❌ | analytics 7 · umami 4 · posthog 11 | prometheus 0.131 · grafana 0.121 · react-testing-library 0.115 |
| `periodico-analytics-v2` | ✅ | analytics 1 · umami 2 · posthog 6 | analytics 0.354 · umami 0.340 · lago 0.315 |
| `saas-largo-auth` | ✅ | keycloak 1 · zitadel 3 | keycloak 0.516 · supertokens-core 0.446 · zitadel 0.412 |
| `saas-largo-auth-v2` | ✅ | keycloak 2 · zitadel 3 | supertokens-core 0.373 · keycloak 0.357 · zitadel 0.355 |
| `rag-largo-ai` | ✅ | ollama 1 · vllm 4 | ollama 0.413 · transformers 0.357 · langchain 0.345 |
| `rag-largo-ai-v2` | ✅ | ollama 1 · vllm 3 | ollama 0.370 · transformers 0.357 · vllm 0.337 |
| `rag-largo-search` | ✅ | OpenSearch 7 · pgvector 3 · meilisearch 1 · qdrant 2 · typesense 4 | meilisearch 0.546 · qdrant 0.485 · pgvector 0.415 |
| `rag-largo-search-v2` | ✅ | OpenSearch 7 · pgvector 3 · meilisearch 1 · qdrant 2 · typesense 4 | meilisearch 0.558 · qdrant 0.509 · pgvector 0.461 |
| `rag-largo-auth` | ✅ | keycloak 2 · zitadel 3 | vault 0.341 · keycloak 0.326 · zitadel 0.312 |
| `rag-largo-auth-v2` | ❌ | keycloak 4 · zitadel 5 | cert-manager 0.335 · vault 0.264 · alertmanager 0.261 |
| `api-largo-database` | ✅ | postgres 1 · server 4 · supabase 8 | postgres 0.410 · sqlalchemy 0.407 · sqlmodel 0.386 |
| `api-largo-cache` | ✅ | redis 1 · valkey 2 | redis 0.435 · valkey 0.411 · etcd 0.352 |
| `api-largo-cache-v2` | ✅ | redis 1 · valkey 2 | redis 0.456 · valkey 0.445 · etcd 0.405 |
| `api-largo-infrastructure` | ❌ | kubernetes 11 · nginx 17 · traefik 20 | valkey 0.333 · hyperswitch 0.330 · kafka 0.319 |
| `api-largo-infrastructure-v2` | ✅ | kubernetes 1 | kubernetes 0.385 · containerd 0.342 · compose 0.342 |
| `saas-corto-auth` | ✅ | keycloak 1 · zitadel 5 | keycloak 0.375 · supertokens-core 0.368 · kratos 0.336 |
| `saas-corto-auth-v2` | ✅ | keycloak 1 · zitadel 4 | keycloak 0.434 · kratos 0.419 · supertokens-core 0.413 |
| `rag-corto-ai` | ✅ | langchain 7 · llama_index 1 | llama_index 0.283 · vllm 0.271 · transformers 0.254 |
| `rag-corto-ai-v2` | ❌ | langchain 13 · llama_index 4 | pgvector 0.226 · vllm 0.225 · jaeger 0.222 |
| `rag-corto-auth` | ✅ | keycloak 1 · zitadel 2 | keycloak 0.504 · zitadel 0.492 · kratos 0.468 |
| `rag-corto-auth-v2` | ✅ | keycloak 1 · zitadel 4 | keycloak 0.385 · vault 0.367 · supertokens-core 0.345 |
| `api-corto-cache` | ✅ | redis 2 · valkey 1 | valkey 0.292 · redis 0.282 · etcd 0.231 |
| `api-corto-cache-v2` | ✅ | redis 1 · valkey 2 | redis 0.388 · valkey 0.372 · etcd 0.255 |
| `api-corto-infrastructure` | ✅ | kubernetes 1 | kubernetes 0.320 · containerd 0.289 · runc 0.274 |
| `api-corto-infrastructure-v2` | ✅ | kubernetes 15 · nginx 27 · traefik 2 | terraform 0.345 · traefik 0.236 · ansible 0.226 |
| `eventos-messaging` | ✅ | kafka 3 · celery 11 | flink 0.325 · beam 0.301 · kafka 0.289 |
| `eventos-messaging-v2` | ✅ | kafka 7 · celery 2 | beam 0.341 · celery 0.322 · starlette 0.300 |
| `observabilidad-observability` | ✅ | opentelemetry-collector 2 · prometheus 3 · grafana 1 | grafana 0.547 · opentelemetry-collector 0.434 · prometheus 0.421 |
| `observabilidad-observability-v2` | ✅ | jaeger 4 · opentelemetry-collector 2 · prometheus 3 | grafana 0.468 · opentelemetry-collector 0.434 · prometheus 0.424 |
| `una-busqueda-search` | ✅ | OpenSearch 3 · meilisearch 2 · typesense 1 | typesense 0.537 · meilisearch 0.397 · OpenSearch 0.350 |
| `una-pagos-payments` | ✅ | killbill 1 · lago 2 | killbill 0.361 · lago 0.316 · Ghost 0.286 |
| `back-api` | ✅ | fastapi 1 · django 7 · flask 2 | fastapi 0.521 · flask 0.507 · openai-python 0.472 |
| `back-asgi` | ✅ | starlette 1 · fastapi 7 | starlette 0.529 · flask 0.413 · caddy 0.398 |
| `dev-lint-python` | ✅ | ruff 1 · black 2 | ruff 0.481 · black 0.471 · cpython 0.443 |
| `dev-lint-javascript` | ✅ | eslint 1 · biome 9 | eslint 0.527 · jest 0.373 · TypeScript 0.373 |
| `dev-test-navegador` | ✅ | playwright 1 · cypress 2 | playwright 0.562 · cypress 0.463 · vitest 0.405 |
| `dev-test-unitarias` | ✅ | pytest 1 | pytest 0.562 · cpython 0.454 · black 0.372 |
| `dev-dependencias` | ✅ | uv 1 | uv 0.487 · pnpm 0.420 · sqlalchemy 0.372 |
| `infra-despliegue-continuo` | ✅ | argo-cd 5 · flux2 3 | containerd 0.500 · kubernetes 0.483 · flux2 0.466 |
| `infra-como-codigo` | ✅ | terraform 1 | terraform 0.552 · lago 0.377 · traefik 0.372 |
| `auto-servidores` | ✅ | ansible 1 | ansible 0.456 · caddy 0.362 · cert-manager 0.351 |
| `obs-trazas` | ✅ | jaeger 1 · opentelemetry-collector 6 | jaeger 0.479 · istio 0.343 · traefik 0.321 |
| `seguridad-secretos` | ✅ | vault 1 | vault 0.513 · keycloak 0.376 · zitadel 0.372 |
| `datos-lotes` | ✅ | spark 3 · beam 1 | beam 0.424 · flink 0.422 · spark 0.365 |
| `datos-orquestacion` | ✅ | airflow 1 · prefect 3 · dagster 4 | airflow 0.452 · flink 0.410 · prefect 0.402 |
| `busqueda-vectorial` | ✅ | pgvector 1 · OpenSearch 9 · meilisearch 3 · qdrant 2 · typesense 4 | pgvector 0.553 · qdrant 0.479 · meilisearch 0.378 |

## Pares (deben dar resultados distintos)

| Par | Consulta | Top-3 |
|---|---|---|
| access | `clinica-auth` | kratos 0.487 · keycloak 0.473 · zitadel 0.453 |
| access | `seguridad-secretos` | vault 0.513 · keycloak 0.376 · zitadel 0.372 |
| automation | `tienda-automation` | listmonk 0.282 · ClickHouse 0.250 · lago 0.246 |
| automation | `auto-servidores` | ansible 0.456 · caddy 0.362 · cert-manager 0.351 |
| lint | `dev-lint-python` | ruff 0.481 · black 0.471 · cpython 0.443 |
| lint | `dev-lint-javascript` | eslint 0.527 · jest 0.373 · TypeScript 0.373 |
| tests | `dev-test-navegador` | playwright 0.562 · cypress 0.463 · vitest 0.405 |
| tests | `dev-test-unitarias` | pytest 0.562 · cpython 0.454 · black 0.372 |

## Consultas sin respuesta (el puntaje del 1.º sirve para el umbral)

| Consulta | Top-3 (puntaje) |
|---|---|
| `tienda-automation` | listmonk 0.282 · ClickHouse 0.250 · lago 0.246 |
| `none-contabilidad` | killbill 0.193 · listmonk 0.190 · alertmanager 0.164 |
| `none-inventario` | flux2 0.210 · vault 0.209 · git 0.205 |
| `none-videollamadas` | playwright 0.287 · cypress 0.271 · core 0.236 |
| `none-factura-electronica` | killbill 0.256 · lago 0.213 · Ghost 0.157 |

## Umbral de `no_evidence`

Si el 1.er resultado de una necesidad puntúa menos que el umbral, se responde como sin evidencia. Para calcularlo solo cuentan las consultas con respuesta que la búsqueda resuelve (algún esperado en el top-3); las demás son fallos de búsqueda.

| | Valor |
|---|---|
| 1.er resultado, con respuesta resueltas (85) | 0.193 – 0.562 |
| 1.er resultado, con respuesta no resueltas (10) | 0.131 – 0.484 |
| 1.er resultado, sin respuesta (5) | 0.193 – 0.287 |
| Umbral actual del modelo | 0.18 |
| Umbral que sugiere la regla | **0.19** |
| Umbral actual: resueltas bloqueadas (error grave) | 0/85: — |
| Umbral actual: sin respuesta que pasan | 5/5: `tienda-automation`, `none-contabilidad`, `none-inventario`, `none-videollamadas`, `none-factura-electronica` |
| Umbral sugerido: resueltas bloqueadas (error grave) | 0/85: — |
| Umbral sugerido: sin respuesta que pasan | 5/5: `tienda-automation`, `none-contabilidad`, `none-inventario`, `none-videollamadas`, `none-factura-electronica` |

Fallos de búsqueda (no cuentan para el umbral): `an-tableros`, `tienda-analytics`, `tienda-analytics-v2`, `logistica-database`, `logistica-database-v2`, `periodico-frontend-v2`, `periodico-analytics`, `rag-largo-auth-v2`, `api-largo-infrastructure`, `rag-corto-ai-v2`
