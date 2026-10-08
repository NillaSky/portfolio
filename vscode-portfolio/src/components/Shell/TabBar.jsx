import styles from './TabBar.module.css'
import { iconColors } from '../../data/fileTree'

function FileLabel({ icon, name }) {
  const color = iconColors[icon] || '#858585'
  const labels = { react: 'jsx', vue: 'vue', javascript: 'js', html: 'html', json: 'json', markdown: 'md' }
  return (
    <span className={styles.tabLabel}>
      <span className={styles.tabIcon} style={{ color }} aria-hidden="true">
        {labels[icon] || ''}
      </span>
      <span>{name}</span>
    </span>
  )
}

export default function TabBar({ tabs, activeTab, onActivate, onClose }) {
  if (tabs.length === 0) return <div className={styles.tabBar} />

  return (
    <div className={styles.tabBar} role="tablist" aria-label="열린 파일 탭">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onActivate(tab.id)}
        >
          <FileLabel icon={tab.icon} name={tab.name} />
          <button
            className={styles.closeBtn}
            onClick={(e) => onClose(tab.id, e)}
            aria-label={`${tab.name} 닫기`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
