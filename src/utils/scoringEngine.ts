import {
  BenchmarkEntry,
  CategoryType,
  FeatureCapabilityEntry,
  FeatureDefinition,
  FeatureKey,
  GotchaItem,
  PricingModel,
  RankedSource,
  ScenarioPreset,
  SourcePlatform,
  SupportLevel,
} from '../types/radiologs';

const ALL_FEATURE_KEYS: FeatureKey[] = [
  'primary_source_verification',
  'cast_credit_accuracy',
  'vtt_transcripts',
  'master_provenance',
  'serial_continuity',
  'open_api_export',
  'ad_free_playback',
  'dedup_integrity',
];

function mapLevel(rawLevel: string): SupportLevel {
  if (rawLevel === 'verified' || rawLevel === 'full') return 'full';
  if (rawLevel === 'partial') return 'partial';
  return 'none';
}

function mapPricingModel(rawModel: string): PricingModel {
  if (rawModel === 'free') return 'free';
  if (rawModel === 'subscription' || rawModel === 'freemium') return 'subscription';
  if (rawModel === 'ad-supported') return 'ad-supported';
  return 'institutional';
}

export function normalizeFeatures(rawCapabilities: any[]): FeatureDefinition[] {
  return rawCapabilities.map((c) => ({
    id: c.id as FeatureKey,
    label: c.name || c.label,
    shortLabel: c.shortName || c.shortLabel,
    category:
      c.category === 'Archival Ground Truth'
        ? 'Archival Ground Truth'
        : c.category === 'Audio & Transfer Fidelity'
          ? 'Audio & Transcripts'
          : 'Access & Openness',
    description: c.description,
    whyItMatters: c.whyItMatters,
    defaultWeight: Math.max(1, Math.min(10, Math.round((c.defaultWeight || 12) / 2))),
    scoringRubric: {
      full: c.levels?.verified || c.scoringRubric?.full || '',
      partial: c.levels?.partial || c.scoringRubric?.partial || '',
      none: c.levels?.none || c.scoringRubric?.none || '',
    },
  }));
}

export function normalizePresets(rawPresets: any[]): ScenarioPreset[] {
  return rawPresets.map((p) => {
    const id = p.id as ScenarioPreset['id'];
    const presetWeights: Record<FeatureKey, number> = {
      primary_source_verification: id === 'historian' ? 10 : id === 'collector' ? 8 : 6,
      cast_credit_accuracy: id === 'historian' ? 10 : id === 'ai_agent' ? 8 : 6,
      vtt_transcripts: id === 'ai_agent' ? 10 : id === 'historian' ? 8 : 6,
      master_provenance: id === 'collector' ? 10 : id === 'historian' ? 8 : 7,
      serial_continuity: id === 'enthusiast' ? 9 : id === 'collector' ? 9 : 7,
      open_api_export: id === 'ai_agent' ? 10 : id === 'enthusiast' ? 8 : 6,
      ad_free_playback: id === 'enthusiast' ? 10 : 7,
      dedup_integrity: id === 'collector' ? 10 : id === 'historian' ? 9 : 7,
    };

    return {
      id,
      name: p.name,
      persona: p.shortLabel || p.persona || p.name,
      icon: p.id,
      tagline: p.tagline,
      description: p.description,
      weights: presetWeights,
      filters: {
        maxMonthlyPrice: p.filters?.maxMonthlyCost ?? 25,
        minCatalogBroadcasts: p.filters?.minCatalogSize ?? 0,
        requireVtt: (p.filters?.minVttPct ?? 0) > 0,
        requireNewspaperProof: !!p.filters?.strictVerification,
        requireCastRoles: id === 'historian',
        requireOpenRssOrApi: (p.filters?.requiredCapabilities || []).includes('open_api_export'),
        requireStreamableAudio: !p.filters?.allowTextOnlyIndex,
      },
    };
  });
}

