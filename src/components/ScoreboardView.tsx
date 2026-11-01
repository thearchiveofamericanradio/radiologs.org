import React, { useState } from 'react';
import { FeatureDefinition, RankedSource } from '../types/radiologs';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MinusCircle,
} from 'lucide-react';

interface ScoreboardViewProps {
  rankedSources: RankedSource[];
  features: FeatureDefinition[];
}

function getSquircleTint(rankIndex: number, sourceId: string, disqualified: boolean): string {
  if (disqualified) return 'var(--glyph-tint-gray)';
  if (sourceId === 'radioindex') return 'var(--glyph-tint-orange)';
  if (rankIndex === 0) return 'var(--glyph-tint-orange)';
  if (rankIndex === 1) return 'var(--glyph-tint-blue)';
  if (rankIndex === 2) return 'var(--glyph-tint-green)';
  if (rankIndex <= 5) return 'var(--glyph-tint-purple)';
  return 'var(--glyph-tint-gray)';
}

export const ScoreboardView: React.FC<ScoreboardViewProps> = ({ rankedSources, features }) => {
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    radioindex: true,
  });
  const [showDisqualified, setShowDisqualified] = useState<boolean>(true);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const qualified = rankedSources.filter((r) => !r.disqualified);
  const disqualified = rankedSources.filter((r) => r.disqualified);

  return (
    <div data-component="section-scoreboard" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Section Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingBottom: '10px',
          borderBottom: '1px solid var(--hairline-color)',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 'var(--text-title-3)',
              lineHeight: '25px',
              fontWeight: 600,
              margin: 0,
              color: 'var(--text)',
            }}
          >
            Ranked Archival Platforms ({qualified.length} Qualifying)
          </h2>
          <div style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-2)', marginTop: '2px' }}>
            Sorted by weighted composite score (68% capability rubric + 22% objective telemetry + 10% cost efficiency)
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            aria-pressed={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            className={`ri-pill ${viewMode === 'list' ? 'ri-pill-selected' : ''}`}
            style={{ minHeight: '32px', padding: '6px 14px', fontSize: '13px' }}
          >
            Inset Rows
          </button>
          <button
            type="button"
            aria-pressed={viewMode === 'table'}
            onClick={() => setViewMode('table')}
            className={`ri-pill ${viewMode === 'table' ? 'ri-pill-selected' : ''}`}
            style={{ minHeight: '32px', padding: '6px 14px', fontSize: '13px' }}
          >
            Compact Table
          </button>
        </div>
      </div>

      {/* Empty State if all filtered */}
      {qualified.length === 0 && (
        <div className="ri-section-filled" style={{ textAlign: 'center', padding: '32px 20px' }}>
          <div style={{ fontSize: 'var(--text-headline)', fontWeight: 600, marginBottom: '6px' }}>
            No platforms pass all active requirement gates
          </div>
          <div style={{ fontSize: 'var(--text-body)', color: 'var(--text-2)' }}>
            Relax a strict gate in the left sidebar or inspect the {disqualified.length} filtered platforms below.
          </div>
        </div>
      )}

      {/* INSET LIST VIEW — Matches radioindex.org inset-list.tsx & lists.ts */}
      {viewMode === 'list' && qualified.length > 0 && (
        <div
          role="list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {qualified.map((item, idx) => {
            const { source, benchmark, compositeScore, featureScore, benchmarkScore } = item;
            const isExpanded = !!expandedIds[source.id];
            const isRadioIndex = source.id === 'radioindex';
            const squircleBg = getSquircleTint(idx, source.id, false);

            return (
              <div
                key={source.id}
                role="listitem"
                style={{
                  borderRadius: '14px',
                  border: isRadioIndex
                    ? '1.5px solid var(--glyph-tint-orange)'
                    : '1px solid var(--hairline-color)',
                  background: isRadioIndex ? 'var(--chrome-fill)' : 'transparent',
                  overflow: 'hidden',
                }}
              >
                {/* Main Row */}
                <div
                  data-component="inset-list-row"
                  onClick={() => toggleExpand(source.id)}
                  style={{ cursor: 'pointer', alignItems: 'flex-start' }}
                >
                  {/* 40x40 Tinted Squircle Rank Mark */}
                  <div className="ri-squircle" style={{ background: squircleBg, marginTop: '2px' }}>
                    #{idx + 1}
                  </div>

                  {/* Center Stack: Title + Interpunct Subline + Full Description */}
                  <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: 'var(--text-headline)',
                            lineHeight: '22px',
                            fontWeight: 600,
                            color: 'var(--text)',
                          }}
                        >
                          {source.name}
                        </span>
                        {isRadioIndex && (
                          <span
                            className="ri-fact-badge"
                            style={{
                              background: 'var(--glyph-tint-orange)',
                              color: '#ffffff',
                            }}
                          >
                            Benchmark Reference
                          </span>
                        )}
                        <a
                          href={source.url}
                          target="_blank"
                          rel={isRadioIndex ? 'noopener' : 'noopener noreferrer'}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontSize: 'var(--text-footnote)',
                            color: 'var(--system-blue)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            textDecoration: 'none',
                            fontWeight: 500,
                          }}
                        >
                          <span>{source.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Right-hand Composite Score & Price */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <span
                            style={{
                              fontSize: 'var(--text-footnote)',
                              fontWeight: 600,
                              color:
                                source.monthlyPriceUsd === 0 ? 'var(--system-green)' : 'var(--text)',
                            }}
                          >
                            {source.monthlyPriceUsd === 0
                              ? 'Free ($0)'
                              : `$${source.monthlyPriceUsd.toFixed(2)}/mo`}
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'baseline',
                            gap: '2px',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            background:
                              compositeScore >= 85
                                ? 'var(--glyph-tint-green)'
                                : compositeScore >= 60
                                  ? 'var(--glyph-tint-blue)'
                                  : 'var(--glyph-tint-gray)',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '14px',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          <span>{compositeScore}</span>
                          <span style={{ fontSize: '11px', opacity: 0.85, fontWeight: 500 }}>/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Interpunct · Facts Subline (matches radioindex.org lists.ts) */}
                    <div
                      style={{
                        fontSize: 'var(--text-subheadline)',
                        lineHeight: '20px',
                        color: 'var(--text-2)',
                        marginTop: '3px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>{source.category}</span>
                      <span>·</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {source.catalogBroadcasts.toLocaleString()} broadcasts
                      </span>
                      <span>·</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {source.catalogSeries.toLocaleString()} series
                      </span>
                      <span>·</span>
                      <span>Est. {source.established}</span>
                      <span>·</span>
                      <span className="ri-fact-badge">
                        {benchmark.verifiedAirDatePct}% Newspaper Proof
                      </span>
                      <span className="ri-fact-badge">
                        {benchmark.fullVttTranscriptPct}% Full .vtt
                      </span>
                      <span className="ri-fact-badge">
                        {benchmark.verifiedCastRolePct}% Cast Roles
                      </span>
                      {benchmark.medianBitrateKbps && (
                        <span className="ri-fact-badge">{benchmark.medianBitrateKbps} kbps</span>
                      )}
                    </div>

                    {/* Never-Clamped Description (DESIGN.md: descriptions are never clamped) */}
                    <p
                      style={{
                        fontSize: 'var(--text-body)',
                        lineHeight: 'var(--typeset-lh-prose)',
                        color: 'var(--text-row)',
                        margin: '8px 0 0 0',
                      }}
                    >
                      {source.verdict}
                    </p>

                    {/* Quick Action Bar */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        marginTop: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {source.badges.map((badge) => (
                          <span key={badge} className="ri-fact-badge">
                            {badge}
                          </span>
                        ))}
                      </div>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: 'var(--text-footnote)',
                          color: 'var(--text-2)',
                          fontWeight: 500,
                        }}
                      >
                        <span>
                          {isExpanded
                            ? 'Hide capability rubric & gotchas'
                            : `Inspect 8 rubric scores & ${source.gotchas.length} gotchas`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Dossier Drawer */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '16px 18px 18px 18px',
                      borderTop: '1px solid var(--hairline-color)',
                      background: 'var(--bg)',
                    }}
                  >
                    {/* Direct Series & Hub Backlinks Banner */}
                    {isRadioIndex ? (
                      <div
                        className="ri-section-filled"
                        style={{
                          marginBottom: '16px',
                          padding: '14px 16px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: 'var(--text-footnote)',
                            fontWeight: 600,
                            color: 'var(--text)',
                            marginBottom: '8px',
                          }}
                        >
                          Direct Canonical Series &amp; Archival Hubs on radioindex.org:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {[
                            { label: 'Browse All 118,400+ Shows', href: 'https://www.radioindex.org/' },
                            { label: 'Historical Calendar', href: 'https://www.radioindex.org/calendar' },
                            { label: 'Cast & Crew Index', href: 'https://www.radioindex.org/people' },
                            { label: 'Networks & Sponsors', href: 'https://www.radioindex.org/organizations' },
                            { label: 'Suspense (946)', href: 'https://www.radioindex.org/search?series=suspense' },
                            {
                              label: 'Johnny Dollar (724)',
                              href: 'https://www.radioindex.org/search?series=yours-truly-johnny-dollar',
                            },
                            {
                              label: 'CBS Mystery Theater (1,399)',
                              href: 'https://www.radioindex.org/search?series=cbs-radio-mystery-theater',
                            },
                            { label: 'Gunsmoke (480)', href: 'https://www.radioindex.org/search?series=gunsmoke' },
                            { label: 'Escape (241)', href: 'https://www.radioindex.org/search?series=escape' },
                            {
                              label: 'Dimension X (50)',
                              href: 'https://www.radioindex.org/search?series=dimension-x',
                            },
                          ].map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener"
                              className="ri-pill"
                              style={{ minHeight: '30px', padding: '4px 12px', fontSize: '13px' }}
                            >
                              <span>{link.label}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="ri-section-filled"
                        style={{
                          marginBottom: '16px',
                          padding: '12px 16px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                        }}
                      >
                        <div style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-row)' }}>
                          <strong>Archival Upgrade:</strong> Need newspaper-corroborated air dates, 100%
                          full-length <code>.vtt</code> transcripts, and verified character credits missing on{' '}
                          {source.shortName}? Stream the deduplicated master catalog free on{' '}
                          <a
                            href="https://www.radioindex.org/"
                            target="_blank"
                            rel="noopener"
                            style={{
                              color: 'var(--system-blue)',
                              fontWeight: 600,
                              textDecoration: 'underline',
                              textUnderlineOffset: '3px',
                            }}
                          >
                            RadioIndex (www.radioindex.org)
                          </a>
                          .
                        </div>
                        <a
                          href="https://www.radioindex.org/"
                          target="_blank"
                          rel="noopener"
                          className="ri-pill"
                          style={{
                            minHeight: '30px',
                            padding: '4px 12px',
                            fontSize: '12px',
                            background: 'var(--glyph-tint-orange)',
                            color: '#ffffff',
                          }}
                        >
                          <span>Stream Free on radioindex.org</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* 8 Capability Rubric Evidence Cards */}
                    <div
                      style={{
                        fontSize: 'var(--text-footnote)',
                        fontWeight: 600,
                        color: 'var(--text-2)',
                        marginBottom: '8px',
                      }}
                    >
                      Capability Matrix Breakdown (Feature Score: {featureScore}/100 · Telemetry Score:{' '}
                      {benchmarkScore}/100)
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '10px',
                        marginBottom: '16px',
                      }}
                    >
                      {features.map((feat) => {
                        const cap = source.capabilities[feat.id];
                        return (
                          <div
                            key={feat.id}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '10px',
                              background: 'var(--chrome-fill)',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '4px',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 'var(--text-footnote)',
                                  fontWeight: 600,
                                  color: 'var(--text)',
                                   display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                }}
                              >
                                {cap.level === 'full' && (
                                  <CheckCircle2
                                    className="w-3.5 h-3.5"
                                    style={{ color: 'var(--system-green)' }}
                                  />
                                )}
                                {cap.level === 'partial' && (
                                  <MinusCircle
                                    className="w-3.5 h-3.5"
                                    style={{ color: 'var(--system-orange)' }}
                                  />
                                )}
                                {cap.level === 'none' && (
                                  <XCircle className="w-3.5 h-3.5" style={{ color: 'var(--system-red)' }} />
                                )}
                                {feat.shortLabel}
                              </span>
                              <span
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  color: 'var(--text-2)',
                                }}
                              >
                                {cap.score}/100
                              </span>
                            </div>
                            <div
                              style={{
                                fontSize: 'var(--text-caption-1)',
                                lineHeight: '16px',
                                color: 'var(--text-row)',
                              }}
                            >
                              {cap.evidence}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Transparent Gotchas & Known Limitations */}
                    <div
                      style={{
                        fontSize: 'var(--text-footnote)',
                        fontWeight: 600,
                        color: 'var(--text-2)',
                        marginBottom: '8px',
                      }}
                    >
                      Documented Gotchas, Paywalls &amp; Archival Caveats
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {source.gotchas.map((g, gIdx) => (
                        <div
                          key={gIdx}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '10px',
                            borderLeft: `3px solid ${
                              g.severity === 'critical'
                                ? 'var(--system-red)'
                                : g.severity === 'warning'
                                  ? 'var(--system-orange)'
                                  : 'var(--system-blue)'
                            }`,
                            background: 'var(--chrome-fill)',
                          }}
                        >
                          <div
                            style={{
                              fontSize: 'var(--text-footnote)',
                              fontWeight: 600,
                              color: 'var(--text)',
                            }}
                          >
                            {g.title}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--text-caption-1)',
                              lineHeight: '17px',
                              color: 'var(--text-row)',
                              marginTop: '2px',
                            }}
                          >
                            {g.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* COMPACT TABLE VIEW */}
      {viewMode === 'table' && qualified.length > 0 && (
        <div
          style={{
            overflowX: 'auto',
            borderRadius: '14px',
            border: '1px solid var(--hairline-color)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 'var(--text-footnote)',
              textAlign: 'left',
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
                <th style={{ padding: '10px 12px' }}>#</th>
                <th style={{ padding: '10px 12px' }}>Platform</th>
                <th style={{ padding: '10px 12px' }}>Price</th>
                <th style={{ padding: '10px 12px' }}>Broadcasts</th>
                <th style={{ padding: '10px 12px' }}>Newspaper Proof</th>
                <th style={{ padding: '10px 12px' }}>Full .vtt</th>
                <th style={{ padding: '10px 12px' }}>Cast Roles</th>
                <th style={{ padding: '10px 12px' }}>Bitrate</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {qualified.map((item, idx) => (
                <tr
                  key={item.source.id}
                  style={{
                    borderBottom: '1px solid var(--hairline-color)',
                    background:
                      item.source.id === 'radioindex' ? 'var(--chrome-fill)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>#{idx + 1}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                    <a
                      href={item.source.url}
                      target="_blank"
                      rel="noopener"
                      style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                    >
                      {item.source.name}
                    </a>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {item.source.monthlyPriceUsd === 0
                      ? 'Free'
                      : `$${item.source.monthlyPriceUsd.toFixed(2)}/mo`}
                  </td>
                  <td style={{ padding: '10px 12px', fontVariantNumeric: 'tabular-nums' }}>
                    {item.source.catalogBroadcasts.toLocaleString()}
                  </td>
                  <td style={{ padding: '10px 12px', fontVariantNumeric: 'tabular-nums' }}>
                    {item.benchmark.verifiedAirDatePct}%
                  </td>
                  <td style={{ padding: '10px 12px', fontVariantNumeric: 'tabular-nums' }}>
                    {item.benchmark.fullVttTranscriptPct}%
                  </td>
                  <td style={{ padding: '10px 12px', fontVariantNumeric: 'tabular-nums' }}>
                    {item.benchmark.verifiedCastRolePct}%
                  </td>
                  <td style={{ padding: '10px 12px', fontVariantNumeric: 'tabular-nums' }}>
                    {item.benchmark.medianBitrateKbps
                      ? `${item.benchmark.medianBitrateKbps} kbps`
                      : 'No Audio'}
                  </td>
                  <td
                    style={{
                      padding: '10px 12px',
                      textAlign: 'right',
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {item.compositeScore}/100
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Disqualified / Filtered Out Platforms Drawer (Battleships pattern) */}
      {disqualified.length > 0 && (
        <div
          className="ri-section-filled"
          style={{ marginTop: '8px', border: '1px solid var(--hairline-color)' }}
        >
          <button
            type="button"
            onClick={() => setShowDisqualified(!showDisqualified)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'transparent',
              border: 'none',
              padding: 0,
              color: 'var(--text)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle className="w-4 h-4" style={{ color: 'var(--system-orange)' }} />
              <span style={{ fontSize: 'var(--text-headline)', fontWeight: 600 }}>
                Disqualified / Filtered Out Platforms ({disqualified.length})
              </span>
            </div>
            {showDisqualified ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showDisqualified && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid var(--hairline-color)',
              }}
            >
              {disqualified.map((item) => (
                <div
                  key={item.source.id}
                  data-component="inset-list-row"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--hairline-color)',
                    opacity: 0.85,
                  }}
                >
                  <div className="ri-squircle" style={{ background: 'var(--glyph-tint-gray)' }}>
                    DQ
                  </div>
                  <div style={{ flex: '1 1 auto' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: '8px',
                      }}
                    >
                      <span style={{ fontSize: 'var(--text-headline)', fontWeight: 600 }}>
                        {item.source.name}
                      </span>
                      <span style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-2)' }}>
                        Raw Score: {item.compositeScore}/100 ·{' '}
                        {item.source.monthlyPriceUsd === 0
                          ? 'Free'
                          : `$${item.source.monthlyPriceUsd}/mo`}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginTop: '6px',
                      }}
                    >
                      {item.disqualificationReasons.map((reason, rIdx) => (
                        <span
                          key={rIdx}
                          className="ri-fact-badge"
                          style={{ color: 'var(--system-red)' }}
                        >
                          ✕ {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
