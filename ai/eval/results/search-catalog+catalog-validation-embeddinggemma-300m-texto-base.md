# Evaluación de la búsqueda · google/embeddinggemma-300m

Generado con `python -m ai.eval.run_search_eval --golden catalog catalog-validation --texto base` el 2026-11-08. Golden set `catalog` v3, `catalog-validation` v2 (etiquetas del catálogo del 2026-11-08) · catálogo `snapshot` del 2026-11-08 · 127 repos · k = 3 · CPU · datos de la IA en el texto: ninguno.

## Resumen

| Métrica | Valor |
|---|---|
| hit@3 | 105/121 (87%) |
| MRR@3 | 0.80 |
| recall@3 | 70% |
| hit@5 (con 5 candidatos por necesidad) | 112/121 (93%) |
| Carga del modelo + primera consulta | 17.4 s |
| Vectores del catálogo (127 repos) | 11.2 s |
| Consulta (promedio) | 0.06 s |

## Consultas con respuesta

| Consulta | Acierto | Posición de cada esperado | Top-3 (puntaje) |
|---|---|---|---|
| `msg-eventos` | ✅ | kafka 2 | flux2 0.307 · kafka 0.288 · beam 0.231 |
| `proc-tiempo-real` | ❌ | flink 18 · beam 4 | redis 0.298 · ClickHouse 0.252 · kafka 0.249 |
| `db-analitica` | ❌ | ClickHouse 6 · duckdb 7 | umami 0.278 · analytics 0.275 · seaweedfs 0.245 |
| `an-tableros` | ❌ | grafana 15 | postal 0.165 · payload 0.146 · jaeger 0.146 |
| `ai-rag` | ✅ | llama_index 1 · langchain 24 | llama_index 0.242 · ansible 0.211 · posthog 0.191 |
| `obs-stack` | ✅ | opentelemetry-collector 4 · prometheus 5 · grafana 1 | grafana 0.415 · lago 0.382 · traefik 0.379 |
| `none-pagos` | ✅ | killbill 1 · lago 2 | killbill 0.356 · lago 0.284 · hyperswitch 0.209 |
| `none-login` | ✅ | keycloak 4 · zitadel 3 · kratos 2 · supertokens-core 1 | supertokens-core 0.320 · kratos 0.283 · zitadel 0.248 |
| `none-recordatorios` | ✅ | novu 3 · apprise 1 · postal 5 | apprise 0.208 · alertmanager 0.178 · novu 0.149 |
| `none-videos` | ✅ | seaweedfs 1 · rustfs 9 | seaweedfs 0.147 · svelte 0.121 · vllm 0.113 |
| `none-cms` | ✅ | Ghost 1 · strapi 9 · payload 6 | Ghost 0.277 · listmonk 0.210 · vscode 0.181 |
| `none-analitica-web` | ✅ | analytics 2 · umami 1 · posthog 21 | umami 0.289 · analytics 0.255 · grafana 0.194 |
| `clinica-auth` | ✅ | keycloak 3 · zitadel 2 · kratos 1 · supertokens-core 4 | kratos 0.435 · zitadel 0.401 · keycloak 0.372 |
| `clinica-auth-v2` | ✅ | keycloak 2 · zitadel 4 · kratos 1 · supertokens-core 3 | kratos 0.306 · keycloak 0.248 · supertokens-core 0.247 |
| `clinica-communication` | ✅ | novu 2 · apprise 1 | apprise 0.292 · novu 0.240 · alertmanager 0.180 |
| `clinica-communication-v2` | ✅ | novu 1 · apprise 6 | novu 0.219 · postal 0.209 · listmonk 0.199 |
| `clinica-payments` | ✅ | hyperswitch 1 | hyperswitch 0.360 · killbill 0.246 · lago 0.244 |
| `clinica-payments-v2` | ✅ | hyperswitch 1 | hyperswitch 0.322 · lago 0.217 · killbill 0.216 |
| `tienda-search` | ✅ | OpenSearch 5 · meilisearch 2 · typesense 1 | typesense 0.442 · meilisearch 0.351 · ripgrep 0.311 |
| `tienda-search-v2` | ✅ | OpenSearch 4 · meilisearch 2 · typesense 1 | typesense 0.436 · meilisearch 0.381 · ripgrep 0.341 |
| `tienda-payments` | ✅ | hyperswitch 1 | hyperswitch 0.319 · killbill 0.189 · lago 0.162 |
| `tienda-payments-v2` | ✅ | hyperswitch 1 | hyperswitch 0.339 · killbill 0.167 · lago 0.142 |
| `tienda-analytics` | ❌ | grafana 12 · metabase 5 | umami 0.345 · analytics 0.280 · duckdb 0.225 |
| `tienda-analytics-v2` | ✅ | grafana 11 · metabase 3 | umami 0.341 · analytics 0.294 · metabase 0.233 |
| `academia-auth` | ✅ | keycloak 4 · zitadel 3 · kratos 2 · supertokens-core 1 | supertokens-core 0.349 · kratos 0.313 · zitadel 0.286 |
| `academia-storage` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.253 · rustfs 0.177 · etcd 0.137 |
| `academia-storage-v2` | ✅ | seaweedfs 1 · rustfs 2 | seaweedfs 0.273 · rustfs 0.234 · payload 0.128 |
| `academia-payments` | ✅ | killbill 1 · lago 2 | killbill 0.337 · lago 0.285 · Ghost 0.198 |
| `academia-payments-v2` | ✅ | killbill 1 · lago 2 | killbill 0.343 · lago 0.283 · listmonk 0.235 |
| `academia-ai` | ✅ | langchain 1 · llama_index 7 | langchain 0.274 · anthropic-sdk-python 0.268 · qdrant 0.253 |
| `academia-ai-v2` | ✅ | langchain 2 · llama_index 8 | transformers 0.277 · langchain 0.266 · anthropic-sdk-python 0.264 |
| `logistica-messaging` | ✅ | kafka 1 · flink 6 · beam 2 | kafka 0.307 · beam 0.303 · airflow 0.272 |
| `logistica-messaging-v2` | ✅ | kafka 1 · flink 5 · beam 3 | kafka 0.308 · redis 0.296 · beam 0.294 |
| `logistica-database` | ❌ | ClickHouse 22 · supabase 7 | seaweedfs 0.268 · etcd 0.214 · valkey 0.203 |
| `logistica-database-v2` | ❌ | ClickHouse 26 · supabase 6 | seaweedfs 0.258 · redis 0.235 · etcd 0.234 |
| `logistica-analytics` | ✅ | grafana 2 · metabase 1 | metabase 0.324 · grafana 0.306 · dbt 0.257 |
| `logistica-analytics-v2` | ✅ | grafana 1 · metabase 2 | grafana 0.301 · metabase 0.251 · dbt 0.200 |
| `soporte-ai` | ✅ | ollama 2 · vllm 1 | vllm 0.371 · ollama 0.318 · langchain 0.304 |
| `soporte-ai-v2` | ✅ | ollama 1 · vllm 5 | ollama 0.301 · qdrant 0.284 · anthropic-sdk-python 0.284 |
| `soporte-search` | ✅ | OpenSearch 5 · meilisearch 1 · typesense 4 | meilisearch 0.327 · llama_index 0.325 · ripgrep 0.319 |
| `soporte-search-v2` | ✅ | OpenSearch 4 · meilisearch 2 · typesense 1 | typesense 0.312 · meilisearch 0.307 · qdrant 0.291 |
| `soporte-observability` | ✅ | grafana 2 · opentelemetry-collector 3 · prometheus 1 | prometheus 0.338 · grafana 0.313 · opentelemetry-collector 0.309 |
| `soporte-observability-v2` | ✅ | grafana 2 · opentelemetry-collector 3 · prometheus 1 | prometheus 0.326 · grafana 0.324 · opentelemetry-collector 0.319 |
| `periodico-cms` | ✅ | Ghost 1 · strapi 5 · payload 3 | Ghost 0.229 · vscode 0.205 · payload 0.196 |
| `periodico-cms-v2` | ✅ | Ghost 1 · strapi 4 · payload 2 | Ghost 0.256 · payload 0.239 · astro 0.224 |
| `periodico-frontend` | ❌ | nuxt 31 · next.js 17 · astro 5 | vite 0.326 · cypress 0.274 · svelte 0.270 |
| `periodico-frontend-v2` | ❌ | nuxt 25 · next.js 14 · astro 16 | vite 0.392 · tailwindcss 0.386 · react 0.385 |
| `periodico-communication` | ✅ | listmonk 2 · postal 1 | postal 0.227 · listmonk 0.204 · novu 0.144 |
| `periodico-communication-v2` | ✅ | listmonk 2 · postal 1 | postal 0.266 · listmonk 0.156 · envoy 0.124 |
| `periodico-analytics` | ❌ | analytics 12 · umami 5 · posthog 31 | jest 0.090 · alertmanager 0.078 · grafana 0.077 |
| `periodico-analytics-v2` | ✅ | analytics 2 · umami 1 · posthog 42 | umami 0.308 · analytics 0.283 · lago 0.276 |
| `saas-largo-auth` | ✅ | keycloak 1 · zitadel 2 | keycloak 0.463 · zitadel 0.409 · kratos 0.394 |
| `saas-largo-auth-v2` | ✅ | keycloak 4 · zitadel 1 | zitadel 0.335 · kratos 0.321 · supertokens-core 0.313 |
| `rag-largo-ai` | ✅ | ollama 3 · vllm 2 | transformers 0.294 · vllm 0.261 · ollama 0.249 |
| `rag-largo-ai-v2` | ✅ | ollama 3 · vllm 1 | vllm 0.285 · transformers 0.275 · ollama 0.228 |
| `rag-largo-search` | ✅ | OpenSearch 6 · pgvector 3 · meilisearch 1 · qdrant 2 · typesense 4 | meilisearch 0.463 · qdrant 0.437 · pgvector 0.381 |
| `rag-largo-search-v2` | ✅ | OpenSearch 6 · pgvector 3 · meilisearch 1 · qdrant 2 · typesense 4 | meilisearch 0.481 · qdrant 0.456 · pgvector 0.424 |
| `rag-largo-auth` | ✅ | keycloak 3 · zitadel 2 | vault 0.296 · zitadel 0.285 · keycloak 0.283 |
| `rag-largo-auth-v2` | ❌ | keycloak 4 · zitadel 8 | cert-manager 0.283 · ecma262 0.259 · vault 0.245 |
| `api-largo-database` | ❌ | postgres 14 · server 7 · supabase 6 | sqlmodel 0.304 · ClickHouse 0.300 · sqlalchemy 0.289 |
| `api-largo-cache` | ✅ | redis 1 · valkey 2 | redis 0.377 · valkey 0.366 · etcd 0.288 |
| `api-largo-cache-v2` | ✅ | redis 1 · valkey 2 | redis 0.385 · valkey 0.383 · etcd 0.328 |
| `api-largo-infrastructure` | ❌ | kubernetes 13 · nginx 51 · traefik 35 | hyperswitch 0.304 · seaweedfs 0.295 · redis 0.279 |
| `api-largo-infrastructure-v2` | ✅ | kubernetes 1 | kubernetes 0.361 · compose 0.330 · runc 0.307 |
| `saas-corto-auth` | ✅ | keycloak 3 · zitadel 4 | kratos 0.324 · supertokens-core 0.303 · keycloak 0.297 |
| `saas-corto-auth-v2` | ✅ | keycloak 2 · zitadel 4 | kratos 0.396 · keycloak 0.335 · supertokens-core 0.321 |
| `rag-corto-ai` | ❌ | langchain 4 · llama_index 5 | qdrant 0.234 · vllm 0.223 · transformers 0.217 |
| `rag-corto-ai-v2` | ❌ | langchain 6 · llama_index 13 | qdrant 0.185 · pytorch 0.178 · jaeger 0.172 |
| `rag-corto-auth` | ✅ | keycloak 3 · zitadel 2 | kratos 0.433 · zitadel 0.432 · keycloak 0.406 |
| `rag-corto-auth-v2` | ✅ | keycloak 2 · zitadel 5 | vault 0.342 · keycloak 0.325 · supertokens-core 0.264 |
| `api-corto-cache` | ✅ | redis 2 · valkey 1 | valkey 0.205 · redis 0.196 · seaweedfs 0.181 |
| `api-corto-cache-v2` | ✅ | redis 1 · valkey 2 | redis 0.305 · valkey 0.284 · etcd 0.193 |
| `api-corto-infrastructure` | ✅ | kubernetes 1 | kubernetes 0.292 · containerd 0.264 · runc 0.244 |
| `api-corto-infrastructure-v2` | ❌ | kubernetes 16 · nginx 52 · traefik 17 | terraform 0.311 · ansible 0.214 · seaweedfs 0.207 |
| `eventos-messaging` | ✅ | kafka 2 · celery 10 | beam 0.228 · kafka 0.223 · airflow 0.186 |
| `eventos-messaging-v2` | ✅ | kafka 8 · celery 1 | celery 0.253 · beam 0.247 · starlette 0.198 |
| `observabilidad-observability` | ✅ | opentelemetry-collector 2 · prometheus 3 · grafana 1 | grafana 0.492 · opentelemetry-collector 0.443 · prometheus 0.379 |
| `observabilidad-observability-v2` | ✅ | jaeger 5 · opentelemetry-collector 1 · prometheus 3 | opentelemetry-collector 0.435 · grafana 0.417 · prometheus 0.369 |
| `una-busqueda-search` | ✅ | OpenSearch 4 · meilisearch 2 · typesense 1 | typesense 0.436 · meilisearch 0.336 · ripgrep 0.329 |
| `una-pagos-payments` | ✅ | killbill 1 · lago 2 | killbill 0.340 · lago 0.280 · Ghost 0.211 |
| `back-api` | ✅ | fastapi 3 · django 5 · flask 1 | flask 0.395 · openai-python 0.382 · fastapi 0.366 |
| `back-asgi` | ✅ | starlette 1 · fastapi 3 | starlette 0.416 · caddy 0.347 · fastapi 0.315 |
| `dev-lint-python` | ✅ | ruff 1 · black 3 | ruff 0.414 · cpython 0.412 · black 0.386 |
| `dev-lint-javascript` | ✅ | eslint 1 · biome 13 | eslint 0.477 · TypeScript 0.334 · vscode 0.305 |
| `dev-test-navegador` | ✅ | playwright 1 · cypress 2 | playwright 0.497 · cypress 0.395 · react-testing-library 0.327 |
| `dev-test-unitarias` | ✅ | pytest 1 | pytest 0.513 · cpython 0.340 · vitest 0.299 |
| `dev-dependencias` | ✅ | uv 1 | uv 0.371 · pnpm 0.368 · cpython 0.337 |
| `infra-despliegue-continuo` | ❌ | argo-cd 6 · flux2 4 | kubernetes 0.444 · containerd 0.444 · compose 0.406 |
| `infra-como-codigo` | ✅ | terraform 1 | terraform 0.533 · ansible 0.353 · traefik 0.314 |
| `auto-servidores` | ✅ | ansible 1 | ansible 0.409 · terraform 0.320 · cert-manager 0.288 |
| `obs-trazas` | ✅ | jaeger 1 · opentelemetry-collector 8 | jaeger 0.378 · grafana 0.253 · traefik 0.253 |
| `seguridad-secretos` | ✅ | vault 1 | vault 0.421 · cert-manager 0.323 · kratos 0.316 |
| `datos-lotes` | ✅ | spark 2 · beam 1 | beam 0.343 · spark 0.324 · flink 0.277 |
| `datos-orquestacion` | ✅ | airflow 2 · prefect 3 · dagster 1 | dagster 0.358 · airflow 0.349 · prefect 0.330 |
| `busqueda-vectorial` | ✅ | pgvector 1 · OpenSearch 9 · meilisearch 3 · qdrant 2 · typesense 4 | pgvector 0.494 · qdrant 0.392 · meilisearch 0.330 |
| `cola-tareas` | ✅ | celery 1 | celery 0.354 · tailwindcss 0.195 · posthog 0.191 |
| `transformacion-sql` | ✅ | dbt 1 | dbt 0.283 · sqlmodel 0.273 · sqlalchemy 0.267 |
| `db-embebida` | ✅ | duckdb 1 | duckdb 0.451 · metabase 0.418 · dbt 0.388 |
| `clave-valor` | ✅ | etcd 2 | valkey 0.400 · etcd 0.399 · seaweedfs 0.281 |
| `https-automatico` | ✅ | caddy 1 · traefik 29 | caddy 0.461 · cert-manager 0.372 · nginx 0.312 |
| `certificados-k8s` | ✅ | cert-manager 1 | cert-manager 0.642 · helm 0.372 · kubernetes 0.358 |
| `paquetes-k8s` | ✅ | helm 1 | helm 0.411 · kubernetes 0.411 · flux2 0.396 |
| `malla-servicios` | ✅ | istio 1 · envoy 3 | istio 0.332 · traefik 0.263 · envoy 0.253 |
| `red-contenedores` | ✅ | cilium 3 · istio 5 | containerd 0.326 · kubernetes 0.302 · cilium 0.293 |
| `datos-tabulares` | ✅ | pandas 1 | pandas 0.427 · cpython 0.329 · sqlalchemy 0.316 |
| `redes-neuronales` | ✅ | pytorch 1 · tensorflow 2 | pytorch 0.373 · tensorflow 0.365 · transformers 0.283 |
| `ml-clasico` | ✅ | scikit-learn 3 | transformers 0.280 · ollama 0.247 · scikit-learn 0.243 |
| `api-llm` | ✅ | anthropic-sdk-python 5 · openai-python 1 · langchain 3 | openai-python 0.349 · sqlmodel 0.315 · langchain 0.299 |
| `componentes-ui` | ✅ | react 1 · core 2 · svelte 5 | react 0.423 · core 0.381 · storybook 0.377 |
| `estilos-ui` | ✅ | tailwindcss 1 | tailwindcss 0.406 · storybook 0.300 · react 0.298 |
| `multi-contenedor` | ✅ | compose 1 | compose 0.410 · containerd 0.345 · kubernetes 0.291 |
| `balanceo-carga` | ✅ | nginx 1 · traefik 4 · envoy 11 | nginx 0.230 · umami 0.205 · analytics 0.197 |
| `metricas-servidores` | ✅ | prometheus 2 · opentelemetry-collector 1 | opentelemetry-collector 0.384 · prometheus 0.321 · grafana 0.299 |
| `validacion-datos` | ✅ | pydantic 1 | pydantic 0.422 · TypeScript 0.260 · sqlmodel 0.184 |
| `pruebas-js` | ✅ | jest 1 · vitest 7 | jest 0.432 · react-testing-library 0.387 · playwright 0.381 |
| `none-objetos` | ✅ | seaweedfs 2 · rustfs 1 | rustfs 0.508 · seaweedfs 0.457 · valkey 0.246 |
| `none-push` | ✅ | novu 2 · apprise 1 | apprise 0.436 · novu 0.228 · alertmanager 0.170 |
| `none-sms` | ✅ | novu 3 · apprise 9 | listmonk 0.166 · postal 0.138 · novu 0.136 |
| `none-embudos` | ✅ | posthog 14 · umami 1 | umami 0.264 · dbt 0.216 · envoy 0.211 |
| `none-sso` | ✅ | keycloak 4 · zitadel 3 · kratos 2 · supertokens-core 1 | supertokens-core 0.402 · kratos 0.345 · zitadel 0.326 |
| `none-facturacion-uso` | ✅ | lago 1 | lago 0.367 · killbill 0.274 · umami 0.144 |

