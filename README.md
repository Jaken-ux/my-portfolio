# Jacob Jansson — Portfolio

Personal portfolio site for Jacob Jansson, UX Designer. Presents selected
case studies, a set of AI-prototyped builds, writing, and contact details.
Deployed to production at `jacobjansson.vercel.app` via Vercel.

## Stack

- Next.js 16.1.6 (App Router, Turbopack default)
- React 19.2.3, TypeScript 5
- Tailwind CSS 4 (CSS-first `@theme` tokens in `src/app/globals.css`)
- motion v12 (imported from `motion/react`, not `framer-motion`)
- `@vercel/analytics` for basic page-view analytics
- Google Fonts via `next/font`: Inter (body), Archivo (display)

## Running locally

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # run production build
npm run lint       # eslint
```

### Environment variables

One optional variable, with a working fallback:

- `NEXT_PUBLIC_SITE_URL` — used for `metadata`, `robots.ts`, and
  `sitemap.ts` to produce absolute URLs. Falls back to the Vercel preview
  URL if unset.

No secrets, no database, no external APIs.

## Project structure

```
src/
  app/
    (main)/           Public-facing routes with shared layout + page
                      transitions (template.tsx)
      page.tsx        Home — hero + selected work + availability + cycling
                      statement
      about/          About page
      ai-builds/      AI-prototyped builds gallery
      contact/        Contact page
      projects/[slug] Case-study detail pages (SSG from src/data/projects.ts)
      writing/        Writing/notes index
    globals.css       Tailwind @theme tokens + base rules
    layout.tsx        Root layout — font wiring, MotionProvider, analytics
    robots.ts         robots.txt generator
    sitemap.ts        sitemap.xml generator
  components/         Shared UI (Header, Footer, PrimaryCTA, cards, etc.)
  data/projects.ts    Case-study data for /projects/[slug] (title, tags,
                      body, images). Note: Selected Work cards on the home
                      page are hardcoded separately in SelectedWorkMorph.tsx.
  content/            Long-form writing sources
public/               Static assets (images, CVs, favicon)
docs/                 Architecture, decisions, status — read these before
                      making non-trivial changes
```

## Further reading

- `docs/arkitektur.md` — how the site is put together and why the
  non-trivial patterns look the way they do (scroll morph, LCP handling,
  metadata opacity, reduced-motion strategy).
- `docs/beslutslogg.md` — append-only log of significant decisions and
  rejected alternatives.
- `CLAUDE.md` — project-specific rules and known pitfalls.
