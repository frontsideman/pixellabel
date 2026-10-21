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
    for (const [selector, value] of [
      ['meta[property="og:type"]', "website"],
      ['meta[property="og:site_name"]', "Alex Sekunau"],
      ['meta[property="og:locale"]', "en_US"],
      ['meta[property="og:title"]', "Aliaksandr Sekunau | Senior Frontend Engineer"],
      ['meta[property="og:image:secure_url"]', "https://pixellabel.com/og-image.jpg"],
      ['meta[property="og:image:type"]', "image/jpeg"],
      ['meta[property="og:image:width"]', "1200"],
      ['meta[property="og:image:height"]', "630"],
      ['meta[property="og:image:alt"]', "Alex Sekunau — illustrated frontend engineer portfolio"],
      ['meta[name="twitter:card"]', "summary_large_image"],
      ['meta[name="twitter:title"]', "Aliaksandr Sekunau | Senior Frontend Engineer"],
      ['meta[name="twitter:image:alt"]', "Alex Sekunau — illustrated frontend engineer portfolio"],
      ['meta[name="author"]', "Aliaksandr Sekunau"],
    ])
      assert.equal(
        await page.locator(selector).getAttribute("content"),
        value,
        selector,
      );
    assert.equal(
      await page.locator('meta[name="robots"]').getAttribute("content"),
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    assert.equal(
      await page.locator('link[rel="sitemap"]').getAttribute("href"),
      "https://pixellabel.com/sitemap.xml",
    );
    assert.equal(
      await page.locator('meta[property="og:description"]').getAttribute("content"),
      await page.locator('meta[name="twitter:description"]').getAttribute("content"),
    );
    const title = await page.title();
    assert(title.length <= 60 && title.length >= 20, `title length ${title.length}`);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    assert(
      description.length >= 120 && description.length <= 160,
      `description length ${description.length}`,
    );
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .getAttribute("content");
    assert(
      ogDescription.length >= 60 && ogDescription.length <= 120,
      `og description length ${ogDescription.length}`,
    );
    const structured = JSON.parse(
      await page.locator('script[type="application/ld+json"]').textContent(),
    );
    assert.equal(structured["@context"], "https://schema.org");
    const graph = structured["@graph"];
    assert.deepEqual(
      graph.map((node) => node["@type"]),
      ["WebSite", "ProfilePage", "Person"],
    );
    const person = graph.find((node) => node["@type"] === "Person");
    assert.equal(person.url, "https://pixellabel.com/");
    assert.equal(person.image, "https://pixellabel.com/og-image.jpg");
    assert.equal(person.jobTitle, "Senior Frontend Engineer");
    assert.deepEqual(person.sameAs, [
      "https://github.com/frontsideman",
      "https://www.linkedin.com/in/alexandr-sekunov/",
      "https://t.me/Frontend_React_Vue",
    ]);
    assert.equal(
      graph.find((node) => node["@type"] === "ProfilePage").mainEntity["@id"],
      person["@id"],
    );
    assert.equal(
      graph.find((node) => node["@type"] === "WebSite")["@id"],
      graph.find((node) => node["@type"] === "ProfilePage").isPartOf["@id"],
    );
    const ogSize = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const image = new Image();
          image.onload = () => resolve([image.naturalWidth, image.naturalHeight]);
          image.onerror = () => resolve([0, 0]);
          image.src = "/og-image.jpg";
        }),
    );
    assert.deepEqual(ogSize, [1200, 630]);
    for (const path of [
      "/favicon.svg",
      "/favicon.ico",
      "/apple-touch-icon.png",
      "/og-image.jpg",
      "/robots.txt",
      "/sitemap.xml",
    ]) {
      const response = await page.request.get(origin + path);
      assert.equal(response.status(), 200, path);
      assert(!response.headers()["content-type"].includes("text/html"), path);
    }
    const robots = await page.request.get(origin + "/robots.txt");
    assert(
      (await robots.text()).includes("Sitemap: https://pixellabel.com/sitemap.xml"),
      "robots.txt points to the sitemap",
    );
    const sitemap = await page.request.get(origin + "/sitemap.xml");
    assert(
      (await sitemap.text()).includes("<loc>https://pixellabel.com/</loc>"),
      "sitemap lists the canonical URL",
    );
    // Crawlers download the whole document, so the published entry must stay small.
    const entry = await page.request.get(origin + "/");
    const entryHtml = await entry.text();
    assert(
      entryHtml.length < 200000,
      `published entry is ${entryHtml.length} bytes`,
    );
    assert(
      entryHtml.includes('property="og:site_name"'),
      "published entry carries social metadata",
    );
    if (origin.endsWith("4173")) {
      const standalone = await page.request.get(origin + "/portfolio.html");
      const standaloneHtml = await standalone.text();
      assert(
        standaloneHtml.includes("data:image/webp;base64"),
        "standalone artifact embeds artwork",
      );
      assert(
        standaloneHtml.includes('property="og:site_name"'),
        "standalone artifact carries social metadata",
      );
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
      `${origin}: full social metadata, structured data, sitemap/robots, lightweight entry, 6 branding assets, service semantics and readable responsive type passed`,
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
