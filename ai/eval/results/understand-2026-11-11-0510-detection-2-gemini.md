# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 05:10. 22 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 1.6 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 29% |
| Cobertura de necesidades | 54% |
| Necesidades inventadas | 14 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 5 |
| Consistencia entre corridas | 41% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/66 |
| Evidencia literal | 99% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.1 s |
| Tiempo (peor caso) | 1.4 s |
| Tokens de entrada (mediana) | 2143 |
| Tokens de salida (mediana) | 70 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 22 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 1/5 · 3/5 · 2/5 | 0 · 0 · 0 |
| auth | 3/8 · 4/8 · 5/8 | 0 · 0 · 0 |
| automation | 1/6 · 1/6 · 0/6 | 0 · 0 · 0 |
| cache | 0/0 · 0/0 · 0/0 | 1 · 1 · 1 |
| communication | 9/9 · 9/9 · 9/9 | 0 · 0 · 0 |
| database | 2/12 · 2/12 · 4/12 | 0 · 1 · 0 |
| infrastructure | 0/2 · 0/2 · 0/2 | 0 · 0 · 0 |
| messaging | 0/0 · 0/0 · 0/0 | 1 · 0 · 1 |
| observability | 0/0 · 0/0 · 0/0 | 0 · 2 · 1 |
| payments | 9/9 · 8/9 · 9/9 | 1 · 1 · 0 |
| storage | 1/1 · 1/1 · 1/1 | 1 · 1 · 1 |
| **Todas** | 26/52 · 28/52 · 30/52 | 4 · 6 · 4 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `fabrica-muebles-madera` | automation, database, storage | ❌❌❌ −automation −database |
| `centro-estetica` | analytics, auth, communication, database | ❌❌❌ −analytics −auth −database |
| `productora-jugos-naturales` | analytics, automation, database, payments | ❌❌❌ −analytics −automation −database −payments |
| `consultorio-odontologico` | auth, communication, database, infrastructure, payments | ❌❌❌ +cache −auth −database −infrastructure |
| `taller-relojes-antiguos` | communication | ✅✅✅ |
| `escuela-pintura-oleo` | analytics, payments | ✅✅✅ |
| `servicio-limpieza-alfombras` | auth, communication | ❌✅✅ +messaging −auth |
| `centro-entrenamiento-perros` | auth, database, payments | ❌❌❌ −database |
| `servicio-instalacion-cerraduras` | communication | ❌❌✅ +payments |
| `taller-orfebreria-plata` | automation, database, payments | ❌❌❌ +messaging −automation −database |
| `productora-quesos-frescos` | analytics, auth | ❌❌❌ +observability −analytics |
| `escuela-cocina-vegetariana` | auth, database | ❌❌✅ −auth −database |
| `distribuidora-vinos-locales` | communication | ✅✅✅ |
| `fabrica-velas-aromaticas-naturales` | analytics, infrastructure | ❌❌❌ +database +observability +storage −analytics −infrastructure |
| `servicio-pintura-casas-interiores` | automation, payments | ❌❌❌ −automation |
| `taller-tapiceria-muebles` | communication, database | ❌✅✅ −database |
| `servicio-jardineria-mantenimiento` | automation, database, payments | ❌❌❌ −automation −database |
| `taller-reparacion-electrodomesticos-pequenos` | communication | ✅✅✅ |
| `centro-pilates-grupal` | auth, database | ❌❌❌ −auth −database |
| `servicio-limpieza-oficinas-diaria` | auth, communication | ❌❌✅ −auth |
| `taller-pintura-automotriz-chica` | automation, database, payments | ❌❌❌ −automation −database |
| `escuela-circo-infantil` | database, payments | ❌❌❌ −database |

## Para revisar a mano (corrida 1)

### gemini

