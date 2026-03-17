"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="w-full py-24 md:py-36 bg-[#0A0A0B] relative overflow-hidden">
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.055) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 xl:gap-24 items-start">
          {/* ── LEFT — Sticky header ── */}
          <div className="lg:sticky lg:top-28 space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 bg-[#C9A84C]/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                <span className="text-xs font-sans font-medium text-[#C9A84C] tracking-[0.15em] uppercase">
                  FAQ
                </span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.04] text-[#F0EDE8]">
                Questions
                <br />
                we <span className="italic text-[#C9A84C]">always</span>
                <br />
                hear.
              </h2>

              <p className="font-sans font-light text-[#9E9B95] text-base leading-relaxed max-w-xs">
                Can&apos;t find what you&apos;re looking for? Our support team is
                available around the clock.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 w-fit group"
              >
                <div className="w-9 h-9 rounded-full border border-[#2A2A2E] flex items-center justify-center group-hover:border-[#C9A84C]/40 group-hover:bg-[#C9A84C]/5 transition-all duration-200">
                  <svg
                    viewBox="0 0 14 14"
                    className="w-3.5 h-3.5 fill-[#9E9B95] group-hover:fill-[#C9A84C] transition-colors"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 1C3.686 1 1 3.686 1 7s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6Zm0 2.667a1.333 1.333 0 1 1 0 2.666A1.333 1.333 0 0 1 7 3.667ZM7 11a4 4 0 0 1-2.667-1.003C4.333 8.6 6.04 8 7 8c.96 0 2.667.6 2.667 1.997A4 4 0 0 1 7 11Z" />
                  </svg>
                </div>
                <span className="font-sans text-sm text-[#9E9B95] group-hover:text-[#F0EDE8] transition-colors duration-200">
                  Talk to support
                </span>
              </a>

              <a
                href="#"
                className="inline-flex items-center gap-2.5 w-fit group"
              >
                <div className="w-9 h-9 rounded-full border border-[#2A2A2E] flex items-center justify-center group-hover:border-[#C9A84C]/40 group-hover:bg-[#C9A84C]/5 transition-all duration-200">
                  <svg
                    viewBox="0 0 14 14"
                    className="w-3.5 h-3.5 stroke-[#9E9B95] group-hover:stroke-[#C9A84C] transition-colors"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7h12M7 1l6 6-6 6"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-sans text-sm text-[#9E9B95] group-hover:text-[#F0EDE8] transition-colors duration-200">
                  Browse help centre
                </span>
              </a>
            </div>

            {/* Progress indicator */}
            <div className="hidden lg:flex items-center gap-3 pt-4">
              <div className="flex gap-1">
                {faqs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      openIndex === i ? "w-6 bg-[#C9A84C]" : "w-2 bg-[#2A2A2E]"
                    }`}
                  />
                ))}
              </div>
              <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-widest">
                {openIndex !== null ? `0${openIndex + 1}` : "—"} / 0
                {faqs.length}
              </span>
            </div>
          </div>

          {/* ── RIGHT — Custom accordion ── */}
          <div className="space-y-0">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`border-b transition-colors duration-300 ${
                    isOpen ? "border-[#C9A84C]/20" : "border-[#1E1E22]"
                  } ${i === 0 ? "border-t border-t-[#1E1E22]" : ""}`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                  >
                    {/* Question + tag */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Number */}
                      <span className="font-sans text-[11px] text-[#5A5855] mt-1.5 flex-shrink-0 w-5 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <p
                          className={`font-serif text-xl md:text-[1.35rem] leading-snug transition-colors duration-200 ${
                            isOpen
                              ? "text-[#C9A84C]"
                              : "text-[#F0EDE8] group-hover:text-[#E8C97A]"
                          }`}
                        >
                          {faq.question}
                        </p>
                        {/* Tag pill — only visible when closed */}
                        <span
                          className={`inline-block font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border transition-all duration-200 ${
                            isOpen
                              ? "opacity-0 translate-y-1"
                              : "opacity-100 translate-y-0 border-[#2A2A2E] text-[#5A5855]"
                          }`}
                        >
                          {faq.tag}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5 ${
                        isOpen
                          ? "border-[#C9A84C]/50 bg-[#C9A84C]/8 text-[#C9A84C] rotate-0"
                          : "border-[#2A2A2E] text-[#5A5855] group-hover:border-[#C9A84C]/30 group-hover:text-[#9E9B95]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {/* Answer panel */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    style={{ transitionDuration: "350ms" }}
                  >
                    <div className="pl-9 pb-7 pr-4">
                      {/* Gold accent line */}
                      <div className="flex gap-4">
                        <div className="w-px bg-gradient-to-b from-[#C9A84C]/40 to-transparent self-stretch flex-shrink-0" />
                        <p className="font-sans font-light text-base text-[#9E9B95] leading-[1.75]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2A2A2E] to-transparent" />
    </section>
  );
}
