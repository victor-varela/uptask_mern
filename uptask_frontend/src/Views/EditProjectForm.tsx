import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type EditProjectFormProps={
  data:ProjectFormData
}

export default function EditProjectForm({data}:EditProjectFormProps) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });


  const handleForm = (formData: ProjectFormData) => {
    
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
 * 
 * 
 * 





 */