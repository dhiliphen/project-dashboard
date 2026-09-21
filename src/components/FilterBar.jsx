import { STATUS_CONFIG } from '../utils';

const SORT_OPTIONS = [
  { value: 'updated', label: 'Last Updated' },
  { value: 'progress', label: 'Progress' },
  { value: 'priority', label: 'Priority' },
  { value: 'name', label: 'Name' },
];

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export default function FilterBar({ projects, filter, setFilter, search, setSearch, sort, setSort, filteredCount }) {
  const statusFilters = ['all', 'active', 'planning', 'on-hold', 'completed'];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 12,
      background: '#ffffff', border: '1px solid #e2e8f0',
      borderRadius: 10, padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        {/* Status filter pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {statusFilters.map(f => {
            const isActive = filter === f;
            const cfg = STATUS_CONFIG[f];
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '5px 12px', borderRadius: 99, border: '1px solid',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'inherit',
                  borderColor: isActive ? (cfg?.color || '#6366f1') : '#e2e8f0',
                  background: isActive ? (cfg?.bg || '#ede9fe') : '#ffffff',
                  color: isActive ? (cfg?.color || '#6366f1') : '#64748b',
                  transition: 'all 0.15s',
                }}
              >
                {f === 'all' ? 'All' : (cfg?.label || f)}
              </button>
            );
          })}
        </div>

        {/* Right side: count + sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>
            {filteredCount} project{filteredCount !== 1 ? 's' : ''}
          </span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              fontSize: 12, color: '#475569', border: '1px solid #e2e8f0',
              borderRadius: 6, padding: '4px 8px', background: '#ffffff',
              fontFamily: 'inherit', cursor: 'pointer', outline: 'none',
            }}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#94a3b8" strokeWidth="2"
          style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        >
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '7px 10px 7px 30px',
            border: '1px solid #e2e8f0', borderRadius: 7,
            fontSize: 13, color: '#0f172a', background: '#f8fafc',
            fontFamily: 'inherit', outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = '#a5b4fc'}
          onBlur={e => e.target.style.borderColor = '#e2e8f0'}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94a3b8', fontSize: 16, lineHeight: 1, padding: 2,
            }}
          >×</button>
        )}
      </div>
    </div>
  );
}
