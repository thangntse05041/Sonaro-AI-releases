// Copies of public Supabase data the apps read often, so they come from GitHub instead of
// Supabase (bandwidth): ranking.json (RPC model_ranking, the AI ranking page) and versions.json
// (table app_versions with its app_versions_stamp(), "What's new"). The app reads them first and
// falls back to Supabase (src/main/staticData.ts).
//   SUPABASE_URL=… SUPABASE_PUBLISHABLE_KEY=… node docs/releases-repo/data-snapshot.mjs <out dir>
// Only the publishable key is used: these are the rows any guest can read. A copy runs in the
// releases repo (.github/scripts/data-snapshot.mjs); this copy in docs/releases-repo/ is its source.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const out = process.argv[2];
const url = (process.env.SUPABASE_URL ?? '').replace(/\/+$/, '');
const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? '';
if (!out || !/^https:\/\//.test(url) || !key) {
  console.error('usage: SUPABASE_URL=… SUPABASE_PUBLISHABLE_KEY=… node data-snapshot.mjs <dir>');
  process.exit(1);
}

async function rest(path, init = {}) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key, 'content-type': 'application/json' },
    signal: AbortSignal.timeout(60_000),
  });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json();
}

const rpc = (name) => rest(`rpc/${name}`, { method: 'POST', body: '{}' });

let failed = false;

try {
  const ranking = await rpc('model_ranking');
  if (!ranking || !Array.isArray(ranking.models) || ranking.models.length === 0) {
    throw new Error('empty ranking');
  }
  writeFileSync(join(out, 'ranking.json'), JSON.stringify(ranking));
  console.log(`ranking.json: ${ranking.models.length} models`);
} catch (error) {
  failed = true;
  console.error(`ranking.json: ${error.message}`);
}

try {
  // The stamp before and after the list: an admin edit in between gives another try.
  let saved = null;
  for (let attempt = 0; attempt < 3 && !saved; attempt += 1) {
    const before = await rpc('app_versions_stamp');
    const versions = await rest('app_versions?select=version,released_on,notes&order=version');
    const after = await rpc('app_versions_stamp');
    if (typeof before === 'string' && before === after && Array.isArray(versions)) {
      saved = { stamp: before, versions };
    }
  }
  if (!saved) throw new Error('the notes kept changing');
  writeFileSync(join(out, 'versions.json'), JSON.stringify(saved));
  console.log(`versions.json: ${saved.versions.length} versions`);
} catch (error) {
  failed = true;
  console.error(`versions.json: ${error.message}`);
}

// The workflow keeps the previous copy of a file that failed.
process.exit(failed ? 1 : 0);
