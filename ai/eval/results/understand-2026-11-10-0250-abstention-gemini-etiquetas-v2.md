# Evaluación del paso de entender

Re-puntuado con `--rescore` el 2026-11-11: respuestas del modelo guardadas en `understand-2026-11-10-0250-abstention-gemini.json`, etiquetas actuales de los casos. 8 casos × 3 corridas por proveedor; etiquetas versión 2; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | — |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 65% |
| Cobertura de necesidades | 78% |
| Necesidades inventadas | 3 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 88% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 1/24 |
| Evidencia literal | 100% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 1.6 s |
| Tokens de entrada (mediana) | 2127 |
| Tokens de salida (mediana) | 73 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 2/2 · 1/2 · 1/2 | 0 · 0 · 0 |
| auth | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| automation | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| communication | 3/3 · 4/4 · 4/4 | 0 · 0 · 0 |
| database | 1/2 · 2/3 · 2/3 | 0 · 0 · 0 |
| infrastructure | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| payments | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| search | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 1 · 1 · 1 |
| **Todas** | 12/15 · 13/17 · 13/17 | 1 · 1 · 1 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `telemedicina-consultas` | communication, database | ⚠️✅✅ |
| `red-profesional-contactos` | auth, database | ✅✅✅ |
| `tienda-global-imagenes` | infrastructure, search | ❌❌❌ +storage −infrastructure |
| `repuestos-factura-electronica` | payments, storage | ✅✅✅ |
| `constructora-aprobaciones` | automation, communication, database | ❌❌❌ −automation −database |
| `tienda-mascotas-chat` | analytics, communication | ✅✅✅ |
| `estudio-contable-respaldos` | auth, storage | ✅✅✅ |
| `marca-ropa-redes` | analytics, communication | ✅❌❌ −analytics |

## Para revisar a mano (corrida 1)

### gemini

- `telemedicina-consultas`: error · LLMTimeout: gemini: sin respuesta en 15.0 s
- `red-profesional-contactos`: **database** «almacenamiento de bases de datos de grafos» ← “guardar quién trabajó con quién en una base de datos de grafos”; **auth** «inicio de sesión con proveedores externos» ← “que los usuarios entren con su cuenta de LinkedIn o Google”
- `tienda-global-imagenes`: **storage** «almacenamiento de archivos y objetos» ← “las fotos de sus productos se sirvan desde servidores cercanos a cada comprador”; **search** «búsqueda visual y semántica» ← “un buscador donde el cliente suba una foto y encuentre productos parecidos”
- `repuestos-factura-electronica`: **payments** «emisión de factura electrónica fiscal» ← “emitir la factura electrónica de cada venta ante la autoridad tributaria”; **storage** «almacenamiento de archivos PDF» ← “guardar los PDF de las facturas en un almacenamiento de archivos”
- `constructora-aprobaciones`: **communication** «envío de correos electrónicos transaccionales» ← “avisar por correo a cada persona cuando tenga una solicitud pendiente”
- `tienda-mascotas-chat`: **communication** «chat en vivo con asesor» ← “un chat en vivo para que sus clientes conversen con un asesor desde la página”; **analytics** «analítica de tráfico web» ← “medir cuántos visitantes llegan a la página de cada producto”
- `estudio-contable-respaldos`: **storage** «respaldo automatico de archivos nocturno» ← “copias de seguridad automáticas cada noche de las carpetas de sus clientes”; **auth** «gestion de identidad y control de acceso» ← “que cada contador entre con su cuenta y vea solo los clientes que tiene asignados”
- `marca-ropa-redes`: **analytics** «analitica de menciones en redes sociales» ← “medir cuántas veces la mencionan en Instagram y TikTok”; **communication** «envio masivo de correos electronicos» ← “enviar un boletín mensual por correo a sus suscriptores”
