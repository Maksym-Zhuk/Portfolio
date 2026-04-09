'use client';

import { Skill } from '@/types/skills';
import { useState } from 'react';
import SkillCard from './SkillCard';

const CATEGORIES = ['All', 'Language', 'Backend', 'Database', 'Fullstack', 'DevOps', 'Frontend'] as const;
type Category = (typeof CATEGORIES)[number];

interface Props {
  skills: Skill[];
}

export default function SkillsScreen({ skills }: Props) {
  const [active, setActive] = useState<Category>('All');

  const filtered =
    active === 'All'
      ? skills
      : skills.filter((s) => s.category === active);

  return (
    <section
      id="skills"
      aria-label="Skills"
      className="w-full min-h-[100dvh] flex flex-col gap-8 scroll-mt-24 pb-16 mt-4"
    >
      <div className="flex flex-col gap-3">
        <span className="text-primary font-mono text-sm tracking-widest uppercase">
          Stack
        </span>
        <h2 className="text-3xl font-bold">Skills</h2>
      </div>

      {/* Category tabs */}
      <div
        role="tablist"
        aria-label="Filter skills by category"
        className="flex flex-wrap gap-2"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            aria-controls="skills-grid"
            onClick={() => setActive(cat)}
            className={`px-3 py-1.5 text-sm font-mono rounded border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-primary ${
              active === cat
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div
        id="skills-grid"
        role="tabpanel"
        aria-label={`${active} skills`}
        className="w-full flex flex-wrap justify-start gap-4"
      >
        {filtered.map((skill: Skill, index) => (
          <SkillCard key={`${skill.title}-${index}`} data={skill} />
        ))}
      </div>
    </section>
  );
}
