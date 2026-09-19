import type { AboutMeLang } from '@/types/aboutMe';

export const ABOUT_ME_TABS: { lang: AboutMeLang; filename: string; icon: string; alt: string }[] = [
  {
    lang: 'nest',
    filename: 'developer.controller.ts',
    icon: '/Nest.js.svg',
    alt: 'NestJS',
  },
  { lang: 'rust', filename: 'about_me.rs', icon: '/Rust.svg', alt: 'Rust' },
  {
    lang: 'tsx',
    filename: 'AboutMe.tsx',
    icon: '/TypeScript.svg',
    alt: 'TypeScript',
  },
];

export const ABOUT_ME_SHIKI_LANG: Record<AboutMeLang, string> = {
  rust: 'rust',
  tsx: 'tsx',
  nest: 'typescript',
};

export const ABOUT_ME_DURATION: Record<AboutMeLang, number> = {
  rust: 20,
  tsx: 16,
  nest: 18,
};
