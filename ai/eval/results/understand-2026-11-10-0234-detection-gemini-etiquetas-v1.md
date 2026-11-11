# Evaluación del paso de entender

Re-puntuado con `--rescore` el 2026-11-11: respuestas del modelo guardadas en `understand-2026-11-10-0234-detection-gemini.json`, etiquetas actuales de los casos. 25 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | — |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 79% |
| Cobertura de necesidades | 93% |
| Necesidades inventadas | 6 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 76% |
| Válida al primer intento | 99% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/75 |
| Evidencia literal | 99% |
| Consultas de 3 a 8 palabras | 99% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 2.5 s |
| Tokens de entrada (mediana) | 2165 |
| Tokens de salida (mediana) | 173 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 25 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 6/6 · 6/6 · 6/6 | 0 · 0 · 0 |
| auth | 11/11 · 11/11 · 11/11 | 0 · 0 · 0 |
| automation | 1/4 · 1/4 · 2/4 | 0 · 0 · 0 |
| cms | 5/5 · 5/5 · 5/5 | 0 · 0 · 0 |
| communication | 16/16 · 16/16 · 16/16 | 1 · 1 · 1 |
| data-processing | 1/1 · 0/1 · 1/1 | 0 · 0 · 0 |
| database | 12/14 · 11/14 · 12/14 | 0 · 0 · 0 |
| messaging | 0/0 · 0/0 · 0/0 | 1 · 1 · 0 |
| payments | 14/14 · 14/14 · 14/14 | 0 · 1 · 0 |
| search | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| storage | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| **Todas** | 69/74 · 67/74 · 70/74 | 2 · 3 · 1 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `cafeteria-de-barrio` | analytics, database, payments | ✅✅✅ |
| `mantenimiento-aires-acondicionados` | automation, communication, database | ❌❌❌ +messaging −automation |
| `centro-formacion-oficios` | auth, database, payments | ✅✅✅ |
| `tienda-productos-regionales` | analytics, cms | ✅✅✅ |
| `fumigacion-agricola` | analytics, communication, database | ✅✅✅ |
| `escuela-cocina-presencial` | analytics, database, payments | ❌❌❌ −database |
| `reparacion-calzado` | communication, payments | ✅✅✅ |
| `excursiones-pesca-artesanal` | auth, communication, payments | ✅✅✅ |
| `estudio-tatuajes` | auth, communication, payments | ✅✅✅ |
| `escuela-surf` | auth, communication, payments | ✅✅✅ |
| `organizacion-bodas` | cms, communication, payments | ✅✅✅ |
| `club-lectura-presencial` | auth, cms, communication | ✅✅✅ |
| `hostal-familiar` | auth, cms, communication, payments | ✅✅✅ |
| `limpieza-fachadas` | automation, communication, payments | ✅❌✅ −automation |
| `cuidado-mascotas-domicilio` | auth, communication, payments | ✅✅✅ |
| `agencia-traduccion` | auth, communication, payments | ✅✅✅ |
| `optica-familiar` | auth, communication, database | ✅✅✅ |
| `taller-bicicletas` | automation, database, search | ❌❌❌ +communication −automation |
| `distribuidora-productos-aseo` | analytics, database, payments | ✅✅✅ |
| `centro-refuerzo-escolar` | auth, communication, database | ✅❌✅ +payments |
| `frutas-deshidratadas` | communication, data-processing, database | ❌❌❌ −data-processing −database |
| `tienda-instrumentos-musicales` | database, payments, search | ✅✅✅ |
| `instalacion-paneles-solares` | auth, database, storage | ✅✅✅ |
| `galeria-arte-local` | analytics, cms, database | ✅❌✅ −database |
| `taller-maquinas-coser` | automation, communication, database | ❌✅✅ −automation |

## Para revisar a mano (corrida 1)

### gemini

