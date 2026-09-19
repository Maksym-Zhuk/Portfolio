export const dynamic = 'force-dynamic';

import AboutMe from '@/components/Home/AboutMe';
import ContactsScreen from '@/components/Home/Contacts/ContactsScreen';
import SkillsView from '@/components/Skills/SkillsView';
import ReposSection from '@/components/Projects/ReposSection';
import SectionHeading from '@/components/shared/SectionHeading';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/db';
import { aboutMe, contacts, skills, organizations, customProjects, projectImages } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
import type { Skill } from '@/types/skills';

const DEFAULT_RUST = `// about_me.rs\n\n// No content yet — add it in /admin/about`;
const DEFAULT_TS = `// AboutMe.tsx\n\n// No content yet — add it in /admin/about`;
const DEFAULT_NEST = `// developer.controller.ts\n\n// No content yet — add it in /admin/about`;
const DEFAULT_HR = `# Maksym Zhuk
## Full Stack Engineer

Focus areas: ==high-performance APIs==, ==microservice architecture==, systems programming, and database design.

Currently **Lead Developer** at ==Anesis==, with 1 year of professional experience building scalable systems in TypeScript and NestJS.`;

function githubAvatarUrl(githubUrl: string) {
  const login = githubUrl.match(/^https?:\/\/github\.com\/([^/]+)/)?.[1];
  return login ? `https://github.com/${login}.png` : null;
}

export default async function Home() {
  const [aboutData, contactRows, skillRows, orgs, customProjs, imgRows] = await Promise.all([
    db.select().from(aboutMe).where(eq(aboutMe.id, 1)).limit(1),
    db.select().from(contacts).orderBy(asc(contacts.sortOrder), asc(contacts.id)),
    db.select().from(skills).orderBy(asc(skills.sortOrder), asc(skills.id)),
    db.select().from(organizations).orderBy(asc(organizations.sortOrder), asc(organizations.id)),
    db.select().from(customProjects).orderBy(asc(customProjects.sortOrder), asc(customProjects.id)),
    db.select().from(projectImages),
  ]);

  const about = aboutData[0];

  const mappedSkills: Skill[] = skillRows.map((s) => ({
    logo: s.logoUrl,
    title: s.title,
    firstTried: s.firstTried,
    category: s.category,
    description: s.description,
    docsUrl: s.docsUrl,
  }));

  const imageMap = Object.fromEntries(imgRows.map((r) => [r.repoName, r.imageUrl]));

  return (
    <main
      id="main-content"
      className="w-full flex flex-col px-3 sm:px-10 xl:px-20"
    >
      <h1 className="sr-only">
        Maksym Zhuk — Full Stack Engineer and lead developer at Anesis
      </h1>

      <div className="w-full min-h-[92dvh] flex lg:flex-row flex-col justify-between gap-10 lg:mt-0 mt-10">
        <AboutMe
          rustCode={about?.rustCode ?? DEFAULT_RUST}
          tsCode={about?.tsCode ?? DEFAULT_TS}
          nestCode={about?.nestCode ?? DEFAULT_NEST}
          hrSummary={about?.hrSummary ?? DEFAULT_HR}
        />
        <div className="lg:w-2/5 w-full flex lg:justify-end justify-center items-center">
          <div
            className="lg:min-w-[440px] sm:w-[360px] w-[310px] lg:h-[580px] sm:h-[480px] h-[400px] rounded-2xl relative overflow-hidden border border-border"
            aria-label="Photo of Maksym Zhuk"
          >
            <Image
              src={'/MyPhoto.jpeg'}
              alt="Maksym Zhuk — Full Stack Engineer"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>

      <section id="skills" aria-label="Skills" className="w-full scroll-mt-28 py-24">
        <SkillsView skills={mappedSkills} />
      </section>

      <section
        id="projects"
        aria-label="Projects"
        className="w-full flex flex-col gap-10 scroll-mt-28 py-24"
      >
        <SectionHeading path="projects" title="Projects" />

        {orgs.length > 0 && (
          <div aria-label="Featured organizations" className="flex flex-col gap-4">
            {orgs.map((org) => {
              const logoSrc = org.logoUrl ?? githubAvatarUrl(org.githubUrl);
              return (
              <Link
                key={org.id}
                href={org.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${org.name} on GitHub`}
                className="group block"
              >
                <div className="relative border border-primary/40 rounded-xl p-6 bg-card hover:border-primary/70 hover:glow-primary-sm transition-all duration-200 overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-40 h-40 bg-primary/8 rounded-bl-full pointer-events-none hidden sm:block"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg border border-primary/40 bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden relative"
                      aria-hidden="true"
                    >
                      {logoSrc ? (
                        <Image src={logoSrc} alt="" fill className="object-contain p-1.5" unoptimized />
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" className="text-primary" />
                          <circle cx="14" cy="14" r="5" fill="currentColor" className="text-primary" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{org.name}</h3>
                        {org.roleBadge && (
                          <span className="px-2 py-0.5 text-xs font-mono rounded border border-primary/50 text-primary bg-primary/10">
                            {org.roleBadge}
                          </span>
                        )}
                        {org.languageName && (
                          <span className="px-2 py-0.5 text-xs font-mono rounded border border-border text-muted-foreground">
                            {org.languageName}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{org.description}</p>
                    </div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="hidden sm:block shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                      aria-hidden="true"
                    >
                      <path d="M3 9h12M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        )}

        <ReposSection imageMap={imageMap} customProjects={customProjs} />
      </section>

      <ContactsScreen contacts={contactRows} />
    </main>
  );
}
