# Aliaksandr Sekunau — GTA San Andreas–Inspired Interactive Portfolio
## Production implementation brief / AI coding-agent prompt
**Version:** 2.0 · **Language of the site:** English · **Stack:** HTML5, CSS3, vanilla JavaScript (ES modules), Vite

> **Your role:** Senior Creative Frontend Engineer + Art Director + Motion Designer + Accessibility & Performance Engineer.
>
> **Goal:** Build a complete, working, original one-page personal portfolio for **Aliaksandr Sekunau**, Senior Frontend Engineer, with the vivid illustrated 1990s California/open-world videogame atmosphere of GTA: San Andreas, sophisticated editorial typography, and creative-agency-grade interactive motion. **The site must look alive even when the visitor does absolutely nothing.**
>
> **Execution, not advice:** Create the project files, generate the necessary artwork, implement interactions, test, fix issues, and deliver a runnable site. Do not finish with a plan, static screenshot, empty asset placeholder, or nonfunctional demo.

---

## 1. Design direction and references

### Overall art direction
- Original comic-book-inspired illustration: thick dark contours, stylized shading, palm-lined boulevards, sunlit buildings, vivid skies, lowrider-inspired retro cars, California sunset, cinematic perspective.
- Visually rich **but readable**. Combine energetic illustrated backgrounds with clean UI hierarchy, generously sized headings, simple navigation and well-contrasted content areas.
- Mood: playful, confident, highly technical, premium — **not** a direct copy of Rockstar artwork, characters, game logos, screens or UI.
- Favor seamless transitions between illustrated scenes; the webpage feels like a journey through a stylized city.
- A mix of cream-colored editorial sections, near-black panels and saturated sunset/neon scenes.
- Respect uploaded visual mockups as *composition* references, not textually accurate source assets. Use the user's screenshots of large typography, hover navigation, and the typographic marquee as interaction references.

### Research these references before implementation (if accessible)
- https://www.metalab.com/ — hover-driven navigation, image reveal, high-impact typography.
- https://codepen.io/jh3y/pen/MYgaaem — inspect **actual** demo/code to understand the referenced effect; don't guess its mechanism.
- https://rauno.me/ — microinteraction craftsmanship.
- https://emilkowal.ski/ — polished motion behavior.
- https://bruno-simon.com/ — playful game-like interaction.
- https://scroll-driven-animations.style/ — native scroll animation demos.
- https://tympanus.net/codrops/ — motion and transitions.

If an external example cannot be loaded, implement an equivalent original effect based on the description and record this limitation.

### Theme palette
Use design tokens / CSS custom properties. Suggested themes (tune for WCAG contrast):

| Theme | Background | Primary | Secondary | Accent |
|---|---|---|---|---|
| California Sunset (default) | `#12121A` | `#FF5C98` | `#FF8A42` | `#FFD166` |
| Grove Green | `#081D16` | `#73E06C` | `#0F6B42` | `#C6FF89` |
| Vice Neon | `#1A103D` | `#FF4EA3` | `#772CE8` | `#20E3E3` |
| Golden Hour | `#251A25` | `#FFB547` | `#E96135` | `#FFE18B` |

Additional base tokens: `--ink: #12121A; --cream: #FFF0CD; --turquoise: #24C6C8;`.
Themes change the sky, overlay gradients, signage lights, CTA border, selected heading/links, and optional artwork via crossfades. **Avoid applying `hue-rotate()` to all page content**: do not distort faces, logos or text.

### Typography
- Original heavy condensed display font for headings (licensed for this project), contrasting readable sans-serif for body, and optional script accent used sparingly.
- Fluid sizes via `clamp()`; strong mobile adaptations.
- Do not use trademarked GTA game logos or improperly licensed GTA fonts.

---

## 2. Deliverables and mandatory graphics creation

**You — the coding agent — must create all required site imagery yourself**, not ask the user to supply it and not silently depend on unspecified existing assets.

