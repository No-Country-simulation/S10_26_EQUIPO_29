import {useLayoutEffect,useRef,useState} from 'react';
import {ArrowUpRight,BookOpen,Box,Database,Gauge,Layers3,Monitor,Server,UserRound} from 'lucide-react';
import {tools} from './tools';
import {resolveComponentTool} from './data/assistant.mjs';
import {resolveProposalExample} from './data/proposal.mjs';
import {BrandIcon} from './AssistantBrandIcon';

const layerIcons={identity:UserRound,interface:Monitor,service:Server,database:Database,cache:Layers3,metrics:Gauge};
function RecommendationLayer({component,layer,index}){
 const tool=resolveComponentTool(component,tools);
 const Icon=layerIcons[layer?.icon]??Box;
 return <li className="stack-layer" style={{'--stack-delay':`${index*60}ms`}}>
  <div className="stack-layer-role"><Icon size={24} strokeWidth={1.5} aria-hidden="true"/><div><span>{layer?.label??component.role}</span>{layer?.caption&&<p>{layer.caption}</p>}</div></div>
  <div className="stack-layer-brand"><div className="stack-layer-icon" aria-hidden="true">{tool?<BrandIcon tool={tool}/>:<Box size={30}/>}</div><div><h3>{component.label}</h3><span className="stack-layer-category">{tool?.category??component.role}</span></div></div>
  <div className="stack-layer-copy"><p>{component.rationale}</p>{tool&&<a href={'#herramienta/'+tool.id} aria-label={'Ver herramienta '+component.label}>Ver herramienta <ArrowUpRight size={14} aria-hidden="true"/></a>}</div>
 </li>;
}

export function StackProposal({expanded,pending,hasResult,slow,response}){
 const content=useRef(null);
 const [height,setHeight]=useState(400);
 useLayoutEffect(()=>{
  const element=content.current;if(!element)return;
  const measure=()=>setHeight(Math.ceil(element.getBoundingClientRect().height));
  const observer=new ResizeObserver(measure);observer.observe(element);measure();
  return()=>observer.disconnect();
 },[]);
 const recommended=response?.components??[];
 const ok=response?.status==='ok';
 const example=resolveProposalExample(response);
 const generatedAt=response&&Number.isFinite(Date.parse(response.generated_at))?new Date(response.generated_at):null;
 return <div className={'architecture-stage '+(expanded?'is-visible':'')} aria-busy={pending}><div className="architecture-stage-clip">
 <div className="stack-surface" style={{height}}>
 <div className={'stack-building'+(pending&&!hasResult?' is-visible':'')} role="status" aria-hidden={!pending||hasResult}><div><p>{slow?'Está tomando un poco más de tiempo':'Preparando la propuesta de ejemplo…'}</p>{slow&&<p className="stack-loading-hint">Tu descripción sigue guardada. Estamos esperando la respuesta.</p>}</div></div>
 <div ref={content} className={'stack-content'+(!hasResult?' is-waiting':'')}>
 {hasResult&&ok&&<section className="stack-layers-panel" aria-labelledby="stack-tools-title">
  <div className="stack-layers-header"><div><h2 id="stack-tools-title">Capas del stack</h2><p>{example?.description??'Las herramientas recomendadas, su función y el motivo de su elección.'}</p></div>{generatedAt&&<time dateTime={response.generated_at}>Generada el {new Intl.DateTimeFormat('es-CL',{day:'numeric',month:'long',year:'numeric',timeZone:'America/Punta_Arenas'}).format(generatedAt)}</time>}</div>
  <ol className="stack-layer-list">{recommended.map((component,index)=><RecommendationLayer key={component.key} component={component} layer={example?.layers.find(layer=>layer.key===component.key)} index={index}/>)}</ol>
  {example?.steps.length>0&&<section className="stack-integration" aria-labelledby="stack-integration-title" style={{'--stack-delay':`${recommended.length*60}ms`}}><div className="stack-integration-heading"><BookOpen size={22} strokeWidth={1.5} aria-hidden="true"/><h2 id="stack-integration-title">Cómo trabajan juntas</h2></div><p className="stack-integration-note">Guía de integración de ejemplo</p><ol>{example.steps.map((step,index)=><li key={step.title}><span className="stack-step-number" aria-hidden="true">{index+1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol></section>}
  <ResponseContext response={response}/>
 </section>}
 {hasResult&&!ok&&<section className="stack-outcome" aria-label={response?.status==='needs_clarification'?'Aclaraciones necesarias':'Sin evidencia suficiente'}>
 <h2>{response?.status==='needs_clarification'?'Completemos la descripción':'No hay evidencia suficiente'}</h2>
 {response?.status==='needs_clarification'?<><ol>{response.clarification_questions.map((q,i)=><li key={i}>{q}</li>)}</ol><p>Añade estas respuestas a tu descripción original y vuelve a generar la propuesta. Incluye toda la información: cada consulta se evalúa por separado y no conserva la conversación anterior.</p></>:<p>{response?.summary||'No encontramos evidencia suficiente para recomendar un stack. Prueba con una descripción más concreta o revisa el catálogo.'}</p>}
 <ResponseContext response={response}/></section>}
 </div></div></div></div>;
}
function ResponseContext({response}){
 return response&&<div className="assistant-context">{response.assumptions.length>0&&<details><summary>Supuestos</summary><ul>{response.assumptions.map((v,i)=><li key={i}>{v}</li>)}</ul></details>}{response.limitations.length>0&&<details><summary>Limitaciones</summary><ul>{response.limitations.map((v,i)=><li key={i}>{v}</li>)}</ul></details>}</div>;
}
