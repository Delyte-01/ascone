import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Savings Goals", href: "#savings" },
    { label: "Global Transfers", href: "#transfers" },
    { label: "Investments", href: "#investments" },
    { label: "Private Credit", href: "#credit" },
    { label: "Scheduled Payments", href: "#payments" },
  ],
  Company: [
    { label: "About Ascone", href: "#about" },
    { label: "Our Values", href: "#values" },
    { label: "Careers", href: "#careers" },
    { label: "Press & Media", href: "#press" },
    { label: "Partnerships", href: "#partners" },
  ],
  Resources: [
    { label: "Help Centre", href: "#help" },
    { label: "Blog & Insights", href: "#blog" },
    { label: "API Docs", href: "#docs" },
    { label: "Status Page", href: "#status" },
    { label: "Community", href: "#community" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
    { label: "Regulatory Info", href: "#regulatory" },
    { label: "Security", href: "#security" },
  ],
};

const socials = [
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.751 1.5h2.932L12.06 8.77 19.75 18.5h-6.27l-4.77-6.235L3.15 18.5H.215l7.082-7.802L.25 1.5h6.426l4.313 5.705L15.751 1.5Zm-1.03 15.3h1.625L5.359 3.163H3.616L14.721 16.8Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4.477 2.5a1.977 1.977 0 1 1-3.954 0 1.977 1.977 0 0 1 3.954 0ZM.75 6.5h3.5V19.5H.75V6.5Zm5.75 0h3.35v1.786h.047c.467-.887 1.607-1.82 3.308-1.82 3.538 0 4.19 2.328 4.19 5.354V19.5h-3.5v-6.986c0-1.667-.03-3.81-2.322-3.81-2.325 0-2.68 1.816-2.68 3.691V19.5H6.5V6.5Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 1.802c2.67 0 2.987.01 4.04.059 2.71.123 3.977 1.409 4.1 4.099.048 1.053.057 1.37.057 4.04 0 2.672-.01 2.988-.058 4.04-.124 2.687-1.386 3.977-4.1 4.1-1.054.048-1.369.058-4.04.058-2.67 0-2.987-.01-4.04-.058-2.718-.124-3.977-1.416-4.1-4.1C1.812 12.988 1.8 12.67 1.8 10c0-2.67.01-2.986.059-4.04.124-2.692 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058ZM10 0C7.284 0 6.944.012 5.878.06 2.246.227.228 2.242.061 5.877.01 6.944 0 7.284 0 10c0 2.717.01 3.057.06 4.123.167 3.632 2.182 5.65 5.818 5.817C6.944 19.99 7.284 20 10 20c2.717 0 3.057-.01 4.122-.06 3.629-.167 5.652-2.182 5.818-5.817C19.99 13.057 20 12.717 20 10c0-2.716-.01-3.056-.06-4.122C19.773 2.249 17.76.228 14.122.06 13.057.012 12.717 0 10 0Zm0 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27Zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666Zm5.338-9.87a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 .25C4.477.25 0 4.727 0 10.25c0 4.418 2.865 8.167 6.84 9.491.5.093.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 10 5.42c.85.004 1.705.114 2.504.337 1.91-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.027 1.592 1.027 2.683 0 3.842-2.338 4.687-4.566 4.935.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C17.137 18.413 20 14.666 20 10.25 20 4.727 15.523.25 10 .25Z" />
      </svg>
    ),
  },
];

const badges = ["SEC Compliant", "SOC 2 Type II", "ISO 27001", "256-bit SSL"];

