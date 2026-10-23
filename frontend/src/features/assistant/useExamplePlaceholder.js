import {useState,useEffect} from 'react';
const promptExamples = [
 'Diseña un SaaS multi-tenant con aislamiento de datos, SSO mediante OIDC y RBAC por organización.',
 'Propón una arquitectura orientada a eventos con colas, reintentos e idempotencia para procesar pagos.',
 'Diseña un RAG privado con búsqueda híbrida, permisos por documento y modelos alojados en nuestra infraestructura.',
 'Define un stack de observabilidad con métricas, logs y trazas distribuidas para microservicios en Kubernetes.',
 'Propón una API de alta disponibilidad con PostgreSQL, caché distribuida y escalado horizontal para 10.000 solicitudes/s.'
];

export function useExamplePlaceholder(paused) {
 const [text, setText] = useState(promptExamples[0]);
 useEffect(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timeout;
  let index = 0;
  let length = promptExamples[0].length;
  let deleting = true;
  function tick() {
   const current = promptExamples[index];
   length += deleting ? -1 : 1;
   setText(current.slice(0, length));
   let delay = deleting ? 10 : 48;
   if (length === 0) {
    index = (index + 1) % promptExamples.length;
    deleting = false;
    delay = 350;
   } else if (length === current.length && !deleting) {
    deleting = true;
    delay = 2600;
   }
   timeout = window.setTimeout(tick, delay);
  }
  function restart() {
   window.clearTimeout(timeout);
   index = 0;
   length = promptExamples[0].length;
   deleting = true;
   setText(promptExamples[0]);
   if (!paused && !motion.matches) timeout = window.setTimeout(tick, 2600);
  }
  restart();
  motion.addEventListener('change', restart);
  return () => {
   window.clearTimeout(timeout);
   motion.removeEventListener('change', restart);
  };
 }, [paused]);
 return text;
}
