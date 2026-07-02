"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = { label: string; href: string; external?: boolean };

const navLinks: NavLink[] = [
  { label: "Case Studies", href: "/#work" },
  { label: "AI Builds", href: "/ai-builds" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "CV", href: "/cv/Jacob_Jansson_CV.pdf", external: true },
];

// External links (CV PDF) and hash-only scroll anchors (Case Studies → /#work)
// don't correspond to a route the user "is on", so they never get an active
// state. Everything else matches exact path or as a prefix (future-proofs
// nested routes like /ai-builds/some-build).
function isActive(link: NavLink, pathname: string | null): boolean {
  if (!pathname) return false;
  if (link.external) return false;
  if (link.href.includes("#")) return false;
  return pathname === link.href || pathname.startsWith(link.href + "/");
}

// Nav label with a hidden bold ghost that reserves the semibold width. This
// prevents horizontal layout-shift when the active state moves between links —
// each link is always as wide as its bold version, so sibling links can't
// wiggle sideways when one of them turns semibold.
function NavLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="grid">
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 font-semibold"
      >
        {label}
      </span>
      <span
        className={`col-start-1 row-start-1 ${active ? "font-semibold text-foreground" : ""}`}
      >
        {label}
      </span>
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleHashClick = (e: React.MouseEvent, href: string) => {
    const hash = href.split("#")[1];
    if (hash && pathname === "/") {
      e.preventDefault();
      // Tell SelectedWorkMorph to skip its scroll-driven morph during the
      // upcoming smooth scroll — otherwise the cards flash through their
      // entire flight at scroll-speed.
      window.dispatchEvent(new CustomEvent("nav-skip-morph"));
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            Jacob Jansson
          </Link>
          <span
            className="hidden items-center gap-1.5 text-xs font-medium text-muted sm:inline-flex"
            aria-label="Currently open for new projects"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#10b981]"
              aria-hidden="true"
            />
            Open for new projects
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActive(link, pathname);
            const commonClasses =
              "text-sm font-medium text-muted transition-colors hover:text-foreground";
            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={commonClasses}
                aria-current={active ? "page" : undefined}
              >
                <NavLabel label={link.label} active={active} />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleHashClick(e, link.href)}
                className={commonClasses}
                aria-current={active ? "page" : undefined}
              >
                <NavLabel label={link.label} active={active} />
              </Link>
            );
          })}
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
          {navLinks.map((link) => {
            const active = isActive(link, pathname);
            const commonClasses =
              "block py-3 text-sm font-medium text-muted transition-colors hover:text-foreground";
            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className={commonClasses}
                aria-current={active ? "page" : undefined}
              >
                <NavLabel label={link.label} active={active} />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleHashClick(e, link.href);
                  setMenuOpen(false);
                }}
                className={commonClasses}
                aria-current={active ? "page" : undefined}
              >
                <NavLabel label={link.label} active={active} />
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
