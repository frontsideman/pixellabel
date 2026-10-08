# Verification — 9 October 2026

Production output built successfully with `npm run build`, and served successfully with `npm run preview`. The local development server also runs successfully. npm installation completed; no vulnerable dependencies were reported by npm at installation time.

## Browser checks

The initial version passed 35 end-to-end checks. After the CV/project update, 41 checks passed in local Chromium, with no uncaught JavaScript errors or failed local asset responses. The current report and screenshots are in `qa-artifacts/`; the initial report is preserved as results-initial.json. The unchanged 60-second ambient benchmark was not repeated for this content update.

- All seven sections and one main heading; all requested imagery loads.
- Desktop pinned panorama reaches the final card and returns to ordinary document flow.
- Project details open with the correct content; Escape closes and restores focus.
- Fullscreen menu opens, contains focus through a native dialog, closes with Escape or an anchor and restores/navigates focus appropriately.
- Keyboard focus crossfades menu artwork and changes its palette.
- Both marquee groups have equal rendered widths; their loop translation is exactly half of a two-group track. Interactive contact CTA stays stationary.
- Ambient scenes pause outside the viewport. Hidden-document lifecycle handler was exercised with a synthetic visibilitychange; an actual background-tab/battery study was not performed.
- Motion toggle stops animations and pinning, persists on reload; system reduced motion is honored on first load.
- No document overflow and no clipped heading words at 320, 375, 768, 1024, 1440, 1920 and 2560 CSS px.
- No-JS and blocked-artwork fallbacks retain semantic information and valid contact destinations.
- 60-second idle observation: clouds kept moving; measured JavaScript execution was 0 seconds. Browser task time was 5.93 seconds; JS heap approximately 2.29 MB. These are local Chromium CDP measurements, not a mobile battery benchmark.

## Lighthouse baseline

Measured against the production preview before the CV/project content update, with the default simulated mobile profile and desktop preset. Results vary with hardware and audit conditions.

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance | 89 | 95 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 3.8 s | 1.5 s |
| CLS | 0.001 | 0.001 |
| Total Blocking Time | 0 ms | 0 ms |

Mobile performance improved from an initial 74 after reducing eager overlay downloads, adding responsive/compressed imagery and simplifying the paper texture. The aspirational 90 mobile performance target was not reached; the main remaining cost is the rich illustrated hero. A full accessibility score is an automated measurement, not a claim of complete WCAG conformance. The final accessibility-only audit also scored 100, with no failed accessibility audits; its visible-label/name check passed after replacing the typographic LinkedIn icon with SVG.

## Limits

- Tested in local Chromium; no physical iOS/Android or Safari/Firefox verification, prolonged battery test, 120 Hz device test or assistive-technology manual audit.
- Dates and roles now match the supplied CV, including EPAM, Godel, EffectiveSoft, Upwork, SpiralScout, ITRex, ElligintHealth and the restaurant platform under NDA. Email and Telegram are verified from the CV. Permanent location and availability are still unspecified. BestAutoService.by has a public website link supplied by the owner; other public project-launch URLs remain unspecified.
- Illustrations are original concepts, not screenshots of the products. The supplied CodePen uses scroll-driven list brightening; heading proximity motion here is an original adaptation of the brief's separate hover requirement.
- Skyline/road artwork shares one background plate; character and vehicle share one transparent foreground. See ASSETS.md for exact layer inventory.
- No public deployment/domain was configured. The ready-to-host static output is `dist/`.

## CV and project update

- Eight project cards, a dynamic counter and proportional progress indicator; the final card remains reachable on desktop and mobile.
- Added AllergenChecker, AIBook and the corporate/marketing website with a blog on Nuxt + Directus; updated the existing Competition card to the user’s singular product name and iOS platform.
- Verified that AllergenChecker’s description includes barcode scans and ingredient-list photographs. No accuracy, safety or medical-outcome claim is added.
- All four added/updated project dialogs were tested at 375px with reduced motion.
- Verified eight career entries, CV email/Telegram destinations, production build, image loading and the seven responsive widths.
- AIBook’s detailed functionality and technology stack and the corporate website’s brand have not been provided. Their descriptions remain limited to confirmed information.
- The CV itself was read as a source and is not included in public assets. Implausible or unnecessary quantified claims from the CV were not reproduced.

### Competition description refinement

The owner clarified that Competition runs goal-based competitions in private groups, including activity, reading, steps and other goals supported by the Apple ecosystem, using iPhone and Apple Watch. The card and detail dialog now reflect those facts. Production build and a targeted 375px browser check passed: description content, dialog opening, Escape closing, no document overflow and no JavaScript errors. No HealthKit API, automatic synchronization, native watchOS app or public-release claim was added.

### BestAutoService website details

The owner supplied https://bestautoservice.by/ and confirmed WordPress, SEO, content and design work. The existing card was updated without adding a duplicate. Its dialog includes a public website link; other dialogs hide the link and clear its destination. The public website was opened successfully. Production build and targeted browser checks at 375px and 1440px passed: correct URL and external-link attributes, requested description, link reset between projects, no document overflow and no JavaScript errors.

### Browser review corrections

