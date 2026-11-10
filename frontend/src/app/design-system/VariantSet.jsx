'use client';
import {useState} from 'react';
import {ButtonDimensions} from './ButtonDimensions';
import {ArrowUpRight,LoaderCircle} from 'lucide-react';
const axes={
 buttons:[['Jerarquía','Primario · Outlined · Ghost'],['Tamaño','SM · Compactos · MD · Medianos · LG · Grandes'],['Contenido','Texto · Texto + icono · Solo icono (sin Ghost)'],['Estado','Normal · Hover · Foco · Pulsado · Deshabilitado']],
 card:[['Contenido','Completo · Parcial · Nombre largo'],['Identidad','Logo · Iniciales'],['Categorías','Una · Varias + contador'],['Interacción','Reposo · Hover · Foco']],
 prompt:[['Composición','Inicial · Flotante'],['Contenido','Vacío · Corto · Largo'],['Acción','Enviar · Detener · Reintentar'],['Interacción','Reposo · Hover · Foco · Error']],
 filters:[['Control','Búsqueda · Select · Chip'],['Selección','Vacío · Activo · Sin coincidencias'],['Panel','Abierto · Cerrado']],
 ideas:[['Revisión','Revisada · Sugerida'],['Dificultad','Básica · Intermedia · Avanzada'],['Expansión','Cerrada · Abierta'],['Código','Disponible · Ausente']],
 health:[['Salud','Alta · Media · Baja · Sin evaluar'],['Mantenimiento','Sí · No · Por confirmar']],
 tools:[['Identidad','Logo · Iniciales'],['Licencia','Identificada · Sin verificar'],['Motivo','Contraído · Expandido']],
 detail:[['Viewport','Escritorio · Móvil'],['Pestaña','Acerca de · Integraciones'],['Datos','Carga · Completo · Parcial · Error · No encontrado']],
 tooltip:[['Activación','Puntero · Teclado'],['Posición','Seguimiento · Ajuste al viewport'],['Visibilidad','Cerrado · Abierto']],
};
const aliases={description:'card',identity:'card',border:'prompt',suggestions:'prompt',metrics:'detail',snippet:'ideas',pagination:'filters'};
export function VariantSet({entry}){
 const dimensions=axes[aliases[entry.id]||entry.id];
 if(!dimensions)return null;
 return <section className="ds-variant-set"><h3>Set de variantes</h3><p>Variantes usadas actualmente, salvo las ampliaciones identificadas expresamente.</p><dl>{dimensions.map(([name,values])=><div key={name}><dt>{name}</dt><dd>{values}</dd></div>)}</dl>{entry.id==='buttons'&&<ButtonSet/>}<details><summary>Ampliación del sistema · propuesta</summary><p>{entry.id==='buttons'?'Añadir una propiedad loading con indicador y etiqueta estable. Se muestra abajo como prototipo; aún no es una variante compartida de producción.':'Mantener estas propiedades como API común al reutilizar la familia en nuevos contextos. Nuevas combinaciones deben conservar semántica, foco y geometría; no se incorporan a la plataforma hasta validarlas.'}</p>{entry.id==='buttons'&&<button className="ui-button ui-button--primary" disabled aria-busy="true"><LoaderCircle size={16}/>Procesando</button>}</details></section>;
}
const sizes=[['compact','SM','Compactos','40 px'],['standard','MD','Medianos','44 px'],['large','LG','Grandes','48 px']];
const variants=[['primary','Primario'],['secondary','Outlined'],['text','Ghost']];
const states=[['normal','Normal'],['hover','Hover'],['focus','Foco'],['pressed','Pulsado'],['disabled','Deshabilitado']];
function SampleButton({size,kind,state='normal',content='text'}){
 const iconOnly=content==='icon-only'&&kind!=='text';
 return <button type="button" disabled={state==='disabled'} aria-label={iconOnly?'Continuar':undefined} data-demo-state={state} className={`ui-button ui-button--${kind} ${size!=='standard'?`ui-button--${size}`:''} ${iconOnly?'ui-button--icon':''}`}>
 {!iconOnly&&(kind==='text'?'Ver más':'Continuar')}{content!=='text'&&<ArrowUpRight aria-hidden="true"/>}
 </button>;
}
export function ButtonSet(){
 const [size,setSize]=useState('standard'),[kind,setKind]=useState('primary'),[state,setState]=useState('normal'),[content,setContent]=useState('text');
 return <div className="ds-button-library">
 <p>SM y MD: utilizados en la plataforma. LG: disponible como ampliación, sin adopción general. Loading: propuesta de prueba.</p><p>Lee cada set por filas (variante) y columnas (estado). Las muestras normales responden a hover, clic y foco con Tab. Los demás estados están fijados para compararlos.</p>
 {sizes.map(([value,code,label,height])=><section className="ds-button-size-set" key={value} aria-label={`${code} · ${label}`}>
 <div className="ds-button-size-heading"><h4>{code} · {label}</h4><span>{height}{value==='large'?' · Extensión del sistema':''}</span></div>
 <div className="ds-button-table-scroll" tabIndex={0} role="region" aria-label={`Variantes y estados ${code}`}><table className="ds-button-table"><thead><tr><th scope="col">Variante</th>{states.map(([id,name])=><th scope="col" key={id}>{name}</th>)}</tr></thead><tbody>{variants.map(([variant,name])=><tr key={variant}><th scope="row">{name}</th>{states.map(([status])=><td key={status}><SampleButton size={value} kind={variant} state={status}/></td>)}</tr>)}</tbody></table></div>
 </section>)}
 <p>Ghost es una única variante de texto, sin fondo ni borde, con subrayado. Su tamaño tipográfico sigue SM, MD y LG; su altura es la de la línea, no la de un botón con superficie. LG amplía el set y aún no sustituye tamaños en la plataforma.</p>
 <section className="ds-button-playground"><h4>Prueba el botón</h4><div className="ds-button-playground-controls">
 <label className="ds-choice">Tamaño<select value={size} onChange={e=>setSize(e.target.value)}>{sizes.map(([id,code,name])=><option key={id} value={id}>{code} · {name}</option>)}</select></label>
 <label className="ds-choice">Variante<select value={kind} onChange={e=>{setKind(e.target.value);if(e.target.value==='text'&&content==='icon-only')setContent('text');}}>{variants.map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label>
 <label className="ds-choice">Estado<select value={state} onChange={e=>setState(e.target.value)}>{states.map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label>
 <label className="ds-choice">Contenido<select value={content} onChange={e=>setContent(e.target.value)}><option value="text">Texto</option><option value="with-icon">Texto + icono</option>{kind!=='text'&&<option value="icon-only">Solo icono</option>}</select></label>
 </div><ButtonDimensions><SampleButton size={size} kind={kind} state={state} content={content}/></ButtonDimensions><code className="ds-button-code">{`ui-button ui-button--${kind}${size!=='standard'?` ui-button--${size}`:''}${content==='icon-only'?' ui-button--icon':''}`}</code></section>
 </div>;
}
