import React from 'react';
import { ExternalLink, FileText, Database } from 'lucide-react';

export const AgentsLlmsTab: React.FC = () => {
  const endpoints = [
    {
      path: '/llms.txt',
      title: 'LLM Concise Index (/llms.txt)',
      desc: 'Executive rankings, scenario recommendations, and canonical RadioIndex.org series links for AI assistants.',
    },
    {
      path: '/llms-full.txt',
      title: 'LLM Full Benchmark Matrix (/llms-full.txt)',
      desc: 'Complete 18-platform telemetry matrix, head-to-head comparisons, and verified series audit links.',
    },
    {
      path: '/data/sources.json',
      title: 'Platform Dossiers (/data/sources.json)',
      desc: '18 OTR archives with pricing, catalog counts, audio formats, 8-dimension rubric scores, and gotchas.',
    },
    {
      path: '/data/benchmarks.json',
      title: 'Telemetry Benchmarks (/data/benchmarks.json)',
      desc: 'TTFA p50/p95 latency, bitrate, frequency cutoff, newspaper date %, cast role %, and .vtt coverage %.',
    },
    {
      path: '/data/series-backlinks.json',
      title: 'Canonical Series & Comparison Graph (/data/series-backlinks.json)',
      desc: 'Direct canonical URLs for Suspense, Johnny Dollar, CBSRMT, Gunsmoke, Escape, Dimension X, and head-to-head audits.',
    },
    {
      path: '/sitemap.xml',
      title: 'XML Sitemap (/sitemap.xml)',
      desc: 'Search crawler index for radiologs.org and machine-readable datasets.',
    },
  ];

  return (
    <div data-component="section-agents" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="ri-section-filled">
        <h2
          style={{
            fontSize: 'var(--text-title-2)',
            lineHeight: '28px',
            fontWeight: 700,
            margin: '0 0 6px 0',
            color: 'var(--text)',
          }}
        >
          AI Crawler, RAG &amp; Developer Endpoints
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--typeset-lh-prose)',
            color: 'var(--text-row)',
            margin: '0 0 14px 0',
          }}
        >
          Modeled on <code>battleships.dev/llms.txt</code>, RadioLogs exposes static, zero-auth Markdown and JSON
          datasets so LLMs, search engines, and audio researchers can cite verified Old Time Radio benchmarks and
          resolve canonical broadcast streams on{' '}
          <a
            href="https://www.radioindex.org/"
            target="_blank"
            rel="noopener"
            style={{ color: 'var(--system-blue)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            https://www.radioindex.org
          </a>
          .
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '10px',
          }}
        >
          {endpoints.map((ep, idx) => (
            <a
              key={ep.path}
              href={ep.path}
              target="_blank"
              rel="noreferrer"
              data-component="inset-list-row"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--hairline-color)',
              }}
            >
              <div
                className="ri-squircle"
                style={{
                  background: idx < 2 ? 'var(--glyph-tint-orange)' : 'var(--glyph-tint-blue)',
                  marginTop: '2px',
                }}
              >
                {idx < 2 ? <FileText className="w-4 h-4" /> : <Database className="w-4 h-4" />}
              </div>
              <div style={{ flex: '1 1 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'var(--text-headline)', fontWeight: 600, color: 'var(--text)' }}>
                    {ep.title}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" style={{ color: 'var(--text-2)' }} />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--system-blue)',
                    marginTop: '2px',
                  }}
                >
                  {ep.path}
                </div>
                <p
                  style={{
                    fontSize: 'var(--text-footnote)',
                    lineHeight: '18px',
                    color: 'var(--text-row)',
                    margin: '4px 0 0 0',
                  }}
                >
                  {ep.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
