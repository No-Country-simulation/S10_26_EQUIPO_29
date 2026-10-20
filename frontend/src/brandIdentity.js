import {useSyncExternalStore} from 'react';
import {brandPalettes,defaultBrand} from './tools.js';

export const brandAssets={
 postgresql:{logo:'/assets/cards/postgres-logo.svg',watermark:'/assets/cards/postgres-watermark.svg'},
 keycloak:{logo:'/assets/brands/keycloak.svg'},meilisearch:{logo:'/assets/brands/meilisearch.svg'},
 ollama:{logo:'/assets/brands/ollama.svg'},plausible:{logo:'/assets/brands/plausible.svg'},
 lago:{logo:'/assets/brands/lago.svg',wordmark:true},qdrant:{logo:'/assets/brands/qdrant.svg'},
 umami:{logo:'/assets/brands/umami.svg'},typesense:{logo:'/assets/brands/typesense.svg'}
};
const failed=new Set(),listeners=new Set();
const subscribe=listener=>{listeners.add(listener);return()=>listeners.delete(listener);};
const snapshot=()=>failed.size;
export function markBrandFailed(url){if(!url||failed.has(url))return;failed.add(url);listeners.forEach(listener=>listener());}
export function brandInitials(name){const words=name.trim().split(/\s+/u).filter(Boolean);return words.slice(0,2).map(word=>Array.from(word)[0]).join('').toLocaleUpperCase('es');}
export function resolveBrand(tool,assets=brandAssets,errors=failed){
 const asset=assets[tool.id]||{},fallback=!asset.logo||errors.has(asset.logo);
 const watermark=asset.watermark||asset.logo;
 return {logo:fallback?null:asset.logo,watermark:fallback||errors.has('watermark:'+watermark)?null:watermark,
  fallback,initials:brandInitials(tool.name),wordmark:!fallback&&!!asset.wordmark,
  palette:fallback?defaultBrand:(brandPalettes[tool.name]||defaultBrand)};
}
export function useBrandIdentity(tool){useSyncExternalStore(subscribe,snapshot,snapshot);return resolveBrand(tool);}
