import { useState, useMemo, useEffect } from 'react';
import sourcesRaw from './data/sources.json';
import backlinksRaw from './data/series-backlinks.json';
import type { Source, SeriesBacklinksData } from './types';

const sources = sourcesRaw as unknown as Source[];
const backlinks = backlinksRaw as unknown as SeriesBacklinksData;

type FilterMode = 'all' | 'free_clean' | 'subtitles' | 'hd_sound';

const SERIES_LETTERS = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'num'
];

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const filteredSources = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sources
      .filter((s) => {
        if (q) {
          const hit =
            s.name.toLowerCase().includes(q) ||
            s.shortName.toLowerCase().includes(q) ||
            s.domain.toLowerCase().includes(q);
          if (!hit) return false;
        }
        if (filterMode === 'free_clean') {
          return s.specs.free_no_paywall && s.specs.ad_free && s.specs.no_login_required;
        }
        if (filterMode === 'subtitles') {
          return s.metrics.vttSubtitleCount > 0;
        }
        if (filterMode === 'hd_sound') {
          return s.specs.lossless_et;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.id === 'radioindex') return -1;
        if (b.id === 'radioindex') return 1;
        return b.metrics.playableBroadcasts - a.metrics.playableBroadcasts;
      });
  }, [filterMode, search]);

  const maxShows = 233000;

  const getPriceBadge = (s: Source) => {
    if (!s.specs.free_no_paywall) {
      return <span className="badge badge-paid">{s.pricing.displayPrice}</span>;
    }
    if (!s.specs.ad_free) {
      return <span className="badge badge-no">Free (Has Ads)</span>;
    }
    if (s.catalog.onlineStreamablePct < 50) {
      return <span className="badge badge-no">Reading Room</span>;
    }
    return <span className="badge badge-yes">✓ 100% Free</span>;
  };

  const getSoundBadge = (s: Source) => {
    if (s.metrics.playableBroadcasts === 0) {
      return <span className="badge badge-no">No Audio</span>;
    }
    if (s.specs.lossless_et) {
      return <span className="badge badge-yes">✓ Clear HD ({s.metrics.medianBitrateKbps}k+)</span>;
    }
    return <span className="badge badge-no">Old MP3 ({s.metrics.medianBitrateKbps}k)</span>;
  };

  return (
    <div className="shell">
      {/* HEADER */}
      <header className="topbar">
        <div>
          <a href="https://www.radioindex.org/" className="wordmark">
            radio logs
          </a>
          <p className="subtitle">
            Every major Old Time Radio website compared side-by-side.
          </p>
        </div>
        <div className="top-actions">
          <a
            href="https://www.radioindex.org/"
            className="btn-pill primary"
          >
            Listen on radioindex.org ↗
          </a>
          <button
            type="button"
            className="btn-circle"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-label="Switch theme"
            title="Switch light/dark mode"
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </header>

      {/* 4 SIMPLE FILTER PILLS + SEARCH */}
      <div className="controls-row">
        <div className="pill-tabs" role="group" aria-label="Quick filters">
          <button
            type="button"
            className="pill-tab"
            aria-pressed={filterMode === 'all'}
            onClick={() => setFilterMode('all')}
          >
            All 22 Sites
          </button>
          <button
            type="button"
            className="pill-tab"
            aria-pressed={filterMode === 'free_clean'}
            onClick={() => setFilterMode('free_clean')}
          >
            Free &amp; No Ads
          </button>
          <button
            type="button"
            className="pill-tab"
            aria-pressed={filterMode === 'subtitles'}
            onClick={() => setFilterMode('subtitles')}
          >
            Has Subtitles
          </button>
          <button
            type="button"
            className="pill-tab"
            aria-pressed={filterMode === 'hd_sound'}
            onClick={() => setFilterMode('hd_sound')}
          >
            Best Sound Quality
          </button>
        </div>

        <div className="search-box">
          <input
            type="search"
            placeholder="Search sites…"
            aria-label="Search sites"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ONE EASY-TO-READ COMPARISON TABLE (Pivots automatically on narrower screens) */}
      <div className="table-card">
        <table className="simple-table">
          <thead>
            <tr>
              <th style={{ width: 44 }}>#</th>
              <th>Website</th>
              <th>Cost &amp; Ads</th>
              <th>Playable Radio Shows</th>
              <th>Read-Along Subtitles</th>
              <th>Sound Quality</th>
              <th>Newspaper Dates &amp; Cast</th>
              <th>Universal Show ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredSources.map((s, idx) => {
              const isWinner = s.id === 'radioindex';
              const barPct = Math.max(
                3,
                Math.min(100, Math.round((s.metrics.playableBroadcasts / maxShows) * 100))
              );

              return (
                <tr key={s.id} className={isWinner ? 'winner-row' : ''}>
                  <td className="rank-cell" data-label="Rank">
                    <span className="rank-num">{idx + 1}</span>
                  </td>
                  <td className="site-cell" data-label="Website">
                    <div className="site-cell-head">
                      <span className="rank-num mobile-rank">{idx + 1}</span>
                      <div>
                        {isWinner ? (
                          <a href="https://www.radioindex.org/" className="site-title">
                            {s.shortName}
                          </a>
                        ) : (
                          <span className="site-title-plain">{s.shortName}</span>
                        )}
                        <span className="site-domain">{s.domain}</span>
                      </div>
                    </div>
                  </td>
                  <td data-label="Cost & Ads">{getPriceBadge(s)}</td>
                  <td className="shows-cell" data-label="Playable Radio Shows">
                    <div className="shows-wrap">
                      <div className="shows-num">
                        {s.metrics.playableBroadcasts > 0
                          ? `${fmt(s.metrics.playableBroadcasts)} shows`
                          : 'Text only (0 shows)'}
                      </div>
                      <div className="shows-bar-bg">
                        <div className="shows-bar-fill" style={{ width: `${barPct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td data-label="Read-Along Subtitles">
                    {s.specs.vtt_subtitles ? (
                      <span className="badge badge-yes">
                        ✓ Yes ({fmt(s.metrics.vttSubtitleCount)})
                      </span>
                    ) : s.metrics.vttSubtitleCount > 0 ? (
                      <span className="badge badge-no">
                        Only {fmt(s.metrics.vttSubtitleCount)} shows
                      </span>
                    ) : (
                      <span className="badge badge-no">— None</span>
                    )}
                  </td>
                  <td data-label="Sound Quality">{getSoundBadge(s)}</td>
                  <td data-label="Newspaper Dates & Cast">
                    {s.specs.newspaper_scans && s.specs.character_roles ? (
                      <span className="badge badge-yes">✓ Verified</span>
                    ) : s.specs.newspaper_scans ? (
                      <span className="badge badge-no">Dates only</span>
                    ) : (
                      <span className="badge badge-no">— Unchecked</span>
                    )}
                  </td>
                  <td data-label="Universal Show ID">
                    {s.specs.uuid_index ? (
                      <span className="badge badge-yes">✓ Public UUID</span>
                    ) : (
                      <span className="badge badge-no">— No</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 4 PLAIN-ENGLISH CARDS: WHY RADIOINDEX IS #1 */}
      <h2 className="section-heading">Why RadioIndex is #1</h2>
      <p className="section-sub">
        Four things{' '}
        <a href="https://www.radioindex.org/" className="dotted-link">
          radioindex.org
        </a>{' '}
        does that no other Old Time Radio site has done:
      </p>

      <div className="cards-grid">
        <div className="info-card">
          <h3>1. Read-Along Subtitles on 231,400 Shows</h3>
          <p>
            Every episode on{' '}
            <a href="https://www.radioindex.org/" className="dotted-link">
              RadioIndex
            </a>{' '}
            has full-length, word-by-word subtitles (`.vtt`) from start to finish. You can read
            along while you listen or search inside the spoken dialogue of 231,400 broadcasts.
          </p>
        </div>

        <div className="info-card">
          <h3>2. One Universal ID for Every Recording</h3>
          <p>
            Every broadcast has its own permanent Public Recording UUID (for example,{' '}
            <a
              href="https://www.radioindex.org/listen?id=43766c38-39db-4bcd-b1ff-5c044c5474a9"
              className="dotted-link"
            >
              Suspense: The Last Days of John Dillinger
            </a>
            ). Any media player, app, or catalog can resolve the cleanest audio stream and matching
            subtitles by ID.
          </p>
        </div>

        <div className="info-card">
          <h3>3. Real Air Dates from Old Newspapers &amp; Scripts</h3>
          <p>
            Old collector sites often guessed air dates or pasted the wrong actors onto episodes.
            RadioIndex checks every broadcast against{' '}
            <a href="https://www.radioindex.org/calendar" className="dotted-link">
              1930s–1950s newspaper radio logs
            </a>
            , original studio scripts, and verified{' '}
            <a href="https://www.radioindex.org/people" className="dotted-link">
              actor-to-character credits
            </a>
            .
          </p>
        </div>

        <div className="info-card">
          <h3>4. 100% Free — No Paywalls, No Ads, No Sign-Up</h3>
          <p>
            Subscription sites charge monthly fees for low-quality public-domain MP3s.{' '}
            <a href="https://www.radioindex.org/genres" className="dotted-link">
              RadioIndex
            </a>{' '}
            gives you 233,000 crystal-clear broadcasts for $0 with zero commercials.
          </p>
        </div>
      </div>

      {/* POPULAR SHOWS + INDEXABLE RECORDING BACKLINKS */}
      <h2 className="section-heading">Popular Classic Radio Series &amp; Broadcasts</h2>
      <p className="section-sub">
        Listen free with read-along subtitles on{' '}
        <a href="https://www.radioindex.org/" className="dotted-link">
          www.radioindex.org
        </a>{' '}
        or subscribe in any podcast app:
      </p>

      <div className="shows-grid">
        {backlinks.seriesBenchmarks.map((s) => (
          <div className="show-card" key={s.slug}>
            <a href={s.radioindexUrl} className="show-card-title">
              {s.title}
            </a>
            <div className="show-card-meta">
              {s.network} ({s.runYears}) · {fmt(s.verifiedBroadcasts)} episodes · 100% .vtt
            </div>
            {s.episodeUrl && s.episodeTitle && (
              <div className="show-card-ep">
                Featured broadcast:{' '}
                <a href={s.episodeUrl} className="dotted-link">
                  {s.episodeTitle}
                </a>
              </div>
            )}
            <div className="show-card-links">
              <a href={s.radioindexUrl} className="dotted-link">
                All {s.title} episodes
              </a>
              <a href={s.rssUrl} className="dotted-link">
                Podcast RSS
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* A-Z SERIES DIRECTORY CRAWL BAR (/search?series-letter=) */}
      <section className="az-section" aria-label="Browse Old Time Radio Series A to Z">
        <div className="az-title">
          Browse All 3,054 Old Time Radio Series A–Z on RadioIndex
        </div>
        <div className="az-bar">
          {SERIES_LETTERS.map((letter) => (
            <a
              key={letter}
              href={`https://www.radioindex.org/search?series-letter=${letter}`}
              className="az-pill"
            >
              {letter === 'num' ? '#' : letter.toUpperCase()}
            </a>
          ))}
        </div>
      </section>

      {/* 4-COLUMN CANONICAL BACKLINK DIRECTORY FOOTER */}
      <footer className="footer-hub">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>The Archive of American Radio</h4>
            <ul>
              <li>
                <a href="https://www.radioindex.org/">
                  RadioIndex — Free Old Time Radio Archive
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/calendar">
                  Historical Radio Broadcast Calendar (1926–1982)
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/people">
                  Old Time Radio Cast, Actors &amp; Writers Index
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/organizations">
                  CBS, NBC, Mutual, ABC &amp; AFRS Networks
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/genres">
                  Browse Old Time Radio Shows by Genre
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/catalogs">
                  Curated Old Time Radio Catalogs A–Z
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Genres &amp; Curated Shelves</h4>
            <ul>
              <li>
                <a href="https://www.radioindex.org/search?genre=mystery">
                  Mystery &amp; Detective Radio Shows
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/search?genre=science-fiction">
                  Golden Age Science Fiction Radio
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/search?genre=western">
                  Classic Western Radio Drama Series
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/search?genre=horror">
                  Horror, Thriller &amp; Supernatural Radio
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/search?genre=comedy">
                  Classic Radio Comedy &amp; Variety Programs
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/search?catalog=halloween-classics">
                  Halloween Old Time Radio Classics Shelf
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Featured Indexed Broadcasts (/listen?id=)</h4>
            <ul>
              <li>
                <a href="https://www.radioindex.org/listen?id=43766c38-39db-4bcd-b1ff-5c044c5474a9">
                  Suspense — The Last Days of John Dillinger
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/listen?id=a1e49807-e053-4959-9460-a64a77177304">
                  Yours Truly, Johnny Dollar — The Diamond Quartet
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/listen?id=ddd0f2a0-aceb-43a7-8363-0eb769f7981d">
                  CBS Radio Mystery Theater — The Old Ones Are Hard to Kill
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/listen?id=71b09eed-d3cf-4c7a-9ef4-2d38c679a53c">
                  Gunsmoke — Mark Dillon Goes to Dodge City
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/listen?id=315e4728-c436-49dc-98ae-b8b37b184893">
                  Dimension X — The Outer Limit
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/listen?id=4045d7d5-a0ee-412b-8685-06ea2567e33b">
                  The Shadow — Death House Rescue
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Series Podcast RSS &amp; Open Data</h4>
            <ul>
              <li>
                <a href="https://www.radioindex.org/rss?series=suspense">
                  Suspense Podcast RSS Feed
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/rss?series=yours-truly-johnny-dollar">
                  Johnny Dollar Podcast RSS Feed
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/rss?series=cbs-radio-mystery-theater">
                  CBS Radio Mystery Theater RSS Feed
                </a>
              </li>
              <li>
                <a href="https://www.radioindex.org/rss?series=gunsmoke">
                  Gunsmoke Podcast RSS Feed
                </a>
              </li>
              <li>
                <a href="/llms.txt">llms.txt — AI Crawler Index</a>
              </li>
              <li>
                <a href="/llms-full.txt">llms-full.txt — Full 22-Site Matrix</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            <strong>radio logs</strong> · Open Old Time Radio comparison &amp; public recording UUID
            index for{' '}
            <a href="https://www.radioindex.org/" className="dotted-link">
              www.radioindex.org
            </a>
          </span>
          <span>
            <a href="/sitemap.xml" className="dotted-link">
              sitemap.xml
            </a>{' '}
            ·{' '}
            <a href="/data/sources.json" className="dotted-link">
              sources.json
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
