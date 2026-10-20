import fixtures from '../mocks/catalog.fixtures.json' with {type:'json'};

// Fictional UI fixtures, not live GitHub measurements. No network requests.
export const catalogRecords=fixtures;
export function toTool(record){
 const {id,name,category,description,language,license,stars,activity,maintained,repo,color}=record;
 return {id,name,category,description,language,license,stars,activity,maintained,repo,color};
}
export function toCardDetail(record){
 const {healthScore,openIssues,tag,version,docs}=record;
 return {healthScore,openIssues,tag,version,docs};
}
// Async seam for a future HTTP provider; return copies so callers cannot edit fixtures.
export const mockCatalog={
 async list(){return {items:structuredClone(catalogRecords),total:catalogRecords.length};},
 async getById(id){return structuredClone(catalogRecords.find(record=>record.id===id)??null);}
};
