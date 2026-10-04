// Motion preferences are set before Next hydrates. React owns all interactive markup.
(()=>{
 document.documentElement.classList.add('dark');
 try{const canvas=document.createElement('canvas');const gl=canvas.getContext('webgl2');window.__portfolioWebGLAvailable=Boolean(gl);gl?.getExtension('WEBGL_lose_context')?.loseContext();}catch{window.__portfolioWebGLAvailable=false;}
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 let disabled=false;
 try{disabled=localStorage.getItem('portfolio-motion')==='off';}catch{}
 function sync(){
  window.__portfolioReducedMotion=media.matches||disabled;
  document.documentElement.dataset.motion=window.__portfolioReducedMotion?'off':'on';
  window.dispatchEvent(new Event('portfolio-motion'));
  const button=document.getElementById('motion-toggle');if(button)button.disabled=media.matches;
  if(window.__portfolioReducedMotion){for(const animation of document.getAnimations()){try{animation.finish();}catch{animation.cancel();}}}
 }
 window.togglePortfolioMotion=()=>{disabled=!disabled;try{localStorage.setItem('portfolio-motion',disabled?'off':'on');}catch{}sync();};
 window.portfolioCopyStatus=message=>{let status=document.getElementById('copy-status');if(!status){status=document.createElement('p');status.id='copy-status';status.className='copy-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');document.body.append(status);}status.textContent=message;};
 media.addEventListener('change',sync);window.addEventListener('storage',e=>{if(e.key==='portfolio-motion'){disabled=e.newValue==='off';sync();}});
 sync();
 // Wait for the original client-only bento section before decorating hydrated content.
 document.addEventListener('DOMContentLoaded',()=>{
  const observer=new MutationObserver(()=>{if(document.getElementById('about')){observer.disconnect();sync();}});
  observer.observe(document.body,{childList:true,subtree:true});if(document.getElementById('about')){observer.disconnect();sync();}
 });
})();
