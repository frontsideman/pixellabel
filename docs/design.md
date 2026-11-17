# Alex Sekunau portfolio

The user supplied and selected the implementation brief and composition reference. This site implements that selected design as a static English portfolio in the current workspace.

Eight semantic sections form a continuous illustrated city journey. Original generated comic artwork supports readable HTML text. Cream informational sections contrast with sunset, cyan and magenta scenes. Anton display typography, DM Sans body copy and Caveat accents are locally hosted.

Vanilla ES modules handle navigation, motion preferences, environmental lifecycle, project panorama, project details, text and pointer interactions. Native dialogs provide focus containment and Escape handling. All page content and card summaries are in HTML and remain available without JavaScript; dialog-only project descriptions and stacks live in `src/scripts/projects.js`. A fine-pointer desktop panorama uses bounded sticky positioning and scroll progress; mobile and reduced motion retain a native carousel.

Project cards are stretched links (`<a class="project-open">`) rather than buttons, so card content can use valid block markup and headings remain navigable. Dialog-only project descriptions and stacks live in `src/scripts/projects.js`; titles, categories, artwork names and optional public URLs come from the corresponding card and its `data-*` attributes. The counter derives its total from the cards and its section prefix from `data-section-number`.

The published site is the repository root served by GitHub Pages. `_config.yml` excludes sources, tooling, internal docs and original artwork from publication while keeping them in GitHub. The build also produces a self-contained `portfolio.html` and the lightweight `index.html`; `dist/` contains the same outputs. Do not add `.nojekyll`, because it would disable the exclusions.

Yandex Metrica is skipped on file, local and private-network hosts, and the no-JavaScript tracking pixel was removed. `/privacy.html` documents analytics, hosting, local preferences and contact channels. There is no consent banner.

No invented contact email, availability, current location or historical dates. Project artwork is identified as original concept illustration, not a product screenshot. Only supplied professional contact destinations are used. The supplied CV and owner updates provide the career dates, roles, Telegram, LinkedIn and GitHub links. The Experience timeline starts with the current BiXBiT role; company names link to their official sites without underlines, and project names are underlined links to their official sites. Four project cards include the owner’s iOS applications AllergenChecker and Competition, AIBook and BestAutoService.by; AIBook generates custom fairy tales based on existing stories, and its card links to the public repository. The counter and progress bar derive their totals from the actual cards.

Validation: production build, browser at multiple widths, no-JS fallback, keyboard dialogs, panorama boundaries, offscreen/visibility pausing and reduced motion. Document measured outcomes and remaining limitations in QA.md.
