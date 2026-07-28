import api from "@/lib/axios";
import type { ProjectFormData } from "@/types";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Antes esta funcion no retornaba nada PERO despues le metimos su return para llevar data a handleForm y saber que hay que avisar/notificar a user.
 *
 *
 *
 *
 *
 */
