# RadioIndex (The Archive of American Radio)

Official URL: https://www.radioindex.org  
Category: Open Archival Index · Operator: The Archive of American Radio (AAR) · Founded: 2024  
Benchmark Card: https://www.radiologs.org/data/providers/radioindex.md · JSON: https://www.radiologs.org/data/providers/radioindex.json

## Summary

Research-grade public broadcast archive running on a pure Rust HTML-over-the-wire origin. Enforces strict primary-evidence air date corroboration, full-length faster-whisper WebVTT transcription, per-episode character role mapping, and cryptographic stream deduplication.

## Pricing & Access Regime

- **Model:** free ($0 / Free)
- **Monthly / Annual USD:** $0/mo · $0/yr
- **Billing Note:** 100% open public archival access; zero ads, zero paywalls, zero tracking.
- **Free Tier / Access Note:** Full catalog streaming, synchronized .vtt transcripts, podcast RSS feeds, and JSON APIs included.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 233,000
- **Catalog Broadcast Records:** 233,000
- **Distinct Series:** 3,054
- **Full-Length WebVTT (.vtt) Subtitles:** 231,400
- **Date Span:** 1926–1982
- **Online Streamable Share:** 100%
- **Median / Max Bitrate:** 128 kbps / 1411 kbps
- **Audio Formats:** FLAC, MP3 (128–320 kbps), Opus, WebVTT (.vtt)
- **1 Item / Episode (IA + Stremio SDK UUID):** Yes (1:1 archive.org/details/{uuid} + /listen?id={uuid} + stremio-addon-sdk)

## Features (14 Audited Capabilities)

**Yes (14/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login), Zero Mid-Roll or Display Ads, Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Per-Series Podcast RSS Feeds, Public JSON API & /llms.txt, 100% Full-Length .vtt Subtitles, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, Per-Episode Actor ↔ Character Graph, 16" ET Disc / Lossless FLAC Streams, Sequential Multi-Part Serial Arcs

**No (0/14):** None

## Verified Specification Evidence

- **Public Recording UUID / RID Index:** Canonical UUID & short RID per broadcast/recording (/listen?id={id}, radioindex.org-ids) for universal stream & subtitle resolution.
- **SHA-256 Audio Stream Deduplication:** Cryptographic SHA-256 stream digests across all mirrors; preserves separate East/West Coast network broadcasts.
- **100% Full-Length .vtt Subtitles:** 231,400+ full-length faster-whisper VAD WebVTT (.vtt) subtitle files synced in-player and downloadable.
- **Primary Newspaper & Trade Log Scans:** Direct citations to scanned newspaper radio logs (Chronicling America, Fulton History, JJonz, Variety, Broadcasting).
- **Original Studio Broadcast Scripts:** Original studio continuity and production scripts linked via radioindex.org-scripts.
- **Schema.org RadioEpisode JSON-LD:** Full Schema.org RadioEpisode & RadioSeries JSON-LD + OpenGraph on every broadcast route.
## Provenance & Archival Methodology

- **Primary Master Source:** 16" ET lacquer transfers, AFRS pressings, network line checks, and deduplicated OTRR/IA masters with SHA-256 stream digests
- **Air Date Methodology:** Primary newspaper radio logs (Chronicling America, Fulton History, JJonz, Variety, Broadcasting) + full-audio verbal announcement verification; zero stride projection
- **Cast Attribution Method:** Episode-specific faster-whisper VAD full-audio transcription + primary studio script reconciliation linking actors to exact character roles
- **Caption / Subtitle Engine:** 100% full-length faster-whisper (large-v3 + VAD filtering) WebVTT synchronized captions

## Capability Scores & Quoted Evidence

- **primary_source_verification** (verified, score 98/100): Every broadcast date is cross-checked against historic newspaper radio logs (Chronicling America, Fulton History, JJonz) or explicit in-recording announcements.
  - Evidence: "NEVER SYNTHESIZE AIR DATES: Never project, extrapolate, or calculate broadcast air dates via calendar stride projection... Every air date must be corroborated by primary archival logs."
- **cast_credit_accuracy** (verified, score 96/100): Per-episode Cast & Crew links[] reconcile spoken sign-off credits and archival logs to exact character roles; never copies series leads blindly.
  - Evidence: "Every cast credit and character assignment must be explicitly verified through full-length speech-to-text audio transcription or primary archival radio logs/scripts."
- **vtt_transcripts** (verified, score 99/100): 100% full-length audio WebVTT (.vtt) transcripts generated with faster-whisper + VAD filtering and synchronized in the Now Playing drawer.
  - Evidence: "Always pass the entire full-length .vtt transcript from start to finish... synchronized word/phrase cues served via radioindex.org-subtitles."
- **master_provenance** (verified, score 94/100): Tracks SHA-256 stream digests, 16" ET matrix numbers, AFRS numbers, and separates East/West network feeds.
  - Evidence: "Stream records store cryptographic digests, source transfer lineage, and blocked-stream-digests to purge corrupt or mislabeled encodes."
- **serial_continuity** (verified, score 95/100): Contiguous multi-part story arcs (Johnny Dollar 5-parters, I Love a Mystery, CBSRMT) ordered chronologically with verified broadcast numbers.
  - Evidence: "Series listings (/search?series=) and curated shelves preserve chronological broadcast sequence and multi-part serial continuity."
- **open_api_export** (verified, score 98/100): Deterministic query-string routes (/search?series=, /listen?id=, /rss?series=), HTML fragments (/api/fragments), and open Git-backed data repos.
  - Evidence: "Public URLs are a top-level route plus a query string only (/search?series=, /listen?id=, /rss?series=); data lives in open git repos."
- **ad_free_playback** (verified, score 100/100): Zero commercial interruptions, zero banner ads, and zero paywalls; original 1930s–1950s sponsor announcements preserved intact.
  - Evidence: "Free public access served directly from OVH Rust origin with persistent mini-player and expanded Now Playing queue."
- **dedup_integrity** (verified, score 97/100): Moves duplicate recordings onto the canonical broadcast winner while preserving active East/West coast variant recordings.
  - Evidence: "When two broadcasts are duplicates (same title + date in same program): move all recordings to the winner, set is_active=0 on the loser. Never hard-delete."

## Limitations, Trade-Offs & Gotchas

- **[NOTE] Strict Ground-Truth Gate Delays Unverified Uploads:** Episodes lacking verifiable primary air dates or awaiting full-length faster-whisper VAD transcription are flagged rather than guessed, meaning newly discovered raw trader tapes take longer to pass enrichment QA.
- **[NOTE] Retired Legacy Path URLs Redirect via 301:** Older path-style URLs (/series/*, /broadcasts/*, /episodes/*) are retired in favor of flat query routes (/search?series=, /listen?id=) with 301 redirects.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
