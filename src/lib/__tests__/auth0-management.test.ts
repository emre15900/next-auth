import { getManagementToken } from '../auth0-management';

global.fetch = jest.fn();

describe('Auth0 Management API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    process.env.AUTH0_ISSUER_BASE_URL = 'https://test.auth0.com';
    process.env.AUTH0_CLIENT_ID = 'test-client-id';
    process.env.AUTH0_CLIENT_SECRET = 'test-client-secret';
    process.env.AUTH0_AUDIENCE = 'test-audience';
  });

  it('successfully gets management token', async () => {
    const mockResponse = {
      access_token: 'test-access-token',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const token = await getManagementToken();

    expect(token).toBe('test-access-token');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://test.auth0.com/oauth/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: 'test-client-id',
          client_secret: 'test-client-secret',
          audience: 'test-audience',
          grant_type: 'client_credentials',
        }),
      }
    );
  });

  it('throws error when request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getManagementToken()).rejects.toThrow('Failed to get Auth0 Management token');
  });

  it('throws error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(getManagementToken()).rejects.toThrow('Network error');
  });
}); 