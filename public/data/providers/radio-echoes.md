# Radio Echoes

Official URL: https://www.radioechoes.com  
Category: Collector Streamer / Mirror · Operator: Radio Echoes Collector Archive · Founded: 2012  
Benchmark Card: https://www.radiologs.org/data/providers/radio-echoes.md · JSON: https://www.radiologs.org/data/providers/radio-echoes.json

## Summary

One of the largest independent collector-run OTR streaming sites, notable for its massive 92,000+ file count and rare Australian, British, and South African serials. However, it lacks synchronized `.vtt` transcripts, per-episode cast/character mapping, and primary newspaper date citations.

## Pricing & Access Regime

- **Model:** free ($0 / Free)
- **Monthly / Annual USD:** $0/mo · $0/yr
- **Billing Note:** Free collector-hosted web streaming and MP3 downloads.
- **Free Tier / Access Note:** Full access to ~92,000 MP3 files across 2,100+ series.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 127,000
- **Catalog Broadcast Records:** 127,000
- **Distinct Series:** 2,150
- **Full-Length WebVTT (.vtt) Subtitles:** 0
- **Date Span:** 1926–1988
- **Online Streamable Share:** 100%
- **Median / Max Bitrate:** 56 kbps / 128 kbps
- **Audio Formats:** MP3 (24–128 kbps)
- **1 Item / Episode (IA + Stremio SDK UUID):** No

## Features (14 Audited Capabilities)

**Yes (4/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login), Zero Mid-Roll or Display Ads, Sequential Multi-Part Serial Arcs

**No (10/14):** Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Per-Series Podcast RSS Feeds, Public JSON API & /llms.txt, 100% Full-Length .vtt Subtitles, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, Per-Episode Actor ↔ Character Graph, 16" ET Disc / Lossless FLAC Streams

## Verified Specification Evidence

- **SHA-256 Audio Stream Deduplication:** No cryptographic stream deduplication; duplicate and mislabeled trader episodes appear across series.
- **100% Full-Length .vtt Subtitles:** Zero .vtt caption tracks across 127,000+ MP3 files.
- **Schema.org RadioEpisode JSON-LD:** Zero Schema.org JSON-LD markup or canonical recording UUIDs.
## Provenance & Archival Methodology

- **Primary Master Source:** Aggregated collector hard drives including US, UK, Australian, and South African OTR transfers
- **Air Date Methodology:** Collector filename dates (`YYYY-MM-DD`); mixes researched logs with unverified trader estimates
- **Cast Attribution Method:** Series-level description only; no structured episode-level cast or character roles
- **Caption / Subtitle Engine:** None

## Capability Scores & Quoted Evidence

- **primary_source_verification** (partial, score 45/100): Relies on collector MP3 filename dates without primary newspaper radio log citations.
  - Evidence: "Dates are populated from collector file-naming conventions without primary source verification badges."
- **cast_credit_accuracy** (none, score 20/100): Series header blurbs mention main stars, but individual episode rows lack cast or character credits.
  - Evidence: "Episode rows display only date, episode number, title, duration, and MP3 play/download controls."
- **vtt_transcripts** (none, score 0/100): Zero WebVTT transcripts or searchable spoken dialogue.
  - Evidence: "No closed captions or transcripts available."
- **master_provenance** (partial, score 48/100): Wide variance in audio quality: some rare 128k collector rips sit beside muffled 24–32 kbps multi-gen cassette transfers.
  - Evidence: "Aggregates disparate collector sets without transfer lineage or bitrate floor enforcement."
- **serial_continuity** (verified, score 80/100): Strong coverage of long-running Australian/UK/US multi-part serials (e.g., *Speed Gibson*, *Tarzan*, *2000 Plus*) in sequential order.
  - Evidence: "Preserves sequential episode numbering across multi-hundred-episode Commonwealth and US serials."
- **open_api_export** (none, score 20/100): Direct single-file MP3 download links, but no public JSON API, no RSS feeds, and AJAX-paginated DOM tables.
  - Evidence: "Uses client-side paginated HTML views without a documented REST API or podcast RSS feeds."
- **ad_free_playback** (verified, score 90/100): Free, ad-free playback and direct MP3 downloads.
  - Evidence: "Free streaming and downloading with no subscription paywall or mid-roll ads."
- **dedup_integrity** (partial, score 50/100): Organized into one page per series, but retains unverified 'aka' duplicate episodes within uncertified series.
  - Evidence: "Single series page structure reduces container sprawl, though internal duplicate encodes persist."

## Limitations, Trade-Offs & Gotchas

- **[WARNING] Zero Episode Synopses or Cast Credits on 90%+ of Catalog:** Most episodes show only a bare title and date string, making it impossible to verify actors, characters, or plot details without listening.
- **[WARNING] No Transcripts, RSS Feeds, or Programmatic API:** Cannot subscribe to series in a podcast player or query metadata via JSON.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
