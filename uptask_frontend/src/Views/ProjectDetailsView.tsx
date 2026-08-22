import { editProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/task/AddTaskModal";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const ProjectDetailsView = () => {
  //Leo el id con useParams
  const { projectId } = useParams();
  if (!projectId) return <p>Proyecto no encontrado</p>;
  //Instancio useNavigate para inyectar en la URL datos | click en agregar tarea
  const navigate = useNavigate()
  //UseQuery  | GET para obtener los datos del proyecto
  const { data, isError, isLoading } = useQuery({
    queryKey: ["projectDetails"],
    queryFn: () => editProjectById(projectId),
    retry: false,
  });
  
  if (isError) return <Navigate to={"/404"} />;
  if (isLoading) return "Cargando...";

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            onClick={()=> navigate(location.pathname + "?newTask=true")}
          >
            Agregar Tarea
          </button>
        </nav>
        <AddTaskModal/>
      </>
    );
};

/**
 * La implementacion de useQuery es casi exacta a la de editprojectView--> llama a la misma api con el id. 
 * 
 * Nota que data no tiene autocompletado porque viene de ANY en la API.. eso se debe arreglar = const { data } = await api<Project>(`/projects/${id}`); el generics < aca va el type >
 * 
 * onClick={()=> navigate('?newTask=true')} esto inyecta ?addTask=true en la URL- ventaja: se puede compartir el enlace
 * Diferencia entre navigate => funcion y Navigate => componente: si estás escribiendo onClick={...}, onSuccess: () => {...}, o cualquier cosa dentro de llaves que se ejecuta como reacción a algo → navigate(). Si estás escribiendo un return de JSX (la parte visual del componente) → <Navigate />
 * 
 * // useNavigate() — reacción a una ACCIÓN del usuario
onSuccess: (data) => {
  toast.success(data);
  navigate("/");   // ← esto pasa DESPUÉS de que la mutación tuvo éxito,
}                    //   es una función ejecutándose en respuesta a un evento

// <Navigate /> — parte del render condicional
if (isError) return <Navigate to={"/404"} />;
// ← esto es directamente "qué debe mostrar el componente en este render"
//   no hay ningún evento de por medio, es una decisión de QUÉ RENDERIZAR
 * 

navigate(location.pathname + "?newTask=true")} esta linea usa location de la api nativa del window es una forma mas elegante de escribir navigate('?newTask=true') asi igual funciona pero de la otra forma es mas explicito que a la url actual agregale + suma este queryparam
*


 * 





 */
