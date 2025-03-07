// src/services/api/cliente.ts
import apiClient from ".";
import { Cliente, RegisterData } from "../types/models";

export const clienteService = {
  async getAllClientes() {
    const response = await apiClient.get("/cliente");
    return response.data;
  },
  async createCliente(clienteData: any) {
    const response = await apiClient.post("/cliente", clienteData);
    return response.data;
  },
  async updateCliente(id: string, clienteData: Partial<Cliente>) {
    const response = await apiClient.put(`/cliente/${id}`, clienteData);
    return response.data;
  },
  async deleteCliente(id: string) {
    const response = await apiClient.delete(`/cliente/${id}`);
    return response.data;
  },
};
