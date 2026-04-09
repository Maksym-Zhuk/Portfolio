import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { skills } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';

const schema = z.object({
  logoUrl: z.string().min(1),
  title: z.string().min(1),
  firstTried: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
  category: z.enum(['Language', 'Backend', 'Database', 'Fullstack', 'DevOps', 'Frontend']),
  description: z.string().min(1),
  docsUrl: z.string().url(),
  sortOrder: z.number().int().default(0),
});

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const rows = await db.select().from(skills).orderBy(asc(skills.sortOrder), asc(skills.id));
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

  const [row] = await db.insert(skills).values(parsed.data).returning();
  return NextResponse.json(row, { status: 201 });
}
