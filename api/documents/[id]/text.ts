import type { ServerResponse } from 'http';
import {
  extractDocumentIdFromRequest,
  loadDocumentsReadOnly,
  sendJson,
  type VercelNodeRequest,
} from '../../../lib/documentArchive.js';

export default async function handler(req: VercelNodeRequest, res: ServerResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const docId = extractDocumentIdFromRequest(req, 'text');
    if (!docId) {
      return sendJson(res, 400, {
        error: 'ID dokumen tidak valid.',
        code: 'INVALID_DOCUMENT_ID',
      });
    }

    const { documents } = loadDocumentsReadOnly();
    const doc = documents.find((d) => d.id === docId);

    if (!doc) {
      return sendJson(res, 404, {
        error: 'Dokumen tidak ditemukan.',
        code: 'DOCUMENT_NOT_FOUND',
        id: docId,
      });
    }

    return sendJson(
      res,
      200,
      {
        id: doc.id,
        title: doc.title,
        text: doc.extractedText || '',
      },
      'public, max-age=60, s-maxage=300'
    );
  } catch (err) {
    return sendJson(res, 500, {
      error: 'Gagal memuat teks dokumen.',
      code: 'DOCUMENT_TEXT_ERROR',
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
