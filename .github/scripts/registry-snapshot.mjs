// Snapshot of the official MCP Registry for Settings → Connectors: the registry search is slow
// (often 10–60 s), so a GitHub Actions job of the public Sonaro-AI-releases repo runs this once a
// day and publishes the result; the app searches the file on the device.
//   node docs/releases-repo/registry-snapshot.mjs <out.json>
// Keeps only the active latest versions the app can connect to, and only the fields it reads
// (src/main/mcp/registry.ts). A copy of this file runs in the releases repo
// (.github/scripts/registry-snapshot.mjs); this copy in docs/releases-repo/ is its source.
import { writeFileSync } from 'node:fs';

const REGISTRY = 'https://registry.modelcontextprotocol.io/v0/servers';
const PAGE = 100;
const TRIES = 4;

const out = process.argv[2];
if (!out) {
  console.error('usage: node registry-snapshot.mjs <out.json>');
  process.exit(1);
}

async function page(cursor) {
  const params = new URLSearchParams({ limit: String(PAGE), version: 'latest' });
  if (cursor) params.set('cursor', cursor);
  for (let attempt = 1; ; attempt += 1) {
    try {
      const res = await fetch(`${REGISTRY}?${params}`, {
        headers: { accept: 'application/json' },
        signal: AbortSignal.timeout(120_000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (error) {
      if (attempt >= TRIES) throw error;
      console.warn(`page failed (${error.message}), trying again`);
      await new Promise((r) => setTimeout(r, attempt * 10_000));
    }
  }
}

const str = (v, max) => (typeof v === 'string' && v.length <= max ? v : undefined);
const https = (v) => typeof v === 'string' && /^https:\/\/[^\s{}]+$/.test(v);

/** The fields the app reads; undefined drops a key from the JSON. */
function slim(s) {
  const remotes = (s.remotes ?? [])
    .filter((r) => (r.type === 'streamable-http' || r.type === 'sse') && https(r.url))
    .map((r) => ({
      type: r.type,
      url: r.url,
      headers: r.headers?.length
        ? r.headers.map((h) => ({
            name: h.name,
            value: str(h.value, 500),
            description: str(h.description, 1000),
            isRequired: h.isRequired || undefined,
          }))
        : undefined,
    }));
  const packages = (s.packages ?? [])
    .filter(
      (p) =>
        ['npm', 'pypi', 'oci'].includes(p.registryType) &&
        (!p.transport || p.transport.type === 'stdio'),
    )
    .map((p) => ({
      registryType: p.registryType,
      identifier: p.identifier,
      version: str(p.version, 100),
      transport: p.transport ? { type: p.transport.type } : undefined,
      environmentVariables: p.environmentVariables?.length
        ? p.environmentVariables.map((e) => ({
            name: e.name,
            description: str(e.description, 1000),
            isRequired: e.isRequired || undefined,
            isSecret: e.isSecret || undefined,
          }))
        : undefined,
    }));
  if (remotes.length === 0 && packages.length === 0) return null;
  const icon = s.icons?.map((i) => i.src).find(https);
  return {
    name: s.name,
    title: str(s.title, 200),
    description: str(s.description, 2000),
    version: str(s.version, 100),
    repository: https(s.repository?.url) ? { url: s.repository.url } : undefined,
    icons: icon ? [{ src: icon }] : undefined,
    remotes: remotes.length ? remotes : undefined,
    packages: packages.length ? packages : undefined,
  };
}

const servers = [];
const seen = new Set();
let cursor;
let pages = 0;
do {
  const body = await page(cursor);
  pages += 1;
  for (const item of body.servers ?? []) {
    const meta = item._meta?.['io.modelcontextprotocol.registry/official'];
    if (meta && meta.status && meta.status !== 'active') continue;
    if (!item.server?.name || seen.has(item.server.name)) continue;
    const s = slim(item.server);
    if (!s) continue;
    seen.add(s.name);
    servers.push(s);
  }
  cursor = body.metadata?.nextCursor;
} while (cursor);

servers.sort((a, b) => a.name.localeCompare(b.name));
// No date inside: an unchanged registry gives the same file, so nothing is published.
writeFileSync(out, JSON.stringify({ servers }));
console.log(`${servers.length} servers from ${pages} pages`);
