# Stupid Potato Old Time Radio

Official URL: https://www.stupidpotato.com  
Category: Collector Streamer / Mirror · Operator: Independent Hobbyist Portal · Founded: 2008  
Benchmark Card: https://www.radiologs.org/data/providers/stupid-potato.md · JSON: https://www.radiologs.org/data/providers/stupid-potato.json

## Summary

Casual hobbyist web directory offering quick click-to-play access to popular detective, horror, and comedy OTR shows. Convenient for casual sampling, but relies entirely on unverified filename metadata, low-bitrate MP3s, zero cast credits, and zero transcripts.

## Pricing & Access Regime

- **Model:** ad-supported ($0 (Ad-Supported))
- **Monthly / Annual USD:** $0/mo · $0/yr
- **Billing Note:** Free web access supported by display ads and affiliate links.
- **Free Tier / Access Note:** Instant browser playback of listed series; no account required.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 17,108
- **Catalog Broadcast Records:** 18,200
- **Distinct Series:** 240
- **Full-Length WebVTT (.vtt) Subtitles:** 0
- **Date Span:** 1935–1960
- **Online Streamable Share:** 94%
- **Median / Max Bitrate:** 32 kbps / 64 kbps
- **Audio Formats:** MP3 (24–64 kbps)
- **1 Item / Episode (IA + Stremio SDK UUID):** No

## Features (14 Audited Capabilities)

**Yes (2/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login)

**No (12/14):** Zero Mid-Roll or Display Ads, Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Per-Series Podcast RSS Feeds, Public JSON API & /llms.txt, 100% Full-Length .vtt Subtitles, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, Per-Episode Actor ↔ Character Graph, 16" ET Disc / Lossless FLAC Streams, Sequential Multi-Part Serial Arcs

## Verified Specification Evidence

- **16" ET Disc / Lossless FLAC Streams:** Serves 24–32 kbps legacy MP3 transcodes only.
- **100% Full-Length .vtt Subtitles:** Zero .vtt subtitles, zero cast credits, and zero newspaper log citations.
- **Public Recording UUID / RID Index:** Static HTML links to raw MP3 filenames; no recording UUIDs or API.
## Provenance & Archival Methodology

- **Primary Master Source:** Unattributed mirror of early-2000s MP3 trading discs and IA hotlinks
- **Air Date Methodology:** Parsed directly from raw MP3 filenames without verification
- **Cast Attribution Method:** None (Series blurb only)
- **Caption / Subtitle Engine:** None

## Capability Scores & Quoted Evidence

- **primary_source_verification** (none, score 12/100): Dates are scraped directly from legacy MP3 filenames with zero newspaper log or recording verification.
  - Evidence: "Episode lists render raw YY-MM-DD filename tokens directly as broadcast dates, propagating every legacy trader error."
- **cast_credit_accuracy** (none, score 10/100): No per-episode cast, writer, announcer, or character role data.
  - Evidence: "Only static series-level overview text is provided; individual episode rows show title and filename date only."
- **vtt_transcripts** (none, score 0/100): No captions, transcripts, or searchable spoken text.
  - Evidence: "Audio-only HTML5 `<audio>` tag embeds with zero text track elements."
- **master_provenance** (none, score 15/100): Low-bitrate 24–64 kbps MP3s with stripped ID3 provenance and occasional dead mirror links.
  - Evidence: "Streams unattributed low-bitrate MP3 encodes inherited from early 2000s CD-ROM trading sets."
- **serial_continuity** (none, score 25/100): Missing episodes and inconsistent naming frequently break multi-part serial story arcs.
  - Evidence: "Multi-part serials suffer from missing intermediate chapters and inconsistent filename numbering."
- **open_api_export** (none, score 10/100): Static HTML pages only; no JSON API, no `/llms.txt`, and no structured RSS feeds.
  - Evidence: "Legacy HTML directory structure with no machine-readable API or schema.org Dataset markup."
- **ad_free_playback** (partial, score 60/100): No subscription paywall, but pages carry display advertising and occasional broken external audio embeds.
  - Evidence: "Free browser streaming supported by page banner ads."
- **dedup_integrity** (none, score 15/100): Duplicate episodes with variant trader titles appear as separate broadcasts.
  - Evidence: "No audio fingerprinting or canonical broadcast reconciliation."

## Limitations, Trade-Offs & Gotchas

- **[CRITICAL] Zero Metadata Beyond Raw Filename Strings:** Provides no episode synopses, no cast/character credits, no sponsor logs, and no source provenance — just a bare list of MP3 links.
- **[WARNING] 6% Link Rot & Unbuffered External Mirrors:** Several older series pages hotlink to moved or throttled third-party storage buckets, resulting in stalled audio players.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
