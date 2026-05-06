import { m as motion } from 'framer-motion'
import { useState } from 'react'
import { NAV_LINKS, SITE_META } from '../../constants/data'

// ── Stagger helpers ──────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

// ── Inline SVG Social Icons ──────────────────────────────────
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.51.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

// ── Logo ─────────────────────────────────────────────────────
function Logo() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href="#hero"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
      className="group flex flex-col items-center gap-1 select-none no-underline cursor-pointer"
      aria-label="Home"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Square logo mark with rotating border */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-md"
          style={{ border: '1px solid var(--border-accent)' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        {/* Glowing center dot */}
        <motion.div
          className="w-2 h-2 rounded-full"
          animate={{ scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent-glow)',
          }}
        />
      </div>

      {/* Monogram Teks (Sama, animasi ngisi dari bawah ke atas) */}
      <motion.span
        className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase"
        style={{
          backgroundImage: 'linear-gradient(to top, var(--accent) 50%, var(--text-muted) 50%)',
          backgroundSize: '100% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
        initial={{ backgroundPosition: '0% 100%' }} // Default: Accent (bawah)
        animate={{ backgroundPosition: isHovered ? '0% 0%' : '0% 100%' }} // Pas di hover jadi Muted
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        FM
      </motion.span>
    </motion.a>
  )
}

// ── Nav Item Component (Biar bisa tracking hover masing-masing) ──
function NavItem({ link, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={link.href}
      variants={itemVariants}
      onClick={(e) => onClick(e, link.href)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-current={isActive ? 'page' : undefined}
      style={{
        position: 'relative', // Penting buat garis absolute
        writingMode: 'vertical-lr',
        textOrientation: 'upright',
        textTransform: 'uppercase',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.90rem',
        fontWeight: 900,
        letterSpacing: '-0.25em',
        lineHeight: '0.85',
        textDecoration: 'none',
        paddingLeft: '2px', // Kasih ruang buat garis di kiri
        cursor: 'pointer',
        userSelect: 'none',
        display: 'flex',
      }}
    >
      {/* 1. Garis Animasi di Kiri (Tumbuh dari bawah ke atas) */}
      <motion.span
        initial={{ height: isActive ? '100%' : '0%' }}
        animate={{ height: isActive || isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0, // Mulai dari bawah
          width: '2px',
          backgroundColor: 'var(--accent)',
          borderRadius: '2px',
        }}
      />

      {/* 2. Teks Animasi (Warna ngisi dari bawah ke atas) */}
      <motion.span
        style={{
          // Gradient 2 warna: Separuh atas Muted, Separuh bawah Accent
          backgroundImage: 'linear-gradient(to top, var(--accent) 50%, var(--text-muted) 50%)',
          backgroundSize: '100% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
        initial={{ backgroundPosition: '0% 0%' }} // Posisi nampilin atas (Muted)
        animate={{ backgroundPosition: isActive || isHovered ? '0% 100%' : '0% 0%' }} // Posisi geser nampilin bawah (Accent)
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {link.label}
      </motion.span>
    </motion.a>
  )
}

// ── Vertical Nav ─────────────────────────────────────────────
function VerticalNav({ activeSection }) {
  const handleClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
      aria-label="Main navigation"
    >
      {NAV_LINKS.map((link) => (
        <NavItem
          key={link.id}
          link={link}
          isActive={activeSection === link.id}
          onClick={handleClick}
        />
      ))}
    </motion.nav>
  )
}

// ── Social Icons ─────────────────────────────────────────────
// (Biar linkedin ga kepotong, tinggi komponen icon kita pangkas dikit)
function SocialIcons() {
  const socials = [
    { id: 'github', href: SITE_META.github, Icon: GithubIcon, label: 'GitHub' },
    { id: 'instagram', href: SITE_META.instagram, Icon: InstagramIcon, label: 'Instagram' },
    { id: 'linkedin', href: SITE_META.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center gap-4" // <-- Kurangin gap antar icon (awalnya 5)
    >
      {/* Garis Vertikal dipendekin dikit biar hemat tempat */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
        className="w-px h-6 origin-top" // <-- Awalnya h-12 (terlalu panjang), sekarang h-6
        style={{ background: 'var(--border-subtle)' }}
      />

      {socials.map(({ id, href, Icon, label }) => (
        <motion.a
          key={id}
          id={`social-${id}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: 'var(--text-muted)', display: 'flex', transition: 'color 0.2s ease' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          aria-label={label}
        >
          <Icon />
        </motion.a>
      ))}
    </motion.div>
  )
}

// ── Main Sidebar ─────────────────────────────────────────────
export default function Sidebar({ activeSection }) {
  return (
    <motion.aside
      id="sidebar"
      // py-10 kita pangkas jadi py-5 (padding Y) biar layoutnya napas di layar kecil
      className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center justify-between py-5 z-50 border-r border-white/5 bg-bg-primary"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label="Site sidebar"
    >
      <Logo />
      <VerticalNav activeSection={activeSection} />
      <SocialIcons />
    </motion.aside>
  )
}
