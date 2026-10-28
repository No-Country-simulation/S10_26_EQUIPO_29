import React,{useEffect,useRef,useState} from 'react';
import {profiles} from '../../toolProfiles';
import {cardDetails} from '../../tools';
import {useBrandIdentity,markBrandFailed} from '../../brandIdentity';
import {useCardTilt} from '../../useCardTilt';
import {UserRound,Star,GitCommitHorizontal,Scale,Activity,ArrowRight} from 'lucide-react';
export function ToolCard({ tool, onOpen }) {
 const tiltRef = useCardTilt();
 const descriptionRef=useRef(null);
 const [descriptionClipped,setDescriptionClipped]=useState(false);
 const description=profiles[tool.id]?.summary;
 useEffect(()=>{
  const element=descriptionRef.current;
  if(!element){setDescriptionClipped(false);return;}
  let active=true;
  const measure=()=>{if(active)setDescriptionClipped(element.scrollHeight>element.clientHeight+1);};
  const observer=new ResizeObserver(measure);
  observer.observe(element);
  measure();
  document.fonts.ready.then(measure);
  return ()=>{active=false;observer.disconnect();};
 },[description]);
 const identity=useBrandIdentity(tool);
 const logo=identity.logo;
 const detail = cardDetails[tool.name];
 const hasHealth=Number.isFinite(detail.healthScore);
 const healthTone = !hasHealth?'unknown':detail.healthScore >= 80 ? 'good' : detail.healthScore >= 60 ? 'moderate' : 'low';
 const healthLabel = {good:'Salud alta',moderate:'Salud media',low:'Salud baja'}[healthTone];
 const brand = identity.palette;
 const postgres = tool.name === 'PostgreSQL';
 const metrics = [
  ['Estrellas', tool.stars.toLocaleString('es-CL'), Star],
  ['Último push', tool.activity, GitCommitHorizontal],
  ['Licencia', tool.license, Scale],
  ['Mantenedor activo', tool.maintained === true ? 'Sí' : tool.maintained === false ? 'No' : 'Por confirmar', UserRound]
 ];
 return <article data-tool-id={tool.id} onClick={e=>{if(!e.target.closest('a,button,summary,details')&&!window.getSelection()?.toString())onOpen(tool.id,e.currentTarget.querySelector('.detail-link'));}} ref={tiltRef} className="tool-card" aria-label={tool.name} style={{
  '--brand-start': brand.start, '--brand-end': brand.end, '--brand-tag': brand.tag
 }}>
  <div className="card-surface">
  <div className="tool-card-intro">
   {identity.watermark && (postgres ? <div className="card-watermark" aria-hidden="true"><img src={identity.watermark} onError={()=>markBrandFailed('watermark:'+identity.watermark)} alt=""/></div> : <img className="brand-watermark" src={identity.watermark} onError={()=>markBrandFailed('watermark:'+identity.watermark)} alt="" aria-hidden="true"/>)}
   <div className="tool-card-title">
    {identity.fallback ? <span className="brand-initials" aria-hidden="true">{identity.initials}</span> : postgres ? <div className="tool-logo"><img src={logo} onError={()=>markBrandFailed(logo)} alt=""/></div> : <img className={identity.wordmark ? 'brand-logo brand-wordmark' : 'brand-logo'} src={logo} onError={()=>markBrandFailed(logo)} alt=""/>}
    <h3 className={identity.wordmark ? 'sr-only' : undefined}>{tool.name}</h3>
   </div>
   <div className="tool-tags">
    <span>{tool.category}</span>
    <span className="language-tag" title="Lenguaje principal del repositorio">{tool.language}</span>

   </div>
   {description&&<p ref={descriptionRef}>{description}</p>}
   {descriptionClipped&&<a className="card-read-more" href={'#herramienta/'+tool.id} aria-label={'Ver descripción completa de '+tool.name} onClick={e=>{if(!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){e.preventDefault();onOpen(tool.id,e.currentTarget.closest('.tool-card').querySelector('.detail-link'));}}}>Ver más</a>}
  </div>
  <div className="tool-card-details">
   <div className="card-tech-summary">
   <span className={"health-score health-score--"+healthTone} role="img" aria-label={hasHealth?`Salud del repositorio: ${detail.healthScore} de 100`:'Salud sin evaluar'}>
    <Activity size={20} strokeWidth={1.75} className="health-icon" aria-hidden="true"/>
    <strong aria-hidden="true">{hasHealth?<>{detail.healthScore}<span>/100</span></>:<span>Sin evaluar</span>}</strong>
   </span>
   </div>
   <dl className="tool-metrics">{metrics.map(([label,value,Icon],index)=><React.Fragment key={label}>
    {index > 0 && <div className="metric-divider" aria-hidden="true"><img src="/assets/cards/divider.svg" alt=""/></div>}
    <div className="tool-metric"><dt><Icon size={14} strokeWidth={1.75} aria-hidden="true"/><span>{label}</span></dt><dd>{value}</dd></div>
   </React.Fragment>)}</dl>
   <div className="tool-actions">
    <a className="detail-link ui-wash" href={'#herramienta/'+tool.id} onClick={e=>{if(!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){e.preventDefault();onOpen(tool.id,e.currentTarget);}}} aria-label={'Ver detalle de '+tool.name}>Ver detalle <ArrowRight size={14}/></a>
    {tool.repo ? <a className="ui-wash" href={'https://github.com/'+tool.repo} target="_blank" rel="noopener noreferrer" aria-label={'Ver repositorio de '+tool.name+' (otra pestaña)'}>Repositorio ↗</a> : <button type="button" className="example-repository ui-wash" disabled aria-disabled="true" aria-label="Repositorio no disponible para Default">Repositorio ↗</button>}
   </div>
  </div>
  <div className="card-glare" aria-hidden="true"/>
  </div>
 </article>;
}
