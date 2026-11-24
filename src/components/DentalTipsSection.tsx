import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckSquare, Square, ChevronDown, ChevronUp, RotateCcw, Sparkles } from 'lucide-react';
import { DentalTipTopic, Language } from '../types';
import { DAILY_ORAL_CHECKLIST, DENTAL_HEALTH_TIPS } from '../data/paperData';

interface DentalTipsSectionProps {
  lang: Language;
}

type TopicFilter = 'all' | DentalTipTopic;

const CHECKLIST_STORAGE_KEY = 'behongca_daily_oral_checklist';

export const DentalTipsSection: React.FC<DentalTipsSectionProps> = ({ lang }) => {
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');
  const [expandedTipId, setExpandedTipId] = useState<string | null>(DENTAL_HEALTH_TIPS[0].id);
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // Ignore storage fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checkedIds));
    } catch {
      // Ignore storage fallback
    }
  }, [checkedIds]);

  const topicTabs: { key: TopicFilter; label: { id: string; en: string } }[] = [
    { key: 'all', label: { id: '✨ Semua Topik', en: '✨ All Topics' } },
    { key: 'brushing', label: { id: '🪥 Sikat & Kumur', en: '🪥 Brush & Rinse' } },
    { key: 'sugar_ph', label: { id: '🍯 Gula & pH Mulut', en: '🍯 Sugar & Oral pH' } },
    { key: 'natural_care', label: { id: '🌿 Perawatan Alami', en: '🌿 Natural Care' } },
    { key: 'youth', label: { id: '🎒 Anak & Remaja', en: '🎒 Youth & Teens' } },
  ];

  const filteredTips = useMemo(() => {
    if (topicFilter === 'all') return DENTAL_HEALTH_TIPS;
    return DENTAL_HEALTH_TIPS.filter((tip) => tip.topic === topicFilter);
  }, [topicFilter]);

  const toggleChecklist = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const completedCount = checkedIds.filter((id) =>
    DAILY_ORAL_CHECKLIST.some((c) => c.id === id)
  ).length;
  const totalChecklist = DAILY_ORAL_CHECKLIST.length;
  const progressPct = Math.round((completedCount / totalChecklist) * 100);

  return (
    <section
      id="tips"
      className="behongca-lazy-section border-b border-[#DCE5DE] py-12 lg:py-16 dark:border-[#23332D]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="behongca-title-panel max-w-2xl">
            <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
              💡 {lang === 'id' ? 'EDUKASI PRAKTIS PERAWATAN MULUT' : 'PRACTICAL ORAL HYGIENE GUIDE'}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#13201B] sm:text-3xl [text-wrap:balance] dark:text-[#EFF5F1]">
              {lang === 'id'
                ? '🦷 Tips Kesehatan Gigi & Daftar Cek Kebiasaan Harian'
                : '🦷 Dental Health Tips & Daily Oral Care Checklist'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#44574F] dark:text-[#A9BDB3]">
              {lang === 'id'
                ? 'Saring tips perawatan gigi berdasarkan topik, pelajari alasan ilmiahnya, dan pantau kebiasaan sehat harianmu untuk mencegah karies serta radang gusi.'
                : 'Filter dental care tips by topic, inspect the science behind each habit, and check off your daily routine to prevent caries and gingivitis.'}
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left Column (7 cols): Interactive Topic Filter + Expandable Tip Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div
              role="tablist"
              aria-label={lang === 'id' ? 'Filter topik tips kesehatan gigi' : 'Dental tip topic filter'}
              className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#DCE5DE] bg-[#EEF4F0] p-1.5 dark:border-[#23332D] dark:bg-[#141E1B]"
            >
              {topicTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={topicFilter === tab.key}
                  onClick={() => setTopicFilter(tab.key)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    topicFilter === tab.key
                      ? 'border-[#0D7A5F]/25 bg-white text-[#0D7A5F] shadow-2xs dark:border-[#34D399]/75 dark:bg-[#0D4A3A] dark:text-white'
                      : 'border-transparent text-[#44574F] hover:text-[#13201B] dark:text-[#A9BDB3] dark:hover:text-white'
                  }`}
                >
                  {tab.label[lang]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filteredTips.map((tip) => {
                const isExpanded = expandedTipId === tip.id;
                return (
                  <div
                    key={tip.id}
                    className={`flex flex-col justify-between rounded-xl border p-4 transition-colors ${
                      isExpanded
                        ? 'border-[#0D7A5F] bg-white shadow-xs dark:border-[#34D399] dark:bg-[#0D4A3A]/75'
                        : 'border-[#DCE5DE] bg-white dark:border-[#23332D] dark:bg-[#141E1B]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EEF4F0] text-xl dark:bg-[#0F1714]"
                          aria-hidden="true"
                        >
                          {tip.emoji}
                        </span>
                        <div>
                          <h3 className="font-display text-sm font-bold leading-snug text-[#13201B] dark:text-[#EFF5F1]">
                            {tip.title[lang]}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-[#3D4F47] dark:text-[#B9CBC2]">
                        {tip.summary[lang]}
                      </p>
                    </div>

                    <div className="mt-3 border-t border-[#DCE5DE] pt-2.5 dark:border-[#23332D]">
                      <button
                        type="button"
                        onClick={() => setExpandedTipId(isExpanded ? null : tip.id)}
                        className="inline-flex w-full items-center justify-between text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399] cursor-pointer"
                      >
                        <span>
                          {lang === 'id' ? '🔬 Kenapa ini penting?' : '🔬 Why this matters'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-2 rounded-lg bg-[#F7FAF8] p-2.5 text-[11px] leading-relaxed text-[#31423B] dark:bg-[#0F1714] dark:text-[#C5D5CD]">
                              {tip.scienceNote[lang]}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Daily Oral Care Checklist */}
          <div className="rounded-xl border border-[#DCE5DE] bg-white p-5 sm:p-6 lg:col-span-5 dark:border-[#23332D] dark:bg-[#141E1B]">
            <div className="flex items-center justify-between gap-2 border-b border-[#DCE5DE] pb-3.5 dark:border-[#23332D]">
              <div>
                <p className="font-mono text-[11px] font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                  ✅ {lang === 'id' ? 'DAFTAR CEK HARIAN' : 'DAILY HABIT TRACKER'}
                </p>
                <h3 className="mt-0.5 font-display text-base font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  {lang === 'id'
                    ? 'Rutinitas Pelindung Gigi & Gusi'
                    : 'Enamel & Gum Protection Routine'}
                </h3>
              </div>

              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={() => setCheckedIds([])}
                  title={lang === 'id' ? 'Atur ulang ceklis' : 'Reset checklist'}
                  className="inline-flex items-center gap-1 rounded-md border border-[#DCE5DE] px-2.5 py-1 text-[11px] font-semibold text-[#556960] hover:text-[#13201B] dark:border-[#23332D] dark:text-[#8CA398] cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>{lang === 'id' ? 'Ulang' : 'Reset'}</span>
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-semibold text-[#31423B] dark:text-[#C5D5CD]">
                  {lang === 'id' ? 'Progres Hari Ini' : "Today's Progress"}
                </span>
                <span className="font-bold tabular-nums text-[#0D7A5F] dark:text-[#34D399]">
                  {completedCount} / {totalChecklist} ({progressPct}%)
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#E5EDE8] dark:bg-[#1E2C26]">
                <motion.div
                  className="h-full bg-[#0D7A5F] dark:bg-[#34D399]"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </div>

            {/* Interactive Checklist Rows */}
            <div className="mt-4 space-y-2.5">
              {DAILY_ORAL_CHECKLIST.map((item) => {
                const checked = checkedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleChecklist(item.id)}
                    aria-pressed={checked}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                      checked
                        ? 'border-[#0D7A5F]/45 bg-[#0D7A5F]/8 dark:border-[#34D399]/70 dark:bg-[#0D4A3A]/85'
                        : 'border-[#DCE5DE] bg-[#F7FAF8] hover:border-[#0D7A5F]/40 dark:border-[#23332D] dark:bg-[#0F1714] dark:hover:border-[#34D399]/50'
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#0D7A5F] dark:text-[#34D399]" />
                    ) : (
                      <Square className="mt-0.5 h-4 w-4 shrink-0 text-[#788D84]" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-semibold ${
                          checked
                            ? 'text-[#0A5A46] line-through dark:text-white'
                            : 'text-[#13201B] dark:text-[#EFF5F1]'
                        }`}
                      >
                        <span className="mr-1.5" aria-hidden="true">
                          {item.emoji}
                        </span>
                        {item.label[lang]}
                      </p>
                      <p
                        className={`mt-0.5 text-[11px] ${
                          checked
                            ? 'text-[#556960] dark:text-[#D1FAE5]/85'
                            : 'text-[#556960] dark:text-[#8CA398]'
                        }`}
                      >
                        {item.detail[lang]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Completion Reward Banner */}
            {completedCount === totalChecklist && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 rounded-lg border border-[#0D7A5F]/40 bg-[#0D7A5F]/12 px-3.5 py-2.5 text-xs font-semibold text-[#0A5A46] dark:border-[#34D399]/40 dark:text-[#6EE7B7]"
              >
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>
                  {lang === 'id'
                    ? '🎉 Hebat! Semua kebiasaan pelindung gigi hari ini sudah selesai!'
                    : '🎉 Awesome! You completed every daily enamel-care habit today!'}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
