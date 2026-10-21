# Asistente: integración local con borrador v1.0

El contrato Python recibido es la fuente de los campos y estados. El frontend envía únicamente `{query}`, entre20 y2000 caracteres; no envía historial. No se ha definido una ruta HTTP ni se ha añadido una API ficticia.

- Proveedor local: `src/data/assistant.mjs`, interfaz `mockAssistant.ask({query},{signal,scenario})`.
- Respuestas: `src/mocks/assistant.fixtures.json`; datos fijos, sin RAG.
- Escenarios: abrir `/?assistantMock=ok#asistente`, `/?assistantMock=needs_clarification#asistente` o `/?assistantMock=no_evidence#asistente` y enviar una descripción válida. `assistantMock=error` simula un fallo técnico mediante rechazo, nunca como status de respuesta.
- `needs_clarification` conserva la descripción para que se complete. Cada envío es independiente; no se concatenan conversaciones silenciosamente.
- El mapa conserva su contenido mientras espera o falla una actualización. Las preguntas y la falta de evidencia tienen estados propios.
- `full_name` se resuelve PROVISIONALMENTE contra `repo` (`owner/repository`). El catálogo local no expone `full_name` ni estado de archivo. Confirmar esta vinculación y la regla de archivado con backend; una referencia desconocida se muestra sin enlace a ficha.
- Las `key` identifican cajas dentro de una respuesta. No se asume que c1 identifica la misma herramienta en respuestas diferentes. Grafos idénticos conservan su presentación/selección.
- La validación defensiva rechaza claves duplicadas para proteger la interfaz; no modifica el contrato acordado del servidor.

Pendientes de acuerdo: ruta/método HTTP, formato de422/5xx, identificador de catálogo, regla de archivado, contexto para aclaraciones y contenido obligatorio de no_evidence. Se muestra una explicación local cuando este último no trae summary.
