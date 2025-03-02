// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bisonteReducer from "./slices/bisonSlice";
import cuidadorReducer from "./slices/cuidadorSlice";
import acarreoReducer from "./slices/acarreoSlice";
import clienteReducer from "./slices/clienteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bisonte: bisonteReducer,
    cuidador: cuidadorReducer,
    acarreo: acarreoReducer,
    cliente: clienteReducer,
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
