import React from 'react';
import {ArrowUpRight} from 'lucide-react';

const suggestions=[
  {
    "title": "Unificar mis tiendas",
    "summary": "Accesos, pedidos, búsqueda y resultados del negocio.",
    "prompt": "Tengo tres tiendas y quiero unificar su operación. Necesito cinco capacidades conectadas: inicio de sesión con permisos para vendedores y gerencia; una base de datos que guarde clientes, productos, stock y pedidos; búsqueda rápida de productos por nombre y descripción; almacenamiento de fotos de productos y comprobantes; y tableros para comparar ventas por tienda. Cuando un vendedor entra, solo puede consultar y registrar pedidos de su tienda. Cada producto guardado debe poder encontrarse en el buscador y mostrar su foto; cada pedido debe quedar relacionado con su comprobante y alimentar los tableros de ventas. Seremos 30 empleados y gestionaremos unos 500 pedidos diarios. Queremos herramientas open source para construir estas capacidades en nuestra propia infraestructura."
  },
  {
    "title": "Organizar los documentos de mi empresa",
    "summary": "Permisos, archivos, búsqueda y seguimiento de actividad.",
    "prompt": "Quiero un portal interno para que 80 empleados encuentren contratos, manuales y documentos de clientes. Necesitamos inicio de sesión con permisos por equipo, almacenamiento de los archivos, una base de datos relacional SQL para guardar documentos, versiones, propietarios y permisos con relaciones entre esos registros, un buscador por palabras y una herramienta de tableros para ver consultas y documentos utilizados. Al subir un archivo, debe guardarse su contenido en el almacenamiento, registrarse su ficha en la base de datos y actualizarse el índice del buscador. Al buscar, cada persona solo debe acceder a documentos autorizados. La actividad registrada debe alimentar los tableros de gerencia. Queremos implementar estas cinco capacidades con herramientas open source en nuestros servidores."
  },
  {
    "title": "Crear un portal para mis clientes",
    "summary": "Catálogo de productos, pedidos y análisis comercial.",
    "prompt": "Tengo un negocio de venta mayorista y quiero que mis clientes consulten productos y hagan pedidos desde un portal. Necesito cinco capacidades conectadas: inicio de sesión con cuentas y permisos para cada empresa cliente; una base de datos relacional SQL para guardar clientes, productos y pedidos; búsqueda de productos por nombre, descripción y filtros; almacenamiento de fotos y comprobantes; y tableros para analizar las ventas y los pedidos pendientes. Cuando un cliente inicia sesión, consulta el buscador y ve las fotos almacenadas; al confirmar un pedido se guarda en la base de datos junto a su comprobante, y esa información alimenta los tableros del equipo comercial. Esperamos 100 empresas y 1000 pedidos diarios. Queremos construir estas capacidades con herramientas open source en nuestros servidores."
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
