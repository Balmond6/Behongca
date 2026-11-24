import React, { useEffect, useState } from 'react';
import { BackgroundSettings, ThemeMode } from '../types';

export const DEFAULT_BACKGROUNDS: BackgroundSettings = {
  mobile: {
    day: '/assets/background/MobileDay.webp',
    night: '/assets/background/MobileNight.webp',
  },
  tablet: {
    day: '/assets/background/TabletDay.webp',
    night: '/assets/background/TabletNight.webp',
  },
  desktop: {
    day: '/assets/background/DesktopDay.webp',
    night: '/assets/background/DesktopNight.webp',
  },
  overlay: {
    dayOpacity: 0,
    nightOpacity: 0.22,
  },
  blurPx: 4,
};

type ViewportBucket = 'mobile' | 'tablet' | 'desktop';

function getCurrentBucket(): ViewportBucket {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'desktop';
  }
  if (window.matchMedia('(min-width: 1024px)').matches) return 'desktop';
  if (window.matchMedia('(min-width: 768px)').matches) return 'tablet';
  return 'mobile';
}

interface PixelBackdropLayerProps {
  backgrounds?: BackgroundSettings;
  theme: ThemeMode;
}

/**
 * Viewport-anchored pixel art world backdrop driven centrally by behongca.settings.json.
 * Loads only the single WebP asset matching the active viewport breakpoint and Light/Dark theme
 * so mobile devices never download unused tablet/desktop or opposite-theme artwork.
 */
export const PixelBackdropLayer: React.FC<PixelBackdropLayerProps> = ({
  backgrounds,
  theme,
}) => {
  const cfg = backgrounds || DEFAULT_BACKGROUNDS;
  const [bucket, setBucket] = useState<ViewportBucket>(getCurrentBucket);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const mqTablet = window.matchMedia('(min-width: 768px)');
    const updateBucket = () => {
      if (mqDesktop.matches) setBucket('desktop');
      else if (mqTablet.matches) setBucket('tablet');
      else setBucket('mobile');
    };

    updateBucket();
    mqDesktop.addEventListener('change', updateBucket);
    mqTablet.addEventListener('change', updateBucket);
    return () => {
      mqDesktop.removeEventListener('change', updateBucket);
      mqTablet.removeEventListener('change', updateBucket);
    };
  }, []);

  const dayOpacity = cfg.overlay?.dayOpacity ?? 0;
  const nightOpacity = cfg.overlay?.nightOpacity ?? 0.22;
  const rawBlur =
    typeof cfg.blurPx === 'number' && Number.isFinite(cfg.blurPx)
      ? cfg.blurPx
      : DEFAULT_BACKGROUNDS.blurPx ?? 4;
  const blurPx = Math.min(40, Math.max(0, rawBlur));
  const overscanScale = blurPx > 0 ? 1 + Math.min(0.14, blurPx * 0.008) : 1;

  const activePair = cfg[bucket] || DEFAULT_BACKGROUNDS[bucket];
  const activeSrc =
    theme === 'dark'
      ? activePair?.night || DEFAULT_BACKGROUNDS[bucket].night
      : activePair?.day || DEFAULT_BACKGROUNDS[bucket].day;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none bg-[#E6F4FA] dark:bg-[#09111A]"
      aria-hidden="true"
    >
      <img
        key={activeSrc}
        src={activeSrc}
        alt=""
        decoding="async"
        fetchPriority="high"
        onLoad={() => setLoadedSrc(activeSrc)}
        style={
          blurPx > 0
            ? {
                filter: `blur(${blurPx}px)`,
                transform: `scale(${overscanScale.toFixed(3)})`,
              }
            : undefined
        }
        className={`pixel-art absolute inset-0 h-full w-full object-cover object-center transition-[opacity,filter,transform] duration-300 ${
          loadedSrc === activeSrc ? 'opacity-100' : 'opacity-90'
        }`}
      />

      {theme === 'light' && dayOpacity > 0 && (
        <div
          style={{ opacity: dayOpacity }}
          className="absolute inset-0 bg-[#F7FAF8] transition-opacity duration-300"
        />
      )}
      {theme === 'dark' && nightOpacity > 0 && (
        <div
          style={{ opacity: nightOpacity }}
          className="absolute inset-0 bg-[#081016] transition-opacity duration-300"
        />
      )}
    </div>
  );
};
