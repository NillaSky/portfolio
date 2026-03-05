import { useEffect, useRef } from 'react'
import { createApp } from 'vue'
import SkillsChart from '../../vue-components/SkillsChart.vue'

export default function Skills() {
  const mountRef = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    if (mountRef.current && !appRef.current) {
      appRef.current = createApp(SkillsChart)
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
      aria-label="기술 스택 (Vue 3 컴포넌트)"
    />
  )
}
