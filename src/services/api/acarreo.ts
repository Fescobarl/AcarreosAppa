// src/services/api/cliente.ts
import apiClient from ".";
import { Acarreo, NewAcarreo } from "../types/models";

export const acarreoService = {
  async getAllAcarreos() {
    const response = await apiClient.get<Acarreo[]>("/acarreo");
    return response.data;
  },
  async getAcarreoById(id: string) {
    const response = await apiClient.get<Acarreo>("/acarreo/" + id);
    return response.data;
  },
  async getAcarreoByGuia(numAcarreo: string) {
    const response = await apiClient.get<Acarreo>(
      "/acarreo/guia/" + numAcarreo
    );
    return response.data;
  },
  async getAcarreoPendienteByCuidador(id: string) {
    const response = await apiClient.get<Acarreo>(
      "/acarreo/cuidador/" + id + "/pendiente"
    );
    return response.data;
  },
  async getAcarreosByCuidador(id: string) {
    const response = await apiClient.get<Acarreo[]>("/acarreo/cuidador/" + id);
    return response.data;
  },
  async createAcarreo(acarreoData: NewAcarreo) {
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
