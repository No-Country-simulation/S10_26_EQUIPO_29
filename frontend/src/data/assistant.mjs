import fixtures from '../mocks/assistant.fixtures.json' with {type:'json'};
import edgeFixtures from '../mocks/assistant-edge.fixtures.json' with {type:'json'};
export const assistantLimits=Object.freeze({min:20,max:2000});
export class AssistantError extends Error{
 constructor(code,message){super(message);this.name='AssistantError';this.code=code;}
}
export function validateAssistantQuery(query){
 if(typeof query!=='string'||!query.trim())return 'Describe la aplicación que quieres construir para empezar.';
 const length=Array.from(query).length;
 if(length<assistantLimits.min)return 'Describe tu idea con al menos 20 caracteres.';
 if(length>assistantLimits.max)return 'La descripción debe tener como máximo 2000 caracteres.';
 return '';
}
const nonblank=value=>typeof value==='string'&&value.trim().length>0;
const repoName=value=>nonblank(value)&&/^[^/\s]+\/[^/\s]+$/.test(value.trim());
// Validate the entire payload before replacing the visible result.
export function validateAssistantResponse(value){
 const fail=()=>{throw new AssistantError('invalid_response','La respuesta llegó incompleta o con un formato inesperado. Tu descripción se conserva; puedes reintentar.');};
 if(!value||typeof value!=='object'||Array.isArray(value))fail();
 value={...value};
 for(const field of ['components','assumptions','limitations','clarification_questions'])if(value[field]===undefined)value[field]=[];
 if(!nonblank(value.id)||!['ok','needs_clarification','no_evidence'].includes(value.status)||typeof value.generated_at!=='string'||!/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value.generated_at)||!Number.isFinite(Date.parse(value.generated_at)))fail();
 for(const name of ['components','assumptions','limitations','clarification_questions'])if(!Array.isArray(value[name]))fail();
 if(value.components.length>6||(value.title!=null&&(typeof value.title!=='string'||Array.from(value.title).length>80))||(value.summary!=null&&typeof value.summary!=='string'))fail();
 for(const field of ['title','summary'])if(typeof value[field]==='string'&&!value[field].trim())value[field]=null;
 const keys=new Set();
 for(const c of value.components){
  if(!c||typeof c!=='object'||!['key','label','role','rationale'].every(k=>nonblank(c[k]))||(c.full_name!=null&&!repoName(c.full_name))||keys.has(c.key))fail();
  keys.add(c.key);
 }
 for(const field of ['assumptions','limitations','clarification_questions'])if(!value[field].every(nonblank))fail();
 if(value.status==='ok'&&(!nonblank(value.summary)||!value.components.length))fail();
 if(value.status==='needs_clarification'&&!value.clarification_questions.length)fail();
 return value;
}
export function resolveComponentTool(component,catalog){
 const name=component?.full_name;
 return typeof name==='string'?catalog.find(t=>t.full_name?.trim().toLowerCase()===name.trim().toLowerCase())??null:null;
}
export function validateAssistantCatalog(response,catalog){
 for(const component of response.components){
  // null means a part of the user's application, permitted by the draft contract.
  if(component.full_name==null)continue;
  const tool=resolveComponentTool(component,catalog);
  if(!tool||tool.archived===true||tool.disabled===true)throw new AssistantError('unavailable_tool','Una herramienta de la propuesta no está disponible en el catálogo activo. Tu descripción se conserva; vuelve a intentarlo.');
 }
 return response;
}
export const mockAssistant={
 async ask(request,{signal,scenario='ok',delay=1100,attempt=1}={}){
  const error=validateAssistantQuery(request.query);if(error)throw new AssistantError('invalid_query',error);
  await new Promise((resolve,reject)=>{
   if(signal?.aborted){reject(new DOMException('Cancelado','AbortError'));return;}
   const abort=()=>{clearTimeout(timer);reject(new DOMException('Cancelado','AbortError'));};
   const timer=setTimeout(()=>{signal?.removeEventListener('abort',abort);resolve();},delay);
   signal?.addEventListener('abort',abort,{once:true});
  });
  if(scenario==='error'||(scenario==='error_once'&&attempt===1))throw new AssistantError('technical_error','No pudimos generar la propuesta. Tu descripción se conserva; vuelve a intentarlo.');
  const selected=scenario==='clarification_then_ok'?(attempt===1?fixtures.needs_clarification:fixtures.ok):(edgeFixtures[scenario]??fixtures[scenario]??fixtures.ok);
  return validateAssistantResponse(structuredClone(selected));
 }
};