## Pares (deben dar resultados distintos)

| Par | Consulta | Top-3 |
|---|---|---|
| access | `clinica-auth` | kratos 0.435 · zitadel 0.401 · keycloak 0.372 |
| access | `seguridad-secretos` | vault 0.421 · cert-manager 0.323 · kratos 0.316 |
| automation | `tienda-automation` | listmonk 0.256 · lago 0.214 · airflow 0.200 |
| automation | `auto-servidores` | ansible 0.409 · terraform 0.320 · cert-manager 0.288 |
| lint | `dev-lint-python` | ruff 0.414 · cpython 0.412 · black 0.386 |
| lint | `dev-lint-javascript` | eslint 0.477 · TypeScript 0.334 · vscode 0.305 |
| tests | `dev-test-navegador` | playwright 0.497 · cypress 0.395 · react-testing-library 0.327 |
| tests | `dev-test-unitarias` | pytest 0.513 · cpython 0.340 · vitest 0.299 |

## Consultas sin respuesta (el puntaje del 1.º sirve para el umbral)

| Consulta | Top-3 (puntaje) |
|---|---|
| `tienda-automation` | listmonk 0.256 · lago 0.214 · airflow 0.200 |
| `none-contabilidad` | listmonk 0.155 · lago 0.142 · killbill 0.126 |
| `none-inventario` | flux2 0.171 · ansible 0.161 · posthog 0.156 |
| `none-videollamadas` | playwright 0.256 · core 0.192 · cypress 0.186 |
| `none-factura-electronica` | killbill 0.172 · lago 0.162 · vscode 0.137 |
| `none-grafos` | supabase 0.322 · grafana 0.311 · metabase 0.301 |
| `none-cdn` | etcd 0.271 · astro 0.246 · nginx 0.208 |
| `none-respaldos` | rustfs 0.214 · seaweedfs 0.211 · caddy 0.203 |
| `none-chat` | redis 0.225 · ClickHouse 0.184 · novu 0.177 |
| `none-aprobaciones` | flux2 0.200 · terraform 0.192 · prefect 0.165 |
| `none-editor-paginas` | vscode 0.348 · metabase 0.300 · core 0.279 |
| `none-crm` | listmonk 0.201 · cert-manager 0.173 · cli 0.164 |
| `none-agenda` | biome 0.146 · listmonk 0.144 · qdrant 0.143 |
| `none-firma` | ecma262 0.153 · vscode 0.150 · zitadel 0.149 |

