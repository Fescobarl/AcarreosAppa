// src/services/api/cliente.ts
import apiClient from ".";
import { Cliente, RegisterData } from "../types/models";

export const clienteService = {
  async getAllClientes() {
    const response = await apiClient.get("/client");
    return response.data;
  },
  async getClienteById(id: string) {
    const response = await apiClient.get("/client" + id);
    return response.data;
  },
  async createCliente(clienteData: any) {
    const response = await apiClient.post("/client", clienteData);
    return response.data;
  },
  async updateCliente(id: string, clienteData: Partial<Cliente>) {
    const response = await apiClient.put(`/client/${id}`, clienteData);
    return response.data;
  },
  async deleteCliente(id: string) {
    const response = await apiClient.delete(`/client/${id}`);
    return response.data;
  },
};
