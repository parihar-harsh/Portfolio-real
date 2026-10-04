# Harsh Parihar — Portfolio

**Live:** [pariharharshpfolio.netlify.app](https://pariharharshpfolio.netlify.app/)

**Résumé:** [Current PDF on Google Drive](https://drive.google.com/file/d/1O71pQua7stH9YqdT9gEX88tqamr7Kqpd/view?usp=sharing)

The original dark portfolio design is restored: spotlight and word entrance, illustrated bento grid, rotating globe, scrolling technology columns, 3D project pins, moving experience borders, hover canvas cards, gradient contact card, and email-copy confetti. Current résumé, SAIG/Brainwave experience, project details, and contact corrections are retained.

## Editing and building

- `portfolio-content.json`: résumé URL, project details, primary/secondary links, experience.
- `design-source/`: preserved original exported HTML and two component chunks from Git commit `f8179d8`.
- `scripts/restore-design.mjs`: checked transformations updating both the initial HTML and React components while preserving their original effects.
- `_next/` and root image/vector assets: original static runtime and illustrations.
- `style.css` and `app.js`: responsive refinements, keyboard/touch access, copy feedback, and motion preferences.
- `scripts/build.mjs`: generates the static site in `dist/`, content hashes for updated components, and hashes permitting only the required inline scripts in the Content Security Policy.
- `scripts/browser-test.mjs`: browser regression tests for restored effects, content, layouts, accessibility, and fallbacks.

```sh
npm ci
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4174. This preview applies the production security headers. With Chrome installed, run `npm run test:browser` in another terminal. `npm audit` checks installed development dependencies; it does not audit the preserved prebuilt runtime.

The repository originally contained a compiled Next.js export without its React/TypeScript project source. Restoration uses that actual export rather than recreating a similar-looking design. The transformation patterns fail the build if the expected original component structure changes. Obtaining the original React source would make future structural changes and dependency upgrades easier. `dist/index.html` is the deployed entry point; the earlier root static redesign is retired.

## Motion and interaction

The bottom-right **Animations on/off** button persists the preference on this browser where local storage is available and synchronizes across tabs. System reduced motion takes priority and disables the button. Turning motion off replaces the globe with a static illustration and stops decorative CSS motion and card tilts. With WebGL unavailable, static globe and readable approach cards remain. These fallbacks preserve the content and links.

Project pins respond to hover and keyboard focus. Primary project links open the app/demo or code; separate links beneath applicable pins open public code or the user guide. Approach cards respond to hover, focus, and touch; descriptions remain visible on touch devices and with motion off. Copy email gives success feedback only after clipboard acceptance, and provides the address on failure. Clipboard tests use mocks and do not send messages.

Without JavaScript the main heading, all five project cards, experience, résumé, and contact links remain usable. The original client-only bento/globe section and animation control require JavaScript. There is no claim that the full visual experience works without it.

## Deployment

Netlify builds `master` using `npm run build`, publishes `dist/`, and uses Node 22, as configured in `netlify.toml`. Pushes trigger the existing integration; confirm production content and tests after publication. Do not publish the whole repository or private local PDFs/configuration. Build output excludes source snapshots, node_modules, private résumé files, and documentation.

[Outreach Desk](https://harsh-outreach-desk.hparihar-blogapp.workers.dev) currently permits Google Gmail connection for invited test users. The portfolio links its public guide rather than its private repository. The same current résumé link was already saved in the owner's Outreach Desk profile without changing templates, history, or schedules.

See [PORTFOLIO_REVIEW.md](PORTFOLIO_REVIEW.md) for the inspection and verification record.

## UI refinement — 5 October 2026

Refined the existing design with tighter hero/project spacing, balanced headings, clearer secondary actions, 44 px navigation targets, improved illustration contrast, cleaner bento text/image separation, and visible approach interaction hints. The original spotlight, globe, marquee, pin, border, gradient, canvas, and confetti effects remain. Headline words reveal sooner; pins retain their 3D tilt with less shrink and a shorter transition. Keyboard focus keeps the floating navigation visible. Touch and reduced-motion behavior retain readable content.

Regression checks include visible globe/border frame changes, card bounds and action overlap, navigation target sizes, and the existing responsiveness/accessibility/fallback checks. See the inspection report for actual local and production results.
