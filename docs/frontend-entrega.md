# OpenBridge — Documentación técnica del frontend

**Fecha:** 9 de noviembre de 2026  
**Base revisada:** `imp-tool-connections`, commit `13391df`, integrado en `main` mediante el PR #107 (merge `0774fa0`).  
**Alcance adicional:** incluye el favicon incorporado localmente después del merge. Este documento describe la implementación observada, no funcionalidades previstas.

## 1. Propósito y límites

El frontend permite describir una necesidad de negocio, recibir una propuesta de arquitectura, explorar sus herramientas y conexiones y consultar un catálogo de repositorios con sus fichas técnicas e ideas de integración.

Sus responsabilidades son presentar y validar las respuestas recibidas, gestionar navegación y estados de interacción, aplicar filtros locales y mantener el sistema visual. No consulta PostgreSQL directamente, no ejecuta ingestas y no llama directamente a Gemini ni a otros proveedores de IA. Tampoco calcula el health score ni el mantenimiento: muestra los valores entregados por la API.

## 2. Stack técnico

Versiones declaradas en `frontend/package.json` (el lockfile fija las versiones instaladas):

| Tecnología | Versión declarada | Uso |
| --- | --- | --- |
| Next.js | ^16.4.2 | Estructura de páginas, compilación y exportación estática |
| React / React DOM | ^19.3.1 | Componentes, hooks y portales |
| JavaScript JSX / módulos ESM | — | Código de aplicación; no es un proyecto TypeScript |
| DM Sans variable | ^5.3.0 | Fuente cargada localmente desde el paquete de fuentes |
| Lucide React | ^1.57.0 | Iconografía |
| ELK.js | ^0.12.1 | Distribución automática del diagrama de conexiones |
| Prism React Renderer | ^2.4.1 | Presentación de snippets con resaltado |
| Tailwind CSS / PostCSS | ^4.3.3 | Infraestructura CSS; el diseño utiliza también hojas CSS propias |
| Paper Design Shaders React | ^0.0.81 | Dependencia disponible para efectos visuales |
| Node Test Runner | incluido en Node | Pruebas `node --test` |

La presencia de una dependencia o un archivo de efectos no significa que todos sus efectos se ejecuten simultáneamente. Hay módulos conservados de iteraciones anteriores.

`next.config.mjs` configura `output: 'export'`, imágenes sin optimización de servidor y React Strict Mode. La pantalla principal se carga como aplicación cliente mediante `dynamic(..., { ssr: false })`. No requiere un servidor Next.js para renderizar las consultas: consume servicios HTTP externos.

## 3. Arquitectura general

```text
Navegador
  └─ Next.js exportado / ClientApp
       └─ CatalogProvider
            └─ App
                 ├─ Navbar y coordinación del workspace
                 ├─ Assistant
                 │    ├─ PromptComposer / ejemplos / estados
                 │    └─ StackProposal / ConnectionDiagram
                 ├─ Catalog / filtros / paginador / ToolCard
                 └─ ToolModal → ToolDetail → IntegrationIdeas

Capa de datos del navegador
  ├─ catalogHttp → API de catálogo → Supabase
  └─ assistantHttp → servicio de IA → recuperación de datos y proveedor LLM
```

Las dos APIs tienen bases configurables e independientes. El navegador no recibe claves de base de datos ni de proveedores de IA. La relación con Supabase y el modelo se resuelve del lado de los servicios.

## 4. Organización de archivos

Rutas relativas a la raíz del repositorio:

```text
frontend/
├─ package.json / package-lock.json
├─ next.config.mjs
├─ public/
│  ├─ favicon.svg
│  └─ assets/                 # Logos, recursos de marcas y worker de ELK
├─ scripts/                  # Compilación, exportación y previews
├─ tests/                    # Pruebas automatizadas .test.mjs
└─ src/
   ├─ app/                   # Rutas Next.js y Design System
   ├─ App.jsx                # Coordinación de las superficies principales
   ├─ ClientApp.jsx          # Arranque cliente y CatalogProvider
   ├─ features/
   │  ├─ assistant/          # Formulario, flujo, resultados y conexiones
   │  └─ catalog/            # Listado, cards, filtros y paginación
   ├─ data/                  # Clientes HTTP, caché y adaptadores
   ├─ generated/             # Copia generada de categorías del contrato
   ├─ mocks/                 # Fixtures y escenarios explícitos de prueba
   ├─ ToolModal.jsx / ToolDetail.jsx
   ├─ IntegrationIdeas.jsx / Snippet.jsx
   ├─ FollowingTooltip.jsx / HealthScore.jsx
   ├─ brandIdentity.js / sessionPalette.mjs
   ├─ HeroLights.jsx / ElasticPromptBorder.jsx
   └─ styles.css / buttons.css / connections.css / control-states.css

shared/contracts/categories.json  # Fuente del catálogo de categorías
```

