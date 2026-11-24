import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Sun,
  Moon,
  Languages,
  Type,
  Menu,
  X,
  BookOpen,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Language, NavbarSettings, ReaderScale, ThemeMode } from '../types';
import { UI_COPY } from '../data/translations';
import {
  getIsSoundMuted,
  subscribeSoundMuted,
  toggleSoundMuted,
} from '../utils/soundEngine';

interface NavbarAndControlsProps {
  lang: Language;
  onToggleLang: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  readerScale: ReaderScale;
  onToggleScale: () => void;
  navbarSettings?: NavbarSettings;
  onOpenSearch: () => void;
}

const CHAPTER_ANCHORS = [
  { id: 'abstract', label: { id: '📄 01. Abstrak', en: '📄 01. Abstract' } },
  { id: 'survey', label: { id: '📊 02. Survei n=90', en: '📊 02. Survey n=90' } },
  { id: 'ingredients', label: { id: '🌿 03. 5 Bahan Alami', en: '🌿 03. 5 Ingredients' } },
  { id: 'formulation', label: { id: '🧪 04. Formulasi', en: '🧪 04. Formulations' } },
  { id: 'htst', label: { id: '🌡️ 05. Metode HTST', en: '🌡️ 05. HTST Method' } },
  { id: 'smart', label: { id: '📱 06. Aplikasi & Game', en: '📱 06. Apps & Game' } },
  { id: 'quiz', label: { id: '🎯 07. Kuis Gigi', en: '🎯 07. Dental Quiz' } },
  { id: 'tips', label: { id: '💡 Tips Gigi', en: '💡 Dental Tips' } },
  { id: 'archive', label: { id: '📁 Arsip Riset', en: '📁 Research Archive' } },
  { id: 'lab-stats', label: { id: '📈 Statistik Lab', en: '📈 Lab Stats' } },
  { id: 'references', label: { id: '📚 Pustaka', en: '📚 References' } },
];

