import { useMemo } from 'react';
import { ExternalLink, GitFork, Star, Users } from 'lucide-react';
import { Section } from './Section';
import { contributions } from '@/data/content';
import { useGithubRepos } from '@/hooks/useGithub';

export function Contributions() {
  const orgs = useMemo(
    () => contributions.map((c) => c.organization).filter(Boolean),
    []
  );
  const { data } = useGithubRepos(orgs);
  const repoMap = useMemo(() => {
    const m = new Map<string, (typeof data extends Array<infer R> ? R : never) | NonNullable<typeof data>[number]>();
    (data ?? []).forEach((r) => m.set(r.full_name.toLowerCase(), r));
    return m;
  }, [data]);

  return (
    <Section id="contributions" number="05" title="contributions" command="git remote -v">
      <ul className="grid gap-4">
        {contributions.map((c) => (
          <li key={c.organization} className="frame min-w-0 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-600 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center border border-ink-400 mono text-xs font-bold text-ink-50">
                  {c.organization.slice(0, 2)}
                </span>
                <div className="min-w-0 leading-tight">
                  <h3 className="mono truncate text-base font-semibold text-ink-50">@{c.organization}</h3>
                  <span className="mono block truncate text-2xs uppercase tracking-wider text-ink-100">
                    {c.position}
                  </span>
                </div>
              </div>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mono inline-flex shrink-0 items-center gap-1.5 border border-ink-500 px-2.5 py-1.5 text-2xs text-ink-50 transition-colors hover:border-ink-100 hover:bg-ink-800"
                >
                  <Users size={12} />
                  open org
                  <ExternalLink size={11} />
                </a>
              )}
            </div>
            <div className="px-4 py-5 sm:px-5">
              <p className="text-sm text-ink-100 leading-relaxed">{c.summary}</p>

              <div className="mt-5">
                <span className="label">repositories</span>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {c.projects.map((p) => {
                    const repo = matchRepo(repoMap, p.link, p.name);
                    return (
                      <li key={p.name} className="min-w-0">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between gap-3 overflow-hidden border border-ink-600 px-3 py-2 transition-colors hover:border-ink-200 hover:bg-ink-800"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="mono block truncate text-sm text-ink-50">
                              <span className="text-ink-300">/</span>
                              {p.name}
                            </span>
                            {repo?.description && (
                              <span className="mono mt-0.5 block truncate text-2xs text-ink-200">
                                {repo.description}
                              </span>
                            )}
                          </span>
                          {repo ? (
                            <span className="mono inline-flex shrink-0 items-center gap-2 text-2xs text-ink-100">
                              <span className="inline-flex items-center gap-1">
                                <Star size={10} />
                                <span className="tabular-nums">{repo.stargazers_count}</span>
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <GitFork size={10} />
                                <span className="tabular-nums">{repo.forks_count}</span>
                              </span>
                            </span>
                          ) : (
                            <span className="mono inline-flex shrink-0 items-center gap-1.5 text-2xs">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  p.status === 'Active'
                                    ? 'bg-emerald-400'
                                    : p.status === 'In Development'
                                    ? 'bg-amber-400'
                                    : 'bg-ink-200'
                                }`}
                              />
                              <span className="text-ink-100">{p.status.toLowerCase()}</span>
                            </span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function matchRepo<T extends { full_name: string; name: string }>(
  map: Map<string, T>,
  url: string,
  name: string
): T | undefined {
  const m = url.match(/github\.com\/([^/]+)\/([^/?#]+)/i);
  if (m) {
    const fn = `${m[1]}/${m[2]}`.toLowerCase().replace(/\.git$/, '');
    const found = map.get(fn);
    if (found) return found;
  }
  for (const [, repo] of map) {
    if (repo.name.toLowerCase() === name.toLowerCase()) return repo;
  }
  return undefined;
}
