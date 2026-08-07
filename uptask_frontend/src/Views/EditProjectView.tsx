import { useParams } from "react-router-dom"


export default function EditProjectView() {
const params = useParams()
const projectId = params.projectId!
console.log(projectId);

  return (
    <div>EditProjectView</div>
  )
}


/**
 * Recuperamos el projectId desde la URL-- es mejor siempre desde la URL, no miente- -> useParams() 
 * usamos signo exclamacion en params.projectId! para que Ts no se queje, ya que sabemos que ese es el nombre de la variable, lo controlamos nosotros , ts cree que puede ser undefined. pero no, cada vez que llamemos a este componente le vamos a pasar esa variable, asi esta escrito en el router por eso ! signo exclamacion.
 * 
 * 
 * 
 * 
 * 











 */