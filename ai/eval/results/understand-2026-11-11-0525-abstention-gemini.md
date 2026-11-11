# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 05:25. 8 casos × 3 corridas por proveedor; etiquetas versión 2; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.9 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 62% |
| Cobertura de necesidades | 76% |
| Necesidades inventadas | 3 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 100% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/24 |
| Evidencia literal | 100% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 1.6 s |
| Tokens de entrada (mediana) | 2128 |
| Tokens de salida (mediana) | 84 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 1/2 · 1/2 · 1/2 | 0 · 0 · 0 |
| auth | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| automation | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| communication | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| database | 2/3 · 2/3 · 2/3 | 0 · 0 · 0 |
| infrastructure | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| payments | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| search | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 1 · 1 · 1 |
| **Todas** | 13/17 · 13/17 · 13/17 | 1 · 1 · 1 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `telemedicina-consultas` | communication, database | ✅✅✅ |
| `red-profesional-contactos` | auth, database | ✅✅✅ |
| `tienda-global-imagenes` | infrastructure, search | ❌❌❌ +storage −infrastructure |
| `repuestos-factura-electronica` | payments, storage | ✅✅✅ |
| `constructora-aprobaciones` | automation, communication, database | ❌❌❌ −automation −database |
| `tienda-mascotas-chat` | analytics, communication | ✅✅✅ |
| `estudio-contable-respaldos` | auth, storage | ✅✅✅ |
| `marca-ropa-redes` | analytics, communication | ❌❌❌ −analytics |

## Para revisar a mano (corrida 1)

### gemini

- `telemedicina-consultas`: **communication** «videollamadas web para pacientes y medicos» ← “que los médicos atiendan a sus pacientes por videollamada desde el navegador”; **database** «almacenamiento de historias clinicas relacionales» ← “guardar las historias clínicas en una base de datos relacional”
- `red-profesional-contactos`: **database** «almacenamiento de datos orientados a grafos» ← “guardar quién trabajó con quién en una base de datos de grafos”; **auth** «inicio de sesión con proveedores externos» ← “los usuarios entren con su cuenta de LinkedIn o Google”
- `tienda-global-imagenes`: **storage** «almacenamiento y distribución global de archivos» ← “las fotos de sus productos se sirvan desde servidores cercanos a cada comprador”; **search** «búsqueda visual y similitud de imágenes» ← “un buscador donde el cliente suba una foto y encuentre productos parecidos”
- `repuestos-factura-electronica`: **payments** «emision de facturas electronicas» ← “emitir la factura electrónica de cada venta ante la autoridad tributaria”; **storage** «almacenamiento de archivos pdf» ← “guardar los PDF de las facturas en un almacenamiento de archivos”
- `constructora-aprobaciones`: **communication** «envio de notificaciones por correo electronico» ← “avisar por correo a cada persona cuando tenga una solicitud pendiente”
- `tienda-mascotas-chat`: **communication** «chat en vivo con asesores» ← “un chat en vivo para que sus clientes conversen con un asesor desde la página”; **analytics** «medición de visitas a productos» ← “medir cuántos visitantes llegan a la página de cada producto”
- `estudio-contable-respaldos`: **storage** «copias de seguridad automáticas de archivos» ← “copias de seguridad automáticas cada noche de las carpetas de sus clientes”; **auth** «control de acceso basado en roles» ← “que cada contador entre con su cuenta y vea solo los clientes que tiene asignados”
- `marca-ropa-redes`: **communication** «envío masivo de correo mensual» ← “enviar un boletín mensual por correo a sus suscriptores”