## Umbral de `no_evidence`

Si el 1.er resultado de una necesidad puntúa menos que el umbral, se responde como sin evidencia. Para calcularlo solo cuentan las consultas con respuesta que la búsqueda resuelve (algún esperado en el top-3); las demás son fallos de búsqueda.

| | Valor |
|---|---|
| 1.er resultado, con respuesta resueltas (105) | 0.147 – 0.642 |
| 1.er resultado, con respuesta no resueltas (16) | 0.090 – 0.444 |
| 1.er resultado, sin respuesta (14) | 0.146 – 0.348 |
| Umbral actual del modelo | 0.23 |
| Umbral que sugiere la regla | **0.14** |
| Umbral actual: resueltas bloqueadas (error grave) | 8/105: `none-recordatorios`, `none-videos`, `clinica-communication-v2`, `periodico-cms`, `periodico-communication`, `api-corto-cache`, `eventos-messaging`, `none-sms` |
| Umbral actual: sin respuesta que pasan | 5/14: `tienda-automation`, `none-videollamadas`, `none-grafos`, `none-cdn`, `none-editor-paginas` |
| Umbral sugerido: resueltas bloqueadas (error grave) | 0/105: — |
| Umbral sugerido: sin respuesta que pasan | 14/14: `tienda-automation`, `none-contabilidad`, `none-inventario`, `none-videollamadas`, `none-factura-electronica`, `none-grafos`, `none-cdn`, `none-respaldos`, `none-chat`, `none-aprobaciones`, `none-editor-paginas`, `none-crm`, `none-agenda`, `none-firma` |

Fallos de búsqueda (no cuentan para el umbral): `proc-tiempo-real`, `db-analitica`, `an-tableros`, `tienda-analytics`, `logistica-database`, `logistica-database-v2`, `periodico-frontend`, `periodico-frontend-v2`, `periodico-analytics`, `rag-largo-auth-v2`, `api-largo-database`, `api-largo-infrastructure`, `rag-corto-ai`, `rag-corto-ai-v2`, `api-corto-infrastructure-v2`, `infra-despliegue-continuo`

## Por conjunto (dato; las decisiones usan el conjunto combinado)

| Conjunto | hit@3 | MRR@3 | Sin respuesta |
|---|---|---|---|
| `catalog` | 79/95 | 0.78 | 5 |
| `catalog-validation` | 26/26 | 0.90 | 9 |
