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
function ConnectionGroup({from,connections,components}){
 const root=useRef(null);
 const markerId=useId().replaceAll(':','');
 const [geometry,setGeometry]=useState({paths:[],sourceTop:0});
 useLayoutEffect(()=>{
  const element=root.current;
  const measure=()=>{
   const box=element.getBoundingClientRect();
   const source=element.querySelector('.connection-source').getBoundingClientRect();
   const mobile=window.matchMedia('(max-width:640px)').matches;
   const targets=[...element.querySelectorAll('.connection-destination')].map(target=>{
    const end=target.getBoundingClientRect();
    return {x:end.left-box.left,y:end.top-box.top+end.height/2};
   });
   if(!targets.length)return;
   // Align with the nodes, not the height of their descriptive text.
   const center=(targets[0].y+targets[targets.length-1].y)/2;
   const sourceTop=mobile?0:Math.max(0,center-source.height/2);
   const x=mobile?source.left-box.left+20:source.right-box.left;
   const y=mobile?source.bottom-box.top:sourceTop+source.height/2;
   const paths=targets.map(({x:tx,y:ty})=>{
    if(mobile)return `M ${x} ${y} V ${ty-12} Q ${x} ${ty} ${x+12} ${ty} H ${tx-4}`;
    if(Math.abs(ty-y)<1)return `M ${x} ${y} H ${tx-4}`;
    const bend=x+(tx-x)*0.25;
    const direction=Math.sign(ty-y);
    const radius=Math.min(16,Math.abs(ty-y)/2);
    return `M ${x} ${y} H ${bend-radius} Q ${bend} ${y} ${bend} ${y+direction*radius} V ${ty-direction*radius} Q ${bend} ${ty} ${bend+radius} ${ty} H ${tx-4}`;
   });
   const next={paths,sourceTop};
   setGeometry(previous=>JSON.stringify(previous)===JSON.stringify(next)?previous:next);
  };
  const observer=new ResizeObserver(measure);
  observer.observe(element);
  element.querySelectorAll('.connection-source,.connection-destination,.connection-branch').forEach(node=>observer.observe(node));
  measure();
  return()=>observer.disconnect();
 },[connections]);
 return <li className="connection-group" ref={root}>
  <svg className="connection-wires" aria-hidden="true"><defs><marker id={markerId} markerUnits="userSpaceOnUse" markerWidth="6" markerHeight="6" refX="3" refY="3"><circle cx="3" cy="3" r="2.5" fill="currentColor"/></marker></defs>{geometry.paths.map((path,index)=><path key={index} d={path} markerEnd={`url(#${markerId})`}/>)}</svg>
  <div className="connection-source" style={{marginTop:geometry.sourceTop}}><Endpoint component={from}/></div>
  <ul className="connection-branches">{connections.map((connection,index)=><li className="connection-branch" key={`${connection.to_key}-${index}`}>
   <span className="sr-only">{from.label} hacia {components.get(connection.to_key).label}</span>
   <div className="connection-route-copy">{connection.protocol&&<span className="connection-route-protocol">{connection.protocol}</span>}{connection.description&&<p>{connection.description}</p>}</div>
   <div className="connection-destination"><Endpoint component={components.get(connection.to_key)}/></div>
  </li>)}</ul>
 </li>;
}
export function ProposalTabs({response,onNewArchitecture}){
 const [tab,setTab]=useState('tools');
 const tabs=useRef([]);
 const connections=response.connections??[];
 const components=new Map(response.components.map(c=>[c.key,c]));
 const groups=new Map();
 connections.forEach(connection=>{
  if(!groups.has(connection.from_key))groups.set(connection.from_key,[]);
  groups.get(connection.from_key).push(connection);
 });
 const select=(index)=>{setTab(index===0?'tools':'connections');tabs.current[index]?.focus();};
 const onKeyDown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();select(e.key==='Home'?0:e.key==='End'?1:tab==='tools'?1:0);}};
 return <div className="proposal-tabs">
  <div className="proposal-toolbar">
  <div role="tablist" data-active={tab} aria-label="Propuesta de arquitectura" onKeyDown={onKeyDown}>
   {[['tools','Herramientas',response.components.length,Layers3],['connections','Conexiones',connections.length,Workflow]].map(([key,label,count,Icon],index)=><button key={key} ref={el=>{tabs.current[index]=el;}} id={'proposal-tab-'+key} type="button" role="tab" aria-selected={tab===key} aria-controls={'proposal-panel-'+key} tabIndex={tab===key?0:-1} onClick={()=>setTab(key)}><Icon size={17} aria-hidden="true"/>{label}<span>{count}</span></button>)}
  </div>
  {onNewArchitecture&&<button type="button" className="ui-button ui-button--secondary" onClick={onNewArchitecture}>Crear nueva arquitectura</button>}
  </div>
  <div className="proposal-panels">
   <section id="proposal-panel-tools" role="tabpanel" aria-labelledby="proposal-tab-tools" hidden={tab!=='tools'} tabIndex={0}>
    <ul className="proposal-tools">{response.components.map((component,index)=><ToolRecommendation key={component.key} component={component} index={index}/>)}</ul>
   </section>
   <section id="proposal-panel-connections" role="tabpanel" aria-labelledby="proposal-tab-connections" hidden={tab!=='connections'} tabIndex={0}>
    {connections.length===0?<p className="proposal-empty">Esta propuesta no incluye conexiones.</p>:<ul className="connection-map">{[...groups].map(([key,items])=><ConnectionGroup key={key} from={components.get(key)} connections={items} components={components}/>)}</ul>}
   </section>
  </div>
 </div>;
}
