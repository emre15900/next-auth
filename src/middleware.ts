import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  const path = req.nextUrl.pathname;

  console.log('Session:', JSON.stringify(session, null, 2));
  
  const roles = session?.user?.['https://kayraexport.com/roles'] || [];
  const userMetadata = session?.user?.['https://kayraexport.com/user_metadata'] || {};
  
  console.log('User Roles:', roles);
  console.log('User Metadata:', userMetadata);

  if (path.startsWith('/admin')) {
    if (!roles.includes('admin')) {
      console.log('Unauthorized access attempt to admin page');
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    console.log('Admin access granted');
  }

  if (path.startsWith('/dashboard') || path.startsWith('/profile')) {
    if (!session?.user) {
      console.log('Unauthorized access attempt to protected page');
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
