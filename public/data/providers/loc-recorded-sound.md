# Library of Congress — Recorded Sound Research Center

Official URL: https://www.loc.gov/audio/  
Category: Institutional Sound Archive · Operator: U.S. Library of Congress (Packard Campus / NAVCC) · Founded: 1928  
Benchmark Card: https://www.radiologs.org/data/providers/loc-recorded-sound.md · JSON: https://www.radiologs.org/data/providers/loc-recorded-sound.json

## Summary

The ultimate physical vault of American broadcast history at the Packard Campus (Culpeper, VA), holding the original NBC Radio Collection, AFRS masters, and CBS deposits. Unrivaled primary provenance, but only ~9% of its radio holdings are streamable online without visiting the Recorded Sound Research Center in person.

## Pricing & Access Regime

- **Model:** institutional ($0 (Public / On-Site))
- **Monthly / Annual USD:** $0/mo · $0/yr
- **Billing Note:** Federal public institution; online digital collections are free, but 90% of holdings require on-site Madison Building listening.
- **Free Tier / Access Note:** ~14,000 digitized radio/recorded sound items streamable online; 150,000+ physical discs require Washington D.C. appointment.

## Catalog & Technical Metrics (Audited 2026-11-01)

- **Playable Broadcasts:** 13,500
- **Catalog Broadcast Records:** 150,000
- **Distinct Series:** 3,200
- **Full-Length WebVTT (.vtt) Subtitles:** 580
- **Date Span:** 1924–1975
- **Online Streamable Share:** 9%
- **Median / Max Bitrate:** 256 kbps / 4608 kbps
- **Audio Formats:** WAV (24-bit/96kHz Archival), MP3 (128–256 kbps Online), FLAC
- **1 Item / Episode (IA + Stremio SDK UUID):** No

## Features (14 Audited Capabilities)

**Yes (8/14):** 100% Free Catalog ($0/mo), Instant Play (No Account Login), Zero Mid-Roll or Display Ads, Public JSON API & /llms.txt, Primary Newspaper & Trade Log Scans, Original Studio Broadcast Scripts, Per-Episode Actor ↔ Character Graph, 16" ET Disc / Lossless FLAC Streams

**No (6/14):** Public Recording UUID / RID Index, SHA-256 Audio Stream Deduplication, Schema.org RadioEpisode JSON-LD, Per-Series Podcast RSS Feeds, 100% Full-Length .vtt Subtitles, Sequential Multi-Part Serial Arcs

## Verified Specification Evidence

- **100% Free Catalog ($0/mo):** 91% of the 52,000 cataloged NBC/AFRS discs require an in-person appointment at the Packard Campus / Madison Building reading room; ~4,800 stream online.
## Provenance & Archival Methodology

- **Primary Master Source:** Original NBC Radio Collection 16" lacquer discs, AFRS master library, CBS/WOR/MBS archival deposits
- **Air Date Methodology:** Primary network master control cards, copyright deposits, and Chronicling America newspaper archive
- **Cast Attribution Method:** MARC/MODS catalog records transcribed from NBC master index cards and disc labels
- **Caption / Subtitle Engine:** Select items only (American Archive of Public Broadcasting integration)

## Capability Scores & Quoted Evidence

- **primary_source_verification** (verified, score 100/100): Gold-standard primary network master cards, studio control logs, and the Chronicling America historic newspaper database.
  - Evidence: "Cataloged directly from NBC master index cards, physical 16-inch lacquer labels, and copyright deposit ledgers."
- **cast_credit_accuracy** (partial, score 78/100): MARC catalog records list principal performers and speakers from studio cards, though dramatic character names are often omitted.
  - Evidence: "MARC 511 (Participant or Performer Note) records principal cast and speakers documented on studio index cards."
- **vtt_transcripts** (none, score 18/100): Most digitized radio broadcasts lack synchronized WebVTT captions, outside of special exhibits.
  - Evidence: "Online audio items stream via the LOC media player without universal WebVTT caption tracks."
- **master_provenance** (verified, score 100/100): First-generation physical 16" 33⅓ RPM glass/aluminum-base lacquer discs and network master reels preserved in climate-controlled vaults.
  - Evidence: "Preserves the original NBC Collection of over 150,000 16-inch lacquer transcription discs at the Packard Campus."
- **serial_continuity** (partial, score 65/100): SONIC catalog orders holdings chronologically by shelf/matrix number, but online availability is fragmentary.
  - Evidence: "Searchable via the SONIC (Sound Online Inventory and Catalog) database by date and call number."
- **open_api_export** (verified, score 85/100): Every `loc.gov` item and search supports `?fo=json` REST responses and IIIF/MODS metadata.
  - Evidence: "The loc.gov JSON API (`?fo=json`) provides programmatic access to catalog records and digital asset URLs."
- **ad_free_playback** (partial, score 70/100): 100% ad-free and free of charge, but >90% of broadcasts are blocked from remote internet streaming due to rights restrictions.
  - Evidence: "Due to copyright and donor restrictions, most NBC and AFRS recordings may only be listened to on-site in the Recorded Sound Research Center."
- **dedup_integrity** (verified, score 96/100): Each physical disc pressing, safety reel, and East/West feed has a distinct shelfmark and matrix number.
  - Evidence: "Library of Congress call numbers and matrix identifiers uniquely distinguish every physical lacquer side."

## Limitations, Trade-Offs & Gotchas

- **[CRITICAL] 91% of Radio Holdings Require In-Person D.C. Reading Room Visit:** Because pre-1972 sound recordings and underlying dramatic scripts have complex rights layers, the vast majority of the NBC and AFRS collections cannot be streamed from home.
- **[NOTE] SONIC Catalog vs. Digital Audio Split:** Finding a record in the SONIC inventory (`sonic.loc.gov`) usually returns a physical shelf number (`RWA / LWO`) rather than a playable audio stream.

---
*Audited by [radio logs](https://www.radiologs.org/) — Built by [The Archive of American Radio (radioindex.org)](https://www.radioindex.org/). Held to the same primary-evidence audit rules across all 22 platforms.*
