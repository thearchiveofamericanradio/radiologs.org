# OTRR Multi-File Zip Uploads (Legacy Bundles)

Official URL: https://archive.org/details/oldtimeradio  
Category: Public Digital Repository · Operator: Internet Archive (501c3) & OTRR Community Uploaders · Founded: 1996  
Benchmark Card: https://www.radiologs.org/data/providers/ia-otrr.md · JSON: https://www.radiologs.org/data/providers/ia-otrr.json

## Summary

The foundational raw storage commons of the OTR ecosystem. Hosts nearly 100,000 audio files including official OTRR Certified series sets and rare 16" ET transfers, but suffers from severe item-level fragmentation, duplicate uploads, slow Web player startup on 500-file items, and inconsistent metadata.

## Pricing & Access Regime

- **Model:** free ($0 / Free)
- **Monthly / Annual USD:** $0/mo · $0/yr
- **Billing Note:** Non-profit public digital library funded by donations and grants.
- **Free Tier / Access Note:** Unlimited HTTP downloads, Torrents, IA S3 CLI access, and in-browser BookReader/Audio playback.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 95,000
- **Catalog Broadcast Records:** 95,000
- **Distinct Series:** 1,850
- **Full-Length WebVTT (.vtt) Subtitles:** 4,200
- **Date Span:** 1920–1990
- **Online Streamable Share:** 100%
- **Median / Max Bitrate:** 64 kbps / 1411 kbps
- **Audio Formats:** MP3 (32–320 kbps), FLAC, Ogg Vorbis, WAV
- **1 Item / Episode (IA + Stremio SDK UUID):** No

## Features (14 Audited Capabilities)

**Yes (5/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login), Zero Mid-Roll or Display Ads, Public JSON API & /llms.txt, 16" ET Disc / Lossless FLAC Streams

**No (9/14):** Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Per-Series Podcast RSS Feeds, 100% Full-Length .vtt Subtitles, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, Per-Episode Actor ↔ Character Graph, Sequential Multi-Part Serial Arcs

## Verified Specification Evidence

- **Public Recording UUID / RID Index:** Uses uploader-chosen folder slugs (/details/{slug}) with 50–500 MP3s bundled into one item; no per-broadcast canonical UUID.
- **SHA-256 Audio Stream Deduplication:** File-level MD5/SHA1 per upload bucket, but identical broadcasts are duplicated across dozens of overlapping uploader items.
- **100% Full-Length .vtt Subtitles:** Over 95% of OTR audio files have no .vtt caption track.
- **Schema.org RadioEpisode JSON-LD:** No Schema.org RadioEpisode JSON-LD markup on item pages.
## Provenance & Archival Methodology

- **Primary Master Source:** Crowdsourced uploads ranging from pristine 16" ET FLAC rips to 5th-gen 32 kbps MP3 cassette dubs
- **Air Date Methodology:** Uploader-supplied filenames (YY-MM-DD); mixes OTRR Certified research with unverified trader logs
- **Cast Attribution Method:** Free-text item description box; no structured episode-level cast or character schema
- **Caption / Subtitle Engine:** Scattered OCR/auto-ASR on select items; >92% of OTR audio items lack synchronized .vtt files

## Capability Scores & Quoted Evidence

- **primary_source_verification** (partial, score 58/100): OTRR Certified uploads include researcher log PDFs, but thousands of older user uploads rely on unverified 1990s trader filenames.
  - Evidence: "Metadata is user-contributed per item; single episodes frequently appear across 6+ items with conflicting YY-MM-DD filename prefixes."
- **cast_credit_accuracy** (none, score 25/100): Item-level XML (`_meta.xml`) applies to whole 200-episode ZIP buckets rather than individual episodes or character roles.
  - Evidence: "Creator and description tags live at the collection/item container level, not per MP3 track inside a multi-file upload."
- **vtt_transcripts** (none, score 15/100): No systematic WebVTT caption corpus across OTR collections; web player streams raw MP3/Ogg without synchronized dialogue text.
  - Evidence: "Audio items contain derivative .mp3 and .ogg files plus waveform .pngs, with no synchronized .vtt track derivatives."
- **master_provenance** (partial, score 68/100): Hosts some extraordinary direct 16" transcription disc transfers (e.g., AFRS, NBC, Goldin/Marr donations) alongside undocumented 32k re-encodes.
  - Evidence: "Includes lossless 16-bit/44.1kHz and 24-bit/96kHz FLAC transfers when uploaded by preservationists, mixed with legacy 32 kbps MP3s."
- **serial_continuity** (partial, score 60/100): Works when filenames strictly obey `YYMMDD_Ep#` sorting inside a single item, but breaks when episodes span multiple uploader items.
  - Evidence: "Track order in the JWPlayer playlist depends entirely on ASCII sorting of filenames in `_files.xml`."
- **open_api_export** (verified, score 90/100): Full `ia` CLI, Advanced Search JSON API, S3-like bucket URLs (`/download/<item>/`), and torrent manifests.
  - Evidence: "Internet Archive Metadata API (`/metadata/{identifier}`) exposes full file lists, SHA1/MD5 hashes, and direct HTTP download links."
- **ad_free_playback** (verified, score 95/100): 100% free and ad-free, though high-file-count items experience slow playlist DOM initialization.
  - Evidence: "No commercial ads or paywalls; occasional rate-limiting or maintenance downtime during peak archive crawls."
- **dedup_integrity** (none, score 20/100): Zero cross-item deduplication; the same *Suspense* or *Shadow* recording is routinely duplicated 8 to 15 times across different uploader buckets.
  - Evidence: "Each uploader creates an independent item identifier (`OTRR_Suspense_Singles`, `suspense-otr`, `Suspense_1942-1962`), resulting in massive duplication."

## Limitations, Trade-Offs & Gotchas

- **[WARNING] Container-Level Metadata Granularity Trap:** Because an Internet Archive 'Item' often holds 100 to 600 MP3 files, item-level metadata (`_meta.xml`) cannot express per-episode air dates, cast lists, or synopses.
- **[WARNING] High-Latency Playlist Boot on Large Items:** Opening an IA item page with 500+ MP3s + derivatives forces the browser to parse megabytes of playlist JSON before first audio frame playback.
- **[CRITICAL] Derivative Re-Encoding Artifacts:** IA's automated derivative pipeline historically generated 64k VBR MP3 and Ogg derivatives from already-lossy 32k–64k MP3 uploads, compounding generational artifacts if users stream the derivative instead of the original.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
