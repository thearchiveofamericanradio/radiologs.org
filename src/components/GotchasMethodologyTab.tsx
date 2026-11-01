import React from 'react';
import { RankedSource } from '../types/radiologs';
import { ExternalLink } from 'lucide-react';

interface GotchasMethodologyTabProps {
  rankedSources: RankedSource[];
}

export const GotchasMethodologyTab: React.FC<GotchasMethodologyTabProps> = ({ rankedSources }) => {
  return (
    <div data-component="section-gotchas" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Archival Ground-Truth Rules */}
      <section className="ri-section-filled">
        <h2
          style={{
            fontSize: 'var(--text-title-2)',
            lineHeight: '28px',
            fontWeight: 700,
            margin: '0 0 8px 0',
            color: 'var(--text)',
          }}
        >
          Archival Ground-Truth Methodology (Zero Synthesis Rule)
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--typeset-lh-prose)',
            color: 'var(--text-row)',
            margin: '0 0 14px 0',
          }}
        >
          Unlike generic streaming directories that scrape MP3 filenames, RadioLogs enforces the four strict
          archival standards pioneered by{' '}
          <a
            href="https://www.radioindex.org/"
            target="_blank"
            rel="noopener"
            style={{ color: 'var(--system-blue)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            RadioIndex — The Archive of American Radio (www.radioindex.org)
          </a>
          :
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '12px',
          }}
        >
          <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg)' }}>
            <div style={{ fontSize: 'var(--text-footnote)', fontWeight: 700, color: 'var(--text)' }}>
              1. Never Synthesize Air Dates
            </div>
            <p style={{ fontSize: 'var(--text-caption-1)', lineHeight: '17px', color: 'var(--text-row)', margin: '4px 0 0 0' }}>
              Calendar stride projection (extrapolating Mon–Fri soap schedules or weekly intervals) is strictly
              penalized. Dates must be proven via{' '}
              <a
                href="https://www.radioindex.org/calendar"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--system-blue)' }}
              >
                primary newspaper radio logs
              </a>{' '}
              (Chronicling America, Fulton History, JJonz) or verbal announcer verification.
            </p>
          </div>

          <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg)' }}>
            <div style={{ fontSize: 'var(--text-footnote)', fontWeight: 700, color: 'var(--text)' }}>
              2. Never Infer Cast from Leads
            </div>
            <p style={{ fontSize: 'var(--text-caption-1)', lineHeight: '17px', color: 'var(--text-row)', margin: '4px 0 0 0' }}>
              Attaching series lead actors (e.g., Orson Welles on <em>The Shadow</em>) to every episode without
              individual proof is scored as synthetic metadata. See verified credits at{' '}
              <a
                href="https://www.radioindex.org/people"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--system-blue)' }}
              >
                radioindex.org/people
              </a>
              .
            </p>
          </div>

          <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg)' }}>
            <div style={{ fontSize: 'var(--text-footnote)', fontWeight: 700, color: 'var(--text)' }}>
              3. 100% Full-Length .vtt Only
            </div>
            <p style={{ fontSize: 'var(--text-caption-1)', lineHeight: '17px', color: 'var(--text-row)', margin: '4px 0 0 0' }}>
              Summarizing from 30–90 second audio clips or slicing transcripts (<code>[:1400]</code>) fails our
              rubric. Full-duration faster-whisper VAD transcription is required.
            </p>
          </div>

          <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--bg)' }}>
            <div style={{ fontSize: 'var(--text-footnote)', fontWeight: 700, color: 'var(--text)' }}>
              4. SHA-256 Digest Deduplication
            </div>
            <p style={{ fontSize: 'var(--text-caption-1)', lineHeight: '17px', color: 'var(--text-row)', margin: '4px 0 0 0' }}>
              Duplicate encodings, AFRS Armed Forces rebroadcasts, and East/West coast live repeat feeds must be
              reconciled onto canonical broadcast records.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Provider Gotchas Ledger */}
      <section>
        <h3
          style={{
            fontSize: 'var(--text-title-3)',
            lineHeight: '25px',
            fontWeight: 600,
            margin: '0 0 12px 0',
            color: 'var(--text)',
          }}
        >
          Provider-by-Provider Gotchas &amp; Limitations Ledger
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rankedSources.map(({ source, compositeScore }) => (
            <div
              key={source.id}
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid var(--hairline-color)',
                background: source.id === 'radioindex' ? 'var(--chrome-fill)' : 'transparent',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel={source.id === 'radioindex' ? 'noopener' : 'noopener noreferrer'}
                    style={{
                      fontSize: 'var(--text-headline)',
                      fontWeight: 600,
                      color: 'var(--text)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{source.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="ri-fact-badge">{source.category}</span>
                </div>
                <span style={{ fontSize: 'var(--text-footnote)', fontWeight: 600, color: 'var(--text-2)' }}>
                  Score: {compositeScore}/100
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {source.gotchas.map((g, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontSize: 'var(--text-footnote)',
                      lineHeight: '19px',
                      color: 'var(--text-row)',
                      paddingLeft: '10px',
                      borderLeft: `3px solid ${
                        g.severity === 'critical'
                          ? 'var(--system-red)'
                          : g.severity === 'warning'
                            ? 'var(--system-orange)'
                            : 'var(--system-blue)'
                      }`,
                    }}
                  >
                    <strong>{g.title}:</strong> {g.detail}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
