"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";
import { Star, ArrowUpRight, TrendingUp, Shield, Zap } from "lucide-react";

gsap.registerPlugin(DrawSVGPlugin, SplitText);

const trustLogos = ["Loom", "HubSpot", "OpenAI", "Raycast", "Zenefits"];

const statsData = [
  { label: "Savings", value: "$42k", change: "+8.2%", up: true },
  { label: "Invested", value: "$112k", change: "+24.5%", up: true },
  { label: "Spending", value: "$3.2k", change: "-2.1%", up: false },
];

const transactions = [
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
];

const pills = [
  { icon: <Shield className="w-3 h-3" />, label: "Bank-grade security" },
  { icon: <Zap className="w-3 h-3" />, label: "Instant transfers" },
  { icon: <TrendingUp className="w-3 h-3" />, label: "Smart investments" },
];

export function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const balRef = useRef<HTMLSpanElement>(null);
  const userRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      // ── INITIAL STATES ─────────────────────────────────────────────────
      gsap.set(".glow-left", { opacity: 0, scale: 0.75 });
      gsap.set(".glow-right", { opacity: 0, scale: 0.8 });
      gsap.set(".glow-mid", { opacity: 0 });

      gsap.set(".hero-badge", { opacity: 0, y: 36, filter: "blur(6px)" });
      gsap.set(".hero-eyebrow", {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left",
      });

      gsap.set(".subtitle", { opacity: 0, y: 28, filter: "blur(4px)" });
      gsap.set(".cta-primary", { opacity: 0, y: 24, scale: 0.94 });
      gsap.set(".cta-ghost", { opacity: 0, x: -16 });
      gsap.set(".stars-row", { opacity: 0, y: 16 });
      gsap.set(".pill-item", { opacity: 0, y: 14, scale: 0.88 });

      gsap.set(".dashboard-card", {
        opacity: 0,
        y: 110,
        rotateX: 10,
        rotateY: -4,
        transformPerspective: 1200,
      });
      gsap.set(".app-bar", { opacity: 0, y: -24 });
      gsap.set(".balance-row", { opacity: 0, y: 44 });
      gsap.set(".chart-line", { drawSVG: "0%" });
      gsap.set(".chart-fill", { opacity: 0 });
      gsap.set(".chart-tip-dot", { scale: 0, opacity: 0 });
      gsap.set(".chart-tip-ring", { scale: 0, opacity: 0 });
      gsap.set(".stats-card", { opacity: 0, y: 32, scale: 0.92 });
      gsap.set(".tx-item", { opacity: 0, x: -28 });
      gsap.set(".floating-pill", { opacity: 0, scale: 0.65, y: 18 });
      gsap.set(".trust-bar", { opacity: 0, y: 36 });
      gsap.set(".trust-logo-item", { opacity: 0, y: 16 });
      gsap.set(".corner-line-h", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".corner-line-v", { scaleY: 0, transformOrigin: "top" });

      // ── SPLIT TEXT ─────────────────────────────────────────────────────
      let split: SplitText | null = null;
      const h1 =
        container.current?.querySelector<HTMLElement>(".hero-headline");
      if (h1) {
        split = new SplitText(h1, { type: "chars,words" });
        gsap.set(split.chars, {
          opacity: 0,
          yPercent: 105,
          rotateX: -30,
          transformPerspective: 600,
        });
      }

      // ── MAIN ANIMATION — fires once loaderDone dispatched ─────────────
      const runAnimation = () => {
        // Small rAF to let React settle any pending renders
        requestAnimationFrame(() => {
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

          // ── Atmosphere ─────────────────────────────────────────────────
          tl.to(
            ".glow-left",
            { opacity: 1, scale: 1, duration: 2.6, ease: "power2.out" },
            0
          );
          tl.to(
            ".glow-right",
            { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" },
            0.25
          );
          tl.to(
            ".glow-mid",
            { opacity: 1, duration: 2.0, ease: "power2.out" },
            0.45
          );

          // ── Eyebrow rule draws left→right ──────────────────────────────
          tl.to(
            ".hero-eyebrow",
            { scaleX: 1, opacity: 1, duration: 0.7, ease: "power3.inOut" },
            0.15
          );

          // ── Badge blurs in ─────────────────────────────────────────────
          tl.to(
            ".hero-badge",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.88,
              ease: "power3.out",
            },
            0.28
          );

          // Badge user count-up
          if (userRef.current) {
            const el = userRef.current;
            const obj = { v: 0 };
            tl.to(
              obj,
              {
                v: 48000,
                duration: 1.15,
                ease: "power2.out",
                onUpdate() {
                  el.textContent = Math.floor(obj.v).toLocaleString();
                },
              },
              0.42
            );
          }

          // ── Headline — char-by-char 3D fold in ────────────────────────
          if (split?.chars.length) {
            tl.to(
              split.chars,
              {
                opacity: 1,
                yPercent: 0,
                rotateX: 0,
                duration: 1.05,
                stagger: 0.018,
                ease: "power4.out",
              },
              0.36
            );
          }

          // ── Subtitle blurs in ──────────────────────────────────────────
          tl.to(
            ".subtitle",
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "power3.out",
            },
            0.88
          );

          // ── CTAs ───────────────────────────────────────────────────────
          tl.to(
            ".cta-primary",
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.88,
              ease: "back.out(1.6)",
            },
            1.02
          );
          tl.to(".cta-ghost", { opacity: 1, x: 0, duration: 0.78 }, 1.14);

          // ── Stars + pills ──────────────────────────────────────────────
          tl.to(".stars-row", { opacity: 1, y: 0, duration: 0.78 }, 1.22);
          tl.to(
            ".pill-item",
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.07,
              ease: "back.out(2)",
            },
            1.32
          );

          // ── CTA magnetic hover ─────────────────────────────────────────
          const btn =
            container.current?.querySelector<HTMLElement>(".cta-primary");
          if (btn) {
            btn.addEventListener("mousemove", (e) => {
              const r = btn.getBoundingClientRect();
              gsap.to(btn, {
                x: (e.clientX - r.left - r.width / 2) * 0.22,
                y: (e.clientY - r.top - r.height / 2) * 0.22,
                duration: 0.4,
                ease: "power2.out",
              });
            });
            btn.addEventListener("mouseleave", () => {
              gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1,0.45)",
              });
            });
          }

          // ── Dashboard — 3D entrance ─────────────────────────────────────
          tl.to(
            ".dashboard-card",
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              duration: 1.72,
            },
            0.52
          );

          // ── App bar ─────────────────────────────────────────────────────
          tl.to(".app-bar", { opacity: 1, y: 0, duration: 0.85 }, 0.88);

          // ── Balance — count up ──────────────────────────────────────────
          tl.to(
            ".balance-row",
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              onStart() {
                if (!balRef.current) return;
                const el = balRef.current;
                const obj = { v: 0 };
                gsap.to(obj, {
                  v: 196420,
                  duration: 1.55,
                  ease: "power2.out",
                  onUpdate() {
                    el.textContent = Math.floor(obj.v).toLocaleString();
                  },
                });
              },
            },
            1.02
          );

          // ── Chart — DrawSVG line draw ───────────────────────────────────
          tl.to(
            ".chart-line",
            {
              drawSVG: "100%",
              duration: 1.95,
              ease: "power3.inOut",
            },
            1.28
          );

          // Chart fill fades in behind the line
          tl.to(
            ".chart-fill",
            { opacity: 1, duration: 0.85, ease: "power2.out" },
            1.5
          );

          // Tip dot + ring pop
          tl.to(
            ".chart-tip-dot",
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(3)" },
            3.05
          );
          tl.to(
            ".chart-tip-ring",
            { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
            3.15
          );

          // Pulsing ring repeats forever
          gsap.to(".chart-tip-ring", {
            scale: 2.7,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            repeat: -1,
            delay: 3.5,
          });

          // ── Stats cards — staggered bounce ─────────────────────────────
          tl.to(
            ".stats-card",
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.6)",
            },
            1.55
          );

          // Stats card hover
          container.current
            ?.querySelectorAll<HTMLElement>(".stats-card")
            .forEach((card) => {
              card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                  y: -4,
                  scale: 1.03,
                  borderColor: "rgba(201,168,76,0.35)",
                  duration: 0.3,
                  ease: "power2.out",
                });
              });
              card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                  y: 0,
                  scale: 1,
                  borderColor: "rgba(32,32,36,1)",
                  duration: 0.4,
                  ease: "power2.out",
                });
              });
            });

          // ── Transaction items sweep in ─────────────────────────────────
          tl.to(
            ".tx-item",
            {
              opacity: 1,
              x: 0,
              duration: 0.88,
              stagger: 0.12,
              ease: "power3.out",
            },
            1.78
          );

          // Tx hover nudge
          container.current
            ?.querySelectorAll<HTMLElement>(".tx-item")
            .forEach((row) => {
              row.addEventListener("mouseenter", () =>
                gsap.to(row, { x: 5, duration: 0.25, ease: "power2.out" })
              );
              row.addEventListener("mouseleave", () =>
                gsap.to(row, { x: 0, duration: 0.35, ease: "power2.out" })
              );
            });

          // ── Corner accent lines draw ────────────────────────────────────
          tl.to(
            ".corner-line-h",
            { scaleX: 1, duration: 0.65, stagger: 0.16, ease: "power3.inOut" },
            2.05
          );
          tl.to(
            ".corner-line-v",
            { scaleY: 1, duration: 0.65, stagger: 0.16, ease: "power3.inOut" },
            2.12
          );

          // ── Floating pills bounce in ────────────────────────────────────
          tl.to(
            ".floating-pill",
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.12,
              stagger: 0.22,
              ease: "back.out(1.9)",
            },
            2.15
          );

          // ── Trust bar ──────────────────────────────────────────────────
          tl.to(".trust-bar", { opacity: 1, y: 0, duration: 1.0 }, 2.5);
          tl.to(
            ".trust-logo-item",
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 },
            2.68
          );

          // ── AMBIENT IDLE LOOPS ─────────────────────────────────────────
          // Glows breathe at different rates (parallax feel)
          gsap.to(".glow-left", {
            scale: 1.1,
            duration: 5.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 3.2,
          });
          gsap.to(".glow-right", {
            scale: 1.14,
            duration: 7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 4,
          });
          gsap.to(".glow-mid", {
            scale: 1.08,
            duration: 6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 3.6,
          });

          // Dashboard floats
          gsap.to(".dashboard-card", {
            y: -7,
            duration: 5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 3,
          });

          // Pills float independently at different rates
          gsap.to(".floating-pill:first-of-type", {
            y: "-=10",
            duration: 3.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 3.5,
          });
          gsap.to(".floating-pill:last-of-type", {
            y: "-=7",
            duration: 4.1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 3.9,
          });

          // Trust ticker scrolls infinitely
          gsap.to(".trust-ticker", {
            x: "-50%",
            duration: 22,
            ease: "none",
            repeat: -1,
          });
        });
      };

      // ── Listen for loader completion event ─────────────────────────────
      window.addEventListener("loaderDone", runAnimation, { once: true });

      return () => {
        window.removeEventListener("loaderDone", runAnimation);
        split?.revert();
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="w-full min-h-screen bg-[#08080A] relative overflow-hidden flex items-center"
    >
      {/* ── Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.038) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.038) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 50%,black 25%,transparent 100%)",
        }}
        aria-hidden
      />

      {/* ── Glows ── */}
      <div
        className="glow-left absolute -top-56 -left-56 w-[760px] h-[760px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(201,168,76,0.13) 0%,transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="glow-right absolute -bottom-44 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="glow-mid absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[640px] h-[440px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse,rgba(201,168,76,0.055) 0%,transparent 65%)",
        }}
        aria-hidden
      />

      {/* ── Diagonal accent lines ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      >
        <line
          x1="0"
          y1="100%"
          x2="22%"
          y2="0"
          stroke="rgba(201,168,76,0.03)"
          strokeWidth="1"
        />
        <line
          x1="100%"
          y1="0"
          x2="78%"
          y2="100%"
          stroke="rgba(201,168,76,0.025)"
          strokeWidth="1"
        />
      </svg>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 xl:gap-20 items-center">
          {/* LEFT — Copy */}
          <div className="space-y-7 max-w-xl">
            {/* Eyebrow rule */}
            <div
              className="hero-eyebrow h-px w-16"
              style={{
                background:
                  "linear-gradient(to right,#C9A84C,rgba(201,168,76,0.2))",
              }}
            />

            {/* Badge */}
            <div
              className="hero-badge inline-flex items-center gap-2.5 border border-[#C9A84C]/30 rounded-full px-4 py-2 bg-[#C9A84C]/5"
              style={{
                boxShadow:
                  "0 0 24px rgba(201,168,76,0.06),inset 0 1px 0 rgba(201,168,76,0.08)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="text-xs font-sans font-medium text-[#C9A84C] tracking-[0.18em] uppercase">
                Now Live — Join <span ref={userRef}>0</span>+ users
              </p>
            </div>

            {/* Headline — SplitText per-char */}
            <h1
              className="hero-headline font-serif text-[3rem] md:text-[3.8rem] lg:text-[4.4rem] leading-[1.02] text-[#F0EDE8]"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                overflow: "hidden",
              }}
            >
              The smarter way
              <br />
              to command your
              <br />
              <span className="italic text-[#C9A84C]">wealth.</span>
            </h1>

            {/* Subtitle */}
            <p className="subtitle text-[#9E9B95] text-lg leading-[1.82] font-sans font-light max-w-[380px]">
              From daily spending to long-term investing — Ascone unifies every
              financial decision in one intelligent, secure platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                className="cta-primary bg-[#C9A84C] hover:bg-[#E8C97A] text-[#08080A] font-sans font-semibold rounded-full px-8 py-6 text-base transition-colors duration-300"
                style={{
                  boxShadow:
                    "0 0 40px rgba(201,168,76,0.28),inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                Start Free Today
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
              <button className="cta-ghost flex items-center gap-2.5 text-[#9E9B95] hover:text-[#F0EDE8] font-sans text-sm transition-colors duration-200 group">
                <span className="w-9 h-9 rounded-full border border-[#2A2A2E] flex items-center justify-center group-hover:border-[#C9A84C]/40 transition-colors duration-200">
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

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {pills.map(({ icon, label }) => (
                <span
                  key={label}
                  className="pill-item inline-flex items-center gap-1.5 text-xs font-sans text-[#9E9B95] border border-[#2A2A2E] rounded-full px-3 py-1.5 bg-[#111113] hover:border-[#C9A84C]/30 hover:text-[#F0EDE8] transition-all duration-200 cursor-default"
                >
                  <span className="text-[#C9A84C]">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Dashboard */}
          <div className="relative">
            {/* Corner accent lines */}
            <div
              className="absolute -top-3 -left-3 hidden lg:block"
              aria-hidden
            >
              <div className="corner-line-h h-px w-8 bg-[#C9A84C]/40 mb-1" />
              <div className="corner-line-v w-px h-8 bg-[#C9A84C]/40 ml-0" />
            </div>
            <div
              className="absolute -bottom-3 -right-3 rotate-180 hidden lg:block"
              aria-hidden
            >
              <div className="corner-line-h h-px w-8 bg-[#C9A84C]/40 mb-1" />
              <div className="corner-line-v w-px h-8 bg-[#C9A84C]/40" />
            </div>

            <div
              className="dashboard-card bg-[#111113] border border-[#202024] rounded-3xl p-5 shadow-2xl"
              style={{
                boxShadow:
                  "0 50px 130px rgba(0,0,0,0.75),0 0 0 0.5px rgba(201,168,76,0.07),inset 0 1px 0 rgba(255,255,255,0.02)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Inner gradient */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(201,168,76,0.04) 0%,transparent 50%)",
                }}
              />

              {/* App bar */}
              <div className="app-bar flex items-center justify-between mb-5 pb-4 border-b border-[#1A1A1E]">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-md bg-[#C9A84C] flex items-center justify-center"
                    style={{ boxShadow: "0 0 12px rgba(201,168,76,0.4)" }}
                  >
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
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                  >
                    Ascone
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }}
                  />
                  <span className="text-xs font-sans text-[#9E9B95]">
                    Markets open
                  </span>
                </div>
              </div>

              {/* Balance */}
              <div className="balance-row mb-5">
                <p className="font-sans text-[10px] text-[#5A5855] uppercase tracking-[0.18em] mb-1.5">
                  Total Portfolio Value
                </p>
                <div className="flex items-end gap-3">
                  <p
                    className="font-serif text-4xl text-[#F0EDE8]"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                  >
                    $<span ref={balRef}>0</span>
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
                <div className="relative overflow-hidden rounded-xl">
                  <svg
                    viewBox="0 0 400 88"
                    preserveAspectRatio="none"
                    className="w-full h-24"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradHero"
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
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(201,168,76,0.4)" />
                        <stop offset="100%" stopColor="#C9A84C" />
                      </linearGradient>
                    </defs>
                    <polygon
                      className="chart-fill"
                      points="0,78 40,74 80,76 120,62 160,54 200,46 240,36 280,28 320,18 360,10 400,2 400,88 0,88"
                      fill="url(#chartGradHero)"
                    />
                    <polyline
                      className="chart-line"
                      points="0,78 40,74 80,76 120,62 160,54 200,46 240,36 280,28 320,18 360,10 400,2"
                      fill="none"
                      stroke="url(#lineGrad)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      className="chart-tip-dot"
                      cx="400"
                      cy="2"
                      r="3.5"
                      fill="#C9A84C"
                    />
                    <circle
                      className="chart-tip-ring"
                      cx="400"
                      cy="2"
                      r="7"
                      fill="#C9A84C"
                      fillOpacity="0.18"
                    />
                  </svg>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent,rgba(201,168,76,0.07),transparent)",
                      animation: "heroShimmer 3s ease-in-out infinite",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
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
                {statsData.map(({ label, value, change, up }) => (
                  <div
                    key={label}
                    className="stats-card bg-[#0A0A0B] border border-[#202024] rounded-xl p-3 cursor-default"
                    style={{ transition: "none" }}
                  >
                    <p className="font-sans text-[9px] text-[#5A5855] uppercase tracking-wider mb-1.5">
                      {label}
                    </p>
                    <p
                      className="font-serif text-sm text-[#F0EDE8]"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
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
                  {transactions.map(({ name, type, amount, color }) => (
                    <div
                      key={name}
                      className="tx-item flex items-center justify-between cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full bg-[#1A1A1E] border border-[#252528] flex items-center justify-center"
                          style={{ boxShadow: `0 0 8px ${color}18` }}
                        >
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
            <div
              className="floating-pill absolute -left-7 top-[28%] bg-[#1A1A1E] border border-[#252528] rounded-2xl px-4 py-3 shadow-xl hidden lg:block"
              style={{
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
            >
              <p className="font-sans text-[9px] text-[#5A5855] uppercase tracking-wider mb-1">
                Currencies
              </p>
              <p
                className="font-serif text-2xl text-[#F0EDE8]"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
              >
                56+
              </p>
              <p className="font-sans text-[9px] text-[#9E9B95] mt-0.5">
                Global support
              </p>
            </div>

            {/* Floating pill — users */}
            <div
              className="floating-pill absolute -right-5 -bottom-5 bg-[#C9A84C] rounded-2xl px-4 py-3 hidden lg:block"
              style={{
                boxShadow:
                  "0 20px 50px rgba(201,168,76,0.3),inset 0 1px 0 rgba(255,255,255,0.18)",
              }}
            >
              <p className="font-sans text-[9px] text-[#0A0A0B]/60 uppercase tracking-wider mb-1">
                Active Users
              </p>
              <p
                className="font-serif text-xl text-[#0A0A0B] font-medium"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
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

        {/* Trust bar — infinite ticker */}
        <div className="trust-bar mt-20 pt-10 border-t border-[#181818] overflow-hidden">
          <p className="text-xs text-[#3A3A3E] font-sans uppercase tracking-[0.22em] mb-7 text-center">
            Trusted by forward-thinking teams
          </p>
          <div
            className="trust-ticker flex gap-16 whitespace-nowrap"
            style={{ width: "200%" }}
          >
            {[...Array(2)].map((_, rep) => (
              <div key={rep} className="flex gap-16">
                {trustLogos.map((name) => (
                  <span
                    key={name}
                    className="trust-logo-item font-sans font-medium text-[#2E2E32] hover:text-[#9E9B95] text-base transition-colors duration-300 cursor-default select-none"
                  >
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(420%);  }
        }
      `}</style>
    </section>
  );
}
