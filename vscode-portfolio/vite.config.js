import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const mimeMap = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
  }
  return mimeMap[ext] || 'application/octet-stream'
}

export default defineConfig({
  plugins: [
    react(),
    vue(),
    {
      // 개발 서버에서 dist/customer 폴더를 /customer-preview/ 경로로 서빙
      name: 'serve-customer-preview',
      configureServer(server) {
        const customerDir = path.resolve(__dirname, '../dist/customer')
        server.middlewares.use('/customer-preview', (req, res, next) => {
          const filePath = path.join(customerDir, req.url || '/')
          try {
            const stat = fs.statSync(filePath)
            if (stat.isFile()) {
              res.setHeader('Content-Type', getMimeType(filePath))
              fs.createReadStream(filePath).pipe(res)
            } else {
              next()
            }
          } catch {
            next()
          }
        })
      },
    },
  ],
  base: './',
})
