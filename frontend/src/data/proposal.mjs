import fixtures from '../mocks/proposal-layout.fixtures.json' with {type:'json'};

// Curated demo content, separate from the unconfirmed assistant HTTP contract.
// Never attach example instructions to an unknown or changed response.
export function resolveProposalExample(response){
 const example=fixtures[response?.id];
 if(response?.status!=='ok'||!example||!Array.isArray(response.components)||!Array.isArray(example.layers)||example.layers.length!==response.components.length)return null;
 const matches=example.layers.every(layer=>response.components.some(c=>c.key===layer.key&&c.full_name===layer.full_name));
 if(!matches)return null;
 const result=structuredClone(example);
 const keys=new Set(response.components.map(c=>c.key));
 // Integration is optional. A partial or malformed guide must never break the stack.
 if(!Array.isArray(result.steps)||!result.steps.every(step=>typeof step?.title==='string'&&step.title.trim()&&typeof step.description==='string'&&step.description.trim()&&Array.isArray(step.component_keys)&&step.component_keys.length>0&&step.component_keys.every(key=>keys.has(key))))result.steps=[];
 return result;
}
