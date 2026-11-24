import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import { fileURLToPath } from 'url';
import { GENERATED_ARCHIVE_BUNDLE } from './generatedArchiveBundle.js';

export interface BilingualLabel {
  id: string;
  en: string;
}

export interface DocumentCategorySetting {
  id: string;
  emoji?: string;
  label: BilingualLabel;
}

export interface RegisteredDocumentEntry {
  id: string;
  enabled: boolean;
  filePath: string;
  title: string;
  category: string;
  author?: string;
  language?: 'id' | 'en' | 'bilingual';
  uploadedAt?: string;
  description?: string;
}

export interface BackgroundPairSetting {
  day: string;
  night: string;
}

export interface BackgroundsConfigSetting {
  mobile: BackgroundPairSetting;
  tablet: BackgroundPairSetting;
  desktop: BackgroundPairSetting;
  overlay: {
    dayOpacity: number;
    nightOpacity: number;
  };
  blurPx?: number;
}

export interface NavbarConfigSetting {
  topBlurPx: number;
  scrolledBlurPx: number;
}

export interface ResolvedDownloadItem {
  configuredPath: string;
  publicUrl: string;
  fileName: string;
  available: boolean;
  fileSize?: number;
}

export interface PublicDownloadsConfig {
  detector: ResolvedDownloadItem;
  game: ResolvedDownloadItem;
}

export interface BehongcaSettingsFile {
  downloads: {
    detectorFile: string;
    gameFile: string;
  };
  backgrounds: BackgroundsConfigSetting;
  navbar?: NavbarConfigSetting;
  paths: {
    assetsDir: string;
    backgroundDir: string;
    documentDir: string;
    downloadDir: string;
    photoDir: string;
    documentsDbPath: string;
    labDocsDir?: string;
  };
  paperMetadata: {
    kicker: string;
    title: BilingualLabel;
    subtitle: BilingualLabel;
    authors: string[];
    institution: string;
    year: number;
  };
  documentCategories: DocumentCategorySetting[];
  registeredDocuments: RegisteredDocumentEntry[];
}

export interface StoredDocument {
  id: string;
  title: string;
  category: string;
  author: string;
  language: 'id' | 'en' | 'bilingual';
  description: string;
  fileName: string;
  storedPath: string;
  publicUrl?: string;
  mimeType: string;
  fileSize: number;
  pageCount?: number;
  uploadedAt: string;
  isCurated?: boolean;
  extractedText: string;
}

export interface SanitizedArchivedDocument {
  id: string;
  title: string;
  category: string;
  author: string;
  language: 'id' | 'en' | 'bilingual';
  description: string;
  fileName: string;
  publicUrl: string;
  mimeType: string;
  fileSize: number;
  pageCount?: number;
  uploadedAt: string;
  isCurated: boolean;
  matchSnippet?: string;
  textPreview: string;
}

export interface PublicSiteConfig {
  downloads: PublicDownloadsConfig;
  backgrounds: BehongcaSettingsFile['backgrounds'];
  navbar?: BehongcaSettingsFile['navbar'];
  paperMetadata: BehongcaSettingsFile['paperMetadata'];
  documentCategories: BehongcaSettingsFile['documentCategories'];
}

export interface GeneratedArchiveBundle {
  generatedAt: string;
  missingAssets: string[];
  settings: BehongcaSettingsFile | null;
  downloads?: PublicDownloadsConfig;
  documents: StoredDocument[];
}

export interface VercelNodeRequest extends IncomingMessage {
  query?: Record<string, string | string[] | undefined>;
}

