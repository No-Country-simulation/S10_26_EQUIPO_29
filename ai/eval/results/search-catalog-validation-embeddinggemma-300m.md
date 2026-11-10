# Evaluación de la búsqueda · google/embeddinggemma-300m

Generado con `python -m ai.eval.run_search_eval --golden catalog-validation` el 2026-11-08. Golden set `catalog-validation` v2 (etiquetas del catálogo del 2026-11-08) · catálogo `snapshot` del 2026-11-08 · 127 repos · k = 3 · CPU · datos de la IA en el texto: summary, use_cases.

## Resumen

| Métrica | Valor |
|---|---|
| hit@3 | 26/26 (100%) |
| MRR@3 | 0.96 |
| recall@3 | 92% |
| hit@5 (con 5 candidatos por necesidad) | 26/26 (100%) |
| Carga del modelo + primera consulta | 16.7 s |
| Vectores del catálogo (127 repos) | 21.1 s |
| Consulta (promedio) | 0.06 s |

## Consultas con respuesta

| Consulta | Acierto | Posición de cada esperado | Top-3 (puntaje) |
|---|---|---|---|
| `cola-tareas` | ✅ | celery 1 | celery 0.408 · starlette 0.236 · airflow 0.236 |
| `transformacion-sql` | ✅ | dbt 1 | dbt 0.350 · sqlmodel 0.332 · sqlalchemy 0.324 |
| `db-embebida` | ✅ | duckdb 1 | duckdb 0.540 · metabase 0.482 · ClickHouse 0.452 |
| `clave-valor` | ✅ | etcd 1 | etcd 0.488 · valkey 0.443 · seaweedfs 0.314 |
| `https-automatico` | ✅ | caddy 1 · traefik 5 | caddy 0.535 · cert-manager 0.445 · nginx 0.379 |
| `certificados-k8s` | ✅ | cert-manager 1 | cert-manager 0.679 · helm 0.451 · kubernetes 0.451 |
| `paquetes-k8s` | ✅ | helm 1 | helm 0.598 · kubernetes 0.542 · argo-cd 0.461 |
| `malla-servicios` | ✅ | istio 1 · envoy 3 | istio 0.460 · traefik 0.410 · envoy 0.313 |
| `red-contenedores` | ✅ | cilium 1 · istio 3 | cilium 0.371 · containerd 0.365 · istio 0.321 |
| `datos-tabulares` | ✅ | pandas 1 | pandas 0.483 · numpy 0.388 · sqlalchemy 0.362 |
| `redes-neuronales` | ✅ | pytorch 1 · tensorflow 2 | pytorch 0.448 · tensorflow 0.424 · transformers 0.336 |
| `ml-clasico` | ✅ | scikit-learn 2 | transformers 0.361 · scikit-learn 0.339 · tensorflow 0.317 |
| `api-llm` | ✅ | anthropic-sdk-python 3 · openai-python 2 · langchain 1 | langchain 0.443 · openai-python 0.434 · anthropic-sdk-python 0.414 |
| `componentes-ui` | ✅ | react 1 · core 2 · svelte 3 | react 0.477 · core 0.449 · svelte 0.438 |
| `estilos-ui` | ✅ | tailwindcss 1 | tailwindcss 0.461 · storybook 0.355 · react 0.330 |
| `multi-contenedor` | ✅ | compose 1 | compose 0.473 · kubernetes 0.406 · containerd 0.405 |
| `balanceo-carga` | ✅ | nginx 1 · traefik 2 · envoy 15 | nginx 0.399 · traefik 0.358 · analytics 0.274 |
| `metricas-servidores` | ✅ | prometheus 2 · opentelemetry-collector 1 | opentelemetry-collector 0.423 · prometheus 0.422 · jaeger 0.357 |
| `validacion-datos` | ✅ | pydantic 1 | pydantic 0.489 · TypeScript 0.299 · dbt 0.239 |
| `pruebas-js` | ✅ | jest 1 · vitest 5 | jest 0.526 · react-testing-library 0.423 · playwright 0.415 |
| `none-objetos` | ✅ | seaweedfs 2 · rustfs 1 | rustfs 0.539 · seaweedfs 0.506 · valkey 0.315 |
| `none-push` | ✅ | novu 2 · apprise 1 | apprise 0.486 · novu 0.316 · alertmanager 0.254 |
| `none-sms` | ✅ | novu 2 · apprise 3 | listmonk 0.188 · novu 0.185 · apprise 0.162 |
| `none-embudos` | ✅ | posthog 4 · umami 1 | umami 0.302 · envoy 0.259 · dbt 0.256 |
| `none-sso` | ✅ | keycloak 3 · zitadel 4 · kratos 2 · supertokens-core 1 | supertokens-core 0.459 · kratos 0.374 · keycloak 0.364 |
| `none-facturacion-uso` | ✅ | lago 1 | lago 0.384 · killbill 0.336 · Ghost 0.183 |

## Consultas sin respuesta (el puntaje del 1.º sirve para el umbral)

| Consulta | Top-3 (puntaje) |
|---|---|
| `none-grafos` | supabase 0.357 · grafana 0.351 · qdrant 0.349 |
| `none-cdn` | etcd 0.334 · nginx 0.277 · astro 0.274 |
| `none-respaldos` | rustfs 0.264 · vault 0.257 · caddy 0.242 |
| `none-chat` | novu 0.270 · redis 0.246 · ClickHouse 0.243 |
| `none-aprobaciones` | airflow 0.254 · flink 0.248 · flux2 0.247 |
| `none-editor-paginas` | vscode 0.423 · neovim 0.392 · biome 0.325 |
| `none-crm` | alertmanager 0.290 · cert-manager 0.235 · ClickHouse 0.227 |
| `none-agenda` | apprise 0.213 · dagster 0.200 · qdrant 0.186 |
| `none-firma` | zitadel 0.189 · cert-manager 0.189 · ecma262 0.181 |

## Umbral de `no_evidence`

Si el 1.er resultado de una necesidad puntúa menos que el umbral, se responde como sin evidencia. Para calcularlo solo cuentan las consultas con respuesta que la búsqueda resuelve (algún esperado en el top-3); las demás son fallos de búsqueda.

| | Valor |
|---|---|
| 1.er resultado, con respuesta resueltas (26) | 0.188 – 0.679 |
| 1.er resultado, con respuesta no resueltas (0) | — |
| 1.er resultado, sin respuesta (9) | 0.189 – 0.423 |
| Umbral actual del modelo | 0.18 |
| Umbral que sugiere la regla | **0.18** |
| Umbral actual: resueltas bloqueadas (error grave) | 0/26: — |
| Umbral actual: sin respuesta que pasan | 9/9: `none-grafos`, `none-cdn`, `none-respaldos`, `none-chat`, `none-aprobaciones`, `none-editor-paginas`, `none-crm`, `none-agenda`, `none-firma` |

Fallos de búsqueda (no cuentan para el umbral): —
