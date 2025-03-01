import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async get<T>(url: string): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axiosInstance.get<T>(url);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axiosInstance.post<T>(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axiosInstance.put<T>(url, data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async delete<T>(url: string): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axiosInstance.delete<T>(url);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const apiService = new ApiService('https://localhost:3000/api/v1/');

export default apiService;