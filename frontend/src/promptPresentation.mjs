export const promptMotion=Object.freeze({layout:560,title:180,statusIn:160,statusOut:140,button:120,node:300,stagger:60,edge:280,label:160,ease:'cubic-bezier(.22,1,.36,1)'});
export const initialPresentation=Object.freeze({pending:false,expanded:false,hasResult:false});
export function promptPresentation(state,action){
 switch(action.type){
  case 'submit':return state.pending?state:{...state,pending:true,expanded:true};
  case 'success':return state.pending?{...state,pending:false,hasResult:true}:state;
  case 'cancel':case 'failure':return {...state,pending:false,expanded:state.hasResult};
  default:return state;
 }
}
export function nodeDelay(index){return index*promptMotion.stagger;}
export function edgeDelay(fromIndex,toIndex){return Math.max(nodeDelay(fromIndex),nodeDelay(toIndex))+120;}
