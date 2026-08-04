# Alo Shikkha — Next.js site

A one-to-one online tutoring platform landing page for underprivileged students,
built with Next.js 14 (App Router).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Build for production

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.js      → root layout, loads Google Fonts (Fraunces, Work Sans, JetBrains Mono)
  page.js         → the full landing page (hero, how-it-works, subjects, mentors, pricing, impact, footer)
  globals.css     → all styling (design tokens as CSS variables at the top)
next.config.js    → allows image loading from loremflickr.com (placeholder photography)
```

## Notes

- All photography currently comes from loremflickr.com as placeholders. Before
  going live, replace the `src` values in `app/page.js` with real photos of
  your mentors/students (with consent) or licensed stock images, and add
  their host to `next.config.js` → `images.remotePatterns`, or move them into
  `/public` and reference locally.
- Copy (brand name, pricing tiers, impact stats, testimonials) is placeholder
  content — search `app/page.js` for the numbers and swap in your real ones.
- Colors, type, and the "two overlapping circles" mentor/student mark are
  defined as CSS variables at the top of `globals.css` — change them there to
  re-theme the whole site.
