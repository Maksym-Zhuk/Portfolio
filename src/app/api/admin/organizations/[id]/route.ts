import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { organizations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().default(''),
  githubUrl: z.string().url(),
  websiteUrl: z.string().url().optional().nullable(),
  roleBadge: z.string().optional().nullable(),
  version: z.string().optional().nullable(),
  languageName: z.string().optional().nullable(),
  languagePct: z.number().int().min(0).max(100).optional().nullable(),
  releasesCount: z.number().int().min(0).optional().nullable(),
  license: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
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