export const DEFAULT_SETTINGS: BehongcaSettingsFile = {
  downloads: {
    detectorFile: 'public/assets/download/behongca-smart-detection.apk',
    gameFile: 'public/assets/download/super-behongca-bros.apk',
  },
  backgrounds: {
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
  },
  navbar: {
    topBlurPx: 2,
    scrolledBlurPx: 14,
  },
  paths: {
    assetsDir: 'public/assets',
    backgroundDir: 'public/assets/background',
    documentDir: 'public/assets/document',
    downloadDir: 'public/assets/download',
    photoDir: 'public/assets/photo',
    documentsDbPath: 'data/documents.json',
  },
  paperMetadata: {
    kicker: 'SMP Negeri 1 Surakarta · Applied Life Sciences · I2ASPO 2026',
    title: {
      id: 'BEHONGCA: Inovasi Obat Kumur Herbal Berbasis Metode HTST',
      en: 'BEHONGCA: HTST Herbal Mouthwash Innovation for Dental Health',
    },
    subtitle: {
      id: 'Obat kumur herbal 100% bebas alkohol dari daun binahong, cangkang telur, mangga, krokot, dan cornmint — dilengkapi perangkat HTST, detektor plak, dan game edukasi.',
      en: '100% alcohol-free herbal mouthwash crafted from binahong leaves, eggshells, mangoes, purslane, and cornmint — paired with an HTST smart device, plaque detector, and educational game.',
    },
    authors: [
      'Arinda Rahmadina',
      'Bagus Eka S.',
      'Chelsea Putri P.',
      'Clara Vanessa K.',
      'Davina Queen E.N',
      'Rangga Raditya',
    ],
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
  registeredDocuments: [
    {
      id: 'behongca-i2aspo-2026',
      enabled: true,
      filePath: 'public/assets/document/BEHONGCA_I2ASPO_SMPN1SKA.pdf',
      title:
        'BEHONGCA: Utilization of Binahong Leaves, Eggshells, and Mangoes Using the HTST Method for Dental Health',
      category: 'manuscript',
      author:
        'Arinda Rahmadina, Bagus Eka S., Chelsea Putri P., Clara Vanessa K., Davina Queen E.N, Rangga Raditya (SMP Negeri 1 Surakarta)',
      language: 'en',
      uploadedAt: '2026-03-01T08:00:00.000Z',
      description:
        'Official I2ASPO 2026 Applied Life Sciences research proposal covering botanical formulation (F1–F3), HTST pasteurization & thermal shock, n=90 Surakarta school survey, and the BEHONGCA SMART system.',
    },
  ],
};

function getModuleDirname(): string {
  try {
    return path.dirname(fileURLToPath(import.meta.url));
  } catch {
    return process.cwd();
  }
}

export function resolveWorkspaceRoot(): string {
  const candidates = [
    process.cwd(),
    path.resolve(getModuleDirname(), '..'),
    path.resolve(getModuleDirname(), '../..'),
  ];
  for (const candidate of candidates) {
    if (
      fs.existsSync(path.join(candidate, 'behongca.settings.json')) ||
      fs.existsSync(path.join(candidate, 'package.json'))
    ) {
      return candidate;
    }
  }
  return process.cwd();
}

export function sanitizeSafeUrl(value: unknown): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? trimmed : '';
  } catch {
    return '';
  }
}

export function sanitizeLocalDownloadPath(
  value: unknown,
  downloadDir = DEFAULT_SETTINGS.paths.downloadDir
): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//i.test(trimmed) || trimmed.startsWith('//')) {
    return '';
  }
  const normalized = normalizeStoredAssetPath(trimmed, downloadDir);
  if (!normalized || !normalized.startsWith('public/')) {
    return '';
  }
  return normalized;
}

function toPublicAssetPrefix(dirPath: string): string {
  const normalized = dirPath.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
  if (normalized.startsWith('public/')) {
    return '/' + normalized.slice('public/'.length);
  }
  return '/' + normalized;
}

export function sanitizeBackgroundAsset(
  value: unknown,
  fallback: string,
  backgroundDir = DEFAULT_SETTINGS.paths.backgroundDir
): string {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  if (/^https?:\/\//i.test(trimmed)) {
    return sanitizeSafeUrl(trimmed) || fallback;
  }
  const normalized = trimmed.replace(/\\/g, '/');
  if (normalized.includes('..')) return fallback;
  const withoutLeadingSlash = normalized.replace(/^\/+/, '');
  if (withoutLeadingSlash.startsWith('public/')) {
    return '/' + withoutLeadingSlash.slice('public/'.length);
  }
  if (withoutLeadingSlash.startsWith('assets/')) {
    return '/' + withoutLeadingSlash;
  }
  if (normalized.startsWith('/')) {
    return normalized;
  }
  const basePrefix = toPublicAssetPrefix(backgroundDir);
  if (normalized.startsWith('background/')) {
    return '/assets/' + normalized;
  }
  return `${basePrefix}/${withoutLeadingSlash}`;
}

function clampOpacity(value: unknown, fallback: number): number {
  if (typeof value !== 'number' || Number.isNaN(value)) return fallback;
  return Math.min(0.85, Math.max(0, Number(value.toFixed(2))));
}

function clampBlurPx(value: unknown, fallback: number): number {
  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.min(40, Math.max(0, Number(value.toFixed(1))));
}

export function normalizeStoredAssetPath(
  rawPath: unknown,
  defaultDocDir = DEFAULT_SETTINGS.paths.documentDir
): string {
  if (typeof rawPath !== 'string') return '';
  const cleaned = rawPath.replace(/\\/g, '/').trim();
  if (!cleaned || cleaned.includes('..')) return '';

  // Migrate legacy container or workspace absolute paths such as:
  // /app/applet/public/assets/document/foo.pdf or /vercel/path0/public/assets/...
  const publicAssetsIdx = cleaned.indexOf('/public/assets/');
  if (publicAssetsIdx !== -1) {
    return cleaned.slice(publicAssetsIdx + 1);
  }

  const publicIdx = cleaned.indexOf('public/assets/');
  if (publicIdx !== -1) {
    return cleaned.slice(publicIdx);
  }

  const withoutLeadingSlash = cleaned.replace(/^\/+/, '');
  if (withoutLeadingSlash.startsWith('public/')) {
    return withoutLeadingSlash;
  }
  if (withoutLeadingSlash.startsWith('assets/')) {
    return `public/${withoutLeadingSlash}`;
  }

  const normalizedDocDir = defaultDocDir.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
  const baseDir = normalizedDocDir.startsWith('public/')
    ? normalizedDocDir
    : `public/${normalizedDocDir}`;
  return `${baseDir}/${path.posix.basename(withoutLeadingSlash)}`;
}

