// src/context/CuidadorContext.tsx
import { createContext, useReducer, useContext, ReactNode } from "react";

import { RegisterData, Cuidador } from "../services/types/models";
import { cuidadorService } from "../services/api/cuidador";

const initialClient: Cuidador = {
  _id: "",
  nombre: "",
  bisonte: "",
  telefono: "",
  correo: "",
  rol: "",
};

interface CuidadorState {
  cuidadores: Cuidador[];
  cuidador: Cuidador;
  loading: boolean;
  error: string | null;
}

interface CuidadorContextType extends CuidadorState {
  fetchCuidadores: () => Promise<void>;
  fetchCuidador: (id: string) => Promise<Cuidador>;
}

const CuidadorContext = createContext<CuidadorContextType | null>(null);

type CuidadorAction =
  | { type: "FETCH_CUIDADORES_START" }
  | { type: "FETCH_CUIDADORES_SUCCESS"; payload: Cuidador[] }
  | { type: "FETCH_CUIDADORES_FAILURE"; payload: string }
  | { type: "FETCH_CUIDADOR_START" }
  | { type: "FETCH_CUIDADOR_SUCCESS"; payload: Cuidador }
  | { type: "FETCH_CUIDADOR_FAILURE"; payload: string };

const cuidadorReducer = (
  state: CuidadorState,
  action: CuidadorAction
): CuidadorState => {
  switch (action.type) {
    case "FETCH_CUIDADORES_START":
      return { ...state, loading: true, error: null };
    case "FETCH_CUIDADORES_SUCCESS":
      return { ...state, cuidadores: action.payload, loading: false };
    case "FETCH_CUIDADORES_FAILURE":
      return { ...state, error: action.payload, loading: false };
    case "FETCH_CUIDADOR_START":
      return { ...state, loading: true, error: null };
    case "FETCH_CUIDADOR_SUCCESS":
      return { ...state, cuidador: action.payload, loading: false };
    case "FETCH_CUIDADOR_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState: CuidadorState = {
  cuidadores: [],
  cuidador: initialClient,
  loading: false,
  error: null,
};

export const CuidadorProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cuidadorReducer, initialState);

  const fetchCuidadores = async () => {
    dispatch({ type: "FETCH_CUIDADORES_START" });
    try {
      const data = await cuidadorService.getAllCuidadores();
      dispatch({ type: "FETCH_CUIDADORES_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_CUIDADORES_FAILURE", payload: error.message });
    }
  };

  const fetchCuidador = async (id: string) => {
    dispatch({ type: "FETCH_CUIDADOR_START" });
    try {
      const data = await cuidadorService.getCuidadorById(id);
      dispatch({ type: "FETCH_CUIDADOR_SUCCESS", payload: data });
      return data;
    } catch (error: any) {
      dispatch({ type: "FETCH_CUIDADOR_FAILURE", payload: error.message });
    }
  };

  return (
    <CuidadorContext.Provider
      value={{ ...state, fetchCuidadores, fetchCuidador }}
    >
      {children}
    </CuidadorContext.Provider>
  );
};

export const useCuidador = () => {
  const context = useContext(CuidadorContext);
  if (!context) {
    throw new Error("useCuidador debe usarse dentro de un CuidadorProvider");
  }
  return context;
};
