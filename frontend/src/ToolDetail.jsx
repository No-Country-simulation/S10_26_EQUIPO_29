import {errorPreview} from './mocks/errorPreview.mjs';
import {interfaceErrors,errorActions} from './errorPresentation.mjs';
import React,{useEffect,useState} from 'react';
import {useCatalogData} from './data/CatalogProvider';
import {IntegrationIdeas} from './IntegrationIdeas';
import {Activity,ArrowLeft,ArrowUpRight} from 'lucide-react';

import {repositoryStatus} from './data/catalog.mjs';
import {useBrandIdentity,markBrandFailed} from './brandIdentity';

export function ToolDetail({id,onBack}){
 const {tools,profiles,http,categories,status,retry}=useCatalogData();
 const original=tools.find(t=>t.id===id);
 const [remote,setRemote]=useState(null),[failed,setFailed]=useState(false),[attempt,setAttempt]=useState(0);
 useEffect(()=>{
  setRemote(null);setFailed(false);
  if(errorPreview('detail')||errorPreview('missing')){setFailed(errorPreview('missing')?'missing':'failed');return;}
  if(!http||!original)return;
  const controller=new AbortController();
  http.detail(original.full_name,categories,controller.signal).then(record=>{
   if(!controller.signal.aborted)setRemote(record);
  }).catch(error=>{if(!controller.signal.aborted)setFailed(error.status===404?'missing':'failed');});
  return()=>controller.abort();
 },[http,original,categories,id,attempt]);
 const tool=remote?.tool??original;
 const identity=useBrandIdentity(tool||{id,name:''});
 if(!tool&&status!=='ready')return <div className="tool-detail wrap"><h1 id="detail-title" tabIndex={-1}>{status==='loading'?'Cargando ficha…':interfaceErrors.detail}</h1>{status==='error'&&<button className="ui-button ui-button--secondary" onClick={retry}>{errorActions.retry}</button>}</div>;
 if(!tool||failed==='missing')return <div className="tool-detail detail-missing wrap"><h1 id="detail-title" tabIndex={-1}>Herramienta no encontrada</h1><p>{interfaceErrors.missing}</p><button className="detail-back ui-wash" onClick={onBack}><ArrowLeft size={16}/> Cerrar ficha</button></div>;
 const detail=tool,profile=remote?.profile??profiles[id],brand=identity.palette;
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
   {failed&&<div role="alert"><p>{interfaceErrors.detail}</p><button className="ui-button ui-button--secondary" onClick={()=>setAttempt(n=>n+1)}>{errorActions.retry}</button></div>}
   <IntegrationIdeas key={id} ideas={profile.ideas}/>
   <footer><button className="detail-back ui-wash" onClick={onBack}><ArrowLeft size={16}/> Cerrar ficha</button></footer>
  </div>
 </div>;
}
