"use client";

import { Button } from "@/components/ui/button";
import { Star, ArrowUpRight, TrendingUp, Shield, Zap } from "lucide-react";

const trustLogos = ["Loom", "HubSpot", "OpenAI", "Raycast", "Zenefits"];

export function HeroSection() {
  return (
    <section className="w-full min-h-screen bg-[#0A0A0B] relative overflow-hidden flex items-center">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025]" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-grid"
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 72 0 L 0 0 0 72"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Glows */}
      <div
        className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-[#C9A84C]/6 blur-[160px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/4 blur-[120px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-28 lg:py-36 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-center">
          {/* LEFT — Copy */}
          <div className="space-y-10 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 border border-[#C9A84C]/30 rounded-full px-4 py-2 bg-[#C9A84C]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="text-xs font-sans font-medium text-[#C9A84C] tracking-[0.18em] uppercase">
                Now Live — Join 48,000+ users
              </p>
            </div>

            {/* Headline */}
            <div className="space-y-5">
              <h1 className="font-serif text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem] leading-[1.02] text-[#F0EDE8]">
                The smarter way
                <br />
                to command your
                <br />
                <span className="italic text-[#C9A84C]">wealth.</span>
              </h1>
              <p className="text-[#9E9B95] text-lg leading-[1.75] font-sans font-light max-w-[380px]">
                From daily spending to long-term investing — Ascone unifies
                every financial decision in one intelligent, secure platform.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button className="bg-[#C9A84C] hover:bg-[#E8C97A] text-[#0A0A0B] font-sans font-semibold rounded-full px-8 py-6 text-base transition-all duration-300 shadow-[0_0_40px_#C9A84C28] hover:shadow-[0_0_50px_#C9A84C45]">
                Start Free Today
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
              <button className="flex items-center gap-2.5 text-[#9E9B95] hover:text-[#F0EDE8] font-sans text-sm transition-colors duration-200 group">
                <span className="w-9 h-9 rounded-full border border-[#2A2A2E] flex items-center justify-center group-hover:border-[#C9A84C]/40 transition-colors">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5 fill-current ml-0.5"
                  >
                    <path d="M6 3.5L11 8 6 12.5V3.5Z" />
                  </svg>
                </span>
                Watch a demo
              </button>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]"
                  />
                ))}
              </div>
              <p className="text-sm font-sans text-[#9E9B95]">
                <span className="text-[#F0EDE8] font-medium">4.9/5</span> · 120+
                verified reviews
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {[
                {
                  icon: <Shield className="w-3 h-3" />,
                  label: "Bank-grade security",
                },
                {
                  icon: <Zap className="w-3 h-3" />,
                  label: "Instant transfers",
                },
                {
                  icon: <TrendingUp className="w-3 h-3" />,
                  label: "Smart investments",
                },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-[#9E9B95] border border-[#2A2A2E] rounded-full px-3 py-1.5 bg-[#111113]"
                >
                  <span className="text-[#C9A84C]">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Dashboard mockup */}
          <div className="relative">
            {/* Main dashboard card */}
            <div className="relative bg-[#111113] border border-[#2A2A2E] rounded-3xl p-5 shadow-2xl">
              {/* App bar */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#1A1A1E]">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#C9A84C] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
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
                  <span className="font-serif text-sm text-[#F0EDE8]">
                    Ascone
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-sans text-[#9E9B95]">
                    Markets open
                  </span>
                </div>
              </div>

              {/* Balance */}
              <div className="mb-5">
                <p className="font-sans text-[10px] text-[#5A5855] uppercase tracking-[0.18em] mb-1.5">
                  Total Portfolio Value
                </p>
                <div className="flex items-end gap-3">
                  <p className="font-serif text-4xl text-[#F0EDE8]">$196,420</p>
                  <div className="flex items-center gap-1 mb-1.5 text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-xs font-sans font-medium">
                      +18.4%
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="mb-5">
                <div className="h-24 w-full">
                  <svg
                    viewBox="0 0 400 96"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    <defs>
                      <linearGradient
                        id="heroChartGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#C9A84C"
                          stopOpacity="0.22"
                        />
                        <stop
                          offset="100%"
                          stopColor="#C9A84C"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="0,82 40,78 80,80 120,66 160,58 200,50 240,40 280,32 320,22 360,14 400,6 400,96 0,96"
                      fill="url(#heroChartGrad)"
                    />
                    <polyline
                      points="0,82 40,78 80,80 120,66 160,58 200,50 240,40 280,32 320,22 360,14 400,6"
                      fill="none"
                      stroke="#C9A84C"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="400" cy="6" r="3.5" fill="#C9A84C" />
                    <circle
                      cx="400"
                      cy="6"
                      r="7"
                      fill="#C9A84C"
                      fillOpacity="0.15"
                    />
                  </svg>
                </div>
                <div className="flex justify-between mt-1">
                  {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
                    <span
                      key={m}
                      className="text-[10px] font-sans text-[#5A5855]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                {[
                  {
                    label: "Savings",
                    value: "$42,000",
                    change: "+8.2%",
                    up: true,
                  },
                  {
                    label: "Invested",
                    value: "$112k",
                    change: "+24.5%",
                    up: true,
                  },
                  {
                    label: "Spending",
                    value: "$3,240",
                    change: "-2.1%",
                    up: false,
                  },
                ].map(({ label, value, change, up }) => (
                  <div
                    key={label}
                    className="bg-[#0A0A0B] border border-[#2A2A2E] rounded-xl p-3"
                  >
                    <p className="font-sans text-[9px] text-[#5A5855] uppercase tracking-wider mb-1.5">
                      {label}
                    </p>
                    <p className="font-serif text-sm text-[#F0EDE8]">{value}</p>
                    <p
                      className={`font-sans text-[10px] mt-1 ${
                        up ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Transactions */}
              <div>
                <p className="font-sans text-[10px] text-[#5A5855] uppercase tracking-[0.15em] mb-3">
                  Recent Activity
                </p>
                <div className="space-y-3">
                  {[
                    {
                      name: "Apple Inc.",
                      type: "Stock purchase",
                      amount: "+$1,240",
                      color: "#C9A84C",
                    },
                    {
                      name: "Rent payment",
                      type: "Bank transfer",
                      amount: "-$850",
                      color: "#5A5855",
                    },
                    {
                      name: "Q3 Dividend",
                      type: "Investment income",
                      amount: "+$320",
                      color: "#34d399",
                    },
                  ].map(({ name, type, amount, color }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#1A1A1E] border border-[#2A2A2E] flex items-center justify-center">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                        <div>
                          <p className="font-sans text-xs text-[#F0EDE8] font-medium leading-tight">
                            {name}
                          </p>
                          <p className="font-sans text-[10px] text-[#5A5855]">
                            {type}
                          </p>
                        </div>
                      </div>
                      <span
                        className="font-sans text-xs font-semibold"
                        style={{ color }}
                      >
                        {amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating pill — currencies */}
            <div className="absolute -left-5 top-[30%] bg-[#1A1A1E] border border-[#2A2A2E] rounded-2xl px-4 py-3 shadow-xl hidden lg:block">
              <p className="font-sans text-[9px] text-[#5A5855] uppercase tracking-wider mb-1">
                Currencies
              </p>
              <p className="font-serif text-2xl text-[#F0EDE8]">56+</p>
              <p className="font-sans text-[9px] text-[#9E9B95] mt-0.5">
                Global support
              </p>
            </div>

            {/* Floating pill — users */}
            <div className="absolute -right-4 -bottom-5 bg-[#C9A84C] rounded-2xl px-4 py-3 shadow-xl shadow-[#C9A84C]/20 hidden lg:block">
              <p className="font-sans text-[9px] text-[#0A0A0B]/60 uppercase tracking-wider mb-1">
                Active Users
              </p>
              <p className="font-serif text-xl text-[#0A0A0B] font-medium">
                48,200+
              </p>
              <div className="flex -space-x-1.5 mt-2">
                {["#9E8240", "#6B5A2E", "#3D3420"].map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border-2 border-[#C9A84C]"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-20 pt-10 border-t border-[#1A1A1E]">
          <p className="text-xs text-[#5A5855] font-sans uppercase tracking-[0.22em] mb-7 text-center">
            Trusted by forward-thinking teams
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {trustLogos.map((name) => (
              <span
                key={name}
                className="font-sans font-medium text-[#3A3A3E] hover:text-[#9E9B95] text-base transition-colors duration-200 cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
