export type UserRole = 'admin' | 'user';

export interface Auth0User {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
  'https://kayraexport.com/roles': string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  roles: string[];
  picture?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
} 