import type { Request, Response } from "express";
import Task from "../models/Task";

//Creamos la clase porque es mas facil a la hora de importaciones llamar a los metodos de una clase, son menos importaciones.

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      //1- Agregar la tarea
      const task = new Task(req.body);

      //2- Asociar la tarea al proyecto (lo que agregamos en el middleware| el conjuro. Req ahora tiene la property project y accedemos al id)
      task.project = req.project._id;
      //5- Guardar la tarea en la DB
      //  await task.save();

      // 3- Agregar la tarea al array de tareas del proyecto-NOMRMALIZACION- una sola referencia a task (id) para luego en la DB tener la data actualizada siempre
      req.project.tasks.push(task._id);

      //4- Guardar el proyecto con su tarea en la DB
      //  await req.project.save();

      //Hacer un solo await para guardar en la DB. Son varias promises por eso es un array
      await Promise.allSettled([task.save(), req.project.save()]);

      //5- Responder al cliente
      res.send("Tarea creada");
    } catch (error) {
      console.log(error);
    }
  };
  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      //buscamos las tareas que PERTENEZCAN al Proyecto.
      const tasks = await Task.find({ project: req.project._id }).populate("project"); //esto es sintaxis de mongoose. Para mongoose los objetos (todo es un objeto en Js) SON Las Querys. Le envia un objeto y luego lo interpreta como filtro (por el metodo que usamos .find)- El tema populate es otra cosa.

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      //El middleware validateTask ya hizo su funcion. Si llegó aca es porque esta OK y esta en el req (El gran PODER de Req)

      //validamos si la tarea corresponde con su respectivo proyecto-> usamos el req.project._id que habiamos hecho en el conjuro. Aplicamos toString para que sea valida la comparacion / OJO las referencias de task y project ahora vienen de req

      //paso la validacion retornamos al cliente la tarea
      res.json(req.task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      //El middleware validateTask ya hizo su funcion. Si llegó aca es porque esta OK y esta en el req (El gran PODER de Req). Las referencias ahora estan en req | task | project

      //validamos que tarea y proyecto se correspondan -- ahora lo hacemos desde el router con el middleware

      //paso validacion - asignamos 'update' los nuevos campos. Esto lo asigna en memoria solamente. == Ahora llega limpia la data los middleware validan todo ANTES de llegar aca.
      req.task.name = req.body.name;
      req.task.description = req.body.description;

      //Actualizamos en DB a task
      await req.task.save();
      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  //Eliminar una Tarea
  static deleteTask = async (req: Request, res: Response) => {
    try {
      //El middleware validateTask ya hizo su funcion. Si llegó aca es porque esta OK y esta en el req (El gran PODER de Req)

      //Validamos si se corresponden tarea y proyecto -- Ya lo hace el middleware

      //Actualizamos project en memoria para eliminar (filtrar la tarea)Tenemos los datos de project en el request
      req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task._id.toString());

      //Actualizamos project en la DB y  //Actualizamos task en DB con el amigo .allSettled porque no dependen una de otra. En project guardamos el cambio, el filtro que hicimos en la asignacion previa. En task de plano eliminamos.

      await Promise.allSettled([req.project.save(), Task.deleteOne(req.task)]);

      //Respondemos al cliente
      res.json("Tarea eliminada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  //Actulizar/Cambiar estado de una tarea
  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      //capturamos id de tarea a cambiar
      //validamos si existe tarea
      //caputramos valor del nuevo estado a cambiar
      //asignamos en memoria
      //actualizamos en DB
      //respondemos al cliente

      //El middleware validateTask ya hizo su funcion. Si llegó aca es porque esta OK y esta en el req (El gran PODER de Req)

      // agregar esta validación que faltaba--- ya lo hace el middleware
      const { status } = req.body;
      req.task.status = status;
      await req.task.save();
      res.json("Estado de tarea actualizado correctamente");
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Hubo un error" });
    }
  };
}

