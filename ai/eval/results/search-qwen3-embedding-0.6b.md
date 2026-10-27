# Evaluación de la búsqueda · Qwen/Qwen3-Embedding-0.6B

Generado con `python -m ai.eval.run_search_eval` el 2026-10-26. Golden set v1 · 20 repos · k = 3 · CPU.

## Resumen

| Métrica | Valor |
|---|---|
| hit@3 | 14/14 (100%) |
| MRR@3 | 0.92 |
| Carga del modelo + primera consulta | 6.6 s |
| Vectores del catálogo (20 repos) | 11.6 s |
| Consulta (promedio) | 0.21 s |

## Consultas con respuesta

| Consulta | Acierto | Posición del 1.er esperado | Top-3 (puntaje) | Esperados |
|---|---|---|---|---|
| `auth-sso` | ✅ | 1 | keycloak 0.615 · kratos 0.571 · supertokens-core 0.533 | keycloak, zitadel |
| `auth-social` | ✅ | 1 | supertokens-core 0.564 · pocketbase 0.541 · kratos 0.526 | supertokens-core, pocketbase |
| `auth-passkeys` | ✅ | 1 | kratos 0.560 · keycloak 0.548 · supertokens-core 0.540 | zitadel, kratos |
| `pay-subs` | ✅ | 1 | lago 0.632 · killbill 0.575 · hyperswitch 0.531 | killbill, lago |
| `pay-usage` | ✅ | 1 | lago 0.687 · killbill 0.617 · hyperswitch 0.593 | lago |
| `pay-gateways` | ✅ | 1 | hyperswitch 0.683 · killbill 0.519 · lago 0.517 | hyperswitch |
| `an-web` | ✅ | 1 | analytics 0.661 · posthog 0.475 · supertokens-core 0.469 | analytics, umami |
| `an-product` | ✅ | 2 | analytics 0.563 · posthog 0.555 · umami 0.511 | posthog |
| `an-bi` | ✅ | 1 | metabase 0.589 · analytics 0.538 · lago 0.537 | metabase |
| `search-shop` | ✅ | 1 | typesense 0.659 · meilisearch 0.640 · qdrant 0.619 | meilisearch, typesense |
| `ai-docs` | ✅ | 1 | llama_index 0.569 · langchain 0.557 · typesense 0.554 | llama_index, langchain |
| `ai-local` | ✅ | 3 | supabase 0.485 · pocketbase 0.478 · ollama 0.438 | ollama |
| `db-backend` | ✅ | 1 | pocketbase 0.619 · supabase 0.578 · redis 0.559 | supabase, pocketbase |
| `db-cache` | ✅ | 1 | redis 0.605 · pocketbase 0.540 · typesense 0.514 | redis |

## Pares (deben dar resultados distintos)

| Par | Consulta | Top-3 |
|---|---|---|
| analytics | `an-web` | analytics 0.661 · posthog 0.475 · supertokens-core 0.469 |
| analytics | `an-product` | analytics 0.563 · posthog 0.555 · umami 0.511 |
| auth | `auth-sso` | keycloak 0.615 · kratos 0.571 · supertokens-core 0.533 |
| auth | `auth-social` | supertokens-core 0.564 · pocketbase 0.541 · kratos 0.526 |
| billing | `pay-subs` | lago 0.632 · killbill 0.575 · hyperswitch 0.531 |
| billing | `pay-usage` | lago 0.687 · killbill 0.617 · hyperswitch 0.593 |

## Consultas sin respuesta (el puntaje del 1.º sirve para el umbral)

| Consulta | 1.er resultado (puntaje) |
|---|---|
| `none-notify` | langchain 0.448 |
| `none-video` | analytics 0.439 |
| `none-agenda` | pocketbase 0.487 |
| `none-email` | analytics 0.453 |
