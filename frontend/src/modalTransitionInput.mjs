// Hand control to native scrolling before a fixed transition snapshot can drift.
export function settleModalOnScrollIntent(overlay,scrollport,finish){
 let active=true;
 const stop=()=>{
  if(!active)return;active=false;
  overlay?.removeEventListener('wheel',settle,true);
  overlay?.removeEventListener('touchmove',settle,true);
  overlay?.removeEventListener('keydown',key,true);
  overlay?.removeEventListener('pointerdown',pointer,true);
  scrollport?.removeEventListener('scroll',settle);
 };
 const settle=()=>{if(!active)return;stop();finish();};
 const key=event=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))settle();};
 const pointer=event=>{if(event.target?.closest?.('.tool-modal-rail'))settle();};
 overlay?.addEventListener('wheel',settle,{capture:true,passive:true});
 overlay?.addEventListener('touchmove',settle,{capture:true,passive:true});
 overlay?.addEventListener('keydown',key,true);
 overlay?.addEventListener('pointerdown',pointer,true);
 scrollport?.addEventListener('scroll',settle,{passive:true});
 return stop;
}
