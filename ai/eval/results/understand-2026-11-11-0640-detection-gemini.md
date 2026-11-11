# Evaluación del paso de entender

Generado con `python -m ai.eval.run_understand_eval` el 2026-11-11 a las 06:40. 25 casos × 3 corridas por proveedor; etiquetas versión 1; la llamada de calentamiento no se cuenta.

## Modelos

| Proveedor | Modelo | Razonamiento | Arranque en frío |
|---|---|---|---|
| gemini | `gemini-3.5-flash-lite` | por defecto | 25.7 s |

## Resumen

| Métrica | gemini |
|---|---|
| Casos exactos | 87% |
| Cobertura de necesidades | 95% |
| Necesidades inventadas | 4 |
| Vagos bien tratados | 0/0 |
| Pidió aclaración sin necesidad | 0 |
| Consistencia entre corridas | 92% |
| Válida al primer intento | 100% |
| Válida tras el reintento | 100% |
| Errores del proveedor | 0/75 |
| Evidencia literal | 99% |
| Consultas de 3 a 8 palabras | 99% |
| Tiempo (mediana) | 1.2 s |
| Tiempo (peor caso) | 1.8 s |
| Tokens de entrada (mediana) | 2554 |
| Tokens de salida (mediana) | 176 |
| Esperas (límite de uso o error temporal) | 0.0 s |

Evidencia direccional: 25 casos; los porcentajes no son estadística firme.

## Por categoría

Una cifra por corrida. Detectadas: de las necesidades esperadas de esa categoría. De más: pedidos que no la piden y en los que se detectó. Sin errores del proveedor ni pedidos vagos.

### gemini

| Categoría | Detectadas | De más |
|---|---|---|
| analytics | 6/6 · 6/6 · 6/6 | 0 · 0 · 0 |
| auth | 11/11 · 10/11 · 11/11 | 0 · 0 · 0 |
| automation | 1/4 · 1/4 · 1/4 | 0 · 0 · 0 |
| cms | 5/5 · 5/5 · 5/5 | 0 · 0 · 0 |
| communication | 16/16 · 16/16 · 16/16 | 1 · 1 · 1 |
| data-processing | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| database | 14/14 · 14/14 · 14/14 | 0 · 0 · 0 |
| messaging | 0/0 · 0/0 · 0/0 | 1 · 0 · 0 |
| payments | 14/14 · 14/14 · 14/14 | 0 · 0 · 0 |
| search | 2/2 · 2/2 · 2/2 | 0 · 0 · 0 |
| storage | 1/1 · 1/1 · 1/1 | 0 · 0 · 0 |
| **Todas** | 71/74 · 70/74 · 71/74 | 2 · 1 · 1 |

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
| `excursiones-pesca-artesanal` | auth, communication, payments | ✅❌✅ −auth |
| `estudio-tatuajes` | auth, communication, payments | ✅✅✅ |
| `escuela-surf` | auth, communication, payments | ✅✅✅ |
| `organizacion-bodas` | cms, communication, payments | ✅✅✅ |
| `club-lectura-presencial` | auth, cms, communication | ✅✅✅ |
| `hostal-familiar` | auth, cms, communication, payments | ✅✅✅ |
| `limpieza-fachadas` | automation, communication, payments | ❌❌❌ −automation |
| `cuidado-mascotas-domicilio` | auth, communication, payments | ✅✅✅ |
| `agencia-traduccion` | auth, communication, payments | ✅✅✅ |
| `optica-familiar` | auth, communication, database | ✅✅✅ |
| `taller-bicicletas` | automation, database, search | ❌❌❌ +communication −automation |
| `distribuidora-productos-aseo` | analytics, database, payments | ✅✅✅ |
| `centro-refuerzo-escolar` | auth, communication, database | ✅✅✅ |
| `frutas-deshidratadas` | communication, data-processing, database | ✅✅✅ |
| `tienda-instrumentos-musicales` | database, payments, search | ✅✅✅ |
| `instalacion-paneles-solares` | auth, database, storage | ✅✅✅ |
| `galeria-arte-local` | analytics, cms, database | ✅✅✅ |
| `taller-maquinas-coser` | automation, communication, database | ✅✅✅ |

