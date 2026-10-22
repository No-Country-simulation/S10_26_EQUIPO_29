# Contratos: ajustes locales y acuerdos pendientes

Referencia: PR17, head a6719c4e212667ed792a9c9bda422ed97257f1c1. Repo acordado con ingesta; IntegrationIdea/Assistant todavía propuestos. Esta implementación no equivale a aprobación del equipo.

## Ya aplicados
- Repo pasa por toTool/toCardDetail; valores nulos conservados.
- Último push muestra pushed_at, sin sustituirlo por fecha de commit.
- Filtros consideran todas las categorías asignadas; card conserva la principal. Lista local sin reducirla a las seis provisionales.
- 13 ideas de integración locales en estructura IntegrationIdea, con adapter y arrays visibles. URL por idea, resumen, dificultad traducida, estado de revisión. Snippet solo si existe, con lenguaje.
- Las ideas son ejemplos editoriales humanos sin revisar, no salidas de IA. Los hashes son hashes de la entrada editorial del mock, no ai_input_hash de producción.
- Se retiraron snippets no verificados de las ideas activas. No se afirma que provengan de README/docs.
- 5 ideas SQL/JavaScript preservadas separadamente en integration-ideas-pending.fixtures.json: no se fuerza un tipo incorrecto, no aparecen en fichas. Los resúmenes y características siguen siendo contenido editorial fuera de Repo.
- Sin datos de integración no aparece una sección vacía. Repos archivados no muestran ideas del mock. La regla de generación «sin README no generar» corresponde al productor; estos ejemplos no representan una ejecución de esa generación.

## Por acordar
1. Rutas HTTP, paginación, filtros, errores y metadatos de actualización; no hay endpoints nuevos.
2. Assistant connections: confirmar entrega antes de reemplazar la guía fija. Capas/captions de la propuesta también son contenido local. Sin cambios de contrato del asistente en este ajuste.
3. Categorías definitivas y componentes propios con full_name null.
4. Mantenedor activo: campo y criterio no definidos. Se mantiene Por confirmar. Filtro de mantenimiento actual usa estado archivado/deshabilitado como aproximación local; no equivale al criterio definitivo.
5. Salud: fórmula y productor; se mantiene Sin evaluar.
6. Release, documentación de herramienta, nombre comercial, etiqueta y características: metadata local que Repo no garantiza.
7. Identidades: fuente, revisión y responsable de logos/paletas; sin cambio visual aquí.
8. IntegrationIdea: tipos SQL/JavaScript, tipo único vs múltiple, política de publicación de borradores (ahora ejemplos etiquetados), revisión editorial y hash real al conectar backend.

Trabajo local, sin push ni publicación.
