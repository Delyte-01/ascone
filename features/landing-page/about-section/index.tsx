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
  {
    stat: "$4.2B+",
    raw: 4.2,
    prefix: "$",
    suffix: "B+",
    decimals: 1,
    sub: "transferred globally",
    sup: "This quarter",
  },
  {
    stat: "0.3s",
    raw: 0.3,
    prefix: "",
    suffix: "s",
    decimals: 1,
    sub: "average settlement time",
    sup: "Real-time rails",
  },
  {
    stat: "99.98%",
    raw: 99.98,
    prefix: "",
    suffix: "%",
    decimals: 2,
    sub: "platform uptime",
    sup: "Last 12 months",
  },
];

const circumference = 2 * Math.PI * 54;
const innerCircumference = 2 * Math.PI * 42;

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ── Always-on ambient (both viewports) ────────────────────────────
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

      // Arrow circle slow spin (always)
      gsap.to(".arrow-circle", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
      gsap.to(".arrow-icon-inner", {
        rotation: -360,
        duration: 18,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Top shimmer sweep (always)
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

      // ── matchMedia — clean context separation ────────────────────────
      const mm = gsap.matchMedia();

      // ═══════════════════════════════════════════════════════════════
      // DESKTOP  ≥ 768px
      // ═══════════════════════════════════════════════════════════════
      mm.add("(min-width: 768px)", () => {
        // ── BG parallax ─────────────────────────────────────────────
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

        // ── Header SplitText ─────────────────────────────────────────
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

        gsap.set(".about-badge", { y: 28, opacity: 0 });
        gsap.set(".about-desc", { y: 34, opacity: 0 });

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".about-header",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
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
        headerTl.to(
          ".about-desc",
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          0.38
        );

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

        // ── Cards 3D entrance ────────────────────────────────────────
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

        const cardTrigger = {
          trigger: ".card-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        };
        gsap.to(".card-1", {
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: cardTrigger,
        });
        gsap.to(".card-2", {
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.14,
          scrollTrigger: cardTrigger,
        });

        // Cards parallax drift (different speeds)
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

        // ── Card 1 inner elements ────────────────────────────────────
        const ringTrigger = {
          trigger: ".card-1",
          start: "top 80%",
          toggleActions: "play none none reverse",
        };

        // Set initial states for card 1 inner
        gsap.set(".card-1-header, .card-1-meta, .ring-section", {
          y: 22,
          opacity: 0,
        });
        gsap.set(".ring-text", { scale: 0.6, opacity: 0 });
        gsap.set(".ring-outer", { strokeDashoffset: circumference });
        gsap.set(".ring-inner", { strokeDashoffset: innerCircumference });

        gsap.to(".card-1-header, .card-1-meta, .ring-section", {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: ringTrigger,
        });

        // Rings draw
        gsap.to(".ring-outer", {
          strokeDashoffset: circumference * (1 - 0.84),
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: ringTrigger,
        });
        gsap.to(".ring-inner", {
          strokeDashoffset: innerCircumference * (1 - 0.7),
          duration: 1.4,
          ease: "power2.inOut",
          delay: 0.2,
          scrollTrigger: ringTrigger,
        });

        // Ring % counter
        const ringPctEl = document.querySelector<HTMLElement>(".ring-pct");
        if (ringPctEl) {
          ringPctEl.textContent = "0%";
          const p = { v: 0 };
          gsap.to(p, {
            v: 84,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              ringPctEl.textContent = Math.floor(p.v) + "%";
            },
            scrollTrigger: ringTrigger,
          });
        }

        // Ring text fade
        gsap.to(".ring-text", {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(2)",
          delay: 0.3,
          scrollTrigger: ringTrigger,
        });

        // Total saved counter
        const savedEl = document.querySelector<HTMLElement>(".total-saved-num");
        if (savedEl) {
          savedEl.textContent = "$0";
          const p2 = { v: 0 };
          gsap.to(p2, {
            v: 12000,
            duration: 1.8,
            ease: "power2.out",
            onUpdate() {
              savedEl.textContent = "$" + Math.floor(p2.v).toLocaleString();
            },
            scrollTrigger: ringTrigger,
          });
        }

        // Progress bars
        savingsGoals.forEach((goal, i) => {
          gsap.set(`.progress-bar-${i}`, { width: "0%" });
          gsap.to(`.progress-bar-${i}`, {
            width: `${goal.pct}%`,
            duration: 1.4,
            ease: "power2.out",
            delay: 0.1 * i,
            scrollTrigger: {
              trigger: ".progress-bars",
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // ── Card 2 inner elements ────────────────────────────────────
        const transferTrigger = {
          trigger: ".card-2",
          start: "top 80%",
          toggleActions: "play none none reverse",
        };

        gsap.set(".card-2-header", { y: 22, opacity: 0 });
        gsap.set(".transfer-from", { x: -60, opacity: 0 });
        gsap.set(".arrow-wrap", { scale: 0, rotation: -90, opacity: 0 });
        gsap.set(".transfer-to", { x: 60, opacity: 0 });
        gsap.set(".rate-row-item", { y: 20, opacity: 0 });

        gsap.to(".card-2-header", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: transferTrigger,
        });
        gsap.to(".transfer-from", {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: transferTrigger,
        });
        gsap.to(".arrow-wrap", {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(2)",
          delay: 0.38,
          scrollTrigger: transferTrigger,
        });
        gsap.to(".transfer-to", {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.38,
          scrollTrigger: transferTrigger,
        });
        gsap.to(".rate-row-item", {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.55,
          scrollTrigger: transferTrigger,
        });

        // Received amount counter
        const receivedEl =
          document.querySelector<HTMLElement>(".received-amount");
        if (receivedEl) {
          receivedEl.textContent = "0";
          const p3 = { v: 0 };
          gsap.to(p3, {
            v: 19682,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              receivedEl.textContent = Math.floor(p3.v).toLocaleString();
            },
            scrollTrigger: {
              ...transferTrigger,
              toggleActions: "play none none reset",
            },
          });
        }

        // ── Stats strip ──────────────────────────────────────────────
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

        // Stat counters
        stats.forEach(({ raw, prefix, suffix, decimals }, i) => {
          const el = document.querySelector<HTMLElement>(`.stat-val-${i}`);
          if (!el) return;
          el.textContent = prefix + (0).toFixed(decimals) + suffix;
          const p = { v: 0 };
          gsap.to(p, {
            v: raw,
            duration: 1.8,
            ease: "power2.out",
            onUpdate() {
              el.textContent = prefix + p.v.toFixed(decimals) + suffix;
            },
            scrollTrigger: {
              trigger: ".stats-strip",
              start: "top 88%",
              toggleActions: "play none none reset",
            },
          });
        });

        // ── 3D magnetic hover ────────────────────────────────────────
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
            if (glow)
              gsap.to(glow, {
                opacity: 1,
                x: `${dx * 25}%`,
                y: `${dy * 20}%`,
                duration: 0.4,
                ease: "power2.out",
              });
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

        // Stat card hover lift
        document.querySelectorAll<HTMLElement>(".stat-card").forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -6,
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

        return () => {
          mm.revert();
        };
      });

      // ═══════════════════════════════════════════════════════════════
      // MOBILE  < 768px
      // ═══════════════════════════════════════════════════════════════
      mm.add("(max-width: 767.9px)", () => {
        // Clear any desktop gsap.set that might have leaked
        gsap.set(
          ".about-badge,.about-headline,.about-desc,.card-1,.card-2,.card-1-header,.card-1-meta,.ring-section,.card-2-header,.transfer-from,.arrow-wrap,.transfer-to,.rate-row-item,.stat-card",
          { clearProps: "all" }
        );

        // Ensure initial text states for all counters
        const ringPctEl = document.querySelector<HTMLElement>(".ring-pct");
        const savedEl = document.querySelector<HTMLElement>(".total-saved-num");
        const receivedEl =
          document.querySelector<HTMLElement>(".received-amount");
        if (ringPctEl) ringPctEl.textContent = "0%";
        if (savedEl) savedEl.textContent = "$0";
        if (receivedEl) receivedEl.textContent = "0";
        stats.forEach(({ prefix, suffix, decimals }, i) => {
          const el = document.querySelector<HTMLElement>(`.stat-val-${i}`);
          if (el) el.textContent = prefix + (0).toFixed(decimals) + suffix;
        });
        savingsGoals.forEach((_, i) => {
          gsap.set(`.progress-bar-${i}`, { width: "0%" });
        });
        gsap.set(".ring-outer", { strokeDashoffset: circumference });
        gsap.set(".ring-inner", { strokeDashoffset: innerCircumference });
        gsap.set(".ring-text", { opacity: 0 });

        // ── Header ──────────────────────────────────────────────────
        gsap.from([".about-badge", ".about-headline", ".about-desc"], {
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

        // ── Card 1 ──────────────────────────────────────────────────
        gsap.from(".card-1", {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".card-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Ring draw (mobile)
        gsap.to(".ring-outer", {
          strokeDashoffset: circumference * (1 - 0.84),
          duration: 1.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".card-1",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.to(".ring-inner", {
          strokeDashoffset: innerCircumference * (1 - 0.7),
          duration: 1.1,
          ease: "power2.inOut",
          delay: 0.15,
          scrollTrigger: {
            trigger: ".card-1",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.to(".ring-text", {
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
          scrollTrigger: {
            trigger: ".card-1",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // Ring % counter (mobile)
        if (ringPctEl) {
          const p = { v: 0 };
          gsap.to(p, {
            v: 84,
            duration: 1.4,
            ease: "power2.out",
            onUpdate() {
              ringPctEl.textContent = Math.floor(p.v) + "%";
            },
            scrollTrigger: {
              trigger: ".card-1",
              start: "top 86%",
              toggleActions: "play none none reset",
            },
          });
        }

        // Total saved counter (mobile)
        if (savedEl) {
          const p2 = { v: 0 };
          gsap.to(p2, {
            v: 12000,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              savedEl.textContent = "$" + Math.floor(p2.v).toLocaleString();
            },
            scrollTrigger: {
              trigger: ".card-1",
              start: "top 86%",
              toggleActions: "play none none reset",
            },
          });
        }

        // Progress bars (mobile)
        savingsGoals.forEach((goal, i) => {
          gsap.to(`.progress-bar-${i}`, {
            width: `${goal.pct}%`,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".progress-bars",
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          });
        });

        // ── Card 2 ──────────────────────────────────────────────────
        gsap.from(".card-2", {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: ".card-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Received counter (mobile)
        if (receivedEl) {
          const p3 = { v: 0 };
          gsap.to(p3, {
            v: 19682,
            duration: 1.5,
            ease: "power2.out",
            onUpdate() {
              receivedEl.textContent = Math.floor(p3.v).toLocaleString();
            },
            scrollTrigger: {
              trigger: ".card-2",
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          });
        }

        // Transfer elements simple fade-in (mobile)
        gsap.from([".transfer-from", ".arrow-wrap", ".transfer-to"], {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".card-2",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        // ── Stats strip (mobile) ─────────────────────────────────────
        gsap.from(".stat-card", {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: ".stats-strip",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // Stat counters (mobile) — individual triggers, toggleActions reset
        stats.forEach(({ raw, prefix, suffix, decimals }, i) => {
          const el = document.querySelector<HTMLElement>(`.stat-val-${i}`);
          if (!el) return;
          const p = { v: 0 };
          gsap.to(p, {
            v: raw,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              el.textContent = prefix + p.v.toFixed(decimals) + suffix;
            },
            scrollTrigger: {
              trigger: ".stats-strip",
              start: "top 88%",
              toggleActions: "play none none reset",
            },
          });
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
      className="w-full py-20 md:py-32 bg-[#0A0A0B] relative overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
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

        <div
          className="about-orb-right absolute top-1/3 right-0 -translate-y-1/2 w-[480px] h-[480px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle,rgba(201,168,76,0.18) 0%,transparent 65%)",
          }}
        />
        <div
          className="about-orb-left absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle,rgba(201,168,76,0.14) 0%,transparent 65%)",
          }}
        />

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
              "linear-gradient(90deg,transparent,rgba(201,168,76,0.2) 30%,rgba(201,168,76,0.35) 50%,rgba(201,168,76,0.2) 70%,transparent)",
          }}
        />
        <div
          className="about-top-shimmer absolute inset-y-0 w-1/4"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)",
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
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
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
                  "linear-gradient(90deg,rgba(201,168,76,0.25),rgba(201,168,76,0.08),transparent)",
                width: 0,
                opacity: 0,
              }}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="card-grid grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1 — Grow Savings */}
          <div
            className="card card-1 bg-[#111113] border border-[#2A2A2E] rounded-3xl p-7 md:p-8 min-h-[480px] md:min-h-[540px] flex flex-col justify-between relative overflow-hidden"
            style={{
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.02)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="card-inner-glow absolute inset-0 opacity-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "radial-gradient(500px circle at 50% 50%,rgba(201,168,76,0.07),transparent 60%)",
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(201,168,76,0.4) 50%,transparent)",
              }}
            />

            <div className="card-1-header flex items-start justify-between mb-2">
              <h3
                className="font-serif text-3xl md:text-4xl text-[#F0EDE8] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
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

            {/* Ring */}
            <div className="ring-section my-5 flex items-center gap-6 md:gap-8">
              <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="#1A1A1E"
                    strokeWidth="8"
                  />
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
                    opacity="0.4"
                    strokeDasharray={innerCircumference}
                    strokeDashoffset={innerCircumference}
                  />
                </svg>
                <div
                  className="ring-text absolute inset-0 flex flex-col items-center justify-center"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="ring-pct font-serif text-2xl md:text-3xl text-[#F0EDE8]"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
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
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}
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
                          "linear-gradient(90deg,rgba(201,168,76,0.4),#C9A84C)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Send Globally */}
          <div
            className="card card-2 bg-[#111113] border border-[#2A2A2E] rounded-3xl p-7 md:p-8 min-h-[480px] md:min-h-[540px] flex flex-col justify-between relative overflow-hidden"
            style={{
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.02)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="card-inner-glow absolute inset-0 opacity-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "radial-gradient(500px circle at 50% 50%,rgba(201,168,76,0.07),transparent 60%)",
              }}
            />

            <div className="card-2-header flex items-start justify-between mb-2">
              <h3
                className="font-serif text-3xl md:text-4xl text-[#F0EDE8] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
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

            <div className="my-5 flex-1 flex flex-col justify-center">
              {/* From */}
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
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}
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

              {/* To */}
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
                  style={{ fontFamily: "'Cormorant Garamond',serif" }}
                >
                  <span className="received-amount">0</span>
                  <span className="text-[#C9A84C]/50 text-xl">.50</span>
                </p>
              </div>
            </div>

            {/* Rates */}
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
          {stats.map(({ prefix, suffix, decimals, sub, sup }, i) => (
            <div
              key={i}
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
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
              >
                {prefix + (0).toFixed(decimals) + suffix}
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