export function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0B] relative overflow-hidden">
      {/* Top gold hairline */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.35) 30%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.35) 70%, transparent)",
        }}
      />

      {/* Ambient glow — centre top */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Fine grain */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* ── CTA Banner ── */}
      <div className="relative z-10 border-b border-[#1A1A1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F0EDE8] leading-[1.04]">
                Ready to command
                <br />
                your <span className="italic text-[#C9A84C]">wealth?</span>
              </h2>
              <p className="font-sans font-light text-[#9E9B95] text-base leading-relaxed max-w-sm">
                Join 48,000+ people already using Ascone to build their
                financial future.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:flex-shrink-0">
              <a
                href="#"
                className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-[#0A0A0B] bg-[#C9A84C] hover:bg-[#E8C97A] rounded-full px-8 py-4 transition-all duration-300 shadow-[0_0_40px_#C9A84C25] hover:shadow-[0_0_50px_#C9A84C45]"
              >
                Get Started — Free
                <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none">
                  <path
                    d="M2 7h10M7 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 font-sans text-sm text-[#9E9B95] hover:text-[#F0EDE8] transition-colors duration-200 px-4 py-4"
              >
                View all features
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_repeat(4,1fr)] gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center shadow-[0_0_16px_#C9A84C35]">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 12 L7 2 L12 12"
                    stroke="#0A0A0B"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 8.5h6"
                    stroke="#0A0A0B"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-serif text-xl text-[#F0EDE8] group-hover:text-[#C9A84C] transition-colors duration-200">
                Ascone
              </span>
            </Link>

            <p className="font-sans font-light text-sm text-[#9E9B95] leading-[1.75] max-w-[240px]">
              The intelligent financial platform for people who take their
              wealth seriously.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-[#2A2A2E] flex items-center justify-center text-[#5A5855] hover:text-[#C9A84C] hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* App store badges */}
            <div className="flex flex-col gap-2 pt-1">
              {["App Store", "Google Play"].map((store) => (
                <a
                  key={store}
                  href="#"
                  className="inline-flex items-center gap-2.5 w-fit border border-[#2A2A2E] rounded-xl px-3 py-2 hover:border-[#C9A84C]/25 hover:bg-[#C9A84C]/4 transition-all duration-200 group"
                >
                  <svg
                    viewBox="0 0 14 14"
                    className="w-3.5 h-3.5 text-[#9E9B95] group-hover:text-[#C9A84C] transition-colors"
                    fill="currentColor"
                  >
                    {store === "App Store" ? (
                      <path d="M9.5 0a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 9.5 0ZM1.5 5H6l-4.5 7.5H7l3.5-5.5L14 14H8.5L7 11.5 5.5 14H0L1.5 11.5 0 9l1.5-4Z" />
                    ) : (
                      <path d="M1 1.5C1 .672 1.672 0 2.5 0h9c.828 0 1.5.672 1.5 1.5v11c0 .828-.672 1.5-1.5 1.5h-9C1.672 14 1 13.328 1 12.5v-11Zm5 10.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM4 2.5v6h6v-6H4Z" />
                    )}
                  </svg>
                  <div>
                    <p className="font-sans text-[9px] text-[#5A5855] uppercase tracking-wider leading-none mb-0.5">
                      Download on
                    </p>
                    <p className="font-sans text-xs text-[#9E9B95] group-hover:text-[#F0EDE8] transition-colors font-medium leading-none">
                      {store}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-5">
              <p className="font-sans text-xs font-medium text-[#F0EDE8] uppercase tracking-[0.18em]">
                {category}
              </p>
              <ul className="space-y-3.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-sans text-sm text-[#5A5855] hover:text-[#9E9B95] transition-colors duration-200 leading-none"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="my-10 h-px bg-[#1A1A1E]" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left — copyright + disclaimer */}
          <div className="space-y-2">
            <p className="font-sans text-xs text-[#5A5855]">
              © {new Date().getFullYear()} Ascone Financial Technologies Ltd.
              All rights reserved.
            </p>
            <p className="font-sans text-[11px] text-[#3A3A3E] leading-relaxed max-w-md">
              Ascone is not a bank. Regulated by the FCA. Your eligible deposits
              are protected up to £85,000 under the FSCS.
            </p>
          </div>

          {/* Right — compliance badges */}
          <div className="flex flex-wrap items-center gap-2">
            {badges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5 border border-[#1E1E22] rounded-full px-3 py-1.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/50" />
                <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-wider">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Large wordmark ── */}
        <div className="mt-12 overflow-hidden">
          <p
            className="font-serif text-[clamp(3.5rem,12vw,9rem)] leading-none text-[#F0EDE8] opacity-[0.025] select-none tracking-tight"
            aria-hidden
          >
            Ascone
          </p>
        </div>
      </div>
    </footer>
  );
}
