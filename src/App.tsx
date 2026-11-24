import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language, ReaderScale, SiteConfig, ThemeMode } from './types';
import { NavbarAndControls } from './components/NavbarAndControls';
import { HeroSection } from './components/HeroSection';
import { SurveySection } from './components/SurveySection';
import { IngredientsAndFormulation } from './components/IngredientsAndFormulation';
import { DEFAULT_BACKGROUNDS, PixelBackdropLayer } from './components/PixelBackdropLayer';
import { PageLoadingSplash } from './components/PageLoadingSplash';
import { RESEARCH_AUTHORS } from './data/paperData';
import { UI_COPY } from './data/translations';

import { playClickSound } from './utils/soundEngine';

const HtstSimulator = lazy(() =>
  import('./components/HtstSimulator').then((m) => ({ default: m.HtstSimulator }))
);
const SmartEcosystemSection = lazy(() =>
  import('./components/SmartEcosystemSection').then((m) => ({ default: m.SmartEcosystemSection }))
);
const DentalTipsSection = lazy(() =>
  import('./components/DentalTipsSection').then((m) => ({ default: m.DentalTipsSection }))
);
const DocumentArchiveSection = lazy(() =>
  import('./components/DocumentArchiveSection').then((m) => ({ default: m.DocumentArchiveSection }))
);
const ConclusionsAndReferences = lazy(() =>
  import('./components/ConclusionsAndReferences').then((m) => ({
    default: m.ConclusionsAndReferences,
  }))
);
const QuickSearchModal = lazy(() =>
  import('./components/QuickSearchModal').then((m) => ({ default: m.QuickSearchModal }))
);

function SectionPlaceholder({
  id,
  extraIds = [],
  minHeightClass = 'min-h-[420px]',
}: {
  id: string;
  extraIds?: string[];
  minHeightClass?: string;
}) {
  return (
    <section
      id={id}
      aria-hidden="true"
      className={`border-b border-[#DCE5DE] py-12 dark:border-[#23332D] ${minHeightClass}`}
    >
      {extraIds.map((extraId) => (
        <div key={extraId} id={extraId} />
      ))}
    </section>
  );
}

