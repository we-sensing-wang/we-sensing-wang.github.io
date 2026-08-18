# WE-Sensing website

WE-Sensing’s website presents the parent electrochemical sensing company, its primary water and wastewater work, and EVA as a distinct women’s-health venture under development. The current visual system and homepage water/technology content are intentionally preserved.

## Repository architecture

```text
.
├── index.html                     Static homepage and current public surface
├── company/index.html             Static Company and complete team route
├── eva/index.html                 Static dedicated EVA route
├── style.css                      Existing visual system and homepage styles
├── assets/page-extensions.css     Additive Company, team, and EVA styles
├── script.js                      Static navigation, reveal, and contact behavior
├── scripts/
│   ├── team-data.js               Central source for all team names and roles
│   ├── team-renderer.js           Homepage preview and full-directory renderer
│   ├── eva-content.js             Central EVA route, navigation, roadmap, and partnership data
│   ├── eva-page.js                EVA local-navigation and content renderer
│   └── site.js                    Squarespace global behavior
├── template.conf                  Squarespace template configuration
├── site.region                    Squarespace shell and editable CMS regions
├── pages/
│   ├── company.page               Squarespace Company page template
│   ├── company.page.conf
│   ├── eva.page                   Squarespace EVA page template
│   └── eva.page.conf
├── blocks/
│   ├── navigation.block           Squarespace navigation JSON-T
│   ├── company-page.block         Company page content
│   └── eva-page.block             EVA page content
├── styles/site.less               Squarespace template/editor styles
├── assets/
│   ├── asset-registry.json        Machine-readable asset inventory
│   ├── eva/                       EVA social and future product assets
│   └── team/                      Final destination for optimized team portraits
├── ASSET_REPLACEMENT_GUIDE.md     Replacement specifications and instructions
├── REPOSITORY_AUDIT.md            Pre-redesign architecture/live-impact audit
├── sitemap.xml                    Static route registry
└── CNAME                          Existing custom-domain configuration
```

## Page and route structure

- `/` — Home, including Water Sensing, Technology, EVA preview, founder preview, and Contact
- `/eva/` — dedicated EVA page; canonical route `/eva`
- `/company/` — complete team directory; canonical route `/company`

The static server resolves directory indexes automatically. For Squarespace, `pages/eva.page` and `pages/company.page` supply Developer Mode page templates. Create or select pages in the Squarespace Pages panel, assign the matching layout, and use the slugs `eva` and `company`. Navigation collections remain editor-controlled.

No separate Water or Technology route was introduced; existing homepage anchors and content remain unchanged.

## How deployment works

The repository originally exposed a static GitHub Pages surface and did not include a visible Squarespace Developer Platform template. It now contains both the static routes above and a compatible Squarespace 7.0 Developer Mode wrapper.

`main` tracked `origin/main` at audit time, and a push or merge to the live branch may change the public site. Confirm the actual branch configured in GitHub Pages and in the Squarespace admin before publishing. Routine design work must remain on a reviewed feature branch.

The Squarespace template entry points are `template.conf` and `site.region`. The latter preserves:

- `{squarespace-headers}` and `{squarespace-footers}`
- `{squarespace.main-content}`
- editor navigation collections
- `data-content-field` annotations
- the editable Contact Form block field
- editable footer blocks

Do not change DNS, `CNAME`, Google Workspace records, Developer Mode, or the repository connection as part of normal content publishing.

## Previewing the site

From the repository root:

```sh
python3 -m http.server 8000
```

Open:

- `http://localhost:8000/`
- `http://localhost:8000/eva/`
- `http://localhost:8000/company/`

The static pages use repository-relative navigation and assets, so they also remain portable when hosted below a domain subpath. When an HTML file is opened directly from disk, `data-local-page` fallbacks route between the actual `index.html` files; production HTTP navigation continues to use the clean directory routes.

Review at approximately 1440, 1024, 768, and 390 CSS pixels. Check the keyboard-operated menu, visible focus states, reduced-motion behavior, all links, and the contact inquiry selection.

A generic static server cannot render JSON-T, editor block fields, or `{squarespace.main-content}`. Preview the Squarespace layer only after confirming this checkout is attached to the intended Developer Mode site and using Squarespace’s site-aware preview workflow.

## Editing website copy

- Homepage copy remains in `index.html`.
- Team names, roles, groups, descriptions, portraits, and optional biographies live only in `scripts/team-data.js`.
- Shared EVA route settings, local navigation, roadmap stage names, partnership categories, metadata copy, and the required disclaimer live in `scripts/eva-content.js`.
- Long-form static EVA copy lives in `eva/index.html`; keep `blocks/eva-page.block` synchronized for Squarespace.
- Company route framing copy lives in `company/index.html`; keep `blocks/company-page.block` synchronized for Squarespace.

The `.page` templates are repository-controlled layouts, not editor collections. If non-technical editors must own all long-form EVA or Company copy, migrate the approved content into Squarespace page-body blocks while retaining these templates as the layout fallback.

Do not add numerical performance, deployments, customers, regulatory status, clinical outcomes, patents, partnerships, publications, credentials, or institutional affiliations without an approved source.

EVA must always retain this exact statement:

> EVA is currently under development and is not available for clinical diagnosis or treatment decisions.

## Replacing assets

