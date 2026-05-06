import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROW1_TECH = ["React", "Laravel", "TypeScript", "GSAP", "Framer Motion", "Tailwind CSS", "Flutter", "Livewire", "MongoDB"];
const ROW2_TECH = ["Claude", "Gemini", "OpenClaw", "Docker", "Cursor", "Antigravity", "Figma", "Postman", "Linux"];

const TechItem = ({ children }) => (
  <div className="flex items-center justify-center px-6 py-3 border border-[var(--border-subtle)] bg-[var(--bg-card)]/50 backdrop-blur-sm rounded-lg whitespace-nowrap text-[var(--text-primary)] font-mono text-sm shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300">
    {children}
  </div>
);

export default function TechMarquee() {
  const marqueeRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useGSAP(() => {
    // Row 1: Moves RIGHT. Start at -50%, animate to 0%
    gsap.set(row1Ref.current, { xPercent: -50 });
    const row1Tween = gsap.to(row1Ref.current, {
      xPercent: 0,
      ease: "none",
      duration: 35,
      repeat: -1,
    });

    // Row 2: Moves LEFT. Start at 0%, animate to -50%
    const row2Tween = gsap.to(row2Ref.current, {
      xPercent: -50,
      ease: "none",
      duration: 35,
      repeat: -1,
    });

    // Velocity Scrub Effect
    ScrollTrigger.create({
      trigger: marqueeRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // self.getVelocity() returns pixels per second. 
        const velocity = Math.abs(self.getVelocity());
        
        // Map velocity to a timeScale value (e.g., base speed is 1x, fast scroll is up to 6x)
        const targetTimeScale = gsap.utils.clamp(1, 6, 1 + velocity / 400);

        // Smoothly animate the timeScale of our tweens to create that inertia effect
        gsap.to([row1Tween, row2Tween], {
          timeScale: targetTimeScale,
          duration: 0.15, // quick reaction
          overwrite: true
        });

        // Slow back down smoothly when scrolling stops
        gsap.to([row1Tween, row2Tween], {
          timeScale: 1,
          duration: 1.2, // slower recovery
          delay: 0.1,
          overwrite: "auto"
        });
      }
    });
  }, { scope: marqueeRef });

  return (
    <div ref={marqueeRef} className="w-full overflow-hidden py-16 relative bg-[var(--bg-primary)]">
      {/* Subtle overlay gradients to fade out edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-6">
        {/* ROW 1 */}
        <div 
          className="flex w-max gap-6" 
          ref={row1Ref}
          style={{ willChange: "transform" }}
        >
          {/* Render twice for seamless loop */}
          {[...ROW1_TECH, ...ROW1_TECH].map((tech, i) => (
            <TechItem key={`row1-${i}`}>{tech}</TechItem>
          ))}
        </div>

        {/* ROW 2 */}
        <div 
          className="flex w-max gap-6" 
          ref={row2Ref}
          style={{ willChange: "transform", marginLeft: "-4rem" }}
        >
          {/* Render twice for seamless loop */}
          {[...ROW2_TECH, ...ROW2_TECH].map((tech, i) => (
            <TechItem key={`row2-${i}`}>{tech}</TechItem>
          ))}
        </div>
      </div>
    </div>
  );
}
