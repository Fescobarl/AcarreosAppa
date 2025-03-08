// src/services/api/bisonte.ts
import apiClient from ".";
import { Bisonte } from "../types/models";

export const bisonteService = {
  async createBisonte(bisonteData: Omit<Bisonte, "_id">) {
    const response = await apiClient.post("/bison", bisonteData);
    return response.data;
  },

  async getAllBisontes() {
    const response = await apiClient.get("/bison");
    return response.data;
  },

  async getBisonteById(id: string) {
    const response = await apiClient.get("/bison/" + id);
    return response.data;
  },
};
