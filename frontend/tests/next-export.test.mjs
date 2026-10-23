import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
test('Next export contains all directly referenced scripts and styles',async()=>{
 const html=await readFile(path.join(root,'dist/client/index.html'),'utf8');
 assert.match(html,/OpenBridge/);
 const refs=[...html.matchAll(/(?:src|href)="(\/_next\/[^"?]+)(?:\?[^\"]*)?"/g)];
 assert.ok(refs.length>0);
 for(const [,ref] of refs)assert.ok((await readFile(path.join(root,'dist/client',ref))).length>0,ref);
});
test('original local brand, font and animation assets survive the migration byte-for-byte',async()=>{
 async function verify(relative){
  for(const entry of await readdir(path.join(root,'public',relative),{withFileTypes:true})){
   const name=path.join(relative,entry.name);
   if(entry.isDirectory())await verify(name);
   else assert.deepEqual(await readFile(path.join(root,'dist/client',name)),await readFile(path.join(root,'public',name)),name);
  }
 }
 await verify('assets');
});
