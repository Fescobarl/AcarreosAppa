// src/services/api/cuidador.ts
import apiClient from ".";
import { Cuidador, RegisterData } from "../types/models";

export const cuidadorService = {
  async getAllCuidadores() {
    const response = await apiClient.get("/carer");
    return response.data;
  },
  async getCuidadorById(id: string) {
    const response = await apiClient.get("/carer" + id);
    return response.data;
  },
  async createCuidador(cuidadorData: any) {
    const response = await apiClient.post("/carer", cuidadorData);
    return response.data;
  },
  async updateCuidador(id: string, cuidadorData: Partial<Cuidador>) {
    const response = await apiClient.put(`/carer/${id}`, cuidadorData);
    return response.data;
  },
  async deleteCuidador(id: string) {
    const response = await apiClient.delete(`/carer/${id}`);
    return response.data;
  },
};
