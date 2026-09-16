import { Fragment, useEffect } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { editTaskById } from "@/api/TaskAPI";
import { toast } from "react-toastify";

export default function ViewTaskModal() {
  //instancio navigate
  const navigate = useNavigate();

  //instancio useLocation para obtener search y pathname
  const { search, pathname } = useLocation();

  //Obtengo ProjectId -> lo necesita la api fn
  const params = useParams();
  const projectId = params.projectId!;

  //obtengo queryParam | taskId ! para que Ts no se queje lo necesita la api fn
  const taskId = new URLSearchParams(search).get("viewTask")!;
  const show = taskId ? true : false;

  //Implemento useQuery | Get para los detalles de la tarea
  const { data, isError, error } = useQuery({
    queryKey: ["viewTask", taskId],
    queryFn: () => editTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
  });

  //Todo el efecto secundario (toast, logs) va ACÁ, no en el cuerpo directo
  useEffect(() => {
    if (isError) {
        console.log(error.message);
        
      toast.error(error.message);
    }
  }, [isError, error]);

  //El return sigue en el cuerpo normal, sin console.log ni toast mezclados
  if (isError) return <Navigate to={`/projects/${projectId}`} />;

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
                  <p className="text-sm text-slate-400">Agregada el: </p>
                  <p className="text-sm text-slate-400">Última actualización: </p>
                  <Dialog.Title as="h3" className="font-black text-4xl text-slate-600 my-5">
                    Titulo aquí
                  </Dialog.Title>
                  <p className="text-lg text-slate-500 mb-2">Descripción:</p>
                  <div className="my-5 space-y-3">
                    <label className="font-bold">Estado Actual:</label>
                  </div>
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
 * Trabajamos en hacer reactivo el modal a la URL- la clave= show y onClose | para Show obtenemos el queryParam ?viewTask y lo asignamos a un boolean si existe ese queryParam, si es asi: show | onClose, como hemos hecho, replace:true- valiedonos de navigate()
 *
 * Para manejar el caso en que la tarea sea incorrecta, eje un 1 al final de taskId, lo que vimos en el backend.. si las tareas no existen.=== por eso usamos isError y error de useQuery y lo manejamos con if(....)
 * toast.error(error.message, {toastId:"error"}) el obj toastId:"error" react detecta que hay un toast llamado error y no hace el doble render de react.
 *
 *  enabled:!!taskId, ===> si no hay taskId no hace la query
 *
 * usamos <Navigate/> el componente para cerrar el modal, ahi estamos mandando a user a /projects/projectId.. por que no usamos navigate la Fn ?? porque React se pone loco... asi que usamos eso.. normalmente como sabemos el modal REACCIONA a la URL y para eliminar algo de la URL lo venimos haciendo con la fn navigate(location.pathname, {replace: true}) esto quita la ultima entrada de la URL  pero para el if(isError) react se pone loquito asi que hacemos lo mismo con el componente Navigate.
 *
 *
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
