export default function ProgressBar({ percent, color = '#6366f1', height = 6 }) {
  return (
    <div style={{ background: '#e2e8f0', borderRadius: 99, height, overflow: 'hidden', width: '100%' }}>
      <div style={{
        width: `${Math.min(100, percent)}%`, height: '100%',
        background: percent === 100 ? '#10b981' : color,
        borderRadius: 99, transition: 'width 0.6s ease',
      }} />
    </div>
  );
}
