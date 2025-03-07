// src/Router.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Cliente from "./pages/cliente";
import Cuidador from "./pages/cuidador";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";
import SearchAcarreo from "./components/Acarreo/SearchAcarreo";
import ListAcarreo from "./components/Acarreo/ListAcarreo";
import Register from "./pages/Register";

const Router = () => {
  const { usuario, loading } = useAuth();

  // Mostrar un spinner mientras se verifica la autenticación
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Routes>
          {/* Ruta de login */}
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Register />} />

          {/* Rutas para cliente */}
          <Route
            path="/cliente"
            element={
              <ProtectedRoute rol="cliente">
                <Navbar />
                <Cliente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guia"
            element={
              <ProtectedRoute rol="cliente">
                <Navbar />
                <SearchAcarreo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cuidador"
            element={
              <ProtectedRoute rol="cuidador">
                <Navbar />
                <Cuidador />
              </ProtectedRoute>
            }
          />

          <Route
            path="/acarreos"
            element={
              <ProtectedRoute rol="cuidador">
                <Navbar />
                <ListAcarreo />
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
      </>
    );
  }
};

export default Router;
