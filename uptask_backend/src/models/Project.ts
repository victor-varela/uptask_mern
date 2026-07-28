import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";

//Definimos el Type- conectamos nuestro campo con el Document de mongoose del modelo para tener los utility types de TS
export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  // TODO: entender mejor cuando usar type / interface

  //agregamos tareaSS plural en el modelo. Definimos aca el type de estas tareas- Las tareas tienen otros campos (nombre, descripcion, etc.. para poder acceder a esos campos conocidos como 'subdocumentos' debemos darle y type que Ts reconozca por eso es el populatedDoc<Itask> & Document). [] al final porque es array de tareas

  tasks: PopulatedDoc<ITask & Document>[];
}

// Definimos el Schema con mongoose
export const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true },
);

// Definimos el modelo en si-- conectamos el schema con mongoose
const Project = mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
//  Cuando un archivo exporta una sola cosa, export default es la elección natural.

//El nombre del proyecto no lo ponemos unico porque es muy probable que se repita: ecommerce, pos,etc. Pero en el caso de pacientes si puede ser unico.

/**
 * Para crear un modelo necesitamos al menos: El Type del modelo, un schema y el modelo en si.
 * Se usan objetos { } para cada campo 'projectName, clientName, description, etc' del modelo y dentro de ese objeto se definie el type que va con MAYUSCULA porque es mongoose y propiedades adicionales que da mongoose como required, trim, unique etc
 * 
 * ¿Por que el type es export y el Project es export default?
 * 
 *  ProjectType → named export porque es uno de varios exports posibles
    Project → default export porque es lo PRINCIPAL del archivo
 *
    EL profesor cambio el type de Project (porque no le gusta personalmente) de esto:
  export type ProjectType = Document & {
              projectName: string;
              clientName: string;
              description: string;
                                  };

    A esto:
 *          export interface IProject extends Document  {
                                  projectName: string;
                                  clientName: string;
                                  description: string;
                                                         };
 *  
 * Respuesta Claude: 
 * type    → mejor para tipos simples, uniones, alias
  interface → mejor para describir estructuras de objetos 
            y cuando extendés otras clases/interfaces

  En realidad la diferencia entre type e interface en este caso es porque se podria mas adelante agregar un campo al modelo Task, por ejemplo: projectId (para asociar a cada tarea con su proyecto), SIN NECESIDAD DE VOLVER AL ARCHIVO TASK EN /MODELS/TASK .. con interface se puede hacer directamente en un archivo importado. Lo cual tiene ventajas y desventajas. No tener que 'tocar' otra vez el modelo en el archivo original puede ser bueno pero tambien puede causar confusion si otro dev ve el modelo en el archivo original y luego ve que en otro archivo se le agrega otro campo. Por eso en apps propias la convencion es modificar el archivo original 
directamente. La extension desde afuera es mas util en librerias que 
otros desarrolladores consumen. Finalmente el profe agrego task en este archivo-- : (

 == CONECTAR PROYECTO CON TAREAS:
   
  1-  Para definir el type del nuevo campo tasks usamos esto:
    
    //agregamos tareaSS plural en el modelo. Definimos aca el type de estas tareas- 

  tasks:PopulatedDoc<ITask & Document> 

  Hay un 'conflicto' en Ts que nos obliga a usar populatedDoc<Itask> & Document. Lo que queremos es que Ts sepa que tareas es de un tipo que tiene 'subdocumentos'.. algo asi.Las tareas tienen otros campos (nombre, descripcion, etc.. para poder acceder a esos campos conocidos como 'subdocumentos' debemos darle y type que Ts reconozca por eso es el populatedDoc<Itask> & Document)

  2. Definir tareas 'task' en el SCHEMA:
    Recuerda, un proyecto puede tener muchas tareas. Por eso las guardamos en un array de objetos. Y ACA esta uno de los porque hicimos el 'conjuro' anterior populatedDoc<Itask> & Document porque TS se 'marea' con los arrays en los modelos. Es decir, estamos en el schema asignando la estructura de tasks, que es tasks? un array de objetos, un array de tareas, y como es la estructura de una tarea?, pues lo veremos mas adelante pero en este paso es eso declarar un array de tareas, un array de objetos para Ts debo primero decirle o 'recitar el conjuro' [] al final.. OBVIO

    == pregunta a claude: Tanto en project como en task el type del schema es objectId--- es lo que relaciona a un proyecto cada cosa, es asi?? Revisa mis notas y haz las correcciones. Como es bien el problema de subdocumentos y que hace el codigo populatedDoc para arreglarlo? ese type es nuevo para mi

    // TODO: entender mejor cuando usar type / interface
// RESUELTO: 
// type    → tipos simples, uniones, tipos inferidos
// interface → objetos que extienden otras clases (Mongoose, Express Request)
//             o que necesitan crecer sin perder propiedades existentes
// En apps propias → modificar el archivo original directamente
// En librerías   → extender desde afuera con interface

 */