function encodeUrlSegmentSafe(segment: string): string {
  try {
    return encodeURIComponent(decodeURIComponent(segment));
  } catch {
    return encodeURIComponent(segment);
  }
}

export function toPublicAssetUrl(
  filePathOrUrl: string,
  defaultDocDir = DEFAULT_SETTINGS.paths.documentDir
): string {
  const normalized = normalizeStoredAssetPath(filePathOrUrl, defaultDocDir);
  if (!normalized) return '';
  const withoutPublic = normalized.startsWith('public/')
    ? normalized.slice('public/'.length)
    : normalized;
  const encodedSegments = withoutPublic
    .split('/')
    .filter(Boolean)
    .map(encodeUrlSegmentSafe);
  return '/' + encodedSegments.join('/');
}

export function parseSettingsRaw(raw: Record<string, unknown>): BehongcaSettingsFile {
  const rawCategories = raw.documentCategories;
  const categories: DocumentCategorySetting[] = Array.isArray(rawCategories)
    ? rawCategories
        .filter(
          (c): c is DocumentCategorySetting =>
            Boolean(c && typeof c === 'object' && (c as DocumentCategorySetting).id)
        )
        .map((c) => ({
          id: String(c.id).trim(),
          emoji: typeof c.emoji === 'string' ? c.emoji : '📁',
          label: {
            id: c.label?.id ? String(c.label.id) : String(c.id),
            en: c.label?.en ? String(c.label.en) : String(c.id),
          },
        }))
    : DEFAULT_SETTINGS.documentCategories;

  const rawPaths = (raw.paths && typeof raw.paths === 'object' ? raw.paths : {}) as Record<
    string,
    unknown
  >;
  const assetsDir =
    typeof rawPaths.assetsDir === 'string' && rawPaths.assetsDir.trim()
      ? rawPaths.assetsDir.trim()
      : DEFAULT_SETTINGS.paths.assetsDir;
  const backgroundDir =
    typeof rawPaths.backgroundDir === 'string' && rawPaths.backgroundDir.trim()
      ? rawPaths.backgroundDir.trim()
      : DEFAULT_SETTINGS.paths.backgroundDir;
  const documentDir =
    typeof rawPaths.documentDir === 'string' && rawPaths.documentDir.trim()
      ? rawPaths.documentDir.trim()
      : typeof rawPaths.labDocsDir === 'string' && rawPaths.labDocsDir.trim()
        ? rawPaths.labDocsDir.trim()
        : DEFAULT_SETTINGS.paths.documentDir;
  const downloadDir =
    typeof rawPaths.downloadDir === 'string' && rawPaths.downloadDir.trim()
      ? rawPaths.downloadDir.trim()
      : DEFAULT_SETTINGS.paths.downloadDir;
  const photoDir =
    typeof rawPaths.photoDir === 'string' && rawPaths.photoDir.trim()
      ? rawPaths.photoDir.trim()
      : DEFAULT_SETTINGS.paths.photoDir;

  const rawDownloads = (
    raw.downloads && typeof raw.downloads === 'object' ? raw.downloads : {}
  ) as Record<string, unknown>;
  const rawBg = (
    raw.backgrounds && typeof raw.backgrounds === 'object' ? raw.backgrounds : {}
  ) as Record<string, Record<string, unknown>>;
  const rawNavbar = (
    raw.navbar && typeof raw.navbar === 'object' ? raw.navbar : {}
  ) as Record<string, unknown>;
  const rawMeta = (
    raw.paperMetadata && typeof raw.paperMetadata === 'object' ? raw.paperMetadata : {}
  ) as Record<string, unknown>;
  const metaTitle = (
    rawMeta.title && typeof rawMeta.title === 'object' ? rawMeta.title : {}
  ) as Record<string, unknown>;
  const metaSubtitle = (
    rawMeta.subtitle && typeof rawMeta.subtitle === 'object' ? rawMeta.subtitle : {}
  ) as Record<string, unknown>;

  return {
    downloads: {
      detectorFile: sanitizeLocalDownloadPath(
        rawDownloads.detectorFile ?? rawDownloads.detectorUrl,
        downloadDir
      ),
      gameFile: sanitizeLocalDownloadPath(
        rawDownloads.gameFile ?? rawDownloads.gameUrl,
        downloadDir
      ),
    },
    backgrounds: {
      mobile: {
        day: sanitizeBackgroundAsset(
          rawBg.mobile?.day,
          DEFAULT_SETTINGS.backgrounds.mobile.day,
          backgroundDir
        ),
        night: sanitizeBackgroundAsset(
          rawBg.mobile?.night,
          DEFAULT_SETTINGS.backgrounds.mobile.night,
          backgroundDir
        ),
      },
      tablet: {
        day: sanitizeBackgroundAsset(
          rawBg.tablet?.day,
          DEFAULT_SETTINGS.backgrounds.tablet.day,
          backgroundDir
        ),
        night: sanitizeBackgroundAsset(
          rawBg.tablet?.night,
          DEFAULT_SETTINGS.backgrounds.tablet.night,
          backgroundDir
        ),
      },
      desktop: {
        day: sanitizeBackgroundAsset(
          rawBg.desktop?.day,
          DEFAULT_SETTINGS.backgrounds.desktop.day,
          backgroundDir
        ),
        night: sanitizeBackgroundAsset(
          rawBg.desktop?.night,
          DEFAULT_SETTINGS.backgrounds.desktop.night,
          backgroundDir
        ),
      },
      overlay: {
        dayOpacity: clampOpacity(
          rawBg.overlay?.dayOpacity,
          DEFAULT_SETTINGS.backgrounds.overlay.dayOpacity
        ),
        nightOpacity: clampOpacity(
          rawBg.overlay?.nightOpacity,
          DEFAULT_SETTINGS.backgrounds.overlay.nightOpacity
        ),
      },
      blurPx: clampBlurPx(
        (rawBg as Record<string, unknown>).blurPx,
        DEFAULT_SETTINGS.backgrounds.blurPx ?? 4
      ),
    },
    navbar: {
      topBlurPx: clampBlurPx(rawNavbar.topBlurPx, DEFAULT_SETTINGS.navbar?.topBlurPx ?? 2),
      scrolledBlurPx: clampBlurPx(
        rawNavbar.scrolledBlurPx,
        DEFAULT_SETTINGS.navbar?.scrolledBlurPx ?? 14
      ),
    },
    paths: {
      assetsDir,
      backgroundDir,
      documentDir,
      downloadDir,
      photoDir,
      documentsDbPath:
        typeof rawPaths.documentsDbPath === 'string' && rawPaths.documentsDbPath.trim()
          ? rawPaths.documentsDbPath.trim()
          : DEFAULT_SETTINGS.paths.documentsDbPath,
      labDocsDir:
        typeof rawPaths.labDocsDir === 'string' && rawPaths.labDocsDir.trim()
          ? rawPaths.labDocsDir.trim()
          : undefined,
    },
    paperMetadata: {
      kicker:
        typeof rawMeta.kicker === 'string' && rawMeta.kicker.trim()
          ? rawMeta.kicker
          : DEFAULT_SETTINGS.paperMetadata.kicker,
      title: {
        id:
          typeof metaTitle.id === 'string' && metaTitle.id
            ? metaTitle.id
            : DEFAULT_SETTINGS.paperMetadata.title.id,
        en:
          typeof metaTitle.en === 'string' && metaTitle.en
            ? metaTitle.en
            : DEFAULT_SETTINGS.paperMetadata.title.en,
      },
      subtitle: {
        id:
          typeof metaSubtitle.id === 'string' && metaSubtitle.id
            ? metaSubtitle.id
            : DEFAULT_SETTINGS.paperMetadata.subtitle.id,
        en:
          typeof metaSubtitle.en === 'string' && metaSubtitle.en
            ? metaSubtitle.en
            : DEFAULT_SETTINGS.paperMetadata.subtitle.en,
      },
      authors:
        Array.isArray(rawMeta.authors) && rawMeta.authors.length > 0
          ? rawMeta.authors.map(String)
          : DEFAULT_SETTINGS.paperMetadata.authors,
      institution:
        typeof rawMeta.institution === 'string' && rawMeta.institution.trim()
          ? rawMeta.institution
          : DEFAULT_SETTINGS.paperMetadata.institution,
      year:
        typeof rawMeta.year === 'number'
          ? rawMeta.year
          : DEFAULT_SETTINGS.paperMetadata.year,
    },
    documentCategories:
      categories.length > 0 ? categories : DEFAULT_SETTINGS.documentCategories,
    registeredDocuments: Array.isArray(raw.registeredDocuments)
      ? (raw.registeredDocuments as RegisteredDocumentEntry[])
      : DEFAULT_SETTINGS.registeredDocuments,
  };
}

