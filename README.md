# RadioLogs (`radiologs.org`)

**RadioLogs** is a developer-focused, data-driven comparison, provenance audit, and audio/metadata benchmarking web application for the Old Time Radio (OTR) and archival broadcast ecosystem, modeled directly on the design patterns and architecture of [battleships.dev](https://battleships.dev).

## Quick Start

```bash
cd ./radiologs-web
npm install
npm run dev
```

Starts immediately on **http://localhost:3000**.

## Architecture & Decoupled Data Model

- **Framework**: Vite + React 18 + TypeScript + Tailwind CSS
- **Decoupled Static JSON Schemas** (located in both `src/data/` and served statically from `public/data/`):
  - [`public/data/sources.json`](public/data/sources.json) — 18 real archival platforms, repositories, and streaming services (`RadioIndex`, `Internet Archive OTRR`, `OTRRlib`, `RUSC`, `Stupid Potato`, `Old Radio World`, `SiriusXM RadioClassics`, `Library of Congress Recorded Sound`, `RadioGOLDINdex`, `UMKC Marr Sound Archives`, `Generic Radio Workshop`, `Radio Echoes`, `RelicRadio`, `Dumb.com OTR`, `Boxcars711`, `American Radio Archives`, `WNYC Archives`, `YouTube Unofficial OTR`).
  - [`public/data/features.json`](public/data/features.json) — 8 capability evaluation rubrics (`primary_source_verification`, `cast_credit_accuracy`, `vtt_transcripts`, `master_provenance`, `serial_continuity`, `open_api_export`, `ad_free_playback`, `dedup_integrity`) and 4 interactive scenario presets (`enthusiast`, `historian`, `collector`, `ai_agent`).
  - [`public/data/benchmarks.json`](public/data/benchmarks.json) — Objective playback latency (`TTFB ms`, `p50/p95 first-audio-frame ms`), bitrate distributions (`min/median/max kbps`, `lossless %`), frequency response (`low/high cutoff Hz`, `SNR dB`, `dynamic range LU`, `transfer grade`), and metadata completeness percentages.
- **Static Agent & Crawler Endpoints**:
  - [`public/llms.txt`](public/llms.txt) — Concise machine-readable entrypoint for coding agents and LLM crawlers.
  - [`public/llms-full.txt`](public/llms-full.txt) — Single-file plain-text dump of all 18 platforms, capability rubrics, telemetry benchmarks, and provider gotchas.
