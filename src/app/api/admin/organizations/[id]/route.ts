import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@sinclair/typebox';
import { db } from '@/db';
import { organizations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';
import { safeParse } from '@/lib/validate';

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
  slug: Type.String({ minLength: 1 }),
  logoUrl: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  description: Type.String({ default: '' }),
  githubUrl: Type.String({ format: 'uri' }),
  websiteUrl: Type.Optional(Type.Union([Type.String({ format: 'uri' }), Type.Null()])),
  roleBadge: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  version: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  languageName: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  languagePct: Type.Optional(Type.Union([Type.Integer({ minimum: 0, maximum: 100 }), Type.Null()])),
  releasesCount: Type.Optional(Type.Union([Type.Integer({ minimum: 0 }), Type.Null()])),
  license: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  status: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  tags: Type.Optional(Type.Union([Type.Array(Type.String()), Type.Null()])),
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

  const [row] = await db.update(organizations).set(parsed.data).where(eq(organizations.id, Number(id))).returning();
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(row);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  await db.delete(organizations).where(eq(organizations.id, Number(id)));
  return NextResponse.json({ ok: true });
}