let cachedSettingsMtimeMs = -1;
let cachedSettings: BehongcaSettingsFile | null = null;

export function loadSettingsReadOnly(rootDir = resolveWorkspaceRoot()): BehongcaSettingsFile {
  const settingsPath = path.join(rootDir, 'behongca.settings.json');
  if (fs.existsSync(settingsPath)) {
    try {
      const stat = fs.statSync(settingsPath);
      if (cachedSettings && cachedSettingsMtimeMs === stat.mtimeMs) {
        return cachedSettings;
      }
      const raw = JSON.parse(fs.readFileSync(settingsPath, 'utf8')) as Record<string, unknown>;
      const parsed = parseSettingsRaw(raw);
      cachedSettingsMtimeMs = stat.mtimeMs;
      cachedSettings = parsed;
      return parsed;
    } catch (err) {
      console.warn('Could not parse behongca.settings.json, falling back:', err);
    }
  }
  if (GENERATED_ARCHIVE_BUNDLE.settings) {
    return GENERATED_ARCHIVE_BUNDLE.settings;
  }
  return DEFAULT_SETTINGS;
}

export function resolveDownloadItem(
  configuredPath: string,
  downloadDir: string,
  rootDir = resolveWorkspaceRoot(),
  bundledItem?: ResolvedDownloadItem
): ResolvedDownloadItem {
  const sanitized = sanitizeLocalDownloadPath(configuredPath, downloadDir);
  if (!sanitized) {
    return {
      configuredPath: '',
      publicUrl: '',
      fileName: '',
      available: false,
    };
  }

  const publicUrl = toPublicAssetUrl(sanitized, downloadDir);
  const fileName = path.posix.basename(sanitized);
  const absFile = resolveSafeWorkspacePath(sanitized, rootDir);
  const absDownloadDir = resolveSafeWorkspacePath(downloadDir, rootDir);
  const hasDownloadDirOnDisk = Boolean(absDownloadDir && fs.existsSync(absDownloadDir));

  if (absFile && isInsidePublicDir(absFile, rootDir) && fs.existsSync(absFile)) {
    try {
      const stat = fs.statSync(absFile);
      if (stat.isFile() && stat.size > 0) {
        return {
          configuredPath: sanitized,
          publicUrl,
          fileName,
          available: true,
          fileSize: stat.size,
        };
      }
    } catch {
      // Ignore unreadable file metadata
    }
  }

  if (
    !hasDownloadDirOnDisk &&
    bundledItem &&
    bundledItem.configuredPath === sanitized &&
    bundledItem.available
  ) {
    return bundledItem;
  }

  return {
    configuredPath: sanitized,
    publicUrl,
    fileName,
    available: false,
  };
}