Deliver:
1. A functioning web project with real implementation (HTML, CSS, JS, Vite).
2. **Original artwork** for all key sections and all parallax layers, exported to appropriate web formats.
3. A short `ASSETS.md` inventory documenting source, dimensions, formats and license/originality of each asset.
4. Mobile-specific compositions/crops where necessary.
5. A usable site even before images load: appropriate semantic text/background fallback.
6. `README.md`, QA checklist and working build scripts.

### Artwork production path
- If an image-generation tool is available, generate original illustrations using consistent character/style sheets and backgrounds; edit/refine until composition is coherent.
- If generation is unavailable, **create original SVG artwork programmatically** (city silhouette, palms, road, retro car, badges, sun, clouds, neon signs, plane) and combine with well-designed CSS gradients, masks and shapes. This fallback must still look polished and deliberately designed.
- Never use broken URLs, unlicensed web imagery, sample watermarks or generic stock placeholders.
- Generate separate transparent elements for hero/sections rather than flattening everything into one background image.
- Prefer optimized SVG for vectors; AVIF/WebP for complex art; compressed PNG only when needed; document formats and export quality.

### Illustrations required
- Hero: `sky`, `clouds-near`, `clouds-far`, `sun-glow`, `far-skyline`, `mid-skyline`, `palms-left`, `palms-right`, `road`, `lowrider`, `developer-portrait`, `foreground`.
- About: original character portrait / alternate angle, illustrated city background.
- Skills: city overpass or tech-themed illustrated backdrop, coherent icon treatments.
- Projects: **extra-wide panoramic highway** that extends through project cards; project-specific original preview artwork for Consensus, Bixbit, Competitions, YouTube Skip, BestAutoService.
- Experience: illustrated road map / journey motif and milestone signage.
- Services: six distinct conceptual icons/illustrations — web apps, architecture, UI, performance, consulting, MVP.
- Contact: twilight skyline, moving car/taillight accents, luminous signage.
- Decorative: scrolling route labels, stars, crown-like graphic doodles, ornamental borders, stickers, arrows, road signs.
- Provide suitably composed mobile illustrations. Make sure **no text essential for accessibility is baked into an image**.

### Image-generation art prompt template
> Original 1990s California urban comic-book illustration, bright sunset orange/coral/pink/violet/turquoise, thick ink outlines, carefully stylized vector-like shadows, palm trees, retro boulevard and skyline, cinematic visual storytelling, polished creative-studio art direction, deliberate empty space for webpage typography, no text, no watermark, no copyrighted characters or logos. Generate requested scene/layer in the same coherent art style; transparent background for isolatable layers.

---

## 3. Page content: verified facts only

**Name:** Aliaksandr Sekunau (display title may use “Alex Sekunau”).  
**Role:** Senior Frontend Engineer.  
**Experience:** 10+ years frontend; approximately 6+ years React and 3+ years Vue.  
**Core stack:** React, Next.js, Vue, Nuxt, TypeScript, JavaScript, HTML/CSS/SCSS, Redux, MobX, TanStack Query, Vuex/Pinia, Node.js, Express, NestJS, GraphQL, Docker, MongoDB, Redis, Jest, Testing Library, Puppeteer, Storybook, AWS.  
**Professional profile:** international cross-functional teams; remote-first; end-to-end feature development; code reviews; mentoring; architecture, B2B SaaS and web products.  
**Portfolio links:** GitHub `https://github.com/frontsideman` and LinkedIn `https://www.linkedin.com/in/alexandr-sekunov/`.

**Do not invent:** email, quantified results (e.g. 50+ projects, 20+ customers), case-study business metrics, App Store publication, current permanent location, endorsements or clients.

