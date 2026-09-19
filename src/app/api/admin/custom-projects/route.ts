import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@sinclair/typebox';
import { db } from '@/db';
import { customProjects } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';
import { safeParse } from '@/lib/validate';

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
  description: Type.String({ default: '' }),
  githubUrl: Type.Optional(Type.Union([Type.String({ format: 'uri' }), Type.Null()])),
  homepageUrl: Type.Optional(Type.Union([Type.String({ format: 'uri' }), Type.Null()])),
  topics: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
  language: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  imageUrl: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  sortOrder: Type.Integer({ default: 0 }),
});

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const rows = await db.select().from(customProjects).orderBy(asc(customProjects.sortOrder), asc(customProjects.id));
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

  const [row] = await db.insert(customProjects).values(parsed.data).returning();
  return NextResponse.json(row, { status: 201 });
}
