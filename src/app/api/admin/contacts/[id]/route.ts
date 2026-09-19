import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@sinclair/typebox';
import { db } from '@/db';
import { contacts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';
import { safeParse } from '@/lib/validate';

const schema = Type.Object({
  title: Type.String({ minLength: 1 }),
  iconUrl: Type.String({ minLength: 1 }),
  link: Type.String({ format: 'uri' }),
  handle: Type.Optional(Type.Union([Type.String(), Type.Null()])),
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

  const [row] = await db.update(contacts).set(parsed.data).where(eq(contacts.id, Number(id))).returning();
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(row);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  await db.delete(contacts).where(eq(contacts.id, Number(id)));
  return NextResponse.json({ ok: true });
}
