import fixtures from '../mocks/catalog.fixtures.json' with {type:'json'};

// Local GitHub snapshot plus a fictional Default card. No runtime network requests.
export const catalogRecords=fixtures;
export function toTool(record){
 const {id,name,category,description,language,license,stars,activity,maintained,repo,full_name,color,archived,disabled,dataSource,syncedAt}=record;
 return {id,name,category,description,language,license,stars,activity,maintained,repo,full_name,color,archived,disabled,dataSource,syncedAt};
}
export function toCardDetail(record){
 const {healthScore,openIssues,tag,version,docs,releasePublishedAt,releaseUrl,lastCommitAt,openPullRequests}=record;
 return {healthScore,openIssues,tag,version,docs,releasePublishedAt,releaseUrl,lastCommitAt,openPullRequests};
}
// Async seam for a future HTTP provider; return copies so callers cannot edit fixtures.
export const mockCatalog={
 async list(){return {items:structuredClone(catalogRecords),total:catalogRecords.length};},
 async getById(id){return structuredClone(catalogRecords.find(record=>record.id===id)??null);}
};

export const githubSnapshotAt=fixtures.find(record=>record.dataSource==='github_snapshot')?.syncedAt??null;
export function snapshotDate(value){return value?new Intl.DateTimeFormat('es-CL',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Punta_Arenas'}).format(new Date(value)):'';}
export function repositoryStatus(tool){return tool.dataSource==='github_snapshot'?(tool.disabled?'Deshabilitado':tool.archived?'Archivado':'No archivado'):'Por confirmar';}
