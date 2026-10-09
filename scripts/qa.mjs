import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const url = process.env.QA_URL || 'http://localhost:4173/';
const localChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({ headless: true, ...(existsSync(localChrome) ? { executablePath: localChrome } : {}) });
const results = [], errors = [], failedAssets = [];
await mkdir('qa-artifacts', { recursive: true });
const check = (name, value) => { assert.ok(value, name); results.push({ check: name, passed: true }); };
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on('pageerror', e => errors.push(e.message));
page.on('response', response => { if(response.status()>=400 && new URL(response.url()).origin===new URL(url).origin) failedAssets.push(`${response.status()} ${response.url()}`); });
await page.addInitScript(() => {
  window.qaMetrics={cls:0,lcp:0};
  new PerformanceObserver(list => list.getEntries().forEach(e => { if(!e.hadRecentInput) window.qaMetrics.cls+=e.value; })).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(list => list.getEntries().forEach(e => window.qaMetrics.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
});
try {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  check('Eight semantic sections and one h1', await page.locator('main section[id]').count()===8 && await page.locator('h1').count()===1);
  check('Desktop project panorama pins', await page.locator('#projects').evaluate(e=>e.classList.contains('is-pinned')));
  for(const id of ['home','about','skills','experience','services','projects','collaboration','contact']) {
    await page.locator(`#${id}`).evaluate(e=>e.scrollIntoView({behavior:'instant'}));
    await page.waitForTimeout(250);
  }
  // Explicitly request lazy assets in the native carousel by navigating through every stop.
  const sectionTop=await page.locator('#projects').evaluate(e=>e.getBoundingClientRect().top+scrollY);
  await page.evaluate(top=>scrollTo({top,behavior:'instant'}),sectionTop);
  await page.waitForTimeout(150);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.mouse.move(1100,250);await page.waitForTimeout(550);
  check('Pointer parallax separates foreground and skyline', await page.evaluate(()=>{const foreground=new DOMMatrix(getComputedStyle(document.querySelector('.hero-subject')).transform),background=new DOMMatrix(getComputedStyle(document.querySelector('.hero-art')).transform);return Math.abs(foreground.m41-background.m41)>8;}));
  await page.mouse.move(700,50);
  await page.evaluate(()=>scrollTo({top:300,behavior:'instant'}));await page.waitForTimeout(550);
  check('Scroll parallax creates visible hero depth', await page.evaluate(()=>{const foreground=new DOMMatrix(getComputedStyle(document.querySelector('.hero-subject')).transform),background=new DOMMatrix(getComputedStyle(document.querySelector('.hero-art')).transform);return foreground.m42-background.m42>60;}));
  await page.locator('#skills').evaluate(e=>e.scrollIntoView({behavior:'instant'}));await page.waitForTimeout(100);
  await page.waitForTimeout(500);
  const skillBefore=await page.locator('#skills .section-background').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).m42);
  await page.evaluate(()=>scrollBy({top:200,behavior:'instant'}));await page.waitForTimeout(550);
  check('Skills artwork moves independently of content on scroll', await page.locator('#skills .section-background').evaluate((e,before)=>Math.abs(new DOMMatrix(getComputedStyle(e).transform).m42-before)>15,skillBefore));
  await page.evaluate(top=>scrollTo({top,behavior:'instant'}),sectionTop);await page.waitForTimeout(150);
  const projectCount = await page.locator('.project-card').count();
  for(let i=0;i<projectCount-1 && !(await page.locator('[data-project-next]').isDisabled());i++) { await page.locator('[data-project-next]').click(); await page.waitForTimeout(750); }
  check('Panorama reaches the final project', (await page.locator('.project-count').textContent()).trim()===`5.${projectCount} / 5.${projectCount}`);
  check('Last project is visible', await page.locator('[data-project="auto"]').evaluate(e=>{const r=e.getBoundingClientRect();return r.right<=innerWidth+1 && r.left>=0;}));
  await page.locator('[data-project="auto"] .project-open').click();
  check('Project detail dialog opens with correct content', await page.locator('#project-dialog').evaluate(e=>e.open) && (await page.locator('#project-dialog-title').textContent())==='BestAutoService.by');
  await page.keyboard.press('Escape');
  check('Project dialog Escape restores focus', await page.locator('[data-project="auto"] .project-open').evaluate(e=>e===document.activeElement));
  await page.locator('.menu-toggle').click();
  check('Menu opens and locks document scrolling', await page.locator('#menu').evaluate(e=>e.open) && await page.locator('body').evaluate(e=>e.classList.contains('scroll-locked')));
  await page.locator('#menu a[href="#skills"]').focus(); await page.waitForTimeout(750);
  check('Keyboard focus changes menu artwork and palette', await page.locator('#menu').evaluate(e=>e.style.getPropertyValue('--menu-color')==='#abeb7a') && await page.locator('#menu .menu-image.active').evaluate(e=>e.src===document.querySelector('#skills .section-background img').src));
  await page.keyboard.press('Escape');
  check('Menu Escape restores trigger focus', await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement));
  await page.locator('.menu-toggle').click(); await page.locator('#menu a[href="#contact"]').click();await page.waitForFunction(()=>document.querySelector('#contact').getBoundingClientRect().top<innerHeight*.5);
  check('Menu anchor closes and navigates', !(await page.locator('#menu').evaluate(e=>e.open)) && await page.locator('#contact').evaluate(e=>e.getBoundingClientRect().top<innerHeight*.5 && e.getBoundingClientRect().bottom>0));
  check('Duplicate marquee groups have equal widths', await page.locator('.marquee').evaluateAll(els=>els.every(el=>{const g=el.querySelectorAll('.marquee-group');return Math.abs(g[0].getBoundingClientRect().width-g[1].getBoundingClientRect().width)<.01;})));
  check('Offscreen ambient scene pauses', await page.locator('#home').evaluate(e=>e.dataset.active==='false') && await page.locator('.clouds-far').evaluate(e=>getComputedStyle(e).animationPlayState==='paused'));
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
  check('Hidden-page lifecycle handler pauses every scene', await page.locator('[data-scene]').evaluateAll(els=>els.every(e=>e.dataset.active==='false')));
  await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
  await page.locator('#motion-toggle').click();
  check('Manual reduced motion disables pinning and animation', await page.evaluate(()=>document.documentElement.dataset.motion==='reduced') && !(await page.locator('#projects').evaluate(e=>e.classList.contains('is-pinned'))) && await page.locator('.clouds-far').evaluate(e=>getComputedStyle(e).animationName==='none'));
  check('Reduced mode resets all parallax layers', await page.locator('.hero-subject, #skills .section-background, #contact .section-background, .experience-scene').evaluateAll(els=>els.every(e=>getComputedStyle(e).transform==='none')));
  await page.reload({waitUntil:'networkidle'});
  check('Motion choice persists after reload', await page.evaluate(()=>document.documentElement.dataset.motion==='reduced'));
  for(const width of [320,375,768,1024,1440,1920,2560]) {
    await page.setViewportSize({width,height:1000});await page.waitForTimeout(150);
    check(`No document overflow at ${width}px`, await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    check(`Headings fit at ${width}px`, await page.locator('main h1 .word,main h2 .word').evaluateAll(words=>words.filter(e=>!e.closest('.projects')).every(e=>e.getBoundingClientRect().right<=innerWidth+1)));
  }
  for(const id of ['home','about','skills','experience','services','projects','collaboration','contact']) { await page.locator(`#${id}`).evaluate(e=>e.scrollIntoView({behavior:'instant'})); await page.waitForTimeout(150); }
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'qa-artifacts/desktop.png',fullPage:true});
  await page.setViewportSize({width:375,height:812});await page.screenshot({path:'qa-artifacts/mobile.png',fullPage:true});
  check('All requested images load', await page.locator('img:not(dialog img)').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0)));
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:812}});const fallback=await nojs.newPage();await fallback.goto(url);
  check('No-JS fallback keeps all content and real contact links', await fallback.locator('main section[id]').count()===8 && await fallback.locator('#contact a[href="https://www.linkedin.com/in/alexandr-sekunov/"]').count()===1 && await fallback.locator('#contact .button').getAttribute('href')==='https://t.me/Frontend_React_Vue' && await fallback.locator('h1').isVisible());
  await nojs.close();
  const system=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:1000}});const reduced=await system.newPage();await reduced.goto(url,{waitUntil:'networkidle'});
  check('Requested default motion stays enabled with system reduced-motion preference', await reduced.evaluate(()=>document.documentElement.dataset.motion==='on') && await reduced.locator('#projects').evaluate(e=>e.classList.contains('is-pinned')));await system.close();
  const blocked=await browser.newContext();const imagefree=await blocked.newPage();await imagefree.route('**/*.{webp,png,svg}',route=>route.abort());await imagefree.goto(url);
  check('Artwork failure leaves semantic content and contacts usable', await imagefree.locator('h1').isVisible() && await imagefree.locator('#contact .button').getAttribute('href')==='https://t.me/Frontend_React_Vue');await blocked.close();
  check('No runtime errors or failed local assets', errors.length===0 && failedAssets.length===0);
  check('CV timeline contains eight verified roles', await page.locator('.career-stop').count()===8 && await page.locator('.career').textContent().then(text=>['EPAM Systems','Upwork','ElligintHealth','Frontend Team Lead','Oct 2013'].every(value=>text.includes(value))));
  check('Public contact channels are present', await page.locator('#contact a[href="https://t.me/Frontend_React_Vue"]').count()===2 && await page.locator('#contact a[href="https://www.linkedin.com/in/alexandr-sekunov/"]').count()===1);
  const mobileContext=await browser.newContext({reducedMotion:'reduce',viewport:{width:375,height:812}});
  const mobile=await mobileContext.newPage();await mobile.goto(url,{waitUntil:'networkidle'});
  for(const [key,title] of [['allergenchecker','AllergenChecker'],['competition','Competition'],['aibook','AIBook'],['auto','BestAutoService.by']]) {
    await mobile.locator(`[data-project="${key}"] .project-open`).click();
    check(`Mobile details open for ${title}`, (await mobile.locator('#project-dialog-title').textContent())===title && await mobile.locator('#project-dialog').evaluate(e=>e.open));
    if(key==='allergenchecker') check('AllergenChecker includes barcode and ingredient-photo functionality', await mobile.locator('.dialog-description').textContent().then(text=>text.includes('barcode')&&text.includes('photograph')));
    await mobile.keyboard.press('Escape');
  }
  await mobileContext.close();
  let cpu=null;
  const idleSeconds=Number(process.env.QA_IDLE_SECONDS ?? 60);
  if(idleSeconds>0) {
    console.log(`Passed ${results.length} checks. Checking ${idleSeconds}-second ambient continuity…`);
    const idle=await browser.newContext({viewport:{width:1440,height:1000}});const rest=await idle.newPage();await rest.goto(url,{waitUntil:'networkidle'});await rest.waitForTimeout(2500);
    const start=await rest.locator('.clouds-far').evaluate(e=>getComputedStyle(e).transform);
    const startCpu=await rest.context().newCDPSession(rest);await startCpu.send('Performance.enable');const before=await startCpu.send('Performance.getMetrics');
    for(let remaining=idleSeconds;remaining>0;remaining-=30) await rest.waitForTimeout(Math.min(remaining,30)*1000);
    check(`Cloud drift remains active after ${idleSeconds} seconds at rest`, await rest.locator('.clouds-far').evaluate(e=>getComputedStyle(e).transform)!==start && await rest.locator('#home').evaluate(e=>e.dataset.active==='true'));
    const after=await startCpu.send('Performance.getMetrics');
    const metric=(all,name)=>all.metrics.find(m=>m.name===name)?.value;
    cpu={idleSeconds,scriptSeconds:metric(after,'ScriptDuration')-metric(before,'ScriptDuration'),taskSeconds:metric(after,'TaskDuration')-metric(before,'TaskDuration'),heapBytes:metric(after,'JSHeapUsedSize')};
    await idle.close();
  }
  const report={url,testedAt:new Date().toISOString(),results,errors,failedAssets,localMetrics:await page.evaluate(()=>window.qaMetrics),idle:cpu,note:'Local Chromium measurements, no network/CPU throttling. Hidden-page handler tested by a synthetic visibilitychange. These measurements are not Lighthouse scores.'};
  await writeFile('qa-artifacts/results.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:results.length,errors,failedAssets,idle:cpu},null,2));
} finally { await browser.close(); }
