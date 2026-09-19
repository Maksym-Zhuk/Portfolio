import { NextRequest, NextResponse } from 'next/server';
import { Type } from '@sinclair/typebox';
import { getSession } from '@/lib/session';
import { verifyPassword } from '@/lib/auth';
import { safeParse } from '@/lib/validate';

const loginSchema = Type.Object({
  password: Type.String({ minLength: 1 }),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = safeParse(loginSchema, body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const ok = await verifyPassword(parsed.data.password);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const session = await getSession();
  session.destroy();
  return NextResponse.json({ ok: true });
}
