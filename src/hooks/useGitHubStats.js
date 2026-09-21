import { useState, useEffect } from 'react';
const cache = {};
export function useGitHubStats(repo) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!repo) return;
    if (cache[repo]) { setStats(cache[repo]); setLoading(false); return; }
    fetch(`https://api.github.com/repos/${repo}`)
      .then(r => r.json())
      .then(data => {
        const s = {
          stars: data.stargazers_count || 0,
          issues: data.open_issues_count || 0,
          language: data.language || null,
          pushed_at: data.pushed_at || null,
          default_branch: data.default_branch || 'main',
        };
        cache[repo] = s;
        setStats(s);
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [repo]);
  return { stats, loading };
}
