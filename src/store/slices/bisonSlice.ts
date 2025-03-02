// src/store/slices/bisonteSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bisonte } from "../../services/types/models";

interface BisonteState {
  bisontes: Bisonte[];
  loading: boolean;
  error: string | null;
}

const initialState: BisonteState = {
  bisontes: [],
  loading: false,
  error: null,
};

const bisonteSlice = createSlice({
  name: "bisonte",
  initialState,
  reducers: {
    fetchBisontesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBisontesSuccess(state, action: PayloadAction<Bisonte[]>) {
      state.bisontes = action.payload;
      state.loading = false;
    },
    fetchBisontesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchBisontesStart,
  fetchBisontesSuccess,
  fetchBisontesFailure,
} = bisonteSlice.actions;
export default bisonteSlice.reducer;
