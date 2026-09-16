import { editTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  //1:Obtener el parametro. Extraemos search de location para pasarle a UrlSearchParams| Extraer el valor del parametro 'taskId' que se llama 'editTask' en el TaskCard
  const { search } = useLocation();
  const taskId = new URLSearchParams(search).get("editTask")!;

  //Necesitamos projectId tambien para hacer la consulta| lo sacamos de useParams
  const params = useParams();
  const projectId = params.projectId!;

  // const {projectId} = useParams()!no funciona porque esta tomando TODO el OBJ que devuelve useParams como ! no projectId en especifico.

  //2:Consultar a la api | useQuery
  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => editTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry:false
  });

  //si taskId es incorrecto o no existe eje- user escribe 1 al final o x  (caso extremo-user lo cambia manualmente) dirijo a 404 | isError devuelve boolean si la query no encuentra algo | mismo codigo que en EditProjectView- si la URL es incorrecta REACCIONAMOS a eso y dirijo a 404
  if(isError) return <Navigate to={'/404'}/>

  //3: si hay datos entonces muestra el modal- se los paso al modal
  if (data) return <EditTaskModal data={data} taskId={taskId} />;
}

/**
 * Para LEER el parametro que queremos 'editTask' usamos new URLParams location.search -- eso nos trae lo que esta DESPUES de ? en la URL, search le dice busca x parametro-- y el va a buscar despues de ? lo que le pidamos.
 * 
 * En AddTaskModal el codigo para obtener y usar el query string es asi:
 * 
  //URLsearchParams para entrar en los query strings
  const queryParams = new URLSearchParams(search);
  //Creamos variable para asignar a show en el modal
  const modalTask = queryParams.get("newTask");
 * 
 * EN este archivo lo intente hacer en una sola linea: const {search} = useLocation()
    const taskId = new URLSearchParams (search).get('editTask')! -- Nota el ! igual para que Ts no se queje

    intente escribir en una linea projectId pero Ts se quejaba:
    const params = useParams()
    const projectId = params.projectId! -- lo quise hacer asi: const {projectId} = useParams()
 * 
 * La idea es 1: obtener el parametro - 2: hacer la consulta a la API - obtener los datos- mostrar modal- llenar el formulario
 * 
 * queryKey:['task', taskId] --> le paso la variable taskId para que revise si cambio entonces debe volver a hacer la consulta. 'task' es el nombre de la queryKey y taskId es como un 'array de dependencia' mas o menos.
 * 
 * 
 * Problema: este componente se renderiza desde ProjectDetailsView | ProjectDetailsView se muestra con una URL de project/projectId PERO como tiene dentro a EditTaskData y EditTaskData necesita ademas de projectId el taskId da error y aparte de eso es por si el usuario elimina el taskId de la URL (son ese tipo de cosas que uno no pensaria que alguien las puede hacer pero el profesor SI piensa en eso.. es decir.. como ROMPER la UI o la APP. En otras palabras, cuando pueda identificar algo que rompe la app --> buscar la forma de evitarlo- En este caso, identificamos que los componentes son FUNCIONALES O DEPENDEN DE LA URL, entonces-- > debemos BLINDAR la URL o al menos RESPONDER si la URL tiene un error (que buena reflexion Victorino)): undefined e intenta la query varias veces, ademas marca a task/null | hace algo asi: undefined
installHook.js:1 undefined
TaskAPI.ts:26  GET http://localhost:4000/api/projects/6a450aa1704fcdba970a4248/task/null 500 (Internal Server Error)
 *  
 * e intenta varias veces el query. SOLUCION: en useQuery usamos la propiedad 'enabled':(property) enabled?: 
 * 
 * QueryBooleanOption<unknown, Error, unknown, string[]> | undefined

Set this to false or a function that returns false to disable automatic refetching when the query mounts or changes query keys. To refetch the query, use the refetch method returned from the useQuery instance. Accepts a boolean or function that returns a boolean. Defaults to true.
 * 
 * Esta propiedad como dice arriba (hoveree la propiedad) se le asigna un boolean. Y usamos !! para convertir un valor a boolean.- si HAY | EXISTE un valor en taskId entonces la query queda ENABLED ==== HABILITADA = true, si no hay valor en taskId enabled = false
 * 
 * Otra solucion era en ProjectDetailsView escribir un conidcional ANTES de EditTaskData-- pero la gracia aca es aprender que existe enabled y el !!- jeje
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
