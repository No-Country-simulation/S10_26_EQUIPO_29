'use client';
import {useState} from 'react';
import {CatalogFilterButton} from '../../features/catalog/CatalogFilters';
import {ButtonDimensions} from './ButtonDimensions';
import {ArrowUpRight} from 'lucide-react';
export function VariantSet({entry}){return entry.id==='buttons'?<ButtonSet/>:null;}
const sizes=[['compact','SM','Compactos','40 px'],['standard','MD','Medianos','44 px'],['large','LG','Grandes','48 px']];
const variants=[['primary','Primario'],['secondary','Outlined'],['text','Ghost']];
const states=[['normal','Normal'],['hover','Hover'],['focus','Foco'],['pressed','Pulsado'],['disabled','Deshabilitado']];
function SampleButton({size,kind,state='normal',content='text'}){
 const iconOnly=content==='icon-only'&&kind!=='text';
 return <button type="button" disabled={state==='disabled'} aria-label={iconOnly?'Continuar':undefined} data-demo-state={state} className={`ui-button ui-button--${kind} ${size!=='standard'?`ui-button--${size}`:''} ${iconOnly?'ui-button--icon':''}`}>
 {!iconOnly&&(kind==='text'?'Ver más':'Continuar')}{content!=='text'&&<ArrowUpRight aria-hidden="true"/>}
 </button>;
}
function DisclosureExample(){const [expanded,setExpanded]=useState(false);return <section className="ds-component-playground"><h3>Acción desplegable</h3><p>Cuando abre un panel, el botón conserva la superficie blanca mientras está activo. El foco de teclado añade el contorno habitual del sistema.</p><CatalogFilterButton expanded={expanded} active={0} controls="ds-button-filter-panel" onToggle={()=>setExpanded(value=>!value)}/><div id="ds-button-filter-panel" hidden={!expanded}><p>Panel de filtros abierto en esta muestra.</p></div></section>;}
export function ButtonSet(){
 const [size,setSize]=useState('standard'),[kind,setKind]=useState('primary'),[state,setState]=useState('normal'),[content,setContent]=useState('text');
 return <div className="ds-button-library">
 <p>SM y MD: utilizados en la plataforma. LG: disponible como ampliación, sin adopción general.</p><p>Lee cada set por filas (variante) y columnas (estado). Las muestras normales responden a hover, clic y foco con Tab. Los demás estados están fijados para compararlos.</p>
 {sizes.map(([value,code,label,height])=><section className="ds-button-size-set" key={value} aria-label={`${code}: ${label}`}>
 <div className="ds-button-size-heading"><h4>{code}: {label}</h4><span>{height}{value==='large'?', Extensión del sistema':''}</span></div>
 <div className="ds-button-table-scroll" tabIndex={0} role="region" aria-label={`Variantes y estados ${code}`}><table className="ds-button-table"><thead><tr><th scope="col">Variante</th>{states.map(([id,name])=><th scope="col" key={id}>{name}</th>)}</tr></thead><tbody>{variants.map(([variant,name])=><tr key={variant}><th scope="row">{name}</th>{states.map(([status])=><td key={status}><SampleButton size={value} kind={variant} state={status}/></td>)}</tr>)}</tbody></table></div>
 </section>)}
 <p>Ghost es una única variante de texto, sin fondo ni borde, con subrayado. Su tamaño tipográfico sigue SM, MD y LG; su altura es la de la línea, no la de un botón con superficie. LG amplía el set y aún no sustituye tamaños en la plataforma.</p>
 <DisclosureExample/>
 <section className="ds-button-playground"><h4>Prueba el botón</h4><div className="ds-button-playground-controls">
 <label className="ds-choice">Tamaño<select value={size} onChange={e=>setSize(e.target.value)}>{sizes.map(([id,code,name])=><option key={id} value={id}>{code}: {name}</option>)}</select></label>
 <label className="ds-choice">Variante<select value={kind} onChange={e=>{setKind(e.target.value);if(e.target.value==='text'&&content==='icon-only')setContent('text');}}>{variants.map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label>
 <label className="ds-choice">Estado<select value={state} onChange={e=>setState(e.target.value)}>{states.map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label>
 <label className="ds-choice">Contenido<select value={content} onChange={e=>setContent(e.target.value)}><option value="text">Texto</option><option value="with-icon">Texto + icono</option>{kind!=='text'&&<option value="icon-only">Solo icono</option>}</select></label>
 </div><ButtonDimensions><SampleButton size={size} kind={kind} state={state} content={content}/></ButtonDimensions></section>
 </div>;
}
