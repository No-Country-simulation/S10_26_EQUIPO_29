# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 03:41. 8 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 4.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 70% |
| Cobertura de necesidades | 85% |
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
| Tiempo (peor caso) | 4.3 s |
| Tokens de entrada (mediana) | 2233 |
| Tokens de salida (mediana) | 117 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `telemedicina-consultas` | communication, database | ✅✅✅ |
| `red-profesional-contactos` | auth, database | ✅✅✅ |
| `tienda-global-imagenes` | infrastructure, search | ❌❌❌ +storage −infrastructure |
| `repuestos-factura-electronica` | payments, storage | ✅✅✅ |
| `constructora-aprobaciones` | automation, communication | ❌❌❌ −automation |
| `tienda-mascotas-chat` | analytics, communication | ✅✅✅ |
| `estudio-contable-respaldos` | auth, storage | ✅✅✅ |
| `marca-ropa-redes` | analytics, communication | ⚠️✅❌ −analytics |

## Para revisar a mano (corrida 1)

### gemini

- `telemedicina-consultas`: **communication** «videollamadas desde el navegador» ← “que los médicos atiendan a sus pacientes por videollamada desde el navegador”; **database** «almacenamiento en base de datos relacional» ← “guardar las historias clínicas en una base de datos relacional”
- `red-profesional-contactos`: **database** «almacenamiento de relaciones en grafos» ← “guardar quién trabajó con quién en una base de datos de grafos”; **auth** «autenticacion federada con proveedores externos» ← “que los usuarios entren con su cuenta de LinkedIn o Google”
- `tienda-global-imagenes`: **storage** «almacenamiento y distribución global de archivos» ← “las fotos de sus productos se sirvan desde servidores cercanos a cada comprador”; **search** «búsqueda visual y similitud de imágenes» ← “un buscador donde el cliente suba una foto y encuentre productos parecidos”
- `repuestos-factura-electronica`: **payments** «emision de factura electronica» ← “emitir la factura electrónica de cada venta ante la autoridad tributaria”; **storage** «almacenamiento de archivos PDF» ← “guardar los PDF de las facturas en un almacenamiento de archivos”
- `constructora-aprobaciones`: **communication** «envío de correos electrónicos transaccionales» ← “avisar por correo a cada persona cuando tenga una solicitud pendiente”
- `tienda-mascotas-chat`: **communication** «chat en vivo con clientes» ← “un chat en vivo para que sus clientes conversen con un asesor desde la página”; **analytics** «analítica de tráfico web» ← “medir cuántos visitantes llegan a la página de cada producto”
- `estudio-contable-respaldos`: **storage** «copias de seguridad automáticas de archivos» ← “copias de seguridad automáticas cada noche de las carpetas de sus clientes”; **auth** «control de acceso y permisos por usuario» ← “que cada contador entre con su cuenta y vea solo los clientes que tiene asignados”
- `marca-ropa-redes`: error · LLMTimeout: gemini: sin respuesta en 15.0 s
