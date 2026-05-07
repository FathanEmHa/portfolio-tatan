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
