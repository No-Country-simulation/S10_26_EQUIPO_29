import {useLayoutEffect,useRef,useState} from 'react';
import {ArrowUpRight,Box} from 'lucide-react';
import {tools} from './tools';
import {resolveComponentTool} from './data/assistant.mjs';
import {BrandIcon} from './AssistantBrandIcon';
import {useBrandIdentity} from './brandIdentity';

function RecommendationCard({component,index}){
 const tool=resolveComponentTool(component,tools);
 const identity=useBrandIdentity(tool??{id:'unconfigured',name:component.label});
 return <li className="stack-tool" style={{'--stack-delay':`${index*60}ms`,'--stack-brand-start':identity.palette.start,'--stack-brand-end':identity.palette.end,'--stack-brand-tag':identity.palette.tag}}><div className="stack-tool-heading"><div className="stack-tool-icon" aria-hidden="true">{tool?<BrandIcon tool={tool}/>:<Box size={28}/>}</div><div><h3>{component.label}</h3><span className="stack-role">{component.role}</span></div></div><p>{component.rationale}</p>{tool&&<a href={'#herramienta/'+tool.id}>Ver herramienta <ArrowUpRight size={14}/></a>}</li>;
}

export function StackProposal({expanded,pending,hasResult,response}){
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
 return <div className={'architecture-stage '+(expanded?'is-visible':'')} aria-busy={pending}><div className="architecture-stage-clip">
 <div className="stack-surface" style={{height}}>
 <div className={'stack-building'+(pending&&!hasResult?' is-visible':'')} role="status" aria-hidden={!pending||hasResult}>Preparando la propuesta de ejemplo…</div>
 <div ref={content} className={'stack-content'+(!hasResult?' is-waiting':'')}>
 {hasResult&&ok&&<>
 {recommended.length>0&&<section className="stack-recommendations" aria-labelledby="stack-tools-title"><h2 id="stack-tools-title">Herramientas recomendadas</h2><ol className={"stack-tool-list"+(recommended.length>4?" stack-tool-list-wide":"")}>{recommended.map((component,index)=><RecommendationCard key={component.key} component={component} index={index}/>)}</ol></section>}

 </>}
 {hasResult&&!ok&&<section className="stack-outcome" aria-label={response?.status==='needs_clarification'?'Aclaraciones necesarias':'Sin evidencia suficiente'}>
 <h2>{response?.status==='needs_clarification'?'Completemos la descripción':'No hay evidencia suficiente'}</h2>
 {response?.status==='needs_clarification'?<><ol>{response.clarification_questions.map((q,i)=><li key={i}>{q}</li>)}</ol><p>Completa tu idea con estas respuestas. Cada envío se evalúa de forma independiente.</p></>:<p>{response?.summary||'No encontramos evidencia suficiente para recomendar un stack. Prueba con una descripción más concreta o revisa el catálogo.'}</p>}
 </section>}
 {hasResult&&response&&<div className="assistant-context">{response.assumptions.length>0&&<details><summary>Supuestos</summary><ul>{response.assumptions.map((v,i)=><li key={i}>{v}</li>)}</ul></details>}{response.limitations.length>0&&<details><summary>Limitaciones</summary><ul>{response.limitations.map((v,i)=><li key={i}>{v}</li>)}</ul></details>}</div>}
 </div></div></div></div>;
}
