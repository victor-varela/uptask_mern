import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function EditTaskModal() {
    const navigate = useNavigate()
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() =>navigate(location.pathname, {replace:true})}>
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
                  Editar Tarea
                </DialogTitle>

                <p className="text-xl font-bold">
                  Realiza cambios a una tarea en {""}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                <form className="mt-10 space-y-3" noValidate>
                  <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value="Guardar Tarea"
                  />
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/**
 * Para el onClose, usamos el viejo truco de navigate- location.pathname {replace:true} esto elimina el parametro de la URL el 'query param' que es lo que hace que se muestre el modal. El modal lo hacemos dependiente del parametro de URL igual que en el Modal de AddTaskModal
 * 
 * A diferencia de AddTaskModal que tenia todo ahi dentro, el useMutation porque es un POST, el formulario y el modal en sí, en este EditTaskModal esta mas separado - EditTaskData tiene la useQuery porque es un GET / obtiene los datos de una tarea by id y luego muestra el modal.. que creo que este modal de edicion va a tener dentro el formulario.. ya veremos..
 * 
 * Claude dice>>> AddTaskModal: todo junto — useMutation (POST), el formulario (<TaskForm>), y el modal visual, en un solo componente. Tiene sentido que esté junto porque crear una tarea nueva no depende de ningún dato previo — no hay nada que "buscar" antes de mostrar el formulario vacío.
 
EditTaskData + EditTaskModal: separado en dos, y la razón de fondo es exactamente la que identificaste — editar requiere primero traer los datos existentes (useQuery, un GET) antes de poder mostrar nada. No podés abrir el modal de edición "vacío" — necesitás esperar a que lleguen los datos de esa tarea puntual para prellenar el formulario. Por eso EditTaskData actúa como una especie de "guardián de datos": hace la consulta, y solo cuando data existe, recién ahí renderiza <EditTaskModal>.
 * 
 * 
 */