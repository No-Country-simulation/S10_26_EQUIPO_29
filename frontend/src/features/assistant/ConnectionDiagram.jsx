import {useEffect,useRef,useState,useId} from 'react';
import {FollowingTooltip} from '../../FollowingTooltip';
import {connectionGraph,sectionPath,connectionLabelAnchor} from './connectionLayout.mjs';

export function ConnectionProtocol({label,description,ariaLabel}){return <FollowingTooltip text={description}>{trigger=><button type="button" className="connection-route-protocol" aria-label={ariaLabel} {...trigger}>{label}</button>}</FollowingTooltip>;}

export function ConnectionDiagram({components,connections,Endpoint}){
 const root=useRef(null),sequence=useRef(0);
 const lightId=useId().replaceAll(':','');
 const [availableWidth,setAvailableWidth]=useState(0);
 const [layout,setLayout]=useState(null),[failed,setFailed]=useState(false);
 useEffect(()=>{
  const element=root.current;
  let disposed=false,timer,engine,last='';
  async function measure(){
   if(!element.clientWidth)return;
   const width=element.clientWidth-8;
   setAvailableWidth(width);
   const mobile=width<640;
   const sizes=Object.fromEntries([...element.querySelectorAll('[data-layout-node]')].map(node=>[node.dataset.layoutNode,{width:node.offsetWidth,height:node.offsetHeight}]));
   const signature=JSON.stringify([mobile,sizes]);
   if(signature===last)return;
   last=signature;const request=++sequence.current;
   try{
    const {default:ELK}=await import('elkjs/lib/elk-api.js');
    if(disposed)return;
    engine??=new ELK({workerFactory:()=>new Worker('/assets/elk/elk-worker.min.js')});
    const next=await engine.layout(connectionGraph(components,connections,sizes,mobile?'DOWN':'RIGHT'));
    if(!disposed&&request===sequence.current){setLayout(next);setFailed(false);}
   }catch{if(!disposed){setFailed(true);}}
  }
  const observer=new ResizeObserver(()=>{clearTimeout(timer);timer=setTimeout(measure,80);});
  observer.observe(element);element.querySelectorAll('[data-layout-node]').forEach(node=>observer.observe(node));
  measure();
  return()=>{disposed=true;++sequence.current;clearTimeout(timer);observer.disconnect();engine?.terminateWorker();};
 },[components,connections]);
 const scale=layout&&availableWidth>=640?Math.min(1,availableWidth/layout.width):1;
 const positions=new Map(layout?.children?.map(node=>[node.id,node])??[]);
 const used=new Set(connections.flatMap(c=>[c.from_key,c.to_key]));
 return <div className="elk-scroll" ref={root} tabIndex={0} aria-label="Diagrama de conexiones" aria-busy={!layout&&!failed}>
  <div style={layout?{width:layout.width*scale,height:layout.height*scale,marginInline:'auto',overflow:scale<1?'clip':undefined}:undefined}>
  <div className={`elk-map${layout?' is-ready':''}${failed?' has-fallback':''}`} style={layout?{width:layout.width,height:layout.height,transform:`scale(${scale})`,transformOrigin:'top left'}:undefined}>
   {layout&&<svg className="elk-wires" width={layout.width} height={layout.height} aria-hidden="true"><defs><filter id={`${lightId}-soft-light`} x="-30%" y="-30%" width="160%" height="160%" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="5"/></filter></defs>{layout.edges.map((edge,edgeIndex)=>{
    const path=(edge.sections??[]).map(sectionPath).join(' ');
    const maskId=`${lightId}-light-${edgeIndex}`;
    const revealId=`${lightId}-reveal-${edgeIndex}`;
    const phase=((edgeIndex+1)*.61803398875)%1;
    const duration=4.8+((edgeIndex*1.73)%2.7);
    return <g key={edge.id} style={{'--connection-reveal-delay':`${Math.min(edgeIndex*80,400)}ms`,'--wire-delay':`${-phase*duration}s`,'--wire-duration':`${duration}s`}}>
     <defs><mask id={revealId} maskUnits="userSpaceOnUse" x="-12" y="-12" width={layout.width+24} height={layout.height+24}><path className="elk-wire-reveal" d={path} pathLength="100"/></mask></defs>
     <g mask={`url(#${revealId})`}>
     <path className="elk-wire-base" d={path}/>
     <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="-12" y="-12" width={layout.width+24} height={layout.height+24}>
      <g filter={`url(#${lightId}-soft-light)`}>
       <path className="elk-wire-sweep" d={path} pathLength="100"/>
      </g>
     </mask></defs>
     <g mask={`url(#${maskId})`}><path className="elk-wire-lit-dots" d={path}/></g>
     </g>
    </g>;
   })}</svg>}
   {components.filter(c=>used.has(c.key)).map(component=>{const node=positions.get(component.key);return <div key={component.key} data-layout-node={component.key} className="elk-node" style={node?{left:node.x,top:node.y}:undefined}><Endpoint component={component}/></div>;})}
   {layout?.edges.map(edge=>{const label=edge.labels?.[0];const anchor=label&&connectionLabelAnchor(edge,label);return label&&<div className="elk-label" key={edge.id} style={{left:anchor.x,top:anchor.y,width:label.width,transform:'translate(-50%, -50%)'}}><ConnectionProtocol label={label.text} description={edge.connection.description} ariaLabel={`${components.find(c=>c.key===edge.sources[0])?.label} hacia ${components.find(c=>c.key===edge.targets[0])?.label}: ${label.text}`}/></div>;})}
   {failed&&connections.map((c,i)=><p key={i}>{components.find(n=>n.key===c.from_key)?.label} → {components.find(n=>n.key===c.to_key)?.label}{c.protocol?` · ${c.protocol}`:''}{c.description?`: ${c.description}`:''}</p>)}
  </div>
  </div>
 </div>;
}
