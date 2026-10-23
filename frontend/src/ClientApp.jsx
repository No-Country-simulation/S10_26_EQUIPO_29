"use client";
import {App} from './App';
// Keep the existing browser-only animation boot and hash routes intact.
if(typeof window!=='undefined'){
 window.history.scrollRestoration='manual';
 if(!location.hash.startsWith('#herramienta/'))history.replaceState(history.state,'',`${location.pathname}${location.search}#asistente`);
 window.scrollTo({top:0,left:0,behavior:'instant'});
}
export default function ClientApp(){return <div id="root" data-reveal-boot=""><App/></div>;}
