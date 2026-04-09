export const dynamic = 'force-dynamic';

import SkillsView from '@/components/Skills/SkillsView';
import type { Metadata } from 'next';
import { db } from '@/db';
import { skills } from '@/db/schema';
import { asc } from 'drizzle-orm';
import type { Skill } from '@/types/skills';

export const metadata: Metadata = {
  title: 'Skills — Maksym Zhuk',
  description: 'Technologies, frameworks and tools I work with.',
};

export default async function SkillsPage() {
  const skillRows = await db.select().from(skills).orderBy(asc(skills.sortOrder), asc(skills.id));

  const mappedSkills: Skill[] = skillRows.map((s) => ({
    logo: s.logoUrl,
    title: s.title,
    firstTried: s.firstTried,
    category: s.category,
    description: s.description,
    docsUrl: s.docsUrl,
  }));

  return (
    <main
      id="main-content"
      className="w-full min-h-dvh py-12 px-3 sm:px-10 xl:px-20"
    >
      <SkillsView skills={mappedSkills} />
    </main>
  );
}
