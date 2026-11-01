# OTRRlib.org (Old Time Radio Researchers Library)

Official URL: https://www.otrrlib.org  
Category: Public Digital Repository · Operator: Old Time Radio Researchers Group (Volunteer Non-Profit) · Founded: 2003  
Benchmark Card: https://www.radiologs.org/data/providers/otrrlib.md · JSON: https://www.radiologs.org/data/providers/otrrlib.json

## Summary

The direct HTTP distribution server of the Old Time Radio Researchers (OTRR) group. Famous for its 'Certified' series projects where volunteers audit missing episodes and upgrade sound quality, though its bare-bones 1990s HTML directory interface lacks modern search, synchronized transcripts, and relational cast APIs.

## Pricing & Access Regime

- **Model:** free ($0 / Free)
- **Monthly / Annual USD:** $0/mo · $0/yr
- **Billing Note:** 100% volunteer-run, donation-supported archival file server.
- **Free Tier / Access Note:** Unrestricted direct HTTP MP3 downloads and reference magazine PDFs.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 68,500
- **Catalog Broadcast Records:** 68,500
- **Distinct Series:** 1,120
- **Full-Length WebVTT (.vtt) Subtitles:** 0
- **Date Span:** 1928–1982
- **Online Streamable Share:** 100%
- **Median / Max Bitrate:** 96 kbps / 256 kbps
- **Audio Formats:** MP3 (32–192 kbps), PDF Logs, JPG Covers
- **1 Item / Episode (IA + Stremio SDK UUID):** No

## Features (14 Audited Capabilities)

**Yes (7/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login), Zero Mid-Roll or Display Ads, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, 16" ET Disc / Lossless FLAC Streams, Sequential Multi-Part Serial Arcs

**No (7/14):** Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Per-Series Podcast RSS Feeds, Public JSON API & /llms.txt, 100% Full-Length .vtt Subtitles, Per-Episode Actor ↔ Character Graph

## Verified Specification Evidence

- **Public Recording UUID / RID Index:** Files are addressed by mutable filename strings (e.g. SERIES_YY-MM-DD_ep_title.mp3) rather than permanent recording UUIDs.
- **100% Full-Length .vtt Subtitles:** Zero synchronized .vtt caption tracks hosted.
- **Schema.org RadioEpisode JSON-LD:** Legacy static HTML directory tables with zero Schema.org JSON-LD or OpenGraph tags.
## Provenance & Archival Methodology

- **Primary Master Source:** Community-pooled transcription disc transfers, reel-to-reel upgrades, and OTRR Certified series sets
- **Air Date Methodology:** Volunteer researcher logs cross-checked against trade publications for Certified sets; legacy sets retain collector dates
- **Cast Attribution Method:** Companion HTML/PDF series logs list cast for select series, not embedded in a queryable web API
- **Caption / Subtitle Engine:** None (No .vtt transcripts)

## Capability Scores & Quoted Evidence

- **primary_source_verification** (partial, score 76/100): OTRR Certified sets undergo rigorous volunteer log auditing, though uncertified series folders still carry legacy collector dates.
  - Evidence: "Certified Series sets include an Introduction & Log PDF documenting known broadcast dates and missing episodes."
- **cast_credit_accuracy** (partial, score 52/100): Detailed cast lists exist in separate companion PDF/Excel logs on `otrr.org`, but are not linked to audio playback on `otrrlib.org`.
  - Evidence: "Audio files on otrrlib.org are served via flat directory tables without inline cast/character records."
- **vtt_transcripts** (none, score 5/100): No synchronized WebVTT transcripts; a small number of scanned PDF scripts exist in the separate reference library.
  - Evidence: "No `.vtt` or `.srt` timed text tracks accompany the MP3 distribution folders."
- **master_provenance** (partial, score 74/100): Actively replaces muddy encodes with higher-generation transcription disc rips when donated by members.
  - Evidence: "Upgrade alerts track higher-bitrate replacements from 16-inch transcription discs and reel-to-reel tapes."
- **serial_continuity** (verified, score 82/100): Strict `Series_YY-MM-DD_Ep#_Title.mp3` naming convention keeps multi-part serials in accurate sequential order.
  - Evidence: "Standardized OTRR file-naming specification guarantees chronological and episode-number ordering."
- **open_api_export** (partial, score 65/100): Predictable direct HTTP directory paths allow `wget`/`curl` mirroring, but no JSON API, RSS feeds, or `/llms.txt`.
  - Evidence: "Open HTTP file paths (`/ia2/...`) suitable for batch downloaders, without a structured JSON query API."
- **ad_free_playback** (verified, score 92/100): 100% free and ad-free community service.
  - Evidence: "Maintained by volunteer donations with zero commercial advertising."
- **dedup_integrity** (verified, score 84/100): OTRR verification teams actively hunt down 'aka' title aliases and wrongly dated duplicates within each certified series.
  - Evidence: "Series coordinators audit 'AKA' titles and purge mislabeled episodes from certified releases."

## Limitations, Trade-Offs & Gotchas

- **[WARNING] Legacy Frame/Table UI With Zero Full-Text Search:** Navigating requires clicking alphabetically through nested HTML tables; there is no unified search bar for episode plots, actors, or dialogue.
- **[NOTE] Split Between Audio Server (`otrrlib.org`) and Metadata (`otrr.org`):** Historical magazines, scripts, and research logs live on separate sub-sites rather than being unified on a single broadcast resource page.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
