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

        {/* AI 활용 어필 - 서술형 주석 */}
        <p className={styles.comment}>{`/**`}</p>
        <p className={styles.comment}>{` * [ 기술 스택에 대하여 ]`}</p>
        <p className={styles.comment}>{` *`}</p>
        <p className={styles.comment}>{` * 6년 이상의 경력 동안 HTML/CSS 기반의 웹 퍼블리싱을 전문으로 해왔습니다.`}</p>
        <p className={styles.comment}>{` * 접근성, 시맨틱 마크업, 크로스브라우저 대응, CSS/SCSS 설계 등`}</p>
        <p className={styles.comment}>{` * 퍼블리싱 영역에서 탄탄한 실무 경험을 쌓아왔습니다.`}</p>
        <p className={styles.comment}>{` *`}</p>
        <p className={styles.comment}>{` * 다만 React · Vue 같은 프레임워크는 상대적으로 부족한 부분이 있다는 것을 잘 알고 있습니다.`}</p>
        <p className={styles.comment}>{` * 하지만 저는 이 시점을 오히려 기회라고 생각합니다.`}</p>
        <p className={styles.comment}>{` *`}</p>
        <p className={styles.comment}>{` * AI 기술이 빠르게 발전하면서 지금은 AI를 적극적으로 활용해 부족한 부분을 보완하고,`}</p>
        <p className={styles.comment}>{` * 더 나은 결과물을 만들어낼 수 있는 환경이 갖춰졌습니다.`}</p>
        <p className={styles.comment}>{` * 이 포트폴리오 자체도 Claude AI와 협업하여 React + Vue 통합 구조로 구현한 결과물입니다.`}</p>
        <p className={styles.comment}>{` *`}</p>
        <p className={styles.comment}>{` * 퍼블리셔로서 쌓아온 UI/UX 감각과 마크업 품질에,`}</p>
        <p className={styles.comment}>{` * AI를 도구로 활용하는 적응력과 실행력을 더해`}</p>
        <p className={styles.comment}>{` * 변화하는 개발 환경에서 지속적으로 성장해 나가고 있습니다.`}</p>
        <p className={styles.comment}>{` */`}</p>
        <br />

        {/* AI 활용 어필 - 코드 요약 */}
        <p>
          <span className={styles.keyword}>const</span>{' '}
          <span className={styles.variable}>mindset</span>{' '}
          <span className={styles.operator}>=</span>{' '}
          <span className={styles.punctuation}>{'{'}</span>
        </p>
        <div className={styles.block}>
          <p>
            <span className={styles.property}>strength</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>"HTML/CSS · SCSS · 접근성 · 시맨틱 마크업 · 크로스브라우저"</span>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>growing</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>"React · Vue 3 — AI 협업으로 실무 적용 중"</span>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>approach</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>"부족한 부분은 인정하고, AI를 활용해 더 나은 결과물로"</span>
            <span className={styles.punctuation}>,</span>
          </p>
          <p>
            <span className={styles.property}>proof</span>
            <span className={styles.punctuation}>: </span>
            <span className={styles.string}>"이 포트폴리오 = Claude AI 협업 결과물"</span>
            <span className={styles.punctuation}>,</span>
          </p>
        </div>
        <p><span className={styles.punctuation}>{'}'}</span></p>
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
