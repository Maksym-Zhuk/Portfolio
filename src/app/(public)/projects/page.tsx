export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { organizations, customProjects, projectImages } from '@/db/schema';
import { asc } from 'drizzle-orm';
import Link from 'next/link';
import ReposSection from './ReposSection';

export default async function Projects() {
  const [orgs, customProjs, imgRows] = await Promise.all([
    db.select().from(organizations).orderBy(asc(organizations.sortOrder), asc(organizations.id)),
    db.select().from(customProjects).orderBy(asc(customProjects.sortOrder), asc(customProjects.id)),
    db.select().from(projectImages),
  ]);

  const imageMap = Object.fromEntries(imgRows.map((r) => [r.repoName, r.imageUrl]));

  return (
    <main
      id="main-content"
      className="w-full min-h-[100dvh] flex flex-col gap-10 py-10 px-3 sm:px-10 xl:px-20"
    >
      {/* Page header */}
      <div className="flex flex-col gap-3">
        <span className="text-primary font-mono text-sm tracking-widest uppercase">
          Open Source
        </span>
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>

      {/* Featured organizations */}
      {orgs.length > 0 && (
        <section aria-label="Featured organizations" className="flex flex-col gap-4">
          {orgs.map((org) => (
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
                    className="w-12 h-12 rounded-lg border border-primary/40 bg-primary/10 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" className="text-primary" />
                      <circle cx="14" cy="14" r="5" fill="currentColor" className="text-primary" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold">{org.name}</h2>
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
          ))}
        </section>
      )}

      {/* GitHub repos + custom projects (client component — uses React Query) */}
      <ReposSection imageMap={imageMap} customProjects={customProjs} />
    </main>
  );
}
