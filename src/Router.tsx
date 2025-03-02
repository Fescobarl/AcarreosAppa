// src/Router.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Cliente from "./pages/cliente";
import Cuidador from "./pages/cuidador";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Spinner from "./components/Spinner";

const Router = () => {
  const { usuario, loading } = useAuth();

  // Mostrar un spinner mientras se verifica la autenticación
  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      {/* Ruta de login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas para cliente */}
      <Route
        path="/cliente"
        element={
          <ProtectedRoute rol="cliente">
            <Cliente />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cuidador"
        element={
          <ProtectedRoute rol="cuidador">
            <Cuidador />
          </ProtectedRoute>
        }
      />

      {/* Ruta principal (redirigir según el rol) */}
      <Route
        path="/"
        element={
          usuario ? (
            usuario.rol === "cliente" ? (
              <Navigate to="/cliente" />
            ) : (
              <Navigate to="/cuidador" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default Router;
