export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { aboutMe, skills, contacts, organizations, githubOrgs, customProjects, projectImages } from '@/db/schema';
import { sql } from 'drizzle-orm';
import Link from 'next/link';

async function getCounts() {
  const [s, c, o, go, cp, pi] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(skills),
    db.select({ count: sql<number>`count(*)` }).from(contacts),
    db.select({ count: sql<number>`count(*)` }).from(organizations),
    db.select({ count: sql<number>`count(*)` }).from(githubOrgs),
    db.select({ count: sql<number>`count(*)` }).from(customProjects),
    db.select({ count: sql<number>`count(*)` }).from(projectImages),
  ]);
  return {
    skills: Number(s[0].count),
    contacts: Number(c[0].count),
    organizations: Number(o[0].count),
    githubOrgs: Number(go[0].count),
    customProjects: Number(cp[0].count),
    projectImages: Number(pi[0].count),
  };
}

const CARDS = [
  { label: 'Skills', key: 'skills' as const, href: '/admin/skills' },
  { label: 'Contacts', key: 'contacts' as const, href: '/admin/contacts' },
  { label: 'Feat. Orgs', key: 'organizations' as const, href: '/admin/organizations' },
  { label: 'GitHub Orgs', key: 'githubOrgs' as const, href: '/admin/organizations' },
  { label: 'Custom Projects', key: 'customProjects' as const, href: '/admin/projects' },
  { label: 'Project Images', key: 'projectImages' as const, href: '/admin/projects' },
];

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-mono">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your portfolio content.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {CARDS.map(({ label, key, href }) => (
          <Link
            key={key}
            href={href}
            className="border border-border rounded-xl p-4 bg-card hover:border-primary/50 transition-colors duration-150 flex flex-col gap-1"
          >
            <span className="text-3xl font-bold font-mono text-primary">{counts[key]}</span>
            <span className="text-sm text-muted-foreground">{label}</span>
          </Link>
        ))}
      </div>

      <div className="border border-border rounded-xl p-4 bg-card flex flex-col gap-2">
        <span className="text-sm font-mono text-muted-foreground">Quick links</span>
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/', label: 'View site' },
            { href: '/skills', label: 'View skills' },
            { href: '/projects', label: 'View projects' },
            { href: '/admin/about', label: 'Edit About Me' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1 text-xs font-mono border border-border rounded-lg hover:border-primary/50 hover:text-primary transition-colors duration-150"
            >
              {label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
