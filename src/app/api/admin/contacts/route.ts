import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@sinclair/typebox';
import { db } from '@/db';
import { contacts } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';
import { safeParse } from '@/lib/validate';

const schema = Type.Object({
  title: Type.String({ minLength: 1 }),
  iconUrl: Type.String({ minLength: 1 }),
  link: Type.String({ format: 'uri' }),
  handle: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  sortOrder: Type.Integer({ default: 0 }),
});

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const rows = await db.select().from(contacts).orderBy(asc(contacts.sortOrder), asc(contacts.id));
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

  const [row] = await db.insert(contacts).values(parsed.data).returning();
  return NextResponse.json(row, { status: 201 });
}
