import { m as motion, AnimatePresence  } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
      style={{ position: 'fixed', top: '24px', right: '28px', zIndex: 100 }}
    >
      <motion.button
        id="theme-toggle"
        onClick={onToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          display:         'flex',
          alignItems:      'center',
          gap:             '6px',
          padding:         '8px 14px',
          borderRadius:    '999px',
          border:          '1px solid var(--border-accent)',
          background:      'var(--bg-card)',
          color:           'var(--accent)',
          cursor:          'pointer',
          backdropFilter:  'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          fontSize:        '0.7rem',
          fontFamily:      "'JetBrains Mono', monospace",
          fontWeight:      500,
          letterSpacing:   '0.08em',
          textTransform:   'uppercase',
          transition:      'background 0.3s ease, border-color 0.3s ease',
          boxShadow:       '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'moon' : 'sun'}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate:   0,  opacity: 1, scale: 1   }}
            exit={{    rotate:  90,  opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {isDark
              ? <Sun  size={13} strokeWidth={2} />
              : <Moon size={13} strokeWidth={2} />
            }
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? 'light-label' : 'dark-label'}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{    opacity: 0, x:-4 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? 'Light' : 'Dark'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
