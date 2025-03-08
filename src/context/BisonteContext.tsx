// src/context/BisonteContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { bisonteService } from "../services/api/bisonte";
import { RegisterData, Bisonte } from "../services/types/models";

const initialClient: Bisonte = {
  _id: "",
  nombre: "",
  peso: 0,
  estado: "",
};

interface BisonteState {
  bisontes: Bisonte[];
  bisonte: Bisonte;
  loading: boolean;
  error: string | null;
}

interface BisonteContextType extends BisonteState {
  fetchBisontes: () => Promise<void>;
  fetchBisonte: (id: string) => Promise<void>;
}

const BisonteContext = createContext<BisonteContextType | undefined>(undefined);

type BisonteAction =
  | { type: "FETCH_BISONTES_START" }
  | { type: "FETCH_BISONTES_SUCCESS"; payload: Bisonte[] }
  | { type: "FETCH_BISONTES_FAILURE"; payload: string }
  | { type: "FETCH_BISONTE_START" }
  | { type: "FETCH_BISONTE_SUCCESS"; payload: Bisonte }
  | { type: "FETCH_BISONTE_FAILURE"; payload: string };

const bisonteReducer = (
  state: BisonteState,
  action: BisonteAction
): BisonteState => {
  switch (action.type) {
    case "FETCH_BISONTES_START":
      return { ...state, loading: true, error: null };
    case "FETCH_BISONTES_SUCCESS":
      return { ...state, bisontes: action.payload, loading: false };
    case "FETCH_BISONTES_FAILURE":
      return { ...state, error: action.payload, loading: false };
    case "FETCH_BISONTE_START":
      return { ...state, loading: true, error: null };
    case "FETCH_BISONTE_SUCCESS":
      return { ...state, bisonte: action.payload, loading: false };
    case "FETCH_BISONTE_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState: BisonteState = {
  bisontes: [],
  bisonte: initialClient,
  loading: false,
  error: null,
};

export const BisonteProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bisonteReducer, initialState);

  const fetchBisontes = async () => {
    dispatch({ type: "FETCH_BISONTES_START" });
    try {
      const data = await bisonteService.getAllBisontes();
      dispatch({ type: "FETCH_BISONTES_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_BISONTES_FAILURE", payload: error.message });
    }
  };

  const fetchBisonte = async (id: string) => {
    dispatch({ type: "FETCH_BISONTE_START" });
    try {
      const data = await bisonteService.getBisonteById(id);
      dispatch({ type: "FETCH_BISONTE_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_BISONTE_FAILURE", payload: error.message });
    }
  };

  return (
    <BisonteContext.Provider value={{ ...state, fetchBisontes, fetchBisonte }}>
      {children}
    </BisonteContext.Provider>
  );
};

export const useBisonte = () => {
  const context = useContext(BisonteContext);
  if (!context) {
    throw new Error("useBisonte debe usarse dentro de un BisonteProvider");
  }
  return context;
};
