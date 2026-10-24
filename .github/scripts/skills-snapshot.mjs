// Copy of the skills.sh list for Settings → Skills → Discover: the app searches skills.sh live,
// and this file when skills.sh does not answer. A GitHub Actions job of the public
// Sonaro-AI-releases repo runs it once a day (with the registry snapshot) and publishes the result.
//   node docs/releases-repo/skills-snapshot.mjs <out.json>
// Reads the skills.sh sitemaps (most installed first) and keeps [GitHub "owner/repo", skill id]
// pairs only (src/main/skills/discover.ts). A copy runs in the releases repo
// (.github/scripts/skills-snapshot.mjs); this copy in docs/releases-repo/ is its source.
import { writeFileSync } from 'node:fs';

const INDEX = 'https://www.skills.sh/sitemap.xml';
const TRIES = 4;
const PART = /^[A-Za-z0-9._-]{1,100}$/;

const out = process.argv[2];
if (!out) {
  console.error('usage: node skills-snapshot.mjs <out.json>');
  process.exit(1);
}

async function get(url) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(120_000), redirect: 'follow' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (error) {
      if (attempt >= TRIES) throw error;
      console.warn(`${url} failed (${error.message}), trying again`);
      await new Promise((r) => setTimeout(r, attempt * 10_000));
    }
  }
}

const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

const maps = locs(await get(INDEX)).filter((u) => /sitemap-skills-\d+\.xml$/.test(u));
if (maps.length === 0) throw new Error('no skills sitemap');

const skills = [];
const seen = new Set();
for (const map of maps) {
  for (const url of locs(await get(map))) {
    let parts;
    try {
      parts = new URL(url).pathname.split('/').filter(Boolean);
    } catch {
      continue;
    }
    // owner/repo/skill on GitHub; "site/…" pages are skills of other websites.
    if (parts.length !== 3 || parts[0] === 'site' || !parts.every((p) => PART.test(p))) continue;
    const id = parts.join('/').toLowerCase();
    if (seen.has(id)) continue;
    seen.add(id);
    skills.push([`${parts[0]}/${parts[1]}`, parts[2]]);
  }
}
if (skills.length < 100) throw new Error(`only ${skills.length} skills`);

// No date inside: an unchanged list gives the same file, so nothing is published.
writeFileSync(out, JSON.stringify({ skills }));
console.log(`${skills.length} skills from ${maps.length} sitemaps`);
