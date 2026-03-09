type QuickLink = {
  label: string;
  description: string;
  href: string;
};

const links: QuickLink[] = [
  { label: "Price List Export", description: "Download latest dealer price lists", href: "#" },
  { label: "Husqvarna Leasing", description: "Leasing options and calculator", href: "#" },
  { label: "Marketing Portal", description: "Campaign assets and materials", href: "#" },
  { label: "Power Portal", description: "Technical product information", href: "#" },
  { label: "Service Hub / RMA", description: "Return and repair management", href: "#" },
  { label: "Husqvarna University", description: "Certifications and e-learning", href: "#" },
  { label: "Training Portal", description: "Book training sessions", href: "#" },
  { label: "Fleet Services", description: "Fleet management tools", href: "#" },
];

export default function QuickLinks() {
  return (
    <section aria-labelledby="quicklinks-heading">
      <h2
        id="quicklinks-heading"
        className="text-lg font-semibold text-[#111]"
      >
        Quick Links
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="group rounded-lg px-2 py-2 transition-colors hover:bg-[#f5f5f5]"
          >
            <p className="text-sm font-medium text-[#333] group-hover:text-[#111]">
              {link.label}
            </p>
            <p className="mt-0.5 text-[12px] text-[#aaa]">
              {link.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
