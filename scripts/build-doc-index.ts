import { syncConfiguredDocuments } from '../lib/documentArchive.js';

async function main() {
  const result = await syncConfiguredDocuments({
    writeBundle: true,
  });

  console.log(
    `[behongca:index] Indexed ${result.documents.length} document(s) ` +
      `(reused cache: ${result.reusedCacheCount}, newly extracted: ${result.extractedCount}, ` +
      `missing: ${result.missingAssets.length}).`
  );

  if (result.missingAssets.length > 0) {
    console.warn('[behongca:index] Missing configured assets:', result.missingAssets);
  }
}

main().catch((err) => {
  console.error('[behongca:index] Build-time indexing failed:', err);
  process.exit(1);
});
