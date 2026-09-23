import api from "@/lib/axios";
import { taskSchema, type Project, type Task, type TaskFormData } from "@/types";
import { isAxiosError } from "axios";

type TaskAPI = {
  projectId: Project["_id"];
  formData: TaskFormData;
  taskId: Task["_id"];
  status: Task["status"];
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
    //Aseguramos que la respuesta tenga el schema de Task y lo retornamos para poder tener autocompletado en ViewTaskModal
    const response = taskSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateTask({ projectId, taskId, formData }: Pick<TaskAPI, "projectId" | "taskId" | "formData">) {
  try {
    const url = `projects/${projectId}/task/${taskId}`;
    const { data } = await api.put(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskAPI, "projectId" | "taskId">) {
  try {
    const url = `projects/${projectId}/task/${taskId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateTaskStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskAPI, "projectId" | "taskId" | "status">) {
  try {  
    const url = `projects/${projectId}/task/${taskId}/status`;
    const { data } = await api.post<string>(url, { status });
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
 * Para actualizar una tarea, me fijo que necesita ese endpoint en postman-> projectId | taskId y devuelve 'name' 'description' 
 *
 * Me doy cuenta lo importante de tener un type TaskAPI con todas las propiedades task y su type dentro para poder usalros en las Api Fns con PICK y no importa si crece el type despues con Pick me aseguro que no se mezclen!!
 * 
 * Para Ver Tarea usamos la Fn editTaskById, tal vez el nombre no es tan generico pero hace lo mismo. podria haber sido getTaskById
 * 
 * /**
 * Actualizar estado de una tarea: como tenemos mas de un estado hay que enviar a la URL /status ese dato. Si fuese solamente completado o pendiente se podria haber hecho lo del proyecto de Productos donde al tocar el endpoint cambia el estado de uno a otro con algo asi como !completed- usamos la base de deleteTaskById-- Tenemos que enviar status al endpoint, lo definimos en los argumentos de la Fn, nos damos cuenta que no esta tipado, lo aclaramos en el Type con Task["status"] Ventaja del PICK porque si el Type Crece no ensucia los types sino que siempre "elegimos" PICK lo que necesitamos.
 * 
 * La URL termina en /status pero NO expone el nuevo valor -- ese valor viaja
 * "escondido" en el body de la request, no en la URL. En el frontend armamos
 * el objeto a enviar con shorthand -- { status } -- que es lo mismo que
 * { status: status }, aprovechando que la variable local ya se llama igual
 * que la clave que necesito. En el controller, usamos destructuring para
 * SACAR ese valor de adentro de req.body: const { status } = req.body.
 * 
 * Shorthand (frontend, arma el objeto) y destructuring (backend, lee el 
 * objeto) son operaciones DISTINTAS, aunque se escriban parecido ({ status }
 * en los dos lados). Lo único que realmente conecta ambos lados es que la
 * CLAVE del objeto que viaja por la red se llame igual en los dos: "status".
 * No importa cómo se llamen mis variables locales en el camino -- solo
 * importa que la clave final coincida.
 *
 * 
 * 
 *
 */
