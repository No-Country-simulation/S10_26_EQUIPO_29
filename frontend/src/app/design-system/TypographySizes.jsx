'use client';
import scale from '../../theme/type-radius.json';
import {inventory, Copy} from './Reference';

const declarations = inventory.styles.map(item => ({...item,value:scale.tokens.find(t=>`var(${t.name})`===item.value)?.value||item.value}));
const sizes = [...new Set(declarations.filter(item => item.property === 'font-size').map(item => item.value))];
const fixed = sizes.filter(value => /^\d+(\.\d+)?px$/.test(value)).sort((a, b) => parseFloat(a) - parseFloat(b));
const fluid = sizes.filter(value => value.startsWith('clamp('));

function SizeSample({value}) {
  const uses = declarations.filter(item => item.property === 'font-size' && item.value === value);
  return <article className="ds-type-size">
    <div className="ds-type-size-meta"><Copy value={value}/><span>{uses.length} declaraciones</span></div>
    <div className="ds-type-size-sample" style={{fontSize: value}}>Construye tu próxima idea</div>
    <details><summary>Ver usos y condiciones</summary><ul>{uses.map((use, index) => <li key={index}><code>{use.selector}</code><small>{use.source}:{use.line}{use.context ? ` · ${use.context}` : ''}</small></li>)}</ul></details>
  </article>;
}

export function TypographySizes({query = ''}) {
  const matches = value => declarations.some(item => item.property === 'font-size' && item.value === value && `${value} ${item.selector} ${item.source} ${item.context}`.toLowerCase().includes(query.toLowerCase()));
  return <>
    <p>Actualmente hay {fixed.length} tamaños fijos y {fluid.length} reglas fluidas. Son valores declarados en la plataforma, incluidas adaptaciones responsive y excepciones; no representan {fixed.length + fluid.length} niveles de jerarquía.</p>
    <h3>Referencia por función</h3>
    <p>Usos actuales para elegir según el contexto. No es una nueva escala normalizada; los valores específicos y las reglas responsive permanecen en el inventario inferior.</p>
    <dl className="ds-specs">
      <div><dt>Etiquetas de categorías</dt><dd>12 px · metadatos compactos.</dd></div>
      <div><dt>Identidad owner/repo</dt><dd>13 px · información secundaria.</dd></div>
      <div><dt>Descripción del catálogo</dt><dd>14 px · resumen de la herramienta.</dd></div>
      <div><dt>Descripción de la ficha</dt><dd>16 px · lectura extendida.</dd></div>
      <div><dt>Introducción del asistente</dt><dd>17 px; 16 px en móvil según el estado.</dd></div>
      <div><dt>Botones</dt><dd>SM 13 px · MD 14 px · LG 15 px (ampliación disponible).</dd></div>
    </dl>
    <details className="ds-source"><summary>Inventario completo · tamaños y excepciones</summary>
    <h3>Tamaños fijos · {fixed.length}</h3>
    <div className="ds-type-size-list">{fixed.filter(matches).map(value => <SizeSample key={value} value={value}/>)}</div>
    <h3>Tamaños fluidos · {fluid.length}</h3>
    <p>Estas muestras responden al ancho del viewport con los límites definidos por clamp(). Redimensiona la ventana para comprobar su adaptación.</p>
    <div className="ds-type-size-list">{fluid.filter(matches).map(value => <SizeSample key={value} value={value}/>)}</div>
    </details>
    {![...fixed, ...fluid].some(matches) && <p>No hay tamaños que coincidan con la búsqueda.</p>}
  </>;
}
