# Evaluación de la búsqueda

Mide si la búsqueda semántica (`ai/search.py`) encuentra la herramienta
correcta para una necesidad, y con qué modelo de embeddings y umbral conviene
trabajar. Los números se generan con un solo comando; este documento los resume.

## Qué se mide

El asistente arma un stack buscando **una vez por necesidad** ("login con
Google", "cobrar suscripciones") y el LLM elige entre los 3 primeros
resultados. Lo que el LLM no recibe, no lo puede recomendar. Por eso se mide si
la herramienta correcta llega al top-3 de cada búsqueda.

Esta evaluación cubre **solo la búsqueda**. La calidad del stack completo
(descomponer la descripción del negocio, elegir y conectar) se mide aparte,
con las preguntas de prueba del asistente.

## Cómo correrla

Desde la raíz del repo, con el entorno activo:

```bash
python -m ai.eval.run_search_eval                             # modelo por defecto
AI_EMBEDDING_MODEL=qwen3 python -m ai.eval.run_search_eval    # otro modelo del registro
```

Cada corrida escribe `ai/eval/results/search-<modelo>.md`: métricas, top-3 de
cada consulta, pares y umbral. Tarda menos de un minuto en CPU.

## Golden set

`search_queries.json` (versión 2): consultas en español escritas como las
describiría un usuario, con los repos que deberían aparecer.

- **14 consultas con respuesta**, una o dos herramientas aceptables cada una.
  Un repo es aceptable solo si su descripción o sus topics muestran esa
  necesidad como propósito principal; cada consulta justifica su lista en `note`.
- **3 pares** de la misma categoría que deben dar resultados distintos
  (SSO corporativo vs. login social; suscripción vs. cobro por consumo;
  analítica web vs. analítica de producto).
- **8 consultas sin respuesta** (`expected: []`): necesidades que el catálogo
  no cubre, incluidas algunas que "casi" encajan. Sirven para calibrar el umbral.
- Las consultas evitan las palabras de las descripciones de los repos, para
  medir comprensión y no coincidencia de texto.

Si se cambian las respuestas esperadas, se sube `version`: resultados de
versiones distintas no se comparan.

## Métricas

| Métrica | Qué responde |
|---|---|
| **hit@3** | ¿Llegó al menos una herramienta correcta al top-3? |
| **MRR@3** | ¿Qué tan arriba? 1 si está primera, 0,5 si segunda, 0,33 si tercera, 0 si no llegó; promedio |
| **recall@3** | ¿Qué parte de *todas* las herramientas correctas llegó al top-3? Importa para que el LLM pueda comparar opciones |
| **Umbral** | Con el puntaje del 1.er resultado: ¿cuántas necesidades válidas se bloquearían y cuántas sin respuesta pasarían? |

Las consultas sin respuesta no cuentan para hit@3, MRR ni recall.

## Resultados

Golden set v2 · 20 repos · CPU (laptop, float32). Tiempos: rango de varias corridas.

| | EmbeddingGemma-300m | Qwen3-Embedding-0.6B |
|---|---|---|
| hit@3 | 14/14 | 14/14 |
| MRR@3 | 0,83 | 0,92 |
| recall@3 | 93 % | 89 % |
| 1.er resultado, consultas con respuesta | 0,207 – 0,558 | 0,485 – 0,687 |
| 1.er resultado, consultas sin respuesta | 0,117 – 0,208 | 0,439 – 0,554 |
| Vectores de 20 repos | 4–5,5 s | 11–15 s |
| Consulta | 0,06–0,09 s | 0,20–0,69 s |
| RAM aproximada | ~1,2 GB (estimada por el tamaño de los pesos) | ~2,4 GB |
| Instalación | Cuenta de Hugging Face, aceptar la licencia Gemma y token de lectura | Libre (Apache 2.0) |

Detalle por consulta en `results/`.

## Decisiones

**Modelo: EmbeddingGemma-300m** (por defecto en `ai/embeddings.py`).

- Separa mucho mejor lo que el catálogo no tiene: con Qwen3, consultas sin
  respuesta como "llevar la contabilidad" puntúan más alto que consultas
  válidas, y no existe un umbral posible.
- Unas 3 veces más rápido y con la mitad de RAM, lo que importa para desplegar.
- Mejor recall y diferencia mejor los pares.
- Pierde en MRR (0,83 frente a 0,92): pone la herramienta correcta 2.ª o 3.ª
  en algunas consultas. Con 14 consultas y top-3, la diferencia no es concluyente.
- Costo: cada máquina que lo descargue necesita el token (ver `ai/README.md`).
- Reversible: Qwen3 sigue en el registro (`AI_EMBEDDING_MODEL=qwen3`); cambiar
  de modelo obliga a recalibrar el umbral.

**Umbral de "sin evidencia": 0,20** (`min_score` del modelo en `ai/embeddings.py`).

- Si el 1.er resultado de una necesidad puntúa menos de 0,20, el catálogo no
  tiene una herramienta para ella. Un puntaje igual a 0,20 pasa.
- Resultado: 0 de 14 necesidades válidas bloqueadas; 1 de 8 sin respuesta pasa
  ("controlar el inventario", 0,208).
- El corte está cerca de las consultas sin respuesta a propósito: bloquear una
  necesidad válida no tiene arreglo después (el LLM nunca ve esa herramienta),
  mientras que una necesidad sin respuesta que pasa todavía puede frenarla el LLM.
- Se aplica **sin filtros**: si una necesidad tiene evidencia pero nada cumple
  los filtros del usuario (por ejemplo, la licencia), la respuesta es una
  limitación ("existe, pero no con esa licencia"), no "sin evidencia".

## Qué falla y por qué

- **ZITADEL no llega al top-3** para "login con passkeys" (5.º con los dos
  modelos), aunque tiene el topic `passkeys`. Su descripción es muy general.
- **Analítica de producto y BI:** PostHog y Metabase pierden contra Plausible
  por márgenes mínimos. Sus descripciones son de marketing o en otros términos
  ("dashboard" frente a "tableros").
- **"Asistente sobre documentos internos":** LangChain queda 7.º con EmbeddingGemma.

Patrón: los repos con descripción vaga son los que peor se encuentran. Un
resumen generado (`summary_es`) dentro del texto a embeber es el candidato
para mejorarlo.

## Límites

- **20 repos y 22 consultas:** los números indican una dirección, no son
  precisos. Con 3–4 repos por categoría, hit@3 queda en el techo; MRR, recall
  y las posiciones son las que diferencian.
- **Un golden set vale para una versión del catálogo.** Con más repos aparecerán
  otras herramientas válidas que no están en las listas, y alguna consulta sin
  respuesta puede dejar de serlo.
- **El umbral es provisional:** con más repos, los puntajes de las consultas sin
  respuesta tienden a subir.
- **Los tiempos varían entre corridas** según la carga de la máquina; se comparan
  en proporción. La RAM de EmbeddingGemma es una estimación.
- Las consultas simulan las búsquedas por necesidad que hará el asistente. Si el
  asistente las escribe con otro estilo o en otro idioma, hay que volver a medir.
- Qdrant (base vectorial) no tiene una consulta propia: es una pieza técnica
  más que una necesidad de negocio.

## Cuando cambie el catálogo

1. Correr la evaluación y revisar los top-3: si aparecen herramientas válidas
   que no están en las listas, agregarlas **solo con evidencia** (descripción o
   topics), con su `note`, y subir `version`.
2. Revisar que las consultas sin respuesta sigan sin respuesta.
3. Mirar la sección "Umbral" del reporte y recalibrar `min_score` si hay
   necesidades válidas bloqueadas.
