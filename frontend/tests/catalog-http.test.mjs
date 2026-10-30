import test from 'node:test';
import assert from 'node:assert/strict';
import {adaptApiRepo,createCatalogHttp} from '../src/data/catalogHttp.mjs';
const repo={full_name:'keycloak/keycloak',github_id:1,description:'Descripción del servidor',summary_es:null,stargazers_count:42,pushed_at:'2026-01-01T00:00:00Z',archived:false,categories:[{category_id:'auth'}],homepage:null};
test('HTTP records preserve server fields without local mock statistics',()=>{
 const {tool,profile}=adaptApiRepo(repo,[{id:'auth',name:'Autenticación'}]);
 assert.equal(tool.id,'keycloak');assert.equal(tool.stars,42);assert.equal(tool.healthScore,null);assert.equal(tool.maintained,null);assert.equal(tool.dataSource,'api');assert.equal(tool.description,profile.summary);assert.deepEqual(profile.ideas,[]);
});
test('HTTP list/detail use the same source and propagate cancellation',async()=>{
 const signal=new AbortController().signal,paths=[];
 const client=createCatalogHttp({baseUrl:'http://localhost:8000/',fetchImpl:async(url,options)=>{
  assert.equal(options.signal,signal);paths.push(url.pathname);
  return {ok:true,json:async()=>url.pathname.endsWith('categories')?[{id:'auth',name:'Autenticación'}]:url.pathname.endsWith('/repos')?[repo]:{repo,integration_ideas:[]}};
 }});
 const list=await client.list(signal);const detail=await client.detail(repo.full_name,list.categories,signal);
 assert.deepEqual(list.tools[0],detail.tool);assert.ok(paths.includes('/repos/keycloak/keycloak'));assert.ok(!paths.includes('/categories'));
});
test('HTTP errors and malformed data do not fall back to mocks',async()=>{
 const client=createCatalogHttp({baseUrl:'http://localhost/',fetchImpl:async()=>({ok:false,status:500})});
 await assert.rejects(client.list(),/cargar/);
 assert.throws(()=>adaptApiRepo({...repo,stargazers_count:'42'},[]),/inválida/);
});
test('detail carries ideas in one request and rejects cross-repository data',async()=>{
 const idea={id:'test',full_name:repo.full_name,title:'Prueba',summary:'Resumen',integration_type:'sdk',difficulty:'low',compatible_stack:['JavaScript'],dependencies:[],triggers:[],snippet:null,docs_url:'https://www.keycloak.org/docs/',generated_by:'human'};
 let calls=0;
 const client=createCatalogHttp({baseUrl:'http://localhost/',fetchImpl:async()=>{calls++;return {ok:true,json:async()=>({repo,integration_ideas:[idea]})};}});
 const record=await client.detail(repo.full_name,[]);
 assert.equal(calls,1);assert.equal(record.profile.ideas[0].title,'Prueba');
 idea.full_name='other/repo';await assert.rejects(client.detail(repo.full_name,[]),/inválida/);
});
