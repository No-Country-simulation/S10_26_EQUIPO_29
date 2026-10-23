// Restored focus remains accessible; pointer hover re-arms on a fresh interaction.
export function restReturningCard(card){
 if(!card)return ()=>{};
 card.setAttribute('data-return-rest','');
 const events=['pointermove','pointerleave','pointerdown','keydown','focusout'];
 const clear=()=>{card.removeAttribute('data-return-rest');for(const event of events)card.removeEventListener(event,clear);};
 for(const event of events)card.addEventListener(event,clear);
 return clear;
}
