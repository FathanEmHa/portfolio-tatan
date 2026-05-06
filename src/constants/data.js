// =========================================================
//  constants/data.js  —  All static site data lives here
// =========================================================

export const SITE_META = {
  name: 'Fathan Mulyasa H.',
  role: 'Full-Stack Developer',
  tagline: 'Building scalable solutions with a focus on clean code and user experience.',
  email: 'fathanmh26@gmail.com',   // ← replace with real email
  github: 'https://github.com/FathanEmHa',
  instagram: 'https://instagram.com/fathan_.mh',
  linkedin: 'https://www.linkedin.com/in/fathan-mulyasa-h-599470371/',
};

// ---------------------------------------------------------
//  Navigation
// ---------------------------------------------------------

export const NAV_LINKS = [
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'projects', label: 'PROJECT', href: '#projects' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

// ---------------------------------------------------------
//  Projects
// ---------------------------------------------------------

export const PROJECTS = [
  {
    id: 'sipa',
    name: 'SIPA',
    fullName: 'Sistem Informasi Peminjaman Alat',
    description:
      'A comprehensive asset borrowing management system built for institutional use. Handles inventory tracking, approval workflows, penalty calculations, and multi-role dashboards.',
    tags: ['Laravel', 'Livewire 3', 'Tailwind CSS', 'MySQL'],
    github: 'https://github.com/fathanmulyasa/sipa',
    demo: null,
    featured: true,
    year: '2025',
    status: 'Production',
  },
  {
    id: 'nodefarm',
    name: 'NodeFarm / TaskGrid',
    fullName: 'NodeFarm — TaskGrid Productivity Suite',
    description:
      'A modular task management and project planning suite inspired by Notion and Linear. Features real-time collaboration, kanban boards, and AI-assisted task prioritization.',
    tags: ['React', 'Node.js', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/fathanmulyasa/taskgrid',
    demo: null,
    featured: true,
    year: '2025',
    status: 'In Progress',
  },
  {
    id: 'flutter-mobile',
    name: 'SIPA Mobile',
    fullName: 'SIPA — Mobile Companion App',
    description:
      'Flutter-based mobile companion for the SIPA system. Allows borrowers to submit requests, track approvals, and receive push notifications on the go.',
    tags: ['Flutter', 'Dart', 'REST API', 'Firebase'],
    github: null,
    demo: null,
    featured: false,
    year: '2025',
    status: 'In Development',
  },
  {
    id: 'dashboard-admin',
    name: 'AdminKit Pro',
    fullName: 'AdminKit Pro — Multi-Tenant Dashboard',
    description:
      'A customizable multi-tenant admin dashboard template with dark/light theming, real-time charts, and modular widget system.',
    tags: ['React', 'Recharts', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/fathanmulyasa/adminkit-pro',
    demo: null,
    featured: false,
    year: '2024',
    status: 'Completed',
  },
];

// ---------------------------------------------------------
//  Tech Stack / Arsenal
// ---------------------------------------------------------

export const TECH_STACK = [
  // Frontend
  { id: 'react', label: 'React', category: 'Frontend', icon: '⚛️' },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'Frontend', icon: '🎨' },
  { id: 'framer', label: 'Framer Motion', category: 'Frontend', icon: '🎞️' },
  { id: 'flutter', label: 'Flutter', category: 'Mobile', icon: '📱' },
  // Backend
  { id: 'laravel', label: 'Laravel', category: 'Backend', icon: '🔴' },
  { id: 'livewire', label: 'Livewire 3', category: 'Backend', icon: '⚡' },
  { id: 'node', label: 'Node.js', category: 'Backend', icon: '🟢' },
  // Database
  { id: 'mysql', label: 'MySQL', category: 'Database', icon: '🐬' },
  // AI / Tooling
  { id: 'cursor', label: 'Cursor', category: 'AI Tools', icon: '🖱️' },
  { id: 'gemini', label: 'Gemini', category: 'AI Tools', icon: '♊' },
  { id: 'claude', label: 'Claude', category: 'AI Tools', icon: '🤖' },
  { id: 'git', label: 'Git', category: 'DevOps', icon: '🌿' },
];

// ---------------------------------------------------------
//  About / Terminal lines
// ---------------------------------------------------------

export const TERMINAL_LINES = [
  { type: 'prompt', content: 'whoami' },
  { type: 'output', content: 'fathan-mulyasa — Full-Stack Developer & Product Thinker' },
  { type: 'blank', content: '' },
  { type: 'prompt', content: 'cat journey.txt' },
  { type: 'output', content: 'Started coding with PHP and raw MySQL queries...' },
  { type: 'output', content: 'Discovered Laravel — never looked back at spaghetti code.' },
  { type: 'output', content: 'Fell in love with React\'s component model and Framer Motion.' },
  { type: 'output', content: 'Now obsessed with clean architecture & developer experience.' },
  { type: 'blank', content: '' },
  { type: 'prompt', content: 'cat focus.txt' },
  { type: 'output', content: '→ Product Management & Software Architecture' },
  { type: 'output', content: '→ Building tools that developers & users actually enjoy' },
  { type: 'output', content: '→ AI-assisted workflows for 10x productivity' },
  { type: 'blank', content: '' },
  { type: 'prompt', content: 'ls skills/' },
  { type: 'output', content: 'React/  Laravel/  Livewire3/  Flutter/  TailwindCSS/  Framer/' },
];
