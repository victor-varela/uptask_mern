import api from "@/lib/axios";
import type { UserLoginForm } from "@/types";
import { isAxiosError } from "axios";

//Crear una cuenta
export async function createAccount(formData: UserLoginForm) {
  try {
    const { data } = await api.post<string>("/auth/create-account", formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
