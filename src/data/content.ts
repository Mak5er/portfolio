export type Skill = {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'language';
  level?: number; // 0..100, optional bar
};

export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: 'Active' | 'In Development' | 'Archived';
  github?: string;
  demo?: string;
  featured?: boolean;
};

export type Experience = {
  year: string;
  title: string;
  company: string;
  description: string;
};

export type Contribution = {
  organization: string;
  position: string;
  summary: string;
  url?: string;
  projects: { name: string; link: string; status: string }[];
};

export type RigDevice = { label: string; value: string; note?: string };
export type RigGroup = { title: string; emoji?: string; items: RigDevice[] };

export const profile = {
  name: 'Maks',
  handle: 'mak5er',
  altHandle: 'n1xt0',
  age: 17,
  title: 'Full-Stack Developer',
  tagline: 'Building React, TypeScript, Python and Telegram bot projects.',
  bio: 'Into computers and technology since childhood. Passionate about programming, hardware, and exploring how things work under the hood.',
  location: 'Ukraine',
  status: 'available for work',
};

export const contact = {
  email: 'mmaksym.reva@gmail.com',
  github: 'https://github.com/mak5er',
  telegram: 'https://t.me/mak5er',
  twitter: 'https://twitter.com/mak5er',
  instagram: 'https://instagram.com/mak5er',
  linkedin: 'https://go.mak5er.com/linkedin',
  bot: 'https://t.me/maxloadbot',
  site: 'https://www.mak5er.com',
};

export const skills: Skill[] = [
  { name: 'Python', category: 'language', level: 90 },
  { name: 'TypeScript', category: 'language', level: 85 },
  { name: 'JavaScript', category: 'language', level: 88 },
  { name: 'Swift', category: 'language', level: 60 },
  { name: 'React', category: 'frontend', level: 88 },
  { name: 'Tailwind CSS', category: 'frontend', level: 85 },
  { name: 'Vite', category: 'frontend', level: 80 },
  { name: 'Next.js', category: 'frontend', level: 70 },
  { name: 'Node.js', category: 'backend', level: 78 },
  { name: 'FastAPI', category: 'backend', level: 80 },
  { name: 'Flask', category: 'backend', level: 72 },
  { name: 'Django', category: 'backend', level: 65 },
  { name: 'Aiogram', category: 'backend', level: 88 },
  { name: 'PostgreSQL', category: 'database', level: 78 },
  { name: 'MongoDB', category: 'database', level: 70 },
  { name: 'MySQL', category: 'database', level: 70 },
  { name: 'SQLite', category: 'database', level: 80 },
  { name: 'Docker', category: 'tools', level: 80 },
  { name: 'Git', category: 'tools', level: 88 },
  { name: 'Bash', category: 'tools', level: 70 },
  { name: 'Powershell', category: 'tools', level: 65 },
];

export const github = {
  primaryUser: 'mak5er',
  sources: ['mak5er'],
  // Repos to surface as featured cards in projects, in this exact order.
  featuredRepos: [
    'mak5er/Downloader-Bot',
    'mak5er/Pocket-Poster',
  ],
  // Demo / live links keyed by full_name (lowercased).
  demoLinks: {
    'mak5er/downloader-bot': 'https://t.me/MaxLoadBot',
    'mak5er/pocket-poster': 'https://github.com/Mak5er/Pocket-Poster',
  } as Record<string, string>,
  // Optional description override per repo (full_name lowercased).
  descriptionOverrides: {
    'mak5er/downloader-bot':
      'Telegram bot for downloading media from social platforms. Built around aiogram + yt-dlp, deployed in Docker.',
    'mak5er/pocket-poster':
      'Custom PosterBoard Wallpapers for iOS 26-27. Create beautiful personalized wallpapers for your iPhone.',
  } as Record<string, string>,
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Downloader Bot',
    description:
      'Telegram bot for downloading media from social platforms. Handles a lot of sources, deployed in Docker.',
    technologies: ['Python', 'Aiogram', 'Docker', 'yt-dlp'],
    status: 'Active',
    github: 'https://github.com/Mak5er/Downloader-Bot',
    demo: 'https://t.me/MaxLoadBot',
    featured: true,
  },
  {
    id: 2,
    title: 'Pocket Poster',
    description:
      'Custom PosterBoard Wallpapers for iOS 26-27.0b4. Create beautiful personalized wallpapers with ease.',
    technologies: ['Swift', 'iOS'],
    status: 'Active',
    github: 'https://github.com/Mak5er/Pocket-Poster',
    featured: true,
  },
  {
    id: 3,
    title: 'Layout Changer',
    description:
      'Web tool for converting text between English QWERTY and Ukrainian YCUKEN keyboard layouts.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    status: 'Active',
    github: 'https://github.com/Mak5er/layout-changer',
    demo: 'https://layout.mak5er.com/',
  },
  {
    id: 4,
    title: 'Anekdoty',
    description:
      'Jokes website built with ReactJS and FastAPI. Collection of funny jokes with a clean modern interface.',
    technologies: ['React', 'JavaScript', 'FastAPI', 'Python'],
    status: 'Active',
    github: 'https://github.com/Mak5er/anekdoty',
  },
  {
    id: 5,
    title: 'AiblushiBot',
    description:
      'Telegram bot designed to help manage dehydration processes, track working sessions, and generate reports.',
    technologies: ['Python', 'Aiogram', 'SQLite'],
    status: 'Active',
    github: 'https://github.com/Mak5er/AiblushiBot',
  },
  {
    id: 6,
    title: 'Multi-Bot',
    description:
      'Multitool Bot in Telegram with various utilities and features for productivity.',
    technologies: ['Python', 'Aiogram'],
    status: 'Active',
    github: 'https://github.com/Mak5er/Multi-Bot',
  },
  {
    id: 7,
    title: 'EmojiEncode',
    description:
      'Hide a message in an emoji! Encode a hidden message into an emoji for fun and creative purposes.',
    technologies: ['Python', 'Aiogram'],
    status: 'Active',
    github: 'https://github.com/Mak5er/EmojiEncode',
  },
  {
    id: 8,
    title: 'USD Bot',
    description:
      'Telegram bot to track Ukrsibbank USD to UAH exchange rate. Get real-time currency conversion data.',
    technologies: ['Python', 'Aiogram'],
    status: 'Active',
    github: 'https://github.com/Mak5er/USD-Bot',
  },
  {
    id: 9,
    title: 'AliExpress Sale Finder',
    description:
      'Telegram bot that parses the AliExpress website to find and notify users about sales and deals.',
    technologies: ['Python', 'Web Scraping'],
    status: 'Active',
    github: 'https://github.com/Mak5er/AliExpress-Sale-Finder',
  },
  {
    id: 10,
    title: 'Joke Bot',
    description:
      'Simple Telegram bot for sharing and managing jokes.',
    technologies: ['Python', 'Aiogram'],
    status: 'Active',
    github: 'https://github.com/Mak5er/Joke-Bot',
  },
];

