import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import AnimatedSection from '../components/AnimatedSection'; // Pastiin path-nya bener!

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
  </svg>
);

// Komponen Card Terpisah (FULL GSAP, No Framer Motion)
const SciFiProjectCard = ({ project, index }) => {
  // Project pertama (index 0) dibikin span 2 kolom di layar gede biar jadi 'Hero Project'
  const isFeatured = index === 0;

  const handleMouseEnter = (e) => {
    const laser = e.currentTarget.querySelector('.laser-line');
    if (!gsap.isTweening(laser)) {
      gsap.fromTo(laser, 
        { top: '0%', opacity: 0 },
        { 
          top: '100%', 
          duration: 1.5, 
          ease: 'linear', 
          keyframes: {
            "0%": { opacity: 0 },
            "10%": { opacity: 1 },
            "90%": { opacity: 1 },
            "100%": { opacity: 0 }
          }
        }
      );
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      // Tambahin 'gsap-child' ke sini biar ikut ke-stagger sama animasi flicker
      className={`scifi-project-card gsap-child group relative flex flex-col justify-between p-6 sm:p-8 bg-[var(--bg-card)]/90 backdrop-blur-md overflow-hidden transition-all duration-300 ${
        isFeatured ? 'col-span-1 md:col-span-2 lg:col-span-2' : 'col-span-1'
      }`}
      style={{
        // Bikin ujung kanan atas terpotong (Sci-Fi Cut)
        clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)',
        borderLeft: '4px solid var(--border-subtle)', // Border kiri tebel
      }}
    >
      {/* Dynamic Border Left Hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

      {/* Cyber Grid Background on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Scanning Laser Animation */}
      <div
        className="laser-line absolute left-0 right-0 h-[2px] bg-[var(--accent)] blur-[2px] z-20 pointer-events-none opacity-0"
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Top Header: System Index & Icons */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <FolderGit2 size={28} strokeWidth={1.5} className="text-[var(--border-subtle)] group-hover:text-[var(--accent)] transition-colors" />
            <span className="font-mono text-xs text-[var(--text-muted)] opacity-50 uppercase tracking-widest">
              SYS.PROJ.00{index + 1}
            </span>
          </div>
          
          <div className="flex gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                <GithubIcon size={20} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="mb-8 flex-1">
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <p className={`text-sm text-[var(--text-primary)]/60 leading-relaxed ${isFeatured ? 'md:max-w-xl' : ''}`}>
            {project.description}
          </p>
        </div>

        {/* Bottom: Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5 relative">
          {project.techStack.map((tech, i) => (
            <span 
              key={i} 
              className="px-3 py-1 text-[11px] uppercase tracking-wider font-mono text-[var(--text-muted)] bg-white/5 group-hover:text-[var(--accent)] group-hover:bg-[var(--accent)]/10 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animasi Laser otomatis jalan berurutan pas card masuk layar
    ScrollTrigger.batch(".scifi-project-card", {
      start: "top 80%",
      onEnter: (batch) => {
        batch.forEach((card, index) => {
          const laser = card.querySelector('.laser-line');
          gsap.fromTo(laser, 
            { top: '0%', opacity: 0 },
            { 
              top: '100%', 
              duration: 1.5, 
              ease: 'linear', 
              delay: index * 0.3, // stagger delay
              keyframes: {
                "0%": { opacity: 0 },
                "10%": { opacity: 1 },
                "90%": { opacity: 1 },
                "100%": { opacity: 0 }
              }
            }
          );
        });
      }
    });
  }, { scope: containerRef });

  return (
    <AnimatedSection id="projects" variant="flicker" className="w-full max-w-6xl mx-auto py-20 px-6 lg:px-20">
      <div ref={containerRef} className="flex flex-col gap-12">
        
        {/* Section Header - Tambahin gsap-child */}
        <div className="gsap-child flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-mono font-bold text-[var(--text-primary)]">
            <span className="text-[var(--accent)]">&lt;</span> 02. /projects <span className="text-[var(--accent)]">/&gt;</span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-subtle)] to-transparent" />
        </div>

        {/* Projects Bento Grid - Hapus motion.div */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <SciFiProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}