import { useEffect, useRef, useState } from 'react';

export type GhRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  topics: string[];
  archived: boolean;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  default_branch: string;
  size: number;
  owner: { login: string; avatar_url: string; html_url: string; type: string };
};

export type GhUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  blog: string | null;
  location: string | null;
};

type State<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const TTL_MS = 60 * 60 * 1000; // 1 hour
const KEY_PREFIX = 'gh-cache::';

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts: number; data: T };
    if (Date.now() - parsed.ts > TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(KEY_PREFIX + key, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // ignore quota / privacy errors
  }
}

async function ghJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  return (await res.json()) as T;
}

export function useGithubRepos(users: string[]) {
  const [state, setState] = useState<State<GhRepo[]>>({ data: null, loading: true, error: null });
  const cacheKey = useRef(`repos::${users.join(',')}`).current;

  useEffect(() => {
    const cached = readCache<GhRepo[]>(cacheKey);
    if (cached) {
      setState({ data: cached, loading: false, error: null });
      return;
    }

    const ctrl = new AbortController();
    (async () => {
      try {
        const lists = await Promise.all(
          users.map((u) =>
            ghJson<GhRepo[]>(
              `https://api.github.com/users/${u}/repos?per_page=100&sort=updated`,
              ctrl.signal
            ).catch(() => [] as GhRepo[])
          )
        );
        const merged = lists.flat().filter((r) => !r.fork && !r.archived);
        const seen = new Set<number>();
        const deduped: GhRepo[] = [];
        for (const r of merged) {
          if (seen.has(r.id)) continue;
          seen.add(r.id);
          deduped.push(r);
        }
        deduped.sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at));
        writeCache(cacheKey, deduped);
        setState({ data: deduped, loading: false, error: null });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setState({ data: null, loading: false, error: (err as Error).message });
      }
    })();

    return () => ctrl.abort();
  }, [cacheKey, users]);

  return state;
}

export function useGithubUser(user: string) {
  const [state, setState] = useState<State<GhUser>>({ data: null, loading: true, error: null });
  const cacheKey = `user::${user}`;

  useEffect(() => {
    const cached = readCache<GhUser>(cacheKey);
    if (cached) {
      setState({ data: cached, loading: false, error: null });
      return;
    }
    const ctrl = new AbortController();
    (async () => {
      try {
        const data = await ghJson<GhUser>(`https://api.github.com/users/${user}`, ctrl.signal);
        writeCache(cacheKey, data);
        setState({ data, loading: false, error: null });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setState({ data: null, loading: false, error: (err as Error).message });
      }
    })();
    return () => ctrl.abort();
  }, [cacheKey, user]);

  return state;
}
