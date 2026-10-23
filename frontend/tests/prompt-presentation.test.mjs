import test from 'node:test';
import assert from 'node:assert/strict';
import {initialPresentation,promptPresentation} from '../src/promptPresentation.mjs';

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
test('new architecture clears presentation and ignores an obsolete result',()=>{
 const ready=promptPresentation(promptPresentation(initialPresentation,{type:'submit'}),{type:'success'});
 const reset=promptPresentation(ready,{type:'reset'});
 assert.deepEqual(reset,initialPresentation);
 assert.equal(promptPresentation(reset,{type:'success'}),reset);
 const next=promptPresentation(reset,{type:'submit'});
 assert.equal(next.pending,true);assert.equal(next.hasResult,false);
});
