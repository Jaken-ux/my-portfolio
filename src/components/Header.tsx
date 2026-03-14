"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "CV", href: "/cv/Jacob_Jansson_CV.pdf", external: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleHashClick = (e: React.MouseEvent, href: string) => {
    const hash = href.split("#")[1];
    if (hash && pathname === "/") {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          Jacob Jansson
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleHashClick(e, link.href)}
                className="text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-[2px] w-5 bg-foreground transition-all duration-200 ${
              menuOpen ? "translate-y-[5.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-foreground transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-foreground transition-all duration-200 ${
              menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          className="border-t border-border px-6 pb-6 md:hidden"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => { handleHashClick(e, link.href); setMenuOpen(false); }}
                className="block py-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
