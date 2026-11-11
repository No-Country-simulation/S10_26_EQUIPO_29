# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 06:10. 22 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 28.7 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 58% |
| Cobertura de necesidades | 81% |
| Necesidades inventadas | 7 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 64% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/66 |
| Evidencia literal | 98% |
| Consultas de 3 a 8 palabras | 100% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.5 s |
| Tokens de entrada (mediana) | 2526 |
| Tokens de salida (mediana) | 111 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 22 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 4/5 · 5/5 · 5/5 | 0 · 0 · 0 |
| auth | 6/8 · 6/8 · 8/8 | 0 · 0 · 0 |
| automation | 2/6 · 2/6 · 4/6 | 0 · 0 · 0 |
| cache | 0/0 · 0/0 · 0/0 | 1 · 0 · 0 |
| communication | 9/9 · 9/9 · 9/9 | 0 · 0 · 0 |
| database | 10/12 · 9/12 · 8/12 | 0 · 0 · 0 |
| infrastructure | 0/2 · 0/2 · 0/2 | 0 · 0 · 0 |
| payments | 9/9 · 9/9 · 9/9 | 1 · 1 · 1 |
| storage | 1/1 · 1/1 · 1/1 | 1 · 1 · 1 |
| **Todas** | 41/52 · 41/52 · 44/52 | 3 · 2 · 2 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `fabrica-muebles-madera` | automation, database, storage | ❌❌❌ −database |
| `centro-estetica` | analytics, auth, communication, database | ❌❌❌ −auth −database |
| `productora-jugos-naturales` | analytics, automation, database, payments | ❌❌❌ −automation −database |
| `consultorio-odontologico` | auth, communication, database, infrastructure, payments | ❌❌❌ +cache −infrastructure |
| `taller-relojes-antiguos` | communication | ✅✅✅ |
| `escuela-pintura-oleo` | analytics, payments | ✅✅✅ |
| `servicio-limpieza-alfombras` | auth, communication | ❌❌✅ −auth |
| `centro-entrenamiento-perros` | auth, database, payments | ✅✅✅ |
| `servicio-instalacion-cerraduras` | communication | ❌❌❌ +payments |
| `taller-orfebreria-plata` | automation, database, payments | ❌❌✅ −automation |
| `productora-quesos-frescos` | analytics, auth | ✅✅✅ |
| `escuela-cocina-vegetariana` | auth, database | ✅✅✅ |
| `distribuidora-vinos-locales` | communication | ✅✅✅ |
| `fabrica-velas-aromaticas-naturales` | analytics, infrastructure | ❌❌❌ +storage −analytics −infrastructure |
| `servicio-pintura-casas-interiores` | automation, payments | ❌❌✅ −automation |
| `taller-tapiceria-muebles` | communication, database | ✅✅✅ |
| `servicio-jardineria-mantenimiento` | automation, database, payments | ✅✅✅ |
| `taller-reparacion-electrodomesticos-pequenos` | communication | ✅✅✅ |
| `centro-pilates-grupal` | auth, database | ✅✅✅ |
| `servicio-limpieza-oficinas-diaria` | auth, communication | ✅✅✅ |
| `taller-pintura-automotriz-chica` | automation, database, payments | ❌❌❌ −automation |
| `escuela-circo-infantil` | database, payments | ✅✅❌ −database |

## Para revisar a mano (corrida 1)

### gemini

