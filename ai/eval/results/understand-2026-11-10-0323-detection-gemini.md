# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-10 a las 03:23. 25 casos × 3 corridas por proveedor; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 2.2 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 76% |
| Cobertura de necesidades | 94% |
| Necesidades inventadas | 11 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 84% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/75 |
| Evidencia literal | 99% |
| Consultas de 3 a 8 palabras | 99% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.5 s |
| Tokens de entrada (mediana) | 2270 |
| Tokens de salida (mediana) | 179 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 25 casos; los porcentajes no son estadística firme.

## Por caso

Una marca por corrida: ✅ exacto · ❌ no exacto · ⚠️ error del proveedor. `+x` = detectó x sin que se esperara; `−x` = faltó x en alguna corrida.

| Caso | Esperado | gemini |
|---|---|---|
| `cafeteria-de-barrio` | analytics, database, payments | ✅✅✅ |
| `mantenimiento-aires-acondicionados` | automation, communication, database | ❌❌❌ +messaging −automation |
| `centro-formacion-oficios` | auth, database, payments | ✅✅✅ |
| `tienda-productos-regionales` | analytics, cms | ✅✅✅ |
| `fumigacion-agricola` | analytics, communication, database | ✅✅✅ |
| `escuela-cocina-presencial` | analytics, database, payments | ✅✅✅ |
| `reparacion-calzado` | communication, payments | ✅✅✅ |
| `excursiones-pesca-artesanal` | auth, communication, payments | ❌✅❌ −auth |
| `estudio-tatuajes` | auth, communication, payments | ✅✅✅ |
| `escuela-surf` | auth, communication, payments | ✅✅✅ |
| `organizacion-bodas` | cms, communication, payments | ✅✅✅ |
| `club-lectura-presencial` | auth, cms, communication | ✅✅✅ |
| `hostal-familiar` | auth, cms, communication, payments | ✅✅✅ |
| `limpieza-fachadas` | automation, communication, payments | ❌❌❌ −automation |
| `cuidado-mascotas-domicilio` | auth, communication, payments | ✅✅✅ |
| `agencia-traduccion` | auth, communication, payments | ❌❌❌ +database |
| `optica-familiar` | auth, communication, database | ✅✅✅ |
| `taller-bicicletas` | automation, database, search | ❌❌❌ +communication −automation |
| `distribuidora-productos-aseo` | analytics, database, payments | ✅✅✅ |
| `centro-refuerzo-escolar` | auth, communication, database | ❌❌✅ +payments |
| `frutas-deshidratadas` | communication, data-processing, database | ✅✅✅ |
| `tienda-instrumentos-musicales` | database, payments, search | ✅✅✅ |
| `instalacion-paneles-solares` | auth, database, storage | ✅✅✅ |
| `galeria-arte-local` | analytics, cms, database | ✅✅✅ |
| `taller-maquinas-coser` | automation, communication, database | ❌✅❌ +messaging −automation |

## Para revisar a mano (corrida 1)

### gemini

