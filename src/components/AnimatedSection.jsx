import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedSection({ children, id, className = "", variant = "magneticDrop" }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    // 1. Ambil semua elemen anak yang punya class 'gsap-child'
    const childrenElements = gsap.utils.toArray('.gsap-child')
    
    // 2. Setup ScrollTrigger dasar
    const stConfig = {
      trigger: containerRef.current,
      start: "top 85%", // Mulai pas section nyentuh 85% layar dari atas
      toggleActions: "play none none none" // Cuma jalan sekali (sama kayak viewport once: true)
    }

    // 3. Eksekusi animasi berdasarkan variant
    if (variant === 'magneticDrop') {
      // Animasi Container Utama
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: -120 },
        { opacity: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.4)", scrollTrigger: stConfig }
      )
      // Animasi Anak-anaknya (Stagger)
      if (childrenElements.length) {
        gsap.fromTo(childrenElements,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "elastic.out(1, 0.5)", scrollTrigger: stConfig }
        )
      }
    } 
    
    else if (variant === 'cardFlip') {
      gsap.set(containerRef.current, { transformPerspective: 1000, transformOrigin: 'center bottom' })
      
      gsap.fromTo(containerRef.current,
        { opacity: 0, rotationX: -25 },
        { opacity: 1, rotationX: 0, duration: 0.8, ease: "back.out(1.7)", scrollTrigger: stConfig }
      )
      if (childrenElements.length) {
        gsap.fromTo(childrenElements,
          { opacity: 0, x: -40, skewX: 6 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: stConfig }
        )
      }
    }

    else if (variant === 'flicker') {
      // GSAP punya fitur keyframes yang mirip framer motion
      gsap.to(containerRef.current, {
        keyframes: {
          opacity: [0, 0.7, 0.2, 0.9, 0.4, 1],
          y: [30, 0, 0, 0, 0, 0]
        },
        duration: 0.6,
        scrollTrigger: stConfig
      })
      if (childrenElements.length) {
        gsap.to(childrenElements, {
          keyframes: {
            opacity: [0, 0.5, 0, 1],
            y: [20, 0, 0, 0]
          },
          duration: 0.5,
          stagger: 0.12,
          scrollTrigger: stConfig
        })
      }
    }

    // Bisa lu lanjutin buat varian rubberBand dan scatter...

  }, { scope: containerRef }) // Scope ini PENTING biar GSAP cuma nyari '.gsap-child' di dalam section ini aja

  return (
    <section
      id={id}
      ref={containerRef}
      className={`min-h-screen relative z-10 flex flex-col justify-center px-8 md:px-20 ${className}`}
    >
      {children}
    </section>
  )
}