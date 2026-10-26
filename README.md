# Alex Sekunau — illustrated frontend portfolio

A static, English-language portfolio based on the supplied implementation brief and composition reference. HTML, CSS, vanilla ES modules and Vite. No backend or framework. Application assets are self-hosted; Yandex Metrica is the only third-party runtime script.

## Run

Requires Node.js 24 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:5173/.

```sh
npm run build
npm run preview
```

The production site is in `dist/`. Serve that entire directory from any static web host. `base: './'` supports hosting under a subdirectory. Each build publishes two artifacts in the project root and in `dist/`. The published entry `index.html` is the lightweight Vite output (about 42 KB) with the `assets/`, `artwork/` and `icons/` folders beside it; hashed font files live in `assets/`, and `fonts/` contains their license notices. The standalone `portfolio.html` embeds artwork, fonts, CSS and JavaScript into one 7.5 MB file that opens by double-clicking, with no server or redirect needed. Only edit src/index.html and source modules; rebuild to refresh both artifacts. The root files and folders are committed so a clone or a static host can open the portfolio immediately.

The published entry stays small on purpose. Link-preview crawlers — Telegram's TelegramBot, Facebook, WhatsApp, Slack, Discord, LinkedIn — download the whole document before they read a single Open Graph tag, so a multi-megabyte single-file entry slows the preview, risks a fetch timeout and delays the first byte for every visitor. The standalone artifact keeps that convenience without putting its weight on the served page.

## Included interactions

- Separate city and transparent character/car artwork, cloud planes, sun haze, palm and plane layers compose with restrained scroll/pointer parallax.
- One-time skippable intro; section entrances; proximity-reactive heading letters.
- Fullscreen native-dialog navigation with artwork/palette crossfades on pointer and keyboard focus.
- Bounded sticky desktop project panorama; mobile/touch/reduced-motion native scroll-snap carousel, controls and arrow keys.
- Four own-project summaries in accessible detail dialogs; modest card tilt and preview scale.
- Related-stack highlights, service artwork previews, service palette changes and scroll-drawn career route.
- Two seamless opposite-direction marquees, iridescent CTA rims, clouds, occasional plane/traffic, subtle sky/haze, palm sway and neon breathing.
- Ambient animation pauses outside the viewport or on document visibility changes. There is no idle JavaScript animation loop.
- Motion is enabled by default per the owner’s request, including when the OS requests reduced motion. A persistent manual toggle can disable animations. The preference is stored in `localStorage` under `portfolio-motion-v2`; older keys are ignored. Native cursor remains usable; the extra cursor appears only with fine pointers and motion enabled. UI transition speed is globally tunable through the `--motion-speed` CSS token (default `1`); ambient loops keep their own durations.

## Content and configuration

The source page, professional facts and supplied contact destinations are in `src/index.html`. Extended project summaries are in `src/scripts/projects.js`. Change both when updating projects. Styles are split into `src/styles/base.css` (fonts, tokens and shared components), `src/styles/sections.css` (page scenes and content), and `src/styles/main.css` (imports, motion, responsive states and final component layers); environmental lifecycle and motion preference code live in `src/scripts/motion.js`. Font binaries live in `src/fonts/`, so Vite can fingerprint them and the published page can preload them.

Professional dates, roles, Telegram, LinkedIn and GitHub destinations are drawn from the supplied CV. AllergenChecker, Competition, AIBook and BestAutoService.by were supplied directly by the owner. AllergenChecker uses barcode scans and ingredient-list photos to help identify allergens. Competition supports goal-based competitions in private groups around activity, reading, steps and other goals supported by the Apple ecosystem, using iPhone and Apple Watch. AIBook's technology and product details remain unspecified. BestAutoService.by includes WordPress development, design, content and SEO, and its project dialog links to the public website supplied by the owner. The previous Competition entry was updated rather than duplicated. No release, availability or current location is claimed. Contact supports Telegram, LinkedIn and GitHub. Project artwork is conceptual, not product screenshots. The CV itself is not copied to the public site.

