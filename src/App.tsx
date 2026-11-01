import { useState, useMemo, useEffect } from 'react';
import sourcesRaw from './data/sources.json';
import backlinksRaw from './data/series-backlinks.json';
import type { Source, SeriesBacklinksData } from './types';

const sources = sourcesRaw as unknown as Source[];
const backlinks = backlinksRaw as unknown as SeriesBacklinksData;

type FilterMode = 'all' | 'free_clean' | 'subtitles' | 'hd_sound';

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

  const allListenEpisodes = useMemo(() => {
    return backlinks.seriesBenchmarks.flatMap((s) =>
      (s.episodes || []).map((ep) => ({
        seriesTitle: s.title,
        network: s.network,
        runYears: s.runYears,
        ...ep,
      }))
    );
  }, []);

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
          <a href="https://www.radioindex.org/" className="btn-pill primary">
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
              <th>1 Item Per Episode</th>
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
                  <td data-label="1 Item Per Episode">
                    {s.specs.uuid_index ? (
                      <span className="badge badge-yes">✓ UUID + IA Item</span>
                    ) : s.id === 'ia-otrr' ? (
                      <span className="badge badge-no">500+ MP3s / Zip</span>
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
            Every episode—like{' '}
            <a
              href="https://www.radioindex.org/listen?id=43766c38-39db-4bcd-b1ff-5c044c5474a9"
              className="dotted-link"
            >
              The Last Days of John Dillinger (Suspense)
            </a>
            —has full-length, word-by-word subtitles (`.vtt`) from start to finish so you can read
            along while you listen.
          </p>
        </div>

        <div className="info-card">
          <h3>2. Every Episode Is Its Own Individual Item (UUID + IA)</h3>
          <p>
            Instead of dumping 500 MP3s into one giant `.zip` folder, every single broadcast—like{' '}
            <a
              href="https://www.radioindex.org/listen?id=a1e49807-e053-4959-9460-a64a77177304"
              className="dotted-link"
            >
              The Diamond Quartet (Yours Truly, Johnny Dollar)
            </a>
            —has its own permanent UUID page on RadioIndex (<code>/listen?id=…</code>) and its own
            individual item on the Internet Archive (<code>archive.org/details/…</code>) with
            verified air date, cast, sponsor, and station metadata.
          </p>
        </div>

        <div className="info-card">
          <h3>3. Real Air Dates from Old Newspapers &amp; Scripts</h3>
          <p>
            Old collector sites often guessed air dates or pasted the wrong actors onto episodes.
            Broadcasts like{' '}
            <a
              href="https://www.radioindex.org/listen?id=315e4728-c436-49dc-98ae-b8b37b184893"
              className="dotted-link"
            >
              Outer Limit (Dimension X)
            </a>{' '}
            are checked against real 1930s–1950s newspaper radio logs and studio scripts.
          </p>
        </div>

        <div className="info-card">
          <h3>4. 100% Free — No Paywalls, No Ads, No Sign-Up</h3>
          <p>
            Subscription sites charge monthly fees for low-quality public-domain MP3s. Classics like{' '}
            <a
              href="https://www.radioindex.org/listen?id=71b09eed-d3cf-4c7a-9ef4-2d38c679a53c"
              className="dotted-link"
            >
              Mark Dillon Goes to Dodge City (Gunsmoke)
            </a>{' '}
            stream free on RadioIndex with zero commercials.
          </p>
        </div>
      </div>

      {/* 64 VERIFIED BROADCAST RECORDING BACKLINKS (/listen?id=) ACROSS 16 SERIES */}
      <h2 className="section-heading">Featured Broadcast Recordings on RadioIndex</h2>
      <p className="section-sub">
        Direct links to 64 verified broadcasts (`https://www.radioindex.org/listen?id=…`) with
        full-length read-along subtitles:
      </p>

      <div className="shows-grid">
        {backlinks.seriesBenchmarks.map((s) => {
          const eps = s.episodes || [];
          const primaryUrl = eps[0]?.url || 'https://www.radioindex.org/';
          return (
            <div className="show-card" key={s.slug}>
              <a href={primaryUrl} className="show-card-title">
                {s.title}
              </a>
              <div className="show-card-meta">
                {s.network} ({s.runYears}) · {fmt(s.verifiedBroadcasts)} broadcasts · 100% .vtt
              </div>
              <ul className="ep-link-list">
                {eps.map((ep) => (
                  <li key={ep.id}>
                    <a href={ep.url} className="dotted-link">
                      {ep.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* 4-COLUMN FOOTER OF DIRECT /listen?id= BROADCAST BACKLINKS */}
      <footer className="footer-hub">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Suspense &amp; Mystery Broadcasts</h4>
            <ul>
              {allListenEpisodes.slice(0, 12).map((ep) => (
                <li key={ep.id}>
                  <a href={ep.url}>{ep.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Adventure, Western &amp; Sci-Fi Broadcasts</h4>
            <ul>
              {allListenEpisodes.slice(12, 24).map((ep) => (
                <li key={ep.id}>
                  <a href={ep.url}>{ep.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Detective &amp; Thriller Broadcasts</h4>
            <ul>
              {allListenEpisodes.slice(24, 36).map((ep) => (
                <li key={ep.id}>
                  <a href={ep.url}>{ep.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Horror, Serials &amp; Comedy Broadcasts</h4>
            <ul>
              {allListenEpisodes.slice(36, 48).map((ep) => (
                <li key={ep.id}>
                  <a href={ep.url}>{ep.title}</a>
                </li>
              ))}
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
            <a href="/llms.txt" className="dotted-link">
              llms.txt
            </a>{' '}
            ·{' '}
            <a href="/llms-full.txt" className="dotted-link">
              llms-full.txt
            </a>{' '}
            ·{' '}
            <a href="/sitemap.xml" className="dotted-link">
              sitemap.xml
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