### Archivos clave por responsabilidad

| Archivo | Responsabilidad |
| --- | --- |
| `src/App.jsx` | Une navegación, asistente, catálogo y ficha; coordina nueva arquitectura |
| `src/useWorkspaceView.js` | Superposición y bloqueo/desbloqueo del catálogo; navegación entre superficies |
| `src/useToolNavigation.js` | Apertura y cierre de fichas desde la navegación hash |
| `src/data/CatalogProvider.jsx` | Estado compartido del catálogo y recuperación de errores |
| `src/data/catalogHttp.mjs` | Peticiones, validación y adaptación de repositorios y fichas |
| `src/data/catalogCache.mjs` | Caché en memoria y deduplicación de solicitudes |
| `src/features/assistant/useAssistantFlow.js` | Envío, cancelación, reintento, resultado y selección del proveedor |
| `src/data/assistantRequest.mjs` | Límite de petición, validación y carrera entre respuesta/cancelación/timeout |
| `src/data/assistant.mjs` | Validadores de consulta, respuesta y referencias al catálogo |
| `src/errorPresentation.mjs` | Títulos, descripciones y acciones de error |
| `src/features/assistant/connectionLayout.mjs` | Conversión de conexiones a grafo ELK y posición del protocolo |
| `src/features/assistant/ConnectionDiagram.jsx` | Worker, medición de nodos y render HTML/SVG del diagrama |

## 5. Arranque y navegación

`app/layout.jsx` carga DM Sans, CSS global y metadatos. `app/page.jsx` carga `ClientApp` únicamente en el navegador. `ClientApp` envuelve la aplicación en `CatalogProvider`, desactiva la restauración automática del scroll y conserva los enlaces de ficha al arrancar.

La aplicación combina dos mecanismos:

- **Hashes de la pantalla principal:** `#asistente`, `#catalogo` y `#herramienta/{owner}/{name}`.
- **Rutas Next.js del Design System:** `/design-system`, `/design-system/tipografia`, `/design-system/espaciado`, `/design-system/componentes` y `/design-system/movimiento`.

Ejemplo de ficha: `/#herramienta/keycloak/keycloak`. No es el endpoint del backend: es navegación del navegador. La API correspondiente se consulta en `GET /repos/keycloak/keycloak` sobre la base configurada.

Se mantiene resolución de identificadores antiguos usando los datos disponibles del catálogo. Los enlaces nuevos utilizan `owner/name`. El logo vuelve al inicio mediante `reloadHome.mjs`.

## 6. Conexión y carga del catálogo

### Peticiones HTTP

| Operación | Petición relativa a la base del catálogo |
| --- | --- |
| Listado | `GET repos?page={n}&page_size=100` |
| Ficha | `GET repos/{owner}/{name}` |

Las categorías proceden del JSON compartido del contrato. No se consulta un endpoint de categorías. Las ideas de integración llegan dentro de la ficha; tampoco requieren un endpoint independiente.

El cliente del listado espera un array de repositorios. Cuando la API incluye paginación, valida los encabezados `X-Total-Pages`, `X-Total-Count`, `X-Page` y `X-Page-Size`, recorre todas las páginas y comprueba consistencia antes de publicar los datos en React. Si una página falla, no publica un catálogo parcial como si estuviera completo.

La ficha espera esta forma general:

```json
{
  "repo": { "full_name": "owner/name" },
  "integration_ideas": []
}
```

Este fragmento ilustra únicamente el envoltorio, no constituye un payload válido completo. `repo` debe cumplir las validaciones de `adaptApiRepo`.

### Adaptación para UI

