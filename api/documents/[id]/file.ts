import fs from 'fs';
import type { ServerResponse } from 'http';
import {
  buildContentDisposition,
  extractDocumentIdFromRequest,
  getQueryParam,
  getRequestOrigin,
  loadDocumentsReadOnly,
  resolveSafePublicAssetFile,
  resolveWorkspaceRoot,
  sendJson,
  toPublicAssetUrl,
  type VercelNodeRequest,
} from '../../../lib/documentArchive.js';

const MAX_SERVERLESS_PAYLOAD_BYTES = 4_200_000;

export default async function handler(req: VercelNodeRequest, res: ServerResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const docId = extractDocumentIdFromRequest(req, 'file');
    if (!docId) {
      return sendJson(res, 400, {
        error: 'ID dokumen tidak valid.',
        code: 'INVALID_DOCUMENT_ID',
      });
    }

    const rootDir = resolveWorkspaceRoot();
    const { settings, documents } = loadDocumentsReadOnly(rootDir);
    const doc = documents.find((d) => d.id === docId);

    if (!doc) {
      return sendJson(res, 404, {
        error: 'Dokumen tidak ditemukan.',
        code: 'DOCUMENT_NOT_FOUND',
        id: docId,
      });
    }

    const download = getQueryParam(req, 'download') === '1';
    const publicUrl =
      doc.publicUrl && doc.publicUrl.startsWith('/assets/')
        ? doc.publicUrl
        : toPublicAssetUrl(doc.storedPath || doc.fileName, settings.paths.documentDir);

    const contentType = doc.mimeType || 'application/pdf';
    const disposition = buildContentDisposition(doc.fileName, download);

    // 1. Prefer verified static file under public/ if included in function bundle
    const safeDiskFile = resolveSafePublicAssetFile(
      doc.storedPath,
      settings.paths.documentDir,
      rootDir,
      settings.paths.labDocsDir
    );

    if (safeDiskFile && fs.existsSync(safeDiskFile)) {
      const stat = fs.statSync(safeDiskFile);
      if (stat.size <= MAX_SERVERLESS_PAYLOAD_BYTES) {
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', disposition);
        res.setHeader('Content-Length', String(stat.size));
        res.setHeader('Cache-Control', 'public, max-age=300');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        if (req.method === 'HEAD') {
          return res.end();
        }
        return res.end(fs.readFileSync(safeDiskFile));
      }
    }

    // 2. Large inline assets redirect directly to Vercel Edge static asset CDN
    if (!download && doc.fileSize > MAX_SERVERLESS_PAYLOAD_BYTES && publicUrl) {
      res.statusCode = 307;
      res.setHeader('Location', publicUrl);
      res.setHeader('Cache-Control', 'public, max-age=300');
      return res.end();
    }

    // 3. Fallback: stream from the deployment's static CDN URL so attachment downloads & MIME headers work reliably
    if (publicUrl && req.headers['x-behongca-cdn-fetch'] !== '1') {
      const assetUrl = new URL(publicUrl, getRequestOrigin(req)).toString();
      const upstream = await fetch(assetUrl, {
        method: req.method === 'HEAD' ? 'HEAD' : 'GET',
        headers: { 'x-behongca-cdn-fetch': '1' },
      });

      if (!upstream.ok) {
        return sendJson(res, 404, {
          error: 'Berkas PDF tidak ditemukan di aset publik.',
          code: 'ASSET_NOT_FOUND',
          id: doc.id,
          publicUrl,
        });
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', disposition);
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.setHeader('X-Content-Type-Options', 'nosniff');

      if (req.method === 'HEAD') {
        return res.end();
      }

      const buf = Buffer.from(await upstream.arrayBuffer());
      res.setHeader('Content-Length', String(buf.length));
      return res.end(buf);
    }

    return sendJson(res, 404, {
      error: 'Berkas dokumen tidak tersedia.',
      code: 'ASSET_NOT_FOUND',
      id: doc.id,
      publicUrl,
    });
  } catch (err) {
    return sendJson(res, 500, {
      error: 'Gagal menyajikan berkas dokumen.',
      code: 'DOCUMENT_FILE_ERROR',
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
