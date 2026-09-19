import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@sinclair/typebox';
import { db } from '@/db';
import { skills } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';
import { safeParse } from '@/lib/validate';
import { SKILL_CATEGORIES } from '@/constants/skillCategories';

const schema = Type.Object({
  logoUrl: Type.String({ minLength: 1 }),
  title: Type.String({ minLength: 1 }),
  firstTried: Type.String({ pattern: '^\\d{4}-\\d{2}-\\d{2}$' }),
  category: Type.Union(SKILL_CATEGORIES.map((c) => Type.Literal(c))),
  description: Type.String({ minLength: 1 }),
  docsUrl: Type.String({ format: 'uri' }),
  sortOrder: Type.Integer({ default: 0 }),
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
  const parsed = safeParse(schema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [row] = await db.insert(skills).values(parsed.data).returning();
  return NextResponse.json(row, { status: 201 });
}
