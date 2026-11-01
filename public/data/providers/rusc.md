# RUSC (Radio U S C)

Official URL: https://www.rusc.com  
Category: Commercial Subscription · Operator: RUSC Entertainment (Joy & Ned) · Founded: 1999  
Benchmark Card: https://www.radiologs.org/data/providers/rusc.md · JSON: https://www.radiologs.org/data/providers/rusc.json

## Summary

Long-running commercial OTR membership site with warm community curation, themed playlists (Christmas, Detective, Sci-Fi), and editorial synopses. However, it paywalls public-domain recordings, compresses audio to low bitrates (32–64 kbps), and lacks transcripts or primary archival citations.

## Pricing & Access Regime

- **Model:** subscription ($7.95/mo ($59.95/yr))
- **Monthly / Annual USD:** $7.95/mo · $59.95/yr
- **Billing Note:** Recurring commercial subscription required for full streaming and MP3 downloads ($4.99/mo billed annually).
- **Free Tier / Access Note:** Small rotating sample of free introductory shows; full 35,000+ catalog is behind a subscriber login wall.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 35,000
- **Catalog Broadcast Records:** 35,000
- **Distinct Series:** 620
- **Full-Length WebVTT (.vtt) Subtitles:** 0
- **Date Span:** 1930–1962
- **Online Streamable Share:** 100%
- **Median / Max Bitrate:** 48 kbps / 64 kbps
- **Audio Formats:** MP3 (32–64 kbps Mono)
- **1 Item / Episode (IA + Stremio SDK UUID):** No

## Features (14 Audited Capabilities)

**Yes (2/14):** Zero Mid-Roll or Display Ads, Sequential Multi-Part Serial Arcs

**No (12/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login), Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Per-Series Podcast RSS Feeds, Public JSON API & /llms.txt, 100% Full-Length .vtt Subtitles, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, Per-Episode Actor ↔ Character Graph, 16" ET Disc / Lossless FLAC Streams

## Verified Specification Evidence

- **100% Free Catalog ($0/mo):** Requires paid subscription ($6.95/mo or $59.95/yr) to stream or download full catalog.
- **16" ET Disc / Lossless FLAC Streams:** Files are uniformly down-sampled to 32–56 kbps mono MP3 (22.05 kHz); no FLAC or high-bitrate 16" ET masters.
- **100% Full-Length .vtt Subtitles:** Zero .vtt subtitle tracks.
## Provenance & Archival Methodology

- **Primary Master Source:** Legacy collector sets & OTRR public-domain transfers normalized to compact 32–64 kbps mono MP3
- **Air Date Methodology:** Collector log dates imported from legacy OTR databases without primary newspaper citations
- **Cast Attribution Method:** Series-level star tags and editorial blurbs; rare supporting actors omitted
- **Caption / Subtitle Engine:** None (No synchronized .vtt transcripts)

## Capability Scores & Quoted Evidence

- **primary_source_verification** (none, score 30/100): Air dates are inherited from 1990s/2000s collector logs without newspaper radio log citations or corrections for stride-projected soaps.
  - Evidence: "Displays a single date string per show entry with no citation to newspaper logs, network ledgers, or disc matrix numbers."
- **cast_credit_accuracy** (partial, score 45/100): Links shows to headline stars (e.g., Orson Welles, Vincent Price, Bob Bailey) but lacks verified episode-level character-to-actor mappings.
  - Evidence: "Search by Star groups episodes by main series lead or notable guest star rather than full per-episode cast & character rosters."
- **vtt_transcripts** (none, score 0/100): Zero WebVTT captions or full-text transcripts.
  - Evidence: "Provides a short 1–3 sentence editorial description per episode; no spoken dialogue transcription."
- **master_provenance** (none, score 25/100): Files are standardized at low bitrates (typically 32–56 kbps mono MP3) originally chosen for dial-up/early broadband downloads, with no source lineage.
  - Evidence: "Audio files are optimized for small file size (5–12 MB per 30-minute show) with no transfer source or disc provenance metadata."
- **serial_continuity** (partial, score 68/100): Editorial playlists group some serial runs together, and chronological series tables help listeners follow multi-part stories.
  - Evidence: "Curated playlists and series pages list episodes by episode number and date for sequential listening."
- **open_api_export** (none, score 5/100): Proprietary authenticated session wall; no public JSON API, no `/llms.txt`, and no bulk export.
  - Evidence: "Requires active member authentication cookie for MP3 download/stream links; no public developer API."
- **ad_free_playback** (partial, score 55/100): Ad-free inside the player, but requires a $7.95/mo ($59.95/yr) paid subscription to access public-domain broadcasts.
  - Evidence: "Unlimited access to listen to or download over 35,000 old time radio shows requires a paid RUSC membership."
- **dedup_integrity** (partial, score 55/100): Manual editorial curation removes obvious broken duplicates within a series, though legacy date/title aliases remain.
  - Evidence: "Catalog is manually maintained as a single list per series without cryptographic digest tracking."

## Limitations, Trade-Offs & Gotchas

- **[CRITICAL] Paywall Over Public-Domain Collector Transfers:** Charges $7.95/mo ($59.95/yr) for recordings that largely originate from volunteer public-domain OTRR and collector preservation efforts available free on RadioIndex and Internet Archive.
- **[WARNING] Dial-Up Era Audio Bitrate Ceiling (32–64 kbps):** Many files remain encoded at legacy 32–56 kbps mono MP3 with steep 4.5 kHz low-pass filtering, discarding high-frequency lacquer fidelity.
- **[WARNING] Zero Programmatic or Agent Access:** Closed behind member session cookies with no public RSS feeds per series, no JSON endpoints, and no transcripts.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
