import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, FileText, BookOpen } from 'lucide-react';
import { ArchivedDocument, Language } from '../types';
import { UI_COPY } from '../data/translations';
import {
  ABSTRACT_CONTENT,
  BOTANICAL_INGREDIENTS,
  CONCLUSIONS_DATA,
  DENTAL_GUARDIAN_QUIZ,
  DENTAL_HEALTH_TIPS,
  FORMULATION_TABLE,
  HTST_STAGES,
  LAB_STAT_METRICS,
  ORGANOLEPTIC_TABLE,
  REFERENCES_LIST,
  SMART_DEVICE_PARTS,
  SURVEY_COHORTS,
} from '../data/paperData';

interface QuickSearchModalProps {
  open: boolean;
  lang: Language;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenDocument: (docId: string) => void;
}

interface PaperIndexItem {
  id: string;
  sectionId: string;
  category: string;
  title: string;
  snippet: string;
  keywords: string;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  open,
  lang,
  onClose,
  onNavigateSection,
  onOpenDocument,
}) => {
  const t = UI_COPY[lang];
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');
  const [docMatches, setDocMatches] = useState<ArchivedDocument[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  // Build unified bilingual index across every chapter, table, ingredient, HTST step, SMART part, quiz & citation
  const paperIndex = useMemo<PaperIndexItem[]>(() => {
    const items: PaperIndexItem[] = [];

    items.push({
      id: 'idx-abstract',
      sectionId: 'abstract',
      category: lang === 'id' ? '🦷 Abstrak' : '🦷 Abstract',
      title: t.sections.abstractHeading,
      snippet: ABSTRACT_CONTENT[lang][0],
      keywords: ABSTRACT_CONTENT.keywords.join(' ') + ' ' + ABSTRACT_CONTENT[lang].join(' '),
    });

    SURVEY_COHORTS.forEach((c) => {
      items.push({
        id: `idx-survey-${c.ageGroup}`,
        sectionId: 'survey',
        category: lang === 'id' ? '📊 Survei n=90' : '📊 Survey n=90',
        title: `${c.label[lang]} — Caries ${c.cariesCount}/30 · Gingivitis ${c.gingivitisCount}/30`,
        snippet: c.stageNote[lang],
        keywords: `survei survey karies caries gingivitis ${c.ageGroup} Riskesdas Streptococcus mutans Red Complex`,
      });
    });

    BOTANICAL_INGREDIENTS.forEach((ing) => {
      items.push({
        id: `idx-ing-${ing.id}`,
        sectionId: 'ingredients',
        category: lang === 'id' ? '🌿 Bahan Aktif' : '🌿 Active Ingredient',
        title: `${ing.emoji} ${ing.name[lang]} (${ing.scientificName})`,
        snippet: ing.mechanism[lang],
        keywords: `${ing.name.id} ${ing.name.en} ${ing.scientificName} ${ing.activeCompounds.join(' ')} ${ing.mechanism[lang]}`,
      });
    });

    FORMULATION_TABLE.forEach((row, idx) => {
      items.push({
        id: `idx-form-${idx}`,
        sectionId: 'formulation',
        category: lang === 'id' ? '🧪 Formulasi F1–F3' : '🧪 Formulation F1–F3',
        title: `${row.ingredient[lang]} (${row.scientific})`,
        snippet: `F1: ${row.f1} · F2: ${row.f2} · F3: ${row.f3} — ${row.role[lang]}`,
        keywords: `${row.ingredient.id} ${row.ingredient.en} ${row.scientific} ${row.role[lang]} F1 F2 F3 100 mL`,
      });
    });

    ORGANOLEPTIC_TABLE.forEach((row, idx) => {
      items.push({
        id: `idx-org-${idx}`,
        sectionId: 'formulation',
        category: lang === 'id' ? '📋 Tabel 5 Organoleptik' : '📋 Table 5 Organoleptic',
        title: row.parameter[lang],
        snippet: row.result[lang],
        keywords: `${row.parameter.id} ${row.parameter.en} ${row.result[lang]} ${row.standard[lang]} pH 6.0 6.8`,
      });
    });

    HTST_STAGES.forEach((st) => {
      items.push({
        id: `idx-htst-${st.step}`,
        sectionId: 'htst',
        category: `🌡️ HTST · ${st.tempLabel}`,
        title: `${st.step}. ${st.title[lang]}`,
        snippet: st.description[lang],
        keywords: `${st.title.id} ${st.title.en} ${st.description[lang]} ${st.scientificNote[lang]} 72°C 75°C thermal shock ice bath`,
      });
    });

    SMART_DEVICE_PARTS.forEach((p) => {
      items.push({
        id: `idx-smart-device-${p.id}`,
        sectionId: 'htst',
        category: '⚙️ BEHONGCA SMART Device',
        title: `${p.indonesianName} / ${p.englishName}`,
        snippet: p.functionDesc[lang],
        keywords: `${p.indonesianName} ${p.englishName} ${p.functionDesc[lang]} double-boiler bain-marie thermostat`,
      });
    });

    items.push({
      id: 'idx-local-detector',
      sectionId: 'smart',
      category: lang === 'id' ? '📱 Unduhan Web Lokal' : '📱 Local Web Downloads',
      title: '📱 BEHONGCA SMART DETECTION App',
      snippet:
        lang === 'id'
          ? 'Deskripsi ringkas & tombol unduhan langsung dari folder proyek public/assets/download/ (behongca.settings.json).'
          : 'Concise overview & direct local download from public/assets/download/ (configured via behongca.settings.json).',
      keywords: 'BEHONGCA SMART DETECTION app detector download unduh apk lokal local android plak plaque',
    });

    items.push({
      id: 'idx-local-game',
      sectionId: 'smart',
      category: lang === 'id' ? '🎮 Unduhan Web Lokal' : '🎮 Local Web Downloads',
      title: '🎮 Super BEHONGCA Bros: Dental Guardian',
      snippet:
        lang === 'id'
          ? 'Game edukasi Kotlin + Jetpack Compose dengan unduhan langsung di web dari folder public/assets/download/ (behongca.settings.json).'
          : 'Educational Kotlin + Jetpack Compose game with direct local web download from public/assets/download/ (behongca.settings.json).',
      keywords: 'Super BEHONGCA Bros Dental Guardian game download unduh apk lokal local android kotlin',
    });

    items.push({
      id: 'idx-dental-quiz',
      sectionId: 'quiz',
      category: lang === 'id' ? '🎯 Kuis Interaktif' : '🎯 Interactive Quiz',
      title:
        lang === 'id'
          ? '🎯 DentalQuizGame — 30 Soal Acak & Streak Combo'
          : '🎯 DentalQuizGame — 30 Shuffled Questions & Streak Combo',
      snippet:
        lang === 'id'
          ? 'Kuis dwibahasa (pilih 10/20/30 soal acak) dengan musik latar, efek suara, dan tantangan waktu 15 detik.'
          : 'Bilingual trivia (10/20/30 shuffled questions) with backsound, sound effects, and 15s timed mode.',
      keywords: `quiz kuis trivia DentalQuizGame streak combo ${DENTAL_GUARDIAN_QUIZ.map((q) => q.question[lang]).join(' ')}`,
    });

    DENTAL_HEALTH_TIPS.forEach((tip) => {
      items.push({
        id: `idx-tip-${tip.id}`,
        sectionId: 'tips',
        category: lang === 'id' ? '💡 Tips Kesehatan Gigi' : '💡 Dental Health Tips',
        title: `${tip.emoji} ${tip.title[lang]}`,
        snippet: tip.summary[lang],
        keywords: `tips kesehatan gigi sikat kumur gula pH checklist harian ${tip.title.id} ${tip.title.en} ${tip.scienceNote[lang]}`,
      });
    });

    LAB_STAT_METRICS.forEach((stat) => {
      items.push({
        id: `idx-lab-${stat.id}`,
        sectionId: 'lab-stats',
        category: lang === 'id' ? '📈 Statistik Uji Lab' : '📈 Lab Statistics',
        title: `${stat.emoji} ${stat.title[lang]} (${stat.prefix || ''}${stat.numericValue}${stat.suffix})`,
        snippet: stat.detail[lang],
        keywords: `statistik lab uji CLSI 2022 McFarland CaCO3 HTST F1 F2 F3 ${stat.title.id} ${stat.title.en} ${stat.detail[lang]}`,
      });
    });

    CONCLUSIONS_DATA[lang].forEach((c, idx) => {
      items.push({
        id: `idx-conc-${idx}`,
        sectionId: 'conclusions',
        category: lang === 'id' ? '🔬 Kesimpulan' : '🔬 Conclusion',
        title: c.title,
        snippet: c.body,
        keywords: `${c.title} ${c.body} CLSI 2022 McFarland in vitro I2ASPO`,
      });
    });

    REFERENCES_LIST.forEach((ref) => {
      items.push({
        id: `idx-ref-${ref.id}`,
        sectionId: 'references',
        category: `${ref.year} · ${ref.topic[lang]}`,
        title: ref.citation.slice(0, 96) + (ref.citation.length > 96 ? '...' : ''),
        snippet: ref.citation,
        keywords: `${ref.citation} ${ref.topic.id} ${ref.topic.en} ${ref.year}`,
      });
    });

    return items;
  }, [lang, t.sections.abstractHeading]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  // Query backend document index with lightweight debounce
  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (!q) {
      setDocMatches([]);
      return;
    }

    let cancelled = false;
    setLoadingDocs(true);
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/documents?q=${encodeURIComponent(q)}`, {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) {
          setDocMatches(Array.isArray(data?.documents) ? data.documents : []);
        }
      } catch {
        if (!cancelled) setDocMatches([]);
      } finally {
        if (!cancelled) setLoadingDocs(false);
      }
    }, 150);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, open]);

  const paperMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paperIndex.slice(0, 6);
    return paperIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.snippet.toLowerCase().includes(q) ||
          item.keywords.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, paperIndex]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-16 sm:pt-24 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.quickSearch}
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-[#DCE5DE] bg-white shadow-2xl dark:border-[#23332D] dark:bg-[#141E1B]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-[#DCE5DE] px-4 py-3.5 dark:border-[#23332D]">
              <Search className="h-5 w-5 shrink-0 text-[#0D7A5F] dark:text-[#34D399]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search.placeholder}
                className="w-full bg-transparent text-sm text-[#13201B] placeholder:text-[#788D84] focus:outline-none dark:text-[#EFF5F1] dark:placeholder:text-[#6E847B]"
              />
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1 rounded-md border border-[#DCE5DE] px-2 py-1 font-mono text-[11px] text-[#556960] hover:text-[#13201B] dark:border-[#23332D] dark:text-[#8CA398] cursor-pointer"
              >
                <X className="h-3 w-3" />
                <span>ESC</span>
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
              {!query.trim() && (
                <p className="text-xs text-[#556960] dark:text-[#8CA398]">
                  {t.search.emptyPrompt}
                </p>
              )}

              {/* Paper Results */}
              {paperMatches.length > 0 && (
                <div>
                  <p className="mb-2 font-mono text-[11px] font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                    {t.search.groupPaper}
                  </p>
                  <div className="space-y-1.5">
                    {paperMatches.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onNavigateSection(item.sectionId);
                          onClose();
                        }}
                        className="flex w-full items-start justify-between gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition-colors hover:border-[#DCE5DE] hover:bg-[#F7FAF8] dark:hover:border-[#23332D] dark:hover:bg-[#0F1714] cursor-pointer"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 font-mono text-[10px] text-[#556960] dark:text-[#8CA398]">
                            <BookOpen className="h-3 w-3 text-[#0D7A5F] dark:text-[#34D399]" />
                            <span>{item.category}</span>
                          </div>
                          <div className="mt-0.5 truncate text-sm font-semibold text-[#13201B] dark:text-[#EFF5F1]">
                            {item.title}
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-xs text-[#44574F] dark:text-[#A9BDB3]">
                            {item.snippet}
                          </p>
                        </div>
                        <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-[#788D84]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Server Document Archive Matches */}
              {query.trim() && (
                <div>
                  <p className="mb-2 font-mono text-[11px] font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                    {t.search.groupDocs} {loadingDocs ? '...' : `(${docMatches.length})`}
                  </p>
                  {docMatches.length > 0 && (
                    <div className="space-y-1.5">
                      {docMatches.map((doc) => (
                        <button
                          key={doc.id}
                          type="button"
                          onClick={() => {
                            onOpenDocument(doc.id);
                            onClose();
                          }}
                          className="flex w-full items-start justify-between gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition-colors hover:border-[#DCE5DE] hover:bg-[#F7FAF8] dark:hover:border-[#23332D] dark:hover:bg-[#0F1714] cursor-pointer"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 font-mono text-[10px] text-[#556960] dark:text-[#8CA398]">
                              <FileText className="h-3 w-3 text-[#0D7A5F] dark:text-[#34D399]" />
                              <span>{doc.fileName}</span>
                            </div>
                            <div className="mt-0.5 truncate text-sm font-semibold text-[#13201B] dark:text-[#EFF5F1]">
                              {doc.title}
                            </div>
                            {doc.matchSnippet && (
                              <p className="mt-0.5 line-clamp-2 font-mono text-[11px] text-[#44574F] dark:text-[#A9BDB3]">
                                {doc.matchSnippet}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-[#788D84]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {query.trim() &&
                paperMatches.length === 0 &&
                docMatches.length === 0 &&
                !loadingDocs && (
                  <p className="py-6 text-center text-xs text-[#556960] dark:text-[#8CA398]">
                    {t.search.noResults}
                  </p>
                )}
            </div>

            <div className="border-t border-[#DCE5DE] bg-[#F7FAF8] px-4 py-2.5 text-[11px] text-[#556960] dark:border-[#23332D] dark:bg-[#0F1714] dark:text-[#8CA398]">
              {t.search.hintNavigate}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
