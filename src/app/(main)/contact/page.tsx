import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Contact – Jacob Jansson",
  description: "Get in touch with Jacob Jansson — UX Designer based in Sweden.",
};

const contactChannels = [
  {
    label: "Email",
    value: "Jansson.jacob@gmail.com",
    href: "mailto:Jansson.jacob@gmail.com",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+46 70 355 35 29",
    href: "tel:+46703553529",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "jacob-jansson",
    href: "https://www.linkedin.com/in/jacob-jansson-61793023",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-28">
      <FadeIn>
        <div className="grid items-center gap-16 md:grid-cols-[1fr_320px] md:gap-20">
          {/* Left — text + contact info */}
          <div>
            <h1 className="text-[2.25rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-[2.75rem]">
              Get in touch
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              If you&rsquo;d like to talk about a role, a project, or just
              connect, feel free to reach out.
            </p>

            {/* Contact channels */}
            <div className="mt-12 space-y-6">
              {contactChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.label === "LinkedIn" ? "_blank" : undefined}
                  rel={
                    channel.label === "LinkedIn"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center gap-5 rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:border-foreground/20 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                    {channel.icon}
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                      {channel.label}
                    </span>
                    <p className="mt-0.5 text-base font-medium text-foreground">
                      {channel.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability note */}
            <div className="mt-12 rounded-xl border border-border bg-[#fafafa] px-6 py-5">
              <p className="text-sm leading-relaxed text-muted">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#2a9d5c]" />
                Currently open to new opportunities &mdash; contract
                or permanent roles in UX design and product strategy.
              </p>
            </div>
          </div>

          {/* Right — profile photo */}
          <FadeIn>
            <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-full bg-[#e5e7eb] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <Image
                src="/images/about/profilbild.jpg"
                alt="Jacob Jansson"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          </FadeIn>
        </div>
      </FadeIn>
    </section>
  );
}
