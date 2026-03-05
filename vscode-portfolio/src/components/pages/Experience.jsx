import styles from './Experience.module.css'
import { experiences } from '../../data/resume'

export default function Experience() {
  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.breadcrumb}>
          <span className={styles.keyword}>import</span>{' '}
          <span className={styles.variable}>experience</span>{' '}
          <span className={styles.keyword}>from</span>{' '}
          <span className={styles.string}>'./career-history'</span>
        </p>
      </header>

      <div className={styles.timeline}>
        {experiences.map((exp, idx) => (
          <section key={idx} className={styles.card}>
            <div className={styles.dot} aria-hidden="true" />
            {idx < experiences.length - 1 && <div className={styles.line} aria-hidden="true" />}

            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.company}>{exp.company}</h2>
                  <p className={styles.dept}>{exp.dept}</p>
                </div>
                <span className={styles.period}>{exp.period}</span>
              </div>

              <p className={styles.role}>
                <span className={styles.keyword}>role</span>
                <span className={styles.punctuation}>{': '}</span>
                <span className={styles.string}>{`"${exp.role}"`}</span>
              </p>

              <ul className={styles.highlights}>
                {exp.highlights.map((h, i) => (
                  <li key={i} className={styles.highlight}>
                    <span className={styles.bullet} aria-hidden="true">▶</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className={styles.skillList} aria-label="사용 기술">
                {exp.skills.map((s) => (
                  <span key={s} className={styles.skill}>{s}</span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}
