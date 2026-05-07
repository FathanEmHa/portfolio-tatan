export const PROJECTS = [
  {
    id: 'sipa',
    title: 'SIPA (Sistem Informasi Peminjaman Alat)',
    description:
      'A comprehensive digital asset management and borrowing system built for institutional use. Features role-based access control, automated penalty calculations, and dynamic inventory tracking.',
    techStack: ['Laravel', 'Livewire', 'Tailwind CSS', 'MySQL', 'JWT / OTP'],
    githubUrl: 'https://github.com/FathanEmHa/peminjaman-beta',
    liveUrl: null, // Isi URL kalau udah di-deploy
  },
  {
    id: 'neo-japan-portfolio',
    title: 'Neo Japan Interactive Portfolio',
    description:
      'A high-performance, cyberpunk-inspired personal portfolio. Engineered with advanced GSAP scroll-driven animations, parallax HUDs, and a custom HTML5 canvas particle engine achieving a 99+ Lighthouse performance score.',
    techStack: ['React', 'GSAP', 'Tailwind CSS', 'Frame Motion'],
    githubUrl: 'https://github.com/FathanEmHa/portfolio-tatan', // Ganti sama repo lu
    liveUrl: 'https://portfolio-tatan.vercel.app/', // Domain yang lagi lu setup
  },
  {
    id: 'reimburse-system',
    title: 'Enterprise Reimbursement System',
    description:
      '[STATUS: IN DEVELOPMENT] A cross-platform corporate reimbursement ecosystem. Designed with a mobile-first approach (Flutter) for employee submissions, and a robust web dashboard (React) powered by a secure API backend.',
    techStack: ['Flutter', 'React', 'Laravel', 'REST API'],
    githubUrl: 'https://github.com/FathanEmHa/projek-website-reimburse-solo', 
    liveUrl: null,
  },
  {
    id: 'reimburse-lite',
    title: 'ReimburseLite: Secure API System',
    description:
      'A minimalist and highly optimized reimbursement platform. The backend is powered by Laravel, delivering secure RESTful APIs with JWT and OTP authentication, seamlessly consumed by a pure Vanilla JavaScript frontend.',
    techStack: ['Laravel', 'JWT / OTP', 'Vanilla JS', 'REST API'],
    githubUrl: 'https://github.com/melinnp/reimburse_app', // Isi URL repo kalau ada
    liveUrl: null,
  }
];

export const TECH_ARSENAL = {
  core: [
    "React",
    "Tailwind CSS",
    "Framer Motion",
    "Laravel",
    "Livewire 3",
    "Flutter"
  ],
  aiWorkflow: [
    "Cursor",
    "Claude",
    "Gemini",
    "OpenClaw"
  ]
};
