// src/context/ClienteContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { clienteService } from "../services/api/cliente";

interface Cliente {
  _id: string;
  nombre: string;
  direccion: string;
  pide: string;
}

interface ClienteState {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
}

interface ClienteContextType extends ClienteState {
  fetchClientes: () => Promise<void>;
}

const ClienteContext = createContext<ClienteContextType | undefined>(undefined);

type ClienteAction =
  | { type: "FETCH_CLIENTES_START" }
  | { type: "FETCH_CLIENTES_SUCCESS"; payload: Cliente[] }
  | { type: "FETCH_CLIENTES_FAILURE"; payload: string };

const clienteReducer = (
  state: ClienteState,
  action: ClienteAction
): ClienteState => {
  switch (action.type) {
    case "FETCH_CLIENTES_START":
      return { ...state, loading: true, error: null };
    case "FETCH_CLIENTES_SUCCESS":
      return { ...state, clientes: action.payload, loading: false };
    case "FETCH_CLIENTES_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState: ClienteState = {
  clientes: [],
  loading: false,
  error: null,
};

export const ClienteProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(clienteReducer, initialState);

  const fetchClientes = async () => {
    dispatch({ type: "FETCH_CLIENTES_START" });
    try {
      const data = await clienteService.getAllClientes();
      dispatch({ type: "FETCH_CLIENTES_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_CLIENTES_FAILURE", payload: error.message });
    }
  };

  return (
    <ClienteContext.Provider value={{ ...state, fetchClientes }}>
      {children}
    </ClienteContext.Provider>
  );
};

export const useCliente = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error("useCliente debe usarse dentro de un ClienteProvider");
  }
  return context;
};