export const experience: Experience[] = [
  {
    year: '2025 — present',
    title: 'Developer',
    company: 'Freelance / Personal projects',
    description:
      'Building freelance and personal software projects with a focus on web development, automation and developer tooling.',
  },
  {
    year: '2024 — 2025',
    title: 'Learning & first projects',
    company: 'Freelance / Self-taught',
    description:
      'Started taking freelance work and shipping first real-world projects while improving frontend and backend skills.',
  },
  {
    year: '2023 — 2024',
    title: 'Learning & building',
    company: 'Self-taught',
    description:
      'Started the journey in software development. Python, JavaScript, React and core full-stack fundamentals.',
  },
];

export const contributions: Contribution[] = [
  {
    organization: 'Pocket Poster',
    position: 'Creator & Maintainer',
    summary: 'Custom PosterBoard Wallpapers for iOS. Popular iOS project with multiple stars and active community support.',
    url: 'https://github.com/Mak5er/Pocket-Poster',
    projects: [
      { name: 'Pocket Poster', link: 'https://github.com/Mak5er/Pocket-Poster', status: 'Active' },
    ],
  },
];

export const rig: RigGroup[] = [
  {
    title: 'main rig',
    items: [
      { label: 'CPU', value: 'AMD Ryzen 9 5900X' },
      { label: 'GPU', value: 'NVIDIA RTX 4060 Ti', note: '16GB VRAM' },
      { label: 'MOBO', value: 'ASUS TUF Gaming B550-Plus' },
      { label: 'RAM', value: '32GB DDR4', note: 'Kingston Fury Beast 3200MHz' },
      { label: 'PSU', value: 'be quiet! Straight Power 12 850W' },
      { label: 'SSD', value: 'Samsung 990 EVO Plus 2TB + 850 EVO 500GB' },
      { label: 'HDD', value: 'Toshiba 500GB 7200RPM' },
    ],
  },
  {
    title: 'homelab',
    items: [
      { label: 'HOST', value: 'Lenovo ThinkCentre M710s' },
      { label: 'CPU', value: 'Intel Core i5-7500' },
      { label: 'RAM', value: '16GB DDR4' },
      { label: 'SSD', value: 'Apacer AS340 240GB' },
      { label: 'HDD', value: 'WD Blue 500GB 7200RPM' },
    ],
  },
  {
    title: 'devices',
    items: [
      { label: 'PHONE', value: 'iPhone 15', note: 'main' },
      { label: 'PHONE', value: 'iPhone 8', note: 'second' },
      { label: 'PHONE', value: 'iPhone 6s', note: 'dead motherboard' },
      { label: 'PHONE', value: 'iPhone 4', note: 'collection' },
      { label: 'TAB', value: 'Xiaomi Redmi Pad SE' },
    ],
  },
];

export const navigation = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'experience', label: 'experience' },
  { id: 'rig', label: 'rig' },
  { id: 'contact', label: 'contact' },
];
