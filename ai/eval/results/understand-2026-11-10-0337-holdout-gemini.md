# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 03:37. 12 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 29.2 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 71% |
| Cobertura de necesidades | 85% |
| Necesidades inventadas | 14 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 83% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 1/36 |
| Evidencia literal | 98% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 4.8 s |
| Tokens de entrada (mediana) | 2234 |
| Tokens de salida (mediana) | 117 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 12 casos; los porcentajes no son estadística firme.

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `ferreteria-sucursales` | auth, cache | ❌❌❌ +database −auth |
| `domicilios-push` | communication, messaging | ⚠️✅✅ |
| `red-mascotas-grafos` | database | ✅✅✅ |
| `mercadeo-sitio-vue` | cms, frontend | ✅✅✅ |
| `laboratorio-respaldos` | analytics, storage | ✅✅✅ |
| `cosmeticos-facturas-embudo` | analytics, payments | ✅✅✅ |
| `empresa-aprobaciones` | automation | ❌❌❌ +auth +database +messaging −automation |
| `startup-trazas-gitops` | infrastructure, observability | ✅✅✅ |
| `artesanias-chat-busqueda` | communication, search | ✅✅✅ |
| `distribuidora-datos` | data-processing, database | ❌✅✅ +dev-tools |
| `revista-cdn` | infrastructure | ❌❌❌ +storage −infrastructure |
| `instituto-videoclases` | communication, storage | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `ferreteria-sucursales`: **database** «almacenamiento de inventario y ventas por sucursal» ← “cada sucursal vea solo su propio inventario y sus ventas”; **cache** «almacenamiento temporal para consultas rápidas de catálogo» ← “las consultas repetidas al catálogo de productos respondan rápido”
- `domicilios-push`: error · LLMTimeout: gemini: sin respuesta en 15.0 s
- `red-mascotas-grafos`: **database** «almacenamiento de base de datos de grafos» ← “guardar quién conoce a quién en una base de datos de grafos”
- `mercadeo-sitio-vue`: **frontend** «framework de interfaz basado en Vue» ← “un framework basado en Vue”; **cms** «gestión de contenido para no programadores» ← “que su equipo, que no sabe programar, cambie los textos y los banners sin pedírselo a los desarrolladores”
- `laboratorio-respaldos`: **storage** «respaldo de archivos fuera del servidor» ← “copias de seguridad automáticas de los resultados de sus exámenes cada noche, guardadas fuera del servidor principal”; **analytics** «tablero analítico de métricas operativas» ← “un tablero que muestre cuántas muestras procesa cada sede por día”
- `cosmeticos-facturas-embudo`: **payments** «emision de facturas electronicas» ← “emitir la factura electrónica de cada venta”; **analytics** «analisis de embudos de conversion» ← “saber en qué paso del proceso de compra abandonan los clientes”
- `empresa-aprobaciones`: **database** «almacenamiento y registro de solicitudes» ← “recursos humanos la registra”; **messaging** «flujo de tareas y aprobaciones» ← “las solicitudes de vacaciones sigan un flujo de aprobación”
- `startup-trazas-gitops`: **observability** «rastreo de solicitudes distribuidas entre microservicios» ← “ver por dónde pasa cada solicitud entre servicios para encontrar dónde se demora”; **infrastructure** «despliegue continuo automatizado en clúster» ← “que cada cambio aprobado en el repositorio se despliegue solo en su clúster”
- `artesanias-chat-busqueda`: **communication** «chat en tiempo real entre usuarios» ← “un chat en tiempo real entre compradores y vendedores dentro de la página”; **search** «búsqueda de texto tolerante a errores» ← “un buscador de productos que encuentre resultados aunque el comprador escriba con errores”
- `distribuidora-datos`: **database** «almacenamiento de datos analiticos rapidos» ← “guardar el resultado en una base analítica rápida para consultar millones de filas”; **data-processing** «transformacion de datos con codigo sql» ← “transformar las ventas crudas en tablas limpias usando SQL versionado”; **dev-tools** «framework de pruebas de datos» ← “con pruebas”
- `revista-cdn`: **storage** «almacenamiento y distribución de archivos multimedia» ← “sus fotos carguen rápido en cualquier país, servidas desde servidores cercanos a cada lector”
- `instituto-videoclases`: **communication** «clases en vivo por videollamada» ← “dar clases en vivo por videollamada desde el navegador”; **storage** «guardar las grabaciones» ← “guardar las grabaciones para que los estudiantes las vean después”
