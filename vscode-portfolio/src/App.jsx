import { useState, useCallback, lazy, Suspense } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ActivityBar from './components/Shell/ActivityBar'
import Sidebar from './components/Shell/Sidebar'
import TabBar from './components/Shell/TabBar'
import StatusBar from './components/Shell/StatusBar'
import Welcome from './components/pages/Welcome'
import { useTabs } from './hooks/useTabs'
import { fileTree } from './data/fileTree'
import styles from './App.module.css'

function collectFolderDefaults(nodes, acc = {}) {
  for (const n of nodes) {
    if (n.type === 'folder') {
      acc[n.id] = n.open ?? false
      if (n.children) collectFolderDefaults(n.children, acc)
    }
  }
  return acc
}

const About = lazy(() => import('./components/pages/About'))
const Experience = lazy(() => import('./components/pages/Experience'))
const Projects = lazy(() => import('./components/pages/Projects'))
const Skills = lazy(() => import('./components/pages/Skills'))
const Contact = lazy(() => import('./components/pages/Contact'))
const Guide = lazy(() => import('./components/pages/Guide'))
const A11yChecklist = lazy(() => import('./components/pages/A11yChecklist'))

const routeMap = {
  '/about': About,
  '/experience/kt': Experience,
  '/experience/skt': Experience,
  '/experience/amore': Experience,
  '/skills': Skills,
  '/projects': Projects,
  '/projects/a11y': A11yChecklist,
  '/contact': Contact,
  '/guide': Guide,
}

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('explorer')
  const [theme, setTheme] = useState('dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openFolders, setOpenFolders] = useState(() => collectFolderDefaults(fileTree))
  const { tabs, activeTab, openTab, closeTab, activateTab } = useTabs([])

  const toggleFolder = useCallback((id) => {
    setOpenFolders((f) => ({ ...f, [id]: !f[id] }))
  }, [])

  const handleFileClick = useCallback(
    (file) => {
      openTab(file)
      navigate(file.route)
    },
    [openTab, navigate]
  )

  // Welcome 화면 단축 카드: 해당 폴더를 펼치고 파일을 탭으로 연다
  const handleShortcut = useCallback(
    (shortcut) => {
      if (shortcut.expand) {
        setOpenFolders((f) => ({ ...f, [shortcut.expand]: true }))
      }
      handleFileClick(shortcut.file)
    },
    [handleFileClick]
  )

  const handleTabActivate = useCallback(
    (tabId) => {
      activateTab(tabId)
      const tab = tabs.find((t) => t.id === tabId)
      if (tab) navigate(tab.route)
    },
    [activateTab, tabs, navigate]
  )

  const handleTabClose = useCallback(
    (tabId, e) => {
      const idx = tabs.findIndex((t) => t.id === tabId)
      const remaining = tabs.filter((t) => t.id !== tabId)
      closeTab(tabId, e)
      if (remaining.length > 0) {
        const next = remaining[Math.min(idx, remaining.length - 1)]
        navigate(next.route)
      }
    },
    [tabs, closeTab, navigate]
  )

  const handleSectionSelect = useCallback(
    (section) => {
      setActiveSection(section)
      const sectionFiles = {
        explorer: null,
        skills: { id: 'frontend', name: 'frontend.js', icon: 'javascript', route: '/skills' },
        projects: { id: 'proj-kt', name: 'KT_portal.html', icon: 'html', route: '/projects' },
        contact: { id: 'contact', name: 'contact.vue', icon: 'vue', route: '/contact' },
      }
      const file = sectionFiles[section]
      if (file) handleFileClick(file)
    },
    [handleFileClick]
  )

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next === 'light' ? 'light' : '')
      return next
    })
  }, [])

  const currentRoute = location.pathname === '/' ? '/about' : location.pathname
  const CurrentPage = routeMap[currentRoute] || About
  const currentTab = tabs.find((t) => t.id === activeTab)

  const handleFileClickMobile = useCallback(
    (file) => {
      handleFileClick(file)
      setSidebarOpen(false) // 모바일: 파일 클릭 시 사이드바 닫기
    },
    [handleFileClick]
  )

  return (
    <div className={styles.app}>
      {/* 타이틀 바 */}
      <div className={styles.titleBar}>
        <button
          className={styles.hamburger}
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="사이드바 열기/닫기"
          aria-expanded={sidebarOpen}
        >
          <span /><span /><span />
        </button>
        <span className={styles.titleText}>김석현 | Web Publisher Portfolio</span>
      </div>

      <div className={styles.body}>
        <ActivityBar active={activeSection} onSelect={handleSectionSelect} />

        {/* 모바일 오버레이 */}
        {sidebarOpen && (
          <div
            className={styles.overlay}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className={`${styles.sidebarWrap} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
          <Sidebar
            activeSection={activeSection}
            onFileClick={handleFileClickMobile}
            activeRoute={currentRoute}
            openFolders={openFolders}
            onToggleFolder={toggleFolder}
          />
        </div>

        <main className={styles.main} id="main-content" role="main">
          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            onActivate={handleTabActivate}
            onClose={handleTabClose}
          />
          <div className={styles.editor}>
            {tabs.length === 0 ? (
              <Welcome onShortcut={handleShortcut} />
            ) : (
              <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
                <CurrentPage onOpenFile={handleFileClick} />
              </Suspense>
            )}
          </div>
        </main>
      </div>

      <StatusBar activeTab={currentTab} theme={theme} onToggleTheme={toggleTheme} />
    </div>
  )
}
