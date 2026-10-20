import {test} from 'node:test';
import assert from 'node:assert/strict';
import {brandInitials,resolveBrand,markBrandFailed} from '../src/brandIdentity.js';
const tool={id:'lago',name:'Lago'};
test('initials respect words, accents and whitespace',()=>{
 for(const [name,value] of [['PostgreSQL','P'],['  Árbol   Azul ','ÁA'],['Uno Dos Tres','UD'],['','']])assert.equal(brandInitials(name),value);
});
test('missing and failed logos use neutral identity without artwork',()=>{
 for(const identity of [resolveBrand(tool,{}),resolveBrand(tool,{lago:{logo:'/missing.svg'}},new Set(['/missing.svg']))]){
  assert.equal(identity.fallback,true);assert.equal(identity.logo,null);assert.equal(identity.watermark,null);assert.equal(identity.palette.start,'#222222');assert.equal(identity.wordmark,false);
 }
});
test('watermark error does not disable a valid logo or palette',()=>{
 const identity=resolveBrand(tool,{lago:{logo:'/logo.svg',watermark:'/watermark.svg',wordmark:true}},new Set(['watermark:/watermark.svg']));
 assert.equal(identity.fallback,false);assert.equal(identity.logo,'/logo.svg');assert.equal(identity.watermark,null);assert.equal(identity.wordmark,true);assert.equal(identity.palette.start,'#152a21');
});
test('logo failure persists across subsequent resolutions and preserves visible name',()=>{
 const before=resolveBrand(tool);assert.equal(before.wordmark,true);
 markBrandFailed(before.logo);
 assert.equal(resolveBrand(tool).fallback,true);assert.equal(resolveBrand(tool).wordmark,false);
});
