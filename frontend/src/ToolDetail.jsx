import React from 'react';
import {IntegrationIdeas} from './IntegrationIdeas';
import {Activity,ArrowLeft,ArrowUpRight} from 'lucide-react';
import {tools,cardDetails} from './tools';
import {repositoryStatus} from './data/catalog.mjs';
import {useBrandIdentity,markBrandFailed} from './brandIdentity';
import {profiles} from './toolProfiles';
export function ToolDetail({id,onBack}){
 const tool=tools.find(t=>t.id===id);
 const identity=useBrandIdentity(tool||{id,name:''});
 if(!tool)return <div className="tool-detail detail-missing wrap"><h1 id="detail-title" tabIndex={-1}>Herramienta no encontrada</h1><p>Esta ficha no está disponible en el catálogo.</p><button className="detail-back ui-wash" onClick={onBack}><ArrowLeft size={16}/> Cerrar ficha</button></div>;
 const detail=cardDetails[tool.name],profile=profiles[id],brand=identity.palette;
 const hasHealth=Number.isFinite(detail.healthScore);
 const tone=!hasHealth?'unknown':detail.healthScore>=80?'good':detail.healthScore>=60?'moderate':'low';
 const logo=identity.logo;
 return <div className="tool-detail" style={{'--brand-start':brand.start,'--brand-end':brand.end,'--brand-tag':brand.tag}}>
  <section className="detail-cover" data-tool-id={id} aria-label={`Portada de ${tool.name}`}>
   {identity.watermark && <img className="detail-watermark" src={identity.watermark} onError={()=>markBrandFailed('watermark:'+identity.watermark)} alt="" aria-hidden="true"/>}
   <div className="wrap detail-cover-inner">
   <div className="detail-identity">{identity.fallback ? <span className="brand-initials" aria-hidden="true">{identity.initials}</span> : <img src={logo} onError={()=>markBrandFailed(logo)} alt=""/>}<h1 id="detail-title" tabIndex={-1}>{tool.name}</h1></div>
   <div className="tool-tags"><span>{tool.category}</span><span>{tool.language}</span></div></div>
  </section>
  <div className="detail-body wrap">
   <div className="detail-overview"><section>{profile.summary&&<><h2>Acerca de {tool.name}</h2><p className="detail-summary">{profile.summary}</p></>}
   <div className="detail-actions">{tool.repo && <a className="ui-button ui-button--primary" href={`https://github.com/${tool.repo}`} target="_blank" rel="noopener noreferrer">Repositorio <ArrowUpRight size={16}/></a>}{profile.homepage && <a className="ui-button ui-button--secondary" href={profile.homepage} target="_blank" rel="noopener noreferrer">Sitio web <ArrowUpRight size={16}/></a>}</div></section>
   <aside className="detail-metrics" aria-label="Datos técnicos"><div className="detail-health"><h2>Salud del repositorio</h2><span className={`health-score health-score--${tone}`} role="img" aria-label={hasHealth?`Salud del repositorio: ${detail.healthScore} de 100`:'Salud sin evaluar'}><Activity className="health-icon" size={20}/><strong>{hasHealth?<>{detail.healthScore}<span>/100</span></>:<span>Sin evaluar</span>}</strong></span></div>
   <dl>{[['Estrellas',tool.stars.toLocaleString('es-CL')],['Issues y PRs abiertos',detail.openIssues??'Sin datos'],['Último push',tool.activity],['Mantenedor activo',tool.maintained===true?'Sí':tool.maintained===false?'No':'Por confirmar'],['Repositorio',repositoryStatus(tool)],['Licencia',tool.license],['Lenguaje',tool.language]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></aside></div>
   <IntegrationIdeas key={id} ideas={profile.ideas}/>
   <footer><button className="detail-back ui-wash" onClick={onBack}><ArrowLeft size={16}/> Cerrar ficha</button></footer>
  </div>
 </div>;
}
