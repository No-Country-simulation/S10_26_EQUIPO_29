// Fixed geometry keeps the expression readable throughout the light sweep.
const dots=[];
for(const center of [112,208]){
 for(let y=98;y<=142;y+=7){
  for(let x=center-12;x<=center+12;x+=6){
   if(((x-center)/13)**2+((y-120)/25)**2<=1)dots.push({x,y});
  }
 }
}
for(let row=-1;row<=1;row++){
 for(let step=0;step<=26;step++){
  const x=96+step*128/26;
  const y=180+34*((x-160)/64)**2+row*6;
  if(row===0||step>0&&step<26)dots.push({x,y});
 }
}
const dizzyDots=[];
for(const center of [112,208]){
 for(let angle=0;angle<=Math.PI*4;){
  const radius=3+angle*1.65;
  dizzyDots.push({x:center+Math.cos(angle)*radius,y:122+Math.sin(angle)*radius});
  angle+=5.4/Math.hypot(radius,1.65);
 }
}
dizzyDots.push(...dots.filter(dot=>dot.y>=170));
export function DotSadFace({variant='sad'}){
 const points=variant==='dizzy'?dizzyDots:dots;
 return <svg className="catalog-error-face dot-sad-face" viewBox="0 0 320 320" width="320" height="320" aria-hidden="true" focusable="false">
  <g fill="#b9cadb" opacity=".32">{points.map((dot,i)=><circle key={i} cx={dot.x} cy={dot.y} r="1.8"/>)}</g>
  <g className="dot-face-light">{points.map((dot,i)=><circle key={i} cx={dot.x} cy={dot.y} r="1.8" style={{animationDelay:`${-6+(dot.x-84)/160*1.8+(dot.y-96)/128*.65}s`}}/>)}</g>
 </svg>;
}
