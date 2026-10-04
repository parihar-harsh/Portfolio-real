import {parseHTML} from 'linkedom';

function replace(source,from,to){
 if(!source.includes(from))throw Error('Original design pattern changed: '+from.slice(0,80));
 return source.replace(from,to);
}

export async function restore({original,pageJS,bentoJS,content}){
 let js=pageJS;
 js=js.replaceAll('Optimzing','Optimizing').replaceAll('Perfomant','Performant').replaceAll('mailto:pariharharsh1234@gmail.co"','mailto:pariharharsh1234@gmail.com"');
 js=replace(js,'https://docs.google.com/document/d/19orXHr_JggN_S6LdYF21rDQ3RLqDLTFEDU0mkTLr3rU/edit?usp=sharing',content.resume);
 js=replace(js,'href:"#about",children:(0,a.jsx)(i.Z,{title:"Show my work"','href:"#projects",children:(0,a.jsx)(i.Z,{title:"Show my work"');
 js=replace(js,'console.log(i),r("span"','r("span"');
 js=replace(js,'{duration:2,delay:(0,m.E)(.2)}','{duration:1.15,delay:(0,m.E)(.1)}');
 js=replace(js,'className:"pb-20 pt-36"','className:"hero-section pb-20 pt-36"');
 js=replace(js,'"flex max-w-fit md:min-w-[70vw]','"floating-nav flex max-w-fit md:min-w-[70vw]');
 js=replace(js,'initial:{opacity:1,y:-100},animate:{y:r?0:-100','role:"navigation","aria-label":"Main navigation",initial:{opacity:1,y:-100},animate:{y:r?0:-100');
 js=replace(js,'(0,a.jsx)("div",{className:(0,n.cn)("font-bold",s)','(0,a.jsx)("h1",{className:(0,n.cn)("font-bold",s)');
 js=js.replaceAll('(0,a.jsxs)("h1",{className:"heading','(0,a.jsxs)("h2",{className:"heading').replaceAll('(0,a.jsx)("h1",{className:"font-bold','(0,a.jsx)("h3",{className:"font-bold').replaceAll('(0,a.jsx)("h1",{className:"text-start','(0,a.jsx)("h3",{className:"text-start');
 js=replace(js,'as:l="button"','as:l="article"');
 js=replace(js,'a&&c.set(a/s*e%a)','a&&!window.__portfolioReducedMotion&&c.set(a/s*e%a)');
 js=replace(js,'return null===(t=n.current)||void 0===t?void 0:t.getPointAtLength(e).x','return(t=n.current)&&t.getTotalLength()>0?t.getPointAtLength(e).x:0');
 js=replace(js,'return null===(t=n.current)||void 0===t?void 0:t.getPointAtLength(e).y','return(t=n.current)&&t.getTotalLength()>0?t.getPointAtLength(e).y:0');
 js=replace(js,'(0,a.jsxs)("button",{className:"relative inline-flex h-12','(0,a.jsxs)(r?"button":"span",{className:"relative inline-flex h-12');
 js=replace(js,'(0,a.jsxs)("button",{className:"relative inline-flex overflow-hidden rounded-full','(0,a.jsxs)("span",{className:"relative inline-flex overflow-hidden rounded-full');
 js=replace(js,'(0,a.jsx)("h2",{className:"dark:text-white text-center text-3xl','(0,a.jsx)("h3",{className:"dark:text-white text-center text-3xl');
 js=replace(js,'target:"_blank",children:(0,a.jsx)(i.Z,{title:"My Resume"','target:"_blank",rel:"noopener noreferrer",children:(0,a.jsx)(i.Z,{title:"My Resume"');
 js=replace(js,'href:e.url,target:"_blank",children:','href:e.url,target:"_blank",rel:"noopener noreferrer","aria-label":e.id===1?"GitHub (opens in a new tab)":"LinkedIn (opens in a new tab)",children:');
 js=replace(js,'className:"py-20 w-full",children:','className:"py-20 w-full",id:"experience",children:');
 js=replace(js,'children:"Check Repository"','children:e.action');
 // Preserve the original pin component. Secondary links are siblings, never nested anchors.
 const start=js.indexOf('var A=');const end=js.indexOf(',D=s(4769)',start);
 let projects=js.slice(start,end);
 projects=replace(projects,'l.q.map(e=>(0,a.jsx)("div",{className:"','l.q.map(e=>(0,a.jsxs)("div",{"data-project":e.title,className:"project-shell ');
 projects=replace(projects,'children:(0,a.jsxs)(L,{title:e.title','children:[(0,a.jsxs)(L,{title:e.title');
 projects=replace(projects,']})},e.id))',']}),e.secondary&&(0,a.jsx)("a",{href:e.secondary,target:"_blank",rel:"noopener noreferrer",className:"project-secondary",children:e.secondaryLabel+" ↗"})]},e.id))');
 js=js.slice(0,start)+projects+js.slice(end);
 // Keyboard and touch reveal the same canvas cards as hover.
 js=replace(js,'onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),className:"border','tabIndex:0,onFocus:()=>n(!0),onBlur:()=>n(!1),onClick:()=>n(!i),onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),className:"border');
 js=replace(js,'children:i&&(0,a.jsx)(x.E.div','children:i&&!window.__portfolioReducedMotion&&window.__portfolioWebGLAvailable&&(0,a.jsx)(x.E.div');
 js=replace(js,'onMouseEnter:()=>{d("translate(-50%,-50%) rotateX(40deg) scale(0.8)")}','onFocus:()=>{d("translate(-50%,-50%) rotateX(40deg) scale(0.8)")},onBlur:()=>{d("translate(-50%,-50%) rotateX(0deg) scale(1)")},onMouseEnter:()=>{d("translate(-50%,-50%) rotateX(40deg) scale(0.8)")}');
 js=js.replaceAll('rotateX(40deg) scale(0.8)','rotateX(40deg) scale(0.92)');
 // New UI lives in React's tree so hydration cannot erase controls or create mismatches.
 const toggle='(0,a.jsx)("button",{id:"motion-toggle",type:"button","aria-pressed":!reduced,onClick:()=>window.togglePortfolioMotion(),children:reduced?"Animations off":"Animations on"})';
 js=replace(js,'var O=()=>(0,a.jsx)("main",{className:','var O=()=>{let[reduced,setReduced]=(0,o.useState)(false);(0,o.useEffect)(()=>{const update=()=>setReduced(window.__portfolioReducedMotion===true);update();window.addEventListener("portfolio-motion",update);return()=>window.removeEventListener("portfolio-motion",update)},[]);return(0,a.jsx)("main",{id:"main",tabIndex:-1,className:');
 js=replace(js,'children:[(0,a.jsx)(H,{navItems:l.te})','children:[(0,a.jsx)("a",{className:"skip-link",href:"#main",children:"Skip to content"}),'+toggle+',(0,a.jsx)(H,{navItems:l.te})');
 js=replace(js,'(0,a.jsx)(g,{})','(0,a.jsx)(g,{},String(reduced))');
 js=replace(js,'(0,a.jsx)(f,{})]})})},1828','(0,a.jsx)(f,{})]})})}},1828');
 js=js.replace(/,r=\[\{id:1,title:"Serverless Blog-App"[\s\S]*?\],i=\[/,',r='+JSON.stringify(content.projects)+',i=[');
 js=js.replace(/,i=\[\{id:1,title:"Backend Development Intern-Brainwave[\s\S]*?\],n=\[/,',i='+JSON.stringify(content.experience)+',n=[');
 js=js.replaceAll('Currently Deploying a 3-Tier Architecture Application on AWS EKS','Cloud deployments with AWS and container orchestration').replaceAll('The Inside Scoop','Earlier infrastructure work');
 let bento=bentoJS;
 bento=replace(bento,'className:(0,l.cn)("row-span-1 relative overflow-hidden','"data-bento":y,className:(0,l.cn)("row-span-1 relative overflow-hidden');
 bento=replace(bento,'h,"group-hover/bento:translate-x-2','h,"bento-content group-hover/bento:translate-x-2');
 bento=replace(bento,'className:"font-sans text-lg lg:text-3xl','className:"bento-title font-sans text-lg lg:text-3xl');
 bento=replace(bento,'2===y&&(0,i.jsx)(m,{})','2===y&&(window.__portfolioReducedMotion||!window.__portfolioWebGLAvailable?(0,i.jsx)("img",{src:"/globe-still.svg",alt:"",className:"globe-still"}):(0,i.jsx)(m,{}))');
 bento=replace(bento,'loop:E,autoplay:E','key:E?"copied":"idle",loop:false,autoplay:E&&!window.__portfolioReducedMotion');
 bento=replace(bento,'handleClick:()=>{navigator.clipboard.writeText("pariharharsh1234@gmail.com"),g(!0)}','handleClick:async()=>{try{await navigator.clipboard.writeText("pariharharsh1234@gmail.com");g(!0);window.portfolioCopyStatus("Email address copied.")}catch{g(!1);window.portfolioCopyStatus("Could not copy automatically. Email pariharharsh1234@gmail.com instead.")}}');
 bento=bento.replaceAll('"ReactJS","Express","Typescript","C++","python","Prometheous","Terraform","Jenkins","Docker"','"React","Express","TypeScript","Python","Node.js","Redis","BullMQ","Docker","RAG"').replaceAll('"NEXT.JS","MongoDB","AWS","Azure","PostgreSQL","Grafana","Ansible","K8s","ArgoCD"','"Next.js","MongoDB","AWS","Azure","PostgreSQL","Prisma","Hono","REST","Git"');
 const {document}=parseHTML(original);
 // The original design has one dark palette; an old theme storage value must
 // not turn its hero light while the rest of the page remains dark.
 for(const script of document.querySelectorAll('script:not([src])'))if(script.textContent.startsWith('!function(){try{var d=document.documentElement'))script.textContent="document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';";
 document.title=content.title;
 document.querySelector('meta[name="description"]').setAttribute('content',content.description);
 document.querySelector('link[rel="icon"]').setAttribute('href','/favicon.svg');
 const main=document.querySelector('main');main.id='main';main.setAttribute('tabindex','-1');
 main.querySelector('.pb-20.pt-36').classList.add('hero-section');
 const nav=main.querySelector('div.fixed');nav.classList.add('floating-nav');nav.setAttribute('role','navigation');nav.setAttribute('aria-label','Main navigation');
 for(const el of main.querySelectorAll('h1')){const h=document.createElement(el.classList.contains('heading')?'h2':'h3');for(const a of el.attributes)h.setAttribute(a.name,a.value);h.innerHTML=el.innerHTML;el.replaceWith(h);}
 const hero=main.querySelector('.font-bold.text-center');const heading=document.createElement('h1');
 for(const a of hero.attributes)heading.setAttribute(a.name,a.value);heading.innerHTML=hero.innerHTML.replaceAll('Optimzing','Optimizing');hero.replaceWith(heading);
 for(const a of main.querySelectorAll('a')){
  if(a.href.includes('docs.google.com'))a.href=content.resume;
  if(a.textContent.includes('Show my work'))a.href='#projects';
  if(a.href==='mailto:pariharharsh1234@gmail.co')a.href='mailto:pariharharsh1234@gmail.com';
  if(a.target==='_blank')a.setAttribute('rel','noopener noreferrer');
  for(const button of a.querySelectorAll('button')){const span=document.createElement('span');for(const attr of button.attributes)span.setAttribute(attr.name,attr.value);span.innerHTML=button.innerHTML;button.replaceWith(span);}
 }
 const list=main.querySelector('#projects > div');const template=list.firstElementChild.cloneNode(true);list.innerHTML='';
 for(const p of content.projects){
  const card=template.cloneNode(true);card.classList.add('project-shell');card.setAttribute('data-project',p.title);
  const link=card.querySelector('a');link.href=p.link;
  card.querySelector('h3').textContent=p.title;
  card.querySelector('p').textContent=p.des;
  card.querySelector('img[alt="cover"]').setAttribute('src',p.img);
  const icons=card.querySelector('img[alt="icon5"]').parentElement.parentElement;const iconTemplate=icons.firstElementChild.cloneNode(true);icons.innerHTML='';
  p.iconLists.forEach((src,i)=>{const icon=iconTemplate.cloneNode(true);icon.setAttribute('style','transform:translateX(-'+(5*i+2)+'px)');icon.querySelector('img').src=src;icons.append(icon);});
  [...card.querySelectorAll('p')].find(el=>el.textContent==='Check Repository').textContent=p.action;
  const pinTitle=card.querySelector('span.relative.z-20');pinTitle.textContent=p.title;
  if(p.secondary){const a=document.createElement('a');a.href=p.secondary;a.target='_blank';a.rel='noopener noreferrer';a.className='project-secondary';a.textContent=p.secondaryLabel+' ↗';card.append(a);}
  list.append(card);
 }
 const expHeading=[...main.querySelectorAll('h2')].find(h=>h.textContent.includes('work experience'));const exp=expHeading.parentElement;exp.id='experience';
 const cards=exp.querySelectorAll('button');cards.forEach((old,i)=>{const card=document.createElement('article');for(const a of old.attributes)card.setAttribute(a.name,a.value);card.innerHTML=old.innerHTML;const data=content.experience[i];card.querySelector('h3').textContent=data.title;card.querySelector('p').textContent=data.desc;card.querySelector('img').src=data.thumbnail;old.replaceWith(card);});
 for(const el of main.querySelectorAll('[class*="group/canvas-card"]')){
  el.setAttribute('tabindex','0');const h=el.querySelector('h2');const h3=document.createElement('h3');for(const attr of h.attributes)h3.setAttribute(attr.name,attr.value);h3.innerHTML=h.innerHTML;h.replaceWith(h3);
  const old=el.querySelector('button');const span=document.createElement('span');for(const attr of old.attributes)span.setAttribute(attr.name,attr.value);span.innerHTML=old.innerHTML;old.replaceWith(span);
 }
 const skip=document.createElement('a');skip.className='skip-link';skip.href='#main';skip.textContent='Skip to content';
 const motion=document.createElement('button');motion.id='motion-toggle';motion.type='button';motion.setAttribute('aria-pressed','true');motion.textContent='Animations on';
 main.firstElementChild.prepend(skip,motion);
 for(const a of main.querySelectorAll('a[href="https://github.com/parihar-harsh"],a[href="https://www.linkedin.com/in/pariharharsh/"]'))a.setAttribute('aria-label',a.href.includes('linkedin')?'LinkedIn (opens in a new tab)':'GitHub (opens in a new tab)');
 // Metadata in the embedded Flight payload must match the static head.
 let html=document.toString().replaceAll('My Portfolio',content.title).replaceAll('/jsm-logo.png','/favicon.svg').replaceAll('Perfomant','Performant');
 html=html.replaceAll(String.raw`\"defaultTheme\":\"dark\",\"enableSystem\":true`,String.raw`\"defaultTheme\":\"dark\",\"forcedTheme\":\"dark\",\"enableSystem\":false`);
 html=html.replace('</head>','<link rel="stylesheet" href="/style.css"><script src="/app.js"></script><link rel="canonical" href="https://pariharharshpfolio.netlify.app/"><noscript><style>h1 span{opacity:1!important}#motion-toggle{display:none}</style></noscript></head>');
 return{html,pageJS:js,bentoJS:bento};
}
