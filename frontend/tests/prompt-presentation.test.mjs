import test from 'node:test';
import assert from 'node:assert/strict';
import {initialPresentation,promptPresentation,promptMotion,nodeDelay,edgeDelay} from '../src/promptPresentation.mjs';

test('first request reserves layout, then reveals its result',()=>{
 const pending=promptPresentation(initialPresentation,{type:'submit'});
 assert.deepEqual(pending,{pending:true,expanded:true,hasResult:false});
 assert.equal(promptPresentation(pending,{type:'submit'}),pending);
 assert.deepEqual(promptPresentation(pending,{type:'success'}),{pending:false,expanded:true,hasResult:true});
});
test('updates preserve existing architecture, including cancellation and failure',()=>{
 const ready=promptPresentation(promptPresentation(initialPresentation,{type:'submit'}),{type:'success'});
 const updating=promptPresentation(ready,{type:'submit'});
 assert.equal(updating.hasResult,true);assert.equal(updating.expanded,true);
 for(const type of ['cancel','failure'])assert.deepEqual(promptPresentation(updating,{type}),ready);
 assert.deepEqual(promptPresentation(updating,{type:'success'}),ready);
});
test('cancelled initial request cannot display a late result',()=>{
 const cancelled=promptPresentation(promptPresentation(initialPresentation,{type:'submit'}),{type:'cancel'});
 assert.deepEqual(cancelled,initialPresentation);
 assert.equal(promptPresentation(cancelled,{type:'success'}),cancelled);
});
test('connections start after both nodes begin arriving and complete inside the reveal budget',()=>{
 for(const [from,to] of [[1,0],[2,0],[1,2],[2,3]]){
  const start=edgeDelay(from,to);
  assert.ok(start>=Math.max(nodeDelay(from),nodeDelay(to))+120);
  assert.ok(start+promptMotion.edge<=650);
  assert.ok(start+180+promptMotion.label<=650);
 }
});