/**
 * Para crear una tarea PRIMERO debemos verificar si el proyecto al que se le va a asignar la tarea EXISTE. Un proyecto --> varias tareas - Una tarea --> UN SOLO proyecto. Una vez que nos aseguramos que el proyecto existe, manejamos los campos de la tarea (model/Task-> name, description, project, status | name y description vienen del body del cliente | project lo acabamos de validar que existe y viene de la URL. Se lo agregamos al objeto task con un push porque habiamos definido que las tareas pueden ser MUCHAS, entonces es un ARRAY de Task y para agregar un nuevo elmento a un array es con push como toda la vida bebe. | status esta por default en pending.)
 * 
 * Por que no guardar el objeto completo en project en lugar de los IDs ?? 
 * 
 *          El problema de guardar objetos completos:
 * 
Tarea 1 cambia su status a "completed"
     ↓
Tenés que actualizar Task en su colección
     ↓
Y también actualizar el objeto dentro de Project
     ↓
Dos lugares con la misma data → inconsistencia garantizada

Con IDs:
Tarea 1 cambia su status
     ↓
Solo actualizás en la colección Task
     ↓
Project siempre busca la data fresca con el ID
     ↓
Un solo lugar de verdad
 * 
 *  En createTask tenemos 2 await (task y project), ademas estamos validando si existe el proyecto. Esto se puede 'limpiar' con Promise.allSettled y 'refactorizando' la validacion con un middleware para que la funcion quede lo mas 'compacta'posible. Para ello creamos otro archivo en /middleware --> projet.ts
 * 
 * 
 * Los req.project de createTask son porque en el middleware le agregamos, por medio de la duplicacion de interface de Request de Express modificando el scope golabal, la property project.
 * 
 * Para terminar de 'limpiar' el crontroller createTask agrupamos los 2 await. Por que? por qu NO dependen uno del otro. Nos valemos de un metodo nativo de Ts/Js Promise.allSettled   para en UN SOLO PASO guardar en la DB. Si el resultado de un await modificara el otro await ahi SI los dejamos separados. Es un array de Promises.. tiene un solo await y ahi se juntan las promises que quieras.. bellisimo.
 * 
 *     Promise.all        → operaciones que DEPENDEN entre sí
                     si una falla, las demás no tienen sentido

     Promise.allSettled → operaciones INDEPENDIENTES
                     querés que todas intenten aunque alguna falle
                     y querés saber el resultado de cada una
 * 



                     // Promise.all        → falla una → catch automático
// Promise.allSettled → falla una → NO catch, revisás resultados manualmente

// Cómo manejar resultados manualmente con allSettled:
const results = await Promise.allSettled([task.save(), req.project.save()]);

results.forEach(r => {
  if (r.status === 'fulfilled') console.log('ok', r.value)
  if (r.status === 'rejected')  console.log('falló', r.reason)
})

const hasFailed = results.some(r => r.status === 'rejected');

if (hasFailed) {
  return res.status(500).json({ error: "Error al guardar" });
}

// Si hasFailed no se cumple → todas las promises funcionaron → respondés al cliente
res.send("Tarea creada");
 * 
 * En obtener tareas me habia confundido, pense en buscar en Project.. nada que ver, hay que buscar las tareas, la semantica ayyuda para eso.. obtener las tareas where project: project.id . EN compass te das cuenta que hay VARIAS tareas con el MISMO projectId eso significa que son de ese UNICO proyecto.. ahi entiendes todo.
 *
 * Para INCLUIR los detalles del proyecto al que pertenecen las tareas hacemos un populate. Lo importante aca es pasarle a ese populate la REFERENCIA en donde esta la poblacion? de lo que queremos INLCUIR. Esas referencias las declaramos en los MODELOS. Le pasamos el nombre del OBJETO, no el nombre del modelo. EN el modelo esta asi: 
 *          
 *          /models/Project.ts
 * 
 *            tasks: [
       {
         type: Types.ObjectId,
         ref: "Task",
       },
     ],
   },
 *     El objeto se llama 'tasks'. Es un array de objetos con un type y un ref definidos. Eso lo lee mongoose y sabe donde esta la referencia. No confundir ref:'Task' con el nombre que pasamos a populae. Lo mismo para el modelo Task.ts

              project: {
                    type: Types.ObjectId,
                    ref: "Project",
                  },
                  Esto es un objeto que se llama project y es otro objeto con type y ref definidos. Supongo que mongoose en cuanto lee el parametro que tiene el populate busca ese objeto y dentro en ref encuentra los datos y hace el JOIN. En este caso, estamos usando el modelo Task.find --- eso ya le dice mongoose que esta en Task, luego populate('project') -> andá en el campo/objeto project y ahí en ref está lo que tienes que JOIN. 
 * 
 * 
    populate("project") le dice a Mongoose: "andá al campo project de este documento, leé su ref interno, y traé el documento     completo desde ese modelo". populate() recibe el nombre del campo en el Schema, no el nombre del modelo. Populate es lo maximo para cruzar documentos, relacionar unos con otros!! 
 * 
 * Para validar que las tareas se correspondan con su respectivo proyecto. Aca lo importante es: estamos el controller de TASK. Este endpoint requiere el proyectId que lo estamos validando antes que todo con req.param(). Este param ya viene del cliente. La verificacion es == param de la URL 'proyectID' debe ser igual a la propiedad 'project' que tiene el modelo TASK.
 * 
 * En eliminar tarea pasa algo maravilloso: usamos project que viene del middleware validateProject que se ejecuta en router.param al principio de projectRoutes y en ese momento buscamos en la DB y ya tenemos por su ID el project que estamos trabajando con todas sus propiedades, todo el Objeto. Luego en el controller lo manipulamos a gusto-- 
 * 
 * 
 * Por que en updateTaskStatus no hay que actualizar o tener en cuenta a project?? venimos cambiando en ambos modelos, o mejor dicho registrando los cambios en ambos modelos.. creo que es porque en project esta el id de tasks.. y el status no cambia nada en proyect.. antes cambiaba el nombre de las tareas  
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
