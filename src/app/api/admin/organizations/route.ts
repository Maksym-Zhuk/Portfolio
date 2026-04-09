import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { organizations } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().default(''),
  githubUrl: z.string().url(),
  websiteUrl: z.string().url().optional().nullable(),
  roleBadge: z.string().optional().nullable(),
  version: z.string().optional().nullable(),
  languageName: z.string().optional().nullable(),
  languagePct: z.number().int().min(0).max(100).optional().nullable(),
  releasesCount: z.number().int().min(0).optional().nullable(),
  license: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const rows = await db.select().from(organizations).orderBy(asc(organizations.sortOrder), asc(organizations.id));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [row] = await db.insert(organizations).values(parsed.data).returning();
  return NextResponse.json(row, { status: 201 });
}
