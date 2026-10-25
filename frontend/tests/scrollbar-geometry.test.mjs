import test from 'node:test';
import assert from 'node:assert/strict';
import {scrollbarMetrics,elasticThumb,followScroll,scrollFromThumb} from '../src/scrollbarGeometry.mjs';
test('thumb is proportional, with minimum size and exact document endpoints',()=>{
 for(const height of [800,1600,100000]){
  const start=scrollbarMetrics(800,height,0),end=scrollbarMetrics(800,height,height);
  assert.ok(start.length>=32);assert.equal(start.position,0);assert.equal(end.position,end.travel);
  assert.equal(scrollFromThumb(end,end.travel),end.maxScroll);
 }
 assert.equal(scrollbarMetrics(800,200,0).maxScroll,0);
 assert.equal(scrollbarMetrics(0,200,0).length,0);
});
test('elasticity follows the leading edge in both directions without exceeding the rail',()=>{
 for(const viewport of [100,800,1200])for(const height of [1600,100000])for(const y of [0,100,800,height]){
  const m=scrollbarMetrics(viewport,height,y);
  for(const lag of [-100,0,100]){
   const shape=elasticThumb(m,m.position+lag);
   assert.ok(shape.top>=m.inset);assert.ok(shape.top+shape.length<=m.inset+m.track+1e-8);
   assert.ok(shape.length>=m.length);assert.ok(shape.length-m.length<=Math.min(m.track*.18,m.length*.65)+1e-8);
   if(lag===0)assert.equal(shape.length,m.length);
  }
 }
});
test('100ms follow converges independently of refresh rate with no overshoot',()=>{
 let a=0,b=0;for(let i=0;i<10;i++)a=followScroll(a,100,16);for(let i=0;i<20;i++)b=followScroll(b,100,8);
 assert.ok(Math.abs(a-b)<1e-9);assert.ok(a>0&&a<100);
 assert.equal(followScroll(10,100,0),10);
 assert.ok(Math.abs(followScroll(0,100,1000)-100)<.01);
 assert.ok(followScroll(100,0,16)>0);
});
test('pointer positions and overscroll clamp to real document range',()=>{
 const m=scrollbarMetrics(800,2400,1200);
 assert.equal(scrollFromThumb(m,-100),0);assert.equal(scrollFromThumb(m,1e6),1600);
 assert.equal(scrollFromThumb(m,m.travel/2),800);
 assert.equal(scrollbarMetrics(800,2400,-10).position,0);
 assert.equal(scrollbarMetrics(800,2400,1e9).position,m.travel);
});

test('natural elasticity retains visible stretch with faster recovery',()=>{
 const m=scrollbarMetrics(800,3200,1000),shape=elasticThumb(m,m.position-100);
 assert.ok(shape.length-m.length>24&&shape.length-m.length<m.length*.65);
 assert.ok(followScroll(0,100,80)>50);
});

test('stretch scales progressively with screen distance and available thumb size',()=>{
 function stretch(height,distance){const m=scrollbarMetrics(800,height,1000);return elasticThumb(m,m.position-distance/m.maxScroll*m.travel).length-m.length;}
 const short=stretch(3200,20),medium=stretch(3200,100),long=stretch(3200,500);
 assert.ok(short<medium&&medium<long);assert.ok(short<5);assert.ok(long>24);
 assert.ok(stretch(6400,500)>stretch(6400,20));
});
