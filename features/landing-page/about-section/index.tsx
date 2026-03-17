"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);

const savingsGoals = [
  { label: "Emergency Fund", current: 8400, target: 10000, pct: 84 },
  { label: "Vacation", current: 2100, target: 3000, pct: 70 },
  { label: "New Car", current: 1500, target: 8000, pct: 19 },
];

const transferRates = [
  { label: "Mid-market rate", value: "1 USD = 0.787 GBP", highlight: "" },
  { label: "Transfer fee", value: "— Zero", highlight: "emerald" },
  { label: "Arrival estimate", value: "< 30 seconds", highlight: "gold" },
];

const stats = [
  { stat: "$4.2B+", sub: "transferred globally", sup: "This quarter" },
  { stat: "0.3s", sub: "average settlement time", sup: "Real-time rails" },
  { stat: "99.98%", sub: "platform uptime", sup: "Last 12 months" },
];

const circumference = 2 * Math.PI * 54;
const innerCircumference = 2 * Math.PI * 42;

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ── Ambient idle (always) ────────────────────────────────────────────
      gsap.to(".about-orb-right", {
        scale: 1.14,
        opacity: 0.09,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".about-orb-left", {
        scale: 1.1,
        opacity: 0.07,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5,
      });

      // Floating micro particles
      gsap.utils.toArray<HTMLElement>(".about-particle").forEach((p, i) => {
        gsap.to(p, {
          y: gsap.utils.random(-16, -30),
          x: gsap.utils.random(-8, 8),
          opacity: gsap.utils.random(0.18, 0.55),
          duration: gsap.utils.random(5, 9),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.65,
        });
      });

      // Arrow circle in card 2 — slow spin
      gsap.to(".arrow-circle", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Pulse glow on arrow center icon (counteracts rotation)
      gsap.to(".arrow-icon-inner", {
        rotation: -360,
        duration: 18,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Transfer "from" box — subtle value shimmer
      gsap.fromTo(
        ".about-top-shimmer",
        { x: "-100%" },
        {
          x: "250%",
          duration: 3.5,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 7,
        }
      );

      // ── DESKTOP ──────────────────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        // ── 1. Background deep parallax ────────────────────────────────
        gsap.to(".about-orb-right", {
          y: -130,
          x: 60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        });
        gsap.to(".about-orb-left", {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.2,
          },
        });
        gsap.to(".about-grid-bg", {
          y: -90,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        // ── 2. Header — SplitText char reveal ─────────────────────────
        const headline = document.querySelector<HTMLElement>(".about-headline");
        let split: SplitText | null = null;

        if (headline) {
          split = new SplitText(headline, { type: "lines,words,chars" });
          gsap.set(split.chars, {
            yPercent: 115,
            opacity: 0,
            rotateX: -22,
            transformPerspective: 550,
          });
        }

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".about-header",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.set(".about-badge", { y: 28, opacity: 0 });
        headerTl.to(
          ".about-badge",
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
          0
        );

        if (split) {
          headerTl.to(
            split.chars,
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.012,
              ease: "power4.out",
            },
            0.1
          );
        }

        gsap.set(".about-desc", { y: 34, opacity: 0 });
        headerTl.to(
          ".about-desc",
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          0.38
        );

        // Divider line draws
        gsap.fromTo(
          ".about-divider",
          { width: "0%", opacity: 0 },
          {
            width: "100%",
            opacity: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-header",
              start: "top 76%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // ── 3. Cards — 3D entrance from different axes ─────────────────
        gsap.set(".card-1", {
          y: 130,
          rotateY: -14,
          rotateX: 6,
          transformPerspective: 1000,
          opacity: 0,
        });
        gsap.set(".card-2", {
          y: 130,
          rotateY: 14,
          rotateX: 6,
          transformPerspective: 1000,
          opacity: 0,
        });

        gsap.to(".card-1", {
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".card-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.to(".card-2", {
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.14,
          scrollTrigger: {
            trigger: ".card-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Cards drift at different parallax speeds
        gsap.to(".card-1", {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
        gsap.to(".card-2", {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });

        // ── 4. Card 1 inner — ring + progress on scroll ────────────────
        const ringTrigger = {
          trigger: ".card-1",
          start: "top 80%",
          toggleActions: "play none none reverse",
        };

        // Outer ring draws from 0
        gsap.fromTo(
          ".ring-outer",
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: circumference * (1 - 0.84),
            duration: 1.6,
            ease: "power3.inOut",
            scrollTrigger: ringTrigger,
          }
        );

        // Inner ring
        gsap.fromTo(
          ".ring-inner",
          { strokeDashoffset: innerCircumference },
          {
            strokeDashoffset: innerCircumference * (1 - 0.7),
            duration: 1.4,
            ease: "power2.inOut",
            delay: 0.2,
            scrollTrigger: ringTrigger,
          }
        );

        // Ring text count up
        const ringText = document.querySelector<HTMLElement>(".ring-pct");
        if (ringText) {
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: 84,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              ringText.textContent = Math.floor(proxy.val) + "%";
            },
            scrollTrigger: ringTrigger,
          });
        }

        // Ring text fade in
        gsap.set(".ring-text", { scale: 0.6, opacity: 0 });
        gsap.to(".ring-text", {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(2)",
          scrollTrigger: ringTrigger,
          delay: 0.3,
        });

        // Total saved counter
        const savedEl = document.querySelector<HTMLElement>(".total-saved-num");
        if (savedEl) {
          const proxy2 = { val: 0 };
          gsap.to(proxy2, {
            val: 12000,
            duration: 1.8,
            ease: "power2.out",
            onUpdate() {
              savedEl.textContent =
                "$" + Math.floor(proxy2.val).toLocaleString();
            },
            scrollTrigger: ringTrigger,
          });
        }

        // Progress bars scrub-driven
        savingsGoals.forEach((goal, i) => {
          gsap.fromTo(
            `.progress-bar-${i}`,
            { width: "0%" },
            {
              width: `${goal.pct}%`,
              duration: 1.4,
              ease: "power2.out",
              delay: 0.1 * i,
              scrollTrigger: {
                trigger: ".progress-bars",
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Card 1 items stagger in
        gsap.set(".card-1-header, .card-1-meta, .ring-section", {
          y: 22,
          opacity: 0,
        });
        gsap.to(".card-1-header, .card-1-meta, .ring-section", {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: ringTrigger,
        });

        // ── 5. Card 2 inner — transfer elements ───────────────────────
        const transferTrigger = {
          trigger: ".card-2",
          start: "top 80%",
          toggleActions: "play none none reverse",
        };

        gsap.set(".card-2-header", { y: 22, opacity: 0 });
        gsap.to(".card-2-header", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: transferTrigger,
        });

        gsap.set(".transfer-from", { x: -60, opacity: 0 });
        gsap.to(".transfer-from", {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: transferTrigger,
        });

        gsap.set(".arrow-wrap", { scale: 0, rotation: -90, opacity: 0 });
        gsap.to(".arrow-wrap", {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(2)",
          delay: 0.38,
          scrollTrigger: transferTrigger,
        });

        gsap.set(".transfer-to", { x: 60, opacity: 0 });
        gsap.to(".transfer-to", {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.38,
          scrollTrigger: transferTrigger,
        });

        // Received amount count up
        const receivedEl =
          document.querySelector<HTMLElement>(".received-amount");
        if (receivedEl) {
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: 19682,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              receivedEl.textContent = Math.floor(proxy.val).toLocaleString();
            },
            scrollTrigger: transferTrigger,
          });
        }

        gsap.from(".rate-row-item", {
          y: 20,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.55,
          scrollTrigger: transferTrigger,
        });

        // ── 6. Stats strip entrance ────────────────────────────────────
        gsap.set(".stat-card", { y: 60, opacity: 0, scale: 0.94 });
        gsap.to(".stat-card", {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".stats-strip",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // Stats count up
        [
          { sel: ".stat-val-0", target: 4.2, prefix: "$", suffix: "B+" },
          { sel: ".stat-val-1", target: 0.3, prefix: "", suffix: "s" },
          { sel: ".stat-val-2", target: 99.98, prefix: "", suffix: "%" },
        ].forEach(({ sel, target, prefix, suffix }) => {
          const el = document.querySelector<HTMLElement>(sel);
          if (!el) return;
          const proxy = { val: 0 };
          gsap.to(proxy, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate() {
              const v =
                target < 1
                  ? proxy.val.toFixed(1)
                  : target < 10
                  ? proxy.val.toFixed(2)
                  : Math.floor(proxy.val);
              el.textContent = prefix + v + suffix;
            },
            scrollTrigger: {
              trigger: ".stats-strip",
              start: "top 88%",
              toggleActions: "play none none reset",
            },
          });
        });

        // ── 7. Card hover — 3D magnetic tilt ──────────────────────────
        [".card-1", ".card-2"].forEach((sel) => {
          const card = document.querySelector<HTMLElement>(sel);
          if (!card) return;
          const glow = card.querySelector<HTMLElement>(".card-inner-glow");

          card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
            const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
            gsap.to(card, {
              rotateY: dx * 5,
              rotateX: -dy * 4,
              transformPerspective: 900,
              duration: 0.5,
              ease: "power2.out",
            });
            if (glow) {
              gsap.to(glow, {
                opacity: 1,
                x: `${dx * 25}%`,
                y: `${dy * 20}%`,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
            });
            if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 });
          });
        });

        // ── 8. Stat card hover lift ────────────────────────────────────
        document.querySelectorAll<HTMLElement>(".stat-card").forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -5,
              scale: 1.02,
              borderColor: "rgba(201,168,76,0.3)",
              duration: 0.35,
              ease: "power2.out",
            });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              borderColor: "rgba(42,42,46,1)",
              duration: 0.45,
              ease: "power2.out",
            });
          });
        });

        return () => mm.revert();
      });

      // ── MOBILE: lightweight only ────────────────────────────────────────
      mm.add("(max-width: 767.9px)", () => {
        gsap.from(".about-badge, .about-headline, .about-desc", {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-header",
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".card-1, .card-2", {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".card-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Progress bars — simple
        savingsGoals.forEach((goal, i) => {
          gsap.fromTo(
            `.progress-bar-${i}`,
            { width: "0%" },
            {
              width: `${goal.pct}%`,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".progress-bars",
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Ring — simple scale in
        gsap.fromTo(
          ".ring-outer",
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: circumference * (1 - 0.84),
            duration: 1.3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: ".card-1",
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.from(".stat-card", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-strip",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        return () => mm.revert();
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-32 bg-[#0A0A0B] relative overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Grid */}
        <div className="about-grid-bg absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="aboutgrid"
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
            <rect width="100%" height="100%" fill="url(#aboutgrid)" />
          </svg>
        </div>

        {/* Orbs */}
        <div
          className="about-orb-right absolute top-1/3 right-0 -translate-y-1/2 w-[480px] h-[480px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 65%)",
          }}
        />
        <div
          className="about-orb-left absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.14) 0%, transparent 65%)",
          }}
        />

        {/* Particles */}
        {[
          { l: "5%", t: "15%" },
          { l: "12%", t: "70%" },
          { l: "80%", t: "10%" },
          { l: "90%", t: "55%" },
          { l: "48%", t: "85%" },
          { l: "65%", t: "30%" },
          { l: "30%", t: "45%" },
          { l: "88%", t: "78%" },
        ].map((p, i) => (
          <div
            key={i}
            className="about-particle absolute rounded-full bg-[#C9A84C]"
            style={{
              left: p.l,
              top: p.t,
              width: 2.5,
              height: 2.5,
              opacity: 0.1,
            }}
          />
        ))}

        {/* Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full">
          <line
            x1="0"
            y1="0"
            x2="25%"
            y2="100%"
            stroke="rgba(201,168,76,0.022)"
            strokeWidth="1"
          />
          <line
            x1="100%"
            y1="100%"
            x2="75%"
            y2="0"
            stroke="rgba(201,168,76,0.018)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Top border shimmer */}
      <div className="absolute top-0 inset-x-0 h-px overflow-hidden pointer-events-none">
        <div
          style={{
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.35) 50%, rgba(201,168,76,0.2) 70%, transparent)",
          }}
        />
        <div
          className="about-top-shimmer absolute inset-y-0 w-1/4"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <div className="about-header grid lg:grid-cols-2 gap-10 mb-16 md:mb-24 items-end">
          <div className="space-y-5">
            <div className="about-badge inline-flex items-center gap-2 border border-[#2A2A2E] rounded-full px-4 py-1.5 bg-[#111113]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/50" />
              <span className="text-xs font-sans font-medium text-[#9E9B95] tracking-[0.15em] uppercase">
                About Ascone
              </span>
            </div>
            <h2
              className="about-headline font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-[#F0EDE8]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              One platform.
              <br />
              Every money <span className="italic text-[#C9A84C]">move.</span>
            </h2>
          </div>
          <div className="lg:pb-3">
            <p className="about-desc text-[#9E9B95] text-lg sm:text-xl font-sans font-light leading-relaxed max-w-lg">
              Remove every barrier between you and your financial goals —
              savings, investments, and global transfers, all unified in one
              seamless experience.
            </p>
            <div
              className="about-divider mt-6 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(201,168,76,0.25), rgba(201,168,76,0.08), transparent)",
                width: 0,
                opacity: 0,
              }}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="card-grid grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* ── Card 1: Grow Savings ── */}
          <div
            className="card card-1 bg-[#111113] border border-[#2A2A2E] rounded-3xl p-7 md:p-8 min-h-[480px] md:min-h-[540px] flex flex-col justify-between relative overflow-hidden"
            style={{
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.02)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Inner glow follows mouse on desktop */}
            <div
              className="card-inner-glow absolute inset-0 opacity-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "radial-gradient(500px circle at 50% 50%, rgba(201,168,76,0.07), transparent 60%)",
              }}
            />

            {/* Top shimmer on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 50%, transparent)",
              }}
            />

            <div className="card-1-header flex items-start justify-between mb-2">
              <h3
                className="font-serif text-3xl md:text-4xl text-[#F0EDE8] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Grow savings
                <br />
                <span className="italic text-[#C9A84C]">faster.</span>
              </h3>
              <span className="font-sans text-xs text-[#5A5855] border border-[#2A2A2E] rounded-full px-3 py-1 mt-1 bg-[#0A0A0B]">
                Smart Goals
              </span>
            </div>

            <p className="card-1-meta text-[#5A5855] font-sans text-sm mt-1 max-w-xs leading-relaxed">
              AI-powered goals that adapt to your income patterns in real time.
            </p>

            {/* Ring + stats */}
            <div className="ring-section my-5 flex items-center gap-6 md:gap-8">
              <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
                  {/* Track rings */}
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="#1A1A1E"
                    strokeWidth="8"
                  />
                  {/* Animated outer ring */}
                  <circle
                    className="ring-outer"
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="42"
                    fill="none"
                    stroke="#1A1A1E"
                    strokeWidth="4"
                  />
                  <circle
                    className="ring-inner"
                    cx="64"
                    cy="64"
                    r="42"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={innerCircumference}
                    strokeDashoffset={innerCircumference}
                    opacity="0.4"
                  />
                </svg>
                <div
                  className="ring-text absolute inset-0 flex flex-col items-center justify-center"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="ring-pct font-serif text-2xl md:text-3xl text-[#F0EDE8]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    0%
                  </span>
                  <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-wider">
                    overall
                  </span>
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <div>
                  <p className="font-sans text-[10px] md:text-xs text-[#5A5855] uppercase tracking-widest">
                    Total saved
                  </p>
                  <p
                    className="total-saved-num font-serif text-3xl md:text-4xl text-[#F0EDE8] leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    $0
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <svg
                      viewBox="0 0 10 10"
                      className="w-3 h-3 fill-emerald-400"
                    >
                      <polygon points="5,0 10,10 0,10" />
                    </svg>
                    <span className="font-sans text-xs text-emerald-400">
                      +24.5% this year
                    </span>
                  </div>
                </div>
                <div className="h-px bg-[#2A2A2E] my-2" />
                <p className="font-sans text-xs text-[#5A5855]">
                  Target: $14,300
                </p>
                <p className="font-sans text-xs text-[#9E9B95]">
                  On track — <span className="text-[#C9A84C]">Mar 2026</span>
                </p>
              </div>
            </div>

            {/* Progress bars */}
            <div className="progress-bars space-y-4 border-t border-[#1A1A1E] pt-5">
              {savingsGoals.map(({ label, current, target, pct }, i) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#9E9B95]">{label}</span>
                    <span className="text-[#5A5855]">
                      ${current.toLocaleString()} / ${target.toLocaleString()}
                      <span className="ml-2 text-[#C9A84C] font-medium">
                        {pct}%
                      </span>
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1A1A1E] rounded-full overflow-hidden">
                    <div
                      className={`progress-bar-${i} h-full rounded-full`}
                      style={{
                        width: "0%",
                        background:
                          "linear-gradient(90deg, rgba(201,168,76,0.4), #C9A84C)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Card 2: Send Globally ── */}
          <div
            className="card card-2 bg-[#111113] border border-[#2A2A2E] rounded-3xl p-7 md:p-8 min-h-[480px] md:min-h-[540px] flex flex-col justify-between relative overflow-hidden"
            style={{
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.02)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="card-inner-glow absolute inset-0 opacity-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "radial-gradient(500px circle at 50% 50%, rgba(201,168,76,0.07), transparent 60%)",
              }}
            />

            <div className="card-2-header flex items-start justify-between mb-2">
              <h3
                className="font-serif text-3xl md:text-4xl text-[#F0EDE8] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Send across
                <br />
                <span className="italic text-[#C9A84C]">the globe.</span>
              </h3>
              <span className="font-sans text-xs text-[#5A5855] border border-[#2A2A2E] rounded-full px-3 py-1 mt-1 bg-[#0A0A0B]">
                180+ Countries
              </span>
            </div>

            <p className="text-[#5A5855] font-sans text-sm mt-1 max-w-xs leading-relaxed">
              Real mid-market rates. Zero hidden fees. Settles in seconds.
            </p>

            {/* Transfer UI */}
            <div className="my-5 flex-1 flex flex-col justify-center">
              {/* From box */}
              <div
                className="transfer-from bg-[#0A0A0B] border border-[#2A2A2E] rounded-2xl p-5 mb-3 relative overflow-hidden"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}
              >
                <div className="flex justify-between mb-2 text-xs uppercase text-[#5A5855] tracking-wider">
                  <span>You send</span>
                  <div className="flex items-center gap-1.5 bg-[#1A1A1E] rounded-full px-3 py-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-blue-600 to-red-500" />
                    <span className="text-[#F0EDE8]">USD</span>
                  </div>
                </div>
                <p
                  className="font-serif text-3xl md:text-4xl text-[#F0EDE8]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  25,000<span className="text-[#5A5855] text-xl">.00</span>
                </p>
              </div>

              {/* Arrow */}
              <div className="arrow-wrap flex justify-center relative h-10 my-1">
                <div className="absolute inset-x-0 top-1/2 h-px bg-[#1A1A1E]" />
                <div
                  className="arrow-circle relative z-10 w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center"
                  style={{ boxShadow: "0 0 24px rgba(201,168,76,0.35)" }}
                >
                  <div className="arrow-icon-inner">
                    <svg viewBox="0 0 14 14" className="w-4 h-4" fill="none">
                      <path
                        d="M7 2v10M3 8l4 4 4-4"
                        stroke="#0A0A0B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* To box */}
              <div
                className="transfer-to rounded-2xl p-5 mt-3 border"
                style={{
                  background: "rgba(201,168,76,0.06)",
                  borderColor: "rgba(201,168,76,0.22)",
                  boxShadow: "inset 0 1px 0 rgba(201,168,76,0.08)",
                }}
              >
                <div className="flex justify-between mb-2 text-xs uppercase tracking-wider">
                  <span className="text-[#C9A84C]/70">They receive</span>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{ background: "rgba(201,168,76,0.1)" }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-green-500 to-white" />
                    <span className="text-[#C9A84C]">GBP</span>
                  </div>
                </div>
                <p
                  className="font-serif text-3xl md:text-4xl text-[#C9A84C]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  <span className="received-amount">0</span>
                  <span className="text-[#C9A84C]/50 text-xl">.50</span>
                </p>
              </div>
            </div>

            {/* Rate details */}
            <div className="border-t border-[#1A1A1E] pt-5 space-y-3 text-xs">
              {transferRates.map(({ label, value, highlight }) => (
                <div key={label} className="rate-row-item flex justify-between">
                  <span className="text-[#5A5855]">{label}</span>
                  <span
                    className={
                      highlight === "emerald"
                        ? "text-emerald-400 font-medium"
                        : highlight === "gold"
                        ? "text-[#C9A84C] font-medium"
                        : "text-[#9E9B95]"
                    }
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="stats-strip grid grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          {stats.map(({ stat, sub, sup }, i) => (
            <div
              key={stat}
              className="stat-card bg-[#111113] border border-[#2A2A2E] rounded-2xl px-4 py-5 md:px-6 md:py-6 flex flex-col gap-1 cursor-default"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                transition: "none",
              }}
            >
              <span className="font-sans text-[10px] md:text-xs text-[#5A5855] uppercase tracking-wider">
                {sup}
              </span>
              <span
                className={`stat-val-${i} font-serif text-2xl md:text-3xl text-[#F0EDE8]`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                0
              </span>
              <span className="font-sans text-xs md:text-sm text-[#9E9B95]">
                {sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
