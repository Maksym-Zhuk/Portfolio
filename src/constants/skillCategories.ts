import type { SkillCategory } from '@/types/skills';

export const SKILL_CATEGORIES: SkillCategory[] = [
  'Language',
  'Backend',
  'Database',
  'Fullstack',
  'DevOps',
  'Frontend',
];

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  Language: 'Languages',
  Backend: 'Backend',
  Database: 'Databases',
  Fullstack: 'Full Stack',
  DevOps: 'DevOps & Tools',
  Frontend: 'Frontend',
};
