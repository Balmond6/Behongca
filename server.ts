import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  buildContentDisposition,
  filterAndSearchDocuments,
  getSiteConfigPayload,
  loadSettingsReadOnly,
  readCachedDocumentsFromDisk,
  resolveSafePublicAssetFile,
  sanitizeDocResponse,
  syncConfiguredDocuments,
  type StoredDocument,
} from './lib/documentArchive.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  let cachedDocs: StoredDocument[] = [];
  const initialSyncPromise = syncConfiguredDocuments({ rootDir: __dirname })
    .then((res) => {
      cachedDocs = res.documents;
      return res.documents;
    })
    .catch((err) => {
      console.warn('Initial document sync warning:', err instanceof Error ? err.message : err);
      const settings = loadSettingsReadOnly(__dirname);
      cachedDocs = readCachedDocumentsFromDisk(settings, __dirname);
      return cachedDocs;
    });

  const app = express();
  app.use(express.json());

  app.get('/api/health', async (_req, res) => {
    await initialSyncPromise;
    const settings = loadSettingsReadOnly(__dirname);
    const docs = cachedDocs.length > 0 ? cachedDocs : readCachedDocumentsFromDisk(settings, __dirname);
    res.json({
      ok: true,
      runtime: 'node-express',
      documentsCount: docs.length,
    });
  });

  const downloadDirAbs = path.resolve(__dirname, 'public', 'assets', 'download');
  app.use(
    '/assets/download',
    express.static(downloadDirAbs, {
      index: false,
      fallthrough: true,
      maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
      setHeaders: (res, filePath) => {
        const base = path.basename(filePath);
        const ext = path.extname(base).toLowerCase();
        if (ext === '.apk') {
          res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        } else if (ext === '.zip') {
          res.setHeader('Content-Type', 'application/zip');
        } else if (ext !== '.txt') {
          res.setHeader('Content-Type', 'application/octet-stream');
        }
        if (base && base !== 'README.txt') {
          res.setHeader('Content-Disposition', buildContentDisposition(base, true));
        }
        res.setHeader('X-Content-Type-Options', 'nosniff');
      },
    })
  );
  app.use('/assets/download', (_req, res) => {
    res.status(404).json({
      error: 'Berkas unduhan belum tersedia di folder public/assets/download/.',
      code: 'DOWNLOAD_ASSET_NOT_FOUND',
    });
  });

  // Read-only public site configuration parsed from behongca.settings.json
  app.get('/api/site-config', (_req, res) => {
    const settings = loadSettingsReadOnly(__dirname);
    res.setHeader('Cache-Control', 'no-cache');
    res.json(getSiteConfigPayload(settings, __dirname));
  });

  // Read-only curated documents endpoint (syncs enabled registeredDocuments)
  app.get('/api/documents', async (req, res) => {
    await initialSyncPromise;
    const synced = await syncConfiguredDocuments({ rootDir: __dirname }).catch(() => null);
    if (synced) {
      cachedDocs = synced.documents;
    }

    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const category = typeof req.query.category === 'string' ? req.query.category.trim() : 'all';
    const matched = filterAndSearchDocuments(cachedDocs, { q, category });

    res.setHeader('Cache-Control', 'public, max-age=60');
    res.json({
      documents: matched.map((d) => sanitizeDocResponse(d, q || undefined)),
    });
  });

  app.get('/api/documents/:id/file', async (req, res) => {
    await initialSyncPromise;
    const settings = loadSettingsReadOnly(__dirname);
    const docs = cachedDocs.length > 0 ? cachedDocs : readCachedDocumentsFromDisk(settings, __dirname);
    const doc = docs.find((d) => d.id === req.params.id);

    if (!doc) {
      return res.status(404).json({
        error: 'Dokumen tidak ditemukan.',
        code: 'DOCUMENT_NOT_FOUND',
      });
    }

    const resolvedFile = resolveSafePublicAssetFile(
      doc.storedPath,
      settings.paths.documentDir,
      __dirname,
      settings.paths.labDocsDir
    );

    if (!resolvedFile || !fs.existsSync(resolvedFile)) {
      return res.status(404).json({
        error: 'Berkas PDF tidak ditemukan.',
        code: 'ASSET_NOT_FOUND',
      });
    }

    const download = req.query.download === '1';
    res.setHeader('Content-Type', doc.mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', buildContentDisposition(doc.fileName, download));
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.sendFile(resolvedFile);
  });

  app.get('/api/documents/:id/text', async (req, res) => {
    await initialSyncPromise;
    const settings = loadSettingsReadOnly(__dirname);
    const docs = cachedDocs.length > 0 ? cachedDocs : readCachedDocumentsFromDisk(settings, __dirname);
    const doc = docs.find((d) => d.id === req.params.id);

    if (!doc) {
      return res.status(404).json({
        error: 'Dokumen tidak ditemukan.',
        code: 'DOCUMENT_NOT_FOUND',
      });
    }

    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.json({
      id: doc.id,
      title: doc.title,
      text: doc.extractedText || '',
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    const publicPath = path.resolve(__dirname, 'public');
    const distAssetsPath = path.resolve(distPath, 'assets');
    if (fs.existsSync(distAssetsPath)) {
      app.use('/assets', express.static(distAssetsPath, { maxAge: '7d' }));
    }
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath, { maxAge: '1h' }));
    }
    if (fs.existsSync(publicPath)) {
      app.use(express.static(publicPath, { maxAge: '7d' }));
    }
    if (fs.existsSync(distPath)) {
      app.get('*', (_req, res) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BEHONGCA fullstack server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
