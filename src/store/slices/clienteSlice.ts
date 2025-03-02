// src/store/slices/clienteSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cliente } from "../../services/types/models";

interface ClienteState {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
}

const initialState: ClienteState = {
  clientes: [],
  loading: false,
  error: null,
};

const clienteSlice = createSlice({
  name: "cliente",
  initialState,
  reducers: {
    fetchClientesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchClientesSuccess(state, action: PayloadAction<Cliente[]>) {
      state.clientes = action.payload;
      state.loading = false;
    },
    fetchClientesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addCliente(state, action: PayloadAction<Cliente>) {
      state.clientes.push(action.payload);
    },
    updateCliente(state, action: PayloadAction<Cliente>) {
      const index = state.clientes.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.clientes[index] = action.payload;
      }
    },
    deleteCliente(state, action: PayloadAction<string>) {
      state.clientes = state.clientes.filter((c) => c._id !== action.payload);
    },
  },
});

export const {
  fetchClientesStart,
  fetchClientesSuccess,
  fetchClientesFailure,
  addCliente,
  updateCliente,
  deleteCliente,
} = clienteSlice.actions;

export default clienteSlice.reducer;
