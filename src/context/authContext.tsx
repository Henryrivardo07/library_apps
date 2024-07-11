import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
import { authContextType } from "@/utils/types/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AuthContext = createContext<authContextType | undefined>(undefined);
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);
  const [avatar, setAvatar] = useState<string | null>(Cookies.get("avatar") || null);
  const [darkMode, setDarkMode] = useState<boolean>(false); // Default dark mode is false

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

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, avatar }}>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useDarkMode = () => {
  const context = React.useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

export default AuthProvider;
