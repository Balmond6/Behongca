import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FileText,
  Download,
  Search,
  AlertCircle,
  ExternalLink,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  ArchivedDocument,
  DocumentCategory,
  DocumentCategoryConfig,
  Language,
} from '../types';
import { UI_COPY } from '../data/translations';

interface DocumentArchiveSectionProps {
  lang: Language;
  categories: DocumentCategoryConfig[];
  selectedDocId: string | null;
  onSelectDocId: (id: string) => void;
}

type ArchiveErrorKind = 'http' | 'network' | 'invalid_json' | 'missing_file';

interface ArchiveErrorInfo {
  kind: ArchiveErrorKind;
  message: string;
  endpoint: string;
  status?: number;
  statusText?: string;
  detail: string;
  timestamp: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export const DocumentArchiveSection: React.FC<DocumentArchiveSectionProps> = ({
  lang,
  categories,
  selectedDocId,
  onSelectDocId,
}) => {
  const t = UI_COPY[lang];

  const [documents, setDocuments] = useState<ArchivedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<'all' | DocumentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [errorInfo, setErrorInfo] = useState<ArchiveErrorInfo | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Text content fallback for non-PDF text/md/csv documents
  const [textPreviewContent, setTextPreviewContent] = useState<string>('');
  const [textPreviewError, setTextPreviewError] = useState<string | null>(null);
  const [shouldLoadPdf, setShouldLoadPdf] = useState(false);
  const [pdfFrameLoading, setPdfFrameLoading] = useState(false);
  const [resolvedPreviewUrl, setResolvedPreviewUrl] = useState<string | null>(null);
  const [missingAssetError, setMissingAssetError] = useState<string | null>(null);
  const [assetCheckNonce, setAssetCheckNonce] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const selectedDocIdRef = useRef(selectedDocId);
  const onSelectDocIdRef = useRef(onSelectDocId);

  useEffect(() => {
    selectedDocIdRef.current = selectedDocId;
  }, [selectedDocId]);

  useEffect(() => {
    onSelectDocIdRef.current = onSelectDocId;
  }, [onSelectDocId]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || shouldLoadPdf) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoadPdf(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadPdf(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoadPdf]);

  const getCategoryDisplay = (catId: string): string => {
    const found = categories.find((c) => c.id === catId);
    if (!found) return catId;
    return `${found.emoji ? `${found.emoji} ` : ''}${found.label[lang]}`;
  };

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setErrorInfo(null);

    const params = new URLSearchParams();
    if (filterCategory !== 'all') params.set('category', filterCategory);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    const querySuffix = params.toString();
    const endpoint = querySuffix ? `/api/documents?${querySuffix}` : '/api/documents';

    try {
      const res = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        let serverDetail = res.statusText || `HTTP ${res.status}`;
        try {
          const errText = await res.text();
          if (errText) {
            try {
              const parsedErr = JSON.parse(errText) as { error?: string; detail?: string };
              serverDetail = parsedErr.detail || parsedErr.error || serverDetail;
            } catch {
              serverDetail = errText.slice(0, 180);
            }
          }
        } catch {
          // Keep default status detail
        }

        const friendlyHttpMessage =
          res.status === 404
            ? lang === 'id'
              ? 'Endpoint arsip dokumen tidak ditemukan di server (HTTP 404).'
              : 'Document archive API endpoint was not found on the server (HTTP 404).'
            : res.status >= 500
              ? lang === 'id'
                ? 'Server arsip dokumen mengalami gangguan saat memproses permintaan.'
                : 'The document archive server encountered an internal error.'
              : lang === 'id'
                ? `Gagal memuat daftar dokumen (HTTP ${res.status}).`
                : `Failed to load document archive (HTTP ${res.status}).`;

        const info: ArchiveErrorInfo = {
          kind: 'http',
          message: friendlyHttpMessage,
          endpoint,
          status: res.status,
          statusText: res.statusText,
          detail: serverDetail,
          timestamp: new Date().toISOString(),
        };

        if (import.meta.env.DEV) {
          console.warn('[DocumentArchive] HTTP error:', info);
        }
        setErrorInfo(info);
        return;
      }

      const rawText = await res.text();
      let data: unknown;
      try {
        data = JSON.parse(rawText);
      } catch (parseErr) {
        const info: ArchiveErrorInfo = {
          kind: 'invalid_json',
          message:
            lang === 'id'
              ? 'Server mengembalikan respons non-JSON saat memuat arsip dokumen.'
              : 'Server returned a non-JSON response while loading the document archive.',
          endpoint,
          status: res.status,
          detail:
            parseErr instanceof Error
              ? `${parseErr.message} (preview: ${rawText.slice(0, 80)})`
              : 'JSON parse failure',
          timestamp: new Date().toISOString(),
        };
        if (import.meta.env.DEV) {
          console.warn('[DocumentArchive] Invalid JSON error:', info);
        }
        setErrorInfo(info);
        return;
      }

      if (
        !data ||
        typeof data !== 'object' ||
        !Array.isArray((data as { documents?: unknown }).documents)
      ) {
        const info: ArchiveErrorInfo = {
          kind: 'invalid_json',
          message:
            lang === 'id'
              ? 'Struktur data arsip dokumen dari server tidak sesuai format.'
              : 'Document archive payload from server has an unexpected structure.',
          endpoint,
          status: res.status,
          detail: 'Missing "documents" array in JSON response.',
          timestamp: new Date().toISOString(),
        };
        if (import.meta.env.DEV) {
          console.warn('[DocumentArchive] Invalid schema:', info);
        }
        setErrorInfo(info);
        return;
      }

      const list = (data as { documents: ArchivedDocument[] }).documents;
      setDocuments(list);

      const currentSelected = selectedDocIdRef.current;
      if (list.length > 0 && (!currentSelected || !list.some((d) => d.id === currentSelected))) {
        onSelectDocIdRef.current(list[0].id);
      }
    } catch (err) {
      const info: ArchiveErrorInfo = {
        kind: 'network',
        message:
          lang === 'id'
            ? 'Koneksi ke server arsip dokumen gagal. Periksa jaringan Anda lalu coba lagi.'
            : 'Network error while reaching the document archive server. Please check your connection and retry.',
        endpoint,
        detail: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toISOString(),
      };
      if (import.meta.env.DEV) {
        console.warn('[DocumentArchive] Network error:', info);
      }
      setErrorInfo(info);
    } finally {
      setLoading(false);
    }
  }, [filterCategory, searchQuery, lang]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const activeDoc =
    documents.find((d) => d.id === selectedDocId) || documents[0] || null;

  const encodedDocId = activeDoc ? encodeURIComponent(activeDoc.id) : '';
  const apiFileUrl = activeDoc ? `/api/documents/${encodedDocId}/file` : '';
  const apiDownloadUrl = activeDoc
    ? `/api/documents/${encodedDocId}/file?download=1`
    : '';
  const primaryPublicUrl =
    activeDoc?.publicUrl && activeDoc.publicUrl.startsWith('/assets/')
      ? activeDoc.publicUrl
      : apiFileUrl;

  // Verify PDF availability (direct public URL first, with API fallback) when preview opens
  useEffect(() => {
    if (!activeDoc || activeDoc.mimeType !== 'application/pdf' || !shouldLoadPdf) {
      setMissingAssetError(null);
      setResolvedPreviewUrl(activeDoc ? primaryPublicUrl : null);
      return;
    }

    let cancelled = false;
    setMissingAssetError(null);
    setResolvedPreviewUrl(primaryPublicUrl);

    const verifyAsset = async () => {
      try {
        const publicRes = await fetch(primaryPublicUrl, { method: 'HEAD' });
        const publicContentType = publicRes.headers.get('content-type') || '';
        const isValidPublicPdf =
          publicRes.ok && !publicContentType.includes('text/html');
        if (isValidPublicPdf) {
          if (!cancelled) {
            setResolvedPreviewUrl(primaryPublicUrl);
            setMissingAssetError(null);
          }
          return;
        }

        // Direct public URL unavailable -> fall back to API file endpoint
        if (apiFileUrl && apiFileUrl !== primaryPublicUrl) {
          const fallbackRes = await fetch(apiFileUrl, { method: 'HEAD' });
          const fallbackType = fallbackRes.headers.get('content-type') || '';
          if (fallbackRes.ok && !fallbackType.includes('text/html')) {
            if (!cancelled) {
              setResolvedPreviewUrl(apiFileUrl);
              setMissingAssetError(null);
            }
            return;
          }
        }

        if (!cancelled) {
          setMissingAssetError(
            lang === 'id'
              ? `Berkas PDF "${activeDoc.fileName}" tidak ditemukan di URL publik maupun endpoint cadangan.`
              : `PDF file "${activeDoc.fileName}" was not found at its public URL or fallback endpoint.`
          );
        }
      } catch {
        // Keep primaryPublicUrl if HEAD fails transiently so browser iframe can attempt loading
        if (!cancelled) {
          setResolvedPreviewUrl(primaryPublicUrl);
        }
      }
    };

    verifyAsset();
    return () => {
      cancelled = true;
    };
  }, [activeDoc, shouldLoadPdf, primaryPublicUrl, apiFileUrl, lang, assetCheckNonce]);

  // Show sleek BEHONGCA PDF loader when iframe opens or switches documents, with safety timeout
  useEffect(() => {
    if (!shouldLoadPdf || !activeDoc || activeDoc.mimeType !== 'application/pdf' || missingAssetError) {
      setPdfFrameLoading(false);
      return;
    }

    setPdfFrameLoading(true);
    const safetyTimer = window.setTimeout(() => {
      setPdfFrameLoading(false);
    }, 2000);

    return () => {
      window.clearTimeout(safetyTimer);
    };
  }, [shouldLoadPdf, activeDoc?.id, activeDoc?.mimeType, resolvedPreviewUrl, missingAssetError]);

  useEffect(() => {
    if (!activeDoc || activeDoc.mimeType === 'application/pdf') {
      setTextPreviewContent('');
      setTextPreviewError(null);
      return;
    }

    let cancelled = false;
    setTextPreviewError(null);

    fetch(`/api/documents/${encodeURIComponent(activeDoc.id)}/text`, {
      headers: { Accept: 'application/json' },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = (await res.json()) as { text?: string };
        if (!cancelled) {
          setTextPreviewContent(data.text || '');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setTextPreviewContent('');
          setTextPreviewError(
            lang === 'id'
              ? 'Gagal memuat pratinjau teks dokumen dari server.'
              : 'Failed to load document text preview from server.'
          );
          if (import.meta.env.DEV) {
            console.warn('[DocumentArchive] Text preview error:', err);
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, [activeDoc, lang]);

  const hasActiveFilter = filterCategory !== 'all' || Boolean(searchQuery.trim());
  const effectivePreviewUrl = resolvedPreviewUrl || primaryPublicUrl;

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="behongca-lazy-section border-b border-[#DCE5DE] py-14 lg:py-20 dark:border-[#23332D]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="behongca-title-panel max-w-2xl">
          <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
            {t.sections.archiveTitle}
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#13201B] sm:text-3xl [text-wrap:balance] dark:text-[#EFF5F1]">
            {t.sections.archiveHeading}
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#44574F] dark:text-[#A9BDB3]">
            {t.sections.archiveLead}
          </p>
        </div>

        {/* Structured Error Feedback Banner with Retry & Optional Diagnostics */}
        {errorInfo && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-[#DC2626]/40 bg-[#DC2626]/10 px-4 py-3.5 text-xs text-[#991B1B] dark:border-[#F87171]/40 dark:bg-[#F87171]/10 dark:text-[#FCA5A5]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-2.5 font-medium">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{errorInfo.message}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowDiagnostics((prev) => !prev)}
                  className="inline-flex items-center gap-1 rounded-md border border-[#DC2626]/30 bg-white/60 px-2.5 py-1.5 text-[11px] font-medium text-[#7F1D1D] hover:bg-white dark:border-[#F87171]/30 dark:bg-[#141E1B]/70 dark:text-[#FCA5A5] cursor-pointer"
                >
                  <span>
                    {lang === 'id' ? 'Detail Diagnostik' : 'Diagnostics'}
                  </span>
                  {showDiagnostics ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => fetchDocuments()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#991B1B] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#7F1D1D] dark:bg-[#F87171] dark:text-[#230909] cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>{lang === 'id' ? 'Coba Lagi' : 'Retry'}</span>
                </button>
              </div>
            </div>

            {showDiagnostics && (
              <div className="mt-3 rounded-lg border border-[#DC2626]/25 bg-white/75 p-3 font-mono text-[11px] leading-relaxed text-[#450A0A] dark:border-[#F87171]/25 dark:bg-[#0F1714]/90 dark:text-[#FECACA]">
                <div>type: {errorInfo.kind}</div>
                <div>endpoint: {errorInfo.endpoint}</div>
                {errorInfo.status !== undefined && (
                  <div>
                    status: {errorInfo.status}{' '}
                    {errorInfo.statusText ? `(${errorInfo.statusText})` : ''}
                  </div>
                )}
                <div className="break-words">detail: {errorInfo.detail}</div>
                <div>time: {errorInfo.timestamp}</div>
              </div>
            )}
          </div>
        )}

        {/* Filter Bar + Split Archive Catalog & Embedded PDF Preview */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Search, Category Filters & Document List */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#556960] dark:text-[#8CA398]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.archive.searchDocsPlaceholder}
                className="w-full rounded-lg border border-[#DCE5DE] bg-white py-2.5 pr-4 pl-10 text-sm text-[#13201B] focus:border-[#0D7A5F] focus:outline-none dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#EFF5F1] dark:focus:border-[#34D399]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  filterCategory === 'all'
                    ? 'border-[#0D7A5F] bg-[#0D7A5F] text-white dark:border-[#34D399] dark:bg-[#0D4A3A] dark:text-white'
                    : 'border-transparent bg-[#EEF4F0] text-[#44574F] hover:text-[#13201B] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#A9BDB3] dark:hover:text-white'
                }`}
              >
                {t.archive.filterAll}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilterCategory(cat.id)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    filterCategory === cat.id
                      ? 'border-[#0D7A5F] bg-[#0D7A5F] text-white dark:border-[#34D399] dark:bg-[#0D4A3A] dark:text-white'
                      : 'border-transparent bg-[#EEF4F0] text-[#44574F] hover:text-[#13201B] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#A9BDB3] dark:hover:text-white'
                  }`}
                >
                  {cat.emoji ? `${cat.emoji} ` : ''}
                  {cat.label[lang]}
                </button>
              ))}
            </div>

            {/* Document List */}
            <div className="space-y-2.5 max-h-[540px] overflow-y-auto pr-1">
              {loading ? (
                <div className="space-y-2.5" aria-busy="true" aria-label={lang === 'id' ? 'Memuat arsip dokumen' : 'Loading document archive'}>
                  <div className="flex items-center gap-3 rounded-xl border border-[#DCE5DE] bg-white px-4 py-3 dark:border-[#23332D] dark:bg-[#141E1B]">
                    <img
                      src="/assets/logo/favicon_io/apple-touch-icon.png"
                      alt=""
                      width={24}
                      height={24}
                      referrerPolicy="no-referrer"
                      className="behongca-splash-logo h-6 w-6 rounded-full object-contain shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                        {lang === 'id' ? 'Memuat arsip dokumen...' : 'Loading document archive...'}
                      </p>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[#E5EDE8] dark:bg-[#1E2C26]">
                        <div className="behongca-indeterminate-bar h-full w-1/2 rounded-full bg-[#0D7A5F] dark:bg-[#34D399]" />
                      </div>
                    </div>
                  </div>
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className="animate-pulse rounded-xl border border-[#DCE5DE] bg-white p-4 dark:border-[#23332D] dark:bg-[#141E1B]"
                    >
                      <div className="h-2.5 w-28 rounded bg-[#DCE5DE] dark:bg-[#23332D]" />
                      <div className="mt-2.5 h-4 w-3/4 rounded bg-[#E5EDE8] dark:bg-[#1E2C26]" />
                      <div className="mt-2 h-3 w-1/2 rounded bg-[#EEF4F0] dark:bg-[#1A2520]" />
                    </div>
                  ))}
                </div>
              ) : errorInfo && documents.length === 0 ? (
                <div className="rounded-xl border border-[#DC2626]/30 bg-white p-6 text-center text-xs text-[#7F1D1D] dark:border-[#F87171]/30 dark:bg-[#141E1B] dark:text-[#FCA5A5]">
                  <p>
                    {lang === 'id'
                      ? 'Daftar dokumen tidak dapat ditampilkan karena koneksi API bermasalah.'
                      : 'Document list cannot be shown because the API request failed.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => fetchDocuments()}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[#DC2626]/35 px-3 py-1.5 text-xs font-semibold hover:bg-[#DC2626]/10 cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>{lang === 'id' ? 'Coba Muat Ulang' : 'Retry Request'}</span>
                  </button>
                </div>
              ) : documents.length === 0 ? (
                <div className="rounded-xl border border-[#DCE5DE] bg-white p-6 text-center text-xs text-[#556960] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#8CA398]">
                  {hasActiveFilter
                    ? t.archive.noDocs
                    : lang === 'id'
                      ? 'Belum ada dokumen aktif yang terdaftar di arsip.'
                      : 'No active documents are currently registered in the archive.'}
                </div>
              ) : (
                documents.map((doc) => {
                  const isActive = activeDoc?.id === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setShouldLoadPdf(true);
                        onSelectDocId(doc.id);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setShouldLoadPdf(true);
                          onSelectDocId(doc.id);
                        }
                      }}
                      className={`rounded-xl border p-4 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#0D7A5F] bg-white shadow-xs dark:border-[#34D399] dark:bg-[#0D4A3A]'
                          : 'border-[#DCE5DE] bg-white/80 hover:border-[#0D7A5F]/50 dark:border-[#23332D] dark:bg-[#141E1B] dark:hover:border-[#34D399]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div
                            className={`flex flex-wrap items-center gap-2 font-mono text-[11px] ${
                              isActive ? 'text-[#556960] dark:text-[#D1FAE5]' : 'text-[#556960] dark:text-[#8CA398]'
                            }`}
                          >
                            <span
                              className={`font-semibold ${
                                isActive ? 'text-[#0D7A5F] dark:text-[#A7F3D0]' : 'text-[#0D7A5F] dark:text-[#34D399]'
                              }`}
                            >
                              {getCategoryDisplay(doc.category)}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{formatFileSize(doc.fileSize)}</span>
                            {doc.pageCount ? (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{doc.pageCount} pp</span>
                              </>
                            ) : null}
                          </div>

                          <h3
                            className={`mt-1 font-display text-sm font-bold ${
                              isActive ? 'text-[#13201B] dark:text-white' : 'text-[#13201B] dark:text-[#EFF5F1]'
                            }`}
                          >
                            {doc.title}
                          </h3>

                          <p
                            className={`mt-1 truncate text-xs ${
                              isActive ? 'text-[#44574F] dark:text-[#E2F5EC]' : 'text-[#44574F] dark:text-[#A9BDB3]'
                            }`}
                          >
                            {doc.author}
                          </p>

                          {doc.matchSnippet && (
                            <p className="mt-2 rounded bg-[#EEF4F0] p-2 font-mono text-[11px] text-[#25362F] dark:bg-[#0F1714] dark:text-[#B9CBC2]">
                              {doc.matchSnippet}
                            </p>
                          )}
                        </div>

                        <FileText
                          className={`mt-1 h-4 w-4 shrink-0 ${
                            isActive ? 'text-[#0D7A5F] dark:text-[#A7F3D0]' : 'text-[#0D7A5F] dark:text-[#34D399]'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Integrated PDF & Text Preview Viewport */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-[#DCE5DE] bg-white lg:col-span-7 dark:border-[#23332D] dark:bg-[#141E1B]">
            {activeDoc ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE5DE] px-5 py-4 dark:border-[#23332D]">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#0D7A5F] dark:text-[#34D399]">
                      <Eye className="h-3.5 w-3.5 shrink-0" />
                      <span className="font-mono font-semibold">{t.archive.previewTitle}</span>
                    </div>
                    <h3 className="mt-0.5 truncate font-display text-sm font-bold text-[#13201B] dark:text-[#EFF5F1]">
                      {activeDoc.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={effectivePreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE5DE] px-3 py-1.5 text-xs font-medium text-[#13201B] hover:border-[#0D7A5F] dark:border-[#23332D] dark:text-[#E3ECE7] whitespace-nowrap"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Tab</span>
                    </a>

                    <a
                      href={apiDownloadUrl}
                      download={activeDoc.fileName}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0D7A5F] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0A634D] dark:bg-[#10B981] dark:text-[#071510] whitespace-nowrap"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>{t.archive.downloadBtn}</span>
                    </a>
                  </div>
                </div>

                {activeDoc.description && (
                  <div className="border-b border-[#DCE5DE] bg-[#F7FAF8] px-5 py-3 text-xs leading-relaxed text-[#44574F] dark:border-[#23332D] dark:bg-[#0F1714] dark:text-[#A9BDB3]">
                    {activeDoc.description}
                  </div>
                )}

                <div className="relative min-h-[520px] flex-1 bg-[#EEF4F0] dark:bg-[#0B100E]">
                  {activeDoc.mimeType === 'application/pdf' ? (
                    missingAssetError ? (
                      <div className="flex h-[560px] flex-col items-center justify-center gap-3 p-6 text-center">
                        <AlertCircle className="h-9 w-9 text-[#DC2626] dark:text-[#F87171]" />
                        <p className="max-w-md text-xs leading-relaxed text-[#7F1D1D] dark:text-[#FCA5A5]">
                          {missingAssetError}
                        </p>
                        <button
                          type="button"
                          onClick={() => setAssetCheckNonce((n) => n + 1)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE5DE] bg-white px-4 py-2 text-xs font-semibold text-[#13201B] hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#EFF5F1] cursor-pointer"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>{lang === 'id' ? 'Periksa Berkas Lagi' : 'Check File Again'}</span>
                        </button>
                      </div>
                    ) : shouldLoadPdf ? (
                      <>
                        {pdfFrameLoading && (
                          <div
                            role="status"
                            aria-live="polite"
                            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#EEF4F0]/92 backdrop-blur-xs dark:bg-[#0B100E]/92"
                          >
                            <div className="behongca-splash-logo flex h-12 w-12 items-center justify-center rounded-full border border-[#0D7A5F]/30 bg-white shadow-xs dark:border-[#34D399]/40 dark:bg-[#141E1B]">
                              <img
                                src="/assets/logo/favicon_io/apple-touch-icon.png"
                                alt=""
                                width={34}
                                height={34}
                                referrerPolicy="no-referrer"
                                className="h-8 w-8 rounded-full object-contain"
                              />
                            </div>
                            <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                              {lang === 'id' ? 'Memuat pratinjau PDF...' : 'Loading PDF preview...'}
                            </p>
                            <div className="h-1 w-40 overflow-hidden rounded-full bg-[#DCE5DE] dark:bg-[#1E2C26]">
                              <div className="behongca-indeterminate-bar h-full w-1/2 rounded-full bg-[#0D7A5F] dark:bg-[#34D399]" />
                            </div>
                          </div>
                        )}
                        <iframe
                          key={`${activeDoc.id}-${effectivePreviewUrl}`}
                          src={`${effectivePreviewUrl}#view=FitH`}
                          title={activeDoc.title}
                          loading="lazy"
                          onLoad={() => setPdfFrameLoading(false)}
                          className="h-[560px] w-full border-0"
                        />
                      </>
                    ) : (
                      <div className="flex h-[560px] flex-col items-center justify-center gap-3 p-6 text-center">
                        <FileText className="h-9 w-9 text-[#0D7A5F] dark:text-[#34D399]" />
                        <p className="max-w-sm text-xs leading-relaxed text-[#44574F] dark:text-[#A9BDB3]">
                          {lang === 'id'
                            ? 'Pratinjau PDF dimuat otomatis saat Anda mendekati bagian ini agar pembukaan halaman tetap ringan.'
                            : 'PDF preview loads automatically as you scroll here to keep initial page load fast.'}
                        </p>
                        <button
                          type="button"
                          onClick={() => setShouldLoadPdf(true)}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#0D7A5F] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0A634D] dark:bg-[#10B981] dark:text-[#071510] cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>{lang === 'id' ? 'Muat Pratinjau PDF' : 'Load PDF Preview'}</span>
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="h-[560px] overflow-y-auto p-6">
                      {textPreviewError && (
                        <p className="mb-3 rounded border border-[#DC2626]/30 bg-[#DC2626]/10 px-3 py-2 text-xs text-[#991B1B] dark:text-[#FCA5A5]">
                          {textPreviewError}
                        </p>
                      )}
                      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#13201B] dark:text-[#E3ECE7]">
                        {textPreviewContent || activeDoc.textPreview || 'No text preview available.'}
                      </pre>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-[480px] flex-col items-center justify-center gap-2 p-8 text-center text-sm text-[#556960] dark:text-[#8CA398]">
                <p>
                  {errorInfo
                    ? lang === 'id'
                      ? 'Pratinjau dokumen menunggu koneksi API pulih.'
                      : 'Document preview is waiting for the archive API to recover.'
                    : hasActiveFilter
                      ? t.archive.noDocs
                      : lang === 'id'
                        ? 'Belum ada dokumen yang tersedia untuk ditampilkan.'
                        : 'No documents are currently available for preview.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
