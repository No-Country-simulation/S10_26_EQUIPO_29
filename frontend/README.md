# OpenBridge

Frontend en Next.js (App Router), React y Tailwind CSS. Mantiene las animaciones, el diseño y las rutas de detalle `#herramienta/{id}` del prototipo.

## Desarrollo y verificación

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

La vista local usa http://127.0.0.1:4173/. `npm run preview:stable` copia las fuentes a un directorio temporal, instala las dependencias del lockfile, compila y sirve el resultado sin HMR. Usarla cuando Documents esté sincronizado con iCloud. `node scripts/check-preview.mjs` comprueba cinco veces HTML, JavaScript y CSS.

## Estructura

- `src/app/`: layout, metadatos, estilos globales y entrada de Next.js.
- `src/ClientApp.jsx`: arranque del cliente; conserva las animaciones y la navegación por hash sin diferencias de hidratación.
- `src/App.jsx`, `src/ToolDetail.jsx`: catálogo, asistente y fichas.
- `src/styles.css`: diseño y animaciones específicas. Tailwind se integra sin Preflight para conservar los estilos actuales; las utilidades se usan en la composición de la interfaz.
- `public/assets/`: logos, tipografías y materiales de animación locales.

## Exportación y Sites

`output: 'export'` genera `out/`; el build lo copia a `dist/client/` y conserva `dist/server/index.js` y `dist/.openai/hosting.json` para Sites. El Worker existente sirve los assets y el fallback HTML. No se necesita un servidor Node.js en Sites.

El despliegue es estático: no incluye Route Handlers dinámicos, Server Actions ni una API Next.js. Cuando se implemente el backend, el cliente podrá consumirlo mediante HTTP; si se requiere ejecución de Next.js en servidor, habrá que cambiar el modo de despliegue.

## Datos

El catálogo, métricas y propuesta del asistente son datos ilustrativos locales. El prompt no se envía a ningún servicio. Default es una tarjeta ficticia para mostrar la identidad de respaldo.

## Mock de catálogo

`src/mocks/catalog.fixtures.json` reúne los diez registros ficticios (nueve herramientas y Default). Cada registro contiene identidad, descripción, categoría, lenguaje, licencia, estrellas, actividad, mantenimiento, repositorio, health score, issues y documentación. `dataSource: mock` y `syncedAt` describen los fixtures, no una consulta real a GitHub. `activity` conserva por ahora el texto ilustrativo existente.

`src/data/catalog.mjs` expone `mockCatalog.list()` → `{items,total}` y `mockCatalog.getById(id)` → registro o `null`. Son funciones locales asíncronas, no endpoints HTTP implementados ni contratos finales de backend. Las respuestas son copias independientes. `src/tools.js` adapta los mismos registros para catálogo y detalle sin cambiar su presentación. Paletas y assets siguen siendo configuración visual.
