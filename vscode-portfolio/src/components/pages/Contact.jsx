import { useEffect, useRef } from 'react'
import { createApp } from 'vue'
import ContactForm from '../../vue-components/ContactForm.vue'

export default function Contact({ onOpenFile }) {
  const mountRef = useRef(null)
  const appRef = useRef(null)
  // Vue 쪽에는 한 번만 넘기므로, 항상 최신 함수를 부르도록 ref로 감쌈
  const openRef = useRef(onOpenFile)
  openRef.current = onOpenFile

  useEffect(() => {
    if (mountRef.current && !appRef.current) {
      appRef.current = createApp(ContactForm, {
        onOpenFile: (file) => openRef.current?.(file),
      })
      appRef.current.mount(mountRef.current)
    }
    return () => {
      if (appRef.current) {
        appRef.current.unmount()
        appRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ height: '100%', overflow: 'hidden' }}
      aria-label="연락처 (Vue 3 컴포넌트)"
    />
  )
}
