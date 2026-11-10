import scale from '../../theme/type-radius.json';
import {Copy} from './Reference';
export function TypeRadiusScale({radii=false}) {
 const groups=radii?[['border-radius','Radios compartidos']]:[['font-size','Tamaños compartidos'],['line-height','Interlineados compartidos'],['font-weight','Pesos compartidos']];
 const exceptions=scale.exceptions.filter(item=>radii?item.property==='border-radius':item.property!=='border-radius');
 return <>
 <p>Valores existentes centralizados, sin cambiar el aspecto de la plataforma. Se sustituyeron {scale.migratedDeclarations} declaraciones de tipografía y radios por referencias compartidas con equivalencia exacta.</p>
 {groups.map(([property,label])=><section key={property}><h3>{label} · {scale.tokens.filter(t=>t.property===property).length}</h3><div className="ds-palette-grid">{scale.tokens.filter(t=>t.property===property).map(t=><article key={t.name}>{radii?<div style={{width:80,height:56,border:'1px solid var(--neutral-700)',borderRadius:`var(${t.name})`}}/>:<span style={{fontSize:property==='font-size'?t.value:undefined,lineHeight:property==='line-height'?t.value:undefined,fontWeight:property==='font-weight'?t.value:undefined}}>Construye tu idea</span>}<Copy value={t.value}/></article>)}</div></section>)}
 <details className="ds-source"><summary>Excepciones conservadas · {new Set(exceptions.map(e=>e.property+'|'+e.value)).size} valores por propiedad</summary><p>Se conservan tamaños específicos, ajustes responsive, herencia y geometrías particulares. No son nuevas variantes recomendadas. Las animaciones y el espaciado entre letras no se modificaron.</p>{[...new Set(exceptions.map(e=>`${e.property}: ${e.value}`))].map(value=><p key={value}><code>{value}</code></p>)}</details>
 </>;
}
