// src/utils/types/auth.ts

export interface ILoginWithToken {
  email: string;
  password: string;
  token: string;
  avatar: string;

  payload: {
    token: string;
    avatar: string;
    role: string | null; // Ensure role is defined here as well
  };
}

export interface AuthContextType {
  token: string | null;
  login: (token: string, avatar: string, role: string | null) => void; // Role can be null initially or string
  logout: () => void;
  avatar: string | null;
  role: string | null; // Role can be null initially or string
}

export interface IRegister {
  full_name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  phone_number: number;
  token: string;
}