### Section order
1. **Home** — hero with portrait/lowrider/city, “BUILDING MODERN WEB EXPERIENCES”, “FROM IDEA TO PRODUCTION”; CTAs `VIEW WORK`, `LET'S TALK`.
2. **About** — “ENGINEER. CREATOR. PROBLEM SOLVER.”; concise introduction; confirmed experience statistics.
3. **Skills** — tech stack grouped into frontend, state/data, backend and tooling. Hover relates connected technologies; subtle icon float.
4. **Projects** — horizontal-scroll cinematic highway, large interactive project cards:
   - **Consensus** — B2B SaaS work at SpiralScout; React/Next.js/TypeScript/TanStack Query.
   - **Bixbit** — website migration to Nuxt/Directus with multilingual structure, CMS and SEO.
   - **Competitions** — private challenges product; SwiftUI, Nuxt, Directus; do not claim published release.
   - **YouTube Skip** — JavaScript Chrome extension.
   - **BestAutoService.by** — WordPress maintenance, performance and technical SEO.
5. **Experience** — career road/timeline. Employer sequence: SpiralScout (2022–2024), ITRex Group, EffectiveSoft, ProntoSoft, Godel Technologies. Verify exact dates before publishing if required.
6. **Services** — Web Apps, Frontend Architecture, UI Implementation, Performance, Code Review & Mentoring, MVP Development.
7. **Contact** — sunset finale, “LET'S BUILD SOMETHING GREAT”, confirmed GitHub/LinkedIn, `contact.email` as configuration that must not render a fake address. Contact action should have a valid destination or be deliberately disabled with explanation in development.

English-language primary site. Clear semantic information must be available without any animation or illustration.

---

## 4. Core interactive experiences

### 4.1 Hero: layered parallax and intro
- Six or more visually separable planes: clouds, far city, near city, palms, vehicle, character/foreground.
- Scroll-linked transform with depth-specific ratios (`0.1` to `0.9`, tune to prevent gaps).
- Very subtle pointer parallax on precise-pointer devices; no aggressive rotations.
- First-visit cinematic reveal: clouds/city → car → portrait → headline → CTA. About 2–3s but must be **skippable**, never block content.
- Assets oversized enough to avoid exposing empty frame edges.

### 4.2 Metalab-inspired navigation with world/theme switching
- Simple persistent compact desktop nav and mobile button.
- Fullscreen overlay menu with **huge stacked editorial items** and dim inactive labels.
- Hover/focus on an item highlights its text, crossfades thematic artwork and smoothly transitions color tokens:
  - Home — warm sunset lowrider.
  - About — teal portrait.
  - Skills — green tech city.
  - Projects — saturated magenta project collage.
  - Experience — amber highway.
  - Services — cream/golden laptop.
  - Contact — electric violet night skyline.
- Crossfade with two image layers; do not reload every pointer movement.
- Cursor-near floating illustration optional; clamp to viewport.
- Clicking anchor navigates, closes menu, restores scroll/focus management.
- Keyboard focus must provide same content affordances; Escape closes overlay and restores focus.

### 4.3 Interactive text
- Inspect the supplied jh3y CodePen. Match the observed interaction principle faithfully where possible.
- On major headings, selectively animate letter brightness/color/weight/micro-offset depending on pointer proximity; use `requestAnimationFrame` only while pointer interaction is active.
- Text reveal on entrance with CSS clipping, opacity and translate.
- Hovering a project heading reveals an image that follows cursor with easing.
- Hovering a service row changes scene colors/image; nearby text dims but never becomes unreadable.
- Keep text selectable; readable at rest; no perpetual noisy letter wiggle.

### 4.4 Horizontal scrolling projects
- Desktop: vertical wheel/scroll progresses a **pinned horizontal panorama** containing project stops and illustrated skyline. Use GSAP ScrollTrigger `pin` and `scrub` or equivalent, calculate scroll distance dynamically.
- Project previews have restrained tilt/scale/overlay on hover; active project is emphasized.
- Far background shifts more slowly than foreground for depth.
- At the end, return seamlessly to ordinary document flow.
- Tablet/touch/reduced-motion: standard scroll-snap carousel with visible controls; **no scroll traps**.
- Recalculate geometry on resize, asset load and font load.

