import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

//conjuro para agregar property y type a request/ Reescribir el scope global. Duplicamos la interface de Request para agregarle la nueva property-> observa que agregamos todos los types de project que ya esta definidos. por eso en el controller lo recuperamos con porject._id

declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

//Son async function{  }
export async function validateTask(req: Request, res: Response, next: NextFunction) {
  try {
    //treamos el codigo que tenia el conrtolador

    //capturamos el id task desde URL
    const { taskId } = req.params;

    //1- Buscar task en la DB

    const task = await Task.findById(taskId);

    //2- Validar que existe
    if (!task) {
      const error = new Error("Tarea no encontrada");
      return res.status(404).json({ error: error.message });
    }

    //3- Asignar task en el req (lo que viaja en la URL nuestro nuevo poder- Va todo task todo el OBJETO es una mauseherramienta que usaremos despues.)
    req.task = task;

    //4- Todo Ok pasa a la nueva funcion/middleware
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
  //treamos el codigo que tenia el conrtolador
}

//Creamos funcion que se repetia en el controller para verificar si la tarea pertenece al proyecto correcto
export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
  if (req.task.project.toString() !== req.project._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(400).json({ error: error.message });
  }
  next();
}

/**
 * Archivo rutina de middleware en Ts-> importamos los types de Express | son export async function nameOfFunction | tienen req, res, next --> porque van al siguiente middleware.
 *
 * Aca hacemos un conjuro nuevo: agregar un type al Type de Request de Express. Esto es porque nos trajimos project del controlador createTask y necesitamos la referencia de project para despues ENVIARLA en el REQUEST (via INTERNA, MARAVILLOSAMENTE) agregando una nueva propiedad al Objeto REQUEST que es un mago poderosisimo.. tiene muchos trucos (COMPARTIR RECURSOS DE UN ARHIVO A OTRO O HACIA OTRO CONTROLLER CON LA URL ES MUY PODEROSO). Entonces le agregamos esa nueva propiedad con su respectivo Type porque esto es TypeScript y sino lo hacemos se queja por todo y lo enviamos en el REQUEST. Reescribimos ese Request de forma Global.
 *          
 *          este problema es el que resolvemos con el conjuro: 
      //2- Asociar la tarea al proyecto
      task.project = project._id; --> aca en el controler no sabe que project le esta hablando porque ya no vive ahi, vive en este middleware y para pasarselo lo hacemos con el REQUEST

      Para REESCRIBIR usamos un Interface porque permite sumar propiedades SIN PERDER las anteriores-- imagina que borraramos las cosas de Request del gran mago.. pierde su poder.. aca le AGREGAMOS UN PODER NUEVO NADA MAS SIN QUE PIERDA LOS OTROS POR ESO USAMOS INTERFACE es una de las caracteristicas de Interface.
 *
 * ACA COPIAMOS PRACTICAMENTE EL MISMO CODIGO QUE TENEMOS DE PROJECT.TS EN MIDDLEWARES PERO AJUSTAMOS AHORA AL MODELO TASK. EL MISMO CONJURO 
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
 *
 *
 */
