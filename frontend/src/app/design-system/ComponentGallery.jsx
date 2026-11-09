'use client';
import {DotSadFace} from '../../DotSadFace';
import {useState} from 'react';
import {CatalogPreviewProvider} from '../../data/CatalogProvider';
import {tools} from '../../tools';
import {profiles} from '../../toolProfiles';
import {catalogCategories} from '../../data/catalog.mjs';
import {CatalogFilters} from '../../features/catalog/CatalogFilters';
import {useCatalogFilters} from '../../features/catalog/useCatalogFilters';
import {CatalogPagination} from '../../features/catalog/CatalogPagination';
import {CatalogSkeleton} from '../../features/catalog/CatalogSkeleton';
import {ToolDetail} from '../../ToolDetail';
import {IntegrationIdeasSkeleton} from '../../IntegrationIdeasSkeleton';
import {StackProposal} from '../../features/assistant/StackProposal';
import {assistantErrors,interfaceErrors} from '../../errorPresentation.mjs';
import responses from '../../mocks/assistant.fixtures.json';

// Complete visual specimen, intentionally local to documentation; these are not measured repo scores.
export const specimen={...tools.find(t=>t.name==='PostgreSQL'),healthScore:88,maintained:true};
const previewTools=tools.map(t=>t.id===specimen.id?specimen:t);
const preview={tools:previewTools,profiles,categories:catalogCategories,status:'ready',error:null,http:null,baseUrl:'',retry:()=>{}};
export function ComponentPreview({children}){return <CatalogPreviewProvider value={preview}>{children}</CatalogPreviewProvider>}
function CatalogControls(){const state=useCatalogFilters(),[page,setPage]=useState(1);return <><CatalogFilters state={state} count={state.filtered.length}/><p className="ds-note">{state.filtered.length} herramientas de muestra coinciden con los filtros.</p><CatalogPagination page={page} pages={6} onChange={setPage}/></>}
export function ComponentGallery(){
 const [state,setState]=useState('ok'),[error,setError]=useState('connection_error'),[detail,setDetail]=useState(false);
 const response=state==='ok'?responses.ok:state==='needs_clarification'?{id:'ds-context',status:state,clarification_questions:['¿Quiénes usarán la aplicación?','¿Qué proceso necesitas resolver primero?'],assumptions:[],limitations:[]}:{id:'ds-empty',status:'no_evidence',assumptions:[],limitations:['No hay evidencia suficiente para recomendar herramientas para esta consulta.']};
 return <div className="ds-gallery">
 <section className="ds-document"><h2>Buscador, categorías y filtros</h2><p>Los controles reales del catálogo, conectados únicamente a las muestras de esta página.</p><CatalogControls/></section>
 <section className="ds-document"><h2>Ficha técnica e integraciones</h2><p>La ficha utiliza ToolDetail: pestañas, métricas, acciones, acordeones, indicadores de revisión, dificultad, tooltips y snippets del componente original.</p><button className="ui-button ui-button--secondary" onClick={()=>setDetail(v=>!v)} aria-expanded={detail}>{detail?'Cerrar muestra':'Abrir ficha de Keycloak'}</button>{detail&&<div className="ds-detail-preview tool-modal-frame"><ToolDetail id={tools.find(t=>t.full_name==='keycloak/keycloak')?.id} onBack={()=>setDetail(false)}/></div>}</section>
 <section className="ds-document"><h2>Respuesta del asistente</h2><div className="ds-state-controls">{[['ok','Propuesta'],['needs_clarification','Más contexto'],['no_evidence','Sin evidencia'],['loading','Cargando']].map(([key,label])=><button key={key} className={`ui-button ui-button--${state===key?'primary':'secondary'}`} onClick={()=>setState(key)} aria-pressed={state===key}>{label}</button>)}</div><div className="ds-assistant-preview hero"><StackProposal expanded pending={state==='loading'} hasResult={state!=='loading'} response={response} originalPrompt="Quiero gestionar varias empresas con permisos, reportes y métricas."/></div></section>
 <section className="ds-document"><h2>Errores y recuperación</h2><label className="ds-error-select">Estado del asistente<select value={error} onChange={e=>setError(e.target.value)}>{Object.entries(assistantErrors).map(([key,value])=><option key={key} value={key}>{value.title}</option>)}</select></label><div className="ds-error-preview" role="status"><h3>{assistantErrors[error].title}</h3><p>{assistantErrors[error].description}</p>{assistantErrors[error].retry&&<button className="ui-button ui-button--secondary">Reintentar</button>}</div><div className="catalog-error"><DotSadFace/><p>{interfaceErrors.catalog}</p><button className="ui-button ui-button--secondary">Reintentar</button></div></section>
 <section className="ds-document"><h2>Carga del catálogo</h2><CatalogSkeleton/></section>
 <section className="ds-document"><h2>Carga de integraciones</h2><IntegrationIdeasSkeleton/></section>
 </div>;
}
