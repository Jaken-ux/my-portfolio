export type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

export type NavShowcase = {
  type: "showcase";
  title: string;
  description: string;
  badge: string;
  cta: string;
  action: string; // identifier for what to trigger
};

export type NavGroup = {
  label: string;
  items: NavItem[];
  showcase?: NavShowcase;
  primary?: boolean;
};

export type NavSection = {
  id: string;
  label: string;
  groups: NavGroup[];
};

export const husqvarnaNav: NavSection = {
  id: "husqvarna",
  label: "Husqvarna",
  groups: [
    {
      label: "Produkter & reservdelar",
      primary: true,
      items: [
        { label: "Kategorier", href: "#" },
        { label: "Lagerstatus", href: "#" },
      ],
      showcase: {
        type: "showcase",
        title: "Hitta reservdel med AI",
        description:
          "Beskriv maskinen och felet — få guidning till rätt sprängskiss och del.",
        badge: "Preview",
        cta: "Starta AI-sök",
        action: "ai-parts-finder",
      },
    },
    {
      label: "Utrustning & tillbehör",
      primary: true,
      items: [{ label: "Se sortiment", href: "#" }],
    },
    {
      label: "Services by Husqvarna",
      items: [{ label: "Översikt", href: "#" }],
    },
    {
      label: "Support & reparation",
      items: [{ label: "Supportcenter", href: "#" }],
    },
    {
      label: "Nyheter",
      items: [{ label: "Senaste nyheterna", href: "#" }],
    },
    {
      label: "Försäljning & marknadsföring",
      items: [{ label: "Kampanjer", href: "#" }],
    },
    {
      label: "Digitala verktyg",
      items: [{ label: "Produktkopplade verktyg", href: "#" }],
    },
  ],
};

export const minVerksamhetNav: NavSection = {
  id: "min-verksamhet",
  label: "Min verksamhet",
  groups: [
    {
      label: "Dashboard",
      items: [
        { label: "Dealer Dashboard", href: "#", badge: "NY" },
        { label: "Hypercare Dashboard", href: "#" },
        { label: "Alerts / Att göra", href: "#" },
      ],
    },
    {
      label: "Försäljning",
      items: [
        { label: "Offerter", href: "#" },
        { label: "Wishlist", href: "#" },
        { label: "Orderutkast", href: "#" },
        { label: "Bonusrapport (Automower installation)", href: "#" },
      ],
    },
    {
      label: "Beställningar & Ekonomi",
      items: [
        { label: "Beställningar", href: "#" },
        { label: "Restorder", href: "#" },
        { label: "Fakturor", href: "#" },
        { label: "Fakturering & leverans", href: "#" },
      ],
    },
    {
      label: "Företagsinställningar",
      items: [
        { label: "Företagsprofil", href: "#" },
        { label: "Användaradministration", href: "#" },
        { label: "Prislistor", href: "#" },
      ],
    },
  ],
};

export const accountNav = {
  label: "Mitt konto",
  items: [
    { label: "Min profil", href: "#" },
    { label: "Lösenord", href: "#" },
    { label: "Språk", href: "#" },
    { label: "Logga ut", href: "#" },
  ],
};
