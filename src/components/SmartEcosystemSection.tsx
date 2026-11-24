import React from 'react';
import { motion } from 'motion/react';
import { Download, FolderOpen } from 'lucide-react';
import { DownloadSettings, Language, LocalDownloadItem } from '../types';
import { UI_COPY } from '../data/translations';
import { DentalQuizGame } from './DentalQuizGame';

interface SmartEcosystemSectionProps {
  lang: Language;
  downloads: DownloadSettings;
}

function formatDownloadSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return '';
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const SmartEcosystemSection: React.FC<SmartEcosystemSectionProps> = ({
  lang,
  downloads,
}) => {
  const t = UI_COPY[lang];

  const cards: Array<{
    id: string;
    emoji: string;
    title: string;
    platform: { id: string; en: string };
    description: { id: string; en: string };
    highlights: Array<{ id: string; en: string }>;
    item: LocalDownloadItem;
    buttonLabel: { id: string; en: string };
  }> = [
    {
      id: 'detector',
      emoji: '📱',
      title: 'BEHONGCA SMART DETECTION App',
      platform: {
        id: 'Android Companion · Unduhan Web Lokal',
        en: 'Android Companion · Local Web Download',
      },
      description: {
        id: 'Aplikasi pendamping pemantau kebersihan mulut: skrining visual plak & karang gigi via kamera, pengingat kumur pagi–malam (30 detik), serta panduan batas konsumsi gula.',
        en: 'Preventive oral-care companion app: camera-based plaque & tartar visual screening, morning–evening rinsing reminders (30s), and sugar-limit guidance.',
      },
      highlights: [
        { id: '📸 Pindai Plak & Karang', en: '📸 Plaque & Tartar Scan' },
        { id: '⏰ Pengingat Kumur 2×', en: '⏰ Daily Rinse Alerts' },
        { id: '📖 Edukasi pH 5,5', en: '📖 pH 5.5 Education' },
      ],
      item: downloads.detector,
      buttonLabel: {
        id: 'Unduh Aplikasi',
        en: 'Download App',
      },
    },
    {
      id: 'game',
      emoji: '🎮',
      title: 'Super BEHONGCA Bros: Dental Guardian',
      platform: {
        id: 'Android Kotlin + Jetpack Compose · Unduhan Web Lokal',
        en: 'Android Kotlin + Jetpack Compose · Local Web Download',
      },
      description: {
        id: 'Game edukasi side-scrolling 2D untuk usia 9–18 tahun: kendalikan Captain BEHONGCA melintasi 5 bioma mulut, kalahkan bakteri S. mutans, dan taklukkan kuis gerbang bioaktif.',
        en: '2D side-scrolling educational game (ages 9–18): guide Captain BEHONGCA through 5 oral biomes, defeat S. mutans, and clear Gatekeeper bioactive quizzes.',
      },
      highlights: [
        { id: '🗺️ 5 Bioma Kesehatan Mulut', en: '🗺️ 5 Oral Biomes' },
        { id: '🌿 Kumpulkan 5 Bahan Alami', en: '🌿 Collect 5 Naturals' },
        { id: '🛡️ Tantangan Gatekeeper', en: '🛡️ Gatekeeper Quizzes' },
      ],
      item: downloads.game,
      buttonLabel: {
        id: 'Unduh Game',
        en: 'Download Game',
      },
    },
  ];

  return (
    <section
      id="smart"
      className="behongca-lazy-section border-b border-[#DCE5DE] py-12 lg:py-16 dark:border-[#23332D]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="behongca-title-panel max-w-2xl">
          <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
            {t.sections.smartTitle}
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#13201B] sm:text-3xl [text-wrap:balance] dark:text-[#EFF5F1]">
            {t.sections.smartHeading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#44574F] dark:text-[#A9BDB3]">
            {t.sections.smartLead}
          </p>
        </div>

        {/* Two Showcase & Direct In-Web Local Download Cards */}
        <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {cards.map((card) => {
            const isAvailable = Boolean(card.item?.available && card.item?.publicUrl);
            const sizeText = formatDownloadSize(card.item?.fileSize);
            const targetHint =
              card.item?.configuredPath || 'public/assets/download/ (behongca.settings.json)';

            return (
              <motion.div
                key={card.id}
                whileHover={isAvailable ? { y: -2 } : undefined}
                transition={{ duration: 0.18 }}
                className="flex flex-col justify-between rounded-xl border border-[#DCE5DE] bg-white p-6 dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4F0] text-2xl dark:bg-[#0F1714]"
                      aria-hidden="true"
                    >
                      {card.emoji}
                    </span>
                    <div>
                      <p className="font-mono text-[11px] font-medium text-[#556960] dark:text-[#8CA398]">
                        {card.platform[lang]}
                      </p>
                      <h3 className="font-display text-lg font-bold text-[#13201B] dark:text-[#EFF5F1]">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#3D4F47] dark:text-[#B9CBC2]">
                    {card.description[lang]}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 border-t border-[#DCE5DE] pt-3 text-xs font-medium text-[#31423B] dark:border-[#23332D] dark:text-[#C5D5CD]">
                    {card.highlights.map((h, i) => (
                      <span key={i}>{h[lang]}</span>
                    ))}
                  </div>
                </div>

                {/* Direct In-Web Download Action or Missing Local File Status */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  {isAvailable ? (
                    <motion.a
                      href={card.item.publicUrl}
                      download={card.item.fileName || undefined}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.965 }}
                      className="behongca-no-lift behongca-btn-primary group inline-flex items-center gap-2.5 rounded-lg bg-[#0D7A5F] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0A634D] dark:bg-[#10B981] dark:text-[#071510] dark:hover:bg-[#34D399] whitespace-nowrap shrink-0"
                    >
                      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                      <span>{card.buttonLabel[lang]}</span>
                    </motion.a>
                  ) : (
                    <span
                      role="status"
                      aria-disabled="true"
                      className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#CBD5E1] bg-[#F7FAF8] px-4 py-2.5 text-xs font-medium text-[#44574F] dark:border-[#2E463C] dark:bg-[#101A16] dark:text-[#A9BDB3] whitespace-nowrap shrink-0"
                    >
                      <FolderOpen className="h-4 w-4 opacity-75" />
                      <span>
                        {lang === 'id'
                          ? 'File belum diletakkan di folder'
                          : 'File not placed in folder yet'}
                      </span>
                    </span>
                  )}

                  <span
                    className="font-mono text-[11px] tabular-nums text-[#556960] dark:text-[#8CA398] truncate max-w-full"
                    title={targetHint}
                  >
                    {isAvailable
                      ? [
                          lang === 'id' ? '✓ Siap Diunduh' : '✓ Ready',
                          card.item.fileName,
                          sizeText,
                        ]
                          .filter(Boolean)
                          .join(' · ')
                      : `📁 ${targetHint}`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive 10-Question Bilingual Dental Quiz */}
        <DentalQuizGame lang={lang} />
      </div>
    </section>
  );
};
