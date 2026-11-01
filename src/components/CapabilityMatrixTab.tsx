import React, { useState } from 'react';
import { FeatureDefinition, FeatureKey, RankedSource } from '../types/radiologs';
import { CheckCircle2, MinusCircle, XCircle, ExternalLink } from 'lucide-react';

interface CapabilityMatrixTabProps {
  rankedSources: RankedSource[];
  features: FeatureDefinition[];
}

export const CapabilityMatrixTab: React.FC<CapabilityMatrixTabProps> = ({ rankedSources, features }) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureKey>('primary_source_verification');
  const activeFeatureDef = features.find((f) => f.id === selectedFeature) || features[0];

  return (
    <div data-component="section-matrix" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Feature Selector Strip + Rubric Inspector */}
      <div className="ri-section-filled">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '10px',
          }}
        >
          <h2
            style={{
              fontSize: 'var(--text-title-3)',
              lineHeight: '25px',
              fontWeight: 600,
              margin: 0,
              color: 'var(--text)',
            }}
          >
            8-Dimension Archival Capability Rubric
          </h2>
          <span style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-2)' }}>
            Select any dimension below to inspect its scoring criteria
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
          {features.map((feat) => {
            const active = feat.id === selectedFeature;
            return (
              <button
                key={feat.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedFeature(feat.id)}
                className={`ri-pill ${active ? 'ri-pill-selected' : ''}`}
              >
                {feat.shortLabel}
              </button>
            );
          })}
        </div>

        <div
          style={{
            padding: '14px',
            borderRadius: '12px',
            background: 'var(--bg)',
            border: '1px solid var(--hairline-color)',
          }}
        >
          <div style={{ fontSize: 'var(--text-headline)', fontWeight: 600, color: 'var(--text)' }}>
            {activeFeatureDef.label}{' '}
            <span className="ri-fact-badge" style={{ marginLeft: '6px' }}>
              {activeFeatureDef.category}
            </span>
          </div>
          <p
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--typeset-lh-prose)',
              color: 'var(--text-row)',
              margin: '6px 0 12px 0',
            }}
          >
            {activeFeatureDef.description} <strong>Why it matters:</strong> {activeFeatureDef.whyItMatters}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '10px',
            }}
          >
            <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--chrome-fill)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--system-green)' }}>
                FULL SUPPORT (85–100)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-row)', marginTop: '3px' }}>
                {activeFeatureDef.scoringRubric.full}
              </div>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--chrome-fill)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--system-orange)' }}>
                PARTIAL SUPPORT (35–84)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-row)', marginTop: '3px' }}>
                {activeFeatureDef.scoringRubric.partial}
              </div>
            </div>
            <div style={{ padding: '10px', borderRadius: '8px', background: 'var(--chrome-fill)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--system-red)' }}>
                NONE / SYNTHETIC (0–34)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-row)', marginTop: '3px' }}>
                {activeFeatureDef.scoringRubric.none}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full 18-Platform × 8-Feature Matrix Table */}
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
              <th style={{ padding: '10px 12px', minWidth: '190px' }}>Platform</th>
              <th style={{ padding: '10px 8px' }}>Price</th>
              {features.map((f) => (
                <th key={f.id} style={{ padding: '10px 8px', minWidth: '105px' }}>
                  {f.shortLabel}
                </th>
              ))}
              <th style={{ padding: '10px 12px', textAlign: 'right' }}>Composite</th>
            </tr>
          </thead>
          <tbody>
            {rankedSources.map(({ source, compositeScore }) => {
              const isRadioIndex = source.id === 'radioindex';
              return (
                <tr
                  key={source.id}
                  style={{
                    borderBottom: '1px solid var(--hairline-color)',
                    background: isRadioIndex ? 'var(--chrome-fill)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>
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
                  <td style={{ padding: '10px 8px', color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
                    {source.monthlyPriceUsd === 0 ? '$0' : `$${source.monthlyPriceUsd.toFixed(2)}`}
                  </td>
                  {features.map((f) => {
                    const cap = source.capabilities[f.id];
                    return (
                      <td
                        key={f.id}
                        title={cap.evidence}
                        style={{
                          padding: '10px 8px',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 600,
                            color:
                              cap.level === 'full'
                                ? 'var(--system-green)'
                                : cap.level === 'partial'
                                  ? 'var(--system-orange)'
                                  : 'var(--system-red)',
                          }}
                        >
                          {cap.level === 'full' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {cap.level === 'partial' && <MinusCircle className="w-3.5 h-3.5" />}
                          {cap.level === 'none' && <XCircle className="w-3.5 h-3.5" />}
                          <span>{cap.score}</span>
                        </span>
                      </td>
                    );
                  })}
                  <td
                    style={{
                      padding: '10px 12px',
                      textAlign: 'right',
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {compositeScore}/100
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
