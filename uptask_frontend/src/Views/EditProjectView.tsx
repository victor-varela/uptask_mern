import { Navigate, useParams } from "react-router-dom"


export default function EditProjectView() {
const params = useParams()
const projectId = params.projectId
if(!projectId) return <p>No se encontro el proyecto</p>
console.log(projectId);

  return (
    <div>EditProjectView</div>
  )
}


/**
 * Recuperamos el projectId desde la URL-- es mejor siempre desde la URL, no miente- -> useParams() 
 * usamos signo exclamacion en params.projectId! para que Ts no se queje, ya que sabemos que ese es el nombre de la variable, lo controlamos nosotros , ts cree que puede ser undefined. pero no, cada vez que llamemos a este componente le vamos a pasar esa variable, asi esta escrito en el router por eso ! signo exclamacion. Lo que llama la atencion es que Ts no lo marca visualmente que projectId puede ser undefined, el profe lo sabia y se adelanto, porque si no escribo el ! no lo subraya en rojo.. muy jodido eso.. 
 * Claude dice>>> que no es tan asi con el signo de exclamacion, puede fallar igual si alguien manualmente escribe la direccion para editar pero no pasa un :projectID, tiene sentido--> por eso usamos o useQuery o algo asi:
 * 
 *          if (!projectId) return <Navigate to="/404" /> o return p no se encontro el proyecto p
 * 
 * Claude dice>>> Esto es lo interesante para que veas con tus propios ojos: TypeScript es lo suficientemente inteligente para entender que, si pasaste el if (!projectId) return ..., entonces después de esa línea es imposible que projectId sea undefined (porque si lo fuera, la función ya hubiera hecho return antes de llegar ahí). A esto se le llama "narrowing" (angostamiento de tipo) — TS va "achicando" las posibilidades del tipo a medida que tu código descarta casos.

Por eso esta forma es mejor que el !: con el ! le mentís a TS ("confiá en mí"), con el if de guarda TS mismo verifica y confirma que ya no puede ser undefined — sin que vos tengas que prometerle nada, y con protección real en runtime (si de verdad llega undefined, mostrás un mensaje en vez de que la app rompa más adelante con un error críptico).
 * 
 * 
 * 
 * 
 * 











 */