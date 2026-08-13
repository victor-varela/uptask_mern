import { editProjectById } from "@/api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"
import EditProjectForm from "./EditProjectForm";


export default function EditProjectView() {
const params = useParams()
const projectId = params.projectId
if(!projectId) return <p>No se encontro el proyecto</p>

//Implementamos useQuery
const {data, isLoading, isError, } = useQuery({
  queryKey:['editProject', projectId],
  queryFn:()=>editProjectById(projectId),
  retry:false
})


if(isLoading) return 'Cargando...'
if(isError) return <Navigate to={'/404'}/>
if (data) return <EditProjectForm data={data}/>

}


/**
 * Recuperamos el projectId desde la URL-- es mejor siempre desde la URL, no miente- -> useParams() 
 * usamos signo exclamacion en params.projectId! para que Ts no se queje, ya que sabemos que ese es el nombre de la variable, lo controlamos nosotros , ts cree que puede ser undefined. pero no, cada vez que llamemos a este componente le vamos a pasar esa variable, asi esta escrito en el router por eso ! signo exclamacion. Lo que llama la atencion es que Ts no lo marca visualmente que projectId puede ser undefined, el profe lo sabia y se adelanto, porque si no escribo el ! no lo subraya en rojo.. muy jodido eso.. 
 * Claude dice>>> que no es tan asi con el signo de exclamacion, puede fallar igual si alguien manualmente escribe la direccion para editar pero no pasa un :projectID, tiene sentido--> por eso usamos o useQuery o algo asi:
 * 
 *          if (!projectId) return <Navigate to="/404" /> o return p no se encontro el proyecto p
 * 
 * Claude dice>>> Esto es lo interesante para que veas con tus propios ojos: TypeScript es lo suficientemente inteligente para entender que, si pasaste el if (!projectId) return ..., entonces después de esa línea es imposible que projectId sea undefined (porque si lo fuera, la función ya hubiera hecho return antes de llegar ahí). A esto se le llama "narrowing" (angostamiento de tipo) — TS va "achicando" las posibilidades del tipo a medida que tu código descarta casos.

Por eso esta forma es mejor que el !: con el ! le mentís a TS ("confiá en mí"), con el if de guarda TS mismo verifica y confirma que ya no puede ser undefined — sin que vos tengas que prometerle nada, y con protección real en runtime (si de verdad llega undefined, mostrás un mensaje en vez de que la app rompa más adelante con un error críptico). React Router solo activa esta ruta si hay ALGO en esa posición de la URL. Si no hay nada ahí (ej: /projects//edit, con doble barra), React Router directamente no matchea la ruta — te lleva a una página no encontrada (o nada, si no tenés ruta 404 definida), ni siquiera llega a renderizar EditProjectView.->> para ver el mensaje de error hay que declarar directamente projectId= undefined.

 * - Usamos useQuery para la consulta, es la novedad del curso- dentro de useQuery tenemos esto: queryKey:['projectEdit', projectId], debemos crear una queryKey UNICA, porque es para esta vista, esta vista consulta a traves de usequery a la DB y cachea la respuesta en el navegador para mas eficiencia, por eso debe tener su queryKey y ademas el pasamos el projectid porque sino cada vez que llamemos a la funcion editProjectById nos va a traer los datos del proyecto anterior-> user click en editar-> useQuery hace la consulta y trae ese proyecto-> user click editar en otro proyecto-> useQuery se da cuenta que es la misma consulta asi que entrega los datos cacheados previamente | entonces hay aseguara que por cada click en editar pasar el porojectId asi cuando user click en editar -> useQuery se da cuenta por el projectId que es un proyecto DIFERENTE entonces hace la consulta-> si user click en editar en un proyecto que ya habia hecho click antes entonces ahi si usequery entrega lo cacheado. La queryFn como tiene un parametro debemos escribirla como arrow function ()=>
 * 
 * 
 * La propiedad retry de useQuery maneja las veces que se hace la consulta antes de que se rinda y devuelva el mensaje de error, se puede modificar su valor para que sea mas eficiente la consulta-- es lo que buscamos con useQuery | error da el mensaje de error que escribimos en el backend, viene de ProjectAPI.ts en el catch de la fn editProjectById ahi lanzamos trow new Error y recuperamos el mensaje con error.response.data.error. Usamos la propiedad error que retorna true o false para enviar a user a 404 --> esa ruta la tenemos que desarrollar despues
 * 
 * Le pasamos data via props al componente EditProjectForm y ahi ya tenemos todo para llenar automaticamente los campos del formulario. <EditProjectForm data={data}/> mi primier impulso al ver que ts se queja de data: any es declarar el type en este componente, PERO habia que hacerlo en EditProjectForm, es decir, el componente al que le ENVIAMOS la prop!!! 
 * 
 * 
 * OJO: ya implementado onError y onSucces en useMutation en EidtProjectForm, notamos que al editar un proyecto / volver a proyectos/ click editar ese mismo proyecto--> los datos no vienen ACTUALIZADOS, POR QUE? porque EditProjectView quien es el que muestra el formulario del poryecto a editar, va a decir:"este projecto que le estas dando click editar y lo hiciste recien porque tengo su projectId en mi queryKey, entonces te muestro los datos cacheados, los que ya habia guardados" Eso hay que corregirlo. Porque QUE HACE useQuery? como es un GET, cada vez que monta este componente hace el GET, la idea es que sea eficiente, entonces le dimos una queryKey 'editProject' y una variable 'projectId' para que diferencie entre los proyectos, entonces si user da click en un proyecto que ya edito y vuelve al componente, éste dice: ya esto lo tengo en cache, no hago la consulta a la DB pero es un error.
 * 
 * Claude dice>>> 
 * 1. Usuario entra a /projects/123/edit
   → useQuery con key ['editProject', '123'] hace el GET, trae los datos,
     los CACHEA bajo esa key exacta

2. Usuario edita, guarda (mutate se dispara, el backend SÍ actualiza bien)

3. Usuario vuelve a Dashboard, click en "Editar" en el MISMO proyecto otra vez
   → useQuery ve la MISMA key ['editProject', '123']
   → React Query dice: "ya tengo esto en cache, no hace falta pedirlo de nuevo"
   → te muestra los datos VIEJOS (los de antes de editar), no los actualizados
   ||| SOLUCION ||| : invalidateQueries "deshabilita el caching previo porque hay datos nuevos"











 */