| Dato de origen | Uso visual |
| --- | --- |
| `github_id` | Identidad del repositorio, con compatibilidad de IDs locales |
| `full_name` | Identidad canónica, URL y texto owner/repo |
| Identidad visual curada / nombre del repo | Título visible |
| `summary_es`, con respaldo en `description` | Descripción de catálogo y ficha |
| `categories[].category_id` | Etiquetas y filtrado por categorías |
| `stargazers_count` | Estrellas |
| `pushed_at` | Última actividad formateada |
| `license_spdx_id` | Licencia o advertencia de revisión |
| `language` | Lenguaje |
| `archived`, `disabled` | Estado del repositorio |
| `is_maintained` | Mantenimiento: Sí / No / Por confirmar |
| `health_score` | Puntuación de salud recibida del backend |
| `open_issues_count` | Fila «Issues y PRs abiertos» |
| `homepage` | Enlace Sitio web de la ficha |

El adaptador valida campos esenciales, IDs duplicados y un máximo de 250 caracteres para `summary_es`. Un resumen incompatible se rechaza; no se recorta silenciosamente en la frontera HTTP.

Los metadatos visuales locales permiten curar nombre, logo y color. En modo API no se sustituyen estadísticas reales por cifras de fixtures. Conviene distinguir esta curación de identidad de los datos simulados.

### Caché

- Memoria de la página, sin guardar registros de la API en almacenamiento persistente.
- TTL predeterminado de 120 segundos y máximo de 100 entradas.
- Las solicitudes simultáneas de la misma clave comparten petición.
- Cancelar un consumidor evita actualizarlo, pero una petición compartida puede terminar y alimentar la caché.
- Al recuperar foco o visibilidad se consulta nuevamente el proveedor, respetando la caché.
- Reintentar fuerza una actualización.

## 7. Filtros, búsqueda y paginación

El filtrado actual es **frontend**, sobre el catálogo descargado completo. No es búsqueda semántica ni una llamada a la IA.

- Búsqueda por nombre visible y descripción, normalizando mayúsculas y acentos.
- Categoría: considera todas las categorías asignadas, no solo la primera.
- Lenguaje y licencia: coincidencia con la selección.
- Estado: no archivado/deshabilitado, archivado o deshabilitado según la opción.
- Estrellas mínimas: comparación numérica.
- Las categorías sin herramientas se ocultan; `dev-tools` se presenta como «Desarrollo».

La variable interna `maintenance` del filtro representa aquí el **estado del repositorio**, no el indicador `is_maintained`. Son conceptos distintos y no deben confundirse al modificar el código.

La paginación visual muestra **24 herramientas por página**. `pagination.mjs` limita el número de página y genera los números y separadores. El cambio de filtros y el desplazamiento al cambiar de página se coordinan con los hooks del catálogo.

**Implicación:** paginar en pantalla reduce las cards montadas, pero no reduce el total descargado. Si crece mucho el catálogo, habría que coordinar búsqueda, filtros y paginación remotos con la API.

## 8. Cards, identidad y ficha técnica

`ToolCard` presenta identidad, categorías, descripción, salud, lenguaje, métricas y acciones. `CardDescription` y `fitDescription.mjs` gestionan el ajuste a tres líneas y el acceso «Ver más». Las categorías adicionales se resumen en la card; la ficha permite verlas todas.

`brandIdentity.js` y `data/brand-identities.json` resuelven logos y nombres curados. Cuando no hay logo válido se utilizan iniciales. Las paletas mantienen coherencia entre catálogo, ficha y recomendaciones. El nombre curado no cambia el `full_name` utilizado para resolver datos y enlaces.

`ToolModal` contiene la ficha lateral. `ToolDetail` divide el contenido en **Acerca de** e **Integraciones**, con un área de contenido desplazable y acciones al pie. En móvil la ficha utiliza el viewport disponible. La coordinación de scroll y foco busca evitar que abrirla desplace el catálogo subyacente.

La información de la card puede presentarse mientras llega el detalle. Las integraciones tienen skeleton propio durante la espera. HTTP 404 se distingue de un fallo temporal y ofrece cerrar la ficha; los fallos recuperables ofrecen reintentar.

### Ideas de integración

El detalle admite hasta tres ideas y valida su estructura. No genera ideas en el navegador.

