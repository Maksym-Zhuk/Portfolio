import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@sinclair/typebox';
import { db } from '@/db';
import { skills } from '@/db/schema';
import { eq } from 'drizzle-orm';
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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = safeParse(schema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [row] = await db.update(skills).set(parsed.data).where(eq(skills.id, Number(id))).returning();
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(row);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  await db.delete(skills).where(eq(skills.id, Number(id)));
  return NextResponse.json({ ok: true });
}
