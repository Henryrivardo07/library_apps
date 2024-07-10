import { authContextType } from "@/utils/types/auth";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";

const AuthContext = createContext<authContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);
  const [avatar, setAvatar] = useState<string | null>(Cookies.get("avatar") || null);

  const login = (token: string, avatar: string) => {
    setToken(token);
    setAvatar(avatar);
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("avatar", avatar, { expires: 7 });
  };

  const logout = () => {
    setToken(null);
    setAvatar(null);
    Cookies.remove("token");
    Cookies.remove("avatar");
  };

  return <AuthContext.Provider value={{ token, login, logout, avatar }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
