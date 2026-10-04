# UI and motion refinement — 5 October 2026

The owner requested refinement without degrading the restored design, including checking for weak animations. This update tunes the original presentation; its original visual components remain active.

- Tightened hero and project spacing; balanced headline typography and improved body line height.
- Aligned pin card widths and secondary actions; retain all project text, links, and current résumé/experience facts.
- Raised navigation link targets to 44 px and keep navigation visible when keyboard focus is inside it.
- Improved GeneCheck illustration contrast and separated bento titles from supporting graphics.
- Added subtle approach-card texture and an interaction hint for mouse/keyboard users. Touch and reduced-motion descriptions remain readable.
- Shortened the staggered headline entrance; kept the original 40-degree pin tilt while changing shrink from 0.8 to 0.92 and shortening its transition. No new continuous animation loop was added.
- Added regression checks for visible globe frame changes, moving border updates, card clipping/action overlap at all five widths, and 44 px navigation targets.

Local final Chrome checks passed at 320, 390, 768, 1024, and 1440 px, with nine axe scans and zero reported violations. Actual globe/border/canvas animation updates, original pin/canvas interactions, clipboard/confetti fixtures, motion preferences, keyboard navigation, no-JavaScript links, and touch/storage/WebGL fallbacks passed. There were zero console/hydration errors or failed resources. Screenshots were visually reviewed. Build, syntax, and whitespace checks passed. Clipboard operations are mocked; no emails or messages were sent. Physical-device frame rates, other browser engines, and screen-reader sessions are not verified.

Refinement commit `1e79fed` was pushed to master and published by the existing Netlify integration. A read-only production check confirmed the exact generated page chunk and refined navigation markup. The complete browser suite then passed on https://pariharharshpfolio.netlify.app/: all five screen widths, nine additional axe scans with zero reported violations, globe/border/canvas frame changes, 44 px navigation targets, card bounds and secondary-action overlap, original hover/focus effects, clipboard/confetti fixtures, motion persistence, system reduced motion, no-JavaScript links, and touch/storage/WebGL fallbacks. There were zero console/hydration errors or failed resources. The refinement has 18 final scans across local and production. No server-side user data was changed and no emails were sent. The subsequent documentation commit does not change the built UI.

