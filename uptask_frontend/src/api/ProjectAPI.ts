import api from "@/lib/axios";
import type { ProjectFormData } from "@/types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    //usamos la fn de axios para verificar si es un error de axios
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api("/projects");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

/**
 * Antes esta funcion no retornaba nada PERO despues le metimos su return para llevar data a handleForm y saber que hay que avisar/notificar a user.
 * El console.log es asi porque asi es la forma de la respuesta de axios, cuando hay error lo obtenemos desde response.data.error--> ahi se queja Ts porque no sabe que es error 'error' is of type 'unknown'. El que sí sabe que tipo es error es AXIOS y axios tiene una funcion que evalua si es un error de axios, entonces USAMOS esa Fn y && verificamos que error.response tenga algo y de esa manera hacemos feliz a Ts : ) || entonces en la respuesta de la api podemos tener data o se va por el catch y tenemos error-- si va por error debemos verificar si es AxiosError para hacer feliz a Ts y && que error.response tenga algo-> si eso se cumple LANZO un nuevo error trow new Error que sabemos que esta en error.response.data.error--> eso lo vamos a pasar a la vista en la mutacion y ahi hacemos toast a error.message-< IMPORTANTE si no hacemos trow new Error, en la vista no va a ser tratado como tal, y no va a entrar al onError de la mutacion--<
 *
 *
 *
 *
 */
