'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {ArrowUp,ArrowUpRight} from 'lucide-react';
import {ToolCard} from '../../features/catalog/ToolCard';
import {tools} from '../../tools';
import {toolHref} from '../../data/detailTarget.mjs';
import {fallbackPalettes} from '../../sessionPalette.mjs';
import {useSessionAccent} from '../../useSessionAccent';
import './design-system.css';
import {ComponentPreview,ComponentGallery,specimen} from './ComponentGallery';
import Link from 'next/link';
import {Typography,Spacing,Motion} from './sections';

function Measured({children,label,selector}){
 const ref=useRef(null), id=useId().replace(/:/g,''), [spec,setSpec]=useState(null);
 useEffect(()=>{
  const stage=ref.current, node=stage.querySelector(selector);if(!node)return;
  const measure=()=>{
   const frame=stage.getBoundingClientRect(), rect=node.getBoundingClientRect(), style=getComputedStyle(node);
   const inner=node.querySelector('.tool-card-intro'), paddingStyle=inner?getComputedStyle(inner):style;
   setSpec({x:rect.left-frame.left,y:rect.top-frame.top,w:rect.width,h:rect.height,sw:frame.width,sh:frame.height,
    radius:style.borderTopLeftRadius,padding:paddingStyle.paddingLeft,border:style.borderTopWidth});
  };
  const observer=new ResizeObserver(measure);observer.observe(stage);observer.observe(node);measure();
  document.fonts.ready.then(()=>{if(stage.isConnected)measure();});
  return()=>observer.disconnect();
 },[selector]);
 const marker=`url(#${id}-arrow)`;
 return <figure className="ds-measured"><figcaption>{label}</figcaption><div className="ds-measure-stage" ref={ref}>
  {children}
  {spec&&<svg className="ds-cotes" width={spec.sw} height={spec.sh} aria-hidden="true">
   <defs><marker id={`${id}-arrow`} viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 6 0 L 0 3 L 6 6" fill="none" stroke="currentColor"/></marker></defs>
   <path className="ds-extension" d={`M ${spec.x} ${spec.y-6} V ${spec.y-32} M ${spec.x+spec.w} ${spec.y-6} V ${spec.y-32} M ${spec.x-6} ${spec.y} H ${spec.x-30} M ${spec.x-6} ${spec.y+spec.h} H ${spec.x-30}`}/>
   <path markerStart={marker} markerEnd={marker} d={`M ${spec.x+2} ${spec.y-24} H ${spec.x+spec.w-2}`}/>
   <text x={spec.x+spec.w/2} y={spec.y-36} textAnchor="middle">{Math.round(spec.w)} px</text>
   <path markerStart={marker} markerEnd={marker} d={`M ${spec.x-24} ${spec.y+2} V ${spec.y+spec.h-2}`}/>
   <text transform={`translate(${spec.x-34},${spec.y+spec.h/2}) rotate(-90)`} textAnchor="middle">{Math.round(spec.h)} px</text>
   <path d={`M ${spec.x+spec.w-8} ${spec.y+spec.h-8} l -18 26 H ${spec.x+spec.w-100}`}/>
   <circle cx={spec.x+spec.w-8} cy={spec.y+spec.h-8} r="2"/>
   <text x={spec.x+spec.w-6} y={spec.y+spec.h+34} textAnchor="end">Radio {spec.radius}</text>
   <path markerStart={marker} markerEnd={marker} d={`M ${spec.x+2} ${spec.y+spec.h+18} H ${spec.x+Math.max(4,parseFloat(spec.padding))}`}/>
   <path className="ds-extension" d={`M ${spec.x} ${spec.y+spec.h+6} V ${spec.y+spec.h+24}`}/>
   <text x={spec.x} y={spec.y+spec.h+52}>Padding {spec.padding}{selector==='.tool-card'?' · interior':''}</text>
  </svg>}
 </div>{spec&&<span className="sr-only">Ancho {Math.round(spec.w)} píxeles, altura {Math.round(spec.h)} píxeles, radio {spec.radius}, padding horizontal {spec.padding}.</span>}</figure>;
}
export default function DesignSystem({section="componentes"}){
 useSessionAccent();
 const tool=specimen;

 const sections=[['tipografia','Tipografía'],['espaciado','Espaciado'],['componentes','Componentes'],['movimiento','Movimiento']];
 return <ComponentPreview><div className="ds-page">
 <header className="ds-header"><a href="/" aria-label="OpenBridge, inicio"><img src="/assets/brands/openbridge.svg" alt="OpenBridge" width="210"/></a><a className="ui-button ui-button--secondary" href="/">Volver a la plataforma <ArrowUpRight size={16}/></a></header>
 <main className="ds-main"><div className="ds-heading"><h1>Design System</h1><p>{sections.find(([id])=>id===section)?.[1]} · Anatomía de la interfaz.</p></div>
 <nav className="ds-nav" aria-label="Secciones del sistema">{sections.map(([id,label])=><Link key={id} href={`/design-system/${id}/`} aria-current={section===id?'page':undefined}>{label}</Link>)}</nav>
 {section==='componentes'&&<section id="componentes" className="ds-plate" aria-label="Componentes y medidas">
 <div className="ds-card-column"><Measured label="Tarjeta de catálogo" selector=".tool-card"><ToolCard tool={tool} onOpen={()=>{window.location.href='/'+toolHref(tool);}}/></Measured><p className="ds-note">ToolCard original, a ancho de catálogo. Datos de demostración: salud 88/100 y mantenimiento activo no representan una evaluación real.</p></div>
 <div className="ds-control-column"><Measured label="Input compacto" selector=".ds-input"><div className="ds-input"><input aria-label="Probar texto del input" defaultValue="Quiero gestionar los pedidos de mi negocio."/><button className="ui-button ui-button--secondary ui-button--icon" aria-label="Muestra del botón de envío" type="button"><ArrowUp/></button></div></Measured>
 <Measured label="Etiquetas de categoría" selector=".tool-tags span"><div className="tool-tags ds-tags"><span>Bases de datos</span><span>Desarrollo</span><span>+4</span></div></Measured>
 <Measured label="Botones" selector=".ui-button"><div className="ds-buttons"><button className="ui-button ui-button--primary">Primario</button><button className="ui-button ui-button--secondary">Outlined</button><button className="ui-button ui-button--text">Ghost</button></div></Measured><p className="ds-note">Muestras interactivas de hover, foco y pulsación.</p>
 </div></section>}
 {section==='componentes'&&<section className="ds-document ds-button-docs" aria-labelledby="primary-title"><h2 id="primary-title">Color primario por recarga</h2><p>El primario cambia para dar una identidad de color a cada carga de la página, usando las mismas diez paletas decorativas disponibles para las herramientas. No indica un estado ni una categoría.</p><p>Al cargar o recargar la página se elige una paleta al azar. El color se conserva en memoria mientras navegas; no se guarda para la siguiente recarga. La selección aleatoria puede repetir un color.</p><div className="ds-palette-list">{fallbackPalettes.map(p=><div key={p.id}><span style={{background:p.tag}}/><code>{p.tag}</code></div>)}</div><p>El valor elegido se aplica a <code>--button-brand</code>. En hover, el botón pasa a blanco con texto oscuro; al salir recupera el color de esta carga. La transición dura 140ms con ease-out.</p><h3>Variantes de botón</h3><ul><li><strong>Primario:</strong> acción principal con el color de esta carga.</li><li><strong>Outlined:</strong> acción con borde y hover blanco.</li><li><strong>Ghost:</strong> única variante de texto subrayado, sin fondo ni borde. Usa 14px, o 13px en tamaño compacto, igual que el texto de los botones; para Ver más, Ver menos o Repositorio.</li></ul><p className="ds-note">Implementación: sessionPalette.mjs, useSessionAccent.js y buttons.css. La selección de color es visual; no cambia los datos de las herramientas.</p></section>}
 {section==='componentes'&&<ComponentGallery/>}
 {section==='tipografia'&&<Typography/>}
 {section==='espaciado'&&<Spacing/>}
 {section==='movimiento'&&<Motion/>}
 </main><footer className="ds-footer"><span>OpenBridge</span><a className="ui-button ui-button--secondary" href="/design-system/componentes/">Design System</a></footer></div></ComponentPreview>;
}
