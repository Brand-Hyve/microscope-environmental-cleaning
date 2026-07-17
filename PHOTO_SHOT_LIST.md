# Photo Shot List — Microscope Environmental Cleaning

The website is built with tasteful on-brand placeholders everywhere a real photo belongs. Each placeholder
on the site is labeled with the shot it's waiting for. Replace them as photography comes in — the site is
designed to jump up a full quality tier the moment real, authentic imagery lands.

**Guiding principle:** This niche (CIRS / clinical environmental cleaning) lives or dies on looking
*genuinely clinical and legitimate* — NOT generic "guy in a hazmat suit" stock. Real gear, real readings,
real technicians. Natural light. Clean, calm, precise.

---

## Priority 1 — Hero & credibility (shoot these first)

| # | Shot | Where it appears | Notes |
|---|------|------------------|-------|
| 1 | **Technician in containment performing HEPA air wash** | Home hero | The signature image. Containment plastic, PPE, compressed-air tool in action. Slightly heroic angle. |
| 2 | **Close-up of particle counter display showing a reading** | Home (verification section), service pages | The proof shot. Get the actual number legible on the device screen. This is your differentiator made visible. |
| 3 | **Split view: visibly clean room vs. particle-count reading** | Home (philosophy) | A beautiful, clearly clean room — paired or composited with the data. Sells "clean isn't clean enough." |
| 4 | **Owner / lead technician portrait on the job** | About | Real, warm, professional. Builds the personal trust this audience needs. In gear but approachable. |

## Priority 2 — Process & service depth

| # | Shot | Where it appears | Notes |
|---|------|------------------|-------|
| 5 | **Team setting up containment in a home** | About | Zippered containment, negative-air setup. Shows rigor. |
| 6 | **HEPA vacuuming of surfaces/contents** | Service pages | Detail of the fine-particulate work. |
| 7 | **Detailed microfiber wiping** | Service / process | Gloved hands, microfiber, chemical-free — meticulous. |
| 8 | **Moisture investigation: thermal camera / moisture meter in use** | Moisture Investigation service | Thermal image on the screen is a bonus. |
| 9 | **Clinician reviewing an environmental report with homeowner** | Home (for pros), Healthcare Professionals | Can be a warm staged shot. Report/tablet visible. |

## Priority 3 — Per-service representative photos

One representative field photo for each service page (placeholders labeled "[Service] — representative field photo"):

- Environmental Cleaning — whole-home fine-particulate work
- CIRS Cleaning — protocol-aligned, careful detail work
- ERMI Cleaning — dust sampling / high-surface cleaning
- Post-Remediation Verification — inspection + particle count
- Air Sampling & Testing — air pump / cassette sampling
- Mold Remediation — containment + source removal
- Water & Flood Damage — extraction / drying equipment
- Hurricane & Storm Cleanup — post-storm response

## Nice-to-have (adds polish & SEO/social value)

- Equipment "flat lay" — particle counter, HEPA units, meters arranged cleanly (great for About / social).
- Before/after pairs — especially with particle-count numbers for each state.
- Van / branded vehicle (if any) for local-trust and Google Business Profile.
- Team group photo (builds the "real people" trust factor).

---

## Technical specs for the photographer

- **Orientation:** Mostly landscape (4:3 or 16:9). A few verticals fine for mobile.
- **Resolution:** Shoot full-res; deliver ≥ 2000px on the long edge.
- **Format:** JPG or PNG originals; we'll optimize to WebP for the site.
- **Style:** Bright, natural, clean. Avoid heavy filters. Avoid dramatic "hazard" red/yellow staging.
- **Consent:** For any homeowner-visible shots or interiors, get a simple photo release.

## How to swap a placeholder for a real photo (for your developer)

1. Drop the optimized image into `website/public/images/`.
2. Find the matching `<Placeholder shot="..." />` in the page and replace it with:
   `<img src="/images/your-file.webp" alt="Descriptive alt text" class="w-full rounded-[1.25rem] object-cover" style="aspect-ratio:4/3" loading="lazy" />`
3. Write a real, descriptive `alt` (accessibility + SEO).
