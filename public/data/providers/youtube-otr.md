# YouTube — Unofficial OTR Channels

Official URL: https://www.youtube.com/results?search_query=old+time+radio  
Category: Ad-Supported Video Platform · Operator: Google / Alphabet + Hundreds of Unaffiliated Uploaders · Founded: 2005  
Benchmark Card: https://www.radiologs.org/data/providers/youtube-otr.md · JSON: https://www.radiologs.org/data/providers/youtube-otr.json

## Summary

Thousands of OTR episodes are uploaded to unofficial YouTube 'sleep/relaxation' and mystery channels. While YouTube's global CDN offers low initial latency, the experience is plagued by loud mid-roll ads interrupting quiet dramatic scenes, clickbait/invented titles that strip real air dates, and zero archival provenance.

## Pricing & Access Regime

- **Model:** freemium ($0 w/ Ads ($13.99/mo Premium))
- **Monthly / Annual USD:** $13.99/mo · $139.99/yr
- **Billing Note:** Free tier injects jarring mid-roll video ads every 6–10 minutes unless paying $13.99/mo for YouTube Premium.
- **Free Tier / Access Note:** Ad-supported streaming with mid-roll interruptions and locked screen playback restrictions on mobile.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 45,000
- **Catalog Broadcast Records:** 45,000
- **Distinct Series:** 890
- **Full-Length WebVTT (.vtt) Subtitles:** 0
- **Date Span:** 1930–1982
- **Online Streamable Share:** 100%
- **Median / Max Bitrate:** 96 kbps / 128 kbps
- **Audio Formats:** Opus / AAC inside MP4/WebM Video Container
- **1 Item / Episode (IA + Stremio SDK UUID):** No

## Features (14 Audited Capabilities)

**Yes (2/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login)

**No (12/14):** Zero Mid-Roll or Display Ads, Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Per-Series Podcast RSS Feeds, Public JSON API & /llms.txt, 100% Full-Length .vtt Subtitles, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, Per-Episode Actor ↔ Character Graph, 16" ET Disc / Lossless FLAC Streams, Sequential Multi-Part Serial Arcs

## Verified Specification Evidence

- **Zero Mid-Roll or Display Ads:** Injects loud programmatic pre-roll and mid-roll video ads unless paying $13.99/mo ($167.88/yr) for YouTube Premium.
## Provenance & Archival Methodology

- **Primary Master Source:** Re-encoded collector MP3s muxed with AI-generated static images and heavy loudness normalization
- **Air Date Methodology:** Rampant clickbait/AI-invented dates or stripped dates ('RARE Episode You Never Heard!')
- **Cast Attribution Method:** Rarely credited; often hallucinates famous actors in clickbait thumbnails
- **Caption / Subtitle Engine:** YouTube Auto-ASR (low accuracy on 1940s transatlantic dialects & vintage sponsor names)

## Capability Scores & Quoted Evidence

- **primary_source_verification** (none, score 8/100): Uploaders routinely strip real air dates and original episode titles in favor of clickbait titles to game recommendation algorithms.
  - Evidence: "Channels frequently rename canonical broadcasts to 'Chilling 1940s Detective Mystery!' to prevent viewers from realizing they've already heard it."
- **cast_credit_accuracy** (none, score 10/100): Thumbnails frequently paste photos of Humphrey Bogart, Orson Welles, or Vincent Price onto episodes in which they never appeared.
  - Evidence: "AI-generated thumbnails and video titles routinely misattribute series stars for clickthrough rate."
- **vtt_transcripts** (partial, score 48/100): YouTube auto-captions exist on most uploads, but lack punctuation, speaker separation, and proper-noun accuracy for 1930s–1950s radio.
  - Evidence: "Automated YouTube ASR captions are available via the CC button, though unedited and prone to period-name mistranscriptions."
- **master_provenance** (none, score 15/100): Audio is typically a 32–64k collector MP3 re-compressed through video editing software, brick-walled with heavy compression, and re-encoded by YouTube.
  - Evidence: "Multiple lossy transcode generations (MP3 → AAC video render → YouTube Opus/AAC) plus aggressive dynamic range compression."
- **serial_continuity** (none, score 15/100): Algorithmic autoplay shuffles unrelated shows and breaks multi-part serial story arcs.
  - Evidence: "YouTube's recommendation sidebar and autoplay queue prioritize engagement metrics over chronological broadcast sequence."
- **open_api_export** (none, score 15/100): YouTube Data API v3 is strictly quota-capped, prohibits audio downloading in ToS, and offers no OTR relational schema.
  - Evidence: "YouTube Terms of Service prohibit direct audio stream extraction or bulk archival mirroring."
- **ad_free_playback** (none, score 10/100): Monetized channels insert loud modern video ads every 6–10 minutes right in the middle of 1940s radio dramas unless paying $13.99/mo.
  - Evidence: "Mid-roll ad breaks at +0 dBFS interrupt quiet vintage broadcasts unless the listener subscribes to YouTube Premium ($13.99/mo)."
- **dedup_integrity** (none, score 5/100): The same 500 popular episodes of *CBSRMT*, *Suspense*, and *Yours Truly Johnny Dollar* are re-uploaded hundreds of times under disguised titles.
  - Evidence: "Massive duplication across '8-Hour Old Time Radio Sleep' compilation videos with zero canonical broadcast IDs."

## Limitations, Trade-Offs & Gotchas

- **[CRITICAL] Loud Mid-Roll Ads Spliced Into Quiet 1940s Drama Scenes:** Unless you pay $13.99/mo ($139.99/yr) for YouTube Premium, modern high-LUFS commercials blast at random intervals during suspenseful scenes.
- **[CRITICAL] Deliberate Title & Air Date Obfuscation:** Many monetized OTR channels intentionally delete the real broadcast date and episode title so listeners cannot tell it is a re-upload.
- **[WARNING] Mobile Background Playback Paywalled:** Turning off your phone screen to listen to a radio show stops playback on mobile unless paying for YouTube Premium.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
