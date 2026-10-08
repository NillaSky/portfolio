import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Experience.module.css'
import { experiences, timelineTags, mcpUsages } from '../../data/resume'

// experience/ 폴더의 파일 ↔ 경력 데이터 매핑 (최신순)
const ENTRIES = [
  { file: { id: 'kt-op', name: 'KT_Operation.jsx', icon: 'react', route: '/experience/kt-op' }, company: '엘루오씨앤씨', project: 'kt-op', showMcp: true },
  { file: { id: 'kt', name: 'KT_MVNO.jsx', icon: 'react', route: '/experience/kt' }, company: '엘루오씨앤씨', project: 'kt-mvno', showHighlights: true },
  { file: { id: 'amore', name: 'AmoreMall.jsx', icon: 'react', route: '/experience/amore' }, company: '(주)아모레퍼시픽', showHighlights: true },
  { file: { id: 'skt', name: 'SKT_Tworld.jsx', icon: 'react', route: '/experience/skt' }, company: '네티브레드 / 알릭 인터렉티브', showHighlights: true },
]

const OVERVIEW_FILE = { id: 'exp-overview', name: '_overview.jsx', icon: 'react', route: '/experience' }

function fileOfCompany(company) {
  const entry = ENTRIES.find((e) => e.company === company)
  return entry && entry.file
}

