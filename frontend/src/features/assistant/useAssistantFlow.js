import {useExamplePlaceholder} from './useExamplePlaceholder';
import {useState,useRef,useEffect,useReducer} from 'react';
import {tools} from '../../tools';
import {promptPresentation,initialPresentation} from '../../promptPresentation.mjs';
import {usePromptLayout} from '../../usePromptLayout';
import {validateAssistantQuery} from '../../data/assistant.mjs';
import {requestAssistant} from '../../data/assistantRequest.mjs';
import {assistantScenarioOptions} from '../../mocks/assistant-scenarios.mjs';
export function useAssistantFlow(isDetail){
 const [query,setQuery]=useState(''),[error,setError]=useState('');
 const [assistantResponse,setAssistantResponse]=useState(null);
 const [originalPrompt,setOriginalPrompt]=useState('');
 const [slow,setSlow]=useState(false),[canRetry,setCanRetry]=useState(false);
 const attempts=useRef(0);
 const resultHeading=useRef(null);
 const finished=Boolean(assistantResponse&&assistantResponse.status!=='needs_clarification');
 const [presentation,dispatchPresentation]=useReducer(promptPresentation,initialPresentation);
 const {pending,expanded,hasResult}=presentation;
 const phase=pending?'loading':hasResult?'done':'idle';
 const [promptFocused, setPromptFocused] = useState(false);
 const placeholder = useExamplePlaceholder(isDetail || promptFocused || Boolean(query) || phase === 'loading');
 const input=useRef(null), request=useRef(null);useEffect(()=>()=>request.current?.abort(),[]);
 const preparePromptLayout=usePromptLayout(expanded,input,isDetail);
 useEffect(()=>{if(isDetail){request.current?.abort();setSlow(false);dispatchPresentation({type:'cancel'});}},[isDetail]);
 useEffect(()=>{if(finished&&!isDetail)resultHeading.current?.focus({preventScroll:true});},[finished,isDetail]);
 function newArchitecture(){
  request.current?.abort();request.current=null;attempts.current=0;setSlow(false);setCanRetry(false);setAssistantResponse(null);setOriginalPrompt('');setQuery('');setError('');
  dispatchPresentation({type:'reset'});
  requestAnimationFrame(()=>input.current?.focus({preventScroll:true}));
 }
 async function submit(e){
  e?.preventDefault();if(pending||request.current)return;
  const validation=validateAssistantQuery(query);if(validation){setCanRetry(false);setError(validation);input.current.focus();return;}
  setError('');setCanRetry(false);setSlow(false);preparePromptLayout();dispatchPresentation({type:'submit'});
  request.current?.abort();const controller=new AbortController();request.current=controller;
  const submitted=query;
  try{
   const scenario=new URLSearchParams(window.location.search).get('assistantMock')||'ok';
   const response=await requestAssistant({query:submitted},{...assistantScenarioOptions(scenario,tools),signal:controller.signal,attempt:++attempts.current,onSlow:()=>{if(request.current===controller&&!controller.signal.aborted)setSlow(true);}});
   if(controller.signal.aborted)return;
   setOriginalPrompt(submitted);setAssistantResponse(response);dispatchPresentation({type:'success'});
   setQuery(response.status==='needs_clarification'?submitted:'');
  }catch(error){if(controller.signal.aborted||error.name==='AbortError')return;dispatchPresentation({type:'failure'});setError(error.message||'No pudimos generar la propuesta. Vuelve a intentarlo.');setCanRetry(true);}
  finally{if(request.current===controller){request.current=null;if(!controller.signal.aborted)setSlow(false);}}
 }

 return {query,setQuery,error,setError,assistantResponse,originalPrompt,slow,canRetry,setCanRetry,resultHeading,finished,pending,expanded,hasResult,phase,setPromptFocused,placeholder,input,newArchitecture,submit};
}
