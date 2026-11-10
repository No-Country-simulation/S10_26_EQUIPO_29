import test from 'node:test';
import assert from 'node:assert/strict';
import {toolHref,readToolRoute,detailTarget} from '../src/data/detailTarget.mjs';
import {mockMode,unavailableAssistant} from '../src/data/mockMode.mjs';
test('canonical links round trip and preserve legacy identities',()=>{
 const tool={id:'ollama',githubId:123,full_name:'ollama/ollama'};
 assert.equal(toolHref(tool),'#herramienta/ollama/ollama');
 for(const id of ['ollama','123','ollama/ollama'])assert.equal(detailTarget(id,[tool]).original,tool);
 assert.equal(readToolRoute(toolHref(tool)),tool.full_name);
 assert.equal(detailTarget('owner/repo',[]).fullName,'owner/repo');
 assert.equal(readToolRoute('#asistente'),null);
 assert.doesNotThrow(()=>readToolRoute('#herramienta/%'));
});
test('missing configuration does not opt into mocks',async()=>{
 const previous=process.env.NEXT_PUBLIC_MOCK_MODE;
 try{delete process.env.NEXT_PUBLIC_MOCK_MODE;assert.equal(mockMode(),false);
 process.env.NEXT_PUBLIC_MOCK_MODE='false';assert.equal(mockMode(),false);
 process.env.NEXT_PUBLIC_MOCK_MODE='true';assert.equal(mockMode(),true);
 await assert.rejects(unavailableAssistant.ask(),{code:'provider_unavailable'});
 }finally{if(previous===undefined)delete process.env.NEXT_PUBLIC_MOCK_MODE;else process.env.NEXT_PUBLIC_MOCK_MODE=previous;}
});
