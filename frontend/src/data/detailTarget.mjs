import presentation from '../mocks/catalog-presentation.json' with {type:'json'};
// Accept canonical owner/name links, while keeping existing card IDs working.
export function detailTarget(id,tools){
 const original=tools.find(tool=>tool.id===id||String(tool.githubId)===id||tool.full_name===id);
 const fullName=original?.full_name??Object.entries(presentation).find(([,value])=>value.id===id)?.[0]??(/^[^/\s]+\/[^/\s]+$/.test(id)?id:null);
 return {original,fullName};
}

export function toolHref(tool){return '#herramienta/'+(tool.full_name?tool.full_name.split('/').map(encodeURIComponent).join('/'):encodeURIComponent(tool.id));}
export function readToolRoute(hash){if(!hash.startsWith('#herramienta/'))return null;try{return decodeURIComponent(hash.slice(13));}catch{return hash.slice(13);}}
