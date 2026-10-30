import {errorPreview} from '../mocks/errorPreview.mjs';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import {tools as mockTools} from '../tools';
import {profiles as mockProfiles} from '../toolProfiles';
import {catalogCategories} from './catalog.mjs';
import {createCatalogHttp} from './catalogHttp.mjs';

const baseUrl=process.env.NEXT_PUBLIC_CATALOG_API_BASE_URL||process.env.NEXT_PUBLIC_API_BASE_URL||'';
const http=baseUrl?createCatalogHttp({baseUrl}):null;
const initial={tools:http?[]:mockTools,profiles:http?{}:mockProfiles,categories:catalogCategories,status:http?'loading':'ready'};
const Context=createContext({...initial,http,baseUrl});
export function CatalogProvider({children}){
 const [data,setData]=useState(initial),[attempt,setAttempt]=useState(0);
 useEffect(()=>{
  if(errorPreview('catalog')){setData(d=>({...d,status:'error',tools:[]}));return;}
  if(!http)return;
  const controller=new AbortController();
  setData(d=>({...d,status:'loading'}));
  http.list(controller.signal).then(result=>{if(!controller.signal.aborted)setData({...result,status:'ready'});}).catch(()=>{if(!controller.signal.aborted)setData(d=>({...d,status:'error'}));});
  return()=>controller.abort();
 },[attempt]);
 const value=useMemo(()=>({...data,http,baseUrl,retry:()=>setAttempt(n=>n+1)}),[data]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useCatalogData=()=>useContext(Context);
