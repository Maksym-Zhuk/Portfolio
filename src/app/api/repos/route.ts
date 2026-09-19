import { db } from '@/db';
import { githubOrgs } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const headers: Record<string, string> = {};
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const personalRes = await fetch('https://api.github.com/users/Maksym-Zhuk/repos', { headers });
  if (!personalRes.ok) {
    return new Response('GitHub API error', { status: 500 });
  }
  const personalRepos = await personalRes.json();

  let orgRepos: unknown[] = [];
  try {
    const enabledOrgs = await db.select().from(githubOrgs).where(eq(githubOrgs.enabled, true));
    const orgFetches = enabledOrgs.map((org) =>
      fetch(`https://api.github.com/orgs/${org.orgLogin}/repos`, { headers })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
    );
    const results = await Promise.all(orgFetches);
    orgRepos = results.flat();
  } catch {
    orgRepos = [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const all = [...personalRepos, ...orgRepos] as any[];
  const seen = new Set<number>();
  const filtered = all.filter((item) => {
    if (item.description === null) return false;
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  return Response.json(filtered);
}