- `fabrica-muebles-madera`: **storage** «almacenamiento y organización de archivos de imagen» ← “las fotos de los terminados se guarden de forma ordenada”
- `centro-estetica`: **communication** «envío de mensajes de confirmación» ← “enviar mensajes de confirmación”
- `productora-jugos-naturales`: **payments** «procesamiento de pagos por transferencia» ← “cobrar con transferencia y generar el comprobante”
- `consultorio-odontologico`: **auth** «control de acceso por roles» ← “Quiero que cada uno maneje solo sus pacientes”; **database** «almacenamiento de historiales de pacientes» ← “organizar el historial de tratamientos de cada persona”; **communication** «envio de recordatorios de citas» ← “necesito enviar recordatorios de citas”; **payments** «pasarela de pagos moviles» ← “que los pacientes puedan pagar la consulta desde el celular”; **cache** «almacenamiento temporal para acelerar consultas» ← “Me preocupa que todo cargue rápido para quienes están en otras ciudades”
- `taller-relojes-antiguos`: **communication** «envío de avisos de finalización» ← “que se les avise por mensaje cuando el reloj esté listo”
- `escuela-pintura-oleo`: **payments** «cobro de mensualidades en linea» ← “Los alumnos deben poder pagar las mensualidades desde su casa”; **analytics** «analisis de inscripciones mensuales» ← “necesito ver cuántas personas se inscriben cada mes”
- `servicio-limpieza-alfombras`: **messaging** «gestion de tareas en segundo plano» ← “necesito que cada empleado vea solo las órdenes de su zona y que el sistema avise cuando un trabajo se atrasa”; **communication** «envio de notificaciones y alertas» ← “el sistema avise cuando un trabajo se atrasa”
- `centro-entrenamiento-perros`: **payments** «cobro de sesiones mensuales» ← “necesito que los dueños paguen las sesiones mensuales”; **auth** «control de acceso por roles y grupos» ← “solo el entrenador asignado vea la información de su grupo”
- `servicio-instalacion-cerraduras`: **communication** «envío de mensajes en camino» ← “que el cliente reciba un mensaje cuando el técnico está en camino.”; **payments** «procesamiento de cobros y pagos» ← “antes de cobrar”
- `taller-orfebreria-plata`: **payments** «cobro de anticipos en linea» ← “los clientes puedan pagar el anticipo en línea”
- `productora-quesos-frescos`: **auth** «gestion de permisos y roles» ← “cada empleado de la planta vea solo las tareas de su área”
- `escuela-cocina-vegetariana`: preguntas: ¿Qué tipo de aplicación prefieres construir para gestionar las inscripciones y las recetas, por ejemplo, una aplicación web o una móvil? / ¿Necesitas que los alumnos y profesores inicien sesión con un sistema de usuarios diferenciado por roles? / ¿Planeas cobrar las inscripciones a los talleres directamente a través de la plataforma?
- `distribuidora-vinos-locales`: **communication** «envío de alertas por consumo anómalo» ← “el sistema avise cuando un restaurante pide más de lo habitual”
- `fabrica-velas-aromaticas-naturales`: **storage** «almacenamiento y distribución global de imágenes» ← “que las imágenes del catálogo carguen rápido para compradores de otros países”
- `servicio-pintura-casas-interiores`: **payments** «cobro de anticipos en linea» ← “que se cobre el anticipo antes de empezar”
- `taller-tapiceria-muebles`: **communication** «envío de notificaciones a clientes» ← “que el cliente reciba un aviso cuando su mueble esté listo”
- `servicio-jardineria-mantenimiento`: **payments** «cobro mensual automatizado de servicios» ← “se cobre al final del mes”; **automation** «flujo de aprobacion por supervisor» ← “una solicitud de trabajo extra pase por aprobación del supervisor”
- `taller-reparacion-electrodomesticos-pequenos`: **communication** «envío de mensajes de notificación» ← “que el cliente reciba un mensaje cuando esté listo para recoger.”
- `centro-pilates-grupal`: preguntas: ¿Qué tipo de sistema o aplicación necesitas para gestionar las clases y los instructores? / ¿Tienes alguna preferencia sobre cómo los usuarios (alumnos e instructores) deben acceder al sistema? / ¿Dónde te gustaría almacenar los datos de las asistencias y notas de progreso?
- `servicio-limpieza-oficinas-diaria`: **communication** «envío de notificaciones de retraso» ← “el sistema avise si un equipo no marca la entrada a tiempo”
- `taller-pintura-automotriz-chica`: **database** «almacenamiento y consulta de inventario» ← “controlar el inventario de pinturas y diluyentes que uso”; **payments** «procesamiento de pagos en línea» ← “que el cliente pague el anticipo en línea”
- `escuela-circo-infantil`: **payments** «cobro de mensualidades en línea» ← “que los padres puedan pagar la mensualidad desde su casa.”