### 4.5 Experience and services
- Road-like timeline with scroll-drawn SVG route and active milestone.
- Services presented as large horizontal typographic rows, with image reveal and background/theme transitions.
- Buttons: subtle magnetic motion on desktop; robust click/focus feedback.

---

## 5. NEW REQUIREMENT: the website is *alive at rest*

**Critical:** The webpage must have a controlled ambient-motion layer that runs even when the user is not scrolling, hovering, or clicking. This gives the atmosphere a living-world feel. **Implement several kinds of autonomous motion, but do not turn the page into a screensaver.** They must never obscure text or overwhelm content.

### 5.1 Editorial infinite marquee (reference: user's attached scrolling-text screenshot)
Implement at least **two types** of marquee, placed intentionally:

**A. Large editorial contact marquee**
- Between Contact heading and footer, or near the final CTA.
- Two thin horizontal rules sandwich a large flowing line:
  `LET'S CREATE SOMETHING TOGETHER  ✳  AVAILABLE FOR SELECT PROJECTS  ✳  LET'S CREATE SOMETHING TOGETHER ...`
- Include a visually distinct reverse-contrast **`EMAIL ME` chip** only if an actual email is configured; otherwise use a functional **`LET'S CONNECT` link to LinkedIn**. Never render a nonfunctional CTA.
- Cream-paper texture / editorial black typography, or themed inverse alternative.
- Seamless infinite loop with two equivalent content groups (duplication for visual loop only).
- Suggested travel time 25–40s per loop on desktop, 18–30s mobile if distance is smaller.
- Pause on hover **and keyboard focus within** to aid reading.
- Use CSS keyframes transforming an inner track; ensure translation distance corresponds exactly to one repeated group, not `-100%` of the entire track.
- Duplicated text should be `aria-hidden="true"`; accessible semantic single copy remains.
- For long marquee containing actionable link, keep the **real** keyboard-focusable link in a stationary or accessible layer so it never moves away from focus; do not duplicate interactive links.
- Optional continuous gentle highlight along the horizontal rules.

**B. Decorative mini-marquee / tape**
- A narrow repeating strip, e.g. `REACT ✦ VUE ✦ TYPESCRIPT ✦ BUILD • SHIP • IMPROVE ✦`.
- Place between Skills/Projects or near Services.
- Opposite movement direction to the contact marquee; low contrast enough not to overpower content.
- Suggested loop 35–55s, with responsive scaling.

### 5.2 Iridescent / animated gradient CTA borders
- Key CTA buttons, 1–2 feature cards and selected border rules get a **slow, continuously moving gradient rim**.
- Preferred implementation: CSS pseudo-element with animated gradient-position / rotated conic-gradient, masked so only **1–2px rim** remains; solid contrast-friendly interior.
- Loop 6–12s with no pulsing full-button brightness.
- Hover adds a short distinct response (e.g. glow increase, arrow nudge); resting effect remains subtle.
- Use `@property` to interpolate an angle **only when supported**; progressive enhancement fallback to simple background-position animation.
- Avoid border-box layout changes; decorative border must not cause CLS.

### 5.3 Living sky and environmental animation
- **Clouds** drift across the hero and contact scene over 50–120s; loop without visible jumps by extending assets beyond the viewport.
- **Distant plane** crosses one skyline every 60–110s, once per cycle (not 5 at once); subtle size/opacity.
- **Palm leaves** sway slightly (±1–2 degrees, very slow 6–12s, phase-offset).
- **Sun glow / atmospheric haze** varies subtly with gradient opacity, 12–25s.
- **Distant traffic**: one small car/lights layer moves along road far behind readable content, 25–50s; no flashing hazard.
- **Water/ocean reflection** where artwork contains water: subtle slow gradient shift rather than realistic expensive shader.
- Make loops phase-offset / staggered, not synchronously restarting every 5 seconds.
- Parallax and ambient movement must compose without overwriting `transform`: wrap each layer in separate containers or compose CSS variables into transforms.

