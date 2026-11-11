'use client';
import {useState} from 'react';
import inventory from './inventory.generated.json';
export function Copy({value}){const [status,setStatus]=useState('');return <button className="ds-copy" onClick={async()=>{try{await navigator.clipboard.writeText(value);setStatus('Copiado');}catch{setStatus('Selecciona y copia manualmente');}}} aria-label={`Copiar ${value}`}><code>{value}</code>{status&&<span role="status">{status}</span>}</button>}
const filters={tipografia:/^(font|line-height|letter-spacing|text-|white-space|-webkit-line-clamp)/,colores:/(color|background|shadow|fill|stroke|opacity|filter|mask)/,espaciado:/(padding|margin|gap|width|height|radius|border.*width|grid|flex|position|inset|top$|bottom$|left$|right$|z-index|overflow)/,movimiento:/(animation|transition|transform|translate|rotate|scale|will-change)/};
export function DeclarationReference({section,query=''}){
 const [limit,setLimit]=useState(30),[local,setLocal]=useState('');
 const search=(query+' '+local).trim().toLowerCase().split(/\s+/).filter(Boolean);
 const grouped=new Map();for(const row of inventory.styles){if(!filters[section]?.test(row.property))continue;const key=row.property+'|'+row.value;if(!grouped.has(key))grouped.set(key,{...row,uses:[]});grouped.get(key).uses.push(row);}
 const rows=[...grouped.values()].filter(r=>search.every(q=>JSON.stringify(r).toLowerCase().includes(q)));
 return <><label className="ds-choice">Buscar propiedad, valor o selector<input value={local} onChange={e=>{setLocal(e.target.value);setLimit(30);}} placeholder="Ej. border-radius, rgba, tooltip…"/></label><p>{rows.length} valores agrupados. Son declaraciones de origen; la cascada y el contexto determinan el valor final. Las cotas muestran la medida renderizada.</p><div className="ds-reference-list">{rows.slice(0,limit).map(r=><article key={r.property+'|'+r.value}><strong>{r.property}</strong><Copy value={r.value}/>{section==='colores'&&/^#[\da-f]{3,8}$/i.test(r.value)&&<span className="ds-swatch" style={{background:r.value}}/>}<details><summary>{r.uses.length} usos y condiciones</summary>{r.uses.map((u,i)=><p key={i}><code>{u.selector}</code><br/>{u.context||'Sin condición @media'}<br/><small>{u.source}:{u.line}</small></p>)}</details></article>)}</div>{limit<rows.length&&<button className="ui-button ui-button--secondary" onClick={()=>setLimit(n=>n+30)}>Mostrar 30 más</button>}</>;
}
export {inventory};
