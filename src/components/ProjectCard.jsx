import { useState } from 'react';
import { calcProgress, timeAgo, PRIORITY_CONFIG } from '../utils';
import { useGitHubStats } from '../hooks/useGitHubStats';
import ProgressBar from './ProgressBar';
import StatusBadge from './StatusBadge';
import MilestoneList from './MilestoneList';

const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  'React Native': '#61dafb',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
};

function LangDot({ language }) {
  if (!language) return null;
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
      <span style={{
        width: 10, height: 10, borderRadius: '50%',
        background: LANG_COLORS[language] || '#94a3b8',
        display: 'inline-block', flexShrink: 0,
      }} />
      {language}
    </span>
  );
}

function StatSkeleton() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {[80, 60, 70].map((w, i) => (
        <div key={i} style={{
          height: 12, width: w, borderRadius: 6,
          background: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      ))}
    </div>
  );
}

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const { stats, loading } = useGitHubStats(project.repo);
  const progress = calcProgress(project.milestones);
  const priorityCfg = PRIORITY_CONFIG[project.priority] || PRIORITY_CONFIG.medium;
  const completedCount = project.milestones?.filter(m => m.done).length || 0;
  const totalCount = project.milestones?.length || 0;

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .project-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .project-card:hover {
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.08), 0 1px 4px rgba(0,0,0,0.06);
          border-color: #c7d2fe;
        }
        .card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          transition: background 0.15s, border-color 0.15s;
        }
        .card-link:hover {
          background: #f8fafc;
          border-color: #c7d2fe;
          color: #6366f1;
        }
        .expand-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #6366f1;
          font-weight: 500;
          padding: 0;
          font-family: inherit;
        }
        .expand-btn:hover { opacity: 0.75; }
        .tech-tag {
          background: #f1f5f9;
          color: #475569;
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 11px;
          font-weight: 500;
          white-space: nowrap;
        }
      `}</style>

      <div className="project-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, minWidth: 0 }}>
            <span
              title={`${priorityCfg.label} priority`}
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: priorityCfg.color,
                flexShrink: 0, marginTop: 6,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <h3 style={{
                fontSize: 16, fontWeight: 600, color: '#0f172a',
                margin: 0, lineHeight: 1.3, letterSpacing: '-0.01em',
              }}>
                {project.name}
              </h3>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 3, lineHeight: 1.5 }}>
                {project.description}
              </p>
            </div>
          </div>
          <div style={{ flexShrink: 0 }}>
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              {completedCount}/{totalCount} milestones
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: progress === 100 ? '#10b981' : '#6366f1' }}>
              {progress}%
            </span>
          </div>
          <ProgressBar percent={progress} />
        </div>

        {/* Tech stack */}
        {project.tech_stack?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tech_stack.map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        )}

        {/* GitHub stats */}
        <div style={{
          borderTop: '1px solid #f1f5f9', paddingTop: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        }}>
          {loading ? (
            <StatSkeleton />
          ) : stats ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {timeAgo(stats.pushed_at)}
              </span>
              {stats.issues > 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748b' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {stats.issues} open
                </span>
              )}
              <LangDot language={stats.language} />
            </div>
          ) : (
            <span style={{ fontSize: 12, color: '#94a3b8' }}>GitHub stats unavailable</span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
                style={{ color: '#10b981', borderColor: '#a7f3d0' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
                Live
              </a>
            )}
          </div>

          {project.milestones?.length > 0 && (
            <button className="expand-btn" onClick={() => setExpanded(e => !e)}>
              {expanded ? 'Hide' : 'Milestones'}
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          )}
        </div>

        {/* Expanded milestones */}
        {expanded && project.milestones?.length > 0 && (
          <div style={{
            borderTop: '1px solid #f1f5f9', paddingTop: 14,
            animation: 'fadeIn 0.15s ease',
          }}>
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            <MilestoneList milestones={project.milestones} />
          </div>
        )}
      </div>
    </>
  );
}
