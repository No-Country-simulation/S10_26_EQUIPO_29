# Documentación de la interfaz

Las seis rutas usan los componentes originales y fixtures aislados. No requieren API del catálogo ni del asistente. `/design-system/preview/` ejecuta la aplicación completa en un iframe con el mismo flujo, sustituyendo únicamente el proveedor por `mockAssistant` explícito.

## Actualizar

Desde `frontend`:

```sh
node scripts/design-inventory.mjs
npm test
npm run build
```

`design-inventory.mjs --check` falla si cambia el origen sin regenerar el inventario. Sigue imports estáticos desde las entradas de la app, recorre CSS con PostCSS y registra declaraciones, condiciones, fuentes, iconos y archivos públicos. Una referencia literal acredita referencia, no necesariamente ejecución de una rama. Un archivo no referenciado se mantiene en la sección de revisión, no se declara usado ni se elimina.

`catalog.mjs` contiene las explicaciones y clasifica cada módulo JSX activo. Los datos del inventario son evidencia técnica, no una explicación automática del motivo de diseño. No atribuir intenciones históricas sin una decisión registrada.

## Aislamiento

- `FixtureBoundary` proporciona catálogo, perfiles y colores deterministas sin HTTP ni escrituras de paletas de sesión.
- `PromptComposer` permite omitir la carga global de apariencia solo en la muestra aislada.
- `App` acepta un hook de flujo alternativo; la app normal conserva su valor por defecto. La muestra usa el flujo real con un proveedor de prueba.
- Las rutas normales no importan módulos de documentación.
- Cerrar una muestra desmonta sus efectos y timers. Los efectos pesados no arrancan todos a la vez.
- Las cotas son valores renderizados en el ancho actual; las referencias CSS no se presentan como estilos computados.

## Pendientes del producto

No se normalizan escalas, colores o tiempos en esta entrega. Las excepciones se señalan en Cobertura. La verificación de contraste de un gradiente, shader o superficie transparente requiere medir su composición; el inventario no certifica accesibilidad.
