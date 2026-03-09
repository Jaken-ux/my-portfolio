export type GalleryImage = {
  src: string;
  caption: string;
  group?: number;
  width: number;
  height: number;
};

export type ProjectContent = {
  slug: string;
  title: string;
  intro: string;
  role: string;
  timeline: string;
  tags: string[];
  problem: string;
  problemPoints?: string[];
  approach: string;
  approachHeading?: string;
  approachExtra?: string;
  features?: string[];
  decisionsHeading?: string;
  decisions: (string | { title: string; description: string })[];
  solution?: string;
  outcome: string;
  outcomePoints?: string[];
  learnings: string;
  learningPoints?: string[];
  closingStatement?: string;
  demoUrl?: string;
  quickFacts?: { label: string; value: string }[];
  heroImage: string;
  heroImageType?: "photo" | "logo";
  galleryImages: GalleryImage[];
};

export const projectContent: ProjectContent[] = [
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
