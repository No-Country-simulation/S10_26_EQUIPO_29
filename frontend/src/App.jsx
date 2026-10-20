import {tools,cardDetails} from './tools';
import {useBrandIdentity,markBrandFailed} from './brandIdentity';
import {ToolDetail} from './ToolDetail';
import {useToolNavigation} from './useToolNavigation';
import {useCardTilt} from './useCardTilt';
import {useAnimatedCatalog} from './useAnimatedCatalog';
import {RevealHeading,usePageReveal} from './PageReveal';
import {MetalBorder} from './MetalBorder';
import {ElasticScrollbar} from './ElasticScrollbar';
import {HeroLights} from './HeroLights';
import React, {useState, useRef, useEffect} from 'react';
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

const categories=['Todas','Autenticación','Bases de datos','Pagos','IA','Analítica','Búsqueda'];
const icons={'Autenticación':ShieldCheck,'Bases de datos':Database,'Pagos':CreditCard,'IA':BrainCircuit,'Analítica':ChartNoAxesCombined,'Búsqueda':SearchCheck};

function ToolCard({ tool, onOpen }) {
 const tiltRef = useCardTilt();
 const identity=useBrandIdentity(tool);
 const logo=identity.logo;
 const detail = cardDetails[tool.name];
 const healthTone = detail.healthScore >= 80 ? 'good' : detail.healthScore >= 60 ? 'moderate' : 'low';
 const healthLabel = {good:'Salud alta',moderate:'Salud media',low:'Salud baja'}[healthTone];
 const brand = identity.palette;
 const postgres = tool.name === 'PostgreSQL';
 const metrics = [
  ['Estrellas', tool.stars.toLocaleString('es-CL'), Star],
  ['Última actualización', tool.activity, GitCommitHorizontal],
  ['Licencia', tool.license, Scale],
  ['Mantenedor', tool.maintained ? 'Activo' : 'Por confirmar', UserRound]
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
   <span className={"health-score health-score--"+healthTone} role="img" aria-label={`Salud del repositorio: ${detail.healthScore} de 100`} title={`${healthLabel}. Puntuación ficticia de demostración; no representa una evaluación real del repositorio.`}>
    <Activity size={20} strokeWidth={1.75} className="health-icon" aria-hidden="true"/>
    <strong aria-hidden="true">{detail.healthScore}<span>/100</span></strong>
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
 const [query,setQuery]=useState(''),[error,setError]=useState(''),[phase,setPhase]=useState('idle'),[search,setSearch]=useState(''),[category,setCategory]=useState('Todas'),[filters,setFilters]=useState(false),[language,setLanguage]=useState(''),[license,setLicense]=useState(''),[maintenance,setMaintenance]=useState(''),[stars,setStars]=useState('');
 const [promptFocused, setPromptFocused] = useState(false);
 const [architectureOpen,setArchitectureOpen]=useState(false);
 const placeholder = useExamplePlaceholder(isDetail || promptFocused || Boolean(query) || phase === 'loading');
 const input=useRef(null), timer=useRef(null);useEffect(()=>()=>clearTimeout(timer.current),[]);
 const filtered=tools.filter(t=>(category==='Todas'||t.category===category)&&normalize(t.name+' '+t.description).includes(normalize(search))&&(!language||t.language===language)&&(!license||t.license===license)&&(!maintenance||(maintenance==='active'?t.maintained:!t.maintained))&&t.stars>=Number(stars));
 const displayed=useAnimatedCatalog(filtered);
 usePageReveal([phase,filters,...displayed.map(t=>t.name)].join('|'));
 const active=[language,license,maintenance,stars].filter(Boolean).length;
 function clear(){setSearch('');setCategory('Todas');setLanguage('');setLicense('');setMaintenance('');setStars('');}
 function submit(e){e.preventDefault();if(!query.trim()){setError('Describe la aplicación que quieres construir para empezar.');input.current.focus();return;}setError('');setArchitectureOpen(false);setPhase('loading');timer.current=setTimeout(()=>setPhase('done'),1100);}
 return <><a href="#asistente" className="skip">Ir al contenido</a><header><div className="nav wrap"><a className="brand" href="#"><img className="openbridge-logo" src="/assets/brands/openbridge.svg" alt="OpenBridge"/></a><nav aria-label="Principal"><a href="#asistente" onClick={e=>{if(isDetail){e.preventDefault();navigation.toLanding('#asistente');}}}>Asistente</a><a href="#catalogo" onClick={e=>{if(isDetail){e.preventDefault();navigation.toLanding('#catalogo');}}}>Catálogo</a></nav></div></header>
 <main hidden={isDetail} id="landing-view" data-has-proposal={phase!=='idle'}><section className="hero" id="asistente"><HeroLights inputRef={input}/><div className="hero-inner"><RevealHeading as="h1" text="¿Qué quieres construir?" mobileBreak/><p className="intro">Tu próxima aplicación empieza con las herramientas adecuadas.<br className="desktop-break"/> Describe tu idea y explora cómo conectarlas.</p>
 <form className={'composer '+(error?'invalid':'')} onSubmit={submit}><MetalBorder/><label htmlFor="prompt" className="sr-only">Describe tu aplicación</label><textarea ref={input} id="prompt" value={query} maxLength={3000} disabled={phase==='loading'} onChange={e=>{setQuery(e.target.value);setError('');}} placeholder={placeholder} onFocus={()=>setPromptFocused(true)} onBlur={()=>setPromptFocused(false)} aria-describedby="prompt-error" aria-invalid={!!error}/><div className="composer-footer flex items-center justify-end gap-[10px]"><button className="primary prompt-submit" disabled={phase==='loading'} type="submit" aria-label={phase==='loading'?'Generando propuesta':'Generar propuesta'} title={phase==='loading'?'Generando propuesta':'Generar propuesta'}>{phase==='loading'?<LoaderCircle className="spin" size={22} aria-hidden="true"/>:<ArrowUp size={24} strokeWidth={2} aria-hidden="true"/>}</button></div></form>
 <p id="prompt-error" className="error" role="alert">{error}</p>
 </div></section>
 <div className={'proposal-slot'+(phase!=='idle'?' has-content':'')} aria-live="polite" aria-busy={phase==='loading'}>
 <div className="proposal-slot-inner"><div className="proposal-width">
 {phase==='loading'&&<div className="proposal-pending"><LoaderCircle className="spin" size={18}/> Preparando tu propuesta de demostración…</div>}
 {phase==='done'&&<section className="architecture-result" aria-label="Propuesta de arquitectura">
 <div className="result-heading"><div><h2>Un estudio de yoga, conectado.</h2><p>Reservas, gestión de cupos y acceso seguro en un stack autoalojado.</p></div><button className="icon-button" aria-label="Cerrar propuesta" onClick={()=>{setPhase('idle');setArchitectureOpen(false);}}><X size={18}/></button></div>
 <div className="result-tools" aria-label="Stack recomendado">{['React','FastAPI','PostgreSQL','Keycloak'].map(n=><span key={n}>{n}</span>)}</div>
 <div className="result-footer"><span>Ejemplo fijo de reservas de yoga · No analiza tu consulta</span><button className="explore-architecture" aria-expanded={architectureOpen} aria-controls="architecture-content" onClick={()=>setArchitectureOpen(!architectureOpen)}>{architectureOpen?'Contraer arquitectura':'Explorar arquitectura'}<ChevronDown size={16} className={architectureOpen?'is-open':''}/></button></div>
 <div className={'architecture-disclosure'+(architectureOpen?' is-open':'')} inert={!architectureOpen} id="architecture-content"><div><div className="architecture-detail">
 <h3>Cómo se conecta</h3><div className="architecture-map"><div>React<span>Interfaz y calendario</span></div><ArrowRight size={18}/><div>FastAPI<span>Reservas y permisos</span></div><ArrowRight size={18}/><div>PostgreSQL<span>Clases, cupos y datos</span></div></div>
 <div className="identity-connection"><ShieldCheck size={18}/><p><strong>Keycloak</strong> gestiona la identidad. React inicia la sesión y FastAPI valida el acceso antes de consultar los datos.</p></div>
 <h3>Por qué este stack</h3><p>React presenta el calendario; FastAPI concentra las reglas de reservas. PostgreSQL mantiene la consistencia de los cupos mediante transacciones. Alojamiento propio, sin pagos en esta primera versión.</p>
 <a className="text-link" href="#catalogo" onClick={()=>{clear();setSearch('PostgreSQL');}}>Ver PostgreSQL en el catálogo <ArrowRight size={15}/></a>
 </div></div></div></section>}
 </div></div></div>
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
   <label>Mantenimiento
    <select value={maintenance} onChange={e => setMaintenance(e.target.value)}>
     <option value="">Todos</option><option value="active">Activo</option><option value="review">Por revisar</option>
    </select>
   </label>
   <label>Estrellas mínimas
    <select value={stars} onChange={e => setStars(e.target.value)}>
     <option value="">Sin mínimo</option><option value="10000">10.000</option><option value="20000">20.000</option><option value="50000">50.000</option>
    </select>
   </label>
  </div>
 )}
 <div className="results-meta"><span aria-live="polite">{filtered.length} {filtered.length===1?'herramienta':'herramientas'}{category!=='Todas'?' en '+category:''}</span>{(active>0||search||category!=='Todas')&&<button onClick={clear}>Limpiar filtros <X size={13}/></button>}</div>
 <div className="grid">{displayed.map(tool=><ToolCard key={tool.name} tool={tool} onOpen={navigation.open}/>)}</div>
 {filtered.length===0&&displayed.length===0&&<div className="empty"><Search size={30}/><h3>No encontramos coincidencias</h3><p>Prueba otro término o quita alguno de los filtros.</p><button onClick={clear} className="primary">Ver todas las herramientas</button></div>}
 </section><footer><a className="brand" href="#"><img className="openbridge-logo" src="/assets/brands/openbridge.svg" alt="OpenBridge"/></a><a href="#asistente">Volver al asistente <ArrowUpRight size={14}/></a></footer></div></div></main>{isDetail&&<ToolDetail id={navigation.id} onBack={navigation.back}/>}<ElasticScrollbar routeKey={navigation.id}/></>;
}
