import React from 'react';
import {ArrowUpRight} from 'lucide-react';
import {RevealHeading} from '../../PageReveal';
import {HeroLights} from '../../HeroLights';
import {promptMotion} from '../../promptPresentation.mjs';
import {StackProposal} from './StackProposal';
import {PromptComposer} from './PromptComposer';
export function Assistant({flow}){
 const {assistantResponse,originalPrompt,slow,resultHeading,finished,pending,expanded,hasResult,input,newArchitecture}=flow;
 return (<div className="hero"><HeroLights inputRef={input}/><section id="asistente"><div className={'hero-inner'+(expanded?' has-architecture':'')} style={Object.fromEntries([...Object.entries(promptMotion).filter(([key])=>key!=='ease').map(([key,value])=>[`--prompt-${key}-duration`,`${value}ms`]),['--prompt-ease',promptMotion.ease]])}>
 <div className="prompt-heading"><div className="prompt-heading-initial" aria-hidden={expanded}><RevealHeading as="h1" text="De tu idea a tu stack" mobileBreak/></div><h1 ref={resultHeading} tabIndex={-1} className="prompt-heading-result" aria-hidden={!expanded}>{assistantResponse?.title||({needs_clarification:'Precisemos tu idea',no_evidence:'Sin evidencia suficiente'}[assistantResponse?.status]||'Tu arquitectura')}</h1></div>
 <div className="prompt-intro"><p className="intro intro-initial" aria-hidden={expanded}>Describe tu idea, y te recomiendo un stack</p><p className="intro intro-result" aria-hidden={!expanded}>{assistantResponse?.summary||(pending?'Preparando una propuesta de ejemplo':'Una propuesta basada en tu descripción')}</p></div>
 {finished&&<div className="stack-new-action"><button type="button" className="new-architecture" onClick={newArchitecture}>Crear nueva arquitectura <ArrowUpRight size={16}/></button></div>}
 <StackProposal expanded={expanded} pending={pending} hasResult={hasResult} slow={slow} response={assistantResponse}/>

 <PromptComposer {...flow}/>
 {finished&&<div className="architecture-result-tools"><details className="original-prompt"><summary>Tu idea original</summary><p>{originalPrompt}</p></details></div>}
 <div className="prompt-feedback"><p className="architecture-demo-note" aria-hidden={!expanded}>Datos de demostración · Respuesta mock, sin conexión a IA.</p><p className={'prompt-update-status'+(pending&&hasResult?' is-visible':'')} role="status" aria-hidden={!pending||!hasResult}>{slow?'Está tomando un poco más de tiempo. Conservamos tu descripción y el resultado anterior.':'Consultando el asistente de ejemplo…'}</p></div>
 </div></section>
 </div>
);
}
