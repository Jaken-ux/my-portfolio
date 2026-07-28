# Arkitektur

Portfolion är en Next.js 16-app med App Router. Server components som
default, client components där de behövs (motion, scroll, state).
`(main)/` är rutgruppen för allt publikt, med gemensam `layout.tsx` och
en `template.tsx` som ger sido-transitions. `layout.tsx` på root-nivå
wiring:ar två Google-fonter via `next/font` (Inter för brödtext, Archivo
för h1/h2), en MotionConfig som respekterar OS-preferens för reducerad
rörelse, och Vercel Analytics.

Data för case-studies bor i `src/data/projects.ts` (kortdata till home
och gallery-vyer) och `src/content/projects.ts` (den långa case-studytexten
för `/projects/[slug]`). Skrivna inlägg ligger i `src/content/`. Ingen
databas, inga externa API-anrop.

## Sidflöde och navigering

Hemsidan (`(main)/page.tsx`) är en server component som renderar en
klient-wrapper (`HeroAndSelectedWork`) för hero + proof-row + Selected
Work, följt av server-renderade sektioner för availability och en
avslutande cycling statement. Klient-wrappern äger `heroRef` som
skickas ner till `SelectedWorkMorph`, vilket är hela poängen med
wrappern: den låter `page.tsx` stanna som server component medan
scroll-morfen får sitt DOM-mål via en ref.

Övriga sidor (`/about`, `/ai-builds`, `/contact`, `/projects/[slug]`,
`/writing`) är server components med lokala klient-öar (`FadeIn`,
`PrimaryCTA`, `AIBuildCard`, `CVDownload`).

`(main)/template.tsx` wrappar varje rendering i en motion.div som gör
en 200ms opacity-fade vid varje ruttbyte. Första mounten i en session
skippas via en modul-scope-flagga `hasLoadedOnce`, så en cold visit
renderar direkt utan fade — det håller LCP-kandidaten opak från första
paint. Reduced-motion-användare får instant navigering utan animation.

## Scroll-driven morf av Selected Work-korten

Detta är den mest icke-triviala mekanismen på sidan och den som styr
flest arkitekturella val nedströms.

Två case-kort (Flowscan och Theta Simplified) ligger i botten av home.
På desktop utan reduced-motion börjar de i en tilted stack-pose som
visuellt sitter uppe i hero-sektionen. När användaren scrollar flyger
de ner till sin natural row-pose i sektionen längre ner på sidan.
Progress är bundet till scrollpositionen, inte tid — kortens läge följer
scrollen linjärt.

### Scroll-mål: hero, inte Selected Work

`useScroll` targetar `heroRef`, inte selected-work-sektionen. Offset är
`["start start", "end start"]`, vilket betyder att scrollYProgress är:

- 0 när hero-toppen är vid viewport-toppen (sida-top, hero synlig, kort
  visuellt uppe i hero i stack-pose)
- 1 när hero-botten passerat viewport-toppen (hero har scrollat förbi,
  kort på plats i row-pose i sin sektion)

Att binda mot hero garanterar progress = 0 vid scrollY = 0. Om targeten
istället var Selected Work-sektionen skulle progressen börja på ett värde
`> 0` från start (sektionen är delvis synlig via stack-posen) och ge
felaktig utgångspunkt för mappningen.

### Kortens transforms

`useTransform(scrollYProgress, [0, 1], [stack-värde, 0])` mappar progress
till kortens position/rotation/skala. Card A rör sig från y −780, x 500,
rotation −5°, scale 0.62 till identitet (0, 0, 0°, 1). Card B från y
−800, x 80, rotation 6°, scale 0.62 till identitet. Värdena är
avsiktligt inte identiska — kortens toppar hamnar på visuellt olika
höjder i stacken för att den ska läsa som en spread, inte en perfekt
staplad hög.

### CSS-dublett av stack-posen

Stack-posen dubbleras i `globals.css` som en CSS-transform bakom en
mediaquery:

```css
@media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
  .selected-card-stack-a { transform: translate3d(500px, -780px, 0) rotate(-5deg) scale(0.62); }
  .selected-card-stack-b { transform: translate3d(80px, -800px, 0) rotate(6deg) scale(0.62); }
}
```

Utan detta skulle korten flimra: SSR skickar dem i row-position, JS
laddar, motion mount:ar och sätter transform till stack-pose vid
scrollYProgress = 0. Under den lilla luckan mellan SSR-paint och
hydration syns de i fel position. CSS-dubletten gör att första paint
redan är korrekt. Motion tar sedan över med matchande startvärden och
handoff:en blir osynlig. Kommentaren över regeln säger explicit att
värdena MÅSTE hållas synkade med useTransform i JS.

