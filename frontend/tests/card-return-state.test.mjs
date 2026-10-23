import test from 'node:test';
import assert from 'node:assert/strict';
import {restReturningCard} from '../src/cardReturnState.mjs';
class Card extends EventTarget{attributes=new Set();setAttribute(name){this.attributes.add(name);}removeAttribute(name){this.attributes.delete(name);}}
test('returning card rests until fresh pointer or keyboard interaction',()=>{
 for(const type of ['pointermove','pointerleave','pointerdown','keydown','focusout']){
  const card=new Card();restReturningCard(card);assert.ok(card.attributes.has('data-return-rest'));
  card.dispatchEvent(new Event(type));assert.ok(!card.attributes.has('data-return-rest'));
 }
});
test('return state cleanup removes flag and old listeners',()=>{
 const card=new Card();const clear=restReturningCard(card);clear();assert.equal(card.attributes.size,0);
 card.setAttribute('data-return-rest');card.dispatchEvent(new Event('pointermove'));assert.ok(card.attributes.has('data-return-rest'));
});
