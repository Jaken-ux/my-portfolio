"use client";

type StatusColor = "green" | "amber" | "red" | "neutral";

type Widget = {
  label: string;
  value: number;
  helper: string;
  cta: string;
  statusColor: StatusColor;
  trend?: { direction: "up" | "down"; text: string };
  href: string;
};

const statusColorMap: Record<StatusColor, string> = {
  green: "border-l-[#2a9d5c]",
  amber: "border-l-[#b8860b]",
  red: "border-l-[#c44]",
  neutral: "border-l-[#ccc]",
};

const widgets: Widget[] = [
  {
    label: "Pending Orders",
    value: 14,
    helper: "Since last login",
    cta: "View list",
    statusColor: "amber",
    trend: { direction: "up", text: "+3 since yesterday" },
    href: "#orders?status=pending",
  },
  {
    label: "Backorders",
    value: 6,
    helper: "3 critical",
    cta: "View list",
    statusColor: "red",
    trend: { direction: "up", text: "+1 this week" },
    href: "#orders?status=backorder",
  },
  {
    label: "New Invoices",
    value: 8,
    helper: "Since last login",
    cta: "View list",
    statusColor: "neutral",
    href: "#invoices?status=new",
  },
  {
    label: "Deliveries This Week",
    value: 12,
    helper: "Next: Tomorrow 08:00",
    cta: "View list",
    statusColor: "green",
    trend: { direction: "down", text: "-2 vs last week" },
    href: "#deliveries?period=week",
  },
  {
    label: "Needs Attention",
    value: 3,
    helper: "Incl. HyperCare alerts",
    cta: "Review all",
    statusColor: "red",
    href: "#alerts",
  },
];

export default function DashboardWidgets() {
  return (
    <section aria-labelledby="dashboard-heading">
      <h2 id="dashboard-heading" className="sr-only">
        Dashboard overview
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {widgets.map((w) => (
          <a
            key={w.label}
            href={w.href}
            className={`group flex flex-col rounded-xl border border-[#e5e5e5] border-l-[3px] bg-white p-5 transition-all hover:border-[#ccc] hover:shadow-md ${statusColorMap[w.statusColor]}`}
          >
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#999]">
              {w.label}
            </p>
            <p className="mt-2 text-[2rem] font-extrabold leading-none text-[#111]">
              {w.value}
            </p>
            <p className="mt-2 text-[12px] text-[#888]">{w.helper}</p>
            {w.trend && (
              <p
                className={`mt-1 text-[11px] font-medium ${
                  w.trend.direction === "up"
                    ? "text-[#c44]"
                    : "text-[#2a9d5c]"
                }`}
              >
                {w.trend.direction === "up" ? "↑" : "↓"} {w.trend.text}
              </p>
            )}
            <span className="mt-3 text-[11px] font-semibold text-[#5b6abf] opacity-0 transition-opacity group-hover:opacity-100">
              {w.cta} →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
