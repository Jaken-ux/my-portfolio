"use client";

import { useState } from "react";

export type Channel = {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  copyValue?: string;
};

const ClipboardIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function ContactChannels({ channels }: { channels: Channel[] }) {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
      window.setTimeout(() => setCopiedLabel((c) => (c === label ? null : c)), 2000);
    } catch {
      // clipboard unavailable — silently no-op
    }
  };

  return (
    <div className="mt-12 space-y-6">
      {channels.map((channel) => {
        const isCopy = Boolean(channel.copyValue);
        const isExternal = channel.label === "LinkedIn";
        const isCopied = copiedLabel === channel.label;

        const cardClasses =
          "group flex items-center gap-5 rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:border-foreground/20 hover:shadow-md";

        const body = (
          <>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-muted transition-colors group-hover:bg-foreground group-hover:text-background">
              {channel.icon}
            </span>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                {channel.label}
              </span>
              <p className="mt-0.5 truncate text-base font-medium text-foreground">
                {channel.value}
              </p>
            </div>
            {isCopy && (
              <span
                className={`flex shrink-0 items-center gap-1.5 text-xs font-medium transition-colors ${
                  isCopied ? "text-[#2a9d5c]" : "text-muted group-hover:text-foreground"
                }`}
                aria-live="polite"
              >
                {isCopied ? (
                  <>
                    <CheckIcon />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <ClipboardIcon />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </span>
            )}
          </>
        );

        if (isCopy) {
          return (
            <button
              key={channel.label}
              type="button"
              onClick={() => handleCopy(channel.copyValue!, channel.label)}
              aria-label={`Copy ${channel.label.toLowerCase()} to clipboard`}
              className={`${cardClasses} w-full text-left`}
            >
              {body}
            </button>
          );
        }

        return (
          <a
            key={channel.label}
            href={channel.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={cardClasses}
          >
            {body}
          </a>
        );
      })}
    </div>
  );
}
