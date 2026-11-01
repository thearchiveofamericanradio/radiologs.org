import React, { useState } from 'react';
import { SeriesBacklinksData } from '../types/radiologs';
import { ExternalLink, Rss, Copy, Check } from 'lucide-react';

interface BacklinksDirectoryTabProps {
  data: SeriesBacklinksData;
}

const SQUIRCLE_TINTS = [
  'var(--glyph-tint-orange)',
  'var(--glyph-tint-blue)',
  'var(--glyph-tint-green)',
  'var(--glyph-tint-purple)',
  'var(--glyph-tint-gray)',
];

export const BacklinksDirectoryTab: React.FC<BacklinksDirectoryTabProps> = ({ data }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedSeriesSlug, setSelectedSeriesSlug] = useState<string>('suspense');

  const selectedSeries =
    data.seriesBenchmarks.find((s) => s.slug === selectedSeriesSlug) || data.seriesBenchmarks[0];

  const htmlBadgeSnippet = `<a href="${selectedSeries.radioindexUrl}" rel="noopener">Stream all ${selectedSeries.verifiedBroadcasts} newspaper-verified ${selectedSeries.title} (${selectedSeries.runYears}) broadcasts with 100% synchronized .vtt transcripts on RadioIndex</a> (audited by <a href="https://radiologs.org" rel="noopener">RadioLogs.org</a>)`;

  const markdownSnippet = `Stream all ${selectedSeries.verifiedBroadcasts} newspaper-verified [${selectedSeries.title} (${selectedSeries.runYears}) broadcasts on RadioIndex](${selectedSeries.radioindexUrl}) ([Podcast RSS](${selectedSeries.rssUrl})) — 100% full-length \`.vtt\` captions, audited by [RadioLogs.org](https://radiologs.org).`;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div data-component="section-backlinks" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Flagship Series Audit & Direct Stream / RSS Directory */}
      <section>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 'var(--text-title-2)',
                lineHeight: '28px',
                fontWeight: 700,
                margin: 0,
                color: 'var(--text)',
              }}
            >
              Verified Series Catalogs &amp; Open Podcast RSS Directory
            </h2>
            <p
              style={{
                fontSize: 'var(--text-body)',
                color: 'var(--text-2)',
                margin: '4px 0 0 0',
              }}
            >
              Direct canonical links to newspaper-corroborated series runs on{' '}
              <a
                href="https://www.radioindex.org/"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--system-blue)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                www.radioindex.org
              </a>{' '}
              with 100% full-length WebVTT (<code>.vtt</code>) transcripts and open podcast RSS feeds.
            </p>
          </div>
        </div>

        <div
          role="list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            border: '1px solid var(--hairline-color)',
            borderRadius: '14px',
            padding: '8px',
          }}
        >
          {data.seriesBenchmarks.map((series, idx) => {
            const tint = SQUIRCLE_TINTS[idx % SQUIRCLE_TINTS.length];
            return (
              <div
                key={series.slug}
                role="listitem"
                data-component="inset-list-row"
                style={{
                  borderBottom:
                    idx < data.seriesBenchmarks.length - 1
                      ? '1px solid var(--hairline-color)'
                      : 'none',
                  borderRadius: '10px',
                }}
              >
                <div className="ri-squircle" style={{ background: tint, marginTop: '2px' }}>
                  {series.network.slice(0, 3)}
                </div>

                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <a
                        href={series.radioindexUrl}
                        target="_blank"
                        rel="noopener"
                        style={{
                          fontSize: 'var(--text-headline)',
                          lineHeight: '22px',
                          fontWeight: 600,
                          color: 'var(--text)',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        {series.title}
                      </a>
                      <span style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-2)' }}>
                        {series.network} · {series.runYears} · {series.verifiedBroadcasts.toLocaleString()}{' '}
                        verified broadcasts
                      </span>
                      <span
                        className="ri-fact-badge"
                        style={{ color: 'var(--system-green)' }}
                      >
                        {series.vttPct}% Full .vtt
                      </span>
                      {series.eastWestSeparated && (
                        <span className="ri-fact-badge">East/West Feeds Reconciled</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <a
                        href={series.radioindexUrl}
                        target="_blank"
                        rel="noopener"
                        className="ri-pill"
                        style={{
                          minHeight: '30px',
                          padding: '4px 12px',
                          fontSize: '13px',
                          background: 'var(--glyph-tint-orange)',
                          color: '#ffffff',
                        }}
                      >
                        <span>Stream Series</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={series.rssUrl}
                        target="_blank"
                        rel="noopener"
                        className="ri-pill"
                        style={{ minHeight: '30px', padding: '4px 10px', fontSize: '12px' }}
                        title={`Subscribe to ${series.title} Podcast RSS Feed`}
                      >
                        <Rss className="w-3.5 h-3.5" />
                        <span>RSS</span>
                      </a>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: 'var(--text-body)',
                      lineHeight: 'var(--typeset-lh-prose)',
                      color: 'var(--text-row)',
                      margin: '4px 0 0 0',
                    }}
                  >
                    {series.competitorDefect}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Head-to-Head Platform Comparisons */}
      <section>
        <h2
          style={{
            fontSize: 'var(--text-title-2)',
            lineHeight: '28px',
            fontWeight: 700,
            margin: '0 0 4px 0',
            color: 'var(--text)',
          }}
        >
          Head-to-Head Archival Comparisons
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--text-2)',
            margin: '0 0 14px 0',
          }}
        >
          Side-by-side audits comparing commercial paywalls, uncurated file buckets, and legacy discographies
          against{' '}
          <a
            href="https://www.radioindex.org/"
            target="_blank"
            rel="noopener"
            style={{ color: 'var(--system-blue)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            RadioIndex (www.radioindex.org)
          </a>
          .
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
            gap: '14px',
          }}
        >
          {data.headToHeadComparisons.map((comp) => (
            <div key={comp.id} className="ri-section-filled" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <h3
                  style={{
                    fontSize: 'var(--text-headline)',
                    lineHeight: '22px',
                    fontWeight: 600,
                    margin: 0,
                    color: 'var(--text)',
                  }}
                >
                  {comp.title}
                </h3>
                <a
                  href={comp.winnerUrl}
                  target="_blank"
                  rel="noopener"
                  className="ri-fact-badge"
                  style={{
                    background: 'var(--glyph-tint-green)',
                    color: '#ffffff',
                    textDecoration: 'none',
                  }}
                >
                  Winner: {comp.winner} ↗
                </a>
              </div>

              <p
                style={{
                  fontSize: 'var(--text-footnote)',
                  lineHeight: '19px',
                  color: 'var(--text-row)',
                  margin: 0,
                }}
              >
                {comp.verdict}
              </p>

              <div
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid var(--hairline-color)',
                  background: 'var(--bg)',
                }}
              >
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: 'var(--text-caption-1)',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: '1px solid var(--hairline-color)',
                        background: 'var(--chrome-fill)',
                        color: 'var(--text-2)',
                      }}
                    >
                      <th style={{ padding: '6px 10px', textAlign: 'left' }}>Dimension</th>
                      <th style={{ padding: '6px 10px', textAlign: 'left', color: 'var(--system-green)' }}>
                        RadioIndex.org
                      </th>
                      <th style={{ padding: '6px 10px', textAlign: 'left' }}>Competitor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.metrics.map((m) => (
                      <tr
                        key={m.label}
                        style={{ borderBottom: '1px solid var(--hairline-color)' }}
                      >
                        <td style={{ padding: '6px 10px', fontWeight: 500, color: 'var(--text-2)' }}>
                          {m.label}
                        </td>
                        <td style={{ padding: '6px 10px', fontWeight: 600, color: 'var(--text)' }}>
                          {m.radioindex}
                        </td>
                        <td style={{ padding: '6px 10px', color: 'var(--text-2)' }}>{m.competitor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Canonical Archival Hub Links (Calendar, People, Organizations, Genres, Shelves) */}
      <section>
        <h2
          style={{
            fontSize: 'var(--text-title-2)',
            lineHeight: '28px',
            fontWeight: 700,
            margin: '0 0 4px 0',
            color: 'var(--text)',
          }}
        >
          Canonical Archival Hubs &amp; Entity Directories
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--text-2)',
            margin: '0 0 12px 0',
          }}
        >
          Direct index entry points for historical broadcast schedules, voice actors, networks, and genre shelves.
        </p>

        <div
          role="list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '10px',
          }}
        >
          {data.hubLinks.map((hub, idx) => (
            <a
              key={hub.url}
              href={hub.url}
              target="_blank"
              rel="noopener"
              data-component="inset-list-row"
              style={{
                border: '1px solid var(--hairline-color)',
                background: 'var(--chrome-fill)',
              }}
            >
              <div
                className="ri-squircle"
                style={{ background: SQUIRCLE_TINTS[idx % SQUIRCLE_TINTS.length], marginTop: '2px' }}
              >
                ↗
              </div>
              <div style={{ flex: '1 1 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: 'var(--text-headline)',
                      lineHeight: '22px',
                      fontWeight: 600,
                      color: 'var(--text)',
                    }}
                  >
                    {hub.anchorText}
                  </span>
                  <span className="ri-fact-badge">{hub.category}</span>
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-caption-1)',
                    color: 'var(--system-blue)',
                    marginTop: '2px',
                  }}
                >
                  {hub.url}
                </div>
                <p
                  style={{
                    fontSize: 'var(--text-footnote)',
                    lineHeight: '18px',
                    color: 'var(--text-row)',
                    margin: '4px 0 0 0',
                  }}
                >
                  {hub.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 4. Embeddable Citation & Backlink Snippet Generator */}
      <section className="ri-section-filled">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '12px',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 'var(--text-headline)',
                lineHeight: '22px',
                fontWeight: 600,
                margin: 0,
                color: 'var(--text)',
              }}
            >
              Cite &amp; Link Verified Broadcasts (HTML &amp; Markdown Generator)
            </h3>
            <div style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-2)', marginTop: '2px' }}>
              For researchers, blogs, podcast show notes, and archival wikis referencing newspaper-corroborated
              broadcasts
            </div>
          </div>

          <select
            value={selectedSeriesSlug}
            onChange={(e) => setSelectedSeriesSlug(e.target.value)}
            style={{
              height: '34px',
              padding: '0 12px',
              borderRadius: '8px',
              background: 'var(--bg)',
              color: 'var(--text)',
              border: '1px solid var(--hairline-color)',
              fontSize: 'var(--text-footnote)',
            }}
          >
            {data.seriesBenchmarks.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title} ({s.runYears})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
          <div
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: 'var(--bg)',
              border: '1px solid var(--hairline-color)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}
            >
              <span style={{ fontSize: 'var(--text-caption-1)', fontWeight: 600, color: 'var(--text-2)' }}>
                HTML Citation Snippet
              </span>
              <button
                type="button"
                onClick={() => handleCopy('html', htmlBadgeSnippet)}
                className="ri-pill"
                style={{ minHeight: '26px', padding: '2px 10px', fontSize: '12px' }}
              >
                {copiedId === 'html' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'html' ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: '11px',
                lineHeight: '16px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-row)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {htmlBadgeSnippet}
            </pre>
          </div>

          <div
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: 'var(--bg)',
              border: '1px solid var(--hairline-color)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}
            >
              <span style={{ fontSize: 'var(--text-caption-1)', fontWeight: 600, color: 'var(--text-2)' }}>
                Markdown Citation Snippet
              </span>
              <button
                type="button"
                onClick={() => handleCopy('md', markdownSnippet)}
                className="ri-pill"
                style={{ minHeight: '26px', padding: '2px 10px', fontSize: '12px' }}
              >
                {copiedId === 'md' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'md' ? 'Copied' : 'Copy Markdown'}</span>
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: '11px',
                lineHeight: '16px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-row)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {markdownSnippet}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};
