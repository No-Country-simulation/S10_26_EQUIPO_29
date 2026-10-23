import test from 'node:test';
import assert from 'node:assert/strict';
import {createModalScrollSync} from '../src/modalScrollSync.mjs';
function port(height,viewport){let top=0,writes=0;return {scrollHeight:height,clientHeight:viewport,get scrollTop(){return top;},set scrollTop(value){writes++;top=Math.round(value);},native(value){top=value;},get writes(){return writes;}};}
test('indicator updates never write back into native content momentum',()=>{
 const content=port(1718,656),rail=port(1634,624),sync=createModalScrollSync(content,rail);
 content.native(100);sync.syncFromContent();
 // Momentum advances before the indicator scroll event is delivered.
 content.native(145);sync.syncFromRail();
 assert.equal(content.scrollTop,145);assert.equal(content.writes,0);
});
test('dragging the rail updates content and its echo does not rewrite rail',()=>{
 const content=port(1718,656),rail=port(1634,624),sync=createModalScrollSync(content,rail);
 rail.native(500);sync.syncFromRail();assert.ok(content.scrollTop>500);
 sync.syncFromContent();assert.equal(rail.writes,0);
});
