import {memo,useEffect,useRef,useState} from 'react';
import {LiquidMetal} from '@paper-design/shaders-react';

import {liquidMetalMaterial as material} from './liquidMetalMaterial';
export const PromptMetalFill=memo(function PromptMetalFill(){
 const root=useRef(null);
 const [running,setRunning]=useState(false);
 const [mounted,setMounted]=useState(false);
 useEffect(()=>{
  const host=root.current,button=host.closest('button');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover)');
  let hovered=false,visible=true,timer=0;
  function sync(){
   const active=hovered&&visible&&!document.hidden&&fine.matches;
   clearTimeout(timer);
   if(active){setMounted(true);setRunning(!reduced.matches);}
   else timer=setTimeout(()=>setRunning(false),300);
  }
  function enter(e){if(e.pointerType==='touch')return;hovered=true;sync();}
  function leave(){hovered=false;sync();}
  function visibility(){if(document.hidden){clearTimeout(timer);setRunning(false);}else sync();}
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});
  observer.observe(button);
  button.addEventListener('pointerenter',enter);button.addEventListener('pointerleave',leave);button.addEventListener('pointercancel',leave);
  document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',sync);fine.addEventListener('change',sync);
  return()=>{clearTimeout(timer);observer.disconnect();button.removeEventListener('pointerenter',enter);button.removeEventListener('pointerleave',leave);button.removeEventListener('pointercancel',leave);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',sync);fine.removeEventListener('change',sync);};
 },[]);
 return <span ref={root} className="prompt-fill" aria-hidden="true"><span className="prompt-metal-reveal">{mounted&&<LiquidMetal {...material} speed={running?1.28:0} frame={12000} className="prompt-metal-material" minPixelRatio={1} maxPixelCount={160000}/>}</span></span>;
});
