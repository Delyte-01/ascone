"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(pct);
      setVisible(scrollTop > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG ring math
  const size = 44;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed bottom-8 right-8 z-50 group
        transition-all duration-500 ease-in-out
        ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      {/* Outer glow */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: "0 0 24px rgba(201,168,76,0.35)",
          borderRadius: "50%",
        }}
      />

      {/* SVG ring progress + button face */}
      <span className="relative flex items-center justify-center w-11 h-11">
        {/* Progress ring */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 -rotate-90"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(201,168,76,0.12)"
            strokeWidth="1.5"
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-150"
          />
        </svg>

        {/* Button face */}
        <span
          className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center
            bg-[#111113] border border-[#2A2A2E]
            group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C]
            transition-all duration-300"
        >
          <svg
            viewBox="0 0 14 14"
            className="w-3 h-3 text-[#9E9B95] group-hover:text-[#0A0A0B] transition-colors duration-300"
            fill="none"
          >
            <path
              d="M7 11V3M3 7l4-4 4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>

      {/* Percentage tooltip */}
      <span
        className="
          absolute -top-8 left-1/2 -translate-x-1/2
          font-sans text-[10px] text-[#C9A84C] tracking-wider
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200 whitespace-nowrap
          pointer-events-none
        "
      >
        {Math.round(progress)}%
      </span>
    </button>
  );
}
