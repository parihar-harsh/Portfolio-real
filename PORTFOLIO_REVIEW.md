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

The update is prepared for the existing Netlify host with command npm run build and publish directory dist. GitHub push and production smoke-test results will be recorded after publication. No authenticated Netlify connection was available locally during initial inspection.

## References

- [W3C page structure guidance](https://www.w3.org/WAI/tutorials/page-structure/)
- [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
