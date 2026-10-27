# Evaluación de la búsqueda · google/embeddinggemma-300m

Generado con `python -m ai.eval.run_search_eval` el 2026-10-27. Golden set v2 · 20 repos · k = 3 · CPU.

## Resumen

| Métrica | Valor |
|---|---|
| hit@3 | 14/14 (100%) |
| MRR@3 | 0.83 |
| recall@3 | 93% |
| Carga del modelo + primera consulta | 6.6 s |
| Vectores del catálogo (20 repos) | 5.5 s |
| Consulta (promedio) | 0.09 s |

## Consultas con respuesta

| Consulta | Acierto | Posición de cada esperado | Top-3 (puntaje) |
|---|---|---|---|
| `auth-sso` | ✅ | keycloak 1 · zitadel 2 | keycloak 0.453 · zitadel 0.411 · kratos 0.379 |
| `auth-social` | ✅ | supertokens-core 3 · pocketbase 1 | pocketbase 0.339 · kratos 0.325 · supertokens-core 0.317 |
| `auth-passkeys` | ✅ | zitadel 5 · kratos 3 | supertokens-core 0.400 · keycloak 0.345 · kratos 0.340 |
| `pay-subs` | ✅ | killbill 1 · lago 2 | killbill 0.436 · lago 0.406 · hyperswitch 0.275 |
| `pay-usage` | ✅ | lago 1 | lago 0.524 · killbill 0.414 · hyperswitch 0.362 |
| `pay-gateways` | ✅ | hyperswitch 1 | hyperswitch 0.554 · killbill 0.326 · lago 0.324 |
| `an-web` | ✅ | analytics 1 · umami 2 | analytics 0.456 · umami 0.404 · metabase 0.240 |
| `an-product` | ✅ | posthog 3 | umami 0.371 · analytics 0.363 · posthog 0.340 |
| `an-bi` | ✅ | metabase 2 | analytics 0.207 · metabase 0.205 · lago 0.203 |
| `search-shop` | ✅ | meilisearch 2 · typesense 1 | typesense 0.456 · meilisearch 0.430 · qdrant 0.360 |
| `ai-docs` | ✅ | llama_index 1 · langchain 7 | llama_index 0.319 · meilisearch 0.303 · qdrant 0.289 |
| `ai-local` | ✅ | ollama 2 | langchain 0.350 · ollama 0.347 · supabase 0.315 |
| `db-backend` | ✅ | supabase 2 · pocketbase 1 | pocketbase 0.558 · supabase 0.496 · redis 0.415 |
| `db-cache` | ✅ | redis 1 | redis 0.362 · pocketbase 0.221 · supabase 0.199 |

## Pares (deben dar resultados distintos)

| Par | Consulta | Top-3 |
|---|---|---|
| analytics | `an-web` | analytics 0.456 · umami 0.404 · metabase 0.240 |
| analytics | `an-product` | umami 0.371 · analytics 0.363 · posthog 0.340 |
| auth | `auth-sso` | keycloak 0.453 · zitadel 0.411 · kratos 0.379 |
| auth | `auth-social` | pocketbase 0.339 · kratos 0.325 · supertokens-core 0.317 |
| billing | `pay-subs` | killbill 0.436 · lago 0.406 · hyperswitch 0.275 |
| billing | `pay-usage` | lago 0.524 · killbill 0.414 · hyperswitch 0.362 |

## Consultas sin respuesta (el puntaje del 1.º sirve para el umbral)

| Consulta | 1.er resultado (puntaje) |
|---|---|
| `none-notify` | supabase 0.149 |
| `none-video` | umami 0.117 |
| `none-agenda` | lago 0.145 |
| `none-email` | umami 0.141 |
| `none-accounting` | pocketbase 0.190 |
| `none-einvoice` | killbill 0.156 |
| `none-inventory` | lago 0.208 |
| `none-videocall` | killbill 0.188 |
