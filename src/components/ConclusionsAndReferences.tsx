import React, { useState } from 'react';
import { Microscope, Copy, Check, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '../types';
import { UI_COPY } from '../data/translations';
import { CONCLUSIONS_DATA, REFERENCES_LIST } from '../data/paperData';
import { LabStatsInteractive } from './LabStatsInteractive';

interface ConclusionsAndReferencesProps {
  lang: Language;
}

const CONCLUSION_EMOJIS = ['🧪', '📊', '♻️'];

export const ConclusionsAndReferences: React.FC<ConclusionsAndReferencesProps> = ({
  lang,
}) => {
  const t = UI_COPY[lang];
  const [refFilter, setRefFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAllRefs, setShowAllRefs] = useState(false);

  const filteredRefs = REFERENCES_LIST.filter((r) => {
    if (!refFilter.trim()) return true;
    const q = refFilter.toLowerCase();
    return (
      r.citation.toLowerCase().includes(q) ||
      r.topic[lang].toLowerCase().includes(q) ||
      String(r.year).includes(q)
    );
  });

  const visibleRefs =
    showAllRefs || refFilter.trim() ? filteredRefs : filteredRefs.slice(0, 6);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <>
      {/* 08. Conclusions, Interactive Lab Statistics & Scheduled Validation */}
      <section
        id="conclusions"
        className="behongca-lazy-section border-b border-[#DCE5DE] py-12 lg:py-16 dark:border-[#23332D]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="behongca-title-panel max-w-2xl">
            <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
              {t.sections.conclusionsTitle}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#13201B] sm:text-3xl [text-wrap:balance] dark:text-[#EFF5F1]">
              {t.sections.conclusionsHeading}
            </h2>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {CONCLUSIONS_DATA[lang].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#DCE5DE] bg-white p-5 dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <span className="text-2xl" aria-hidden="true">
                  {CONCLUSION_EMOJIS[idx]}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#3D4F47] dark:text-[#B9CBC2]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Lab Telemetry with Count-Up Animation on Viewport Entry */}
          <LabStatsInteractive lang={lang} />

          <div className="mt-5 flex flex-col gap-4 rounded-xl border border-[#DCE5DE] bg-[#EEF4F0] p-5 md:flex-row md:items-center md:justify-between dark:border-[#23332D] dark:bg-[#111916]">
            <div className="flex items-start gap-3">
              <Microscope className="mt-0.5 h-5 w-5 shrink-0 text-[#0D7A5F] dark:text-[#34D399]" />
              <div>
                <h3 className="font-display text-sm font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  {lang === 'id'
                    ? 'Validasi Lab Terjadwal: Balai Pengujian & Sertifikat Mutu Barang Surakarta'
                    : 'Scheduled Lab Validation: Surakarta Quality Testing Center'}
                </h3>
                <p className="mt-1 text-xs text-[#31423B] dark:text-[#C5D5CD]">
                  {lang === 'id'
                    ? '1) Uji Difusi Cakram S. mutans (CLSI 2022, 0.5 McFarland, 37°C, 24 jam) · 2) Simulasi Pemolesan & Abrasivitas Media Akrilik.'
                    : '1) In Vitro S. mutans Disc Diffusion (CLSI 2022, 0.5 McFarland, 37°C, 24h) · 2) Acrylic Surface Polishing & Abrasiveness Assay.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09. Compact Searchable References */}
      <section id="references" className="behongca-lazy-section py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="behongca-title-panel max-w-2xl">
              <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                {t.sections.referencesTitle}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#13201B] sm:text-3xl dark:text-[#EFF5F1]">
                {t.sections.referencesHeading}
              </h2>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#556960] dark:text-[#8CA398]" />
              <input
                type="search"
                value={refFilter}
                onChange={(e) => setRefFilter(e.target.value)}
                placeholder={
                  lang === 'id' ? 'Filter pustaka (tahun, penulis)...' : 'Filter citations (author, year)...'
                }
                className="w-full rounded-lg border border-[#DCE5DE] bg-white py-2 pr-3 pl-9 text-xs text-[#13201B] focus:border-[#0D7A5F] focus:outline-none dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#EFF5F1]"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {visibleRefs.map((ref) => (
              <div
                key={ref.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-[#DCE5DE] bg-white p-4 dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                    {ref.year} · {ref.topic[lang]}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#31423B] dark:text-[#C5D5CD]">
                    {ref.citation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(ref.id, ref.citation)}
                  title={lang === 'id' ? 'Salin sitasi' : 'Copy citation'}
                  className="shrink-0 rounded-md border border-[#DCE5DE] p-1.5 text-[#556960] hover:border-[#0D7A5F] hover:text-[#0D7A5F] dark:border-[#23332D] dark:text-[#8CA398] dark:hover:text-[#34D399] cursor-pointer"
                >
                  {copiedId === ref.id ? (
                    <Check className="h-3.5 w-3.5 text-[#0D7A5F] dark:text-[#34D399]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>

          {!refFilter.trim() && filteredRefs.length > 6 && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllRefs((v) => !v)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DE] bg-white px-4 py-2 text-xs font-semibold text-[#13201B] hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#E3ECE7] cursor-pointer"
              >
                <span>
                  {showAllRefs
                    ? lang === 'id'
                      ? 'Tampilkan Lebih Ringkas'
                      : 'Show Fewer Citations'
                    : lang === 'id'
                      ? `Tampilkan Semua ${filteredRefs.length} Pustaka`
                      : `Show All ${filteredRefs.length} Citations`}
                </span>
                {showAllRefs ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
