import {useLayoutEffect,useRef} from 'react';
import './skeletonStudio.css';

// Approved local lighting preset, captured from the adjustment panel.
const settings={lightX:-28,lightY:-47,reach:92,light:25,edge:0,shadow:35,blur:42,distance:0,speed:1.7,waveWidth:130,curvature:100,softness:100,dots:75,gap:8,dotInset:3,glow:55,dispersion:45,trail:32,sweepLight:14,dotDepth:55,dotRim:35,contact:45,contactBlur:2.5,background:'#020303',color:'#c2e1ff'};
function variables(s){return {'--lens-inner':`${55-s.waveWidth*.3}%`,'--lens-inner-soft':`${55-s.waveWidth*.18}%`,'--lens-core-start':`${55-(100-s.softness)*.04}%`,'--lens-core-end':`${55+(100-s.softness)*.04}%`,'--lens-outer-soft':`${55+s.waveWidth*.18}%`,'--lens-outer':`${55+s.waveWidth*.3}%`,'--wave-radius-x':`${10+s.waveWidth*.12}%`,'--wave-radius-y':`${48+s.curvature*.25}%`,'--wave-lens-y':`${130-s.curvature*.9}%`,'--wave-lens-x':`${140-s.curvature*.65}%`,'--wave-lens-origin':`${110+s.curvature*.6}%`,'--wave-width':`${s.waveWidth}%`,'--wave-core':`${Math.max(0,35-s.softness*.35)}%`,'--skeleton-light':`${s.light}%`,'--skeleton-edge':`${s.edge}%`,'--contact-opacity':s.contact/100,'--contact-blur':`${s.contactBlur}px`,'--skeleton-shadow':s.shadow/100,'--skeleton-blur':`${s.blur}px`,'--skeleton-speed':`${s.speed}s`,'--skeleton-dots':s.dots/100,'--skeleton-gap':`${s.gap}px`,'--skeleton-color':s.color,'--skeleton-background':s.background,'--skeleton-glow':s.glow/100,'--wave-dispersion':s.dispersion/100,'--wave-trail':`${s.trail}%`,'--skeleton-sweep-light':s.sweepLight/100};}
export function ProposalSkeleton({count=6}){
 const grid=useRef(null);
 useLayoutEffect(()=>{
  const root=grid.current;
  const measure=()=>{
   const bounds=root.getBoundingClientRect();
   if(!bounds.width)return;
   const x=bounds.width*settings.lightX/100,y=bounds.height*settings.lightY/100;
   const radius=Math.max(bounds.width,bounds.height)*settings.reach/100;
   for(const card of root.children){
    const rect=card.getBoundingClientRect(),left=rect.left-bounds.left,top=rect.top-bounds.top;
    const width=card.clientWidth,height=card.clientHeight;
    const pad=20,bodyWidth=Math.max(20,width-pad*2);
    const shapes=[
     [pad,pad,32,32,9],[pad+44,pad+2,Math.max(24,bodyWidth-60),11,5],
     [pad+44,pad+21,Math.max(20,(bodyWidth-44)*.65),8,4],
     [pad,76,bodyWidth,9,4],[pad,96,bodyWidth*.9,9,4],[pad,116,bodyWidth*.64,9,4],
     [pad,height-37,bodyWidth*.25,8,4],[width-pad-bodyWidth*.33,height-47,bodyWidth*.33,28,14]
    ];
    const mask=`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${shapes.map(([x,y,w,h,r])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="white"/>`).join('')}</svg>`)}")`;
    card.style.setProperty('--skeleton-content-mask',mask);
    card.style.setProperty('--wave-scene-width',`${bounds.width}px`);
    card.style.setProperty('--wave-scene-height',`${bounds.height}px`);
    card.style.setProperty('--wave-scene-left',`${-left}px`);
    card.style.setProperty('--wave-scene-top',`${-top}px`);
    card.style.setProperty('--scene-light-x',`${x-left}px`);
    card.style.setProperty('--scene-light-y',`${y-top}px`);
    card.style.setProperty('--scene-light-radius',`${radius}px`);
    const dx=left+rect.width/2-x,dy=top+rect.height/2-y,length=Math.max(1,Math.hypot(dx,dy));
    card.style.setProperty('--skeleton-shadow-x',`${dx/length*settings.distance}px`);
    card.style.setProperty('--skeleton-shadow-y',`${dy/length*settings.distance}px`);
    card.style.setProperty('--contact-x',`${dx/length*1.5}px`);
    card.style.setProperty('--contact-y',`${dy/length*1.5}px`);

   }
  };
  const observer=new ResizeObserver(measure);observer.observe(root);for(const card of root.children)observer.observe(card);measure();
  return()=>observer.disconnect();
 },[settings.lightX,settings.lightY,settings.reach,settings.distance,count]);
 return <div ref={grid} className="proposal-skeleton" aria-hidden="true" style={variables(settings)}>{Array.from({length:count},(_,i)=><div className="proposal-skeleton-card" key={i}><div className="proposal-skeleton-dots"><div className="proposal-skeleton-wave"/></div></div>)}</div>;
}
