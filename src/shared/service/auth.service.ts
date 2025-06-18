import axios from "axios";
import type { RegisterData } from "../types/registerData";
import type { LoginData } from "../types/login.types";

export const userRegister = async (data: RegisterData) => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await axios.post(`${baseUrl.replace(/\/$/, '')}/auth/register`, data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
        } else if (error instanceof Error) {
            console.error("Erro inesperado:", error.message);
        } else {
            console.error("Erro desconhecido");
        }
        throw error;
    }
};

export const userLogin = async (data: LoginData) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const url = `${baseUrl.replace(/\/$/, '')}/auth/login`;



    const response = await axios.post(url, data, { withCredentials: true });
    console.log(response.data)
    return response.data;
};








