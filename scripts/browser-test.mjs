import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4174';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--enable-unsafe-swiftshader']});
const screenshots='/tmp/portfolio-refinement-20261005';await fs.mkdir(screenshots,{recursive:true});
const errors=[],failed=[],badResponses=[];
const context=await browser.newContext({colorScheme:'dark'});const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push(r.url());});
let axeScans=0;
async function scan(p){await expect.poll(()=>p.locator('h1 span').evaluateAll(nodes=>nodes.every(e=>Number(getComputedStyle(e).opacity)>=.999)),{timeout:10000}).toBe(true);const result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);axeScans++;}
try{
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(base,{waitUntil:'networkidle'});
  await expect(page.locator('#about canvas')).toHaveCount(1);
  assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('[data-project]').count(),5);
  assert.equal(await page.locator('a[href*="1O71pQua7stH9YqdT9gEX88tqamr7Kqpd"]').count(),1);
  assert.equal(await page.locator('a[href*="docs.google.com"]').count(),0);
  assert.equal(await page.locator('a[href="mailto:pariharharsh1234@gmail.co"]').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'No horizontal overflow at '+width);
  assert.equal(await page.locator('a button').count(),0,'No nested interactive controls');
  for(const link of await page.getByRole('navigation',{name:'Main navigation'}).locator('a').all())assert.ok((await link.boundingBox()).height>=44,'44px navigation target');
  const geometry=await page.locator('[data-project]').evaluateAll(nodes=>nodes.map(shell=>{const card=shell.querySelector('a>div>div');const bounds=card.getBoundingClientRect();const secondary=shell.querySelector('.project-secondary')?.getBoundingClientRect();return{title:shell.dataset.project,left:bounds.left,right:bounds.right,clip:bounds.bottom>shell.getBoundingClientRect().bottom,overlap:secondary?bounds.bottom>secondary.top:false};}));
  for(const card of geometry){assert.ok(card.left>=0&&card.right<=width,'Card inside viewport: '+card.title);assert.equal(card.clip,false,'Card not clipped: '+card.title);assert.equal(card.overlap,false,'Secondary action not covered: '+card.title);}
  await expect(page.locator('#experience')).toContainText('SAIG');await expect(page.locator('#experience')).toContainText('Brainwave');
  await expect(page.locator('body')).not.toContainText('Apexplanet');
  await scan(page);
  if([390,1440].includes(width))await page.screenshot({path:screenshots+'/restored-'+width+'.png',fullPage:true});
 }
 await page.goto(base,{waitUntil:'networkidle'});await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(e=>e===document.activeElement),true);await page.keyboard.press('Enter');assert.equal(await page.locator('#main').evaluate(e=>e===document.activeElement),true);
 await page.getByRole('link',{name:'Show my work'}).click();assert.match(page.url(),/#projects$/);
 // Verify visible frame changes rather than only the existence of canvas/animation nodes.
 const globe=page.locator('#about canvas');await globe.scrollIntoViewIfNeeded();const frame=await globe.screenshot();await page.waitForTimeout(300);assert.equal(frame.equals(await globe.screenshot()),false,'Globe animation advances');
 const border=page.locator('#experience article').first().locator('div.absolute').first();await page.locator('#experience').scrollIntoViewIfNeeded();const initialBorder=await border.innerHTML();await expect.poll(()=>border.innerHTML()).not.toBe(initialBorder);
 const pin=page.locator('[data-project="DoxChat AI"] > a').first();await pin.scrollIntoViewIfNeeded();await pin.hover();
 await expect.poll(()=>pin.locator('div').nth(1).getAttribute('style')).toContain('rotateX(40deg) scale(0.92)');
 await page.mouse.move(0,0);await pin.focus();await expect.poll(()=>pin.locator('div').nth(1).getAttribute('style')).toContain('rotateX(40deg)');
 const approach=page.locator('[class*="group/canvas-card"]').first();await approach.focus();await expect(approach.locator('canvas')).toHaveCount(1);
 await expect.poll(()=>approach.locator('h3').evaluate(e=>getComputedStyle(e).opacity)).toBe('1');const canvasFrame=await approach.locator('canvas').screenshot();await page.waitForTimeout(750);assert.equal(canvasFrame.equals(await approach.locator('canvas').screenshot()),false,'Approach canvas animation advances');await approach.screenshot({path:screenshots+'/approach-active.png'});await scan(page);
 // The built-in copy action is checked with isolated browser stubs, never real outreach.
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copiedEmail=text;}}}));
 const confetti=page.getByRole('button',{name:'Copy my email address'}).locator('..').locator('div.absolute svg');const beforeConfetti=await confetti.innerHTML();await page.getByRole('button',{name:'Copy my email address'}).click();await expect.poll(()=>page.getByRole('button',{name:'Email is Copied!'}).locator('..').locator('div.absolute svg').innerHTML()).not.toBe(beforeConfetti);await expect(page.getByRole('status')).toHaveText('Email address copied.');assert.equal(await page.evaluate(()=>window.copiedEmail),'pariharharsh1234@gmail.com');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied');}}}));await page.getByRole('button',{name:'Email is Copied!'}).click();await expect(page.getByRole('status')).toContainText('Could not copy automatically');
 await page.locator('#motion-toggle').click();await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed','false');await expect(page.locator('#about canvas')).toHaveCount(0);await expect(page.locator('.globe-still')).toBeVisible();
 await expect.poll(()=>page.locator('h1 span').first().evaluate(e=>getComputedStyle(e).opacity)).toBe('1');
 await page.reload({waitUntil:'networkidle'});await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed','false');await expect(page.locator('#about canvas')).toHaveCount(0);await scan(page);
 await page.locator('#motion-toggle').click();await expect(page.locator('#about canvas')).toHaveCount(1);await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed','true');
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('#motion-toggle')).toBeDisabled();await expect(page.locator('#about canvas')).toHaveCount(0);await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed','false');await scan(page);
 await page.setViewportSize({width:640,height:450});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const plain=await noJs.newPage();await plain.goto(base);assert.equal(await plain.locator('[data-project]').count(),5);assert.equal(await plain.locator('#motion-toggle').isVisible(),false);assert.equal(await plain.locator('h1 span').first().evaluate(e=>getComputedStyle(e).opacity),'1');await noJs.close();
 const touch=await browser.newContext({isMobile:true,hasTouch:true,viewport:{width:390,height:844}});await touch.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('storage denied');}});const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){return kind==='webgl2'?null:get.call(this,kind,...args);};});const mobile=await touch.newPage();const fallbackErrors=[];mobile.on('pageerror',e=>fallbackErrors.push(e.message));await mobile.goto(base,{waitUntil:'networkidle'});await expect(mobile.locator('.globe-still')).toBeVisible();const card=mobile.locator('[class*="group/canvas-card"]').first();await card.scrollIntoViewIfNeeded();assert.equal(await card.locator('h3').evaluate(e=>getComputedStyle(e).opacity),'1');await mobile.locator('#motion-toggle').click();await expect(mobile.locator('#motion-toggle')).toHaveAttribute('aria-pressed','false');await scan(mobile);assert.deepEqual(fallbackErrors,[]);await touch.close();
 assert.deepEqual(errors,[],'Console and hydration errors');assert.deepEqual(failed,[],'Failed network requests');assert.deepEqual(badResponses,[],'Failed same-origin responses');
 console.log(JSON.stringify({base,viewports:[320,390,768,1024,1440],axeScans,violations:0,originalGlobe:'rendering and frame changes passed',movingBorder:'frame changes passed',navigationTargets:'44px passed',cardGeometry:'passed',originalPinHoverAndKeyboard:'passed',originalCanvasHoverKeyboard:'interaction and frame changes passed',currentContent:'passed',clipboardSuccessAndFailure:'mocked and passed',motionControlAndPersistence:'passed',systemReducedMotion:'passed',noJavaScript:'passed',touchStorageAndWebGLFallback:'passed',consoleErrors:0,failedResources:0,screenshots}));
}finally{await browser.close();}