export function resolvePublicDownloads(
  settings: BehongcaSettingsFile,
  rootDir = resolveWorkspaceRoot()
): PublicDownloadsConfig {
  const bundled = GENERATED_ARCHIVE_BUNDLE.downloads;
  return {
    detector: resolveDownloadItem(
      settings.downloads.detectorFile,
      settings.paths.downloadDir,
      rootDir,
      bundled?.detector
    ),
    game: resolveDownloadItem(
      settings.downloads.gameFile,
      settings.paths.downloadDir,
      rootDir,
      bundled?.game
    ),
  };
}

export function getSiteConfigPayload(
  settings: BehongcaSettingsFile,
  rootDir = resolveWorkspaceRoot()
): PublicSiteConfig {
  return {
    downloads: resolvePublicDownloads(settings, rootDir),
    backgrounds: settings.backgrounds,
    navbar: settings.navbar || DEFAULT_SETTINGS.navbar,
    paperMetadata: settings.paperMetadata,
    documentCategories: settings.documentCategories,
  };
}

export function resolveSafeWorkspacePath(
  targetPath: string,
  rootDir = resolveWorkspaceRoot()
): string | null {
  const normalized = targetPath.replace(/\\/g, '/').trim();
  if (!normalized || normalized.includes('..')) return null;

  const rootResolved = path.resolve(rootDir);
  if (path.isAbsolute(normalized)) {
    const absResolved = path.resolve(normalized);
    if (
      absResolved === rootResolved ||
      absResolved.startsWith(rootResolved + path.sep)
    ) {
      return absResolved;
    }
    // Treat leading slash project paths (e.g. "/data/documents.json") safely relative to root
    const relFromAbs = normalized.replace(/^\/+/, '');
    const joined = path.resolve(rootResolved, relFromAbs);
    return joined.startsWith(rootResolved + path.sep) ? joined : null;
  }

  const resolved = path.resolve(rootResolved, normalized.replace(/^\/+/, ''));
  return resolved.startsWith(rootResolved + path.sep) || resolved === rootResolved
    ? resolved
    : null;
}

export function resolveSafePublicAssetFile(
  targetPath: string,
  documentDir: string,
  rootDir = resolveWorkspaceRoot(),
  legacyLabDocsDir?: string
): string | null {
  const normalizedStored = normalizeStoredAssetPath(targetPath, documentDir);
  if (normalizedStored) {
    const candidate = resolveSafeWorkspacePath(normalizedStored, rootDir);
    if (candidate && isInsidePublicDir(candidate, rootDir)) {
      if (fs.existsSync(candidate)) return candidate;
    }
  }

  const trimmed = targetPath.replace(/\\/g, '/').trim().replace(/^\/+/, '');
  if (!trimmed || trimmed.includes('..')) return null;

  const baseCandidates = [documentDir, legacyLabDocsDir].filter(Boolean) as string[];
  for (const base of baseCandidates) {
    const baseResolved = resolveSafeWorkspacePath(base, rootDir);
    if (!baseResolved) continue;
    const candidate = path.resolve(baseResolved, path.posix.basename(trimmed));
    if (
      isInsidePublicDir(candidate, rootDir) &&
      (candidate.startsWith(baseResolved + path.sep) || candidate === baseResolved) &&
      fs.existsSync(candidate)
    ) {
      return candidate;
    }
  }

  // Return normalized public path even if missing on disk so caller knows target location
  if (normalizedStored) {
    const fallback = resolveSafeWorkspacePath(normalizedStored, rootDir);
    if (fallback && isInsidePublicDir(fallback, rootDir)) {
      return fallback;
    }
  }
  return null;
}

function isInsidePublicDir(absPath: string, rootDir: string): boolean {
  const publicDir = path.resolve(rootDir, 'public');
  const resolved = path.resolve(absPath);
  return resolved.startsWith(publicDir + path.sep);
}

