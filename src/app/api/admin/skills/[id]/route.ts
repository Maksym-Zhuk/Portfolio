import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { skills } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';

const schema = z.object({
  logoUrl: z.string().min(1),
  title: z.string().min(1),
  firstTried: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.enum(['Language', 'Backend', 'Database', 'Fullstack', 'DevOps', 'Frontend']),
  description: z.string().min(1),
  docsUrl: z.string().url(),
  sortOrder: z.number().int().default(0),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
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
