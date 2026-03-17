import { ArrowUpRight } from "lucide-react";

const values = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="10" cy="10" r="5.5" stroke="#C9A84C" strokeWidth="1.4" />
        <circle cx="22" cy="10" r="5.5" stroke="#C9A84C" strokeWidth="1.4" />
        <circle cx="10" cy="22" r="5.5" stroke="#C9A84C" strokeWidth="1.4" />
        <circle cx="22" cy="22" r="5.5" stroke="#C9A84C" strokeWidth="1.4" />
      </svg>
    ),
    tag: "01 — Trust",
    title: "Radical Transparency",
    body: "No hidden fees. No fine print. Every rate, every charge — visible before you commit. Clarity is a financial right, not a privilege.",
    highlight: false,
    stat: "100%",
    statLabel: "fee visibility",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4L28 22H4L16 4Z"
          stroke="#C9A84C"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M16 12L22 22H10L16 12Z"
          stroke="#C9A84C"
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.4"
        />
      </svg>
    ),
    tag: "02 — Growth",
    title: "Creative Expansion",
    body: "Our proprietary platform helps you locate, manage, and scale investments across every asset class — from public equities to alternative credit.",
    highlight: false,
    stat: "12+",
    statLabel: "asset classes",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="11" r="7" stroke="#0A0A0B" strokeWidth="1.4" />
        <circle cx="16" cy="11" r="3" stroke="#0A0A0B" strokeWidth="1.4" />
        <path
          d="M9 20C9 20 9 28 16 28C23 28 23 20 23 20"
          stroke="#0A0A0B"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    tag: "03 — Access",
    title: "Private Credit Access",
    body: "We open doors reserved for institutions. Rare private credit opportunities that diversify your portfolio with uncorrelated, high-yield returns.",
    highlight: true,
    stat: "$14B+",
    statLabel: "in private credit",
  },
];

export function ValuesSection() {
  return (
    <section className="w-full py-24 md:py-36 relative overflow-hidden">
      {/* ── Luxury gradient background ── */}
      <div className="absolute inset-0 bg-[#0A0A0B]" />

      {/* Large radial — top centre, deep gold */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.13) 0%, rgba(201,168,76,0.04) 45%, transparent 70%)",
        }}
      />

      {/* Left bleed — warm amber */}
      <div
        className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Right bleed — cooler, dimmer */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(201,168,76,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Subtle horizontal rule — light from above */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.35) 50%, rgba(201,168,76,0.25) 70%, transparent)",
        }}
      />

      {/* Fine grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 bg-[#C9A84C]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <span className="text-xs font-sans font-medium text-[#C9A84C] tracking-[0.15em] uppercase">
                Our Values
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-[#F0EDE8] max-w-xl">
              Make every spend,
              <br />
              <span className="italic text-[#C9A84C]">well-spent.</span>
            </h2>
          </div>

          <div className="space-y-4 max-w-xs">
            <p className="text-[#9E9B95] font-sans font-light text-base leading-relaxed md:text-right">
              A diversified group of specialized private credit brands built on
              transparency, technology, and trust.
            </p>
            {/* Decorative dash */}
            <div className="hidden md:flex justify-end">
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-[#C9A84C]/40" />
                <span className="text-[10px] font-sans text-[#5A5855] uppercase tracking-widest">
                  Since 2020
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((value, i) => (
            <div
              key={i}
              className={`
                relative rounded-2xl flex flex-col justify-between min-h-[340px] overflow-hidden
                transition-all duration-500 group
                ${
                  value.highlight
                    ? "border border-[#C9A84C]"
                    : "border border-[#1E1E22] hover:border-[#C9A84C]/20"
                }
              `}
              style={
                value.highlight
                  ? {
                      background:
                        "linear-gradient(145deg, #C9A84C 0%, #B8962E 55%, #A07820 100%)",
                    }
                  : {
                      background:
                        "linear-gradient(145deg, #131315 0%, #111113 60%, #0F0F11 100%)",
                    }
              }
            >
              {/* Inner glow on dark cards */}
              {!value.highlight && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 0%, rgba(201,168,76,0.06) 0%, transparent 60%)",
                  }}
                />
              )}

              {/* Top shimmer line on hover */}
              {!value.highlight && (
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 50%, transparent)",
                  }}
                />
              )}

              <div className="p-8 flex flex-col justify-between h-full">
                {/* Top section */}
                <div>
                  {/* Tag + icon row */}
                  <div className="flex items-center justify-between mb-7">
                    <span
                      className={`font-sans text-[10px] uppercase tracking-[0.18em] ${
                        value.highlight ? "text-[#0A0A0B]/50" : "text-[#5A5855]"
                      }`}
                    >
                      {value.tag}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        value.highlight
                          ? "bg-[#0A0A0B]/12"
                          : "bg-[#1A1A1E] border border-[#252528]"
                      }`}
                    >
                      {value.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-serif text-2xl leading-snug mb-3 ${
                      value.highlight ? "text-[#0A0A0B]" : "text-[#F0EDE8]"
                    }`}
                  >
                    {value.title}
                  </h3>

                  {/* Body */}
                  <p
                    className={`font-sans font-light text-sm leading-[1.7] ${
                      value.highlight ? "text-[#0A0A0B]/65" : "text-[#6E6C68]"
                    }`}
                  >
                    {value.body}
                  </p>
                </div>

                {/* Bottom section */}
                <div
                  className={`mt-8 pt-5 border-t flex items-end justify-between ${
                    value.highlight ? "border-[#0A0A0B]/15" : "border-[#1A1A1E]"
                  }`}
                >
                  {/* Stat */}
                  <div>
                    <p
                      className={`font-serif text-2xl leading-none ${
                        value.highlight ? "text-[#0A0A0B]" : "text-[#C9A84C]"
                      }`}
                    >
                      {value.stat}
                    </p>
                    <p
                      className={`font-sans text-[10px] mt-1 uppercase tracking-wider ${
                        value.highlight ? "text-[#0A0A0B]/45" : "text-[#5A5855]"
                      }`}
                    >
                      {value.statLabel}
                    </p>
                  </div>

                  {/* Arrow button */}
                  <button
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      value.highlight
                        ? "border-[#0A0A0B]/25 text-[#0A0A0B] hover:bg-[#0A0A0B]/10"
                        : "border-[#2A2A2E] text-[#5A5855] group-hover:border-[#C9A84C]/50 group-hover:text-[#C9A84C] transition-colors"
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom context line ── */}
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-1">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-[#C9A84C]/30" />
            <p className="font-sans text-xs text-[#5A5855]">
              Built on principles that last — not trends that fade.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {["SEC Compliant", "SOC 2 Type II", "ISO 27001"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40" />
                <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-wider">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