- `cafeteria-de-barrio`: **analytics** «análisis de ventas por producto y día» ← “Quiero conocer las ventas por producto y por día para decidir qué preparar.”; **database** «almacenamiento de historial de clientes y compras» ← “conservar el historial de mis clientes frecuentes y sus compras”; **payments** «procesamiento de pagos electrónicos» ← “recibir pagos sin depender únicamente del efectivo.”
- `mantenimiento-aires-acondicionados`: **database** «almacenamiento y consulta de registros» ← “conservar los datos de cada cliente, los equipos que tiene y las visitas de mantenimiento que hemos realizado”; **communication** «envío de avisos y notificaciones» ← “avise tanto al cliente como al técnico encargado”
- `centro-formacion-oficios`: **database** «almacenamiento de estudiantes y cursos» ← “organizada la información de los estudiantes, sus inscripciones y los cursos”; **auth** «autenticación y control de accesos» ← “cada estudiante pueda ingresar a su cuenta y que los instructores solo puedan consultar la información que necesitan”; **payments** «procesamiento de pagos en línea» ← “recibir los pagos de las matrículas por internet”
- `tienda-productos-regionales`: **analytics** «analisis de ventas y procedencia de compradores» ← “Quiero saber qué productos tienen más salida y de qué lugares vienen la mayoría de mis compradores.”; **cms** «gestion de contenido para catalogo de productos» ← “necesito que la información de los productos, sus descripciones y sus fotografías se pueda actualizar fácilmente sin tener que pedirle ayuda a un programador.”
- `fumigacion-agricola`: **database** «almacenamiento y consulta de registros históricos» ← “Quiero tener el historial de los servicios realizados en cada finca y los datos de contacto de sus responsables.”; **analytics** «analítica de costos y frecuencia geográfica» ← “comparar los costos y los resultados de los trabajos por zona para saber dónde estamos ofreciendo el servicio con mayor frecuencia.”; **communication** «envío de notificaciones programadas a clientes» ← “Necesito que los clientes reciban un aviso antes de la fecha de su próxima visita.”
- `escuela-cocina-presencial`: **database** «almacenamiento de registros de estudiantes y cursos» ← “organizar las inscripciones, la asistencia y el historial de cada estudiante”; **analytics** «analítica de datos y reportes de negocio» ← “conocer cuántas personas terminan los cursos y cuáles tienen mayor demanda”; **payments** «procesamiento de pagos en línea» ← “pagar sus matrículas en línea”
- `reparacion-calzado`: **communication** «envio de notificaciones y chat con clientes» ← “Quiero que mis clientes reciban un mensaje cuando su articulo este listo para recoger y que puedan consultarme cualquier duda por un canal de comunicacion.”; **payments** «procesamiento de pagos y anticipos en linea» ← “Tambien necesito recibir anticipos y pagos completos sin tener que manejar todo en efectivo.”
- `excursiones-pesca-artesanal`: **payments** «cobro de reservas en linea» ← “que las personas puedan pagar su reserva por internet”; **communication** «envio de mensajes informativos» ← “enviar a los participantes un mensaje con la información de su excursión antes de cada salida”
- `estudio-tatuajes`: **auth** «gestión de cuentas y permisos» ← “cada artista pueda ingresar con su propia cuenta y que tenga acceso únicamente a sus compromisos de trabajo”; **payments** «cobro de anticipos en línea» ← “los clientes puedan pagar una parte del servicio para confirmar su reserva”; **communication** «envío de correos transaccionales» ← “reciban un correo con las indicaciones generales antes de su visita”
- `escuela-surf`: **auth** «gestion de usuarios y permisos diferenciados» ← “los instructores puedan ingresar a su espacio de trabajo con permisos distintos a los de los administradores”; **communication** «envio de notificaciones por cambios» ← “enviar avisos cuando una clase se cambie por condiciones del clima”; **payments** «procesamiento de pagos en linea» ← “ofrecer a los estudiantes la posibilidad de pagar sus clases por internet”
- `organizacion-bodas`: **cms** «gestión de contenido web autogestionable» ← “Quiero poder cambiar personalmente los textos, fotografías y ejemplos de eventos que aparecen en nuestra página, sin depender de otra persona cada vez que tengamos algo nuevo que mostrar.”; **communication** «envío de correos electrónicos transaccionales» ← “También necesito comunicarme con los clientes por correo”; **payments** «procesamiento de pagos y anticipos en línea» ← “ofrecerles una forma de pagar anticipos para separar la fecha.”
- `club-lectura-presencial`: **auth** «gestion de cuentas y permisos de usuarios» ← “quiero que los miembros tengan una cuenta para consultar las actividades a las que están invitados y que los coordinadores puedan gestionar sus propios grupos”; **cms** «gestion de contenido editorial y multimedia» ← “publicar novedades, reseñas y fotografías de los encuentros sin tener que pedir ayuda técnica”; **communication** «envio de avisos y notificaciones a personas» ← “quiero enviar avisos cuando se anuncie una nueva actividad”
- `hostal-familiar`: **payments** «pagos en linea» ← “que los huéspedes puedan realizar pagos en línea”; **auth** «control de acceso y permisos» ← “que el personal tenga cuentas con permisos diferentes según sus responsabilidades”; **cms** «gestion de contenido web» ← “actualizar por mi cuenta la información del alojamiento, las fotografías y las recomendaciones para los visitantes”; **communication** «envio de correos transaccionales» ← “que los huéspedes recibieran una confirmación por correo después de hacer una reserva”
- `limpieza-fachadas`: **communication** «envío de avisos y notificaciones a clientes» ← “enviar avisos a los clientes cuando tengamos que cambiar la fecha de una visita”; **payments** «procesamiento de pagos por servicios» ← “recibir pagos por los servicios contratados”
- `cuidado-mascotas-domicilio`: **auth** «gestion de cuentas y permisos de usuarios» ← “cada cuidador tenga una cuenta para consultar únicamente los servicios que tiene asignados”; **communication** «envio de mensajes a clientes» ← “los dueños de las mascotas reciban mensajes cuando el cuidador llegue y cuando termine la visita”; **payments** «pasarela de pagos en linea» ← “pagar los servicios sin tener que entregar dinero en efectivo”
- `agencia-traduccion`: **auth** «gestión de cuentas e inicio de sesión» ← “cada traductor pueda ingresar a su cuenta”; **database** «almacenamiento de encargos asignados» ← “consultar únicamente los encargos que tiene asignados”; **communication** «recepción y envío de correos electrónicos» ← “los clientes puedan solicitar cambios o hacer preguntas por correo y que reciban una notificación”; **payments** «cobros y pagos por internet» ← “cobrar los servicios por internet”
- `optica-familiar`: **database** «registro y consulta de datos» ← “Quiero llevar un registro de clientes, fórmulas, compras y el estado de cada pedido”; **auth** «control de acceso y roles» ← “necesito que los vendedores ingresen con su propia cuenta y que yo pueda limitar quién modifica precios o elimina registros”; **communication** «envío de notificaciones a clientes» ← “quisiera avisarle al cliente sin tener que llamar uno por uno”
- `taller-bicicletas`: **database** «almacenamiento y consulta de historiales» ← “conservar el historial de cada bicicleta, los trabajos realizados y las piezas usadas”; **search** «busqueda de texto en registros» ← “encuentre rápido una reparación anterior cuando busque por el nombre del cliente o por el número del marco”; **communication** «envio de recordatorios periodicos» ← “se creen recordatorios de revisión cuando una bicicleta lleve varios meses sin volver”
- `distribuidora-productos-aseo`: **database** «almacenamiento y consulta de datos transaccionales» ← “Quiero registrar cada venta, cliente, producto y cantidad disponible para saber qué tenemos y cuánto debemos reponer.”; **analytics** «analítica de ventas y comportamiento de clientes» ← “Me interesa ver cuáles productos se venden más por mes y qué clientes han reducido sus pedidos.”; **payments** «procesamiento de pagos en línea» ← “necesito que los clientes puedan pagar sus facturas pendientes por internet.”
- `centro-refuerzo-escolar`: **database** «almacenamiento de historiales y registros escolares» ← “Quiero mantener el historial de matrículas, horarios, asistencia y pagos de cada estudiante.”; **payments** «registro y control de pagos» ← “pagos de cada estudiante”; **auth** «control de acceso por roles de usuario» ← “Los acudientes y profesores deben entrar con cuentas diferentes, y cada grupo solo debería ver la información que le corresponde.”; **communication** «envío de notificaciones a usuarios» ← “También quiero enviar avisos a las familias cuando cambie un horario o se acerque una evaluación.”
- `frutas-deshidratadas`: **database** «registro y consulta de datos del negocio» ← “Quiero registrar las compras de materia prima, los lotes de producción, las cantidades empacadas y los pedidos de cada comercio.”; **data-processing** «cálculo de consumo y stock» ← “calcular cuánto material se consume y cuánto producto terminado queda después de cada jornada”; **communication** «envío de avisos y confirmaciones» ← “enviar a cada comercio una confirmación del pedido y un aviso cuando salga el despacho”
- `tienda-instrumentos-musicales`: **database** «registro de inventario y ventas» ← “Quiero llevar un registro de existencias, proveedores, compras y ventas para saber qué hay disponible.”; **search** «búsqueda de productos por filtros» ← “Mis clientes deberían poder encontrar artículos por tipo, rango de precio o características, aunque no escriban el nombre exacto.”; **payments** «procesamiento de pagos en línea» ← “También quiero aceptar pagos en línea para los pedidos que hacemos por encargo.”
- `instalacion-paneles-solares`: **database** «almacenamiento de datos de clientes y servicios» ← “Quiero guardar los datos de cada cliente, la dirección, los equipos instalados, las visitas y el historial de mantenimiento.”; **auth** «control de acceso basado en roles» ← “que solo el personal administrativo vea los costos y los datos de facturación”; **storage** «almacenamiento de archivos multimedia y documentos» ← “guardar fotos de la instalación y documentos de garantía asociados a cada proyecto”
- `galeria-arte-local`: **database** «gestión y consulta de catálogo y movimientos» ← “mantener un catálogo de obras con sus autores, medidas, precios, disponibilidad y movimientos cuando una pieza se presta o se vende”; **cms** «gestión de contenidos editables» ← “editar por mi cuenta los textos y las imágenes que aparecen en la página de la galería”; **analytics** «analítica de consultas y ventas» ← “conocer qué obras reciben más consultas y cuáles terminan en venta”
- `taller-maquinas-coser`: **database** «almacenamiento y consulta de registros» ← “Quiero registrar los clientes, los equipos que recibimos, los diagnósticos, las cotizaciones y las reparaciones realizadas para consultar después cada caso.”; **messaging** «generación y asignación automática de tareas» ← “Cuando un cliente acepte una cotización, quisiera que se genere automáticamente la orden de trabajo y se asigne al técnico disponible.”; **communication** «envío de notificaciones a clientes» ← “También necesito mandar mensajes al cliente para informarle cuando el equipo esté listo o cuando debamos esperar una pieza.”
