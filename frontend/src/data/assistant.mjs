import fixtures from '../mocks/assistant.fixtures.json' with {type:'json'};
export const assistantLimits=Object.freeze({min:20,max:2000});
export function validateAssistantQuery(query){
 if(!query.trim())return 'Describe la aplicación que quieres construir para empezar.';
 const length=Array.from(query).length;
 if(length<assistantLimits.min)return 'Describe tu idea con al menos 20 caracteres.';
 if(length>assistantLimits.max)return 'La descripción debe tener como máximo 2000 caracteres.';
 return '';
}
// Defensive rendering validation; this is not a replacement for backend validation.
export function validateAssistantResponse(value){
 const fail=()=>{throw new Error('La respuesta del asistente no tiene el formato esperado.');};
 if(value&&typeof value==='object'){value={...value};for(const field of ['components','connections','assumptions','limitations','clarification_questions'])if(value[field]===undefined)value[field]=[];}
 if(!value||typeof value.id!=='string'||!['ok','needs_clarification','no_evidence'].includes(value.status)||!Number.isFinite(Date.parse(value.generated_at)))fail();
 for(const name of ['components','connections','assumptions','limitations','clarification_questions'])if(!Array.isArray(value[name]))fail();
 if(value.components.length>6||(value.title!=null&&(typeof value.title!=='string'||Array.from(value.title).length>80))||(value.summary!=null&&typeof value.summary!=='string'))fail();
 const keys=new Set();
 for(const c of value.components){
  if(!c||!['key','label','role','rationale'].every(k=>typeof c[k]==='string')||(c.full_name!=null&&typeof c.full_name!=='string')||keys.has(c.key))fail();
  keys.add(c.key);
 }
 for(const e of value.connections)if(!e||!keys.has(e.from_key)||!keys.has(e.to_key)||e.from_key===e.to_key||typeof e.protocol!=='string'||typeof e.description!=='string')fail();
 for(const field of ['assumptions','limitations','clarification_questions'])if(!value[field].every(v=>typeof v==='string'))fail();
 if(value.status==='ok'&&(!value.summary||!value.components.length))fail();
 if(value.status==='needs_clarification'&&!value.clarification_questions.length)fail();
 return value;
}
export function resolveComponentTool(component,catalog){
 // PROVISIONAL: full_name means GitHub owner/repository, matching the local catalog's repo.
 return component.full_name?catalog.find(t=>t.repo===component.full_name)??null:null;
}
export function assistantGraphSignature(response){return JSON.stringify([response?.components??[],response?.connections??[]]);}
export const mockAssistant={
 async ask(request,{signal,scenario='ok',delay=1100}={}){
  const error=validateAssistantQuery(request.query);if(error)throw new Error(error);
  await new Promise((resolve,reject)=>{
   if(signal?.aborted){reject(new DOMException('Cancelado','AbortError'));return;}
   const abort=()=>{clearTimeout(timer);reject(new DOMException('Cancelado','AbortError'));};
   const timer=setTimeout(()=>{signal?.removeEventListener('abort',abort);resolve();},delay);
   signal?.addEventListener('abort',abort,{once:true});
  });
  if(scenario==='error')throw new Error('No pudimos generar la propuesta. Tu descripción se conserva; vuelve a intentarlo.');
  return validateAssistantResponse(structuredClone(fixtures[scenario]??fixtures.ok));
 }
};
