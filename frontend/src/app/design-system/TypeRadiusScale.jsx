import scale from '../../theme/type-radius.json';
import {Copy} from './Reference';
export function TypeRadiusScale({radii=false}) {
 if(!radii) return <>
 <p>Pesos e interlineados compartidos. Los tamaños están reunidos en la tabla anterior.</p>
 <div className="ds-type-table-wrap"><table className="ds-type-table"><thead><tr><th scope="col">Propiedad</th><th scope="col">Valor</th><th scope="col">Muestra</th></tr></thead><tbody>{scale.tokens.filter(t=>['line-height','font-weight'].includes(t.property)).map(t=><tr key={t.name}><th scope="row">{t.property==='line-height'?'Interlineado':'Peso'}</th><td><Copy value={t.value}/></td><td><span className="ds-type-size-sample" style={t.property==='line-height'?{lineHeight:t.value}:{fontWeight:t.value}}>Construye tu idea{t.property==='line-height'&&<><br/>Encuentra las herramientas</>}</span></td></tr>)}</tbody></table></div>
 </>;
 const groups=radii?[['border-radius','Radios compartidos']]:[['font-size','Tamaños compartidos'],['line-height','Interlineados compartidos'],['font-weight','Pesos compartidos']];
 const exceptions=scale.exceptions.filter(item=>radii?item.property==='border-radius':item.property!=='border-radius');
 return <>
 <p>Valores existentes centralizados, sin cambiar el aspecto de la plataforma. Se sustituyeron {scale.migratedDeclarations} declaraciones de tipografía y radios por referencias compartidas con equivalencia exacta.</p>
 {groups.map(([property,label])=><section key={property}><h3>{label}: {scale.tokens.filter(t=>t.property===property).length}</h3>{radii?<div className="ds-palette-grid">{scale.tokens.filter(t=>t.property===property).map(t=><article key={t.name}><div style={{width:80,height:56,border:'1px solid var(--neutral-700)',borderRadius:`var(${t.name})`}}/><Copy value={t.value}/></article>)}</div>:<div className="ds-type-table-wrap"><table className="ds-type-table"><caption className="sr-only">{label}</caption><thead><tr><th scope="col">Valor</th><th scope="col">Muestra</th></tr></thead><tbody>{scale.tokens.filter(t=>t.property===property).map(t=><tr key={t.name}><th scope="row"><Copy value={t.value}/></th><td><span className="ds-type-size-sample" style={{fontSize:property==='font-size'?t.value:undefined,lineHeight:property==='line-height'?t.value:undefined,fontWeight:property==='font-weight'?t.value:undefined}}>Construye tu idea</span></td></tr>)}</tbody></table></div>}</section>)}
 <details className="ds-source"><summary>Excepciones conservadas: {new Set(exceptions.map(e=>e.property+'|'+e.value)).size} valores por propiedad</summary><p>Se conservan tamaños específicos, ajustes responsive, herencia y geometrías particulares. No son nuevas variantes recomendadas. Las animaciones y el espaciado entre letras no se modificaron.</p>{[...new Set(exceptions.map(e=>`${e.property}: ${e.value}`))].map(value=><p key={value}><code>{value}</code></p>)}</details>
 </>;
}
