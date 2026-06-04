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
          { id: 'kt', name: 'KT_MVNO.jsx', type: 'file', icon: 'react', route: '/experience/kt' },
          { id: 'skt', name: 'SKT_Tworld.jsx', type: 'file', icon: 'react', route: '/experience/skt' },
          { id: 'amore', name: 'AmoreMall.jsx', type: 'file', icon: 'react', route: '/experience/amore' },
        ],
      },
      {
        id: 'skills',
        name: 'skills',
        type: 'folder',
        open: false,
        children: [
          { id: 'frontend', name: 'frontend.js', type: 'file', icon: 'javascript', route: '/skills' },
          { id: 'tools', name: 'tools.json', type: 'file', icon: 'json', route: '/skills#tools' },
        ],
      },
      {
        id: 'projects',
        name: 'projects',
        type: 'folder',
        open: false,
        children: [
          { id: 'proj-kt', name: 'KT_portal.html', type: 'file', icon: 'html', route: '/projects' },
          { id: 'proj-skt', name: 'SKT_tworld.html', type: 'file', icon: 'html', route: '/projects' },
          { id: 'proj-amore', name: 'AmoreMall.html', type: 'file', icon: 'html', route: '/projects' },
          { id: 'proj-a11y', name: 'a11y_checklist.html', type: 'file', icon: 'html', route: '/projects/a11y' },
        ],
      },
      { id: 'contact', name: 'contact.vue', type: 'file', icon: 'vue', route: '/contact' },
      { id: 'guide', name: 'PORTFOLIO_GUIDE.html', type: 'file', icon: 'html', route: '/guide' },
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
