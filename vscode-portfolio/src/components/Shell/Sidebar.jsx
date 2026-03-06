import { useState } from 'react'
import styles from './Sidebar.module.css'
import { fileTree, iconColors } from '../../data/fileTree'

function FileIcon({ icon }) {
  const color = iconColors[icon] || '#858585'
  const labels = {
    react: 'React',
    vue: 'Vue',
    javascript: 'JS',
    html: 'HTML',
    json: 'JSON',
    markdown: 'MD',
  }
  return (
    <span className={styles.fileIcon} style={{ color }} aria-hidden="true">
      {labels[icon] || '•'}
    </span>
  )
}

function FolderIcon({ open }) {
  return (
    <svg className={styles.folderIcon} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {open ? (
        <path d="M1.5 3h4.379l1.06 1.06.94.94H14.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      ) : (
        <path d="M1.5 3h4.379l1.06 1.06.94.94H14.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" opacity="0.6" />
      )}
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.open : ''}`}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  )
}

function TreeNode({ node, depth = 0, onFileClick, activeRoute }) {
  const [open, setOpen] = useState(node.open ?? false)

  if (node.type === 'folder') {
    return (
      <div>
        <button
          className={styles.treeItem}
          style={{ paddingLeft: `${depth * 12 + 4}px` }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <ChevronIcon open={open} />
          <FolderIcon open={open} />
          <span className={styles.itemName} style={{ color: 'var(--icon-folder)' }}>
            {node.name}
          </span>
        </button>
        {open && (
          <div>
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                onFileClick={onFileClick}
                activeRoute={activeRoute}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  const isActive = activeRoute === node.route
  return (
    <button
      className={`${styles.treeItem} ${styles.fileItem} ${isActive ? styles.active : ''}`}
      style={{ paddingLeft: `${depth * 12 + 20}px` }}
      onClick={() => onFileClick(node)}
      aria-current={isActive ? 'page' : undefined}
    >
      <FileIcon icon={node.icon} />
      <span className={styles.itemName}>{node.name}</span>
    </button>
  )
}

export default function Sidebar({ activeSection, onFileClick, activeRoute }) {
  const sectionTitles = {
    explorer: 'EXPLORER',
    skills: 'SKILLS',
    projects: 'PROJECTS',
    contact: 'CONTACT',
  }

  return (
    <nav className={styles.sidebar} aria-label="파일 탐색기">
      <div className={styles.sectionTitle}>{sectionTitles[activeSection] || 'EXPLORER'}</div>
      <div className={styles.treeRoot}>
        {fileTree.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            onFileClick={onFileClick}
            activeRoute={activeRoute}
          />
        ))}
      </div>
    </nav>
  )
}
