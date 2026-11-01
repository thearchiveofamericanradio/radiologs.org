export type SupportLevel = 'full' | 'partial' | 'none';

export type PricingModel = 'free' | 'subscription' | 'ad-supported' | 'institutional';

export type CategoryType =
  | 'Full-Stack Archival Index'
  | 'Public Digital Repository'
  | 'Commercial Subscription Service'
  | 'Curated Hobbyist Portal'
  | 'Discography & Log Database'
  | 'Academic / Institutional Archive';

export type FeatureKey =
  | 'primary_source_verification'
  | 'cast_credit_accuracy'
  | 'vtt_transcripts'
  | 'master_provenance'
  | 'serial_continuity'
  | 'open_api_export'
  | 'ad_free_playback'
  | 'dedup_integrity';

export interface FeatureDefinition {
  id: FeatureKey;
  label: string;
  shortLabel: string;
  category: 'Archival Ground Truth' | 'Audio & Transcripts' | 'Access & Openness';
  description: string;
  whyItMatters: string;
  defaultWeight: number;
  scoringRubric: {
    full: string;
    partial: string;
    none: string;
  };
}

export interface ScenarioPreset {
  id: 'enthusiast' | 'historian' | 'collector' | 'ai_agent';
  name: string;
  persona: string;
  icon: string;
  tagline: string;
  description: string;
  weights: Record<FeatureKey, number>;
  filters: {
    maxMonthlyPrice: number;
    minCatalogBroadcasts: number;
    requireVtt: boolean;
    requireNewspaperProof: boolean;
    requireCastRoles: boolean;
    requireOpenRssOrApi: boolean;
    requireStreamableAudio: boolean;
  };
}

export interface FeatureCapabilityEntry {
  level: SupportLevel;
  score: number; // 0 to 100
  evidence: string;
}

export interface GotchaItem {
  severity: 'critical' | 'warning' | 'info';
  title: string;
  detail: string;
}

export interface SourcePlatform {
  id: string;
  name: string;
  shortName: string;
  url: string;
  established: number;
  category: CategoryType;
  pricingModel: PricingModel;
  monthlyPriceUsd: number;
  annualPriceUsd: number;
  pricingNotes: string;
  catalogBroadcasts: number;
  catalogSeries: number;
  streamableAudio: boolean;
  audioFormats: string[];
  primaryLineage: string;
  tagline: string;
  verdict: string;
  badges: string[];
  capabilities: Record<FeatureKey, FeatureCapabilityEntry>;
  gotchas: GotchaItem[];
}

export interface BenchmarkEntry {
  sourceId: string;
  ttfaMedianMs: number | null; // Time to first audio frame
  ttfaP95Ms: number | null;
  medianBitrateKbps: number | null;
  peakBitrateKbps: number | null;
  freqResponseCutoffKhz: number | null;
  dynamicRangeLu: number | null;
  verifiedAirDatePct: number;
  verifiedCastRolePct: number;
  fullVttTranscriptPct: number;
  serialArcCompletenessPct: number;
  duplicateRatePct: number;
  uptimePct: number;
  auditNotes: string;
}

export interface RankedSource {
  source: SourcePlatform;
  benchmark: BenchmarkEntry;
  compositeScore: number;
  featureScore: number;
  benchmarkScore: number;
  valueScore: number;
  disqualified: boolean;
  disqualificationReasons: string[];
  estimatedAnnualCost: number;
}

export interface HubLink {
  title: string;
  url: string;
  anchorText: string;
  category: string;
  description: string;
}

export interface SeriesBenchmark {
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
}

export interface HeadToHeadMetric {
  label: string;
  radioindex: string;
  competitor: string;
}

export interface HeadToHeadComparison {
  id: string;
  title: string;
  queryTarget: string;
  winner: string;
  winnerUrl: string;
  verdict: string;
  metrics: HeadToHeadMetric[];
}

export interface SeriesBacklinksData {
  canonicalOrigin: string;
  hubLinks: HubLink[];
  seriesBenchmarks: SeriesBenchmark[];
  headToHeadComparisons: HeadToHeadComparison[];
}

export type ActiveTab = 'scoreboard' | 'matrix' | 'benchmarks' | 'backlinks' | 'gotchas' | 'agents';
