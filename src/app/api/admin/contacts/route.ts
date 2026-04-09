import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/db';
import { contacts } from '@/db/schema';
import { asc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminGuard';

const schema = z.object({
  title: z.string().min(1),
  iconUrl: z.string().min(1),
  link: z.string().url(),
  handle: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
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
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [row] = await db.insert(contacts).values(parsed.data).returning();
  return NextResponse.json(row, { status: 201 });
}
