"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const metrics = [
  {
    value: "$14B",
    raw: 14,
    prefix: "$",
    suffix: "B",
    label: "Funds & syndicated capital",
    sub: "Under management",
    pct: 92,
    trend: "+34% YoY",
  },
  {
    value: "23k+",
    raw: 23,
    prefix: "",
    suffix: "k+",
    label: "Active startups funded",
    sub: "Via our platform",
    pct: 78,
    trend: "+18% YoY",
  },
  {
    value: "180+",
    raw: 180,
    prefix: "",
    suffix: "+",
    label: "Countries supported",
    sub: "Global reach",
    pct: 94,
    trend: "Expanding",
  },
  {
    value: "99.98%",
    raw: 99.98,
    prefix: "",
    suffix: "%",
    label: "Platform uptime",
    sub: "Last 12 months",
    pct: 99,
    trend: "SLA guaranteed",
  },
];

const miniChart = [28, 42, 35, 58, 52, 71, 65, 84, 78, 92, 88, 100];
const barData = [38, 52, 46, 68, 60, 78, 72, 94];
const tags = [
  "Fintech",
  "SaaS",
  "HealthTech",
  "DeepTech",
  "CleanEnergy",
  "Web3",
];

const chartPoints = miniChart
  .map((v, i) => `${(i / (miniChart.length - 1)) * 320},${80 - (v / 100) * 68}`)
  .join(" ");
const areaPoints = `0,${
  80 - (miniChart[0] / 100) * 68
} ${chartPoints} 320,80 0,80`;
const lastY = 80 - (miniChart[miniChart.length - 1] / 100) * 68;

