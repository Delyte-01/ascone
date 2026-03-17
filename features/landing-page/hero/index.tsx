"use client";

import { useRef} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Star, ArrowUpRight, TrendingUp, Shield, Zap } from "lucide-react";

const trustLogos = ["Loom", "HubSpot", "OpenAI", "Raycast", "Zenefits"];

// Helper: animates a number counting up
function animateCount(el: HTMLElement, target: number, duration: number) {
  let start = 0;
  const step = target / (duration * 60);
  const tick = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString();
    if (start < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const balCountRef = useRef<HTMLSpanElement>(null);
  const userCountRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // ── Set initial states ──────────────────────────────────────────────
      gsap.set(".badge", { y: 40, opacity: 0 });
      gsap.set(".headline .line span", { y: "100%", opacity: 0 });
      gsap.set(".subtitle", { y: 30, opacity: 0 });
      gsap.set(".cta-group", { y: 28, opacity: 0 });
      gsap.set(".stars-row, .pills", { y: 22, opacity: 0 });
      gsap.set(".dashboard-card", { y: 100, scale: 0.94, opacity: 0 });
      gsap.set(".app-bar", { y: -20, opacity: 0 });
      gsap.set(".balance-value", { y: 50, opacity: 0 });
      gsap.set(".stats-card", { y: 30, opacity: 0 });
      gsap.set(".transaction-item", { x: -25, opacity: 0 });
      gsap.set(".floating-pill", { scale: 0.7, y: 20, opacity: 0 });
      gsap.set(".trust-bar", { y: 40, opacity: 0 });
      gsap.set(".trust-logos span", { y: 18, opacity: 0 });
      gsap.set(".glow", { opacity: 0 });
      gsap.set(".chart-line", { strokeDasharray: 600, strokeDashoffset: 600 });
      gsap.set(".chart-area", { opacity: 0 });
      gsap.set(".chart-circle", { opacity: 0 });
      gsap.set(".chart-pulse", { opacity: 0 });

      // ── Master timeline ──────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Glows bloom
      tl.to(".glow-left", { opacity: 1, duration: 2.5, ease: "power2.out" }, 0)
        .to(".glow-right", { opacity: 1, duration: 2, ease: "power2.out" }, 0.3)
        .to(".glow-mid", { opacity: 1, duration: 2, ease: "power2.out" }, 0.5);

      // 2. Badge
      tl.to(
        ".badge",
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0.4
      );

      // 3. Headline — clip-reveal per line
      tl.to(
        ".headline .line:nth-child(1) span",
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
        },
        0.55
      )
        .to(
          ".headline .line:nth-child(2) span",
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
          },
          0.68
        )
        .to(
          ".headline .line:nth-child(3) span",
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
          },
          0.81
        );

      // 4. Subtitle
      tl.to(".subtitle", { opacity: 1, y: 0, duration: 1.1 }, 1.0);

      // 5. CTAs
      tl.to(".cta-group", { opacity: 1, y: 0, duration: 1 }, 1.15);

      // 6. Stars + pills
      tl.to(".stars-row", { opacity: 1, y: 0, duration: 0.9 }, 1.25).to(
        ".pills",
        { opacity: 1, y: 0, duration: 0.9 },
        1.35
      );

      // 7. Dashboard card
      tl.to(
        ".dashboard-card",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          ease: "power4.out",
        },
        0.7
      );

      // 8. App bar
      tl.to(".app-bar", { opacity: 1, y: 0, duration: 0.8 }, 1.1);

      // 9. Balance — count up on enter
      tl.to(
        ".balance-value",
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          onStart: () => {
            if (balCountRef.current)
              animateCount(balCountRef.current, 196420, 1.5);
          },
        },
        1.25
      );

      // User count in badge
      tl.call(
        () => {
          if (userCountRef.current)
            animateCount(userCountRef.current, 48000, 1.2);
        },
        undefined,
        0.8
      );

      // 10. Chart line draw
      tl.to(
        ".chart-line",
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power3.inOut",
        },
        1.4
      );
      tl.to(".chart-area", { opacity: 1, duration: 0.8 }, 1.8);
      tl.to(
        ".chart-circle",
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" },
        2.4
      ).to(".chart-pulse", { opacity: 1, duration: 0.5 }, 2.5);

      // Pulsing dot at chart tip
      gsap.to(".chart-pulse", {
        scale: 2.2,
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        repeat: -1,
        delay: 2.8,
      });

      // 11. Stats cards
      tl.to(
        ".stats-card",
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
        1.7
      );

      // 12. Transaction items
      tl.to(
        ".transaction-item",
        { opacity: 1, x: 0, duration: 0.9, stagger: 0.13 },
        1.9
      );

      // 13. Floating pills bounce
      tl.to(
        ".floating-pill",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.2,
          ease: "back.out(1.6)",
        },
        2.2
      );

      // 14. Trust bar + logos
      tl.to(".trust-bar", { opacity: 1, y: 0, duration: 1.1 }, 2.3);
      tl.to(
        ".trust-logos span",
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 },
        2.5
      );

      // ── Idle / ambient animations (start after intro) ───────────────────

      // Glows breathe
      gsap.to(".glow-left", {
        scale: 1.08,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3,
      });
      gsap.to(".glow-right", {
        scale: 1.12,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3.5,
      });

      // Dashboard subtle float
      gsap.to(".dashboard-card", {
        y: -6,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3,
      });

      // Floating pills float independently
      gsap.to(".floating-pill:first-child", {
        y: "-=8",
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3.2,
      });
      gsap.to(".floating-pill:last-child", {
        y: "-=6",
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3.5,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full min-h-screen bg-[#08080A] relative overflow-hidden flex items-center"
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Glows */}
      <div
        className="glow glow-left absolute -top-52 -left-52 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="glow glow-right absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="glow glow-mid absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 xl:gap-20 items-center">
          {/* LEFT — Copy */}
          <div className="space-y-7 max-w-xl">
            {/* Badge */}
            <div className="badge inline-flex items-center gap-2.5 border border-[#C9A84C]/30 rounded-full px-4 py-2 bg-[#C9A84C]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="text-xs font-sans font-medium text-[#C9A84C] tracking-[0.18em] uppercase">
                Now Live — Join <span ref={userCountRef}>0</span>+ users
              </p>
            </div>

            {/* Headline — clip reveal */}
            <h1
              className="headline font-serif text-[3rem] md:text-[3.8rem] lg:text-[4.4rem] leading-[1.02] text-[#F0EDE8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="line block overflow-hidden">
                <span className="block">The smarter way</span>
              </span>
              <span className="line block overflow-hidden">
                <span className="block">to command your</span>
              </span>
              <span className="line block overflow-hidden">
                <span className="block italic text-[#C9A84C]">wealth.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="subtitle text-[#9E9B95] text-lg leading-[1.8] font-sans font-light max-w-[380px]">
              From daily spending to long-term investing — Ascone unifies every
              financial decision in one intelligent, secure platform.
            </p>

            {/* CTAs */}
            <div className="cta-group flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button className="bg-[#C9A84C] hover:bg-[#E8C97A] text-[#08080A] font-sans font-semibold rounded-full px-8 py-6 text-base transition-all duration-300 shadow-[0_0_40px_#C9A84C28] hover:shadow-[0_0_60px_#C9A84C45]">
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
            <div className="stars-row flex items-center gap-3">
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
            <div className="pills flex flex-wrap gap-2">
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
            <div
              className="dashboard-card bg-[#111113] border border-[#202024] rounded-3xl p-5 shadow-2xl"
              style={{
                boxShadow:
                  "0 40px 120px rgba(0,0,0,.7), 0 0 0 0.5px rgba(201,168,76,.06)",
              }}
            >
              {/* App bar */}
              <div className="app-bar flex items-center justify-between mb-5 pb-4 border-b border-[#1A1A1E]">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-[#C9A84C] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 12L7 2L12 12"
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
                  <span
                    className="font-serif text-sm text-[#F0EDE8]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
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
                  <p
                    className="balance-value font-serif text-4xl text-[#F0EDE8]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    $<span ref={balCountRef}>0</span>
                  </p>
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
                <div className="relative overflow-hidden">
                  <svg
                    viewBox="0 0 400 88"
                    preserveAspectRatio="none"
                    className="w-full h-24"
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
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#C9A84C"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <polygon
                      className="chart-area"
                      points="0,78 40,74 80,76 120,62 160,54 200,46 240,36 280,28 320,18 360,10 400,2 400,88 0,88"
                      fill="url(#heroChartGrad)"
                    />
                    <polyline
                      className="chart-line"
                      points="0,78 40,74 80,76 120,62 160,54 200,46 240,36 280,28 320,18 360,10 400,2"
                      fill="none"
                      stroke="#C9A84C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      className="chart-circle"
                      cx="400"
                      cy="2"
                      r="3.5"
                      fill="#C9A84C"
                    />
                    <circle
                      className="chart-pulse"
                      cx="400"
                      cy="2"
                      r="7"
                      fill="#C9A84C"
                      fillOpacity="0.15"
                    />
                  </svg>
                  {/* Shimmer sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(201,168,76,0.08), transparent)",
                      animation: "shimmer 3s ease-in-out infinite",
                    }}
                  />
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
                    value: "$42k",
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
                    value: "$3.2k",
                    change: "-2.1%",
                    up: false,
                  },
                ].map(({ label, value, change, up }) => (
                  <div
                    key={label}
                    className="stats-card bg-[#0A0A0B] border border-[#202024] rounded-xl p-3"
                  >
                    <p className="font-sans text-[9px] text-[#5A5855] uppercase tracking-wider mb-1.5">
                      {label}
                    </p>
                    <p
                      className="font-serif text-sm text-[#F0EDE8]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {value}
                    </p>
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
                      color: "#f87171",
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
                      className="transaction-item flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#1A1A1E] border border-[#252528] flex items-center justify-center">
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
            <div className="floating-pill absolute -left-7 top-[30%] bg-[#1A1A1E] border border-[#252528] rounded-2xl px-4 py-3 shadow-xl hidden lg:block">
              <p className="font-sans text-[9px] text-[#5A5855] uppercase tracking-wider mb-1">
                Currencies
              </p>
              <p
                className="font-serif text-2xl text-[#F0EDE8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                56+
              </p>
              <p className="font-sans text-[9px] text-[#9E9B95] mt-0.5">
                Global support
              </p>
            </div>

            {/* Floating pill — users */}
            <div className="floating-pill absolute -right-5 -bottom-5 bg-[#C9A84C] rounded-2xl px-4 py-3 shadow-xl shadow-[#C9A84C]/20 hidden lg:block">
              <p className="font-sans text-[9px] text-[#0A0A0B]/60 uppercase tracking-wider mb-1">
                Active Users
              </p>
              <p
                className="font-serif text-xl text-[#0A0A0B] font-medium"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
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
        <div className="trust-bar mt-20 pt-10 border-t border-[#181818]">
          <p className="text-xs text-[#3A3A3E] font-sans uppercase tracking-[0.22em] mb-7 text-center">
            Trusted by forward-thinking teams
          </p>
          <div className="trust-logos flex flex-wrap justify-center gap-x-10 gap-y-4">
            {trustLogos.map((name) => (
              <span
                key={name}
                className="font-sans font-medium text-[#2E2E32] hover:text-[#9E9B95] text-base transition-colors duration-300 cursor-default select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Chart shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </section>
  );
}
