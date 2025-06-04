import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';

export const GET = handleAuth({
  callback: async (req: NextRequest) => {
    try {
      const res = await handleCallback(req);
      return res;
    } catch (error) {
      console.error('Auth callback error:', error);
      return new Response('Authentication failed', { status: 500 });
    }
  },
}); 