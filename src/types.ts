export type Language = 'id' | 'en';
export type ThemeMode = 'light' | 'dark';
export type ReaderScale = 'standard' | 'large';

export type DocumentCategory = string;

export interface DocumentCategoryConfig {
  id: string;
  emoji?: string;
  label: BilingualText;
}

export interface PaperMetadataConfig {
  kicker: string;
  title: BilingualText;
  subtitle: BilingualText;
  authors: string[];
  institution: string;
  year: number;
}

export interface ArchivedDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  author: string;
  language: 'id' | 'en' | 'bilingual';
  description: string;
  fileName: string;
  publicUrl?: string;
  mimeType: string;
  fileSize: number;
  pageCount?: number;
  uploadedAt: string;
  isCurated?: boolean;
  matchSnippet?: string;
  textPreview?: string;
}

export interface BilingualText {
  id: string;
  en: string;
}

export interface BotanicalIngredient {
  id: string;
  emoji: string;
  name: BilingualText;
  scientificName: string;
  partUsed: BilingualText;
  extractionRatio: string;
  activeCompounds: string[];
  role: BilingualText;
  mechanism: BilingualText;
  accentHex: string;
}

export interface FormulationItem {
  ingredient: BilingualText;
  scientific: string;
  role: BilingualText;
  f1: string;
  f2: string;
  f3: string;
}

export interface HtstStage {
  step: number;
  id: string;
  title: BilingualText;
  tempLabel: string;
  durationLabel: string;
  tempValue: number;
  description: BilingualText;
  scientificNote: BilingualText;
}

export interface SmartDevicePart {
  id: number;
  key: string;
  indonesianName: string;
  englishName: string;
  functionDesc: BilingualText;
  coords: { x: number; y: number };
}

export interface QuizQuestion {
  id: string;
  emoji: string;
  biome: string;
  question: BilingualText;
  options: BilingualText[];
  correctIndex: number;
  explanation: BilingualText;
}

export interface LocalDownloadItem {
  configuredPath: string;
  publicUrl: string;
  fileName: string;
  available: boolean;
  fileSize?: number;
}

export interface DownloadSettings {
  detector: LocalDownloadItem;
  game: LocalDownloadItem;
}

export interface BackgroundVariantPair {
  day: string;
  night: string;
}

export interface BackgroundSettings {
  mobile: BackgroundVariantPair;
  tablet: BackgroundVariantPair;
  desktop: BackgroundVariantPair;
  overlay: {
    dayOpacity: number;
    nightOpacity: number;
  };
  blurPx?: number;
}

export interface NavbarSettings {
  topBlurPx: number;
  scrolledBlurPx: number;
}

export interface SiteConfig {
  downloads: DownloadSettings;
  backgrounds?: BackgroundSettings;
  navbar?: NavbarSettings;
  paperMetadata: PaperMetadataConfig;
  documentCategories: DocumentCategoryConfig[];
}

export interface ReferenceItem {
  id: string;
  citation: string;
  topic: BilingualText;
  year: number;
}

export type LabStatCategory = 'physical_ph' | 'htst' | 'formulas' | 'clsi';

export interface LabMetricItem {
  id: string;
  category: LabStatCategory;
  emoji: string;
  numericValue: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  rangeNote?: string;
  title: BilingualText;
  detail: BilingualText;
  statusType: 'measured' | 'protocol';
}

export type DentalTipTopic = 'brushing' | 'sugar_ph' | 'natural_care' | 'youth';

export interface DentalTipItem {
  id: string;
  topic: DentalTipTopic;
  emoji: string;
  title: BilingualText;
  summary: BilingualText;
  scienceNote: BilingualText;
}

export interface DailyChecklistItem {
  id: string;
  emoji: string;
  label: BilingualText;
  detail: BilingualText;
}
