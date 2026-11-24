import React, { useEffect, useState } from 'react';
import { Language } from '../types';

interface PageLoadingSplashProps {
  lang: Language;
}

export const PageLoadingSplash: React.FC<PageLoadingSplashProps> = ({ lang }) => {
  const [mounted, setMounted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  });
  const [fadingOut, setFadingOut] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    const fadeTimer = window.setTimeout(() => setFadingOut(true), 680);
    const removeTimer = window.setTimeout(() => setMounted(false), 960);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={lang === 'id' ? 'Memuat portal riset BEHONGCA' : 'Loading BEHONGCA research portal'}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7FAF8]/96 backdrop-blur-sm transition-all duration-300 dark:bg-[#0B110F]/96 ${
        fadingOut ? 'pointer-events-none opacity-0 scale-[1.015]' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <div className="behongca-splash-logo flex h-16 w-16 items-center justify-center rounded-full border border-[#0D7A5F]/25 bg-white shadow-sm dark:border-[#34D399]/35 dark:bg-[#141E1B]">
          {!logoError ? (
            <img
              src="/assets/logo/favicon_io/apple-touch-icon.png"
              alt="Logo BEHONGCA"
              width={48}
              height={48}
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              className="h-12 w-12 rounded-full object-contain"
            />
          ) : (
            <span className="font-display text-xl font-bold text-[#0D7A5F] dark:text-[#34D399]">
              B
            </span>
          )}
        </div>

        <div>
          <p className="font-display text-xl font-bold tracking-tight text-[#0D7A5F] dark:text-[#34D399]">
            BEHONGCA
          </p>
          <p className="mt-1 font-mono text-xs text-[#44574F] dark:text-[#A9BDB3]">
            {lang === 'id' ? 'Memuat portal riset & inovasi...' : 'Loading research portal...'}
          </p>
        </div>

        <div className="h-1 w-44 overflow-hidden rounded-full bg-[#DCE5DE] dark:bg-[#1E2C26]">
          <div className="behongca-progress-fill h-full w-full rounded-full bg-[#0D7A5F] dark:bg-[#34D399]" />
        </div>
      </div>
    </div>
  );
};