export function normalizeSources(rawSources: any[]): SourcePlatform[] {
  return rawSources.map((s) => {
    const caps = {} as Record<FeatureKey, FeatureCapabilityEntry>;
    for (const key of ALL_FEATURE_KEYS) {
      const rawCap = s.capabilities?.[key] || { level: 'none', score: 0, summary: '' };
      caps[key] = {
        level: mapLevel(rawCap.level),
        score: Number(rawCap.score ?? 0),
        evidence: rawCap.summary || rawCap.evidence || '',
      };
    }

    const gotchas: GotchaItem[] = (s.gotchas || []).map((g: any) => ({
      severity:
        g.severity === 'critical'
          ? 'critical'
          : g.severity === 'warning'
            ? 'warning'
            : 'info',
      title: g.title,
      detail: g.detail,
    }));

    return {
      id: s.id,
      name: s.name,
      shortName: s.shortName || s.name,
      url: s.url,
      established: s.foundedYear || s.established || 2000,
      category: (s.category || 'Curated Hobbyist Portal') as CategoryType,
      pricingModel: mapPricingModel(s.pricing?.model || s.pricingModel || 'free'),
      monthlyPriceUsd: Number(s.pricing?.monthlyUsd ?? s.monthlyPriceUsd ?? 0),
      annualPriceUsd: Number(s.pricing?.annualUsd ?? s.annualPriceUsd ?? 0),
      pricingNotes: s.pricing?.billingNote || s.pricingNotes || '',
      catalogBroadcasts: Number(s.catalog?.broadcastCount ?? s.catalogBroadcasts ?? 0),
      catalogSeries: Number(s.catalog?.seriesCount ?? s.catalogSeries ?? 0),
      streamableAudio: Boolean(s.audio?.streamingAvailable ?? s.streamableAudio ?? true),
      audioFormats: s.audio?.formats || s.audioFormats || [],
      primaryLineage: s.provenance?.primaryMasterSource || s.primaryLineage || '',
      tagline: s.summary || s.tagline || '',
      verdict: s.summary || s.verdict || '',
      badges: s.badges || [],
      capabilities: caps,
      gotchas,
    };
  });
}

export function normalizeBenchmarks(rawBenchmarks: any[]): BenchmarkEntry[] {
  return rawBenchmarks.map((b) => {
    const ttfaMedian =
      b.latency?.p50StartMs && b.latency.p50StartMs > 0 ? b.latency.p50StartMs : null;
    const ttfaP95 =
      b.latency?.p95StartMs && b.latency.p95StartMs > 0 ? b.latency.p95StartMs : null;
    const medianBitrate =
      b.bitrate?.medianKbps && b.bitrate.medianKbps > 0 ? b.bitrate.medianKbps : null;
    const peakBitrate =
      b.bitrate?.maxKbps && b.bitrate.maxKbps > 0 ? b.bitrate.maxKbps : null;
    const freqKhz =
      b.frequencyResponse?.highCutoffHz && b.frequencyResponse.highCutoffHz > 0
        ? Number((b.frequencyResponse.highCutoffHz / 1000).toFixed(1))
        : null;

    return {
      sourceId: b.sourceId,
      ttfaMedianMs: ttfaMedian,
      ttfaP95Ms: ttfaP95,
      medianBitrateKbps: medianBitrate,
      peakBitrateKbps: peakBitrate,
      freqResponseCutoffKhz: freqKhz,
      dynamicRangeLu: b.frequencyResponse?.dynamicRangeLu ?? null,
      verifiedAirDatePct: Number(b.metadataCompleteness?.verifiedAirdatePct ?? 0),
      verifiedCastRolePct: Number(b.metadataCompleteness?.characterRolePct ?? 0),
      fullVttTranscriptPct: Number(b.metadataCompleteness?.vttCoveragePct ?? 0),
      serialArcCompletenessPct: Number(b.metadataCompleteness?.serialArcLinkedPct ?? 0),
      duplicateRatePct: Math.max(0, Math.round(100 - Number(b.metadataCompleteness?.provenanceDocumentedPct ?? 50)) / 4),
      uptimePct: 99.9,
      auditNotes:
        b.bitrate?.transcodeGenerationNote || b.latency?.cdnArchitecture || '',
    };
  });
}

export interface RankFilterOptions {
  weights: Record<FeatureKey, number>;
  maxMonthlyPrice: number;
  minCatalogBroadcasts: number;
  requireVtt: boolean;
  requireNewspaperProof: boolean;
  requireCastRoles: boolean;
  requireOpenRssOrApi: boolean;
  requireStreamableAudio: boolean;
  searchQuery: string;
  selectedPricingModels: PricingModel[];
}