### 5.4 Neon signage, stickers and ornamental life
- A small illustrated neon `OPEN FOR PROJECTS` / `GOOD CODE · BETTER PRODUCTS` sign gently breathes (opacity/glow) over 5–9s.
- Tiny stars / highlights may shimmer **occasionally** (staggered 6–15s), not constant sparkle everywhere.
- Optional small hanging tag/arrow sways slightly, e.g. ±2 degrees over 7–11s.
- A technical status indicator can pulse slowly as long as status wording is honest (do **not** invent availability or online presence).
- Respect light sensitivity; no strobe, blinking <3Hz, sudden high-contrast flashes or high-amplitude glows.

### 5.5 Slowly evolving section backgrounds
- Animated multi-stop linear/radial gradient positions on selected themed sections, 20–40s loop.
- Faint topographic/halftone texture offset or film grain **only if performance measurements justify it** (avoid frame-by-frame JavaScript noise).
- Introduce subtle background movement in Hero, Projects and Contact; editorial text-heavy areas should remain relatively calm.

### 5.6 Optional low-distraction independent loops
Choose **at most 2–3** additional treatments:
- Tiny arrow / scrolling-direction motif moving 2–4px in a 3–5s loop.
- Rotating decorative seal (30–60s/revolution).
- Very slow floating technology badges (3–5px amplitude, 6–12s).
- An occasional illustrated road sign shimmer.
- Slow light sweep across an inactive project preview every 18–30s **only** when out of reading focus.

**Do not animate** all skill icons, every line of text, every card and all backgrounds continuously at once.

### 5.7 Ambient motion orchestration and budget
Create a **single coherent motion system**:
- `AmbientMotionController` module to enable/pause/resume optional autonomous animations and track lifecycle.
- Prefer CSS animations for perpetual decorative effects, not `requestAnimationFrame` loops.
- Only use JS for scheduling sparse scene events (plane/car pass), state coordination and intersection logic.
- Pause optional ambient animations while page is hidden (`visibilitychange` / Page Lifecycle) and when scene is well outside viewport (`IntersectionObserver`, e.g. `rootMargin: "100px"`).
- Distinguish **ambient** animation from **interaction** and **scroll** animations so they cannot fight over the same style properties.
- Keep no more than roughly **3 visually dominant independent motion sources** visible at a time; other loops can be nearly imperceptible.
- Define amplitude, speed, contrast and active zones as tokens/config rather than hardcoded across files.
- Minimum impact on legibility: no moving typography behind body copy without opaque/contrast-safe backing.
- All animations must degrade gracefully on underpowered/mobile devices.

### 5.8 Reduced motion and user control
Implement `prefers-reduced-motion: reduce` end-to-end:
- **Freeze** marquees into a readable, static display.
- Stop clouds, plane, car, sparkle, float, shimmering borders, pointer parallax and full-screen intro.
- Remove pinned horizontal scroll; provide native scroll-snap/stacked cards.
- Leave only minimal functional focus/state feedback, no surprise motion.
- Consider a visible **“Motion: On / Reduced”** toggle; when present, persist preference in `localStorage`, apply before first paint, and override ambient motion without hiding any content.
- Never make a visitor chase a moving button/link.
- Default behavior must be comfortable at 60Hz and 120Hz, but **correctness and readability outrank the number of effects**.

