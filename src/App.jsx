import { useState, useEffect, lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import './index.css'

// Layout components
import Sidebar from './components/layout/Sidebar'
import ThemeToggle from './components/layout/ThemeToggle'
import GlobalScrollMouse from './components/layout/GlobalScrollMouse'
import SpaceParticles from './components/hero/SpaceParticles'

// Active section tracking
import { useActiveSection } from './hooks/useActiveSection'

// Eager loaded section (Critical Path)
import HeroSection from './sections/HeroSection'

// Lazy loaded sections
const AboutSection = lazy(() => import('./sections/AboutSection'))
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'))
const TechMarquee = lazy(() => import('./components/TechMarquee').catch(() => ({ default: () => null }))) // Fallback if TechMarquee isn't present
const ArsenalContactSection = lazy(() => import('./sections/ArsenalContactSection'))

gsap.registerPlugin(ScrollTrigger)

// Lightweight Loader for Suspense boundary
const SectionLoader = () => (
  <div className="w-full flex justify-center py-20">
    <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
  </div>
)

// ── App ──────────────────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(true)
  const activeSection = useActiveSection()

  // Apply dark / light class to <html>
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [isDark])

  // CRITICAL: ScrollTrigger recalculation when lazy components mount
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })
    
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      resizeObserver.observe(mainContent)
    }
    
    return () => resizeObserver.disconnect()
  }, [])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <LazyMotion features={domAnimation} strict>
      {/* Outer shell — full viewport, no overflow */}
      <div id="app-shell">

        {/* ── GLOBAL DECORATIVE LAYERS ── */}
        <SpaceParticles />
        <div className="noise-overlay" aria-hidden="true" />
        <div className="scan-line" aria-hidden="true" />

        {/* ── GLOBAL SCROLL MOUSE ── */}
        <GlobalScrollMouse />

        {/* ── FIXED: LEFT SIDEBAR ── */}
        <Sidebar activeSection={activeSection} />

        {/* ── FIXED: TOP-RIGHT THEME TOGGLE ── */}
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

        {/* ── SCROLLABLE MAIN CONTENT ── */}
        <main id="main-content" role="main">
          <HeroSection />

          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
            <ProjectsSection />
            <TechMarquee />
            <ArsenalContactSection />
          </Suspense>
        </main>
      </div>
    </LazyMotion>
  )
}
