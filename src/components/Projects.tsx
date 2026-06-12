import { useMemo, useState } from 'react';
import { ExternalLink, GitFork, Github, Star, Eye, RefreshCw } from 'lucide-react';
import { Section } from './Section';
import { useGithubRepos, type GhRepo } from '@/hooks/useGithub';
import { github, projects as fallbackProjects } from '@/data/content';

type Sort = 'stars' | 'recent';

export function Projects() {
  const { data, loading, error } = useGithubRepos(github.sources);
  const [sort, setSort] = useState<Sort>('stars');
  const [lang, setLang] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);

  const repos = data ?? [];

  const featured = useMemo(() => {
    const map = new Map(repos.map((r) => [r.full_name.toLowerCase(), r]));
    return github.featuredRepos
      .map((fn) => map.get(fn.toLowerCase()))
      .filter((r): r is GhRepo => !!r);
  }, [repos]);

  const featuredIds = useMemo(() => new Set(featured.map((r) => r.id)), [featured]);

  const stats = useMemo(() => {
    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
    const langs = new Map<string, number>();
    for (const r of repos) {
      if (!r.language) continue;
      langs.set(r.language, (langs.get(r.language) ?? 0) + 1);
    }
    return {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      languages: [...langs.entries()].sort((a, b) => b[1] - a[1]),
    };
  }, [repos]);

  const languages = useMemo(() => ['all', ...stats.languages.map(([l]) => l)], [stats]);

  const filteredOthers = useMemo(() => {
    const others = repos.filter((r) => !featuredIds.has(r.id));
    const byLang = lang === 'all' ? others : others.filter((r) => r.language === lang);
    const sorted = [...byLang].sort((a, b) => {
      if (sort === 'stars') {
        return b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at);
      }
      return +new Date(b.pushed_at) - +new Date(a.pushed_at);
    });
    return sorted;
  }, [repos, featuredIds, lang, sort]);

  const visibleOthers = showAll ? filteredOthers : filteredOthers.slice(0, 6);

  return (
    <Section id="projects" number="03" title="projects" command="git log --oneline">
      {!loading && !error && repos.length > 0 && (
        <StatsBar
          repos={stats.totalRepos}
          stars={stats.totalStars}
          forks={stats.totalForks}
          topLanguage={stats.languages[0]?.[0]}
        />
      )}

      {loading ? (
        <SkeletonGrid />
      ) : error && repos.length === 0 ? (
        <Fallback message={error} />
      ) : (
        <>
          {featured.length > 0 && (
            <ul className="grid gap-4 md:grid-cols-2">
              {featured.map((repo, i) => (
                <FeaturedCard key={repo.id} repo={repo} index={i} />
              ))}
            </ul>
          )}

          {filteredOthers.length > 0 && (
            <div className="mt-14">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-ink-600 pb-3">
                <div>
                  <span className="label">~/repos</span>
                  <h3 className="mono mt-1 text-lg text-ink-50">
                    all repositories <span className="text-ink-300">({filteredOthers.length})</span>
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Tabs
                    value={lang}
                    options={languages}
                    onChange={setLang}
                    label="language"
                  />
                  <Tabs
                    value={sort}
                    options={['stars', 'recent']}
                    onChange={(v) => setSort(v as Sort)}
                    label="sort"
                  />
                </div>
              </div>

              <ul className="grid gap-2 md:grid-cols-2">
                {visibleOthers.map((repo, i) => (
                  <RepoRow key={repo.id} repo={repo} index={featured.length + i + 1} />
                ))}
              </ul>

              {filteredOthers.length > 6 && (
                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    className="mono inline-flex items-center gap-2 border border-ink-400 px-4 py-2 text-2xs text-ink-50 transition-colors hover:border-ink-100 hover:bg-ink-800"
                  >
                    {showAll ? '▴ collapse' : `▾ show all ${filteredOthers.length}`}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Section>
  );
}

function StatsBar({
  repos,
  stars,
  forks,
  topLanguage,
}: {
  repos: number;
  stars: number;
  forks: number;
  topLanguage?: string;
}) {
  const items = [
    { label: 'repos', value: repos.toString() },
    { label: 'stars', value: stars.toString() },
    { label: 'forks', value: forks.toString() },
    { label: 'top lang', value: topLanguage ?? '—' },
  ];
  return (
    <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden border border-ink-600 bg-ink-600 sm:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="bg-ink-850 px-4 py-3.5">
          <div className="mono text-2xs uppercase tracking-wider text-ink-200">
            {i.label}
          </div>
          <div className="mt-1 mono text-2xl font-semibold text-ink-50 tabular-nums">
            {i.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function Tabs({
  value,
  options,
  onChange,
  label,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="mono text-2xs text-ink-200">{label}:</span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`mono inline-flex items-center border px-2 py-1 text-2xs transition-colors ${
                active
                  ? 'border-ink-50 bg-ink-50 text-ink-900'
                  : 'border-ink-500 text-ink-100 hover:border-ink-100 hover:text-ink-50'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FeaturedCard({ repo, index }: { repo: GhRepo; index: number }) {
  const fn = repo.full_name.toLowerCase();
  const description =
    github.descriptionOverrides[fn] ?? repo.description ?? 'No description available.';
  const demo = github.demoLinks[fn] ?? repo.homepage ?? null;
  const isActive = !repo.archived;

  return (
    <li className="group frame frame-hover relative min-w-0 overflow-hidden">
      <div className="flex items-center justify-between border-b border-ink-600 px-4 py-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="mono text-2xs text-ink-300 shrink-0">
            #{String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mono text-sm font-semibold text-ink-50 truncate">
            <span className="text-ink-300">{repo.owner.login}/</span>
            {repo.name}
          </h3>
          <span className="inline-flex items-center gap-1 mono text-2xs text-ink-100 shrink-0">
            <Star size={10} className="fill-ink-50 text-ink-50" />
            featured
          </span>
        </div>
        <span className="mono inline-flex items-center gap-1.5 text-2xs shrink-0">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? 'bg-emerald-400 animate-pulse-dot' : 'bg-ink-300'
            }`}
          />
          <span className="text-ink-100">{isActive ? 'active' : 'archived'}</span>
        </span>
      </div>

      <div className="px-4 py-5">
        <p className="text-sm text-ink-100 leading-relaxed">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {repo.language && (
            <li className="mono border border-ink-50/30 bg-ink-700 px-2 py-0.5 text-2xs text-ink-50">
              {repo.language}
            </li>
          )}
          {(repo.topics ?? []).slice(0, 5).map((t) => (
            <li key={t} className="mono border border-ink-500 px-2 py-0.5 text-2xs text-ink-100">
              {t}
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex items-center gap-4 mono text-2xs text-ink-100">
          <li className="inline-flex items-center gap-1">
            <Star size={11} />
            <span className="tabular-nums">{repo.stargazers_count}</span>
          </li>
          <li className="inline-flex items-center gap-1">
            <GitFork size={11} />
            <span className="tabular-nums">{repo.forks_count}</span>
          </li>
          <li className="inline-flex items-center gap-1">
            <Eye size={11} />
            <span className="tabular-nums">{repo.watchers_count}</span>
          </li>
          <li className="ml-auto text-ink-300">
            updated {timeAgo(repo.pushed_at)}
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-ink-600 px-4 py-2.5 mono text-2xs">
        <span className="text-ink-300 truncate">
          $ git clone <span className="text-ink-100">{repo.name}.git</span>
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-ink-100 transition-colors hover:text-ink-50"
            aria-label={`${repo.name} source on GitHub`}
          >
            <Github size={12} />
            source
          </a>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-ink-50 transition-colors hover:text-white"
              aria-label={`${repo.name} live demo`}
            >
              <ExternalLink size={12} />
              demo
            </a>
          )}
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 select-none mono text-[120px] font-bold leading-none text-ink-600/40 transition-colors group-hover:text-ink-500/50"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </li>
  );
}

function RepoRow({ repo, index }: { repo: GhRepo; index: number }) {
  return (
    <li className="min-w-0">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full flex-col gap-2 overflow-hidden border border-ink-600 bg-ink-850 px-4 py-3 transition-colors hover:border-ink-200 hover:bg-ink-800"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="mono text-2xs text-ink-300 shrink-0">
                #{String(index).padStart(2, '0')}
              </span>
              <h4 className="mono text-sm font-semibold text-ink-50 truncate">{repo.name}</h4>
            </div>
            <p className="mt-1 mono text-2xs text-ink-200 truncate">
              <span className="text-ink-300">{repo.owner.login}/</span>
              {repo.name}
            </p>
          </div>
          <span className="mono shrink-0 text-ink-300 group-hover:text-ink-100">↗</span>
        </div>

        {repo.description && (
          <p className="text-2xs leading-snug text-ink-100 line-clamp-2">
            {repo.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 mono text-2xs text-ink-100">
          <span className="inline-flex items-center gap-1 truncate">
            {repo.language && (
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-ink-50" />
                <span className="text-ink-100">{repo.language}</span>
              </span>
            )}
          </span>
          <span className="inline-flex shrink-0 items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Star size={10} />
              <span className="tabular-nums">{repo.stargazers_count}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork size={10} />
              <span className="tabular-nums">{repo.forks_count}</span>
            </span>
          </span>
        </div>
      </a>
    </li>
  );
}

function SkeletonGrid() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <li
          key={i}
          className="frame h-[260px] animate-pulse"
          aria-hidden
        />
      ))}
    </ul>
  );
}

function Fallback({ message }: { message: string }) {
  return (
    <div className="frame px-5 py-6">
      <div className="mb-3 flex items-center gap-2 mono text-2xs text-ink-100">
        <RefreshCw size={12} />
        github api unreachable — showing local snapshot
        <span className="text-ink-300">({message.toLowerCase()})</span>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {fallbackProjects.map((p) => (
          <li key={p.id} className="border border-ink-600 px-4 py-3">
            <h4 className="mono text-sm font-semibold text-ink-50">{p.title}</h4>
            <p className="mt-1 text-2xs leading-snug text-ink-100">{p.description}</p>
            <div className="mt-3 flex items-center justify-between mono text-2xs">
              <span className="text-ink-200">{p.technologies.join(' · ')}</span>
              <div className="flex items-center gap-2">
                {p.github && (
                  <a className="text-ink-100 hover:text-ink-50" href={p.github} target="_blank" rel="noreferrer">
                    source ↗
                  </a>
                )}
                {p.demo && (
                  <a className="text-ink-50 hover:text-white" href={p.demo} target="_blank" rel="noreferrer">
                    demo ↗
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  const y = Math.floor(mo / 12);
  return `${y}y ago`;
}
