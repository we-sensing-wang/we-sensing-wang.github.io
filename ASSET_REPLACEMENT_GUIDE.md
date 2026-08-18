# WE-Sensing asset replacement guide

This guide covers every temporary or approval-dependent visual. The matching machine-readable source is `assets/asset-registry.json`. Paths beginning with `/` are public-site paths from the repository root.

## EVA page assets

### EVA-HERO-001 — Hero product system

- **Page:** EVA
- **Section:** Hero
- **Current implementation:** Generated premium editorial product-system render showing the EVA pad concept, detachable reader, and application
- **Exact current location:** `assets/eva/eva-hero-product.webp`; rendered by `eva/index.html` and `blocks/eva-page.block` (`.eva-product-stage--render`)
- **Final replacement path:** `/assets/eva/eva-hero-product.webp`
- **Required visual content:** Premium three-quarter product render showing the smart sensing pad, sensing layer, detachable reader, and application as one coherent system; no anatomical or diagnostic imagery
- **Recommended dimensions:** 1800 × 1600 px
- **Recommended format:** WebP with a high-resolution PNG source
- **Transparent background required:** Yes
- **Alt text:** “Concept illustration of the EVA smart sensing pad, detachable reader, and application”
- **Replacement priority:** High
- **Replacement instructions:** Review the current render for product accuracy, replace the WebP file in place, and retain the semantic figcaption and responsive crop
- **Code modifications required:** No if the path remains unchanged

### EVA-PAD-FRONT-001 — Pad front view

- **Page:** EVA
- **Section:** Product Design
- **Current implementation:** CSS product-style front-view pad schematic
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-gallery-card--front`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-pad-front.webp`
- **Required visual content:** Approved top view of the disposable smart sensing pad with a discreet indication of the integrated sensing region
- **Recommended dimensions:** 1400 × 1800 px
- **Recommended format:** WebP
- **Transparent background required:** Yes
- **Alt text:** “Front view of the EVA smart sensing pad concept”
- **Replacement priority:** High
- **Replacement instructions:** Replace only the gallery visual; preserve the heading, explanatory text, and accessible reading order
- **Code modifications required:** Yes

### EVA-PAD-BACK-001 — Pad rear view

- **Page:** EVA
- **Section:** Product Design
- **Current implementation:** CSS product-style rear-view pad schematic
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-gallery-card--back`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-pad-back.webp`
- **Required visual content:** Approved rear view showing the waterproof backing and reader connection concept, without unapproved dimensions
- **Recommended dimensions:** 1400 × 1800 px
- **Recommended format:** WebP
- **Transparent background required:** Yes
- **Alt text:** “Rear view of the EVA smart sensing pad concept”
- **Replacement priority:** High
- **Replacement instructions:** Replace only the gallery visual and retain the current text description; do not add manufacturing or performance claims
- **Code modifications required:** Yes

### EVA-PAD-EXPLODED-001 — Exploded pad layers

- **Page:** EVA
- **Section:** Product Design
- **Current implementation:** Accessible CSS exploded-layer diagram with six labeled conceptual layers
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-layer-stack`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-pad-exploded.webp`
- **Required visual content:** Skin-contact top layer, fluid distribution or sensing layer, absorbent core, waterproof backing, integrated electrode region, and connection to the detachable reader
- **Recommended dimensions:** 1800 × 1400 px
- **Recommended format:** WebP or SVG
- **Transparent background required:** Yes
- **Alt text:** “Exploded conceptual layers of the EVA sensing pad”
- **Replacement priority:** High
- **Replacement instructions:** Replace the visual while keeping all six layer names in semantic HTML outside or alongside the image
- **Code modifications required:** Yes

### EVA-ELECTRODE-001 — Sensor electrode close-up

