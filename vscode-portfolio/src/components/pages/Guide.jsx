import { useEffect, useRef } from 'react'
import { createApp } from 'vue'
import GuideDoc from '../../vue-components/GuideDoc.vue'

export default function Guide() {
  const mountRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    if (mountRef.current && !appRef.current) {
      appRef.current = createApp(GuideDoc)
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
      aria-label="포트폴리오 강의 문서 (Vue 3 컴포넌트)"
    />
  )
}
