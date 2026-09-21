import { calcProgress } from '../utils';

export default function StatsHeader({ projects }) {
  const total = projects.length;
  const active = projects.filter(p => p.status === 'active').length;
  const completed = projects.filter(p => p.status === 'completed').length;
  const avgProgress = total > 0
    ? Math.round(projects.reduce((sum, p) => sum + calcProgress(p.milestones), 0) / total)
    : 0;

  const stats = [
    { label: 'Total Projects', value: total, color: '#6366f1' },
    { label: 'Active', value: active, color: '#10b981' },
    { label: 'Completed', value: completed, color: '#8b5cf6' },
    { label: 'Avg Progress', value: `${avgProgress}%`, color: '#f59e0b' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
    }}>
      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
      {stats.map(s => (
        <div
          key={s.label}
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 10,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <span style={{
            fontSize: 28, fontWeight: 700, color: s.color,
            letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>
            {s.value}
          </span>
          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, letterSpacing: '0.02em' }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