- Tipos: API REST, Docker, SDK y Webhook.
- Dificultades: Básica, Intermedia y Avanzada, con etiquetas visuales diferenciadas.
- Dependencias y disparadores se presentan desde arrays del contrato.
- `reviewed_at` determina «Revisada»; `generated_by: "llm"` sin revisión determina «Sugerida».
- Las etiquetas disponen de tooltip explicativo.
- Snippet ausente conserva un estado de código no disponible.
- `snippet_language: "text"` se presenta como «Texto».
- Una lista vacía mantiene el mensaje de ausencia de ideas; no implica por sí sola error técnico.
- El fallo de copiar código tiene feedback visible y mantiene la posibilidad de copiar manualmente.

## 9. Asistente: recorrido de una consulta

1. El usuario escribe o selecciona un ejemplo de negocio.
2. Se valida la consulta: entre 20 y 2000 caracteres.
3. Al enviar se limpia el resultado anterior y se activa la presentación de carga.
4. Se mantiene el prompt y aparece la acción para detener.
5. El proveedor HTTP envía `POST assistant` con `{"query":"..."}`.
6. Se valida la estructura completa de la respuesta y sus referencias al catálogo cargado.
7. Se presenta arquitectura, aclaraciones o falta de evidencia según `status`.
8. Ante fallo se muestra el mensaje centralizado y, cuando corresponde, el icono de reintento en el botón principal.

No es una conversación acumulativa: cada envío representa una consulta. El input conserva la idea para editarla o reintentarla, pero el frontend no envía un historial de mensajes.

### Estados válidos

| Estado | Presentación |
| --- | --- |
| Inicial | Título, descripción, prompt y ejemplos |
| Cargando | Palabras de trabajo, skeletons y detener consulta |
| `ok` | Encabezado, herramientas/conexiones, supuestos, limitaciones e idea original |
| `needs_clarification` | Preguntas en cards centradas; no se presenta como error rojo |
| `no_evidence` | Explicación de falta de evidencia; respuesta válida |
| Error | Título y explicación legibles; corrección o reintento según código |
| Cancelación | Interrupción silenciosa, conservación del texto y recuperación del control |

El estado visual se coordina con `promptPresentation.mjs`; no se deriva únicamente del contenido del último response. `AbortController` y la identidad de cada petición evitan que una respuesta cancelada sustituya el estado actual.

### Contrato recibido

Se procesan `id`, `status`, `title`, `summary`, `components`, `connections`, `assumptions`, `limitations`, `clarification_questions` y `generated_at`.

Cada componente utiliza `key`, `label`, `role`, `rationale` y, cuando representa una herramienta, `full_name`. Las conexiones enlazan `from_key` y `to_key`, además de `protocol` y `description`.

El frontend acepta hasta seis componentes, verifica claves únicas y rechaza referencias de conexión inválidas o hacia sí mismas. Los componentes con `full_name: null` pueden representar partes propias de la aplicación. Las herramientas identificadas deben existir en el catálogo activo y no estar archivadas ni deshabilitadas.

Una licencia ausente o `NOASSERTION` **no bloquea** la arquitectura: se muestra «Licencia sin verificar». El código `unverified_license` sigue en el módulo de presentación, pero la validación actual de catálogo no lo genera por falta de licencia.

### Tiempos actuales

| Parámetro | Valor |
| --- | --- |
| Aviso de espera prolongada | 60 segundos |
| Timeout general de `requestAssistant` | 90 segundos |
| Timeout aplicado por el proveedor HTTP real | 20 segundos |

**Detalle a coordinar:** en una consulta HTTP real, el timeout de 20 segundos ocurre antes del aviso de 60 segundos. No debe documentarse ese aviso como un comportamiento alcanzable de ese recorrido sin ajustar antes los tiempos. Los escenarios de prueba pueden sobrescribir estas duraciones.

## 10. Errores y seguridad de presentación

`errorPresentation.mjs` centraliza títulos, descripciones y posibilidad de reintentar. Incluye consulta vacía/corta/larga, consulta inválida remota, proveedor no disponible, timeout, respuesta inválida, conexión, herramienta no disponible y error desconocido.

El cliente HTTP reconoce los códigos remotos previstos y evita mostrar diagnósticos técnicos o mensajes arbitrarios del servidor. Los errores del catálogo/ficha permanecen en su sección.

