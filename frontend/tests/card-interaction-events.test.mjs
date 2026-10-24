import test from 'node:test';
import assert from 'node:assert/strict';
import {createCardInteractionEvents} from '../src/cardInteractionEvents.mjs';
test('global events only dispatch to active cards and listeners are shared and removed',()=>{
 class Target extends EventTarget {count=0;addEventListener(...args){this.count++;super.addEventListener(...args);}removeEventListener(...args){this.count--;super.removeEventListener(...args);}}
 const win=new Target(),doc=new Target(),events=createCardInteractionEvents(win,doc);
 let resets=0,ups=0;const registrations=Array.from({length:100},()=>events.register({reset:()=>resets++,up:()=>ups++,keyup:()=>{}}));
 assert.equal(win.count,4);assert.equal(doc.count,1);
 win.dispatchEvent(new Event('scroll'));assert.equal(resets,0);
 registrations[0].activate();win.dispatchEvent(new Event('scroll'));assert.equal(resets,1);
 win.dispatchEvent(new Event('pointerup'));assert.equal(ups,1);
 registrations[0].deactivate();win.dispatchEvent(new Event('scroll'));assert.equal(resets,1);
 registrations.forEach(r=>{r.dispose();r.dispose();});assert.equal(win.count,0);assert.equal(doc.count,0);
});
