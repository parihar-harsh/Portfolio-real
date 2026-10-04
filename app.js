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
