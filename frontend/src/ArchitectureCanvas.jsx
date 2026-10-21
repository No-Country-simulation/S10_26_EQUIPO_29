import {useEffect,useMemo,useRef,useState} from 'react';
import {promptMotion,nodeDelay,edgeDelay} from './promptPresentation.mjs';
import {Box,ArrowUpRight} from 'lucide-react';
import {tools} from './tools';
import {resolveComponentTool,assistantGraphSignature} from './data/assistant.mjs';
import {BrandIcon} from './AssistantBrandIcon';

function positions(count,mobile){
 if(mobile)return Array.from({length:count},(_,i)=>({x:50,y:10+i*174}));
 if(count===4)return [{x:50,y:18},{x:17,y:250},{x:50,y:250},{x:83,y:250}];
 const columns=Math.min(count,3);
 return Array.from({length:count},(_,i)=>({x:columns===1?50:17+(i%columns)*66/(columns-1),y:count<=3?180:18+Math.floor(i/3)*232}));
}
export function ArchitectureCanvas({active=true,expanded,pending,hasResult,response}){
 const root=useRef(null),canvas=useRef(null),elements=useRef(new Map()),presented=useRef('');
 const [selected,setSelected]=useState(null),[mobile,setMobile]=useState(false);
 const signature=assistantGraphSignature(response);
 const nodes=useMemo(()=>(response?.components??[]).map(c=>({...c,tool:resolveComponentTool(c,tools)})),[signature]);
 const edges=useMemo(()=>response?.connections??[],[signature]);
 const isMap=response?.status==='ok';
 const layout=positions(nodes.length,mobile);
 const height=mobile?Math.max(660,nodes.length*174-36):400;
 useEffect(()=>{const m=matchMedia('(max-width: 760px)');const update=()=>setMobile(m.matches);update();m.addEventListener('change',update);return()=>m.removeEventListener('change',update);},[]);
 useEffect(()=>{setSelected(null);},[signature]);
 useEffect(()=>{
  if(!hasResult||!active||!isMap)return;
  const host=root.current,c=canvas.current;
  let frame=0,start=performance.now()-(presented.current===signature?10000:0);
  presented.current=signature;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const duration=Math.max(650,(nodes.length-1)*promptMotion.stagger+120+promptMotion.edge);
  const draw=()=>{
   frame=0;if(document.hidden)return;
   const elapsed=motion.matches?10000:performance.now()-start;
   const box=host.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
   if(c.width!==Math.round(box.width*dpr)||c.height!==Math.round(box.height*dpr)){c.width=Math.round(box.width*dpr);c.height=Math.round(box.height*dpr);}
   const ctx=c.getContext('2d');if(!ctx)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,box.width,box.height);
   for(const edge of edges){
    const ai=nodes.findIndex(n=>n.key===edge.from_key),bi=nodes.findIndex(n=>n.key===edge.to_key);
    const progress=Math.max(0,Math.min(1,(elapsed-edgeDelay(ai,bi))/promptMotion.edge));
    const ae=elements.current.get(edge.from_key),be=elements.current.get(edge.to_key);
    if(!progress||!ae||!be)continue;
    const a=ae.getBoundingClientRect(),b=be.getBoundingClientRect();
    let x1,y1,x2,y2,c1x,c1y,c2x,c2y;
    if(!mobile&&Math.abs(a.top-b.top)<20){
     const forward=a.left<b.left;x1=(forward?a.right:a.left)-box.left;y1=a.top+a.height/2-box.top;x2=(forward?b.left:b.right)-box.left;y2=b.top+b.height/2-box.top;c1x=c2x=(x1+x2)/2;c1y=y1;c2y=y2;
    }else{
     const forward=a.top<b.top;x1=a.left+a.width/2-box.left;y1=(forward?a.bottom:a.top)-box.top;x2=b.left+b.width/2-box.left;y2=(forward?b.top:b.bottom)-box.top;
     if(mobile&&Math.abs(ai-bi)>1){const side=ai%2?24:box.width-24;c1x=c2x=side;c1y=y1;c2y=y2;}
     else{c1x=x1;c2x=x2;c1y=c2y=(y1+y2)/2;}
    }
    const mix=(a,b)=>a+(b-a)*progress;
    const ax=mix(x1,c1x),ay=mix(y1,c1y),bx=mix(c1x,c2x),by=mix(c1y,c2y),cx=mix(c2x,x2),cy=mix(c2y,y2);
    const dx=mix(ax,bx),dy=mix(ay,by),ex=mix(bx,cx),ey=mix(by,cy),fx=mix(dx,ex),fy=mix(dy,ey);
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.bezierCurveTo(ax,ay,dx,dy,fx,fy);ctx.strokeStyle='#a5b9d0';ctx.lineWidth=1.3;ctx.stroke();
    if(progress>.95){const angle=Math.atan2(y2-c2y,x2-c2x);ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-7*Math.cos(angle-.4),y2-7*Math.sin(angle-.4));ctx.moveTo(x2,y2);ctx.lineTo(x2-7*Math.cos(angle+.4),y2-7*Math.sin(angle+.4));ctx.stroke();}
    for(const [x,y] of [[x1,y1],[x2,y2]]){ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fillStyle='#74d6ed';ctx.fill();}
   }
   if(elapsed<duration)frame=requestAnimationFrame(draw);
  };
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);};
  const observer=new ResizeObserver(schedule);observer.observe(host);elements.current.forEach(el=>observer.observe(el));schedule();window.addEventListener('resize',schedule);motion.addEventListener('change',schedule);document.addEventListener('visibilitychange',schedule);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('resize',schedule);motion.removeEventListener('change',schedule);document.removeEventListener('visibilitychange',schedule);};
 },[hasResult,active,isMap,signature,mobile]);
 const chosen=nodes.find(n=>n.key===selected);
 return <div className={'architecture-stage '+(expanded?'is-visible':'')} aria-busy={pending}><div className="architecture-stage-clip">
 <div className="architecture-surface" style={{height:isMap?height:mobile?660:400}}>
 <div className={'architecture-building'+(pending&&!hasResult?' is-visible':'')} role="status" aria-hidden={!pending||hasResult}>Preparando la propuesta de ejemplo…</div>
 {hasResult&&isMap&&<div className="architecture-canvas" ref={root} role="group" aria-label={response.title||'Arquitectura propuesta'}>
 <div className="architecture-boundary" aria-hidden="true"><span>Componentes y conexiones</span></div><canvas ref={canvas} aria-hidden="true"/>
 {edges.map((edge,index)=>{const ai=nodes.findIndex(n=>n.key===edge.from_key),bi=nodes.findIndex(n=>n.key===edge.to_key),a=layout[ai],b=layout[bi];return <span key={index} title={edge.description} style={{left:`${(a.x+b.x)/2}%`,top:mobile?(a.y+b.y)/2+90:Math.abs(a.y-b.y)<20?a.y+20:(a.y+b.y)/2+45,transform:'translateX(-50%)','--edge-delay':`${edgeDelay(ai,bi)+180}ms`}} className="connection-label">{edge.protocol}</span>;})}
 {nodes.map((node,index)=><button key={node.key} ref={el=>{if(el)elements.current.set(node.key,el);else elements.current.delete(node.key);}} type="button" data-node={node.key} className={'architecture-node node-contract'+(selected===node.key?' is-selected':'')} style={{left:`calc(${layout[index].x}% - ${mobile?105:101}px)`,top:layout[index].y,'--node-delay':`${nodeDelay(index)}ms`}} aria-pressed={selected===node.key} aria-controls="architecture-node-info" onClick={()=>setSelected(selected===node.key?null:node.key)}>
 {node.tool?<BrandIcon tool={node.tool}/>:<Box size={34} aria-hidden="true"/>}<span className="node-copy"><strong>{node.label}</strong><span>{node.role}</span><small>{node.tool?'Herramienta del catálogo':node.full_name?'Referencia sin ficha':'Parte de tu aplicación'}</small></span></button>)}
 <ol className="sr-only">{edges.map((edge,index)=><li key={index}>{nodes.find(n=>n.key===edge.from_key)?.label} → {nodes.find(n=>n.key===edge.to_key)?.label}: {edge.protocol}. {edge.description}</li>)}</ol></div>}
 {hasResult&&!isMap&&<section className="assistant-outcome" aria-label={response?.status==='needs_clarification'?'Aclaraciones necesarias':'Sin evidencia suficiente'}>
 <h2>{response?.status==='needs_clarification'?'Completemos la descripción':'No hay evidencia suficiente'}</h2>
 {response?.status==='needs_clarification'?<><ol>{response.clarification_questions.map((q,i)=><li key={i}>{q}</li>)}</ol><p>Completa la descripción del input con estas respuestas. Cada envío se evalúa de forma independiente.</p></>:<p>{response?.summary||'No encontramos evidencia suficiente para recomendar una arquitectura. Prueba con una descripción más concreta o revisa el catálogo.'}</p>}
 </section>}
 </div>
 <div className={'architecture-info-slot'+(chosen&&isMap?' is-visible':'')}><div><div id="architecture-node-info" className="architecture-node-info" aria-live="polite">{chosen&&isMap&&<><p><strong>{chosen.label}.</strong> {chosen.rationale}</p>{chosen.tool&&<a href={'#herramienta/'+chosen.tool.id}>Ver ficha <ArrowUpRight size={14}/></a>}</>}</div></div></div>
 {hasResult&&response&&<div className="assistant-context">{response.assumptions.length>0&&<details><summary>Supuestos</summary><ul>{response.assumptions.map((v,i)=><li key={i}>{v}</li>)}</ul></details>}{response.limitations.length>0&&<details><summary>Limitaciones</summary><ul>{response.limitations.map((v,i)=><li key={i}>{v}</li>)}</ul></details>}</div>}
 </div></div>;
}
