import { useState, useEffect, useMemo } from 'react';
import { calcProgress } from './utils';
import StatsHeader from './components/StatsHeader';
import FilterBar from './components/FilterBar';
import ProjectCard from './components/ProjectCard';

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

function sortProjects(projects, sort, ghStats) {
  return [...projects].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'progress') return calcProgress(b.milestones) - calcProgress(a.milestones);
    if (sort === 'priority') return (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1);
    // 'updated' — no live data in App, just keep original order (cards have live stats)
    return 0;
  });
}

export default function App() {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updated');

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'projects.json')
      .then(r => r.json())
      .then(data => setAllProjects(data.projects || []))
      .catch(() => setError('Failed to load projects.json'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = allProjects;
    if (filter !== 'all') result = result.filter(p => p.status === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return sortProjects(result, sort);
  }, [allProjects, filter, search, sort]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #e2e8f0',
        background: '#ffffff',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h1 style={{
              fontSize: 22, fontWeight: 700, color: '#0f172a',
              letterSpacing: '-0.02em', margin: 0, lineHeight: 1,
            }}>
              Projects
            </h1>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
              Personal project tracker — live GitHub stats
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#10b981',
              display: 'inline-block',
              boxShadow: '0 0 0 3px #d1fae5',
            }} />
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>Live</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{
                height: 180, borderRadius: 12,
                background: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
              }} />
            ))}
            <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
          </div>
        )}

        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10,
            padding: 20, color: '#ef4444', fontSize: 14,
          }}>
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <StatsHeader projects={allProjects} />
            <FilterBar
              projects={allProjects}
              filter={filter} setFilter={setFilter}
              search={search} setSearch={setSearch}
              sort={sort} setSort={setSort}
              filteredCount={filtered.length}
            />

            {filtered.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '60px 20px',
                color: '#94a3b8', fontSize: 14,
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                <div style={{ fontWeight: 500, color: '#64748b', marginBottom: 4 }}>No projects found</div>
                <div>Try adjusting your filter or search query</div>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 16,
              }}>
                {filtered.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #e2e8f0',
        background: '#ffffff',
        padding: '14px 24px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 12, color: '#94a3b8' }}>
          Edit <code style={{
            background: '#f1f5f9', color: '#475569',
            padding: '1px 5px', borderRadius: 4, fontSize: 11,
          }}>projects.json</code>{' '}
          to add/update projects · Deployed via GitHub Pages
        </p>
      </footer>
    </div>
  );
}
