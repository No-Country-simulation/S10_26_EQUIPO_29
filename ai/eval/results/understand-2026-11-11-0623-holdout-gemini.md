# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 06:23. 12 casos × 3 corridas por proveedor; etiquetas versión 3; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 27.8 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 81% |
| Cobertura de necesidades | 90% |
| Necesidades inventadas | 3 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 92% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/36 |
| Evidencia literal | 100% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 1.3 s |
| Tokens de entrada (mediana) | 2536 |
| Tokens de salida (mediana) | 84 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 12 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| auth | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| automation | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| cache | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| cms | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| data-processing | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| database | 3/4 · 3/4 · 2/4 | 0 · 0 · 0 |
| frontend | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| infrastructure | 1/2 · 1/2 · 1/2 | 0 · 0 · 0 |
| messaging | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| observability | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| payments | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| search | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 1 · 1 · 1 |
| **Todas** | 21/23 · 21/23 · 20/23 | 1 · 1 · 1 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `ferreteria-sucursales` | auth, cache, database | ✅✅❌ −database |
| `domicilios-push` | communication, messaging | ✅✅✅ |
| `red-mascotas-grafos` | database | ✅✅✅ |
| `mercadeo-sitio-vue` | cms, frontend | ✅✅✅ |
| `laboratorio-respaldos` | analytics, storage | ✅✅✅ |
| `cosmeticos-facturas-embudo` | analytics, payments | ✅✅✅ |
| `empresa-aprobaciones` | automation, database | ❌❌❌ −database |
| `startup-trazas-gitops` | infrastructure, observability | ✅✅✅ |
| `artesanias-chat-busqueda` | communication, search | ✅✅✅ |
| `distribuidora-datos` | data-processing, database | ✅✅✅ |
| `revista-cdn` | infrastructure | ❌❌❌ +storage −infrastructure |
| `instituto-videoclases` | communication, storage | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `ferreteria-sucursales`: **database** «almacenamiento y consulta de inventario y ventas» ← “cada sucursal vea solo su propio inventario y sus ventas”; **auth** «control de acceso basado en sucursales» ← “cada sucursal vea solo su propio inventario y sus ventas”; **cache** «almacenamiento temporal para consultas frecuentes de catálogo» ← “las consultas repetidas al catálogo de productos respondan rápido”
- `domicilios-push`: **communication** «envío de notificaciones móviles» ← “enviar una notificación al celular del cliente cuando su pedido salga del restaurante”; **messaging** «generación de documentos en segundo plano» ← “generar en segundo plano el recibo en PDF de cada pedido para no demorar la app”
- `red-mascotas-grafos`: **database** «almacenamiento y consulta de datos en grafos» ← “guardar quién conoce a quién en una base de datos de grafos”
- `mercadeo-sitio-vue`: **frontend** «framework web basado en Vue» ← “rehacer su sitio web con un framework basado en Vue”; **cms** «gestión de contenido para no programadores» ← “quiere que su equipo, que no sabe programar, cambie los textos y los banners sin pedírselo a los desarrolladores”
- `laboratorio-respaldos`: **storage** «copias de seguridad automáticas» ← “copias de seguridad automáticas de los resultados de sus exámenes cada noche, guardadas fuera del servidor principal”; **analytics** «tablero con métricas de volumen por sede» ← “un tablero que muestre cuántas muestras procesa cada sede por día”
- `cosmeticos-facturas-embudo`: **payments** «emision de facturas electronicas» ← “emitir la factura electrónica de cada venta”; **analytics** «analisis de embudos de compra» ← “saber en qué paso del proceso de compra abandonan los clientes”
- `empresa-aprobaciones`: **automation** «flujo de aprobacion de solicitudes» ← “las solicitudes de vacaciones sigan un flujo de aprobación: el empleado la pide, su jefe la aprueba y recursos humanos la registra”
- `startup-trazas-gitops`: **observability** «trazas distribuidas entre microservicios» ← “ver por dónde pasa cada solicitud entre servicios para encontrar dónde se demora”; **infrastructure** «despliegue continuo en clúster» ← “que cada cambio aprobado en el repositorio se despliegue solo en su clúster”
- `artesanias-chat-busqueda`: **communication** «chat en tiempo real» ← “un chat en tiempo real entre compradores y vendedores dentro de la página”; **search** «busqueda tolerante a errores ortograficos» ← “un buscador de productos que encuentre resultados aunque el comprador escriba con errores”
- `distribuidora-datos`: **data-processing** «transformación y versionado de datos con sql» ← “transformar las ventas crudas en tablas limpias usando SQL versionado y con pruebas”; **database** «almacenamiento de datos analíticos de alto rendimiento» ← “guardar el resultado en una base analítica rápida para consultar millones de filas”
- `revista-cdn`: **storage** «almacenamiento de archivos y objetos distribuidos» ← “sus fotos carguen rápido en cualquier país, servidas desde servidores cercanos a cada lector”
- `instituto-videoclases`: **communication** «clases en vivo por videollamada» ← “dar clases en vivo por videollamada desde el navegador”; **storage** «almacenamiento de archivos grabados» ← “guardar las grabaciones para que los estudiantes las vean después”
