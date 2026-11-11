# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 05:36. 25 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.0 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 81% |
| Cobertura de necesidades | 92% |
| Necesidades inventadas | 8 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 92% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/75 |
| Evidencia literal | 98% |
| Consultas de 3 a 8 palabras | 99% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.7 s |
| Tokens de entrada (mediana) | 2165 |
| Tokens de salida (mediana) | 172 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 25 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 6/6 · 6/6 · 5/6 | 0 · 0 · 0 |
| auth | 11/11 · 11/11 · 11/11 | 0 · 0 · 0 |
| automation | 2/4 · 1/4 · 1/4 | 0 · 0 · 0 |
| cms | 5/5 · 5/5 · 5/5 | 0 · 0 · 0 |
| communication | 16/16 · 16/16 · 16/16 | 1 · 1 · 1 |
| data-processing | 0/1 · 0/1 · 0/1 | 0 · 0 · 0 |
| database | 12/14 · 12/14 · 12/14 | 0 · 0 · 0 |
| messaging | 0/0 · 0/0 · 0/0 | 1 · 2 · 2 |
| payments | 14/14 · 14/14 · 14/14 | 0 · 0 · 0 |
| search | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| storage | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| **Todas** | 69/74 · 68/74 · 67/74 | 2 · 3 · 3 |

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `cafeteria-de-barrio` | analytics, database, payments | ✅✅✅ |
| `mantenimiento-aires-acondicionados` | automation, communication, database | ❌❌❌ +messaging −automation |
| `centro-formacion-oficios` | auth, database, payments | ✅✅✅ |
| `tienda-productos-regionales` | analytics, cms | ✅✅✅ |
| `fumigacion-agricola` | analytics, communication, database | ✅✅✅ |
| `escuela-cocina-presencial` | analytics, database, payments | ❌❌❌ −analytics −database |
| `reparacion-calzado` | communication, payments | ✅✅✅ |
| `excursiones-pesca-artesanal` | auth, communication, payments | ✅✅✅ |
| `estudio-tatuajes` | auth, communication, payments | ✅✅✅ |
| `escuela-surf` | auth, communication, payments | ✅✅✅ |
| `organizacion-bodas` | cms, communication, payments | ✅✅✅ |
| `club-lectura-presencial` | auth, cms, communication | ✅✅✅ |
| `hostal-familiar` | auth, cms, communication, payments | ✅✅✅ |
| `limpieza-fachadas` | automation, communication, payments | ✅✅✅ |
| `cuidado-mascotas-domicilio` | auth, communication, payments | ✅✅✅ |
| `agencia-traduccion` | auth, communication, payments | ✅✅✅ |
| `optica-familiar` | auth, communication, database | ✅✅✅ |
| `taller-bicicletas` | automation, database, search | ❌❌❌ +communication −automation |
| `distribuidora-productos-aseo` | analytics, database, payments | ✅✅✅ |
| `centro-refuerzo-escolar` | auth, communication, database | ✅✅✅ |
| `frutas-deshidratadas` | communication, data-processing, database | ❌❌❌ −data-processing −database |
| `tienda-instrumentos-musicales` | database, payments, search | ✅✅✅ |
| `instalacion-paneles-solares` | auth, database, storage | ✅✅✅ |
| `galeria-arte-local` | analytics, cms, database | ✅✅✅ |
| `taller-maquinas-coser` | automation, communication, database | ✅❌❌ +messaging −automation |

## Para revisar a mano (corrida 1)

### gemini

