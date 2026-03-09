"use client";

import { useState, useCallback, useRef, useEffect, Fragment } from "react";
import { husqvarnaNav, minVerksamhetNav, accountNav } from "./navData";
import MegaPanel from "./MegaPanel";
import MobileDrawer from "./MobileDrawer";
import AiPartsFinderModal from "./AiPartsFinderModal";
import ProfileSwitcher from "./ProfileSwitcher";

type OpenPanel = "husqvarna" | "min-verksamhet" | null;

export default function NavHeader() {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleAction = useCallback((action: string) => {
    if (action === "ai-parts-finder") {
      setOpenPanel(null);
      setAiModalOpen(true);
    }
  }, []);

  const husqvarnaTriggerRef = useRef<HTMLButtonElement>(null);
  const accountTriggerRef = useRef<HTMLButtonElement>(null);
  const accountPanelRef = useRef<HTMLDivElement>(null);
  const verksamhetTriggerRef = useRef<HTMLButtonElement>(null);

  const togglePanel = useCallback((panel: OpenPanel) => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  }, []);

  const closePanel = useCallback(() => {
    setOpenPanel((prev) => {
      requestAnimationFrame(() => {
        if (prev === "husqvarna") husqvarnaTriggerRef.current?.focus();
        if (prev === "min-verksamhet") verksamhetTriggerRef.current?.focus();
      });
      return null;
    });
  }, []);

  return (
    <header className="relative bg-white">
      {/* ═══ Row 1: Utility bar — compact, subdued ═══ */}
      <div className="border-b border-[#f0f0f0] bg-[#fafafa]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-1.5 md:px-6">
          {/* Left: Brand — small */}
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Öppna meny"
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#777] transition-colors hover:bg-[#eee] md:hidden"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>

            <span className="hidden text-[13px] font-semibold tracking-tight text-[#555] md:block">
              Husqvarna Dealer Portal
            </span>
          </div>

          {/* Right: Profile + icons — small */}
          <div className="flex items-center gap-3">
            {/* Profile switcher (desktop) */}
            <div className="hidden md:block">
              <ProfileSwitcher />
            </div>

            {/* Divider */}
            <div className="hidden h-5 w-px bg-[#e0e0e0] md:block" />

            {/* Icons — smaller */}
            <div className="flex items-center gap-0.5">
              {/* Search icon mobile */}
              <button
                aria-label="Sök"
                className="flex h-8 w-8 items-center justify-center rounded-md text-[#777] transition-colors hover:bg-[#eee] md:hidden"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M10.5 10.5L14 14" />
                </svg>
              </button>

              {/* Account dropdown */}
              <div className="relative">
                <button
                  ref={accountTriggerRef}
                  onClick={() => setAccountOpen((prev) => !prev)}
                  aria-label="Mitt konto"
                  aria-expanded={accountOpen}
                  aria-haspopup="true"
                  className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                    accountOpen
                      ? "bg-[#e8e8e8] text-[#333]"
                      : "text-[#777] hover:bg-[#eee]"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <circle cx="9" cy="6" r="3" />
                    <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  </svg>
                </button>

                {accountOpen && (
                  <AccountDropdown
                    panelRef={accountPanelRef}
                    onClose={() => {
                      setAccountOpen(false);
                      requestAnimationFrame(() =>
                        accountTriggerRef.current?.focus()
                      );
                    }}
                  />
                )}
              </div>

              {/* Cart */}
              <button
                aria-label="Varukorg"
                className="relative flex h-8 w-8 items-center justify-center rounded-md text-[#777] transition-colors hover:bg-[#eee]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 1h2.5l1.2 9.5a1.5 1.5 0 001.5 1.3h7.6a1.5 1.5 0 001.5-1.1L17 5H4.5" />
                  <circle cx="7" cy="15.5" r="1" />
                  <circle cx="13.5" cy="15.5" r="1" />
                </svg>
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff6b00] text-[8px] font-bold text-white">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Row 2: Primary navigation — dominant bar ═══ */}
      <div className="hidden border-b-2 border-[#ddd] bg-white shadow-sm md:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 md:px-6">
          {/* Left: Husqvarna domain */}
          <div className="flex items-center">
            <button
              ref={husqvarnaTriggerRef}
              onClick={() => togglePanel("husqvarna")}
              aria-expanded={openPanel === "husqvarna"}
              aria-haspopup="true"
              className={`relative flex items-center gap-2.5 px-5 py-5 text-base transition-colors focus:outline-none ${
                openPanel === "husqvarna"
                  ? "text-[#111]"
                  : "text-[#444] hover:text-[#111]"
              }`}
            >
              <span className="font-bold text-[#111]">Husqvarna</span>
              <span className="text-sm font-medium text-[#999]">Produkter &amp; tjänster</span>
              <ChevronDown open={openPanel === "husqvarna"} />
              <span
                className={`absolute bottom-0 left-5 right-5 h-[3px] rounded-full bg-[#111] transition-opacity motion-reduce:transition-none ${
                  openPanel === "husqvarna" ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          </div>

          {/* Center: Search — large & prominent */}
          <div className="flex flex-1 justify-center px-12">
            <div className="relative w-full max-w-xl">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
              <input
                type="text"
                placeholder="Sök produkter, artiklar, sprängskisser..."
                aria-label="Sök"
                className="h-11 w-full rounded-xl border border-[#d0d0d0] bg-[#f8f8f8] pl-11 pr-4 text-[15px] text-[#333] placeholder-[#aaa] transition-colors focus:border-[#999] focus:bg-white focus:shadow-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Right: Min verksamhet domain */}
          <div className="flex items-center">
            <button
              ref={verksamhetTriggerRef}
              onClick={() => togglePanel("min-verksamhet")}
              aria-expanded={openPanel === "min-verksamhet"}
              aria-haspopup="true"
              className={`relative flex items-center gap-2.5 px-5 py-5 text-base transition-colors focus:outline-none ${
                openPanel === "min-verksamhet"
                  ? "text-[#111]"
                  : "text-[#444] hover:text-[#111]"
              }`}
            >
              <span className="font-bold text-[#111]">Min verksamhet</span>
              <span className="text-sm font-medium text-[#999]">Dashboard, order &amp; verktyg</span>
              <ChevronDown open={openPanel === "min-verksamhet"} />
              <span
                className={`absolute bottom-0 left-5 right-5 h-[3px] rounded-full bg-[#111] transition-opacity motion-reduce:transition-none ${
                  openPanel === "min-verksamhet" ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mega panels (desktop) */}
      <PanelTransition open={openPanel === "husqvarna"}>
        <MegaPanel section={husqvarnaNav} onClose={closePanel} onAction={handleAction} />
      </PanelTransition>
      <PanelTransition open={openPanel === "min-verksamhet"}>
        <MegaPanel section={minVerksamhetNav} onClose={closePanel} onAction={handleAction} />
      </PanelTransition>

      {/* Mobile drawer */}
      {mobileOpen && (
        <MobileDrawer
          sections={[husqvarnaNav, minVerksamhetNav]}
          onClose={() => setMobileOpen(false)}
        />
      )}

      {/* AI Parts Finder modal */}
      {aiModalOpen && (
        <AiPartsFinderModal onClose={() => setAiModalOpen(false)} />
      )}
    </header>
  );
}

