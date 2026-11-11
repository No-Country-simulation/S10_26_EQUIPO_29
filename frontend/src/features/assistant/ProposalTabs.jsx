import {DotSadFace} from '../../DotSadFace';
import {ConnectionDiagram} from './ConnectionDiagram';
import {toolHref} from '../../data/detailTarget.mjs';
import {useId,useRef,useState,useLayoutEffect} from 'react';
import {FollowingTooltip} from '../../FollowingTooltip';
import {ArrowUpRight,Box,TriangleAlert,Layers3,Workflow} from 'lucide-react';
import {useCatalogData} from '../../data/CatalogProvider';
import {resolveComponentTool,recommendationLicenseWarning} from '../../data/assistant.mjs';
import {BrandIcon} from '../../AssistantBrandIcon';
import {useBrandIdentity} from '../../brandIdentity';

function trackBorder(event){
 if(event.pointerType==='touch')return;
 const node=event.currentTarget,rect=node.getBoundingClientRect();
 node.style.setProperty('--glare-x',`${event.clientX-rect.left}px`);
 node.style.setProperty('--glare-y',`${event.clientY-rect.top}px`);
}
function ToolRecommendation({component,index=0}){
 const [expanded,setExpanded]=useState(false);
 const rationaleId=useId();
 const rationaleRef=useRef(null);
 const [rationaleHeight,setRationaleHeight]=useState(null);
 useLayoutEffect(()=>{
  const element=rationaleRef.current;
  if(!element)return;
  const paragraph=element.querySelector('p');
  const measure=()=>{
   const lineHeight=parseFloat(getComputedStyle(paragraph).lineHeight);
   setRationaleHeight(expanded?paragraph.scrollHeight:Math.min(paragraph.scrollHeight,lineHeight*2));
  };
  measure();
  const observer=new ResizeObserver(measure);
  observer.observe(paragraph);
  return()=>observer.disconnect();
 },[expanded,component.rationale]);
 const {tools}=useCatalogData();
 const tool=resolveComponentTool(component,tools);
 const identity=useBrandIdentity(tool??{name:component.label});
 const licenseWarning=recommendationLicenseWarning(tool);
 return <li className="proposal-tool" onPointerMove={trackBorder} style={{'--card-reveal-delay':`${160+Math.min(index,6)*85}ms`,'--proposal-brand':identity.palette.start,'--proposal-brand-end':identity.palette.end}}>
  {identity.watermark&&<img className="proposal-watermark" src={identity.watermark} alt="" aria-hidden="true"/>}
  <div className="proposal-tool-heading"><span className="proposal-brand" aria-hidden="true">{tool?<BrandIcon tool={tool}/>:<Box/>}</span><div><div className="proposal-title-row"><h3>{component.label}</h3>{licenseWarning&&<FollowingTooltip text={licenseWarning} className="proposal-license-tip">{trigger=><button type="button" className="proposal-license-icon" aria-label={licenseWarning} {...trigger}><TriangleAlert size={15} aria-hidden="true"/></button>}</FollowingTooltip>}</div><p>{component.role}</p></div></div>
  <div className={'proposal-rationale'+(expanded?' is-expanded':'')} id={rationaleId} ref={rationaleRef} style={rationaleHeight===null?undefined:{height:rationaleHeight}}><p>{component.rationale}</p></div>
  <div className="proposal-tool-actions">
   {component.rationale&&<button type="button" className="proposal-reason-toggle ui-button ui-button--text" aria-expanded={expanded} aria-controls={rationaleId} onClick={()=>setExpanded(value=>!value)}>{expanded?'Ver menos':'Ver motivo'}</button>}
   {tool&&<a className="ui-button ui-button--secondary ui-button--compact" href={toolHref(tool)}>Ver ficha <ArrowUpRight size={14} aria-hidden="true"/></a>}
  </div>
 </li>;
}
function Endpoint({component}){
 const {tools}=useCatalogData();
 const tool=resolveComponentTool(component,tools);
 const identity=useBrandIdentity(tool??{name:component.label});
 const description=component.rationale||component.role;
 return <FollowingTooltip text={description} className="connection-endpoint">
  {trigger=><button type="button" className="connection-node" onPointerMove={trackBorder} {...trigger} style={{'--node-start':identity.palette.start,'--node-end':identity.palette.end}}><span className="proposal-brand" aria-hidden="true">{tool?<BrandIcon tool={tool}/>:<Box/>}</span><span>{component.label}</span></button>}
 </FollowingTooltip>;
}
export function ProposalTabs({response}){
 const [tab,setTab]=useState('tools');
 const tabs=useRef([]),panels=useRef(null),panelHeight=useRef(null),heightMotion=useRef(null);
 const [connectionsVisited,setConnectionsVisited]=useState(false);
 const changeTab=key=>{if(key==='connections')setConnectionsVisited(true);setTab(key);};
 useLayoutEffect(()=>{
  const host=panels.current,active=host?.querySelector('[role=tabpanel]:not([hidden])');
  if(!host||!active)return;
  const measure=()=>{
   if(active.querySelector('[aria-busy="true"]'))return;
   const next=active.getBoundingClientRect().height;
   if(panelHeight.current===next)return;
   const previous=host.getBoundingClientRect().height;
   const initial=panelHeight.current===null;
   panelHeight.current=next;
   heightMotion.current?.cancel();
   host.style.height=`${next}px`;
   if(!initial&&Math.abs(previous-next)>1&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    heightMotion.current=host.animate([{height:`${previous}px`},{height:`${next}px`}],{duration:320,easing:'cubic-bezier(.22,1,.36,1)'});
   }
  };
  measure();
  const observer=new ResizeObserver(measure);observer.observe(active);
  return()=>observer.disconnect();
 },[tab]);
 useLayoutEffect(()=>()=>heightMotion.current?.cancel(),[]);
 const connections=response.connections??[];
 const select=(index)=>{changeTab(index===0?'tools':'connections');tabs.current[index]?.focus();};
 const onKeyDown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();select(e.key==='Home'?0:e.key==='End'?1:tab==='tools'?1:0);}};
 return <div className="proposal-tabs">
  <div className="proposal-toolbar">
  <div role="tablist" data-active={tab} aria-label="Propuesta de arquitectura" onKeyDown={onKeyDown}>
   {[['tools','Herramientas',response.components.length,Layers3],['connections','Conexiones',connections.length,Workflow]].map(([key,label,count,Icon],index)=><button key={key} ref={el=>{tabs.current[index]=el;}} id={'proposal-tab-'+key} type="button" role="tab" aria-selected={tab===key} aria-controls={'proposal-panel-'+key} tabIndex={tab===key?0:-1} onClick={()=>changeTab(key)}><Icon size={17} aria-hidden="true"/>{label}<span>{count}</span></button>)}
  </div>
  </div>
  <div className="proposal-panels" ref={panels} data-switched={connectionsVisited||undefined}>
   <section id="proposal-panel-tools" role="tabpanel" aria-labelledby="proposal-tab-tools" hidden={tab!=='tools'} tabIndex={0}>
    <ul className="proposal-tools">{response.components.map((component,index)=><ToolRecommendation key={component.key} component={component} index={index}/>)}</ul>
   </section>
   <section id="proposal-panel-connections" role="tabpanel" aria-labelledby="proposal-tab-connections" hidden={tab!=='connections'} tabIndex={0}>
    {connections.length===0?<div className="catalog-error proposal-connections-empty"><DotSadFace/><p>¡Lo sentimos! Esta propuesta no incluye ninguna conexión.</p></div>:connectionsVisited&&<ConnectionDiagram components={response.components} connections={connections} Endpoint={Endpoint}/>}
   </section>
  </div>
 </div>;
}
