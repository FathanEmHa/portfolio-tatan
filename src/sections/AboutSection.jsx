import React, { useState, useEffect, useRef } from 'react';
import { m as motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '../components/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  [
    { text: "const ", className: "text-[var(--accent)]" },
    { text: "fathan ", className: "text-cyan-700 dark:text-cyan-400" },
    { text: "= ", className: "text-[var(--accent)]" },
    { text: "{", className: "text-yellow-600 dark:text-yellow-400" }
  ],
  [
    { text: "  name: ", className: "text-emerald-700 dark:text-emerald-400" },
    { text: '"Fathan Mulyasa H."', className: "text-amber-600 dark:text-amber-300" },
    { text: ",", className: "text-[var(--text-primary)]" }
  ],
  [
    { text: "  role: ", className: "text-emerald-700 dark:text-emerald-400" },
    { text: '"Full-stack Developer"', className: "text-amber-600 dark:text-amber-300" },
    { text: ",", className: "text-[var(--text-primary)]" }
  ],
  [
    { text: "  status: ", className: "text-emerald-700 dark:text-emerald-400" },
    { text: '"Vocational High School (SMK) - Graduating May 2026"', className: "text-amber-600 dark:text-amber-300" },
    { text: ",", className: "text-[var(--text-primary)]" }
  ],
  [
    { text: "  focus: ", className: "text-emerald-700 dark:text-emerald-400" },
    { text: "[", className: "text-yellow-600 dark:text-yellow-400" },
    { text: '"Full-stack Development"', className: "text-amber-600 dark:text-amber-300" },
    { text: ", ", className: "text-[var(--text-primary)]" },
    { text: '"Digital Ecosystems"', className: "text-amber-600 dark:text-amber-300" },
    { text: ", ", className: "text-[var(--text-primary)]" },
    { text: '"Product Management"', className: "text-amber-600 dark:text-amber-300" },
    { text: "]", className: "text-yellow-600 dark:text-yellow-400" },
    { text: ",", className: "text-[var(--text-primary)]" }
  ],
  [
    { text: "  mission: ", className: "text-emerald-700 dark:text-emerald-400" },
    { text: '"Architecting scalable solutions with clean code and a PM mindset."', className: "text-amber-600 dark:text-amber-300" }
  ],
  [
    { text: "};", className: "text-yellow-600 dark:text-yellow-400" }
  ]
];

const totalChars = lines.reduce((acc, line) => {
  return acc + line.reduce((lineAcc, token) => lineAcc + token.text.length, 0);
}, 0);

