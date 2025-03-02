// src/store/thunks/clienteThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clienteService } from "../../services/api/cliente";
import {
  fetchClientesStart,
  fetchClientesSuccess,
  fetchClientesFailure,
} from "../slices/clienteSlice";

export const fetchClientes = createAsyncThunk(
  "cliente/fetchClientes",
  async (_, { dispatch }) => {
    dispatch(fetchClientesStart());
    try {
      const data = await clienteService.getAllClientes();
      dispatch(fetchClientesSuccess(data));
    } catch (error: any) {
      dispatch(fetchClientesFailure(error.message));
    }
  }
);
