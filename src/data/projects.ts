export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageType?: "photo" | "logo";
  tags: string[];
  externalUrl?: string;
  cta?: string;
};

export const projects: Project[] = [
  {
    slug: "husqvarna-dealer-portal",
    title: "Husqvarna Dealer Portal",
    description: "Redesigning the B2B dealer experience — vision prototype built with AI-assisted development.",
    image: "/images/Husqvarna-logo.png",
    imageType: "logo",
    tags: ["B2B Portal", "UX Design", "AI Prototyping"],
  },
  {
    slug: "chalmers-website",
    title: "Chalmers Website",
    description: "Restructuring the information architecture for a university website.",
    image: "/images/chalmers/maintelia.webp",
    imageType: "logo",
    tags: ["IA", "Public Sector", "Content Strategy"],
  },
  {
    slug: "telia-ux-strategy",
    title: "Telia Division X",
    description: "Improving collaboration and UX maturity across a distributed design organisation.",
    image: "/images/telia/maintelia.webp",
    imageType: "logo",
    tags: ["UX Strategy", "B2B", "Research"],
  },
  {
    slug: "worldline-system",
    title: "Worldline Payment Platform",
    description: "Improving usability in a complex financial transaction system.",
    image: "/images/worldline/mainworldline.webp",
    imageType: "logo",
    tags: ["Enterprise", "Design System", "UX"],
  },
];

export const buildingNow: Project[] = [
  {
    slug: "theta-simplified",
    title: "Theta Simplified",
    description:
      "Live analytics platform for the Theta blockchain ecosystem. Composite indexes, on-chain data, integrated AI assistant — all running on decentralized GPU infrastructure.",
    image: "/images/ai-builds/thetasimplified.webp",
    tags: ["AI Product", "Web3", "Self-hosted"],
    externalUrl: "https://thetasimplified.com",
    cta: "View live",
  },
  {
    slug: "manor-lords",
    title: "Manor Lords",
    description:
      "Real-time multiplayer strategy game built end-to-end through AI-augmented development. From mechanic design to deployment.",
    image: "/images/manor-lords/main.webp",
    tags: ["Multiplayer Game", "AI-Augmented Build", "Real-time"],
    cta: "View case",
  },
];
