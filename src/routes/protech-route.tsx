// src/routes/protected-route.tsx

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute: React.FC = () => {
  const { token, role } = useAuth();
  const { pathname } = useLocation();

  const authProtected = ["/signin", "/signup"];
  const protectedByToken = ["/myprofile", "/myprofile/edit", "/borrow", "/books/:id_book", "/dashboard"];
  const adminProtected = ["/dashboard"]; // Tambahkan "/dashboard" di sini

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/signin" />;
    if (adminProtected.includes(pathname) && role !== "admin") return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
