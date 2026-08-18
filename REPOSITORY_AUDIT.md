# Repository audit

Audit date: 2026-07-29

## Executive finding

The repository at the start of the redesign was not a Squarespace Developer Platform template. It was a static GitHub Pages-style site whose public domain served `index.html` directly. No Squarespace template configuration, regions, JSON-T, LESS, blocks, collections, pages, or CMS injection points existed in the repository or its Git history.

This is important because a true Squarespace Developer Platform template requires, at minimum, `template.conf` and a `.region` file. The redesign adds those missing structures without deleting the static deployment surface that currently powers the public domain.

## Pre-redesign architecture

| Area | Finding |
| --- | --- |
| Template architecture | Plain static HTML/CSS/JavaScript; no Squarespace architecture present |
| Primary layout | `index.html` |
| Stylesheets / LESS | `style.css`; no LESS files |
| JavaScript | `script.js`; navigation, scroll effects, parallax, console/debug helpers |
| Static pages | One static page (`index.html`) |
| Collection templates | None |
| JSON-T | None |
| Navigation | Hard-coded anchor list in `index.html` |
| Footer | Hard-coded footer in `index.html` |
| Assets | Root-level logo, laboratory image, hero photograph, and five team portraits |
| Squarespace editor content | None represented in the repository |
| Live-impacting branch | `main`, tracking `origin/main` |
| Live-impacting files | `index.html`, `style.css`, `script.js`, root image assets, and `CNAME` |

## Git and deployment finding

- `origin` points to `wesensing/we-sensing.com.git`.
- `main` is the remote default branch and was synchronized with `origin/main` at audit time.
- The domain `https://we-sensing.com/` served copy identical to the checked-in `index.html` at audit time.
- `CNAME` contains `we-sensing.com`, which is consistent with a custom-domain static hosting setup.
- No commit in the visible history contained Squarespace Developer Platform files.

No DNS, Google Workspace, Developer Mode, remote connection, production settings, or live content were changed during this work.

## Content and claim risks found

The former homepage contained broad and unsupported claims about AI, medical-grade sensing, predictive analytics, autonomous calibration, deployments, and unrelated market sectors. It also published a clearly fabricated `+1 (555)` phone number, an unverified street address, empty social links, and detailed career-duration claims. The redesign removes these from visitor-facing copy. Names, portraits, and roles already present in the repository are retained without adding credentials.

## Added Squarespace-safe surfaces

- `template.conf`: layouts, stylesheet loading order, and editable navigation areas.
- `site.region`: global header/footer, metadata injection points, CMS main-content injection, contact and footer block fields.
- `blocks/navigation.block`: navigation JSON-T with active, external-link, folder, and submenu handling.
- `styles/site.less`: Squarespace template and editor-content styles.
- `scripts/site.js`: accessible mobile navigation.

The public static homepage remains `index.html`. The Squarespace region intentionally renders `{squarespace.main-content}` rather than hard-coding editor-owned page content.
