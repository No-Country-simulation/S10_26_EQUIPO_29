import React from 'react';
import {ArrowUpRight} from 'lucide-react';

const suggestions=[
 {
  "title": "Llevar mi negocio a internet",
  "summary": "Ventas online, pagos y seguimiento de pedidos.",
  "prompt": "Tengo un negocio de productos para el hogar con tres tiendas y quiero empezar a vender por internet. Necesito que los clientes encuentren productos, paguen online y consulten el estado de sus pedidos. Mi equipo debe gestionar las ventas en un solo lugar y mantener actualizado el stock para no vender productos agotados. Al principio esperamos unos 200 pedidos al día y queremos avisar a los clientes cuando su compra esté lista para retirar o haya sido enviada."
 },
 {
  "title": "Atender mejor a mis clientes",
  "summary": "Consultas organizadas y respuestas a tiempo.",
  "prompt": "Tenemos una empresa de servicios y recibimos unas 300 consultas diarias de clientes. Hoy se nos pierden mensajes y a veces dos personas responden lo mismo. Quiero un portal donde los clientes puedan enviar consultas, adjuntar documentos y ver cómo avanza su solicitud. Nuestro equipo de 12 personas necesita asignar cada caso, consultar el historial del cliente y encontrar respuestas en nuestros manuales. También queremos avisar cuando un caso esté resuelto y saber cuánto tardamos en responder."
 },
 {
  "title": "Entender qué impulsa mis ventas",
  "summary": "Productos, sucursales y resultados en un solo panel.",
  "prompt": "Tengo cinco tiendas y una tienda online, pero cada semana perdemos horas reuniendo planillas para saber cómo va el negocio. Quiero un panel que reúna las ventas automáticamente, compare los resultados de cada sucursal y muestre qué productos se venden más. Cada encargado debe ver su tienda y gerencia debe poder ver todo. Necesitamos evitar ventas duplicadas, recibir un resumen diario y saber si falta información antes de tomar decisiones de compra."
 }
];

export function PromptSuggestions({flow,onSelect,workspace=false}){
 const hidden=workspace||flow.expanded||Boolean(flow.error);
 const select=text=>{
  flow.setQuery(text);
  onSelect?.(text);
  flow.setError('');
  flow.setCanRetry(false);
  flow.input.current?.focus({preventScroll:true});
 };
 return <div className={'prompt-suggestions'+(hidden?' is-hidden':'')} aria-hidden={hidden} inert={hidden?true:undefined}>
  <div className="prompt-suggestions-clip">
   <section className="prompt-suggestions-list" aria-label="Ejemplos de prompts">
    <p className="prompt-suggestions-label">¿Por dónde empezar? Prueba una idea</p>
    {suggestions.map(({title,summary,prompt})=><button key={title} type="button" className="prompt-suggestion" onPointerMove={event=>{
     if(event.pointerType==='touch'||!matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches)return;
     const card=event.currentTarget,bounds=card.getBoundingClientRect();
     card.style.setProperty('--example-glow-x',`${event.clientX-bounds.left}px`);
     card.style.setProperty('--example-glow-y',`${event.clientY-bounds.top}px`);
    }} onClick={()=>select(prompt)}><span className="prompt-suggestion-title">{title}</span><ArrowUpRight size={18} aria-hidden="true"/><span className="prompt-suggestion-summary">{summary}</span></button>)}
   </section>
  </div>
 </div>;
}
