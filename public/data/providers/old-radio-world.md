# Old Radio World

Official URL: https://www.oldradioworld.com  
Category: Collector Streamer / Mirror · Operator: Old Radio World Webmaster · Founded: 2005  
Benchmark Card: https://www.radiologs.org/data/providers/old-radio-world.md · JSON: https://www.radiologs.org/data/providers/old-radio-world.json

## Summary

Minimalist, fast-loading web directory covering ~195 popular OTR series. While easy for a casual visitor to click and play a classic *Jack Benny* or *Dimension X* episode, its catalog is a static snapshot of early-2000s low-bitrate MP3s with zero archival verification or transcripts.

## Pricing & Access Regime

- **Model:** ad-supported ($0 (Ad-Supported))
- **Monthly / Annual USD:** $0/mo · $0/yr
- **Billing Note:** Free web streaming with AdSense display units.
- **Free Tier / Access Note:** Direct browser streaming and single-file MP3 downloads.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 12,250
- **Catalog Broadcast Records:** 12,500
- **Distinct Series:** 195
- **Full-Length WebVTT (.vtt) Subtitles:** 0
- **Date Span:** 1932–1962
- **Online Streamable Share:** 98%
- **Median / Max Bitrate:** 32 kbps / 64 kbps
- **Audio Formats:** MP3 (24–64 kbps)
- **1 Item / Episode (IA + Stremio SDK UUID):** No

## Features (14 Audited Capabilities)

**Yes (2/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login)

**No (12/14):** Zero Mid-Roll or Display Ads, Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Per-Series Podcast RSS Feeds, Public JSON API & /llms.txt, 100% Full-Length .vtt Subtitles, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, Per-Episode Actor ↔ Character Graph, 16" ET Disc / Lossless FLAC Streams, Sequential Multi-Part Serial Arcs

## Verified Specification Evidence

- **Zero Mid-Roll or Display Ads:** Serves third-party display ads alongside 32 kbps MP3 links.
- **100% Full-Length .vtt Subtitles:** Zero .vtt subtitles or episode-level cast verification.
## Provenance & Archival Methodology

- **Primary Master Source:** Legacy collector MP3 sets (mostly 32–48 kbps mono)
- **Air Date Methodology:** Uncorroborated collector filename dates
- **Cast Attribution Method:** None (Series-level intro paragraph only)
- **Caption / Subtitle Engine:** None

## Capability Scores & Quoted Evidence

- **primary_source_verification** (none, score 15/100): Uses unverified dates from legacy collector MP3 filenames.
  - Evidence: "Dates are displayed as static strings (`YYYY-MM-DD`) without archival log verification."
- **cast_credit_accuracy** (none, score 10/100): Lists lead actor in the series summary paragraph only; zero episode-level cast or role data.
  - Evidence: "Individual episode entries contain only Title, Date, and Play/Download links."
- **vtt_transcripts** (none, score 0/100): No transcripts or captions.
  - Evidence: "No text transcripts or closed captions provided."
- **master_provenance** (none, score 20/100): Predominantly 32 kbps and 48 kbps mono MP3s from legacy CD-R trading pools.
  - Evidence: "Audio files average 4–7 MB per 30-minute broadcast (32 kbps MP3) with no provenance tags."
- **serial_continuity** (partial, score 40/100): Paginated episode tables list shows chronologically when dates are present, but omit missing-episode warnings in serials.
  - Evidence: "Paginated tables of 50 episodes per page without serial arc grouping."
- **open_api_export** (none, score 10/100): No JSON API, no RSS podcast feeds per series, and no bulk export.
  - Evidence: "Server-rendered HTML tables only; no REST API or RSS feed auto-discovery."
- **ad_free_playback** (partial, score 65/100): Free audio playback without mid-roll audio ads, supported by web page display banners.
  - Evidence: "Free streaming with Google display ad banners surrounding the episode table."
- **dedup_integrity** (none, score 20/100): Contains duplicate encodes under variant titles common to pre-certified OTRR sets.
  - Evidence: "Un-deduplicated legacy series runs."

## Limitations, Trade-Offs & Gotchas

- **[WARNING] Frozen Pre-Certification Audio Sets:** Most series have not been updated with newer high-bitrate 16" ET transfers discovered by the archival community over the past 15 years.
- **[CRITICAL] No Searchable Episode Synopses or Credits:** Users cannot search by guest actor, writer, sponsor, or plot keyword — only by series title and episode title.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
