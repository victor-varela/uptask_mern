import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handlerInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProject } from "../middleware/project";
import { taskBelongsToProject, validateTask } from "../middleware/task";

//Instaciamos Router de express
const router = Router();

//Obtener todos los proyectos
router.get("/", ProjectController.getAllProjects);

//Obtener proyecto por Id
router.get(
  "/:id",
  //validamos el Id con el metodo de ExpressValidator
  param("id").isMongoId().withMessage("Id no es valido"),
  handlerInputErrors,
  ProjectController.getProjectById,
);

//Crear un Proyecto
router.post(
  "/",
  //validamos express-validator [body(nombre del campo igual al esquema/modelo)]
  body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio"),
  body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion del proyecto es obligatoria"),
  handlerInputErrors,
  ProjectController.createProject,
);

//Actualizar un Proyecto
router.put(
  "/:id",
  //validamos id con express-validator
  param("id").isMongoId().withMessage("Id no valido"),
  //validamos los datos que vamos a enviar ANTES de actualizar
  body("projectName").notEmpty().withMessage("El nombre del proyecto es obligatorio"),
  body("clientName").notEmpty().withMessage("El nombre del cliente es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion del proyecto es obligatoria"),
  handlerInputErrors,
  ProjectController.updateProject,
);

//Eliminar un Proyecto
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Id no valido"),
  handlerInputErrors,
  ProjectController.deleteProject,
);

//Router for Tasks

//Incorporamos router.param() para evitar duplicacion de codigo | validateProject se necesita en cada enpoint. | validateTask tambien
router.param("projectId", validateProject);
router.param("taskId", validateTask);
router.param("taskId", taskBelongsToProject);

//Crear tarea
router.post(
  "/:projectId/task",
  //primero validamos si existe el project

  //validamos la entrada de datos del cliente
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion de la tarea es obligatorio"),
  handlerInputErrors,
  TaskController.createTask,
);

//Obtener Tareas

router.get(
  "/:projectId/task",
  //validamos si existe el proyecto- Ojo no validamos el param(id).isMongoId()// TODO

  TaskController.getProjectTasks,
);

//Obtener una tarea por su ID
router.get(
  "/:projectId/task/:taskId",
  param("taskId").isMongoId().withMessage("Id no valido"),
  handlerInputErrors,
  TaskController.getTaskById,
);

//Actualizar tarea por ID
router.put(
  "/:projectId/task/:taskId",
  param("taskId").isMongoId().withMessage("Id no valido"),
  handlerInputErrors,
  //validamos body del cliente
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description").notEmpty().withMessage("La descripcion de la tarea es obligatoria"),
  handlerInputErrors,
  TaskController.updateTask,
);

//Eliminar un tarea
router.delete(
  "/:projectId/task/:taskId",
  param("taskId").isMongoId().withMessage("Id no valido"),
  TaskController.deleteTask,
);

//Cambiar / Actualizar estado de una tarea
router.post(
  "/:projectId/task/:taskId/status",
  // validar taskId
  param("taskId").isMongoId().withMessage("Id no valido"),
  handlerInputErrors,
  //validar body == el status que viene del cliente
  body("status").notEmpty().withMessage("EL estado es obligatorio"),
  //validar que no me envien cualquier_cosa
  body("status")
    .isIn(["pending", "onHold", "inProgress", "underReview", "completed"])
    .withMessage("El estado no es valido"),
  handlerInputErrors,
  TaskController.updateTaskStatus,
);
export default router;

/**
 * El router de express es la capa para las peticiones HTTP. Cada peticion lleva un path '/' y un handler (el metodo del controller) es un cotrolador por app???
 * 
                 No exactamente. La separación es así:
                Un Router      → por recurso (projects, users, tasks)
                Un Controller  → por recurso también
                Un método      → por operación (getAllProjects, createProject, etc.)
                Entonces en tu proyecto va a haber:

                projectRoutes.ts + ProjectController para proyectos
                userRoutes.ts + UserController para usuarios
                etc.
 * 
 * 
 * 
 * Al usar clases para el controler podemos hacer una sola importacion y como los metodos son staticos acceder a ellos sin importar cada funcion o handler como se hizo en el proyecto anterior. este import es mas conciso:
 *
 *                  import { ProjectController } from "../controllers/ProjectController";
 *
 *
 *
 * Hasta este punto el flujo venia desde index.ts porque esta el script del package.json -> index importa server -> se ejecuta todo el codigo en server (conecta la DB) -> luego de que ejecuto todo el codigo de server (el import) vuelve a index y sigue ahi.
 *
 * Incorporamos entonces en server al ROUTER
 * 
 *  export default algo  →  se importa SIN llaves  →  cualquier nombre
    export const algo    →  se importa CON llaves  →  debe ser el mismo nombre

   Aca van las rutas especificas de los proyectos, se ve la separacion de responsabilidad.. en el server esta la ruta api/projects y aca estan cada accion de esa ruta.

   Usamos en este router a express validator. Validator tiene una funcion 'body' [  import {body} from 'express-validator' ] esta se le envia el nombre del campo que queremos validar y luego le anidamos otras funciones de validator como .notEmpty() .whitMessage() - eso es lo que hace validator. Este codigo lo escribimos aca en el router para no contaminar al controller y tener las responsabilidades separadas. OJO que tenemos un middleware handlerInputErrors que va ANTES del controller. Este middelware tiene la funcion next que permite que el codigo siga el flujo hacia el controller una vez que paso la validacion O si hubo un error entonces DETIENE EL FLUJO, de ahi su utilidad. Si no tenemos la funcion que maneja los posibles errores NO VALE DE NADA la validacion que hicimos.

   SI lees el codigo actual se ve que primero esta la validacion y luego se escribio la funcion del controller. Esto no fue asi. Primero escrbi la funcion del controller que es la que llama a cada metodo estatico (create, getAll, etc..) y despues le agregue la validacion.

   getAllProjects no tiene validacion porque es solamente visitar la URL y traer todos los proyectos.

   getProjectById SI tiene validacion porque MongoDb nos da objectId que son un formato especifico de la plataforma. Express validator ya tiene incorporado un metodo para validar los ids de mongo db ( isMongoDbId o algo asi jejej que facil) --> entonces usamos ese metodo para validar porque sino nos pasan cualquier cosa por url y la app revienta. Y esa validacion va en el router obviamente.

   El router es quien recibe las peticiones HTTP y DIRIGE EL FLUJO DE LA APP.. ---ACA ESTA EL CRUD--- 

  El router.param() va antes que todo para que cada vez que el router vea que en paramas esta la variable projectID, ejecute el handler 
 * 
  Fijate que las rutas en el router no son 'arbitrarias' del todo, si bien se puede poner cualquier ruta, existen patrones ROA PATTERN, etc... en la de actualizar tarea es /:projectId/:taskId/status ---> eso debe ser una convencion, lo ultimo en el put es lo que se va a actualizar, no es asi? 
  
  Agregamos otro router.param antes de las rutas de las tareas para encapsular un middleware que tenga el codigo de validacion de tarea existente. Luego vamos viendo en cada endpoint que tenga taskId vemos de eliminar el codigo duplicado porque ya lo tenemos en el middleware...
  */
