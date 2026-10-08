import styles from './Welcome.module.css'

const shortcuts = [
  {
    key: 'README.md',
    desc: '자기소개 보기',
    icon: '📄',
    file: { id: 'readme', name: 'README.md', icon: 'markdown', route: '/about' },
  },
  {
    key: 'experience/',
    desc: '경력 타임라인',
    icon: '💼',
    expand: 'experience',
    file: { id: 'exp-overview', name: '_overview.jsx', icon: 'react', route: '/experience' },
  },
  {
    key: 'projects/',
    desc: '보안 리포트 UI 데모',
    icon: '🖥',
    expand: 'projects',
    file: { id: 'proj-secure', name: 'secure_report_demo.html', icon: 'html', route: '/projects/secure-report' },
  },
  {
    key: 'contact.vue',
    desc: '연락하기 (Vue)',
    icon: '✉️',
    file: { id: 'contact', name: 'contact.vue', icon: 'vue', route: '/contact' },
  },
]

export default function Welcome({ onShortcut }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.logo} aria-hidden="true">{'</>'}</div>
        <h1 className={styles.title}>김석현 | Web Publisher</h1>
        <p className={styles.sub}>아래 항목이나 왼쪽 탐색기에서 클릭하면 탭으로 열립니다.</p>

        <div className={styles.grid}>
          {shortcuts.map((s) => (
            <button
              type="button"
              key={s.key}
              className={styles.card}
              onClick={() => onShortcut?.(s)}
            >
              <span className={styles.icon} aria-hidden="true">{s.icon}</span>
              <div>
                <p className={styles.cardKey}>{s.key}</p>
                <p className={styles.cardDesc}>{s.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <p className={styles.hint}>
          <span className={styles.keyword}>const</span>{' '}
          <span className={styles.var}>stack</span>{' = ['}
          <span className={styles.str}>"React"</span>{', '}
          <span className={styles.str}>"Vue 3"</span>{', '}
          <span className={styles.str}>"HTML/CSS"</span>{', '}
          <span className={styles.str}>"SCSS"</span>
          {']'}
        </p>
      </div>
    </div>
  )
}
