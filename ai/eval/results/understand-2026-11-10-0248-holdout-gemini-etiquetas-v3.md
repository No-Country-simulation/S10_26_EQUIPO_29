# Evaluación del paso de entender

Re-puntuado con `--rescore` el 2026-11-11: respuestas del modelo guardadas en `understand-2026-11-10-0248-holdout-gemini.json`, etiquetas actuales de los casos. 12 casos × 3 corridas por proveedor; etiquetas versión 3; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | — |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 71% |
| Cobertura de necesidades | 84% |
| Necesidades inventadas | 5 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 1 |
| Consistencia entre corridas | 83% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 1/36 |
| Evidencia literal | 93% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 1.7 s |
| Tokens de entrada (mediana) | 2129 |
| Tokens de salida (mediana) | 95 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 12 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| auth | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| automation | 0/1 · 1/1 · 0/1 | 0 · 0 · 0 |
| backend | 0/0 · 0/0 · 0/0 | 0 · 0 · 1 |
| cache | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| cms | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 2/2 · 3/3 · 3/3 | 0 · 0 · 0 |
| data-processing | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| database | 3/4 · 3/4 · 3/4 | 0 · 0 · 0 |
| dev-tools | 0/0 · 0/0 · 0/0 | 0 · 1 · 0 |
| frontend | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| infrastructure | 1/2 · 1/2 · 1/2 | 0 · 0 · 0 |
| messaging | 0/0 · 1/1 · 1/1 | 0 · 0 · 0 |
| observability | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| payments | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| search | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 1 · 1 · 1 |
| **Todas** | 17/21 · 20/23 · 19/23 | 1 · 2 · 2 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `ferreteria-sucursales` | auth, cache, database | ❌❌❌ −auth |
| `domicilios-push` | communication, messaging | ⚠️✅✅ |
| `red-mascotas-grafos` | database | ✅✅✅ |
| `mercadeo-sitio-vue` | cms, frontend | ✅✅✅ |
| `laboratorio-respaldos` | analytics, storage | ✅✅✅ |
| `cosmeticos-facturas-embudo` | analytics, payments | ✅✅✅ |
| `empresa-aprobaciones` | automation, database | ❌❌❌ +backend −automation −database |
| `startup-trazas-gitops` | infrastructure, observability | ✅✅✅ |
| `artesanias-chat-busqueda` | communication, search | ✅✅✅ |
| `distribuidora-datos` | data-processing, database | ✅❌✅ +dev-tools |
| `revista-cdn` | infrastructure | ❌❌❌ +storage −infrastructure |
| `instituto-videoclases` | communication, storage | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `ferreteria-sucursales`: **database** «almacenamiento de inventario y ventas» ← “cada sucursal vea solo su propio inventario y sus ventas”; **cache** «caché en memoria para catálogo» ← “las consultas repetidas al catálogo de productos respondan rápido”
- `domicilios-push`: error · LLMTimeout: gemini: sin respuesta en 15.0 s
- `red-mascotas-grafos`: **database** «almacenamiento de base de datos de grafos» ← “guardar quién conoce a quién en una base de datos de grafos”
- `mercadeo-sitio-vue`: **frontend** «framework web basado en Vue» ← “un framework basado en Vue”; **cms** «gestion de contenido para no programadores» ← “que su equipo, que no sabe programar, cambie los textos y los banners sin ped7%os a los desarrolladores”
- `laboratorio-respaldos`: **storage** «copias de seguridad automáticas de archivos» ← “copias de seguridad automáticas de los resultados de sus exámenes cada noche, guardadas fuera del servidor principal”; **analytics** «tablero de métricas del negocio» ← “un tablero que muestre cuántas muestras procesa cada sede por día”
- `cosmeticos-facturas-embudo`: **payments** «emision de factura electronica» ← “emitir la factura electrónica de cada venta”; **analytics** «analisis de embudo de conversion» ← “saber en qué paso del proceso de compra abandonan los clientes”
- `empresa-aprobaciones`: preguntas: ¿Qué tipo de aplicación o sistema prefieren utilizar para este flujo de aprobaciones? / ¿Cuentan con alguna infraestructura o tecnología actual en la empresa donde debamos integrar este sistema? / ¿Necesitan que el sistema envíe notificaciones por correo o mensajería cuando cambie el estado de la solicitud?
- `startup-trazas-gitops`: **observability** «trazas distribuidas entre microservicios» ← “ver por dónde pasa cada solicitud entre servicios para encontrar dónde se demora”; **infrastructure** «despliegue continuo en clúster de contenedores» ← “que cada cambio aprobado en el repositorio se despliegue solo en su clúster”
- `artesanias-chat-busqueda`: **communication** «chat en tiempo real entre usuarios» ← “un chat en tiempo real entre compradores y vendedores dentro de la página”; **search** «búsqueda de texto tolerante a errores» ← “un buscador de productos que encuentre resultados aunque el comprador escriba con errores”
- `distribuidora-datos`: **data-processing** «transformación de datos con SQL versionado» ← “transformar las ventas crudas en tablas limpias usando SQL versionado y con pruebas”; **database** «almacenamiento analítico de alto rendimiento» ← “guardar el resultado en una base analítica rápida para consultar millones de filas”
- `revista-cdn`: **storage** «almacenamiento y distribucion global de archivos» ← “fotos carguen rápido en cualquier país, servidas desde servidores cercanos a cada lector”
- `instituto-videoclases`: **communication** «videollamadas en vivo para clases» ← “dar clases en vivo por videollamada desde el navegador”; **storage** «almacenamiento de archivos multimedia» ← “guardar las grabaciones para que los estudiantes las vean después”
