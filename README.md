# Microscope Environmental Cleaning — Website

A fast, mobile-first marketing site built with **Astro 5** + **Tailwind CSS v4**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output to dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  data/site.ts            # ← EDIT HERE: NAP, services, service areas, process steps
  layouts/BaseLayout.astro# SEO, fonts, header/footer wrapper
  components/             # Header, Footer, AssessmentForm, CtaBand, Placeholder, icons
  pages/                  # Home, About, Services (+ dynamic), Healthcare, Areas, Contact, Blog
  content/blog/           # Markdown blog posts
  styles/global.css       # Design system (brand colors, buttons, cards)
public/
  logo.svg  favicon.svg
PHOTO_SHOT_LIST.md        # Photos to capture; each site placeholder is labeled to match
```

## Before launch — checklist

- [ ] **Form endpoint:** `src/components/AssessmentForm.astro` uses a Formspree placeholder
      (`https://formspree.io/f/REPLACE_WITH_FORM_ID`). Swap for a real Formspree ID, Netlify Forms,
      or a backend. Test a submission.
- [ ] **Domain:** set the final URL in `astro.config.mjs` (`site:`) so the sitemap/canonicals are correct.
- [ ] **Email:** confirm the real inbox in `src/data/site.ts` (`email`).
- [ ] **Logo:** current file is the old-brand logo (SVG wrapping a raster). Replace with a refined
      "Microscope Environmental Cleaning" wordmark when ready.
- [ ] **Photos:** replace placeholders per `PHOTO_SHOT_LIST.md`.
- [ ] **Content review:** all copy is written to be reviewed/edited by the owner.
- [ ] **Testimonials / certifications / particle-counter specs:** add when supplied.

## Deploy

Static output — deploys anywhere. Recommended: **Vercel** or **Netlify** (connect the repo, framework
auto-detected as Astro, build `npm run build`, output `dist/`).

## Notes

- Brand colors live as CSS variables in `global.css` (`--color-spa-*`, `--color-brand-*`, `--color-ink-*`).
- Trauma/crime-scene cleanup was intentionally excluded from services.
- Restoration services are kept but presented as understated/secondary to the premium environmental line.
