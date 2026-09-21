export default function MilestoneList({ milestones }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {milestones.map((m, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <span style={{
            width: 16, height: 16, borderRadius: 4, flexShrink: 0,
            background: m.done ? '#6366f1' : 'transparent',
            border: m.done ? 'none' : '2px solid #cbd5e1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, color: '#fff',
          }}>{m.done ? '✓' : ''}</span>
          <span style={{ color: m.done ? '#64748b' : '#0f172a', textDecoration: m.done ? 'line-through' : 'none' }}>
            {m.name}
          </span>
        </div>
      ))}
    </div>
  );
}