### Skip-morph vid direktnavigering

När någon klickar Header-länken "Case Studies" (som pekar på `/#work`)
eller kommer till `/#work` från en annan sida ska korten inte flyga
snabbt genom hela sin flight i takt med den mjuka scrollen — det läser
som en glitch. Lösningen är en state-flag `skipMorph` som tillfälligt
ersätter scroll-driven transform med identity-position (0, 0, 0°, 1).

Flaggen armas av två källor: (1) om `window.location.hash === "#work"`
vid mount, som täcker cross-page navigering — samtidigt körs en explicit
`scrollIntoView({ behavior: "smooth" })` i en `requestAnimationFrame`
eftersom Next.js App Router inte pålitligt scrollar till hashen vid
cross-page-nav. (2) via en window CustomEvent `"nav-skip-morph"` som
Header och PrimaryCTA dispatchar vid same-page hash-klick.

Flaggen släpps när scrollYProgress ≥ 0.99 (destination nådd) eller efter
en 1500 ms fallback-timeout. Under skip-fönstret ser användaren mjuk
scroll till Selected Work-sektionen med kort som står stilla i sin
row-pose.

### Metadata-opacity: den kritiska motion v12-fällan

Rubrik, brödtext och taggar under varje kort ska tonas in mot slutet av
flighten så stacken läser som rena bildramar mitt i rörelsen och
metadata dyker upp när korten landat.

Enklaste implementation vore att koppla motion.div:ens `opacity` direkt
till en `useTransform`. Men detta går inte i motion v12 på grund av ett
subscription-bugg: om `style`-propen någon gång i komponentens livstid
innehåller en literal siffra (t.ex. `opacity: 1` under en render) och
sedan byter till en MotionValue, tappar motion prenumerationen och
värdet slutar uppdateras.

Lösningen i `SelectedWorkMorph.tsx`:

1. En stabil `metaOpacityValue = useMotionValue(0)` skapas en gång och
   behåller sin referens hela komponentens livstid.
2. En separat effect `.set()`:ar värdet baserat på state:
   - Om inte hydratiserad: rör inte.
   - Om `!shouldMorph || skipMorph`: sätt till 1 (alltid synlig).
   - Annars: sätt till `scrollDerivedOpacity.get()` där
     `scrollDerivedOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1])`.
3. Motion.div får `style={{ opacity: metaOpacityValue }}` — aldrig en
   literal.

Kommentaren i koden (rad 62-64 i SelectedWorkMorph.tsx) noterar detta
explicit: "Always a stable MotionValue (or undefined pre-hydration).
NEVER a literal number".

Samma fälla styr en till detalj: hydration och isDesktop batchas i EN
state-atom (`setHydrationState({ hydrated, isDesktop })`) så båda
flaggorna flippar samtidigt. Om de vore separata states skulle det
finnas en mellanrender där `hydrated = true` men `isDesktop = false`,
och just den kombinationen skulle exponera bugen.

Före hydration är motion-value-propen `undefined` och elementet får
`opacity` från Tailwind-klassen `md:motion-safe:opacity-0`. Det gör att
desktop-non-reduced-motion-användare ser tom metadata-plats direkt vid
SSR, medan mobila användare och reduced-motion får metadata synlig utan
väntan.

## LCP-hantering

Två åtgärder på hemsidan behandlar hero-kortens bilder som möjlig
LCP-kandidat, försiktighetsvis, utan att förlita sig på att de
faktiskt är den ytan som mäts:

Båda `SelectedCard`-anropen skickas med `priority` (rad 305, 321 i
SelectedWorkMorph). Det gör att `next/image` preloadar båda bilderna
i `<head>` istället för att lata-ladda. Vid cold desktop-load
renderas korten i stack-pose (scale 0.62, translate3d uppåt), delvis
klippta ovanför sin sektion — det är inte självklart att en nedskalad
och delvis synlig yta räknas som LCP-elementet av webbläsaren, men
priority är billig och skyddar mot att en scroll-driven scale-upp
räknas som en sen paint av samma bild.

Bilderna har heller ingen opacity-fade-in. Enbart transformer skalar
(hover 1.07, och scroll-driven scale från 0.62 till 1). Transform
triggar inte LCP-omvärdering på samma sätt som opacity-övergångar,
så bilden räknas som paintad direkt när den kommer in i DOM.

`template.tsx` skippar första-mount-transitionen för att inte pusha
in en generell opacity-fade på sidan vid cold visit. En cold visit
renderar direkt med opacity 1 istället för att fade:as in.

