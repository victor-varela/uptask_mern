import {z} from 'zod'


/** Projects */
//Declaramos el schema que sabemos que vamos a usar para las consultas con axios a la API-- las respuestas--

export const projectSchema =z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
})

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>


/***
 * Importamos todo {z } de zod
 * OJO en Mongo, el id es type objectID pero cuando tengamos la respuesta en el cliente va a venir como string por eso se declara como string ese campo. Los otros campos, updatedAt, Task, etc.. los fuimos agregando despues pero eso ELEGIMOS el PICK como utility type y no el OMIT para inferrir el type.. con pick no tenemos que cambiar tanto el codigo a medida que agregamos campos al schema. Es decir, como ya SE que en el FORMULARIO para crear proyectos son ESOS campos, entonces yo los ELIJO / PICK.. 
 * 
 * FIjate que por un lado hicimos el schema --> a partir de ese schema CREAMOS el TYPE con z.infer y creamos 2 types a partir del MISMO schema ya que cuando se crea un proyecto no tienes el id definido por eso el PICK y por eso 2 types con diferente nombre--> bellisimo...
 * Sintaxis de pick<unTYPE ya lo habia definido antes 'Project', 'campos' | > 
 * 
 * 
 * 
 * 
 * 
 * 
 * 









 */