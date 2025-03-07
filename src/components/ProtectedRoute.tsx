// src/components/ProtectedRoute.tsx

import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  rol: "cliente" | "cuidador" | "admin";
}

const ProtectedRoute = ({
  rol,
  children,
}: ProtectedRouteProps & React.PropsWithChildren) => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (usuario.rol !== rol) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
