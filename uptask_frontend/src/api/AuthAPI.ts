import api from "@/lib/axios";
import type { ConfirmToken, UserLoginForm } from "@/types";
import { isAxiosError } from "axios";

//Crear una cuenta
export async function createAccount(formData: UserLoginForm) {
  try {
    const { data } = await api.post<string>("/auth/create-account", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//Confirmar cuenta- el type ConfirmToken un string | que necesita este endpoint el token-- va en formData
export async function confirmAccount(formData: ConfirmToken) {
  try {
    const { data } = await api.post<string>("auth/confirm-account", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//Login
export async function login(formData: UserLoginForm) {
  try {
    const { data } = await api.post<string>("auth/login", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//Obtener nuevo codigo

