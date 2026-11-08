# Implementación del `health_score` (motor v1)

Estado: **implementado y probado, apagado por defecto**. La fórmula sigue siendo
una propuesta pendiente de aprobación del equipo; la API sólo publica números
con `HEALTH_SCORE_ENABLED=true`. Apagado, `health_score` viaja en `null` y el
frontend muestra «Sin evaluar», que es el comportamiento actual de `main`.

- Código: [`backend/app/services/health.py`](../app/services/health.py).
- Pruebas: [`backend/tests/test_health_score.py`](../tests/test_health_score.py)
  y [`backend/tests/test_health_score_api.py`](../tests/test_health_score_api.py).
- Propuesta de origen: `backend/docs/health-score-propuesta.md`
  (rama `fix/openbridge-health-assets-ui`, commit `c46c08f`).

## 1. Por qué no se usa la fórmula histórica

`acelerador-integraciones-open-source` define (README §8.3 y
`db/sql/05_health_score.sql`, Exequiel A. Pérez, 16/10/2026):

```text
health_score = commit_velocity*0.15 + security*0.20 + docs*0.65
```

Esas tres entradas **no existen** en OpenBridge y no se pueden derivar de las
columnas actuales:

| Entrada histórica | Qué requería | Disponible hoy |
| --- | --- | --- |
| `commit_velocity` | historial de commits (GitHub API por repo) | no: sólo `pushed_at` |
| `security` | alertas de dependencias/CVE o Scorecard | no: no hay ETL de seguridad |
| `docs` | cobertura/calidad de documentación medida | no: `readme_text` no es una métrica |

Usar la fórmula histórica exigiría inventar tres de tres valores. Por eso el
motor implementa la **alternativa B de la propuesta**: índice ponderado por
reglas construido únicamente con columnas que ya existen.

## 2. Fórmula implementada (perfil `v1`)

```text
score = 100 × Σ(wᵢ·factorᵢ) / Σ(wᵢ disponibles)      (redondeado a 1 decimal)
```

| Factor | Peso | Regla | Fuente real |
| --- | --- | --- | --- |
| `recencia` | 0.40 | ≤30 d→1.0 · ≤90 d→0.75 · ≤180 d→0.5 · ≤365 d→0.25 · resto 0.0 | `catalog_repositories.pushed_at` |
| `actividad_issues` | 0.25 | `1 − min(1, open_issues / max(1, stars×0.1))` | `open_issues_count`, `stargazers_count` |
| `licencia` | 0.15 | SPDX válida→1.0 · `NOASSERTION`→0.5 · `NULL`/`NONE`→0.0 | `license_spdx_id` |
| `estado` | 0.20 | activo→1.0 · `archived`/`disabled`→0.0 (además, techo de tono) | `archived`, `disabled` |

Justificación breve:

- **Recencia** es la señal de mantenimiento más fiable y completa (100 % de las
  filas tienen `pushed_at`); el peso va primero por eso.
- **Issues** mide presión de mantenimiento, no popularidad. Se normaliza por
  `stars×0.1` para no castigar a repositorios populares con mucho tráfico.
- **Licencia** es requisito de adopción: sin licencia el repositorio no es
  recomendable, pero `NOASSERTION` es ambiguo y no se penaliza igual.
- **Estado** distingue «abandonado» de «archivado por decisión»; además los
  archivados nunca salen con tono sano (techo 59.0, el mayor valor del tono
  `low`, umbral 60 del frontend).

## 3. Tratamiento de datos faltantes (regla dura)

1. Un factor con dato ausente es `None` y **se excluye** del promedio; su peso
   se reparte entre los factores disponibles (`coverage`). Un ausente nunca se
   convierte en 0.
2. Sin `pushed_at` no hay score (`null`): la propuesta §5 lo exige y la recencia
   es obligatoria en el contrato.
3. Si la cobertura disponible (suma de pesos) es **< 0.50**, se publica `null`.
   Con recencia sola (0.40) no se evalúa; con recencia+licencia+estado (0.75) sí.
4. `disabled` desconocido no penaliza (misma aproximación que el filtro
   `maintenance=active`: `COALESCE(disabled, FALSE)`); `archived` desconocido
   deja el factor sin dato.
5. `license_spdx_id` `NULL` puntúa 0.0 por defecto porque el ETL consulta la
   licencia en cada sincronización (NULL = GitHub no detectó licencia). Si el
   equipo prefiere tratarlo como «sin dato», se cambia
   `treat_null_license_as_zero=False` en el perfil y el motor renormaliza.
6. Una fecha de push futura (reloj desfasado) se trata como «hoy», sin premio
   ni castigo.

## 4. Ejemplos de cálculo

Todos verificados por las pruebas (mismo `now`, misma entrada).

| Caso | Entradas | Aritmética | Score |
| --- | --- | --- | --- |
| Completo | push 10 d · 100 issues · 1 000 stars · MIT · activo | (0.40·1 + 0.25·0 + 0.15·1 + 0.20·1) / 1.00 | **75.0** `moderate` |
| Sin issues ni licencia | push 400 d · sin issues · `license NULL` · activo | (0.15·0 + 0.20·1) / 0.75 | **26.7** `low` |
| Archivado | push 10 d · 0 issues · MIT · `archived=true` | 0.40+0.25+0.15+0.20 = 1.00 → techo `low` | **59.0** `low` |
| Sin `pushed_at` | fila sin fecha de push | regla §5: no evaluable | **null** |
| Renormalizado | push 10 d · activo · sin issues · `NULL` tratado como «sin dato» | (0.40+0.20) / 0.60 | **100.0** `good` |
| Redondeo | push 130 d · `NOASSERTION` · sin issues · activo | (0.20+0.075+0.20) / 0.75 | **63.3** `moderate` |

