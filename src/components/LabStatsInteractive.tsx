import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, CheckCircle2, Clock } from 'lucide-react';
import { LabMetricItem, LabStatCategory, Language } from '../types';
import { FORMULA_COMPARISON_BARS, LAB_STAT_METRICS } from '../data/paperData';

interface LabStatsInteractiveProps {
  lang: Language;
}

type FilterKey = 'all' | LabStatCategory;

interface CountUpNumberProps {
  target: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  active: boolean;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({
  target,
  decimals,
  prefix = '',
  suffix,
  active,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!active) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || target === 0) {
      setDisplayValue(target);
      return;
    }

    let frameId = 0;
    const duration = 900;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo curve
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(target * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(target);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toString();

  return (
    <span className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-[#13201B] dark:text-[#EFF5F1]">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export const LabStatsInteractive: React.FC<LabStatsInteractiveProps> = ({ lang }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [filter, setFilter] = useState<FilterKey>('all');

  // Trigger count-up once when the lab stats block first enters the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasEnteredViewport) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasEnteredViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasEnteredViewport]);

  const tabs: { key: FilterKey; label: { id: string; en: string } }[] = [
    { key: 'all', label: { id: '📊 Semua Uji', en: '📊 All Metrics' } },
    { key: 'physical_ph', label: { id: '⚖️ Fisik & pH', en: '⚖️ Physical & pH' } },
    { key: 'htst', label: { id: '🌡️ Proses HTST', en: '🌡️ HTST Process' } },
    { key: 'formulas', label: { id: '🧪 Formula F1–F3', en: '🧪 F1–F3 Matrix' } },
    { key: 'clsi', label: { id: '🔬 Standar CLSI 2022', en: '🔬 CLSI 2022 Assay' } },
  ];

  const visibleMetrics = useMemo<LabMetricItem[]>(() => {
    const list = LAB_STAT_METRICS as LabMetricItem[];
    if (filter === 'all') return list;
    return list.filter((m) => m.category === filter);
  }, [filter]);

  const showFormulaBars = filter === 'all' || filter === 'formulas';

  return (
    <div
      id="lab-stats"
      ref={containerRef}
      className="mt-7 rounded-xl border border-[#DCE5DE] bg-white p-5 sm:p-6 dark:border-[#23332D] dark:bg-[#141E1B]"
    >
      {/* Header + Filter Controls */}
      <div className="flex flex-col gap-4 border-b border-[#DCE5DE] pb-4 lg:flex-row lg:items-end lg:justify-between dark:border-[#23332D]">
        <div>
          <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
            📈 {lang === 'id' ? 'STATISTIK INTERAKTIF DATA UJI LABORATORIUM' : 'INTERACTIVE LABORATORY DATA TELEMETRY'}
          </p>
          <h3 className="mt-1 font-display text-lg sm:text-xl font-bold text-[#13201B] dark:text-[#EFF5F1]">
            {lang === 'id'
              ? 'Parameter Uji Fisik-pH, HTST, Formula F1–F3 & Standar CLSI 2022'
              : 'Physical-pH, HTST Processing, Formula F1–F3 & CLSI 2022 Metrics'}
          </h3>
        </div>

        <div
          role="tablist"
          aria-label={lang === 'id' ? 'Filter statistik uji lab' : 'Filter laboratory statistics'}
          className="flex flex-wrap items-center gap-1 self-start rounded-lg border border-[#DCE5DE] bg-[#EEF4F0] p-1 dark:border-[#23332D] dark:bg-[#0F1714]"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                filter === tab.key
                  ? 'border-[#0D7A5F]/25 bg-white text-[#0D7A5F] shadow-2xs dark:border-[#34D399]/75 dark:bg-[#0D4A3A] dark:text-white'
                  : 'border-transparent text-[#44574F] hover:text-[#13201B] dark:text-[#A9BDB3] dark:hover:text-white'
              }`}
            >
              {tab.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Count-Up Metric Grid */}
      <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleMetrics.map((metric) => (
          <div
            key={metric.id}
            className="flex flex-col justify-between rounded-xl border border-[#DCE5DE] bg-[#F7FAF8] p-4 dark:border-[#23332D] dark:bg-[#0F1714]"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xl" aria-hidden="true">
                  {metric.emoji}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[#556960] dark:text-[#8CA398]">
                  {metric.statusType === 'protocol' ? (
                    <>
                      <Clock className="h-3 w-3 text-[#D97706] dark:text-[#FBBF24]" />
                      <span>{lang === 'id' ? 'Protokol Lab' : 'Lab Protocol'}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-[#0D7A5F] dark:text-[#34D399]" />
                      <span>{metric.rangeNote || (lang === 'id' ? 'Terukur' : 'Measured')}</span>
                    </>
                  )}
                </span>
              </div>

              <div className="mt-2.5">
                <CountUpNumber
                  target={metric.numericValue}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  active={hasEnteredViewport}
                />
              </div>

              <h4 className="mt-1 font-display text-sm font-bold text-[#13201B] dark:text-[#EFF5F1]">
                {metric.title[lang]}
              </h4>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-[#44574F] dark:text-[#A9BDB3]">
              {metric.detail[lang]}
            </p>
          </div>
        ))}
      </div>

      {/* Formula F1 vs F2 vs F3 Comparison Bars */}
      {showFormulaBars && (
        <div className="mt-6 rounded-xl border border-[#DCE5DE] bg-[#F7FAF8] p-4 sm:p-5 dark:border-[#23332D] dark:bg-[#0F1714]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#0D7A5F] dark:text-[#34D399]" />
              <h4 className="font-display text-sm font-bold text-[#13201B] dark:text-[#EFF5F1]">
                {lang === 'id'
                  ? 'Perbandingan Konsentrasi Ekstrak Herbal per 100 mL (F1 · F2 · F3)'
                  : 'Botanical Extract Concentration Comparison per 100 mL (F1 · F2 · F3)'}
              </h4>
            </div>
            <span className="font-mono text-[11px] text-[#556960] dark:text-[#8CA398]">
              + 0.5 g CaCO₃ · Aquades ad 100 mL
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {FORMULA_COMPARISON_BARS.map((bar) => (
              <div key={bar.formula} className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono font-bold text-[#13201B] dark:text-[#EFF5F1]">
                    {bar.formula} · {bar.tag[lang]}
                  </span>
                  <span className="font-mono tabular-nums text-[#0D7A5F] dark:text-[#34D399]">
                    {bar.botanicalPct}% herbal ({bar.primaryLeafMl} mL/daun) · {bar.aquadesPct}% aquades
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-[#DCE5DE] dark:bg-[#1E2C26]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hasEnteredViewport ? bar.botanicalPct / 100 : 0 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: 'left center' }}
                    className="h-full w-full bg-[#0D7A5F] dark:bg-[#34D399]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
