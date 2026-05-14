# Portfolio - Fathan Mulyasa H. (tan)

**🚀 Live Demo:** [portfolio-tatan.vercel.app](https://portfolio-tatan.vercel.app/)

![Lighthouse Performance Score 99]
<img width="1366" height="768" alt="Screenshot from 2026-05-06 10-47-26" src="https://github.com/user-attachments/assets/d2145ce9-3476-4433-b67a-1b589b5c1152" />

## Overview
A high-performance, interactive developer portfolio built with a focus on advanced scroll-driven animations and extreme rendering optimization. The architecture has been rigorously audited to achieve a near-perfect Lighthouse score without sacrificing complex visual interactions and the cyberpunk-inspired terminal aesthetic.

*(Click the image below to visit the live site)*
<a href="https://portfolio-tatan.vercel.app/" target="_blank">
  <img width="1366" height="768" alt="Portfolio Hero Preview" src="https://github.com/user-attachments/assets/b8b82b76-ad42-42bf-8e51-397b28016f40" />
</a>

## Core Architecture
* **Framework:** React + Vite
* **Styling:** Tailwind CSS (Custom Variables for strict theme integrity)
* **Animation Engine:** GSAP (GreenSock) + `@gsap/react` & ScrollTrigger
* **Graphics:** Native HTML5 `<canvas>`

## Engineering Highlights
1. **Canvas-Driven Rendering:** Replaced 150+ heavy DOM nodes with a single `<canvas>` element for the `SpaceParticles` background system. This eliminates main-thread blocking, prevents layout thrashing, and maintains a stable 60fps during scroll.
2. **Advanced GSAP Integrations:**
   * **Velocity Scrubbing:** An infinite `TechMarquee` that dynamically accelerates based on the user's scroll velocity (`self.getVelocity()`).
   * **Parallax Depth:** Asynchronous vertical scrolling on terminal HUD ornaments to create a 3D depth illusion.
   * **Viewport Intersections:** Bento box laser scans and staggered text reveals tied directly to `ScrollTrigger` batching.
3. **Aggressive Code Splitting:** Implementation of `React.lazy()` and `<Suspense>` to defer the loading of off-screen sections (Projects, Contact), drastically reducing the initial JavaScript payload.
4. **Fluid Responsiveness:** Fully adaptable layout from mobile viewports up to ultra-wide desktop monitors, featuring dynamic scaling for grid systems and typography.

## Tech Arsenal
* **Core:** React, Next.js, TypeScript, Tailwind CSS, Node.js, Laravel
* **Visuals:** GSAP, HTML5 Canvas
* **Ecosystem:** Docker, AWS, Git, Postman

## Local Deployment

### Prerequisites
Ensure Node.js (v18.x or higher) is installed on your local environment.

### Installation & Execution
```bash
# Clone the repository
git clone [https://github.com/FathanEmHa/portfolio-tatan.git](https://github.com/FathanEmHa/portfolio-tatan.git)

# Navigate to the project directory
cd portfolio-tatan

# Install dependencies
npm install

# Initialize the development server
npm run dev
