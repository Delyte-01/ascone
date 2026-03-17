"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PANELS = 8;
const STATUS = [
  "Initialising platform",
  "Connecting markets",
  "Securing your session",
  "Ready",
];

interface PageLoaderProps {
  children: React.ReactNode;
}

export function PageLoader({ children }: PageLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          if (loaderRef.current) loaderRef.current.style.display = "none";
        },
      });

      gsap.set(".ldr-grid", { opacity: 0 });
      gsap.set(".ldr-orb1", { opacity: 0, scale: 0.7 });
      gsap.set(".ldr-orb2", { opacity: 0 });
      gsap.set(".ldr-logo-box", { opacity: 0, scale: 0.65 });
      gsap.set(".ldr-lp1", { strokeDashoffset: 80 });
      gsap.set(".ldr-lp2", { strokeDashoffset: 30 });
      gsap.set(".ldr-letter", { yPercent: 110, opacity: 0, rotateX: -30 });
      gsap.set(".ldr-tagline", { opacity: 0, y: 16 });
      gsap.set(".ldr-progress", { opacity: 0, y: 10 });
      gsap.set(".ldr-ornament", { opacity: 0, y: 12 });
      gsap.set(".ldr-corner", { opacity: 0, scale: 0 });
      gsap.set(".ldr-particle", { opacity: 0, y: 10 });
      gsap.set(".ldr-hline", { width: "0%" });
      gsap.set(".ldr-vline", { height: "0%" });

      tl.to(".ldr-grid", { opacity: 1, duration: 1.2, ease: "power2.out" }, 0);
      tl.to(
        ".ldr-orb1",
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
        0
      );
      tl.to(
        ".ldr-orb2",
        { opacity: 1, duration: 1.6, ease: "power2.out" },
        0.4
      );
      tl.to(
        ".ldr-logo-box",
        { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2)" },
        0.5
      );
      tl.to(
        ".ldr-lp1",
        { strokeDashoffset: 0, duration: 0.9, ease: "power3.inOut" },
        0.55
      );
      tl.to(
        ".ldr-lp2",
        { strokeDashoffset: 0, duration: 0.6, ease: "power3.inOut" },
        1.1
      );
      tl.to(
        ".ldr-letter",
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.0,
          stagger: 0.07,
          ease: "power4.out",
          transformPerspective: 600,
        },
        1.0
      );
      tl.to(
        ".ldr-hline",
        { width: "100%", duration: 0.9, stagger: 0.1, ease: "power3.inOut" },
        1.2
      );
      tl.to(
        ".ldr-vline",
        { height: "100%", duration: 0.8, stagger: 0.1, ease: "power3.inOut" },
        1.35
      );
      tl.to(
        ".ldr-corner",
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "back.out(2)",
        },
        1.4
      );
      tl.to(
        ".ldr-particle",
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: "power2.out" },
        1.3
      );
      tl.to(
        ".ldr-tagline",
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        1.6
      );
      tl.to(
        ".ldr-progress",
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        1.65
      );
      tl.to(
        ".ldr-ornament",
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        1.8
      );

      const proxy = { val: 0 };
      tl.to(
        proxy,
        {
          val: 100,
          duration: 2.2,
          ease: "power1.inOut",
          onUpdate() {
            const v = Math.floor(proxy.val);
            const pct = document.querySelector<HTMLElement>(".ldr-pct");
            const bar = progressRef.current;
            if (pct) pct.textContent = v + "%";
            if (bar) bar.style.width = v + "%";
          },
        },
        1.5
      );

      STATUS.forEach((msg, i) => {
        tl.call(
          () => {
            const el = document.querySelector<HTMLElement>(".ldr-status");
            if (!el) return;
            el.textContent = msg;
            gsap.fromTo(
              el,
              { y: 7, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.32,
                ease: "power2.out",
                onComplete: () => {
                  if (i < STATUS.length - 1) {
                    gsap.to(el, {
                      opacity: 0,
                      y: -7,
                      duration: 0.26,
                      delay: 0.42,
                    });
                  }
                },
              }
            );
          },
          undefined,
          1.6 + i * 0.58
        );
      });

      gsap.utils.toArray<HTMLElement>(".ldr-particle").forEach((p, i) => {
        gsap.to(p, {
          y: gsap.utils.random(-14, -26),
          x: gsap.utils.random(-8, 8),
          opacity: gsap.utils.random(0.2, 0.55),
          duration: gsap.utils.random(4, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.4 + i * 0.4,
        });
      });
      gsap.to(".ldr-orb1", {
        scale: 1.1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      tl.to({}, { duration: 0.5 }, "+=0");
      tl.to(".ldr-center", {
        scale: 1.04,
        duration: 0.4,
        ease: "power2.inOut",
      });
      tl.to(
        [".ldr-tagline", ".ldr-progress", ".ldr-ornament"],
        {
          y: -18,
          opacity: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power3.in",
        },
        "<"
      );
      tl.to(
        ".ldr-center",
        { opacity: 0, scale: 0.95, duration: 0.4, ease: "power3.in" },
        "<+=0.12"
      );
      tl.to(
        loaderRef.current,
        { backgroundColor: "#0A0A0B", duration: 0.25, ease: "none" },
        "<+=0.1"
      );
      tl.to(
        ".ldr-panel",
        {
          yPercent: -102,
          duration: 0.85,
          stagger: { each: 0.065, from: "start" },
          ease: "power4.inOut",
        },
        "<+=0.05"
      );
      tl.fromTo(
        ".ldr-hero-wrap",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "<+=0.28"
      );
    },
    { scope: loaderRef }
  );

  const particles = [
    { l: "8%", t: "22%" },
    { l: "85%", t: "18%" },
    { l: "14%", t: "72%" },
    { l: "90%", t: "65%" },
    { l: "50%", t: "88%" },
    { l: "62%", t: "14%" },
    { l: "32%", t: "82%" },
    { l: "76%", t: "78%" },
  ];

  return (
    <div
      ref={loaderRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "#08080A" }}
    >
      <div
        className="fixed inset-0 z-40 flex flex-col pointer-events-none"
        aria-hidden
      >
        {Array.from({ length: PANELS }).map((_, i) => (
          <div
            key={i}
            className="ldr-panel flex-1 w-full"
            style={{ background: i % 2 === 0 ? "#09090B" : "#08080A" }}
          />
        ))}
      </div>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ background: "#08080A" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="ldr-grid absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,76,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.045) 1px,transparent 1px)",
              backgroundSize: "55px 55px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%)",
            }}
          />
          <div
            className="ldr-orb1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse,rgba(201,168,76,0.1) 0%,transparent 65%)",
            }}
          />
          <div
            className="ldr-orb2 absolute -bottom-20 -right-16 w-[350px] h-[350px] rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 65%)",
            }}
          />
          <div className="absolute left-14 right-14 top-[18%] overflow-hidden">
            <div
              className="ldr-hline h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(201,168,76,0.14) 20%,rgba(201,168,76,0.12) 80%,transparent)",
              }}
            />
          </div>
          <div className="absolute left-14 right-14 bottom-[18%] overflow-hidden">
            <div
              className="ldr-hline h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(201,168,76,0.1) 20%,rgba(201,168,76,0.1) 80%,transparent)",
              }}
            />
          </div>
          <div
            className="absolute left-[12%]"
            style={{ top: "18%", height: "64%" }}
          >
            <div
              className="ldr-vline w-px"
              style={{
                background:
                  "linear-gradient(to bottom,transparent,rgba(201,168,76,0.1),transparent)",
                height: 0,
              }}
            />
          </div>
          <div
            className="absolute right-[12%]"
            style={{ top: "18%", height: "64%" }}
          >
            <div
              className="ldr-vline w-px"
              style={{
                background:
                  "linear-gradient(to bottom,transparent,rgba(201,168,76,0.1),transparent)",
                height: 0,
              }}
            />
          </div>
          {[
            "top-5 left-5",
            "top-5 right-5",
            "bottom-5 left-5",
            "bottom-5 right-5",
          ].map((pos, i) => (
            <div key={i} className={`ldr-corner absolute ${pos}`}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d={
                    i === 0
                      ? "M0 9L0 0L9 0"
                      : i === 1
                      ? "M18 9L18 0L9 0"
                      : i === 2
                      ? "M0 9L0 18L9 18"
                      : "M18 9L18 18L9 18"
                  }
                  stroke="rgba(201,168,76,0.4)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          ))}
          {particles.map((p, i) => (
            <div
              key={i}
              className="ldr-particle absolute rounded-full bg-[#C9A84C]"
              style={{ left: p.l, top: p.t, width: 2, height: 2, opacity: 0 }}
            />
          ))}
        </div>

        <div className="ldr-center flex flex-col items-center gap-5 relative z-10">
          <div
            className="ldr-logo-box w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{
              background: "#C9A84C",
              boxShadow:
                "0 0 50px rgba(201,168,76,0.35),inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 50%)",
              }}
            />
            <svg width="28" height="28" viewBox="0 0 14 14" fill="none">
              <path
                className="ldr-lp1"
                d="M2 12L7 2L12 12"
                stroke="#0A0A0B"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={80}
                strokeDashoffset={80}
              />
              <path
                className="ldr-lp2"
                d="M4 8.5h6"
                stroke="#0A0A0B"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray={30}
                strokeDashoffset={30}
              />
            </svg>
          </div>

          <div style={{ perspective: "600px" }}>
            <div className="flex items-baseline overflow-hidden pb-1">
              {"ASCONE".split("").map((char, i) => (
                <span
                  key={i}
                  className="ldr-letter inline-block"
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(42px,8vw,72px)",
                    fontWeight: 400,
                    color: "#F0EDE8",
                    letterSpacing: "0.17em",
                    lineHeight: 1,
                    opacity: 0,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          <p
            className="ldr-tagline font-sans font-light text-[10px] tracking-[0.28em] uppercase"
            style={{ color: "rgba(201,168,76,0.65)" }}
          >
            Private Capital · Reimagined
          </p>

          <div className="ldr-progress flex flex-col gap-2 w-60 md:w-72">
            <div
              className="w-full h-px rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <div
                ref={progressRef}
                className="h-full rounded-full"
                style={{
                  width: "0%",
                  background:
                    "linear-gradient(90deg,rgba(201,168,76,0.4),#C9A84C)",
                  boxShadow: "0 0 10px rgba(201,168,76,0.5)",
                  transition: "none",
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span
                className="ldr-status font-sans text-[9px] tracking-[0.14em] uppercase"
                style={{ color: "rgba(158,155,149,0.6)" }}
              >
                Initialising platform
              </span>
              <span
                className="ldr-pct font-sans text-xs"
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  color: "rgba(201,168,76,0.8)",
                }}
              >
                0%
              </span>
            </div>
          </div>

          <div className="ldr-ornament flex items-center gap-3">
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(201,168,76,0.3))",
              }}
            />
            <div className="w-1 h-1 rounded-full bg-[#C9A84C]/45" />
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(to left,transparent,rgba(201,168,76,0.3))",
              }}
            />
          </div>
        </div>
      </div>

      <div className="ldr-hero-wrap" style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  );
}
