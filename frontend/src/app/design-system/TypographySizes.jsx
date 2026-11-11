'use client';
import {useState, useRef} from 'react';
import scale from '../../theme/type-radius.json';
import {inventory} from './Reference';

// Legacy selectors no longer rendered by the application are not active type sizes.
const retiredSelectors = new Set(['.card-foot', '.demo-note', '.architecture-demo-note']);
const declarations = inventory.styles.flatMap(item => item.selector.split(',').map(selector => ({...item,selector:selector.trim(),value:scale.tokens.find(t=>`var(${t.name})`===item.value)?.value||item.value}))).filter(item => !retiredSelectors.has(item.selector));
const sizes = [...new Set(declarations.filter(item => item.property === 'font-size').map(item => item.value))];
const fixed = sizes.filter(value => /^\d+(\.\d+)?px$/.test(value) && !['9px', '10px', '11.5px'].includes(value)).sort((a, b) => parseFloat(a) - parseFloat(b));

const isHero = value => value.replaceAll(' ', '') === 'clamp(40px,5.3vw,62px)';
function sizeLabel(value) {
  if (!value.startsWith('clamp(')) return value.replace('px', ' px');
  const bounds = value.match(/clamp\(\s*([\d.]+)px,.*?,\s*([\d.]+)px\s*\)/);
  return bounds ? `${bounds[1]}–${bounds[2]} px (fluido)` : 'Tamaño fluido';
}
function fluidPixels(value, width) {
  const parts = value.match(/clamp\(\s*([\d.]+)px,\s*([\d.]+)vw,\s*([\d.]+)px\s*\)/);
  return parts ? Math.round(Math.max(+parts[1], Math.min(+parts[3], +parts[2] * width / 100)) * 100) / 100 : null;
}
function applies(context, width) {
  return [...(context || '').matchAll(/(min|max)-width:\s*([\d.]+)px/g)].every(([,kind,bound]) => kind==='min' ? width>=+bound : width<=+bound);
}
function SizeSample({value, width}) {
  return <tr className="ds-type-size">
    <th scope="row">{fluidPixels(value,width) !== null ? `${fluidPixels(value,width)} px (fluido)` : sizeLabel(value)}</th>
    <td><div className="ds-type-size-sample" style={{fontSize:fluidPixels(value,width) ?? value,...(isHero(value)?{fontWeight:300,lineHeight:1.12,letterSpacing:'-.055em'}:{})}}>{isHero(value)?'De tu idea a tu stack':'Construye tu próxima idea'}</div></td>
  </tr>;
}

export function TypographySizes({query = ''}) {
  const [device,setDevice]=useState('desktop');
  const tabs=useRef([]);
  const width=device==='desktop'?1440:390;
  const eligible=new Map();
  declarations.filter(item=>item.property==='font-size'&&applies(item.context,width)).forEach(item=>eligible.set(item.selector,item.value));
  const values=new Set(eligible.values());
  const select=index=>{setDevice(index===0?'desktop':'mobile');tabs.current[index]?.focus();};
  const matches = value => `${sizeLabel(value)} ${isHero(value)?'hero stack':''}`.toLowerCase().includes(query.toLowerCase());
  const visible = fixed.filter(value=>values.has(value)&&matches(value));
  return <>
    <div className="ds-set-controls" role="tablist" aria-label="Vista tipográfica" onKeyDown={event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();select(event.key==='Home'?0:event.key==='End'?1:device==='desktop'?1:0);}}}>
      {[['desktop','Desktop'],['mobile','Mobile']].map(([id,label],index)=><button key={id} ref={node=>{tabs.current[index]=node;}} type="button" role="tab" id={`type-tab-${id}`} aria-selected={device===id} aria-controls="type-size-panel" tabIndex={device===id?0:-1} className={`ui-button ui-button--compact ui-button--${device===id?'primary':'secondary'}`} onClick={()=>setDevice(id)}>{label}</button>)}
    </div>
    <p>Referencia de {width} px de ancho. Los tamaños compartidos aparecen en ambas vistas.</p>
    <div id="type-size-panel" role="tabpanel" aria-labelledby={`type-tab-${device}`} tabIndex={0}>
    <div className="ds-type-table-wrap"><table className="ds-type-table ds-type-sizes-table">
      <caption className="sr-only">Tamaños de tipografía</caption>
      <thead><tr><th scope="col">Tamaño</th><th scope="col">Muestra</th></tr></thead>
      <tbody>{visible.map(value=><SizeSample key={value} value={value} width={width}/>)}</tbody>
    </table></div>
    {!visible.length&&<p>No hay tamaños que coincidan con la búsqueda.</p>}
    </div>
  </>;
}
