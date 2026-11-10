'use client';
import {useMemo,useEffect,useState} from 'react';
import {useAssistantFlow} from '../../../features/assistant/useAssistantFlow';
import {mockAssistant,AssistantError} from '../../../data/assistant.mjs';
import {App} from '../../../App';
import {FixtureBoundary} from '../fixtures';
import {assistantErrors} from '../../../errorPresentation.mjs';
// Explicit documentation-only service. No request is sent to either API.
function useFixtureFlow(isDetail){
 const provider=useMemo(()=>({ask(request,options){const scenario=document.getElementById('ds-scenario')?.value||'ok';return scenario.startsWith('error:')?Promise.reject(new AssistantError(scenario.slice(6),'')):mockAssistant.ask(request,{...options,scenario,delay:1800});}}),[]);
 return useAssistantFlow(isDetail,{provider});
}
export default function PreviewPage(){const [mounted,setMounted]=useState(false),[catalog,setCatalog]=useState('ready');useEffect(()=>setMounted(true),[]);if(!mounted)return null;return <FixtureBoundary value={catalog==='ready'?undefined:{tools:[],profiles:{},status:catalog==='empty'?'ready':catalog,retry:()=>setCatalog('ready')}}><div style={{position:'fixed',right:12,bottom:12,zIndex:10000,background:'#10151c',padding:12,borderRadius:12,fontSize:12}}><label>Respuesta de prueba <select id="ds-scenario" defaultValue="ok" style={{background:'#20262d',color:'#fff'}}><option value="ok">Propuesta</option><option value="needs_clarification">Más contexto</option><option value="no_evidence">Sin evidencia</option>{Object.entries(assistantErrors).map(([code,value])=><option key={code} value={'error:'+code}>{value.title}</option>)}</select></label><label style={{display:"block",marginTop:8}}>Catálogo <select value={catalog} onChange={e=>setCatalog(e.target.value)}><option value="ready">Disponible</option><option value="loading">Cargando</option><option value="error">Error y recuperación</option><option value="empty">Vacío</option></select></label></div><div id="root" onClickCapture={event=>{const link=event.target.closest?.("a");const href=link?.getAttribute("href");if(href?.startsWith("/")){event.preventDefault();event.stopPropagation();window.location.href="/design-system/preview/";}}}><App useFlow={useFixtureFlow}/></div></FixtureBoundary>}
