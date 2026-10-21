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

## Grilla de recomendaciones
Hasta4 herramientas:2 columnas en escritorio.5–6 herramientas:3 columnas a partir de1100px. Hasta640px:1 columna. Filas de altura natural, sin truncar justificaciones ni scroll interno. Se mantiene el máximo de6 componentes del contrato. Para probar el extremo superior: `/?assistantMock=ok_extended#asistente`; continúa siendo una respuesta status ok.