## Reduced-motion och mobil-degradering

`MotionProvider` wrappar hela appen i `<MotionConfig reducedMotion="user">`.
Det gör att motion respekterar OS-preferensen `prefers-reduced-motion`
utan att varje motion-komponent behöver checka manuellt.

I `SelectedWorkMorph` finns tre gates ovanpå det:

- `reduceMotion = useReducedMotion() ?? false` — läses direkt från
  MotionConfig via hook.
- `isDesktop = mq.matches` från `matchMedia("(min-width: 768px)")` — plus
  en event-listener som håller state i sync om användaren resizar.
- `shouldMorph = isDesktop && !reduceMotion` — den enda gaten som styr
  om hela scroll-morfen är aktiv.

När `shouldMorph = false` får motion.div `undefined` som style, vilket
låter CSS ta över. Mediaqueryn i globals.css matchar inte i det fallet,
så korten renderar naturligt i row-pose utan någon transform. Mobila
användare och reduced-motion-användare får alltså en helt statisk
hemsida — samma innehåll, ingen scroll-driven rörelse, ingen flight.

Hover-scale på bild och pil-nudge är också gate:ade på `!reduceMotion`.

`template.tsx` skippar page-transitions helt för reduced-motion (via
`skipInitial = !hasLoadedOnce || reduceMotion`).

## Header-komponentens icke-triviala detaljer

Header är en client component. Den använder `usePathname` för att
markera aktiv nav-länk med `text-foreground font-semibold` (idle-läge
är `text-muted font-medium`). External hrefs (CV-PDF) och hash-ankare
(Case Studies /#work) räknas aldrig som aktiva — CV är extern nedladdning
och Case Studies är en scroll-anchor, inte en destination.

För att undvika layout-shift vid vikt-byte renderas varje nav-etikett
med en osynlig bold-ghost i samma grid-cell som den synliga texten
(`invisible col-start-1 row-start-1 font-semibold`). Ghosten reserverar
alltid semibold-bredden så systerlänkar aldrig knuffas i sidled när
aktiv-state flyttas.

`handleHashClick` i Header interceptar klick på `/#work` när användaren
redan är på `/`: den preventDefaultar, dispatchar `"nav-skip-morph"` så
SelectedWorkMorph vet att skippa flighten, och kör
`scrollIntoView({ behavior: "smooth" })` manuellt.

## PrimaryCTA — hover-outline via ResizeObserver

`PrimaryCTA` är en svart pill-knapp med en accent-blå linje som ritas
runt knappen på hover. Linjen är en SVG-path som positioneras absolut,
3 px utanför knappens border-box. Bredden mäts med
`getBoundingClientRect()` (inte `entry.contentRect`, som exkluderar
padding och skulle göra pillen 48 px för smal). En ResizeObserver håller
måtten i sync när text eller viewport ändras.

Animationen är `strokeDashoffset` från 1 till 0 (normerad via
`pathLength={1}`), med `strokeLinecap="butt"` för att undvika en liten
prick vid path-start.

Same-page hash-klick från PrimaryCTA hanteras med samma preventDefault +
scrollIntoView + `nav-skip-morph`-dispatch-mönster som Header.

## Avvikelser att veta om

Dessa är fynd från kodläsningen. De ska inte döljas i dokumentation —
den som läser hit ska veta att koden inte matchar den avsedda helheten
på dessa punkter.

**FadeIn respekterar inte reduced-motion.** `FadeIn.tsx` använder
`transition-all duration-700 ease-out` som Tailwind CSS-transition. Motion
v12:s `MotionConfig` styr endast motion-komponenter, inte vanliga
CSS-transitions. En reduced-motion-användare får fortfarande
700ms-fades på nästan varje sektion på sajten. Bör antingen switchas
till motion-baserad implementation eller wrappas med
`motion-reduce:transition-none`.

**Selected Work H2 missades i Archivo-swappet.** SelectedWorkMorph.tsx
rad 288 har `<h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">`.
Övriga h1 och h2 i (main) fick vid font-migreringen till Archivo klasserna
`font-display font-semibold tracking-[-0.015em]`. Just denna missades och
renderas fortfarande i Inter med font-bold.

**Selected Work-korten är hårdkodade separat från övrig case-data.**
Kortens innehåll (title, description, image, tags, href) ligger som
en `cards`-array inuti `SelectedWorkMorph.tsx` (rad 23–40), inte i
`src/data/projects.ts` som styr resten av portfolion. Två kort renderas
och koden är hårdkodad för exakt två (aX/aY och bX/bY som separata
transforms) — arrayen kan inte bara utökas.
