import test from 'node:test';
import assert from 'node:assert/strict';
import {scrollbarMetrics,gestureStretch,updateScrollGesture,elasticThumb} from '../src/scrollbarGeometry.mjs';
test('sustained scroll accumulates across frames instead of saturating at instantaneous lag',()=>{
 let state={direction:0,distance:0,time:-Infinity};
 for(let i=0;i<100;i++)state=updateScrollGesture(state,10,i*16);
 assert.equal(state.distance,1000);
 const m=scrollbarMetrics(864,3021,1000);
 const short=gestureStretch(m,20),long=gestureStretch(m,state.distance);
 assert.ok(short<5);assert.ok(long>100);assert.ok(long>short*10);
 assert.ok(elasticThumb(m,m.position,long).length-m.length>100);
});
test('gesture resets after a pause or reversal',()=>{
 const a=updateScrollGesture({direction:0,distance:0,time:-Infinity},100,0);
 assert.equal(updateScrollGesture(a,20,100).distance,120);
 assert.equal(updateScrollGesture(a,20,200).distance,20);
 const reverse=updateScrollGesture(a,-15,16);assert.equal(reverse.distance,15);assert.equal(reverse.direction,-1);
});
