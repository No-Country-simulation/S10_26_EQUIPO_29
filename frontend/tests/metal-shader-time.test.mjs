import test from 'node:test';
import assert from 'node:assert/strict';
import {metalShaderTime} from '../src/metalGeometry.mjs';
test('shader moves quickly through reveal and settles to twelve times slower drift',()=>{
 assert.equal(metalShaderTime(0),0);
 assert.ok(Math.abs(metalShaderTime(1800)-1296)<1e-6);
 for(const boundary of [1800,3400])assert.ok(Math.abs(metalShaderTime(boundary+.001)-metalShaderTime(boundary-.001))<.002);
 assert.ok(Math.abs((metalShaderTime(6000)-metalShaderTime(5000))/1000-.06)<1e-9);
 let previous=.72;
 for(let t=1800;t<3500;t+=50){const speed=(metalShaderTime(t+1)-metalShaderTime(t));assert.ok(speed<=previous+.00001&&speed>=.05999);previous=speed;}
});