const FALLBACK_SITE_CONFIG: SiteConfig = {
  downloads: {
    detector: {
      configuredPath: 'public/assets/download/behongca-smart-detection.apk',
      publicUrl: '/assets/download/behongca-smart-detection.apk',
      fileName: 'behongca-smart-detection.apk',
      available: false,
    },
    game: {
      configuredPath: 'public/assets/download/super-behongca-bros.apk',
      publicUrl: '/assets/download/super-behongca-bros.apk',
      fileName: 'super-behongca-bros.apk',
      available: false,
    },
  },
  backgrounds: DEFAULT_BACKGROUNDS,
  navbar: {
    topBlurPx: 2,
    scrolledBlurPx: 14,
  },
  paperMetadata: {
    kicker: UI_COPY.id.hero.kicker,
    title: {
      id: UI_COPY.id.hero.title,
      en: UI_COPY.en.hero.title,
    },
    subtitle: {
      id: 'Obat kumur herbal 100% bebas alkohol dari daun binahong, cangkang telur, mangga, krokot, dan cornmint — dilengkapi perangkat HTST, detektor plak, dan game edukasi.',
      en: '100% alcohol-free herbal mouthwash crafted from binahong leaves, eggshells, mangoes, purslane, and cornmint — paired with an HTST smart device, plaque detector, and educational game.',
    },
    authors: RESEARCH_AUTHORS,
    institution: 'SMP Negeri 1 Surakarta',
    year: 2026,
  },
  documentCategories: [
    { id: 'manuscript', emoji: '📄', label: { id: 'Makalah Utama', en: 'Manuscript' } },
    { id: 'lab_report', emoji: '🧪', label: { id: 'Laporan Lab', en: 'Lab Report' } },
    { id: 'protocol', emoji: '📋', label: { id: 'Protokol', en: 'Protocol' } },
    { id: 'presentation', emoji: '📊', label: { id: 'Presentasi', en: 'Presentation' } },
    { id: 'reference', emoji: '📚', label: { id: 'Referensi', en: 'Reference' } },
  ],
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('behongca_lang');
    return saved === 'en' ? 'en' : 'id';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('behongca_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [readerScale, setReaderScale] = useState<ReaderScale>(() => {
    const saved = localStorage.getItem('behongca_scale');
    return saved === 'large' ? 'large' : 'standard';
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(FALLBACK_SITE_CONFIG);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hasOpenedSearch, setHasOpenedSearch] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [footerLogoError, setFooterLogoError] = useState(false);
  const [footerLogoPopping, setFooterLogoPopping] = useState(false);

  const openSearch = useCallback(() => {
    setHasOpenedSearch(true);
    setSearchOpen(true);
  }, []);

  // Load curated settings from behongca.settings.json via /api/site-config
  useEffect(() => {
    let cancelled = false;
    fetch('/api/site-config', { headers: { Accept: 'application/json' } })
      .then(async (r) => {
        if (!r.ok) {
          throw new Error(`HTTP ${r.status} (${r.statusText})`);
        }
        const rawText = await r.text();
        try {
          return JSON.parse(rawText) as SiteConfig;
        } catch {
          throw new Error(`Invalid JSON from /api/site-config: ${rawText.slice(0, 60)}`);
        }
      })
      .then((data) => {
        if (
          !cancelled &&
          data &&
          data.paperMetadata &&
          Array.isArray(data.documentCategories) &&
          data.downloads &&
          data.downloads.detector &&
          data.downloads.game
        ) {
          setSiteConfig(data);
        }
      })
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.warn('[App] /api/site-config failed, using fallback:', err);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Idle-prefetch below-the-fold lazy chunks after first paint for snappy navigation
  useEffect(() => {
    const prefetch = () => {
      import('./components/HtstSimulator');
      import('./components/SmartEcosystemSection');
      import('./components/DentalTipsSection');
      import('./components/DocumentArchiveSection');
      import('./components/ConclusionsAndReferences');
    };
    const idleApi = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof idleApi.requestIdleCallback === 'function') {
      const id = idleApi.requestIdleCallback(prefetch, { timeout: 1500 });
      return () => idleApi.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(prefetch, 900);
    return () => window.clearTimeout(timer);
  }, []);

  // Sync dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('behongca_theme', theme);
  }, [theme]);

  // Sync language attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('behongca_lang', lang);
  }, [lang]);

  // Sync comfortable reader text scale
  useEffect(() => {
    const root = document.documentElement;
    if (readerScale === 'large') {
      root.classList.add('reader-large');
    } else {
      root.classList.remove('reader-large');
    }
    localStorage.setItem('behongca_scale', readerScale);
  }, [readerScale]);

  // Global Cmd/Ctrl + K Quick Search shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setHasOpenedSearch(true);
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Global delegated subtle click sound for interactive buttons, tabs, and links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a, [role="button"], [role="tab"]');
      if (!interactive) return;
      if (
        interactive.hasAttribute('disabled') ||
        interactive.getAttribute('aria-disabled') === 'true' ||
        interactive.closest('[data-quiz-option="true"], [data-sound-toggle="true"]')
      ) {
        return;
      }
      playClickSound();
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Show back-to-top button on scroll with rAF throttling
  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const next = window.scrollY > 600;
      setShowBackToTop((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const navigateToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleOpenDocumentFromSearch = useCallback((docId: string) => {
    setSelectedDocId(docId);
    const el = document.getElementById('archive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="behongca-scenic-stage relative min-h-screen text-[#13201B] transition-colors duration-200 dark:text-[#E3ECE7]">
      <PageLoadingSplash lang={lang} />
      <PixelBackdropLayer backgrounds={siteConfig.backgrounds} theme={theme} />

      <div className="relative z-10">
        <NavbarAndControls
          lang={lang}
          onToggleLang={() => setLang((prev) => (prev === 'id' ? 'en' : 'id'))}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          readerScale={readerScale}
          onToggleScale={() =>
            setReaderScale((prev) => (prev === 'standard' ? 'large' : 'standard'))
          }
          navbarSettings={siteConfig.navbar}
          onOpenSearch={openSearch}
        />

        <main>
          <HeroSection
            lang={lang}
            paperMetadata={siteConfig.paperMetadata}
            onJumpToArchive={() => navigateToSection('archive')}
          />
          <SurveySection lang={lang} />
          <IngredientsAndFormulation lang={lang} />

          <Suspense fallback={<SectionPlaceholder id="htst" />}>
            <HtstSimulator lang={lang} />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder id="smart" extraIds={['quiz']} />}>
            <SmartEcosystemSection lang={lang} downloads={siteConfig.downloads} />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder id="tips" />}>
            <DentalTipsSection lang={lang} />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder id="archive" minHeightClass="min-h-[560px]" />}>
            <DocumentArchiveSection
              lang={lang}
              categories={siteConfig.documentCategories}
              selectedDocId={selectedDocId}
              onSelectDocId={setSelectedDocId}
            />
          </Suspense>

          <Suspense
            fallback={<SectionPlaceholder id="conclusions" extraIds={['lab-stats', 'references']} />}
          >
            <ConclusionsAndReferences lang={lang} />
          </Suspense>
        </main>

        <footer className="border-t border-[#DCE5DE] bg-[#EEF4F0]/82 py-8 backdrop-blur-md dark:border-[#23332D] dark:bg-[#111916]/82">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 text-xs text-[#44574F] sm:flex-row sm:items-center sm:px-6 lg:px-8 dark:text-[#98AEA4]">
            <a
              href="#top"
              onClick={() => {
                setFooterLogoPopping(false);
                window.requestAnimationFrame(() => setFooterLogoPopping(true));
                window.setTimeout(() => setFooterLogoPopping(false), 430);
              }}
              className="behongca-brand-link inline-flex items-center gap-3 text-left"
            >
              {!footerLogoError && (
                <img
                  src="/assets/logo/favicon_io/apple-touch-icon.png"
                  alt="Logo BEHONGCA"
                  width={36}
                  height={36}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setFooterLogoError(true)}
                  className={`behongca-brand-logo h-9 w-9 rounded-full object-contain shrink-0 ${
                    footerLogoPopping ? 'is-popping' : ''
                  }`}
                />
              )}
              <div>
                <p className="behongca-brand-text font-display font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  BEHONGCA · {siteConfig.paperMetadata.institution} ({siteConfig.paperMetadata.year})
                </p>
                <p className="mt-1">
                  Applied Life Sciences · Indonesia International Applied Science Project Olympiad (I2ASPO)
                </p>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <a
                href="#top"
                className="hover:text-[#0D7A5F] dark:hover:text-[#34D399] transition-colors"
              >
                {lang === 'id' ? 'Kembali ke Atas' : 'Back to Top'}
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="#archive"
                className="hover:text-[#0D7A5F] dark:hover:text-[#34D399] transition-colors"
              >
                {lang === 'id' ? 'Unduh PDF' : 'Download PDF'}
              </a>
            </div>
          </div>
        </footer>

        {/* Quick Back-to-Top Floating Button */}
        {showBackToTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="fixed right-5 bottom-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#DCE5DE] bg-white text-[#0D7A5F] shadow-md transition-transform hover:-translate-y-0.5 dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#34D399] cursor-pointer"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}

        {hasOpenedSearch && (
          <Suspense fallback={null}>
            <QuickSearchModal
              open={searchOpen}
              lang={lang}
              onClose={() => setSearchOpen(false)}
              onNavigateSection={navigateToSection}
              onOpenDocument={handleOpenDocumentFromSearch}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
