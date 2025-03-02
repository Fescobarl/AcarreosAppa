// src/services/api/auth.ts
import apiClient from ".";
import {
  Cliente,
  Cuidador,
  LoginData,
  RegisterData,
  ErrorLogin,
} from "../types/models";

interface LoginResponse {
  usuario: Cliente | Cuidador;
  token: string;
  error?: string;
  message?: string;
}

export const authService = {
  async login(credentials: LoginData): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  async logout(userId: string) {
    const response = await apiClient.post("/auth/logout", { userId });
    return response.data;
  },

  async register(userData: RegisterData) {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  async getProfile(token: string | null = null): Promise<Cliente | Cuidador> {
    if (token) {
      const response = await apiClient.get("/auth/getUser/" + token);
      return response.data;
    }
    const response = await apiClient.get("/auth/getProfile");
    return response.data;
  },
};
