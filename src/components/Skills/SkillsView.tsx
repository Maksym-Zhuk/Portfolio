'use client';

import { Skill, SkillViewMode } from '@/types/skills';
import { useState } from 'react';
import SkillPageCard from './SkillPageCard';
import SkillTimeline from './SkillTimeline';
import SectionHeading from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';
import { SKILL_CATEGORIES, SKILL_CATEGORY_LABELS } from '@/constants/skillCategories';
import { SKILL_VIEW_MODES } from '@/constants/skillViewModes';

interface Props {
  skills: Skill[];
}

export default function SkillsView({ skills }: Props) {
  const [mode, setMode] = useState<SkillViewMode>('category');

  const grouped = SKILL_CATEGORIES.map((cat) => ({
    category: cat,
    label: SKILL_CATEGORY_LABELS[cat],
    skills: skills.filter((s) => s.category === cat),
  })).filter((g) => g.skills.length > 0);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <SectionHeading
          path="skills"
          title="Skills"
          meta={`${skills.length} technologies`}
        />

        <div
          role="group"
          aria-label="Skills display mode"
          className="flex rounded-xl border border-border overflow-hidden self-start sm:self-auto shrink-0 "
        >
          {SKILL_VIEW_MODES.map((m, i) => (
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
