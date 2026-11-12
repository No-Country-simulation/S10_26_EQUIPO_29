export function promptAction({query='',originalPrompt='',hasResult=false,assistantResponse,pending=false,error,canRetry=false}){
 if(pending)return {mode:'stop',label:'Detener consulta',disabled:false};
 const empty=!query.trim();
 const retry=!empty&&Boolean((error&&canRetry)||(hasResult&&assistantResponse&&query===originalPrompt));
 return {mode:retry?'retry':'send',label:retry?'Reintentar':'Generar propuesta',disabled:empty};
}
