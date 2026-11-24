import fs from 'fs';
import type { ServerResponse } from 'http';
import {
  loadDocumentsReadOnly,
  resolveSafePublicAssetFile,
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
    const { settings, documents, generatedAt, missingAssets } =
      loadDocumentsReadOnly(rootDir);

    const verifiedLocalAssets = documents.filter((doc) => {
      const candidate = resolveSafePublicAssetFile(
        doc.storedPath,
        settings.paths.documentDir,
        rootDir,
        settings.paths.labDocsDir
      );
      return Boolean(candidate && fs.existsSync(candidate));
    }).length;

    return sendJson(res, 200, {
      ok: true,
      runtime: process.env.VERCEL ? 'vercel-serverless' : 'node-serverless',
      documentsCount: documents.length,
      verifiedLocalAssets,
      missingAssetsCount: missingAssets.length,
      indexGeneratedAt: generatedAt || null,
    });
  } catch (err) {
    return sendJson(res, 500, {
      ok: false,
      error: 'Health check failed',
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
