import {useEffect} from 'react';

// Decorative depth only; the document and interactive content keep native scrolling.
export function useHeroParallax(isDetail){
 useEffect(()=>{
  if(isDetail)return;
  const hero=document.querySelector('#landing-view .hero');
  if(!hero)return;
  const motion=matchMedia('(prefers-reduced-motion: no-preference)');
  let frame=0,last=0,current=0,visible=true;
  const clear=()=>{cancelAnimationFrame(frame);frame=0;last=0;hero.style.removeProperty('--hero-parallax-y');hero.removeAttribute('data-parallax-moving');current=0;};
  const tick=now=>{
   frame=0;
   if(!motion.matches||document.hidden||!visible){last=0;hero.removeAttribute('data-parallax-moving');return;}
   const rect=hero.getBoundingClientRect();
   const progress=Math.max(0,Math.min(-rect.top,rect.height));
   const target=Math.min(96,progress*.22);
   const dt=Math.min(64,now-(last||now-16));last=now;
   current+=(target-current)*(1-Math.exp(-dt/70));
   if(Math.abs(target-current)<.1)current=target;
   hero.style.setProperty('--hero-parallax-y',`${current.toFixed(2)}px`);
   if(current!==target){hero.dataset.parallaxMoving='true';frame=requestAnimationFrame(tick);}
   else{hero.removeAttribute('data-parallax-moving');last=0;}
  };
  const schedule=()=>{if(!frame&&motion.matches&&!document.hidden&&visible)frame=requestAnimationFrame(tick);};
  const sync=()=>{if(!motion.matches){clear();return;}schedule();};
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;last=0;hero.removeAttribute('data-parallax-moving');}else schedule();};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;last=0;hero.removeAttribute('data-parallax-moving');}});
  const resize=new ResizeObserver(schedule);observer.observe(hero);resize.observe(hero);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',sync);schedule();
  return()=>{clear();observer.disconnect();resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',sync);};
 },[isDetail]);
}