- `cafeteria-de-barrio`: **analytics** «analitica de ventas por producto» ← “Quiero conocer las ventas por producto y por día para decidir qué preparar.”; **database** «almacenamiento de historial de clientes» ← “necesito conservar el historial de mis clientes frecuentes y sus compras”; **payments** «procesamiento de pagos digitales» ← “recibir pagos sin depender únicamente del efectivo”
- `mantenimiento-aires-acondicionados`: **database** «almacenamiento de registros de clientes y servicios» ← “conservar los datos de cada cliente, los equipos que tiene y las visitas de mantenimiento que hemos realizado”; **messaging** «programacion de tareas y recordatorios automaticos» ← “el sistema recuerde cuándo corresponde una nueva visita”; **communication** «envio de notificaciones a clientes y personal» ← “avise tanto al cliente como al técnico encargado”
- `centro-formacion-oficios`: **database** «almacenamiento y consulta de registros de estudiantes» ← “Quiero tener organizada la información de los estudiantes, sus inscripciones y los cursos que están realizando.”; **auth** «autenticación de usuarios y control de accesos» ← “Necesito que cada estudiante pueda ingresar a su cuenta y que los instructores solo puedan consultar la información que necesitan.”; **payments** «procesamiento de pagos en línea para matrículas» ← “También quiero recibir los pagos de las matrículas por internet.”
- `tienda-productos-regionales`: **analytics** «analitica de ventas y compradores» ← “Quiero saber qué productos tienen más salida y de qué lugares vienen la mayoría de mis compradores.”; **cms** «gestion de contenido para catalogos» ← “También necesito que la información de los productos, sus descripciones y sus fotografías se pueda actualizar fácilmente sin tener que pedirle ayuda a un programador.”
- `fumigacion-agricola`: **database** «almacenamiento de historiales de servicios y contactos» ← “Quiero tener el historial de los servicios realizados en cada finca y los datos de contacto de sus responsables.”; **analytics** «analisis comparativo de costos y resultados por zona» ← “comparar los costos y los resultados de los trabajos por zona para saber dónde estamos ofreciendo el servicio con mayor frecuencia.”; **communication** «envio de avisos previos de visitas» ← “Necesito que los clientes reciban un aviso antes de la fecha de su próxima visita.”
- `escuela-cocina-presencial`: **payments** «procesamiento de pagos en línea» ← “Los estudiantes deberían poder pagar sus matrículas en línea.”; **analytics** «analítica de datos de negocio» ← “conocer cuántas personas terminan los cursos y cuáles tienen mayor demanda para decidir qué talleres ofrecer”
- `reparacion-calzado`: **communication** «envío de mensajes y chat de atención» ← “Quiero que mis clientes reciban un mensaje cuando su artículo esté listo para recoger y que puedan consultarme cualquier duda por un canal de comunicación.”; **payments** «procesamiento de pagos en línea» ← “También necesito recibir anticipos y pagos completos sin tener que manejar todo en efectivo.”
- `excursiones-pesca-artesanal`: **payments** «pasarela de pagos en linea» ← “que las personas puedan pagar su reserva por internet”; **auth** «gestion de cuentas y roles» ← “que los guias tengan una cuenta propia para consultar las salidas que tienen asignadas”; **communication** «envio de mensajes informativos» ← “enviar a los participantes un mensaje con la informacion de su excursion”
- `estudio-tatuajes`: **auth** «gestion de identidad y control de acceso» ← “cada artista pueda ingresar con su propia cuenta y que tenga acceso únicamente a sus compromisos de trabajo”; **payments** «procesamiento de pagos y cobro de reservas» ← “los clientes puedan pagar una parte del servicio para confirmar su reserva”; **communication** «envio de correos transaccionales» ← “reciban un correo con las indicaciones generales antes de su visita”
- `escuela-surf`: **auth** «gestion de identidad con roles y permisos» ← “Quiero que los instructores puedan ingresar a su espacio de trabajo con permisos distintos a los de los administradores.”; **communication** «envio de notificaciones por cambios de horario» ← “enviar avisos cuando una clase se cambie por condiciones del clima”; **payments** «pasarela de pagos en linea» ← “ofrecer a los estudiantes la posibilidad de pagar sus clases por internet”
- `organizacion-bodas`: **cms** «gestion de contenido web personalizable» ← “Quiero poder cambiar personalmente los textos, fotografías y ejemplos de eventos que aparecen en nuestra página, sin depender de otra persona cada vez que tengamos algo nuevo que mostrar.”; **communication** «envio de correos transaccionales» ← “También necesito comunicarme con los clientes por correo”; **payments** «procesamiento de pagos en linea» ← “ofrecerles una forma de pagar anticipos para separar la fecha.”
- `club-lectura-presencial`: **auth** «gestion de identidad y acceso de usuarios» ← “Quiero que los miembros tengan una cuenta”; **cms** «gestion de contenido editorial y multimedia» ← “publicar novedades, reseñas y fotografías de los encuentros sin tener que pedir ayuda técnica”; **communication** «envio de notificaciones y avisos masivos» ← “enviar avisos cuando se anuncie una nueva actividad”
- `hostal-familiar`: **payments** «pasarela para pagos en linea» ← “realizar pagos en línea”; **auth** «gestion de cuentas y permisos» ← “el personal tenga cuentas con permisos diferentes según sus responsabilidades”; **cms** «gestion de contenidos del sitio» ← “actualizar por mi cuenta la información del alojamiento, las fotografías y las recomendaciones para los visitantes”; **communication** «envio de correos transaccionales» ← “los huéspedes recibieran una confirmación por correo después de hacer una reserva”
- `limpieza-fachadas`: **communication** «envío de avisos y notificaciones a clientes» ← “enviar avisos a los clientes cuando tengamos que cambiar la fecha de una visita”; **payments** «cobros y pagos de servicios» ← “recibir pagos por los servicios contratados”; **automation** «automatización de distribución de tareas por zonas» ← “las solicitudes de servicio se distribuyan automáticamente entre los supervisores según la zona donde trabajen”
- `cuidado-mascotas-domicilio`: **auth** «gestion de cuentas y permisos de usuarios» ← “Quiero que cada cuidador tenga una cuenta para consultar únicamente los servicios que tiene asignados.”; **communication** «envio de mensajes a clientes» ← “Necesito que los dueños de las mascotas reciban mensajes cuando el cuidador llegue y cuando termine la visita.”; **payments** «procesamiento de pagos en linea» ← “También quiero que puedan pagar los servicios sin tener que entregar dinero en efectivo.”
- `agencia-traduccion`: **auth** «gestion de cuentas de usuarios» ← “cada traductor pueda ingresar a su cuenta”; **communication** «recepcion de correos electronicos y envio de notificaciones» ← “los clientes puedan solicitar cambios o hacer preguntas por correo y que reciban una notificación cuando su trabajo esté terminado”; **payments** «cobros en linea por internet» ← “cobrar los servicios por internet”
- `optica-familiar`: **database** «almacenamiento de registros y datos estructurados» ← “Quiero llevar un registro de clientes, fórmulas, compras y el estado de cada pedido”; **auth** «control de acceso y roles de usuario» ← “necesito que los vendedores ingresen con su propia cuenta y que yo pueda limitar quién modifica precios o elimina registros”; **communication** «envío de notificaciones a clientes» ← “Cuando un pedido esté listo, quisiera avisarle al cliente sin tener que llamar uno por uno”
- `taller-bicicletas`: **database** «almacenamiento de historial de reparaciones» ← “conservar el historial de cada bicicleta, los trabajos realizados y las piezas usadas”; **search** «búsqueda rápida de registros por texto» ← “encuentre rápido una reparación anterior cuando busque por el nombre del cliente o por el número del marco”; **communication** «envío de recordatorios periódicos» ← “se creen recordatorios de revisión cuando una bicicleta lleve varios meses sin volver”
- `distribuidora-productos-aseo`: **database** «almacenamiento de datos transaccionales» ← “Quiero registrar cada venta, cliente, producto y cantidad disponible para saber qué tenemos y cuánto debemos reponer.”; **analytics** «analítica de ventas y clientes» ← “Me interesa ver cuáles productos se venden más por mes y qué clientes han reducido sus pedidos.”; **payments** «cobro de facturas en línea» ← “necesito que los clientes puedan pagar sus facturas pendientes por internet.”
- `centro-refuerzo-escolar`: **database** «almacenamiento y consulta de registros académicos» ← “mantener el historial de matrículas, horarios, asistencia y pagos de cada estudiante”; **auth** «autenticación de usuarios con control de acceso por roles» ← “Los acudientes y profesores deben entrar con cuentas diferentes, y cada grupo solo debería ver la información que le corresponde”; **communication** «envío de notificaciones a usuarios» ← “enviar avisos a las familias cuando cambie un horario o se acerque una evaluación”
- `frutas-deshidratadas`: **communication** «envio de confirmacion y despacho» ← “enviar a cada comercio una confirmación del pedido y un aviso cuando salga el despacho”; **data-processing** «calculo de consumo de materiales» ← “calcular cuánto material se consume y cuánto producto terminado queda después de cada jornada”
- `tienda-instrumentos-musicales`: **database** «registro y consulta de datos estructurados» ← “llevar un registro de existencias, proveedores, compras y ventas para saber qué hay disponible”; **search** «búsqueda avanzada por filtros y características» ← “encontrar artículos por tipo, rango de precio o características, aunque no escriban el nombre exacto”; **payments** «procesamiento de pagos electrónicos en línea» ← “aceptar pagos en línea para los pedidos que hacemos por encargo”
- `instalacion-paneles-solares`: **database** «almacenamiento de datos estructurados de clientes y proyectos» ← “Quiero guardar los datos de cada cliente, la dirección, los equipos instalados, las visitas y el historial de mantenimiento.”; **auth** «control de acceso basado en roles y permisos» ← “que solo el personal administrativo vea los costos y los datos de facturación”; **storage** «almacenamiento de archivos y documentos de proyectos» ← “guardar fotos de la instalación y documentos de garantía asociados a cada proyecto”
- `galeria-arte-local`: **database** «almacenamiento de catálogo de obras y movimientos» ← “mantener un catálogo de obras con sus autores, medidas, precios, disponibilidad y movimientos cuando una pieza se presta o se vende”; **cms** «gestión de contenido editable sin código» ← “editar por mi cuenta los textos y las imágenes que aparecen en la página de la galería, sin pedir ayuda cada vez”; **analytics** «analítica de consultas y ventas» ← “conocer qué obras reciben más consultas y cuáles terminan en venta”
- `taller-maquinas-coser`: **database** «almacenamiento y consulta de registros» ← “Quiero registrar los clientes, los equipos que recibimos, los diagnósticos, las cotizaciones y las reparaciones realizadas para consultar después cada caso.”; **communication** «envío de notificaciones a clientes» ← “También necesito mandar mensajes al cliente para informarle cuando el equipo esté listo o cuando debamos esperar una pieza.”