### 5.9 Motion specification table
| Effect | Location | Runs without interaction? | Cadence | Implementation |
|---|---|---:|---|---|
| Large typography marquee | Contact / final CTA | Yes | 25–40s linear loop | CSS transform |
| Tech tape marquee | Skills–Projects divider | Yes | 35–55s reverse | CSS transform |
| CTA iridescent rim | Main CTA | Yes | 6–12s slow loop | CSS pseudo-element / mask |
| Cloud drift | Hero, Contact | Yes | 50–120s | CSS transform |
| Plane pass | Hero | Yes, sparse | 60–110s | CSS keyframes / optional JS scheduler |
| Far traffic | Projects backdrop | Yes, sparse | 25–50s | CSS transform |
| Palm sway | Illustrated foreground | Yes | 6–12s | CSS rotate |
| Neon sign glow | Hero/Contact | Yes | 5–9s gentle | CSS opacity/filter |
| Ambient sky gradient | Hero/Contact | Yes | 20–40s | CSS gradient position |
| Tiny highlight shimmer | Selected small ornaments | Yes, occasional | 6–15s | CSS opacity |
| Hero parallax | Hero | No, scrolling | Scroll-linked | GSAP ScrollTrigger |
| Menu artwork/theme | Overlay navigation | No, hover/focus | 450–700ms | CSS variables + crossfade |
| Character text effect | Headings | No, pointer/focus | Responsive | JS/CSS |
| Project horizontal travel | Projects | No, scrolling | Scroll-linked | GSAP |
| Project/Service preview | Projects/Services | No, hover/focus | 250–600ms | JS + CSS |

### 5.10 Sample implementation guidance
These are **patterns**, not copied production-ready components:

```css
/* Continuous tape; each group must have the same rendered width */
.marquee {
  overflow: clip;
}
.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee-travel var(--marquee-duration, 34s) linear infinite;
  will-change: transform;
}
.marquee__group {
  display: flex;
  flex: 0 0 auto;
}
@keyframes marquee-travel {
  to { transform: translateX(-50%); } /* only valid for exactly 2 equal groups */
}
.marquee:hover .marquee__track,
.marquee:focus-within .marquee__track {
  animation-play-state: paused;
}

.ambient-sky {
  background-size: 160% 160%;
  animation: sky-breathe 28s ease-in-out infinite alternate;
}
@keyframes sky-breathe {
  to { background-position: 100% 70%; }
}

.ambient-border {
  position: relative;
  isolation: isolate;
}
.ambient-border::before {
  content: "";
  position: absolute;
  inset: -2px;
  padding: 2px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--rim-angle, 0deg),
    #ff5c98, #ffd166, #20e3e3, #9333ea, #ff5c98
  );
  /* Apply a supported compositing mask to show only the rim,
     OR create nested wrapper + inner surface fallback. */
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track,
  .ambient-sky,
  .ambient-border::before,
  [data-ambient] {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

Test continuous-loop seams at multiple widths and zoom levels. If the groups are not equal, calculate actual translated group width or use a robust seamless CSS layout; do not ship visible jumps.

---

## 6. Interaction guidelines
- Build a **subtle custom cursor** only for fine-pointer devices: default dot, contextual `VIEW`, `DRAG` and hover state. Preserve normal cursor as a fallback.
- Mild magnetic hover on key CTAs (8–12px maximum shift).
- Project cards: bounded 3D tilt, `scale(1.03–1.06)`, image overlay and clear focus state.
- SVG route progression on Experience; efficient scroll updates.
- Intro and section entrances happen **once** by default; repeat only if the effect makes sense.
- Do not hijack native scrolling except the well-bounded desktop pinned projects showcase.
- Keyboard/tab order must follow DOM semantics; Escape and back button behavior must work.

---

## 7. Tech constraints and architecture

### Required stack
- HTML5, CSS3, ES modules, Vite, npm.
- **No React/Vue/Angular/jQuery/Bootstrap**.
- GSAP + ScrollTrigger allowed for complex timelines; SplitText if licensing/availability are clear; otherwise implement own accessible text segmentation.
- Three.js only when it contributes a demonstrated value; do not add as decoration.
- Lenis optional; if used, explicitly synchronize with GSAP and preserve native anchor behavior.
- Prefer CSS transitions, keyframes, `@property`, `animation-timeline` with feature detection, SVG and native APIs where sufficient.
- Use `IntersectionObserver`, `ResizeObserver`, `visibilitychange`, `requestAnimationFrame` selectively.

### Suggested files
```text
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── ASSETS.md
├── public/
│   ├── artwork/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── experience/
│   │   ├── services/
│   │   └── contact/
│   ├── icons/
│   └── fonts/
└── src/
    ├── main.js
    ├── data/
    │   ├── profile.js
    │   ├── projects.js
    │   └── experience.js
    ├── styles/
    │   ├── tokens.css
    │   ├── base.css
    │   ├── typography.css
    │   ├── layout.css
    │   ├── motion.css
    │   ├── sections.css
    │   └── responsive.css
    └── scripts/
        ├── animation-controller.js
        ├── ambient-motion-controller.js
        ├── motion-preferences.js
        ├── parallax.js
        ├── marquee.js
        ├── horizontal-projects.js
        ├── interactive-text.js
        ├── navigation.js
        ├── theme-manager.js
        ├── cursor.js
        └── scroll-timeline.js
