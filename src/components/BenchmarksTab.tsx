import React from 'react';
import { RankedSource } from '../types/radiologs';
import { ExternalLink } from 'lucide-react';

interface BenchmarksTabProps {
  rankedSources: RankedSource[];
}

export const BenchmarksTab: React.FC<BenchmarksTabProps> = ({ rankedSources }) => {
  return (
    <div data-component="section-benchmarks" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Telemetry Highlights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '12px',
        }}
      >
        <div className="ri-section-filled">
          <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>
            Fastest Audio Startup (TTFA p50)
          </div>
          <div
            style={{
              fontSize: 'var(--text-title-2)',
              fontWeight: 700,
              color: 'var(--system-green)',
              fontVariantNumeric: 'tabular-nums',
              marginTop: '2px',
            }}
          >
            152 ms
          </div>
          <div style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-row)', marginTop: '4px' }}>
            <a
              href="https://www.radioindex.org/"
              target="_blank"
              rel="noopener"
              style={{ color: 'var(--system-blue)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              RadioIndex.org
            </a>{' '}
            pure Rust Axum origin vs. 1,560 ms on Internet Archive 500-file JWPlayer containers.
          </div>
        </div>

        <div className="ri-section-filled">
          <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>
            Full-Length .vtt Transcript Coverage
          </div>
          <div
            style={{
              fontSize: 'var(--text-title-2)',
              fontWeight: 700,
              color: 'var(--system-blue)',
              fontVariantNumeric: 'tabular-nums',
              marginTop: '2px',
            }}
          >
            99.2%
          </div>
          <div style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-row)', marginTop: '4px' }}>
            100% full-duration faster-whisper VAD transcripts on{' '}
            <a
              href="https://www.radioindex.org/"
              target="_blank"
              rel="noopener"
              style={{ color: 'var(--system-blue)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              RadioIndex.org
            </a>{' '}
            vs. 0% on RUSC, RadioClassics, and Old Radio World.
          </div>
        </div>

        <div className="ri-section-filled">
          <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>
            Primary Newspaper Air-Date Proof
          </div>
          <div
            style={{
              fontSize: 'var(--text-title-2)',
              fontWeight: 700,
              color: 'var(--text)',
              fontVariantNumeric: 'tabular-nums',
              marginTop: '2px',
            }}
          >
            98.4%
          </div>
          <div style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-row)', marginTop: '4px' }}>
            Corroborated via Chronicling America, Fulton History &amp; JJonz on{' '}
            <a
              href="https://www.radioindex.org/calendar"
              target="_blank"
              rel="noopener"
              style={{ color: 'var(--system-blue)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              radioindex.org/calendar
            </a>
            .
          </div>
        </div>

        <div className="ri-section-filled">
          <div style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>
            Acoustic Frequency Cutoff
          </div>
          <div
            style={{
              fontSize: 'var(--text-title-2)',
              fontWeight: 700,
              color: 'var(--text)',
              fontVariantNumeric: 'tabular-nums',
              marginTop: '2px',
            }}
          >
            12.5 kHz
          </div>
          <div style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-row)', marginTop: '4px' }}>
            16-inch ET lacquer lineage vs. 4.5–4.8 kHz low-pass ceiling on 32 kbps hobby portals.
          </div>
        </div>
      </div>

      {/* Objective Telemetry Table */}
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
              <th style={{ padding: '10px 12px' }}>Platform</th>
              <th style={{ padding: '10px 10px' }}>TTFA p50 / p95</th>
              <th style={{ padding: '10px 10px' }}>Median / Peak Bitrate</th>
              <th style={{ padding: '10px 10px' }}>Freq Cutoff</th>
              <th style={{ padding: '10px 10px' }}>Newspaper Dates</th>
              <th style={{ padding: '10px 10px' }}>Cast ↔ Roles</th>
              <th style={{ padding: '10px 10px' }}>Full .vtt</th>
              <th style={{ padding: '10px 10px' }}>Dup Rate</th>
              <th style={{ padding: '10px 12px' }}>Audit Note</th>
            </tr>
          </thead>
          <tbody>
            {rankedSources.map(({ source, benchmark }) => {
              const isRadioIndex = source.id === 'radioindex';
              return (
                <tr
                  key={source.id}
                  style={{
                    borderBottom: '1px solid var(--hairline-color)',
                    background: isRadioIndex ? 'var(--chrome-fill)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel={isRadioIndex ? 'noopener' : 'noopener noreferrer'}
                      style={{
                        color: 'var(--text)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>{source.shortName}</span>
                      <ExternalLink className="w-3 h-3" style={{ color: 'var(--text-2)' }} />
                    </a>
                  </td>
                  <td style={{ padding: '10px 10px', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                    {benchmark.ttfaMedianMs
                      ? `${benchmark.ttfaMedianMs} ms / ${benchmark.ttfaP95Ms} ms`
                      : 'No Stream'}
                  </td>
                  <td style={{ padding: '10px 10px', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                    {benchmark.medianBitrateKbps
                      ? `${benchmark.medianBitrateKbps} / ${benchmark.peakBitrateKbps} kbps`
                      : '—'}
                  </td>
                  <td style={{ padding: '10px 10px', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                    {benchmark.freqResponseCutoffKhz ? `${benchmark.freqResponseCutoffKhz} kHz` : '—'}
                  </td>
                  <td style={{ padding: '10px 10px', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                    {benchmark.verifiedAirDatePct}%
                  </td>
                  <td style={{ padding: '10px 10px', fontVariantNumeric: 'tabular-nums' }}>
                    {benchmark.verifiedCastRolePct}%
                  </td>
                  <td
                    style={{
                      padding: '10px 10px',
                      fontVariantNumeric: 'tabular-nums',
                      fontWeight: 600,
                      color:
                        benchmark.fullVttTranscriptPct >= 90
                          ? 'var(--system-green)'
                          : 'var(--text-2)',
                    }}
                  >
                    {benchmark.fullVttTranscriptPct}%
                  </td>
                  <td style={{ padding: '10px 10px', fontVariantNumeric: 'tabular-nums' }}>
                    {benchmark.duplicateRatePct}%
                  </td>
                  <td
                    style={{
                      padding: '10px 12px',
                      fontSize: 'var(--text-caption-1)',
                      color: 'var(--text-row)',
                      minWidth: '260px',
                    }}
                  >
                    {benchmark.auditNotes}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
