import { useState, useEffect, useRef } from 'react'
import { NAV_LINKS } from '../constants/data'

/**
 * Tracks which section is currently in the viewport
 * and returns the active section id.
 */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('')
  const observerRef = useRef(null)

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.id)

    const callback = (entries) => {
      // Find the entry with the largest intersection ratio
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible.length > 0) {
        setActiveSection(visible[0].target.id)
      }
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-40% 0px -40% 0px',
      threshold:  [0, 0.1, 0.5, 1.0],
    })

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observerRef.current.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return activeSection
}

/**
 * Smooth scroll to a section by id.
 */
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
