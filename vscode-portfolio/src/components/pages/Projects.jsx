import styles from './Projects.module.css'
import { projects } from '../../data/projects'

const a11yDemoFile = {
  id: 'proj-a11y',
  name: 'a11y_checklist.html',
  icon: 'html',
  route: '/projects/a11y',
}

export default function Projects({ onOpenFile }) {
  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.comment}>{'// Projects – 주요 참여 프로젝트'}</p>
        <br />
      </header>

      {/* 라이브 데모: 직접 제작한 접근성 도구 */}
      <button
        type="button"
        className={styles.demoCard}
        onClick={() => onOpenFile?.(a11yDemoFile)}
        aria-label="접근성 체크리스트 도구 라이브 데모 열기"
      >
        <span className={styles.demoIcon} aria-hidden="true">🔧</span>
        <span className={styles.demoText}>
          <span className={styles.demoBadge}>작업 도구</span>
          <span className={styles.demoTitle}>접근성 점검 체크 도구</span>
          <span className={styles.demoDesc}>
            접근성 결함을 점검·개선하면서, 항목을 한눈에 보고 편하게 작업하려고 직접 만든 도구입니다.
          </span>
        </span>
        <span className={styles.demoCta} aria-hidden="true">▶ 열기</span>
      </button>

      <div className={styles.grid}>
        {projects.map((proj) => (
          <section key={proj.id} className={styles.card}>
            <div className={styles.cardAccent} style={{ background: proj.color }} aria-hidden="true" />

            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <div>
                  <h2 className={styles.title} style={{ color: proj.color }}>
                    {proj.title}
                  </h2>
                  <p className={styles.subtitle}>{proj.subtitle}</p>
                </div>
                <div className={styles.meta}>
                  <span className={styles.period}>{proj.period}</span>
                  <span className={styles.role}>{proj.role}</span>
                  <span className={styles.company}>{proj.company}</span>
                </div>
              </div>

              <p className={styles.desc}>{proj.description}</p>

              {/* 핵심 성과 */}
              <div className={styles.achievements} aria-label="핵심 성과">
                {proj.achievements.map((ach, i) => (
                  <div key={i} className={styles.achItem}>
                    <span className={styles.achValue} style={{ color: proj.color }}>
                      {ach.value}
                    </span>
                    <span className={styles.achLabel}>{ach.label}</span>
                    <span className={styles.achDesc}>{ach.desc}</span>
                  </div>
                ))}
              </div>

              {/* 기술 스택 */}
              <div className={styles.skillList} aria-label="사용 기술">
                {proj.skills.map((s) => (
                  <span key={s} className={styles.skill} style={{ borderColor: proj.color + '44' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
