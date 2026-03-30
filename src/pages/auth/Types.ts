export interface AuthResponse {
  userId: number;
  name: string;
  avatar: string;
  token: string;
  role: string;
  user: {
    role: string;
  };
}
