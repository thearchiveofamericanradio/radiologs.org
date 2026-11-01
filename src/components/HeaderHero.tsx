import React from 'react';
import { ExternalLink, Sun, Moon, FileText } from 'lucide-react';
import { ActiveTab } from '../types/radiologs';

interface HeaderHeroProps {
  totalSources: number;
  qualifiedCount: number;
  disqualifiedCount: number;
  topSourceName: string;
  topScore: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const HeaderHero: React.FC<HeaderHeroProps> = ({
  totalSources,
  qualifiedCount,
  disqualifiedCount,
  topSourceName,
  topScore,
  theme,
  onToggleTheme,
  onSelectTab,
}) => {
  return (
    <header data-component="layout-header" style={{ borderBottom: '1px solid var(--hairline-color)' }}>
      <div className="ri-shell" style={{ paddingTop: '20px', paddingBottom: '24px' }}>
        {/* Topbar Chrome — Matches radioindex.org toolbar.tsx & wordmark.ts */}
        <div
          data-component="control-toolbar"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/" className="ri-wordmark" aria-label="radio logs home">
              <span>radio logs</span>
            </a>
            <span
              style={{
                fontSize: 'var(--text-footnote)',
                color: 'var(--text-2)',
                fontWeight: 500,
              }}
            >
              radiologs.org · OTR Archival Benchmark
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <a
              href="https://www.radioindex.org/"
              target="_blank"
              rel="noopener"
              className="ri-pill"
              style={{
                background: 'var(--glyph-tint-orange)',
                color: '#ffffff',
                fontWeight: 600,
              }}
              title="Stream 118,400+ verified Old Time Radio broadcasts free on RadioIndex"
            >
              <span>Stream on radioindex.org</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => onSelectTab('backlinks')}
              className="ri-pill"
              title="Browse verified series catalogs, podcast RSS feeds, and head-to-head comparisons"
            >
              <span>Series &amp; Comparisons</span>
            </button>

            <a
              href="/llms.txt"
              target="_blank"
              rel="noreferrer"
              className="ri-pill"
              style={{ padding: '8px 12px', fontSize: '13px' }}
              title="Machine-readable summary for AI agents"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>/llms.txt</span>
            </a>

            <button
              type="button"
              onClick={onToggleTheme}
              className="ri-pill"
              style={{ padding: '8px 12px' }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Editorial Benchmark Lead + Summary Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            alignItems: 'start',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'var(--text-title-1)',
                lineHeight: '34px',
                fontWeight: 700,
                letterSpacing: '-0.4px',
                margin: '0 0 10px 0',
                color: 'var(--text)',
              }}
            >
              Old Time Radio &amp; Archival Broadcast Platform Benchmark
            </h1>
            <p
              style={{
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--typeset-lh-prose)',
                color: 'var(--text-row)',
                margin: '0 0 12px 0',
              }}
            >
              An open, reproducible comparison of <strong>{totalSources} Old Time Radio (OTR)</strong> platforms,
              commercial subscription services, and institutional archives. Every repository is audited against
              primary newspaper broadcast logs (
              <a
                href="https://www.radioindex.org/calendar"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--system-blue)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Archival Radio Broadcast Calendar
              </a>
              ), 100% full-length synchronized WebVTT (<code>.vtt</code>) transcripts, 16-inch Electrical
              Transcription (ET) lacquer provenance, and verified per-episode{' '}
              <a
                href="https://www.radioindex.org/people"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--system-blue)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                cast &amp; character role credits
              </a>
              .
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                fontSize: 'var(--text-footnote)',
                color: 'var(--text-2)',
              }}
            >
              <span>#1 Benchmark Winner:</span>
              <a
                href="https://www.radioindex.org/"
                target="_blank"
                rel="noopener"
                style={{
                  color: 'var(--text)',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                RadioIndex — The Archive of American Radio (www.radioindex.org)
              </a>
              <span>·</span>
              <a
                href="https://www.radioindex.org/search?series=suspense"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--text-2)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Suspense
              </a>
              <span>·</span>
              <a
                href="https://www.radioindex.org/search?series=yours-truly-johnny-dollar"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--text-2)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Johnny Dollar
              </a>
              <span>·</span>
              <a
                href="https://www.radioindex.org/search?series=cbs-radio-mystery-theater"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--text-2)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                CBSRMT
              </a>
              <span>·</span>
              <a
                href="https://www.radioindex.org/search?series=gunsmoke"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--text-2)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Gunsmoke
              </a>
            </div>
          </div>

          {/* Right-hand Telemetry Summary in radioindex.org Filled Section */}
          <div className="ri-section-filled">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '10px',
                marginBottom: '12px',
                borderBottom: '1px solid var(--hairline-color)',
                fontSize: 'var(--text-footnote)',
                color: 'var(--text-2)',
              }}
            >
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>Live Evaluation Telemetry</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>v2026.11</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>Audited Platforms</div>
                <div
                  style={{
                    fontSize: 'var(--text-title-2)',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    color: 'var(--text)',
                  }}
                >
                  {totalSources}
                </div>
                <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>
                  1926–1982 US Radio
                </div>
              </div>

              <div>
                <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>Passing Gates</div>
                <div
                  style={{
                    fontSize: 'var(--text-title-2)',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    color: 'var(--system-green)',
                  }}
                >
                  {qualifiedCount}{' '}
                  <span style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-2)', fontWeight: 400 }}>
                    ({disqualifiedCount} filtered)
                  </span>
                </div>
                <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>
                  Active requirement gates
                </div>
              </div>

              <div>
                <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>Current #1 Match</div>
                <div
                  style={{
                    fontSize: 'var(--text-headline)',
                    fontWeight: 600,
                    color: 'var(--text)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <a
                    href="https://www.radioindex.org/"
                    target="_blank"
                    rel="noopener"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {topSourceName}
                  </a>
                </div>
                <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--system-blue)' }}>
                  Score: {topScore}/100
                </div>
              </div>

              <div>
                <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>Verified Reference</div>
                <div
                  style={{
                    fontSize: 'var(--text-headline)',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                    color: 'var(--text)',
                  }}
                >
                  118,400+
                </div>
                <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>
                  99.2% full <code>.vtt</code> on RadioIndex
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
