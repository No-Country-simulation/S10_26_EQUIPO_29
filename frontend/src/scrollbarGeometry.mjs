const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export function scrollbarMetrics(viewport,documentHeight,scrollY,inset=8){
 const track=Math.max(0,viewport-inset*2),maxScroll=Math.max(0,documentHeight-viewport);
 const length=Math.min(track,Math.max(32,track*viewport/Math.max(viewport,documentHeight)));
 const travel=Math.max(0,track-length),position=maxScroll?clamp(scrollY,0,maxScroll)/maxScroll*travel:0;
 return {track,length,travel,maxScroll,position,inset};
}
export function updateScrollGesture(previous,delta,time){
 const direction=Math.sign(delta);
 if(!direction)return previous;
 const restart=time-previous.time>140||direction!==previous.direction;
 return {direction,distance:(restart?0:previous.distance)+Math.abs(delta),time};
}
export function gestureStretch(metrics,distance){
 const viewport=metrics.track+metrics.inset*2;
 const maximum=Math.min(metrics.length*.65,metrics.track*.18);
 return maximum*(1-Math.exp(-Math.abs(distance)/Math.max(1,viewport*.9)));
}
export function elasticThumb(metrics,trailing,signedStretch){
 const delta=metrics.position-trailing;
 const screenLag=metrics.travel?Math.abs(delta)/metrics.travel*metrics.maxScroll:0;
 const signed=signedStretch??Math.sign(delta)*gestureStretch(metrics,screenLag);
 const extension=Math.min(Math.abs(signed),metrics.length*.65,metrics.track*.18);
 const top=clamp(metrics.position-(signed>0?extension:0),0,metrics.track-metrics.length);
 const bottom=clamp(metrics.position+metrics.length+(signed<0?extension:0),top+metrics.length,metrics.track);
 return {top:metrics.inset+top,length:bottom-top};
}
export function followScroll(current,target,deltaMs){return target+(current-target)*Math.exp(-Math.max(0,deltaMs)/100);}
export function scrollFromThumb(metrics,position){return metrics.travel?clamp(position,0,metrics.travel)/metrics.travel*metrics.maxScroll:0;}
