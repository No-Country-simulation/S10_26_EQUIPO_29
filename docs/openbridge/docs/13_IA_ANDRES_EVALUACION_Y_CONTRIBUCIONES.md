# OpenBridge — Inteligencia Artificial y contribución de Andrés Iglesias

**Síntesis ejecutiva para la entrega de No Country · 12 de noviembre de 2026**
**Integrante:** Andrés Iglesias — AI Engineer
**Base principal:** [Documentación final de la IA, estado al 11/11/2026](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/main/ai/docs/documentacion-ia.pdf), integrada mediante [PR #141](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/141).
**Otras fuentes:** [README de IA](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/main/ai/README.md), [línea base de evaluación](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/main/ai/eval/BASELINE_DECISION.md), borrador de proyecto del 2/11/2026 y guía *Highlights de la IA* compartidos por Andrés.

> **Alcance y transparencia:** esta síntesis recoge implementación y resultados **documentados por el equipo**, no una ejecución nueva de tests, un pentest ni una certificación de disponibilidad del servicio. Las cifras corresponden a la versión expresamente indicada; las mejoras posteriores no se presentan como un rendimiento final ya medido.

## 1. Contribución técnica de la vertical de IA

El trabajo de Andrés comprende cinco capacidades conectadas:

1. **Búsqueda semántica:** interpreta necesidades en español o inglés y recupera herramientas del catálogo mediante embeddings con **EmbeddingGemma-300m** sobre CPU. La búsqueda usa similitud y prioridad por categoría, con respaldo abierto.
2. **Asistente de arquitectura:** interpreta el pedido de un negocio, descompone sus necesidades, recupera **hasta cinco candidatos por necesidad**, selecciona una herramienta válida o señala una limitación, y genera un mapa de stack con justificaciones.
3. **Validación y control de resultados:** los contratos y el código restringen las herramientas recomendadas a las existentes en el catálogo y comprueban la estructura de las respuestas; se contempla un reintento de generación cuando la salida incumple el contrato.
4. **Enriquecimiento del catálogo:** categorías, resúmenes en español y casos de uso respaldados con citas de README; las citas se comprueban antes de publicar.
5. **Ideas de integración y actualización:** propuestas de conexión técnica sustentadas en documentación, estado de revisión diferenciado y renovación selectiva de datos de IA, con recarga del índice del asistente sin reinicio.

El proveedor LLM principal documentado es **Gemini 3.5 Flash-Lite** y la vía de respaldo incluye **Groq**; la disponibilidad efectiva depende de configuración, credenciales y cuotas. Esto es una **arquitectura de recomendación restringida por evidencia**, no un chatbot que pueda proponer libremente tecnologías fuera del catálogo.

## 2. Cifras publicables: qué se midió y cuándo

**Versión evaluada:** `main` en `ba94ef4`, catálogo de 127 repositorios; medición de búsqueda del **8/11/2026** y del asistente del **9/11/2026**. Son resultados de una prueba final diseñada con casos que no se habían utilizado para elegir la solución; los conjuntos usados durante desarrollo no deben confundirse con cifras de rendimiento publicables.

| Métrica | Resultado informado | Denominador y contexto |
| --- | ---: | --- |
| Necesidades que recibieron una herramienta correcta | **69 % (123/177)** | 16 pedidos, 59 necesidades con herramienta en catálogo, 3 corridas |
| Necesidades detectadas | **93 % (165/177)** | Mismas oportunidades |
| Herramienta correcta encontrada entre los 5 candidatos | **79 % (131/165)** | Necesidades detectadas |
| Elección correcta si la herramienta ya estaba entre los candidatos | **94 % (123/131)** | Solo casos donde llegó el candidato correcto |
| Búsqueda: acierto entre los primeros 3 | **73 % (41/56)** | 56 consultas con respuesta |
| Tiempo de respuesta, mediana | **5,0 s** | 48 pedidos |
| Ataques de manipulación resistidos | **7 de 10** | Casos reservados para evaluación |
| Pedidos legítimos bloqueados por error | **0 de 6** | Prueba de defensas |
| Respuestas del modelo sin tildes | **31 de 610 (5,1 %)** | Respuestas de Gemini |

**Interpretación editorial:** el **94 % no es el acierto punta a punta del asistente**. Solo representa la calidad de elección **cuando la búsqueda ya recuperó la herramienta correcta**. El indicador que mejor refleja lo recibido por el usuario en esa prueba es **69 %**. La principal pérdida está en identificar necesidades y recuperar candidatos; el documento destaca dificultades en bases de datos y reportes sobre datos propios.

Posteriormente se integraron mejoras para la búsqueda por categoría, la comprensión de necesidades formuladas en lenguaje de negocio y los títulos de las propuestas. **No hay en el documento una nueva prueba final equivalente que permita sustituir esas cifras**.

## 3. Aportes verificables mediante Pull Requests

| PR oficial | Contribución | Estado revisado |
| --- | --- | --- |
| [#103](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/103) | Prueba final del asistente y búsqueda sobre 127 repositorios | Integrado |
| [#106](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/106) | Defensa contra prompt injection y validación | Integrado |
| [#121](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/121) | Recarga del catálogo del asistente sin reiniciar servicio | Integrado |
| [#123](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/123) | Workflow programado de actualización de datos de IA | Integrado |
| [#128](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/128) | Ejemplos para comprender necesidades de negocio | Integrado; posterior a prueba final |
| [#134](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/134) | Títulos de propuesta más específicos al sistema y negocio | Integrado; posterior a prueba final |
| [#141](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/141) | Documento final de IA en PDF | Integrado |
| [#143](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/143) | Mantener el modelo en memoria mediante actividad periódica | Integrado |

Estos PR acreditan trabajo sobre IA y documentación. El servicio está publicado en Railway y el workflow programado de la IA corre a diario en GitHub Actions; no se hizo prueba de carga.

## 4. Límites técnicos que deben acompañar la presentación

- **Sin garantías universales de acierto o abstención.** En parte de los casos sin herramienta adecuada, el asistente recomendó alternativas parecidas pero insuficientes. No prometer que siempre identifica una necesidad no cubierta.
- **Seguridad en progreso.** Las defensas resistieron 7 de 10 ataques reservados. Permanecen riesgos con peticiones corteses manipulativas y descripciones alteradas de repositorios.
- **Calidad del enriquecimiento.** Haber generado información para 127 herramientas no implica que una persona haya revisado individualmente la calidad del contenido de todas.
- **Actualización selectiva.** El workflow de IA está configurado para actualizar datos cambiados y aplicar límites de volumen. Debe distinguirse de la **ingesta GitHub de Data Engineering**, cuya programación está en `dry-run` por defecto.
- **Operación.** Confirmar salud del servicio, claves, cuotas, respuesta del proveedor y despliegue antes de una demo; el fallback no elimina todos los riesgos de disponibilidad.
- **Evaluación.** Los casos son relativamente pocos y el sistema varía entre corridas. Los cambios posteriores requieren nuevas pruebas finales con casos nuevos.

## 5. Apoyo a la demostración final

La guía de highlights compartida por Andrés recomienda mostrar escenarios probados que hacen visibles las conexiones entre herramientas. Ejemplos del anexo: **gimnasio (Kill Bill + Postal)**, **tienda de ropa (Keycloak + Meilisearch)** y **pedido vago (preguntas de aclaración)**. Estas son **expectativas observadas en pruebas del equipo**, no respuestas garantizadas para cualquier despliegue.

Para el jurado, preparar la consulta, comprobar `/health` y ejecutar el escenario real antes de presentarlo. No mostrar credenciales, archivos `.env` ni terminales con secretos. El [video de la demo](https://youtu.be/PYENf8whpNs) (5:38) muestra un pedido real y su respuesta completa.

## 6. Contribución destacada — Andrés Iglesias

**AI Engineer.** Andrés diseñó, implementó y evaluó la vertical de Inteligencia Artificial de OpenBridge, incluyendo búsqueda semántica, recomendación de herramientas open source según necesidades de negocio, enriquecimiento del catálogo, ideas de integración y actualización controlada de datos. Su trabajo incorporó mediciones reproducibles, validación estructural y un registro explícito de limitaciones, fortaleciendo la relación entre IA, Ingeniería de Datos y Frontend.

> **Comentario del Project Manager:** «Destaco la contribución de Andrés por convertir el desafío de recomendar herramientas open source en una solución de IA estructurada, evaluable y vinculada al catálogo de OpenBridge. Su trabajo en búsqueda semántica, validación de recomendaciones y pruebas permitió mostrar avances con evidencia, reconocer limitaciones reales y orientar las siguientes mejoras. Esta perspectiva técnica fortaleció la colaboración entre IA, Datos y Frontend».
>
> — **David Vergara · Project Manager**

## 7. Fuentes y verificaciones posteriores

- [PDF final de IA (10 páginas) en el repositorio oficial](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/main/ai/docs/documentacion-ia.pdf).
- [README técnico de IA](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/main/ai/README.md).
- [Línea base y reglas de evaluación](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/blob/main/ai/eval/BASELINE_DECISION.md).
- [Código y PR del equipo](https://github.com/No-Country-simulation/S10_26_EQUIPO_29).
- [Video de la demo en YouTube](https://youtu.be/PYENf8whpNs).

**Reprocesamiento tras la sincronización:** el reprocesamiento de los datos de la IA tras la sincronización del 10/11/2026 se hizo ese mismo día ([PR #115](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/115)); después, la comparación entre el catálogo y los datos de la IA no mostró diferencias.

---

**Revisión y reconocimiento documental: David Vergara · Project Manager.**
