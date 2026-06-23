"use client";

import { useState, useRef, useEffect, useId } from "react";
import { createPortal } from "react-dom";

type Variant = "primary" | "secondary";

const CV_OPTIONS = [
  { label: "English — UX focus", file: "Jacob_Jansson_CV_UX_EN.pdf" },
  { label: "English — AI builds focus", file: "Jacob_Jansson_CV_AI_EN.pdf" },
  { label: "Svenska — UX-fokus", file: "Jacob_Jansson_CV_UX.pdf" },
  { label: "Svenska — AI-fokus", file: "Jacob_Jansson_CV_AI.pdf" },
];

const DEFAULT_FILE = CV_OPTIONS[0].file;

export default function CVDownload({
  variant = "secondary",
}: {
  variant?: Variant;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuPos, setMenuPos] = useState<{
    top: number;
    left: number;
    minWidth: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Position the menu relative to the trigger when opening
  useEffect(() => {
    if (!open || !containerRef.current) return;
    const updatePosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 8,
        left: rect.left,
        minWidth: rect.width,
      });
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !containerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveIndex(-1);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % CV_OPTIONS.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? CV_OPTIONS.length - 1 : i - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(CV_OPTIONS.length - 1);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  useEffect(() => {
    if (open && activeIndex >= 0) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [open, activeIndex]);

  const isPrimary = variant === "primary";
  const baseHover =
    "transition-colors duration-200 hover:bg-foreground hover:text-background";
  const mainClasses = isPrimary
    ? "inline-flex h-11 items-center rounded-l-full bg-foreground pl-6 pr-4 text-sm font-medium text-background transition-colors duration-200 hover:bg-[#333]"
    : `inline-flex h-11 items-center rounded-l-full pl-6 pr-4 text-sm font-medium text-foreground ${baseHover}`;
  const chevronClasses = isPrimary
    ? "inline-flex h-11 items-center justify-center rounded-r-full border-l border-[#333] bg-foreground px-3 text-background transition-colors duration-200 hover:bg-[#333]"
    : `inline-flex h-11 items-center justify-center rounded-r-full border-l border-border px-3 text-foreground ${baseHover}`;
  const containerClasses = isPrimary
    ? "relative inline-flex items-stretch rounded-full"
    : "relative inline-flex items-stretch rounded-full border border-border transition-colors duration-200 hover:border-foreground";

  const menu =
    open && mounted && menuPos ? (
      <ul
        id={menuId}
        ref={menuRef}
        role="menu"
        aria-label="CV variants"
        style={{
          backgroundColor: "#ffffff",
          position: "fixed",
          top: menuPos.top,
          left: menuPos.left,
          minWidth: Math.max(menuPos.minWidth, 260),
        }}
        className="animate-panel-in z-[1000] list-none overflow-hidden rounded-2xl border border-border p-0 shadow-xl"
      >
        {CV_OPTIONS.map((opt, i) => (
          <li key={opt.file} role="none">
            <a
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              href={`/cv/${opt.file}`}
              download
              role="menuitem"
              tabIndex={-1}
              onClick={() => {
                setOpen(false);
                setActiveIndex(-1);
              }}
              className="block px-5 py-3 text-sm text-foreground outline-none transition-colors hover:bg-[#f3f4f6] focus-visible:bg-[#f3f4f6] focus-visible:outline-none"
            >
              {opt.label}
            </a>
          </li>
        ))}
      </ul>
    ) : null;

  return (
    <div ref={containerRef} className={containerClasses}>
      {/* Main button — downloads the default CV */}
      <a href={`/cv/${DEFAULT_FILE}`} download className={mainClasses}>
        Download CV
      </a>

      {/* Chevron — opens variant menu */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            setActiveIndex(next ? 0 : -1);
            return next;
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActiveIndex(0);
          }
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Choose CV variant"
        className={chevronClasses}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Menu rendered into document.body via portal to escape stacking contexts */}
      {mounted && menu && createPortal(menu, document.body)}
    </div>
  );
}
