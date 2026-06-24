import { useState, useCallback } from 'react'

export function useTabs(initialTabs = []) {
  const [tabs, setTabs] = useState(initialTabs)
  const [activeTab, setActiveTab] = useState(initialTabs[0]?.id || null)

  const openTab = useCallback((tab) => {
    setTabs((prev) => {
      if (prev.find((t) => t.id === tab.id)) return prev
      return [...prev, tab]
    })
    setActiveTab(tab.id)
  }, [])

  const closeTab = useCallback(
    (tabId, e) => {
      if (e) e.stopPropagation()
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.id === tabId)
        const next = prev.filter((t) => t.id !== tabId)
        if (activeTab === tabId && next.length > 0) {
          const newActive = next[Math.min(idx, next.length - 1)]
          setActiveTab(newActive.id)
        } else if (next.length === 0) {
          setActiveTab(null)
        }
        return next
      })
    },
    [activeTab]
  )

  const activateTab = useCallback((tabId) => {
    setActiveTab(tabId)
  }, [])

  return { tabs, activeTab, openTab, closeTab, activateTab }
}
