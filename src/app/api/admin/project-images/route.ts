import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@sinclair/typebox';
import { db } from '@/db';
import { projectImages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';
import { safeParse } from '@/lib/validate';

const upsertSchema = Type.Object({
  repoName: Type.String({ minLength: 1 }),
  imageUrl: Type.String({ minLength: 1 }),
});

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const rows = await db.select().from(projectImages);
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  const parsed = safeParse(upsertSchema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [row] = await db
    .insert(projectImages)
    .values(parsed.data)
    .onConflictDoUpdate({
      target: projectImages.repoName,
      set: { imageUrl: parsed.data.imageUrl },
    })
    .returning();

  return NextResponse.json(row, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await db.delete(projectImages).where(eq(projectImages.id, Number(id)));
  return NextResponse.json({ ok: true });
}