- `cafeteria-de-barrio`: **analytics** «analisis de ventas por producto» ← “Quiero conocer las ventas por producto y por día”; **database** «almacenamiento de historiales de clientes» ← “necesito conservar el historial de mis clientes frecuentes y sus compras”; **payments** «procesamiento de pagos digitales» ← “recibir pagos sin depender únicamente del efectivo”
- `mantenimiento-aires-acondicionados`: **database** «almacenamiento de datos de clientes» ← “Quiero conservar los datos de cada cliente, los equipos que tiene y las visitas de mantenimiento que hemos realizado.”; **messaging** «programacion de tareas periodicas» ← “Necesito que el sistema recuerde cuándo corresponde una nueva visita”; **communication** «envio de notificaciones a clientes» ← “avise tanto al cliente como al técnico encargado”
- `centro-formacion-oficios`: **database** «almacenamiento y gestión de información estructurada» ← “organizada la información de los estudiantes, sus inscripciones y los cursos que están realizando”; **auth** «autenticación y control de accesos de usuarios» ← “cada estudiante pueda ingresar a su cuenta y que los instructores solo puedan consultar la información que necesitan”; **payments** «procesamiento de pagos en línea» ← “recibir los pagos de las matrículas por internet”
- `tienda-productos-regionales`: **analytics** «analisis de ventas y compradores» ← “Quiero saber qué productos tienen más salida y de qué lugares vienen la mayoría de mis compradores.”; **cms** «gestion de contenidos para productos» ← “necesito que la información de los productos, sus descripciones y sus fotografías se pueda actualizar fácilmente sin tener que pedirle ayuda a un programador.”
- `fumigacion-agricola`: **database** «almacenamiento y consulta de historiales y contactos» ← “historial de los servicios realizados en cada finca y los datos de contacto de sus responsables”; **analytics** «comparación y análisis de costos y resultados» ← “comparar los costos y los resultados de los trabajos por zona para saber dónde estamos ofreciendo el servicio con mayor frecuencia”; **communication** «envío de avisos de próximas visitas» ← “los clientes reciban un aviso antes de la fecha de su próxima visita”
- `escuela-cocina-presencial`: **payments** «cobro de matrículas en línea» ← “Los estudiantes deberían poder pagar sus matrículas en línea.”; **analytics** «analítica de datos del negocio» ← “conocer cuántas personas terminan los cursos y cuáles tienen mayor demanda para decidir qué talleres ofrecer el próximo semestre.”
- `reparacion-calzado`: **communication** «envío de notificaciones y chat» ← “Quiero que mis clientes reciban un mensaje cuando su artículo esté listo para recoger y que puedan consultarme cualquier duda por un canal de comunicación.”; **payments** «procesamiento de pagos y anticipos» ← “También necesito recibir anticipos y pagos completos sin tener que manejar todo en efectivo.”
- `excursiones-pesca-artesanal`: **payments** «pasarela de pagos en linea» ← “que las personas puedan pagar su reserva por internet”; **auth** «gestion de cuentas y roles» ← “que los guías tengan una cuenta propia para consultar las salidas que tienen asignadas”; **communication** «envio de mensajes informativos» ← “enviar a los participantes un mensaje con la información de su excursión antes de cada salida”
- `estudio-tatuajes`: **auth** «gestion de identidad y control de acceso» ← “cada artista pueda ingresar con su propia cuenta y que tenga acceso únicamente a sus compromisos de trabajo”; **payments** «cobros en linea y pasarela de pagos» ← “los clientes puedan pagar una parte del servicio para confirmar su reserva”; **communication** «envio de correos transaccionales» ← “reciban un correo con las indicaciones generales antes de su visita”
- `escuela-surf`: **auth** «gestion de identidad y permisos de usuarios» ← “Quiero que los instructores puedan ingresar a su espacio de trabajo con permisos distintos a los de los administradores.”; **communication** «envio de notificaciones por cambios de estado» ← “enviar avisos cuando una clase se cambie por condiciones del clima”; **payments** «procesamiento de cobros y pagos en linea» ← “ofrecer a los estudiantes la posibilidad de pagar sus clases por internet.”
- `organizacion-bodas`: **cms** «gestion de contenido web editable» ← “Quiero poder cambiar personalmente los textos, fotografías y ejemplos de eventos que aparecen en nuestra página, sin depender de otra persona cada vez que tengamos algo nuevo que mostrar.”; **communication** «envio de correos electronicos» ← “También necesito comunicarme con los clientes por correo”; **payments** «procesamiento de pagos y cobros» ← “ofrecerles una forma de pagar anticipos para separar la fecha.”
- `club-lectura-presencial`: **auth** «gestion de cuentas de usuarios» ← “Quiero que los miembros tengan una cuenta para consultar las actividades a las que están invitados”; **cms** «gestion de contenido editorial» ← “necesito publicar novedades, reseñas y fotografías de los encuentros sin tener que pedir ayuda técnica”; **communication** «envio de notificaciones y avisos» ← “quiero enviar avisos cuando se anuncie una nueva actividad”
- `hostal-familiar`: **payments** «pasarela para pagos en linea» ← “que los huéspedes puedan realizar pagos en línea”; **auth** «gestion de usuarios y permisos» ← “que el personal tenga cuentas con permisos diferentes según sus responsabilidades”; **cms** «gestion de contenido web» ← “actualizar por mi cuenta la información del alojamiento, las fotografías y las recomendaciones para los visitantes”; **communication** «envio de correos transaccionales» ← “que los huéspedes recibieran una confirmación por correo después de hacer una reserva”
- `limpieza-fachadas`: **communication** «envío de avisos y notificaciones a clientes» ← “enviar avisos a los clientes cuando tengamos que cambiar la fecha de una visita”; **payments** «procesamiento y recepción de pagos en línea» ← “recibir pagos por los servicios contratados”; **automation** «automatización en la distribución de tareas» ← “las solicitudes de servicio se distribuyan automáticamente entre los supervisores”
- `cuidado-mascotas-domicilio`: **auth** «gestion de identidad y control de acceso por roles» ← “Quiero que cada cuidador tenga una cuenta para consultar únicamente los servicios que tiene asignados.”; **communication** «envio de notificaciones moviles transaccionales» ← “Necesito que los dueños de las mascotas reciban mensajes cuando el cuidador llegue y cuando termine la visita.”; **payments** «procesamiento de pagos en linea» ← “También quiero que puedan pagar los servicios sin tener que entregar dinero en efectivo.”
- `agencia-traduccion`: **auth** «gestión de cuentas de usuario y permisos» ← “cada traductor pueda ingresar a su cuenta y consultar únicamente los encargos que tiene asignados”; **communication** «envío y recepción de correos y notificaciones» ← “los clientes puedan solicitar cambios o hacer preguntas por correo y que reciban una notificación cuando su trabajo esté terminado”; **payments** «cobros y transacciones en línea» ← “necesito cobrar los servicios por internet”
- `optica-familiar`: **database** «registro de datos de clientes y pedidos» ← “Quiero llevar un registro de clientes, fórmulas, compras y el estado de cada pedido para no perder la información.”; **auth** «autenticación de usuarios y control de permisos» ← “También necesito que los vendedores ingresen con su propia cuenta y que yo pueda limitar quién modifica precios o elimina registros.”; **communication** «envío de notificaciones a clientes» ← “Cuando un pedido esté listo, quisiera avisarle al cliente sin tener que llamar uno por uno.”
- `taller-bicicletas`: **database** «almacenamiento y consulta de historiales» ← “conservar el historial de cada bicicleta, los trabajos realizados y las piezas usadas”; **search** «búsqueda rápida de registros» ← “encuentre rápido una reparación anterior cuando busque por el nombre del cliente o por el número del marco”; **communication** «envío de recordatorios programados» ← “creen recordatorios de revisión cuando una bicicleta lleve varios meses sin volver”
- `distribuidora-productos-aseo`: **database** «registro de inventario y transacciones comerciales» ← “Quiero registrar cada venta, cliente, producto y cantidad disponible para saber qué tenemos y cuánto debemos reponer.”; **analytics** «analítica de ventas y comportamiento de clientes» ← “Me interesa ver cuáles productos se venden más por mes y qué clientes han reducido sus pedidos.”; **payments** «cobro de facturas pendientes en línea» ← “necesito que los clientes puedan pagar sus facturas pendientes por internet.”
- `centro-refuerzo-escolar`: **database** «almacenamiento de historiales y registros escolares» ← “mantener el historial de matrículas, horarios, asistencia y pagos de cada estudiante”; **auth** «control de acceso basado en roles» ← “Los acudientes y profesores deben entrar con cuentas diferentes, y cada grupo solo debería ver la información que le corresponde.”; **communication** «envío de notificaciones y avisos» ← “enviar avisos a las familias cuando cambie un horario o se acerque una evaluación”
- `frutas-deshidratadas`: **communication** «envio de notificaciones de despacho y confirmacion» ← “Quisiera enviar a cada comercio una confirmación del pedido y un aviso cuando salga el despacho.”
- `tienda-instrumentos-musicales`: **database** «registro de inventario y transacciones» ← “Quiero llevar un registro de existencias, proveedores, compras y ventas para saber qué hay disponible.”; **search** «búsqueda avanzada de productos» ← “Mis clientes deberían poder encontrar artículos por tipo, rango de precio o características, aunque no escriban el nombre exacto.”; **payments** «procesamiento de pagos en línea» ← “También quiero aceptar pagos en línea para los pedidos que hacemos por encargo.”
- `instalacion-paneles-solares`: **database** «almacenamiento de datos de clientes y proyectos» ← “Quiero guardar los datos de cada cliente, la dirección, los equipos instalados, las visitas y el historial de mantenimiento.”; **auth** «control de acceso basado en roles» ← “que solo el personal administrativo vea los costos y los datos de facturación”; **storage** «almacenamiento de archivos y documentos» ← “guardar fotos de la instalación y documentos de garantía asociados a cada proyecto”
- `galeria-arte-local`: **database** «almacenamiento de catálogo de obras y precios» ← “mantener un catálogo de obras con sus autores, medidas, precios, disponibilidad y movimientos”; **cms** «gestión de contenidos editables para web» ← “Quiero poder editar por mi cuenta los textos y las imágenes que aparecen en la página de la galería”; **analytics** «analítica de consultas y ventas de productos» ← “conocer qué obras reciben más consultas y cuáles terminan en venta”
- `taller-maquinas-coser`: **database** «almacenamiento y consulta de casos» ← “Quiero registrar los clientes, los equipos que recibimos, los diagnósticos, las cotizaciones y las reparaciones realizadas para consultar después cada caso.”; **automation** «generación automática de órdenes de trabajo» ← “Cuando un cliente acepte una cotización, quisiera que se genere automáticamente la orden de trabajo y se asigne al técnico disponible.”; **communication** «envío de mensajes informativos a clientes» ← “También necesito mandar mensajes al cliente para informarle cuando el equipo esté listo o cuando debamos esperar una pieza.”
