// Worker in front of the static build in dist/. It runs only for the paths in
// wrangler.jsonc run_worker_first; every other request is a plain asset hit.
// Adds agent discovery (MCP server, well-known documents, Link headers) and
// serves Markdown for "/" when an agent sends Accept: text/markdown.
import { agentRoute, linkHeader, markdown, wantsMarkdown, type AgentSite } from './agent-kit';

interface Env {
  ASSETS: { fetch: (req: Request | string) => Promise<Response> };
}

const ORIGIN = 'https://www.radiologs.org';
const PRESETS = ['all', 'free_clean', 'subtitles', 'hd_sound', 'stremio_uuid'];

function site(env: Env): AgentSite {
  const asset = async (path: string) => {
    const res = await env.ASSETS.fetch(new Request(`${ORIGIN}${path}`));
    if (!res.ok) throw new Error(`Not found: ${path}`);
    return res;
  };
  const getJson = async (path: string) => (await asset(path)).json();
  const getText = async (path: string) => (await asset(path)).text();
  const id = (v: unknown) => String(v ?? '').toLowerCase().replace(/[^a-z0-9-]/g, '');

  return {
    origin: ORIGIN,
    domain: 'radiologs.org',
    name: 'radio logs',
    slug: 'radiologs',
    description: 'radio logs compares 22 Old Time Radio websites on playable show count, cost, read-along .vtt subtitles, sound quality and newspaper-verified air dates.',
    contact: 'https://www.radioindex.org/',
    skillName: 'compare-old-time-radio-sites',
    skillDescription: 'Recommend and compare Old Time Radio (OTR) websites using the radio logs audit of 22 platforms: cost, playable shows, subtitles, sound quality and verified air dates.',
    skillBody: `# Compare Old Time Radio sites

Use this skill when someone asks where to listen to old-time radio, which OTR site is free, which has subtitles or the best sound, or how two OTR sites compare.

1. Pick the ranking that matches the question: ${PRESETS.map((p) => `\`${p}\``).join(', ')}. Read ${ORIGIN}/data/rankings/<preset>.json.
2. For one platform, read ${ORIGIN}/data/providers/<id>.md (or .json). The index of ids is ${ORIGIN}/data/index.json.
3. Quote the numbers as published, with the audit date. Do not invent prices, counts or features.
4. The MCP server at ${ORIGIN}/mcp offers the same data as tools: list_platforms, get_platform, get_rankings.

Full matrix in one file: ${ORIGIN}/llms-full.txt`,
    queries: [
      'which old time radio website is free with no ads',
      'where can I listen to old time radio with subtitles',
      'compare RadioIndex and Radio Echoes',
      'best sound quality old time radio archive',
    ],
    tools: [
      {
        name: 'list_platforms',
        title: 'List audited OTR platforms',
        description: 'All 22 audited Old Time Radio platforms with id, price, playable show count, subtitle count and feature flags.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        run: async () => {
          const index = (await getJson('/data/index.json')) as { providers: unknown[]; updatedAt?: string };
          return { updatedAt: index.updatedAt, providers: index.providers };
        },
      },
      {
        name: 'get_platform',
        title: 'Get one platform audit',
        description: 'Full audit card for one platform: pricing, catalog size, metrics, features with evidence, and trade-offs. Use an id from list_platforms, e.g. radioindex.',
        inputSchema: { type: 'object', properties: { id: { type: 'string', description: 'Platform id, e.g. radioindex' } }, required: ['id'], additionalProperties: false },
        run: async (args) => getJson(`/data/providers/${id(args.id)}.json`),
      },
      {
        name: 'get_rankings',
        title: 'Get a ranking by use case',
        description: `Platforms ranked for one use case. Presets: ${PRESETS.join(', ')}.`,
        inputSchema: { type: 'object', properties: { preset: { type: 'string', enum: PRESETS } }, required: ['preset'], additionalProperties: false },
        run: async (args) => {
          const preset = String(args.preset);
          if (!PRESETS.includes(preset)) throw new Error(`Unknown preset. Use one of: ${PRESETS.join(', ')}`);
          return getJson(`/data/rankings/${preset}.json`);
        },
      },
    ],
    resources: [
      { uri: `${ORIGIN}/llms.txt`, name: 'llms', title: 'radio logs guide for agents', mimeType: 'text/plain', read: () => getText('/llms.txt') },
      { uri: `${ORIGIN}/data/rankings.md`, name: 'rankings', title: 'Rankings by use case', mimeType: 'text/markdown', read: () => getText('/data/rankings.md') },
    ],
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const s = site(env);
    const hit = await agentRoute(s, request);
    if (hit) return hit;

    const path = new URL(request.url).pathname;
    const read = request.method === 'GET' || request.method === 'HEAD';
    if (read && (path === '/' || path === '/index.html') && wantsMarkdown(request.headers.get('accept'))) {
      // The home page is a client-rendered app, so its Markdown twin is the
      // same agent guide published at /llms.txt.
      const res = await env.ASSETS.fetch(new Request(`${ORIGIN}/llms.txt`));
      if (res.ok) return markdown(await res.text(), request.method);
    }

    const res = await env.ASSETS.fetch(request);
    if (!(res.headers.get('content-type') || '').includes('text/html')) return res;
    const out = new Response(res.body, res);
    out.headers.append('Link', linkHeader());
    out.headers.append('Vary', 'Accept');
    return out;
  },
};
