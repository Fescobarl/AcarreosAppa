// src/services/api/cliente.ts
import apiClient from ".";
import { Acarreo } from "../types/models";

export const acarreoService = {
  async getAllAcarreos() {
    const response = await apiClient.get<Acarreo[]>("/acarreo");
    return response.data;
  },
  async getAcarreoById(id: string) {
    const response = await apiClient.get<Acarreo>("/acarreo/" + id);
    return response.data;
  },
  async createAcarreo(acarreoData: Omit<Acarreo, "_id">) {
    const response = await apiClient.post<Acarreo>("/acarreo", acarreoData);
    return response.data;
  },
  async updateAcarreo(id: string, acarreoData: Partial<Acarreo>) {
    const response = await apiClient.put(`/acarreo/${id}`, acarreoData);
    return response.data;
  },
  async deleteAcarreo(id: string) {
    const response = await apiClient.delete(`/acarreo/${id}`);
    return response.data;
  },
};