- **Page:** EVA
- **Section:** Technology
- **Current implementation:** CSS close-up of flexible electrode traces and fluid interaction
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-electrode-detail`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-electrode-detail.webp`
- **Required visual content:** Scientifically reviewed macro illustration or photograph of flexible sensor elements interacting with collected fluid; no unvalidated biomarker labels
- **Recommended dimensions:** 1600 × 1200 px
- **Recommended format:** WebP or SVG
- **Transparent background required:** No
- **Alt text:** “Conceptual flexible electrochemical sensing interface within the EVA pad”
- **Replacement priority:** Medium
- **Replacement instructions:** Replace the current visual and obtain technical review for any labels added to the final artwork
- **Code modifications required:** Yes

### EVA-READER-001 — Detachable reader

- **Page:** EVA
- **Section:** Product Design
- **Current implementation:** CSS product-style reusable reader schematic
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-reader-render`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-reader.webp`
- **Required visual content:** Approved detachable reusable reader render showing connection intent without unverified controls or specifications
- **Recommended dimensions:** 1400 × 1200 px
- **Recommended format:** WebP
- **Transparent background required:** Yes
- **Alt text:** “Concept render of the detachable EVA reusable reader”
- **Replacement priority:** High
- **Replacement instructions:** Replace the reader schematic while maintaining a clear distinction between reusable electronics and the disposable pad
- **Code modifications required:** Yes

### EVA-KIT-001 — Starter kit packaging

- **Page:** EVA
- **Section:** Product Design
- **Current implementation:** CSS packaging concept
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-kit-render`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-starter-kit.webp`
- **Required visual content:** Approved packaging concept presenting pads and the reader discreetly, without quantity, availability, or regulatory claims
- **Recommended dimensions:** 1600 × 1200 px
- **Recommended format:** WebP
- **Transparent background required:** Yes
- **Alt text:** “Concept packaging for an EVA starter kit”
- **Replacement priority:** Medium
- **Replacement instructions:** Replace after industrial-design and labeling review; retain the under-development context
- **Code modifications required:** Yes

### EVA-APP-001 — Application interface

- **Page:** EVA
- **Section:** Product Design
- **Current implementation:** CSS mobile-interface concept using non-numerical longitudinal trend lines
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-app-render`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-app-interface.webp`
- **Required visual content:** Reviewed mobile interface organizing measurements and longitudinal trends without diagnosis, alerts, patient data, or fabricated values
- **Recommended dimensions:** 1200 × 2000 px
- **Recommended format:** WebP
- **Transparent background required:** Yes
- **Alt text:** “Concept EVA application interface showing longitudinal trends”
- **Replacement priority:** High
- **Replacement instructions:** Replace the screen schematic and complete privacy, accessibility, and clinical-language review before publication
- **Code modifications required:** Yes

### EVA-TIMELINE-001 — Clinical visit timeline

- **Page:** EVA
- **Section:** The Need
- **Current implementation:** Responsive semantic HTML/CSS timeline placing conceptual EVA measurements between two clinical visits
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-timeline`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-clinical-timeline.svg`
- **Required visual content:** Clinical visit, time between visits with EVA measurements, and a later clinical visit; no dates, results, or frequency promises
- **Recommended dimensions:** 1800 × 600 px
- **Recommended format:** SVG
- **Transparent background required:** Yes
- **Alt text:** “Timeline showing conceptual EVA measurements between clinical visits”
- **Replacement priority:** Low; the current diagram is suitable for initial launch
- **Replacement instructions:** Preserve the explanatory text in semantic HTML and ensure meaning is not communicated only with color
- **Code modifications required:** Yes

### EVA-WORKFLOW-001 — How-it-works workflow

- **Page:** EVA
- **Section:** How It Works
- **Current implementation:** Responsive four-stage HTML/CSS workflow for Use, Sense, Interpret, and Understand
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-how-grid`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-how-it-works.svg`
- **Required visual content:** Four connected stages—Use, Sense, Interpret, Understand—without implying a confirmed diagnosis
- **Recommended dimensions:** 2000 × 720 px
- **Recommended format:** SVG
- **Transparent background required:** Yes
- **Alt text:** “EVA workflow from using the sensing pad to viewing longitudinal trends”
- **Replacement priority:** Low; the current diagram is suitable for initial launch
- **Replacement instructions:** Retain numbered text labels, semantic supporting copy, and a logical mobile reading order
- **Code modifications required:** Yes

