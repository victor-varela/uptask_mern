import { createProject } from "@/api/ProjectAPI";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateProjectView() {
  //Instanciamos react-hook-form / lo iniciamos con defaultValues
  const initialValues:ProjectFormData = {
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
  const navigate = useNavigate()

  //Nuestra funcion de validacion-> se la pasamos a handleSubmit del hookForm que esta en el onSUbmit
  const handleForm = async (formData:ProjectFormData) => {
    //creamos- Esperamos -> await | asignamos la respuesta de la API a data para pasarla al toast
   const data= await createProject(formData)
    //redireccionamos
    navigate("/")
    //notificamos
    toast.success(data)   
  };
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
          <ProjectForm errors={errors} register={register}/>
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
 * Usamos reac-hook-form: usamos register-> para registrar cada input | handleSubmit -> para ejectura si pasa la validacion | formState-> ahi estan los errores. En form HTML le pasamos en el evento onSubmit la funcion del HOOK handleSubmit y DENTRO de esa funcion NUESTRA funcion de validacion, de esa forma conectamos nuestra validacion con el submit a reack-hook-form. el novalidate en form es para desactivar la validacion de html5- lo haremos con hook-form
 *
 *
 *
 *
 *
 *
 */
