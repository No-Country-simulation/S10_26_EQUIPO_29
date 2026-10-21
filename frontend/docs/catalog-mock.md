# Catálogo de demostración

20 entradas:19 proyectos reales y1 tarjeta Default ficticia. Se añaden React, Next.js, FastAPI, NestJS, Django, Valkey, RabbitMQ, Prometheus, Grafana y Traefik. Repositorios y documentación en catalog.fixtures.json. Las estadísticas de los19 repositorios reales proceden de una captura de GitHub, almacenada localmente. Default sigue siendo ficticia. No se consulta GitHub al cargar la página.

Las fichas nuevas se definen en tool-profiles.fixtures.json. Logos locales de Simple Icons16.35.0, con procedencia y licencia en public/assets/brands. Valkey utiliza el respaldo de iniciales.

La respuesta fija del asistente utiliza Keycloak, Next.js, FastAPI y PostgreSQL; todos tienen full_name vinculado al repo del catálogo y ficha navegable. Es un mock, no una recomendación generada por IA.

Paletas de marca configuradas para9 herramientas nuevas a partir del hex y la fuente de Simple Icons (COLORS.json). Las superficies son variantes oscuras para texto blanco. Next.js conserva su identidad monocromática. Valkey mantiene respaldo neutral al no tener asset configurado. Catálogo, detalle y recomendaciones comparten resolveBrand.

## Identidad de marca compartida
Archivo único: `src/data/brand-identities.json`. Contiene fallback (gris) e identities, indexadas por full_name, con logo, watermark opcional, wordmark opcional y palette {start,end,tag}. `src/brandIdentity.js` resuelve estas identidades tanto en catálogo como en propuesta y detalle. No se deducen URLs ni colores del nombre. La clave se normaliza por espacios y mayúsculas.

Para incorporar una marca, añadir su full_name exacto al registro y configurar sus assets locales y paleta. Sin coincidencia o ante fallo del logo, usar iniciales y fallback gris; un fallo exclusivo de watermark solo lo oculta. `src/mocks/brand-palettes.json` se ha retirado para evitar fuentes duplicadas.

## Captura real de GitHub
Origen auditable: `src/mocks/github-snapshot.json` incluye consulta GraphQL, valores y captured_at. Para refrescar manualmente: `python3 scripts/snapshot-github.py` (requiere GitHub CLI autenticado), luego `python3 scripts/apply-github-snapshot.py`, compilar y ejecutar tests. No se instala cron ni se añade tráfico de GitHub al frontend.

- stars:stargazerCount; openIssues:issues.totalCount (excluye PR); PR abiertas se conservan aparte. Un0 corresponde a las issues en GitHub, no necesariamente al tracker externo del proyecto.
- Último commit:defaultBranchRef.target.committedDate. No se confunde con updatedAt (cambia también por metadata) ni pushedAt (puede afectar otras ramas). activity contiene fecha absoluta en America/Punta_Arenas.
- version:última release devuelta por GitHub, con tag/fecha/enlace; null significa Sin release publicada, no que el proyecto no tenga versiones.
- license:SPDX detectado por GitHub; NOASSERTION o ausencia se presenta como Revisar licencia. No se conserva la licencia ficticia anterior ni se interpreta legalmente.
- Salud:GitHub no proporciona el score del diseño; healthScore=null para proyectos reales. No se calcula ni se inventa una puntuación.
- Mantenedor:no es un campo verificable directo. Se muestra Repositorio:No archivado/Archivado/Deshabilitado según flags GitHub. maintained=null. El filtro usa ese estado, no una supuesta actividad del equipo.
- Language:primaryLanguage de GitHub. Los textos descriptivos, roles y perfiles siguen siendo contenido curado para el prototipo.