## 5. Integración con la API y el frontend

- `CatalogService` recibe `health_score_enabled` (`Settings.health_score_enabled`,
  variable `HEALTH_SCORE_ENABLED`, **false por defecto**).
- Cada fila se traduce en `_repo_payload`; el score se calcula en lectura con
  `datetime.now(timezone.utc)` y se emite en el campo ya existente
  `health_score` del contrato `Repo` (0–100). No se añadieron claves nuevas: el
  contrato v1.2 no cambia.
- El frontend ya lo soporta sin cambios: `toCardDetail` mapea `health_score` y
  `ToolCard`/`ToolDetail` muestran el número o «Sin evaluar». El mock ficticio
  `frontend/src/mocks/catalog-default.fixture.json` dejó de inventar
  `healthScore: 0`; ahora es `null` como el resto de fixtures.
- Validaciones de entrada del motor: pesos entre 0 y 1 y suma exacta 1,
  exactamente los cuatro factores, umbrales de recencia enteros crecientes y
  cobertura mínima válida. Un perfil mal formado falla al construirse.

## 6. Limitaciones conocidas (decisiones abiertas)

1. **`open_issues_count` está vacío en el snapshot** (`ai/data/catalog/repos.json`,
   100/100 `null`) y en Supabase sólo lo tienen ~5/100 filas (README backend).
   Con el motor encendido hoy, los 100 repositorios del snapshot se evalúan con
   cobertura 0.75: **98 `good`, 2 `moderate`, 0 `low`**, mínimo 60.0. Un
   indicador que casi no distingue es el argumento principal para mantener el
   flag apagado hasta que la ingesta publique issues.
2. **Cálculo en lectura, no persistido.** La propuesta §5 pedía persistir el
   score con `health_score_at`/`health_score_version`. Aquí no se puede escribir
   (el rol de la API es de solo lectura y no hay DDL aprobado), así que el valor
   se recalcula por petición. Es determinista y barato, pero no hay historia ni
   auditoría temporal hasta que exista tabla/vista.
3. **Extras del contrato no expuestos.** `health_factors`,
   `health_score_at` y `health_score_version` no viajan en la API: añadirlos es
   un cambio de contrato que necesita aprobación. Hoy están en `HealthResult`
   para documentación y pruebas.
4. **`archived` como estado propio.** El techo `low` es provisional; el equipo
   debe decidir si la ficha muestra «Archivado» en lugar de una cifra.
5. **Sesgo de licencia.** Un repositorio con licencia `NULL` histórico (fila no
   sincronizada) se penaliza como «sin licencia». Revisar si el ETL puede marcar
   «no sincronizado» antes de publicar números.
6. **Stars sólo normalizan issues**; no son un componente del score (la
   propuesta §4 lo exige para no premiar popularidad).

## 7. Resultados de pruebas (11-nov-2026)

```powershell
python -m pytest backend/tests -q
# 119 passed (79 previas + 40 nuevas)
#   test_health_score.py      ... motor: reglas, vectores, snapshot 100 repos
#   test_health_score_api.py  ... flag apagado→null, encendido→número, techo, renormalización
node --test tests/catalog-mock.test.mjs tests/catalog-http.test.mjs
# 15 pass (mock sin healthScore inventado)
```

Cobertura de los casos pedidos: valores nulos (`null` si falta `pushed_at`,
`null` bajo cobertura 0.5, factores `None` excluidos), extremos (fecha futura,
push de 4000 días, issues por encima del umbral normalizados a 1, archivado con
techo), validación de ponderaciones (suma ≠ 1, pesos fuera de rango, factores de
más o de menos), integración del endpoint (listado y ficha con flag on/off),
contrato frontend/backend (`Repo.model_validate` sobre la respuesta publicada) y
regresión del catálogo (el resto de pruebas del backend sigue en verde y el mock
deja de inventar `healthScore: 0`).

Nota de entorno: este worktree aislado no tiene `frontend/node_modules` ni
`frontend/dist`, así que las 5 pruebas que importan React o leen el export
estático (`brand-identity`, `next-export`, `session-palette`, `sites-worker`,
`snippet-language`) fallan por `ERR_MODULE_NOT_FOUND: react` o
`ENOENT dist/client/index.html`, no por este cambio. Las otras 30 pasan,
incluidas las 15 de catálogo/mock que cubren el fixture tocado.

## 8. Cómo activar cuando el equipo lo apruebe

1. Confirmar pesos y reglas (o cambiarlos creando `HEALTH_PROFILE_V2`; nunca
   editando `v1` en su sitio, para que los vectores de prueba sigan siendo
   válidos).
2. Ejecutar `python -m pytest backend/tests -q` y revisar la distribución del
   snapshot (§6.1) con el perfil aprobado.
3. Exportar `HEALTH_SCORE_ENABLED=true` en el entorno de la API y reiniciar.
4. Si se decide persistir: crear tabla/vista calculada por el pipeline y
   sustituir el cálculo en lectura por un `SELECT`; el contrato no cambia.
