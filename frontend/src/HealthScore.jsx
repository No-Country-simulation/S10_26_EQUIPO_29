import {Activity} from 'lucide-react';
import {FollowingTooltip} from './FollowingTooltip';

export function HealthScore({score}){
 const available=Number.isFinite(score);
 const tone=!available?'unknown':score>=80?'good':score>=60?'moderate':'low';
 const text=available?'Se calcula con la actividad reciente, los issues respecto a las estrellas, la licencia y el estado del repositorio. Los factores sin datos se excluyen: 100/100 no garantiza calidad ni seguridad.':'Todavía no hay datos suficientes para calcular la salud de este repositorio.';
 return <FollowingTooltip text={text} className="health-tooltip">
  {trigger=><button type="button" className={`health-score health-score--${tone}`} aria-label={available?`Salud del repositorio: ${score} de 100`:'Salud sin evaluar'} {...trigger}>
   <Activity size={20} strokeWidth={1.75} className="health-icon" aria-hidden="true"/>
   <strong aria-hidden="true">{available?<>{score}<span>/100</span></>:<span>Sin evaluar</span>}</strong>
  </button>}
 </FollowingTooltip>;
}
