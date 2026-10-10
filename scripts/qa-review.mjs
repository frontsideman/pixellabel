import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
try {
  const page = await browser.newPage({
    viewport: { width: 1296, height: 773 },
    reducedMotion: "no-preference",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const origin of ["http://localhost:5173", "http://localhost:4173"]) {
    await page.goto(origin, { waitUntil: "networkidle" });
    assert.equal(
      await page.locator("link[rel=canonical]").getAttribute("href"),
      "https://pixellabel.com/",
    );
    assert.equal(
      await page.locator('meta[property="og:url"]').getAttribute("content"),
      "https://pixellabel.com/",
    );
    for (const selector of [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
    ])
      assert.equal(
        await page.locator(selector).getAttribute("content"),
        "https://pixellabel.com/og-image.jpg",
      );
    for (const path of [
      "/favicon.svg",
      "/favicon.ico",
      "/apple-touch-icon.png",
      "/og-image.jpg",
    ]) {
      const response = await page.request.get(origin + path);
      assert.equal(response.status(), 200, path);
      assert(!response.headers()["content-type"].includes("text/html"), path);
    }
    assert.equal(await page.locator(".service[tabindex]").count(), 0);
    for (const width of [320, 375, 768, 1296]) {
      await page.setViewportSize({ width, height: 773 });
      assert(
        await page
          .locator(".tech")
          .evaluateAll((els) =>
            els.every((e) => parseFloat(getComputedStyle(e).fontSize) >= 12),
          ),
      );
      assert(
        await page
          .locator(".career-date, .portrait-label, .service p")
          .evaluateAll((els) =>
            els.every((e) => parseFloat(getComputedStyle(e).fontSize) >= 11),
          ),
      );
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${origin} ${width}px overflow`,
      );
    }
    console.log(
      `${origin}: social metadata, 4 branding assets, service semantics and readable responsive type passed`,
    );
  }
  for (const total of [0, 1]) {
    const small = await browser.newPage({
      viewport: { width: 1296, height: 773 },
    });
    const faults = [];
    small.on("pageerror", (e) => faults.push(e.message));
    await small.route("http://localhost:5173/", async (route) => {
      const response = await route.fetch();
      let html = await response.text();
      let count = 0;
      html = html.replace(
        /<article class="project-card"[\s\S]*?<\/article>/g,
        (card) => (count++ < total ? card : ""),
      );
      await route.fulfill({ response, body: html });
    });
    await small.goto("http://localhost:5173/", { waitUntil: "networkidle" });
    assert.equal(await small.locator(".project-card").count(), total);
    assert.equal(
      await small.locator(".project-count").textContent(),
      total ? "5.1 / 5.1" : "5.0 / 5.0",
    );
    assert(await small.locator("[data-project-prev]").isDisabled());
    assert(await small.locator("[data-project-next]").isDisabled());
    await small.setViewportSize({ width: 375, height: 812 });
    await small.locator("#motion-toggle").click();
    assert.deepEqual(faults, []);
    await small.close();
    console.log(
      `${total}-card carousel: initialization, resize and motion toggle passed`,
    );
  }
  await page.setViewportSize({ width: 1296, height: 773 });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await page
    .locator("#about-title")
    .evaluate((e) =>
      e.scrollIntoView({ behavior: "instant", block: "center" }),
    );
  await page.waitForTimeout(650);
  const letter = page
    .locator("#about-title .word")
    .last()
    .locator(".char")
    .first();
  const point = async () => {
    const r = await letter.boundingBox();
    await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
    await page.waitForTimeout(50);
  };
  await point();
  await page.evaluate(() => scrollBy({ top: 70, behavior: "instant" }));
  await page.waitForTimeout(550);
  await point();
  assert(
    await letter.evaluate(
      (e) => parseFloat(e.style.getPropertyValue("--letter-y")) < -5,
    ),
  );
  await page.setViewportSize({ width: 1100, height: 773 });
  await page.waitForTimeout(550);
  await point();
  assert(
    await letter.evaluate(
      (e) => parseFloat(e.style.getPropertyValue("--letter-y")) < -5,
    ),
  );
  assert.deepEqual(errors, []);
  const css = await readFile("src/styles/sections.css", "utf8");
  assert(!/\.tech b|\.[\w-]+-symbol\b/.test(css));
  console.log(
    "Interactive lettering tracks scroll/resize; obsolete technology glyph styles removed",
  );
} finally {
  await browser.close();
}
