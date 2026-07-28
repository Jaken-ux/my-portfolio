# Beslutslogg

Append-only. Nya poster överst, gamla skrivs aldrig om. Ändras ett tidigare
beslut lägger vi en ny post som refererar den gamla.

Format per post: datum — beslut — förkastat alternativ — skäl — commit-ref.

---

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
