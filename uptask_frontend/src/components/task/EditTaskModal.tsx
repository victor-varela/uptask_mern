import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { Task, TaskFormData } from "@/types";
import TaskForm from "./TaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

type EditTaskModalProps = {
  data: Task;
  taskId: Task["_id"];
};

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {
  const navigate = useNavigate();
  //instanciamos useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  //Instaciamos useMutation (PUT)
  const { mutate } = useMutation({
    mutationFn: updateTask,
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: data => {
      //refrescamos /reFetch otro fecth state usando invalidateQueries | queryKey es el nombre de la query que quiero que repita/haga refecth
      queryClient.invalidateQueries({ queryKey: ["projectDetails", projectId] });
      toast.success(data);
      reset(); //de useForm para reset el form--DA' obvio
      navigate(location.pathname, { replace: true }); //el codigo que tenemos en el modal para onClose y asi cerrar el modal-
    },
  });

  //Leemos projectId de params- lo necesita la api fn-> mutate (aplicamos ! para Ts relaje)
  const params = useParams();
  const projectId = params.projectId!;

  //Instaciamos queryClient para invalidar la query y refrescar los datos
  const queryClient = useQueryClient();

  //Instanciamos nuestra funcion para el fomrulario- que va a ir dentro de hanldeSubmit
  const handleForm = (formData: TaskFormData) => {
    //Armamos el obj que necesita la api fn--> updateTask| ademas de los Ids tambien la dataForm actualizada
    const mutationData = {
      projectId,
      taskId,
      formData,
    };
    //llamamos a mutate | haz lo tuyo
    mutate(mutationData);
  };
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
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

                <form className="mt-10 space-y-3" noValidate onSubmit={handleSubmit(handleForm)}>
                  {/* mostramos Form-  */}
                  <TaskForm register={register} errors={errors} />
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
 * A su vez, este componente renderiza el formulario PRE-LLENO para editar por ende usamos useForm con todas sus cositas: register, hanldeSubmit, reset, formState :{errors}, initialValues 'ACA ESTA EL CORE DEL ASUNTO' le pasamos data que ya nos dio EditTaskData. y con esa data CREAMOS DEFAULVALUES del useForm y PUMP ya tenemos el autocmpletado.
 * El formulario que renderiza este componente es el mismo que habiamos hecho por eso la funcion de re utilizarlo <TaskForm/>
 * 
 * Para actualizar necesitamos hacer la mutacion / vamos a /api/TaskAPI.ts -> updateTask
 * 
 */
