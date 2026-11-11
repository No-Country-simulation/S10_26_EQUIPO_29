'use client';
const anatomy={
 buttons:'Etiqueta, icono opcional, área interactiva, indicador de foco.',
 filters:'Buscador, apertura del panel, categorías, cuatro selectores, limpiar filtros.',
 pagination:'Anterior, páginas numeradas, separador de rango, siguiente.',
 tooltip:'Disparador, portal, superficie, texto, posición ajustada al viewport.',
 card:'Identidad y owner/repo, categorías, descripción, salud y lenguaje, métricas, acciones.',
 description:'Texto visible, cálculo del espacio disponible, enlace Ver más.',
 identity:'Logo o iniciales, nombre, owner/repo, marca de agua, paleta.',
 health:'Icono, puntuación o Sin evaluar, disparador del tooltip.',
 prompt:'Borde, campo editable, espejo de medición, envío/detención/reintento, nueva arquitectura cuando corresponde.',
 suggestions:'Texto de ayuda, título del ejemplo, descripción, flecha, borde iluminado.',
 heading:'Título, descripción de estado, tratamiento de stack o encabezado de propuesta.',
 working:'Palabra actual, máscaras por letra, palabra entrante.',
 errors:'Título específico, explicación, acción de recuperación en el input.',
 proposal:'Encabezado, herramientas/conexiones, contenido seleccionado, supuestos y limitaciones, idea original.',
 tools:'Identidad, rol, motivo, licencia si corresponde, Ver motivo, Ver ficha.',
 connections:'Nodos, puerto visual, línea punteada, protocolo, tooltip, luz en recorrido.',
 context:'Dos columnas con encabezados, listas separadas, idea original debajo.',
 detail:'Overlay, portada, cierre, pestañas, cuerpo desplazable, acciones fijas.',
 metrics:'Título, iconos, etiquetas, valores, salud del repositorio.',
 ideas:'Revisión, título, tipo, dificultad, resumen, datos de integración, código.',
 snippet:'Lenguaje, Copiar, líneas de código, feedback de copia.',
 navigation:'Logo, acción contextual asistente/catálogo, acceso al Design System en footer.',
 workspace:'Asistente persistente, catálogo superpuesto, acceso al catálogo, posición de retorno.',
 light:'Contenedor del fondo, renderer LightRays, configuración, adaptación al movimiento.',
 border:'Geometría del contorno, halo, brillo local, foco y error.',
 scroll:'Viewport, posición de scroll, entrada de secciones, ajustes de movimiento reducido.',
 empty:'Ojos, boca, dots, mensaje contextual fuera del gráfico.'
};
export function ComponentSpecs({entry}){
 return <div className="ds-anatomy"><h3>Anatomía</h3><p>{anatomy[entry.id]||'Estructura de placeholders, superficies, iluminación, estado de carga accesible.'}</p></div>;
}