export const NavbarAndControls: React.FC<NavbarAndControlsProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  readerScale,
  onToggleScale,
  navbarSettings,
  onOpenSearch,
}) => {
  const t = UI_COPY[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('abstract');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(getIsSoundMuted);
  const [logoError, setLogoError] = useState(false);
  const [brandPopping, setBrandPopping] = useState(false);
  const brandPopTimerRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (brandPopTimerRef.current) {
        window.clearTimeout(brandPopTimerRef.current);
      }
    };
  }, []);

  const triggerBrandPop = () => {
    setBrandPopping(false);
    window.requestAnimationFrame(() => {
      setBrandPopping(true);
    });
    if (brandPopTimerRef.current) {
      window.clearTimeout(brandPopTimerRef.current);
    }
    brandPopTimerRef.current = window.setTimeout(() => {
      setBrandPopping(false);
    }, 430);
  };

  useEffect(() => {
    return subscribeSoundMuted(setIsMuted);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const nextScrolled = window.scrollY > 16;
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

      const bar = progressBarRef.current;
      if (!bar) return;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observedIds = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    const observeMissingAnchors = () => {
      for (const anchor of CHAPTER_ANCHORS) {
        if (observedIds.has(anchor.id)) continue;
        const el = document.getElementById(anchor.id);
        if (el) {
          observer.observe(el);
          observedIds.add(anchor.id);
        }
      }
    };

    observeMissingAnchors();

    const mainEl = document.querySelector('main');
    const mutationObserver = mainEl
      ? new MutationObserver(() => {
          observeMissingAnchors();
          if (observedIds.size >= CHAPTER_ANCHORS.length) {
            mutationObserver?.disconnect();
          }
        })
      : null;

    if (mainEl && mutationObserver && observedIds.size < CHAPTER_ANCHORS.length) {
      mutationObserver.observe(mainEl, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const topBlurPx = Math.min(
    40,
    Math.max(0, typeof navbarSettings?.topBlurPx === 'number' ? navbarSettings.topBlurPx : 2)
  );
  const scrolledBlurPx = Math.min(
    40,
    Math.max(
      0,
      typeof navbarSettings?.scrolledBlurPx === 'number' ? navbarSettings.scrolledBlurPx : 14
    )
  );
  const activeHeaderBlur = isScrolled ? scrolledBlurPx : topBlurPx;
  const headerFilterValue =
    activeHeaderBlur > 0
      ? `blur(${activeHeaderBlur}px) saturate(${isScrolled ? 1.35 : 1.05})`
      : 'none';

  return (
    <>
      {/* 3-Zone Top Bar Contract */}
      <header
        style={{
          backdropFilter: headerFilterValue,
          WebkitBackdropFilter: headerFilterValue,
        }}
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out ${
          isScrolled
            ? 'border-[#DCE5DE] bg-[#F7FAF8]/86 shadow-[0_4px_20px_rgba(19,32,27,0.06)] dark:border-[#23332D] dark:bg-[#0D1311]/86 dark:shadow-[0_4px_20px_rgba(0,0,0,0.32)]'
            : 'border-[#DCE5DE]/45 bg-[#F7FAF8]/58 dark:border-[#23332D]/45 dark:bg-[#0D1311]/55'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Logo + Wordmark */}
          <a
            href="#top"
            onClick={triggerBrandPop}
            className="behongca-brand-link inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-[#0D7A5F] whitespace-nowrap shrink-0 dark:text-[#34D399]"
          >
            {!logoError && (
              <img
                src="/assets/logo/favicon_io/apple-touch-icon.png"
                alt="Logo BEHONGCA"
                width={32}
                height={32}
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className={`behongca-brand-logo h-8 w-8 rounded-full object-contain shrink-0 ${
                  brandPopping ? 'is-popping' : ''
                }`}
              />
            )}
            <span className="behongca-brand-text">BEHONGCA</span>
          </a>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#44574F] dark:text-[#A9BDB3]"
          >
            <a
              href="#survey"
              className="behongca-nav-link hover:text-[#0D7A5F] dark:hover:text-[#34D399] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.research}
            </a>
            <a
              href="#formulation"
              className="behongca-nav-link hover:text-[#0D7A5F] dark:hover:text-[#34D399] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.formulation}
            </a>
            <a
              href="#htst"
              className="behongca-nav-link hover:text-[#0D7A5F] dark:hover:text-[#34D399] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.htstSmart}
            </a>
            <a
              href="#archive"
              className="behongca-nav-link hover:text-[#0D7A5F] dark:hover:text-[#34D399] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.archive}
            </a>
            <a
              href="#references"
              className="behongca-nav-link hover:text-[#0D7A5F] dark:hover:text-[#34D399] transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.references}
            </a>
          </nav>

          {/* Zone 3: 1 primary action + mobile menu trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              className="behongca-btn-primary inline-flex items-center gap-2.5 rounded-lg bg-[#0D7A5F] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#0A634D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D7A5F] dark:bg-[#10B981] dark:text-[#071510] dark:hover:bg-[#34D399] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
              <span>{t.nav.quickSearch}</span>
              <kbd className="hidden sm:inline-block rounded bg-black/15 px-1.5 py-0.5 font-mono text-[10px] font-medium dark:bg-black/20">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-[#DCE5DE] bg-white text-[#13201B] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#E3ECE7]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Thin reading progress bar updated via GPU scaleX transform */}
        <div className="h-[2px] w-full overflow-hidden bg-[#DCE5DE]/50 dark:bg-[#23332D]/60">
          <div
            ref={progressBarRef}
            style={{ transform: 'scaleX(0)' }}
            className="h-full w-full origin-left bg-[#0D7A5F] transition-transform duration-100 will-change-transform dark:bg-[#34D399]"
          />
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/40 backdrop-blur-xs">
          <div className="ml-auto flex h-full w-80 max-w-[85vw] flex-col justify-between border-l border-[#DCE5DE] bg-[#F7FAF8] p-6 dark:border-[#23332D] dark:bg-[#0D1311]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE5DE] dark:border-[#23332D]">
                <span className="inline-flex items-center gap-2.5 font-display text-base font-bold text-[#0D7A5F] dark:text-[#34D399]">
                  {!logoError && (
                    <img
                      src="/assets/logo/favicon_io/apple-touch-icon.png"
                      alt="Logo BEHONGCA"
                      width={28}
                      height={28}
                      referrerPolicy="no-referrer"
                      onError={() => setLogoError(true)}
                      className="h-7 w-7 rounded-full object-contain shrink-0"
                    />
                  )}
                  <span>{t.controls.tocTitle}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-[#44574F] hover:bg-[#E7EFEA] dark:text-[#A9BDB3] dark:hover:bg-[#1A2823]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-1">
                {CHAPTER_ANCHORS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'border-[#0D7A5F]/30 bg-[#0D7A5F]/12 text-[#0D7A5F] dark:border-[#34D399]/75 dark:bg-[#0D4A3A] dark:text-white'
                        : 'border-transparent text-[#31423B] hover:bg-[#E7EFEA] dark:text-[#C5D5CD] dark:hover:bg-[#141E1B]'
                    }`}
                  >
                    {item.label[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile accessibility & theme controls inside drawer */}
            <div className="space-y-3 border-t border-[#DCE5DE] pt-4 dark:border-[#23332D]">
              <button
                type="button"
                onClick={onToggleLang}
                className="flex w-full items-center justify-between rounded-lg border border-[#DCE5DE] bg-white px-3.5 py-2.5 text-sm font-medium dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <span className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-[#0D7A5F] dark:text-[#34D399]" />
                  {t.controls.languageLabel}
                </span>
                <span className="font-mono text-xs font-semibold uppercase">
                  {lang === 'id' ? 'ID → EN' : 'EN → ID'}
                </span>
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                className="flex w-full items-center justify-between rounded-lg border border-[#DCE5DE] bg-white px-3.5 py-2.5 text-sm font-medium dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-[#0D7A5F]" />
                  )}
                  {theme === 'dark' ? t.controls.themeLight : t.controls.themeDark}
                </span>
              </button>

              <button
                type="button"
                onClick={onToggleScale}
                className="flex w-full items-center justify-between rounded-lg border border-[#DCE5DE] bg-white px-3.5 py-2.5 text-sm font-medium dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <span className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-[#0D7A5F] dark:text-[#34D399]" />
                  {readerScale === 'large' ? t.controls.textNormal : t.controls.textLarge}
                </span>
                <span className="font-mono text-xs">
                  {readerScale === 'large' ? 'A+' : 'A'}
                </span>
              </button>

              <button
                type="button"
                data-sound-toggle="true"
                onClick={() => toggleSoundMuted()}
                className="flex w-full items-center justify-between rounded-lg border border-[#DCE5DE] bg-white px-3.5 py-2.5 text-sm font-medium dark:border-[#23332D] dark:bg-[#141E1B]"
              >
                <span className="flex items-center gap-2">
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 text-[#788D84]" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-[#0D7A5F] dark:text-[#34D399]" />
                  )}
                  {lang === 'id' ? 'Efek Suara & Kuis' : 'Sound & Quiz Audio'}
                </span>
                <span className="font-mono text-xs font-semibold">
                  {isMuted ? 'OFF' : 'ON'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Intuitive Workspace Utility Bar (Language, Comfortable Dark Mode, Reader Font Scale, Quick Chapter Jump) */}
      <div className="border-b border-[#DCE5DE] bg-[#EEF4F0]/86 backdrop-blur-md dark:border-[#23332D] dark:bg-[#111916]/84">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Chapter quick-jump strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 no-scrollbar">
            <BookOpen className="mr-1 h-3.5 w-3.5 shrink-0 text-[#0D7A5F] dark:text-[#34D399]" />
            {CHAPTER_ANCHORS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSection === item.id
                    ? 'border-[#0D7A5F]/25 bg-white text-[#0D7A5F] shadow-2xs dark:border-[#34D399]/75 dark:bg-[#0D4A3A] dark:text-white'
                    : 'border-transparent text-[#44574F] hover:text-[#13201B] dark:text-[#A9BDB3] dark:hover:text-white'
                }`}
              >
                {item.label[lang]}
              </button>
            ))}
          </div>

          {/* Reader Comfort Controls: Bilingual ID/EN + Dark Mode + Text Size */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onToggleLang}
              title={t.controls.languageLabel}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#DCE5DE] bg-white px-2.5 py-1 text-xs font-medium text-[#13201B] transition-colors hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#E3ECE7] dark:hover:border-[#34D399] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Languages className="h-3.5 w-3.5 text-[#0D7A5F] dark:text-[#34D399]" />
              <span className={lang === 'id' ? 'font-bold text-[#0D7A5F] dark:text-[#34D399]' : 'opacity-60'}>
                ID
              </span>
              <span aria-hidden="true" className="opacity-40">/</span>
              <span className={lang === 'en' ? 'font-bold text-[#0D7A5F] dark:text-[#34D399]' : 'opacity-60'}>
                EN
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleScale}
              title={readerScale === 'large' ? t.controls.textNormal : t.controls.textLarge}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#DCE5DE] bg-white px-2.5 py-1 text-xs font-medium text-[#13201B] transition-colors hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#E3ECE7] dark:hover:border-[#34D399] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Type className="h-3.5 w-3.5 text-[#0D7A5F] dark:text-[#34D399]" />
              <span>{readerScale === 'large' ? 'A+' : 'A'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#DCE5DE] bg-white px-2.5 py-1 text-xs font-medium text-[#13201B] transition-colors hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#E3ECE7] dark:hover:border-[#34D399] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span className="hidden sm:inline">{t.controls.themeLight}</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-[#0D7A5F]" />
                  <span className="hidden sm:inline">{t.controls.themeDark}</span>
                </>
              )}
            </button>

            <button
              type="button"
              data-sound-toggle="true"
              onClick={() => toggleSoundMuted()}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              title={
                isMuted
                  ? lang === 'id'
                    ? 'Aktifkan suara klik & kuis'
                    : 'Unmute click & quiz audio'
                  : lang === 'id'
                    ? 'Bisukan suara klik & kuis'
                    : 'Mute click & quiz audio'
              }
              className="inline-flex items-center gap-1.5 rounded-md border border-[#DCE5DE] bg-white px-2.5 py-1 text-xs font-medium text-[#13201B] transition-colors hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#E3ECE7] dark:hover:border-[#34D399] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="h-3.5 w-3.5 text-[#788D84]" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-[#0D7A5F] dark:text-[#34D399]" />
              )}
              <span className="hidden sm:inline">
                {isMuted ? (lang === 'id' ? 'Bisukan' : 'Muted') : lang === 'id' ? 'Suara' : 'Sound'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
