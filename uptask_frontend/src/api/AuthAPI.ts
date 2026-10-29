import api from "@/lib/axios";
import type { ConfirmToken, ForgotPasswordForm, RequestConfirmationCodeForm, UserLoginForm } from "@/types";
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
export async function requestNewCode(formData: RequestConfirmationCodeForm) {
  try {
    const { data } = await api.post<string>("auth/request-code", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//Reestablecer password
export async function requestNewPassword(formData: ForgotPasswordForm) {
  try {
    const { data } = await api.post<string>("auth/forgot-password", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

//Validar token para cambiar password 

//espero recibir token que es de tipo objeto que tiene una propiedad token de tipo string = ConfirmToken hoverea para que veas
export async function validateToken(token: ConfirmToken) {
  try {
    const { data } = await api.post<string>("auth/validate-token", token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
