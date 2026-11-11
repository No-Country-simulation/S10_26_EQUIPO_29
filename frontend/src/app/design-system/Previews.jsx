'use client';
import {useRef,useState} from 'react';
import {ArrowUp,ArrowUpRight} from 'lucide-react';
import {ToolCard} from '../../features/catalog/ToolCard';
import {ToolModal} from '../../ToolModal';
import {HealthScore} from '../../HealthScore';
import {FollowingTooltip} from '../../FollowingTooltip';
import {DotSadFace,DotQuestion} from '../../DotSadFace';
import {PromptComposer} from '../../features/assistant/PromptComposer';
import {PromptSuggestions} from '../../features/assistant/PromptSuggestions';
import {WorkingWords} from '../../features/assistant/WorkingWords';
import {CatalogFilters} from '../../features/catalog/CatalogFilters';
import {useCatalogFilters} from '../../features/catalog/useCatalogFilters';
import {CatalogPagination} from '../../features/catalog/CatalogPagination';
import {CatalogSkeleton} from '../../features/catalog/CatalogSkeleton';
import {StackProposal} from '../../features/assistant/StackProposal';
import {ProposalSkeleton} from '../../features/assistant/ProposalSkeleton';
import {IntegrationIdeas} from '../../IntegrationIdeas';
import {IntegrationIdeasSkeleton} from '../../IntegrationIdeasSkeleton';
import {Snippet} from '../../Snippet';
import {HeroLights} from '../../HeroLights';
import {assistantErrors} from '../../errorPresentation.mjs';
import {specimen,previewPalette} from './fixtures';
import responses from '../../mocks/assistant.fixtures.json';
export function Choices({value,onChange,items,label='Estado de la muestra'}){return <label className="ds-choice">{label}<select value={value} onChange={e=>onChange(e.target.value)}>{items.map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>}
function PromptDemo({suggestions=false}){const [query,setQuery]=useState('Quiero organizar los pedidos y las entregas de mi negocio.'),[state,setState]=useState('initial'),[exampleReveal,setExampleReveal]=useState(null),input=useRef(null);const error=state==='error'?'connection_error':'';const flow={query,setQuery,input,error,setError:()=>{},setCanRetry:()=>{},pending:state==='loading',canRetry:!!error,finished:false,phase:'idle',hasResult:false,expanded:false};return <><Choices value={state} onChange={setState} items={['initial','compact','loading','error'].map((v,i)=>[v,['Inicial','Compacto','Cargando','Reintentar'][i]])}/><div className={`hero ds-prompt-preview${state!=='initial'?' assistant-workspace':''}`}><div className="hero-inner"><PromptComposer {...flow} exampleReveal={exampleReveal} appearance={false} workspace={state!=='initial'} submit={e=>{e.preventDefault();setState('loading');}} stop={()=>setState('compact')}/>{error&&<p id="prompt-error">{assistantErrors[error].description}</p>}{suggestions&&state==='initial'&&<PromptSuggestions flow={flow} onSelect={text=>setExampleReveal({text,id:Date.now()})}/>}</div></div></>}
function CardDemo(){const [variant,setVariant]=useState('complete'),[detail,setDetail]=useState(null);const tool=variant==='long'?{...specimen,name:'Herramienta con un nombre especialmente largo para probar',full_name:'example/herramienta-con-nombre-largo'}:variant==='missing'?{...specimen,id:'ds-missing',full_name:'example/no-logo',name:'Ejemplo',healthScore:null,maintained:null,license:'Sin datos'}:specimen;return <><Choices value={variant} onChange={setVariant} items={ [['complete','Completa'],['long','Nombre largo y fallback'],['missing','Datos ausentes']]}/><div className="ds-real-card" onClickCapture={e=>{const link=e.target.closest('a');if(link?.getAttribute('href')?.includes('#herramienta/')){e.preventDefault();e.stopPropagation();setDetail(tool.id);}}}><ToolCard tool={tool} onOpen={()=>setDetail(tool.id)}/></div>{detail&&<ToolModal id={detail} onClose={()=>setDetail(null)}/>}</>}
function FiltersDemo(){const state=useCatalogFilters(),[page,setPage]=useState(1);return <><CatalogFilters state={state} count={state.filtered.length} paletteFor={previewPalette}/><p>{state.filtered.length} coincidencias en los fixtures de documentación.</p><CatalogPagination page={page} pages={6} onChange={setPage}/></>}
function ResultDemo(){const [state,setState]=useState('ok'),[detail,setDetail]=useState(null);const response=state==='needs_clarification'?{status:state,clarification_questions:['¿Quiénes usarán el sistema?','¿Qué proceso necesitas mejorar?'],assumptions:[],limitations:[]}:state==='no_evidence'?{status:state,summary:'No encontramos evidencia suficiente.',limitations:['Los candidatos encontrados no cubren esta necesidad.'],assumptions:[]}:state==='no_connections'?{...responses.ok,connections:[]}:responses.ok;return <><Choices value={state} onChange={setState} items={ [['ok','Propuesta'],['no_connections','Sin conexiones'],['needs_clarification','Pedir contexto'],['no_evidence','Sin evidencia'],['loading','Cargando']]}/><div className="ds-assistant-preview hero" onClickCapture={e=>{const link=e.target.closest('a');if(link?.getAttribute('href')?.includes('#herramienta/')){e.preventDefault();e.stopPropagation();setDetail(decodeURIComponent(link.getAttribute('href').split('#herramienta/')[1]));}}}><StackProposal expanded pending={state==='loading'} hasResult={state!=='loading'} response={response} originalPrompt="Necesito gestionar los pedidos, clientes y reportes de mi empresa."/></div>{detail&&<ToolModal id={detail} onClose={()=>setDetail(null)}/>}</>}
function ErrorDemo(){const [code,setCode]=useState('connection_error');return <><Choices value={code} onChange={setCode} items={Object.entries(assistantErrors).map(([k,v])=>[k,v.title])}/><div role="status"><h3>{assistantErrors[code].title}</h3><p>{assistantErrors[code].description}</p></div><p>La acción de reintento está en la muestra del input.</p></>}
const demoIdeas=[{id:'ds-reviewed',title:'Consultar datos desde una API',summary:'Ejemplo de documentación para comprobar la composición de una integración.',difficulty:'Básica',type:'API REST',reviewStatus:'reviewed',reviewLabel:'Revisada',stack:['API','Base de datos'],dependencies:['Cliente HTTP'],triggers:['Consulta de usuario'],snippet:'GET /example',snippetLanguage:'text'},{id:'ds-suggested',title:'Procesar una tarea en segundo plano',summary:'Fixture visual para representar una idea sin revisión profesional.',difficulty:'Avanzada',type:'SDK',reviewStatus:'suggested',reviewLabel:'Sugerida',stack:['Worker'],dependencies:['Cola'],triggers:['Nueva tarea']}];
function IdeasDemo(){const [empty,setEmpty]=useState('full');return <><Choices value={empty} onChange={setEmpty} items={ [['full','Con ideas'],['empty','Sin ideas']]}/><IntegrationIdeas ideas={empty==='full'?demoIdeas:[]}/></>}
function DetailDemo(){const [open,setOpen]=useState(false);return <><button className="ui-button ui-button--secondary" onClick={()=>setOpen(true)}>Abrir ficha de muestra</button>{open&&<ToolModal id={specimen.id} onClose={()=>setOpen(false)}/>}</>}
export function Preview({id}){
 if(['card','description','identity'].includes(id))return <CardDemo/>;
 if(['filters','pagination'].includes(id))return <FiltersDemo/>;
 if(['prompt','border','suggestions'].includes(id))return <PromptDemo suggestions={id==='suggestions'}/>;
 if(['proposal','tools','connections','context'].includes(id))return <ResultDemo/>;
 if(['detail','metrics'].includes(id))return <DetailDemo/>;
 if(id==='errors')return <ErrorDemo/>;
 if(id==='ideas')return <IdeasDemo/>;
 if(id==='snippet')return <Snippet text={'GET /example\nAccept: application/json'} language="text"/>;
 if(id==='working')return <div className="intro"><WorkingWords/></div>;
 if(id==='proposal-loading')return <div className="hero ds-assistant-preview"><ProposalSkeleton/></div>;
 if(id==='catalog-loading')return <CatalogSkeleton/>;
 if(id==='ideas-loading')return <IntegrationIdeasSkeleton/>;
 if(id==='health')return <div className="ds-buttons">{[95,70,35,null].map((score,i)=><HealthScore key={i} score={score}/>)}</div>;
 if(id==='empty')return <div className="ds-faces"><DotSadFace/><DotSadFace variant="dizzy"/><DotQuestion/></div>;
 if(id==='tooltip')return <FollowingTooltip text="Este tooltip utiliza el mismo componente que las ideas de integración y las conexiones.">{trigger=><button className="ui-button ui-button--secondary" {...trigger}>Pasa el cursor o enfoca</button>}</FollowingTooltip>;
 if(id==='light')return <div className="hero ds-light-preview"><HeroLights/></div>;
 if(id==='buttons')return <div className="ds-buttons">{['primary','secondary','text'].map(v=><button key={v} className={`ui-button ui-button--${v}`}>{v==='text'?'Ver más':v==='primary'?'Primario':'Outlined'}</button>)}<button className="ui-button ui-button--secondary ui-button--compact">Compacto</button><button className="ui-button ui-button--primary" disabled>Deshabilitado</button><button className="ui-button ui-button--secondary ui-button--icon" aria-label="Enviar muestra"><ArrowUp/></button></div>;
 return <iframe className="ds-platform-frame" title="Plataforma aislada con fixtures" src="/design-system/preview/"/>;
}
