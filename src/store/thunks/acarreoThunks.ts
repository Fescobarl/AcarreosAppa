// src/store/thunks/acarreoThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { acarreoService } from "../../services/api/acarreo";
import {
  fetchAcarreosStart,
  fetchAcarreosSuccess,
  fetchAcarreosFailure,
  addAcarreo,
  setAcarreo,
} from "../slices/acarreoSlice";
import { Acarreo } from "../../services/types/models";

export const fetchAcarreos = createAsyncThunk(
  "acarreo/fetchAcarreos",
  async (_, { dispatch }) => {
    dispatch(fetchAcarreosStart());
    try {
      const data = await acarreoService.getAllAcarreos();
      dispatch(fetchAcarreosSuccess(data));
    } catch (error: any) {
      dispatch(fetchAcarreosFailure(error.message));
    }
  }
);

export const createAcarreo = createAsyncThunk(
  "acarreo/addAcarreo",
  async (newAcarreo: Acarreo, { dispatch }) => {
    dispatch(fetchAcarreosStart());
    try {
      const data = await acarreoService.createAcarreo(newAcarreo);
      dispatch(addAcarreo(data));
    } catch (error: any) {
      dispatch(fetchAcarreosFailure(error.message));
    }
  }
);
export const fetchAcarreo = createAsyncThunk(
  "acarreo/fetchAcarreo",
  async (id: string, { dispatch }) => {
    dispatch(fetchAcarreosStart());
    try {
      const data = await acarreoService.getAcarreoById(id);
      dispatch(setAcarreo(data));
    } catch (error: any) {
      dispatch(fetchAcarreosFailure(error.message));
    }
  }
);
