import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { githubOrgs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';

const createSchema = z.object({
  orgLogin: z.string().min(1),
  displayName: z.string().min(1),
  enabled: z.boolean().default(true),
});

const updateSchema = z.object({
  orgLogin: z.string().min(1),
  displayName: z.string().min(1),
  enabled: z.boolean(),
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
  const parsed = createSchema.safeParse(body);
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
  const parsed = updateSchema.safeParse(body);
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