Use `ASSET_REPLACEMENT_GUIDE.md` and update `assets/asset-registry.json` in the same change. Both files record exact paths, content requirements, dimensions, formats, transparency, alt text, priority, and whether code must change.

All EVA product diagrams are intentional HTML/CSS placeholders; the dedicated EVA Open Graph image is at `assets/eva/eva-open-graph.webp`. Missing portraits use neutral initials and a subtle silhouette, never generated faces.

Squarespace template assets have a documented per-file limit; optimize final imagery before committing. Editor/CDN uploads may be preferable for large photography once the CMS connection is confirmed.

## Adding or updating a team member

1. Obtain the approved display name, role, group, portrait, and permission to publish.
2. Export the portrait to a consistent 1000 × 1200 WebP under `assets/team/`.
3. Add or update one member object in `scripts/team-data.js`. Do not hard-code a second copy in a page template.
4. Use `featured: true` only for members intentionally included in the homepage preview; the current preview is limited to the three Co-Founders.
5. Add an approved biography only when it is verified. If none is approved, omit `biography`; the layout does not require filler copy.
6. Update the asset registry and replacement guide if the portrait is absent or approval-dependent.
7. Verify the homepage and complete Company directory at all four review widths.

## Updating navigation

The static global navigation is present in `index.html`, `eva/index.html`, and `company/index.html`. EVA links must use `/eva/`; Company links must use `/company/`; Water, Technology, and Contact retain their homepage anchors. The homepage EVA section remains a preview, not the navigation destination.

Squarespace navigation is editor-controlled: `template.conf` defines `mainNav` and `footerNav`, while `blocks/navigation.block` renders standard pages, external links, folders, submenus, and active states. In the Squarespace Pages panel:

1. Create or expose the EVA page with slug `eva` and the EVA page layout.
2. Create or expose the Company page with slug `company` and the Company page layout.
3. Add EVA and Company to both desired navigation collections.
4. Confirm the editor-generated active state on each route.

Do not replace navigation JSON-T with hard-coded links in `site.region`.

## Modifying the contact form

The static homepage uses the existing mail-client fallback and stores no form data. The EVA partnership buttons link to `/?inquiry=eva#contact`; `script.js` preselects “EVA clinical or research partnership.”

For Squarespace, use the existing `contactFormBlocks` field in `site.region`:

1. Add or edit a Squarespace Form Block in the Contact Form region.
2. Keep the approved inquiry categories, including EVA clinical or research partnership.
3. Ask only for name, work email, category, and message.
4. Never request symptoms, diagnoses, menstrual history, medications, or other personal medical information.
5. Configure storage and notification destinations in Squarespace and submit a real delivery test before publication.

## Known limitations and remaining content needs

- This checkout does not expose the live Squarespace site ID, editor database, deployment webhook, or configured Developer Mode branch, so live CMS rendering cannot be proven locally.
- The static contact form opens the visitor’s email application; a configured Squarespace Form Block is preferred in production.
- No biographies are currently displayed because approved biographical copy was not supplied.
- Approved portraits are still needed for Alyssa Sharrow, Fritz Sonnichsen, Katherine Burns, MD, and Joel Levine, MD.
- Existing portraits and the laboratory image require publication-permission confirmation.
- EVA product renders, application screens, packaging, and technical diagrams require final product/technical review. Current schematic visuals are explicitly documented and avoid fabricated data.
- Development roadmap statuses are intentionally unassigned until project leadership approves them.
- The EVA Open Graph image is suitable for initial review but still requires brand and product-accuracy approval.
- An approved parent-company mark and complete favicon package remain outstanding.
- Partner logos must not be added without permission and verified relationship wording.

## Files and functionality that must not be removed

- `CNAME`
- `index.html`, `style.css`, `script.js`
- `template.conf`, `site.region`
- `blocks/navigation.block`
- `styles/site.less`, `scripts/site.js`
- `pages/*.page`, `pages/*.page.conf`, and their corresponding blocks while those routes are in use
- `scripts/team-data.js` and `scripts/team-renderer.js`
- `scripts/eva-content.js` and `scripts/eva-page.js`
- JSON-T system variables, navigation tags, `data-content-field` annotations, and block fields in `site.region`
- existing image files until replacements are approved and every reference is migrated
- `assets/asset-registry.json` and `ASSET_REPLACEMENT_GUIDE.md`

## Safe publishing checklist

1. Confirm whether GitHub Pages, Squarespace Developer Mode, or both are currently public.
2. Confirm the exact live branch; treat `main` as live until verified.
3. Review the feature branch without committing or pushing directly to the live branch.
4. Back up editor content and capture the current live site before merging.
5. Verify all nine team names, roles, group placement, and portrait permissions.
6. Approve the EVA roadmap status language, product diagrams, Open Graph image, and every factual claim.
7. Create or verify `/eva` and `/company` in the Squarespace Pages panel and update editor navigation.
8. Configure and test the Squarespace Form Block, including the EVA inquiry option.
9. Validate JSON, JSON-T pairs, asset paths, internal links, JavaScript, console output, keyboard navigation, focus states, and reduced motion.
10. Review 1440, 1024, 768, and 390 px layouts with no horizontal overflow.
11. Merge through the normal reviewed workflow; never force-push or rewrite the live branch.
12. Check the live domain immediately after publication and keep a rollback commit available.
