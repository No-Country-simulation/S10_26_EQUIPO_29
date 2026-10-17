# OpenBridge — Acelerador de Integraciones Open Source

Proyecto del equipo **S10-26-equipo 29** en la simulación laboral de No Country (octubre–noviembre 2026).

OpenBridge es un catálogo de herramientas open source con ideas de integración, alimentado por una ingesta de repositorios de GitHub con métricas de salud, y un asistente con IA (RAG) que recomienda un stack open source a partir de la descripción de un negocio.

**Estado:** en planificación. Este README es la línea base del repositorio: describe lo acordado y marca como *propuesta* o *por confirmar* lo que todavía no lo está.

## Equipo

| Integrante | Rol |
|---|---|
| David Vergara | Project Manager |
| Jeison Pinzón | Data Engineer |
| Andrés Iglesias | AI Engineer |
| Edison Peña | AI Engineer |
| Fabián Martínez | UX/UI Designer |

## Estructura del repositorio

Criterio: **lo que es de todos va en la raíz; lo que es de una parte va en su carpeta.** Cada parte es autosuficiente: tiene su propio README, sus dependencias (`requirements.txt`, `package.json`…) y sus pruebas.

| Carpeta / archivo | Qué contiene | Responsable |
|---|---|---|
| `ingestion/` | Ingesta desde la API de GitHub, procesamiento y health score | Data Engineer |
| `backend/` | API (FastAPI) | Data Engineer — *por confirmar* |
| `ai/` | Embeddings, asistente RAG, ideas de integración con LLM, evaluación | AI Engineer |
| `frontend/` | Interfaz web | *Por confirmar* (UX/UI Designer / AI Engineer) |
| `shared/contracts/` | Contratos entre partes: esquemas de datos y ejemplos JSON | Todos (cambios por PR, avisando) |
| `tests/` | Pruebas de **integración** entre partes. Las pruebas de cada parte van en su carpeta | Todos |
| `docs/` | Documentación general del proyecto | Todos |
| `.env.example` | Variables de entorno de todo el proyecto, con una sección por parte y valores de ejemplo | Todos |

## Cómo se conectan las partes

```
Frontend ──HTTP + JSON──▶ API ──▶ PostgreSQL ◀── Ingesta
                           │          ▲
                           └──▶ IA ───┘
```

- Cada dueño elige el lenguaje y las librerías de su parte.
- Se acuerdan en equipo: los **contratos** (forma de los JSON, endpoints, esquema de la base de datos), la **infraestructura compartida** (PostgreSQL, Docker Compose) y el **despliegue** de la demo.
- Convenciones comunes: fechas en ISO 8601; las partes en Python usan la misma versión de Python y Pydantic 2.x.

## Cómo contribuir

La forma de trabajo del equipo (ramas, Pull Requests, carpetas y contratos) está en [`CONTRIBUTING.md`](CONTRIBUTING.md).
