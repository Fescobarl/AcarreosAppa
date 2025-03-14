// src/context/AcarreoContext.tsx
import { createContext, useReducer, useContext, ReactNode } from "react";
import { acarreoService } from "../services/api/acarreo";
import { Acarreo, NewAcarreo } from "../services/types/models";

const initialClient: Acarreo = {
  _id: "",
  clienteld: "",
  fechaInicio: new Date(),
  fechaEntrega: new Date(),
  direccionOrigen: "",
  direccionFinal: "",
  peso: 0,
  costoTotal: 0,
  estado: "",
  direccionActual: "",
};

interface AcarreoState {
  acarreos: Acarreo[];
  acarreo: Acarreo;
  loading: boolean;
  error: string | null;
}

interface AcarreoContextType extends AcarreoState {
  fetchAcarreos: () => Promise<void>;
  fetchAcarreo: (id: string) => Promise<Acarreo | null>;
  fetchAcarreosByCuidador: (cuidadorId: string) => Promise<void>;
  addAcarreo: (newAcarreo: NewAcarreo) => Promise<Acarreo | null>;
  updateAcarreo: (id: string, newAcarreo: NewAcarreo) => Promise<void>;
}

const AcarreoContext = createContext<AcarreoContextType | null>(null);

type AcarreoAction =
  | { type: "FETCH_ACARREOS_START" }
  | { type: "FETCH_ACARREOS_SUCCESS"; payload: Acarreo[] }
  | { type: "FETCH_ACARREOS_FAILURE"; payload: string }
  | { type: "FETCH_ACARREO_START" }
  | { type: "FETCH_ACARREO_SUCCESS"; payload: Acarreo }
  | { type: "FETCH_ACARREO_FAILURE"; payload: string };

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
    case "FETCH_ACARREO_START":
      return { ...state, loading: true, error: null };
    case "FETCH_ACARREO_SUCCESS":
      return { ...state, acarreo: action.payload, loading: false };
    case "FETCH_ACARREO_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState: AcarreoState = {
  acarreos: [],
  acarreo: initialClient,
  loading: false,
  error: null,
};

export const AcarreoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(acarreoReducer, initialState);

  const fetchAcarreos = async () => {
    dispatch({ type: "FETCH_ACARREOS_START" });
    try {
      const data = await acarreoService.getAllAcarreos();
      dispatch({ type: "FETCH_ACARREOS_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_ACARREOS_FAILURE", payload: error.message });
    }
  };

  const fetchAcarreosByCuidador = async (cuidadorId: string) => {
    dispatch({ type: "FETCH_ACARREOS_START" });
    try {
      const data = await acarreoService.getAcarreosByCuidador(cuidadorId);
      dispatch({ type: "FETCH_ACARREOS_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_ACARREOS_FAILURE", payload: error.message });
    }
  };

  const fetchAcarreo = async (id: string) => {
    dispatch({ type: "FETCH_ACARREO_START" });
    try {
      const data = await acarreoService.getAcarreoByGuia(id);
      dispatch({ type: "FETCH_ACARREO_SUCCESS", payload: data });
      return data;
    } catch (error: any) {
      dispatch({ type: "FETCH_ACARREO_FAILURE", payload: error.message });
      return null;
    }
  };

  const addAcarreo = async (newAcarreo: NewAcarreo) => {
    dispatch({ type: "FETCH_ACARREO_START" });
    try {
      const data = await acarreoService.createAcarreo(newAcarreo);
      dispatch({ type: "FETCH_ACARREO_SUCCESS", payload: data });
      return data;
    } catch (error: any) {
      dispatch({ type: "FETCH_ACARREO_FAILURE", payload: error.message });
      return null;
    }
  };

  const updateAcarreo = async (
    idAcarreo: string,
    newAcarreo: Partial<NewAcarreo>
  ) => {
    dispatch({ type: "FETCH_ACARREO_START" });
    try {
      const data = await acarreoService.updateAcarreo(idAcarreo, newAcarreo);
      dispatch({ type: "FETCH_ACARREO_SUCCESS", payload: data });
      return data;
    } catch (error: any) {
      dispatch({ type: "FETCH_ACARREO_FAILURE", payload: error.message });
      return null;
    }
  };

  return (
    <AcarreoContext.Provider
      value={{
        ...state,
        fetchAcarreos,
        fetchAcarreo,
        addAcarreo,
        fetchAcarreosByCuidador,
        updateAcarreo,
      }}
    >
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
