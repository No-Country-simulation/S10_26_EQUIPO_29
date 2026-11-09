// Pure adapter: identities and topology stay exactly as returned by the assistant.
export function connectionGraph(components,connections,sizes,direction='RIGHT'){
 const ids=new Set(components.map(c=>c.key));
 const edges=connections.filter(c=>ids.has(c.from_key)&&ids.has(c.to_key));
 const used=new Set(edges.flatMap(c=>[c.from_key,c.to_key]));
 return {id:'architecture',layoutOptions:{'elk.algorithm':'layered','elk.direction':direction,'elk.edgeRouting':'ORTHOGONAL','elk.spacing.nodeNode':'48','elk.layered.spacing.nodeNodeBetweenLayers':direction==='DOWN'?'100':'64','elk.padding':'[top=24,left=24,bottom=24,right=24]','elk.layered.considerModelOrder.strategy':'NODES_AND_EDGES'},children:components.filter(c=>used.has(c.key)).map(c=>({id:c.key,width:sizes[c.key]?.width??200,height:sizes[c.key]?.height??72})),edges:edges.map((c,i)=>({id:`edge-${i}`,sources:[c.from_key],targets:[c.to_key],labels:[{id:`label-${i}`,text:c.protocol||'Conexión',width:Math.max(60,Math.min(220,(c.protocol||'Conexión').length*8+24)),height:32}],connection:c}))};
}
export function sectionPath(section){return [section.startPoint,...(section.bendPoints??[]),section.endPoint].map((p,i)=>`${i?'L':'M'} ${p.x} ${p.y}`).join(' ');}

// Anchor the badge to its routed edge, rather than ELK's offset label box.
export function connectionLabelAnchor(edge,label){
 const center={x:label.x+label.width/2,y:label.y+label.height/2};
 const candidates=(edge.sections??[]).flatMap(section=>{
  const points=[section.startPoint,...(section.bendPoints??[]),section.endPoint];
  return points.slice(1).map((end,i)=>{
   const start=points[i],dx=end.x-start.x,dy=end.y-start.y;
   const length=Math.hypot(dx,dy);
   if(!length)return null;
   const half=(Math.abs(dx)>Math.abs(dy)?label.width:label.height)/2+8;
   const inset=Math.min(.5,half/length);
   const t=Math.max(inset,Math.min(1-inset,((center.x-start.x)*dx+(center.y-start.y)*dy)/(length*length)));
   const x=start.x+t*dx,y=start.y+t*dy;
   return {x,y,fits:length>=half*2,distance:Math.hypot(x-center.x,y-center.y)};
  }).filter(Boolean);
 });
 candidates.sort((a,b)=>Number(b.fits)-Number(a.fits)||a.distance-b.distance);
 return candidates[0]??center;
}