El PR #106 incorpora protección contra instrucciones maliciosas en el **servicio de IA**. El frontend consume su respuesta de aclaración con las mismas cards que otras peticiones de contexto; no implementa el detector de prompt injection.

## 11. Diagrama de conexiones

Se utiliza **ELK.js como motor de distribución**, no React Flow. La representación se construye con elementos HTML para nodos/protocolos y SVG para las líneas.

- `connectionGraph` mantiene las identidades y conexiones recibidas del asistente.
- Usa algoritmo `layered` y rutas ortogonales.
- Dirección horizontal en escritorio y vertical por debajo de 640 px disponibles.
- Mide los nodos mediante `ResizeObserver` y agrupa recálculos con 80 ms de espera.
- Ejecuta ELK en un Web Worker preparado por `prepare-elk-worker.mjs`.
- En escritorio escala el conjunto al ancho disponible cuando es necesario.
- El badge del protocolo se ancla a un segmento de su propia conexión.
- Las líneas punteadas tienen iluminación con fases y duraciones distintas.
- Descripciones de protocolos y herramientas se consultan con `FollowingTooltip`.
- Si falla el layout, se ofrece una representación textual de conexiones.

## 12. Composición, movimiento y scroll

El catálogo es una superficie superpuesta al asistente. `useWorkspaceView` coordina estados de inicio, catálogo bloqueado y catálogo abierto, manteniendo los componentes montados. Se utiliza el scroll de página para ambas superficies; la ficha tiene su propio contenido desplazable.

Durante el trabajo del asistente el catálogo sale del recorrido visible sin perder sus filtros. El acceso del navbar y el botón Ver catálogo permiten volver a abrirlo. Al cubrir al asistente se ajustan profundidad visual e interacción para que el input no intercepte el catálogo.

Hooks y módulos relevantes:

- `usePromptLayout` y `useResultReset`: movimiento y tamaño del prompt entre inicio, carga y resultado.
- `useSmoothPageScroll`: suavizado del desplazamiento general.
- `useAnimatedCatalog` y `useCatalogBounce`: entradas y elasticidad del catálogo.
- `PageReveal`: entrada escalonada de elementos.
- `useDetailReveal`, `coverTransition` y módulos de scroll de modal: transiciones de ficha.
- `HeroLights` y configuración `data/background-light.json`: iluminación del fondo.
- `ElasticPromptBorder` y `promptBorderGeometry`: iluminación del borde del prompt.

Hay rutas alternativas para `prefers-reduced-motion`. Los cambios de animación deben probarse también con movimiento reducido, textos largos, teclado y cambios de viewport. Mantener montado el fondo evita reiniciarlo por cada cambio de estado.

## 13. Sistema visual y accesibilidad

- Tipografía principal: DM Sans variable, servida como recurso local.
- Superficies oscuras, colores de herramientas e iluminación compartida.
- `buttons.css` centraliza variantes primaria, secundaria outlined y texto ghost; las secciones deben controlar disposición, no crear estilos de botón incompatibles.
- El acento primario se elige una vez por carga de página y se conserva durante la navegación. Puede cambiar al recargar; no representa un estado de datos.
- Categorías y herramientas conservan sus reglas de paleta propias.
- `FollowingTooltip` es un componente propio compartido: portal, seguimiento del cursor, apertura con 120 ms de espera, soporte de foco y Escape, límites de viewport y cierre al desplazar/redimensionar.
- `DotSadFace` reúne la presentación de estados vacíos/error correspondientes.
- El favicon local extrae el símbolo central del logo con recortes transparentes.

La aplicación utiliza etiquetas accesibles en inputs y botones, regiones de estado, tablists/paneles y `inert` para evitar interacción con superficies cubiertas. La ficha implementa navegación por teclado entre pestañas. Estas medidas no equivalen a una certificación de accesibilidad: se debe mantener revisión manual de contraste, foco y lectura asistida.

## 14. Configuración local

Desde la raíz del repositorio:

```bash
cd frontend
npm ci
```

Crear `frontend/.env.local` con bases HTTP públicas, por ejemplo:

