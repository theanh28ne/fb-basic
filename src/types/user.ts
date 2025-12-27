export interface User {
  id: number;
  name: string;
  username: string;
  bio: string | null;
  is_private: boolean;
  verified: boolean;
  email?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  avatar_url: string | null;
}

export interface AuthUser extends User {
  email: string;
}