function Timeline({ items, filter, onOpenFile }) {
  const visible = filter === 'all' ? items : items.filter((item) => item.tags.includes(filter))

  if (visible.length === 0) {
    return <p className={styles.empty}>{'// 해당 분류의 작업이 없어요'}</p>
  }

  return (
    <ol className={styles.workList}>
      {visible.map((item) => (
        <li key={item.title} className={styles.workItem}>
          <time className={styles.workDate} dateTime={item.date.split(' ')[0].replace('.', '-')}>
            {item.date}
          </time>
          <div className={styles.workBody}>
            <h3 className={styles.workTitle}>{item.title}</h3>
            <p className={styles.workDetail}>{item.detail}</p>
            <div className={styles.workMeta}>
              {item.tags.map((tag) => (
                <span key={tag} className={`${styles.tag} ${styles[`tag_${tag}`]}`}>
                  {timelineTags[tag]}
                </span>
              ))}
              {item.mcp.map((name) => (
                <span key={name} className={styles.mcp}>
                  {name}
                </span>
              ))}
              {item.link && (
                <button type="button" className={styles.workLink} onClick={() => onOpenFile?.(item.link.file)}>
                  {item.link.label} →
                </button>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

function McpSummary() {
  return (
    <section className={styles.mcpSection} aria-labelledby="mcp-title">
      <h2 id="mcp-title" className={styles.sectionTitle}>
        <span className={styles.keyword}>const</span> <span className={styles.variable}>workflow</span>
        <span className={styles.punctuation}>{' = '}</span>
        <span className={styles.string}>'MCP로 시안 → 구현 → 검증'</span>
      </h2>
      <dl className={styles.mcpList}>
        {mcpUsages.map((m) => (
          <div key={m.name} className={styles.mcpItem}>
            <dt className={styles.mcpName}>{m.name}</dt>
            <dd className={styles.mcpUse}>{m.use}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Overview({ onOpenFile }) {
  return (
    <ol className={styles.overview}>
      {experiences.map((exp) => {
        const file = fileOfCompany(exp.company)
        const projectFiles = exp.projects
          ? exp.projects.map((p) => ENTRIES.find((e) => e.project === p.id)?.file).filter(Boolean)
          : file
            ? [file]
            : []
        return (
          <li key={exp.company} className={styles.overviewItem}>
            <span className={styles.overviewPeriod}>{exp.period}</span>
            <div className={styles.overviewBody}>
              <h2 className={styles.overviewCompany}>
                {exp.company}
                <span className={styles.overviewRole}>{exp.role}</span>
              </h2>
              <p className={styles.overviewLine}>{exp.projects ? exp.projects.map((p) => p.name).join(' · ') : exp.highlights[0]}</p>
              {projectFiles.length > 0 && (
                <div className={styles.overviewLinks}>
                  {projectFiles.map((f) => (
                    <button key={f.id} type="button" className={styles.fileLink} onClick={() => onOpenFile?.(f)}>
                      {f.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default function Experience({ onOpenFile }) {
  const { pathname } = useLocation()
  const [filter, setFilter] = useState('all')
  const wrapperRef = useRef(null)
  const titleRef = useRef(null)

  const index = ENTRIES.findIndex((e) => e.file.route === pathname)
  const entry = ENTRIES[index]
  const exp = entry && experiences.find((e) => e.company === entry.company)
  const project = entry?.project && exp?.projects?.find((p) => p.id === entry.project)
  const fileName = entry ? entry.file.name : OVERVIEW_FILE.name
  // 이 파일의 타임라인에 실제로 있는 분류만 필터로 노출
  const filters = project
    ? [['all', '전체'], ...Object.entries(timelineTags).filter(([key]) => project.timeline.some((i) => i.tags.includes(key)))]
    : []

  // 파일이 바뀌면 맨 위로 올리고 제목으로 초점을 옮겨 화면 전환을 알림
  useEffect(() => {
    setFilter('all')
    wrapperRef.current?.scrollTo(0, 0)
    titleRef.current?.focus({ preventScroll: true })
  }, [pathname])

  const prev = index > 0 ? ENTRIES[index - 1].file : index === 0 ? OVERVIEW_FILE : null
  const next = index < ENTRIES.length - 1 ? ENTRIES[index + 1].file : null

  return (
    <article className={styles.wrapper} ref={wrapperRef}>
      <header className={styles.header}>
        <p className={styles.comment}>{`// experience/${fileName}`}</p>
        <p className={styles.breadcrumb}>
          <span className={styles.keyword}>import</span> <span className={styles.variable}>experience</span>{' '}
          <span className={styles.keyword}>from</span> <span className={styles.string}>'./career-history'</span>
        </p>
        {entry && (
          <p className={styles.position} aria-label={`경력 ${index + 1} / ${ENTRIES.length}`}>
            {String(index + 1).padStart(2, '0')} / {String(ENTRIES.length).padStart(2, '0')}
          </p>
        )}
      </header>

      {!entry && (
        <>
          <h1 className={styles.pageTitle} ref={titleRef} tabIndex={-1}>
            경력 연표
          </h1>
          <Overview onOpenFile={onOpenFile} />
        </>
      )}

      {entry && exp && (
        <section className={styles.cardInner} aria-labelledby="exp-title">
          <div className={styles.cardHeader}>
            <div>
              <h1 id="exp-title" className={styles.company} ref={titleRef} tabIndex={-1}>
                {project ? project.name : exp.company}
              </h1>
              <p className={styles.dept}>
                {exp.company} · {exp.dept}
              </p>
            </div>
            <span className={styles.period}>{project ? project.period : exp.period}</span>
          </div>

          <p className={styles.role}>
            <span className={styles.keyword}>role</span>
            <span className={styles.punctuation}>{': '}</span>
            <span className={styles.string}>{`"${project ? project.role : exp.role}"`}</span>
          </p>

          {project && <p className={styles.projectSummary}>{project.summary}</p>}

          {entry.showHighlights && (
            <ul className={styles.highlights}>
              {exp.highlights.map((h, i) => (
                <li key={i} className={styles.highlight}>
                  <span className={styles.bullet} aria-hidden="true">▶</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          {entry.showMcp && <McpSummary />}

          {project && (
            <>
              <div className={styles.filterBar} role="group" aria-label="작업 분류 필터">
                {filters.map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    className={styles.filterBtn}
                    aria-pressed={filter === key}
                    onClick={() => setFilter(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <h2 className="sr-only">작업 타임라인</h2>
              <Timeline items={project.timeline} filter={filter} onOpenFile={onOpenFile} />
            </>
          )}

          <div className={styles.skillList} aria-label="사용 기술">
            {exp.skills.map((s) => (
              <span key={s} className={styles.skill}>{s}</span>
            ))}
          </div>
        </section>
      )}

      <nav className={styles.pager} aria-label="경력 파일 이동">
        {prev ? (
          <button type="button" className={styles.pagerBtn} onClick={() => onOpenFile?.(prev)}>
            <span className={styles.pagerDir}>← 이전</span>
            <span className={styles.pagerName}>{prev.name}</span>
          </button>
        ) : (
          <span />
        )}
        {(next || !entry) && (
          <button
            type="button"
            className={`${styles.pagerBtn} ${styles.pagerNext}`}
            onClick={() => onOpenFile?.(next || ENTRIES[0].file)}
          >
            <span className={styles.pagerDir}>다음 →</span>
            <span className={styles.pagerName}>{(next || ENTRIES[0].file).name}</span>
          </button>
        )}
      </nav>
    </article>
  )
}
