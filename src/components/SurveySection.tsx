import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '../types';
import { UI_COPY } from '../data/translations';
import { PATHOGEN_NOTES, SURVEY_COHORTS } from '../data/paperData';

interface SurveySectionProps {
  lang: Language;
}

const COHORT_EMOJIS = ['🎒', '📘', '🎓'];

export const SurveySection: React.FC<SurveySectionProps> = ({ lang }) => {
  const t = UI_COPY[lang];
  const [metric, setMetric] = useState<'caries' | 'gingivitis'>('caries');
  const [showPathogenDetail, setShowPathogenDetail] = useState(false);

  const overallPositive = metric === 'caries' ? '72.22%' : '66.66%';
  const overallCount = metric === 'caries' ? '65 / 90' : '60 / 90';

  return (
    <section id="survey" className="border-b border-[#DCE5DE] py-12 lg:py-16 dark:border-[#23332D]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="behongca-title-panel max-w-2xl">
            <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
              {t.sections.surveyTitle}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#13201B] sm:text-3xl [text-wrap:balance] dark:text-[#EFF5F1]">
              {t.sections.surveyHeading}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Survey condition selector"
            className="inline-flex items-center gap-1 self-start rounded-lg border border-[#DCE5DE] bg-[#EEF4F0] p-1 dark:border-[#23332D] dark:bg-[#141E1B]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={metric === 'caries'}
              onClick={() => setMetric('caries')}
              className={`rounded-md border px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                metric === 'caries'
                  ? 'border-[#0D7A5F]/25 bg-white text-[#0D7A5F] shadow-2xs dark:border-[#34D399]/75 dark:bg-[#0D4A3A] dark:text-white'
                  : 'border-transparent text-[#44574F] hover:text-[#13201B] dark:text-[#A9BDB3] dark:hover:text-white'
              }`}
            >
              {lang === 'id' ? '🦷 Karies (72.22%)' : '🦷 Caries (72.22%)'}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={metric === 'gingivitis'}
              onClick={() => setMetric('gingivitis')}
              className={`rounded-md border px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                metric === 'gingivitis'
                  ? 'border-[#0D7A5F]/25 bg-white text-[#0D7A5F] shadow-2xs dark:border-[#34D399]/75 dark:bg-[#0D4A3A] dark:text-white'
                  : 'border-transparent text-[#44574F] hover:text-[#13201B] dark:text-[#A9BDB3] dark:hover:text-white'
              }`}
            >
              {lang === 'id' ? '🩺 Gingivitis (66.66%)' : '🩺 Gingivitis (66.66%)'}
            </button>
          </div>
        </div>

        {/* Visual 3-Cohort Cards */}
        <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {SURVEY_COHORTS.map((cohort, idx) => {
            const affected =
              metric === 'caries' ? cohort.cariesCount : cohort.gingivitisCount;
            const healthy =
              metric === 'caries' ? cohort.noCariesCount : cohort.noGingivitisCount;
            const withinCohortPct = Math.round((affected / cohort.total) * 100);

            return (
              <div
                key={cohort.ageGroup}
                className="flex flex-col justify-between rounded-xl border border-[#DCE5DE] bg-white p-5 dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl" aria-hidden="true">
                      {COHORT_EMOJIS[idx]}
                    </span>
                    <span className="font-mono text-2xl font-bold text-[#B45309] dark:text-[#FBBF24]">
                      {withinCohortPct}%
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-base font-bold text-[#13201B] dark:text-[#EFF5F1]">
                    {cohort.label[lang]}
                  </h3>

                  <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#E5EDE8] dark:bg-[#1E2C26]">
                    <motion.div
                      key={`${metric}-${cohort.ageGroup}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: withinCohortPct / 100 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'left center' }}
                      className={`h-full w-full ${
                        metric === 'caries'
                          ? 'bg-[#D97706] dark:bg-[#F59E0B]'
                          : 'bg-[#0D7A5F] dark:bg-[#34D399]'
                      }`}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#DCE5DE] pt-3 font-mono text-xs dark:border-[#23332D]">
                  <span className="inline-flex items-center gap-1 text-[#92400E] dark:text-[#FCD34D]">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {affected}/30
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#0D7A5F] dark:text-[#6EE7B7]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {healthy}/30 {lang === 'id' ? 'sehat' : 'healthy'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Summary Bar + Optional Pathogen Detail Drawer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#DCE5DE] bg-white px-5 py-4 dark:border-[#23332D] dark:bg-[#141E1B]">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="font-mono text-sm font-bold text-[#13201B] dark:text-[#EFF5F1]">
              Total: {overallPositive} ({overallCount})
            </span>
            <span className="text-[#44574F] dark:text-[#A9BDB3]">
              {lang === 'id'
                ? '🦠 Patogen utama: Streptococcus mutans & Red Complex · Riskesdas: 88,8% (DMF-T 7,1)'
                : '🦠 Key pathogens: Streptococcus mutans & Red Complex · Riskesdas: 88.8% (DMF-T 7.1)'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowPathogenDetail((v) => !v)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399] cursor-pointer"
          >
            <span>{lang === 'id' ? 'Detail Ilmiah Patogen' : 'Pathogen Scientific Note'}</span>
            {showPathogenDetail ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {showPathogenDetail && (
          <div className="mt-3 rounded-xl border border-[#DCE5DE] bg-[#EEF4F0] p-4 text-xs leading-relaxed text-[#31423B] dark:border-[#23332D] dark:bg-[#111916] dark:text-[#C5D5CD]">
            {PATHOGEN_NOTES[lang]}
          </div>
        )}
      </div>
    </section>
  );
};
