import styles from './StatusBar.module.css'

export default function StatusBar({ activeTab, theme, onToggleTheme }) {
  const ext = activeTab?.name?.split('.').pop() || ''
  const langMap = {
    jsx: 'JavaScript React',
    vue: 'Vue',
    js: 'JavaScript',
    html: 'HTML',
    json: 'JSON',
    md: 'Markdown',
  }
  const lang = langMap[ext] || 'Plain Text'

  return (
    <footer className={styles.statusBar} aria-label="상태 바">
      <div className={styles.left}>
        <span className={styles.item}>
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm-.5 3h1v5h-1V5zm0 6h1v1h-1v-1z"/>
          </svg>
          spa
        </span>
        <span className={styles.item}>
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true">
            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          Web Publisher
        </span>
      </div>
      <div className={styles.right}>
        {activeTab && (
          <>
            <span className={styles.item}>{lang}</span>
            <span className={`${styles.item} ${styles.hideOnMobile}`}>UTF-8</span>
            <span className={`${styles.item} ${styles.hideOnMobile}`}>Ln 1, Col 1</span>
          </>
        )}
        <button
          className={`${styles.item} ${styles.themeBtn}`}
          onClick={onToggleTheme}
          aria-label={`${theme === 'dark' ? '라이트' : '다크'} 테마로 전환`}
          title={`테마 전환 (현재: ${theme === 'dark' ? '다크' : '라이트'})`}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </footer>
  )
}
