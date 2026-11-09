import test from 'node:test';
import assert from 'node:assert/strict';
import ELK from 'elkjs/lib/elk.bundled.js';
import {connectionGraph,connectionLabelAnchor} from '../src/features/assistant/connectionLayout.mjs';
for(const [name,pairs] of Object.entries({single:[['a','b']],branch:[['a','b'],['a','c']],chain:[['a','b'],['b','c']],cycle:[['a','b'],['b','c'],['c','a']],parallel:[['a','b'],['a','b']]})){
 for(const direction of ['RIGHT','DOWN'])test(`${name}: ${direction} routes and labels without node overlap`,async()=>{
  const components=['a','b','c'].map(key=>({key}));
  const connections=pairs.map(([from_key,to_key])=>({from_key,to_key,protocol:'HTTP',description:'Descripción de la conexión'}));
  const result=await new ELK().layout(connectionGraph(components,connections,{},direction));
  assert.equal(result.edges.length,pairs.length);
  assert.equal(result.children.length,new Set(pairs.flat()).size);
  for(const edge of result.edges){assert.ok(edge.sections.length);
   const anchor=connectionLabelAnchor(edge,edge.labels[0]);
   assert.ok(edge.sections.some(section=>{
    const points=[section.startPoint,...(section.bendPoints??[]),section.endPoint];
    return points.slice(1).some((b,i)=>{const a=points[i];return Math.abs((anchor.x-a.x)*(b.y-a.y)-(anchor.y-a.y)*(b.x-a.x))<.001&&anchor.x>=Math.min(a.x,b.x)&&anchor.x<=Math.max(a.x,b.x)&&anchor.y>=Math.min(a.y,b.y)&&anchor.y<=Math.max(a.y,b.y);});
   }), 'Protocol badge center must lie on its own connection');
assert.ok(Number.isFinite(edge.labels[0].x));assert.equal(edge.connection.description,connections[0].description);}
  for(const a of result.children)for(const b of result.children)if(a.id!==b.id)assert.ok(a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y);
 });
}
