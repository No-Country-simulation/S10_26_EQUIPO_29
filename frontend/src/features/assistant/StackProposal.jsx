import {useLayoutEffect,useRef} from 'react';
import {DotSadFace,DotQuestion} from '../../DotSadFace';
import {ProposalSkeleton} from './ProposalSkeleton';
import {ProposalTabs} from './ProposalTabs';

export function StackProposal({expanded,pending,hasResult,slow,response,originalPrompt,onNewArchitecture,resultHeader}){
 const ok=response?.status==='ok';
 const questionsRef=useRef(null);
 useLayoutEffect(()=>{
  const group=questionsRef.current;
  if(!group)return;
  const update=()=>{
   const bounds=group.getBoundingClientRect();
   group.querySelectorAll('.clarification-question').forEach(card=>{
    // Offset geometry is unaffected by the entrance transform.
    const x=card.offsetLeft,y=card.offsetTop;
    card.style.setProperty('--light-width',`${bounds.width}px`);
    card.style.setProperty('--light-height',`${bounds.height}px`);
    card.style.setProperty('--light-x',`${-x}px`);
    card.style.setProperty('--light-y',`${-y}px`);
    const strength=Math.max(.25,1-.5*x/Math.max(bounds.width,1)-.35*y/Math.max(bounds.height,1));
    card.style.setProperty('--edge-light',String(.22*strength));
   });
  };
  update();
  const observer=new ResizeObserver(update);
  observer.observe(group);
  return ()=>observer.disconnect();
 },[response?.id,response?.status,response?.clarification_questions]);
 return <div className={'architecture-stage '+(expanded?'is-visible':'')} aria-busy={pending}><div className="architecture-stage-clip">
 <div className="stack-surface">
 <div className={'stack-content'+(!hasResult?' is-waiting':'')}>
 {pending&&<ProposalSkeleton/>}
 {hasResult&&ok&&<section className="stack-layers-panel" aria-label="Propuesta de arquitectura">
  <ProposalTabs key={response.id} response={response}/>
  {resultHeader}
  <ResponseContext response={response} compact/>
  {originalPrompt&&<section className="proposal-original"><h3>Tu idea original</h3><p>{originalPrompt}</p></section>}
 </section>}
 {hasResult&&!ok&&<section className={'stack-outcome'+(response?.status==='needs_clarification'?' clarification-outcome':' evidence-outcome')} aria-label={response?.status==='needs_clarification'?'Aclaraciones necesarias':'Sin evidencia suficiente'}>

 {response?.status==='needs_clarification'?<ul ref={questionsRef} className="clarification-questions" key={response.id}>{response.clarification_questions.map((q,i)=><li className="clarification-question" onPointerMove={event=>{if(event.pointerType==='touch'||!matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches)return;const card=event.currentTarget,rect=card.getBoundingClientRect();card.style.setProperty('--glare-x',`${event.clientX-rect.left}px`);card.style.setProperty('--glare-y',`${event.clientY-rect.top}px`);}} key={i} style={{'--question-delay':`${Math.min(i,5)*55}ms`}}><DotQuestion index={i}/><p>{q}</p></li>)}</ul>:null}
 {response?.status==='no_evidence'&&<div className="evidence-face"><DotSadFace variant="dizzy"/></div>}
 <ResponseContext response={response} onNewArchitecture={onNewArchitecture}/>
 {originalPrompt&&response?.status!=='needs_clarification'&&<section className="proposal-original"><h3>Tu idea original</h3><p>{originalPrompt}</p></section>}</section>}
 </div></div></div></div>;
}
export function ResponseContext({response}){
 return response&&<div className="proposal-context-open">{[["Supuestos",response.assumptions],["Limitaciones",response.limitations]].map(([title,items])=>items.length>0&&<section key={title} className={title==='Supuestos'?'context-panel context-assumptions':'context-panel context-limitations'}><h3>{title}</h3><ul>{items.map((v,i)=><li key={i} style={{'--item-reveal-delay':`${Math.min(i,6)*40}ms`}}>{v}</li>)}</ul></section>)}</div>;
}
