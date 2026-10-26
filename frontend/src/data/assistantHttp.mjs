import {AssistantError} from './assistant.mjs';
const failures={
 422:['invalid_query','Revisa la descripción: debe contener entre 20 y 2000 caracteres.'],
 502:['invalid_response','La respuesta llegó incompleta. Tu descripción se conserva; puedes reintentar.'],
 503:['provider_unavailable','El asistente no está disponible ahora. Tu descripción se conserva; puedes reintentar.'],
 504:['timeout','La consulta tardó demasiado. Tu descripción se conserva; puedes reintentar.']
};
// Opt-in transport. The local preview continues to use mockAssistant.
export function createHttpAssistantProvider({baseUrl,fetchImpl=globalThis.fetch}){
 const url=new URL('assistant',baseUrl.endsWith('/')?baseUrl:baseUrl+'/');
 return {async ask({query},{signal}={}){
  const response=await fetchImpl(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query}),signal});
  const payload=await response.json().catch(()=>null);
  if(!response.ok){
   const failure=failures[response.status];
   if(failure&&payload?.error?.code===failure[0]&&typeof payload.error.message==='string')throw new AssistantError(...failure);
   throw new AssistantError('technical_error','No pudimos generar la propuesta. Tu descripción se conserva; vuelve a intentarlo.');
  }
  return payload; // requestAssistant validates the full response and catalog references.
 }};
}
