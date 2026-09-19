export interface Skill {
  logo: string;
  title: string;
  firstTried: string;
  category: string;
  description: string;
  docsUrl: string;
}

export type SkillCategory =
  | 'Language'
  | 'Backend'
  | 'Database'
  | 'Fullstack'
  | 'DevOps'
  | 'Frontend';

export type SkillViewMode = 'category' | 'timeline';

export interface MonthGroup {
  month: number;
  label: string;
  skills: Skill[];
}

export interface YearGroup {
  year: number;
  months: MonthGroup[];
  total: number;
}
