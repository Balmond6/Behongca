import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDownRight, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Language, PaperMetadataConfig } from '../types';
import { UI_COPY } from '../data/translations';
import { ABSTRACT_CONTENT, RESEARCH_AUTHORS } from '../data/paperData';

interface HeroSectionProps {
  lang: Language;
  paperMetadata?: PaperMetadataConfig;
  onJumpToArchive: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  paperMetadata,
  onJumpToArchive,
}) => {
  const t = UI_COPY[lang];
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  const kickerText = paperMetadata?.kicker || t.hero.kicker;
  const titleText = paperMetadata?.title?.[lang] || t.hero.title;
  const subtitleText =
    paperMetadata?.subtitle?.[lang] ||
    (lang === 'id'
      ? 'Obat kumur herbal 100% bebas alkohol dari daun binahong, cangkang telur, mangga, krokot, dan cornmint — dilengkapi perangkat HTST, detektor plak, dan game edukasi.'
      : '100% alcohol-free herbal mouthwash crafted from binahong leaves, eggshells, mangoes, purslane, and cornmint — paired with an HTST smart device, plaque detector, and educational game.');
  const authorsList =
    paperMetadata?.authors && paperMetadata.authors.length > 0
      ? paperMetadata.authors
      : RESEARCH_AUTHORS;

  const storyCards = [
    {
      num: '01',
      emoji: '🦷',
      title: { id: 'Masalah Nyata', en: 'The Oral Challenge' },
      summary: {
        id: '72,22% pelajar Surakarta mengalami karies & 66,66% gejala gingivitis, namun obat kumur beralkohol terasa perih.',
        en: '72.22% of surveyed Surakarta students had dental caries & 66.66% gingivitis, while alcohol rinses irritate young mucosa.',
      },
    },
    {
      num: '02',
      emoji: '🌿',
      title: { id: '5 Bahan Alami Sinergis', en: '5 Synergistic Naturals' },
      summary: {
        id: 'Binahong, krokot, daun & buah mangga madu, cornmint, plus CaCO₃ cangkang telur dalam 100% aquades bebas alkohol.',
        en: 'Binahong, purslane, young mango leaf & honey mango, cornmint, plus eggshell CaCO₃ in 100% alcohol-free aquades.',
      },
    },
    {
      num: '03',
      emoji: '🌡️',
      title: { id: 'HTST + Thermal Shock', en: 'HTST + Thermal Shock' },
      summary: {
        id: 'Pasteurisasi 72°C–75°C (15–30 detik) & kejut air es menjaga flavonoid, vitamin C, dan menthol tetap aktif di pH 6,0–6,8.',
        en: '72°C–75°C (15–30s) + ice-bath shock preserves flavonoids, vitamin C & menthol safely at buffered pH 6.0–6.8.',
      },
    },
  ];

  return (
    <section id="top" className="relative overflow-hidden border-b border-[#DCE5DE] dark:border-[#23332D]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column: Punchy Headline & Team */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="behongca-title-panel flex flex-col justify-between p-5 sm:p-6 lg:col-span-7"
          >
            <div>
              <p className="text-xs font-medium tracking-wide text-[#0D7A5F] dark:text-[#34D399]">
                {kickerText}
              </p>

              <h1 className="mt-2.5 font-display text-3xl font-bold tracking-tight text-[#13201B] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15] [text-wrap:balance] dark:text-[#EFF5F1]">
                {titleText}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3D4F47] dark:text-[#B9CBC2]">
                {subtitleText}
              </p>

              <div className="mt-5 border-t border-[#DCE5DE] pt-3.5 dark:border-[#23332D]">
                <p className="text-xs font-semibold text-[#556960] dark:text-[#8CA398]">
                  {t.hero.authorsLabel}
                </p>
                <p className="mt-1 text-sm font-medium text-[#13201B] dark:text-[#DCE8E1]">
                  {authorsList.join(' · ')}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#quiz"
                className="behongca-btn-primary inline-flex items-center gap-2 rounded-lg bg-[#0D7A5F] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0A634D] dark:bg-[#10B981] dark:text-[#071510] dark:hover:bg-[#34D399] whitespace-nowrap shrink-0"
              >
                <span>{lang === 'id' ? '🎯 Main Kuis & Unduh App' : '🎯 Play Quiz & Get Apps'}</span>
                <ArrowDownRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={onJumpToArchive}
                className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DE] bg-white px-5 py-2.5 text-sm font-semibold text-[#13201B] transition-colors hover:border-[#0D7A5F] hover:text-[#0D7A5F] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#E3ECE7] dark:hover:border-[#34D399] dark:hover:text-[#34D399] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                <span>{t.hero.ctaArchive}</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Emoji-Infused Botanical Orbit Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative flex h-full min-h-[290px] flex-col justify-between overflow-hidden rounded-xl border border-[#DCE5DE] bg-white p-5 dark:border-[#23332D] dark:bg-[#141E1B]">
              <div className="flex items-center justify-between text-xs text-[#556960] dark:text-[#8CA398]">
                <span className="font-mono font-medium">AQUADES 100%</span>
                <span className="font-mono font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                  0% ALCOHOL
                </span>
              </div>

              <div className="my-3 flex items-center justify-center">
                <svg
                  viewBox="0 0 360 215"
                  className="w-full max-w-[340px]"
                  role="img"
                  aria-label="BEHONGCA 5 Natural Ingredients Orbit"
                >
                  <defs>
                    <radialGradient id="coreGlowHero" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx="180" cy="108" r="95" fill="url(#coreGlowHero)" />
                  <circle
                    cx="180"
                    cy="108"
                    r="72"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="4 4"
                    className="text-[#0D7A5F]/30 dark:text-[#34D399]/30"
                  />

                  {[
                    { x: 64, y: 48 },
                    { x: 296, y: 48 },
                    { x: 60, y: 166 },
                    { x: 300, y: 166 },
                    { x: 180, y: 20 },
                  ].map((pt, i) => (
                    <line
                      key={i}
                      x1="180"
                      y1="108"
                      x2={pt.x}
                      y2={pt.y}
                      stroke="currentColor"
                      strokeWidth="1.25"
                      className="text-[#0D7A5F]/35 dark:text-[#34D399]/35"
                    />
                  ))}

                  {/* Center Hub */}
                  <circle cx="180" cy="108" r="39" className="fill-[#0D7A5F] dark:fill-[#10B981]" />
                  <text
                    x="180"
                    y="103"
                    textAnchor="middle"
                    className="fill-white dark:fill-[#071510] text-[12px] font-bold font-mono"
                  >
                    pH 6.0–6.8
                  </text>
                  <text
                    x="180"
                    y="120"
                    textAnchor="middle"
                    className="fill-white/90 dark:fill-[#071510]/90 text-[9px] font-mono"
                  >
                    HTST 72–75°C
                  </text>

                  {/* 5 Ingredient Nodes with Emojis */}
                  <g transform="translate(180,20)">
                    <rect
                      x="-58"
                      y="-14"
                      width="116"
                      height="28"
                      rx="7"
                      className="fill-[#EEF4F0] stroke-[#0D7A5F]/40 dark:fill-[#1B2823] dark:stroke-[#34D399]/40"
                    />
                    <text
                      y="5"
                      textAnchor="middle"
                      className="fill-[#13201B] dark:fill-[#E3ECE7] text-[10px] font-semibold"
                    >
                      🥚 CaCO₃ Eggshell
                    </text>
                  </g>

                  <g transform="translate(64,48)">
                    <rect
                      x="-56"
                      y="-14"
                      width="112"
                      height="28"
                      rx="7"
                      className="fill-[#EEF4F0] stroke-[#0D7A5F]/40 dark:fill-[#1B2823] dark:stroke-[#34D399]/40"
                    />
                    <text
                      y="5"
                      textAnchor="middle"
                      className="fill-[#13201B] dark:fill-[#E3ECE7] text-[10px] font-semibold"
                    >
                      🌿 Binahong
                    </text>
                  </g>

                  <g transform="translate(296,48)">
                    <rect
                      x="-56"
                      y="-14"
                      width="112"
                      height="28"
                      rx="7"
                      className="fill-[#EEF4F0] stroke-[#0D7A5F]/40 dark:fill-[#1B2823] dark:stroke-[#34D399]/40"
                    />
                    <text
                      y="5"
                      textAnchor="middle"
                      className="fill-[#13201B] dark:fill-[#E3ECE7] text-[10px] font-semibold"
                    >
                      🌱 Purslane
                    </text>
                  </g>

                  <g transform="translate(60,166)">
                    <rect
                      x="-56"
                      y="-14"
                      width="112"
                      height="28"
                      rx="7"
                      className="fill-[#FEF3C7] stroke-[#D97706]/40 dark:fill-[#2A2212] dark:stroke-[#F59E0B]/40"
                    />
                    <text
                      y="5"
                      textAnchor="middle"
                      className="fill-[#78350F] dark:fill-[#FDE68A] text-[10px] font-semibold"
                    >
                      🥭 Honey Mango
                    </text>
                  </g>

                  <g transform="translate(300,166)">
                    <rect
                      x="-56"
                      y="-14"
                      width="112"
                      height="28"
                      rx="7"
                      className="fill-[#E0F2FE] stroke-[#0284C7]/40 dark:fill-[#102430] dark:stroke-[#38BDF8]/40"
                    />
                    <text
                      y="5"
                      textAnchor="middle"
                      className="fill-[#0C4A6E] dark:fill-[#BAE6FD] text-[10px] font-semibold"
                    >
                      🍃 Cornmint
                    </text>
                  </g>
                </svg>
              </div>

              <div className="flex items-center justify-between border-t border-[#DCE5DE] pt-2.5 text-xs text-[#44574F] dark:border-[#23332D] dark:text-[#98AEA4]">
                <span>Target: Streptococcus mutans</span>
                <span className="font-mono font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                  I2ASPO · UGM · IYSA
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4-Column Quick Metrics Strip */}
        <div className="mt-8 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          <div className="rounded-xl border border-[#DCE5DE] bg-white p-4 dark:border-[#23332D] dark:bg-[#141E1B]">
            <p className="text-xs font-medium text-[#556960] dark:text-[#8CA398]">
              👥 {t.hero.metrics.respondentsLabel}
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#13201B] dark:text-[#EFF5F1]">
              n = 90
            </p>
          </div>
          <div className="rounded-xl border border-[#DCE5DE] bg-white p-4 dark:border-[#23332D] dark:bg-[#141E1B]">
            <p className="text-xs font-medium text-[#556960] dark:text-[#8CA398]">
              🦷 {t.hero.metrics.cariesLabel}
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#B45309] dark:text-[#FBBF24]">
              72.22%
            </p>
          </div>
          <div className="rounded-xl border border-[#DCE5DE] bg-white p-4 dark:border-[#23332D] dark:bg-[#141E1B]">
            <p className="text-xs font-medium text-[#556960] dark:text-[#8CA398]">
              ⚖️ {t.hero.metrics.phLabel}
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#0D7A5F] dark:text-[#34D399]">
              6.0–6.8
            </p>
          </div>
          <div className="rounded-xl border border-[#DCE5DE] bg-white p-4 dark:border-[#23332D] dark:bg-[#141E1B]">
            <p className="text-xs font-medium text-[#556960] dark:text-[#8CA398]">
              🌡️ {t.hero.metrics.htstLabel}
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-[#13201B] dark:text-[#EFF5F1]">
              72–75°C
            </p>
          </div>
        </div>

        {/* Visual 3-Step Research Snapshot (replaces dense 3-column wall of text) */}
        <div id="abstract" className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                {t.sections.abstractTitle}
              </p>
              <h2 className="mt-0.5 font-display text-xl font-bold text-[#13201B] dark:text-[#EFF5F1]">
                {lang === 'id' ? 'Ringkasan Visual Makalah' : 'Visual Research Snapshot'}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowFullAbstract((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE5DE] bg-white px-3.5 py-2 text-xs font-semibold text-[#13201B] hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#E3ECE7] cursor-pointer"
            >
              <span>
                {showFullAbstract
                  ? lang === 'id'
                    ? 'Tutup Teks Abstrak'
                    : 'Hide Full Abstract'
                  : lang === 'id'
                    ? 'Baca Teks Abstrak Lengkap'
                    : 'Read Full Abstract Text'}
              </span>
              {showFullAbstract ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {storyCards.map((card) => (
              <div
                key={card.num}
                className="rounded-xl border border-[#DCE5DE] bg-white p-5 dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden="true">
                    {card.emoji}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                    {card.num}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-base font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  {card.title[lang]}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#44574F] dark:text-[#A9BDB3]">
                  {card.summary[lang]}
                </p>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {showFullAbstract && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-xl border border-[#DCE5DE] bg-white p-6 dark:border-[#23332D] dark:bg-[#141E1B]">
                  <div className="space-y-3 text-sm leading-relaxed text-[#31423B] dark:text-[#C5D5CD]">
                    {ABSTRACT_CONTENT[lang].map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                  <p className="mt-4 border-t border-[#DCE5DE] pt-3 text-xs text-[#556960] dark:border-[#23332D] dark:text-[#8CA398]">
                    <strong>{lang === 'id' ? 'Kata Kunci: ' : 'Keywords: '}</strong>
                    {ABSTRACT_CONTENT.keywords.join(' · ')}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
