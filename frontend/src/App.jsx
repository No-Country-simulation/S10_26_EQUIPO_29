import {toolCategoryNames} from './data/catalog.mjs';
import {tools,cardDetails} from './tools';
import {githubSnapshotAt,snapshotDate} from './data/catalog.mjs';
import {useBrandIdentity,markBrandFailed} from './brandIdentity';
import {ToolDetail} from './ToolDetail';
import {useToolNavigation} from './useToolNavigation';
import {useCatalogBounce} from './useCatalogBounce';
import {useHeroParallax} from './useHeroParallax';
import {useCardTilt} from './useCardTilt';
import {useAnimatedCatalog} from './useAnimatedCatalog';
import {RevealHeading,usePageReveal} from './PageReveal';
import {MetalBorder} from './MetalBorder';
import {PromptMetalFill} from './PromptMetalFill';
import {PromptError} from './PromptError';
import {StackProposal} from './StackProposal';
import {ElasticScrollbar} from './ElasticScrollbar';
import {HeroLights} from './HeroLights';
import {promptMotion,promptPresentation,initialPresentation} from './promptPresentation.mjs';
import {usePromptLayout} from './usePromptLayout';
import {validateAssistantQuery,assistantLimits} from './data/assistant.mjs';
import {requestAssistant} from './data/assistantRequest.mjs';
import {assistantScenarioOptions} from './mocks/assistant-scenarios.mjs';
import React, {useState, useRef, useEffect, useReducer} from 'react';
import {UserRound, Star, GitCommitHorizontal, Scale, Activity, ArrowUp, ArrowUpRight, ArrowRight, ChevronDown, Search, SlidersHorizontal, X, Database, ShieldCheck, CreditCard, BrainCircuit, ChartNoAxesCombined, SearchCheck, LoaderCircle} from 'lucide-react';
const promptExamples = [
 'Diseña un SaaS multi-tenant con aislamiento de datos, SSO mediante OIDC y RBAC por organización.',
 'Propón una arquitectura orientada a eventos con colas, reintentos e idempotencia para procesar pagos.',
 'Diseña un RAG privado con búsqueda híbrida, permisos por documento y modelos alojados en nuestra infraestructura.',
 'Define un stack de observabilidad con métricas, logs y trazas distribuidas para microservicios en Kubernetes.',
 'Propón una API de alta disponibilidad con PostgreSQL, caché distribuida y escalado horizontal para 10.000 solicitudes/s.'
];

function useExamplePlaceholder(paused) {
 const [text, setText] = useState(promptExamples[0]);
 useEffect(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timeout;
  let index = 0;
  let length = promptExamples[0].length;
  let deleting = true;
  function tick() {
   const current = promptExamples[index];
   length += deleting ? -1 : 1;
   setText(current.slice(0, length));
   let delay = deleting ? 10 : 48;
   if (length === 0) {
    index = (index + 1) % promptExamples.length;
    deleting = false;
    delay = 350;
   } else if (length === current.length && !deleting) {
    deleting = true;
    delay = 2600;
   }
   timeout = window.setTimeout(tick, delay);
  }
  function restart() {
   window.clearTimeout(timeout);
   index = 0;
   length = promptExamples[0].length;
   deleting = true;
   setText(promptExamples[0]);
   if (!paused && !motion.matches) timeout = window.setTimeout(tick, 2600);
  }
  restart();
  motion.addEventListener('change', restart);
  return () => {
   window.clearTimeout(timeout);
   motion.removeEventListener('change', restart);
  };
 }, [paused]);
 return text;
}

const categories=['Todas',...new Set(tools.flatMap(toolCategoryNames))];
const icons={'Autenticación':ShieldCheck,'Bases de datos':Database,'Pagos':CreditCard,'IA':BrainCircuit,'Analítica':ChartNoAxesCombined,'Búsqueda':SearchCheck};

