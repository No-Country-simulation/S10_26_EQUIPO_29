# OpenBridge — Frontend

Interfaz en Next.js, React y Tailwind CSS. La rama `frontend` reúne el desarrollo del equipo frontend; la aplicación vive en esta carpeta para permitir la convivencia con el backend.

## Requisitos y ejecución

Node.js 20.19+ o 22.12+ y npm.

Desde la raíz del repositorio:

```sh
cd frontend
npm ci
npm run dev
```

Abrir http://127.0.0.1:4173/.

## Compilación y pruebas

```sh
npm run build
npm run test:sites
npm test
npm run preview
```

La compilación genera `dist/client/` y prepara `dist/server/index.js` y `dist/.openai/hosting.json` para una futura publicación en Sites. Este repositorio no publica automáticamente el sitio.

Si los archivos están sincronizados con la nube, `npm run preview:stable` compila una copia temporal y la sirve en el puerto 4173. `node scripts/check-preview.mjs` comprueba esa vista previa.

## Alcance actual

- Asistente con validación, estado de carga y respuesta fija de ejemplo para reservas de yoga.
- Catálogo local de nueve herramientas y una tarjeta Default de ejemplo con búsqueda y filtros combinables.
- Fichas técnicas en `#herramienta/{id}`, ejemplos ilustrativos de integración y enlaces oficiales.
- Interfaz responsive, navegación por teclado y soporte de movimiento reducido.

Las consultas no se envían a servicios externos. Las métricas, puntuaciones de salud y respuestas son datos de demostración. No hay conexión con backend, API, RAG ni base de datos.

## Organización

- `src/`: componentes, estilos, catálogo y perfiles técnicos.
- `public/`: recursos locales y documentación de sus fuentes.
- `scripts/`: compilación y vistas previas.
- `tests/`: pruebas de geometría y del worker de Sites.
- `worker/` y `.openai/hosting.json`: soporte para una futura publicación en Sites.

Se usa Inter, se conserva el logotipo original de OpenBridge y las secciones comienzan directamente con su título, sin antetítulos.

## Mock de catálogo

`src/mocks/catalog.fixtures.json` reúne los diez registros ficticios (nueve herramientas y Default). Cada registro contiene identidad, descripción, categoría, lenguaje, licencia, estrellas, actividad, mantenimiento, repositorio, health score, issues y documentación. `dataSource: mock` y `syncedAt` describen los fixtures, no una consulta real a GitHub. `activity` conserva por ahora el texto ilustrativo existente.

`src/data/catalog.mjs` expone `mockCatalog.list()` → `{items,total}` y `mockCatalog.getById(id)` → registro o `null`. Son funciones locales asíncronas, no endpoints HTTP implementados ni contratos finales de backend. Las respuestas son copias independientes. `src/tools.js` adapta los mismos registros para catálogo y detalle sin cambiar su presentación. Paletas y assets siguen siendo configuración visual.

## Interacciones de la maqueta

La propuesta fija aparece en una sección independiente debajo del input, con un resumen y un control para expandir el mapa y la justificación. Las cards se contraen al presionar (160 ms) y recuperan su tamaño suavemente (320 ms), conservando el tilt y el soporte de movimiento reducido.
