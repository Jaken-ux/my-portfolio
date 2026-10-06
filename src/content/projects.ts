export type GalleryImage = {
  src: string;
  caption: string;
  group?: number;
  width: number;
  height: number;
  video?: boolean;
};

export type ProjectContent = {
  slug: string;
  title: string;
  intro: string;
  role: string;
  timeline: string;
  tags: string[];
  confidentialityNote?: string;
  problem?: string;
  problemPoints?: string[];
  approach?: string;
  approachHeading?: string;
  approachExtra?: string;
  features?: string[];
  decisionsHeading?: string;
  decisions?: (string | { title: string; description: string })[];
  methodPoints?: { lead: string; body: string }[];
  methodPointsHeading?: string;
  extraSection?: { heading: string; body: string };
  solution?: string;
  outcome?: string;
  outcomePoints?: string[];
  learnings?: string;
  learningPoints?: string[];
  closingStatement?: string;
  demoUrl?: string;
  demoLabel?: string;
  demoPassword?: string;
  endCta?: { text: string; linkLabel: string; href: string };
  quickFacts?: { label: string; value: string }[];
  heroImage: string;
  heroImageType?: "photo" | "logo";
  heroVideo?: string;
  galleryImages: GalleryImage[];
};

export const projectContent: ProjectContent[] = [
  {
    slug: "flowscan",
    title: "Flowscan — Web UX & Accessibility Analysis",
    intro:
      "A multi-engine UX and accessibility audit tool I designed, built and launched on my own, from first prototype to paid product.",
    role: "Founder & Product Designer",
    timeline: "May 2026 – present",
    tags: ["SaaS", "Accessibility & Compliance", "AI Product"],
    quickFacts: [
      { label: "Role", value: "Founder — product design and development" },
      { label: "Timeline", value: "May 2026 – present" },
      { label: "Status", value: "Launched — sign-up and payment live" },
      { label: "Stack", value: "Next.js, Playwright, axe-core, Lighthouse, Claude API, Postgres, Stripe" },
      { label: "Method", value: "Built with Claude Code, documented as it grew" },
    ],
    demoUrl: "https://flowscan.se",
    demoLabel: "Try Flowscan",
    problem:
      "A UX audit is mostly groundwork: run the tools, read the pages, compare what each tool found and decide what matters. I had done that by hand for years, and my judgment was rarely needed until the very end. Flowscan started as an attempt to turn that groundwork into a repeatable pipeline. Along the way the purpose sharpened. The European Accessibility Act took effect in June 2025, and accessibility moved from a quality question to a legal one.",
    problemPoints: [
      "Each tool sees one slice. Lighthouse scores performance and basics, axe-core finds rule violations, and neither reads a page the way a person does",
      "A good score from one tool can sit right next to Level A failures that block real users",
      "Teams facing the EAA need to know which issues are legal requirements and which are judgment calls, and most reports blur the two",
      "The work is repetitive enough to automate, but only if the output can be trusted",
    ],
    approachHeading: "What I built",
    approach:
      "Flowscan runs several analyses in parallel against a live site and merges them into one report. Deterministic tools do what they are reliable at, AI reviews what only a reader can judge, and code decides the order of everything.",
    features: [
      "Five engines: Lighthouse, axe-core, keyboard and interaction tests, visual review and copy review",
      "Two-phase capture, so each page is analysed both before and after the cookie banner",
      "Up to three pages per run, executed in sequence to stay within memory limits",
      "A report in the browser and as a paginated PDF",
    ],
    approachExtra:
      "The hardest part was not the analysis itself. It was making the result honest: separating a legal requirement from a possible issue, and refusing to call a page fine just because nothing was found.",
    methodPointsHeading: "How it was built",
    methodPoints: [
      {
        lead: "I made the decisions, AI wrote most of the code.",
        body:
          "Flowscan is built with Claude Code. I owned the product, the architecture and every trade-off. The assistant implemented one logical change at a time, after a diagnosis of the current state rather than an assumption about it.",
      },
      {
        lead: "Every claim is checked against the source.",
        body:
          "At one point an AI session reported work as finished that had never been done, including a commit that did not exist. I caught it, and it became a standing rule: verify against the files, never against a summary.",
      },
      {
        lead: "The repository documents itself.",
        body:
          "An architecture document, a decision log and a list of known pitfalls live next to the code and are updated as the system changes. A mistake gets written down once, so neither I nor the AI repeats it, and someone else could take over the project.",
      },
      {
        lead: "Payments were proven before they went live.",
        body:
          "The full flow from sign-up to checkout ran in Stripe's sandbox first. Going live meant pointing a verified system at real money, not running it for the first time.",
      },
    ],
    decisionsHeading: "Principles built into the architecture",
    decisions: [
      {
        title: "Code ranks, AI never does",
        description:
          "The language model assesses severity within fixed criteria. Scoring, prioritisation and ordering happen in deterministic code, so the same findings always produce the same ranking.",
      },
      {
        title: "No findings is never a green light",
        description:
          "A verified Level A failure means a page most likely fails the requirement. Finding nothing does not mean it passes, and the report says so instead of implying a compliance it cannot prove.",
      },
      {
        title: "Evidence comes from the page",
        description:
          "The evidence shown for each finding is read from what was captured on the site, never written by the model. The AI can misjudge how serious something is, but it cannot put words in the page's mouth.",
      },
      {
        title: "Certainty is visible",
        description:
          "Legal requirements are marked as such, and judgment calls are marked as possible issues to verify. A reader can see at a glance how much weight each finding carries.",
      },
    ],
    extraSection: {
      heading: "What a single score hides",
      body:
        "In the report below, the overall quality score is 75 out of 100, which looks acceptable. The same report finds a verified Level A failure and a missing accessibility statement, so the site most likely does not meet the legal requirement. Flowscan keeps those answers apart: the score measures quality, and the conformance estimate is stated separately, as an estimate rather than a certificate.",
    },
    outcome:
      "Flowscan is live at flowscan.se. Anyone can sign up, accept the terms, pay and run an analysis without talking to me. The terms and privacy policy have been reviewed by a lawyer, VAT is handled in Stripe, and acceptance of the terms is stored and checked server-side before any checkout.",
    learnings: "Most of what I learned was not about code.",
    learningPoints: [
      "Technical maturity and business maturity are different milestones. Once the product worked, the hard part left was pricing, terms and selling",
      "Work out your own unit cost before you set a price. Mine turned out ten times higher than my estimate, and the pricing model had to change",
      "The most stubborn bugs sit where you have already looked. The PDF footer took nine attempts before the real cause turned up in the renderer",
      "Building with AI takes the same discipline as building with a team: clear decisions, small steps and verification",
    ],
    closingStatement:
      "A machine can judge how serious something is. It should never be the one deciding what matters most.",
    endCta: {
      text: "Curious how the pipeline or the principles work in practice? Happy to walk through it.",
      linkLabel: "Get in touch",
      href: "/contact",
    },
    heroImage: "/images/ai-builds/flowscan.webp",
    galleryImages: [
      { src: "/images/flowscan/landing-tjanster.webp", caption: "Analysis types — accessibility is assessed against WCAG 2.1 AA, EN 301 549, the EAA and Swedish law", group: 0, width: 1117, height: 606 },
      { src: "/images/flowscan/landing-metod.webp", caption: "Engines and method — deterministic tools, AI review, then synthesis and ranking in code", group: 1, width: 1273, height: 653 },
      { src: "/images/flowscan/rapport-header.webp", caption: "Report header — each page is captured both before and after cookie consent", group: 1, width: 1286, height: 820 },
      { src: "/images/flowscan/fynd-lagkrav.webp", caption: "Prioritised findings — legal requirements and possible issues marked differently, each with evidence from the page", group: 2, width: 1391, height: 1118 },
      { src: "/images/flowscan/revisorns-sammanfattning.webp", caption: "Auditor's summary — written by AI, ranked deterministically", group: 2, width: 1391, height: 547 },
      { src: "/images/flowscan/rapport-oversikt.webp", caption: "Scorecard — health score and four category scores, weighted in code", group: 3, width: 1391, height: 395 },
      { src: "/images/flowscan/rapport-konformans.webp", caption: "Conformance estimate — kept separate from the quality score and stated as an estimate", group: 3, width: 1391, height: 396 },
    ],
  },
  {
    slug: "spelporten",
    title: "Spelporten — Curated Board Game Store",
    intro:
      "A curated Swedish board game store I designed, built and launched, from brand and information architecture to checkout, shipping and suppliers.",
    role: "Founder & Product Designer",
    timeline: "Aug 2026 – present",
    tags: ["E-commerce", "Product Design", "Shopify"],
    quickFacts: [
      { label: "Role", value: "Founder — product, UX/UI, content and operations" },
      { label: "Timeline", value: "Aug 2026 – present" },
      { label: "Status", value: "Live since September 2026 — spelporten.se" },
      { label: "Platform", value: "Shopify, with an extensively customised theme" },
      { label: "Tools", value: "Claude Code, Cursor, Liquid, JavaScript, Git" },
    ],
    demoUrl: "https://spelporten.se",
    demoLabel: "Visit Spelporten",
    problem:
      "Large board game stores help you navigate a huge catalogue. I wanted to build the opposite: a small shop that helps you choose. Board games are expensive, take an evening to try, and the right choice depends on who you play with and how much time you have. My hypothesis was that a curated range and honest guidance would make that choice easier than yet another catalogue with thousands of titles. It is a hypothesis, not a research finding, and the shop is built to test it.",
    problemPoints: [
      "Choosing a game depends on context: how many players, how much time, how experienced the group is",
      "Publisher descriptions sell every game the same way and rarely say who a game is not for",
      "A small shop cannot compete with the large Swedish retailers on range or price",
      "Everything had to work within the real costs of a one-person business: purchasing, shipping and payment fees",
    ],
    approachHeading: "Designing for choosing",
    approach:
      "Every game in the shop is one I have played and can stand behind. The design work was about turning that editorial stance into structure: product data that answers the practical questions, writing that answers the personal ones, and ways into the range built around situations rather than categories.",
    features: [
      "Structured game data: player count, best player count, play time and complexity, shown the same way on every card and product page",
      "Own reviews with a short verdict and a note on who the game is not for",
      "\"Tonight we're playing\" — recommendations based on the kind of evening, not the product category",
      "Seven game guides, built as a reusable content system, for situations like three players, families or starting a collection",
      "Own photography, short films and Spotify playlists that show what a game feels like to play",
    ],
    approachExtra:
      "I explored three visual directions early on: an editorial layout, an atmospheric evening mood and a structured almanac of game facts. The goal was the warmth of a board game magazine without making it harder to shop. An early dark, split hero felt too heavy for a store and was replaced by a lighter, calmer start page.",
    decisionsHeading: "Key design decisions",
    decisions: [
      {
        title: "One vocabulary for situations",
        description:
          "Situation-based recommendations started out hand-picked. I moved them to a shared set of keys stored on each product, the same keys that drive quick filtering in the game list, so new games show up in the right places without updating every page by hand.",
      },
      {
        title: "No fake social proof",
        description:
          "Recommendations between games are editorial and labelled as such. Without real purchase data, the shop never claims that other customers also bought something.",
      },
      {
        title: "Content that publishes without code",
        description:
          "Films, guides and recommendations are driven by product data. Adding a new film means filling in the product data and uploading a thumbnail. It then plays inline on the start page without any change to the theme.",
      },
      {
        title: "Shopify for transactions, custom work for the experience",
        description:
          "I kept Shopify's catalogue, checkout and payments, and put the custom design work where it sets the shop apart: discovery, product presentation, films and guides. Building my own commerce engine would have meant owning payments and security for no visible gain to customers.",
      },
    ],
    solution:
      "I designed and built the shop myself on top of Shopify's Horizon theme, with custom Liquid sections, CSS, JavaScript and product metafields. Most of the code was written with AI assistants, mainly Claude Code and Cursor. I set the direction, reviewed every change against the rendered store, and kept a development theme and Git branches separate from the live shop. The AI also made mistakes I had to catch: a pricing spreadsheet with broken cell references and missing purchase discounts, a script that created duplicate guide entries, and a development theme that showed stale code after a branch switch. Each one became a rule: smaller changes, verification before publishing, and code that only checks kept separate from code that writes data.",
    extraSection: {
      heading: "Where logistics met UX",
      body:
        "The parts of a shop a designer rarely sees ended up shaping the experience the most. Shopify Basic does not let customers choose a pickup point in checkout, and the plans and apps that do cost more than a new shop can carry. So I launched with fixed-price delivery to pickup points from two carriers, Bring and DHL, and book shipments by hand. Packaging turned into a design problem once I learned that volumetric weight, not the weight of the game, decided the shipping class. The first real order made the economics concrete: after VAT on shipping, packaging, carrier and payment fees, an order of around 500 kronor left roughly 50. That changed how I think about the range. Small games work as add-ons, while larger ones have to carry the cost of an order.",
    },
    outcome:
      "Spelporten launched on 25 September 2026 and runs as a real shop. Customers can order, pay and receive their games, and the first orders have been packed and shipped. The range is deliberately small, supported by seven guides and five films on YouTube. Reseller accounts are open with several Nordic and European distributors, while some larger distributors were not taking on new retailers. It is a young business, and it is too early to say whether the curated model works commercially.",
    learnings: "Most of the hard problems sat outside the interface.",
    learningPoints: [
      "Order economics matter more than product margin. Every order has to carry its own shipping, packaging and fees",
      "Platform limits are design constraints. Launching with a simpler checkout was better than letting an advanced shipping flow block the whole shop",
      "A well-built store does not bring its own traffic. Technical SEO and solid product pages have not yet produced meaningful organic reach, and distribution is a problem of its own",
      "Honest guidance includes telling people what not to buy",
    ],
    closingStatement:
      "A large store helps you search. A small one should help you choose.",
    endCta: {
      text: "Curious how the shop was designed and built? Happy to walk through it.",
      linkLabel: "Get in touch",
      href: "/contact",
    },
    heroImage: "/images/spelporten/spelporten-hero.webp",
    galleryImages: [
      { src: "/images/spelporten/spelporten-om.webp", caption: "About Spelporten — the range is small because it is chosen", group: 0, width: 1115, height: 1040 },
      { src: "/images/spelporten/spelporten-produktgrid.webp", caption: "Game list — structured facts, a short verdict and a \"Not for\" note on every game", group: 1, width: 1042, height: 1151 },
      { src: "/images/spelporten/spelporten-metod.webp", caption: "How we assess games — a walkthrough, a verdict and a recommendation against", group: 1, width: 1086, height: 823 },
      { src: "/images/spelporten/spelporten-filmer.webp", caption: "Films — short videos of games we have actually played, playing inline on the start page", group: 2, width: 1095, height: 703 },
    ],
  },
  {
    slug: "husqvarna-dealer-portal",
    title: "Husqvarna Group — B2B Dealer Portal",
    intro: "Vision prototype via AI-assisted development",
    role: "UX Designer & Prototyper",
    timeline: "Ongoing",
    tags: ["B2B Portal", "UX Method", "AI-Assisted Prototyping"],
    confidentialityNote:
      "The specific prototype and designs are under client confidentiality. This page describes the method and approach.",
    quickFacts: [
      { label: "Client", value: "Husqvarna Group (via Nexer)" },
      { label: "Role", value: "UX Designer & Prototyper" },
      { label: "Focus", value: "Vision prototype for B2B portal modernization" },
      { label: "Stack", value: "Next.js, Tailwind, Claude Code" },
      { label: "Method", value: "AI-assisted prototyping" },
    ],
    approachHeading: "The approach",
    approach:
      "B2B portal modernization projects typically face a gap between vision documents and tangible experience. Stakeholders read strategy decks, designers produce static mockups, and alignment happens in abstract terms — until development starts and everyone discovers they imagined different things.",
    approachExtra:
      "For this engagement I delivered a fully interactive vision prototype instead of static mockups. Built as a real web application, hosted, and accessible via URL. Stakeholders could click through actual task flows, experience interaction patterns, and respond to something concrete rather than interpret visuals.",
    methodPointsHeading: "Why this method works",
    methodPoints: [
      {
        lead: "Interactive prototypes generate better stakeholder feedback than static mockups.",
        body:
          "People respond to what they can touch. Feedback moves from “I think the header should be bigger” to “this flow doesn’t match how our users actually work” — far more useful input at the vision stage.",
      },
      {
        lead: "AI-assisted development enables UX designers to build production-quality prototypes independently.",
        body:
          "With Claude Code and modern frameworks, I can build interaction patterns (drag, toggle, inline edit, multi-step flows) in days — patterns that would require a developer pairing in a traditional process.",
      },
      {
        lead: "Design systems established early pay off immediately.",
        body:
          "Before building screens, I set up design tokens and component patterns. This ensured visual consistency across the prototype and created a foundation that could be handed off to development if the vision moved forward.",
      },
    ],
    outcome:
      "A hosted, interactive vision prototype covering the portal’s core user journeys. Design system documentation. A separate testing-ready version configured for user testing in multiple languages. Delivered in weeks rather than the months a traditional design-and-build team would have required.",
    extraSection: {
      heading: "What this method is good for",
      body:
        "Moments where a team needs to align around a direction, validate a concept with real users, or sell an internal vision — and where static mockups won’t carry the argument. Particularly valuable for B2B portals and enterprise tools where complex flows are hard to evaluate abstractly.",
    },
    endCta: {
      text: "Curious about the method? Happy to walk through it in a conversation.",
      linkLabel: "Get in touch",
      href: "/contact",
    },
    heroImage: "",
    galleryImages: [],
  },
  {
    slug: "manor-lords",
    title: "Manor Lords",
    intro:
      "Building a multiplayer strategy game through AI-augmented development",
    role: "AI-Augmented Product Builder",
    timeline: "3 months",
    tags: ["React", "Node", "Socket.io", "PostgreSQL", "AI Collaboration"],
    demoUrl: "https://manorlords-live.vercel.app/",
    quickFacts: [
      { label: "Stack", value: "React, Node, Socket.io, PostgreSQL" },
      { label: "Hosting", value: "Vercel + Render" },
      { label: "AI collaboration", value: "Claude & ChatGPT" },
      { label: "Duration", value: "3 months" },
      { label: "Status", value: "Live multiplayer prototype" },
    ],
    problem:
      "I set out to build a real-time multiplayer product from scratch — without formal training as a developer. The core challenges were not visual design, but system design:",
    problemPoints: [
      "Designing a server-authoritative multiplayer architecture",
      "Managing persistent player identity across sessions",
      "Structuring database logic and match storage",
      "Balancing AI behavior for meaningful competition",
    ],
    approach:
      "A fully playable online strategy game built by treating AI as a structured development partner — without a traditional engineering background. At the same time, I had to learn how to collaborate effectively with AI tools — not just asking for code, but structuring problems in ways that produced stable, maintainable systems.",
    features: [
      "Server-authoritative real-time gameplay",
      "Match persistence & player statistics",
      "Private rooms & invite-link system",
      "AI opponents with distinct strategic behaviors",
      "Unlockable avatars & progression structure",
    ],
    decisions: [
      {
        title: "Server Authority Over Client Trust",
        description:
          "Early desync issues forced a redesign from client-heavy logic to a fully server-authoritative model. This dramatically improved consistency and match stability.",
      },
      {
        title: "Identity & Session Management",
        description:
          "Transitioning from local sessions to persistent user accounts required restructuring authentication and database design.",
      },
      {
        title: "AI Behavior as Product Design",
        description:
          "Bots were designed not just as opponents, but as different player archetypes (rusher, builder, opportunist). Balancing difficulty required repeated simulation and iteration.",
      },
      {
        title: "AI as Engineering Workflow",
        description:
          "Instead of one-off prompts, I developed structured, step-based prompts and implementation plans to guide AI through complex refactors and system redesigns.",
      },
    ],
    outcome:
      "The result is a live multiplayer strategy experience with persistent accounts and competitive progression.",
    outcomePoints: [
      "Stable multiplayer architecture running in production",
      "Persistent player data with progression",
      "AI opponents capable of varied strategic behavior",
      "A fully playable prototype accessible online",
    ],
    learnings:
      "More importantly, the project represents a shift in how I build products — from UX-led design to full system execution.",
    learningPoints: [
      "Clear system architecture matters more than clever code",
      "AI tools require structured thinking and precise problem framing",
      "UX thinking translates directly into technical system design",
      "Iteration speed increases dramatically when AI is guided well",
    ],
    closingStatement:
      "This project represents my transition from UX designer to AI-augmented product builder.",
    heroImage: "/images/manor-lords/gameboard.webp",
    galleryImages: [
      { src: "/images/manor-lords/stackblitz.webp", caption: "Early prototype \u2014 before the architecture redesign", group: 0, width: 1006, height: 1246 },
      { src: "/images/manor-lords/lobby.webp", caption: "Game lobby & matchmaking", group: 1, width: 1725, height: 1110 },
      { src: "/images/manor-lords/market.webp", caption: "Marketplace & resource trading", group: 1, width: 1414, height: 1130 },
      { src: "/images/manor-lords/hand.webp", caption: "Card hand & real-time gameplay", group: 1, width: 1417, height: 819 },
      { src: "/images/manor-lords/tutorial.webp", caption: "Tutorial & onboarding flow", group: 1, width: 1540, height: 825 },
      { src: "/images/manor-lords/winscreen.webp", caption: "Victory screen & endgame", group: 2, width: 1049, height: 1106 },
      { src: "/images/manor-lords/Statistics.webp", caption: "Player stats & rankings", group: 2, width: 1425, height: 1108 },
      { src: "/images/manor-lords/account.webp", caption: "Account & session persistence", group: 2, width: 714, height: 530 },
      { src: "/images/manor-lords/avlangavatarval.webp", caption: "Unlockable avatar selection", group: 2, width: 646, height: 1109 },
    ],
  },
  {
    slug: "telia-ux-strategy",
    title: "Telia Division X",
    intro:
      "Improving collaboration and UX maturity across a distributed design organisation",
    role: "UX Designer",
    timeline: "6 months",
    tags: ["UX Strategy", "Organisational Analysis", "Workshops"],
    quickFacts: [
      { label: "Client", value: "Telia Division X" },
      { label: "Role", value: "UX Designer" },
      { label: "Focus", value: "UX strategy, organisational analysis" },
      { label: "Duration", value: "6 months" },
      { label: "Scope", value: "Division-wide" },
    ],
    problem:
      "Telia's Division X worked with several innovation areas — including medtech, mobile and IoT. Designers were embedded in different teams and projects across the division, but they rarely interacted with each other.",
    problemPoints: [
      "No shared UX strategy or common processes for research and testing",
      "No clear guidelines around accessibility, tools or design practices",
      "Each designer worked in their own way, leading to duplicated work and inconsistent solutions",
      "Almost all designers were consultants, making long-term coordination even harder",
    ],
    approach:
      "To understand how UX actually worked within Division X, I started with a situation analysis. This involved interviews with designers and other key stakeholders across the organisation.",
    approachHeading: "Understanding the Organisation",
    features: [
      "How UX work was currently organised across teams",
      "How mature the organisation was in terms of UX thinking",
      "What processes existed for research, testing and design work",
      "How teams communicated and shared knowledge",
    ],
    approachExtra:
      "Based on the interviews and analysis, we began shaping a proposal for how UX work could be organised more effectively. Through workshops and discussions with stakeholders, a strategy gradually took form. Effect mapping was used to visualise the impact of different proposals and to highlight both potential benefits and risks.",
    decisionsHeading: "A Key Challenge",
    decisions: [
      {
        title: "Varying UX Maturity",
        description:
          "While designers understood the value of structured UX work, the understanding among management varied significantly. Part of the work involved explaining why user testing, shared design systems and structured UX processes were worth investing in.",
      },
      {
        title: "Virtual Design Team",
        description:
          "A key recommendation was to establish a virtual design team across the division — a network of designers collaborating around shared practices, tools and guidelines, even while working in different product teams.",
      },
      {
        title: "Shared UX Guidelines",
        description:
          "The proposal included recommendations around shared UX guidelines, common tools and design workflows, a shared component library, and regular collaboration between designers across teams.",
      },
      {
        title: "From Isolation to Coordination",
        description:
          "The goal was to move from isolated design work to a more coordinated and mature UX practice across the division — creating alignment without removing team autonomy.",
      },
    ],
    outcome:
      "The work resulted in a strategic proposal presented to senior management at Telia Division X. The proposal outlined how to establish a virtual design team, shared UX practices and regular cross-team collaboration.",
    outcomePoints: [
      "Strategic proposal delivered to senior management",
      "Recommended structure for a virtual design team across the division",
      "Shared guidelines for UX practices, tools and workflows",
      "Process maps describing how proposed practices could be implemented",
    ],
    learnings:
      "This project gave me valuable experience working with UX strategy at an organisational level. Instead of designing specific interfaces, the focus was on helping teams work more effectively with UX over time.",
    learningPoints: [
      "UX strategy at an organisational level is fundamentally about communication and alignment",
      "Introducing UX practices in organisations where the discipline is still developing requires patience and clear reasoning",
      "Effect mapping is a powerful tool for making strategic proposals tangible and discussable",
      "Working with consultants across teams demands different coordination strategies than working with in-house teams",
    ],
    closingStatement:
      "This project shifted my perspective from designing products to designing how organisations work with design.",
    heroImage: "",
    galleryImages: [
      { src: "/images/telia/workshop.webp", caption: "Stakeholder workshop — mapping current UX practices and identifying gaps across teams", group: 1, width: 1816, height: 1152 },
      { src: "/images/telia/kartacensur.webp", caption: "Effect map for the proposed Virtual Design Team — strategic, tactical and operative layers (content redacted)", group: 2, width: 1864, height: 754 },
    ],
  },
  {
    slug: "chalmers-website",
    title: "Chalmers University Website",
    intro:
      "Designing structure and navigation for a large university website",
    role: "UX Designer",
    timeline: "10 months",
    tags: ["Information Architecture", "Navigation Design", "User Testing"],
    quickFacts: [
      { label: "Client", value: "Chalmers University of Technology" },
      { label: "Role", value: "UX Designer" },
      { label: "Focus", value: "IA, navigation, user testing" },
      { label: "Duration", value: "10 months" },
      { label: "Status", value: "Live — chalmers.se" },
    ],
    problem:
      "University websites are complex by nature. They need to serve many different audiences — prospective students, current students, researchers, media and the general public. Each group is looking for different things, and much of the information must also be published due to legal requirements.",
    problemPoints: [
      "Thousands of pages of content serving vastly different audiences",
      "Information published due to legal requirements alongside marketing content",
      "Fragmented navigation that had grown organically over many years",
      "The main challenge was not visual design, but structure — how do you organize information so people can actually find what they need?",
    ],
    approach:
      "I joined the project during the pre-study phase, where we analysed target groups and explored possible concepts for the new site. The project ran in an agile setup where designers and developers worked closely together. As insights emerged, navigation structures and components were iterated and refined.",
    features: [
      "Analysing existing research and previous web projects",
      "Interviews with key user groups",
      "Mapping information and navigation structures",
      "Designing wireframes and interaction patterns",
      "Building parts of the design system",
      "Conducting usability tests with prospective and current students",
    ],
    approachExtra:
      "I was responsible for much of the UX design work and also acted as a bridge between Chalmers and the design team — facilitating workshops, planning sessions and design discussions.",
    approachHeading: "My Work",
    decisionsHeading: "A Key Focus: Navigation",
    decisions: [
      {
        title: "Task-Oriented Navigation",
        description:
          "We reorganized the top-level navigation around user tasks rather than Chalmers' organizational structure. Main entry points (Utbildning, Forskning, Samverkan, Om Chalmers) each open a mega menu with audience-adapted sub-levels.",
      },
      {
        title: "Search-First for Deep Content",
        description:
          "Because the site contains such a wide range of content — from research and departments to student information and events — we designed a search-first approach with faceted filtering (Pages, People, Events, News) for deep content discovery.",
      },
      {
        title: "Modular Page Composition",
        description:
          "We developed a flexible module system that allowed content editors to compose pages from reusable blocks, ensuring visual consistency while giving departments the freedom to prioritize their own content.",
      },
      {
        title: "Iterative Testing with Real Users",
        description:
          "User testing helped identify areas where students struggled to find information. Those insights were used to adjust the structure and prioritization throughout the project, not just at the end.",
      },
    ],
    outcome:
      "The result is the new chalmers.se, which is now live. Due to time and budget constraints, the team had to work pragmatically and prioritize carefully throughout the project. The site continues to evolve as new improvements are implemented.",
    learnings:
      "For me, the project was a valuable experience in working with large information structures and balancing the needs of many different user groups within one platform.",
    learningPoints: [
      "Large-scale IA work is as much about organizational change as it is about structure",
      "Getting buy-in from content owners requires showing how the new model makes their work easier, not just the end user's experience",
      "User testing at the right moments gives confidence in decisions that feel risky",
      "Working as a bridge between client and design team requires both facilitation skills and design credibility",
    ],
    closingStatement:
      "University websites serve everyone — and that's exactly what makes them so hard to design well. This project taught me that good structure is invisible when it works.",
    heroImage: "/images/chalmers/resultat.webp",
    galleryImages: [
      { src: "/images/chalmers/inspiration.webp", caption: "Visual direction and inspiration — exploring Chalmers' identity across audiences", group: 0, width: 952, height: 1276 },
      { src: "/images/chalmers/wireframe.webp", caption: "Navigation wireframe — primary nav, secondary nav, mega menu with audience-adapted sub-levels", group: 1, width: 1562, height: 982 },
      { src: "/images/chalmers/struktur.webp", caption: "Research group page — modular layout with flexible content blocks", group: 1, width: 1184, height: 1376 },
      { src: "/images/chalmers/sök.webp", caption: "Search with faceted filtering — Pages, People, Events, News", group: 2, width: 774, height: 1120 },
      { src: "/images/chalmers/modulplacering.webp", caption: "Homepage module placement — mapping content blocks to the page structure", group: 2, width: 578, height: 1306 },
    ],
  },
  {
    slug: "worldline-system",
    title: "Worldline Payment Platform",
    intro:
      "Improving usability in a complex financial transaction system",
    role: "UX Designer",
    timeline: "12 months",
    tags: ["UX Design", "User Research", "Interaction Design"],
    quickFacts: [
      { label: "Client", value: "Worldline" },
      { label: "Role", value: "UX Designer" },
      { label: "Focus", value: "UX design, user research, interaction design" },
      { label: "Duration", value: "12 months" },
      { label: "Context", value: "Angular 3 → Angular 8 migration" },
    ],
    problem:
      "Worldline provides payment infrastructure used to handle financial transactions between merchants and banks. One of their internal systems was being migrated from Angular 3 to Angular 8, and the team decided to take the opportunity to also review the user experience. The existing system had been built without dedicated UX involvement, which showed in several ways:",
    problemPoints: [
      "Inconsistent interaction patterns",
      "Outdated visual design",
      "Unclear workflows in some areas of the system",
    ],
    approach:
      "The system is used by specialists who manage financial transaction flows behind the scenes. To understand how they worked, I started with interviews with users, architects and product owners.",
    approachHeading: "Understanding the System",
    features: [
      "The key workflows in the system",
      "Where users struggled in their daily work",
      "Which parts of the interface created unnecessary friction",
    ],
    approachExtra:
      "This gave us a clearer picture of where improvements would have the most impact. The redesign was carried out in parallel with development in an agile setup. For simpler areas of the system I designed the pages directly. For more complex parts we worked in design studios with developers, product owners and other stakeholders.",
    decisionsHeading: "The Design Work",
    decisions: [
      {
        title: "Wireframes & Interaction Design",
        description:
          "Detailed wireframes and interaction specifications were created for each area of the system, providing clear guidance for the development team during the migration.",
      },
      {
        title: "Usability Testing",
        description:
          "Key features were tested with real users to validate design decisions before implementation, catching issues early in the process.",
      },
      {
        title: "Improving Consistency",
        description:
          "A more coherent graphic style was established across the interface, even though visual design wasn't the main focus of the assignment.",
      },
      {
        title: "Understanding Before Simplifying",
        description:
          "Because the system handled financial transaction processes, many workflows were highly specialised. Understanding the users' daily work was essential before making changes — without that understanding it would have been easy to simplify the interface in ways that actually made their work harder.",
      },
    ],
    outcome:
      "The redesign significantly improved the overall usability and consistency of the platform. Users received a system that was easier to navigate and more consistent in behaviour than the previous version. The migration also gave the team a chance to establish clearer design patterns that could be reused across the system going forward.",
    learnings:
      "For me, the project was a good example of how much difference structured UX work can make in systems that previously evolved without it.",
    learningPoints: [
      "Complex enterprise systems require deep domain understanding before design changes",
      "Working in parallel with development demands clear communication and flexible design processes",
      "Design studios with cross-functional stakeholders produce better solutions for specialised workflows",
      "Small consistency improvements compound into significant usability gains across a large system",
    ],
    closingStatement:
      "This project reinforced that good UX work in complex systems starts with understanding — not assumptions.",
    heroImage: "",
    galleryImages: [
      { src: "/images/worldline/gammaltgränssnitt.webp", caption: "The existing system — built without dedicated UX involvement (Angular 3)", group: 0, width: 2784, height: 1408 },
      { src: "/images/worldline/nyttgränssnitt.webp", caption: "Redesigned interface — improved structure, navigation and data presentation", group: 0, width: 1225, height: 948 },
      { src: "/images/worldline/dashboard.webp", caption: "New dashboard with customisable widgets, transaction overview and alerts", group: 1, width: 1384, height: 948 },
      { src: "/images/worldline/komponenter.webp", caption: "Design system — navigation states, search patterns and colour definitions", group: 2, width: 911, height: 832 },
      { src: "/images/worldline/färgerdesignsystem.webp", caption: "Button specifications and colour system for primary, serious and secondary actions", group: 3, width: 2532, height: 690 },
    ],
  },
];