### EVA-TECH-ARCH-001 — Technology architecture

- **Page:** EVA
- **Section:** Technology
- **Current implementation:** Responsive HTML/CSS architecture diagram linking sensing interface, fluid interaction, reader, and signal interpretation
- **Exact current location:** `eva/index.html` and `blocks/eva-page.block` (`.eva-tech-architecture`); `assets/page-extensions.css`
- **Final replacement path:** `/assets/eva/eva-technology-architecture.svg`
- **Required visual content:** Conceptual flow from the flexible sensing interface and fluid interaction through reusable electronics to longitudinal interpretation
- **Recommended dimensions:** 2000 × 900 px
- **Recommended format:** SVG
- **Transparent background required:** Yes
- **Alt text:** “Conceptual EVA technology architecture from sensing interface to trend interpretation”
- **Replacement priority:** Low; the current diagram is suitable for initial launch
- **Replacement instructions:** Keep module descriptions as live text and obtain technical review for new terminology
- **Code modifications required:** Yes

### EVA-OG-001 — EVA Open Graph image

- **Page:** EVA
- **Section:** Social sharing metadata
- **Current implementation:** Generated editorial product-system image in the EVA palette using the approved headline
- **Exact current location:** `assets/eva/eva-open-graph.webp`; referenced in `eva/index.html` Open Graph and Twitter metadata
- **Final replacement path:** `/assets/eva/eva-open-graph.webp`
- **Required visual content:** Approved EVA wordmark, exact headline, and respectful product-system visualization with no clinical or availability claims
- **Recommended dimensions:** 1200 × 630 px, central safe area 1080 × 560 px
- **Recommended format:** WebP or JPEG, sRGB, under 500 KB
- **Transparent background required:** No
- **Alt text:** “EVA — A familiar pad. A new layer of health insight.”
- **Replacement priority:** Medium; the current image is suitable for initial launch after product and brand review
- **Replacement instructions:** Review text rendering and product accuracy, replace the file in place, then configure the same image in Squarespace social-sharing settings
- **Code modifications required:** No if the path remains unchanged

## Team assets

### TEAM-001 — Team at work photograph

- **Page:** Home / Company
- **Section:** Team preview
- **Current implementation:** Optimized WebP derived from the existing repository laboratory photograph and used on the Home and Company pages
- **Exact current location:** `assets/team/team-at-work.webp`, `index.html` (`.lab-figure`), `company/index.html` (`.team-page-hero__image`), and `blocks/company-page.block`
- **Final replacement path:** `/assets/team/team-at-work.webp`
- **Required visual content:** Approved candid image of WE-Sensing team members working with sensing equipment; no confidential data visible
- **Recommended dimensions:** 2000 × 1480 px
- **Recommended format:** WebP
- **Transparent background required:** No
- **Alt text:** “WE-Sensing team members examining a sensing component in a laboratory”
- **Replacement priority:** Medium
- **Replacement instructions:** Confirm permission and replace the WebP file in place while retaining the current crop and intrinsic dimensions
- **Code modifications required:** No if the path remains unchanged

### TEAM-002 — Existing member portraits

- **Page:** Home / Company
- **Section:** Co-Founders and Business Team
- **Current implementation:** Existing root-level PNG portraits referenced centrally for Xingyu Wang, Baikun Li, Yu Lei, James Towey, and Gregory Lewis
- **Exact current location:** `xingyu.png`, `baikun.png`, `yulei.png`, `jim.png`, and `greg.png`; referenced only by `scripts/team-data.js`
- **Final replacement path:** `/assets/team/{person-slug}.webp`
- **Required visual content:** Approved, consistently lit head-and-shoulders portraits on a restrained neutral background
- **Recommended dimensions:** 1000 × 1200 px per person
- **Recommended format:** WebP
- **Transparent background required:** No
- **Alt text:** Each person’s approved display name
- **Replacement priority:** Medium
- **Replacement instructions:** Replace one file at a time, update the matching portrait path in `scripts/team-data.js`, and retain the consistent 5:6 crop
- **Code modifications required:** Yes

