# Beslutslogg

Append-only. Nya poster överst, gamla skrivs aldrig om. Ändras ett tidigare
beslut lägger vi en ny post som refererar den gamla.

Format per post: datum — beslut — förkastat alternativ — skäl — commit-ref.

---

**2026-10-21 — Verifierat i Vercel: projektet har inga miljövariabler,
NEXT_PUBLIC_SITE_URL är inte satt. Påståendet i posten nedan (och i
README och commit 01643c0) stämmer. Efter publiceringen pekar og:image,
twitter:image, sitemap och robots.txt på jacobjansson.vercel.app och
bilderna svarar 200 (startsidan, spelporten-inkop, flowscan). — 01643c0**

**2026-10-21 — Reservadressen för sajtens URL (layout.tsx, robots.ts,
sitemap.ts) är nu https://jacobjansson.vercel.app. Den gamla,
my-portfolio-jaken-uxs-projects.vercel.app, svarade
DEPLOYMENT_NOT_FOUND, så alla delningsbilder, sitemapen och robots.txt
pekade på en död domän. — Sätta NEXT_PUBLIC_SITE_URL i Vercel. — En
rad i koden, verifierbar i git, och ingen ändring i produktionens
konfiguration. Variabeln går fortfarande att sätta och vinner då. —
se commit "Point site URL fallback at the production domain"**

**2026-10-21 — Skärmdumparnas 1 px mörka kantlinje till vänster beskärs
bort (butiken-idag, pa-vag, oversikt, chatt, chatt-dark). Granskat och
lämnat: chattarnas nedersta rader är inmatningsfältets skugga och
pa-vag-mobile slutar på en tabellradslinje, båda är innehåll och inte
kant. — Beskära flera px för säkerhets skull. — Bara det som behövs;
mätt per kant och bild. — se commit "Trim screenshot edge line"**

**2026-10-21 — Spelporten Inköp-skärmdumparna maskas med täckande fält:
pixlarna ersätts med bakgrundsfärg och en dämpad stapel. Inköpspriser,
marginal (kr och %), budgetbelopp, kvartalsrabatt och ordernummer döljs;
marknadspriser, mina priser och TB står kvar. Original ligger utanför
repot. — Suddning. — Suddning av siffror kan delvis återskapas; ett
täckande fält lämnar inga originalpixlar. — 28e906c, 596f721**

**2026-10-21 — Breda tabeller får ett separat mobilutsnitt (`mobileSrc`)
med kolumnerna Spel, Mitt pris, Marknad och TB ensam, cirka sex rader. —
Visa hela tabellen nedskalad, eller låta den scrolla i sidled. —
Nedskalad blir texten oläslig på mobil, och sidledsscroll bryter sidans
layout. — 596f721**

**2026-10-21 — Den ljusa och den mörka chatten visas som ett par (sida
vid sida, staplade på mobil) med varsin bildtext, i stället för den
ljusa chatten i full bredd. — Ett par med en gemensam bildtext (den
ljusa chattens bildtext om verktygsanrop hade försvunnit), eller paret
som eget block (samma bild två gånger). — 596f721**

**2026-10-21 — Undvik/Följ upp-bilden placeras efter principerna via en
ny galleri-grupp 4. Ny AI Builds-status IN USE för internt verktyg i
drift, kortet först på sidan. — LIVE (verktyget är inte publikt) och
att lägga bilden i en befintlig grupp (fel plats i berättelsen). —
596f721**

**2026-10-06 — Ankaret /#work flyttat från Client work till "Products
I've launched" (flygkortssektionen). "Case Studies", "View Work" och
"Back to projects" landar nu på de lanserade produkterna. — Behålla det
på Client work. — "Case Studies" omfattar nu båda sektionerna, och
länken ska börja med de lanserade produkterna med kunduppdragen direkt
under. Skip-morph behövde ingen ändring. — ce24b58**

**2026-10-06 — Startsidans sektioner heter "Products I've launched"
(flygkorten, med en rad om att båda är grundade och lanserade
verksamheter) och "Client work" (kunduppdragen). — "Products I've built"
(för generiskt, alla bygger med AI idag), samt roll som tagg på korten
eller ändring i kortkomponenten. — Rollen och att produkterna är
lanserade verksamheter ska synas för den som skummar, och en rubrik med
en rad under löser det utan att röra kortens metadata-opacity. — 11aa637**

**2026-10-06 — Positioneringen säger "13+ years in UX" (hero, proof-raden
och metadata). — "15 years in UX". — 15 år är total arbetslivserfarenhet,
inte UX-erfarenhet. — 069cb52, 5d8ca6b**

**2026-10-06 — Hero- och kortbilder till case studies renderas med
Playwright i exakt 16:9 och deviceScaleFactor 2. — object-top på
case-sidans hero-bild. — object-top hade ändrat beskärningen av
Chalmers-bilden (stående format); rätt bildformat löser problemet utan
kodändring. object-top behölls på hemsidans kort. — 78e0851, bb11572**

**2026-10-06 — Valfritt fält fullWidth på galleribilder; en sådan bild tar
hela gridens bredd i GalleryGrid. Används för Flowscan-systemkartan. —
Lägga systemkartan i en egen grupp (kräver ny gruppmekanik, grupp 0–3 är
redan upptagna). — Diagram måste visas i full bredd för att gå att läsa.
— 218b83f, 78f5a4a**

**2026-10-06 — Interna kortlänkar på hemsidan öppnas i samma flik med
etiketten "View case"; externa öppnas i ny flik med "View live". —
Behålla "View live" och target="_blank" för alla kort. — "View live"
lovar en live-produkt som en case-länk inte leder till. — 1249945**

