import type { ServerResponse } from 'http';
import {
  filterAndSearchDocuments,
  getQueryParam,
  loadDocumentsReadOnly,
  sanitizeDocResponse,
  sendJson,
  type VercelNodeRequest,
} from '../lib/documentArchive.js';

export default async function handler(req: VercelNodeRequest, res: ServerResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const { documents } = loadDocumentsReadOnly();
    const q = getQueryParam(req, 'q').trim();
    const category = getQueryParam(req, 'category').trim() || 'all';

    const matched = filterAndSearchDocuments(documents, { q, category });
    const sanitized = matched.map((doc) => sanitizeDocResponse(doc, q || undefined));

    return sendJson(
      res,
      200,
      { documents: sanitized },
      'public, max-age=60, s-maxage=300'
    );
  } catch (err) {
    return sendJson(res, 500, {
      error: 'Gagal memuat daftar dokumen dari server.',
      code: 'DOCUMENTS_INDEX_ERROR',
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
