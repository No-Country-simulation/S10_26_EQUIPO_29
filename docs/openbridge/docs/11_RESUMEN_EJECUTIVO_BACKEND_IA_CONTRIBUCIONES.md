# OpenBridge — Backend, IA e integración con Frontend

**Síntesis ejecutiva para la presentación y entrega de No Country**
**Fuente técnica:** [Documentación completa del Backend y servicio de IA, revisión 11/11/2026](10_BACKEND_ENTREGA_2026-11-11.md).
**Código del equipo:** [S10_26_EQUIPO_29](https://github.com/No-Country-simulation/S10_26_EQUIPO_29).
**Alcance de este documento:** resumir el diseño documentado y reconocer una contribución verificada; no certifica que el despliegue remoto esté operativo.

## 1. Cómo se integra el producto

OpenBridge está diseñado con **dos servicios HTTP independientes**:

| Componente | Base local | Responsabilidad |
|---|---|---|
| API de catálogo · FastAPI | Puerto `8000` | Servir listados y fichas de repositorios, consultar PostgreSQL/Supabase en lectura y entregar datos enriquecidos ya publicados |
| Servicio del asistente · FastAPI | Puerto `8001` | Interpretar necesidades, recuperar candidatos mediante embeddings y generar propuestas estructuradas mediante el proveedor LLM configurado |
| Frontend | URL configurada para cada servicio | Mostrar catálogo, categorías, filtros, fichas y experiencia del asistente; consumir ambas APIs sin suponer que el catálogo es un proxy del generador |

La API del catálogo expone `GET /repos` y `GET /repos/{owner}/{name}`. El `POST /assistant` del puerto `8000` es un **placeholder** que devuelve indisponibilidad; la generación corresponde al puerto `8001`. Esto es importante para configurar el despliegue y los ensayos.

El servicio de IA puede cargar información de la base de datos o utilizar un **snapshot de respaldo** al arrancar. La recarga periódica documentada es de **10 minutos**, dependiendo de las marcas de publicación; no equivale a una ingesta en tiempo real.

## 2. Automatización, métricas y controles

- **Health score:** cálculo por reglas realizado al servir el catálogo, condicionado al flag `HEALTH_SCORE_ENABLED`; no representa una certificación de seguridad.
- **Mantenimiento:** indicador calculado a partir de antigüedad del último push y estado de archivado, con valor `null` para casos no determinables.
- **Actualización de repositorios:** el cron documentado de `update-catalog` es **dry-run**, sin escritura automática. Aplicar cambios requiere un procedimiento manual y permisos.
- **Enriquecimiento de IA:** el workflow `ai-refresh` contempla la generación y publicación programadas, con permisos y frenos específicos.
- **Protección:** uso de roles lectores, consultas parametrizadas, contratos y validación de solicitudes/salidas. La documentación advierte riesgos pendientes de autenticación y limitación de uso del asistente.

Los estados de `/health` no prueban por sí mismos acceso a Supabase ni disponibilidad efectiva del proveedor remoto. Para demostrar esas integraciones se necesitan pruebas de los endpoints y del entorno.

## 3. Evidencia de pruebas consignada en el informe

| Suite | Resultado declarado en la revisión del 11/11/2026 |
|---|---:|
| API de catálogo | **155 aprobadas** |
| IA y contratos compartidos | **596 aprobadas · 3 omitidas** |

**Procedencia:** cifras registradas por el documento técnico compartido. No se ejecutaron de nuevo para esta síntesis. Tampoco prueban por sí solas cuotas, credenciales ni respuesta de servicios desplegados.

## 4. Contribución destacada — Fabián Martínez

**Rol confirmado:** UX/UI Designer · Frontend.

El [PR #136 «Refina el Design System y los estados del asistente»](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/136), elaborado por **Fabián Martínez** e integrado en la rama principal, documenta cambios en el sistema de diseño, fichas y tarjetas, navegación del catálogo, filtros, estados del asistente y preparación de vistas previas. El PR informó pruebas de frontend y revisión móvil.

Su contribución consolidó la **experiencia de usuario y la capa de presentación** mediante la cual el producto expone información de catálogo y propuestas del asistente. La relación con los servicios de backend forma parte de la arquitectura de integración, pero **no se atribuye a Fabián la autoría de las APIs, la ingesta ni el servicio de IA**, ya que esta documentación no lo acredita.

> **Comentario del Project Manager:** «El trabajo de Fabián fue fundamental para convertir los requerimientos técnicos de OpenBridge en una experiencia visual coherente y comprensible. Su responsabilidad en UX/UI y Frontend fortaleció el recorrido del producto, la presentación de los datos y los estados de interacción del asistente, facilitando el trabajo coordinado entre las distintas áreas».
>
> — **David Vergara · Project Manager**

## 5. Lecturas y próximos controles

- [Documento técnico completo · Backend e IA](10_BACKEND_ENTREGA_2026-11-11.md).
- [PR #136 · Fabián Martínez / Frontend y Design System](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/136).
- [PR #134 · Andrés Iglesias / títulos de propuestas IA](https://github.com/No-Country-simulation/S10_26_EQUIPO_29/pull/134).
- [Recorrido visual auténtico de OpenBridge](../assets/showcase/OpenBridge_Recorrido_Real_57s.mp4).

**Antes de la entrega final:** comprobar las APIs en el despliegue accesible al jurado, los workflows ejecutados, la integración del asistente y la correspondencia entre la documentación y la versión efectivamente publicada.

---

**Nota de coordinación y documentación:** síntesis basada en el informe de revisión del 11/11/2026 y en el PR #136 del repositorio oficial. No sustituye la revisión técnica de los responsables de cada servicio.

**David Vergara · Project Manager**
