import {useEffect,useId,useRef,useState} from 'react';
import {createPortal} from 'react-dom';

// Shared tooltip presentation and pointer-following motion for the interface.
export function FollowingTooltip({text,children,className=''}){
 const [open,setOpen]=useState(false);
 const id=useId();
 const tooltipRef=useRef(null);
 const motion=useRef({timer:0});
 const close=()=>{clearTimeout(motion.current.timer);setOpen(false);};
 const show=(immediate=false)=>{clearTimeout(motion.current.timer);if(immediate)setOpen(true);else motion.current.timer=setTimeout(()=>setOpen(true),120);};
 const [mounted,setMounted]=useState(false);
 useEffect(()=>setMounted(true),[]);
 useEffect(()=>{
  const dismiss=close;
  window.addEventListener('dismiss-review-tooltip',dismiss);
  window.addEventListener('scroll',dismiss,true);
  window.addEventListener('resize',dismiss);
  return()=>{clearTimeout(motion.current.timer);window.removeEventListener('dismiss-review-tooltip',dismiss);window.removeEventListener('scroll',dismiss,true);window.removeEventListener('resize',dismiss);};
 },[]);
 const followPointer=event=>{
  if(event.pointerType==='touch')return;
  const tooltip=tooltipRef.current;
  if(!tooltip)return;
  const gap=12;
  const x=Math.max(gap,Math.min(event.clientX+gap,window.innerWidth-tooltip.offsetWidth-gap));
  const below=event.clientY+16;
  const y=Math.max(gap,below+tooltip.offsetHeight>window.innerHeight-gap?event.clientY-tooltip.offsetHeight-16:below);
  // Track the actual pointer directly; entrance animation belongs to the surface,
  // not to positioning (restarting an easing loop on every event creates drift).
  tooltip.style.setProperty('--review-x',`${x}px`);
  tooltip.style.setProperty('--review-y',`${y}px`);
  tooltip.style.setProperty('--tooltip-origin',below+tooltip.offsetHeight>window.innerHeight-gap?'center bottom':'center top');
 };
 const trigger={
  'aria-describedby':open&&text?id:undefined,
  onFocus:event=>{const wrap=event.currentTarget.parentElement,rect=wrap.getBoundingClientRect();followPointer({currentTarget:wrap,clientX:rect.left,clientY:rect.bottom,pointerType:'mouse'});show(true);},
  onBlur:close,
  onClick:event=>{event.stopPropagation();const rect=event.currentTarget.getBoundingClientRect();followPointer({clientX:event.detail?event.clientX:rect.left,clientY:event.detail?event.clientY:rect.bottom,pointerType:'mouse'});show(true);},
  onKeyDown:event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();}}
 };
 return <span className={`integration-review-wrap ${className}`} onPointerEnter={event=>{followPointer(event);show();}} onPointerMove={followPointer} onMouseLeave={close}>
  {children(trigger)}
  {mounted&&createPortal(<span ref={tooltipRef} id={id} role="tooltip" aria-hidden={!open||!text} data-open={open&&!!text} className="integration-review-tooltip following-tooltip-layer">
   <span className="tooltip-surface">
    {text}
   </span>
  </span>,document.body)}
 </span>;
}
