import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";

import type { TaskFormData } from "@/types";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";

export default function AddTaskModal() {
  //Instanciamos navigate para usar en el onClose-> repalce:true eso elimina el query param
  const navigate = useNavigate();
  //Implementamos useLocation para LEER la URL (estan dentro de la propiedad search) y pathname para usar en onClose como referencia lo que va a reemplazar navigate
  const { search, pathname } = useLocation();

  //Instanciamos react-hook-form / lo iniciamos con defaultValues
  const initialValues: TaskFormData = {
    name: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  //URLsearchParams para entrar en los query strings
  const queryParams = new URLSearchParams(search);
  //Creamos variable para asignar a show en el modal
  const modalTask = queryParams.get("newTask");
  //Creamos variable show (boolean) para pasar a modal en show- asegurando que exista
  const show = modalTask ? true : false;

  //función que recibe los datos ya validados y dispara la creación de la tarea-> se la pasamos a handleSubmit del hookForm que esta en el onSUbmit- toma los datos que user ingreso en el formulario una vez que pasaron la validacion-(formData)-- ya limpios... los procesó handleSubmit..
  const handleForm = async (formData: TaskFormData) => {
    console.log(formData);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(pathname, { replace: true })}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <DialogTitle as="h3" className="font-black text-4xl  my-5">
                    Nueva Tarea
                  </DialogTitle>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>
                  <form onSubmit={handleSubmit(handleForm)} noValidate
                    className="mt-10 space-y-3"
                  >
                    <TaskForm register={register} errors={errors} />
                    
                    <input
                      type="submit"
                      value="Guardar Tarea"
                      className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />

                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

/**
 * El modal responde al query parameter newTask- lo hacemos funcional a él. useLocation LEE los datos de URL | navigate() INYECTA datos en la URL | ==> el enfoque es que la propiedad show del modal se asigne una variable asociada al query parameter newTask=true. useLocation tiene una propiedad search donde estan los query parameters ahi los capturamos, luego los buscamos por su nombre con queryParamas (URLsearchParams) se lo asignamos a una variable y luego esta a otra variable 'show' si existe para pasarle a show en el modal. Usamos replace:true de navigate (la Fn) para ELIMINAR/LIMPIAR el query param de la URL en onClose del modal.- Esa era toda la gracia, usarlo en el onClose y que aparezca mientras newTask esta en la URL-- replace:true es obj de configuracion-- reemplaza la entrada del HISTORIAL del navegador [atras, adelante].
 *
 * Usamos TaskForm como componente reutilizable porque son 2 formularios diferentes -> Crear Tare y Editar Tarea- igual que hicimos en Project.- Usamos form de html, ahi va el onSubmit donde le pasamos handleSubmit de react-hook-form con la funcion que definimos en el useForm para pasarle en el onSubmit.
 *
 *
 *
 *
 */
