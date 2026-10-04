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
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior),'auto');
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
 assert.ok(await plain.locator('a[href="mailto:pariharharsh1234@gmail.com"]').count());
 await noJs.close();
 assert.deepEqual(errors,[]);
 assert.deepEqual(badResponses,[]);
 console.log(JSON.stringify({viewports:[320,390,768,1024,1440],axeScans,violations:0,horizontalOverflow:false,keyboardSkipLink:'passed',projectNavigation:'passed',reducedMotion:'passed',narrowZoomLayout:'passed',clipboardSuccessAndFailure:'mocked and passed',noJavaScript:'passed',consoleErrors:0,failedLocalResources:0,screenshots}));
}finally{await browser.close();}