function ToolCard({ tool, onOpen }) {
 const tiltRef = useCardTilt();
 const identity=useBrandIdentity(tool);
 const logo=identity.logo;
 const detail = cardDetails[tool.name];
 const hasHealth=Number.isFinite(detail.healthScore);
 const healthTone = !hasHealth?'unknown':detail.healthScore >= 80 ? 'good' : detail.healthScore >= 60 ? 'moderate' : 'low';
 const healthLabel = {good:'Salud alta',moderate:'Salud media',low:'Salud baja'}[healthTone];
 const brand = identity.palette;
 const postgres = tool.name === 'PostgreSQL';
 const metrics = [
  ['Estrellas', tool.stars.toLocaleString('es-CL'), Star],
  ['Último push', tool.activity, GitCommitHorizontal],
  ['Licencia', tool.license, Scale],
  ['Mantenedor activo', tool.maintained === true ? 'Sí' : tool.maintained === false ? 'No' : 'Por confirmar', UserRound]
 ];
 return <article data-tool-id={tool.id} onClick={e=>{if(!e.target.closest('a,button,summary,details')&&!window.getSelection()?.toString())onOpen(tool.id,e.currentTarget.querySelector('.detail-link'));}} ref={tiltRef} className="tool-card" aria-label={tool.name} style={{
  '--brand-start': brand.start, '--brand-end': brand.end, '--brand-tag': brand.tag
 }}>
  <div className="card-surface">
  <div className="tool-card-intro">
   {identity.watermark && (postgres ? <div className="card-watermark" aria-hidden="true"><img src={identity.watermark} onError={()=>markBrandFailed('watermark:'+identity.watermark)} alt=""/></div> : <img className="brand-watermark" src={identity.watermark} onError={()=>markBrandFailed('watermark:'+identity.watermark)} alt="" aria-hidden="true"/>)}
   <div className="tool-card-title">
    {identity.fallback ? <span className="brand-initials" aria-hidden="true">{identity.initials}</span> : postgres ? <div className="tool-logo"><img src={logo} onError={()=>markBrandFailed(logo)} alt=""/></div> : <img className={identity.wordmark ? 'brand-logo brand-wordmark' : 'brand-logo'} src={logo} onError={()=>markBrandFailed(logo)} alt=""/>}
    <h3 className={identity.wordmark ? 'sr-only' : undefined}>{tool.name}</h3>
   </div>
   <div className="tool-tags">
    <span>{tool.category}</span>
    <span className="language-tag" title="Lenguaje principal del repositorio">{tool.language}</span>

   </div>
   <p>{tool.description}</p>
  </div>
  <div className="tool-card-details">
   <div className="card-tech-summary">
   <span className={"health-score health-score--"+healthTone} role="img" aria-label={hasHealth?`Salud del repositorio: ${detail.healthScore} de 100`:'Salud sin evaluar'} title={hasHealth?`${healthLabel}. Puntuación ficticia de demostración.`:'GitHub no proporciona una puntuación global de salud; pendiente de definir su cálculo.'}>
    <Activity size={20} strokeWidth={1.75} className="health-icon" aria-hidden="true"/>
    <strong aria-hidden="true">{hasHealth?<>{detail.healthScore}<span>/100</span></>:<span>Sin evaluar</span>}</strong>
   </span>
   </div>
   <dl className="tool-metrics">{metrics.map(([label,value,Icon],index)=><React.Fragment key={label}>
    {index > 0 && <div className="metric-divider" aria-hidden="true"><img src="/assets/cards/divider.svg" alt=""/></div>}
    <div className="tool-metric"><dt><Icon size={14} strokeWidth={1.75} aria-hidden="true"/><span>{label}</span></dt><dd>{value}</dd></div>
   </React.Fragment>)}</dl>
   <div className="tool-actions">
    <a className="detail-link" href={'#herramienta/'+tool.id} onClick={e=>{if(!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){e.preventDefault();onOpen(tool.id,e.currentTarget);}}} aria-label={'Ver detalle de '+tool.name}>Ver detalle <ArrowRight size={14}/></a>
    {tool.repo ? <a href={'https://github.com/'+tool.repo} target="_blank" rel="noopener noreferrer" aria-label={'Ver repositorio de '+tool.name+' (otra pestaña)'}>Repositorio ↗</a> : <button type="button" className="example-repository" aria-disabled="true" title="Ejemplo visual: no tiene un repositorio real" aria-label="Repositorio no disponible para Default">Repositorio ↗</button>}
   </div>
  </div>
  <div className="card-glare" aria-hidden="true"/>
  </div>
 </article>;
}

