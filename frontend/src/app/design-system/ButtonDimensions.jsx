'use client';
import {useLayoutEffect,useRef} from 'react';

/** Cotas del botón renderizado; nunca se deducen de la etiqueta SM/MD/LG. */
export function ButtonDimensions({children}){
 const host=useRef(null),drawing=useRef(null),current=useRef(null);
 useLayoutEffect(()=>{
  const root=host.current,button=root.querySelector('button'),svg=drawing.current;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,last=0,target;
  const paint=({x,y,w,h})=>{
   svg.querySelector('[data-width]').setAttribute('d',`M${x} ${y-19}h${w}m0 -5v10M${x} ${y-24}v10`);
   svg.querySelector('[data-height]').setAttribute('d',`M${x+w+19} ${y}v${h}m-5 0h10M${x+w+14} ${y}h10`);
   const width=svg.querySelector('[data-width-label]'),height=svg.querySelector('[data-height-label]');
   width.setAttribute('x',x+w/2);width.setAttribute('y',y-32);width.textContent=`${Math.round(w)} px`;
   height.setAttribute('x',x+w+31);height.setAttribute('y',y+h/2);height.textContent=`${Math.round(h)} px`;
  };
  const tick=time=>{
   const blend=1-Math.exp(-Math.min(time-(last||time-16),40)/55);last=time;
   let distance=0;
   for(const key of ['x','y','w','h']){current.current[key]+=(target[key]-current.current[key])*blend;distance=Math.max(distance,Math.abs(target[key]-current.current[key]));}
   if(distance<.05){current.current={...target};frame=0;last=0;}else frame=requestAnimationFrame(tick);
   paint(current.current);
  };
  const read=()=>{
   const r=button.getBoundingClientRect(),box=root.getBoundingClientRect();
   target={x:r.left-box.left,y:r.top-box.top,w:r.width,h:r.height};
   if(!current.current||motion.matches){cancelAnimationFrame(frame);frame=0;current.current={...target};paint(target);}
   else if(!frame)frame=requestAnimationFrame(tick);
  };
  const observer=new ResizeObserver(read);observer.observe(button);observer.observe(root);motion.addEventListener('change',read);read();
  return()=>{observer.disconnect();motion.removeEventListener('change',read);cancelAnimationFrame(frame);};
 },[children]);
 return <div ref={host} className="ds-button-playground-stage ds-button-measured">{children}<svg ref={drawing} className="ds-button-dimensions" aria-label="Medidas del botón en píxeles" role="img"><path data-width=""/><path data-height=""/><text data-width-label="" textAnchor="middle"/><text data-height-label="" dominantBaseline="middle"/></svg></div>;
}
