# Asistente: integración local con borrador v1.0

El contrato Python recibido es la fuente de los campos y estados. El frontend envía únicamente `{query}`, entre20 y2000 caracteres; no envía historial. No se ha definido una ruta HTTP ni se ha añadido una API ficticia.

- Proveedor local: `src/data/assistant.mjs`, interfaz `mockAssistant.ask({query},{signal,scenario})`.
- Respuestas: `src/mocks/assistant.fixtures.json`; datos fijos, sin RAG.
- Escenarios: abrir `/?assistantMock=ok#asistente`, `/?assistantMock=needs_clarification#asistente` o `/?assistantMock=no_evidence#asistente` y enviar una descripción válida. `assistantMock=error` simula un fallo técnico mediante rechazo, nunca como status de respuesta.
- `needs_clarification` conserva la descripción para que se complete. Cada envío es independiente; no se concatenan conversaciones silenciosamente.
- La propuesta es una lista de herramientas y tareas de desarrollo. Las preguntas y la falta de evidencia tienen estados propios.
- El catálogo mock expone `full_name` (`owner/repository`) como identidad compartida con el asistente. `repo` se conserva para los enlaces GitHub. Confirmar estos campos y la regla de archivado con backend; una referencia desconocida se muestra sin enlace a ficha.
- Las `key` identifican componentes dentro de una respuesta; no representan posiciones en un diagrama.
- La validación defensiva rechaza claves duplicadas para proteger la interfaz; no modifica el contrato acordado del servidor.

Pendientes de acuerdo: ruta/método HTTP, formato de422/5xx, identificador de catálogo, regla de archivado, contexto para aclaraciones y contenido obligatorio de no_evidence. Se muestra una explicación local cuando este último no trae summary.

## Flujo de una sola consulta
Al recibir ok o no_evidence, el formulario se retira de la vista y se ofrece Crear nueva arquitectura. Esta acción borra respuesta, descripción e idea original y vuelve al formulario vacío. El prompt que originó el resultado se conserva temporalmente en memoria, visible en Tu idea original; no se guarda historial ni se envía al siguiente intento. needs_clarification conserva el input para completar la descripción. Los errores conservan la consulta. Cada recomendación muestra label, role y rationale directamente, con enlace a la ficha cuando corresponde. Todos los componentes aparecen en Herramientas recomendadas; full_name solo determina si se puede vincular una ficha.

## Alcance actualizado: sin conexiones
Según la confirmación de producto, la IA no entregará conexiones. Se retira su uso del frontend, de los mocks y de la validación local. No hay diagrama, coordenadas, flechas ni posicionamiento de nodos. Alinear este recorte con el borrador Python original, que todavía incluye connections/Connection. La vista utiliza título/resumen, herramientas recomendadas, supuestos, limitaciones e idea original.

Todos los componentes se presentan en una única lista de Herramientas recomendadas, incluso los que tienen full_name nulo. No se inventan herramientas o enlaces para esos componentes.

## Presentación por capas (opción visual seleccionada)
La propuesta se presenta en filas por función: capa, identidad de la herramienta y justificación. El CTA Crear nueva arquitectura aparece sobre el resultado. Se conservan la idea original, los estados de negocio y el formulario de un solo envío.

La guía Cómo trabajan juntas es contenido curado de demostración en src/mocks/proposal-layout.fixtures.json, asociado al ID y referencias exactas de los escenarios mock mediante src/data/proposal.mjs. No añade campos al contrato ni inventa instrucciones para respuestas desconocidas; en ellas se omite la guía. Es necesario acordar con IA/backend el campo real de integración antes de conectar una API. Las capas opcionales del ejemplo tampoco son metadatos contractuales. No hay diagrama ni edición de conexiones.

## Recuperación y escenarios límite (local)
La vista usa `requestAssistant` en `src/data/assistantRequest.mjs`: envía únicamente `{query}`, valida el payload completo y sus referencias al catálogo antes de sustituir el resultado. Se rechazan referencias desconocidas, archivadas o deshabilitadas, sin mostrar un stack parcialmente válido. `full_name:null` sigue siendo un componente de aplicación permitido por el borrador, sin enlace inventado.

El aviso de espera aparece a los4 segundos. El límite local provisional es20 segundos; cancela la operación y permite reintentar con la descripción intacta. Es una política del frontend pendiente de acuerdo con backend, no un status del modelo ni un timeout HTTP confirmado. Cancelación y timeout ganan incluso ante un proveedor que ignore AbortSignal; los temporizadores y listeners se limpian al terminar.

No se muestra el detalle técnico de errores inesperados. Las respuestas malformadas producen un error controlado y un botón Reintentar. Un fallo conserva la respuesta previa si existe. La aclaración pide completar la descripción original; el nuevo envío no contiene historial, preguntas o respuestas anteriores. Los errores de formato/referencias no se convierten en no_evidence.

Escenarios reproducibles: abrir `/?assistantMock=NOMBRE#asistente` y enviar una descripción válida.
- `slow`: demora6.5 segundos y luego devuelve la propuesta habitual; aviso desde4 segundos.
- `timeout`: espera simulada30 segundos; límite de demo6 segundos y aviso desde1.5 segundos para QA. El límite normal sigue siendo20 segundos.
- `error_once`: primer intento falla; Reintentar devuelve éxito con la misma descripción.
- `malformed`: respuesta de estructura inválida.
- `unknown_tool`: referencia a un repositorio que no existe en el catálogo.
- `archived_tool`: simula Keycloak archivado en una copia de catálogo usada solo para validar la petición; no altera los fixtures ni el catálogo visible.
- `without_integrations`: stack válido sin guía asociada; se omite la sección de integración.
- `clarification_then_ok`: preguntas en el primer intento, éxito en el segundo. Sigue sin enviar historial.
- `one_tool`: una herramienta y sin guía asociada.
- `long_content`: seis herramientas con título, roles, nombres y justificaciones extensas; sin guía inventada.
- `ok_extended`: seis herramientas con guía de ejemplo vinculada al escenario.

Las variantes viven en `src/mocks/assistant-edge.fixtures.json` y las condiciones de demora/archivo en `src/mocks/assistant-scenarios.mjs`. No son nuevos endpoints ni herramientas añadidas al catálogo. Se aplaza la revisión específica de móvil, teclado y movimiento reducido (punto7), según petición del usuario. Solo local.
