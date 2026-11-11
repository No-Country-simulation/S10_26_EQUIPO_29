# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 05:21. 12 casos × 3 corridas por proveedor; etiquetas versión 3; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.9 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 69% |
| Cobertura de necesidades | 83% |
| Necesidades inventadas | 5 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 3 |
| Consistencia entre corridas | 83% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/36 |
| Evidencia literal | 98% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 2.0 s |
| Tokens de entrada (mediana) | 2130 |
| Tokens de salida (mediana) | 86 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 12 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| auth | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| automation | 0/1 · 0/1 · 0/1 | 0 · 1 · 0 |
| cache | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| cms | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 3/3 · 3/3 · 3/3 | 0 · 0 · 0 |
| data-processing | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| database | 3/4 · 3/4 · 3/4 | 0 · 0 · 0 |
| dev-tools | 0/0 · 0/0 · 0/0 | 0 · 1 · 0 |
| frontend | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| infrastructure | 1/2 · 1/2 · 1/2 | 0 · 0 · 0 |
| messaging | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| observability | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| payments | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| search | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 1 · 1 · 1 |
| **Todas** | 19/23 · 19/23 · 19/23 | 1 · 3 · 1 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `ferreteria-sucursales` | auth, cache, database | ❌❌❌ −auth |
| `domicilios-push` | communication, messaging | ✅✅✅ |
| `red-mascotas-grafos` | database | ✅✅✅ |
| `mercadeo-sitio-vue` | cms, frontend | ✅✅✅ |
| `laboratorio-respaldos` | analytics, storage | ✅❌✅ +automation |
| `cosmeticos-facturas-embudo` | analytics, payments | ✅✅✅ |
| `empresa-aprobaciones` | automation, database | ❌❌❌ −automation −database |
| `startup-trazas-gitops` | infrastructure, observability | ✅✅✅ |
| `artesanias-chat-busqueda` | communication, search | ✅✅✅ |
| `distribuidora-datos` | data-processing, database | ✅❌✅ +dev-tools |
| `revista-cdn` | infrastructure | ❌❌❌ +storage −infrastructure |
| `instituto-videoclases` | communication, storage | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `ferreteria-sucursales`: **database** «almacenamiento y consulta de datos relacionales» ← “cada sucursal vea solo su propio inventario y sus ventas”; **cache** «almacenamiento en memoria para respuestas rápidas» ← “las consultas repetidas al catálogo de productos respondan rápido”
- `domicilios-push`: **communication** «envio de notificaciones moviles» ← “enviar una notificación al celular del cliente cuando su pedido salga del restaurante”; **messaging** «ejecucion de tareas en segundo plano» ← “generar en segundo plano el recibo en PDF de cada pedido”
- `red-mascotas-grafos`: **database** «almacenamiento y consulta de grafos» ← “guardar quién conoce a quién en una base de datos de grafos”
- `mercadeo-sitio-vue`: **frontend** «framework basado en vue» ← “un framework basado en Vue”; **cms** «gestion de contenido para no programadores» ← “su equipo, que no sabe programar, cambie los textos y los banners sin pedírselo a los desarrolladores”
- `laboratorio-respaldos`: **storage** «almacenamiento de respaldos y archivos fuera del servidor» ← “copias de seguridad automáticas de los resultados de sus exámenes cada noche, guardadas fuera del servidor principal”; **analytics** «tablero de analítica para visualizar procesamiento diario» ← “un tablero que muestre cuántas muestras procesa cada sede por día”
- `cosmeticos-facturas-embudo`: **payments** «emision de factura electronica» ← “emitir la factura electrónica de cada venta”; **analytics** «analisis de embudo de conversion» ← “saber en qué paso del proceso de compra abandonan los clientes”
- `empresa-aprobaciones`: preguntas: Qué plataforma o tecnología usan actualmente para el frontend o backend de su sistema? / Necesitan que el sistema envíce notificaciones por correo electrónico cuando se cree o apruebe una solicitud?
- `startup-trazas-gitops`: **observability** «trazas distribuidas entre microservicios» ← “ver por dónde pasa cada solicitud entre servicios para encontrar dónde se demora”; **infrastructure** «despliegue continuo en clúster» ← “cada cambio aprobado en el repositorio se despliegue solo en su clúster”
- `artesanias-chat-busqueda`: **communication** «chat en tiempo real entre usuarios» ← “un chat en tiempo real entre compradores y vendedores dentro de la página”; **search** «búsqueda de texto tolerante a errores» ← “un buscador de productos que encuentre resultados aunque el comprador escriba con errores”
- `distribuidora-datos`: **database** «almacenamiento de base analitica rapida» ← “guardar el resultado en una base analítica rápida para consultar millones de filas”; **data-processing** «transformacion de datos mediante sql» ← “transformar las ventas crudas en tablas limpias usando SQL versionado y con pruebas”
- `revista-cdn`: **storage** «almacenamiento de archivos multimedia distribuidos» ← “sus fotos carguen rápido en cualquier país, servidas desde servidores cercanos a cada lector”
- `instituto-videoclases`: **communication** «clases en vivo por videollamada» ← “dar clases en vivo por videollamada”; **storage** «almacenamiento de grabaciones de video» ← “guardar las grabaciones para que los estudiantes las vean después”
