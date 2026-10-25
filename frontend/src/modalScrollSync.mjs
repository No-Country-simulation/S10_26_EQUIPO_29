// Ignore the echo of our own writes: a delayed rail event must not rewind momentum.
export function createModalScrollSync(scrollport,scrollbar){
 let expectedRail=null,expectedContent=null;
 const syncFromContent=()=>{
  if(expectedContent!==null){const echo=Math.abs(scrollport.scrollTop-expectedContent)<=1;expectedContent=null;if(echo)return;}
  const range=scrollport.scrollHeight-scrollport.clientHeight;
  const top=range>0?scrollport.scrollTop/range*(scrollbar.scrollHeight-scrollbar.clientHeight):0;
  if(Math.abs(scrollbar.scrollTop-top)>.5){scrollbar.scrollTop=top;expectedRail=scrollbar.scrollTop;}
 };
 const syncFromRail=()=>{
  if(expectedRail!==null){const echo=Math.abs(scrollbar.scrollTop-expectedRail)<=1;expectedRail=null;if(echo)return;}
  const range=scrollbar.scrollHeight-scrollbar.clientHeight;
  const top=range>0?scrollbar.scrollTop/range*(scrollport.scrollHeight-scrollport.clientHeight):0;
  if(Math.abs(scrollport.scrollTop-top)>1){scrollport.scrollTop=top;expectedContent=scrollport.scrollTop;}
 };
 return {syncFromContent,syncFromRail};
}