Canonical and Open Graph URL use https://pixellabel.com/ from CNAME. The head carries a complete sharing set: canonical, description, author and `robots` (with `max-image-preview:large`), twelve Open Graph properties (`type`, `site_name`, `locale`, `url`, `title`, `description`, `image`, `image:secure_url`, `image:type`, `image:width`, `image:height`, `image:alt`), five Twitter/X cards (`summary_large_image`, `title`, `description`, `image`, `image:alt`) and a `sitemap` link. Both published artifacts carry the same social metadata; `index.html` is indexable, while the standalone `portfolio.html` is marked `noindex, follow` so it cannot compete with the canonical page in search results. Open Graph/Twitter image metadata points to og-image.jpg, a 1200×630 JPEG export of the original hero artwork, shared with the JSON-LD graph. SVG/ICO favicon and Apple touch PNG are included; build copies their public assets to the repository root for static hosting and embeds the icons into standalone HTML. JSON-LD is a linked graph of `WebSite` → `ProfilePage` → `Person`, with `url`, `image`, `description` and the public `sameAs` profiles (GitHub, LinkedIn, Telegram). robots.txt allows crawling and points to sitemap.xml, which lists the canonical URL; both files are copied to the repository root by the build, because static hosting serves the repository root. Update the domain metadata if hosting elsewhere.

## Browser verification

```sh
npm run preview
npm run qa
npm run qa:polish
```

QA defaults to http://localhost:4173/; override with `QA_URL`. Set `QA_IDLE_SECONDS=0` for content-only verification without repeating the unchanged ambient-motion benchmark. It uses local Chrome on macOS if available. Else install the Playwright browser once with `npx playwright install chromium`.

`npm run qa:polish` checks the project-dialog ARIA contract, variable-font axis, `--motion-speed`, related-stack highlights, service previews/palette, referrer policy, `CNAME` and the standalone `noindex` header.

`npm run qa:review` additionally checks social metadata, dev/production branding assets, responsive text sizes, zero/one-card carousels and interactive letters after scroll/resize. It requires both the dev server on port 5173 and the preview server on port 4173; it falls back to Playwright Chromium when local Chrome is unavailable.

The QA script verifies project/navigation dialogs, focus restoration, panorama endpoints, motion persistence, enabled default under system reduced motion, offscreen pausing, seven responsive widths, image-failure fallbacks and 60-second idle continuity. Without JavaScript, page content and contact links remain available, but the mobile menu and project dialogs require JavaScript. It writes screenshots and measured results to ignored `qa-artifacts/`. See `QA.md` for results and testing limits.

## Artwork and references

The main character in Hero, About and Experience follows `docs/persona.md`. ImageGen edit sources are preserved in `artwork-persona/`; the previous WebP artwork and social image are preserved in `artwork-originals/2026-10-09/`, outside the public build. Generative edits preserve the poses and composition, but some background details differ from the originals.

See `ASSETS.md` for provenance, dimensions and font licenses. Exported WebP/SVG/WOFF2 files are included; no asset-generation service is needed to run the site. Original generated source files are not part of the build or the public assets.

The supplied [CodePen](https://codepen.io/jh3y/pen/MYgaaem) was inspected. It demonstrates scroll-driven list brightening and hue progression, rather than the pointer-letter interaction described in the brief. The portfolio includes an original heading-proximity effect and scroll-progress milestone emphasis; it does not claim to copy a nonexistent pointer demo. [Metalab](https://www.metalab.com/) was inspected for the navigation direction; the menu implementation here is original.

Menus and project dialogs share owner-based scroll locking in src/scripts/scroll-lock.js; closing one dialog cannot release a lock held by another. The hero ground-shade layer is a static CSS contrast gradient, not another parallax image.
