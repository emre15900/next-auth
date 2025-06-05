import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  const path = req.nextUrl.pathname;

  const roles = session?.user?.['https://kayraexport.com/roles'] || [];
  const userMetadata = session?.user?.['https://kayraexport.com/user_metadata'] || {};
  
  if (path.startsWith('/admin')) {
    if (!roles.includes('admin')) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  if (path.startsWith('/dashboard') || path.startsWith('/profile')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return res;
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
  ],
};
