import styles from './ActivityBar.module.css'

const icons = [
  { id: 'explorer', label: '탐색기', svg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7C3 5.9 3.9 5 5 5h5l2 2h7c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7z"/>
    </svg>
  )},
  { id: 'skills', label: '스킬', svg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  )},
  { id: 'projects', label: '프로젝트', svg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  )},
  { id: 'contact', label: '연락처', svg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )},
]

export default function ActivityBar({ active, onSelect }) {
  return (
    <aside className={styles.activityBar} aria-label="액티비티 바">
      <div className={styles.iconGroup}>
        {icons.map((icon) => (
          <button
            key={icon.id}
            className={`${styles.iconBtn} ${active === icon.id ? styles.active : ''}`}
            onClick={() => onSelect(icon.id)}
            aria-label={icon.label}
            title={icon.label}
          >
            {icon.svg}
          </button>
        ))}
      </div>
      <div className={styles.bottomGroup}>
        <button className={styles.iconBtn} aria-label="설정" title="설정">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>
    </aside>
  )
}
