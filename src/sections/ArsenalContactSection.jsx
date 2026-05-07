import React, { useRef } from 'react';
import { m as motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Send, Globe, Activity } from 'lucide-react'; 
import AnimatedSection from '../components/AnimatedSection';
// --- Tambahin Import Ini ---
import { SITE_META } from '../constants/data'; // Sesuaikan path ini kalau beda letaknya

gsap.registerPlugin(ScrollTrigger);

// --- ORNAMEN KIRI (Sangat Minimalis) ---
const LeftDecor = () => (
  <div className="left-decor hidden lg:flex flex-col items-center justify-between w-12 shrink-0 opacity-30 select-none border-r border-[var(--border-subtle)]/30 py-4" style={{ willChange: 'transform' }}>
    <div className="flex flex-col items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
      <div className="w-px h-16 bg-gradient-to-b from-[var(--accent)]/50 to-transparent" />
    </div>
    
    <div 
      className="font-mono text-[9px] text-[var(--text-primary)] tracking-[0.3em] uppercase" 
      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
    >
      Encrypting_Payload...
    </div>
    
    <div className="w-px h-24 bg-gradient-to-t from-[var(--border-subtle)] to-transparent" />
  </div>
);

// --- ORNAMEN KANAN (Sangat Minimalis) ---
const RightDecor = () => (
  <div className="right-decor hidden lg:flex flex-col items-center justify-between w-12 shrink-0 opacity-30 select-none border-l border-[var(--border-subtle)]/30 py-4" style={{ willChange: 'transform' }}>
    <div className="w-px h-24 bg-gradient-to-b from-[var(--border-subtle)] to-transparent" />
    
    <div 
      className="font-mono text-[9px] text-[var(--text-primary)] tracking-[0.3em] uppercase" 
      style={{ writingMode: 'vertical-rl' }}
    >
      PORT: 443 [OPEN]
    </div>

    <div className="grid grid-cols-2 gap-1 mb-2">
      <div className="w-1.5 h-1.5 bg-[var(--text-muted)]" />
      <div className="w-1.5 h-1.5 bg-[var(--accent)]" />
      <div className="w-1.5 h-1.5 bg-transparent border border-[var(--text-muted)]" />
      <div className="w-1.5 h-1.5 bg-[var(--text-muted)]" />
    </div>
  </div>
);

export default function ArsenalContactSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.to(".left-decor", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      gsap.to(".right-decor", {
        y: 200,
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

  // Array helper buat mapping Network Nodes dari SITE_META
  const networks = [
    { name: 'GitHub', url: SITE_META.github },
    { name: 'LinkedIn', url: SITE_META.linkedin },
    { name: 'Instagram', url: SITE_META.instagram }
  ];

  return (
    <AnimatedSection id="contact" variant="rubberBand" className="w-full max-w-7xl mx-auto py-20 px-6 lg:px-20">
      <div ref={containerRef} className="flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="gsap-child flex items-center gap-4 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-mono font-bold text-[var(--text-primary)]">
            <span className="text-[var(--accent)]">&lt;</span> 03. /connection_established <span className="text-[var(--accent)]">/&gt;</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-subtle)] to-transparent" />
        </div>

        {/* CONTAINER UTAMA */}
        <div className="flex justify-center items-stretch gap-8 lg:gap-12 w-full">
          
          <LeftDecor />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-5xl">
            
            {/* Left Column: Network & Status */}
            <div className="flex flex-col gap-10">
              
              {/* GSAP CHILD 1: Network Nodes */}
              <div className="gsap-child">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                  <Globe size={24} className="text-[var(--accent)]" />
                  Network Nodes
                </h3>
                <div className="flex flex-wrap gap-3">
                  {/* --- Mapping data langsung dari networks helper --- */}
                  {networks.map((net, i) => (
                    <a 
                      key={i} 
                      href={net.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 text-sm font-mono text-[var(--text-primary)] bg-[var(--border-subtle)]/10 border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 shadow-sm hover:shadow-[0_0_10px_var(--accent)]"
                    >
                      {net.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* GSAP CHILD 2: Active Directives */}
              <div className="gsap-child">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                  <Activity size={24} className="text-[var(--accent)]" />
                  Active Directives
                </h3>
                <div className="flex flex-col gap-4 font-mono text-sm text-[var(--text-primary)]/80">
                  <div className="flex items-start gap-3 border-l-2 border-[var(--accent)] pl-3">
                    <span className="text-[var(--accent)] mt-0.5">&gt;&gt;</span>
                    <p>Executing deployment protocols for SIPA project via VPS and tan.my.id domain.</p>
                  </div>
                  <div className="flex items-start gap-3 border-l-2 border-[var(--accent)] pl-3">
                    <span className="text-[var(--accent)] mt-0.5">&gt;&gt;</span>
                    <p>Optimizing development speed utilizing AI agents (Cursor, Claude, Gemini).</p>
                  </div>
                  <div className="flex items-start gap-3 border-l-2 border-[var(--accent)] pl-3">
                    <span className="text-[var(--accent)] mt-0.5">&gt;&gt;</span>
                    <p>Transitioning architecture skills into Product Management frameworks.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Terminal Contact */}
            <div className="gsap-child flex flex-col justify-center">
              <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-2xl relative">
                
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[var(--accent)]/5 to-transparent pointer-events-none" />

                <div className="flex items-center px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 text-xs font-mono text-[var(--text-muted)]">
                    contact.sh
                  </div>
                </div>

                <div className="p-6 sm:p-8 font-mono text-sm sm:text-base leading-relaxed relative z-10">
                  <p className="text-[var(--text-primary)]/70 mb-6">
                    <span className="text-emerald-700 dark:text-emerald-400">root@fathan</span>:
                    <span className="text-blue-700 dark:text-blue-400">~</span>$ ./contact.sh
                  </p>
                  <div className="text-[var(--text-primary)] mb-10 space-y-4">
                    <p>Initiating secure channel...</p>
                    <p>Looking for new opportunities or just want to talk about architecture and Product Management? My inbox is always open.</p>
                  </div>
                  
                  <a 
                    href={`mailto:${SITE_META.email}`} // --- Pake email dari config juga ---
                    className="inline-flex items-center gap-3 px-6 py-3 font-mono text-[var(--bg-primary)] bg-[var(--accent)] hover:bg-[var(--accent)]/90 hover:shadow-[0_0_20px_var(--accent)] transition-all duration-300 rounded-md font-bold uppercase tracking-wider text-sm"
                  >
                    <Send size={18} />
                    Send Transmission
                  </a>
                </div>
              </div>
            </div>

          </div>

          <RightDecor />

        </div>
      </div>
    </AnimatedSection>
  );
}