# CLAUDE.md

## Projekt

Jacob Janssons personliga portfolio-sajt. Stack: Next.js 16 App Router,
React 19, TypeScript 5, Tailwind CSS 4, motion v12 (importerad från
`motion/react`), deploy på Vercel. `jacobjansson.vercel.app` är
produktion, `main` är live-branchen — varje push till main triggar
auto-deploy.

## Läs först

Läs dessa tre innan du rör kod. De är sanningen om projektet:

- `docs/arkitektur.md` — hur sajten är byggd och varför de icke-triviala
  mönstren (scroll-morf, metadata-opacity, LCP-hantering, reduced-motion)
  ser ut som de gör.
- `docs/beslutslogg.md` — append-only logg över beslut och förkastade
  alternativ. Nya poster överst, gamla skrivs aldrig om.
- `docs/status.md` — nuläge: vad som funkar live, vad som pågår, vad som
  skaver. Läs den för att veta var projektet står just nu.

## Fällor (bryt dessa och du introducerar en bugg)

- **Metadata-opacity på Selected Work-korten:** aldrig en literal siffra
  i motion.div:ens style-prop. Alltid en stabil `useMotionValue` som
  `.set()`:as via effect. motion v12 tappar sin opacity-subscription om
  propen någon gång innehåller en literal och sedan byter till en
  MotionValue. Se `SelectedWorkMorph.tsx`.

- **CSS-stack-posen måste vara synkad med JS-transformerna.**
  `.selected-card-stack-a` och `.selected-card-stack-b` i `globals.css`
  MÅSTE ha samma transform-värden som `useTransform([0,1], [stackValue, 0])`
  i `SelectedWorkMorph.tsx`. Ändras JS-värdena, ändra CSS-dubletten i
  samma commit — annars flimrar korten mellan SSR-paint och hydration.

- **Turbopack lokalt är opålitligt i det här projektet.** Vid manifest-fel
  eller "client-reference-manifest"-varningar: rensa `.next` och
  `node_modules/.cache` före rebuild. Om det ändå strular — verifiera
  på Vercel preview-deploy istället. Preview-miljön är sanningen, inte
  lokal dev.

- **Selected Work-korten är hårdkodade för exakt två.** Kort-arrayen
  ligger i `SelectedWorkMorph.tsx` (inte i `src/data/projects.ts`) och
  transformerna är hårdkodade som aX/aY och bX/bY separat. Arrayen kan
  inte bara utökas — kräver refaktor.

## Arbetssätt

En logisk ändring per commit. `git add` med explicita filnamn, aldrig
`git add .`. Ingen push till main utan Jacobs uttryckliga OK. Feature-work
går på egen branch, pushas för Vercel preview-deploy, verifieras live
före merge till main. Read the room: om något är osäkert, fråga — hitta
inte på.
