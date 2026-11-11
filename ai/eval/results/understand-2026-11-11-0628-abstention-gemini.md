# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 06:28. 8 casos × 3 corridas por proveedor; etiquetas versión 2; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 21.9 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 67% |
| Cobertura de necesidades | 84% |
| Necesidades inventadas | 3 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 88% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/24 |
| Evidencia literal | 98% |
| Consultas de 3 a 8 palabras | 98% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.5 s |
| Tokens de entrada (mediana) | 2548 |
| Tokens de salida (mediana) | 118 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 8 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 1/2 · 2/2 · 1/2 | 0 · 0 · 0 |
| auth | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| automation | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| communication | 4/4 · 4/4 · 4/4 | 0 · 0 · 0 |
| database | 2/3 · 2/3 · 2/3 | 0 · 0 · 0 |
| infrastructure | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| payments | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| search | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| storage | 2/2 · 2/2 · 2/2 | 1 · 1 · 1 |
| **Todas** | 14/17 · 15/17 · 14/17 | 1 · 1 · 1 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `telemedicina-consultas` | communication, database | ✅✅✅ |
| `red-profesional-contactos` | auth, database | ✅✅✅ |
| `tienda-global-imagenes` | infrastructure, search | ❌❌❌ +storage −infrastructure |
| `repuestos-factura-electronica` | payments, storage | ✅✅✅ |
| `constructora-aprobaciones` | automation, communication, database | ❌❌❌ −database |
| `tienda-mascotas-chat` | analytics, communication | ✅✅✅ |
| `estudio-contable-respaldos` | auth, storage | ✅✅✅ |
| `marca-ropa-redes` | analytics, communication | ❌✅❌ −analytics |

## Para revisar a mano (corrida 1)

### gemini

- `telemedicina-consultas`: **communication** «realizar videollamadas con pacientes» ← “atiendan a sus pacientes por videollamada desde el navegador”; **database** «almacenar historias clínicas de pacientes» ← “guardar las historias clínicas en una base de datos relacional”
- `red-profesional-contactos`: **database** «almacenamiento de grafos para relaciones» ← “guardar quién trabajó con quién en una base de datos de grafos”; **auth** «inicio de sesión con proveedores externos» ← “que los usuarios entren con su cuenta de LinkedIn o Google”
- `tienda-global-imagenes`: **storage** «almacenamiento y distribución de archivos multimedia» ← “que las fotos de sus productos se sirvan desde servidores cercanos a cada comprador”; **search** «búsqueda visual y similitud de imágenes» ← “un buscador donde el cliente suba una foto y encuentre productos parecidos”
- `repuestos-factura-electronica`: **payments** «emisión de facturas electrónicas» ← “emitir la factura electrónica de cada venta ante la autoridad tributaria”; **storage** «almacenamiento de archivos PDF» ← “guardar los PDF de las facturas en un almacenamiento de archivos”
- `constructora-aprobaciones`: **automation** «flujo de aprobación de solicitudes» ← “las solicitudes de compra sigan un flujo de aprobación: el residente de obra la pide, el ingeniero la aprueba y compras la registra”; **communication** «envío de correos de notificación» ← “avisar por correo a cada persona cuando tenga una solicitud pendiente”
- `tienda-mascotas-chat`: **communication** «chat en vivo para atención al cliente» ← “una tienda de mascotas quiere un chat en vivo para que sus clientes conversen con un asesor desde la página”; **analytics** «analítica web y seguimiento de visitantes» ← “medir cuántos visitantes llegan a la página de cada producto”
- `estudio-contable-respaldos`: **storage** «copias de seguridad automáticas de archivos» ← “copias de seguridad automáticas cada noche de las carpetas de sus clientes”; **auth** «autenticación de usuarios y control de acceso por roles» ← “que cada contador entre con su cuenta y vea solo los clientes que tiene asignados”
- `marca-ropa-redes`: **communication** «envío masivo de boletines por correo» ← “enviar un boletín mensual por correo a sus suscriptores”
