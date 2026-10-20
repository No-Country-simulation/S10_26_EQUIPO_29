import {useLayoutEffect,useRef} from 'react';
import {scrollbarMetrics,elasticThumb,followScroll,scrollFromThumb,updateScrollGesture,gestureStretch} from './scrollbarGeometry.mjs';

export function ElasticScrollbar({routeKey}){
 const railRef=useRef(null),thumbRef=useRef(null);
 useLayoutEffect(()=>{
  const rail=railRef.current,thumb=thumbRef.current,root=document.documentElement;
  const eligible=matchMedia('(min-width:768px) and (pointer:fine) and (hover:hover) and (prefers-reduced-motion:no-preference) and (forced-colors:none)');
  let metrics,enabled=false,drag=null,raf=0,idle=0,last=0,trailing=0,snapUntil=performance.now()+800,disposed=false;
  let gesture={distance:0,direction:0,time:-Infinity},stretch=0,lastY=scrollY;
  const originalPadding=root.style.paddingRight;
  function resetGesture(){gesture={distance:0,direction:0,time:-Infinity};stretch=0;lastY=scrollY;}
  function active(){rail.dataset.active='true';clearTimeout(idle);idle=setTimeout(()=>{rail.dataset.active='false';},800);}
  function paint(){
   const shape=elasticThumb(metrics,metrics.position,drag?0:stretch);
   thumb.style.transform=`translateY(${shape.top}px) scaleY(${shape.length})`;
   thumb.style.borderRadius=`3px / ${3/shape.length}px`;
   rail.setAttribute('aria-valuemax',String(Math.round(metrics.maxScroll)));
   rail.setAttribute('aria-valuenow',String(Math.round(Math.max(0,Math.min(scrollY,metrics.maxScroll)))));
   rail.setAttribute('aria-valuetext',`${Math.round(metrics.maxScroll?Math.max(0,Math.min(1,scrollY/metrics.maxScroll))*100:0)} %`);
  }
  function stop(){cancelAnimationFrame(raf);raf=0;last=0;}
  function tick(now){
   raf=0;if(!enabled||document.hidden||disposed)return;
   metrics=scrollbarMetrics(innerHeight,root.scrollHeight,scrollY);
   trailing=drag||now<snapUntil?metrics.position:followScroll(trailing,metrics.position,last?Math.min(now-last,64):16);
   const target=!drag&&now>=snapUntil&&now-gesture.time<120?gesture.direction*gestureStretch(metrics,gesture.distance):0;
   const dt=last?Math.min(now-last,64):16;
   stretch=target+(stretch-target)*Math.exp(-dt/(target===0?80:45));
   if(Math.abs(stretch-target)<.05)stretch=target;
   last=now;
   if(Math.abs(trailing-metrics.position)<.05)trailing=metrics.position;
   paint();
   if(trailing!==metrics.position||stretch!==0||target!==0)raf=requestAnimationFrame(tick);else last=0;
  }
  function schedule(){if(!raf&&!document.hidden)raf=requestAnimationFrame(tick);}
  function measure(snap=true){
   metrics=scrollbarMetrics(innerHeight,root.scrollHeight,scrollY);
   const next=eligible.matches&&metrics.maxScroll>1&&metrics.travel>0;
   if(next!==enabled){
    enabled=next;
    if(enabled){
     // Replace the occupied native gutter without changing the content width.
     const gutter=Math.max(0,innerWidth-root.clientWidth);
     root.style.paddingRight=`${parseFloat(getComputedStyle(root).paddingRight)+gutter}px`;
     root.classList.add('elastic-scrollbar-active');
    }else{
     root.classList.remove('elastic-scrollbar-active');root.style.paddingRight=originalPadding;
     if(drag){if(rail.hasPointerCapture(drag.id))rail.releasePointerCapture(drag.id);drag=null;}
     stop();
    }
    rail.hidden=!enabled;
   }
   if(!enabled)return;
   if(snap){trailing=metrics.position;resetGesture();}
   paint();schedule();
  }
  function onScroll(){if(!enabled)return;const now=performance.now(),y=Math.max(0,Math.min(scrollY,metrics.maxScroll));
   if(!drag&&now>=snapUntil)gesture=updateScrollGesture(gesture,y-lastY,now);
   lastY=y;active();schedule();}
  function jump(position){window.scrollTo({top:scrollFromThumb(metrics,position),behavior:'instant'});metrics=scrollbarMetrics(innerHeight,root.scrollHeight,scrollY);trailing=metrics.position;resetGesture();paint();active();}
  function down(event){
   if(!enabled||event.button!==0)return;
   event.preventDefault();rail.focus({preventScroll:true});measure(false);
   const y=event.clientY-metrics.inset;
   const shape=elasticThumb(metrics,metrics.position,stretch);
   const inThumb=event.clientY>=shape.top&&event.clientY<=shape.top+shape.length;
   // Preserve the exact grabbed point when removing any elastic stretch.
   const offset=inThumb?(event.clientY-shape.top)/shape.length*metrics.length:metrics.length/2;
   drag={id:event.pointerId,offset};rail.setPointerCapture(event.pointerId);rail.dataset.dragging='true';
   jump(y-offset);
  }
  function move(event){if(drag?.id===event.pointerId)jump(event.clientY-metrics.inset-drag.offset);}
  function end(event){if(drag?.id!==event.pointerId)return;const id=drag.id;drag=null;rail.dataset.dragging='false';if(rail.hasPointerCapture(id))rail.releasePointerCapture(id);active();measure();}
  function key(event){
   if(!enabled)return;
   const targets={ArrowDown:scrollY+40,ArrowUp:scrollY-40,PageDown:scrollY+innerHeight*.9,PageUp:scrollY-innerHeight*.9,Home:0,End:metrics.maxScroll};
   if(!(event.key in targets))return;event.preventDefault();window.scrollTo({top:targets[event.key],behavior:'instant'});onScroll();
  }
  function navigation(){snapUntil=performance.now()+800;measure();}
  function visibility(){if(document.hidden){stop();clearTimeout(idle);}else{measure();active();}}
  const resize=new ResizeObserver(()=>measure());resize.observe(document.body);resize.observe(root);
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',navigation);
  window.addEventListener('hashchange',navigation);window.addEventListener('popstate',navigation);
  document.addEventListener('visibilitychange',visibility);eligible.addEventListener('change',navigation);
  rail.addEventListener('pointerdown',down);rail.addEventListener('pointermove',move);
  for(const name of ['pointerup','pointercancel','lostpointercapture'])rail.addEventListener(name,end);
  rail.addEventListener('keydown',key);rail.addEventListener('focus',active);
  measure();
  return()=>{
   disposed=true;stop();clearTimeout(idle);resize.disconnect();
   if(drag&&rail.hasPointerCapture(drag.id))rail.releasePointerCapture(drag.id);
   root.classList.remove('elastic-scrollbar-active');root.style.paddingRight=originalPadding;
   window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',navigation);
   window.removeEventListener('hashchange',navigation);window.removeEventListener('popstate',navigation);
   document.removeEventListener('visibilitychange',visibility);eligible.removeEventListener('change',navigation);
   rail.removeEventListener('pointerdown',down);rail.removeEventListener('pointermove',move);
   for(const name of ['pointerup','pointercancel','lostpointercapture'])rail.removeEventListener(name,end);
   rail.removeEventListener('keydown',key);rail.removeEventListener('focus',active);
  };
 },[routeKey]);
 return <div ref={railRef} className="elastic-scrollbar" role="scrollbar" aria-label="Desplazar página" aria-controls="root" aria-orientation="vertical" aria-valuemin={0} aria-valuemax={0} aria-valuenow={0} tabIndex={0} hidden><div ref={thumbRef} className="elastic-scrollbar-thumb" aria-hidden="true"/></div>;
}
