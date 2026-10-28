import React,{memo} from 'react';
import {Search} from 'lucide-react';
import {RevealHeading,usePageReveal} from '../../PageReveal';
import {useAnimatedCatalog} from '../../useAnimatedCatalog';
import {ToolCard} from './ToolCard';
import {CatalogFilters} from './CatalogFilters';
import {useCatalogFilters} from './useCatalogFilters';
export const Catalog=memo(function Catalog({onOpen,phase}){
 const state=useCatalogFilters();
 const {filtered,filters,clear}=state;
 const displayed=useAnimatedCatalog(filtered);
 usePageReveal([phase,filters,...displayed.map(t=>t.name)].join('|'));
 return ( <div className="catalog-shell"><div className="wrap">
 <section className="catalog" id="catalogo"><div className="section-top"><div><RevealHeading text="Explora el ecosistema open source"/></div></div>
 <CatalogFilters state={state} count={filtered.length}/>
 <div className="grid">{displayed.map(tool=><ToolCard key={tool.name} tool={tool} onOpen={onOpen}/>)}</div>
 {filtered.length===0&&displayed.length===0&&<div className="empty"><Search size={30}/><h3>No encontramos coincidencias</h3><button onClick={clear} className="primary ui-wash">Ver todas las herramientas</button></div>}
 </section><footer className="catalog-footer"><a className="brand" href="#"><img className="openbridge-logo" src="/assets/brands/openbridge.svg" alt="OpenBridge"/></a></footer></div></div>);
});
