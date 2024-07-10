export interface ILoginWithToken {
  email: string;
  password: string;
  token: string;
  avatar: string;
  payload: {
    token: string;
    avatar: string;
  };
}

export interface authContextType {
  token: string | null;
  login: (token: string, avatar: string) => void;
  logout: () => void;
  avatar: string | null;
}
