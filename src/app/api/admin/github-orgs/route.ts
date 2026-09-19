import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@sinclair/typebox';
import { db } from '@/db';
import { githubOrgs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';
import { safeParse } from '@/lib/validate';

const createSchema = Type.Object({
  orgLogin: Type.String({ minLength: 1 }),
  displayName: Type.String({ minLength: 1 }),
  enabled: Type.Boolean({ default: true }),
});

const updateSchema = Type.Object({
  orgLogin: Type.String({ minLength: 1 }),
  displayName: Type.String({ minLength: 1 }),
  enabled: Type.Boolean(),
});

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const rows = await db.select().from(githubOrgs);
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  const parsed = safeParse(createSchema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [row] = await db.insert(githubOrgs).values(parsed.data).returning();
  return NextResponse.json(row, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const body = await req.json().catch(() => null);
  const parsed = safeParse(updateSchema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [row] = await db.update(githubOrgs).set(parsed.data).where(eq(githubOrgs.id, Number(id))).returning();
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(row);
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await db.delete(githubOrgs).where(eq(githubOrgs.id, Number(id)));
  return NextResponse.json({ ok: true });
}
