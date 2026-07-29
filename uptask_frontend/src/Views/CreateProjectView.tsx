import { createProject } from "@/api/ProjectAPI";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateProjectView() {
  //Instanciamos react-hook-form / lo iniciamos con defaultValues
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  //instanciamos navigate
  const navigate = useNavigate();

  //Usamos Mutations para hacer el POST- creamos la variable mutate que viene en las propiedades de useMutation, del lado derecho tenemos que definir al menos la funcion que maneja la mutation (POST) en este caso y tambien onError y onSuccess
  const {mutate} = useMutation({
    mutationFn: createProject,
    onError:()=>{

    },
    onSuccess:(data)=>{
      //notificamos data es la que viene de ProjectApi.ts la pasamos a la funcion y ésta se la pasa al toast.
    toast.success(data); 
    //redireccionamos
    navigate("/");
    },

  });

  //Nuestra funcion de validacion-> se la pasamos a handleSubmit del hookForm que esta en el onSUbmit
  const handleForm = async (formData: ProjectFormData) => mutate(formData)
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Completa el formulario para crear un nuevo proyecto</p>
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
            value="Crear Proyecto"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}

/**
 * El formulario es un componente porque aparece en Creacion 'C' - Edicion 'U' asi que va en un componente. En cambio el form de esta vista lleva a un endpoint de la API-> crearProyecto y eso va a usar una handleSubmit diferente en la vista de editar proyecto. Lo que va a ser IGUAL en el fomrulario son los CAMPOS por eso se hace un componente de los CAMPOS del formulario que lo da el profe en un gist.
 * 
 * Usamos reac-hook-form: usamos register-> para registrar cada input | handleSubmit -> para ejectura si pasa la validacion | formState-> ahi estan los errores. En form HTML le pasamos en el evento onSubmit la funcion del HOOK handleSubmit y DENTRO de esa funcion NUESTRA funcion de validacion, de esa forma conectamos nuestra validacion con el submit a reack-hook-form. el novalidate en form es para desactivar la validacion de html5- lo haremos con hook-form
 * 
 * 
 * El flujo completo, paso a paso:

typescript
const {
  register,
  handleSubmit,        // ← esta función SABE armar formData
  formState: { errors },
} = useForm({ defaultValues: initialValues });

useForm() (el hook de react-hook-form) te da handleSubmit — una función especial que ya sabe leer todos los campos que registraste con register() en el formulario.

    1. Usuario click en "Crear Proyecto"
2. El navegador dispara el evento submit del <form>
3. React ejecuta lo que está en onSubmit → handleSubmit(handleForm)
4. handleSubmit (de react-hook-form) internamente:
   a. Recolecta TODOS los valores actuales de los inputs
      registrados con register("projectName"), register("clientName"), etc.
   b. Los arma en UN SOLO objeto: { projectName: "...", clientName: "...", description: "..." }
   c. Corre las validaciones (required, etc.)
   d. Si todo pasa validación → LLAMA a tu handleForm, pasándole
      ese objeto armado como argumento
5. Tu handleForm recibe ese objeto y lo nombra "formData"
   (vos elegiste ese nombre — podría llamarse "x" y funcionaría igual,
   el NOMBRE del parámetro es arbitrario, lo que importa es la FORMA
   del objeto, que coincide con tu type ProjectFormData)



 *
 * Aca, implementamos uno de los conceptos nuevos del  curso--> react-query para mejor 'orden', esto implica que el codigo de handleForm queda muuuuuucho mas compacto porque todo lo que tenia dentro lo maneja react-query. React-query tiene 2 funciones bases Queris y Mutations- useQuery y useMutation. Query maneja el verbo GET / Mutation maneja el resto de los verbos. EN esta vista CREAMOS un project por eso usamos useMutation. --> Mutation usa al menos la funcion que dispara la accion --> createProject sin el argumento y tambien usamos el onError ()=> y onSucces()=> aca va casi todo el codigo que tenia handleForm.:
 *        
 * const handleForm = async (formData: ProjectFormData) => {
    //creamos- Esperamos -> await | asignamos la respuesta de la API a data para pasarla al toast
    const data = await createProject(formData); 
    //notificamos
    toast.success(data);
    //redireccionamos
    navigate("/");
  };
 * aca esta la doc de mutation: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
 * 
 * 
 * nota que se puede usar la funcion mutate y mutateAsync---> estan en la doc.. usamos mutate porque es 'menos codigo' y ya react-query sabe que es asincrono.
 *
 */
