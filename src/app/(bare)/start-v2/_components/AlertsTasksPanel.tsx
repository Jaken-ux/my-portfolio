"use client";

import { useState } from "react";

type AlertPriority = "high" | "medium" | "low";

type AlertItem = {
  id: string;
  title: string;
  description: string;
  priority: AlertPriority;
  timestamp: string;
  actionLabel: string;
  actionHref: string;
};

const priorityStyles: Record<AlertPriority, string> = {
  high: "bg-[#fce8e8] text-[#c44]",
  medium: "bg-[#fff8e1] text-[#b8860b]",
  low: "bg-[#f0f0f0] text-[#777]",
};

const priorityDot: Record<AlertPriority, string> = {
  high: "bg-[#c44]",
  medium: "bg-[#b8860b]",
  low: "bg-[#ccc]",
};

const alerts: AlertItem[] = [
  {
    id: "HC-201",
    title: "HyperCare: Automower 435X AWD firmware issue",
    description: "Critical firmware update required for units manufactured Q3 2025. 3 affected units in your stock.",
    priority: "high",
    timestamp: "2 hours ago",
    actionLabel: "Review alert",
    actionHref: "#hypercare/HC-201",
  },
  {
    id: "WE-104",
    title: "Warranty expiring: 5 registered products",
    description: "Extended warranty period ending within 30 days. Contact customers to discuss renewal options.",
    priority: "medium",
    timestamp: "Today",
    actionLabel: "View products",
    actionHref: "#warranty/expiring",
  },
  {
    id: "TK-892",
    title: "Open ticket: 346XP chain tensioner recall",
    description: "Service bulletin SB-2026-003 requires dealer action. Check affected serial number range.",
    priority: "high",
    timestamp: "Yesterday",
    actionLabel: "Open case",
    actionHref: "#tickets/TK-892",
  },
  {
    id: "WE-098",
    title: "Warranty claim pending review",
    description: "Case #W-1019 battery replacement needs your approval before processing.",
    priority: "medium",
    timestamp: "Yesterday",
    actionLabel: "Review claim",
    actionHref: "#warranty/W-1019",
  },
  {
    id: "INV-44",
    title: "Overdue invoice: INV-2026-0044",
    description: "Payment 14 days overdue. Amount: SEK 24,800.",
    priority: "low",
    timestamp: "Mar 1",
    actionLabel: "View invoice",
    actionHref: "#invoices/INV-44",
  },
];

export default function AlertsTasksPanel() {
  const [collapsed, setCollapsed] = useState(false);

  const highCount = alerts.filter((a) => a.priority === "high").length;

  return (
    <section aria-labelledby="alerts-heading">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={!collapsed}
        aria-controls="alerts-panel"
      >
        <div className="flex items-center gap-3">
          <h2 id="alerts-heading" className="text-lg font-semibold text-[#111]">
            Alerts &amp; Tasks
          </h2>
          {highCount > 0 && (
            <span className="rounded-full bg-[#c44] px-2 py-0.5 text-[10px] font-bold text-white">
              {highCount} urgent
            </span>
          )}
        </div>
        <svg
          className={`h-5 w-5 text-[#999] transition-transform ${collapsed ? "" : "rotate-180"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          viewBox="0 0 20 20"
        >
          <path d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {!collapsed && (
        <div id="alerts-panel" className="mt-4 rounded-xl border border-[#e5e5e5] bg-white">
          <ul className="divide-y divide-[#f5f5f5]">
            {alerts.map((alert) => (
              <li key={alert.id} className="flex items-start gap-4 px-5 py-4">
                {/* Priority dot */}
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${priorityDot[alert.priority]}`}
                  aria-label={`${alert.priority} priority`}
                />

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <p className="text-sm font-semibold text-[#222]">
                      {alert.title}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${priorityStyles[alert.priority]}`}
                    >
                      {alert.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#888]">
                    {alert.description}
                  </p>
                  <p className="mt-1 text-[11px] text-[#bbb]">{alert.timestamp}</p>
                </div>

                {/* Action */}
                <a
                  href={alert.actionHref}
                  className="shrink-0 self-center rounded-lg border border-[#e0e0e0] bg-[#fafafa] px-3 py-1.5 text-[12px] font-semibold text-[#444] transition-colors hover:bg-[#eee] hover:text-[#111]"
                >
                  {alert.actionLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
