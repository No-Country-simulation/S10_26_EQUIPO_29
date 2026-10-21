import test from 'node:test';
import assert from 'node:assert/strict';
import {profiles} from '../src/toolProfiles.js';
import {mockCatalog,toTool,toCardDetail} from '../src/data/catalog.mjs';

test('catalog mock has unique IDs and usable card metrics',async()=>{
 const {items,total}=await mockCatalog.list();
 assert.equal(total,20);assert.equal(new Set(items.map(x=>x.id)).size,total);
 for(const item of items){assert.ok(item.name&&item.description&&item.category);assert.ok(item.healthScore===null||Number.isFinite(item.healthScore)&&item.healthScore>=0&&item.healthScore<=100);assert.ok(item.stars>=0);assert.equal(item.dataSource,item.repo?'github_snapshot':'mock');assert.ok(Number.isFinite(Date.parse(item.syncedAt)));assert.equal(toTool(item).id,item.id);assert.equal(toTool(item).full_name,item.full_name);assert.equal(item.full_name,item.repo);assert.equal(toCardDetail(item).healthScore,item.healthScore);}
});
test('detail matches list, missing IDs return null, and responses cannot mutate fixtures',async()=>{
 const {items}=await mockCatalog.list();const item=await mockCatalog.getById(items[0].id);assert.deepEqual(item,items[0]);item.name='Changed';assert.notEqual((await mockCatalog.getById(item.id)).name,'Changed');assert.equal(await mockCatalog.getById('missing'),null);
 const fallback=await mockCatalog.getById('herramienta-de-ejemplo');assert.equal(fallback.repo,null);assert.equal(fallback.stars,0);
});

test('all catalogue tools have a usable detail profile, including the ten additions',async()=>{
 const {items}=await mockCatalog.list();
 for(const tool of items){assert.ok(profiles[tool.id]?.summary);assert.ok(Array.isArray(profiles[tool.id]?.features));assert.ok(Array.isArray(profiles[tool.id]?.ideas));}
 for(const id of ['react','nextjs','fastapi','nestjs','django','valkey','rabbitmq','prometheus','grafana','traefik'])assert.ok(items.some(tool=>tool.id===id));
});

test('real catalog metrics match their captured GitHub source without invented health or releases',async()=>{
 const {default:snapshot}=await import('../src/mocks/github-snapshot.json',{with:{type:'json'}});
 const {items}=await mockCatalog.list();
 assert.equal(items.filter(item=>item.dataSource==='github_snapshot').length,19);
 for(const [index,item] of items.entries()){
  if(!item.repo)continue;
  const source=snapshot.data['r'+index];
  assert.equal(item.stars,source.stargazerCount);assert.equal(item.openIssues,source.issues.totalCount);assert.equal(item.openPullRequests,source.pullRequests.totalCount);
  assert.equal(item.version,source.latestRelease?.tagName??null);assert.equal(item.archived,source.isArchived);assert.equal(item.syncedAt,snapshot.captured_at);
  assert.equal(item.healthScore,null);assert.equal(item.maintained,null);
  assert.equal(item.lastCommitAt,source.defaultBranchRef?.target?.committedDate??null);
 }
});
