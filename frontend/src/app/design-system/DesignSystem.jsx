'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {components,tabs} from './catalog.mjs';
import {FixtureBoundary} from './fixtures';
import {VariantSet} from './VariantSet';
import {ComponentSpecs} from './ComponentSpecs';
import {Preview} from './Previews';
import {Foundation,foundationSections} from './Foundations';
import './design-system.css';

function ComponentEntry({entry,show,onToggle}){
 const [run,setRun]=useState(0);
 return <article id={entry.id} className="ds-entry">
 <h2>{entry.name}</h2><p className="ds-lead">{entry.purpose}</p>
 {entry.id==='buttons'?<VariantSet entry={entry}/>:<div className="ds-entry-actions"><button className="ui-button ui-button--secondary" onClick={onToggle} aria-expanded={show}>{show?'Cerrar muestra':'Abrir muestra real'}</button>{show&&<button className="ui-button ui-button--text" onClick={()=>setRun(n=>n+1)}>Restablecer</button>}</div>}
 {entry.id!=='buttons'&&show&&<div className="ds-demo" key={run}><Preview id={entry.id}/></div>}
 <dl className="ds-specs"><div><dt>Comportamiento</dt><dd>{entry.behavior}</dd></div><div><dt>Variantes y estados</dt><dd>{entry.states}</dd></div></dl>
 {entry.id!=='buttons'&&<VariantSet entry={entry}/>}<ComponentSpecs entry={entry}/><p className="ds-foundation-links">Reglas compartidas: <Link href="/design-system/tipografia/#tamanos">Tipografía</Link> · <Link href="/design-system/espaciado/#geometria">Espaciado</Link>.</p><details className="ds-source"><summary>Ejemplo de uso</summary><pre><code>{entry.example}</code></pre></details>
 </article>;
}
export default function DesignSystem({section='componentes'}){
 const [query,setQuery]=useState(''),[active,setActive]=useState(null);
 const isComponents=section==='componentes';
 const entries=isComponents?components.filter(c=>(c.name+' '+c.family+' '+c.purpose+' '+c.states).toLowerCase().includes(query.toLowerCase())):foundationSections[section]||[];
 const index=isComponents?entries.map(c=>[c.id,c.name]):entries;
 return <FixtureBoundary><div className="ds-page" style={{'--button-brand':'#2749ba'}}>
 <header className="ds-header"><a href="/" aria-label="OpenBridge, inicio"><img src="/assets/brands/openbridge.svg" alt="OpenBridge" width="210"/></a><a className="ui-button ui-button--secondary" href="/">Volver a la plataforma <ArrowUpRight size={16}/></a></header>
 <main className="ds-main"><div className="ds-heading"><h1>Design System</h1><p>La interfaz de OpenBridge, documentada desde su implementación.</p></div>
 <nav className="ds-nav" aria-label="Secciones del sistema">{tabs.map(([id,label])=><Link href={`/design-system/${id}/`} key={id} aria-current={section===id?'page':undefined}>{label}</Link>)}</nav>
 <div className="ds-layout"><aside className="ds-index"><label className="ds-search-label" htmlFor="ds-search">Buscar en {tabs.find(([id])=>id===section)?.[1]}<input id="ds-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Nombre, estado o valor…"/></label><nav aria-label="Índice de la sección">{isComponents?<>{[...new Set(entries.map(c=>c.family))].map(family=><details key={family} open><summary>{family}</summary>{entries.filter(c=>c.family===family).map(c=><a key={c.id} href={'#'+c.id}>{c.name}</a>)}</details>)}</>:index.map(([id,label])=><a key={id} href={'#'+id}>{label}</a>)}</nav><label className="ds-mobile-index">Ir a<select defaultValue="" onChange={e=>{document.getElementById(e.target.value)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}><option value="" disabled>Seleccionar apartado</option>{index.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label></aside>
 <div className="ds-content" key={section}>{isComponents?<>{entries.length===0&&<p role="status">No hay componentes que coincidan con esta búsqueda.</p>}{entries.map(entry=><ComponentEntry key={entry.id} entry={entry} show={active===entry.id} onToggle={()=>setActive(active===entry.id?null:entry.id)}/>)}</>:entries.map(([id,label])=><article id={id} className="ds-entry" key={id}><h2>{label}</h2><Foundation section={section} id={id} query={query}/></article>)}</div>
 </div></main><footer className="ds-footer"><span>OpenBridge <span className="ds-footer-label">Design System</span></span><a className="ui-button ui-button--text" href="#">Volver arriba</a></footer></div></FixtureBoundary>;
}
