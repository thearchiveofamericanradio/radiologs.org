# RelicRadio Podcast Network

Official URL: https://www.relicradio.com  
Category: Curated Podcast Network · Operator: RelicRadio (Independent Listener-Supported Network) · Founded: 2006  
Benchmark Card: https://www.radiologs.org/data/providers/relic-radio.md · JSON: https://www.radiologs.org/data/providers/relic-radio.json

## Summary

Beloved, long-running independent OTR podcast network organizing classic horror, sci-fi, crime, and thriller broadcasts into thematic RSS feeds with clean loudness normalization and brief host commentary. Ideal for casual podcast app listening, but covers only ~4% of the surviving OTR corpus.

## Pricing & Access Regime

- **Model:** free ($0 / Free (Patreon Optional))
- **Monthly / Annual USD:** $0/mo · $0/yr
- **Billing Note:** 100% free podcast feeds and web streaming; optional listener donations.
- **Free Tier / Access Note:** Full access to ~4,800 curated episodes across Horror, Sci-Fi, Thrillers, Strange Tales, and Case Closed.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 4,850
- **Catalog Broadcast Records:** 4,850
- **Distinct Series:** 310
- **Full-Length WebVTT (.vtt) Subtitles:** 0
- **Date Span:** 1936–1962
- **Online Streamable Share:** 100%
- **Median / Max Bitrate:** 128 kbps / 128 kbps
- **Audio Formats:** MP3 (96–128 kbps Normalized)
- **1 Item / Episode (IA + Stremio SDK UUID):** No

## Features (14 Audited Capabilities)

**Yes (4/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login), Zero Mid-Roll or Display Ads, Per-Series Podcast RSS Feeds

**No (10/14):** Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Public JSON API & /llms.txt, 100% Full-Length .vtt Subtitles, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, Per-Episode Actor ↔ Character Graph, 16" ET Disc / Lossless FLAC Streams, Sequential Multi-Part Serial Arcs

## Verified Specification Evidence

- **Per-Series Podcast RSS Feeds:** Curated weekly genre podcast feeds (~3,200 total episodes across 5 feeds), not a complete series archive.
## Provenance & Archival Methodology

- **Primary Master Source:** Hand-selected, loudness-normalized transfers from OTRR and collector archives
- **Air Date Methodology:** Host cites original broadcast date and episode number in podcast show notes and spoken outro
- **Cast Attribution Method:** Basic series notes; no structured actor-to-character database
- **Caption / Subtitle Engine:** None (Apple Podcasts auto-transcripts only on iOS client)

## Capability Scores & Quoted Evidence

- **primary_source_verification** (partial, score 68/100): Show notes accurately state original broadcast date and series episode number for curated selections.
  - Evidence: "Each podcast post cites the original series, broadcast date, and episode title."
- **cast_credit_accuracy** (none, score 30/100): Mentions headline stars occasionally in blog posts, without structured cast/character metadata.
  - Evidence: "WordPress show notes focus on series history and air date rather than full cast rosters."
- **vtt_transcripts** (none, score 0/100): No hosted `.vtt` transcripts on `relicradio.com`.
  - Evidence: "Audio MP3 enclosures only; no WebVTT files served."
- **master_provenance** (partial, score 72/100): Host screens out unlistenable low-bitrate mud and normalizes levels at 96–128 kbps MP3, though original disc matrix numbers aren't tracked.
  - Evidence: "Curated for listenable audio quality and consistent volume across episodes."
- **serial_continuity** (none, score 30/100): Thematic anthology feeds (*The Horror*, *Sci-Fi*, *Case Closed*) jump across different series each week rather than presenting contiguous serial arcs.
  - Evidence: "Anthology podcast format rotates between different series every episode."
- **open_api_export** (partial, score 70/100): Standard XML Podcast RSS feeds and WordPress REST API posts, though organized by podcast feed rather than canonical OTR series.
  - Evidence: "Provides standard RSS 2.0 podcast feeds with direct MP3 enclosures."
- **ad_free_playback** (verified, score 96/100): Listener-supported with zero third-party commercial ad injections.
  - Evidence: "100% listener-supported with no dynamic ad insertion interrupting the broadcasts."
- **dedup_integrity** (partial, score 70/100): Careful host curation avoids duplicate uploads within a feed, though some classic episodes appear in both a genre feed and a special feed.
  - Evidence: "Curated release log tracks every episode aired on each thematic feed since 2006."

## Limitations, Trade-Offs & Gotchas

- **[WARNING] Thematic Anthology Format Breaks Complete Series Browsing:** Organized around 6 genre podcast feeds rather than complete chronological runs of 1,400+ series.
- **[NOTE] Covers ~4,850 Episodes (~4% of Known Surviving Broadcasts):** Excludes daytime serials, variety/music programs, news broadcasts, and deep-catalog drama runs.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
