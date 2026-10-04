# Harsh Parihar — Portfolio

**Live portfolio:** [pariharharshpfolio.netlify.app](https://pariharharshpfolio.netlify.app/)

**Current résumé:** [View the PDF on Google Drive](https://drive.google.com/file/d/1O71pQua7stH9YqdT9gEX88tqamr7Kqpd/view?usp=sharing)

A responsive portfolio covering backend, full-stack, applied AI, internship experience, education, certifications, and selected projects: DoxChat AI, Outreach Desk, Inkline, and GeneCheck.

The October 2026 update uses the owner-confirmed résumé from Downloads/resume.pdf and the owner-supplied Drive viewer link. Contact and project descriptions were aligned with that version. Public Drive access was checked and the downloaded file matched the confirmed local PDF byte for byte.

## Editing

- `index.html`: content, project cards, links, résumé URL and metadata.
- `style.css`: layout, dark purple theme, responsive breakpoints, and reduced-motion support.
- `app.js`: optional copy-email enhancement and current copyright year.
- `_headers`: Netlify security headers.
- `scripts/build.mjs`: copies only the eight public site files to `dist/`.
- `scripts/browser-test.mjs`: responsive, accessibility, keyboard, clipboard failure and no-JavaScript checks.

The original repository held an exported Next.js build with no React source or build configuration. The active entry point is now editable HTML/CSS/JavaScript. The original compiled `_next` files and illustration assets are retained in Git for reference but are excluded from the new published directory. The original commit is `f8179d8`; a local backup branch named `before-portfolio-review` preserves that state.

## Development and verification

```sh
npm ci
npm run build
npm run check
npm run dev
```

In another terminal, with Google Chrome installed:

```sh
npm run test:browser
npm audit
```

The page remains readable and its links work without JavaScript. Clipboard tests mock successful and denied browser access; they do not send emails. Automated accessibility scans are useful checks, not a complete accessibility certification.

## Hosting

The existing host is Netlify. `netlify.toml` sets the build command to `npm run build`, the publish directory to `dist`, and Node.js to version 22. A site connected to this repository's `master` branch can deploy these changes automatically. A GitHub push alone does not prove that Netlify has published the latest commit; verify the live heading and new Drive résumé link after deployment.

For a manual Netlify deployment, build and upload the contents of `dist/`. Do not upload the entire repository: the legacy export and development files are intentionally excluded from the publish directory.

Outreach Desk demo: https://harsh-outreach-desk.hparihar-blogapp.workers.dev

Google connection on Outreach Desk is currently limited to invited Google test accounts. Its source repository is private, so the portfolio links its live app and public help page rather than an inaccessible code URL.

See [PORTFOLIO_REVIEW.md](PORTFOLIO_REVIEW.md) for findings, validation, résumé notes, and deployment status.
