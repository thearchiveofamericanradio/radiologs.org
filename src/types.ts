export type SpecKey =
  | 'free_no_paywall'
  | 'no_login_required'
  | 'ad_free'
  | 'uuid_index'
  | 'sha256_dedup'
  | 'schema_jsonld'
  | 'podcast_rss'
  | 'open_json_api'
  | 'vtt_subtitles'
  | 'newspaper_scans'
  | 'studio_scripts'
  | 'character_roles'
  | 'lossless_et'
  | 'serial_arcs';

export type MetricKey =
  | 'broadcastCount'
  | 'vttCount'
  | 'specCount'
  | 'medianBitrate'
  | 'ttfaMs'
  | 'annualCost';

export interface SpecDefinition {
  id: SpecKey;
  name: string;
  shortName: string;
  unit: 'boolean';
  verificationMethod: string;
  description: string;
}

export interface SpecGroup {
  id: string;
  title: string;
  specs: SpecDefinition[];
}

export interface Preset {
  id: string;
  name: string;
  shortLabel: string;
  scenarioTitle: string;
  metricKey: MetricKey;
  maxMonthlyUsd: number;
  minBroadcasts: number;
  minBitrateKbps: number;
  requiredSpecs: SpecKey[];
  suggestedSpecs: SpecKey[];
}

export interface FeaturesData {
  schemaVersion: string;
  updatedAt: string;
  specGroups: SpecGroup[];
  presets: Preset[];
}

export interface SourceMetrics {
  playableBroadcasts: number;
  catalogBroadcasts: number;
  seriesCount: number;
  vttSubtitleCount: number;
  specCount: number;
  totalSpecs: number;
  medianBitrateKbps: number;
  maxBitrateKbps: number;
  ttfaMs: number | null;
  highCutoffHz: number;
}

export interface SourceGotcha {
  severity: 'critical' | 'warning' | 'note';
  title: string;
  detail: string;
}

export interface Source {
  id: string;
  name: string;
  shortName: string;
  domain: string;
  url: string;
  category: string;
  operator: string;
  foundedYear: number;
  pricing: {
    model: string;
    monthlyUsd: number;
    annualUsd: number;
    displayPrice: string;
    billingNote: string;
    freeTierNote: string;
  };
  catalog: {
    broadcastCount: number;
    seriesCount: number;
    distinctRecordings: number;
    dateSpan: string;
    onlineStreamablePct: number;
  };
  audio: {
    formats: string[];
    primaryContainer: string;
    streamingAvailable: boolean;
    batchDownloadAvailable: boolean;
    rssFeedsAvailable: boolean;
  };
  provenance: {
    primaryMasterSource: string;
    airdateMethodology: string;
    castAttributionMethod: string;
    captionEngine: string;
  };
  badges: string[];
  summary: string;
  specs: Record<SpecKey, boolean>;
  specNotes: Partial<Record<SpecKey, string>>;
  metrics: SourceMetrics;
  gotchas: SourceGotcha[];
}

export interface Benchmark {
  sourceId: string;
  latency: {
    ttfbMs: number | null;
    firstAudioFrameMs: number | null;
    p50StartMs: number | null;
    p95StartMs: number | null;
    cdnArchitecture: string;
  };
  bitrate: {
    minKbps: number;
    medianKbps: number;
    maxKbps: number;
    losslessSharePct: number;
    transcodeGenerationNote: string;
  };
  frequencyResponse: {
    lowCutoffHz: number;
    highCutoffHz: number;
    snrDb: number;
    dynamicRangeLu: number;
    transferGrade: string;
  };
}

export interface UuidProtocolExample {
  series: string;
  seriesUrl: string;
  title: string;
  airDate: string;
  network: string;
  uuid: string;
  listenUrl: string;
  sha256: string;
  streamsResolved: string;
  vttStatus: string;
  primaryEvidence: string;
}

export interface SeriesBacklinksData {
  canonicalOrigin: string;
  hubLinks: Array<{
    title: string;
    url: string;
    anchorText: string;
    category: string;
    description: string;
  }>;
  seriesBenchmarks: Array<{
    slug: string;
    title: string;
    network: string;
    runYears: string;
    radioindexUrl: string;
    rssUrl: string;
    verifiedBroadcasts: number;
    vttPct: number;
    eastWestSeparated: boolean;
    competitorDefect: string;
    episodeId?: string;
    episodeTitle?: string;
    episodeUrl?: string;
  }>;
  uuidProtocol: {
    name: string;
    summary: string;
    capabilities: Array<{ title: string; detail: string }>;
    examples: UuidProtocolExample[];
  };
  headToHeadComparisons: Array<{
    id: string;
    title: string;
    competitorDomain: string;
    winner: string;
    winnerUrl: string;
    verdict: string;
    metrics: Array<{
      label: string;
      radioindex: string;
      competitor: string;
    }>;
  }>;
}
