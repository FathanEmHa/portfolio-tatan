import { m as motion, useMotionValue, useMotionTemplate  } from 'framer-motion'
import { useState } from 'react'

/**
 * Katakana watermark — positioned ABSOLUTELY inside the Hero section only.
 * Features: True vertical text stacking & Mouse-tracking spotlight hover effect.
 */
export default function KatakanaWatermark() {
  // Tracking posisi mouse buat efek spotlight (lampu senter)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  // Fungsi untuk update posisi spotlight pas mouse gerak
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0, duration: 1.5, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        right: '5%',
        top: '53%',
        transform: 'translateY(-50%)',
        zIndex: 0,

        // --- Setting Teks Vertikal yang Benar ---
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        whiteSpace: 'nowrap', // FIX 1: Biar nggak pindah baris
        height: 'max-content', // FIX 2: Pastiin tinggi container ngikutin teks
        // ----------------------------------------

        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(40px, 8vw, 110px)',
        fontWeight: 900,
        letterSpacing: '0.15em',
        userSelect: 'none',
        pointerEvents: 'auto',
        cursor: 'default',
      }}
      className="relative inline-block"
    >
      {/* LAYER 1: Teks Dasar (Redup) */}
      <div style={{ color: 'var(--text-primary)'}}>
        ファタン
      </div>

      {/* LAYER 2: Teks Glow/Spotlight (Warna Accent) yang ngikutin mouse */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          color: 'var(--accent)',
          opacity: isHovered ? 1 : 0,
          textShadow: '0 0 25px var(--accent)',
          transition: 'opacity 0.3s ease',

          // --- Magic-nya di sini: Masking ngikutin mouse ---
          WebkitMaskImage: useMotionTemplate`radial-gradient(130px circle at ${mouseX}px ${mouseY}px, white 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(130px circle at ${mouseX}px ${mouseY}px, white 0%, transparent 100%)`,
        }}
      >
        ファタン
      </motion.div>
    </motion.div>
  )
}