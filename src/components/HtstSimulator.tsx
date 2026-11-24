import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Power, Snowflake, Flame, RotateCcw, Thermometer } from 'lucide-react';
import { Language } from '../types';
import { UI_COPY } from '../data/translations';
import { HTST_STAGES, SMART_DEVICE_PARTS } from '../data/paperData';

interface HtstSimulatorProps {
  lang: Language;
}

type SimPhase = 'idle' | 'heating' | 'holding' | 'shock' | 'done';

const HTST_STAGE_EMOJIS = ['🧼', '💧', '🥣', '🌡️', '🧊', '🧴'];

export const HtstSimulator: React.FC<HtstSimulatorProps> = ({ lang }) => {
  const t = UI_COPY[lang];
  const [selectedPartId, setSelectedPartId] = useState<number>(6);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(3);

  // Interactive Appliance State
  const [phase, setPhase] = useState<SimPhase>('idle');
  const [temp, setTemp] = useState<number>(26.0);
  const [holdSeconds, setHoldSeconds] = useState<number>(0);

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') return;

    const timer = window.setInterval(() => {
      if (phase === 'heating') {
        setTemp((prev) => {
          const next = +(prev + 3.2).toFixed(1);
          if (next >= 74.0) {
            setPhase('holding');
            setActiveStageIdx(3);
            return 74.0;
          }
          return next;
        });
      } else if (phase === 'holding') {
        setHoldSeconds((s) => {
          const next = s + 1;
          if (next >= 15) {
            return 15;
          }
          return next;
        });
      } else if (phase === 'shock') {
        setTemp((prev) => {
          const next = +(prev - 4.5).toFixed(1);
          if (next <= 26.0) {
            setPhase('done');
            setActiveStageIdx(5);
            return 26.0;
          }
          return next;
        });
      }
    }, 180);

    return () => window.clearInterval(timer);
  }, [phase]);

  const handleTogglePower = () => {
    if (phase === 'idle' || phase === 'done') {
      setTemp(26.0);
      setHoldSeconds(0);
      setActiveStageIdx(3);
      setPhase('heating');
    } else {
      setPhase('idle');
      setTemp(26.0);
      setHoldSeconds(0);
    }
  };

  const handleTriggerShock = () => {
    setActiveStageIdx(4);
    setPhase('shock');
  };

  const handleReset = () => {
    setPhase('idle');
    setTemp(26.0);
    setHoldSeconds(0);
    setActiveStageIdx(0);
  };

  const activePart =
    SMART_DEVICE_PARTS.find((p) => p.id === selectedPartId) || SMART_DEVICE_PARTS[5];
  const currentStage = HTST_STAGES[activeStageIdx];

  const isHot = temp >= 65;

  return (
    <section
      id="htst"
      className="behongca-lazy-section border-b border-[#DCE5DE] py-12 lg:py-16 dark:border-[#23332D]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="behongca-title-panel max-w-2xl">
            <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
              {t.sections.htstTitle}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#13201B] sm:text-3xl [text-wrap:balance] dark:text-[#EFF5F1]">
              {lang === 'id'
                ? 'Prototipe Alat BEHONGCA SMART & Simulasi HTST'
                : 'BEHONGCA SMART Device Prototype & HTST Simulator'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start">
            <button
              type="button"
              onClick={handleTogglePower}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                phase === 'idle' || phase === 'done'
                  ? 'bg-[#0D7A5F] text-white hover:bg-[#0A634D] dark:bg-[#10B981] dark:text-[#071510]'
                  : 'bg-[#DC2626] text-white hover:bg-[#B91C1C]'
              }`}
            >
              <Power className="h-3.5 w-3.5" />
              <span>
                {phase === 'idle' || phase === 'done'
                  ? lang === 'id'
                    ? 'Nyalakan Alat HTST'
                    : 'Start HTST Heater'
                  : lang === 'id'
                    ? 'Matikan Alat'
                    : 'Power Off'}
              </span>
            </button>

            {(phase === 'holding' || temp >= 70) && phase !== 'shock' && (
              <button
                type="button"
                onClick={handleTriggerShock}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0284C7] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0369A1] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Snowflake className="h-3.5 w-3.5" />
                <span>
                  {lang === 'id' ? 'Kejut Es (Thermal Shock)' : 'Ice-Bath Thermal Shock'}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset HTST simulator"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE5DE] bg-white text-[#44574F] hover:text-[#13201B] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#A9BDB3] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Main Prototype Split: Figure 2 BEHONGCA SMART Double-Boiler + Interactive 6-Stage Deck */}
        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Accurate Figure 2 Countertop Double-Boiler + Cutaway */}
          <div className="rounded-xl border border-[#DCE5DE] bg-white p-5 sm:p-6 lg:col-span-7 dark:border-[#23332D] dark:bg-[#141E1B]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE5DE] pb-3 dark:border-[#23332D]">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#13201B] dark:text-[#EFF5F1]">
                <Thermometer className="h-4 w-4 text-[#0D7A5F] dark:text-[#34D399]" />
                <span>
                  {lang === 'id'
                    ? 'GAMBAR 2 · SKEMA DOUBLE-BOILER BEHONGCA SMART'
                    : 'FIGURE 2 · BEHONGCA SMART DOUBLE-BOILER'}
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span
                  className={`font-bold ${
                    isHot
                      ? 'text-[#D97706] dark:text-[#FBBF24]'
                      : 'text-[#0D7A5F] dark:text-[#34D399]'
                  }`}
                >
                  {temp.toFixed(1)}°C
                </span>
                <span className="text-[#556960] dark:text-[#8CA398]">
                  {phase === 'idle' && (lang === 'id' ? 'Siap' : 'Standby')}
                  {phase === 'heating' && (lang === 'id' ? 'Memanaskan...' : 'Heating...')}
                  {phase === 'holding' &&
                    `HTST ${holdSeconds}s / 15–30s`}
                  {phase === 'shock' && (lang === 'id' ? 'Ice Bath...' : 'Cooling...')}
                  {phase === 'done' && (lang === 'id' ? 'Steril & Utuh ✓' : 'Pasteurized ✓')}
                </span>
              </div>
            </div>

            {/* Dual Unit + Cutaway SVG matching Proposal Page 19 */}
            <div className="mt-4">
              <svg
                viewBox="0 0 600 290"
                className="w-full"
                role="img"
                aria-label="BEHONGCA SMART Double-Boiler HTST Pasteurizer Schematic"
              >
                {/* LEFT UNIT: Exterior BEHONGCA SMART Device */}
                <g transform="translate(24, 18)">
                  {/* Lid */}
                  <ellipse
                    cx="105"
                    cy="48"
                    rx="76"
                    ry="14"
                    className="fill-[#94A3B8] stroke-[#475569] stroke-1.5 dark:fill-[#475569] dark:stroke-[#94A3B8]"
                  />
                  <rect
                    x="90"
                    y="26"
                    width="30"
                    height="14"
                    rx="5"
                    className="fill-[#334155] dark:fill-[#64748B]"
                  />
                  {/* Side Handles */}
                  <rect x="14" y="88" width="18" height="22" rx="4" className="fill-[#334155]" />
                  <rect x="178" y="88" width="18" height="22" rx="4" className="fill-[#334155]" />

                  {/* Brushed Steel Upper Collar */}
                  <rect
                    x="29"
                    y="52"
                    width="152"
                    height="56"
                    className="fill-[#CBD5E1] stroke-[#475569] stroke-1.5 dark:fill-[#334155] dark:stroke-[#64748B]"
                  />

                  {/* Signature Blue Housing */}
                  <rect
                    x="29"
                    y="108"
                    width="152"
                    height="120"
                    rx="6"
                    className="fill-[#0284C7] stroke-[#0369A1] stroke-1.5"
                  />
                  <text
                    x="105"
                    y="162"
                    textAnchor="middle"
                    className="fill-white font-display text-[15px] font-extrabold tracking-wide"
                  >
                    BEHONGCA
                  </text>
                  <text
                    x="105"
                    y="181"
                    textAnchor="middle"
                    className="fill-white/90 font-display text-[13px] font-bold tracking-widest"
                  >
                    SMART
                  </text>

                  {/* Digital Readout & Power Base */}
                  <rect x="40" y="228" width="130" height="24" rx="5" className="fill-[#1E293B]" />
                  <rect x="52" y="233" width="54" height="14" rx="3" className="fill-[#0D7A5F]" />
                  <text
                    x="79"
                    y="243"
                    textAnchor="middle"
                    className="fill-white font-mono text-[9px] font-bold"
                  >
                    {temp.toFixed(1)}°C
                  </text>
                  <circle
                    cx="148"
                    cy="240"
                    r="6"
                    onClick={handleTogglePower}
                    className={`cursor-pointer ${
                      phase === 'idle' || phase === 'done'
                        ? 'fill-[#94A3B8]'
                        : 'fill-[#22C55E]'
                    }`}
                  />
                </g>

                {/* Arrow from exterior unit to cross-section */}
                <path
                  d="M 238 145 L 268 145"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  className="text-[#0D7A5F] dark:text-[#34D399]"
                />

                {/* RIGHT UNIT: Interactive Cutaway Cross-Section (7 labeled parts) */}
                <g transform="translate(278, 18)">
                  {/* 1. Tutup Panci (Lid) */}
                  <path
                    d="M 46 48 Q 130 16 214 48 Z"
                    className="fill-[#CBD5E1] stroke-[#475569] stroke-1.5 dark:fill-[#475569] dark:stroke-[#94A3B8]"
                  />
                  <rect x="116" y="22" width="28" height="10" rx="4" className="fill-[#0D7A5F]" />

                  {/* 2. Kupingan Panci (Handles) */}
                  <rect x="14" y="78" width="24" height="16" rx="4" className="fill-[#334155]" />
                  <rect x="222" y="78" width="24" height="16" rx="4" className="fill-[#334155]" />

                  {/* 3. Panci Luar (Outer Water-Bath Bain-Marie Jacket) */}
                  <rect
                    x="38"
                    y="52"
                    width="184"
                    height="150"
                    rx="10"
                    className="fill-[#BAE6FD]/60 stroke-[#0284C7] stroke-2 dark:fill-[#0C4A6E]/55 dark:stroke-[#38BDF8]"
                  />

                  {/* 4. Panci Dalam (Inner Pot holding BEHONGCA herbal extract) */}
                  <rect
                    x="64"
                    y="66"
                    width="132"
                    height="112"
                    rx="6"
                    className="fill-[#F7FAF8] stroke-[#475569] stroke-1.5 dark:fill-[#141E1B] dark:stroke-[#94A3B8]"
                  />

                  {/* Herbal Extract Liquid inside Inner Pot */}
                  <rect
                    x="68"
                    y="102"
                    width="124"
                    height="72"
                    rx="4"
                    className={
                      phase === 'shock'
                        ? 'fill-[#38BDF8]/40 transition-colors'
                        : 'fill-[#65A30D]/45 transition-colors'
                    }
                  />

                  {/* Animated steam / bubbles when heating */}
                  {isHot && (
                    <motion.g
                      animate={{ y: [-2, -8, -2], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.4 }}
                    >
                      <circle cx="102" cy="90" r="3" className="fill-[#D97706]" />
                      <circle cx="130" cy="84" r="4" className="fill-[#0D7A5F]" />
                      <circle cx="158" cy="91" r="3" className="fill-[#D97706]" />
                    </motion.g>
                  )}

                  <text
                    x="130"
                    y="142"
                    textAnchor="middle"
                    className="fill-[#13201B] dark:fill-[#EFF5F1] font-mono text-[12px] font-bold"
                  >
                    {temp.toFixed(1)}°C
                  </text>

                  {/* 5. Lempeng Pemanas (Heating Plate) */}
                  <rect
                    x="46"
                    y="202"
                    width="168"
                    height="12"
                    rx="3"
                    className={
                      phase === 'heating' || phase === 'holding'
                        ? 'fill-[#EA580C]'
                        : 'fill-[#94A3B8]'
                    }
                  />

                  {/* Base Control Housing: 6. Termostat & 7. Tombol ON/OFF */}
                  <rect x="34" y="214" width="192" height="38" rx="7" className="fill-[#1E293B]" />
                  <rect x="132" y="223" width="46" height="20" rx="3" className="fill-[#0D7A5F]" />
                  <text
                    x="155"
                    y="237"
                    textAnchor="middle"
                    className="fill-white font-mono text-[9px] font-bold"
                  >
                    72–75°C
                  </text>
                  <circle
                    cx="198"
                    cy="233"
                    r="7"
                    onClick={handleTogglePower}
                    className="behongca-svg-hotspot cursor-pointer fill-[#EF4444]"
                  />

                  {/* 7 Clickable Numbered Hotspot Pins */}
                  {[
                    { id: 1, x: 130, y: 27 },
                    { id: 2, x: 24, y: 86 },
                    { id: 3, x: 208, y: 120 },
                    { id: 4, x: 130, y: 118 },
                    { id: 5, x: 100, y: 208 },
                    { id: 6, x: 155, y: 233 },
                    { id: 7, x: 198, y: 233 },
                  ].map((pin) => {
                    const active = pin.id === selectedPartId;
                    return (
                      <g
                        key={pin.id}
                        onClick={() => setSelectedPartId(pin.id)}
                        className="behongca-svg-hotspot cursor-pointer"
                      >
                        <circle
                          cx={pin.x}
                          cy={pin.y}
                          r={active ? 13 : 10}
                          className={
                            active
                              ? 'fill-[#D97706] stroke-white stroke-2'
                              : 'fill-[#0D7A5F] stroke-white stroke-1.5'
                          }
                        />
                        <text
                          x={pin.x}
                          y={pin.y + 4}
                          textAnchor="middle"
                          className="fill-white font-mono text-[10px] font-bold"
                        >
                          {pin.id}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Active Component Spotlight */}
            <div className="mt-3 rounded-lg border border-[#DCE5DE] bg-[#F7FAF8] p-4 dark:border-[#23332D] dark:bg-[#0F1714]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[#0D7A5F] dark:text-[#34D399]">
                  0{activePart.id}. {activePart.indonesianName} ({activePart.englishName})
                </span>
                <div className="flex flex-wrap gap-1">
                  {SMART_DEVICE_PARTS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPartId(p.id)}
                      className={`h-6 w-6 rounded border font-mono text-[11px] font-bold cursor-pointer ${
                        p.id === selectedPartId
                          ? 'border-[#0D7A5F] bg-[#0D7A5F] text-white dark:border-[#34D399] dark:bg-[#0D4A3A] dark:text-white'
                          : 'border-[#DCE5DE] bg-white text-[#44574F] hover:border-[#0D7A5F]/50 dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#A9BDB3] dark:hover:border-[#34D399]/60 dark:hover:text-white'
                      }`}
                    >
                      {p.id}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#31423B] dark:text-[#C5D5CD]">
                {activePart.functionDesc[lang]}
              </p>
            </div>
          </div>

          {/* Right: Compact 6-Stage HTST Stepper + Bioactive Preservation Meters */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            <div className="rounded-xl border border-[#DCE5DE] bg-white p-5 dark:border-[#23332D] dark:bg-[#141E1B]">
              <p className="font-mono text-xs font-semibold text-[#556960] dark:text-[#8CA398]">
                {lang === 'id' ? '6 TAHAP PRODUKSI HTST' : '6-STAGE HTST WORKFLOW'}
              </p>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {HTST_STAGES.map((stage, idx) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStageIdx(idx)}
                    className={`rounded-lg border px-2.5 py-2 text-left transition-colors cursor-pointer ${
                      idx === activeStageIdx
                        ? 'border-[#0D7A5F] bg-[#0D7A5F] text-white dark:border-[#34D399] dark:bg-[#0D4A3A] dark:text-white'
                        : 'border-[#DCE5DE] bg-[#F7FAF8] text-[#31423B] hover:border-[#0D7A5F]/50 dark:border-[#23332D] dark:bg-[#0F1714] dark:text-[#C5D5CD] dark:hover:border-[#34D399]/60 dark:hover:text-white'
                    }`}
                  >
                    <div className="font-mono text-[10px] opacity-85">
                      {HTST_STAGE_EMOJIS[idx]} 0{stage.step}
                    </div>
                    <div className="truncate font-mono text-xs font-semibold">
                      {stage.tempLabel}
                    </div>
                  </button>
                ))}
              </div>

              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 border-t border-[#DCE5DE] pt-4 dark:border-[#23332D]"
              >
                <h3 className="font-display text-base font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  {currentStage.step}. {currentStage.title[lang]}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#3D4F47] dark:text-[#B9CBC2]">
                  {currentStage.description[lang]}
                </p>
              </motion.div>
            </div>

            {/* Bioactive Preservation Comparison vs 100°C Boiling */}
            <div className="rounded-xl border border-[#DCE5DE] bg-white p-5 dark:border-[#23332D] dark:bg-[#141E1B]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#13201B] dark:text-[#EFF5F1]">
                  {lang === 'id'
                    ? 'KEUTUHAN SENYAWA (HTST vs REBUS 100°C)'
                    : 'BIOACTIVE RETENTION (HTST vs 100°C BOIL)'}
                </span>
                <Flame className="h-4 w-4 text-[#D97706]" />
              </div>

              <div className="mt-4 space-y-3 text-xs">
                {[
                  { label: '🌿 Flavonoid & Tanin', htst: 96, boil: 48 },
                  { label: '🥭 Vitamin C', htst: 92, boil: 30 },
                  { label: '🍃 Volatile Menthol', htst: 94, boil: 22 },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between font-medium text-[#31423B] dark:text-[#C5D5CD]">
                      <span>{bar.label}</span>
                      <span className="font-mono text-[#0D7A5F] dark:text-[#34D399]">
                        HTST {bar.htst}% · 100°C {bar.boil}%
                      </span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#E5EDE8] dark:bg-[#1E2C26]">
                      <div
                        className="h-full bg-[#0D7A5F] dark:bg-[#34D399]"
                        style={{ width: `${bar.htst}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
