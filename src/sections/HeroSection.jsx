import KatakanaWatermark from '../components/layout/KatakanaWatermark'
import AnimatedSection from '../components/AnimatedSection' // Pastiin path import-nya bener ya!

export default function HeroSection() {
  const handleScrollToProjects = () => {
    const target = document.getElementById('projects')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToContact = () => {
    const target = document.getElementById('contact')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatedSection
      id="hero"
      variant="magneticDrop"
      className="overflow-hidden py-20 px-6 lg:px-20"
    >
      {/* Katakana watermark — scoped to hero section only */}
      <KatakanaWatermark />

      {/* Container utama, nggak perlu logic motion lagi di sini */}
      <div className="relative z-10 max-w-4xl">
        
        {/* ANAK 1: System Status Badge (Tambahin 'gsap-child') */}
        <div className="gsap-child mb-8 flex items-center gap-3 px-4 py-1.5 w-max rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
          </div>
          <span className="text-xs font-mono tracking-widest text-[var(--text-muted)] uppercase">
            System.Status: Online
          </span>
        </div>

        {/* ANAK 2: Small greeting/name (Tambahin 'gsap-child') */}
        <p className="gsap-child font-mono text-[var(--accent)] text-sm md:text-base tracking-widest mb-4 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[var(--accent)]"></span>
          Fathan Mulyasa H.
        </p>

        {/* ANAK 3: Huge Headline (Tambahin 'gsap-child') */}
        <h1 className="gsap-child font-display font-black text-4xl sm:text-6xl lg:text-8xl leading-[1.1] tracking-tight mb-6 text-[var(--text-primary)]">
          Developer <span className="text-[var(--text-muted)] font-light">+</span> <br />
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--accent) 0%, var(--text-primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            FullStack
          </span>
          {/* Lightweight Blinking Cursor pake Tailwind murni */}
          <span className="inline-block w-4 md:w-6 h-[0.8em] bg-[var(--accent)] ml-2 align-baseline animate-pulse" />
        </h1>

        {/* ANAK 4: Subtitle (Tambahin 'gsap-child') */}
        <p className="gsap-child text-[var(--text-primary)]/70 max-w-xl text-lg md:text-xl leading-relaxed mb-10">
          Building scalable solutions with a focus on clean code and user experience.
        </p>

        {/* ANAK 5: CTA Buttons (Tambahin 'gsap-child') */}
        <div className="gsap-child flex flex-wrap gap-4">
          <button
            onClick={handleScrollToContact}
            className="px-6 py-3 font-mono text-[var(--bg-primary)] bg-[var(--accent)] hover:bg-[var(--accent)]/90 hover:shadow-[0_0_20px_var(--accent)] transition-all duration-300 rounded-md font-bold uppercase tracking-wider text-sm"
          >
            Get In Touch
          </button>
          <button
            onClick={handleScrollToProjects}
            className="px-6 py-3 font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 rounded-md font-bold uppercase tracking-wider text-sm"
          >
            Browse Projects
          </button>
        </div>
        
      </div>
    </AnimatedSection>
  )
}