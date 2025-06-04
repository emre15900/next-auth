import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { getManagementToken } from '@/lib/auth0-management';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    const roles = session?.user?.['https://kayraexport.com/roles'] || [];

    if (!roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = await getManagementToken();

    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const users = await response.json();

    const mappedUsers = users.map((user: any) => ({
      id: user.user_id,
      name: user.name || user.email,
      email: user.email,
      role: user.app_metadata?.roles?.[0] || 'user',
    }));

    return NextResponse.json({ users: mappedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    const roles = session?.user?.['https://kayraexport.com/roles'] || [];

    if (!roles.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const token = await getManagementToken();

    const res = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_metadata: {
          roles: [role],
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Error from Auth0:', err);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
