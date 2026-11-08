import {useLayoutEffect} from 'react';
import {createSessionPaletteResolver} from './sessionPalette.mjs';

const pagePalette=createSessionPaletteResolver();

// One accent per page load; navigation and component remounts keep the choice.
// Reuse the tool palette without changing individual tool identities.
export function useSessionAccent(){
 useLayoutEffect(()=>{
  const palette=pagePalette('interface:primary:v1');
  document.documentElement.style.setProperty('--button-brand',palette.tag);
 },[]);
}
