// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cliente, Cuidador } from "../../services/types/models";

interface AuthState {
  usuario: Cliente | Cuidador | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  usuario: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        usuario: Cliente | Cuidador;
        token: string | null;
      }>
    ) {
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.usuario = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