const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function App(){
 const navigation=useToolNavigation();
 const isDetail=navigation.id!==null;
 useHeroParallax(isDetail);
 useCatalogBounce(isDetail);
 const [query,setQuery]=useState(''),[error,setError]=useState(''),[search,setSearch]=useState(''),[category,setCategory]=useState('Todas'),[filters,setFilters]=useState(false),[language,setLanguage]=useState(''),[license,setLicense]=useState(''),[maintenance,setMaintenance]=useState(''),[stars,setStars]=useState('');
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
 const filtered=tools.filter(t=>(category==='Todas'||toolCategoryNames(t).includes(category))&&normalize(t.name+' '+t.description).includes(normalize(search))&&(!language||t.language===language)&&(!license||t.license===license)&&(!maintenance||(maintenance==='active'?t.dataSource==='github_snapshot'&&!t.archived&&!t.disabled:t.archived||t.disabled))&&t.stars>=Number(stars));
 const displayed=useAnimatedCatalog(filtered);
 usePageReveal([phase,filters,...displayed.map(t=>t.name)].join('|'));
 const active=[language,license,maintenance,stars].filter(Boolean).length;
 function clear(){setSearch('');setCategory('Todas');setLanguage('');setLicense('');setMaintenance('');setStars('');}
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


 return <><a href="#asistente" className="skip">Ir al contenido</a><header><div className="nav wrap"><a className="brand" href="#"><img className="openbridge-logo" src="/assets/brands/openbridge.svg" alt="OpenBridge"/></a><nav aria-label="Principal"><a href="#asistente" onClick={e=>{if(isDetail){e.preventDefault();navigation.toLanding('#asistente');}}}>Asistente</a><a href="#catalogo" onClick={e=>{if(isDetail){e.preventDefault();navigation.toLanding('#catalogo');}}}>Catálogo</a></nav></div></header>
 <main hidden={isDetail} id="landing-view" data-has-proposal={expanded}><div className="hero"><HeroLights inputRef={input}/><section id="asistente"><div className={'hero-inner'+(expanded?' has-architecture':'')} style={Object.fromEntries([...Object.entries(promptMotion).filter(([key])=>key!=='ease').map(([key,value])=>[`--prompt-${key}-duration`,`${value}ms`]),['--prompt-ease',promptMotion.ease]])}>
 <div className="prompt-heading"><div className="prompt-heading-initial" aria-hidden={expanded}><RevealHeading as="h1" text="De tu idea a tu stack" mobileBreak/></div><h1 ref={resultHeading} tabIndex={-1} className="prompt-heading-result" aria-hidden={!expanded}>{assistantResponse?.title||({needs_clarification:'Precisemos tu idea',no_evidence:'Sin evidencia suficiente'}[assistantResponse?.status]||'Tu arquitectura')}</h1></div>
 <div className="prompt-intro"><p className="intro intro-initial" aria-hidden={expanded}>Describe tu idea, y te recomiendo un stack</p><p className="intro intro-result" aria-hidden={!expanded}>{assistantResponse?.summary||(pending?'Preparando una propuesta de ejemplo':'Una propuesta basada en tu descripción')}</p></div>
 {finished&&<div className="stack-new-action"><button type="button" className="new-architecture" onClick={newArchitecture}>Crear nueva arquitectura <ArrowUpRight size={16}/></button></div>}
 <StackProposal expanded={expanded} pending={pending} hasResult={hasResult} slow={slow} response={assistantResponse}/>

 <div className={'prompt-form-slot'+(finished?' is-closed':'')} inert={finished?true:undefined} aria-hidden={finished}><div className="prompt-form-clip"><form className={'composer '+(error&&!canRetry?'invalid':'')} data-error={error?'true':undefined} onSubmit={submit}><MetalBorder/><label htmlFor="prompt" className="sr-only">Describe tu aplicación</label><textarea ref={input} id="prompt" value={query} maxLength={assistantLimits.max} readOnly={pending} aria-busy={pending} onKeyDown={e=>{if(e.key!=='Enter'||e.shiftKey||e.nativeEvent.isComposing||e.nativeEvent.keyCode===229)return;e.preventDefault();if(!pending&&!e.repeat)e.currentTarget.form?.requestSubmit();}} onChange={e=>{setQuery(e.target.value);setError('');setCanRetry(false);}} placeholder={phase==='done'?'Describe tu idea completa con los detalles que quieras ajustar…':placeholder} onFocus={()=>setPromptFocused(true)} onBlur={()=>setPromptFocused(false)} aria-describedby="prompt-error" aria-invalid={!!error&&!canRetry}/><div className="composer-footer flex items-center justify-end gap-[10px]"><PromptError message={error} canRetry={canRetry&&!pending} onRetry={()=>submit()}/><button className="primary prompt-submit" aria-disabled={pending} type="submit" aria-label={phase==='loading'?'Generando propuesta':'Generar propuesta'} title={phase==='loading'?'Generando propuesta':'Generar propuesta'}><PromptMetalFill/><span className={'submit-symbol'+(pending?' is-loading':'')} aria-hidden="true"><ArrowUp className="submit-arrow" size={24} strokeWidth={2}/><LoaderCircle className="submit-spinner spin" size={22}/></span></button></div></form></div></div>
 {finished&&<div className="architecture-result-tools"><details className="original-prompt"><summary>Tu idea original</summary><p>{originalPrompt}</p></details></div>}
 <div className="prompt-feedback"><p className="architecture-demo-note" aria-hidden={!expanded}>Datos de demostración · Respuesta mock, sin conexión a IA.</p><p className={'prompt-update-status'+(pending&&hasResult?' is-visible':'')} role="status" aria-hidden={!pending||!hasResult}>{slow?'Está tomando un poco más de tiempo. Conservamos tu descripción y el resultado anterior.':'Consultando el asistente de ejemplo…'}</p></div>
 </div></section>
 </div>
 <div className="catalog-shell"><div className="wrap">
 <section className="catalog" id="catalogo"><div className="section-top"><div><RevealHeading text="Explora el ecosistema open source"/></div></div>
 <div className="search-row"><div className="search-box"><Search size={19}/><label htmlFor="search" className="sr-only">Buscar herramientas</label><input id="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar herramientas por nombre o descripción…"/>{search&&<button className="icon-button" aria-label="Borrar búsqueda" onClick={()=>setSearch('')}><X size={16}/></button>}</div><button className={'filter-button '+(filters?'selected':'')} aria-expanded={filters} aria-controls="filters" onClick={()=>setFilters(!filters)}><SlidersHorizontal size={16}/> Filtros {active>0&&<span className="badge">{active}</span>}</button></div>
 <div className="categories" aria-label="Categorías">{categories.map(c=><button key={c} aria-pressed={category===c} className={'category-chip'+(category===c?' active':'')} onClick={e=>{const chip=e.currentTarget,rect=chip.getBoundingClientRect(),radius=Math.hypot(rect.width,rect.height)/2+1;chip.style.setProperty('--chip-radius',radius+'px');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)chip.animate([{clipPath:'circle(0px at 50% 50%)'},{clipPath:`circle(${radius}px at 50% 50%)`}],{pseudoElement:'::before',duration:280,easing:'cubic-bezier(.22,1,.36,1)'});setCategory(c);}}>{c}</button>)}</div>
 {filters && (
  <div className="filters" id="filters">
   <label>Lenguaje
    <select value={language} onChange={e => setLanguage(e.target.value)}>
     <option value="">Todos</option>
     {Array.from(new Set(tools.map(tool => tool.language))).map(value => <option key={value} value={value}>{value}</option>)}
    </select>
   </label>
   <label>Licencia
    <select value={license} onChange={e => setLicense(e.target.value)}>
     <option value="">Todos</option>
     {Array.from(new Set(tools.map(tool => tool.license))).map(value => <option key={value} value={value}>{value}</option>)}
    </select>
   </label>
   <label>Estado del repositorio
    <select value={maintenance} onChange={e => setMaintenance(e.target.value)}>
     <option value="">Todos</option><option value="active">No archivado</option><option value="review">Archivado o deshabilitado</option>
    </select>
   </label>
   <label>Estrellas mínimas
    <select value={stars} onChange={e => setStars(e.target.value)}>
     <option value="">Sin mínimo</option><option value="10000">10.000</option><option value="20000">20.000</option><option value="50000">50.000</option>
    </select>
   </label>
  </div>
 )}
 <p className="catalog-snapshot-note">Estadísticas capturadas de GitHub · {snapshotDate(githubSnapshotAt)} (UTC−3). Sin actualización en tiempo real. Default es una tarjeta ficticia.</p>
 <div className="results-meta"><span aria-live="polite">{filtered.length} {filtered.length===1?'herramienta':'herramientas'}{category!=='Todas'?' en '+category:''}</span>{(active>0||search||category!=='Todas')&&<button onClick={clear}>Limpiar filtros <X size={13}/></button>}</div>
 <div className="grid">{displayed.map(tool=><ToolCard key={tool.name} tool={tool} onOpen={navigation.open}/>)}</div>
 {filtered.length===0&&displayed.length===0&&<div className="empty"><Search size={30}/><h3>No encontramos coincidencias</h3><p>Prueba otro término o quita alguno de los filtros.</p><button onClick={clear} className="primary">Ver todas las herramientas</button></div>}
 </section><footer className="catalog-footer"><a className="brand" href="#"><img className="openbridge-logo" src="/assets/brands/openbridge.svg" alt="OpenBridge"/></a></footer></div></div></main>{isDetail&&<ToolDetail id={navigation.id} onBack={navigation.back}/>}<ElasticScrollbar routeKey={navigation.id}/></>;
}