## Para revisar a mano (corrida 1)

### gemini

- `cafeteria-de-barrio`: **analytics** «analitica de ventas por producto» ← “Quiero conocer las ventas por producto y por día para decidir qué preparar”; **database** «almacenamiento de datos de clientes» ← “También necesito conservar el historial de mis clientes frecuentes y sus compras”; **payments** «procesamiento de pagos digitales» ← “recibir pagos sin depender únicamente del efectivo”
- `mantenimiento-aires-acondicionados`: **database** «almacenamiento de datos de clientes y visitas» ← “Quiero conservar los datos de cada cliente, los equipos que tiene y las visitas de mantenimiento que hemos realizado.”; **messaging** «programación de tareas en segundo plano» ← “Necesito que el sistema recuerde cuándo corresponde una nueva visita”; **communication** «envío de notificaciones y avisos» ← “avise tanto al cliente como al técnico encargado.”
- `centro-formacion-oficios`: **database** «almacenamiento y consulta de estudiantes e inscripciones» ← “Quiero tener organizada la información de los estudiantes, sus inscripciones y los cursos que están realizando.”; **auth** «control de acceso y cuentas de usuario» ← “Necesito que cada estudiante pueda ingresar a su cuenta y que los instructores solo puedan consultar la información que necesitan.”; **payments** «procesamiento de pagos en linea» ← “También quiero recibir los pagos de las matrículas por internet.”
- `tienda-productos-regionales`: **analytics** «analítica de ventas y compradores» ← “Quiero saber qué productos tienen más salida y de qué lugares vienen la mayoría de mis compradores”; **cms** «gestión de contenido y productos» ← “También necesito que la información de los productos, sus descripciones y sus fotografías se pueda actualizar fácilmente sin tener que pedirle ayuda a un programador”
- `fumigacion-agricola`: **database** «almacenamiento y consulta de historial de servicios» ← “Quiero tener el historial de los servicios realizados en cada finca y los datos de contacto de sus responsables.”; **analytics** «analisis comparativo de costos por zona» ← “comparar los costos y los resultados de los trabajos por zona para saber dónde estamos ofreciendo el servicio con mayor frecuencia.”; **communication** «envio de recordatorios programados de visitas» ← “Necesito que los clientes reciban un aviso antes de la fecha de su próxima visita.”
- `escuela-cocina-presencial`: **database** «gestión de registros de estudiantes y asistencia» ← “organizar las inscripciones, la asistencia y el historial de cada estudiante”; **analytics** «analítica de demanda y finalización de cursos» ← “conocer cuántas personas terminan los cursos y cuáles tienen mayor demanda”; **payments** «cobro de matrículas en línea» ← “Los estudiantes deberían poder pagar sus matrículas en línea”
- `reparacion-calzado`: **communication** «envio de mensajes a clientes» ← “Quiero que mis clientes reciban un mensaje cuando su artículo esté listo para recoger y que puedan consultarme cualquier duda por un canal de comunicación.”; **payments** «procesamiento de pagos en linea» ← “También necesito recibir anticipos y pagos completos sin tener que manejar todo en efectivo.”
- `excursiones-pesca-artesanal`: **payments** «cobros y reservas en linea» ← “que las personas puedan pagar su reserva por internet”; **auth** «gestion de usuarios y cuentas» ← “que los guías tengan una cuenta propia para consultar las salidas que tienen asignadas”; **communication** «envio de mensajes informativos» ← “enviar a los participantes un mensaje con la información de su excursión antes de cada salida”
- `estudio-tatuajes`: **auth** «gestión de cuentas y permisos de usuarios» ← “Quiero que cada artista pueda ingresar con su propia cuenta y que tenga acceso únicamente a sus compromisos de trabajo.”; **payments** «cobros en línea para reservas» ← “necesito que los clientes puedan pagar una parte del servicio para confirmar su reserva”; **communication** «envío de correos electrónicos transaccionales» ← “reciban un correo con las indicaciones generales antes de su visita.”
- `escuela-surf`: **auth** «control de acceso por roles y permisos» ← “Quiero que los instructores puedan ingresar a su espacio de trabajo con permisos distintos a los de los administradores.”; **communication** «envío de notificaciones y avisos transaccionales» ← “necesito enviar avisos cuando una clase se cambie por condiciones del clima”; **payments** «procesamiento de pagos en línea» ← “ofrecer a los estudiantes la posibilidad de pagar sus clases por internet.”
- `organizacion-bodas`: **cms** «gestion de contenido web» ← “Quiero poder cambiar personalmente los textos, fotografías y ejemplos de eventos que aparecen en nuestra página”; **communication** «envio de correos transaccionales» ← “necesito comunicarme con los clientes por correo”; **payments** «procesamiento de pagos y anticipos» ← “ofrecerles una forma de pagar anticipos para separar la fecha”
- `club-lectura-presencial`: **auth** «gestion de cuentas y permisos de usuario» ← “Quiero que los miembros tengan una cuenta para consultar las actividades a las que están invitados y que los coordinadores puedan gestionar sus propios grupos.”; **cms** «gestion y publicacion de contenido web» ← “También necesito publicar novedades, reseñas y fotografías de los encuentros sin tener que pedir ayuda técnica.”; **communication** «envio de notificaciones a usuarios» ← “Para mantener a todos informados, quiero enviar avisos cuando se anuncie una nueva actividad.”
- `hostal-familiar`: **payments** «procesamiento de pagos en linea» ← “que los huéspedes puedan realizar pagos en línea”; **auth** «gestion de usuarios y permisos» ← “que el personal tenga cuentas con permisos diferentes según sus responsabilidades”; **cms** «gestion de contenido web» ← “actualizar por mi cuenta la información del alojamiento, las fotografías y las recomendaciones para los visitantes”; **communication** «envio de correos transaccionales» ← “que los huéspedes recibieran una confirmación por correo después de hacer una reserva”
- `limpieza-fachadas`: **communication** «envío de notificaciones a clientes» ← “enviar avisos a los clientes cuando tengamos que cambiar la fecha de una visita”; **payments** «procesamiento de cobros en línea» ← “recibir pagos por los servicios contratados”
- `cuidado-mascotas-domicilio`: **auth** «gestión de cuentas y permisos de usuarios» ← “Quiero que cada cuidador tenga una cuenta para consultar únicamente los servicios que tiene asignados”; **communication** «envío de notificaciones transaccionales» ← “Necesito que los dueños de las mascotas reciban mensajes cuando el cuidador llegue y cuando termine la visita”; **payments** «procesamiento de pagos digitales» ← “quiero que puedan pagar los servicios sin tener que entregar dinero en efectivo”
- `agencia-traduccion`: **auth** «gestión de cuentas y control de accesos» ← “Necesito que cada traductor pueda ingresar a su cuenta y consultar únicamente los encargos que tiene asignados.”; **communication** «recepción y envío de correos y notificaciones» ← “Quiero que los clientes puedan solicitar cambios o hacer preguntas por correo y que reciban una notificación cuando su trabajo esté terminado.”; **payments** «cobros y pagos en línea» ← “También necesito cobrar los servicios por internet.”
- `optica-familiar`: **database** «registro de datos de clientes» ← “Quiero llevar un registro de clientes, fórmulas, compras y el estado de cada pedido para no perder la información.”; **auth** «control de acceso por roles» ← “También necesito que los vendedores ingresen con su propia cuenta y que yo pueda limitar quién modifica precios o elimina registros.”; **communication** «envío de notificaciones a clientes» ← “Cuando un pedido esté listo, quisiera avisarle al cliente sin tener que llamar uno por uno.”
- `taller-bicicletas`: **database** «almacenamiento y consulta de registros» ← “Necesito conservar el historial de cada bicicleta, los trabajos realizados y las piezas usadas.”; **search** «búsqueda de texto completo» ← “Quiero que el sistema encuentre rápido una reparación anterior cuando busque por el nombre del cliente o por el número del marco.”; **communication** «envío de notificaciones programadas» ← “Quisiera que se creen recordatorios de revisión cuando una bicicleta lleve varios meses sin volver.”
- `distribuidora-productos-aseo`: **database** «registro y consulta de inventario y ventas» ← “Quiero registrar cada venta, cliente, producto y cantidad disponible para saber qué tenemos y cuánto debemos reponer”; **analytics** «analisis de ventas mensuales y comportamiento de clientes» ← “Me interesa ver cuáles productos se venden más por mes y qué clientes han reducido sus pedidos”; **payments** «procesamiento de cobros en linea» ← “necesito que los clientes puedan pagar sus facturas pendientes por internet”
- `centro-refuerzo-escolar`: **database** «registro histórico de matrículas y pagos» ← “Quiero mantener el historial de matrículas, horarios, asistencia y pagos de cada estudiante.”; **auth** «control de acceso basado en roles» ← “Los acudientes y profesores deben entrar con cuentas diferentes, y cada grupo solo debería ver la información que le corresponde.”; **communication** «envío de avisos y notificaciones» ← “También quiero enviar avisos a las familias cuando cambie un horario o se acerque una evaluación.”
- `frutas-deshidratadas`: **database** «registro de inventario y pedidos» ← “Quiero registrar las compras de materia prima, los lotes de producción, las cantidades empacadas y los pedidos de cada comercio”; **data-processing** «cálculo de consumo y stock» ← “necesito calcular cuánto material se consume y cuánto producto terminado queda después de cada jornada”; **communication** «envío de notificaciones y confirmaciones» ← “Quisiera enviar a cada comercio una confirmación del pedido y un aviso cuando salga el despacho”
- `tienda-instrumentos-musicales`: **database** «registro de existencias y transacciones» ← “Quiero llevar un registro de existencias, proveedores, compras y ventas para saber qué hay disponible”; **search** «búsqueda avanzada de catálogo» ← “Mis clientes deberían poder encontrar artículos por tipo, rango de precio o características, aunque no escriban el nombre exacto”; **payments** «procesamiento de pagos en línea» ← “También quiero aceptar pagos en línea para los pedidos que hacemos por encargo”
- `instalacion-paneles-solares`: **database** «almacenamiento y consulta de datos de proyectos» ← “Quiero guardar los datos de cada cliente, la dirección, los equipos instalados, las visitas y el historial de mantenimiento.”; **auth** «control de acceso basado en roles» ← “que solo el personal administrativo vea los costos y los datos de facturación”; **storage** «almacenamiento de archivos y documentos» ← “guardar fotos de la instalación y documentos de garantía asociados a cada proyecto”
- `galeria-arte-local`: **database** «gestión de catálogo de inventario» ← “Necesito mantener un catálogo de obras con sus autores, medidas, precios, disponibilidad y movimientos cuando una pieza se presta o se vende.”; **cms** «edición de contenidos del sitio web» ← “Quiero poder editar por mi cuenta los textos y las imágenes que aparecen en la página de la galería, sin pedir ayuda cada vez.”; **analytics** «analítica de consultas y ventas» ← “Además, me interesa conocer qué obras reciben más consultas y cuáles terminan en venta.”
- `taller-maquinas-coser`: **database** «registro y consulta de casos» ← “Quiero registrar los clientes, los equipos que recibimos, los diagnósticos, las cotizaciones y las reparaciones realizadas para consultar después cada caso.”; **automation** «generación y asignación automática» ← “Cuando un cliente acepte una cotización, quisiera que se genere automáticamente la orden de trabajo y se asigne al técnico disponible.”; **communication** «envío de mensajes informativos» ← “También necesito mandar mensajes al cliente para informarle cuando el equipo esté listo o cuando debamos esperar una pieza.”
