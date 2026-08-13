import { updateProject } from "@/api/ProjectAPI";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type EditProjectFormProps={
  data:ProjectFormData
}

export default function EditProjectForm({data}:EditProjectFormProps) {

  //Obtenemos el id de la URL, tambien lo pude haber pasado por pops..
  const params = useParams()
  const projectId = params.projectId
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  //instanciamos useQueryClient para invalidar la query al editar y traer datos frescos
  const queryClient = useQueryClient()
  
  //Usamos mutations para el PUT
  const {mutate}= useMutation({
    mutationFn: updateProject,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      //invalidamos la query para que traiga los datos frescos

      //Refresca los datos en DashboardView- vuelve a hacer el fetch
      queryClient.invalidateQueries({queryKey:['projects']})
      //
      //Refresca los datos en EditProjectView- vuelve a hacer el fetch
      queryClient.invalidateQueries({queryKey:['editProject', projectId]})
      toast.success(data)
      navigate('/')
    }
  })

  const navigate = useNavigate()
  //Despues de los hooks van los condicionales
  if(!projectId) return <p>Proyecto no encontrado</p>

  const handleForm = (formData: ProjectFormData) => {
    //Por defecto mutate toma 1 solo argumento. por eso armamos un obj para pasar los 2 argumentos que necesitamos. 
    const mutationData={
      projectId,
      formData 
    }
    return mutate(mutationData) //este data viaja internamente a traves de mutate desde aca hacia mutationFn:updateProject
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Edita los campos del proyecto</p>
        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 cursor-pointer text-2xl text-white font-bold px-10 py-3"
            to="/"
          >
            Volver a Proyectos
          </Link>
        </nav>
        <form className="mt-10 p-10 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit(handleForm)} noValidate>
          <ProjectForm errors={errors} register={register} />
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}

/**
 * Cuando envio la prop data a EditProjectForm, le estoy pasando un parametro a esa funcion. un componente es una funcion y Ts se queja, subraya en rojo cuando los parametros de funciones no estan tipados ni son inferibles de otra forma. Por eso, en EditProjectForm y como SIEMPRE debe ser que cuando un componente recibe una prop HAY que declara su type- 
 * Nota que reutilizamos el formulario, pero para EDITAR, como ya tenemos data, la usamos para los defautlValues de useForm, ahí esta la clave de esto.. llenar en automatico el form
 * 
 * En EditProjectView usamos useQuery para GET/obtener data del porject a editar y mostrarlo en este componente EditProjectForm.- Y usamos useMutation para PUT/modificar el project. Fijate las vueltas que dio el profe para obtener el projectId a traves de useParamas otra vez- Mutate() toma solo 1 parametro, por eso armamos un objeto con las 2 cosas que necesita la mutacion, la data del form y el projectId.
 * 
 * Cuando disparamos la mutacion --> mutate(data)---> en mutateFn ejecutamos la api fn y luego manejamos los errores / notificacion a la UI
 
Respecto al lugar donde esta el if(!projectId)--> los condicionales siempre van DESPUES DE LOS HOOKS-> Claude dice>>
React identifica los hooks por ORDEN de llamada, no por nombre
Un "return" condicional ANTES de un hook puede hacer que ese
hook se salte en algunos renders y no en otros
Si el número/orden de hooks cambia entre renders → React explota
La solución siempre es la misma: todos los hooks primero,
CUALQUIER return condicional (incluidos los early returns) después


OJO: ya implementado onError y onSucces en useMutation, notamos que al editar un proyecto / volver a proyectos/ click editar ese mismo proyecto--> los datos no vienen ACTUALIZADOS, POR QUE? porque EditProjectView quien es el que muestra el formulario del proyecto a editar, va a decir:"este projecto que le estas dando click editar y lo hiciste recien porque tengo su projectId en mi queryKey, entonces te muestro los datos cacheados, los que ya habia guardados" Eso hay que corregirlo




 */