# Status

Nulägesbild för den som tar över repot. Vad som funkar, vad som pågår,
vad som skaver. Uppdateras löpande, får skrivas om fritt — beslut och
skäl hör inte hemma här, de går till docs/beslutslogg.md.

## Vad sajten är och var den lever

Personlig portfolio för Jacob Jansson, UX-designer. Deployad till
produktion på jacobjansson.vercel.app via Vercel. `main` är
live-branchen: varje push till main triggar auto-deploy. Feature-branches
får preview-deploys under egna URL:er.

## Vad som är byggt och verifierat live

Interaktionsarbetet är på plats: scroll-driven morf av Selected
Work-korten på hemsidan, hover-mönster på case-korten (inset zoom
1.07 inne i overflow-hidden-mask, spring-fjädrat), page transitions
mellan (main)-routes, cyklande statement i botten av hemsidan, aktiv
nav-länk med foreground + font-semibold, PrimaryCTA med ritad
accent-outline på hover. Hash-scroll-fixen som räddar View
Work-knappen och alla /#work-CTA:er från Next.js App Router-glapp
ligger uppe.

Typografin är på Archivo (display, h1/h2) + Inter (brödtext). CV
uppdaterat till svensk AI/frontend-variant både som huvudmeny-CV och
som "Svenska — AI-fokus" i nedladdningslistan. Footer stripad från
mailto-länken (kopiera-email finns på /contact istället).

Husqvarna-prototypens gamla in-repo-kopia (bakom hårdkodat lösenord
på /nav-v2 med tillhörande /start-v2 och /test) är bortstädad ur
repot. Case-studyt på /projects/husqvarna-dealer-portal är orört och
använder galleribilderna som ligger kvar i public/images/.

Dokumentationen enligt 4-filsmodellen (README, docs/arkitektur.md,
docs/beslutslogg.md, docs/status.md och projektets CLAUDE.md) är
committad och live på main.

## Pågående arbete

Branchen `feature/flowscan-case-spelporten` är pushad med Vercel
preview men inte mergad till main. Den innehåller:

- Två nya case studies: /projects/flowscan (med systemkarta i full
  bredd) och /projects/spelporten, båda med egna bilder i
  public/images/flowscan/ och public/images/spelporten/.
- Hemsidans två flygkort är Flowscan och Spelporten och länkar till
  case-sidorna. Theta Simplified finns kvar i AI Builds; Flowscan är
  borttagen därifrån.
- Ny positionering: hero, proof-rad och metadata säger "Senior UX &
  Product Designer", 13+ år i UX, Stockholm.
- Sidtitlar utan dubbelt namn (About, Contact, Writing, AI Builds).

Kvar före merge: granskning på preview-deployen.

## Kända skavanker och öppna trådar

Två kod-avvikelser är dokumenterade i docs/arkitektur.md under
"Avvikelser att veta om" och ska hanteras när tid finns:
FadeIn-komponentens hantering av reduced-motion, och att Selected
Work-korten är hårdkodade separat från src/data/projects.ts. Läs den
sektionen för detaljer och tänkbara åtgärder — de återberättas inte här.

Utöver det finns dessa öppna trådar:

Flowscan-casets saknade sektion om rapportens designbeslut — väntar på
underlag från Jacob.

About-sidan nämner inte Flowscan eller Spelporten.

public/cv/Jacob_Jansson_CV.docx — fortfarande untracked i git. Vercel deployar
från git, så en untracked fil deployas inte alls — om något på sajten
är tänkt att länka till just den .docx-filen är den länken trasig i
produktion. Ingen kodreferens till .docx hittad idag; enda länkade CV:t
från Header-menyn och CVDownload-listan är Jacob_Jansson_CV.pdf, som
är trackad och deployad. Behöver ändå redas ut: dublett-arbetsfil,
alternativ nedladdningsformat som borde committas, eller något som ska
flyttas ut ur public/.
