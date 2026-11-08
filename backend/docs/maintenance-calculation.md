# Mantenimiento activo en el catálogo

Integración local de la regla de `feat/data-quality-maintenance`, compatible con el motor de health score existente.

- Se calcula en `CatalogService._repo_payload`, compartido por listado y ficha.
- Archivado: `false`.
- No archivado y push entre ahora y hace 180 días (inclusive): `true`.
- Push anterior a 180 días: `false`.
- Estado desconocido, fecha ausente, inválida o futura: el cálculo devuelve `null`.
- `disabled` es independiente; no cambia esta regla.
- Se usa UTC. No se convierte texto a timestamp en SQL, no se persiste ni se consume una columna `is_maintained`.
- `health_score` conserva su motor, validaciones y bandera `HEALTH_SCORE_ENABLED`.

## Límite del contrato actual

`Repo v1.2` requiere `pushed_at` válido. Si falta o es inválido, la API conserva su respuesta `503 catalog_unavailable`, aunque la función de mantenimiento devuelva `null`. Permitir ese dato ausente en HTTP exige un cambio coordinado de contrato; esta integración no lo modifica.

## Frontend

Cards y fichas consumen `is_maintained` como `maintained` y muestran «Mantenimiento activo»: Sí / No / Por confirmar. Es un indicador de actividad reciente, no una certificación del mantenedor.

El filtro existente `maintenance=active|inactive` sigue representando repositorios archivados/deshabilitados; no se cambia su significado ni se agrega un filtro de actividad.

## Alcance

No se incorpora ni ejecuta la ingesta, no se migra la base de datos y no se activa ningún workflow. La discrepancia de la ingesta (fecha ausente -> false) debe resolverse con el equipo antes de integrar ese pipeline.
