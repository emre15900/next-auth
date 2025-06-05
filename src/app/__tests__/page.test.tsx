import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';
import { useUser } from '@auth0/nextjs-auth0/client';

jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
    });

    render(<Home />);
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('renders sign in button when user is not logged in', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
    });

    render(<Home />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
    });

    render(<Home />);
    expect(screen.getByText('Welcome to Kayra Export')).toBeInTheDocument();
    expect(screen.getByText('A powerful admin dashboard built with Next.js 14 and Ant Design')).toBeInTheDocument();
  });

  it('redirects to dashboard when user is logged in', async () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { name: 'Test User' },
      isLoading: false,
    });

    render(<Home />);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });
}); 