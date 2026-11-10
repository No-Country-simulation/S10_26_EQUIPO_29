# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 02:50. 8 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 4.1 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 65% |
| Cobertura de necesidades | 83% |
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

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `telemedicina-consultas` | communication, database | ⚠️✅✅ |
| `red-profesional-contactos` | auth, database | ✅✅✅ |
| `tienda-global-imagenes` | infrastructure, search | ❌❌❌ +storage −infrastructure |
| `repuestos-factura-electronica` | payments, storage | ✅✅✅ |
| `constructora-aprobaciones` | automation, communication | ❌❌❌ −automation |
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
