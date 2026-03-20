"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);

// ─── Data ───────────────────────────────────────────────────────────────────
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

const badges = ["SEC Compliant", "SOC 2 Type II", "ISO 27001"];

// ─── Component ───────────────────────────────────────────────────────────────
export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── Shared: ambient idle animations (always run) ──────────────────
      // Breathing orbs
      gsap.to(".values-orb-top", {
        scale: 1.1,
        opacity: 0.18,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".values-orb-left", {
        scale: 1.08,
        opacity: 0.1,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Floating decoration dots
      gsap.utils.toArray<HTMLElement>(".values-particle").forEach((p, i) => {
        gsap.to(p, {
          y: gsap.utils.random(-14, -28),
          x: gsap.utils.random(-8, 8),
          opacity: gsap.utils.random(0.2, 0.55),
          duration: gsap.utils.random(5, 9),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.7,
        });
      });

      // Top gold rule shimmer (infinite sweep)
      gsap.fromTo(
        ".top-rule-shimmer",
        { x: "-100%" },
        {
          x: "200%",
          duration: 3.5,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 5,
        }
      );

      // ── DESKTOP: full parallax + scroll triggers ──────────────────────
      mm.add("(min-width: 768px)", () => {
        // ── 1. Background parallax layers (different depths) ──────────
        gsap.to(".values-orb-top", {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        gsap.to(".values-orb-left", {
          y: 80,
          x: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });
        gsap.to(".values-orb-right", {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".values-grid-bg", {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        // ── 2. Header — SplitText word reveal ─────────────────────────
        const badge = document.querySelector<HTMLElement>(".val-badge");
        const headline = document.querySelector<HTMLElement>(".val-headline");
        const desc = document.querySelector<HTMLElement>(".val-desc");
        const tagline = document.querySelector<HTMLElement>(".val-tagline");

        // Split headline into words for stagger
        let split: SplitText | null = null;
        if (headline) {
          split = new SplitText(headline, { type: "words,chars" });
          gsap.set(split.words, { overflow: "hidden" });
          gsap.set(split.chars, {
            y: 90,
            opacity: 0,
            rotateX: -25,
            transformPerspective: 600,
          });
        }

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".val-header",
            start: "top 82%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        });

        if (badge) {
          gsap.set(badge, { y: 30, opacity: 0 });
          headerTl.to(
            badge,
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
            0
          );
        }

        if (split) {
          headerTl.to(
            split.chars,
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.018,
              ease: "power4.out",
            },
            0.12
          );
        }

        if (desc) {
          gsap.set(desc, { y: 40, opacity: 0 });
          headerTl.to(
            desc,
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.35
          );
        }

        if (tagline) {
          gsap.set(tagline, { x: -20, opacity: 0 });
          headerTl.to(
            tagline,
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.5
          );
        }

        // Decorative horizontal dash line grows
        gsap.fromTo(
          ".val-dash",
          { width: 0, opacity: 0 },
          {
            width: 32,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".val-header",
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // ── 3. Cards — staggered parallax entrance ────────────────────
        // Each card enters from a different direction + depth
        const cardEntrances = [
          {
            el: ".val-card-0",
            from: { y: 110, x: -30, rotateY: 12, opacity: 0 },
            delay: 0,
          },
          {
            el: ".val-card-1",
            from: { y: 150, x: 0, rotateX: 8, opacity: 0 },
            delay: 0.14,
          },
          {
            el: ".val-card-2",
            from: { y: 110, x: 30, rotateY: -12, opacity: 0 },
            delay: 0.28,
          },
        ];

        cardEntrances.forEach(({ el, from, delay }) => {
          const card = document.querySelector<HTMLElement>(el);
          if (!card) return;
          gsap.set(card, { ...from, transformPerspective: 1000 });
          gsap.to(card, {
            y: 0,
            x: 0,
            rotateY: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".val-cards-grid",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // ── 4. Card inner elements — cascade on enter ─────────────────
        values.forEach((_, i) => {
          const card = document.querySelector(`.val-card-${i}`);
          if (!card) return;
          const tag = card.querySelector(".card-tag");
          const iconBox = card.querySelector(".card-icon-box");
          const title = card.querySelector(".card-title");
          const body = card.querySelector(".card-body");
          const stat = card.querySelector(".card-stat");
          const arrow = card.querySelector(".card-arrow");

          const innerTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".val-cards-grid",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: 0.2 + i * 0.15,
          });

          if (tag) {
            gsap.set(tag, { y: 14, opacity: 0 });
            innerTl.to(tag, { y: 0, opacity: 1, duration: 0.6 }, 0);
          }
          if (iconBox) {
            gsap.set(iconBox, { scale: 0.6, opacity: 0, rotate: -15 });
            innerTl.to(
              iconBox,
              {
                scale: 1,
                opacity: 1,
                rotate: 0,
                duration: 0.7,
                ease: "back.out(2)",
              },
              0.05
            );
          }
          if (title) {
            gsap.set(title, { y: 24, opacity: 0 });
            innerTl.to(
              title,
              { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
              0.14
            );
          }
          if (body) {
            gsap.set(body, { y: 20, opacity: 0 });
            innerTl.to(
              body,
              { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
              0.24
            );
          }
          if (stat) {
            gsap.set(stat, { y: 20, opacity: 0 });
            innerTl.to(
              stat,
              { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
              0.38
            );
          }
          if (arrow) {
            gsap.set(arrow, { scale: 0, opacity: 0 });
            innerTl.to(
              arrow,
              { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)" },
              0.48
            );
          }
        });

        // ── 5. Cards — continuous parallax depth offset while scrolling ─
        // Cards move at slightly different vertical speeds (parallax within section)
        const parallaxRates = [-35, -55, -35];
        document
          .querySelectorAll<HTMLElement>(".val-card-wrap")
          .forEach((card, i) => {
            gsap.to(card, {
              y: parallaxRates[i],
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4 + i * 0.2,
              },
            });
          });

        // Middle card drifts slightly more (creates depth)
        gsap.to(".val-card-wrap-1", {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        });

        // ── 6. Highlighted card — gold shimmer sweep on scroll ─────────
        const highlightCard = document.querySelector<HTMLElement>(
          ".val-card-highlight"
        );
        if (highlightCard) {
          gsap.fromTo(
            ".highlight-shimmer",
            { x: "-100%", opacity: 0 },
            {
              x: "160%",
              opacity: 0.5,
              duration: 0.8,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: highlightCard,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // ── 7. Stat numbers — count up on scroll ──────────────────────
        const statEls =
          document.querySelectorAll<HTMLElement>(".val-stat-animated");
        statEls.forEach((el) => {
          const target = parseFloat(el.dataset.target || "0");
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const proxy = { val: 0 };

          gsap.to(proxy, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              const v =
                suffix === "%" ? proxy.val.toFixed(0) : Math.floor(proxy.val);
              el.textContent = prefix + v + suffix;
            },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          });
        });

        // ── 8. Icon SVG paths — draw on scroll ────────────────────────
        document
          .querySelectorAll<SVGElement>(".val-card circle, .val-card path")
          .forEach((path, i) => {
            gsap.fromTo(
              path,
              { drawSVG: "0%" },
              {
                drawSVG: "100%",
                duration: 1.2,
                ease: "power2.inOut",
                delay: i * 0.08,
                scrollTrigger: {
                  trigger: ".val-cards-grid",
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

        // ── 9. Bottom bar — slide in ───────────────────────────────────
        const bottomLeft =
          document.querySelector<HTMLElement>(".val-bottom-left");
        const bottomBadges =
          document.querySelectorAll<HTMLElement>(".val-badge-item");

        if (bottomLeft) {
          gsap.set(bottomLeft, { x: -40, opacity: 0 });
          gsap.to(bottomLeft, {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".val-bottom",
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        }

        gsap.set(bottomBadges, { y: 20, opacity: 0 });
        gsap.to(bottomBadges, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".val-bottom",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // ── 10. Card hover — magnetic 3D tilt effect ──────────────────
        document.querySelectorAll<HTMLElement>(".val-card").forEach((card) => {
          const inner = card.querySelector<HTMLElement>(".val-card-inner");
          const glow = card.querySelector<HTMLElement>(".card-hover-glow");
          if (!inner) return;

          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);

            gsap.to(inner, {
              rotateY: dx * 6,
              rotateX: -dy * 5,
              transformPerspective: 900,
              duration: 0.5,
              ease: "power2.out",
            });

            if (glow) {
              gsap.to(glow, {
                opacity: 1,
                x: `${dx * 30}%`,
                y: `${dy * 20}%`,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(inner, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.5)",
            });
            if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 });
          });
        });

        // return () => mm.revert();

      });

      // ── MOBILE: lightweight fade-up only ─────────────────────────────
      mm.add("(max-width: 767.9px)", () => {
        // Header simple fade
        gsap.from([".val-badge", ".val-headline", ".val-desc"], {
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".val-header",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        // Cards simple stagger — no 3D, no heavy parallax
        gsap.from(".val-card-wrap", {
          y: 50,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".val-cards-grid",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // Stats count up
        document
          .querySelectorAll<HTMLElement>(".val-stat-animated")
          .forEach((el) => {
            const target = parseFloat(el.dataset.target || "0");
            const prefix = el.dataset.prefix || "";
            const suffix = el.dataset.suffix || "";
            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate() {
                el.textContent = prefix + Math.floor(proxy.val) + suffix;
              },
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reset",
              },
            });
          });

        // Bottom bar
        gsap.from(".val-bottom-left, .val-badge-item", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".val-bottom",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });

        // return () => mm.revert();
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-36 relative overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-[#0A0A0B]" />

      {/* Grid — parallax layer */}
      <div className="values-grid-bg absolute inset-0 opacity-[0.018] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="valgrid"
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 72 0 L 0 0 0 72"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#valgrid)" />
        </svg>
      </div>

      {/* Parallax orbs */}
      <div
        className="values-orb-top absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none opacity-[0.13]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.04) 45%, transparent 70%)",
        }}
      />
      <div
        className="values-orb-left absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 65%)",
        }}
      />
      <div
        className="values-orb-right absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(201,168,76,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[
          { l: "8%", t: "20%", s: 3 },
          { l: "15%", t: "60%", s: 2 },
          { l: "75%", t: "15%", s: 2.5 },
          { l: "85%", t: "55%", s: 2 },
          { l: "50%", t: "80%", s: 1.5 },
          { l: "35%", t: "30%", s: 2 },
          { l: "90%", t: "80%", s: 1.5 },
          { l: "60%", t: "45%", s: 2 },
        ].map((p, i) => (
          <div
            key={i}
            className="values-particle absolute rounded-full bg-[#C9A84C]"
            style={{
              left: p.l,
              top: p.t,
              width: p.s,
              height: p.s,
              opacity: 0.15,
            }}
          />
        ))}
      </div>

      {/* Top rule with animated shimmer */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none overflow-hidden">
        <div
          className="h-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.35) 50%, rgba(201,168,76,0.25) 70%, transparent)",
          }}
        />
        <div
          className="top-rule-shimmer absolute inset-y-0 w-1/4"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="val-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-5">
            <div className="val-badge inline-flex items-center gap-2 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 bg-[#C9A84C]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <span className="text-xs font-sans font-medium text-[#C9A84C] tracking-[0.15em] uppercase">
                Our Values
              </span>
            </div>
            <h2
              className="val-headline font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-[#F0EDE8] max-w-xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Make every spend,
              <br />
              <span className="italic text-[#C9A84C]">well-spent.</span>
            </h2>
          </div>

          <div className="val-desc space-y-4 max-w-xs">
            <p className="text-[#9E9B95] font-sans font-light text-base leading-relaxed md:text-right">
              A diversified group of specialized private credit brands built on
              transparency, technology, and trust.
            </p>
            <div className="val-tagline hidden md:flex justify-end">
              <div className="flex items-center gap-2">
                <div
                  className="val-dash h-px bg-[#C9A84C]/40"
                  style={{ width: 32 }}
                />
                <span className="text-[10px] font-sans text-[#5A5855] uppercase tracking-widest">
                  Since 2020
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="val-cards-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((value, i) => (
            // Wrapper — receives parallax y transform
            <div key={i} className={`val-card-wrap val-card-wrap-${i}`}>
              {/* Card — receives entrance animation */}
              <div
                className={`val-card val-card-${i} ${
                  value.highlight ? "val-card-highlight" : ""
                }`}
                style={{ willChange: "transform" }}
              >
                {/* Inner — receives 3D tilt on hover */}
                <div
                  className={`
                    val-card-inner relative rounded-2xl flex flex-col justify-between min-h-[340px] overflow-hidden
                    border transition-colors duration-500 group
                    ${
                      value.highlight
                        ? "border-[#C9A84C]"
                        : "border-[#1E1E22] hover:border-[#C9A84C]/25"
                    }
                  `}
                  style={{
                    background: value.highlight
                      ? "linear-gradient(145deg, #C9A84C 0%, #B8962E 55%, #A07820 100%)"
                      : "linear-gradient(145deg, #131315 0%, #111113 60%, #0F0F11 100%)",
                    transformStyle: "preserve-3d",
                    boxShadow: value.highlight
                      ? "0 30px 80px rgba(201,168,76,0.25), inset 0 1px 0 rgba(255,255,255,0.15)"
                      : "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)",
                  }}
                >
                  {/* Dynamic hover glow — follows mouse */}
                  {!value.highlight && (
                    <div
                      className="card-hover-glow absolute inset-0 opacity-0 pointer-events-none rounded-2xl"
                      style={{
                        background:
                          "radial-gradient(400px circle at 50% 50%, rgba(201,168,76,0.08), transparent 60%)",
                      }}
                    />
                  )}

                  {/* Top shimmer line */}
                  {!value.highlight && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(201,168,76,0.45) 50%, transparent)",
                      }}
                    />
                  )}

                  {/* Highlighted card — animated shimmer sweep */}
                  {value.highlight && (
                    <div
                      className="highlight-shimmer absolute inset-y-0 w-1/3 pointer-events-none rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                        transform: "skewX(-12deg)",
                      }}
                    />
                  )}

                  {/* Card content */}
                  <div className="p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-7">
                        <span
                          className={`card-tag font-sans text-[10px] uppercase tracking-[0.18em] ${
                            value.highlight
                              ? "text-[#0A0A0B]/50"
                              : "text-[#5A5855]"
                          }`}
                        >
                          {value.tag}
                        </span>
                        <div
                          className={`card-icon-box w-11 h-11 rounded-xl flex items-center justify-center ${
                            value.highlight
                              ? "bg-[#0A0A0B]/12"
                              : "bg-[#1A1A1E] border border-[#252528] group-hover:border-[#C9A84C]/20 transition-colors duration-300"
                          }`}
                        >
                          {value.icon}
                        </div>
                      </div>

                      <h3
                        className={`card-title font-serif text-2xl leading-snug mb-3 ${
                          value.highlight ? "text-[#0A0A0B]" : "text-[#F0EDE8]"
                        }`}
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {value.title}
                      </h3>

                      <p
                        className={`card-body font-sans font-light text-sm leading-[1.75] ${
                          value.highlight
                            ? "text-[#0A0A0B]/65"
                            : "text-[#6E6C68]"
                        }`}
                      >
                        {value.body}
                      </p>
                    </div>

                    <div
                      className={`card-stat mt-8 pt-5 border-t flex items-end justify-between ${
                        value.highlight
                          ? "border-[#0A0A0B]/15"
                          : "border-[#1A1A1E]"
                      }`}
                    >
                      <div>
                        <p
                          className={`val-stat-animated font-serif text-2xl leading-none ${
                            value.highlight
                              ? "text-[#0A0A0B]"
                              : "text-[#C9A84C]"
                          }`}
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          data-target={value.stat.replace(/[^0-9.]/g, "")}
                          data-prefix={value.stat.startsWith("$") ? "$" : ""}
                          data-suffix={
                            value.stat.endsWith("%")
                              ? "%"
                              : value.stat.endsWith("B+")
                              ? "B+"
                              : value.stat.endsWith("+")
                              ? "+"
                              : ""
                          }
                        >
                          {value.stat}
                        </p>
                        <p
                          className={`font-sans text-[10px] mt-1 uppercase tracking-wider ${
                            value.highlight
                              ? "text-[#0A0A0B]/45"
                              : "text-[#5A5855]"
                          }`}
                        >
                          {value.statLabel}
                        </p>
                      </div>

                      <button
                        className={`card-arrow w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          value.highlight
                            ? "border-[#0A0A0B]/25 text-[#0A0A0B] hover:bg-[#0A0A0B]/10"
                            : "border-[#2A2A2E] text-[#5A5855] group-hover:border-[#C9A84C]/50 group-hover:text-[#C9A84C]"
                        }`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="val-bottom mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-1">
          <div className="val-bottom-left flex items-center gap-3">
            <div className="h-px w-10 bg-[#C9A84C]/30" />
            <p className="font-sans text-xs text-[#5A5855]">
              Built on principles that last — not trends that fade.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {badges.map((badge) => (
              <div
                key={badge}
                className="val-badge-item flex items-center gap-1.5"
              >
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
