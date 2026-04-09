"use client";

import { useState } from "react";

export default function PasswordCopy({ password }: { password: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
      <span>Password:</span>
      <code className="rounded bg-[#f3f4f6] px-2 py-1 font-mono text-[13px] text-foreground">
        {password}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy password"
        className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-[#f3f4f6] hover:text-foreground"
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </button>
      {copied && <span className="text-[12px] text-accent">Copied!</span>}
    </div>
  );
}
