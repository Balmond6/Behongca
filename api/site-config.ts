import type { ServerResponse } from 'http';
import {
  getSiteConfigPayload,
  loadSettingsReadOnly,
  resolveWorkspaceRoot,
  sendJson,
  type VercelNodeRequest,
} from '../lib/documentArchive.js';

export default async function handler(req: VercelNodeRequest, res: ServerResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const rootDir = resolveWorkspaceRoot();
    const settings = loadSettingsReadOnly(rootDir);
    const payload = getSiteConfigPayload(settings, rootDir);
    return sendJson(res, 200, payload, 'public, max-age=60, s-maxage=300');
  } catch (err) {
    return sendJson(res, 500, {
      error: 'Gagal memuat konfigurasi situs.',
      code: 'SITE_CONFIG_ERROR',
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
