export function calcProgress(milestones) {
  if (!milestones?.length) return 0;
  return Math.round((milestones.filter(m => m.done).length / milestones.length) * 100);
}

export function timeAgo(dateStr) {
  if (!dateStr) return 'Never';
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days/7)}w ago`;
  if (days < 365) return `${Math.floor(days/30)}mo ago`;
  return `${Math.floor(days/365)}y ago`;
}

export const STATUS_CONFIG = {
  active:    { label: 'Active',     color: '#10b981', bg: '#d1fae5' },
  planning:  { label: 'Planning',   color: '#f59e0b', bg: '#fef3c7' },
  'on-hold': { label: 'On Hold',    color: '#64748b', bg: '#f1f5f9' },
  completed: { label: 'Completed',  color: '#6366f1', bg: '#ede9fe' },
};

export const PRIORITY_CONFIG = {
  high:   { label: 'High',   color: '#ef4444' },
  medium: { label: 'Medium', color: '#f59e0b' },
  low:    { label: 'Low',    color: '#10b981' },
};
