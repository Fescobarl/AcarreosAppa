// src/services/api/bisonte.ts
import apiClient from ".";
import { Bisonte } from "../types/models";

export const bisonteService = {
  async createBisonte(bisonteData: Omit<Bisonte, "_id">) {
    const response = await apiClient.post("/bisonte", bisonteData);
    return response.data;
  },

  async getAllBisontes() {
    const response = await apiClient.get("/bisonte");
    return response.data;
  },
};