**2026-10-06 — Flowscan och Spelporten blir fullvärdiga case studies och
tar hemsidans två flygkort. Theta Simplified finns kvar endast i AI
Builds. — Behålla Theta på hemsidan. — De två lanserade produkterna är
det starkaste beviset för produktdesignroller. — 1249945, 1b4893d**

**2026-07-13 — Archivo som display-face för h1/h2 — Fraunces (som körde
live 2026-07-11 till 2026-07-13) — Fraunces expressiva f/j-descendrar
läste "off" även med WONK 0. Archivo är en grotesk utan wonk/soft/opsz-
axlar att kämpa med, ger renare linjer i display-storlek, håller sig
distinkt från Inter i brödtexten. Vikt bumpades från medium (500) till
semibold (600) eftersom en grotesk kräver mer vikt än en serif för att
bära display-storlek. Tracking, storlekar och line-heights oförändrade.
— f5c8958**

**2026-07-02 — Aktiv nav-länk markeras med text-foreground + font-semibold
(idle: text-muted + font-medium). Ingen underline. En osynlig bold-ghost
i grid-cell reserverar semibold-bredden så systerlänkar inte knuffas
i sidled vid vikt-byte. Case Studies (/#work) och CV-PDF får aldrig
aktiv-state. — Underline i accent-blå (och ren monokrom underline utan
färg) — [rekonstruerat — verifiera] Accent-färgen är reserverad för
klickbara/interaktiva element (länkar, View live, PrimaryCTA-outline),
så att också göra aktiv nav accent-färgad skulle blanda två betydelser;
monokrom-och-vikt räcker som "you-are-here"-signal och passar sidans
strama typografi. — 86c9a9b**

**2026-07-02 — Klocktornet-bildbyte i AI Builds-galleriet: från 768x1024
portrait till 1420x820 landscape site-screenshot. — Den tidigare
portrait-bilden. — [rekonstruerat — verifiera] Landscape-formatet
matchar övriga kortbilder i galleriet bättre och visar site-produkten
i sitt naturliga användarläge (widescreen). — 4f9600d**

**2026-07-01 — PrimaryCTA byggs som en återanvändbar client-komponent
med ResizeObserver + SVG-outline på hover. Linjen ritas 3 px utanför
knappens border-box med strokeDashoffset-animation från 1 till 0
(normerad via pathLength=1). — Att skriva om varje pill-knapp manuellt
med Tailwind hover-shadow eller bg-shift — [rekonstruerat — verifiera]
En dedikerad komponent ger en konsekvent hover-signatur på alla primära
CTA på sajten (View Work, Get in touch, Demo) utan att varje sida måste
duplicera CSS. — 2bc1e5b (initial WIP), d99470b (border-box-fix), cdc1aad (flat linecap)**

**2026-07-01 — Outline-bredden mäts via getBoundingClientRect()
(border-box), inte entry.contentRect (content-box). — contentRect —
contentRect exkluderar knappens padding (px-6 = 48 px totalt), vilket
gjorde SVG-pillen 48 px för smal och lät högra arc:en böja in innan
knappens verkliga kant. Samtidigt bumpades stroke från 1.5 px till 3 px
och outset från 2 till 3 px per designbeslut. — d99470b**

**2026-07-01 — strokeLinecap="butt" på outline-pathen. — Round-cap. —
Round-cap förlänger strokeWidth/2 (1.5 px) förbi dashens matematiska
slutpunkt och visades som en liten blå prick vid path-start (9 o'clock)
även när dashen var helt offset:ad — vilket läste som en bugg i
idle-läget. — cdc1aad**

**2026-07-01 — Metadata-opacity på Selected Work-korten drivs av en
stabil useMotionValue som manuellt .set():as via en effect, aldrig via
literal opacity-siffra i style-propen. hydration och isDesktop batchas
i en state-atom (setHydrationState) så båda flaggorna flippar samtidigt.
— Direkt useTransform bunden till style.opacity, eller separata
useState:ar för hydrated och isDesktop. — motion v12 tappar sin
opacity-subscription om style-propen någon gång innehåller en literal
siffra och sedan byter till en MotionValue; värdet slutar då uppdateras.
Detta står explicit i kod-kommentaren i SelectedWorkMorph.tsx
("NEVER a literal number") och är rekonstruerbart ur koden, även om
själva bug-uppgradering-tråden inte finns i commit-messages. — c194a75, f92cc17**

**Grundbeslut 2026-06-30 (afdd332), uppföljning i skip-morph + metadata
2026-07-01 (c194a75, f92cc17) — Scroll-morf av Selected Work-korten binds mot heroRef,
inte mot Selected Work-sektionen. Offset ["start start", "end start"]
ger progress = 0 vid hero-top-i-viewport-top och 1 vid
hero-botten-passerat-viewport-top. Stack-posen dubbleras som CSS-transform
i globals.css bakom en mediaquery så första paint redan är korrekt före
JS-hydration. — useScroll targetad mot Selected Work-sektionen. —
Kod-kommentaren i SelectedWorkMorph.tsx rad 175-178 säger explicit
"Scroll progress tracked against the hero section, NOT Selected Work,
so progress is guaranteed = 0 at scrollY=0". [rekonstruerat — verifiera]
huruvida Selected Work-target testades och gav fel scrollYProgress-start,
eller om det var en ren "start clean"-designval från början.
— afdd332 (scroll morph + mobile fix), c194a75 (skip-morph tillägg),
f92cc17 (skip-morph + metadata polering)**
