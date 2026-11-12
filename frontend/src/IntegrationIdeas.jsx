import {useId,useState} from 'react';
import {FollowingTooltip} from './FollowingTooltip';
import {ArrowUpRight,ChevronDown,SignalLow,SignalMedium,SignalHigh,Sparkles} from 'lucide-react';
import {Snippet} from './Snippet';

export function ReviewBadge({idea}){
 const reviewed=idea.reviewStatus==='reviewed';
 const supported=reviewed||idea.reviewStatus==='suggested';
 if(!idea.reviewLabel)return null;
 if(!supported)return <span className="integration-review">{idea.reviewLabel}</span>;
 const Icon=Sparkles;
 return <FollowingTooltip text={reviewed?'Esta idea fue revisada por profesionales.':'Esta idea fue generada por IA y aún no ha sido revisada por profesionales.'}>
  {trigger=><button type="button" className="integration-review" data-review={idea.reviewStatus} {...trigger}>{reviewed?<svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5 15 4l3.9.3.8 3.8L22 11l-1.7 3.5.1 3.9-3.7 1.3L14 22.5l-3.6-1.4-3.8.6-1.8-3.4-3.1-2.3 1-3.8L2.5 8.4 6 6.7l2-3.3z"/><path d="m8 12 2.5 2.5L16 9" fill="none" stroke="var(--neutral-100, #101010)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>:<Icon size={13} fill="currentColor" strokeWidth={1.2} aria-hidden="true"/>}{idea.reviewLabel}</button>}
 </FollowingTooltip>;
}

export function DifficultyBadge({difficulty}){
 const level=({'Básica':'low','Intermedia':'medium','Avanzada':'high'})[difficulty];
 const Icon=({'low':SignalLow,'medium':SignalMedium,'high':SignalHigh})[level];
 return <span className="integration-difficulty" data-level={level}>{Icon&&<Icon size={16} strokeWidth={2} aria-hidden="true"/>}{difficulty}</span>;
}

export function IntegrationIdeas({ideas}){
 const [opened,setOpened]=useState(ideas[0]?.id??null);
 const prefix=useId();
 if(!ideas.length)return <section className="detail-integrations integration-accordion"><h2>Ideas de integración</h2><p>No hay ideas de integración disponibles para esta herramienta.</p></section>;
 return <section className="detail-integrations integration-accordion"><h2>Ideas de integración</h2>
  {ideas.map((idea,index)=>{
   const expanded=opened===idea.id;
   const panelId=`${prefix}-panel-${index}`,headingId=`${prefix}-heading-${index}`;
   const facts=[['Stack compatible',idea.stack],['Dependencias',idea.dependencies],['Disparadores',idea.triggers]].filter(([,value])=>Array.isArray(value)?value.length:!!value);
   return <article className={'integration'+(expanded?' is-open':'')} key={idea.id}>
    <div className="integration-header" onClick={()=>setOpened(expanded?null:idea.id)}>
    <div className="integration-review-heading"><ReviewBadge idea={idea}/></div>
    <h3 className="integration-heading"><button id={headingId} type="button" className="integration-toggle" aria-expanded={expanded} aria-controls={panelId}>
     <span className="integration-title">{idea.title}</span>
     <span className="integration-header-field"><span>Tipo</span><span className="integration-type">{idea.type}</span></span>
     <span className="integration-header-field"><span>Dificultad</span><DifficultyBadge difficulty={idea.difficulty}/></span>
     <ChevronDown size={20} className="integration-chevron" aria-hidden="true"/>
    </button></h3>
    </div>
    <div id={panelId} role="region" aria-labelledby={headingId} aria-hidden={!expanded} inert={!expanded?true:undefined} className="integration-collapse"><div className="integration-collapse-clip"><div className="integration-content">
     {idea.summary&&<p className="integration-summary">{idea.summary}</p>}
     <div className="integration-columns">
      <dl className="integration-facts">{facts.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{Array.isArray(value)?<ul>{value.map((text,i)=><li key={i}>{text}</li>)}</ul>:value}</dd></div>)}</dl>
      <div className="integration-code">{idea.snippet?<Snippet text={idea.snippet} language={idea.snippetLanguage}/>:<div className="integration-code-empty">Código no disponible</div>}{idea.docs&&<a className="integration-docs" href={idea.docs} target="_blank" rel="noopener noreferrer">Consultar documentación <ArrowUpRight size={15} aria-hidden="true"/></a>}</div>
     </div>
    </div></div></div>
   </article>;
  })}
 </section>;
}