export function detectMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf') return 'application/pdf';
  if (ext === '.md') return 'text/markdown; charset=utf-8';
  if (ext === '.csv') return 'text/csv; charset=utf-8';
  if (ext === '.json') return 'application/json; charset=utf-8';
  return 'text/plain; charset=utf-8';
}

export async function extractDocumentText(
  buffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<{ text: string; pageCount?: number }> {
  const ext = path.extname(fileName).toLowerCase();
  if (mimeType === 'application/pdf' || ext === '.pdf') {
    try {
      const { extractText, getDocumentProxy } = await import('unpdf');
      const pdf = await getDocumentProxy(new Uint8Array(buffer));
      const { totalPages, text } = await extractText(pdf, { mergePages: true });
      const cleaned = typeof text === 'string' ? text.replace(/\s+/g, ' ').trim() : '';
      return { text: cleaned.slice(0, 120000), pageCount: totalPages };
    } catch (err) {
      console.warn('PDF text extraction fallback:', err instanceof Error ? err.message : err);
      return { text: '' };
    }
  }

  if (mimeType.startsWith('text/') || ['.txt', '.md', '.csv', '.json'].includes(ext)) {
    return {
      text: buffer.toString('utf8').replace(/\s+/g, ' ').trim().slice(0, 120000),
      pageCount: 1,
    };
  }

  return { text: '' };
}

function normalizeCacheDocumentRecord(
  doc: StoredDocument,
  defaultDocDir: string
): StoredDocument {
  const normalizedStoredPath =
    normalizeStoredAssetPath(doc.storedPath || doc.fileName, defaultDocDir) ||
    `${defaultDocDir.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')}/${path.posix.basename(doc.fileName || '')}`;

  const publicUrl =
    doc.publicUrl && doc.publicUrl.startsWith('/assets/')
      ? doc.publicUrl
      : toPublicAssetUrl(normalizedStoredPath, defaultDocDir);

  return {
    ...doc,
    storedPath: normalizedStoredPath,
    publicUrl,
  };
}

export function readCachedDocumentsFromDisk(
  settings: BehongcaSettingsFile,
  rootDir = resolveWorkspaceRoot()
): StoredDocument[] {
  const dbPath = resolveSafeWorkspacePath(settings.paths.documentsDbPath, rootDir);
  if (dbPath && fs.existsSync(dbPath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      if (Array.isArray(raw)) {
        return raw
          .filter((item): item is StoredDocument => Boolean(item && typeof item === 'object' && item.id))
          .map((item) => normalizeCacheDocumentRecord(item, settings.paths.documentDir));
      }
    } catch (err) {
      console.warn('Could not parse data/documents.json:', err);
    }
  }
  return [];
}

/**
 * Read-only archive snapshot used safely by Vercel Serverless Functions (never writes to disk).
 * Prefers pre-generated bundle / normalized disk cache and filters strictly to enabled
 * registeredDocuments when behongca.settings.json is present.
 */
export function loadDocumentsReadOnly(rootDir = resolveWorkspaceRoot()): {
  settings: BehongcaSettingsFile;
  documents: StoredDocument[];
  generatedAt: string;
  missingAssets: string[];
} {
  const settings = loadSettingsReadOnly(rootDir);
  const diskDocs = readCachedDocumentsFromDisk(settings, rootDir);
  const bundledDocs = Array.isArray(GENERATED_ARCHIVE_BUNDLE.documents)
    ? GENERATED_ARCHIVE_BUNDLE.documents.map((d) =>
        normalizeCacheDocumentRecord(d, settings.paths.documentDir)
      )
    : [];

  const sourceDocs = bundledDocs.length > 0 ? bundledDocs : diskDocs;
  const enabledEntries = settings.registeredDocuments.filter(
    (entry) => entry && entry.enabled === true && Boolean(entry.filePath)
  );

  if (enabledEntries.length === 0) {
    return {
      settings,
      documents: sourceDocs,
      generatedAt: GENERATED_ARCHIVE_BUNDLE.generatedAt || '',
      missingAssets: GENERATED_ARCHIVE_BUNDLE.missingAssets || [],
    };
  }

  const orderedDocs: StoredDocument[] = [];
  for (const entry of enabledEntries) {
    const docId = String(entry.id || path.basename(entry.filePath)).replace(
      /[^a-zA-Z0-9_-]/g,
      '-'
    );
    const normalizedEntryPath = normalizeStoredAssetPath(
      entry.filePath,
      settings.paths.documentDir
    );
    const matched =
      sourceDocs.find((d) => d.id === docId) ||
      sourceDocs.find(
        (d) =>
          normalizeStoredAssetPath(d.storedPath, settings.paths.documentDir) ===
            normalizedEntryPath || d.fileName === path.posix.basename(normalizedEntryPath)
      );

    if (matched) {
      const publicUrl = toPublicAssetUrl(
        normalizedEntryPath || matched.storedPath,
        settings.paths.documentDir
      );
      orderedDocs.push({
        ...matched,
        id: docId,
        title: entry.title || matched.title,
        category:
          entry.category || matched.category || settings.documentCategories[0]?.id || 'manuscript',
        author: entry.author || matched.author || settings.paperMetadata.institution,
        language:
          entry.language === 'id' || entry.language === 'en'
            ? entry.language
            : matched.language || 'bilingual',
        description: entry.description ?? matched.description ?? '',
        storedPath: normalizedEntryPath || matched.storedPath,
        publicUrl: publicUrl || matched.publicUrl,
      });
    }
  }

  return {
    settings,
    documents: orderedDocs,
    generatedAt: GENERATED_ARCHIVE_BUNDLE.generatedAt || '',
    missingAssets: GENERATED_ARCHIVE_BUNDLE.missingAssets || [],
  };
}

/**
 * Writable build-time and local-dev synchronizer.
 * Normalizes legacy storedPath values, reuses extractedText when fileSize matches,
 * re-extracts with unpdf only when missing or modified, and persists both
 * data/documents.json and lib/generatedArchiveBundle.ts.
 */
export async function syncConfiguredDocuments(options?: {
  rootDir?: string;
  forceExtract?: boolean;
  writeBundle?: boolean;
}): Promise<{
  settings: BehongcaSettingsFile;
  documents: StoredDocument[];
  missingAssets: string[];
  reusedCacheCount: number;
  extractedCount: number;
}> {
  const rootDir = options?.rootDir || resolveWorkspaceRoot();
  const settings = loadSettingsReadOnly(rootDir);
  const existingDocs = readCachedDocumentsFromDisk(settings, rootDir);
  const syncedDocs: StoredDocument[] = [];
  const missingAssets: string[] = [];
  let reusedCacheCount = 0;
  let extractedCount = 0;

  for (const entry of settings.registeredDocuments) {
    if (!entry || entry.enabled !== true || !entry.filePath) continue;

    const resolvedFile = resolveSafePublicAssetFile(
      entry.filePath,
      settings.paths.documentDir,
      rootDir,
      settings.paths.labDocsDir
    );

    if (!resolvedFile || !fs.existsSync(resolvedFile)) {
      const missingRef = resolvedFile || entry.filePath;
      missingAssets.push(missingRef);
      console.warn(`Registered document enabled but missing on disk: ${missingRef}`);
      continue;
    }

    const stat = fs.statSync(resolvedFile);
    const relativeStoredPath = path
      .relative(rootDir, resolvedFile)
      .replace(/\\/g, '/');
    const docId = String(entry.id || path.basename(resolvedFile)).replace(
      /[^a-zA-Z0-9_-]/g,
      '-'
    );
    const fileName = path.basename(resolvedFile);
    const mimeType = detectMimeType(resolvedFile);
    const publicUrl = toPublicAssetUrl(relativeStoredPath, settings.paths.documentDir);

    const prev = existingDocs.find((d) => {
      const prevNorm = normalizeStoredAssetPath(d.storedPath, settings.paths.documentDir);
      return (
        d.id === docId ||
        (prevNorm === relativeStoredPath && d.fileSize === stat.size) ||
        (d.fileName === fileName && d.fileSize === stat.size)
      );
    });

    const sameFile = Boolean(
      prev &&
        prev.fileSize === stat.size &&
        (normalizeStoredAssetPath(prev.storedPath, settings.paths.documentDir) ===
          relativeStoredPath ||
          prev.fileName === fileName)
    );

    let extractedText = prev?.extractedText || '';
    let pageCount = prev?.pageCount;

    if (options?.forceExtract || !sameFile || !extractedText) {
      const buffer = fs.readFileSync(resolvedFile);
      const extracted = await extractDocumentText(buffer, mimeType, fileName);
      extractedText = extracted.text;
      pageCount = extracted.pageCount;
      extractedCount += 1;
    } else {
      reusedCacheCount += 1;
    }

    const uploadedAt =
      typeof entry.uploadedAt === 'string' && !Number.isNaN(Date.parse(entry.uploadedAt))
        ? entry.uploadedAt
        : stat.mtime.toISOString();

    syncedDocs.push({
      id: docId,
      title: entry.title || fileName,
      category: entry.category || settings.documentCategories[0]?.id || 'manuscript',
      author: entry.author || settings.paperMetadata.institution,
      language:
        entry.language === 'id' || entry.language === 'en' ? entry.language : 'bilingual',
      description: entry.description || '',
      fileName,
      storedPath: relativeStoredPath,
      publicUrl,
      mimeType,
      fileSize: stat.size,
      pageCount,
      uploadedAt,
      isCurated: true,
      extractedText,
    });
  }

  // Persist portable cache to data/documents.json when changed
  const dbPath = resolveSafeWorkspacePath(settings.paths.documentsDbPath, rootDir);
  if (dbPath) {
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    const rawDisk = fs.existsSync(dbPath) ? fs.readFileSync(dbPath, 'utf8') : '';
    const nextCachePayload = JSON.stringify(
      syncedDocs.map(({ publicUrl: _omitPublicUrl, ...rest }) => rest),
      null,
      2
    );
    if (rawDisk.trim() !== nextCachePayload.trim()) {
      fs.writeFileSync(dbPath, `${nextCachePayload}\n`, 'utf8');
    }
  }

  if (options?.writeBundle) {
    const bundlePath = path.join(rootDir, 'lib', 'generatedArchiveBundle.ts');
    const resolvedDownloads = resolvePublicDownloads(settings, rootDir);
    const bundleData: GeneratedArchiveBundle = {
      generatedAt: new Date().toISOString(),
      missingAssets,
      settings,
      downloads: resolvedDownloads,
      documents: syncedDocs,
    };
    const fileContents = [
      '// Auto-generated by scripts/build-doc-index.ts during build.',
      '// Do not edit manually; modify behongca.settings.json or public/assets/document/* and run npm run build.',
      '',
      "import type { GeneratedArchiveBundle } from './documentArchive.js';",
      '',
      `export const GENERATED_ARCHIVE_BUNDLE: GeneratedArchiveBundle = ${JSON.stringify(
        bundleData,
        null,
        2
      )};`,
      '',
    ].join('\n');
    fs.writeFileSync(bundlePath, fileContents, 'utf8');
  }

  return {
    settings,
    documents: syncedDocs,
    missingAssets,
    reusedCacheCount,
    extractedCount,
  };
}

export function buildSnippet(text: string, query: string): string | undefined {
  if (!query || !text) return undefined;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return undefined;
  const start = Math.max(0, idx - 70);
  const end = Math.min(text.length, idx + query.length + 110);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < text.length ? '...' : '';
  return `${prefix}${text.slice(start, end)}${suffix}`;
}

export function filterAndSearchDocuments(
  docs: StoredDocument[],
  options: { q?: string; category?: string }
): StoredDocument[] {
  const q = (options.q || '').trim();
  const category = (options.category || 'all').trim();

  let filtered = docs;
  if (category && category !== 'all') {
    filtered = filtered.filter((d) => d.category === category);
  }

  if (q) {
    const ql = q.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.title.toLowerCase().includes(ql) ||
        d.author.toLowerCase().includes(ql) ||
        d.description.toLowerCase().includes(ql) ||
        d.fileName.toLowerCase().includes(ql) ||
        d.extractedText.toLowerCase().includes(ql)
    );
  }

  return filtered;
}