- `fabrica-muebles-madera`: **automation** «flujo de aprobacion de tareas» ← “Cada pedido tiene que pasar por la aprobación del diseñador antes de empezar a cortar.”; **storage** «almacenamiento y organizacion de archivos» ← “necesito que las fotos de los terminados se guarden de forma ordenada.”
- `centro-estetica`: **analytics** «control y conteo de tratamientos realizados» ← “poder controlar cuántos tratamientos se hacen por tipo”; **communication** «envío de mensajes de confirmación» ← “necesito enviar mensajes de confirmación”
- `productora-jugos-naturales`: **database** «registro de producción diaria y entregas» ← “Necesito llevar el control de la producción diaria y de las entregas.”; **analytics** «analítica de ventas por sabor» ← “pueda ver rápido cuánto vendí de cada sabor la semana pasada.”; **payments** «procesamiento de cobros y comprobantes» ← “cobrar con transferencia y generar el comprobante.”
- `consultorio-odontologico`: **auth** «gestion de permisos por roles» ← “Quiero que cada uno maneje solo sus pacientes”; **database** «almacenamiento y consulta de historiales medicos» ← “organizar el historial de tratamientos de cada persona”; **communication** «envio de recordatorios de citas» ← “Necesito enviar recordatorios de citas”; **payments** «procesamiento de pagos en linea» ← “que los pacientes puedan pagar la consulta desde el celular”; **cache** «almacenamiento en cache para velocidad» ← “Me preocupa que todo cargue rápido para quienes están en otras ciudades”
- `taller-relojes-antiguos`: **communication** «envío de mensajes de aviso a clientes» ← “que se les avise por mensaje cuando el reloj esté listo”
- `escuela-pintura-oleo`: **payments** «procesamiento de cobros y mensualidades» ← “Los alumnos deben poder pagar las mensualidades desde su casa”; **analytics** «analítica de inscripciones mensuales» ← “necesito ver cuántas personas se inscriben cada mes”
- `servicio-limpieza-alfombras`: **communication** «aviso de retraso de tareas» ← “el sistema avise cuando un trabajo se atrasa”
- `centro-entrenamiento-perros`: **database** «registro de clases y progresos» ← “Quiero llevar el control de las clases de cada animal y sus progresos”; **payments** «cobro de sesiones mensuales» ← “que los dueños paguen las sesiones mensuales”; **auth** «control de acceso por roles y grupos» ← “solo el entrenador asignado vea la información de su grupo”
- `servicio-instalacion-cerraduras`: **payments** «procesamiento de cobros a clientes» ← “controlar que cada instalación quede bien hecha antes de cobrar”; **communication** «envío de mensajes de aviso» ← “el cliente reciba un mensaje cuando el técnico está en camino”
- `taller-orfebreria-plata`: **database** «control de inventario de materiales» ← “Quiero controlar el inventario de metales preciosos que uso en cada pieza.”; **payments** «cobros y pagos en linea» ← “los clientes puedan pagar el anticipo en línea”
- `productora-quesos-frescos`: **auth** «control de acceso por roles y areas» ← “que cada empleado de la planta vea solo las tareas de su área”; **analytics** «control de temperatura en cámaras» ← “controlar la temperatura de las cámaras de maduración”
- `escuela-cocina-vegetariana`: **database** «registro de talleres y alumnos» ← “Quiero manejar los cupos de cada taller y las inscripciones. También necesito llevar el historial de recetas que cada alumno ha practicado”; **auth** «control de acceso por roles» ← “solo el profesor del grupo vea las evaluaciones”
- `distribuidora-vinos-locales`: **communication** «envío de notificaciones de alertas de consumo» ← “el sistema avise cuando un restaurante pide más de lo habitual”
- `fabrica-velas-aromaticas-naturales`: **storage** «almacenamiento de archivos multimedia» ← “las imágenes del catálogo carguen rápido”
- `servicio-pintura-casas-interiores`: **payments** «cobro de anticipos en linea» ← “que se cobre el anticipo antes de empezar”
- `taller-tapiceria-muebles`: **database** «registro de inventario y costos» ← “llevar el registro de las telas usadas en cada trabajo y los costos”; **communication** «envio de avisos de estado» ← “el cliente reciba un aviso cuando su mueble esté listo”
- `servicio-jardineria-mantenimiento`: **database** «almacenamiento y consulta de pedidos de servicios» ← “Quiero llevar los pedidos de poda y riego de cada cliente.”; **automation** «flujo de aprobación de solicitudes de trabajo» ← “necesito que una solicitud de trabajo extra pase por aprobación del supervisor”; **payments** «cobro recurrente al final del mes» ← “que se cobre al final del mes”
- `taller-reparacion-electrodomesticos-pequenos`: **communication** «envío de notificaciones a clientes» ← “el cliente reciba un mensaje cuando esté listo para recoger”
- `centro-pilates-grupal`: **database** «gestión y consulta de asistencia» ← “controlar la asistencia de cada alumno”; **auth** «control de acceso por roles» ← “solo el instructor del grupo vea las notas de progreso”
- `servicio-limpieza-oficinas-diaria`: **auth** «control de acceso basado en zonas» ← “Necesito que cada supervisor vea solo los edificios de su zona”; **communication** «envio de alertas automaticas por retrasos» ← “el sistema avise si un equipo no marca la entrada a tiempo”
- `taller-pintura-automotriz-chica`: **database** «control de inventario de insumos» ← “Quiero controlar el inventario de pinturas y diluyentes que uso”; **payments** «cobros y anticipos en línea» ← “que el cliente pague el anticipo en línea”
- `escuela-circo-infantil`: **database** «registro de grupos y asistencia» ← “Quiero manejar los grupos por edad y nivel. También necesito controlar la asistencia a cada clase”; **payments** «cobros y pagos en linea» ← “que los padres puedan pagar la mensualidad desde su casa”