export function rankSources(
  sources: SourcePlatform[],
  benchmarks: BenchmarkEntry[],
  options: RankFilterOptions
): RankedSource[] {
  const benchMap = new Map<string, BenchmarkEntry>(
    benchmarks.map((b) => [b.sourceId, b])
  );

  const q = options.searchQuery.trim().toLowerCase();

  const filtered = sources.filter((s) => {
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.shortName.toLowerCase().includes(q) ||
      s.verdict.toLowerCase().includes(q) ||
      s.primaryLineage.toLowerCase().includes(q) ||
      s.badges.some((b) => b.toLowerCase().includes(q)) ||
      s.gotchas.some(
        (g) => g.title.toLowerCase().includes(q) || g.detail.toLowerCase().includes(q)
      )
    );
  });

  const results: RankedSource[] = filtered.map((source) => {
    const benchmark = benchMap.get(source.id) || {
      sourceId: source.id,
      ttfaMedianMs: null,
      ttfaP95Ms: null,
      medianBitrateKbps: null,
      peakBitrateKbps: null,
      freqResponseCutoffKhz: null,
      dynamicRangeLu: null,
      verifiedAirDatePct: 0,
      verifiedCastRolePct: 0,
      fullVttTranscriptPct: 0,
      serialArcCompletenessPct: 0,
      duplicateRatePct: 20,
      uptimePct: 99.0,
      auditNotes: '',
    };

    // Weighted capability score (0-100)
    let weightedSum = 0;
    let totalWeight = 0;
    for (const key of ALL_FEATURE_KEYS) {
      const w = options.weights[key] ?? 5;
      totalWeight += w;
      weightedSum += (source.capabilities[key]?.score ?? 0) * w;
    }
    const featureScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

    // Telemetry benchmark score (0-100)
    const latencyScore = benchmark.ttfaMedianMs
      ? Math.max(0, Math.min(100, Math.round(100 - (benchmark.ttfaMedianMs - 140) / 22)))
      : 30;
    const bitrateScore = benchmark.medianBitrateKbps
      ? Math.min(100, Math.round((benchmark.medianBitrateKbps / 128) * 90))
      : 20;
    const metadataScore = Math.round(
      benchmark.verifiedAirDatePct * 0.4 +
        benchmark.fullVttTranscriptPct * 0.35 +
        benchmark.verifiedCastRolePct * 0.25
    );
    const benchmarkScore = Math.round(
      metadataScore * 0.55 + bitrateScore * 0.25 + latencyScore * 0.2
    );

    // Value score (0-100)
    const valueScore =
      source.monthlyPriceUsd === 0
        ? 100
        : Math.max(15, Math.round(100 - source.monthlyPriceUsd * 3.5));

    const compositeScore = Math.round(
      featureScore * 0.68 + benchmarkScore * 0.22 + valueScore * 0.1
    );

    // Disqualification gates
    const reasons: string[] = [];

    if (source.monthlyPriceUsd > options.maxMonthlyPrice) {
      reasons.push(
        `$${source.monthlyPriceUsd.toFixed(2)}/mo exceeds $${options.maxMonthlyPrice}/mo budget`
      );
    }
    if (source.catalogBroadcasts < options.minCatalogBroadcasts) {
      reasons.push(
        `${source.catalogBroadcasts.toLocaleString()} shows < ${options.minCatalogBroadcasts.toLocaleString()} min`
      );
    }
    if (!options.selectedPricingModels.includes(source.pricingModel)) {
      reasons.push(`Access model "${source.pricingModel}" excluded`);
    }
    if (options.requireStreamableAudio && !source.streamableAudio) {
      reasons.push('No playable online audio streams (text/in-room only)');
    }
    if (
      options.requireNewspaperProof &&
      source.capabilities.primary_source_verification.level !== 'full'
    ) {
      reasons.push('Lacks verified primary newspaper radio log corroboration');
    }
    if (options.requireVtt && benchmark.fullVttTranscriptPct < 50) {
      reasons.push(
        `Synchronized .vtt coverage is ${benchmark.fullVttTranscriptPct}% (requires full-length .vtt)`
      );
    }
    if (
      options.requireCastRoles &&
      source.capabilities.cast_credit_accuracy.level !== 'full'
    ) {
      reasons.push('Lacks verified per-episode actor ↔ character role mapping');
    }
    if (
      options.requireOpenRssOrApi &&
      source.capabilities.open_api_export.level === 'none'
    ) {
      reasons.push('Closed platform without open Podcast RSS or JSON API');
    }

    return {
      source,
      benchmark,
      compositeScore,
      featureScore,
      benchmarkScore,
      valueScore,
      disqualified: reasons.length > 0,
      disqualificationReasons: reasons,
      estimatedAnnualCost: source.annualPriceUsd,
    };
  });

  return results.sort((a, b) => {
    if (a.disqualified !== b.disqualified) {
      return a.disqualified ? 1 : -1;
    }
    return b.compositeScore - a.compositeScore;
  });
}
