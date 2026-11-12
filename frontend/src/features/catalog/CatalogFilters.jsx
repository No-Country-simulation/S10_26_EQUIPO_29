import React, {useLayoutEffect,useRef} from 'react';
import {usePaletteResolver} from '../../brandIdentity';
import {FilterSelect} from './FilterSelect';
import {populatedCategories} from '../../data/catalog.mjs';
import {Search,SlidersHorizontal,X} from 'lucide-react';
import {useCatalogData} from '../../data/CatalogProvider';

export function CatalogSearch({value,onChange,id='search'}){
 const search=value,setSearch=onChange;
 return <div className="search-box" onPointerMove={event=>{if(event.pointerType==='touch'||!matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches)return;const box=event.currentTarget,rect=box.getBoundingClientRect();box.style.setProperty('--search-glare-x',`${event.clientX-rect.left}px`);box.style.setProperty('--search-glare-y',`${event.clientY-rect.top}px`);}}><Search size={19}/><label htmlFor={id} className="sr-only">Buscar herramientas</label><input id={id} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar herramientas por nombre o descripción…"/>{search&&<button className="icon-button ui-wash" aria-label="Borrar búsqueda" onClick={()=>setSearch('')}><X size={16}/></button>}</div>;
}

export function CategoryChip({label:c,selected,onSelect}){return <button data-category={c} aria-pressed={selected} className={'category-chip'+(selected?' active':'')} onClick={e=>{const chip=e.currentTarget,rect=chip.getBoundingClientRect(),radius=Math.hypot(rect.width,rect.height)/2+1;chip.style.setProperty('--chip-radius',radius+'px');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)chip.animate([{clipPath:'circle(0px at 50% 50%)'},{clipPath:`circle(${radius}px at 50% 50%)`}],{pseudoElement:'::before',duration:280,easing:'cubic-bezier(.22,1,.36,1)'});onSelect(c);}}>{c}</button>;}

export function CatalogFilterButton({expanded,active=0,onToggle,controls='filters'}){return <button className={'filter-button ui-button ui-button--secondary '+(expanded?'selected':'')} aria-expanded={expanded} aria-controls={controls} onClick={onToggle}><SlidersHorizontal size={16}/> Filtros {active>0&&<span className="badge">{active}</span>}</button>;}

export function CatalogFilters({state,count,paletteFor:providedPalette}){
 const defaultPalette=usePaletteResolver();
 const paletteFor=providedPalette||defaultPalette;
 const {tools,categories:catalogCategories}=useCatalogData();
 const categories=['Todas',...populatedCategories(catalogCategories,tools).map(category=>category.name)];
 const {search,setSearch,category,setCategory,filters,setFilters,language,setLanguage,license,setLicense,maintenance,setMaintenance,stars,setStars,active,clear}=state;
 const chipsRef=useRef(null);
 const categoryKey=JSON.stringify(categories);
 useLayoutEffect(()=>{
  for(const chip of chipsRef.current?.children??[]){
   const palette=paletteFor('category-hover:'+chip.dataset.category);
   chip.style.setProperty('--chip-hover-bg',palette.start);
   chip.style.setProperty('--chip-hover-tone',palette.tag);
  }
 },[categoryKey,paletteFor]);
 const canClear=Boolean(active>0||search||category!=='Todas');
 return <> <div className="search-row"><CatalogSearch value={search} onChange={setSearch}/><CatalogFilterButton expanded={filters} active={active} onToggle={()=>setFilters(!filters)}/><div className={'catalog-clear-slot'+(canClear?' is-visible':'')} inert={!canClear} aria-hidden={!canClear}><div className="catalog-clear-clip"><button type="button" className="catalog-clear-filters ui-button ui-button--secondary" onClick={()=>{clear();document.getElementById('search')?.focus({preventScroll:true});}}>Limpiar filtros</button></div></div></div>
 <div ref={chipsRef} className="categories" aria-label="Categorías">{categories.map(c=><CategoryChip key={c} label={c} selected={category===c} onSelect={setCategory}/>)}</div>
 {filters && (
  <div className="filters" id="filters">
   <FilterSelect label="Lenguaje" value={language} onChange={setLanguage} options={[{value:'',label:'Todos'},...Array.from(new Set(tools.map(tool=>tool.language))).filter(Boolean).sort((a,b)=>a.localeCompare(b)).map(value=>({value,label:value}))]}/>
   <FilterSelect label="Licencia" value={license} onChange={setLicense} options={[{value:'',label:'Todos'},...Array.from(new Set(tools.map(tool=>tool.license))).filter(Boolean).sort((a,b)=>a.localeCompare(b)).map(value=>({value,label:value}))]}/>
   <FilterSelect label="Estado del repositorio" value={maintenance} onChange={setMaintenance} options={[{value:'',label:'Todos'},{value:'archived',label:'Archivados'},{value:'disabled',label:'Deshabilitados'}]}/>
   <FilterSelect label="Estrellas mínimas" value={stars} onChange={setStars} options={[{value:'',label:'Sin mínimo'},{value:'10000',label:'10.000'},{value:'20000',label:'20.000'},{value:'50000',label:'50.000'}]}/>
  </div>
 )}
 <div className="results-meta"><span className="sr-only" aria-live="polite">{count} {count===1?'herramienta':'herramientas'}{category!=='Todas'?' en '+category:''}</span></div>
</>;
}
