import {useEffect,useRef} from 'react';
// Keep the outgoing document height until scrolling has reached the loading header.
export function useResultReset(input){
 const cleanup=useRef(()=>{});
 useEffect(()=>()=>cleanup.current(),[]);
 return ()=>{
  cleanup.current();
  const hero=input.current?.closest('.hero');
  if(!hero||!hero.querySelector('.stack-layers-panel,.stack-outcome,.proposal-skeleton'))return;
  const previous=hero.style.minHeight;
  hero.style.minHeight=`${hero.getBoundingClientRect().height}px`;
  const start=window.scrollY;
  const target=Math.max(0,hero.getBoundingClientRect().top+start);
  let frame=0,started;
  const release=()=>{cancelAnimationFrame(frame);hero.style.minHeight=previous;};
  cleanup.current=release;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){window.scrollTo({top:target,behavior:'instant'});release();return;}
  const tick=now=>{
   started??=now;
   const progress=Math.min(1,(now-started)/480);
   window.scrollTo({top:start+(target-start)*(1-Math.pow(1-progress,3)),behavior:'instant'});
   if(progress<1)frame=requestAnimationFrame(tick);else release();
  };
  frame=requestAnimationFrame(tick);
 };
}