```dotenv
NEXT_PUBLIC_CATALOG_API_BASE_URL=http://127.0.0.1:8000/
NEXT_PUBLIC_ASSISTANT_API_BASE_URL=http://127.0.0.1:8001/
NEXT_PUBLIC_MOCK_MODE=false
NEXT_PUBLIC_ERROR_PREVIEW=false
```

| Variable | Comportamiento |
| --- | --- |
| `NEXT_PUBLIC_CATALOG_API_BASE_URL` | Base preferida de catálogo |
| `NEXT_PUBLIC_API_BASE_URL` | Alias de compatibilidad para catálogo |
| `NEXT_PUBLIC_ASSISTANT_API_BASE_URL` | Base independiente del asistente |
| `NEXT_PUBLIC_MOCK_MODE` | Activa demo explícita cuando corresponde; no es respaldo silencioso |
| `NEXT_PUBLIC_ERROR_PREVIEW` | Habilita escenarios locales de prueba en localhost/127.0.0.1 |

Todas las variables `NEXT_PUBLIC_*` pueden quedar incorporadas al bundle. **Nunca colocar allí contraseñas de Supabase, claves Gemini/Groq/Claude ni URLs PostgreSQL con credenciales.** Cambiar variables de una exportación estática exige recompilar.

### Comandos

```bash
npm run dev             # Desarrollo en 127.0.0.1:4173
npm test                # Pruebas del frontend
npm run build           # Exportación estática y preparación para hosting
npm run preview         # Servir dist/client
npm run preview:stable  # Copiar a temporal, compilar y servir preview estable
npm run preview:lan     # Preview de red local; revisar configuración antes de compartir
```

No ejecutar dos servidores en el mismo puerto. `preview:stable` usa un runtime temporal fuera de Documents, prepara dependencias y publica la compilación de forma atómica. Al usar ese script, las variables deben estar disponibles en su entorno de proceso: no copia automáticamente `frontend/.env.local` al runtime temporal.

Ejemplo desde la raíz del repositorio:

```bash
NEXT_PUBLIC_CATALOG_API_BASE_URL=http://127.0.0.1:8000/ \
NEXT_PUBLIC_ASSISTANT_API_BASE_URL=http://127.0.0.1:8001/ \
NEXT_PUBLIC_MOCK_MODE=false \
node frontend/scripts/stable-preview.mjs
```

El catálogo y el asistente deben estar levantados por separado para probar datos reales. Los ejemplos anteriores no arrancan los servicios Python.

## 15. Mocks, escenarios y Design System

Una URL de servicio ausente no activa automáticamente mocks: el catálogo queda en error o el asistente indica indisponibilidad. Las excepciones de prueba se habilitan explícitamente mediante configuración.

Los fixtures están en `src/mocks`. `assistant-scenarios.mjs` y `errorPreview.mjs` controlan escenarios locales; `assistantMock` solo debe usarse con el modo de preview autorizado. Por ejemplo, `assistantMock=six_tools` prepara una propuesta de seis herramientas para revisar composición. No asumir que cualquier nombre de escenario es válido: consultar el módulo antes de crear enlaces de prueba.

`CatalogPreviewProvider` aísla los ejemplos de la página Design System para que no dependan de llamadas reales. Esos ejemplos no son evidencia de que existan los mismos datos en Supabase.

## 16. Compilación y publicación

1. `prebuild` sincroniza categorías y prepara el worker de ELK.
2. Next.js genera la exportación estática.
3. `prepare-next-export.mjs` prepara la salida para servirla.
4. `prepare-sites-build.mjs` prepara los artefactos de Sites, incluido `dist/server/index.js` y `dist/.openai/hosting.json`.

El frontend publicado necesita URLs HTTPS accesibles de catálogo y asistente, con CORS configurado en ambos servicios. `127.0.0.1` apunta a la computadora de cada visitante y no sirve para compartir el backend local con el equipo. Una demo con mocks debe configurarse de forma explícita.

Esta documentación no publica ni modifica despliegues.

## 17. Pruebas y comprobaciones de entrega

Las pruebas usan `node --test tests/*.test.mjs`. Cubren, entre otros:

- Contratos, adaptación HTTP y errores.
- Paginación HTTP, caché y catálogo simulado.
- Categorías, filtros, paginación visual y descripciones.
- Consulta del asistente, cancelación, timeout y presentación de estados.
- Topología ELK y anclaje de protocolos.
- Identidad visual, paletas y rutas de fichas.
- Geometría y coordinación de scroll/transiciones.
- Exportación Next.js y worker de Sites.

