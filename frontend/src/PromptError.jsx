import {ArrowUpRight,CircleAlert} from 'lucide-react';

// Announce the full error once; the word masks are purely decorative.
export function PromptError({message,canRetry,onRetry}){
 const words=message.trim().split(/\s+/u);
 return <div className="composer-feedback">
  <p id="prompt-error" className="sr-only" role="alert" aria-atomic="true">{message}</p>
  {message&&<div key={message} className="composer-error-copy">
   <CircleAlert size={14} strokeWidth={1.6} aria-hidden="true"/>
   <div className="composer-error-body"><p className="composer-error-text" aria-hidden="true">{words.map((word,index)=><span key={index}><span className="prompt-error-word-mask"><span className="prompt-error-word" style={{'--word-delay':`${index*24}ms`}}>{word}</span></span>{index<words.length-1?' ':''}</span>)}</p>{canRetry&&<button type="button" className="composer-retry" onClick={onRetry}>Reintentar <ArrowUpRight size={12} aria-hidden="true"/></button>}</div>
  </div>}
 </div>;
}
