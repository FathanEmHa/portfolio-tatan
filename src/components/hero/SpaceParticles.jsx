import React, { useEffect, useRef } from 'react';

export default function SpaceParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const shapes = ['dot', 'dot', 'dot', 'cross', 'ring', 'dot'];
    const particles = Array.from({ length: 150 }).map((_, i) => {
      const depth = Math.random();
      return {
        id: i,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: depth * 3 + 1.5, 
        x: Math.random() * 100,
        y: Math.random() * 100,
        depth: depth,
        baseOpacity: depth * 0.8,
        pulseSpeed: Math.random() * 0.002 + 0.001,
        pulseOffset: Math.random() * Math.PI * 2,
        isAccent: depth > 0.85
      };
    });

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 100;
      targetMouseY = (e.clientY / height - 0.5) * 100;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    let startTime = performance.now();

    const render = (time) => {
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, width, height);

      // Spring physics for mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotation logic: time-based + scroll-based scrub effect
      const rotationDeg = (elapsed / 150) + (scrollY * 0.15);
      const rotationRad = (rotationDeg * Math.PI) / 180;

      // Container scale based on scroll
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      const scale = 1 + (scrollProgress * 0.8);

      ctx.save();
      
      // Center the context to apply transformations
      ctx.translate(width / 2, height / 2);
      
      // Apply mouse parallax
      ctx.translate(-mouseX * (width * 0.002), -mouseY * (height * 0.002));
      
      // Apply scale
      ctx.scale(scale, scale);
      
      // Apply rotation
      ctx.rotate(rotationRad);
      
      // Translate back to top-left of the virtual 150vw x 150vh container
      const containerW = width * 1.5;
      const containerH = height * 1.5;
      ctx.translate(-containerW / 2, -containerH / 2);

      // Resolve CSS colors for this frame (allows dynamic theme switching)
      const computedStyles = getComputedStyle(canvas);
      const accentColor = computedStyles.getPropertyValue('--accent').trim() || '#00E5FF';
      const textPrimaryColor = computedStyles.getPropertyValue('--text-primary').trim() || '#E5E7EB';
      const textMutedColor = computedStyles.getPropertyValue('--text-muted').trim() || '#6B7280';

      // --- PLANET 1: Saturnus Abstrak (Kanan Atas) ---
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.translate(containerW * 0.75, containerH * 0.2);
      
      const grad = ctx.createLinearGradient(-40, -40, 40, 40);
      grad.addColorStop(0, accentColor);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.rotate(-30 * Math.PI / 180);
      ctx.strokeStyle = textPrimaryColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, 90, 20, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = accentColor;
      ctx.setLineDash([5, 5]);
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.ellipse(0, 0, 110, 30, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // --- PLANET 2: Gas Giant (Kiri Bawah) ---
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.translate(containerW * 0.2, containerH * 0.75);
      
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = textPrimaryColor;
      ctx.beginPath();
      ctx.arc(0, 0, 125, -Math.PI/4, Math.PI * 3/4);
      ctx.stroke();
      ctx.restore();

      // --- PARTICLES ---
      particles.forEach(p => {
        const px = (p.x / 100) * containerW;
        const py = (p.y / 100) * containerH;

        const currentOpacity = (Math.sin((elapsed * p.pulseSpeed) + p.pulseOffset) * 0.5 + 0.5) * (p.baseOpacity - p.depth * 0.2) + p.depth * 0.2;
        ctx.globalAlpha = currentOpacity;

        const isDot = p.shape === 'dot';
        const isCross = p.shape === 'cross';
        const isRing = p.shape === 'ring';

        ctx.save();
        ctx.translate(px, py);

        if (isDot) {
          ctx.fillStyle = p.isAccent ? accentColor : textPrimaryColor;
          if (p.isAccent) {
            ctx.shadowColor = accentColor;
            ctx.shadowBlur = 12;
          }
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (isRing) {
          ctx.strokeStyle = p.isAccent ? accentColor : textMutedColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, (p.size * 3) / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (isCross) {
          ctx.fillStyle = p.isAccent ? accentColor : textMutedColor;
          ctx.font = `${p.size * 4}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('+', 0, 0);
        }

        ctx.restore();
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Radial overlay to blend the edges into the background color smoothly */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 0%, var(--bg-primary) 120%)' }} />
    </div>
  );
}