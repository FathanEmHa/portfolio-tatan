import { m as motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function GlobalScrollMouse() {
  const [isVisible, setIsVisible] = useState(true)

  const handleScrollToNext = () => {
    // Get all sections inside the main container
    const sections = Array.from(document.querySelectorAll('main > section'))
    if (sections.length === 0) return

    // Find the next section that is below the current scroll position
    // Adding a 50px buffer to ensure we don't snap to the current one if slightly scrolled
    const nextSection = sections.find(section => {
      const rect = section.getBoundingClientRect()
      return rect.top > 50
    })

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // If no next section, we are at the bottom, so scroll back up
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Hide the mouse if we are at the very bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50
      setIsVisible(!isBottom)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Check initial state
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-50 ${!isVisible ? 'pointer-events-none' : ''}`}
      onClick={isVisible ? handleScrollToNext : undefined}
    >
      <div className="w-[26px] h-[40px] rounded-full border-2 border-text-muted flex justify-center p-1 bg-[var(--bg-primary)]/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <motion.div
          animate={{
            y: [0, 12, 0],
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
        />
      </div>
    </motion.div>
  )
}
