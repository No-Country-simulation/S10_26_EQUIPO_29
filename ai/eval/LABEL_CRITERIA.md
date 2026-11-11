# Criterio para etiquetar las necesidades

Qué cuenta como necesidad de cada categoría al etiquetar pedidos (`assistant_cases_*.json`
y cualquier conjunto nuevo). Se aplica a los conjuntos de desarrollo; la prueba final
conserva las etiquetas con las que se midió.

## Reglas generales

1. Una necesidad es algo que el pedido pide o describe, con esas u otras palabras. Se
   etiqueta por lo que el usuario quiere lograr, no por la palabra que usa: "registrar",
   "guardar" u "organizar" pueden ser cosas distintas según el pedido.
2. Lo que tiene cualquier aplicación (pantallas, servidor, los datos que usa por dentro)
   no es una necesidad: es la aplicación del usuario.
3. Cada necesidad se justifica con una frase literal del pedido. Una misma frase puede
   justificar dos necesidades si pide dos cosas ("registrar la asistencia y calcular el
   porcentaje" → base de datos y procesamiento de datos).
4. Las tecnologías que el usuario ya usa y no pide cambiar son contexto, no necesidades.
5. Si un pedido no se resuelve con estas reglas, la duda se anota en `note` y se agrega
   aquí una regla antes de etiquetarlo.
6. Una etiqueta nueva o cambiada con este criterio lo cita en su `note`.

## Por categoría

| Categoría | Cuenta cuando el pedido… | Ejemplo | No cuenta (va a) |
|---|---|---|---|
| `database` | dice que el negocio registra, guarda, consulta o mantiene al día datos de sus cosas (clientes, ventas, inventario, asistencia, solicitudes, historial, disponibilidad como cupos o existencias), aunque no diga "base de datos"; o pide algo sobre cómo se guardan sus datos (una base de datos con nombre, aislamiento por cliente) | "llevar el historial de arreglos de cada bicicleta" | archivos y copias de seguridad (`storage`); "organizar" como lo que hace el negocio; cuentas de usuario (`auth`); pagar o reservar sin que se pida consultar esos datos (la app) |
| `auth` | pide cuentas, inicio de sesión, registro de usuarios, roles, permisos, o que cada persona o sede vea solo lo suyo | "cada vendedor ve solo sus clientes" | certificados y cifrado del tráfico (`infrastructure`) |
| `search` | pide encontrar cosas dentro de sus datos por texto, características o parecido | "encontrar un repuesto por su descripción aunque no sepa el nombre" | consultar un registro o una lista (`database` o la app) |
| `ai` | pide que el sistema genere, recomiende, reconozca o prediga algo con un modelo | "que sugiera qué plan ofrecer a cada cliente según lo que compró" | cálculos con fórmula fija (`data-processing`); buscar por parecido (`search`) |
| `analytics` | pide saber, medir o ver en tableros cómo va el negocio o el producto | "ver qué servicios se venden más cada mes" | tiempos y errores del sistema (`observability`); calcular un valor para usarlo (`data-processing`) |
| `payments` | pide cobrar, recibir pagos, suscripciones o emitir facturas | "que los clientes paguen la cuota en línea" | contabilidad general |
| `frontend` | pide una herramienta para construir la interfaz, o un requisito técnico del sitio o la app (por ejemplo, que cargue muy rápido) | "un framework para la app móvil" | "una app donde los clientes vean…" (la app) |
| `backend` | pide una herramienta para construir el servidor o la API, o una plataforma de backend | "un framework para la API" | "un sistema que…" (la app) |
| `cache` | pide que lo que se consulta muchas veces responda rápido aunque haya mucha gente | "que el menú cargue al instante en hora pico" | servir desde servidores cercanos (`infrastructure`) |
| `messaging` | pide comunicación entre sistemas: colas, eventos, tareas en segundo plano, datos que llegan seguido desde equipos | "los lectores de la puerta mandan cada entrada al sistema" | mensajes a personas (`communication`) |
| `observability` | pide saber si el sistema funciona: tiempos, errores, logs, alertas técnicas | "saber cuándo la página se cae" | uso del negocio (`analytics`) |
| `infrastructure` | pide desplegar, escalar, alta disponibilidad, servir desde servidores cercanos, contenedores o certificados | "que la página cargue rápido en otros países" | procesos del negocio (`automation`) |
| `storage` | pide guardar archivos: fotos, PDF, videos, grabaciones, documentos, copias de seguridad | "guardar las fotos de cada obra terminada" | datos que se consultan por campos (`database`) |
| `cms` | pide que personas no técnicas editen y publiquen textos, imágenes o páginas | "cambiar yo misma los precios y fotos de la página" | construir la página (`frontend`) |
| `communication` | pide avisar o escribir a personas: correo, SMS, WhatsApp, notificaciones, recordatorios, chat, videollamadas | "avisarle al cliente cuando su pedido salga" | mensajes entre sistemas (`messaging`); alertas técnicas (`observability`) |
| `automation` | pide que un proceso del negocio ocurra solo o siga pasos: aprobaciones entre personas, asignar o crear tareas automáticamente, que el sistema programe visitas o revisiones, pasar datos entre aplicaciones | "que el jefe apruebe cada compra antes de pagarla" | reservar o confirmar una reserva dentro de la app (la app); avisar a una persona (`communication`); pipelines de datos (`data-processing`); despliegue (`infrastructure`) |
| `data-processing` | pide calcular, transformar o mover datos: totales, porcentajes, consumos, procesos nocturnos o en tiempo real | "calcular cada noche cuánta harina se usó" | guardar (`database`); mostrar en tableros (`analytics`); entrenar modelos (`ai`) |
| `dev-tools` | pide herramientas para programadores: pruebas, linters, control de versiones, empaquetado | "pruebas automáticas para el código" | — |

## Fronteras que ya dieron problemas

- **Base de datos o almacenamiento:** decide el tipo de dato. Registros con campos que se
  consultan → `database`; archivos → `storage`. Un pedido puede tener las dos ("historial
  de reparaciones y las fotos de cada una").
- **Base de datos o la aplicación:** si el pedido dice registrar, guardar, llevar,
  controlar, conservar o mantener al día datos de sus cosas → `database`. La
  disponibilidad que cambia (cupos, existencias, equipos libres o alquilados) cuenta
  como datos que se mantienen al día. Sin eso, los datos que la app usa por dentro
  (una reserva que se paga, una cuenta) no cuentan. "Organizo bodas" no cuenta;
  "organizar los datos de cada invitado" sí.
- **Agendar:** que el cliente reserve o que una reserva se confirme es la app; que el
  sistema programe solo una visita, una revisión o una tarea → `automation`; el aviso a
  la persona → `communication`. Planificar horarios, turnos, rutas o cuadrillas lo hace
  la persona con la app; es `automation` solo si el pedido dice que el sistema lo decide
  o lo asigna solo.
- **Permisos por rol, sede o asignación** → `auth`. Si además pide ver o llevar datos del
  negocio ("cada sede ve su propio inventario"), también `database`.
- **Aprobaciones entre personas** → `automation`. Si además dice que la solicitud se
  registra, también `database`.
- **Rápido:** servir desde servidores cercanos → `infrastructure`; lo que se consulta
  muchas veces → `cache`.
- **Mensajes:** a personas → `communication`; entre sistemas → `messaging`.
- **Reportes:** ver cómo va → `analytics`; calcular un valor → `data-processing`;
  enviarlo por correo → `communication`. Un pedido puede tener varias.
