'use client';
import {useId,useRef,useState} from 'react';
import {SearchCollection,SelectCollection,ChipsCollection,TagsCollection,PaginationCollection,TooltipCollection,HealthCollection,ToggleCollection,FacesCollection,LoaderCollection,Sample,Gallery,Playground} from './ComponentCollections';
import {ToolDetail,RepositoryMetrics} from '../../ToolDetail';
import {ToolRecommendation,Endpoint} from '../../features/assistant/ProposalTabs';
import {ConnectionDiagram} from '../../features/assistant/ConnectionDiagram';
import {ResponseContext} from '../../features/assistant/StackProposal';
import {CardDescription} from '../../features/catalog/CardDescription';
import {BrandIcon} from '../../AssistantBrandIcon';
import {RevealHeading} from '../../PageReveal';
import {SectionNavigation} from '../../SectionNavigation';

import {ArrowUp,ArrowUpRight} from 'lucide-react';
import {ToolCard} from '../../features/catalog/ToolCard';
import {ToolModal} from '../../ToolModal';
import {HealthScore} from '../../HealthScore';
import {FollowingTooltip} from '../../FollowingTooltip';
import {DotSadFace,DotQuestion} from '../../DotSadFace';
import {PromptComposer} from '../../features/assistant/PromptComposer';
import {ElasticPromptBorder} from '../../ElasticPromptBorder';
import {PromptSuggestions} from '../../features/assistant/PromptSuggestions';
import {WorkingWords} from '../../features/assistant/WorkingWords';
import {CatalogSkeleton} from '../../features/catalog/CatalogSkeleton';
import {StackProposal} from '../../features/assistant/StackProposal';
import {ProposalSkeleton} from '../../features/assistant/ProposalSkeleton';
import {IntegrationIdeas,ReviewBadge} from '../../IntegrationIdeas';
import {IntegrationIdeasSkeleton} from '../../IntegrationIdeasSkeleton';
import {Snippet} from '../../Snippet';
import {HeroLights} from '../../HeroLights';
import {assistantErrors} from '../../errorPresentation.mjs';
import {FixtureBoundary,specimen,previewPalette} from './fixtures';
import responses from '../../mocks/assistant.fixtures.json';
export function Choices({value,onChange,items,label='Estado de la muestra'}){return <label className="ds-choice">{label}<select value={value} onChange={e=>onChange(e.target.value)}>{items.map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></label>}
function PromptDemo({suggestions=false}){const [query,setQuery]=useState('Quiero organizar los pedidos y las entregas de mi negocio.'),[state,setState]=useState('initial'),[exampleReveal,setExampleReveal]=useState(null),input=useRef(null);const error=state==='error'?'connection_error':'';const flow={query,setQuery,input,error,setError:()=>{},setCanRetry:()=>{},pending:state==='loading',canRetry:!!error,finished:false,phase:'idle',hasResult:false,expanded:false};return <><Choices value={state} onChange={setState} items={['initial','compact','loading','error'].map((v,i)=>[v,['Inicial','Compacto','Cargando','Reintentar'][i]])}/><div className={`hero ds-prompt-preview${state!=='initial'?' assistant-workspace':''}`}><div className="hero-inner"><PromptComposer inputId="ds-prompt-input" {...flow} exampleReveal={exampleReveal} appearance={false} workspace={state!=='initial'} submit={e=>{e.preventDefault();setState('loading');}} stop={()=>setState('compact')}/>{error&&<p id="prompt-error">{assistantErrors[error].description}</p>}{suggestions&&state==='initial'&&<PromptSuggestions flow={flow} onSelect={text=>setExampleReveal({text,id:Date.now()})}/>}</div></div></>}
function CardDemo(){const [variant,setVariant]=useState('complete'),[detail,setDetail]=useState(null);const tool=variant==='long'?{...specimen,name:'Herramienta con un nombre especialmente largo para probar',full_name:'example/herramienta-con-nombre-largo'}:variant==='missing'?{...specimen,id:'ds-missing',full_name:'example/no-logo',name:'Ejemplo',healthScore:null,maintained:null,license:'Sin datos'}:specimen;return <><Choices value={variant} onChange={setVariant} items={ [['complete','Completa'],['long','Nombre largo y fallback'],['missing','Datos ausentes']]}/><div className="ds-real-card" onClickCapture={e=>{const link=e.target.closest('a');if(link?.getAttribute('href')?.includes('#herramienta/')){e.preventDefault();e.stopPropagation();setDetail(tool.id);}}}><ToolCard tool={tool} onOpen={()=>setDetail(tool.id)}/></div>{detail&&<ToolModal id={detail} onClose={()=>setDetail(null)}/>}</>}
function ResultDemo(){const [state,setState]=useState('ok'),[detail,setDetail]=useState(null);const response=state==='needs_clarification'?{status:state,clarification_questions:['¿Quiénes usarán el sistema?','¿Qué proceso necesitas mejorar?'],assumptions:[],limitations:[]}:state==='no_evidence'?{status:state,summary:'No encontramos evidencia suficiente.',limitations:['Los candidatos encontrados no cubren esta necesidad.'],assumptions:[]}:state==='no_connections'?{...responses.ok,connections:[]}:responses.ok;return <><Choices value={state} onChange={setState} items={ [['ok','Propuesta'],['no_connections','Sin conexiones'],['needs_clarification','Pedir contexto'],['no_evidence','Sin evidencia'],['loading','Cargando']]}/><div className="ds-assistant-preview hero" onClickCapture={e=>{const link=e.target.closest('a');if(link?.getAttribute('href')?.includes('#herramienta/')){e.preventDefault();e.stopPropagation();setDetail(decodeURIComponent(link.getAttribute('href').split('#herramienta/')[1]));}}}><StackProposal expanded pending={state==='loading'} hasResult={state!=='loading'} response={response} originalPrompt="Necesito gestionar los pedidos, clientes y reportes de mi empresa."/></div>{detail&&<ToolModal id={detail} onClose={()=>setDetail(null)}/>}</>}
function ErrorDemo(){const [code,setCode]=useState('connection_error');return <><Choices value={code} onChange={setCode} items={Object.entries(assistantErrors).map(([k,v])=>[k,v.title])}/><div role="status"><h3>{assistantErrors[code].title}</h3><p>{assistantErrors[code].description}</p></div><p>La acción de reintento está en la muestra del input.</p></>}
const demoIdeas=[{id:'ds-reviewed',title:'Consultar datos desde una API',summary:'Ejemplo de documentación para comprobar la composición de una integración.',difficulty:'Básica',type:'API REST',reviewStatus:'reviewed',reviewLabel:'Revisada',stack:['API','Base de datos'],dependencies:['Cliente HTTP'],triggers:['Consulta de usuario'],snippet:'GET /example',snippetLanguage:'text'},{id:'ds-suggested',title:'Procesar una tarea en segundo plano',summary:'Fixture visual para representar una idea sin revisión profesional.',difficulty:'Avanzada',type:'SDK',reviewStatus:'suggested',reviewLabel:'Sugerida',stack:['Worker'],dependencies:['Cola'],triggers:['Nueva tarea']}];
function IdeasDemo(){const [empty,setEmpty]=useState('full');return <><Choices value={empty} onChange={setEmpty} items={ [['full','Con ideas'],['empty','Sin ideas']]}/><IntegrationIdeas ideas={empty==='full'?demoIdeas:[]}/></>}
function DetailDemo(){const [open,setOpen]=useState(false),[state,setState]=useState('complete');const tool=state==='partial'?{...specimen,healthScore:null,maintained:null,license:'Sin datos'}:specimen;return <><Choices value={state} onChange={setState} items={ [['complete','Datos completos'],['partial','Datos parciales'],['missing','No encontrada']]}/><FixtureBoundary value={{tools:[tool]}}>{!open&&<div className="tool-modal-frame ds-detail-frame"><ToolDetail id={state==='missing'?'ds-not-found':tool.id} onBack={()=>setState('complete')}/></div>}<div className="ds-entry-actions"><button className="ui-button ui-button--secondary" onClick={()=>setOpen(true)}>Probar apertura lateral</button></div>{open&&<ToolModal id={tool.id} onClose={()=>setOpen(false)}/>}</FixtureBoundary></>}
function DescriptionDemo(){const [expanded,setExpanded]=useState(false);return <><Gallery wide>{['Descripción breve de la herramienta.','Esta herramienta permite organizar y consultar la información de un negocio. '.repeat(8)].map((description,index)=><Sample key={index} name={index?'Texto largo':'Texto corto'}><div className="ds-description-sample"><CardDescription description={description} tool={specimen} onOpen={()=>setExpanded(!expanded)}/></div></Sample>)}</Gallery>{expanded&&<Playground title="Descripción completa"><p>{'Esta herramienta permite organizar y consultar la información de un negocio. '.repeat(8)}</p><button className="ui-button ui-button--text" onClick={()=>setExpanded(false)}>Ver menos</button></Playground>}</>}
function IdentityDemo(){return <Gallery>{[specimen,{id:'ds-fallback',full_name:'example/herramienta',name:'Herramienta'}].map((tool,index)=><Sample key={index} name={index?'Iniciales':'Logo'}><div className="ds-identity-sample"><BrandIcon tool={tool}/><div><strong>{tool.name}</strong><p className="tool-repo-name">{tool.full_name}</p></div></div></Sample>)}</Gallery>}
function ToolsDemo(){const component=responses.ok.components[0];return <div className="hero ds-assistant-preview"><ul className="proposal-tools ds-single-recommendation"><ToolRecommendation component={component}/></ul></div>}
function ConnectionsDemo(){const [state,setState]=useState('one');const components=responses.ok.components;const source=responses.ok.connections;const connections=state==='empty'?[]:state==='one'?source.slice(0,1):source;const used=new Set(connections.flatMap(c=>[c.from_key,c.to_key]));return <><Choices value={state} onChange={setState} items={ [['one','Una conexión'],['full','Varias conexiones'],['empty','Sin conexiones']]}/><div className="hero ds-assistant-preview">{connections.length?<ConnectionDiagram components={components.filter(c=>used.has(c.key))} connections={connections} Endpoint={Endpoint}/>:<div className="catalog-error proposal-connections-empty"><DotSadFace/><p>¡Lo sentimos! Esta propuesta no incluye ninguna conexión.</p></div>}</div></>}
function ContextDemo(){return <div className="hero ds-assistant-preview"><div className="stack-content"><ResponseContext response={responses.ok}/><section className="proposal-original"><h3>Tu idea original</h3><p>Necesito gestionar pedidos, clientes y reportes de mi negocio.</p></section></div></div>}
function SuggestionsDemo(){const input=useRef(null),[query,setQuery]=useState('');return <><div className="hero ds-suggestions-preview"><PromptSuggestions flow={{input,query,setQuery,setError:()=>{},setCanRetry:()=>{}}}/></div><Playground title="Texto del ejemplo seleccionado"><p role="status">{query||'Selecciona un ejemplo para revisar su contenido.'}</p></Playground></>}
function BorderDemo(){return <div className="ds-border-sample"><div className="composer"><ElasticPromptBorder idPrefix="ds-border"/><span>Acerca el cursor o enfoca este campo.</span><input className="ds-border-focus" aria-label="Probar foco del borde" placeholder="Escribe para probar el foco"/></div></div>}
function HeadingDemo(){const [state,setState]=useState('initial');return <><Choices value={state} onChange={setState} items={ [['initial','Inicial'],['loading','Trabajando'],['error','Error']]}/><div className="hero ds-heading-sample">{state==='initial'?<RevealHeading as="h1" text="De tu idea a tu stack" gradientWord="stack"/>:state==='loading'?<><h2 className="assistant-heading-content is-pending"><span className="assistant-light-loader" aria-hidden="true"/>Preparando tu stack</h2><div className="intro"><WorkingWords/></div></>:<><DotSadFace variant="unavailable"/><h2>{assistantErrors.provider_unavailable.title}</h2><p>{assistantErrors.provider_unavailable.description}</p></>}</div></>}
function NavigationDemo(){return <Gallery wide><Sample name="Navegación de la plataforma"><div className="ds-navigation-sample"><img src="/assets/brands/openbridge.svg" alt="OpenBridge" width="180"/><SectionNavigation paused workspace={{navigate:event=>event.preventDefault()}}/></div></Sample><Sample name="Acceso a la documentación"><p>Descubre cómo diseñamos OpenBridge.</p><a className="ui-button ui-button--secondary" href="/design-system/tipografia/">Explorar Design System <ArrowUpRight size={16}/></a></Sample></Gallery>}
export function Preview({id}){
 const collections={filters:SearchCollection,'filter-select':SelectCollection,'category-chips':ChipsCollection,tags:TagsCollection,pagination:PaginationCollection,tooltip:TooltipCollection,health:HealthCollection,toggle:ToggleCollection,empty:FacesCollection,loader:LoaderCollection};
 const Collection=collections[id];if(Collection)return <Collection/>;
 if(id==='card')return <CardDemo/>;
 if(id==='description')return <DescriptionDemo/>;
 if(id==='identity')return <IdentityDemo/>;
 if(id==='prompt')return <PromptDemo/>;
 if(id==='border')return <BorderDemo/>;
 if(id==='suggestions')return <SuggestionsDemo/>;
 if(id==='proposal')return <ResultDemo/>;
 if(id==='tools')return <ToolsDemo/>;
 if(id==='connections')return <ConnectionsDemo/>;
 if(id==='context')return <ContextDemo/>;
 if(id==='detail')return <DetailDemo/>;
 if(id==='metrics')return <RepositoryMetrics tool={specimen}/>;
 if(id==='errors')return <ErrorDemo/>;
 if(id==='ideas')return <IdeasDemo/>;
 if(id==='snippet')return <Snippet text={'Contenido de ejemplo para copiar.\nSegunda línea de texto.'} language="text"/>;
 if(id==='heading')return <HeadingDemo/>;
 if(id==='navigation')return <NavigationDemo/>;
 if(id==='working')return <div className="intro"><WorkingWords/></div>;
 if(id==='proposal-loading')return <div className="hero ds-assistant-preview"><ProposalSkeleton/></div>;
 if(id==='catalog-loading')return <CatalogSkeleton/>;
 if(id==='ideas-loading')return <IntegrationIdeasSkeleton/>;
 if(id==='light')return <div className="hero ds-light-preview"><HeroLights/></div>;
 return <iframe className="ds-platform-frame" title="Composición del catálogo y asistente con datos de prueba" src="/design-system/preview/"/>;
}