export function NumbersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Always-on ambient ────────────────────────────────────────────────
      gsap.to(".gold-orb-1", {
        scale: 1.14,
        opacity: 0.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".gold-orb-2", {
        scale: 1.1,
        opacity: 0.1,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
      gsap.to(".grid-lines", {
        opacity: 0.042,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.utils.toArray<HTMLElement>(".num-particle").forEach((p, i) => {
        gsap.set(p, { opacity: gsap.utils.random(0.1, 0.35) });
        gsap.to(p, {
          y: gsap.utils.random(-22, -40),
          x: gsap.utils.random(-12, 12),
          duration: gsap.utils.random(4, 9),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.55,
        });
      });
      gsap.to(".ticker-inner", {
        x: "-50%",
        duration: 26,
        ease: "none",
        repeat: -1,
      });

      const mm = gsap.matchMedia();

      // ════════════════════════════════════════════════════════════════════
      // DESKTOP ≥ 768px
      // ════════════════════════════════════════════════════════════════════
      mm.add("(min-width: 768px)", () => {
        // Set initial states
        gsap.set(".badge-wrap", { y: 70, opacity: 0 });
        gsap.set(".section-title", { y: 110, opacity: 0, skewY: 3 });
        gsap.set(".section-desc", { y: 80, opacity: 0 });
        gsap.set(".hero-stat", {
          y: 200,
          opacity: 0,
          rotateX: 12,
          transformPerspective: 900,
        });
        gsap.set(".startups-card", {
          x: -160,
          opacity: 0,
          rotateY: -10,
          transformPerspective: 1000,
        });
        gsap.set(".metrics-table", {
          y: 180,
          opacity: 0,
          rotateX: 8,
          transformPerspective: 900,
        });
        gsap.set(".small-stat-card", { y: 110, opacity: 0, scale: 0.9 });
        gsap.set(".quote-card", { y: 130, opacity: 0, scale: 0.95 });
        gsap.set(".ticker-bar", { y: 60, opacity: 0 });
        gsap.set(".chart-area", { opacity: 0 });
        gsap.set(".mini-chart-dot", { scale: 0, opacity: 0 });
        gsap.set(".bar-viz > div", {
          scaleY: 0,
          opacity: 0,
          transformOrigin: "bottom center",
        });
        gsap.set(".tag-item", { scale: 0.65, opacity: 0 });
        gsap.set(".metrics-row", { x: 50, opacity: 0 });
        gsap.set(
          ".progress-fill-1,.progress-fill-2,.progress-fill-3,.progress-fill-4",
          { width: "0%" }
        );
        gsap.set(".ring-fill", { strokeDashoffset: Math.PI * 32 });

        const balEl = document.querySelector<HTMLElement>(".giant-number-val");
        const startupsEl = document.querySelector<HTMLElement>(".startups-val");
        if (balEl) balEl.textContent = "$0.0B";
        if (startupsEl) startupsEl.textContent = "0k+";

        // Pin
        const pin = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Scrub timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=240%",
            scrub: 1,
          },
        });

        // Parallax bg
        tl.to(".gold-orb-1", { y: -170, x: 65, ease: "none" }, 0);
        tl.to(".gold-orb-2", { y: 130, x: -80, ease: "none" }, 0);
        tl.to(".grid-lines", { y: -90, ease: "none" }, 0);
        tl.to(".particle-layer-1", { y: -210, ease: "none" }, 0);
        tl.to(".particle-layer-2", { y: -130, ease: "none" }, 0);
        tl.to(".particle-layer-3", { y: -290, ease: "none" }, 0);

        // Header
        tl.to(".badge-wrap", { y: 0, opacity: 1, duration: 0.2 }, 0);
        tl.to(
          ".section-title",
          { y: 0, opacity: 1, skewY: 0, duration: 0.28 },
          0.05
        );
        tl.to(".section-desc", { y: 0, opacity: 1, duration: 0.24 }, 0.1);

        // Hero card
        tl.to(
          ".hero-stat",
          { y: 0, opacity: 1, rotateX: 0, duration: 0.3 },
          0.14
        );

        if (balEl) {
          const p = { v: 0 };
          tl.to(
            p,
            {
              v: 14,
              duration: 0.3,
              ease: "power2.out",
              onUpdate() {
                balEl.textContent = "$" + p.v.toFixed(1) + "B";
              },
            },
            0.22
          );
        }

        tl.fromTo(
          ".mini-chart-line",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 0.36, ease: "power2.inOut" },
          0.36
        );
        tl.to(".chart-area", { opacity: 1, duration: 0.2 }, 0.4);
        tl.to(
          ".mini-chart-dot",
          { scale: 1, opacity: 1, duration: 0.1, ease: "back.out(2)" },
          0.7
        );
        tl.to(".giant-number-val", { y: -28, ease: "none" }, 0.25);
        tl.to(".hero-chart-area", { y: 18, ease: "none" }, 0.25);

        tl.fromTo(
          ".progress-fill-1",
          { width: "0%" },
          { width: "92%", duration: 0.28 },
          0.44
        );
        tl.fromTo(
          ".progress-fill-2",
          { width: "0%" },
          { width: "78%", duration: 0.28 },
          0.5
        );
        tl.fromTo(
          ".progress-fill-3",
          { width: "0%" },
          { width: "94%", duration: 0.28 },
          0.56
        );
        tl.fromTo(
          ".progress-fill-4",
          { width: "0%" },
          { width: "99%", duration: 0.28 },
          0.62
        );

        // Startups card
        tl.to(
          ".startups-card",
          { x: 0, opacity: 1, rotateY: 0, duration: 0.3 },
          0.32
        );
        if (startupsEl) {
          const p2 = { v: 0 };
          tl.to(
            p2,
            {
              v: 23,
              duration: 0.26,
              ease: "power2.out",
              onUpdate() {
                startupsEl.textContent = Math.floor(p2.v) + "k+";
              },
            },
            0.4
          );
        }
        tl.to(
          ".bar-viz > div",
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.22,
            stagger: { each: 0.022, from: "start" },
          },
          0.48
        );
        tl.to(
          ".tag-item",
          {
            scale: 1,
            opacity: 1,
            duration: 0.16,
            stagger: { each: 0.035 },
            ease: "back.out(2)",
          },
          0.58
        );

        // Metrics table
        tl.to(
          ".metrics-table",
          { y: 0, opacity: 1, rotateX: 0, duration: 0.32 },
          0.26
        );
        tl.to(
          ".metrics-row",
          {
            x: 0,
            opacity: 1,
            duration: 0.26,
            stagger: { each: 0.06 },
          },
          0.44
        );

        // Small cards + ring
        tl.to(
          ".small-stat-card",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: { each: 0.1 },
            ease: "back.out(1.4)",
          },
          0.66
        );
        const ring = document.querySelector<SVGCircleElement>(".ring-fill");
        if (ring) {
          tl.to(
            ring,
            {
              strokeDashoffset: Math.PI * 32 * (1 - 0.68),
              duration: 0.28,
              ease: "power2.inOut",
            },
            0.78
          );
        }

        // Quote
        tl.to(
          ".quote-card",
          { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.3)" },
          0.86
        );

        // Column depth drift
        tl.to(".right-column", { y: -45, ease: "none" }, 0);
        tl.to(".left-column", { y: -18, ease: "none" }, 0);

        // Ticker
        tl.to(".ticker-bar", { y: 0, opacity: 1, duration: 0.2 }, 0.92);

        // Hover
        gsap.utils.toArray<HTMLElement>(".metrics-row").forEach((row) => {
          const bar = row.querySelector<HTMLElement>(".progress-fill");
          row.addEventListener("mouseenter", () => {
            gsap.to(row, {
              backgroundColor: "rgba(201,168,76,0.05)",
              duration: 0.3,
            });
            if (bar) gsap.to(bar, { filter: "brightness(1.4)", duration: 0.3 });
          });
          row.addEventListener("mouseleave", () => {
            gsap.to(row, { backgroundColor: "transparent", duration: 0.4 });
            if (bar) gsap.to(bar, { filter: "brightness(1)", duration: 0.3 });
          });
        });
        gsap.utils.toArray<HTMLElement>(".small-stat-card").forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -6,
              scale: 1.025,
              borderColor: "rgba(201,168,76,0.35)",
              duration: 0.35,
              ease: "power2.out",
            });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              borderColor: "rgba(30,30,34,1)",
              duration: 0.45,
              ease: "power2.out",
            });
          });
        });
        gsap.utils.toArray<HTMLElement>(".tag-item").forEach((tag) => {
          tag.addEventListener("mouseenter", () => {
            gsap.to(tag, {
              scale: 1.07,
              color: "#C9A84C",
              borderColor: "rgba(201,168,76,0.4)",
              duration: 0.25,
            });
          });
          tag.addEventListener("mouseleave", () => {
            gsap.to(tag, {
              scale: 1,
              color: "#9E9B95",
              borderColor: "rgba(42,42,46,1)",
              duration: 0.3,
            });
          });
        });

        return () => {
          pin.kill();
        };
      });

      // ════════════════════════════════════════════════════════════════════
      // MOBILE < 768px — individual ScrollTriggers, NO scrub, NO pin
      // ════════════════════════════════════════════════════════════════════
      mm.add("(max-width: 767.9px)", () => {
        // Clear any desktop gsap.set that might still exist
        gsap.set(
          ".badge-wrap,.section-title,.section-desc,.hero-stat,.startups-card,.metrics-table,.small-stat-card,.quote-card,.bar-viz > div,.tag-item,.metrics-row",
          { clearProps: "all" }
        );

        // Ensure counter elements start at correct initial text
        const balEl = document.querySelector<HTMLElement>(".giant-number-val");
        const startupsEl = document.querySelector<HTMLElement>(".startups-val");
        if (balEl) balEl.textContent = "$0.0B";
        if (startupsEl) startupsEl.textContent = "0k+";

        // Header
        gsap.from([".badge-wrap", ".section-title", ".section-desc"], {
          y: 40,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".numbers-content",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        // Hero stat card
        gsap.from(".hero-stat", {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hero-stat",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        // $14B counter — SEPARATE scrollTrigger with toggleActions:"play none none reset"
        if (balEl) {
          const p = { v: 0 };
          gsap.to(p, {
            v: 14,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              balEl.textContent = "$" + p.v.toFixed(1) + "B";
            },
            scrollTrigger: {
              trigger: ".hero-stat",
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          });
        }

        // Chart draw
        gsap.fromTo(
          ".mini-chart-line",
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: ".hero-stat",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.to(".chart-area", {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".hero-stat",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Progress bars — individual triggers
        [92, 78, 94, 99].forEach((pct, i) => {
          gsap.set(`.progress-fill-${i + 1}`, { width: "0%" });
          gsap.to(`.progress-fill-${i + 1}`, {
            width: `${pct}%`,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".metrics-table",
              start: "top 84%",
              toggleActions: "play none none reset",
            },
          });
        });

        // Startups card
        gsap.from(".startups-card", {
          y: 55,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".startups-card",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
        if (startupsEl) {
          const p2 = { v: 0 };
          gsap.to(p2, {
            v: 23,
            duration: 1.4,
            ease: "power2.out",
            onUpdate() {
              startupsEl.textContent = Math.floor(p2.v) + "k+";
            },
            scrollTrigger: {
              trigger: ".startups-card",
              start: "top 84%",
              toggleActions: "play none none reset",
            },
          });
        }

        // Bars
        gsap.from(".bar-viz > div", {
          scaleY: 0,
          opacity: 0,
          transformOrigin: "bottom center",
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".startups-card",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Tags
        gsap.from(".tag-item", {
          scale: 0.7,
          opacity: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".startups-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Metrics table
        gsap.from(".metrics-table", {
          y: 55,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".metrics-table",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.from(".metrics-row", {
          x: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".metrics-table",
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });

        // Small cards
        gsap.from(".small-stat-card", {
          y: 45,
          opacity: 0,
          scale: 0.94,
          duration: 0.75,
          stagger: 0.1,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: ".small-stat-card",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // Ring
        const ring = document.querySelector<SVGCircleElement>(".ring-fill");
        if (ring) {
          gsap.set(ring, { strokeDashoffset: Math.PI * 32 });
          gsap.to(ring, {
            strokeDashoffset: Math.PI * 32 * (1 - 0.68),
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: ".small-stat-card",
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Quote
        gsap.from(".quote-card", {
          y: 50,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".quote-card",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // Ticker
        gsap.from(".ticker-bar", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ticker-bar",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        });

        return () => {
          mm.revert();
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0D0D0F] relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="grid-lines absolute inset-0 opacity-[0.022]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="numgrid"
                width="96"
                height="96"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 96 0 L 0 0 0 96"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#numgrid)" />
          </svg>
        </div>
        <div
          className="gold-orb-1 absolute -top-40 -left-40 w-[820px] h-[820px] rounded-full opacity-[0.13]"
          style={{
            background:
              "radial-gradient(circle at 30% 30%,rgba(201,168,76,0.18) 0%,transparent 60%)",
          }}
        />
        <div
          className="gold-orb-2 absolute bottom-[-20%] right-[-10%] w-[640px] h-[640px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle at 70% 70%,rgba(201,168,76,0.12) 0%,transparent 65%)",
          }}
        />

        <div className="particle-layer-1 absolute inset-0">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="num-particle absolute rounded-full bg-[#C9A84C]"
              style={{
                width: 2.5,
                height: 2.5,
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </div>
        <div className="particle-layer-2 absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="num-particle absolute rounded-full bg-[#C9A84C]"
              style={{
                width: 2,
                height: 2,
                left: `${55 + i * 7}%`,
                top: `${20 + (i % 4) * 18}%`,
              }}
            />
          ))}
        </div>
        <div className="particle-layer-3 absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="num-particle absolute rounded-full bg-[#F0EDE8]"
              style={{
                width: 1.5,
                height: 1.5,
                left: `${25 + i * 14}%`,
                top: `${50 + (i % 3) * 15}%`,
              }}
            />
          ))}
        </div>

        <svg className="absolute inset-0 w-full h-full">
          <line
            x1="0"
            y1="100%"
            x2="40%"
            y2="0"
            stroke="rgba(201,168,76,0.035)"
            strokeWidth="1"
          />
          <line
            x1="100%"
            y1="0"
            x2="60%"
            y2="100%"
            stroke="rgba(201,168,76,0.025)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Pinned wrapper */}
      <div ref={pinRef} className="relative z-10 min-h-screen flex flex-col">
        <div className="numbers-content flex-1 flex flex-col max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
            <div className="space-y-5">
              <div className="badge-wrap inline-flex items-center gap-2.5 border border-[#C9A84C]/25 rounded-full px-5 py-2 bg-[#C9A84C]/6">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                <span className="text-xs font-sans font-medium text-[#C9A84C] tracking-[0.18em] uppercase">
                  By the Numbers
                </span>
              </div>
              <h2
                className="section-title font-serif text-5xl sm:text-6xl lg:text-[5.2rem] leading-[1.02] text-[#F0EDE8]"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
              >
                The scale of
                <br />
                what we <span className="italic text-[#C9A84C]">build.</span>
              </h2>
            </div>
            <p className="section-desc font-sans font-light text-[#9E9B95] text-lg leading-relaxed max-w-md md:text-right">
              Ascone connects ambitious investors, growing startups, and
              forward-thinking institutions into a single powerful capital
              network.
            </p>
          </div>

          {/* Grid */}
          <div className="grid lg:grid-cols-[1.12fr_1fr] gap-6 lg:gap-8 flex-1">
            {/* LEFT */}
            <div className="left-column flex flex-col gap-6">
              {/* Hero stat */}
              <div
                className="hero-stat relative rounded-3xl p-8 lg:p-10 overflow-hidden border border-[#1E1E22]"
                style={{
                  background:
                    "linear-gradient(135deg,#141416 0%,#111113 55%,#0F0F11 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(201,168,76,0.08),0 40px 80px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(201,168,76,0.06) 0%,transparent 50%)",
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-[0.2em]">
                      Capital Under Management
                    </span>
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] text-emerald-400 font-medium">
                        +34% YoY
                      </span>
                    </div>
                  </div>
                  <p
                    className="giant-number font-serif leading-none text-[#F0EDE8] mb-3"
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "clamp(5rem,10vw,9rem)",
                    }}
                  >
                    <span className="giant-number-val">$0.0B</span>
                  </p>
                  <p className="font-sans text-base text-[#9E9B95] mb-10 max-w-md font-light">
                    In funds and syndicated capital managed across 180+
                    countries.
                  </p>
                  <div className="hero-chart-area space-y-3">
                    <div className="flex items-center justify-between text-[10px] uppercase text-[#5A5855] tracking-[0.18em]">
                      <span>12-month growth</span>
                      <span>Jan — Dec 2024</span>
                    </div>
                    <div className="h-20 relative overflow-hidden rounded-xl">
                      <svg
                        viewBox="0 0 320 80"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                      >
                        <defs>
                          <linearGradient
                            id="chartGrad2"
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
                          className="chart-area"
                          points={areaPoints}
                          fill="url(#chartGrad2)"
                          style={{ opacity: 0 }}
                        />
                        <polyline
                          className="mini-chart-line"
                          points={chartPoints}
                          fill="none"
                          stroke="#C9A84C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          className="mini-chart-dot"
                          cx="320"
                          cy={lastY}
                          r="4.5"
                          fill="#C9A84C"
                        />
                        <circle
                          cx="320"
                          cy={lastY}
                          r="9"
                          fill="#C9A84C"
                          fillOpacity="0.12"
                          className="mini-chart-dot"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-between">
                      {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
                        <span key={m} className="text-[9px] text-[#5A5855]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Startups card */}
              <div
                className="startups-card rounded-3xl p-8 border"
                style={{
                  borderColor: "rgba(201,168,76,0.16)",
                  background:
                    "linear-gradient(135deg,rgba(26,26,30,0.5) 0%,rgba(15,15,17,0.8) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(201,168,76,0.05)",
                }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-[0.2em]">
                      Startups funded
                    </span>
                    <p
                      className="font-serif text-6xl lg:text-7xl text-[#C9A84C] mt-3 leading-none"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      <span className="startups-val">0k+</span>
                    </p>
                    <p className="text-[#9E9B95] mt-2 font-light text-sm">
                      Active via our platform
                    </p>
                  </div>
                  <div className="bar-viz flex items-end gap-1.5 h-20 shrink-0">
                    {barData.map((h, i) => (
                      <div
                        key={i}
                        className="w-4 rounded-t"
                        style={{
                          height: `${h}%`,
                          background:
                            i === 7
                              ? "#C9A84C"
                              : `rgba(201,168,76,${0.1 + i * 0.065})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-item text-[11px] px-3 py-1.5 rounded-full border border-[#2A2A2E] bg-black/20 text-[#9E9B95] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right-column flex flex-col gap-6">
              {/* Metrics table */}
              <div
                className="metrics-table rounded-3xl overflow-hidden border border-[#1E1E22]"
                style={{
                  background: "linear-gradient(160deg,#131315 0%,#0F0F11 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                }}
              >
                <div className="grid grid-cols-[2fr_auto_auto] gap-4 px-7 py-4 border-b border-[#1A1A1E]">
                  {["Metric", "Progress", "Trend"].map((h, i) => (
                    <div
                      key={h}
                      className={`text-[10px] uppercase text-[#4A4A4E] tracking-[0.15em] ${
                        i === 2 ? "text-right" : ""
                      }`}
                    >
                      {h}
                    </div>
                  ))}
                </div>
                {metrics.map((item, i) => (
                  <div
                    key={i}
                    className={`metrics-row grid grid-cols-[2fr_130px_90px] items-center gap-4 px-7 py-5 ${
                      i < metrics.length - 1 ? "border-b border-[#141416]" : ""
                    }`}
                    style={{ cursor: "default" }}
                  >
                    <div>
                      <p
                        className="font-serif text-2xl text-[#F0EDE8]"
                        style={{ fontFamily: "'Cormorant Garamond',serif" }}
                      >
                        {item.value}
                      </p>
                      <p className="text-xs text-[#9E9B95] mt-0.5 font-light">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-[#5A5855] mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                    <div>
                      <div className="h-1.5 bg-[#1A1A1E] rounded-full overflow-hidden">
                        <div
                          className={`progress-fill progress-fill-${
                            i + 1
                          } h-full rounded-full`}
                          style={{
                            background:
                              "linear-gradient(90deg,rgba(201,168,76,0.5),#C9A84C)",
                          }}
                        />
                      </div>
                      <p className="text-[9px] text-[#5A5855] mt-1.5">
                        {item.pct}% index
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium text-emerald-400">
                        {item.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Small cards */}
              <div className="grid grid-cols-2 gap-6">
                <div
                  className="small-stat-card rounded-3xl p-6 border border-[#1E1E22] cursor-default"
                  style={{
                    background:
                      "linear-gradient(135deg,#131315 0%,#111113 100%)",
                  }}
                >
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-[9px] uppercase text-[#5A5855] tracking-[0.18em]">
                      Avg Deal
                    </span>
                    <svg viewBox="0 0 40 40" className="w-10 h-10 -rotate-90">
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="#1A1A1E"
                        strokeWidth="4"
                      />
                      <circle
                        className="ring-fill"
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="#C9A84C"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={Math.PI * 32}
                        strokeDashoffset={Math.PI * 32}
                      />
                    </svg>
                  </div>
                  <p
                    className="font-serif text-3xl text-[#F0EDE8]"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                  >
                    $608k
                  </p>
                  <p className="text-xs text-[#9E9B95] mt-1 font-light">
                    Per syndication
                  </p>
                  <p className="text-[10px] text-emerald-400 mt-2">
                    ↑ 12% vs last q
                  </p>
                </div>

                <div
                  className="small-stat-card rounded-3xl p-6 border border-[#1E1E22] cursor-default"
                  style={{
                    background:
                      "linear-gradient(135deg,#131315 0%,#111113 100%)",
                  }}
                >
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-[9px] uppercase text-[#5A5855] tracking-[0.18em]">
                      Network
                    </span>
                    <div className="relative w-10 h-10">
                      {[
                        { x: 2, y: 2, s: 10, o: 1 },
                        { x: 22, y: 4, s: 8, o: 0.55 },
                        { x: 8, y: 20, s: 9, o: 0.38 },
                        { x: 26, y: 18, s: 7, o: 0.22 },
                      ].map((d, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-[#C9A84C]"
                          style={{
                            width: d.s,
                            height: d.s,
                            left: d.x,
                            top: d.y,
                            opacity: d.o,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p
                    className="font-serif text-3xl text-[#F0EDE8]"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                  >
                    4,800+
                  </p>
                  <p className="text-xs text-[#9E9B95] mt-1 font-light">
                    Verified investors
                  </p>
                  <p className="text-[10px] text-emerald-400 mt-2">
                    ↑ 22% this year
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div
                className="quote-card rounded-3xl p-8 border relative overflow-hidden"
                style={{
                  borderColor: "rgba(201,168,76,0.13)",
                  background:
                    "linear-gradient(135deg,rgba(26,26,30,0.35) 0%,rgba(15,15,17,0.7) 100%)",
                }}
              >
                <div
                  className="absolute -top-4 -left-2 select-none pointer-events-none font-serif"
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "12rem",
                    color: "rgba(201,168,76,0.06)",
                    lineHeight: 1,
                  }}
                >
                  &quot;
                </div>
                <div className="relative z-10">
                  <p
                    className="font-serif text-xl lg:text-2xl text-[#F0EDE8] leading-snug mb-6"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
                  >
                    Building the infrastructure for the next generation of
                    private capital markets.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center">
                        <span
                          className="font-serif text-base text-[#C9A84C]"
                          style={{ fontFamily: "'Cormorant Garamond',serif" }}
                        >
                          A
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#F0EDE8]">
                          Ascone Team
                        </p>
                        <p className="text-[10px] text-[#5A5855]">
                          Vision & Strategy
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase text-[#5A5855] tracking-[0.18em]">
                      2024
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticker */}
          <div className="ticker-bar mt-12 border-t border-[#181818] pt-6 overflow-hidden">
            <div
              className="ticker-inner flex gap-12 whitespace-nowrap"
              style={{ width: "200%" }}
            >
              {[...Array(2)].map((_, rep) => (
                <div key={rep} className="flex gap-12">
                  {[
                    "$14B under management",
                    "23,000+ funded startups",
                    "180+ countries",
                    "99.98% uptime",
                    "4,800+ investors",
                    "+34% YoY growth",
                  ].map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-4 text-xs font-sans text-[#3A3A3E] uppercase tracking-[0.18em]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40 shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
