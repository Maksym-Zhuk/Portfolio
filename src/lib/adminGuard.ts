import { NextResponse } from 'next/server';
import { getSession } from './session';

export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
