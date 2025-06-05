import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { getManagementToken } from '@/lib/auth0-management';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const roles = (session.user['https://kayraexport.com/roles'] as string[]) || [];
    const isAdmin = Array.isArray(roles) && roles.includes('admin');

    if (!isAdmin) {
      console.log('Unauthorized access attempt - User roles:', roles);
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 });
    }

    const token = await getManagementToken();
    if (!token) {
      throw new Error('Failed to get management token');
    }

    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users from Auth0');
    }

    const users = await response.json();

    const mappedUsers = users.map((user: any) => ({
      id: user.user_id,
      name: user.name || user.email,
      email: user.email,
      role: user.app_metadata?.roles?.[0] || 'user',
    }));

    return NextResponse.json({ users: mappedUsers });
  } catch (error) {
    console.error('Error in users API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const roles = (session.user['https://kayraexport.com/roles'] as string[]) || [];
    const isAdmin = Array.isArray(roles) && roles.includes('admin');

    if (!isAdmin) {
      console.log('Unauthorized access attempt - User roles:', roles);
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 });
    }

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const token = await getManagementToken();
    if (!token) {
      throw new Error('Failed to get management token');
    }

    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from Auth0:', errorData);
      throw new Error('Failed to update user role');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: (error as Error).message },
      { status: 500 }
    );
  }
}