**Validación realizada para el PR #107:** 149 pruebas frontend aprobadas y build correcto; además, 525 pruebas de IA/contratos aprobadas y 2 omitidas. Estas cifras corresponden a esa revisión, no a una ejecución automática al abrir este documento. El favicon posterior también fue compilado y servido correctamente.

No había checks automáticos reportados por GitHub para ese PR; las verificaciones se ejecutaron localmente. Las pruebas unitarias no sustituyen una revisión visual en navegador.

### Recorrido manual recomendado

1. Carga real del catálogo: skeleton → cards, sin salto de scroll.
2. Buscar, combinar filtros, limpiar y cambiar de página.
3. Abrir ficha desde catálogo, arquitectura y enlace directo owner/name.
4. Integraciones revisadas, sugeridas, sin snippet y sin ideas.
5. Consulta normal, aclaraciones, sin evidencia, error, detener y reintentar.
6. Segunda consulta sin conservar la arquitectura anterior en pantalla.
7. Diagramas con cero, una y varias conexiones, protocolos largos y herramientas sin logo.
8. Abrir catálogo sobre una respuesta y regresar sin perder lectura ni prompt.
9. Textos largos, móvil, teclado y movimiento reducido.

## 18. Puntos de atención para mantenimiento

- **Escalabilidad del catálogo:** descarga completa antes de filtrar/paginar; revisar si aumenta el volumen.
- **Dependencia del catálogo en la validación de IA:** una propuesta con herramientas se comprueba contra el catálogo cargado; un catálogo vacío puede provocar `unavailable_tool` aunque el servicio de IA haya respondido.
- **Tiempos inconsistentes:** revisar el timeout HTTP de 20 s frente al aviso de 60 s antes de cambiar mensajes de espera.
- **Diagramas densos:** el escalado puede reducir legibilidad; probar nombres largos y muchas conexiones.
- **CSS y efectos históricos:** hay componentes de iteraciones anteriores. Confirmar imports y uso real antes de eliminarlos o asumir que consumen recursos.
- **Contrato de resumen:** el adaptador aplica límite de 250 caracteres; coordinar cualquier cambio con los productores de datos.
- **Identidad vs. datos:** conservar owner/repo como clave canónica aunque se cure un nombre comercial.
- **Seguridad:** secretos solo en servicios, nunca en artefactos frontend; no añadir fallback silencioso a fixtures.
- **Calidad visual:** priorizar componentes compartidos para botones, tooltips, colores y estados; evitar nuevas variantes ad hoc.

## 19. Guía rápida para próximos cambios

| Necesidad | Punto de entrada |
| --- | --- |
| Cambiar mensajes de error | `src/errorPresentation.mjs` |
| Cambiar la conexión al catálogo | `src/data/catalogHttp.mjs` y configuración pública |
| Cambiar la conexión al asistente | `src/data/assistantHttp.mjs` y `useAssistantFlow.js` |
| Añadir un campo de API a la UI | Adaptadores → componente → pruebas de contrato/presentación |
| Ajustar filtros o paginación | `src/features/catalog/` |
| Curar logo/nombre/color | `src/data/brand-identities.json` y `src/brandIdentity.js` |
| Ajustar distribución de conexiones | `connectionLayout.mjs`, `ConnectionDiagram.jsx`, `connections.css` |
| Ajustar ficha e integraciones | `ToolModal.jsx`, `ToolDetail.jsx`, `IntegrationIdeas.jsx` |
| Ajustar comportamiento del prompt | `PromptComposer.jsx`, `useAssistantFlow.js`, `usePromptLayout.js` |
| Ajustar navegación de superficies | `useWorkspaceView.js`, `SectionNavigation.jsx` |
| Cambiar botones o tooltips | `buttons.css`, `FollowingTooltip.jsx` y estilos compartidos |
| Documentar un componente | `src/app/design-system/` |

Antes de entregar cambios: ejecutar pruebas y build, comprobar datos reales y escenarios explícitos, revisar móvil y teclado, y describir cualquier limitación pendiente. No cambiar contratos para resolver únicamente un problema de presentación sin coordinarlo con el equipo.
