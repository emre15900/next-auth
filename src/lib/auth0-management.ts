export async function getManagementToken() {
    const res = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      }),
    });
  
    if (!res.ok) {
      throw new Error('Failed to get Auth0 Management token');
    }
  
    const data = await res.json();
    return data.access_token;
  }
  