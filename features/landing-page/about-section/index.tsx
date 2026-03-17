export function AboutSection() {
  const savingsGoals = [
    { label: "Emergency Fund", current: 8400, target: 10000, pct: 84 },
    { label: "Vacation", current: 2100, target: 3000, pct: 70 },
    { label: "New Car", current: 1500, target: 8000, pct: 19 },
  ];

  const circumference = 2 * Math.PI * 54; // r=54

  return (
    <section className="w-full py-24 md:py-36 bg-[#0A0A0B] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-[#C9A84C]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Header ── */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20 items-end">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 border border-[#2A2A2E] rounded-full px-4 py-1.5">
              <span className="text-xs font-sans font-medium text-[#9E9B95] tracking-[0.15em] uppercase">
                About Ascone
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-[#F0EDE8]">
              One platform.
              <br />
              Every money <span className="italic text-[#C9A84C]">move.</span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="text-[#9E9B95] text-lg font-sans font-light leading-relaxed max-w-md">
              Remove every barrier between you and your financial goals —
              savings, investments, and global transfers, all unified in one
              seamless experience.
            </p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-[#C9A84C]/20 via-[#C9A84C]/5 to-transparent" />
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* ══════════════════════════════════
              CARD 1 — Grow Savings
              Ring progress + goal tracker
          ══════════════════════════════════ */}
          <div className="bg-[#111113] border border-[#2A2A2E] rounded-3xl p-8 min-h-[480px] flex flex-col justify-between group hover:border-[#C9A84C]/25 transition-all duration-500 overflow-hidden relative">
            {/* Corner dot grid */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04]">
              <svg
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {Array.from({ length: 6 }).map((_, row) =>
                  Array.from({ length: 6 }).map((_, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={10 + col * 22}
                      cy={10 + row * 22}
                      r="1.5"
                      fill="#C9A84C"
                    />
                  ))
                )}
              </svg>
            </div>

            {/* Header text */}
            <div>
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-serif text-3xl md:text-4xl text-[#F0EDE8] leading-tight">
                  Grow savings
                  <br />
                  <span className="italic text-[#C9A84C]">faster.</span>
                </h3>
                <span className="font-sans text-xs text-[#5A5855] border border-[#2A2A2E] rounded-full px-3 py-1 mt-1">
                  Smart Goals
                </span>
              </div>
              <p className="text-[#5A5855] font-sans text-sm mt-3 max-w-xs leading-relaxed">
                AI-powered goals that adapt to your income patterns in real
                time.
              </p>
            </div>

            {/* Ring + balance */}
            <div className="flex items-center gap-8 my-4">
              {/* SVG ring */}
              <div className="relative flex-shrink-0 w-32 h-32">
                <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
                  {/* Track */}
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="#1A1A1E"
                    strokeWidth="8"
                  />
                  {/* Progress — 84% */}
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - 0.84)}
                    opacity="0.9"
                  />
                  {/* Secondary ring — inner */}
                  <circle
                    cx="64"
                    cy="64"
                    r="42"
                    fill="none"
                    stroke="#1A1A1E"
                    strokeWidth="4"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="42"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - 0.7)}
                    opacity="0.35"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-2xl text-[#F0EDE8]">
                    84%
                  </span>
                  <span className="font-sans text-[9px] text-[#5A5855] uppercase tracking-wider">
                    overall
                  </span>
                </div>
              </div>

              {/* Right of ring */}
              <div className="space-y-1.5 flex-1">
                <div>
                  <p className="font-sans text-[10px] text-[#5A5855] uppercase tracking-widest">
                    Total saved
                  </p>
                  <p className="font-serif text-3xl text-[#F0EDE8] leading-tight">
                    $12,000
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3 text-emerald-400 fill-current"
                    >
                      <path d="M6 1L11 10H1L6 1Z" />
                    </svg>
                    <span className="font-sans text-xs text-emerald-400">
                      +24.5% this year
                    </span>
                  </div>
                </div>
                <div className="h-px bg-[#2A2A2E] my-2" />
                <p className="font-sans text-[10px] text-[#5A5855]">
                  Target: $14,300
                </p>
                <p className="font-sans text-[10px] text-[#9E9B95]">
                  On track to reach goal by{" "}
                  <span className="text-[#C9A84C]">Mar 2026</span>
                </p>
              </div>
            </div>

            {/* Goal tracker */}
            <div className="space-y-3 border-t border-[#1A1A1E] pt-5">
              {savingsGoals.map(({ label, current, target, pct }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-[#9E9B95]">
                      {label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[10px] text-[#5A5855]">
                        ${current.toLocaleString()} / ${target.toLocaleString()}
                      </span>
                      <span className="font-sans text-[10px] text-[#C9A84C] font-medium">
                        {pct}%
                      </span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1 bg-[#1A1A1E] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, rgba(201,168,76,0.5), #C9A84C)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════
              CARD 2 — Send Globally
              Transfer UI with rate display
          ══════════════════════════════════ */}
          <div className="bg-[#111113] border border-[#2A2A2E] rounded-3xl p-8 min-h-[480px] flex flex-col justify-between group hover:border-[#C9A84C]/25 transition-all duration-500 overflow-hidden relative">
            {/* Background world grid lines */}
            <div className="absolute inset-0 opacity-[0.03]">
              <svg
                viewBox="0 0 400 480"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
              >
                <ellipse
                  cx="200"
                  cy="240"
                  rx="180"
                  ry="200"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.5"
                />
                <ellipse
                  cx="200"
                  cy="240"
                  rx="120"
                  ry="200"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.5"
                />
                <ellipse
                  cx="200"
                  cy="240"
                  rx="60"
                  ry="200"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="0.5"
                />
                <line
                  x1="20"
                  y1="240"
                  x2="380"
                  y2="240"
                  stroke="#C9A84C"
                  strokeWidth="0.5"
                />
                <line
                  x1="20"
                  y1="160"
                  x2="380"
                  y2="160"
                  stroke="#C9A84C"
                  strokeWidth="0.5"
                />
                <line
                  x1="20"
                  y1="320"
                  x2="380"
                  y2="320"
                  stroke="#C9A84C"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-serif text-3xl md:text-4xl text-[#F0EDE8] leading-tight">
                  Send across
                  <br />
                  <span className="italic text-[#C9A84C]">the globe.</span>
                </h3>
                <span className="font-sans text-xs text-[#5A5855] border border-[#2A2A2E] rounded-full px-3 py-1 mt-1">
                  180+ Countries
                </span>
              </div>
              <p className="text-[#5A5855] font-sans text-sm mt-3 max-w-xs leading-relaxed">
                Real mid-market rates. Zero hidden fees. Settles in seconds.
              </p>
            </div>

            {/* Transfer UI */}
            <div className="relative my-2">
              {/* From */}
              <div className="bg-[#0A0A0B] border border-[#2A2A2E] rounded-2xl p-4 mb-1.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-widest">
                    You send
                  </span>
                  <div className="flex items-center gap-1.5 bg-[#1A1A1E] border border-[#2A2A2E] rounded-full px-2.5 py-1">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-red-500" />
                    <span className="font-sans text-xs text-[#F0EDE8]">
                      USD
                    </span>
                    <svg
                      viewBox="0 0 10 10"
                      className="w-2.5 h-2.5 fill-[#5A5855]"
                    >
                      <path
                        d="M2 3.5L5 6.5L8 3.5"
                        stroke="#5A5855"
                        strokeWidth="1.2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <p className="font-serif text-3xl text-[#F0EDE8]">
                  25,000<span className="text-[#5A5855] text-lg">.00</span>
                </p>
              </div>

              {/* Connector */}
              <div className="flex items-center justify-center relative h-8">
                <div className="absolute inset-x-0 top-1/2 h-px bg-[#1A1A1E]" />
                <div className="relative z-10 w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center shadow-[0_0_16px_#C9A84C40]">
                  <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none">
                    <path
                      d="M7 2v10M3 8l4 4 4-4"
                      stroke="#0A0A0B"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* To */}
              <div className="bg-[#C9A84C]/6 border border-[#C9A84C]/20 rounded-2xl p-4 mt-1.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-[10px] text-[#C9A84C]/60 uppercase tracking-widest">
                    They receive
                  </span>
                  <div className="flex items-center gap-1.5 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-2.5 py-1">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-600 to-white" />
                    <span className="font-sans text-xs text-[#C9A84C]">
                      GBP
                    </span>
                    <svg viewBox="0 0 10 10" className="w-2.5 h-2.5">
                      <path
                        d="M2 3.5L5 6.5L8 3.5"
                        stroke="#C9A84C"
                        strokeWidth="1.2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <p className="font-serif text-3xl text-[#C9A84C]">
                  19,682<span className="text-[#C9A84C]/40 text-lg">.50</span>
                </p>
              </div>
            </div>

            {/* Rate details row */}
            <div className="border-t border-[#1A1A1E] pt-5 space-y-3">
              {[
                { label: "Mid-market rate", value: "1 USD = 0.787 GBP" },
                { label: "Transfer fee", value: "— Zero" },
                { label: "Arrival estimate", value: "< 30 seconds" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-sans text-xs text-[#5A5855]">
                    {label}
                  </span>
                  <span
                    className={`font-sans text-xs font-medium ${
                      value.includes("Zero")
                        ? "text-emerald-400"
                        : value.includes("second")
                        ? "text-[#C9A84C]"
                        : "text-[#9E9B95]"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom strip — 3 micro stats ── */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            {
              stat: "$4.2B+",
              sub: "transferred globally",
              sup: "This quarter",
            },
            {
              stat: "0.3s",
              sub: "average settlement time",
              sup: "Real-time rails",
            },
            { stat: "99.98%", sub: "platform uptime", sup: "Last 12 months" },
          ].map(({ stat, sub, sup }) => (
            <div
              key={stat}
              className="bg-[#111113] border border-[#2A2A2E] rounded-2xl px-6 py-5 flex flex-col gap-1 hover:border-[#C9A84C]/20 transition-colors duration-300"
            >
              <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-[0.15em]">
                {sup}
              </span>
              <span className="font-serif text-2xl md:text-3xl text-[#F0EDE8]">
                {stat}
              </span>
              <span className="font-sans text-xs text-[#9E9B95]">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
