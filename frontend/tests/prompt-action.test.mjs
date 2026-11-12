import test from 'node:test';
import assert from 'node:assert/strict';
import {promptAction} from '../src/features/assistant/promptAction.mjs';
const result={query:'Quiero gestionar mis tiendas.',originalPrompt:'Quiero gestionar mis tiendas.',hasResult:true,assistantResponse:{status:'ok'}};
test('a completed response can be requested again until its prompt changes',()=>{
 assert.equal(promptAction(result).mode,'retry');
 assert.equal(promptAction({...result,query:'Quiero gestionar pedidos.'}).mode,'send');
 assert.equal(promptAction({...result,query:result.query+' '}).mode,'send');
 assert.equal(promptAction({...result,query:result.originalPrompt}).mode,'retry');
});
test('empty input disables send while pending always allows stopping',()=>{
 assert.deepEqual(promptAction({...result,query:'  '}),{mode:'send',label:'Generar propuesta',disabled:true});
 assert.deepEqual(promptAction({...result,query:'',pending:true}),{mode:'stop',label:'Detener consulta',disabled:false});
});
test('request errors retain retry and clarification uses the same prompt comparison',()=>{
 assert.equal(promptAction({query:result.query,error:'timeout',canRetry:true}).mode,'retry');
 assert.equal(promptAction({...result,assistantResponse:{status:'needs_clarification'}}).mode,'retry');
 assert.equal(promptAction({query:result.query}).mode,'send');
});
