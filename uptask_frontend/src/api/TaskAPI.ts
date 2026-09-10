import api from "@/lib/axios";
import type { Project, Task, TaskFormData } from "@/types";
import { isAxiosError } from "axios";

type TaskAPI = {
  projectId: Project["_id"];
  formData: TaskFormData;
  taskId: Task["_id"];
};
export async function createTask({ projectId, formData }: Pick<TaskAPI, "formData" | "projectId">) {
  try {
    const url = `projects/${projectId}/task`;
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function editTaskById({ projectId, taskId }: Pick<TaskAPI, "projectId" | "taskId">) {
  try {
    const url = `projects/${projectId}/task/${taskId}`;
    const { data } = await api(url);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

/**
 * Task depende de los proyectos por eso las URls son con los projectID como ya lo vimos en el backend. Nos fijamos el endpoint en postman y lo replicamos reemplazando las variables correspondientes projectID, formData (para crear una tarea nueva se necesita el id del proyecto y los datos del formulario 'formData' obviamente..) 
 * 
 * Recuerda: createTask recibe un objeto porque la mutacion que lo llama solo acepta 1 argumento para enviar por eso lo agrupamos en un objeto-
 * 
 * export async function createTask({ projectId, formData }: Pick<TaskAPI, 'formData'| 'projectId'>) el type de la fn tambien pudo haber sido simplemente TaskAPI pero si ese type original llega a tener mas propiedades (puede crecer) seria util valernos de él escogiendo 'pick' lo que nos sirve dependiendo de la funcion.
 *
    const { data } = await api.post<string>(url, formData); el <string > es porque la respuesta de ese endpoint es un string 'Se creo correctamente' es el type de la RESPUESTA.
 * 
 *
 * 
 *
 * 
 * 
 * 
 * 
 * 
 * 
 *
 */
