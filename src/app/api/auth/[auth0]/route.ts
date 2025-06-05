import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

const afterCallback = async (req: any, session: any) => {
  if (!session) {
    return session;
  }

  console.log('Raw session data:', JSON.stringify(session, null, 2));

  if (session.user) {
    console.log('User metadata:', session.user);
    
    const possibleRoleKeys = [
      'https://kayraexport.com/roles',
      'https://kayraexport.com/app_metadata',
      'https://kayraexport.com/user_metadata',
      'roles',
      'app_metadata',
      'user_metadata',
      `${process.env.AUTH0_ISSUER_BASE_URL}/roles`,
      `${process.env.AUTH0_ISSUER_BASE_URL}/app_metadata`
    ];

    let userRoles = [];
    
    for (const key of possibleRoleKeys) {
      const roles = session.user[key];
      if (Array.isArray(roles)) {
        console.log(`Found roles in ${key}:`, roles);
        userRoles = roles;
        break;
      } else if (roles?.roles && Array.isArray(roles.roles)) {
        console.log(`Found roles in ${key}.roles:`, roles.roles);
        userRoles = roles.roles;
        break;
      }
    }

    session.user.roles = userRoles;
    session.user.role = userRoles.length > 0 ? userRoles[0] : 'user';

    console.log('Final session user data:', {
      roles: session.user.roles,
      role: session.user.role
    });
  }

  return session;
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback })
}); 