export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageType?: "photo" | "logo";
  tags: string[];
};

export const projects: Project[] = [
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
  {
    slug: "manor-lords",
    title: "Manor Lords",
    description: "Building a multiplayer strategy game through AI-augmented development.",
    image: "/images/manor-lords/main.webp",
    tags: ["React", "Node", "Socket.io", "AI Collaboration"],
  },
];
