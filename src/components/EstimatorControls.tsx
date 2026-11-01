import React from 'react';
import { FeatureDefinition, FeatureKey, PricingModel } from '../types/radiologs';
import { Search, Sliders, Check } from 'lucide-react';

interface EstimatorControlsProps {
  features: FeatureDefinition[];
  weights: Record<FeatureKey, number>;
  onChangeWeight: (key: FeatureKey, value: number) => void;
  maxMonthlyPrice: number;
  onChangeMaxPrice: (val: number) => void;
  minCatalogBroadcasts: number;
  onChangeMinCatalog: (val: number) => void;
  requireVtt: boolean;
  onToggleVtt: () => void;
  requireNewspaperProof: boolean;
  onToggleNewspaperProof: () => void;
  requireCastRoles: boolean;
  onToggleCastRoles: () => void;
  requireOpenRssOrApi: boolean;
  onToggleOpenRssOrApi: () => void;
  requireStreamableAudio: boolean;
  onToggleStreamableAudio: () => void;
  searchQuery: string;
  onChangeSearch: (q: string) => void;
  selectedPricingModels: PricingModel[];
  onTogglePricingModel: (model: PricingModel) => void;
}

const PRICING_LABELS: { id: PricingModel; label: string }[] = [
  { id: 'free', label: 'Free ($0)' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'ad-supported', label: 'Ad-Supported' },
  { id: 'institutional', label: 'Institutional' },
];

