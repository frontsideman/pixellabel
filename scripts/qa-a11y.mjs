import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
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
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const failures = [];

async function scan(name) {
  const results = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  if (results.violations.length) {
    failures.push({ name, violations: results.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.map(node => node.target.join(' ')),
    })) });
  }
}

try {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await scan('home');

  await page.locator('.menu-toggle').click();
  await page.waitForTimeout(200);
  await scan('navigation dialog');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);

  await page.locator('.project-open').first().click();
  await page.waitForTimeout(300);
  await scan('project dialog');

  await page.goto(new URL('privacy.html', url).href, { waitUntil: 'networkidle' });
  await scan('privacy page');

  console.log(JSON.stringify({ scans: 4, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
