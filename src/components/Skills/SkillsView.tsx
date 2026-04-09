'use client';

import { Skill } from '@/types/skills';
import { useState } from 'react';
import SkillPageCard from './SkillPageCard';
import SkillTimeline from './SkillTimeline';
import { cn } from '@/lib/utils';

const CATEGORY_ORDER = [
  'Language',
  'Backend',
  'Database',
  'Fullstack',
  'DevOps',
  'Frontend',
];
const CATEGORY_LABELS: Record<string, string> = {
  Language: 'Languages',
  Backend: 'Backend',
  Database: 'Databases',
  Fullstack: 'Full Stack',
  DevOps: 'DevOps & Tools',
  Frontend: 'Frontend',
};

type ViewMode = 'category' | 'timeline';

const MODES: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  {
    id: 'category',
    label: 'Stack',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="8"
          y="1"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="1"
          y="8"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="8"
          y="8"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
    ),
  },
  {
    id: 'timeline',
    label: 'Timeline',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="3" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        <circle
          cx="3"
          cy="11"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <line
          x1="3"
          y1="4.5"
          x2="3"
          y2="5.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="8.5"
          x2="3"
          y2="9.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="6"
          y1="3"
          x2="13"
          y2="3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="6"
          y1="7"
          x2="11"
          y2="7"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="6"
          y1="11"
          x2="9"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

interface Props {
  skills: Skill[];
}

export default function SkillsView({ skills }: Props) {
  const [mode, setMode] = useState<ViewMode>('category');

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    skills: skills.filter((s) => s.category === cat),
  })).filter((g) => g.skills.length > 0);

  return (
    <div className="flex flex-col gap-12">
      {/* Page header + mode toggle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            Stack
          </span>
          <div className="flex items-end gap-4 flex-wrap">
            <h1 className="text-4xl font-bold">Skills</h1>
            <span className="font-mono text-muted-foreground text-sm mb-1">
              {skills.length} technologies
            </span>
          </div>
        </div>

        {/* View toggle */}
        <div
          role="group"
          aria-label="Skills display mode"
          className="flex rounded-xl border border-border overflow-hidden self-start sm:self-auto shrink-0 "
        >
          {MODES.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-mono transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary cursor-pointer',
                i > 0 && 'border-l border-border',
                mode === m.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
              )}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Views */}
      {mode === 'category' ? (
        <div className="flex flex-col gap-16">
          {grouped.map(({ category, label, skills }) => (
            <section key={category} aria-label={`${label} skills`}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xs font-mono tracking-widest uppercase text-muted-foreground whitespace-nowrap w-full text-center sm:w-auto sm:text-left">
                  {label}
                </h2>
                <div
                  className="h-px flex-1 bg-border hidden sm:block"
                  aria-hidden="true"
                />
                <span className="text-xs font-mono text-muted-foreground/60 hidden sm:block">
                  {skills.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {skills.map((skill: Skill) => (
                  <SkillPageCard key={skill.title} data={skill} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <SkillTimeline skills={skills} />
      )}
    </div>
  );
}