export const EstimatorControls: React.FC<EstimatorControlsProps> = ({
  features,
  weights,
  onChangeWeight,
  maxMonthlyPrice,
  onChangeMaxPrice,
  minCatalogBroadcasts,
  onChangeMinCatalog,
  requireVtt,
  onToggleVtt,
  requireNewspaperProof,
  onToggleNewspaperProof,
  requireCastRoles,
  onToggleCastRoles,
  requireOpenRssOrApi,
  onToggleOpenRssOrApi,
  requireStreamableAudio,
  onToggleStreamableAudio,
  searchQuery,
  onChangeSearch,
  selectedPricingModels,
  onTogglePricingModel,
}) => {
  return (
    <aside
      data-component="section-controls"
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {/* Search & Hard Requirement Gates */}
      <div className="ri-section-filled">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
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
            Filters &amp; Gates
          </h3>
          <span style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>
            Instant local filter
          </span>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search
            className="w-4 h-4"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-2)',
            }}
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="Search platform, lineage, or flaw..."
            style={{
              width: '100%',
              height: '38px',
              padding: '0 12px 0 36px',
              borderRadius: '10px',
              background: 'var(--bg)',
              color: 'var(--text)',
              border: '1px solid var(--hairline-color)',
              fontSize: 'var(--text-body)',
              outline: 'none',
            }}
          />
        </div>

        {/* Max Monthly Budget Slider */}
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-footnote)',
              marginBottom: '6px',
            }}
          >
            <span style={{ color: 'var(--text-2)' }}>Max Monthly Price</span>
            <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--text)' }}>
              {maxMonthlyPrice === 0 ? '$0 / mo (Free Only)' : `Up to $${maxMonthlyPrice}/mo`}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={25}
            step={1}
            value={maxMonthlyPrice}
            onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
            className="ri-slider"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-caption-2)',
              color: 'var(--text-2)',
              marginTop: '4px',
            }}
          >
            <span>$0 Free</span>
            <span>$8 RUSC</span>
            <span>$14 YT</span>
            <span>$25 SXM</span>
          </div>
        </div>

        {/* Minimum Catalog Depth Slider */}
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-footnote)',
              marginBottom: '6px',
            }}
          >
            <span style={{ color: 'var(--text-2)' }}>Min Catalog Depth</span>
            <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--text)' }}>
              {minCatalogBroadcasts === 0
                ? 'Any size'
                : `${minCatalogBroadcasts.toLocaleString()}+ shows`}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100000}
            step={2500}
            value={minCatalogBroadcasts}
            onChange={(e) => onChangeMinCatalog(Number(e.target.value))}
            className="ri-slider"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-caption-2)',
              color: 'var(--text-2)',
              marginTop: '4px',
            }}
          >
            <span>0</span>
            <span>25k</span>
            <span>50k</span>
            <span>100k+</span>
          </div>
        </div>

        {/* Pricing Model Pills */}
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              fontSize: 'var(--text-caption-1)',
              color: 'var(--text-2)',
              marginBottom: '6px',
              fontWeight: 500,
            }}
          >
            Access Model
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {PRICING_LABELS.map((item) => {
              const active = selectedPricingModels.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onTogglePricingModel(item.id)}
                  className={`ri-pill ${active ? 'ri-pill-selected' : ''}`}
                  style={{ minHeight: '28px', padding: '4px 10px', fontSize: '12px' }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hard Requirement Checkboxes */}
        <div
          style={{
            paddingTop: '12px',
            borderTop: '1px solid var(--hairline-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div
            style={{
              fontSize: 'var(--text-caption-1)',
              color: 'var(--text-2)',
              marginBottom: '2px',
              fontWeight: 500,
            }}
          >
            Strict Archival Gates (Disqualify if Missing)
          </div>

          {[
            {
              label: 'Playable On-Demand Audio',
              sub: 'Excludes text-only discographies & in-room libraries',
              checked: requireStreamableAudio,
              onToggle: onToggleStreamableAudio,
            },
            {
              label: 'Primary Newspaper Air-Date Proof',
              sub: 'Chronicling America, Fulton History, or JJonz logs',
              checked: requireNewspaperProof,
              onToggle: onToggleNewspaperProof,
            },
            {
              label: '100% Full-Length .vtt Transcripts',
              sub: 'Time-aligned WebVTT captions across entire audio',
              checked: requireVtt,
              onToggle: onToggleVtt,
            },
            {
              label: 'Per-Episode Cast ↔ Character Credits',
              sub: 'Verified actor-to-character assignments (no lead-guessing)',
              checked: requireCastRoles,
              onToggle: onToggleCastRoles,
            },
            {
              label: 'Open Podcast RSS or JSON Export',
              sub: 'Standard /rss?series= feeds or public JSON endpoints',
              checked: requireOpenRssOrApi,
              onToggle: onToggleOpenRssOrApi,
            },
          ].map((gate) => (
            <button
              key={gate.label}
              type="button"
              onClick={gate.onToggle}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '8px 10px',
                borderRadius: '10px',
                background: gate.checked ? 'var(--row-hover)' : 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: 'var(--text)',
                width: '100%',
              }}
            >
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  minWidth: '18px',
                  borderRadius: '5px',
                  marginTop: '1px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: gate.checked ? 'var(--system-blue)' : 'var(--chrome-fill)',
                  color: '#ffffff',
                }}
              >
                {gate.checked && <Check className="w-3 h-3" />}
              </span>
              <span>
                <div style={{ fontSize: 'var(--text-footnote)', fontWeight: 600, lineHeight: '17px' }}>
                  {gate.label}
                </div>
                <div style={{ fontSize: 'var(--text-caption-2)', color: 'var(--text-2)', lineHeight: '15px' }}>
                  {gate.sub}
                </div>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Capability Weight Sliders */}
      <div className="ri-section-filled">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders className="w-4 h-4" style={{ color: 'var(--text-2)' }} />
            <h3
              style={{
                fontSize: 'var(--text-headline)',
                lineHeight: '22px',
                fontWeight: 600,
                margin: 0,
                color: 'var(--text)',
              }}
            >
              Capability Weights
            </h3>
          </div>
          <span style={{ fontSize: 'var(--text-caption-1)', color: 'var(--text-2)' }}>0–10 scale</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {features.map((feat) => {
            const val = weights[feat.id] ?? feat.defaultWeight;
            return (
              <div key={feat.id}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 'var(--text-footnote)',
                    marginBottom: '4px',
                  }}
                >
                  <span style={{ color: 'var(--text-row)', fontWeight: 500 }}>{feat.shortLabel}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: val >= 8 ? 'var(--system-blue)' : 'var(--text-2)',
                    }}
                  >
                    {val}/10
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={val}
                  onChange={(e) => onChangeWeight(feat.id, Number(e.target.value))}
                  className="ri-slider"
                />
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
