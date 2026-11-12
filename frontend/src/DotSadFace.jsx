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
// Unavailable services keep the same dotted material and sad mouth.
const unavailableDots=[];
for(const center of [112,208]){
 for(let y=-21;y<=21;y+=6){
  for(let x=-21;x<=21;x+=6){
   if(Math.abs(Math.abs(x)-Math.abs(y))<=6)unavailableDots.push({x:center+x,y:120+y});
  }
 }
}
unavailableDots.push(...dots.filter(dot=>dot.y>=170));
// A short rounded tongue hangs from the right side of the frown.
for(let y=207;y<=225;y+=6){
 for(const x of [200,206,218,224])unavailableDots.push({x,y});
}
for(let angle=0;angle<=Math.PI;angle+=Math.PI/7){
 for(const radius of [6,12])unavailableDots.push({x:212+Math.cos(angle)*radius,y:225+Math.sin(angle)*radius});
}
export function DotSadFace({variant='sad'}){
 const points=variant==='unavailable'?unavailableDots:variant==='dizzy'?dizzyDots:dots;
 return <svg className="catalog-error-face dot-sad-face" viewBox="0 0 320 320" width="320" height="320" aria-hidden="true" focusable="false">
  <g fill="#b9cadb" opacity=".32">{points.map((dot,i)=><circle key={i} cx={dot.x} cy={dot.y} r="1.8"/>)}</g>
  <g className="dot-face-light">{points.map((dot,i)=><circle key={i} cx={dot.x} cy={dot.y} r="1.8" style={{animationDelay:`${-6+(dot.x-84)/160*1.8+(dot.y-96)/128*.65}s`}}/>)}</g>
 </svg>;
}

// A compact dotted question mark shares the faces' restrained light sweep.
const questionRows=[
 '  XXXXX  ',
 ' XXXXXXX ',
 'XX     XX',
 'XX     XX',
 '       XX',
 '      XX ',
 '     XX  ',
 '    XX   ',
 '    XX   ',
 '         ',
 '    XX   ',
 '    XX   ',
];
const questionDots=questionRows.flatMap((row,y)=>Array.from(row,(cell,x)=>cell==='X'?{x:8+x*5,y:6+y*5}:null).filter(Boolean));
export function DotQuestion({index=0}){
 return <svg className="clarification-symbol" viewBox="0 0 56 68" width="56" height="68" aria-hidden="true" focusable="false">
  <g fill="#b9cadb" opacity=".4">{questionDots.map((dot,i)=><circle key={i} cx={dot.x} cy={dot.y} r="1.5"/>)}</g>
  <g className="dot-face-light">{questionDots.map((dot,i)=><circle key={i} cx={dot.x} cy={dot.y} r="1.5" style={{animationDelay:`${-6+dot.x/56*1.8+dot.y/68*.65-index*.7}s`}}/>)}</g>
 </svg>;
}
