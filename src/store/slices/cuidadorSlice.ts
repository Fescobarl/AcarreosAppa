// src/store/slices/cuidadorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cuidador } from "../../services/types/models";

interface CuidadorState {
  cuidadores: Cuidador[];
  cuidador: Cuidador | null;
  loading: boolean;
  error: string | null;
}

const initialState: CuidadorState = {
  cuidadores: [],
  cuidador: null,
  loading: false,
  error: null,
};

const cuidadorSlice = createSlice({
  name: "cuidador",
  initialState,
  reducers: {
    fetchCuidadoresStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCuidadoresSuccess(state, action: PayloadAction<Cuidador[]>) {
      state.cuidadores = action.payload;
      state.loading = false;
    },
    fetchCuidadoresFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchCuidadoresStart,
  fetchCuidadoresSuccess,
  fetchCuidadoresFailure,
} = cuidadorSlice.actions;
export default cuidadorSlice.reducer;
