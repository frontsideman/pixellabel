# Asset inventory

AI tools: Gemini, OpenCode, MCP and GitHub Copilot marks come from the installed Simple Icons package, as does Firebase. Codex uses the light app icon bundled in `/Applications/ChatGPT.app/Contents/Resources/icon-codex-light.png`, resized to 128px and embedded within its local SVG. These SVGs are hosted locally and embedded in standalone exports.

Skills additions: WordPress, GitHub and GitHub Actions SVGs come from the installed Simple Icons package with their brand colors. The Playwright SVG comes from the installed playwright-core recorder assets. All four are hosted locally and embedded in standalone exports.

Character update (2026-10-09): Hero, its transparent foreground, About and Experience were edited with ImageGen using `docs/persona.md` and the first edited foreground as an identity reference. New source PNGs are in `artwork-persona/`; the previous exports are archived in `artwork-originals/2026-10-09/`. Mobile, portrait and social derivatives were regenerated with the original dimensions and alpha behavior. Poses and composition are retained; generative edits do not preserve every background pixel.

All illustrative imagery was created for this portfolio during this session. The user’s uploaded mockup is a composition reference and is not embedded in the website. There are no external stock images, game assets, copyrighted game characters or game logos. Generated illustrations are original concept artwork; no exclusive-rights or legal-clearance claim is made. Source PNGs remain in the creation-session Codex image directory. Exported files needed to run the site are in this project.

| File in public/artwork | Dimensions | Format | Provenance |
|---|---:|---|---|
| about-small.webp | 400 × 267 | WEBP | Optimized responsive export of an original generated scene. |
| about.webp | 768 × 512 | WEBP | Original generated scene atlas, top-left portrait. |
| auto.webp | 512 × 512 | WEBP | Original generated project atlas, bottom-middle workshop concept. |
| bixbit.webp | 512 × 512 | WEBP | Original generated project atlas, top-middle architecture illustration. |
| city-sketch.webp | 550 × 367 | WEBP | Optimized responsive export of an original generated scene. |
| clouds.svg | 1200 × 220 | SVG + alpha | Original hand-authored vector cloud silhouettes; separate ambient plane. |
| competitions.webp | 512 × 512 | WEBP | Original generated project atlas, top-right mobile-product concept. |
| consensus.webp | 512 × 512 | WEBP | Original generated project atlas, top-left office illustration. |
| contact-mobile.webp | 750 × 1000 | WEBP | Mobile export of contact scene; intentional portrait crop. |
| contact.webp | 768 × 512 | WEBP | Original generated scene atlas, bottom-right twilight city. |
| experience.webp | 512 × 512 | WEBP | Original generated project atlas, bottom-right career portrait. |
| hero-background-mobile.webp | 600 × 920 | WEBP | Portrait-oriented WebP export of clean background. |
| hero-background.webp | 1672 × 941 | WEBP | Generated edit of hero with car and character removed. |
| hero-mobile.webp | 750 × 1150 | WEBP | Initial reference export; retained as an optional alternate crop. |
| hero-subject-mobile.webp | 850 × 682 | WEBP + alpha | Transparent mobile foreground crop, separately composed in CSS. |
| hero-subject.webp | 1672 × 941 | WEBP + alpha | Generated transparent extraction: original character, laptop and lowrider. |
| hero.webp | 1672 × 941 | WEBP | Original generated hero illustration; navigation world and services crop source. |
| palm.svg | 220 × 540 | SVG + alpha | Original hand-authored vector palm silhouette; separate ambient plane. |
| plane.svg | 120 × 50 | SVG + alpha | Original hand-authored vector distant aircraft; separate ambient plane. |
| projects-mobile.webp | 750 × 1000 | WEBP | Mobile export of projects scene; intentional portrait crop. |
| projects.webp | 768 × 512 | WEBP | Original generated scene atlas, bottom-left sunset boulevard. |
| services.webp | 700 × 330 | WEBP | Optimized landscape crop of original hero illustration. |
| skills-mobile.webp | 750 × 1000 | WEBP | Mobile export of skills scene; intentional portrait crop. |
| skills.webp | 768 × 512 | WEBP | Original generated scene atlas, top-right city/highway. |
| traffic.svg | 140 × 45 | SVG + alpha | Original hand-authored vector distant retro car; separate ambient plane. |
| youtube.webp | 512 × 512 | WEBP | Original generated project atlas, bottom-left listener portrait. |
| allergenchecker.webp | 600 × 600 | WEBP | Original generated project atlas, left food/barcode concept; optimized export. |
| aibook.webp | 600 × 600 | WEBP | Original generated project atlas, middle book-and-software concept; optimized export. |
| corporate.webp | 600 × 600 | WEBP | Original generated project atlas, right corporate website/blog concept; optimized export. |

Hero art is split into a clean city background and a transparent car/character foreground. Clouds, sun haze, sky ambience, aircraft and palm are independent layers. The far and near skyline and road are painted together in the city plate; the developer and vehicle share the transparent foreground. Other scenes use independent art, CSS overlays and vector accents. This is a deliberate layer consolidation, not a claim that every named item in the brief has its own asset file.

## Fonts and interface graphics

Anton (display), DM Sans (body) and Caveat (script) were downloaded from Google Fonts, Latin-subset and exported to locally hosted WOFF2. Original TTFs and full SIL Open Font License notices are included in public/fonts. No trademarked game font is used. Technology marks are locally hosted SVGs from Simple Icons (CC0), the official Pinia website, the official TanStack brand assets, and Devicon (MIT) for AWS. Vuex uses the Vue mark and SwiftUI uses the Swift mark. HTML and CSS have separate logos. Service icons are Lucide SVGs (ISC); license notices are included in public/icons. The favicon, interface geometry, GitHub mark and grain texture are vectors.

## Generation sources

- Hero: exec-7ccea208-1f2e-4556-845d-c9b774f9c63b.png
- Four-scene atlas: exec-c7cf3eba-95b7-490b-976a-c32e93c420bc.png
- Six-project/career atlas: exec-302cf75a-790b-4b35-8d19-20f595bf84ef.png
- Clean city plate: exec-a985f84c-f9b9-4861-9d3f-edb46c4238c9.png
- Transparent foreground: exec-ff44f9df-966c-4609-838c-24279868a813.png
- Added projects atlas: exec-93fb78e3-6eee-4992-a412-d597260d13f7.png

No essential copy is baked into imagery. Responsive picture sources, image dimensions, lazy loading below the hero and transparent-alpha exports are used.

### Logo sources after browser review

- Simple Icons: npm `simple-icons`, SVG paths and brand colors; https://simpleicons.org/
- Pinia: https://pinia.vuejs.org/logo.svg
- TanStack: https://tanstack.com/images/brand/social/naked-mark-ocean.svg
- AWS: https://github.com/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg
- Service icons: npm `lucide-static` (`code-xml`, `panels-top-left`, `network`, `users-round`, `rocket`, `gauge`), https://lucide.dev/

### Favicon and social sharing assets

The favicon is an original SVG AS monogram in the portfolio palette. Browser-rendered PNG exports provide 32px and 180px Apple touch variants; the ICO contains 16px and 32px sizes. og-image.jpg is a 1200×630 browser-rendered JPEG export of the existing original hero illustration. The standalone builder embeds icon resources and copies public branding assets into the repository root for hosting alongside index.html.
