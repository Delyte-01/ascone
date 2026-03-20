"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const faqs = [
  {
    question: "How do I send a bank transfer?",
    answer:
      "Navigate to the Transfers tab, enter the recipient's details and amount, then confirm with your PIN or biometric. Transfers between Ascone accounts are instant — external banks typically settle within 1–2 business days.",
    tag: "Transfers",
  },
  {
    question: "What is the scheduled payments feature?",
    answer:
      "Scheduled payments lets you automate any recurring transaction — subscriptions, rent, loan repayments. View every upcoming charge in one timeline, edit amounts, pause, or cancel with a single tap.",
    tag: "Payments",
  },
  {
    question: "How can I reactivate a terminated card?",
    answer:
      "Go to Cards in your dashboard, select the terminated card, and tap Reactivate. If the card was terminated due to suspicious activity, our support team will verify your identity before restoring access.",
    tag: "Cards",
  },
  {
    question: "How does the refund process work?",
    answer:
      "Refunds from merchants are credited to your Ascone account within 5–10 business days. You can track every refund's status in real time under Transactions. For disputes, raise a claim directly from the transaction detail screen.",
    tag: "Refunds",
  },
  {
    question: "How do I add money to my account?",
    answer:
      "Fund your account via bank transfer, debit card top-up, or by linking an external bank account for instant pulls. All funding methods are protected by 256-bit encryption and two-factor authentication.",
    tag: "Funding",
  },
];

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  // ── SCROLL & ENTRANCE — runs ONCE on mount, never on openIndex change ──
  useGSAP(
    () => {
      // Ambient
      gsap.to(".faq-orb-center", {
        scale: 1.18,
        opacity: 0.2,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".faq-orb-left", {
        scale: 1.12,
        opacity: 0.1,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3,
      });
      gsap.utils.toArray<HTMLElement>(".faq-particle").forEach((p, i) => {
        gsap.to(p, {
          y: gsap.utils.random(-18, -32),
          x: gsap.utils.random(-10, 10),
          opacity: gsap.utils.random(0.2, 0.6),
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.8,
        });
      });
      gsap.fromTo(
        ".faq-top-shimmer",
        { x: "-100%" },
        {
          x: "250%",
          duration: 4,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 6,
        }
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.to(".faq-orb-center", {
          y: -140,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });
        gsap.to(".faq-orb-left", {
          y: 80,
          x: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.4,
          },
        });
        gsap.to(".faq-grid-bg", {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        const headline = document.querySelector<HTMLElement>(".faq-headline");
        let split: SplitText | null = null;
        if (headline) {
          split = new SplitText(headline, { type: "lines,words" });
          gsap.set(split.words, {
            overflow: "hidden",
            display: "inline-block",
          });
          split.words.forEach((word) => {
            const inner = document.createElement("span");
            inner.style.display = "inline-block";
            inner.textContent = word.textContent;
            word.textContent = "";
            word.appendChild(inner);
            gsap.set(inner, {
              yPercent: 110,
              opacity: 0,
              rotateX: -20,
              transformPerspective: 500,
            });
          });
        }

        gsap.set(".faq-badge", { y: 28, opacity: 0 });
        gsap.set(".faq-subtitle", { y: 32, opacity: 0 });
        gsap.set(".faq-cta-link", { x: -30, opacity: 0 });

        const leftTl = gsap.timeline({
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
        leftTl.to(
          ".faq-badge",
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          0
        );
        if (split) {
          split.words.forEach((word, i) => {
            const inner = word.querySelector<HTMLElement>("span");
            if (inner)
              leftTl.to(
                inner,
                {
                  yPercent: 0,
                  opacity: 1,
                  rotateX: 0,
                  duration: 0.85,
                  ease: "power4.out",
                },
                0.1 + i * 0.055
              );
          });
        }
        leftTl.to(
          ".faq-subtitle",
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
          0.42
        );
        leftTl.to(
          ".faq-cta-link",
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: "power3.out",
          },
          0.56
        );

        gsap.fromTo(
          ".faq-side-line",
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const faqItems = gsap.utils.toArray<HTMLElement>(".faq-item-wrap");
        faqItems.forEach((item, i) => {
          gsap.set(item, {
            y: 70 + i * 15,
            opacity: 0,
            x: i % 2 === 0 ? 20 : -20,
          });
          gsap.to(item, {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1.0,
            delay: i * 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.to(rightRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        gsap.to(leftRef.current, {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        faqItems.forEach((item) => {
          const btn = item.querySelector<HTMLElement>(".faq-btn");
          const num = item.querySelector<HTMLElement>(".faq-num");
          const iconRing = item.querySelector<HTMLElement>(".faq-icon-ring");
          if (!btn) return;
          btn.addEventListener("mouseenter", () => {
            gsap.to(num, {
              x: 4,
              color: "#C9A84C",
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(iconRing, {
              scale: 1.08,
              duration: 0.35,
              ease: "power2.out",
            });
          });
          btn.addEventListener("mouseleave", () => {
            gsap.to(num, { x: 0, color: "#5A5855", duration: 0.35 });
            gsap.to(iconRing, {
              scale: 1,
              duration: 0.4,
              ease: "elastic.out(1, 0.4)",
            });
          });
        });

        document
          .querySelectorAll<HTMLElement>(".faq-stat-num")
          .forEach((el) => {
            const target = parseFloat(el.dataset.target || "0");
            const suffix = el.dataset.suffix || "";
            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate() {
                el.textContent =
                  Math.floor(proxy.val).toLocaleString() + suffix;
              },
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reset",
              },
            });
          });

        return () => mm.revert();
      });

      mm.add("(max-width: 1023.9px)", () => {
        gsap.from([".faq-badge", ".faq-headline", ".faq-subtitle"], {
          y: 40,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.from(".faq-cta-link", {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-cta-wrap",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
        gsap.from(".faq-item-wrap", {
          y: 40,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        return () => mm.revert();
      });
    },
    { scope: sectionRef }
    // NO dependencies — runs exactly once on mount
  );

  // ── ACCORDION — plain useEffect, isolated from scroll hook ─────────────
  useEffect(() => {
    faqs.forEach((_, i) => {
      const answerEl = document.querySelector<HTMLElement>(`.faq-answer-${i}`);
      const lineEl = document.querySelector<HTMLElement>(`.faq-line-${i}`);
      const borderEl = document.querySelector<HTMLElement>(`.faq-item-${i}`);
      const isOpen = openIndex === i;

      if (answerEl) {
        if (isOpen) {
          gsap.set(answerEl, { display: "block" });
          gsap.fromTo(
            answerEl,
            { height: 0, opacity: 0 },
            {
              height: "auto",
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
              overwrite: true,
            }
          );
          const words = answerEl.querySelectorAll<HTMLElement>(".faq-word");
          if (words.length) {
            gsap.fromTo(
              words,
              { y: 14, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.012,
                ease: "power2.out",
                delay: 0.15,
              }
            );
          }
          if (lineEl) {
            gsap.fromTo(
              lineEl,
              { scaleY: 0, opacity: 0 },
              {
                scaleY: 1,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                transformOrigin: "top",
              }
            );
          }
        } else {
          gsap.to(answerEl, {
            height: 0,
            opacity: 0,
            duration: 0.38,
            ease: "power3.in",
            overwrite: true,
            // onComplete: () => gsap.set(answerEl, { display: "none" }),
          });
        }
      }

      if (borderEl) {
        gsap.to(borderEl, {
          borderBottomColor: isOpen
            ? "rgba(201,168,76,0.3)"
            : "rgba(30,30,34,1)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  }, [openIndex]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 md:py-32 lg:py-40 bg-[#0A0A0B] relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="faq-grid-bg absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="faqgrid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#faqgrid)" />
          </svg>
        </div>
        <div
          className="faq-orb-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(ellipse,rgba(201,168,76,0.18) 0%,transparent 65%)",
          }}
        />
        <div
          className="faq-orb-left absolute -top-20 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle,rgba(201,168,76,0.14) 0%,transparent 65%)",
          }}
        />
        {[
          { l: "6%", t: "18%" },
          { l: "18%", t: "72%" },
          { l: "78%", t: "12%" },
          { l: "88%", t: "58%" },
          { l: "45%", t: "88%" },
          { l: "62%", t: "35%" },
          { l: "92%", t: "82%" },
          { l: "32%", t: "22%" },
        ].map((p, i) => (
          <div
            key={i}
            className="faq-particle absolute rounded-full bg-[#C9A84C]"
            style={{
              left: p.l,
              top: p.t,
              width: 2.5,
              height: 2.5,
              opacity: 0.12,
            }}
          />
        ))}
        <svg className="absolute inset-0 w-full h-full">
          <line
            x1="0"
            y1="0"
            x2="30%"
            y2="100%"
            stroke="rgba(201,168,76,0.025)"
            strokeWidth="1"
          />
          <line
            x1="100%"
            y1="100%"
            x2="70%"
            y2="0"
            stroke="rgba(201,168,76,0.02)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="absolute top-0 inset-x-0 h-px overflow-hidden pointer-events-none">
        <div
          style={{
            height: "100%",
            background:
              "linear-gradient(90deg,transparent,rgba(201,168,76,0.22) 30%,rgba(201,168,76,0.38) 50%,rgba(201,168,76,0.22) 70%,transparent)",
          }}
        />
        <div
          className="faq-top-shimmer absolute inset-y-0 w-1/4"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 xl:gap-28 items-start">
          <div
            ref={leftRef}
            className="lg:sticky lg:top-24 space-y-10 lg:space-y-12"
          >
            <div
              className="faq-side-line hidden lg:block absolute left-0 top-0 w-px h-24 origin-top"
              style={{
                background:
                  "linear-gradient(to bottom,rgba(201,168,76,0.5),transparent)",
              }}
            />
            <div className="space-y-6">
              <div className="faq-badge inline-flex items-center gap-2.5 border border-[#C9A84C]/25 rounded-full px-5 py-2 bg-[#C9A84C]/6">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                <span className="text-xs font-sans font-medium text-[#C9A84C] tracking-[0.18em] uppercase">
                  FAQ
                </span>
              </div>
              <h2
                className="faq-headline font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[#F0EDE8]"
                style={{ fontFamily: "'Cormorant Garamond',serif" }}
              >
                Questions
                <br />
                we <span className="italic text-[#C9A84C]">always</span>
                <br />
                hear.
              </h2>
              <p className="faq-subtitle font-sans font-light text-[#9E9B95] text-lg leading-relaxed max-w-md">
                Can&apos;t find what you&apos;re looking for? Our support team
                is available 24/7 — usually responds in under 2 minutes.
              </p>
            </div>

            <div className="flex items-center gap-6">
              {[
                {
                  target: "2",
                  suffix: "min",
                  label: "avg response",
                  val: "2min",
                  gold: false,
                },
                {
                  target: "24",
                  suffix: "/7",
                  label: "availability",
                  val: "24/7",
                  gold: false,
                },
                {
                  target: "99",
                  suffix: "%",
                  label: "satisfaction",
                  val: "99%",
                  gold: true,
                },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-8 bg-[#1E1E22]" />}
                  <div className="space-y-0.5">
                    <p
                      className={`font-serif text-2xl ${
                        s.gold ? "text-[#C9A84C]" : "text-[#F0EDE8]"
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}
                    >
                      <span
                        className="faq-stat-num"
                        data-target={s.target}
                        data-suffix={s.suffix}
                      >
                        {s.val}
                      </span>
                    </p>
                    <p className="text-[10px] text-[#5A5855] uppercase tracking-wider">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-cta-wrap flex flex-col gap-4">
              <a
                href="#"
                className="faq-cta-link inline-flex items-center gap-3 group w-fit"
              >
                <div className="w-10 h-10 rounded-full border border-[#2A2A2E] flex items-center justify-center group-hover:border-[#C9A84C]/50 group-hover:bg-[#C9A84C]/5 transition-all duration-300">
                  <svg
                    viewBox="0 0 14 14"
                    className="w-4 h-4 fill-[#9E9B95] group-hover:fill-[#C9A84C] transition-colors"
                  >
                    <path d="M7 1C3.686 1 1 3.686 1 7s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6Zm0 2.667a1.333 1.333 0 1 1 0 2.666A1.333 1.333 0 0 1 7 3.667ZM7 11a4 4 0 0 1-2.667-1.003C4.333 8.6 6.04 8 7 8c.96 0 2.667.6 2.667 1.997A4 4 0 0 1 7 11Z" />
                  </svg>
                </div>
                <span className="font-sans text-base text-[#9E9B95] group-hover:text-[#F0EDE8] transition-colors duration-200">
                  Talk to support
                </span>
              </a>
              <a
                href="#"
                className="faq-cta-link inline-flex items-center gap-3 group w-fit"
              >
                <div className="w-10 h-10 rounded-full border border-[#2A2A2E] flex items-center justify-center group-hover:border-[#C9A84C]/50 group-hover:bg-[#C9A84C]/5 transition-all duration-300">
                  <svg
                    viewBox="0 0 14 14"
                    className="w-4 h-4 stroke-[#9E9B95] group-hover:stroke-[#C9A84C] transition-colors"
                    fill="none"
                  >
                    <path
                      d="M1 7h12M7 1l6 6-6 6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-sans text-base text-[#9E9B95] group-hover:text-[#F0EDE8] transition-colors duration-200">
                  Browse help centre
                </span>
              </a>
            </div>
          </div>

          <div ref={rightRef} className="space-y-0">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`faq-item-wrap faq-item-${i} border-b ${
                    i === 0 ? "border-t border-t-[#1E1E22]" : ""
                  }`}
                  style={{
                    borderBottomColor: isOpen
                      ? "rgba(201,168,76,0.28)"
                      : "rgba(30,30,34,1)",
                  }}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="faq-btn w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left group"
                  >
                    <div className="flex items-start gap-4 md:gap-5 flex-1 min-w-0">
                      <span
                        className="faq-num font-sans text-xs md:text-sm text-[#5A5855] mt-2 flex-shrink-0 w-6 tabular-nums"
                        style={{ transition: "none" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="space-y-2 flex-1 min-w-0">
                        <p
                          className={`font-serif text-lg md:text-xl lg:text-2xl leading-tight transition-colors duration-300 ${
                            isOpen
                              ? "text-[#C9A84C]"
                              : "text-[#F0EDE8] group-hover:text-[#E8C97A]"
                          }`}
                          style={{ fontFamily: "'Cormorant Garamond',serif" }}
                        >
                          {faq.question}
                        </p>
                        <span
                          className={`inline-block font-sans text-xs uppercase tracking-wider px-3 py-1 rounded-full border transition-all duration-400 ${
                            isOpen
                              ? "opacity-0 translate-y-3 scale-95 pointer-events-none"
                              : "opacity-100 translate-y-0 scale-100 border-[#2A2A2E] text-[#5A5855]"
                          }`}
                        >
                          {faq.tag}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`faq-icon-ring flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center mt-1.5 transition-all duration-400 ${
                        isOpen
                          ? "border-[#C9A84C]/60 bg-[#C9A84C]/10 text-[#C9A84C]"
                          : "border-[#2A2A2E] text-[#5A5855] group-hover:border-[#C9A84C]/40 group-hover:text-[#C9A84C]"
                      }`}
                    >
                      <div
                        className="transition-transform duration-400"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                          <Plus className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                      </div>
                    </div>
                  </button>

                  <div
                    className={`faq-answer-${i} overflow-hidden`}
                    style={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                      display: isOpen ? "block" : "none",
                    }}
                  >
                    <div className="pl-9 md:pl-11 pb-8 md:pb-10 pr-4">
                      <div className="flex gap-5">
                        <div
                          className={`faq-line-${i} w-px flex-shrink-0 origin-top`}
                          style={{
                            background:
                              "linear-gradient(to bottom,rgba(201,168,76,0.6),rgba(201,168,76,0.15),transparent)",
                            transform: "scaleY(0)",
                            opacity: 0,
                          }}
                        />
                        <p
                          className="font-sans font-light text-base md:text-lg text-[#9E9B95] leading-[1.85]"
                          dangerouslySetInnerHTML={{
                            __html: faq.answer
                              .split(" ")
                              .map(
                                (w) =>
                                  `<span class="faq-word inline-block mr-[0.28em]">${w}</span>`
                              )
                              .join(""),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#C9A84C]/20 to-transparent" />
              <p className="font-sans text-xs text-[#3A3A3E]">
                {faqs.length} questions answered
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
