import React from 'react';
import { ScenarioPreset } from '../types/radiologs';
import { RotateCcw } from 'lucide-react';

interface ScenarioPresetBarProps {
  presets: ScenarioPreset[];
  activePresetId: string | null;
  onSelectPreset: (preset: ScenarioPreset) => void;
  onResetDefault: () => void;
}

export const ScenarioPresetBar: React.FC<ScenarioPresetBarProps> = ({
  presets,
  activePresetId,
  onSelectPreset,
  onResetDefault,
}) => {
  const activePreset = presets.find((p) => p.id === activePresetId);

  return (
    <section data-component="section-presets" style={{ marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
          <h2
            style={{
              fontSize: 'var(--text-title-3)',
              lineHeight: '25px',
              fontWeight: 600,
              margin: 0,
              color: 'var(--text)',
            }}
          >
            Listener &amp; Researcher Scenarios
          </h2>
          <span style={{ fontSize: 'var(--text-footnote)', color: 'var(--text-2)' }}>
            Select a profile to configure capability weights &amp; requirement gates
          </span>
        </div>

        <button
          type="button"
          onClick={onResetDefault}
          className="ri-pill"
          style={{ minHeight: '30px', padding: '4px 12px', fontSize: '13px' }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Balanced Weights</span>
        </button>
      </div>

      {/* radioindex.org <app-filter-bar> Capsule Strip */}
      <div
        data-component="control-toolbar"
        role="toolbar"
        aria-label="Scenario presets"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: activePreset ? '12px' : '0',
        }}
      >
        {presets.map((preset) => {
          const isSelected = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectPreset(preset)}
              className={`ri-pill ${isSelected ? 'ri-pill-selected' : ''}`}
            >
              <span>{preset.name}</span>
              <span
                style={{
                  fontSize: '12px',
                  opacity: isSelected ? 0.8 : 0.65,
                  fontWeight: 400,
                }}
              >
                · {preset.persona}
              </span>
            </button>
          );
        })}
      </div>

      {activePreset && (
        <div
          className="ri-section-filled"
          style={{
            padding: '12px 16px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div style={{ flex: '1 1 420px' }}>
            <div style={{ fontSize: 'var(--text-subheadline)', fontWeight: 600, color: 'var(--text)' }}>
              {activePreset.name} — {activePreset.tagline}
            </div>
            <div
              style={{
                fontSize: 'var(--text-footnote)',
                lineHeight: '18px',
                color: 'var(--text-2)',
                marginTop: '2px',
              }}
            >
              {activePreset.description}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <span className="ri-fact-badge">
              Max ${activePreset.filters.maxMonthlyPrice}/mo
            </span>
            <span className="ri-fact-badge">
              Min {activePreset.filters.minCatalogBroadcasts.toLocaleString()} shows
            </span>
            {activePreset.filters.requireNewspaperProof && (
              <span className="ri-fact-badge" style={{ color: 'var(--system-green)' }}>
                Newspaper Date Proof
              </span>
            )}
            {activePreset.filters.requireVtt && (
              <span className="ri-fact-badge" style={{ color: 'var(--system-blue)' }}>
                Full .vtt Required
              </span>
            )}
            {activePreset.filters.requireCastRoles && (
              <span className="ri-fact-badge" style={{ color: 'var(--system-purple)' }}>
                Cast ↔ Role Credits
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
