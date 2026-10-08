export const fileTree = [
  {
    id: 'portfolio',
    name: 'PORTFOLIO',
    type: 'folder',
    open: true,
    children: [
      {
        id: 'readme',
        name: 'README.md',
        type: 'file',
        icon: 'markdown',
        route: '/about',
      },
      {
        id: 'experience',
        name: 'experience',
        type: 'folder',
        open: true,
        children: [
          { id: 'exp-overview', name: '_overview.jsx', type: 'file', icon: 'react', route: '/experience' },
          { id: 'kt-op', name: 'KT_Operation.jsx', type: 'file', icon: 'react', route: '/experience/kt-op' },
          { id: 'kt', name: 'KT_MVNO.jsx', type: 'file', icon: 'react', route: '/experience/kt' },
          { id: 'amore', name: 'AmoreMall.jsx', type: 'file', icon: 'react', route: '/experience/amore' },
          { id: 'skt', name: 'SKT_Tworld.jsx', type: 'file', icon: 'react', route: '/experience/skt' },
        ],
      },
      {
        id: 'projects',
        name: 'projects',
        type: 'folder',
        open: false,
        children: [
          { id: 'proj-secure', name: 'secure_report_demo.html', type: 'file', icon: 'html', route: '/projects/secure-report' },
          { id: 'proj-guide', name: 'component_guide.html', type: 'file', icon: 'html', route: '/projects/component-guide' },
          { id: 'proj-a11y', name: 'a11y_checklist.html', type: 'file', icon: 'html', route: '/projects/a11y' },
          { id: 'guide', name: 'PORTFOLIO_GUIDE.html', type: 'file', icon: 'html', route: '/guide' },
        ],
      },
      { id: 'contact', name: 'contact.vue', type: 'file', icon: 'vue', route: '/contact' },
    ],
  },
]

export const iconColors = {
  react: '#61dafb',
  vue: '#42b883',
  javascript: '#dcdcaa',
  html: '#e34c26',
  json: '#dcdcaa',
  markdown: '#519aba',
}
