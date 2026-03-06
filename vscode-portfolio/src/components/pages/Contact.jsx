import { useEffect, useRef } from 'react'
import { createApp } from 'vue'
import ContactForm from '../../vue-components/ContactForm.vue'

export default function Contact() {
  const mountRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    if (mountRef.current && !appRef.current) {
      appRef.current = createApp(ContactForm)
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
