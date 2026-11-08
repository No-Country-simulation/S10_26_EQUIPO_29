import {useEffect,useId,useRef,useState} from 'react';
import {createPortal} from 'react-dom';

// Shared tooltip presentation and pointer-following motion for the interface.
export function FollowingTooltip({text,children,className=''}){
 const [open,setOpen]=useState(false);
 const id=useId();
 const tooltipRef=useRef(null);
 const [mounted,setMounted]=useState(false);
 useEffect(()=>setMounted(true),[]);
 const words=String(text??'').trim().split(/\s+/).filter(Boolean);
 useEffect(()=>{
  const dismiss=()=>setOpen(false);
  window.addEventListener('dismiss-review-tooltip',dismiss);
  window.addEventListener('scroll',dismiss,true);
  window.addEventListener('resize',dismiss);
  return()=>{window.removeEventListener('dismiss-review-tooltip',dismiss);window.removeEventListener('scroll',dismiss,true);window.removeEventListener('resize',dismiss);};
 },[]);
 const followPointer=event=>{
  if(event.pointerType==='touch')return;
  const tooltip=tooltipRef.current;
  if(!tooltip)return;
  const gap=12;
  const x=Math.max(gap,Math.min(event.clientX+gap,window.innerWidth-tooltip.offsetWidth-gap));
  const below=event.clientY+16;
  const y=Math.max(gap,below+tooltip.offsetHeight>window.innerHeight-gap?event.clientY-tooltip.offsetHeight-16:below);
  tooltip.style.setProperty('--review-x',`${x}px`);
  tooltip.style.setProperty('--review-y',`${y}px`);
 };
 const trigger={
  'aria-describedby':open&&text?id:undefined,
  onFocus:event=>{const wrap=event.currentTarget.parentElement,rect=wrap.getBoundingClientRect();followPointer({currentTarget:wrap,clientX:rect.left,clientY:rect.bottom,pointerType:'mouse'});setOpen(true);},
  onBlur:()=>setOpen(false),
  onClick:event=>{event.stopPropagation();setOpen(true);},
  onKeyDown:event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setOpen(false);}}
 };
 return <span className={`integration-review-wrap ${className}`} onPointerEnter={event=>{followPointer(event);setOpen(true);}} onPointerMove={followPointer} onMouseLeave={()=>setOpen(false)}>
  {children(trigger)}
  {mounted&&createPortal(<span ref={tooltipRef} id={id} role="tooltip" aria-hidden={!open||!text} data-open={open&&!!text} className="integration-review-tooltip following-tooltip-layer">
   <span className="tooltip-surface">
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">{words.map((word,index)=><span key={index} className="tooltip-word-mask"><span className="tooltip-word" style={{'--word-enter-delay':`${20+Math.min(index*5,65)}ms`,'--word-exit-delay':`${Math.min((words.length-1-index)*5,60)}ms`}}>{word}</span>{index<words.length-1?' ':''}</span>)}</span>
   </span>
  </span>,document.body)}
 </span>;
}
