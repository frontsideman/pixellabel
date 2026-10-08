# Alex Sekunau — illustrated frontend portfolio

A static, English-language portfolio based on the supplied implementation brief and composition reference. HTML, CSS, vanilla ES modules and Vite. No backend, framework or external runtime CDN.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open http://localhost:5173/.

```sh
npm run build
npm run preview
```

The production site is in `dist/`. Serve that entire directory from any static web host. `base: './'` supports hosting under a subdirectory. Each build generates self-contained `index.html` and `portfolio.html` files in the project root and in `dist/`, with embedded artwork, fonts, CSS and JavaScript. Open any of these files directly by double-clicking; no server or redirect is needed. The root `index.html` is committed so a clone or a static host can open the portfolio immediately. Rebuild after editing source files to refresh these outputs.

## Included interactions

- Separate city and transparent character/car artwork, cloud planes, sun haze, palm and plane layers compose with restrained scroll/pointer parallax.
- One-time skippable intro; section entrances; proximity-reactive heading letters.
- Fullscreen native-dialog navigation with artwork/palette crossfades on pointer and keyboard focus.
- Bounded sticky desktop project panorama; mobile/touch/reduced-motion native scroll-snap carousel, controls and arrow keys.
- Eight real project summaries in accessible detail dialogs; modest card tilt and preview scale.
- Related-stack highlights, service artwork previews, service palette changes and scroll-drawn career route.
- Two seamless opposite-direction marquees, iridescent CTA rims, clouds, occasional plane/traffic, subtle sky/haze, palm sway and neon breathing.
- Ambient animation pauses outside the viewport or on document visibility changes. There is no idle JavaScript animation loop.
- Motion is enabled by default per the owner’s request, including when the OS requests reduced motion. A persistent manual toggle can disable animations; legacy saved preferences are migrated to a fresh versioned setting. Native cursor remains usable; the extra cursor appears only with fine pointers and motion enabled.

## Content and configuration

The source page, professional facts and supplied contact destinations are in `src/index.html`. Extended project summaries are in `src/scripts/projects.js`. Change both when updating projects. Palette and responsive layout live in `src/styles/main.css`; environmental lifecycle and motion preference code live in `src/scripts/motion.js`.

Professional dates, roles, email and Telegram are drawn from the supplied CV. AllergenChecker, Competition, AIBook and the Nuxt/Directus corporate and marketing website with a blog were supplied directly by the owner. AllergenChecker uses barcode scans and ingredient-list photos to help identify allergens. Competition supports goal-based competitions in private groups around activity, reading, steps and other goals supported by the Apple ecosystem, using iPhone and Apple Watch. AIBook's technology and product details, the new website's brand and other public project URLs remain unspecified. BestAutoService.by includes WordPress development, design, content and SEO, and its project dialog links to the public website supplied by the owner. The previous Competition entry was updated rather than duplicated. No release, availability or current location is claimed. Contact supports email, Telegram, LinkedIn and GitHub. Project artwork is conceptual, not product screenshots. The CV itself is not copied to the public site.

There is no configured public domain: canonical URL and sitemap are deliberately omitted. Add those after selecting a domain. JSON-LD Person, description, Open Graph text, favicon and robots.txt are included.

## Browser verification

```sh
npm run preview
npm run qa
```

QA defaults to http://localhost:4173/; override with `QA_URL`. Set `QA_IDLE_SECONDS=0` for content-only verification without repeating the unchanged ambient-motion benchmark. It uses local Chrome on macOS if available. Else install the Playwright browser once with `npx playwright install chromium`.

The QA script verifies project/navigation dialogs, focus restoration, panorama endpoints, motion persistence, enabled default under system reduced motion, offscreen pausing, seven responsive widths, no-JS/image-failure fallbacks and 60-second idle continuity. It writes screenshots and measured results to ignored `qa-artifacts/`. See `QA.md` for results and testing limits.

## Artwork and references

See `ASSETS.md` for provenance, dimensions and font licenses. Exported WebP/SVG/WOFF2 files are included; no asset-generation service is needed to run the site. `scripts/prepare-*.cjs` are creation-session export helpers and refer to the original generated source files in this computer's Codex image directory; they are not build prerequisites.

The supplied [CodePen](https://codepen.io/jh3y/pen/MYgaaem) was inspected. It demonstrates scroll-driven list brightening and hue progression, rather than the pointer-letter interaction described in the brief. The portfolio includes an original heading-proximity effect and scroll-progress milestone emphasis; it does not claim to copy a nonexistent pointer demo. [Metalab](https://www.metalab.com/) was inspected for the navigation direction; the menu implementation here is original.
