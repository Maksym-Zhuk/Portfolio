import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { aboutMe } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';

const schema = z.object({
  rustCode: z.string(),
  tsCode: z.string(),
  nestCode: z.string(),
});

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const [row] = await db.select().from(aboutMe).where(eq(aboutMe.id, 1)).limit(1);
  return NextResponse.json(row ?? { rustCode: '', tsCode: '', nestCode: '' });
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [row] = await db
    .insert(aboutMe)
    .values({ id: 1, ...parsed.data, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: aboutMe.id,
      set: { ...parsed.data, updatedAt: new Date() },
    })
    .returning();

  return NextResponse.json(row);
}
