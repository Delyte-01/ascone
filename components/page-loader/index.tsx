"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PANEL_COUNT = 10;
const STATUSES = [
  "Initialising",
  "Connecting markets",
  "Securing session",
  "Ready",
];

interface PageLoaderProps {
  children: React.ReactNode;
}

export function PageLoader({ children }: PageLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useGSAP(
    () => {
      if (!loading) return;

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete() {
          document.body.style.overflow = "";
          setLoading(false);
          window.dispatchEvent(new Event("loaderDone"));
        },
      });

      // ── INITIAL STATES ────────────────────────────────────────────────────
      gsap.set(".ldr-orb-c", { opacity: 0, scale: 0.5 });
      gsap.set(".ldr-orb-br", { opacity: 0, scale: 0.6 });
      gsap.set(".ldr-orb-tl", { opacity: 0, scale: 0.6 });
      gsap.set(".ldr-grid", { opacity: 0 });
      gsap.set(".ldr-diag", { opacity: 0 });
      gsap.set(".ldr-scan", { opacity: 0, top: "0%" });
      gsap.set(".ldr-reveal-line", { opacity: 0, width: "0%" });
      gsap.set(".ldr-bracket", { opacity: 0, scale: 0, rotation: -12 });
      gsap.set(".ldr-particle", { opacity: 0, scale: 0 });
      gsap.set(".ldr-stage", { opacity: 0 });
      gsap.set(".ldr-logo-box", {
        opacity: 0,
        scale: 0.3,
        rotation: -22,
        filter: "blur(8px)",
      });
      gsap.set(".ldr-lp1", { strokeDashoffset: 80 });
      gsap.set(".ldr-lp2", { strokeDashoffset: 30 });
      gsap.set(".ldr-char", {
        opacity: 0,
        yPercent: 115,
        rotateX: -60,
        filter: "blur(5px)",
      });
      gsap.set(".ldr-underline", {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center",
      });
      gsap.set(".ldr-descriptor", { opacity: 0, y: 18, filter: "blur(4px)" });
      gsap.set(".ldr-counter-strip", {
        opacity: 0,
        y: 18,
        filter: "blur(4px)",
      });
      gsap.set(".ldr-progress", { opacity: 0, y: 18, filter: "blur(4px)" });
      gsap.set(".ldr-status", { opacity: 0 });

      // ── PHASE 1: DEEP ATMOSPHERE — orbs bloom from scaled centres ─────────
      tl.to(
        ".ldr-orb-c",
        { opacity: 1, scale: 1, duration: 3.2, ease: "power1.out" },
        0
      );
      tl.to(
        ".ldr-orb-br",
        { opacity: 1, scale: 1, duration: 2.4, ease: "power2.out" },
        0.45
      );
      tl.to(
        ".ldr-orb-tl",
        { opacity: 1, scale: 1, duration: 2.2, ease: "power2.out" },
        0.7
      );
      tl.to(
        ".ldr-grid",
        { opacity: 1, duration: 2.0, ease: "power1.out" },
        0.2
      );
      tl.to(
        ".ldr-diag",
        { opacity: 1, duration: 1.6, ease: "power1.out" },
        0.55
      );

      // ── PHASE 2: SCAN LINE — top to bottom initialisation sweep ──────────
      tl.to(".ldr-scan", { opacity: 1, duration: 0.18 }, 0.4);
      tl.to(
        ".ldr-scan",
        { top: "100%", duration: 1.15, ease: "power2.inOut" },
        0.46
      );
      tl.to(".ldr-scan", { opacity: 0, duration: 0.25 }, 1.52);

      // ── PHASE 3: REVEAL LINE — horizontal flash across centre ─────────────
      // Mimics a camera initialisation or data scan — pure cinema
      tl.to(
        ".ldr-reveal-line",
        {
          opacity: 1,
          width: "100%",
          duration: 0.55,
          ease: "power3.out",
        },
        0.55
      );
      tl.to(
        ".ldr-reveal-line",
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        1.05
      );

      // ── PHASE 4: CORNER BRACKETS — architectural snap with rotation ───────
      tl.to(
        ".ldr-bracket",
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "back.out(3.5)",
        },
        0.65
      );

      // ── PHASE 5: STAGE fades in — everything builds on this base ──────────
      tl.to(
        ".ldr-stage",
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        0.85
      );

      // ── PHASE 6: LOGO BOX — blur-dissolve + back-spin ─────────────────────
      tl.to(
        ".ldr-logo-box",
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "back.out(2.2)",
        },
        0.88
      );

      // SVG paths draw in sequence
      tl.to(
        ".ldr-lp1",
        { strokeDashoffset: 0, duration: 1.05, ease: "power3.inOut" },
        1.06
      );
      tl.to(
        ".ldr-lp2",
        { strokeDashoffset: 0, duration: 0.68, ease: "power3.inOut" },
        1.68
      );

      // ── PHASE 7: WORDMARK — per-char blur-dissolve with wave blurs ────────
      // Each char has a slightly different starting blur — creates a wave feel
      const blurAmounts = [6, 5, 4, 5, 4, 3];
      const charEls =
        loaderRef.current?.querySelectorAll<HTMLElement>(".ldr-char");
      charEls?.forEach((c, i) => {
        gsap.set(c, { filter: `blur(${blurAmounts[i] ?? 5}px)` });
        tl.to(
          c,
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power4.out",
            transformPerspective: 900,
          },
          0.95 + i * 0.078
        );
      });

      // Underline materialises from centre after last char lands
      const charCount = charEls?.length ?? 6;
      tl.to(
        ".ldr-underline",
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.0,
          ease: "expo.out",
        },
        0.95 + (charCount - 1) * 0.078 + 0.14
      );

      // ── PHASE 8: SUPPORTING ELEMENTS — blur in with stagger ──────────────
      tl.to(
        ".ldr-descriptor",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
        },
        1.88
      );
      tl.to(
        ".ldr-counter-strip",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        2.04
      );
      tl.to(
        ".ldr-progress",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
        },
        2.18
      );

      // Particles pop with back ease — staggered like stars igniting
      tl.to(
        ".ldr-particle",
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(3)",
        },
        1.55
      );

      // ── PHASE 9: COUNTERS count up simultaneously ─────────────────────────
      const satP = { v: 0 },
        aumP = { v: 0 },
        usrP = { v: 0 };

      tl.to(
        satP,
        {
          v: 99,
          duration: 2.3,
          ease: "power2.out",
          onUpdate() {
            const el =
              loaderRef.current?.querySelector<HTMLElement>(".ldr-cn-sat");
            if (el) el.textContent = Math.floor(satP.v) + "%";
          },
        },
        2.2
      );
      tl.to(
        aumP,
        {
          v: 14,
          duration: 2.3,
          ease: "power2.out",
          onUpdate() {
            const el =
              loaderRef.current?.querySelector<HTMLElement>(".ldr-cn-aum");
            if (el) el.textContent = "$" + aumP.v.toFixed(1) + "B";
          },
        },
        2.28
      );
      tl.to(
        usrP,
        {
          v: 48,
          duration: 2.3,
          ease: "power2.out",
          onUpdate() {
            const el =
              loaderRef.current?.querySelector<HTMLElement>(".ldr-cn-usr");
            if (el) el.textContent = Math.floor(usrP.v) + "k";
          },
        },
        2.35
      );

      // ── PHASE 10: PROGRESS BAR ────────────────────────────────────────────
      const proxy = { v: 0 };
      tl.to(
        proxy,
        {
          v: 100,
          duration: 2.4,
          ease: "power1.inOut",
          onUpdate() {
            const v = Math.floor(proxy.v);
            const pct =
              loaderRef.current?.querySelector<HTMLElement>(".ldr-pct");
            if (pct) pct.textContent = v + "%";
            if (progressRef.current) progressRef.current.style.width = v + "%";
          },
        },
        2.2
      );

      // ── PHASE 11: STATUS TEXT — blur-slide cycles ─────────────────────────
      tl.to(
        ".ldr-status",
        { opacity: 1, duration: 0.3, ease: "power2.out" },
        2.22
      );
      STATUSES.forEach((s, i) => {
        tl.call(
          () => {
            const el =
              loaderRef.current?.querySelector<HTMLElement>(".ldr-status");
            if (!el) return;
            el.textContent = s;
            if (i > 0) {
              gsap.fromTo(
                el,
                { y: 10, opacity: 0, filter: "blur(2px)" },
                {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  duration: 0.35,
                  ease: "power2.out",
                  onComplete() {
                    if (i < STATUSES.length - 1) {
                      gsap.to(el, {
                        opacity: 0,
                        y: -10,
                        filter: "blur(2px)",
                        duration: 0.28,
                        delay: 0.42,
                      });
                    }
                  },
                }
              );
            }
          },
          undefined,
          2.22 + i * 0.6
        );
      });

      // ── AMBIENT LOOPS — everything breathes at its own rate ───────────────
      gsap.to(".ldr-orb-c", {
        scale: 1.18,
        opacity: 0.85,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".ldr-orb-br", {
        y: -22,
        x: -14,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
      gsap.to(".ldr-orb-tl", {
        y: 18,
        x: 12,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      loaderRef.current
        ?.querySelectorAll<HTMLElement>(".ldr-particle")
        .forEach((p, i) => {
          gsap.to(p, {
            y: gsap.utils.random(-22, -45),
            x: gsap.utils.random(-15, 15),
            opacity: gsap.utils.random(0.12, 0.5),
            duration: gsap.utils.random(4.5, 11),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.6 + i * 0.25,
          });
        });

      // Logo glow breathes
      gsap.to(".ldr-logo-box", {
        boxShadow:
          "0 0 80px rgba(201,168,76,0.65),0 8px 40px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.28)",
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Chars shimmer — each at different phase
      charEls?.forEach((c, i) => {
        gsap.to(c, {
          opacity: i === 3 ? 1 : 0.82,
          duration: gsap.utils.random(2.5, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.8 + i * 0.2,
        });
      });

      // Underline breathes
      gsap.to(".ldr-underline", {
        opacity: 0.5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3,
      });

      // ── EXIT — 6-beat choreographed cinematic exit ────────────────────────

      // Beat 1: Hold at 100%
      tl.to({}, { duration: 0.6 }, "+=0");

      // Beat 2: Logo triple-pulse — heartbeat before sleep
      tl.to(".ldr-logo-box", {
        scale: 1.14,
        duration: 0.24,
        ease: "power2.inOut",
      });
      tl.to(".ldr-logo-box", {
        scale: 0.96,
        duration: 0.18,
        ease: "power2.in",
      });
      tl.to(".ldr-logo-box", { scale: 1.0, duration: 0.2, ease: "power2.out" });

      // Beat 3: Supporting elements blur + fly out (staggered)
      tl.to(
        [".ldr-descriptor", ".ldr-counter-strip", ".ldr-progress"],
        {
          y: -28,
          opacity: 0,
          filter: "blur(5px)",
          duration: 0.4,
          stagger: 0.042,
          ease: "power3.in",
        },
        "<+=0.02"
      );

      // Beat 4: Wordmark chars blur out in REVERSE order — cinematic unravel
      const charElsArray = Array.from(charEls ?? []);
      charElsArray
        .slice()
        .reverse()
        .forEach((c, i) => {
          tl.to(
            c,
            {
              opacity: 0,
              yPercent: -30,
              filter: "blur(4px)",
              duration: 0.3,
              ease: "power3.in",
            },
            "<+=" + i * 0.04
          );
        });

      // Beat 4b: Logo blurs out simultaneously
      tl.to(
        ".ldr-logo-box",
        {
          opacity: 0,
          scale: 0.85,
          filter: "blur(6px)",
          duration: 0.35,
          ease: "power3.in",
        },
        "<+=0.05"
      );
      tl.to(
        ".ldr-stage",
        { opacity: 0, duration: 0.25, ease: "power2.in" },
        "<+=0.08"
      );

      // Beat 5: Background bleeds to page colour
      tl.to(
        loaderRef.current,
        {
          backgroundColor: "#0A0A0B",
          duration: 0.32,
          ease: "none",
        },
        "<+=0.04"
      );

      // Beat 6: Venetian curtain — panels snap upward in cascade
      tl.to(
        ".ldr-panel",
        {
          yPercent: -105,
          duration: 0.92,
          stagger: { each: 0.06, from: "start" },
          ease: "power4.inOut",
        },
        "<+=0.04"
      );
    },
    { scope: loaderRef, dependencies: [loading] }
  );

  const particles = [
    { l: "7%", t: "19%", s: 2 },
    { l: "87%", t: "15%", s: 2.5 },
    { l: "12%", t: "76%", s: 1.5 },
    { l: "92%", t: "70%", s: 2 },
    { l: "47%", t: "91%", s: 1.5 },
    { l: "65%", t: "11%", s: 2 },
    { l: "29%", t: "86%", s: 1.5 },
    { l: "79%", t: "82%", s: 2 },
    { l: "21%", t: "40%", s: 1.5 },
    { l: "71%", t: "52%", s: 2 },
    { l: "54%", t: "26%", s: 1.5 },
    { l: "38%", t: "63%", s: 2 },
  ];

  const brackets = [
    { cls: "top-[16px] left-[16px]", path: "M0 10L0 0L10 0" },
    { cls: "top-[16px] right-[16px]", path: "M20 10L20 0L10 0" },
    { cls: "bottom-[16px] left-[16px]", path: "M0 10L0 20L10 20" },
    { cls: "bottom-[16px] right-[16px]", path: "M20 10L20 20L10 20" },
  ];

  return (
    <>
      {loading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#02020A" }}
        >
          {/* Animated noise grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "160px 160px",
              opacity: 0.018,
              animation: "ldrGrain 0.85s steps(1) infinite",
            }}
          />

          {/* Scan line */}
          <div
            className="ldr-scan absolute left-0 right-0 h-px pointer-events-none z-[5]"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(201,168,76,0.06) 10%,rgba(201,168,76,0.32) 50%,rgba(201,168,76,0.06) 90%,transparent)",
              top: "0%",
            }}
          />

          {/* Reveal line — horizontal flash across screen centre */}
          <div
            className="ldr-reveal-line absolute left-0 h-px z-[15] pointer-events-none"
            style={{
              top: "50%",
              background:
                "linear-gradient(90deg,transparent,rgba(201,168,76,0.45) 15%,rgba(255,232,140,0.9) 50%,rgba(201,168,76,0.45) 85%,transparent)",
              width: "0%",
              opacity: 0,
            }}
          />

          {/* Curtain panels — z-[45] wipes over everything on exit */}
          <div
            className="absolute inset-0 z-10 flex flex-col pointer-events-none"
            aria-hidden
          >
            {Array.from({ length: PANEL_COUNT }).map((_, i) => (
              <div
                key={i}
                className="ldr-panel flex-1 w-full"
                style={{ background: i % 2 === 0 ? "#03030B" : "#02020A" }}
              />
            ))}
          </div>

          {/* Background layers — z-[10] */}
          <div
            className="absolute inset-0 pointer-events-none z-[10]"
            aria-hidden
          >
            {/* Three orbs — layered depth */}
            <div
              className="ldr-orb-c absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle,rgba(201,168,76,0.07) 0%,rgba(201,168,76,0.02) 40%,transparent 65%)",
              }}
            />
            <div
              className="ldr-orb-br absolute -bottom-36 -right-20 w-[420px] h-[420px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle,rgba(201,168,76,0.055) 0%,transparent 65%)",
              }}
            />
            <div
              className="ldr-orb-tl absolute -top-24 -left-16 w-[300px] h-[300px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle,rgba(201,168,76,0.04) 0%,transparent 65%)",
              }}
            />

            {/* Grid */}
            <div
              className="ldr-grid absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse 70% 70% at 50% 50%,black 10%,transparent 100%)",
              }}
            />

            {/* Diagonal accent lines */}
            <svg className="ldr-diag absolute inset-0 w-full h-full">
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
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="rgba(201,168,76,0.012)"
                strokeWidth="1"
              />
            </svg>

            {/* Corner brackets */}
            {brackets.map(({ cls, path }, i) => (
              <div key={i} className={`ldr-bracket absolute ${cls}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d={path}
                    stroke="rgba(201,168,76,0.5)"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            ))}

            {/* Particles — 12 for richer star field */}
            {particles.map((p, i) => (
              <div
                key={i}
                className="ldr-particle absolute rounded-full bg-[#C9A84C]"
                style={{
                  left: p.l,
                  top: p.t,
                  width: p.s,
                  height: p.s,
                  opacity: 0,
                }}
              />
            ))}
          </div>

          {/* Stage — z-[20], above bg, below curtain */}
          <div className="ldr-stage relative z-[20] flex flex-col items-center">
            {/* Logo + Wordmark */}
            <div className="flex items-center gap-[18px] mb-1">
              {/* Gold logo box — gradient + double inner glow */}
              <div
                className="ldr-logo-box w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-[20px] flex items-center justify-center relative overflow-hidden flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(145deg,#D8B660 0%,#C9A84C 52%,#B49038 100%)",
                  boxShadow:
                    "0 0 0 1px rgba(201,168,76,0.3),0 8px 40px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.22)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(145deg,rgba(255,255,255,0.22) 0%,transparent 50%)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%,rgba(255,255,255,0.12) 0%,transparent 60%)",
                  }}
                />
                <svg width="28" height="28" viewBox="0 0 14 14" fill="none">
                  <path
                    className="ldr-lp1"
                    d="M2 12L7 2L12 12"
                    stroke="#02020A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={80}
                    strokeDashoffset={80}
                  />
                  <path
                    className="ldr-lp2"
                    d="M4 8.5h6"
                    stroke="#02020A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeDasharray={30}
                    strokeDashoffset={30}
                  />
                </svg>
              </div>

              {/* ASCONE — each char in its own clip, 3D + blur dissolve */}
              <div className="relative" style={{ perspective: "1200px" }}>
                <div className="flex items-end overflow-visible pb-2">
                  {"ASCONE".split("").map((char, i) => (
                    <div
                      key={i}
                      className="inline-block overflow-hidden"
                      style={{ lineHeight: "0.9" }}
                    >
                      <span
                        className="ldr-char inline-block"
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: "clamp(54px,9.8vw,84px)",
                          fontWeight: char === "O" ? 300 : 200,
                          color: char === "O" ? "#C9A84C" : "#F0EDE8",
                          fontStyle: char === "O" ? "italic" : "normal",
                          letterSpacing: "0.16em",
                          lineHeight: "0.9",
                          opacity: 0,
                          display: "inline-block",
                        }}
                      >
                        {char}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Underline — expands from centre */}
                <div
                  className="ldr-underline absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(201,168,76,0.3) 15%,rgba(201,168,76,0.82) 50%,rgba(201,168,76,0.3) 85%,transparent)",
                    transformOrigin: "center",
                  }}
                />
              </div>
            </div>

            {/* Descriptor */}
            <div className="ldr-descriptor flex items-center gap-6 mt-4">
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to right,transparent,rgba(201,168,76,0.45))",
                }}
              />
              <span
                className="font-sans font-light uppercase"
                style={{
                  fontSize: 8,
                  letterSpacing: "0.44em",
                  color: "rgba(201,168,76,0.52)",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                Private Capital · Reimagined
              </span>
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(to left,transparent,rgba(201,168,76,0.45))",
                }}
              />
            </div>

            {/* Counter strip */}
            <div className="ldr-counter-strip flex items-stretch mt-7">
              {[
                {
                  cls: "ldr-cn-sat",
                  init: "0%",
                  label: "Satisfaction",
                  gold: true,
                },
                {
                  cls: "ldr-cn-aum",
                  init: "$0B",
                  label: "Under Mgmt",
                  gold: false,
                },
                {
                  cls: "ldr-cn-usr",
                  init: "0k",
                  label: "Active Users",
                  gold: false,
                },
              ].map(({ cls, init, label, gold }, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center px-[22px]"
                  style={{
                    borderLeft:
                      i > 0 ? "1px solid rgba(201,168,76,0.1)" : "none",
                  }}
                >
                  <span
                    className={cls}
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: 22,
                      fontWeight: 300,
                      color: gold ? "#C9A84C" : "#F0EDE8",
                      lineHeight: 1,
                    }}
                  >
                    {init}
                  </span>
                  <span
                    className="mt-[5px] font-sans font-light uppercase"
                    style={{
                      fontSize: 7.5,
                      letterSpacing: "0.24em",
                      color: "rgba(158,155,149,0.4)",
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="ldr-progress flex flex-col gap-2 mt-[26px] w-52 md:w-72">
              <div
                className="w-full h-px rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <div
                  ref={progressRef}
                  className="h-full rounded-full"
                  style={{
                    width: "0%",
                    background:
                      "linear-gradient(90deg,rgba(201,168,76,0.2),#C9A84C 45%,rgba(255,235,150,1))",
                    boxShadow: "0 0 20px rgba(201,168,76,0.7)",
                    transition: "none",
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="ldr-status font-sans text-[8px] tracking-[0.2em] uppercase"
                  style={{
                    color: "rgba(158,155,149,0.4)",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  Initialising
                </span>
                <span
                  className="ldr-pct"
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 13,
                    color: "rgba(201,168,76,0.78)",
                  }}
                >
                  0%
                </span>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes ldrGrain {
              0%  { transform: translate(0,0)      }
              20% { transform: translate(-5%,-2%)  }
              40% { transform: translate(3%,-6%)   }
              60% { transform: translate(-4%,5%)   }
              80% { transform: translate(6%,2%)    }
              100%{ transform: translate(2%,-4%)   }
            }
          `}</style>
        </div>
      )}

      <div style={{ opacity: loading ? 0 : 1, transition: "none" }}>
        {children}
      </div>
    </>
  );
}
