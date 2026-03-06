import styles from './Welcome.module.css'

const shortcuts = [
  { key: 'README.md', desc: '자기소개 보기', icon: '📄' },
  { key: 'experience/', desc: '경력 타임라인', icon: '💼' },
  { key: 'skills/frontend.js', desc: '기술 스택 차트 (Vue)', icon: '⚡' },
  { key: 'projects/', desc: '프로젝트 갤러리', icon: '🖥' },
  { key: 'contact.vue', desc: '연락하기 (Vue)', icon: '✉️' },
]

export default function Welcome() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.logo} aria-hidden="true">{'</>'}</div>
        <h1 className={styles.title}>김석현 | Web Publisher</h1>
        <p className={styles.sub}>왼쪽 탐색기에서 파일을 클릭하면 탭으로 열립니다.</p>

        <div className={styles.grid}>
          {shortcuts.map((s) => (
            <div key={s.key} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">{s.icon}</span>
              <div>
                <p className={styles.cardKey}>{s.key}</p>
                <p className={styles.cardDesc}>{s.desc}</p>
              </div>
            </div>
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
