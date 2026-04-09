import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { requireAdmin } from '@/lib/adminGuard';

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });

  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const blob = await put(file.name, file, { access: 'public' });
  return NextResponse.json({ url: blob.url });
}