function useTypingEffect(totalChars, typingSpeed = 20) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isTyping) return;

    if (visibleChars < totalChars) {
      const timeout = setTimeout(() => {
        setVisibleChars((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [visibleChars, isTyping, totalChars, typingSpeed]);

  const startTyping = () => {
    if (!isTyping && visibleChars === 0) {
      setIsTyping(true);
    }
  };

  return { visibleChars, startTyping, isComplete: visibleChars === totalChars };
}

// --- KOMPONEN ORNAMEN KIRI (System Metrics) ---
const LeftHUD = () => (
  // Tambahin 'gsap-child' biar di-stagger pas masuk
  <div className="left-hud gsap-child hidden lg:flex flex-col gap-6 w-32 shrink-0 opacity-40 select-none" style={{ willChange: 'transform' }}>
    <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest border-b border-[var(--border-subtle)] pb-2 mb-2">
      // SYS.METRICS
    </div>
    
    <div className="space-y-4">
      {[
        { label: 'CPU.USAGE', value: '42%' },
        { label: 'MEM.ALLOC', value: '2.4GB' },
        { label: 'NET.UPLINK', value: '1.2Gbps' }
      ].map((stat, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px] font-mono text-[var(--text-primary)]">
            <span>{stat.label}</span>
            <span className="text-[var(--accent)]">{stat.value}</span>
          </div>
          <div className="w-full h-[2px] bg-[var(--border-subtle)]/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--accent)]"
              initial={{ width: '10%' }}
              animate={{ width: [`${20 + i*15}%`, `${60 + i*10}%`, `${20 + i*15}%`] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-auto pt-8">
      <div className="w-16 h-16 border border-[var(--accent)]/30 rounded-full flex items-center justify-center relative">
        <motion.div 
          className="absolute inset-2 border border-[var(--text-muted)]/30 rounded-full border-t-[var(--accent)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <span className="font-mono text-[9px] text-[var(--accent)]">ACTV</span>
      </div>
    </div>
  </div>
);

// --- KOMPONEN ORNAMEN KANAN (Data Stream / Grid) ---
const RightHUD = () => (
  // Tambahin 'gsap-child'
  <div className="right-hud gsap-child hidden lg:flex flex-col items-end gap-6 w-32 shrink-0 opacity-40 select-none text-right" style={{ willChange: 'transform' }}>
    <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest border-b border-[var(--border-subtle)] pb-2 mb-2 w-full">
      // DATA.STREAM
    </div>

    <div className="grid grid-cols-4 gap-1.5 w-full max-w-[80px]">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div 
          key={i}
          className="w-full aspect-square bg-[var(--border-subtle)] rounded-sm"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ 
            duration: Math.random() * 2 + 1, 
            repeat: Infinity, 
            delay: Math.random() * 2 
          }}
          style={{
            backgroundColor: Math.random() > 0.8 ? 'var(--accent)' : 'var(--border-subtle)'
          }}
        />
      ))}
    </div>

    <div className="mt-auto flex flex-col items-end gap-1">
      <span className="font-mono text-[9px] text-[var(--text-primary)]">RUNTIME_ENV</span>
      <span className="font-mono text-[9px] text-[var(--accent)] animate-pulse">NODE_V18.17.0</span>
      <span className="font-mono text-[9px] text-[var(--text-primary)] mt-2">ENCRYPTION</span>
      <span className="font-mono text-[9px] text-[var(--accent)]">SHA-256</span>
    </div>
  </div>
);

export default function AboutSection() {
  const containerRef = useRef(null);
  const { visibleChars, startTyping, isComplete } = useTypingEffect(totalChars, 20);
  let charsRendered = 0;

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      // Animasi Parallax Ornamen Kiri
      gsap.to(".left-hud", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // Animasi Parallax Ornamen Kanan
      gsap.to(".right-hud", {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // Animasi Parallax Terminal Box
      gsap.to(".terminal-box", {
        y: 80, 
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    });
  }, { scope: containerRef });

  return (
    <AnimatedSection 
      id="about"
      variant="cardFlip" // <--- Ganti variant di sini
      className="w-full max-w-7xl mx-auto py-20 px-6 lg:px-20"
    >
      <div ref={containerRef} className="flex flex-col gap-8">
        
        {/* Section Header */}
        <div className="gsap-child flex items-center gap-4 max-w-4xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-mono font-bold text-[var(--text-primary)]">
            <span className="text-[var(--accent)]">&lt;</span> 01. /whoami <span className="text-[var(--accent)]">/&gt;</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-subtle)] to-transparent" />
        </div>

        {/* CONTAINER UTAMA */}
        <div className="flex justify-center items-stretch gap-8 lg:gap-16 w-full" onMouseEnter={startTyping} onTouchStart={startTyping}>
          
          <LeftHUD />

          {/* Terminal Box (Tengah) - Tambahin 'gsap-child' */}
          <div 
            className="terminal-box gsap-child rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-2xl relative w-full max-w-3xl"
            style={{ willChange: 'transform' }}
          >
            {/* Subtle Accent Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--accent)]/10 to-transparent pointer-events-none" />

            {/* Mac-style Header */}
            <div className="flex items-center px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative z-10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 text-xs font-mono text-[var(--text-muted)]">
                fathan@portfolio:~
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4 sm:p-6 overflow-x-auto relative z-10 min-h-[300px] sm:min-h-[250px]">
              <div className="table">
                {lines.map((line, lineIndex) => {
                  if (charsRendered >= visibleChars) return null;

                  return (
                    <div key={lineIndex} className="table-row font-mono text-sm sm:text-base leading-relaxed sm:leading-loose">
                      <div className="table-cell text-right pr-4 sm:pr-6 select-none text-[var(--text-muted)] opacity-50">
                        {lineIndex + 1}
                      </div>
                      <div className="table-cell whitespace-pre-wrap text-[var(--text-primary)]">
                        {line.map((token, tokenIndex) => {
                          if (charsRendered >= visibleChars) return null;

                          let textToRender = token.text;
                          const remainingChars = visibleChars - charsRendered;
                          let isLastRenderedToken = false;

                          if (remainingChars <= token.text.length) {
                            textToRender = token.text.slice(0, remainingChars);
                            isLastRenderedToken = true;
                          }

                          charsRendered += token.text.length;

                          return (
                            <span key={tokenIndex} className={token.className}>
                              {textToRender}
                              {isLastRenderedToken && !isComplete && (
                                <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-[2px] bg-[var(--accent)] animate-pulse align-middle" />
                              )}
                              {isComplete && tokenIndex === line.length - 1 && lineIndex === lines.length - 1 && (
                                <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-[2px] bg-[var(--accent)] animate-pulse align-middle" />
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <RightHUD />

        </div>
      </div>
    </AnimatedSection>
  );
}