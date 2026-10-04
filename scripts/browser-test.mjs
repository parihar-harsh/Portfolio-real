import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4173';
const browser=await chromium.launch({channel:'chrome',headless:true});
const screenshots='/tmp/portfolio-review-20261004';
await fs.mkdir(screenshots,{recursive:true});
const errors=[],badResponses=[];
const context=await browser.newContext();
const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push({url:r.url(),status:r.status()});});
let axeScans=0;
try{
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto(base,{waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').count(),1,'A single main heading');
  assert.equal(await page.locator('.project').count(),4);
  assert.equal(await page.locator('a[href*="1O71pQua7stH9YqdT9gEX88tqamr7Kqpd"]').count(),2);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'No horizontal overflow at '+width);
  for(const hash of ['#home','#main','#about','#projects','#experience','#contact'])assert.equal(await page.locator(hash).count(),1);
  for(const a of await page.locator('a[target="_blank"]').all()){
   assert.match(await a.getAttribute('rel'),/noopener/);
   assert.match(await a.innerText(),/opens in a new tab/);
  }
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],'Accessibility at '+width);
  axeScans++;
  if([390,1440].includes(width))await page.screenshot({path:screenshots+'/portfolio-'+width+'.png',fullPage:true});
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(base,{waitUntil:'networkidle'});
 await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(e=>e===document.activeElement),true);
 await page.keyboard.press('Enter');assert.equal(await page.locator('#main').evaluate(e=>e===document.activeElement),true);
 await page.locator('nav a[href="#projects"]').click();
 assert.match(page.url(),/#projects$/);
 await expect.poll(()=>page.locator('#projects').evaluate(e=>e.getBoundingClientRect().top>=0&&e.getBoundingClientRect().top<innerHeight)).toBe(true);
 // Filters support mouse, keyboard and accessible state without losing focus.
 const filters=page.getByRole('group',{name:'Filter projects'});
 await filters.getByRole('button',{name:'Applied AI'}).click();
 assert.equal(await page.locator('.project:visible').count(),1);
 assert.equal(await page.locator('.project:visible h3').innerText(),'DoxChat AI');
 assert.equal(await filters.getByRole('button',{name:'Applied AI'}).getAttribute('aria-pressed'),'true');
 await filters.getByRole('button',{name:'Web apps'}).focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('.project:visible').count(),2);
 assert.equal(await filters.getByRole('button',{name:'Web apps'}).evaluate(e=>e===document.activeElement),true);
 await expect.poll(()=>page.evaluate(()=>document.getAnimations().length)).toBe(0);
 let filterScan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(filterScan.violations.map(v=>v.id),[]);axeScans++;
 await filters.getByRole('button',{name:'Data',exact:true}).click();
 assert.equal(await page.locator('.project:visible h3').innerText(),'GeneCheck');
 await filters.getByRole('button',{name:'All work'}).click();
 assert.equal(await page.locator('.project:visible').count(),4);
 await expect.poll(()=>page.locator('nav a[href="#projects"]').getAttribute('aria-current')).toBe('location');
 // Motion preference switches immediately and survives a refresh.
 await page.locator('#motion-toggle').click();
 assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'false');
 assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
 await page.reload({waitUntil:'networkidle'});
 assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'false');
 await page.locator('#motion-toggle').click();
 assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'true');
 const card=page.locator('.project').first();await card.scrollIntoViewIfNeeded();
 const rect=await card.boundingBox();await page.mouse.move(rect.x+rect.width*.8,rect.y+rect.height*.3);
 await expect.poll(()=>card.evaluate(e=>e.style.getPropertyValue('--tilt-x'))).not.toBe('');
 await page.mouse.move(0,0);await expect.poll(()=>card.evaluate(e=>e.style.getPropertyValue('--tilt-x'))).toBe('');
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior),'auto');
 await expect(page.locator('#motion-toggle')).toBeDisabled();
 assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
 const reducedScan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(reducedScan.violations.map(v=>v.id),[]);axeScans++;
 // Equivalent to a 200% zoom viewport: available CSS width is halved.
 await page.setViewportSize({width:640,height:450});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.goto(base,{waitUntil:'networkidle'});
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copiedEmail=text;}}}));

 await page.locator('#copy-email').click();
 assert.equal(await page.evaluate(()=>window.copiedEmail),'pariharharsh1234@gmail.com');
 await page.getByRole('status').filter({hasText:'Email address copied.'}).waitFor();
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('permission denied');}}}));
 await page.locator('#copy-email').click();
 await page.getByRole('status').filter({hasText:'Could not copy automatically.'}).waitFor();
 assert.equal(await page.locator('#copy-email').isEnabled(),true);
 const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const plain=await noJs.newPage();await plain.goto(base);
 assert.equal(await plain.locator('.project').count(),4);
 assert.equal(await plain.locator('#copy-email').isVisible(),false);
 assert.equal(await plain.locator('.project-controls').isVisible(),false);
 assert.equal(await plain.locator('#motion-toggle').isVisible(),false);
 assert.ok(await plain.locator('a[href="mailto:pariharharsh1234@gmail.com"]').count());
 await noJs.close();
 const blocked=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('storage denied');}});window.IntersectionObserver=undefined;});
 const fallback=await blocked.newPage();const fallbackErrors=[];fallback.on('pageerror',e=>fallbackErrors.push(e.message));
 await fallback.goto(base,{waitUntil:'networkidle'});
 assert.equal(await fallback.locator('.project').count(),4);
 await fallback.locator('#motion-toggle').click();
 assert.equal(await fallback.locator('#motion-toggle').getAttribute('aria-pressed'),'false');
 await fallback.getByRole('button',{name:'Data',exact:true}).click();
 assert.equal(await fallback.locator('.project:visible h3').innerText(),'GeneCheck');
 assert.deepEqual(fallbackErrors,[]);await blocked.close();
 assert.deepEqual(errors,[]);
 assert.deepEqual(badResponses,[]);
 console.log(JSON.stringify({viewports:[320,390,768,1024,1440],axeScans,violations:0,horizontalOverflow:false,keyboardSkipLink:'passed',projectNavigation:'passed',reducedMotion:'passed',narrowZoomLayout:'passed',clipboardSuccessAndFailure:'mocked and passed',noJavaScript:'passed',projectFilters:'passed',activeNavigation:'passed',pointerTilt:'passed',motionPreferencePersistence:'passed',systemReducedMotion:'passed',storageDeniedAndObserverUnavailable:'passed',consoleErrors:0,failedLocalResources:0,screenshots}));
}finally{await browser.close();}
