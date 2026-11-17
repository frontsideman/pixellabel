import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

const url = process.env.QA_URL || 'http://localhost:4173/';
const localChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const requestedExecutable = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
const executablePath = requestedExecutable && existsSync(requestedExecutable)
  ? requestedExecutable
  : existsSync(localChrome)
    ? localChrome
    : undefined;
const browser = await chromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const passed = [];
const failed = [];
const failedArtwork = [];
page.on('response', response => {
  if (response.status() >= 400 && response.url().includes('/artwork/')) failedArtwork.push(response.url());
});
const check = (name, value) => (value ? passed : failed).push(name);

try {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.evaluate(() => document.fonts.ready);

  check(
    'Section navigation uses aria-current="location"',
    await page.locator('.desktop-nav a[aria-current]').evaluateAll(
      links => links.length > 0 && links.every(link => link.getAttribute('aria-current') === 'location'),
    ),
  );
  check(
    'Every button declares type="button"',
    (await page.locator('button:not([type])').count()) === 0,
  );
  check(
    'Same-tab Telegram links suppress the referrer',
    await page.locator('a[href^="https://t.me/"]').evaluateAll(
      links => links.length > 0 && links.every(link => link.relList.contains('noreferrer')),
    ),
  );

  const triggers = page.locator('.project-open');
  check(
    'Project triggers expose concise dialog semantics',
    await triggers.evaluateAll(elements =>
      elements.length > 0 &&
      elements.every(element => {
        const label = element.getAttribute('aria-label') || '';
        return (
          element.matches('a.project-open') &&
          element.getAttribute('href') === '#projects' &&
          element.getAttribute('aria-haspopup') === 'dialog' &&
          element.getAttribute('aria-controls') === 'project-dialog' &&
          element.getAttribute('aria-expanded') === 'false' &&
          label.length > 10 &&
          label.length < 80
        );
      }),
    ),
  );
  const firstTrigger = triggers.first();
  const hashBefore = await page.evaluate(() => location.hash);
  await firstTrigger.click();
  await page.waitForTimeout(200);
  check(
    'Project trigger sets aria-expanded on open',
    (await firstTrigger.getAttribute('aria-expanded')) === 'true',
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  check(
    'Project trigger clears aria-expanded on close',
    (await firstTrigger.getAttribute('aria-expanded')) === 'false',
  );
  await firstTrigger.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  check(
    'Project trigger opens from the keyboard without changing the URL',
    (await page.locator('#project-dialog').evaluate(dialog => dialog.open)) &&
      (await page.evaluate(() => location.hash)) === hashBefore,
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);

  const menuToggle = page.locator('.menu-toggle');
  await menuToggle.click();
  await page.waitForTimeout(150);
  check(
    'Menu trigger announces the open state',
    (await menuToggle.getAttribute('aria-label')) === 'Close navigation menu' &&
      (await page.locator('#menu').evaluate(dialog => dialog.open)),
  );
  const menuArtwork = {
    home: 'hero',
    about: 'about',
    skills: 'skills',
    experience: 'experience',
    services: 'services',
    projects: 'projects',
    collaboration: 'about',
    contact: 'contact',
  };
  const menuFailures = [];
  for (const link of await page.locator('#menu [data-menu-theme]').all()) {
    const theme = await link.getAttribute('data-menu-theme');
    await link.focus();
    await page.waitForTimeout(350);
    const activeImage = page.locator('#menu .menu-image.active');
    const source = (await activeImage.getAttribute('src')) || '';
    const loaded = await activeImage.evaluate(image => image.complete && image.naturalWidth > 0);
    if (!source.includes(`/artwork/${menuArtwork[theme]}.webp`) || !loaded) menuFailures.push(theme);
  }
  check('Every menu theme shows its artwork', menuFailures.length === 0 && failedArtwork.length === 0);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  check(
    'Menu trigger restores its closed label',
    (await menuToggle.getAttribute('aria-label')) === 'Open navigation menu',
  );

  check(
    'DM Sans exposes a variable weight axis',
    await page.evaluate(() =>
      [...document.fonts].some(
        font => font.family.replace(/["']/g, '') === 'DM Sans' && font.weight.includes(' '),
      ),
    ),
  );
  check(
    'Caveat exposes a variable weight axis',
    await page.evaluate(() =>
      [...document.fonts].some(
        font => font.family.replace(/["']/g, '') === 'Caveat' && font.weight.includes(' '),
      ),
    ),
  );
  check(
    'Type synthesis is disabled',
    (await page.evaluate(() => getComputedStyle(document.body).fontSynthesis)) === 'none',
  );

  const transition = await page.evaluate(() => {
    const button = document.querySelector('.button');
    const root = document.documentElement;
    const duration = () => getComputedStyle(button).transitionDuration.split(',')[0].trim();
    const before = duration();
    root.style.setProperty('--motion-speed', '2');
    const after = duration();
    root.style.removeProperty('--motion-speed');
    return { before, after };
  });
  check(
    '--motion-speed scales UI transitions',
    transition.before === '0.5s' && transition.after === '0.25s',
  );

  await page.locator('#skills').scrollIntoViewIfNeeded();
  const reactTech = page.locator('.tech[data-family="react"]').first();
  const vueTech = page.locator('.tech[data-family="vue"]').first();
  await reactTech.hover();
  await page.waitForTimeout(100);
  check(
    'Related-stack highlight marks the hovered family',
    await reactTech.evaluate(element => element.classList.contains('related')),
  );
  check(
    'Related-stack highlight dims other families',
    await vueTech.evaluate(element => element.classList.contains('dimmed')),
  );
  await page.mouse.move(2, 2);
  await page.waitForTimeout(100);
  check(
    'Related-stack highlight resets on pointer leave',
    await reactTech.evaluate(element => !element.classList.contains('related')) &&
      (await vueTech.evaluate(element => !element.classList.contains('dimmed'))),
  );

  await page.locator('#services').scrollIntoViewIfNeeded();
  const preview = page.locator('.service-preview');
  const serviceCard = page.locator('.service[data-service="apps"]');
  const hasPreview = (await preview.count()) === 1;
  const hasServiceCard = (await serviceCard.count()) === 1;
  check('Service artwork preview exists', hasPreview);
  check('Service cards expose data-service', hasServiceCard);
  if (hasPreview && hasServiceCard) {
    const section = page.locator('#services');
    const beforeColor = await section.evaluate(element => getComputedStyle(element).backgroundColor);
    await serviceCard.hover();
    await page.waitForTimeout(650);
    check(
      'Service preview becomes visible on hover',
      (await preview.evaluate(element => Number.parseFloat(getComputedStyle(element).opacity))) > 0.5,
    );
    check(
      'Service preview uses the mapped artwork',
      await preview.locator('img').evaluate(image => image.src.includes('consensus.webp')),
    );
    check(
      'Service palette changes on hover',
      (await section.evaluate(element => getComputedStyle(element).backgroundColor)) !== beforeColor,
    );
    await page.mouse.move(2, 2);
    await page.waitForTimeout(650);
    check(
      'Service preview resets on pointer leave',
      (await preview.evaluate(element => Number.parseFloat(getComputedStyle(element).opacity))) < 0.05,
    );
    check(
      'Service palette resets on pointer leave',
      (await section.evaluate(element => getComputedStyle(element).backgroundColor)) === beforeColor,
    );
  }

  const reducedContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.addInitScript(() => localStorage.setItem('portfolio-motion-v2', 'reduced'));
  await reducedPage.goto(url, { waitUntil: 'networkidle' });
  await reducedPage.locator('#skills').scrollIntoViewIfNeeded();
  const reducedReact = reducedPage.locator('.tech[data-family="react"]').first();
  const reducedVue = reducedPage.locator('.tech[data-family="vue"]').first();
  await reducedReact.hover();
  await reducedPage.waitForTimeout(100);
  check(
    'Related-stack highlight is disabled in reduced motion',
    await reducedReact.evaluate(element => !element.classList.contains('related')) &&
      (await reducedVue.evaluate(element => !element.classList.contains('dimmed'))),
  );
  await reducedPage.locator('#services').scrollIntoViewIfNeeded();
  const reducedPreview = reducedPage.locator('.service-preview');
  const reducedService = reducedPage.locator('.service[data-service="apps"]');
  if ((await reducedPreview.count()) === 1 && (await reducedService.count()) === 1) {
    const reducedSection = reducedPage.locator('#services');
    const reducedColor = await reducedSection.evaluate(element => getComputedStyle(element).backgroundColor);
    await reducedService.hover();
    await reducedPage.waitForTimeout(650);
    check(
      'Service preview is disabled in reduced motion',
      (await reducedPreview.evaluate(element => Number.parseFloat(getComputedStyle(element).opacity))) < 0.05,
    );
    check(
      'Service palette is disabled in reduced motion',
      (await reducedSection.evaluate(element => getComputedStyle(element).backgroundColor)) === reducedColor,
    );
  }
  await reducedContext.close();

  const cname = await page.request.get(new URL('/CNAME', url).href);
  check(
    'CNAME is served from the published root',
    cname.ok() && (await cname.text()).trim() === 'pixellabel.com',
  );

  const standalone = await page.request.get(new URL('/portfolio.html', url).href);
  const standaloneHtml = standalone.ok() ? await standalone.text() : '';
  check(
    'Standalone artifact is marked noindex',
    /<meta name="robots" content="noindex/.test(standaloneHtml),
  );

  console.log(JSON.stringify({ passed: passed.length, failed }, null, 2));
  if (failed.length) process.exitCode = 1;
} finally {
  await browser.close();
}
