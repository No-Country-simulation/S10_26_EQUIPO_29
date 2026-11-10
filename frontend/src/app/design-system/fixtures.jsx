'use client';
import {CatalogPreviewProvider} from '../../data/CatalogProvider';
import {BrandPreviewProvider} from '../../brandIdentity';
import {fallbackPalettes} from '../../sessionPalette.mjs';
import {tools} from '../../tools';
import {profiles} from '../../toolProfiles';
import {catalogCategories} from '../../data/catalog.mjs';
export const specimen={...tools.find(t=>t.name==='PostgreSQL'),healthScore:88,maintained:true};
export const previewPalette=key=>fallbackPalettes[Array.from(key).reduce((n,c)=>n+c.charCodeAt(0),0)%fallbackPalettes.length];
const preview={tools:tools.map(t=>t.id===specimen.id?specimen:t),profiles,categories:catalogCategories,status:'ready',error:null,http:null,baseUrl:'',retry:()=>{}};
export function FixtureBoundary({children,value}){return <CatalogPreviewProvider value={{...preview,...value}}><BrandPreviewProvider value={previewPalette}>{children}</BrandPreviewProvider></CatalogPreviewProvider>}
