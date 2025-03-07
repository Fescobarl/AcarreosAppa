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
  console.log("antes de if usuario ", usuario);
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (usuario.rol !== rol) {
    console.log("Llega aquí ", usuario.rol);
    return <Navigate to="/" />;
  }

  console.log("Llega aquí children");

  return children;
};

export default ProtectedRoute;
