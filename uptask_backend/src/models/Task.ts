import mongoose, { Schema, Document, Types } from "mongoose";

//creamos este objeto antes del interface para que lo pueda leer el compilador. el as const al final es para que las propiedades sean readonly y eso protege que no se modifiquen.. es un 'diccionario'
const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const;

//creamos el type-- es export porque seguramente lo usemos en otro archivo. Aca me confunde porque el keyof creo que es para la parte izquierda del objeto taskStatus lo que esta en mayuscula y el codigo hace que se tome la parte derecha. Para mi, las key son la parte izquierda y los values la derecha. Por que no se hace de una sola vez ? porque es un objeto con los valores ya definidos, no van a cambiar.
export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

//1- Creamos el Type o Interface
export interface ITask extends Document {
  name: string;
  description: string;
  //asginamos un proyecto a cada tarea. Aca le asignamos el tpye a ese proyecto.-> objectId (que viene de monggose ya que es unico y lo crea directamente mongoose, lo ves en mongoDb compass)
  project: Types.ObjectId;
  //asignamos un status a cada tarea con su type ya creado
  status: TaskStatus;
}

//Se vana agregar mas campos al modelo como project para saber a que proyecto pertenece cada tarea y tal vez otros campos mas.

// 2- Definimos el Schema con mongoose
export const TaskSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    //Agregamos el campo project en el schema. Asignamos type y muy importante la referencia--> donde esta el modelo que voy a conectar
    project: {
      type: Types.ObjectId,
      ref: "Project",
    },
    //agregamos el campo status en el schema.
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
  },
  { timestamps: true },
);

//3- Definimos el modelo en si- conectamos modelo con mongoose
const Task = mongoose.model<ITask>("Task", TaskSchema);

//exportamos defautl para despues llamarlo con cualquier nombre en otro archivo
export default Task;

/**
 * Aca creamos un modelo
 * 1- Creamos el Type o Interface --> tiene los campos del modelo. Aca declaramos que tipo de dato son los campos del modelo. Fijate que ese interface/type es que en la parte 3 cuando creamos Task 'el modelo en si' y via generics asignamos el interface/type del modelo. Esta es la parte para Ts.
 *
 * 2- Definimos el Schema con mongoose --> por cada campo un objeto con el type y otras verificaciones de que nos da mongoose como trim, required, etc EL type en este caso lo asignamos con ayuda de mongoose. Fijate que son en MAYUSCULA para diferenciarlos de los types de Ts
 *
 * 3- Definimos el modelo en SI conectamos modelo con mongoose--> const modelName = mongoose.model<typeOfModelorInterface>('modelName',modelSchema) en este paso se CONECTAN todas las funciones del archivo. Se define el modelo con mongoose 'mongoose.model' se le asigna el type/interface < type/interfaceName > se nombre el modelo ('modelName',  ....) se le asigna el schema ('modelName', modelSchema)
 *
 *  Para crear un modelo necesitamos al menos: El Type del modelo, un schema y el modelo en si.
 * Se usan objetos { } para cada campo 'projectName, clientName, description, etc' del modelo y dentro de ese objeto se definie el type que va con MAYUSCULA porque es mongoose y propiedades adicionales que da mongoose como required, trim, unique etc
 *
 * El profesor cambio el Type del modelo. Antes estaba ProjectType en el modelo anterior y ahora lo cambia a IProject 'Interface' Por que hace eso??
 *
 * =====  LA PARTE MAS COMPLICADA HASTA AHORA DE LOS MODELOS--> CONECTAR UNOS CON OTROS --> PROJECT CON TASK
 *
 *      Debemos asignar un proyecto a cada tarea. Un proyecto puede tener muchas tareas pero una tarea SOLAMENTE un proyecto.
 *
 *      -DEFINIMOS LOS TYPES PARA TS EN EL MODELO (PROJECT):
 *       importamos {Types} de mongoose porque con el viene el objectID que es el identificador unico creado por mongoose y nos servimos de el para decirle a Ts el Type de ese campo
 *      agregamos el project: Types.objectId
 *
 *        - DEFINIMOS EL CAMPO Y EL TYPE EN EL SCHEMA (PROJECT): Agregamos el campo project en el schema. Asignamos type y muy importante la referencia--> donde esta el modelo que voy a conectar
 *
 *            project:{
 * type: Types.objectId
 * ref: 'project'
 * }
 *
 *  STATUS DE TAREAS:
 *  typeof   →  dame el tipo del objeto
    keyof    →  dame las keys de ese tipo
    [keyof]  →  usá esas keys para acceder a los values

 // TRUCO DE TS PARA OBTENER LOS VALUES DE UN OBJETO:
// typeof taskStatus          → devuelve el objeto COMPLETO con sus propiedades readonly
// keyof typeof taskStatus    → devuelve las KEYS del objeto: "PENDING" | "ON_HOLD" | ...
// (typeof taskStatus)[keyof typeof taskStatus] → usa las keys para acceder a los VALUES: "pending" | "onHold" | ...
//
// ¿Por qué no escribir los values directamente como union type?
// type TaskStatus = "pending" | "onHold" | ...  ← funciona pero duplica la info
// Si agregás un status nuevo, tendrías que cambiarlo en DOS lugares (objeto + type)
// Con este truco el type se deriva AUTOMATICAMENTE del objeto → cambiás solo el objeto
//
// TIP: hoverear sobre el type en VSCode con intellisense muestra exactamente qué contiene
 * Hacer ese truco es muy poderoso porque ahi mismo aseguramos que los valores de status sean esos mismos. Es una validacion que luego monngoose revisa si un cliente quiere enviar un valor diferente ya lo atrapa directamente y no permite que se modifique. Quise enviar con postman status: cualquier_cosa y mira el error que me dio :

        ValidationError: Task validation failed: status: `cualquier_cosa` is not a valid enum value for path `status`.
            at model.validate (C:\Users\Victor\Desktop\Victor\Udemy React\uptask_backend\node_modules\mongoose\lib\document.js:2864:36)
 *  
    SIN EMBARGO!! ese log de error no es claro y siempre es mejor tener una capa EXTRA DE SEGURIDAD EN LA API, validar con isIn() en el router con un mensaje claro es la mejor practica!!
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