export function sanitizeDocResponse(
  doc: StoredDocument,
  query?: string
): SanitizedArchivedDocument {
  const publicUrl =
    doc.publicUrl && doc.publicUrl.startsWith('/assets/')
      ? doc.publicUrl
      : toPublicAssetUrl(doc.storedPath || doc.fileName);

  return {
    id: doc.id,
    title: doc.title,
    category: doc.category,
    author: doc.author,
    language: doc.language,
    description: doc.description,
    fileName: doc.fileName,
    publicUrl,
    mimeType: doc.mimeType,
    fileSize: doc.fileSize,
    pageCount: doc.pageCount,
    uploadedAt: doc.uploadedAt,
    isCurated: Boolean(doc.isCurated),
    matchSnippet: query ? buildSnippet(doc.extractedText, query) : undefined,
    textPreview: doc.extractedText ? doc.extractedText.slice(0, 420) : '',
  };
}

export function buildContentDisposition(fileName: string, download: boolean): string {
  const cleanName = path.basename(fileName || 'document.pdf').replace(/["\r\n]/g, '_');
  const asciiFallback = cleanName.replace(/[^\x20-\x7E]/g, '_') || 'document.pdf';
  const encoded = encodeURIComponent(cleanName);
  const disposition = download ? 'attachment' : 'inline';
  return `${disposition}; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`;
}

export function sendJson(
  res: ServerResponse,
  statusCode: number,
  payload: unknown,
  cacheControl = 'no-store'
): void {
  const body = JSON.stringify(payload);
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', cacheControl);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(body);
}

export function getQueryParam(req: VercelNodeRequest, name: string): string {
  if (req.query && req.query[name] !== undefined) {
    const val = req.query[name];
    return Array.isArray(val) ? String(val[0] || '') : String(val || '');
  }
  try {
    const parsed = new URL(req.url || '/', 'http://localhost');
    return parsed.searchParams.get(name) || '';
  } catch {
    return '';
  }
}

export function extractDocumentIdFromRequest(
  req: VercelNodeRequest,
  suffix: 'file' | 'text'
): string {
  const fromQuery = getQueryParam(req, 'id');
  if (fromQuery) {
    try {
      return decodeURIComponent(fromQuery).trim();
    } catch {
      return fromQuery.trim();
    }
  }
  try {
    const parsed = new URL(req.url || '/', 'http://localhost');
    const regex = new RegExp(`^/api/documents/([^/]+)/${suffix}/?$`);
    const match = parsed.pathname.match(regex);
    if (match && match[1]) {
      return decodeURIComponent(match[1]).trim();
    }
  } catch {
    // Ignore malformed URL
  }
  return '';
}

export function getRequestOrigin(req: IncomingMessage): string {
  const protoHeader = req.headers['x-forwarded-proto'];
  const proto =
    typeof protoHeader === 'string' && protoHeader.trim()
      ? protoHeader.split(',')[0].trim()
      : 'https';
  const hostHeader = req.headers['x-forwarded-host'] || req.headers.host;
  if (typeof hostHeader === 'string' && hostHeader.trim()) {
    return `${proto}://${hostHeader.split(',')[0].trim()}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://127.0.0.1:3000';
}
