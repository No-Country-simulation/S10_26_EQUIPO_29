import {useState,useEffect,useRef} from 'react';
const exampleReadDelay = 6500;
const promptExamples = [
 'Quiero unificar las ventas de mis tres tiendas. Cada encargado debe acceder solo a su local, consultar el inventario y registrar pedidos. Necesito buscar productos, avisar cuando falte stock y ver un resumen de ventas de todas las tiendas.',
 'Necesito una plataforma para que mis clientes reserven citas y reciban recordatorios. Mi equipo debe gestionar horarios y cancelaciones, cada cliente podrá consultar sus reservas y quiero ver qué servicios se solicitan más.',
 'Quiero que mis clientes hagan pedidos y consulten el estado de sus entregas. Mi equipo necesita organizar la preparación, actualizar el seguimiento y enviar avisos. También quiero buscar pedidos y revisar los tiempos de entrega.',
 'Necesito centralizar las consultas de mis clientes y asignarlas a mi equipo. Cada agente debe ver sus casos, buscar respuestas en nuestros documentos y avisar al cliente cuando haya novedades. Quiero medir los tiempos de atención.',
 'Quiero ofrecer un portal donde mis clientes gestionen sus suscripciones y consulten sus facturas. Mi equipo necesita controlar accesos, recibir avisos de pagos pendientes y ver un resumen de ingresos y cancelaciones.'
];

export function useExamplePlaceholder(paused, input) {
 const [placeholder, setPlaceholder] = useState({text:promptExamples[0],example:promptExamples[0]});
 const cursor=useRef({index:0,length:promptExamples[0].length,deleting:true});
 useEffect(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timeout;
  let visible = false;
  const state=cursor.current;
  function tick() {
   const current = promptExamples[state.index];
   state.length += state.deleting ? -1 : 1;
   setPlaceholder({text:current.slice(0,state.length),example:current});
   let delay = state.deleting ? 5 : 18;
   if (state.length === 0) {
    state.index = (state.index + 1) % promptExamples.length;
    state.deleting = false;
    delay = 350;
   } else if (state.length === current.length && !state.deleting) {
    state.deleting = true;
    delay = exampleReadDelay;
   }
   timeout = window.setTimeout(tick, delay);
  }
  function restart() {
   window.clearTimeout(timeout);
   if (!paused && visible && !document.hidden && !motion.matches) timeout = window.setTimeout(tick, exampleReadDelay);
  }
  const observer = new IntersectionObserver(([entry]) => {
   visible = entry.isIntersecting && entry.intersectionRatio > 0;
   restart();
  });
  if (input.current) observer.observe(input.current);
  restart();
  document.addEventListener('visibilitychange', restart);
  motion.addEventListener('change', restart);
  return () => {
   window.clearTimeout(timeout);
   observer.disconnect();
   document.removeEventListener('visibilitychange', restart);
   motion.removeEventListener('change', restart);
  };
 }, [paused, input]);
 return placeholder;
}
