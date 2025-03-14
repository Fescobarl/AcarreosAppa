// src/context/AuthContext.tsx
import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { authService } from "../services/api/auth";
import { Cliente, Cuidador, Admin } from "../services/types/models";
import { useNavigate } from "react-router-dom";

interface AuthState {
  usuario: Cliente | Cuidador | Admin;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialUsuario: Cliente | Cuidador = {
  nombre: "",
  _id: "",
  correo: "",
  rol: "",
  telefono: "",
  bisonte: "",
  direccion: "",
  estado: "",
};

interface AuthContextType extends AuthState {
  login: (correo: string, contrasena: string) => Promise<void>;
  logout: () => void;
  setUsuario: (usuario: Cliente | Cuidador, token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const initialState: AuthState = {
  usuario: initialUsuario,
  token: null,
  loading: false,
  error: null,
};

type AuthAction =
  | { type: "LOGIN_START" }
  | {
      type: "LOGIN_SUCCESS";
      payload: { usuario: Cliente | Cuidador | Admin; token: string };
    }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "LOADING"; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        loading: true,
        error: null,
        usuario: initialUsuario,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        error: null,
        usuario: action.payload.usuario,
        token: action.payload.token,
        loading: false,
      };
    case "LOGIN_FAILURE":
      return {
        usuario: initialUsuario,
        token: null,
        error: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return initialState;
    case "LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const usuario = await authService.getProfile(token);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { usuario, token },
          });
          if (usuario.rol === "cliente") {
            navigate("/cliente");
          } else if (usuario.rol === "cuidador") {
            navigate("/cuidador");
          } else if (usuario.rol === "admin") {
            navigate("/admin");
          }
        } catch (error) {
          console.error("Error al obtener los detalles del usuario:", error);
          logout();
        }
      };
      fetchUserDetails();
    } else {
      logout();
    }
  }, []);

  const login = async (correo: string, contrasena: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const { usuario, token } = await authService.login({
        correo,
        contrasena,
      });
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN_SUCCESS", payload: { usuario, token } });
      // Redirigir según el rol
      if (usuario.rol === "cliente") {
        navigate("/cliente");
      } else if (usuario.rol === "cuidador") {
        navigate("/cuidador");
      } else if (usuario.rol === "admin") {
        navigate("/admin");
      }
    } catch (error: any) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  const setUsuario = (usuario: Cliente | Cuidador, token: string) => {
    dispatch({ type: "LOGIN_START" });
    dispatch({ type: "LOGIN_SUCCESS", payload: { usuario, token } });
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