Guidance consulted: [W3C target-size guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), [web.dev animation guidance](https://web.dev/articles/animations-guide). These inform the refinements; automated tests do not establish full accessibility compliance.

---

# Original portfolio design restoration

Restoration requested 4 October 2026 after the owner identified the loss of their original animations and visual design. The static redesign and lightweight interactive update documented below are superseded. Their past test results do not constitute verification of this restoration.

## Current changes

- Restored the actual original export from commit `f8179d8`: spotlights, animated headline, bento illustrations, rotating WebGL globe and arcs, technology marquee, 3D pin cards, animated border highlights, hover canvas effects, gradient contact card, and copy confetti.
- Publish the original runtime and illustration assets again. The previous build published only eight static files and excluded these effects.
- Keep the current Drive résumé, confirmed contact address, SAIG/Brainwave experience, and accurate project descriptions. Feature DoxChat AI, Outreach Desk, Inkline, GeneCheck, and the original Payments project.
- Keep public live/demo links and separate code/guide links. Do not expose Outreach Desk's private repository.
- Update initial HTML and hydrated React content together; avoid reverting facts when the page becomes interactive.
- Correct an original globe defect: arc records lacked point coordinates. Its point layer now uses the deduplicated endpoint records already computed by the component.
- Add keyboard focus to the original pin/canvas interactions and touch-readable approach descriptions, semantic heading levels, a skip link, and visible focus. Remove buttons nested within anchors and nonfunctional phase buttons.
- Retain motion preference controls and system reduced-motion support. Static globe/approach fallbacks handle missing WebGL. Clipboard errors are actionable and success/confetti follow acceptance; confetti plays once.
- Generate hashes for the required inline bootstrap scripts instead of permitting arbitrary inline scripts. Inline styles remain allowed because the original runtime uses style attributes and generated style elements.
- The preserved export is not a recovered React source project. Transformations are checked and reproducible but future framework upgrades need source reconstruction or the original source repository. npm audit covers installed tooling, not these prebuilt chunks.

## Restoration verification

Local Chrome tests passed at 320, 390, 768, 1024, and 1440 px with nine axe WCAG A/AA scans and zero reported violations. Verified globe rendering, pin hover and keyboard tilt, canvas reveal on keyboard focus, current content and links, skip navigation, motion switching/persistence, system reduced motion, no-JavaScript readable links, and touch/storage-denied/WebGL-unavailable fallbacks. Clipboard success/failure used isolated browser mocks. There were zero console/hydration errors or failed resources. Desktop/mobile and active approach screenshots were visually reviewed.

The final asset-fingerprinting build also passed a local smoke test with production CSP, one rendered globe, five projects, the correct résumé, zero console errors/resources failures, and a successful motion switch. Build, syntax, whitespace, and tooling dependency audit passed (zero vulnerabilities reported). Restoration commit `02c3353` was pushed to `master` and automatically published by the existing Netlify integration. The production page returned HTTP 200 and referenced the exact generated page component hash. Netlify adds a hosting comment to the HTML, so the downloaded HTML is not byte-identical to the local build. The live security header contains the generated script hashes.

The complete final browser suite passed again on https://pariharharshpfolio.netlify.app/: all five viewport sizes, nine additional axe scans with zero reported violations, original globe/pin/canvas behavior, keyboard navigation, correct content/links, mocked clipboard success/failure and one-time confetti, persisted motion preferences, system reduced motion, no-JavaScript links, and touch/storage/WebGL fallbacks. There were zero console/hydration errors or failed resources. The restoration has 18 final axe scans across local and production tests. Production screenshots were captured. These tests did not send emails or modify any app account data.

These are Chrome checks, including touch emulation and software WebGL. Physical-device performance, other browser engines, screen-reader sessions, native zoom, actual clipboard access, and authenticated project workflows were not verified. The original bento requires JavaScript; unsupported WebGL uses a static illustration. No emails or contact messages were sent.

Research: [W3C reduced-motion technique](https://www.w3.org/WAI/WCAG22/Techniques/css/C39), [Next.js Content Security Policy](https://nextjs.org/docs/app/guides/content-security-policy), and [three-globe point-layer documentation](https://github.com/vasturiano/three-globe/blob/master/README.md).

---

# Historical résumé review and superseded design updates

# Portfolio and résumé review

Reviewed 4 October 2026.

## Evidence

- Existing GitHub repository: parihar-harsh/Portfolio-real, master, original commit f8179d8.
- Existing live portfolio: https://pariharharshpfolio.netlify.app/.
- Old Google Docs résumé linked from that site, downloaded and text/layout reviewed.
- Owner confirmed Downloads/resume.pdf as the current résumé. One-page PDF rendered and visually reviewed; selectable text extracted with pdftotext.
- Owner supplied a new Drive viewer link. The unauthenticated download returned a PDF identical to the confirmed local file.
- DoxChat's current GitHub README; local Inkline and genetic-risk-analyzer README/code context; Outreach Desk implementation and existing verified tests.
- No owner background claims were invented or independently reverified as employment/certification facts.

## Changes

- Current Drive résumé linked from both header and hero.
- Replaced outdated DevOps-focused positioning with backend, full-stack and applied-AI work drawn from the current résumé.
- SAIG and Brainwave experience, education dates, New Delhi location and 400+ DSA count follow the current résumé. Older Google Docs/Apex Planet claims were not mixed into the newer version.
- Featured DoxChat AI, Outreach Desk, Inkline and GeneCheck. Earlier Payments and AWS deployment repositories remain discoverable.
- Fixed gmail.co typo to the confirmed gmail.com address and directed project navigation to the actual project section.
- Removed the old 60% cost reduction and 2 ms latency copy from the website; neither appears in the confirmed résumé used for this update.
- Described genetic analysis as educational exact variant matching, consistent with the current repository, rather than promising diagnosis or validated risk probabilities.
- Outreach Desk notes invited-test-user access and does not link the private source repository.
- Replaced the uneditable compiled entry point with readable static source while preserving the dark purple visual style and keeping old compiled assets in version history.
- Added one h1, semantic landmarks, heading hierarchy, skip link, visible focus, named links, reduced-motion support, responsive layouts, actionable clipboard failure feedback and no-JavaScript fallback.
- Added title, description, canonical/social metadata, favicon, sitemap, robots and Netlify headers. The publish directory contains only intended website files.

## Résumé findings

The confirmed résumé has readable text, consistent hierarchy and no clipping/overlap found in the rendered one-page review. It is substantially more current than the old linked Google Docs résumé, whose position, location, experience and project descriptions differ. The PDF itself was not edited.

Potential improvements for a future résumé revision:

- Keep the project name consistent: the résumé says GeneCheck while the current repository README brands the application Helix Genetic Variant Explorer. The portfolio follows the résumé and links the correct repository.
- The résumé is dense, especially the GeneCheck section. Shorter bullets or role-specific variants would improve quick scanning. This is editorial advice, not evidence of a rendering fault.
- Consider adding Outreach Desk to a targeted backend/cloud résumé if it better supports the job than another project. Describe implemented safeguards and automated tests; real email delivery remains unverified.
- The PDF is not tagged for accessibility. Selectable text and visual review do not prove correct screen-reader reading order.
- Quantities and test counts in a résumé are time-specific; no claim was made that this review reran every other project's test suite or independently proved internship achievements.

## Checks performed

- Build and JavaScript syntax checks passed.
- Five Chrome viewport checks: 320, 390, 768, 1024 and 1440 pixels; no horizontal overflow.
- Five axe scans with WCAG A/AA tags: zero reported violations.
- Keyboard skip link and focus transfer, project-section navigation and reduced-motion behavior passed.
- Narrow 640 px layout used as a reflow approximation for a 200% desktop zoom; not a browser's native zoom control.
- Clipboard success and permission-denied fixtures passed; the button recovers and the error gives a manual alternative.
- No-JavaScript page retains content and contact links, hides unavailable copy control.
- No browser page errors or failed local resource requests.
- Full-page desktop/mobile screenshots visually reviewed; artifacts are local in /tmp/portfolio-review-20261004.
- Résumé, three live project URLs, Outreach help and all linked GitHub repositories returned HTTP 200. LinkedIn returned its automated-request blocking status 999; it was not independently verified.
- npm install/audit reported zero dependency vulnerabilities.
- Git whitespace check passed.

Manual screen-reader usability, physical-device tests, all browser engines, native browser zoom, real clipboard writes and authenticated project workflows were not tested. No contact messages or real emails were sent.

## Cold-email résumé update

The owner explicitly requested the same Drive URL in the original Outreach Desk workspace. The update used optimistic profile revision checking and an immediate private pre-change snapshot. Afterward, only profile.resumeUrl differed; templates, restore backups, email history and schedules were identical. No emails were sent.

## Deployment status

The update was pushed to master as a33cee6 and published automatically by the existing Netlify integration. The live URL returned HTTP 200 with the new heading, Outreach Desk project and exact new Drive résumé link; a Content-Security-Policy header was present. The same browser suite passed on production: five additional axe scans with zero reported violations, all five viewport sizes, keyboard/project navigation, reduced motion, clipboard fixtures and no-JavaScript checks. There were no page errors or failed same-origin resources. There are ten axe scans total across local and live checks. Clipboard checks on production were mocked in the browser and did not modify server data. The final documentation commit does not change the built site files. GitHub now also lists the live URL in the repository About section. No manual Netlify login or host migration was needed.

## References

- [W3C page structure guidance](https://www.w3.org/WAI/tutorials/page-structure/)
- [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

## Interactive update — 4 October 2026

Added short section/card reveals, a one-time hero entrance, mouse-only card tilt, hover/focus feedback, project filtering, a sticky section-aware header and a reading-progress indicator. There is no continuously running JavaScript animation loop. Animation uses opacity/transforms; scroll and pointer work are scheduled at most once per animation frame per handler. No new dependencies were added.

Added an Animations toggle with guarded local storage, cross-tab preference updates and system reduced-motion priority. Disabling motion cancels active animations and resets card tilt. Content is visible by default, including when animation APIs are absent; controls appear only after their handlers are attached. Filter buttons use ordinary native buttons with pressed state and a live result count. Navigation and animation controls have 44 px minimum heights.

The local Chrome suite passed with seven axe scans and zero reported violations. It checked all five viewport sizes, keyboard filtering, filter counts, focus retention, active navigation, pointer tilt/reset, saved motion preferences, live system reduced-motion changes, no-JavaScript behavior, denied storage, unavailable IntersectionObserver, and existing clipboard recovery. An observer-unavailable fallback defect discovered during testing was fixed before deployment. Browser media-preference assertions wait for the actual change event. All final local checks passed without page errors or failed resources.

The interactive update was pushed as c8fc76f and automatically deployed to Netlify. Production returned HTTP 200 and the exact new filter/motion code. The complete suite passed on production with seven additional axe scans and zero reported violations: 14 scans total for this interactive update across local and live tests. All five viewport sizes, filter/keyboard/focus behavior, active navigation, pointer tilt/reset, persisted preferences, live system reduced-motion changes, denied-storage/observer-unavailable recovery and no-JavaScript fallbacks passed. No page errors or failed same-origin resources were reported. Tests cover Chrome and a touch-emulated mobile context; they do not establish frame rates on physical devices or correctness in every browser engine. Desktop and mobile screenshots were also reviewed. A later documentation-only commit does not change built site files.

Research: [web.dev animation performance](https://web.dev/articles/animations-guide), [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), and [W3C animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).
