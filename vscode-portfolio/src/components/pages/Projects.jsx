import styles from './Projects.module.css'
import { projects } from '../../data/projects'

export default function Projects() {
  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.comment}>{'// Projects – 주요 참여 프로젝트'}</p>
        <br />
      </header>

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
