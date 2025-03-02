// src/store/slices/acarreoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Acarreo } from "../../services/types/models";
import { fetchAcarreos } from "../thunks/acarreoThunks";

interface AcarreoState {
  acarreos: Acarreo[];
  acarreo: Acarreo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AcarreoState = {
  acarreos: [],
  acarreo: null,
  loading: false,
  error: null,
};

const acarreoSlice = createSlice({
  name: "acarreo",
  initialState,
  reducers: {
    setAcarreo(state, action: PayloadAction<Acarreo>) {
      state.acarreo = action.payload;
    },
    fetchAcarreosStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAcarreosSuccess(state, action: PayloadAction<Acarreo[]>) {
      state.acarreos = action.payload;
      state.loading = false;
    },
    fetchAcarreosFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addAcarreo(state, action: PayloadAction<Acarreo>) {
      state.acarreos.push(action.payload);
    },
    updateAcarreo(state, action: PayloadAction<Acarreo>) {
      const index = state.acarreos.findIndex(
        (a) => a._id === action.payload._id
      );
      if (index !== -1) {
        state.acarreos[index] = action.payload;
      }
    },
    deleteAcarreo(state, action: PayloadAction<string>) {
      state.acarreos = state.acarreos.filter((a) => a._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcarreos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcarreos.fulfilled, (state, action) => {
        state.acarreos = action.payload;
        state.loading = false;
      })
      .addCase(fetchAcarreos.rejected, (state, action) => {
        state.error = action.error.message || "Error al obtener acarreos";
        state.loading = false;
      });
  },
});

export const {
  setAcarreo,
  fetchAcarreosStart,
  fetchAcarreosSuccess,
  fetchAcarreosFailure,
  addAcarreo,
  updateAcarreo,
  deleteAcarreo,
} = acarreoSlice.actions;

export default acarreoSlice.reducer;
