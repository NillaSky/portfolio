import styles from './About.module.css'
import { profile, education } from '../../data/resume'

export default function About() {
  return (
    <article className={styles.wrapper}>
      <div className={styles.lineNumbers} aria-hidden="true">
        {Array.from({ length: 60 }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>

      <div className={styles.content}>
        <p className={styles.comment}>{`# ${profile.name} | ${profile.title}`}</p>
        <p className={styles.comment}>{`# Web Publisher Portfolio – README.md`}</p>
        <p className={styles.comment}>{`# Last updated: 2026-03-05`}</p>
        <br />

        {/* 프로필 카드 */}
        <div className={styles.profileCard}>
          <div className={styles.avatar} aria-label="프로필 이미지">
            <span className={styles.avatarInitial}>KSH</span>
          </div>
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>{profile.name}</p>
            <p className={styles.profileTitle}>{profile.title}</p>
            <div className={styles.profileLinks}>
              <a href={`mailto:${profile.email}`} className={styles.profileLink}>
                ✉ {profile.email}
              </a>
              <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className={styles.profileLink}>
                🔗 Portfolio
              </a>
            </div>
          </div>
        </div>
        <br />

        {/* 자기소개 */}
        <p>
          <span className={styles.keyword}>const</span>{' '}
          <span className={styles.variable}>me</span>{' '}
          <span className={styles.operator}>=</span>{' '}
          <span className={styles.punctuation}>{'{'}</span>
        </p>
        <div className={styles.block}>
          <p>
            <span className={styles.property}>name</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>{`"${profile.name}"`}</span>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>title</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>{`"${profile.title}"`}</span>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>email</span>
            <span className={styles.punctuation}>: </span>
            <a href={`mailto:${profile.email}`} className={styles.string}>
              {`"${profile.email}"`}
            </a>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>phone</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>{`"${profile.phone}"`}</span>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>portfolio</span>
            <span className={styles.punctuation}>: </span>
            <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className={styles.string}>
              {`"${profile.portfolio}"`}
            </a>
            <span className={styles.punctuation}>,</span>
          </p>
        </div>
        <p><span className={styles.punctuation}>{'}'}</span></p>
        <br />

        {/* 소개글 */}
        <p className={styles.comment}>{`/**`}</p>
        <p className={styles.comment}>{` * ${profile.intro}`}</p>
        <p className={styles.comment}>{` *`}</p>
        <p className={styles.comment}>{` * ${profile.description}`}</p>
        <p className={styles.comment}>{` */`}</p>
        <br />

        {/* 학력 */}
        <p>
          <span className={styles.keyword}>const</span>{' '}
          <span className={styles.variable}>education</span>{' '}
          <span className={styles.operator}>=</span>{' '}
          <span className={styles.punctuation}>{'{'}</span>
        </p>
        <div className={styles.block}>
          <p>
            <span className={styles.property}>school</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>{`"${education.school}"`}</span>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>major</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>{`"${education.major}"`}</span>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>period</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>{`"${education.period}"`}</span>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>gpa</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.number}>{`${education.gpa}`}</span>
            <span className={styles.punctuation}>,</span>
          </p>
        </div>
        <p><span className={styles.punctuation}>{'}'}</span></p>
      </div>
    </article>
  )
}
