// src/context/AcarreoContext.tsx
import { createContext, useReducer, useContext, ReactNode } from "react";
import { acarreoService } from "../services/api/acarreo";
import { Acarreo } from "../services/types/models";

interface AcarreoState {
  acarreos: Acarreo[];
  acarreo: Acarreo | null;
  loading: boolean;
  error: string | null;
}

interface AcarreoContextType extends AcarreoState {
  fetchAcarreos: () => Promise<void>;
  fetchAcarreo: () => Promise<void>;
}

const AcarreoContext = createContext<AcarreoContextType | undefined>(undefined);

type AcarreoAction =
  | { type: "FETCH_ACARREOS_START" }
  | { type: "FETCH_ACARREOS_SUCCESS"; payload: Acarreo[] }
  | { type: "FETCH_ACARREOS_FAILURE"; payload: string };

const acarreoReducer = (
  state: AcarreoState,
  action: AcarreoAction
): AcarreoState => {
  switch (action.type) {
    case "FETCH_ACARREOS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_ACARREOS_SUCCESS":
      return { ...state, acarreos: action.payload, loading: false };
    case "FETCH_ACARREOS_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState: AcarreoState = {
  acarreos: [],
  loading: false,
  error: null,
  acarreo: null,
};

export const AcarreoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(acarreoReducer, initialState);

  const fetchAcarreos = async () => {
    dispatch({ type: "FETCH_ACARREOS_START" });
    try {
      const data = await acarreoService.getAllAcarreos();
      dispatch({ type: "FETCH_ACARREOS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ACARREOS_FAILURE", payload: error.message });
    }
  };

  return (
    <AcarreoContext.Provider value={{ ...state, fetchAcarreos }}>
      {children}
    </AcarreoContext.Provider>
  );
};

export const useAcarreo = () => {
  const context = useContext(AcarreoContext);
  if (!context) {
    throw new Error("useAcarreo debe usarse dentro de un AcarreoProvider");
  }
  return context;
};
