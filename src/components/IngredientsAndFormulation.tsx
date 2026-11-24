import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { FlaskConical, Sparkles, AlertTriangle, CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { UI_COPY } from '../data/translations';
import {
  BOTANICAL_INGREDIENTS,
  FORMULATION_TABLE,
  ORGANOLEPTIC_TABLE,
} from '../data/paperData';

interface IngredientsAndFormulationProps {
  lang: Language;
}

type FormulaKey = 'f1' | 'f2' | 'f3';
type PhZoneId = 'acid_critical' | 'behongca_optimal' | 'physiological_safe' | 'alkaline_excess';

const ORGANOLEPTIC_EMOJIS = ['🧪', '🎨', '👃', '😋', '⚖️', '🛡️'];
const TABLE_ROW_EMOJIS = ['🌿', '🌱', '🥭', '🥭', '🍃', '🥚', '💧'];

const PH_MIN = 3.0;
const PH_MAX = 9.0;

interface PhZoneDefinition {
  id: PhZoneId;
  emoji: string;
  rangeLabel: string;
  samplePh: number;
  title: { id: string; en: string };
  badge: { id: string; en: string };
  description: { id: string; en: string };
}

const PH_ZONES: PhZoneDefinition[] = [
  {
    id: 'acid_critical',
    emoji: '🚨',
    rangeLabel: 'pH < 5.5',
    samplePh: 4.2,
    title: {
      id: '1. Di Bawah Ambang Kritis (pH < 5,5)',
      en: '1. Below Critical Threshold (pH < 5.5)',
    },
    badge: {
      id: 'Bahaya: Terlalu Asam · Demineralisasi Email',
      en: 'Danger: Too Acidic · Enamel Demineralization',
    },
    description: {
      id: 'Kondisi asam akibat fermentasi gula oleh S. mutans yang melarutkan kristal hidroksiapatit email gigi (demineralisasi).',
      en: 'Acidic environment from sugar fermentation by S. mutans that dissolves tooth enamel hydroxyapatite crystals (demineralization).',
    },
  },
  {
    id: 'behongca_optimal',
    emoji: '⭐',
    rangeLabel: 'pH 6.0–6.8',
    samplePh: 6.4,
    title: {
      id: '2. Zona Aman Optimal BEHONGCA (pH 6,0–6,8)',
      en: '2. Optimal BEHONGCA Buffer Zone (pH 6.0–6.8)',
    },
    badge: {
      id: 'Berada di Rentang Zona BEHONGCA',
      en: 'Inside Optimal BEHONGCA Zone',
    },
    description: {
      id: 'Kalsium karbonat (CaCO₃) cangkang telur menyangga asam organik ekstrak buah/herbal sehingga efektif menjaga pH aman bagi email gigi.',
      en: 'Eggshell calcium carbonate (CaCO₃) buffers organic acids from fruit and herbal extracts into the enamel-safe zone.',
    },
  },
  {
    id: 'physiological_safe',
    emoji: '🛡️',
    rangeLabel: 'pH 5.5–7.5',
    samplePh: 5.7,
    title: {
      id: '3. Rentang Fisiologis Rongga Mulut (5,5–7,5)',
      en: '3. Physiological Oral Cavity Range (5.5–7.5)',
    },
    badge: {
      id: 'Aman Fisiologis · Sekitar Zona BEHONGCA',
      en: 'Physiologically Safe · Near BEHONGCA Window',
    },
    description: {
      id: 'Tidak memicu erosi asam pada email gigi maupun iritasi basa pada mukosa mulut (zona transisi aman rongga mulut).',
      en: 'Does not trigger acid erosion on tooth enamel or alkaline mucosal irritation (safe oral physiological window).',
    },
  },
  {
    id: 'alkaline_excess',
    emoji: '⚠️',
    rangeLabel: 'pH > 7.5',
    samplePh: 8.2,
    title: {
      id: '4. Melebihi Batas Atas Fisiologis (pH > 7,5)',
      en: '4. Above Upper Physiological Limit (pH > 7.5)',
    },
    badge: {
      id: 'Peringatan: Terlalu Basa · Berpotensi Iritasi',
      en: 'Warning: Too Alkaline · Mucosal Discomfort Risk',
    },
    description: {
      id: 'Kondisi basa berlebih berpotensi menimbulkan rasa tidak nyaman atau iritasi ringan pada mukosa oral.',
      en: 'Excessive alkalinity may cause mild discomfort or irritation to sensitive oral mucosal tissue.',
    },
  },
];

function classifyPhZone(ph: number): PhZoneId {
  if (ph < 5.5) return 'acid_critical';
  if (ph >= 6.0 && ph <= 6.8) return 'behongca_optimal';
  if (ph <= 7.5) return 'physiological_safe';
  return 'alkaline_excess';
}

export const IngredientsAndFormulation: React.FC<IngredientsAndFormulationProps> = ({
  lang,
}) => {
  const t = UI_COPY[lang];
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>(
    BOTANICAL_INGREDIENTS[0].id
  );
  const [activeFormula, setActiveFormula] = useState<FormulaKey>('f2');
  const [phValue, setPhValue] = useState<number>(6.4);

  const activeIng =
    BOTANICAL_INGREDIENTS.find((i) => i.id === selectedIngredientId) ||
    BOTANICAL_INGREDIENTS[0];

  const activeZoneId = useMemo(() => classifyPhZone(phValue), [phValue]);
  const activeZone =
    PH_ZONES.find((z) => z.id === activeZoneId) || PH_ZONES[1];

  const phPercent = ((phValue - PH_MIN) / (PH_MAX - PH_MIN)) * 100;

  const formulaSummary: Record<
    FormulaKey,
    { label: string; botanicalVol: number; aquadesVol: number; note: { id: string; en: string } }
  > = {
    f1: {
      label: 'Formula 1 (F1)',
      botanicalVol: 55,
      aquadesVol: 45,
      note: {
        id: 'Ekstrak ringan (10 mL tiap daun utama) — rasa mangga & mint paling lembut.',
        en: 'Light botanical ratio (10 mL each primary leaf) — mildest fruity-mint flavor.',
      },
    },
    f2: {
      label: 'Formula 2 (F2)',
      botanicalVol: 70,
      aquadesVol: 30,
      note: {
        id: 'Rasio seimbang (15 mL tiap ekstrak) — kombinasi optimal antibakteri & rasa nyaman anak.',
        en: 'Balanced ratio (15 mL each extract) — optimal antibacterial strength & child palatability.',
      },
    },
    f3: {
      label: 'Formula 3 (F3)',
      botanicalVol: 85,
      aquadesVol: 15,
      note: {
        id: 'Konsentrasi fitokimia tertinggi (20 mL tiap ekstrak) — daya hambat biofilm S. mutans maksimal.',
        en: 'Highest phytochemical density (20 mL each) — maximum S. mutans biofilm inhibition.',
      },
    },
  };

  const quickPresets = [
    { ph: 4.2, label: { id: '4.2 Kritis', en: '4.2 Critical' } },
    { ph: 5.7, label: { id: '5.7 Fisiologis', en: '5.7 Safe' } },
    { ph: 6.4, label: { id: '6.4 BEHONGCA', en: '6.4 BEHONGCA' } },
    { ph: 8.2, label: { id: '8.2 Basa', en: '8.2 Alkaline' } },
  ];

  const bannerStyles: Record<PhZoneId, string> = {
    acid_critical:
      'border-[#DC2626]/45 bg-[#DC2626]/10 text-[#991B1B] dark:border-[#F87171]/45 dark:bg-[#F87171]/12 dark:text-[#FCA5A5]',
    behongca_optimal:
      'border-[#0D7A5F]/50 bg-[#0D7A5F]/10 text-[#0A5A46] dark:border-[#34D399]/50 dark:bg-[#34D399]/12 dark:text-[#6EE7B7]',
    physiological_safe:
      'border-[#0284C7]/45 bg-[#0284C7]/10 text-[#075985] dark:border-[#38BDF8]/45 dark:bg-[#38BDF8]/12 dark:text-[#7DD3FC]',
    alkaline_excess:
      'border-[#D97706]/45 bg-[#FEF3C7]/70 text-[#92400E] dark:border-[#F59E0B]/45 dark:bg-[#2A2212] dark:text-[#FCD34D]',
  };

  return (
    <>
      {/* 03. Five Natural Ingredients with Emojis */}
      <section
        id="ingredients"
        className="border-b border-[#DCE5DE] py-12 lg:py-16 dark:border-[#23332D]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="behongca-title-panel max-w-2xl">
            <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
              {t.sections.ingredientsTitle}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#13201B] sm:text-3xl [text-wrap:balance] dark:text-[#EFF5F1]">
              {t.sections.ingredientsHeading}
            </h2>
          </div>

          {/* 5 Interactive Visual Emoji Cards */}
          <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {BOTANICAL_INGREDIENTS.map((item) => {
              const isSelected = item.id === activeIng.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedIngredientId(item.id)}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0D7A5F] bg-white shadow-sm ring-1 ring-[#0D7A5F]/20 dark:border-[#34D399] dark:bg-[#0D4A3A] dark:ring-[#34D399]/35'
                      : 'border-[#DCE5DE] bg-white/80 hover:-translate-y-0.5 hover:border-[#0D7A5F]/50 dark:border-[#23332D] dark:bg-[#141E1B] dark:hover:border-[#34D399]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl" aria-hidden="true">
                        {item.emoji}
                      </span>
                      <span
                        className={`font-mono text-[10px] font-semibold ${
                          isSelected
                            ? 'text-[#556960] dark:text-[#D1FAE5]'
                            : 'text-[#556960] dark:text-[#8CA398]'
                        }`}
                      >
                        {item.extractionRatio.split(' ')[0]} {item.extractionRatio.split(' ')[1]}
                      </span>
                    </div>

                    <h3
                      className={`mt-3 font-display text-sm font-bold ${
                        isSelected ? 'text-[#13201B] dark:text-white' : 'text-[#13201B] dark:text-[#EFF5F1]'
                      }`}
                    >
                      {item.name[lang]}
                    </h3>
                    <p
                      className={`mt-0.5 text-[11px] italic ${
                        isSelected
                          ? 'text-[#556960] dark:text-[#D1FAE5]/85'
                          : 'text-[#556960] dark:text-[#8CA398]'
                      }`}
                    >
                      {item.scientificName}
                    </p>
                  </div>

                  <p
                    className={`mt-3 border-t pt-2.5 text-xs font-medium ${
                      isSelected
                        ? 'border-[#DCE5DE] text-[#0D7A5F] dark:border-[#34D399]/35 dark:text-[#A7F3D0]'
                        : 'border-[#DCE5DE] text-[#0D7A5F] dark:border-[#23332D] dark:text-[#34D399]'
                    }`}
                  >
                    {item.role[lang]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Focused Mechanism Spotlight for Selected Ingredient */}
          <motion.div
            key={activeIng.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-[#DCE5DE] bg-white p-5 sm:p-6 lg:grid-cols-12 dark:border-[#23332D] dark:bg-[#141E1B]"
          >
            <div className="flex items-center gap-4 lg:col-span-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#EEF4F0] text-4xl dark:bg-[#0F1714]">
                {activeIng.emoji}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  {activeIng.name[lang]}
                </h3>
                <p className="text-xs italic text-[#556960] dark:text-[#8CA398]">
                  {activeIng.scientificName}
                </p>
                <p className="mt-1 font-mono text-[11px] text-[#0D7A5F] dark:text-[#34D399]">
                  {activeIng.partUsed[lang]}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 lg:border-l lg:border-[#DCE5DE] lg:pl-6 dark:lg:border-[#23332D]">
              <p className="text-sm leading-relaxed text-[#25362F] dark:text-[#D1DFD7]">
                {activeIng.mechanism[lang]}
              </p>
              <p className="mt-2.5 font-mono text-xs text-[#556960] dark:text-[#8CA398]">
                <strong className="text-[#13201B] dark:text-[#E3ECE7]">
                  {lang === 'id' ? 'Bioaktif: ' : 'Bioactives: '}
                </strong>
                {activeIng.activeCompounds.join(' · ')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 04. Interactive Formulation Matrix (F1–F3), Interactive CaCO3 pH Slider & Organoleptic Cards */}
      <section
        id="formulation"
        className="border-b border-[#DCE5DE] py-12 lg:py-16 dark:border-[#23332D]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="behongca-title-panel max-w-2xl">
              <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                {t.sections.formulationTitle}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-[#13201B] sm:text-3xl [text-wrap:balance] dark:text-[#EFF5F1]">
                {t.sections.formulationHeading}
              </h2>
            </div>

            <div className="inline-flex items-center gap-1 self-start rounded-lg border border-[#DCE5DE] bg-[#EEF4F0] p-1 dark:border-[#23332D] dark:bg-[#141E1B]">
              {(['f1', 'f2', 'f3'] as FormulaKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFormula(key)}
                  className={`rounded-md border px-3.5 py-2 font-mono text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    activeFormula === key
                      ? 'border-[#0D7A5F]/25 bg-white text-[#0D7A5F] shadow-2xs dark:border-[#34D399]/75 dark:bg-[#0D4A3A] dark:text-white'
                      : 'border-transparent text-[#44574F] hover:text-[#13201B] dark:text-[#A9BDB3] dark:hover:text-white'
                  }`}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Compact Table 4 */}
            <div className="rounded-xl border border-[#DCE5DE] bg-white p-5 lg:col-span-8 dark:border-[#23332D] dark:bg-[#141E1B]">
              <div className="flex items-center justify-between border-b border-[#DCE5DE] pb-3 dark:border-[#23332D]">
                <div className="flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 text-[#0D7A5F] dark:text-[#34D399]" />
                  <h3 className="font-display text-sm font-bold text-[#13201B] dark:text-[#EFF5F1]">
                    {lang === 'id' ? 'Komposisi per 100 mL (Tabel 4)' : 'Composition per 100 mL (Table 4)'}
                  </h3>
                </div>
                <span className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                  {formulaSummary[activeFormula].label}
                </span>
              </div>

              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#DCE5DE] text-[#556960] dark:border-[#23332D] dark:text-[#8CA398]">
                      <th className="py-2 pr-3 font-semibold">
                        {lang === 'id' ? 'Bahan' : 'Ingredient'}
                      </th>
                      <th className="py-2 px-2.5 text-right font-mono font-semibold">F1</th>
                      <th className="py-2 px-2.5 text-right font-mono font-semibold">F2</th>
                      <th className="py-2 pl-2.5 text-right font-mono font-semibold">F3</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE5DE]/60 dark:divide-[#23332D]/60">
                    {FORMULATION_TABLE.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 pr-3">
                          <span className="mr-1.5" aria-hidden="true">
                            {TABLE_ROW_EMOJIS[idx]}
                          </span>
                          <span className="font-medium text-[#13201B] dark:text-[#E3ECE7]">
                            {row.ingredient[lang]}
                          </span>
                          <span className="ml-1.5 text-[11px] italic text-[#556960] dark:text-[#8CA398]">
                            ({row.scientific})
                          </span>
                        </td>
                        {(['f1', 'f2', 'f3'] as FormulaKey[]).map((fk) => (
                          <td
                            key={fk}
                            className={`py-2.5 px-2.5 text-right font-mono whitespace-nowrap ${
                              activeFormula === fk
                                ? 'bg-[#0D7A5F]/10 font-bold text-[#0D7A5F] dark:bg-[#34D399]/12 dark:text-[#34D399]'
                                : 'text-[#44574F] dark:text-[#98AEA4]'
                            }`}
                          >
                            {row[fk]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Botanical Extraction Ratio Card */}
            <div className="flex flex-col justify-between gap-4 lg:col-span-4">
              <div className="flex h-full flex-col justify-between rounded-xl border border-[#DCE5DE] bg-white p-5 dark:border-[#23332D] dark:bg-[#141E1B]">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#556960] dark:text-[#8CA398]">
                    <span>{lang === 'id' ? 'Rasio Ekstrak Aktif' : 'Active Botanical Ratio'}</span>
                    <Sparkles className="h-4 w-4 text-[#0D7A5F] dark:text-[#34D399]" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-bold tabular-nums text-[#13201B] dark:text-[#EFF5F1]">
                      {formulaSummary[activeFormula].botanicalVol}%
                    </span>
                    <span className="font-mono text-xs text-[#556960] dark:text-[#8CA398]">
                      herbal · {formulaSummary[activeFormula].aquadesVol}% aquades
                    </span>
                  </div>
                  <div className="mt-4 h-3.5 w-full overflow-hidden rounded-full bg-[#E5EDE8] dark:bg-[#1E2C26]">
                    <motion.div
                      key={activeFormula}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.35 }}
                      style={{
                        width: `${formulaSummary[activeFormula].botanicalVol}%`,
                        transformOrigin: 'left center',
                      }}
                      className="h-full bg-[#0D7A5F] dark:bg-[#34D399]"
                    />
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-[#3D4F47] dark:text-[#B9CBC2]">
                    {formulaSummary[activeFormula].note[lang]}
                  </p>
                </div>

                <div className="mt-5 border-t border-[#DCE5DE] pt-3.5 text-xs text-[#44574F] dark:border-[#23332D] dark:text-[#A9BDB3]">
                  <p className="font-mono font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                    🥚 CaCO₃ Micro-Buffer · 0.5 g / 100 mL
                  </p>
                  <p className="mt-1">
                    {lang === 'id'
                      ? 'Menjaga keseimbangan pH herbal agar tetap berada di rentang aman email 6,0–6,8.'
                      : 'Balances organic herbal acidity cleanly inside the enamel-safe 6.0–6.8 window.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive PENYANGGA pH CaCO3 Slider Console (pH 3.0 – 9.0) */}
          <div className="mt-6 rounded-xl border border-[#DCE5DE] bg-white p-5 sm:p-6 dark:border-[#23332D] dark:bg-[#141E1B]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                  ⚖️ {lang === 'id' ? 'SIMULATOR INTERAKTIF PENYANGGA pH CaCO₃' : 'INTERACTIVE CaCO₃ pH BUFFER SIMULATOR'}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  {lang === 'id'
                    ? 'Geser Skala pH (3.0–9.0) & Cek Zona Keamanan Email Gigi'
                    : 'Slide the pH Scale (3.0–9.0) to Inspect Tooth Enamel Safety Zones'}
                </h3>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {quickPresets.map((preset) => {
                  const isCurrent = Math.abs(phValue - preset.ph) < 0.05;
                  return (
                    <button
                      key={preset.ph}
                      type="button"
                      onClick={() => setPhValue(preset.ph)}
                      className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        isCurrent
                          ? 'border-[#0D7A5F] bg-[#0D7A5F] text-white dark:border-[#34D399] dark:bg-[#0D4A3A] dark:text-white'
                          : 'border-[#DCE5DE] bg-[#F7FAF8] text-[#31423B] hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#0F1714] dark:text-[#C5D5CD] dark:hover:border-[#34D399]/60 dark:hover:text-white'
                      }`}
                    >
                      pH {preset.label[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Numeric Readout + Range Scrubber */}
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-center">
              <div className="flex items-center gap-4 lg:col-span-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#EEF4F0] text-3xl dark:bg-[#0F1714]">
                  {activeZone.emoji}
                </div>
                <div>
                  <p className="font-mono text-[11px] font-semibold text-[#556960] dark:text-[#8CA398]">
                    {lang === 'id' ? 'Nilai pH Aktif' : 'Active pH Value'}
                  </p>
                  <p className="font-mono text-3xl font-bold tabular-nums text-[#13201B] dark:text-[#EFF5F1]">
                    {phValue.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-9">
                {/* Visual Multi-Zone Spectrum Bar */}
                <div className="relative pt-5 pb-2">
                  {/* BEHONGCA 6.0-6.8 Highlight Tag */}
                  <div
                    className="pointer-events-none absolute top-0 -translate-x-1/2 font-mono text-[10px] font-bold text-[#0D7A5F] dark:text-[#34D399] whitespace-nowrap"
                    style={{ left: '56.67%' }}
                  >
                    ⭐ ZONA BEHONGCA (6.0–6.8)
                  </div>

                  <div className="relative h-4 w-full overflow-hidden rounded-full border border-[#DCE5DE] dark:border-[#23332D] flex">
                    {/* 3.0 - 5.5 (41.67%) Critical Acid */}
                    <div
                      className="h-full bg-[#DC2626]/75 dark:bg-[#EF4444]/75"
                      style={{ width: '41.67%' }}
                    />
                    {/* 5.5 - 6.0 (8.33%) Physiological lower */}
                    <div
                      className="h-full bg-[#38BDF8]/65 dark:bg-[#0284C7]/65"
                      style={{ width: '8.33%' }}
                    />
                    {/* 6.0 - 6.8 (13.33%) BEHONGCA Optimal */}
                    <div
                      className="h-full bg-[#10B981] dark:bg-[#34D399]"
                      style={{ width: '13.33%' }}
                    />
                    {/* 6.8 - 7.5 (11.67%) Physiological upper */}
                    <div
                      className="h-full bg-[#38BDF8]/65 dark:bg-[#0284C7]/65"
                      style={{ width: '11.67%' }}
                    />
                    {/* 7.5 - 9.0 (25%) Alkaline excess */}
                    <div
                      className="h-full bg-[#F59E0B]/80 dark:bg-[#D97706]/80"
                      style={{ width: '25%' }}
                    />
                  </div>

                  {/* Active Needle Indicator */}
                  <div
                    className="pointer-events-none absolute top-4 h-6 w-1 -translate-x-1/2 rounded-full bg-[#13201B] ring-2 ring-white dark:bg-white dark:ring-[#0D1311] transition-[left] duration-75"
                    style={{ left: `${phPercent}%` }}
                  />
                </div>

                {/* Native Accessible Range Input */}
                <input
                  type="range"
                  min={PH_MIN}
                  max={PH_MAX}
                  step={0.1}
                  value={phValue}
                  aria-label={lang === 'id' ? 'Penggeser nilai pH CaCO3' : 'CaCO3 pH value slider'}
                  onChange={(e) => setPhValue(parseFloat(e.target.value))}
                  className="mt-1 w-full accent-[#0D7A5F] dark:accent-[#34D399] cursor-pointer"
                />

                <div className="mt-1 flex justify-between font-mono text-[10px] text-[#556960] dark:text-[#8CA398]">
                  <span>3.0</span>
                  <span>5.5 ({lang === 'id' ? 'Kritis' : 'Critical'})</span>
                  <span className="font-bold text-[#0D7A5F] dark:text-[#34D399]">6.0–6.8</span>
                  <span>7.5 ({lang === 'id' ? 'Batas Atas' : 'Upper'})</span>
                  <span>9.0</span>
                </div>
              </div>
            </div>

            {/* Dynamic Real-Time Zone Notification Banner */}
            <div
              role="status"
              aria-live="polite"
              className={`mt-5 flex flex-col gap-2 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${bannerStyles[activeZone.id]}`}
            >
              <div className="flex items-start gap-3">
                {activeZone.id === 'acid_critical' ? (
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
                ) : activeZone.id === 'behongca_optimal' ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                ) : activeZone.id === 'physiological_safe' ? (
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                )}
                <div>
                  <p className="font-mono text-xs font-bold">
                    pH {phValue.toFixed(1)} · {activeZone.badge[lang]}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed">
                    {activeZone.description[lang]}
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Interactive Zone Reference Cards */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PH_ZONES.map((zone) => {
                const isSelected = zone.id === activeZone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setPhValue(zone.samplePh)}
                    className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0D7A5F] bg-[#EEF4F0] shadow-2xs ring-1 ring-[#0D7A5F]/25 dark:border-[#34D399] dark:bg-[#0D4A3A] dark:ring-[#34D399]/40'
                        : 'border-[#DCE5DE] bg-[#F7FAF8] hover:border-[#0D7A5F]/50 dark:border-[#23332D] dark:bg-[#0F1714] dark:hover:border-[#34D399]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl" aria-hidden="true">
                          {zone.emoji}
                        </span>
                        <span
                          className={`font-mono text-[11px] font-bold ${
                            isSelected
                              ? 'text-[#0D7A5F] dark:text-[#A7F3D0]'
                              : 'text-[#0D7A5F] dark:text-[#34D399]'
                          }`}
                        >
                          {zone.rangeLabel}
                        </span>
                      </div>
                      <h4
                        className={`mt-2 font-display text-xs font-bold ${
                          isSelected ? 'text-[#13201B] dark:text-white' : 'text-[#13201B] dark:text-[#EFF5F1]'
                        }`}
                      >
                        {zone.title[lang]}
                      </h4>
                      <p
                        className={`mt-1.5 text-[11px] leading-relaxed ${
                          isSelected
                            ? 'text-[#31423B] dark:text-[#E2F5EC]'
                            : 'text-[#44574F] dark:text-[#A9BDB3]'
                        }`}
                      >
                        {zone.description[lang]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6 Visual Organoleptic Cards (Table 5) */}
          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {ORGANOLEPTIC_TABLE.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-[#DCE5DE] bg-white p-4 dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <span className="text-2xl shrink-0" aria-hidden="true">
                  {ORGANOLEPTIC_EMOJIS[idx]}
                </span>
                <div>
                  <p className="font-mono text-[11px] font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                    {item.parameter[lang]}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#13201B] dark:text-[#EFF5F1]">
                    {item.result[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
