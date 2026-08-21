import { z } from "zod";

/** Projects */
//Declaramos el schema que sabemos que vamos a usar para las consultas con axios a la API-- las respuestas--

export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

//Creamos schema para DasboardView--> vamos a validar que la api nos devuelve un ARRAY con los campos y los types correctos
export const dashboardViewSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  }),
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "clientName" | "projectName" | "description">;

/*Task*/
/**
 * Hacemos lo mismo que con projects- CONTRATO DE DATOS== la forma que ESPERO recibir de la API- luego los types derivados- Herramienta ZOD para la validacion del cliente, mejor UX/UI- ¿como son los datos que espero recibir de Task? lo veo en el backend. src/models/taks ahi esta la FORMA de Task en el schema.- a diferencia del schema del backend aca le agregamos el campo id ¿por que? porque en el backend el schema se usa para el modelo, el modelo cuando es usado en el controller y crea una tarea, mongoose crea ahi su id | LO MISMO CON EL ID EN PROJECTS, es la misma razon. Entonces ese campo id se incorpora en el schema con mongoose pero aca en el front ya ese id existe por eso lo contemplamos en el schema. el status es un type distinto, lo tomamos ayudandonos del que hicimos en el backend
 */


//Creamos schema de la propiedad status=> Zod para validar la respuesta
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);


//Creamos schema para task=> Zod para validar respuesta
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
});


//Creamos type de task ==> Ts para que no se queje y me de autocompletado
export type Task= z.infer<typeof taskSchema>
//Creamos type de taskFormData porque hay un formulario para crear tarea y definimos lo que vamos a requerir: nombre y descripcion de la tarea
export type TaskFormData = Pick<Task, "name"| "description">

/***
 * Importamos todo {z } de zod
 * OJO en Mongo, el id es type objectID pero cuando tengamos la respuesta en el cliente va a venir como string por eso se declara como string ese campo. Los otros campos, updatedAt, Task, etc.. los fuimos agregando despues pero eso ELEGIMOS el PICK como utility type y no el OMIT para inferrir el type.. con pick no tenemos que cambiar tanto el codigo a medida que agregamos campos al schema. Es decir, como ya SE que en el FORMULARIO para crear proyectos son ESOS campos, entonces yo los ELIJO / PICK.. 
 * 
 * FIjate que por un lado hicimos el schema --> a partir de ese schema CREAMOS el TYPE con z.infer y creamos 2 types a partir del MISMO schema ya que cuando se crea un proyecto no tienes el id definido por eso el PICK y por eso 2 types con diferente nombre--> bellisimo...
 * Sintaxis de pick<unTYPE ya lo habia definido antes 'Project', 'campos' | > 
 * 
 * La definiicion del schema de dashboardView usa la base del schema de un project que habiamos escrito primero y 'elegimos' pick las propiedades que va a tomar de él.. son todas.. pero este schema es un ARRAY. por ello la necesidad de escribirlo. Esto lo vamos a usar en la llamada a la API en ProjectApi.ts ahi cuando recibimos la respuesta de la API, la pasamos por este schema y luego RETORNAMOS si todo esta bien
 * 
 * 
 * Para Task hacemos lo mismo "Generar el schema", el contrato de datos.- Un schema para valildacion con Zod, un type para Ts-- Entonces:1- definimos que COMO SON LOS DATOS, para ello creamos un schema-> ZOD valida con eso y 2- definimos el type de esos datos para que TS nos ayude con autocompletado, nos marque errores si los hay y no se queje. Esa es mas o menos la dinamica de schemas y types . Para projectSchema y taskSchema se agrega el campo id en el front a pesar de que en el back no lo haya definido porque ese id lo crea mongoose cuando se guarda en la DB y como el front CONSUME de la DB lo necesita para validar.. 
 * 
 * 









 */