### TEAM-003 — Missing member portraits

- **Page:** Company
- **Section:** Product Team and Scientific Advisory Board
- **Current implementation:** Refined neutral initials and silhouette placeholders; no realistic or AI-generated faces
- **Exact current location:** Null portrait values in `scripts/team-data.js`; placeholder renderer in `scripts/team-renderer.js`; styles in `assets/page-extensions.css`
- **Final replacement path:** `/assets/team/alyssa-sharrow.webp`, `/assets/team/fritz-sonnichsen.webp`, `/assets/team/katherine-burns.webp`, and `/assets/team/joel-levine.webp`
- **Required visual content:** Approved, consistently lit portraits for Alyssa Sharrow, Fritz Sonnichsen, Katherine Burns, MD, and Joel Levine, MD
- **Recommended dimensions:** 1000 × 1200 px per person
- **Recommended format:** WebP
- **Transparent background required:** No
- **Alt text:** Each person’s approved display name
- **Replacement priority:** High
- **Replacement instructions:** Add the approved files, set the corresponding `portrait` value in `scripts/team-data.js`, and verify image permission. The centralized renderer will replace the initials automatically.
- **Code modifications required:** Yes

No placeholder biographies are displayed. The centralized data format supports an optional biography field, but it is intentionally omitted until approved copy is available; therefore there is no visitor-facing placeholder biography to replace.

## Other existing or temporary assets

### BRAND-001 — Primary brand mark and favicon

- **Page:** Global
- **Section:** Navigation, footer, browser icon
- **Current implementation:** Custom geometric W mark and simplified favicon
- **Exact current location:** `index.html`, `company/index.html`, `eva/index.html`, `site.region`, and `assets/favicon.svg`
- **Final replacement path:** `/assets/we-sensing-mark.svg` and `/assets/favicon.svg`
- **Required visual content:** Approved WE-Sensing parent-company mark legible at 24–40 px
- **Recommended dimensions:** Vector master; 64 × 64 favicon artboard
- **Recommended format:** SVG
- **Transparent background required:** Yes
- **Alt text:** “WE-Sensing” for a linked full logo; empty alternative for a decorative mark beside visible text
- **Replacement priority:** High
- **Replacement instructions:** Replace all mark instances while preserving the accessible brand label
- **Code modifications required:** Yes

### HOME-001 — Fluid/electrode hero visual

- **Page:** Home
- **Section:** Hero
- **Current implementation:** Responsive inline SVG showing fluid, ions, electrode array, and a non-numerical signal trace
- **Exact current location:** `index.html` (`.hero-instrument`); `style.css`
- **Final replacement path:** `/assets/home-hero-interface.webm` with `/assets/home-hero-interface.webp` poster, or approved SVG
- **Required visual content:** Scientifically grounded fluid/electrode interface with no fabricated readings or stock water-drop imagery
- **Recommended dimensions:** 1600 × 1500 px master
- **Recommended format:** WebM plus WebP poster, or optimized SVG
- **Transparent background required:** No
- **Alt text:** “Fluid interacting with an electrochemical sensing interface”
- **Replacement priority:** Medium
- **Replacement instructions:** Replace the inline visual and retain a static fallback plus reduced-motion behavior
- **Code modifications required:** Yes

### WATER-001 — Multi-channel water signal visual

