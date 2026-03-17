export function NumbersSection() {
  const metrics = [
    {
      value: "$14B",
      label: "Funds & syndicated capital",
      sub: "Under management",
      pct: 92,
      trend: "+34% YoY",
      up: true,
    },
    {
      value: "23k+",
      label: "Active startups funded",
      sub: "Via our platform",
      pct: 78,
      trend: "+18% YoY",
      up: true,
    },
    {
      value: "180+",
      label: "Countries supported",
      sub: "Global reach",
      pct: 94,
      trend: "Expanding",
      up: true,
    },
    {
      value: "99.98%",
      label: "Platform uptime",
      sub: "Last 12 months",
      pct: 99,
      trend: "SLA guaranteed",
      up: true,
    },
  ];

  const miniChart = [28, 42, 35, 58, 52, 71, 65, 84, 78, 92, 88, 100];

  return (
    <section className="w-full py-24 md:py-36 bg-[#0D0D0F] relative overflow-hidden">
      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 opacity-[0.022]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="numgrid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#numgrid)" />
        </svg>
      </div>

      {/* Gold orb top-left */}
      <div
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.09) 0%, transparent 65%)",
        }}
      />
      {/* Dim orb bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(201,168,76,0.05) 0%, transparent 65%)",
        }}
      />

      {/* Top hairline */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 40%, rgba(201,168,76,0.3) 60%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 bg-[#C9A84C]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-xs font-sans font-medium text-[#C9A84C] tracking-[0.15em] uppercase">
                By the Numbers
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-[#F0EDE8]">
              The scale of
              <br />
              what we <span className="italic text-[#C9A84C]">build.</span>
            </h2>
          </div>
          <p className="font-sans font-light text-[#9E9B95] text-base leading-relaxed max-w-xs md:text-right">
            Ascone connects ambitious investors, growing startups, and
            forward-thinking institutions into a single capital network.
          </p>
        </div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5">
          {/* LEFT — Hero stat + chart card */}
          <div className="flex flex-col gap-5">
            {/* Primary hero stat */}
            <div
              className="relative rounded-3xl p-8 md:p-10 overflow-hidden border border-[#1E1E22] hover:border-[#C9A84C]/20 transition-colors duration-500"
              style={{
                background:
                  "linear-gradient(145deg, #141416 0%, #111113 60%, #0F0F11 100%)",
              }}
            >
              {/* Inner top-right glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.09) 0%, transparent 65%)",
                }}
              />

              {/* Ticker label */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-[0.2em]">
                  Capital Under Management
                </span>
                <div className="flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-sans text-[10px] text-emerald-400 font-medium">
                    +34% YoY
                  </span>
                </div>
              </div>

              {/* Giant number */}
              <p className="font-serif text-[5rem] md:text-[6.5rem] lg:text-[8rem] leading-none text-[#F0EDE8] mb-2">
                $14B
              </p>
              <p className="font-sans font-light text-[#9E9B95] text-base mb-10">
                In funds and syndicated capital managed across 180+ countries.
              </p>

              {/* Mini area chart */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-widest">
                    12-month growth
                  </span>
                  <span className="font-sans text-[10px] text-[#C9A84C]">
                    Jan — Dec 2024
                  </span>
                </div>
                <div className="h-16 w-full relative">
                  <svg
                    viewBox="0 0 300 64"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#C9A84C"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#C9A84C"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    {/* Area */}
                    <polygon
                      points={`0,${64 - (miniChart[0] / 100) * 56} ${miniChart
                        .map(
                          (v, i) =>
                            `${(i / (miniChart.length - 1)) * 300},${
                              64 - (v / 100) * 56
                            }`
                        )
                        .join(" ")} 300,64 0,64`}
                      fill="url(#areaGrad)"
                    />
                    {/* Line */}
                    <polyline
                      points={miniChart
                        .map(
                          (v, i) =>
                            `${(i / (miniChart.length - 1)) * 300},${
                              64 - (v / 100) * 56
                            }`
                        )
                        .join(" ")}
                      fill="none"
                      stroke="#C9A84C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* End dot */}
                    <circle
                      cx="300"
                      cy={64 - (miniChart[miniChart.length - 1] / 100) * 56}
                      r="3"
                      fill="#C9A84C"
                    />
                    <circle
                      cx="300"
                      cy={64 - (miniChart[miniChart.length - 1] / 100) * 56}
                      r="6"
                      fill="#C9A84C"
                      fillOpacity="0.2"
                    />
                  </svg>
                  {/* Month labels */}
                  <div className="flex justify-between mt-1">
                    {[
                      "J",
                      "F",
                      "M",
                      "A",
                      "M",
                      "J",
                      "J",
                      "A",
                      "S",
                      "O",
                      "N",
                      "D",
                    ].map((m, i) => (
                      <span
                        key={i}
                        className="font-sans text-[9px] text-[#3A3A3E]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Second stat card — startups */}
            <div
              className="relative rounded-3xl p-7 overflow-hidden border border-[#C9A84C]/15 hover:border-[#C9A84C]/30 transition-colors duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(201,168,76,0.02) 50%, transparent 100%)",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-[0.2em]">
                    Startups funded
                  </span>
                  <p className="font-serif text-5xl md:text-6xl text-[#C9A84C] leading-tight mt-2">
                    23k+
                  </p>
                  <p className="font-sans font-light text-[#9E9B95] text-sm mt-2">
                    Active via our platform
                  </p>
                </div>

                {/* Stacked bar mini viz */}
                <div className="flex items-end gap-1 h-14 mt-1">
                  {[40, 55, 48, 70, 62, 80, 75, 92].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 7
                            ? "#C9A84C"
                            : `rgba(201,168,76,${0.08 + i * 0.04})`,
                        border:
                          i === 7
                            ? "1px solid rgba(201,168,76,0.6)"
                            : "1px solid rgba(201,168,76,0.1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Sector tags */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {[
                  "Fintech",
                  "SaaS",
                  "HealthTech",
                  "DeepTech",
                  "CleanEnergy",
                  "Web3",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-[10px] text-[#9E9B95] border border-[#2A2A2E] rounded-full px-2.5 py-1 bg-[#0A0A0B]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Metric table + 2 stat cards */}
          <div className="flex flex-col gap-5">
            {/* Metric rows */}
            <div
              className="rounded-3xl overflow-hidden border border-[#1E1E22] hover:border-[#C9A84C]/15 transition-colors duration-500"
              style={{
                background: "linear-gradient(145deg, #131315 0%, #111113 100%)",
              }}
            >
              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-7 py-4 border-b border-[#1A1A1E]">
                <span className="font-sans text-[10px] text-[#3A3A3E] uppercase tracking-widest">
                  Metric
                </span>
                <span className="font-sans text-[10px] text-[#3A3A3E] uppercase tracking-widest">
                  Progress
                </span>
                <span className="font-sans text-[10px] text-[#3A3A3E] uppercase tracking-widest text-right">
                  Trend
                </span>
              </div>

              {/* Metric rows */}
              {metrics.map(({ value, label, sub, pct, trend, up }, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_140px_80px] items-center gap-4 px-7 py-5 group hover:bg-[#C9A84C]/3 transition-colors duration-200 ${
                    i < metrics.length - 1 ? "border-b border-[#141416]" : ""
                  }`}
                >
                  {/* Label */}
                  <div>
                    <p className="font-serif text-xl text-[#F0EDE8] leading-tight group-hover:text-[#C9A84C] transition-colors duration-200">
                      {value}
                    </p>
                    <p className="font-sans text-xs text-[#9E9B95] mt-0.5">
                      {label}
                    </p>
                    <p className="font-sans text-[10px] text-[#5A5855]">
                      {sub}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="h-1 bg-[#1A1A1E] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background:
                            "linear-gradient(90deg, rgba(201,168,76,0.4), #C9A84C)",
                        }}
                      />
                    </div>
                    <p className="font-sans text-[10px] text-[#5A5855] tabular-nums">
                      {pct}% index
                    </p>
                  </div>

                  {/* Trend */}
                  <div className="flex items-center justify-end gap-1">
                    <span
                      className={`font-sans text-[10px] font-medium text-right ${
                        up ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Two small cards — row */}
            <div className="grid grid-cols-2 gap-5">
              {/* Avg deal size */}
              <div
                className="rounded-3xl p-6 border border-[#1E1E22] hover:border-[#C9A84C]/20 transition-colors duration-500 flex flex-col justify-between"
                style={{
                  background: "linear-gradient(145deg, #131315, #111113)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-widest">
                    Avg Deal
                  </span>
                  {/* Mini ring */}
                  <svg viewBox="0 0 32 32" className="w-8 h-8 -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      fill="none"
                      stroke="#1A1A1E"
                      strokeWidth="3"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      fill="none"
                      stroke="#C9A84C"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 13}
                      strokeDashoffset={2 * Math.PI * 13 * (1 - 0.68)}
                      opacity="0.8"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-serif text-3xl text-[#F0EDE8] leading-none">
                    $608k
                  </p>
                  <p className="font-sans text-xs text-[#9E9B95] mt-1.5">
                    Per syndication
                  </p>
                  <p className="font-sans text-[10px] text-emerald-400 mt-1">
                    ↑ 12% vs last quarter
                  </p>
                </div>
              </div>

              {/* Investor network */}
              <div
                className="rounded-3xl p-6 border border-[#1E1E22] hover:border-[#C9A84C]/20 transition-colors duration-500 flex flex-col justify-between"
                style={{
                  background: "linear-gradient(145deg, #131315, #111113)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-widest">
                    Network
                  </span>
                  {/* Dot cluster */}
                  <div className="relative w-8 h-8">
                    {[
                      { x: "0", y: "0", s: "w-2.5 h-2.5", o: "bg-[#C9A84C]" },
                      { x: "14px", y: "0", s: "w-2 h-2", o: "bg-[#C9A84C]/50" },
                      {
                        x: "4px",
                        y: "14px",
                        s: "w-2 h-2",
                        o: "bg-[#C9A84C]/30",
                      },
                      {
                        x: "18px",
                        y: "12px",
                        s: "w-1.5 h-1.5",
                        o: "bg-[#C9A84C]/20",
                      },
                    ].map((dot, i) => (
                      <span
                        key={i}
                        className={`absolute rounded-full ${dot.s} ${dot.o}`}
                        style={{ left: dot.x, top: dot.y }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-serif text-3xl text-[#F0EDE8] leading-none">
                    4,800+
                  </p>
                  <p className="font-sans text-xs text-[#9E9B95] mt-1.5">
                    Verified investors
                  </p>
                  <p className="font-sans text-[10px] text-emerald-400 mt-1">
                    ↑ 22% this year
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom quote card */}
            <div
              className="rounded-3xl p-7 border border-[#C9A84C]/12 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,168,76,0.05) 0%, rgba(201,168,76,0.02) 50%, transparent 100%)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.08) 0%, transparent 65%)",
                }}
              />
              {/* Quote mark */}
              <p className="font-serif text-5xl text-[#C9A84C]/20 leading-none mb-3 select-none">
                &quot;
              </p>
              <p className="font-serif text-lg text-[#F0EDE8] leading-snug mb-5 relative z-10">
                Building the infrastructure for the next generation of private
                capital markets.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/20 flex items-center justify-center">
                    <span className="font-serif text-xs text-[#C9A84C]">A</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-[#F0EDE8] font-medium">
                      Ascone Team
                    </p>
                    <p className="font-sans text-[10px] text-[#5A5855]">
                      Vision & Strategy
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-px w-8 bg-[#C9A84C]/30" />
                  <span className="font-sans text-[10px] text-[#5A5855] uppercase tracking-widest">
                    2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