Addressed all 16 comments: the header identity is hidden at the top and reads Alex Sekunau after scrolling; hero actions flow vertically with a gap; diagonal gradient hover/focus effects cover primary controls; road sign copy is React / Nuxt and Vue / Vuex; total experience is 13 years per owner correction. Replaced technology glyphs with 27 real SVG marks and split HTML / CSS. The projects label has an opaque contrasting background. Added CV-based leadership, integration and product highlights to the experience column. Removed the duplicate service illustration and added six Lucide icons.

Production build and all 41 existing browser checks passed (idle profiling skipped). Targeted checks at 320, 375, 768, 1296 and 1920px passed for header visibility, hero spacing, logo loading, service icons, experience highlights, hover effect, document overflow and JavaScript errors. Desktop and mobile screenshots were visually reviewed.

### Parallax visibility fix

The owner's open in-app browser was in Motion: Reduced mode. Motion was explicitly enabled through the existing control. Increased hero scroll depth and pointer amplitude, and added independently moving artwork in Skills, Experience and Contact plus the About portrait. Overscan keeps scene edges covered. System reduced motion and the manual switch still reset all transforms. Updates remain event-driven through requestAnimationFrame rather than a continuous idle loop.

Production build and 45 browser checks passed, including pointer depth, visible hero scroll separation, independent Skills artwork movement and reduced-mode reset. A separate 375px touch/mobile check confirmed scroll-driven parallax and no document overflow. Idle profiling was not repeated.

### 500ms motion timing

Interface transitions and intro reveal duration now use the shared `--motion-duration: 500ms` token. Parallax layers, scene artwork, portrait and project panorama ease toward their new positions over 500ms. Continuous ambient loops keep their scene-specific durations. Production build and all 45 browser checks passed; a targeted test verified computed 0.5s durations, an intermediate parallax position and completion at the requested destination. Reduced mode still removes transitions.

### Direct file opening

The screenshot showed the Vite source index opened through file://, which bypassed public asset paths and blocked ES modules. Builds now generate a self-contained portfolio.html with embedded artwork/fonts/styles and an inline classic JavaScript bundle. Source and production index.html redirect to it only for file:// visits. HTTP serving is unchanged. A Chrome file:// check passed: redirect, hero artwork, local font readiness, project details, navigation artwork and 500ms parallax. No runtime errors occurred.

### Automatic parallax startup in Chrome / Safari engine

Reproduced the reported missing parallax with a fresh file:// page under prefers-reduced-motion: reduce: the old startup chose reduced mode and all transforms were none. The previous file:// verification had explicitly enabled motion, so it did not cover the reported startup behavior.

Per the owner's explicit request for visible parallax, motion now defaults to on independently of the OS preference. The manual off switch remains persistent under portfolio-motion-v2; stale portfolio-motion reduced settings do not silently disable this updated version. Rebuilt both standalone files and the Vite output.

Installed Chrome and Playwright WebKit 27.2 passed tests for root portfolio.html, root index.html redirect and HTTP preview: enabled by default with both OS reduced motion and the old saved reduced preference, independently moving hero/Skills artwork, and manual disable. No runtime errors occurred. WebKit is the Safari engine test; the user's Safari app was not directly inspected. All 45 existing checks also passed. The supplied CSP console screenshot refers to a Chrome extension content.js script, not an identified portfolio runtime error.

### Repository integration and standalone index

Preserved origin/main history and the existing CNAME for pixellabel.com. The Vite source page is now src/index.html with src as its root. Each production build writes self-contained root/dist index.html and portfolio.html outputs; index.html no longer redirects or relies on adjacent files. The source, project assets and generated root pages are tracked; node_modules, dist, QA artifacts and macOS metadata remain ignored.

An isolated copy of index.html in /private/tmp passed in installed Chrome and Playwright WebKit: URL unchanged, all non-dialog images and fonts loaded, all eight project dialogs loaded their images, and parallax worked with system reduced motion. HTTP production preview passed the same checks. The navigation artwork assertion was updated to compare the actual image against the Skills image, supporting both normal URLs and embedded data URIs.

Final production validation: all 45 browser checks passed, with no runtime errors or failed local assets. Idle profiling was skipped.

### Favicon, metadata and implementation review

Added original AS favicon SVG/ICO/PNG variants and JPEG hero sharing artwork. Canonical and og:url target https://pixellabel.com/ from CNAME; Open Graph/Twitter metadata includes a 1200×630 image. Dev favicon paths are absolute. Builds embed icons and copy branding assets to the repository root so both Vite output and repository-root hosting expose the same social image URL.

Carousel measurement handles zero/single cards without indexing or division errors; progress DOM lookup is cached. Letter centers invalidate on scroll/resize and remeasure on the next pointer movement. Service articles no longer add inactive keyboard tab stops. Node >=20.19 is declared in engines. CSS is formatted and split into three files preserving cascade order; replaced text-glyph rules were removed. Metadata labels are at least 11px, technology labels 12px, and the mobile technology grid uses two columns per group.

Production build and all 45 existing checks passed. qa:review passed on dev and production for social metadata, four branding asset responses, service semantics and type sizes/overflow at 320/375/768/1296px; zero/one-card initialization, resize and motion toggle; heading hover after scroll/resize; and removal of obsolete glyph rules. No JavaScript errors occurred.
