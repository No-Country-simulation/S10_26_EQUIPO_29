// One global listener set, regardless of the number of mounted cards.
export function createCardInteractionEvents(win,doc){
 const active=new Set();let count=0;
 const dispatch=method=>event=>{for(const handlers of [...active])handlers[method](event);};
 const reset=dispatch('reset'),up=dispatch('up'),keyup=dispatch('keyup');
 const visibility=()=>{if(doc.hidden)reset();};
 const events=[[win,'pointerup',up],[win,'keyup',keyup],[win,'blur',reset],[win,'scroll',reset],[doc,'visibilitychange',visibility]];
 return {register(handlers){
  if(count++===0)for(const [target,type,fn] of events)target.addEventListener(type,fn,{passive:true});
  let disposed=false;
  return {activate(){if(!disposed)active.add(handlers);},deactivate(){active.delete(handlers);},dispose(){
   if(disposed)return;disposed=true;active.delete(handlers);
   if(--count===0)for(const [target,type,fn] of events)target.removeEventListener(type,fn);
  }};
 }};
}
let shared;
export function registerCardInteraction(handlers){
 shared??=createCardInteractionEvents(window,document);
 return shared.register(handlers);
}
