import test from 'node:test';
import assert from 'node:assert/strict';
import {mockCatalog,toTool,toCardDetail} from '../src/data/catalog.mjs';

test('catalog mock has unique IDs and usable card metrics',async()=>{
 const {items,total}=await mockCatalog.list();
 assert.equal(total,10);assert.equal(new Set(items.map(x=>x.id)).size,total);
 for(const item of items){assert.ok(item.name&&item.description&&item.category);assert.ok(item.healthScore>=0&&item.healthScore<=100);assert.ok(item.stars>=0);assert.equal(item.dataSource,'mock');assert.ok(Number.isFinite(Date.parse(item.syncedAt)));assert.equal(toTool(item).id,item.id);assert.equal(toCardDetail(item).healthScore,item.healthScore);}
});
test('detail matches list, missing IDs return null, and responses cannot mutate fixtures',async()=>{
 const {items}=await mockCatalog.list();const item=await mockCatalog.getById(items[0].id);assert.deepEqual(item,items[0]);item.name='Changed';assert.notEqual((await mockCatalog.getById(item.id)).name,'Changed');assert.equal(await mockCatalog.getById('missing'),null);
 const fallback=await mockCatalog.getById('herramienta-de-ejemplo');assert.equal(fallback.repo,null);assert.equal(fallback.stars,0);
});
