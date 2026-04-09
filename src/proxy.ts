import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import type { SessionData } from '@/lib/session';
import { sessionOptions } from '@/lib/session';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page through
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  if (!session.isAdmin) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
