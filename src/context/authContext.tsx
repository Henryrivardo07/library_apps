import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AuthContextType } from "@/utils/types/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Menambahkan interface untuk payload JWT
interface CustomJwtPayload extends JwtPayload {
  avatar?: string;
  role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);
  const [avatar, setAvatar] = useState<string | null>(Cookies.get("avatar") || null);
  const [role, setRole] = useState<string | null>(Cookies.get("role") || null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token); // Use CustomJwtPayload for decoding
        if (decoded.avatar) setAvatar(decoded.avatar);
        if (decoded.role) setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token]);

  const login = (token: string, avatar: string, role: string | null) => {
    setToken(token);
    Cookies.set("token", token, { expires: 7 });

    try {
      if (avatar) {
        setAvatar(avatar);
        Cookies.set("avatar", avatar, { expires: 7 });
      }
      if (role) {
        setRole(role);
        Cookies.set("role", role, { expires: 7 });
      }
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setAvatar(null);
    setRole(null);
    Cookies.remove("token");
    Cookies.remove("avatar");
    Cookies.remove("role");
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, avatar, role }}>
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
