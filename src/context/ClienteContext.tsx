// src/context/ClienteContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { clienteService } from "../services/api/cliente";
import { RegisterData, Cliente } from "../services/types/models";

const initialClient: Cliente = {
  _id: "",
  nombre: "",
  direccion: "",
  telefono: "",
  correo: "",
  rol: "cliente",
};

interface ClienteState {
  clientes: Cliente[];
  cliente: Cliente;
  loading: boolean;
  error: string | null;
}

interface ClienteContextType extends ClienteState {
  fetchClientes: () => Promise<void>;
  createCliente: (client: RegisterData) => Promise<any>;
}

const ClienteContext = createContext<ClienteContextType | undefined>(undefined);

type ClienteAction =
  | { type: "FETCH_CLIENTES_START" }
  | { type: "FETCH_CLIENTES_SUCCESS"; payload: Cliente[] }
  | { type: "FETCH_CLIENTES_FAILURE"; payload: string }
  | { type: "FETCH_CLIENTE_START" }
  | { type: "FETCH_CLIENTE_SUCCESS"; payload: Cliente }
  | { type: "FETCH_CLIENTE_FAILURE"; payload: string };

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
    case "FETCH_CLIENTE_START":
      return { ...state, loading: true, error: null };
    case "FETCH_CLIENTE_SUCCESS":
      return { ...state, cliente: action.payload, loading: false };
    case "FETCH_CLIENTE_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState: ClienteState = {
  clientes: [],
  cliente: initialClient,
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

  const createCliente = async (newClient: RegisterData) => {
    dispatch({ type: "FETCH_CLIENTE_START" });
    try {
      const data = await clienteService.createCliente(newClient);
      dispatch({ type: "FETCH_CLIENTE_SUCCESS", payload: data });
      return data;
    } catch (error: any) {
      dispatch({ type: "FETCH_CLIENTE_FAILURE", payload: error.message });
    }
  };

  return (
    <ClienteContext.Provider value={{ ...state, fetchClientes, createCliente }}>
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
