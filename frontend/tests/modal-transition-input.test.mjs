import test from 'node:test';
import assert from 'node:assert/strict';
import {settleModalOnScrollIntent} from '../src/modalTransitionInput.mjs';
test('first wheel settles transition once without consuming native scroll',()=>{
 const overlay=new EventTarget(),scrollport=new EventTarget();let finishes=0;
 settleModalOnScrollIntent(overlay,scrollport,()=>finishes++);
 const wheel=new Event('wheel',{cancelable:true});overlay.dispatchEvent(wheel);
 scrollport.dispatchEvent(new Event('scroll'));overlay.dispatchEvent(new Event('wheel'));
 assert.equal(finishes,1);assert.equal(wheel.defaultPrevented,false);
});
test('scrolling from keyboard or touch also settles and listeners can be cancelled',()=>{
 for(const type of ['keydown','touchmove','scroll']){
  const overlay=new EventTarget(),scrollport=new EventTarget();let finishes=0;
  const stop=settleModalOnScrollIntent(overlay,scrollport,()=>finishes++);
  const event=new Event(type);if(type==='keydown')Object.defineProperty(event,'key',{value:'PageDown'});
  (type==='scroll'?scrollport:overlay).dispatchEvent(event);assert.equal(finishes,1);stop();
 }
 const overlay=new EventTarget();let finishes=0;settleModalOnScrollIntent(overlay,new EventTarget(),()=>finishes++)();overlay.dispatchEvent(new Event('wheel'));assert.equal(finishes,0);
});
