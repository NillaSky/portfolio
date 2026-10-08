import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

// 데모 페이지(public/demo)는 Vite가 public 폴더로 그대로 서빙/복사함
export default defineConfig({
  plugins: [react(), vue()],
  base: './',
  build: {
    outDir: '../portfolio-app',
    emptyOutDir: true,
  },
})