function PanelTransition({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="animate-panel-in motion-reduce:animate-none">
      {children}
    </div>
  );
}

function AccountDropdown({
  panelRef,
  onClose,
}: {
  panelRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => firstLinkRef.current?.focus(), 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, [onClose, panelRef]);

  const lastIndex = accountNav.items.length - 1;

  return (
    <div
      ref={panelRef}
      role="menu"
      aria-label="Mitt konto"
      className="animate-panel-in motion-reduce:animate-none absolute right-0 top-full z-50 mt-2 w-52 rounded-lg border border-[#e5e5e5] bg-white py-2 shadow-lg"
    >
      <p className="px-4 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-widest text-[#bbb]">
        Mitt konto
      </p>
      {accountNav.items.map((item, i) => (
        <Fragment key={item.label}>
          {i === lastIndex && (
            <div className="my-1 border-t border-[#f0f0f0]" />
          )}
          <a
            ref={i === 0 ? firstLinkRef : undefined}
            href={item.href}
            role="menuitem"
            className={`block px-4 py-2 text-sm transition-colors hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] focus-visible:outline-none ${
              i === lastIndex ? "text-[#c00]" : "text-[#555] hover:text-[#111]"
            }`}
          >
            {item.label}
          </a>
        </Fragment>
      ))}
    </div>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={`transition-transform duration-200 motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}
