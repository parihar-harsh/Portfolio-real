'use strict';
const year=document.querySelector('#year');
if(year)year.textContent=String(new Date().getFullYear());
const copyButton=document.querySelector('#copy-email');
const status=document.querySelector('#copy-status');
if(copyButton && navigator.clipboard?.writeText){
  copyButton.hidden=false;
  copyButton.addEventListener('click',async()=>{
    copyButton.disabled=true;
    try{await navigator.clipboard.writeText(copyButton.dataset.email);status.textContent='Email address copied.';}
    catch{status.textContent='Could not copy automatically. Select the email address above or choose Email me.';}
    finally{copyButton.disabled=false;}
  });
}

// Animation preference respects the operating system and survives storage denial.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
const motionButton=document.querySelector('#motion-toggle');
let manualMotionOff=false;
try{manualMotionOff=localStorage.getItem('portfolio-motion')==='off';}catch{}
const motionEnabled=()=>!reducedMotion.matches&&!manualMotionOff;
function syncMotion(){
  document.documentElement.classList.toggle('motion-off',!motionEnabled());
  if(motionButton){
    motionButton.hidden=false;
    motionButton.setAttribute('aria-pressed',String(motionEnabled()));
    motionButton.disabled=reducedMotion.matches;
    motionButton.querySelector('span').textContent=reducedMotion.matches?'System: off':manualMotionOff?'Off':'On';
    motionButton.title=reducedMotion.matches?'Your device prefers reduced motion.':'Toggle decorative animations on this device.';
  }
  if(!motionEnabled()){
    document.getAnimations().forEach(animation=>animation.cancel());
    document.querySelectorAll('.project').forEach(card=>{card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');});
  }
}
syncMotion();
reducedMotion.addEventListener('change',syncMotion);
motionButton?.addEventListener('click',()=>{manualMotionOff=!manualMotionOff;try{localStorage.setItem('portfolio-motion',manualMotionOff?'off':'on');}catch{}syncMotion();});
addEventListener('storage',event=>{if(event.key==='portfolio-motion'){manualMotionOff=event.newValue==='off';syncMotion();}});
function reveal(element){
  if(element.dataset.revealed==='true')return;
  element.dataset.revealed='true';
  if(motionEnabled()&&element.animate){
    element.animate([{opacity:.45,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:460,easing:'cubic-bezier(.22,1,.36,1)'});
  }
}
if(typeof window.IntersectionObserver==='function'){
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){reveal(entry.target);observer.unobserve(entry.target);}},{threshold:.08});
  document.querySelectorAll('.section-heading,.panel').forEach(element=>observer.observe(element));
}
if(motionEnabled()&&document.querySelector('.hero-orbit')?.animate){
  document.querySelector('.hero-orbit').animate([{opacity:.3,transform:'rotate(-25deg) scale(.92)'},{opacity:1,transform:'rotate(-12deg) scale(1)'}],{duration:1100,easing:'cubic-bezier(.22,1,.36,1)'});
}

// Filter buttons remain ordinary keyboard-operable controls, not incomplete tabs.
const cards=[...document.querySelectorAll('.project')];
const filterButtons=[...document.querySelectorAll('[data-filter]')];
const filterStatus=document.querySelector('#filter-status');
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  filterButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  const visible=cards.filter(card=>button.dataset.filter==='all'||card.dataset.category===button.dataset.filter);
  cards.forEach(card=>{card.hidden=!visible.includes(card);});
  if(filterStatus)filterStatus.textContent=visible.length===cards.length?'Showing all '+cards.length+' projects.':'Showing '+visible.length+' of '+cards.length+' projects.';
  visible.forEach(card=>{delete card.dataset.revealed;reveal(card);});
  scheduleScrollUpdate();
}));
if(filterButtons.length)document.querySelector('.project-controls').hidden=false;

// One scheduled frame per scroll/resize event; no continuous rendering loop.
const header=document.querySelector('.site-header');
const progress=document.querySelector('.scroll-progress span');
const navLinks=[...document.querySelectorAll('nav a[href^="#"]')];
let scrollFrame=0;
function scheduleScrollUpdate(){
  if(scrollFrame)return;
  scrollFrame=requestAnimationFrame(()=>{
    scrollFrame=0;
    const max=document.documentElement.scrollHeight-innerHeight;
    if(progress)progress.style.transform='scaleX('+Math.min(1,Math.max(0,max>0?scrollY/max:0))+')';
    const top=(header?.offsetHeight||0)+60;
    let current=null;
    for(const link of navLinks){const section=document.querySelector(link.getAttribute('href'));if(section&&section.getBoundingClientRect().top<=top)current=link;}
    navLinks.forEach(link=>{if(link===current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  });
}
addEventListener('scroll',scheduleScrollUpdate,{passive:true});
addEventListener('resize',scheduleScrollUpdate,{passive:true});
scheduleScrollUpdate();

// Small pointer tilt is restricted to mouse-like devices and reduced-motion off.
for(const card of cards){
  let tiltFrame=0;
  card.addEventListener('pointermove',event=>{
    if(!motionEnabled()||!finePointer.matches||event.pointerType!=='mouse')return;
    const x=event.clientX,y=event.clientY;
    if(tiltFrame)cancelAnimationFrame(tiltFrame);
    tiltFrame=requestAnimationFrame(()=>{
      tiltFrame=0;
      if(!motionEnabled()||!finePointer.matches)return;
      const rect=card.getBoundingClientRect();
      card.style.setProperty('--tilt-x',((.5-(y-rect.top)/rect.height)*3).toFixed(2)+'deg');
      card.style.setProperty('--tilt-y',(((x-rect.left)/rect.width-.5)*3).toFixed(2)+'deg');
    });
  });
  card.addEventListener('pointerleave',()=>{if(tiltFrame)cancelAnimationFrame(tiltFrame);tiltFrame=0;card.style.removeProperty('--tilt-x');card.style.removeProperty('--tilt-y');});
}
