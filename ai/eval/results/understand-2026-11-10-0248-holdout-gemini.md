# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 02:48. 12 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.2 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 74% |
| Cobertura de necesidades | 87% |
| Necesidades inventadas | 8 |
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
| `empresa-aprobaciones` | automation | ❌✅❌ +backend −automation |
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
