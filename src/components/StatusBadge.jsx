import { STATUS_CONFIG } from '../utils';
export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.planning;
  return (
    <span style={{
      background: cfg.bg, color: cfg.color,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.5px',
      padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase',
    }}>{cfg.label}</span>
  );
}