- **Page:** Home / Water Sensing
- **Section:** Monitoring gap
- **Current implementation:** Responsive inline SVG with three unlabeled, non-numerical signal channels
- **Exact current location:** `index.html` (`.water-field`); `style.css`
- **Final replacement path:** `/assets/water-multichannel-visual.svg`
- **Required visual content:** Approved parallel sensing channels changing over time; no performance values or parameter names unless verified
- **Recommended dimensions:** 1800 × 720 px
- **Recommended format:** SVG
- **Transparent background required:** Yes
- **Alt text:** “Conceptual multi-channel water sensing signals changing over time”
- **Replacement priority:** Low; current visual is suitable for initial launch
- **Replacement instructions:** Preserve `viewBox` responsiveness and the semantic legend
- **Code modifications required:** Yes

### TECH-001 — Electrochemical technology stack

- **Page:** Home / Technology
- **Section:** Complete sensing stack
- **Current implementation:** Four-layer CSS diagram paired with explanatory copy
- **Exact current location:** `index.html` (`.stack-visual`); `style.css`
- **Final replacement path:** `/assets/technology-stack.svg`
- **Required visual content:** Interface, electronics, signal interpretation, and application layers in that order
- **Recommended dimensions:** 1400 × 1400 px
- **Recommended format:** SVG
- **Transparent background required:** Yes
- **Alt text:** “Four-layer electrochemical sensing stack from interface to application”
- **Replacement priority:** Low; current visual is suitable for initial launch
- **Replacement instructions:** Preserve the adjacent semantic text list even if the diagram is replaced
- **Code modifications required:** Yes

### EVA-001 — Homepage EVA overview visual

- **Page:** Home / EVA
- **Section:** Venture introduction
- **Current implementation:** Inline SVG/CSS concept of the pad, reader, and application
- **Exact current location:** `index.html` (`#eva .eva-visual`); `style.css`
- **Final replacement path:** `/assets/eva/eva-product-system.webp`
- **Required visual content:** Discreet overview of the smart pad, separate reusable reader, and neutral application interface
- **Recommended dimensions:** 2000 × 1400 px desktop; 1200 × 1600 px mobile
- **Recommended format:** WebP or AVIF
- **Transparent background required:** Yes
- **Alt text:** “Conceptual EVA smart pad, reusable reader, and application workflow”
- **Replacement priority:** High
- **Replacement instructions:** Replace in place, retain the under-development notice, and verify that no interface text implies diagnosis or availability
- **Code modifications required:** Yes

### SOCIAL-001 — Parent-brand Open Graph image

- **Page:** Global
- **Section:** Social sharing
- **Current implementation:** Generated editorial fluid/electrode card with the approved homepage tagline
- **Exact current location:** `assets/og/we-sensing-social.jpg`; metadata in `index.html` and `company/index.html`
- **Final replacement path:** `/assets/og/we-sensing-social.jpg`
- **Required visual content:** WE-Sensing mark, approved tagline, and restrained fluid/electrode interface
- **Recommended dimensions:** 1200 × 630 px
- **Recommended format:** JPEG, sRGB, under 500 KB
- **Transparent background required:** No
- **Alt text:** “WE-Sensing — Make invisible chemistry measurable”
- **Replacement priority:** Medium
- **Replacement instructions:** Review brand accuracy, replace in place, and configure the same image in Squarespace social-sharing settings
- **Code modifications required:** No if the path remains unchanged

### PARTNER-001 — Partner or credibility logos

- **Page:** Home
- **Section:** Credibility indicators
- **Current implementation:** Capability labels are shown instead of unverified organization logos
- **Exact current location:** `index.html` (`.credibility`)
- **Final replacement path:** `/assets/partners/{approved-partner-slug}.svg`
- **Required visual content:** Only logos for organizations that explicitly approve public display and the stated relationship
- **Recommended dimensions:** Vector source normalized to a 160 × 48 px display box
- **Recommended format:** SVG
- **Transparent background required:** Yes
- **Alt text:** Approved organization name
- **Replacement priority:** Low until approvals exist
- **Replacement instructions:** Obtain written approval, record relationship wording, and never imply partnership from affiliation alone
- **Code modifications required:** Yes
