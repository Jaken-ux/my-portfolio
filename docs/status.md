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

## Pågående arbete

Dokumentationsrundan enligt 4-filsmodellen i ~/.claude/CLAUDE.md.
Läget just nu:

docs/arkitektur.md — committad (`1907c39`).
docs/beslutslogg.md — committad (`4209e33`).
docs/status.md — denna fil, väntar på granskning och commit.
projektets CLAUDE.md — inte påbörjad, nästa steg.
README.md — utkast klart och parkerat i worktree, tas som sista steg
när övriga dokumentationsfilerna finns att referera till.

Ingenting av det pågående är pushat än. Local main är före
origin/main med två commits (docs-filerna).

## Kända skavanker och öppna trådar

Tre kod-avvikelser är dokumenterade i docs/arkitektur.md under
"Avvikelser att veta om" och ska hanteras när tid finns:
FadeIn-komponentens hantering av reduced-motion, Selected Work-sektionens
h2 som missades vid font-migreringen till Archivo, och att Selected
Work-korten är hårdkodade separat från src/data/projects.ts. Läs den
sektionen för detaljer och tänkbara åtgärder — de återberättas inte här.

Utöver det finns två lösa trådar i själva repot:

README.md — utkast ligger som ocommittad modification i worktree.
Ersätter create-next-app-mallen och pekar på docs/arkitektur.md,
docs/beslutslogg.md och projektets CLAUDE.md. Tas som sista
dokumentationssteg i denna runda, när CLAUDE.md finns att referera till.

public/cv/Jacob_Jansson_CV.docx — untracked i git. Vercel deployar
från git, så en untracked fil deployas inte alls — om något på sajten
är tänkt att länka till just den .docx-filen är den länken trasig i
produktion. Ingen kodreferens till .docx hittad idag; enda länkade CV:t
från Header-menyn och CVDownload-listan är Jacob_Jansson_CV.pdf, som
är trackad och deployad. Behöver ändå redas ut: dublett-arbetsfil,
alternativ nedladdningsformat som borde committas, eller något som ska
flyttas ut ur public/.