```
This is a guide, not a demand for unnecessary modules: consolidate low-value files where sensible.

---

## 8. Responsive behavior
Test widths: 320, 375, 768, 1024, 1440, 1920, 2560px.
- Mobile layout is **recomposed**, not scaled desktop.
- No pointer-tracking on coarse pointers.
- Horizontal showcase becomes scroll-snap with explicit next/previous controls.
- Reduce artwork layers and pause distant environmental loops on low-power mobile.
- Make large typographic marquee scale comfortably, avoiding cropped mandatory words and inaccessible controls.
- Maintain at least 44×44 CSS pixel practical touch targets.
- Use `srcset` and `sizes`; avoid serving massive desktop artwork to small devices.

---

## 9. Accessibility, safety and readability
- Semantic `header`, `nav`, `main`, `section`, `footer` with one `h1`.
- Accessible navigation, buttons and cards; logical heading order.
- Artwork purely decorative: empty alt/hidden from AT. Meaningful portfolio screenshots: accurate `alt`.
- Contrast: WCAG AA for primary copy and controls, even over animated gradients.
- `prefers-reduced-motion` / manual motion toggle, persistent if provided.
- Avoid flashing or high-frequency saturation flicker.
- Text must remain selectable and fully legible; never hide meaningful text behind animation.
- Menus, carousel, and modal overlays: focus management and keyboard accessibility.
- Mobile and no-JS fallbacks keep all substantive content and contact links visible.
- Optional audio is **not** required; do not autoplay audio.

---

## 10. Performance and SEO
### Performance
- Aspirational Lighthouse targets: 90+ Performance / 95+ Accessibility / 95+ Best Practices / 95+ SEO, **measure rather than claim**.
- Keep artwork compressed; reserve sizes to avoid CLS; lazy-load below-fold scenes.
- Use transforms and opacity rather than layout-dependent left/top or width/height animation.
- Compositor promotion (`will-change`) **only** on a small set of active moving elements; remove it when no longer needed, as overuse consumes GPU memory.
- No per-frame JS for animations that CSS can do.
- Pause offscreen/hidden ambient scenes.
- Check sustained scrolling and idle CPU usage, memory and battery impact; evaluate desktop and mid-tier mobile.
- Respect Core Web Vitals and interaction latency.

### SEO
- Accurate title: `Aliaksandr Sekunau | Senior Frontend Engineer`.
- Meaningful description, canonical (when domain configured), OG/Twitter metadata, JSON-LD `Person`, robots.txt, sitemap where applicable.
- No fabricated certifications, client metrics, testimonials, links or claims.

---

## 11. Implementation plan — implement, then verify
**Phase 1:** Create Vite app, content/data, semantic seven-section structure, CSS tokens, responsive typography.  
**Phase 2:** Generate **all original assets**, export optimized desktop/mobile versions, document provenance.  
**Phase 3:** Build scenes and compositions to match supplied mockups; robust readable fallbacks.  
**Phase 4:** Implement core interaction: hero parallax, Metalab-style interactive navigation, text hover, section reveals, project horizontal scroll, project previews, service hover, timeline.  
**Phase 5:** Implement ambient-motion layer: **both marquees, gradient-border CTAs, clouds, distant plane/traffic, palm sway, neon, sky gradient** plus only selected microloops.  
**Phase 6:** Implement mobile, keyboard access, reduced motion, pause on hidden/offscreen, optional toggle, error fallbacks.  
**Phase 7:** Run build and verify browser behavior and performance. Fix defects.  
**Phase 8:** Deliver code, asset inventory, commands, and known limitations.

### Verification matrix
- **At rest for 60 seconds on desktop:** the page looks alive without interactions; sky/clouds, tasteful neon/borders and marquee remain continuous and seamless; no distracting strobing.
- **At rest on mobile:** fewer loops, no performance degradation, readable text.
- **Hover navigation:** backgrounds and palettes crossfade predictably; keyboard focus does too.
- **Scroll Projects:** progression is smooth and bounded; no traps; no sideways overflow.
- **Resize / zoom:** tracks and pinned distances recompute, artwork does not leave blank seams.
- **Reduced motion:** everything becomes static/readable; functional links remain usable; cards are accessible.
- **Hidden tab:** optional animations pause/recover without time jumps or resource leaks.
- **Network throttling / images disabled:** essential content and UI still work.
- **Console / build:** no broken assets, uncaught errors or warnings masking defects.
- **Links:** GitHub/LinkedIn resolve; contact CTA is genuinely functional or explicitly configured.

---

## 12. Acceptance criteria
Mark each as **verified** only after manual/automated testing:

- [ ] Original and coherent GTA-inspired art across all seven sections.
- [ ] Every required illustration independently generated/created and inventoried.
- [ ] No fake statistics, addresses, email or launch claims.
- [ ] Responsive hero and readable informational sections.
- [ ] Working interactive menu with palette/art crossfades.
- [ ] Interactive text hover inspired by the supplied CodePen.
- [ ] Hero multi-plane parallax.
- [ ] Horizontal scrolling cinematic projects on desktop with mobile fallback.
- [ ] Services hover artwork, project previews, SVG timeline and CTA behaviors.
- [ ] **Seamless large infinite editorial marquee** with accessible CTA.
- [ ] **Opposite-direction mini marquee** with no visible seam.
- [ ] **Animated gradient rims** on selected CTAs/cards.
- [ ] **Autonomous clouds, sparse plane/car movement, neon, sky ambience and palm motion.**
- [ ] Ambient loops compose correctly with scroll/pointer parallax.
- [ ] Pausing/resuming in hidden/offscreen scenes works.
- [ ] Full reduced-motion behavior and keyboard navigation work.
- [ ] Optimized assets and measured performance.
- [ ] Successful `npm install`, `npm run dev`, `npm run build`, `npm run preview`.
- [ ] README and ASSETS inventory delivered.

---

## 13. Agent execution directive
**Start implementing immediately.** You are responsible for both frontend code **and** the original images/illustrations needed by that code. Do not defer art creation back to the user. If imagery generation is impossible in your environment, render original scalable SVG/CSS artwork yourself.

Priorities:
1. Visual fidelity and strong art direction.
2. Readability / usefulness as a professional engineer's portfolio.
3. Seamless ambient life **without user input**.
4. Meaningful motion interactions.
5. Responsive design, accessibility and performance.
6. Clean implementation and verifiable output.

Deliver a **working site**, not a textual design proposal. Report tested functionality and any genuine limitations; never describe a non-working effect as completed.
